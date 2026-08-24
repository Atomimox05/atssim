"use strict"

class ATSRegulation {
    globalNorthboundHold
    globalSouthboundHold
    platforms = []

    constructor() {
        this.globalNorthboundHold = false
        this.globalSouthboundHold = false
    }

    toggleTerminus(platformName) {
        var platform = this.platforms.find(p => p.name === platformName)
        if (platform) {
            platform.terminus = !platform.terminus
        }
    }

    setTerminus(platformName, value) {
        var platform = this.platforms.find(p => p.name === platformName)
        if (platform) {
            platform.terminus = value
        }
    }
}