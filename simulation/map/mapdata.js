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
                northbound: "IDP02",//F
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
            length: 3
        },
        {
            name: "IDP_06",
            southbound: "dependsOnPoint",
            northbound: "IDP_08",
            dependsOnPoint: {
                point: "IDP_A4",
                normal: "IDP_04",
                reverse: "IDP_CV"
            },
            length: 3
        },
        {
            name: "IDP_08",
            southbound: "IDP_06",
            northbound: "IDP_10",
            signals: {
                southbound: "IDP04",//E
                northbound: "IDP06"//D
            },
            length: 8
        },
        {
            name: "IDP_10",
            southbound: "IDP_08",
            northbound: "IDP_12",
            length: 8
        },
        {
            name: "IDP_12",
            southbound: "IDP_10",
            northbound: "GCP_02",
            length: 10
        },
        //VÍA 1
        {
            name: "IDP_01",
            southbound: "endOfTrack",
            northbound: "IDP_03",
            signals: {
                northbound: "IDP01",//G
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
            length: 3
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
            length: 3
        },
        {
            name: "IDP_07",
            southbound: "IDP_05",
            northbound: "IDP_09",
            signals: {
                southbound: "IDP03",//H
                northbound: "IDP05"//J
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
            length: 10
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
            signals: {
                southbound: "IDP08",//C
            },
            length: 6
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
            signals: {
                northbound: "ALP02",//B
            },
            length: 4
        },
        //VIA 1
        {
            name: "GCP_01",
            southbound: "IDP_11",
            northbound: "GCP_03",
            signals: {
                southbound: "IDP07",//K
            },
            length: 4
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
            signals: {
                northbound: "ALP01",//L
            },
            length: 4
        },
        //ALI PRIMERA
        //VIA 2
        {
            name: "ALP_02",
            southbound: "GCP_06",
            northbound: "ALP_04",
            length: 4
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
                southbound: "ALP04",//A
                northbound: "ALP06"//F
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
            northbound: "ALP_14",
            signals:{
                southbound: "ALP08",//E
            },
            shuntingPanels:{
                northbound: "ZR2"
            },
            length: 6
        },
        {
            name: "ALP_14",
            southbound: "ALP_12",
            northbound: "AYA_02",
            length: 4
        },
        //VIA 1
        {
            name: "ALP_01",
            southbound: "GCP_05",
            northbound: "ALP_03",
            length: 4
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
                southbound: "ALP03",//M
                northbound: "ALP05"//G
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
            northbound: "ALP_13",
            signals: {
                southbound: "ALP07",//H
            },
            shuntingPanels:{
                northbound: "ZR1"
            },
            length: 6
        },
        {
            name: "ALP_13",
            southbound: "ALP_11",
            northbound: "AYA_01",
            length: 4
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
        //AYACUCHO
        //VIA 2
        {
            name: "AYA_02",
            southbound: "ALP_14",
            northbound: "AYA_04",
            signals:{
                northbound: "AYA02" //D
            },
            length: 8,
        },
        {
            name: "AYA_04",
            southbound: "AYA_02",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AYA_A2",
                normal: "AYA_06",
                reverse: "AYA_03"
            },
            length: 6
        },
        {
            name: "AYA_06",
            southbound: "dependsOnPoint",
            northbound: "AYA_08",
            dependsOnPoint: {
                point: "AYA_A4",
                normal: "AYA_04",
                reverse: "AYA_05"
            },
            length: 6
        },
        {
            name: "AYA_08",
            southbound: "AYA_06",
            northbound: "AYA_10",
            signals:{
                southbound: "AYA04", //X7
                northbound: "AYA06" //X5
            },
            length: 8
        },
        {
            name: "AYA_10",
            southbound: "AYA_08",
            northbound: "AYA_12",
            length: 6
        },
        {
            name: "AYA_12",
            southbound: "AYA_10",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AYA_A6",
                normal: "AYA_14",
                reverse: "AYA_CV"
            },
            length: 4
        },
        {
            name: "AYA_14",
            southbound: "dependsOnPoint",
            northbound: "AYA_16",
            dependsOnPoint: {
                point: "AYA_A8",
                normal: "AYA_12",
                reverse: "AYA_CV"
            },
            length: 2
        },
        {
            name: "AYA_16",
            southbound: "AYA_14",
            northbound: "TCA_02",
            signals:{
                southbound: "AYA08",
            },
            shuntingPanels: {
                northbound: "ZR4"
            },
            length: 8,
        },
        //VIA 1
        {
            name: "AYA_01",
            southbound: "ALP_13",
            northbound: "AYA_03",
            signals:{
                northbound: "AYA01" //J
            },
            length: 8,
        },
        {
            name: "AYA_03",
            southbound: "AYA_01",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AYA_A1",
                normal: "AYA_05",
                reverse: "AYA_04"
            },
            length: 6
        },
        {
            name: "AYA_05",
            southbound: "dependsOnPoint",
            northbound: "AYA_07",
            dependsOnPoint: {
                point: "AYA_A3",
                normal: "AYA_03",
                reverse: "AYA_06"
            },
            length: 6
        },
        {
            name: "AYA_07",
            southbound: "AYA_05",
            northbound: "AYA_09",
            signals:{
                southbound: "AYA03", //X6
                northbound: "AYA05" //X4
            },
            length: 8
        },
        {
            name: "AYA_09",
            southbound: "AYA_07",
            northbound: "AYA_11",
            length: 6
        },
        {
            name: "AYA_11",
            southbound: "AYA_09",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AYA_A5",
                normal: "AYA_13",
                reverse: "AYA_CV"
            },
            length: 4
        },
        {
            name: "AYA_13",
            southbound: "dependsOnPoint",
            northbound: "AYA_15",
            dependsOnPoint: {
                point: "AYA_A7",
                normal: "AYA_11",
                reverse: "AYA_CV"
            },
            length: 2
        },
        {
            name: "AYA_15",
            southbound: "AYA_13",
            northbound: "TCA_01",
            signals:{
                southbound: "AYA07",
            },
            shuntingPanels: {
                northbound: "ZR3"
            },
            length: 8,
        },
        {
            name: "AYA_CV",
            crossTrackCircuit: true,
            southboundLineSouthboundDirection: "AYA_12",
            southboundLineNorthboundDirection: "AYA_14",
            northboundLineSouthboundDirection: "AYA_11",
            northboundLineNorthboundDirection: "AYA_13",
            length: 2
        },
        //CARRIZALITO
        //VIA 2
        {
            name: "TCA_02",
            southbound: "AYA_16",
            northbound: "TCA_04",
            length: 10
        },
        {
            "name": "TCA_04",
            southbound: "TCA_02",
            northbound: "TCA_06",
            length: 10
        },
        {
            "name": "TCA_06",
            southbound: "TCA_04",
            northbound: "TCA_08",
            signals: {
                northbound: "TCA02" //I12
            },
            length: 10
        },
        {
            "name": "TCA_08",
            southbound: "TCA_06",
            northbound: "TCA_10",
            signals: {
                southbound: "TCA04" //I10
            },
            length: 10
        },
        {

            name: "TCA_10",
            southbound: "TCA_08",
            northbound: "TCA_12",
            length: 10
        },
        {
            "name": "TCA_12",
            southbound: "TCA_10",
            northbound: "TRC_02",
            length: 10
        },
        //VIA 1
        {
            name: "TCA_01",
            southbound: "AYA_15",
            northbound: "TCA_03",
            length: 10
        },
        {
            "name": "TCA_03",
            southbound: "TCA_01",
            northbound: "TCA_05",
            length: 10
        },
        {
            "name": "TCA_05",
            southbound: "TCA_03",
            northbound: "TCA_07",
            signals: {
                northbound: "TCA01" //I1
            },
            length: 10
        },
        {
            "name": "TCA_07",
            southbound: "TCA_05",
            northbound: "TCA_09",
            signals: {
                southbound: "TCA03" //I3
            },
            length: 10
        },
        {
            name: "TCA_09",
            southbound: "TCA_07",
            northbound: "TCA_11",
            length: 10
        },
        {
            "name": "TCA_11",
            southbound: "TCA_09",
            northbound: "TRC_01",
            length: 10
        },
        //RIO CRISTAL
        //VIA 2
        {
            name: "TRC_02",
            southbound: "TCA_12",
            northbound: "TRC_04",
            length: 10
        },
        {
            "name": "TRC_04",
            southbound: "TRC_02",
            northbound: "TRC_06",
            length: 10
        },
        {
            "name": "TRC_06",
            southbound: "TRC_04",
            northbound: "TRC_08",
            signals: {
                northbound: "TRC02" //I8
            },
            length: 10
        },
        {
            "name": "TRC_08",
            southbound: "TRC_06",
            northbound: "TRC_10",
            signals: {
                southbound: "TRC04" //I6
            },
            length: 10
        },
        {
            name: "TRC_10",
            southbound: "TRC_08",
            northbound: "TRC_12",
            length: 10
        },
        {
            "name": "TRC_12",
            southbound: "TRC_10",
            northbound: "TCP_02",
            length: 10
        },
        //VIA 1
        {
            name: "TRC_01",
            southbound: "TCA_11",
            northbound: "TRC_03",
            length: 10
        },
        {
            "name": "TRC_03",
            southbound: "TRC_01",
            northbound: "TRC_05",
            length: 10
        },
        {
            "name": "TRC_05",
            southbound: "TRC_03",
            northbound: "TRC_07",
            signals: {
                northbound: "TRC01" //I5
            },
            length: 10
        },
        {
            "name": "TRC_07",
            southbound: "TRC_05",
            northbound: "TRC_09",
            signals: {
                southbound: "TRC03" //I7
            },
            length: 10
        },
        {
            name: "TRC_09",
            southbound: "TRC_07",
            northbound: "TRC_11",
            length: 10
        },
        {
            "name": "TRC_11",
            southbound: "TRC_09",
            northbound: "TCP_01",
            length: 10
        },
        //CORRAL DE PIEDRA
        //VIA 2
        {
            name: "TCP_02",
            southbound: "TRC_12",
            northbound: "TCP_04",
            length: 10
        },
        {
            "name": "TCP_04",
            southbound: "TCP_02",
            northbound: "TCP_06",
            length: 10
        },
        {
            "name": "TCP_06",
            southbound: "TCP_04",
            northbound: "TCP_08",
            signals: {
                northbound: "TCP02" //I4
            },
            length: 10
        },
        {
            "name": "TCP_08",
            southbound: "TCP_06",
            northbound: "TCP_10",
            signals: {
                southbound: "TCP04" //I2
            },
            length: 10
        },
        {
            name: "TCP_10",
            southbound: "TCP_08",
            northbound: "TCP_12",
            length: 10
        },
        {
            "name": "TCP_12",
            southbound: "TCP_10",
            northbound: "AJU_02",
            length: 10
        },
        //VIA 1
        {
            name: "TCP_01",
            southbound: "TRC_11",
            northbound: "TCP_03",
            length: 10
        },
        {
            "name": "TCP_03",
            southbound: "TCP_01",
            northbound: "TCP_05",
            length: 10
        },
        {
            "name": "TCP_05",
            southbound: "TCP_03",
            northbound: "TCP_07",
            signals: {
                northbound: "TCP01" //I9
            },
            length: 10
        },
        {
            "name": "TCP_07",
            southbound: "TCP_05",
            northbound: "TCP_09",
            signals: {
                southbound: "TCP03" //I11
            },
            length: 10
        },
        {
            name: "TCP_09",
            southbound: "TCP_07",
            northbound: "TCP_11",
            length: 10
        },
        {
            "name": "TCP_11",
            southbound: "TCP_09",
            northbound: "AJU_01",
            length: 10
        },
        //LAS ADJUNTAS
        //VIA 2
        {
            name: "AJU_02",
            southbound: "TCP_12",
            northbound: "AJU_04",
            signals:{
                northbound: "AJU02" //B
            },
            length: 8
        },
        {
            name: "AJU_04",
            southbound: "AJU_02",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AJU_A2",
                normal: "AJU_06",
                reverse: "AJU_CV"
            },
            length: 2
        },
        {
            name: "AJU_06",
            northbound: "AJU_08",
            southbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AJU_A4",
                normal: "AJU_04",
                reverse: "AJU_CV"
            },
            length: 8
        },
        {
            name: "AJU_08",
            southbound: "AJU_06",
            northbound: "AJU_10",
            signals: {
                southbound: "AJU04", //A
                northbound: "AJU06" //N
            },
            length: 8
        },
        {
            name: "AJU_10",
            southbound: "AJU_08",
            northbound: "endOfTrack",
            length: 8
        },
        //VIA 1
        {
            name: "AJU_01",
            southbound: "TCP_11",
            northbound: "AJU_03",
            signals: {
                northbound: "AJU01" //L
            },
            length: 8
        },
        {
            name: "AJU_03",
            southbound: "AJU_01",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AJU_A1",
                normal: "AJU_05",
                reverse: "AJU_CV"
            },
            length: 2
        },
        {
            name: "AJU_05",
            northbound: "AJU_07",
            southbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "AJU_A3",
                normal: "AJU_03",
                reverse: "AJU_CV"
            },
            length: 8
        },
        {
            name: "AJU_07",
            southbound: "AJU_05",
            northbound: "AJU_09",
            signals: {
                southbound: "AJU03", //M
                northbound: "AJU05" //K
            },
            length: 8
        },
        {
            name: "AJU_09",
            southbound: "AJU_07",
            northbound: "endOfTrack",
            length: 8
        },
        {
            name: "AJU_CV",
            crossTrackCircuit: true,
            southboundLineSouthboundDirection: "AJU_04",
            southboundLineNorthboundDirection: "AJU_06",
            northboundLineSouthboundDirection: "AJU_03",
            northboundLineNorthboundDirection: "AJU_05",
            length: 2
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
        },
        {
            name: "AYA_A2",
            trackCircuit: "AYA_04"
        },
        {
            name: "AYA_A4",
            trackCircuit: "AYA_06"
        },
        {
            name: "AYA_A6",
            trackCircuit: "AYA_12"
        },
        {
            name: "AYA_A8",
            trackCircuit: "AYA_14"
        },
        {
            name: "AYA_A1",
            trackCircuit: "AYA_03"
        },
        {
            name: "AYA_A3",
            trackCircuit: "AYA_05"
        },
        {
            name: "AYA_A5",
            trackCircuit: "AYA_11"
        },
        {
            name: "AYA_A7",
            trackCircuit: "AYA_13"
        },
        {
            name: "AJU_A2",
            trackCircuit: "AJU_04"
        },
        {
            name: "AJU_A4",
            trackCircuit: "AJU_06"
        },
        {
            name: "AJU_A1",
            trackCircuit: "AJU_03"
        },
        {
            name: "AJU_A3",
            trackCircuit: "AJU_05"
        },
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
            name: "AYA02",
            direction: "northbound"
        },
        {
            name: "AYA04",
            direction: "southbound"
        },
        {
            name: "AYA06",
            direction: "northbound"
        },
        {
            name: "AYA08",
            direction: "southbound"
        },
        {
            name: "AYA01",
            direction: "northbound"
        },
        {
            name: "AYA03",
            direction: "southbound"
        },
        {
            name: "AYA05",
            direction: "northbound"
        },
        {
            name: "AYA07",
            direction: "southbound"
        },
        {
            name: "TCA02",
            direction: "northbound"
        },
        {
            name: "TCA04",
            direction: "southbound"
        },
        {
            name: "TCA01",
            direction: "northbound"
        },
        {
            name: "TCA03",
            direction: "southbound"
        },
        {
            name: "TRC02",
            direction: "northbound"
        },
        {
            name: "TRC04",
            direction: "southbound"
        },
        {
            name: "TRC01",
            direction: "northbound"
        },
        {
            name: "TRC03",
            direction: "southbound"
        },
        {
            name: "TCP02",
            direction: "northbound"
        },
        {
            name: "TCP04",
            direction: "southbound"
        },
        {
            name: "TCP01",
            direction: "northbound"
        },
        {
            name: "TCP03",
            direction: "southbound"
        },
        {
            name: "AJU02",
            direction: "northbound"
        },
        {
            name: "AJU04",
            direction: "southbound"
        },
        {
            name: "AJU06",
            direction: "northbound"
        },
        {
            name: "AJU01",
            direction: "northbound"
        },
        {
            name: "AJU03",
            direction: "southbound"
        },
        {
            name: "AJU05",
            direction: "northbound"
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
        {
            name: "ZR1",
            direction: "northbound"
        },
        {
            name: "ZR3",
            direction: "northbound"
        },
        {
            name: "ZR5",
            direction: "southbound"
        },
        {
            name: "ZR2",
            direction: "northbound"
        },
        {
            name: "ZR4",
            direction: "northbound"
        },
        {
            name: "ZR6",
            direction: "southbound"
        },
    ],
    platforms: [
        {
            name: "INDEPENDENCIA_V1",
            direction: "southbound",
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
            direction: "northbound",
            northbound: {
                trackCircuit: "IDP_08",
                position: 6
            },
            southbound: {
                trackCircuit: "IDP_08",
                position: 3
            },
        },
        {
            name: "GUAICAIPURO_V1",
            direction: "southbound",
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
            direction: "southbound",
            northbound: {
                trackCircuit: "ALP_05",
                position: 6
            },
            southbound: {
                trackCircuit: "ALP_05",
                position: 3
            },
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
        },
        {
            name: "AYACUCHO_V1",
            direction: "southbound",
            northbound: {
                trackCircuit: "AYA_07",
                position: 6
            },
            southbound: {
                trackCircuit: "AYA_07",
                position: 3
            },
        },
        {
            name: "AYACUCHO_V2",
            direction: "northbound",
            northbound: {
                trackCircuit: "AYA_08",
                position: 6
            },
            southbound: {
                trackCircuit: "AYA_08",
                position: 3
            }
        },
        {
            name: "ADJUNTAS_V1",
            direction: "northbound",
            northbound: {
                trackCircuit: "AJU_07",
                position: 6
            },
            southbound: {
                trackCircuit: "AJU_07",
                position: 3
            },
            terminus: true
        },
        {
            name: "ADJUNTAS_V2",
            direction: "northbound",
            northbound: {
                trackCircuit: "AJU_08",
                position: 6
            },
            southbound: {
                trackCircuit: "AJU_08",
                position: 3
            },
            terminus: true
        }
    ],
}