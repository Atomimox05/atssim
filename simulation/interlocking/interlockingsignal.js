"use strict"

const FLEETING_RED_WHITE_THRESHOLD = 2
const FLEETING_GREEN_WHITE_THRESHOLD = 4

class InterlockingSignal {
    name
    direction
    nextTrackCircuit
    previousTrackCircuit
    aspect
    interlocking
    fleeting
    fleetingRoute
    fleetingAspect
    associatedCycles
    trackCircuitsSinceTrainPassed
    trainHasPassedSignal

    constructor(interlocking, name) {
        this.name = name
        this.interlocking = interlocking
        this.fleeting = false
        this.fleetingRoute = null
        this.fleetingAspect = "none"
        this.associatedCycles = []
        this.trackCircuitsSinceTrainPassed = 0
        this.trainHasPassedSignal = false
        this.updateAspect()
    }

    updateAspect() {
        var newAspect = "red"
        if (this.nextTrackCircuit == null || this.nextTrackCircuit.occupied) {
            newAspect = "red"
        } else if (this.nextTrackCircuit == "endOfTrack") {
            newAspect = "endOfTrack"
        } else if (this.nextTrackCircuit.reservedForRoute && this.nextTrackCircuit.direction == this.direction) {
            if (this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint == null || this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).currentPosition == this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).desiredPosition &&
                this.nextTrackCircuit.getCurrentNext(this.direction == "northbound" ? "southbound" : "northbound") == this.previousTrackCircuit.mapTrackCircuit) {
                newAspect = "green"
            } else {
                newAspect = "red"
            }
        } else if (this.nextTrackCircuit.reservedForShuntingRoute && this.nextTrackCircuit.direction == this.direction) {
            if (this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint == null || this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).currentPosition == this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).desiredPosition &&
                this.nextTrackCircuit.getCurrentNext(this.direction == "northbound" ? "southbound" : "northbound") == this.previousTrackCircuit.mapTrackCircuit) {
                newAspect = "flashingGreen"
            } else {
                newAspect = "red"
            }
        } else {
            newAspect = "red"
        }
        if (this.aspect != newAspect) {
            if (newAspect == "red") {
                AlarmHandler.addEvent(this.name, "SİNYAL KIRMIZI RENKTE", "SIGNAL ASPECT IS RED", "ASPECTO DE LA SEÑAL ES ROJO")
                if (this.fleeting) {
                    this.fleetingRoute.path.forEach(trackCircuit => {
                        this.interlocking.getTrackCircuitFromName(trackCircuit).reserveForRouteRequests++
                    })
                    if (this.aspect == "green" || this.aspect == "flashingGreen") {
                        this.trainHasPassedSignal = true
                        this.trackCircuitsSinceTrainPassed = 0
                    }
                }
            } else if (newAspect == "green") {
                AlarmHandler.addEvent(this.name, "SİNYAL YEŞİL RENKTE", "SIGNAL ASPECT IS GREEN", "ASPECTO DE LA SEÑAL ES VERDE")
            } else if (newAspect == "flashingGreen") {
                AlarmHandler.addEvent(this.name, "SİNYAL YANIP SÖNEN YEŞİL RENKTE", "SIGNAL ASPECT IS FLASHING GREEN", "ASPECTO DE LA SEÑAL ES VERDE PARPADEANTE")
            }
        }
        
        var newFleetingAspect = "none"
        if (this.fleeting) {
            if (this.trainHasPassedSignal) {
                var maxTCs = this.fleetingRoute != null ? this.fleetingRoute.path.length : 1
                var greenWhiteThreshold = Math.min(FLEETING_GREEN_WHITE_THRESHOLD, maxTCs)
                var redWhiteThreshold = Math.min(FLEETING_RED_WHITE_THRESHOLD, greenWhiteThreshold - 1)
                if (redWhiteThreshold < 1) redWhiteThreshold = 1

                if (this.trackCircuitsSinceTrainPassed < redWhiteThreshold) {
                    newAspect = "red"
                    newFleetingAspect = "none"
                } else if (this.trackCircuitsSinceTrainPassed < greenWhiteThreshold) {
                    newAspect = "red"
                    newFleetingAspect = "redWhite"
                } else {
                    newFleetingAspect = "greenWhite"
                    this.trainHasPassedSignal = false
                }
            } else {
                if (newAspect == "green" || newAspect == "flashingGreen") {
                    newFleetingAspect = "greenWhite"
                }
            }
        } else {
            var cycleEnabled = false
            for (let i = 0; i < this.associatedCycles.length; i++) {
                if (this.associatedCycles[i].enabled) {
                    cycleEnabled = true
                    break
                }
            }
            if (cycleEnabled && (newAspect == "green" || newAspect == "flashingGreen")) {
                newFleetingAspect = "greenWhite"
            }
        }

        this.aspect = newAspect
        this.fleetingAspect = newFleetingAspect
        setTimeout(this.updateAspect.bind(this), 200)
    }

    notifyTrackCircuitFreed(trackCircuitName) {
        if (this.fleetingRoute != null && this.fleetingRoute.path.includes(trackCircuitName)) {
            this.trackCircuitsSinceTrainPassed++
        }
    }

    findFleetingTargetSignal() {
        var currentTrackCircuit = this.nextTrackCircuit.mapTrackCircuit
        if (this.direction == "northbound") {
            while (currentTrackCircuit.northboundSignal == null) {
                currentTrackCircuit = currentTrackCircuit.getNorthbound("normal")
            }
            return currentTrackCircuit.northboundSignal
        } else {
            while (currentTrackCircuit.southboundSignal == null) {
                currentTrackCircuit = currentTrackCircuit.getSouthbound("normal")
            }
            return currentTrackCircuit.southboundSignal
        }
    }

    requestFleeting() {
        var fleetingTargetSignal = this.findFleetingTargetSignal().interlockingSignal
        this.fleetingRoute = this.interlocking.findRouteBetweenSignals(this, fleetingTargetSignal)
        var fleetingPossibility = this.interlocking.checkRoutePossibility(this.fleetingRoute)
        if (fleetingPossibility.status) {
            this.interlocking.activateRoute(this.fleetingRoute)
            this.fleeting = true
            AlarmHandler.addEvent(this.name, "FİLO MODU DEVREDE", "FLEETING SET", "FLOTA ESTABLECIDA")
        }
        return fleetingPossibility
    }

    disableFleeting() {
        if (!this.fleeting) {
            return new InterlockingAnswer(false, "fleetingAlreadyOff")
        }
        this.fleetingRoute.path.forEach(trackCircuitName => {
            var trackCircuit = this.interlocking.getTrackCircuitFromName(trackCircuitName)
            if (trackCircuit.reserveForRouteRequests > 0) {
                trackCircuit.reserveForRouteRequests--
            }
        })
        this.fleeting = false
        this.trainHasPassedSignal = false
        this.trackCircuitsSinceTrainPassed = 0
        AlarmHandler.addEvent(this.name, "FİLO MODU İPTAL EDİLDİ", "FLEETING CANCELLED", "FLOTA CANCELADA")
        return new InterlockingAnswer(true)
    }
}