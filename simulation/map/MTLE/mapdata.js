"use strict"

let mapData = {
    trackCircuits: [
        // INDEPENDENCIA
        //VÍA 2
        {
            name: "IDP_02",
            southbound: "endOfTrack",
            northbound: "IDP_04",
            signals: {
                northbound: "IDP02",
                southbound: "SP2"
            },
            length: 8
        },
        {
            name: "IDP_04",
            southbound: "IDP_02",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "IDP_A2",
                normal: "IDP_06",
                reverse: "IDP_CV"
            },
            length: 2
        },
        {
            name: "IDP_06",
            southbound: "dependsOnPoint",
            northbound: "IDP_10",
            dependsOnPoint: {
                point: "IDP_A4",
                normal: "IDP_06",
                reverse: "IDP_CV"
            },
            length: 2
        },
        {
            name: "IDP_08",
            southbound: "IDP_06",
            northbound: "IDP_10",
            signals: {
                southbound: "IDP04",
                northbound: "IDP06"
            },
            length: 8
        },
        {
            name: "IDP_10",
            southbound: "IDP_08",
            northbound: "IDP_12",
            length: 10
        },
        {
            name: "IDP_12",
            southbound: "IDP_10",
            northbound: "GCP_02",
            signals: {
                southbound: "IDP08",
            },
            length: 10
        },
        //VÍA 1
        {
            name: "IDP_01",
            southbound: "endOfTrack",
            northbound: "IDP_03",
            signals: {
                northbound: "IDP01",
                southbound: "SP1"
            },
            length: 8
        },
        {
            name: "IDP_03",
            southbound: "IDP_01",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "IDP_A1",
                normal: "IDP_05",
                reverse: "IDP_CV"
            },
            length: 2
        },
        {
            name: "IDP_05",
            southbound: "dependsOnPoint",
            northbound: "IDP_07",
            dependsOnPoint: {
                point: "IDP_A3",
                normal: "IDP_03",
                reverse: "IDP_CV"
            },
            length: 2
        },
        {
            name: "IDP_07",
            southbound: "IDP_05",
            northbound: "IDP_09",
            signals: {
                southbound: "IDP03",
                northbound: "IDP05"
            },
            length: 8
        },
        {
            name: "IDP_09",
            southbound: "IDP_07",
            northbound: "IDP_11",
            length: 6
        },
        {
            name: "IDP_11",
            southbound: "IDP_09",
            northbound: "GCP_01",
            signals: {
                southbound: "IDP07",
            },
            length: 12
        },
        {
            name: "IDP_CV",
            crossTrackCircuit: true,
            southboundLineSouthboundDirection: "IDP_04",
            southboundLineNorthboundDirection: "IDP_06",
            northboundLineSouthboundDirection: "IDP_03",
            northboundLineNorthboundDirection: "IDP_05",
            length: 2
        },
        //GUAICAIPURO
        //VÍA 2
        {
            name: "GCP_02",
            southbound: "IDP_12",
            northbound: "GCP_04",
            length: 2
        },
        {
            name: "GCP_04",
            southbound: "GCP_02",
            northbound: "GCP_06",
            signals: {
                southbound: "GCP-S2",
            },
            length: 8
        },
        {
            name: "GCP_06",
            southbound: "GCP_04",
            northbound: "ALP_02",
            length: 4
        },
        //VIA 1
        {
            name: "GCP_01",
            southbound: "IDP_11",
            northbound: "GCP_03",
            length: 2
        },
        {
            name: "GCP_03",
            southbound: "GCP_01",
            northbound: "GCP_05",
            signals: {
                northbound: "GCP-S1",
            },
            length: 8
        },
        {
            name: "GCP_05",
            southbound: "GCP_03",
            northbound: "ALP_01",
            length: 4
        },
        //ALI PRIMERA
        //VIA 2
        {
            name: "ALP_02",
            southbound: "GCP_06",
            northbound: "ALP_04",
            signals: {
                northbound: "ALP02",
            },
            length: 2
        },
        {
            name: "ALP_04",
            southbound: "ALP_02",
            northbound: "ALP_06",
            length: 10
        },
        {
            name: "ALP_06",
            southbound: "ALP_04",
            northbound: "ALP_08",
            signals:{
                southbound: "ALP04",
                northbound: "ALP06"
            },
            length: 8
        },
        {
            name: "ALP_08",
            southbound: "ALP_06",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "ALP_A2",
                normal: "ALP_10",
                reverse: "ALP_CV"
            },
            length: 4
        },
        {
            name: "ALP_10",
            southbound: "dependsOnPoint",
            northbound: "ALP_12",
            dependsOnPoint: {
                point: "ALP_A4",
                normal: "ALP_08",
                reverse: "ALP_CV"
            },
            length: 4
        },
        {
            name: "ALP_12",
            southbound: "ALP_10",
            northbound: "endOfTrack",
            signals:{
                southbound: "ALP08",
                northbound: "SP4"
            },
            length: 6
        },
        //VIA 1
        {
            name: "ALP_01",
            southbound: "GCP_05",
            northbound: "ALP_03",
            signals: {
                northbound: "ALP01",
            },
            length: 2
        },
        {
            name: "ALP_03",
            southbound: "ALP_01",
            northbound: "ALP_05",
            length: 10
        },
        {
            name: "ALP_05",
            southbound: "ALP_03",
            northbound: "ALP_07",
            signals: {
                southbound: "ALP03",
                northbound: "ALP05"
            },
            length: 8
        },
        {
            name: "ALP_07",
            southbound: "ALP_05",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "ALP_A1",
                normal: "ALP_09",
                reverse: "ALP_CV"
            },
            length: 4
        },
        {
            name: "ALP_09",
            southbound: "dependsOnPoint",
            northbound: "ALP_11",
            dependsOnPoint: {
                point: "ALP_A3",
                normal: "ALP_07",
                reverse: "ALP_CV"
            },
            length: 4
        },
        {
            name: "ALP_11",
            southbound: "ALP_09",
            northbound: "endOfTrack",
            signals: {
                southbound: "ALP07",
                northbound: "SP3"
            },
            length: 6
        },
        {
            name: "ALP_CV",
            crossTrackCircuit: true,
            southboundLineSouthboundDirection: "ALP_08",
            southboundLineNorthboundDirection: "ALP_10",
            northboundLineSouthboundDirection: "ALP_07",
            northboundLineNorthboundDirection: "ALP_09",
            length: 4
        },
    ],
    points: [
        {
            name: "IDP_A2",
            trackCircuit: "IDP_04",
        },
        {
            name: "IDP_A4",
            trackCircuit: "IDP_06",
        },
        {
            name: "IDP_A1",
            trackCircuit: "IDP_03",
        },
        {
            name: "IDP_A3",
            trackCircuit: "IDP_05",
        },
        {
            name: "ALP_A2",
            trackCircuit: "ALP_08",
        },
        {
            name: "ALP_A4",
            trackCircuit: "ALP_10",
        },
        {
            name: "ALP_A1",
            trackCircuit: "ALP_07",
        },
        {
            name: "ALP_A3",
            trackCircuit: "ALP_09",
        }
    ],
    signals: [
        {
            name: "IDP02",
            direction: "northbound"
        },
        {
            name: "IDP04",
            direction: "southbound"
        },
        {
            name: "IDP06",
            direction: "northbound"
        },
        {
            name: "IDP08",
            direction: "southbound"
        },
        {
            name: "IDP01",
            direction: "northbound"
        },
        {
            name: "IDP03",
            direction: "southbound"
        },
        {
            name: "IDP05",
            direction: "northbound"
        },
        {
            name: "IDP07",
            direction: "southbound"
        },
        {
            name: "GCP-S1",
            direction: "northbound"
        },
        {
            name: "GCP-S2",
            direction: "southbound"
        },
        {
            name: "ALP02",
            direction: "northbound"
        },
        {
            name: "ALP04",
            direction: "southbound"
        },
        {
            name: "ALP06",
            direction: "northbound"
        },
        {
            name: "ALP08",
            direction: "southbound"
        },
        {
            name: "ALP01",
            direction: "northbound"
        },
        {
            name: "ALP03",
            direction: "southbound"
        },
        {
            name: "ALP05",
            direction: "northbound"
        },
        {
            name: "ALP07",
            direction: "southbound"
        },
        {
            name: "SP1",
            direction: "southbound"
        },
        {
            name: "SP2",
            direction: "southbound"
        },
        {
            name: "SP3",
            direction: "northbound"
        },
        {
            name: "SP4",
            direction: "northbound"
        }
    ],
    shuntingPanels: [
        
    ],
    platforms: [
        {
            name: "INDEPENDENCIA_V1",
            direction: "northbound",
            northbound: {
                trackCircuit: "IDP_07",
                position: 6
            },
            southbound: {
                trackCircuit: "IDP_07",
                position: 3
            }
        },
        {
            name: "INDEPENDENCIA_V2",
            direction: "southbound",
            northbound: {
                trackCircuit: "IDP_08",
                position: 6
            },
            southbound: {
                trackCircuit: "IDP_08",
                position: 3
            },
            terminus: true
        },
        {
            name: "GUAICAIPURO_V1",
            direction: "northbound",
            northbound: {
                trackCircuit: "GCP_03",
                position: 6
            },
            southbound: {
                trackCircuit: "GCP_03",
                position: 3
            }
        },
        {
            name: "GUAICAIPURO_V2",
            direction: "northbound",
            northbound: {
                trackCircuit: "GCP_04",
                position: 6
            },
            southbound: {
                trackCircuit: "GCP_04",
                position: 3
            }
        },
        {
            name: "ALIPRIMERA_V1",
            direction: "northbound",
            northbound: {
                trackCircuit: "ALP_05",
                position: 6
            },
            southbound: {
                trackCircuit: "ALP_05",
                position: 3
            },
            terminus: true
        },
        {
            name: "ALIPRIMERA_V2",
            direction: "northbound",
            northbound: {
                trackCircuit: "ALP_06",
                position: 6
            },
            southbound: {
                trackCircuit: "ALP_06",
                position: 3
            }
        }
    ],
}