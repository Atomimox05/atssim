"use strict"

class ATSPlatform {
    name
    hold
    terminus

    constructor(name, terminus = false) {
        this.name = name
        this.hold = false
        this.terminus = terminus
    }
}