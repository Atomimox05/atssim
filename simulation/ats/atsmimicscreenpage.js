"use strict"

class ATSMimicScreenPage {
    name
    HTMLElement
    interlocking
    currentClickedButton
    secondsSinceButtonClick
    signalButtons
    controlBar
    trainDescribers
    ats

    constructor(name, svg, interlocking, ats) {
        this.name = name
        this.HTMLElement = document.createElement("svg")
        var newElement = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement
        this.HTMLElement.append(newElement)
        this.interlocking = interlocking
        this.ats = ats
        this.currentClickedButton = null
        this.secondsSinceButtonClick = 0
        this.signalButtons = []
        this.trainDescribers = []
        this.startSignals()
        this.startShuntingPanels()
        this.startTrackCircuits()
        this.startPoints()
        this.startCycles()
        this.startHolds()
        setTimeout(this.startPageButtons.bind(this), 200)
        var screenBackground = this.HTMLElement.querySelector("#screenbackground")
        if (screenBackground != null) {
            screenBackground.addEventListener("click", () => { this.currentClickedButton = null })
        }
        var controlBarElement = this.HTMLElement.querySelector("#ControlBar")
        if (controlBarElement != null) {
            this.controlBar = new ATSMimicScreenControlBar(controlBarElement, this)
        }
    }

    startSignals() {
        this.interlocking.signals.forEach(interlockingSignal => {
            var signalInScreen = this.HTMLElement.querySelector(`#Signal_${interlockingSignal.name}`)
            if (signalInScreen != null) {
                this.updateSignal(interlockingSignal, signalInScreen)
            }
            var signalButtonInScreen = this.HTMLElement.querySelector(`#Button_${interlockingSignal.name}`)
            if (signalButtonInScreen != null) {
                this.signalButtons.push(new ATSSignalButton(signalButtonInScreen, interlockingSignal, this))
            }
            var cancelButtonInScreen = this.HTMLElement.querySelector(`#Cancel_${interlockingSignal.name}`)
            if (cancelButtonInScreen != null) {
                this.signalButtons.push(new ATSRouteCancelButton(cancelButtonInScreen, interlockingSignal, this))
            }
            var fleetingButtonInScreen = this.HTMLElement.querySelector(`#Fleeting_${interlockingSignal.name}`)
            if (fleetingButtonInScreen != null) {
                this.signalButtons.push(new ATSFleetingButton(fleetingButtonInScreen, interlockingSignal, this))
            }
        })
        this.updateSecondsSinceButtonClick()
    }

    startShuntingPanels() {
        this.interlocking.shuntingPanels.forEach(interlockingShuntingPanel => {
            var shuntingPanelInScreen = this.HTMLElement.querySelector(`#ShuntingPanel_${interlockingShuntingPanel.name}`)
            if (shuntingPanelInScreen != null) {
                this.signalButtons.push(new ATSShuntingPanel(shuntingPanelInScreen, interlockingShuntingPanel, this))
            }
        })
    }

    startTrackCircuits() {
        this.interlocking.trackCircuits.forEach(interlockingTrackCircuit => {
            
            // 1. Busca TODOS los elementos y los guarda en una LISTA
            const listaDeTrackCircuits = this.HTMLElement.querySelectorAll(
                `.TrackCircuit_${interlockingTrackCircuit.name}`
            );
            
            // 2. ¡ESTA ES LA CORRECCIÓN!
            // Recorremos la lista y llamamos a updateTrackCircuit 
            // para CADA elemento individual.
            listaDeTrackCircuits.forEach(unSoloTrackCircuit => {
                // "unSoloTrackCircuit" SÍ es un elemento y SÍ tiene .setAttribute
                this.updateTrackCircuit(interlockingTrackCircuit, unSoloTrackCircuit);
            });

            // --- Repetimos el patrón para los demás ---

            const listaDeDirectionArrows = this.HTMLElement.querySelectorAll(
                `.DirectionArrow_${interlockingTrackCircuit.name}`
            );
            listaDeDirectionArrows.forEach(unaSolaArrow => {
                this.updateDirectionArrow(interlockingTrackCircuit, unaSolaArrow);
            });

            const listaDeTrainDescribers = this.HTMLElement.querySelectorAll(
                `.TrainDescriber_${interlockingTrackCircuit.name}`
            );
            listaDeTrainDescribers.forEach(unSoloDescriber => {
                this.trainDescribers.push(
                    new ATSTrainDescriber(this.ats.trainManager, interlockingTrackCircuit.name, unSoloDescriber)
                );
            });
        });
    }

    startPoints() {
        this.interlocking.points.forEach(interlockingPoint => {
            var pointInScreen = this.HTMLElement.querySelector(`#Point_${interlockingPoint.name}`)
            if (pointInScreen != null) {
                this.updatePoint(interlockingPoint, pointInScreen)
                var pointButton = pointInScreen.querySelector(`#L`)
                if (pointInScreen != null) {
                    this.signalButtons.push(new ATSPointButton(pointButton, interlockingPoint, this))
                }
            }
        })
    }

