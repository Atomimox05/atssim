"use strict"

class InterlockingSignal {
    name
    direction
    nextTrackCircuit
    previousTrackCircuit
    aspect
    interlocking
    fleeting
    fleetingRoute

    constructor(interlocking, name) {
        this.name = name
        this.interlocking = interlocking
        this.fleeting = false
        this.fleetingRoute = null
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
                AlarmHandler.addEvent(this.name, "SİNYAL KIRMIZI RENKTE", "SIGNAL ASPECT IS RED")
                if (this.fleeting) {
                    this.fleetingRoute.path.forEach(trackCircuit => {
                        this.interlocking.getTrackCircuitFromName(trackCircuit).reserveForRouteRequests++
                    })
                }
            } else if (newAspect == "green") {
                AlarmHandler.addEvent(this.name, "SİNYAL YEŞİL RENKTE", "SIGNAL ASPECT IS GREEN")
            } else if (newAspect == "flashingGreen") {
                AlarmHandler.addEvent(this.name, "SİNYAL YANIP SÖNEN YEŞİL RENKTE", "SIGNAL ASPECT IS FLASHING GREEN")
            }
        }
        this.aspect = newAspect
        setTimeout(this.updateAspect.bind(this), 200)
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
            AlarmHandler.addEvent(this.name, "FİLO MODU DEVREDE", "FLEETING SET")
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
        AlarmHandler.addEvent(this.name, "FİLO MODU İPTAL EDİLDİ", "FLEETING CANCELLED")
        return new InterlockingAnswer(true)
    }
}