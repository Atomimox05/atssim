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
                    "end": "ZR2",
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
                    "end": "ZR1",
                },
                "exit": {
                    "start": "ALP07",
                    "end": "ALP04"
                }
            }
        },
        {
            "name": "AYA_1",
            "routes": {
                "entry": {
                    "start": "AYA05",
                    "end": "ZR3",
                },
                "exit": {
                    "start": "AYA07",
                    "end": "AYA04"
                }
            }
        },
        {
            "name": "AYA_2",
            "routes": {
                "entry": {
                    "start": "AYA05",
                    "end": "ZR4",
                },
                "exit": {
                    "start": "AYA08",
                    "end": "AYA04"
                }
            }
        },
        {
            "name": "AYA_3",
            "routes": {
                "entry": {
                    "start": "AYA08",
                    "end": "AYA03",
                },
                "exit": {
                    "start": "AYA05",
                    "end": "TCA01"
                }
            }
        },
        {
            "name": "AYA_4",
            "routes": {
                "entry": {
                    "start": "AYA08",
                    "end": "AYA04",
                },
                "exit": {
                    "start": "AYA06",
                    "end": "TCA01"
                }
            }
        },
        {
            "name": "AJU_1",
            "routes": {
                "entry": {
                    "start": "AJU01",
                    "end": "AJU05",
                },
                "exit": {
                    "start": "AJU03",
                    "end": "TCP04"
                }
            }
        },
        {
            "name": "AJU_2",
            "routes": {
                "entry": {
                    "start": "AJU01",
                    "end": "AJU06",
                },
                "exit": {
                    "start": "AJU04",
                    "end": "TCP04"
                }
            }
        }
    ],
    shuntingRoutes: [
        {
            "entry": {
                "start": "ALP05",
                "end": "ZR2"
            },
            "exit": {
                "start": "ALP08",
                "end": "ALP04"
            }
        },
        {
            "entry": {
                "start": "ALP05",
                "end": "ZR1"
            },
            "exit": {
                "start": "ALP07",
                "end": "ALP04"
            }
        },
        {
            "entry": {
                "start": "AYA05",
                "end": "ZR3"
            },
            "exit": {
                "start": "AYA07",
                "end": "AYA04"
            }
        },
        {
            "entry": {
                "start": "AYA05",
                "end": "ZR4"
            },
            "exit": {
                "start": "AYA08",
                "end": "AYA04"
            }
        },
        {
            "entry": {
                "start": "AJU03",
                "end": "ZR6"
            },
            "exit": {
                "start": "AJU02",
                "end": "AJU06"
            }
        },
        {
            "entry": {
                "start": "AJU04",
                "end": "ZR5"
            },
            "exit": {
                "start": "AJU01",
                "end": "AJU05"
            }
        },
    ]
}