    startCycles() {
        this.interlocking.cycles.forEach(cycle => {
            if (this.HTMLElement.querySelector(`#CycleButtons_${cycle.name}`) != null) {
                var cycleOnButtonInScreen = this.HTMLElement.querySelector(`#CycleButtons_${cycle.name}`).querySelector(`#OnButton`)
                var cycleOffButtonInScreen = this.HTMLElement.querySelector(`#CycleButtons_${cycle.name}`).querySelector(`#OffButton`)
                if (cycleOnButtonInScreen != null && cycleOffButtonInScreen != null) {
                    this.signalButtons.push(new ATSCycleButton(cycle, cycleOnButtonInScreen, cycleOffButtonInScreen))
                }
            }
        })
    }

    startHolds() {
        this.ats.regulation.platforms.forEach(platform => {
            var holdBtn = this.HTMLElement.querySelector(`#HoldButton_${platform.name}`)
            if (holdBtn != null) {
                var holdingOnButtonInScreen = holdBtn.querySelector(`#OnButton`)
                var holdingOffButtonInScreen = holdBtn.querySelector(`#OffButton`)
                if (holdingOnButtonInScreen != null && holdingOffButtonInScreen != null) {
                    this.signalButtons.push(new ATSHoldButton(platform, holdingOnButtonInScreen, holdingOffButtonInScreen))
                }
            }
        })
        var globalSouthbound = this.HTMLElement.querySelector(`#HoldButton_GlobalSouthbound`)
        if (globalSouthbound != null) {
            var globalSouthboundHoldingOnButton = globalSouthbound.querySelector(`#OnButton`)
            var globalSouthboundHoldingOffButton = globalSouthbound.querySelector(`#OffButton`)
            if (globalSouthboundHoldingOnButton != null && globalSouthboundHoldingOffButton != null) {
                this.signalButtons.push(new ATSGlobalHoldButton(this.ats, "southbound", globalSouthboundHoldingOnButton, globalSouthboundHoldingOffButton))
            }
        }
        var globalNorthbound = this.HTMLElement.querySelector(`#HoldButton_GlobalNorthbound`)
        if (globalNorthbound != null) {
            var globalNorthboundHoldingOnButton = globalNorthbound.querySelector(`#OnButton`)
            var globalNorthboundHoldingOffButton = globalNorthbound.querySelector(`#OffButton`)
            if (globalNorthboundHoldingOnButton != null && globalNorthboundHoldingOffButton != null) {
                this.signalButtons.push(new ATSGlobalHoldButton(this.ats, "northbound", globalNorthboundHoldingOnButton, globalNorthboundHoldingOffButton))
            }
        }
    }

    updateSignal(interlockingSignal, signalInScreen) {
        var aspect = "red"
        try {
            if (interlockingSignal.aspect == "red") {
                if (interlockingSignal.nextTrackCircuit.approachLocked && interlockingSignal.nextTrackCircuit.direction == interlockingSignal.direction && signalInScreen.querySelector("#disc").getAttribute("fill") == "red") {
                    aspect = "#00fffff"
                } else {
                    aspect = "red"
                }
            } if (interlockingSignal.aspect == "flashingGreen") {
                if (signalInScreen.querySelector("#disc").getAttribute("fill") == "green") {
                    aspect = "#00fffff"
                } else {
                    aspect = "green"
                }
            } else if (interlockingSignal.aspect == "green") {
                aspect = "green"
            } else if (interlockingSignal.aspect == "endOfTrack") {
                aspect = "#00fffff"
            }
        } catch {
            aspect = "blue"
        }
        signalInScreen.querySelector("#disc").setAttribute("fill", aspect)
        var whiteDisc = signalInScreen.querySelector("#whiteDisc")
        if (whiteDisc) {
            if (interlockingSignal.fleetingAspect === "redWhite" || interlockingSignal.fleetingAspect === "greenWhite") {
                whiteDisc.setAttribute("display", "inline")
                whiteDisc.setAttribute("cx", "6.5")
                signalInScreen.querySelector("#disc").setAttribute("cx", "-6")
            } else {
                whiteDisc.setAttribute("display", "none")
                signalInScreen.querySelector("#disc").setAttribute("cx", "6.5")
            }
        }
        setTimeout(() => { this.updateSignal(interlockingSignal, signalInScreen) }, 500)
    }

    updateTrackCircuit(interlockingTrackCircuit, trackCircuitInScreen) {
        var color = "blue"
        try {
            if (interlockingTrackCircuit.occupied) {
                color = "red"
            } else if (interlockingTrackCircuit.reservedForRoute || interlockingTrackCircuit.approachLocked || interlockingTrackCircuit.reservedForShuntingRoute) {
                color = "#00CC00"
            } else {
                color = "#FFFF06"
            }
        } catch {
            color = "blue"
        }
        trackCircuitInScreen.setAttribute("stroke", color)
        setTimeout(() => { this.updateTrackCircuit(interlockingTrackCircuit, trackCircuitInScreen) }, 100)
    }

