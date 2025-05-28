"use strict"
//CICLOS DE MANIOBRAS
var interlockingData = {
    cycles: [
        {
            "name": "IDP_1",
            "routes": {
                "entry": {
                    "start": "IDP04",
                    "end": "SP1"
                },
                "exit": {
                    "start": "IDP01",
                    "end": "IDP05"
                }
            }
        },
        {
            "name": "IDP_2",
            "routes": {
                "entry": {
                    "start": "IDP04",
                    "end": "SP2"
                },
                "exit": {
                    "start": "IDP02",
                    "end": "IDP05"
                }
            }
        },
        {
            "name": "ALP_1",
            "routes": {
                "entry": {
                    "start": "ALP05",
                    "end": "SP4",
                },
                "exit": {
                    "start": "ALP08",
                    "end": "ALP04"
                }
            }
        },
        {
            "name": "ALP_2",
            "routes": {
                "entry": {
                    "start": "ALP05",
                    "end": "SP3",
                },
                "exit": {
                    "start": "ALP07",
                    "end": "ALP04"
                }
            }
        }
    ],
    shuntingRoutes: []
}