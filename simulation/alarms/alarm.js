"use strict"

class Alarm {
    name
    turkishLabel
    englishLabel
    timestamp
    severity

    constructor(name, turkishLabel, englishLabel, spanishLabel, severity) {
        this.name = name
        this.turkishLabel = turkishLabel
        this.englishLabel = englishLabel
        this.spanishLabel = spanishLabel
        this.timestamp = Date.now()
        this.severity = severity
    }
}