    updateDirectionArrow(interlockingTrackCircuit, directionArrowInScreen) {
        if ((interlockingTrackCircuit.reservedForRoute || interlockingTrackCircuit.occupied || interlockingTrackCircuit.reservedForShuntingRoute) && interlockingTrackCircuit.direction == "northbound") {
            directionArrowInScreen.querySelector("#northbound").setAttribute("fill", "white")
            directionArrowInScreen.querySelector("#southbound").setAttribute("fill", "#2b2d31")
        } else if ((interlockingTrackCircuit.reservedForRoute || interlockingTrackCircuit.occupied || interlockingTrackCircuit.reservedForShuntingRoute) && interlockingTrackCircuit.direction == "southbound") {
            directionArrowInScreen.querySelector("#northbound").setAttribute("fill", "#2b2d31")
            directionArrowInScreen.querySelector("#southbound").setAttribute("fill", "white")
        } else {
            directionArrowInScreen.querySelector("#northbound").setAttribute("fill", "#2b2d31")
            directionArrowInScreen.querySelector("#southbound").setAttribute("fill", "#2b2d31")
        }
        setTimeout(() => { this.updateDirectionArrow(interlockingTrackCircuit, directionArrowInScreen) }, 200)
    }

    updatePoint(interlockingPoint, pointInScreen) {
        var interlockingTrackCircuit = interlockingPoint.connectedTrackCircuit
        var trackCircuitColor = "blue"
        try {
            if (interlockingTrackCircuit.occupied) {
                trackCircuitColor = "red"
            } else if (interlockingTrackCircuit.reservedForRoute || interlockingTrackCircuit.approachLocked || interlockingTrackCircuit.reservedForShuntingRoute) {
                trackCircuitColor = "#00CC00"
            } else {
                trackCircuitColor = "#FFFF06"
            }
        } catch {
            trackCircuitColor = "blue"
        }
        
        if (interlockingPoint.currentPosition == "normal" && interlockingPoint.desiredPosition == "normal") {
            pointInScreen.querySelector("#N").setAttribute("stroke", trackCircuitColor)
            pointInScreen.querySelector("#R").setAttribute("stroke", "#00fffff")
        } else if (interlockingPoint.currentPosition == "reverse" && interlockingPoint.desiredPosition == "reverse" ) {
            pointInScreen.querySelector("#R").setAttribute("stroke", trackCircuitColor)
            pointInScreen.querySelector("#N").setAttribute("stroke", "#00fffff")
        } else {
            pointInScreen.querySelector("#N").setAttribute("stroke", "#00fffff")
            pointInScreen.querySelector("#R").setAttribute("stroke", "#00fffff")
        }

        if (interlockingPoint.desiredPosition == "normal") {
            if (pointInScreen.querySelector("#B") != null) {
                pointInScreen.querySelector("#B").setAttribute("stroke", trackCircuitColor)
            }
            pointInScreen.querySelector("#C").setAttribute("stroke", "#FFFF06")
        } else if (interlockingPoint.desiredPosition == "reverse") {
            pointInScreen.querySelector("#C").setAttribute("stroke", trackCircuitColor)
            if (pointInScreen.querySelector("#B") != null) {
                pointInScreen.querySelector("#B").setAttribute("stroke", "#FFFF06")
            }
        } else {
            if (pointInScreen.querySelector("#B") != null) {
                pointInScreen.querySelector("#B").setAttribute("stroke", "#FFFF06")
            }
            pointInScreen.querySelector("#C").setAttribute("stroke", "#FFFF06")
        }
        pointInScreen.querySelector("#A").setAttribute("stroke", trackCircuitColor)
        setTimeout(() => { this.updatePoint(interlockingPoint, pointInScreen) }, 200)
    }

    startPageButtons() {
        if (this.ats && this.ats.mimicScreen && this.ats.mimicScreen.pages) {
            this.ats.mimicScreen.pages.forEach(page => {
                var pageButtonInScreen = this.HTMLElement.querySelector(`#PageButton_${page.name}`)
                if (pageButtonInScreen != null) {
                    pageButtonInScreen.addEventListener("click", () => { this.ats.mimicScreen.setActivePage(page) })
                }
            })
        }
    }

    updateSecondsSinceButtonClick() {
        if (this.secondsSinceButtonClick <= 15) {
            this.secondsSinceButtonClick += 1
        }
        if (this.secondsSinceButtonClick > 15) {
            this.currentClickedButton = null
        }
        setTimeout(this.updateSecondsSinceButtonClick.bind(this), 1000)
    }

    updateCurrentClickedButton(button) {
        this.currentClickedButton = button
        this.secondsSinceButtonClick = 0
    }
}