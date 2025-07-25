"use strict"

var map = new Map(mapData)
var interlocking = new Interlocking(map)
var track = new Track(interlocking)
var windowManager = new UIWindowManager(document.body, window)
var ats = new ATS(map, interlocking, windowManager)

//VIA 1
interlocking.getSignalFromName("IDP05").requestFleeting()
interlocking.getSignalFromName("GCP-S1").requestFleeting()
interlocking.getSignalFromName("ALP01").requestFleeting()
interlocking.getSignalFromName("ALP05").requestFleeting()
interlocking.getSignalFromName("AYA01").requestFleeting()
interlocking.getSignalFromName("AYA05").requestFleeting()
interlocking.getSignalFromName("TCA01").requestFleeting()
interlocking.getSignalFromName("TRC01").requestFleeting()
interlocking.getSignalFromName("TCP01").requestFleeting()
//VIA 2
interlocking.getSignalFromName("TCP04").requestFleeting()
interlocking.getSignalFromName("TRC04").requestFleeting()
interlocking.getSignalFromName("TCA04").requestFleeting()
interlocking.getSignalFromName("AYA08").requestFleeting()
interlocking.getSignalFromName("AYA04").requestFleeting()
interlocking.getSignalFromName("ALP08").requestFleeting()
interlocking.getSignalFromName("ALP04").requestFleeting()
interlocking.getSignalFromName("GCP-S2").requestFleeting()
interlocking.getSignalFromName("IDP08").requestFleeting()

// Pre-reservar rutas críticas  
/*requestReserveForRouteMultipleTrackCircuits("IDP_09", "GCP_03", "northbound")  
requestReserveForRouteMultipleTrackCircuits("GCP_03", "ALP_05", "northbound")  
requestReserveForRouteMultipleTrackCircuits("ALP_06", "GCP_04", "southbound")  
requestReserveForRouteMultipleTrackCircuits("GCP_04", "IDP_08", "southbound")*/

interlocking.getCycleFromName("IDP_1").enable();
interlocking.getCycleFromName("AJU_1").enable();

var trains = []
trains.push(new Train("06", 6, map, track, map.getTrackCircuitFromName("IDP_07"), "northbound", interlocking, ats))
trains.push(new Train("18", 6, map, track, map.getTrackCircuitFromName("AYA_11"), "northbound", interlocking, ats))
trains.push(new Train("22", 6, map, track, map.getTrackCircuitFromName("TRC_07"), "northbound", interlocking, ats))
trains.push(new Train("07", 6, map, track, map.getTrackCircuitFromName("TCP_07"), "northbound", interlocking, ats))
trains.push(new Train("20", 6, map, track, map.getTrackCircuitFromName("IDP_02"), "southbound", interlocking, ats))
trains.push(new Train("15", 6, map, track, map.getTrackCircuitFromName("ALP_04"), "southbound", interlocking, ats))
trains.push(new Train("04", 6, map, track, map.getTrackCircuitFromName("TCA_06"), "southbound", interlocking, ats))
trains.push(new Train("11", 6, map, track, map.getTrackCircuitFromName("TCP_06"), "southbound", interlocking, ats))
trains.push(new Train("19", 6, map, track, map.getTrackCircuitFromName("AJU_08"), "southbound", interlocking, ats))

function requestReserveForRouteMultipleTrackCircuits(startTrackCircuitName, endTrackCircuitName, direction) {
    var startTrackCircuit = interlocking.getTrackCircuitFromName(startTrackCircuitName)
    var endTrackCircuit = interlocking.getTrackCircuitFromName(endTrackCircuitName)
    var route = interlocking.findRouteBetweenTrackCircuits(startTrackCircuit, endTrackCircuit, direction)
    route.path.forEach(trackCircuit => {
        interlocking.getTrackCircuitFromName(trackCircuit).reserveForRouteRequests++
    })
}