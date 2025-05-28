"use strict"

var map = new Map(mapData)
var interlocking = new Interlocking(map)
var track = new Track(interlocking)
var windowManager = new UIWindowManager(document.body, window)
var ats = new ATS(map, interlocking, windowManager)

interlocking.getSignalFromName("IDP05").requestFleeting()
interlocking.getSignalFromName("GCP-S1").requestFleeting()
interlocking.getSignalFromName("ALP01").requestFleeting()
interlocking.getSignalFromName("ALP04").requestFleeting()
interlocking.getSignalFromName("GCP-S2").requestFleeting()
interlocking.getSignalFromName("IDP08").requestFleeting()

requestReserveForRouteMultipleTrackCircuits("ALP_05", "GCP_01", "southbound")
// requestReserveForRouteMultipleTrackCircuits("OSM_12T", "OSM_06T", "southbound")
// requestReserveForRouteMultipleTrackCircuits("OSM_01T", "OSM_05T", "northbound")
// requestReserveForRouteMultipleTrackCircuits("SIS_13T", "LEV_03T", "northbound")

// var remainingRouteTrain2 = interlocking.findRouteBetweenTrackCircuits(interlocking.getTrackCircuitFromName("GAY_10T"), interlocking.getTrackCircuitFromName("SIS_14T"), "southbound")
// interlocking.activateRoute(remainingRouteTrain2)
// var remainingRouteTrain5 = interlocking.findRouteBetweenTrackCircuits(interlocking.getTrackCircuitFromName("4LV_03T"), interlocking.getTrackCircuitFromName("4LV_09T"), "northbound")
// interlocking.activateRoute(remainingRouteTrain5)

interlocking.getCycleFromName("IDP_2").enable();
interlocking.getCycleFromName("ALP_1").enable();

var trains = []
trains.push(new Train("01", 6, map, track, map.getTrackCircuitFromName("ALP_06"), "southbound", interlocking, ats))
trains.push(new Train("14", 6, map, track, map.getTrackCircuitFromName("IDP_08"), "southbound", interlocking, ats))
trains.push(new Train("18", 6, map, track, map.getTrackCircuitFromName("ALP_05"), "northbound", interlocking, ats))
trains.push(new Train("20", 6, map, track, map.getTrackCircuitFromName("IDP_07"), "northbound", interlocking, ats))
// trains.push(new Train("05", 4, map, track, map.getTrackCircuitFromName("4LV_03T"), "northbound", interlocking, ats))
// trains.push(new Train("06", 4, map, track, map.getTrackCircuitFromName("SIS_13T"), "northbound", interlocking, ats))
// trains.push(new Train("07", 4, map, track, map.getTrackCircuitFromName("TAK_08T"), "southbound", interlocking, ats))
// trains.push(new Train("08", 4, map, track, map.getTrackCircuitFromName("TAK_25T"), "northbound", interlocking, ats))

function requestReserveForRouteMultipleTrackCircuits(startTrackCircuitName, endTrackCircuitName, direction) {
    var startTrackCircuit = interlocking.getTrackCircuitFromName(startTrackCircuitName)
    var endTrackCircuit = interlocking.getTrackCircuitFromName(endTrackCircuitName)
    var route = interlocking.findRouteBetweenTrackCircuits(startTrackCircuit, endTrackCircuit, direction)
    route.path.forEach(trackCircuit => {
        interlocking.getTrackCircuitFromName(trackCircuit).reserveForRouteRequests++
    })
}