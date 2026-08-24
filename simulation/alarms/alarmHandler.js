"use strict"

class AlarmHandler {
    static alarms = []

    static addAlarm(name, turkishLabel, englishLabel, spanishLabel, severity) {
        this.alarms.splice(0, 0, new Alarm(name, turkishLabel, englishLabel, spanishLabel, severity))
    }

    static addEvent(name, turkishLabel, englishLabel, spanishLabel) {
        this.alarms.splice(0, 0, new Alarm(name, turkishLabel, englishLabel, spanishLabel, 2))
    }
}