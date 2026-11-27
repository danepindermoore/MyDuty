/* Demo marker aisle centers are cabin-specific x-coordinates in the 351 diagram viewBox.
 * Diagram cabin colours: Gold = First, Blue = Club World, Red = World Traveller Plus, Yellow = World Traveller.
 */
globalThis.AOR_351 = {
  "aircraftCode": "351",
  "diagram": {
    "image": "../assets/aircraft/351.png",
    "viewBox": {
      "width": 380,
      "height": 818
    },
    "fuselageClipPath": "M190 10 C180 18 172 34 167 58 L157 102 Q153 116 153 136 V684 Q153 728 173 746 Q181 752 190 753 Q199 752 207 746 Q227 728 227 684 V136 Q227 116 223 102 L213 58 C208 34 200 18 190 10 Z",
    "demoPoints": {
      "10": [
        174,
        128
      ],
      "5": [
        204,
        153
      ],
      "12": [
        174,
        199
      ],
      "6": [
        204,
        221
      ],
      "2": [
        174,
        302
      ],
      "9": [
        204,
        302
      ],
      "3": [
        173,
        362
      ],
      "7": [
        204,
        444
      ],
      "4": [
        174,
        520
      ],
      "11": [
        204,
        520
      ]
    },
    "aisleCenterCoordinates": {
      "Club World": {
        "left": 174,
        "right": 204
      },
      "World Traveller Plus": {
        "left": 173,
        "right": 204
      },
      "World Traveller": {
        "left": 174,
        "right": 204
      }
    },
    "positionPanels": {
      "1": {
        "x": 18,
        "y": 33,
        "w": 114,
        "h": 62
      },
      "10": {
        "x": 16,
        "y": 102,
        "w": 114,
        "h": 62
      },
      "2": {
        "x": 17,
        "y": 268,
        "w": 114,
        "h": 63
      },
      "3": {
        "x": 17,
        "y": 495,
        "w": 114,
        "h": 66
      },
      "4": {
        "x": 17,
        "y": 679,
        "w": 114,
        "h": 64
      },
      "11": {
        "x": 17,
        "y": 748,
        "w": 114,
        "h": 60
      },
      "5": {
        "x": 252,
        "y": 31,
        "w": 112,
        "h": 64
      },
      "6": {
        "x": 252,
        "y": 268,
        "w": 112,
        "h": 63
      },
      "9": {
        "x": 252,
        "y": 342,
        "w": 112,
        "h": 64
      },
      "7": {
        "x": 252,
        "y": 495,
        "w": 112,
        "h": 66
      },
      "8": {
        "x": 252,
        "y": 679,
        "w": 112,
        "h": 64
      },
      "12": {
        "x": 252,
        "y": 748,
        "w": 112,
        "h": 64
      }
    }
  },
  "importantInfo": {
    "notes": [
      "WTP Pre-Take Off Service is delivered by the the No. 4 and No. 11.",
      "If No. 3 is GCC position, IFR to be allocated to No. 11."
    ]
  },
  "positions": [
    {
      "number": 1,
      "title": "SCCM - IFM",
      "role": "IFM",
      "displayTitle": "No. 1 (SCCM - IFM)",
      "service": {
        "summary": "Overall responsibility for all cabins, CW cabin serving rows 1 to 7 on aircraft-left",
        "cabin": [
          "CW"
        ]
      },
      "seating": {
        "seat": "D1L",
        "descriptor": "Inboard",
        "facing": "AFT",
        "full": "D1L: Inboard AFT"
      },
      "doorResponsibility": "D1L",
      "demo": {
        "position": "NA",
        "pointsOut": [
          "NA"
        ]
      },
      "aor": {
        "hasAor": false,
        "area": "NA"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "Check the spare crew seat at D1L FWD Facing",
        "Boarding responsibility alongside number 3",
        "Responsible for all cabin PAs"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PO",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "EW",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "MP",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "P.H20",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "ELT",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "NC",
          "qty": 3,
          "locationType": "area"
        },
        {
          "code": "S EXT",
          "qty": 10,
          "locationType": "area"
        }
      ],
      "role2": "SCCM"
    },
    {
      "number": 2,
      "title": "Cabin Crew - GCC 1",
      "role": "Cabin Crew",
      "displayTitle": "No. 2 (Cabin Crew - GCC 1)",
      "service": {
        "summary": "CW cabin serving rows 17 to 8 on aircraft-left",
        "cabin": [
          "CW"
        ]
      },
      "seating": {
        "seat": "D2L",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D2L: AFT"
      },
      "doorResponsibility": "D2L",
      "demo": {
        "position": "Row 15 on aircraft-left",
        "pointsOut": [
          "D3LR followed by D2LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "Club Kitchen / D2L to AFT CW Cabin on aircraft-left"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "NA"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "PO",
          "qty": 4,
          "locationType": "area"
        },
        {
          "code": "TO",
          "qty": 3,
          "locationType": "area"
        }
      ],
      "role2": "GCC 1"
    },
    {
      "number": 3,
      "title": "Cabin Crew - GCC 2",
      "role": "Cabin Crew",
      "displayTitle": "No. 3 (Cabin Crew - GCC 2)",
      "service": {
        "summary": "WTP & WT cabin serving on aircraft-left, Inflight Retail for all cabins",
        "cabin": [
          "WTP",
          "WT"
        ]
      },
      "seating": {
        "seat": "D3L",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D3L: AFT"
      },
      "doorResponsibility": "D3L",
      "demo": {
        "position": "Front of WTP on aircraft-left",
        "pointsOut": [
          "D3LR followed by D2LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "FWD WTP to D3L on aircraft-left, 2 x Toilets at D3L"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "Boarding alongside SCCM",
        "Inflight Retail, If GCC position is allocated to number 3 then IFR is reallocated to number 11"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PO",
          "qty": 3,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "EXT",
          "qty": 10,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "LJ",
          "qty": 10,
          "locationType": "area"
        },
        {
          "code": "EXT",
          "qty": 5,
          "locationType": "area"
        },
        {
          "code": "ILJ",
          "qty": 10,
          "locationType": "area"
        },
        {
          "code": "LCO",
          "qty": 3,
          "locationType": "area"
        }
      ],
      "role2": "GCC 2"
    },
    {
      "number": 4,
      "title": "IFL - Acting SCCM",
      "role": "IFL",
      "displayTitle": "No. 4 (IFL - Acting SCCM)",
      "service": {
        "summary": "Responsible for World Traveller and World Traveller Plus cabins, WT cabin or WT Galley Operator, WTP pre-take off service on aircraft-right",
        "cabin": [
          "WT"
        ]
      },
      "seating": {
        "seat": "D4L",
        "descriptor": "Outboard",
        "facing": "FWD",
        "full": "D4L: Outboard FWD"
      },
      "doorResponsibility": "D4L",
      "demo": {
        "position": "Adjacent to D3L",
        "pointsOut": [
          "D4LR followed by D3LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D3L to D4L on aircraft-left, CCRC and 1 x Toilet at D4L"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "SEP Equipment in CCRC"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PO",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "ET",
          "qty": 2,
          "locationType": "rest"
        },
        {
          "code": "PBE",
          "qty": 2,
          "locationType": "rest"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "rest"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "rest"
        },
        {
          "code": "PO",
          "qty": 1,
          "locationType": "rest"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "rest"
        }
      ],
      "role2": "Acting SCCM"
    },
    {
      "number": 5,
      "title": "Cabin Crew - Galley Operator",
      "role": "Cabin Crew",
      "displayTitle": "No. 5 (Cabin Crew - Galley Operator)",
      "service": {
        "summary": "CW Galley Operator, Flight Crew Service Delivery",
        "cabin": [
          "F"
        ]
      },
      "seating": {
        "seat": "D1R",
        "descriptor": "NA",
        "facing": "FWD",
        "full": "D1R: FWD"
      },
      "doorResponsibility": "D1R",
      "demo": {
        "position": "Row 4 on aircraft-right",
        "pointsOut": [
          "D2LR followed by D1LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "CW Galley, FCRC, 1 x Toilet AFT of the Flight Deck"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "SEP Equipment in FCRC",
        "Door coverage of D1LR when aircraft is on the ground",
        "Boarding at D1L when two doors used for boarding"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PO",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "M2",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "ET",
          "qty": 1,
          "locationType": "rest"
        },
        {
          "code": "PBE",
          "qty": 2,
          "locationType": "rest"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "rest"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "rest"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "rest"
        }
      ],
      "role2": "Galley Operator"
    },
    {
      "number": 6,
      "title": "Cabin Crew",
      "role": "Cabin Crew",
      "displayTitle": "No. 6 (Cabin Crew)",
      "service": {
        "summary": "CW cabin serving rows 17 to 8 on aircraft-right",
        "cabin": [
          "CW"
        ]
      },
      "seating": {
        "seat": "D2R",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D2R: AFT"
      },
      "doorResponsibility": "D2R",
      "demo": {
        "position": "Row 9 on aircraft-right",
        "pointsOut": [
          "D2LR followed by D1LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D1R to D2R on aircraft-right, 1 x Toilet at D2R"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "Door coverage of D2LR if door 2 is not used for boarding"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PO",
          "qty": 3,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "WEX",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "WCH",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "AED",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "M5",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "RES",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "PRM",
          "qty": 1,
          "locationType": "area"
        }
      ]
    },
    {
      "number": 7,
      "title": "Cabin Crew - GCC 3",
      "role": "Cabin Crew",
      "displayTitle": "No. 7 (Cabin Crew - GCC 3)",
      "service": {
        "summary": "WT cabin serving on aircraft-right",
        "cabin": [
          "WT"
        ]
      },
      "seating": {
        "seat": "D3R",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D3R: AFT"
      },
      "doorResponsibility": "D3R",
      "demo": {
        "position": "Front of FWD WT cabin on aircraft-right",
        "pointsOut": [
          "D3LR followed by D2LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "FWD WTP on aircraft-right to D3R, 2 x Toilets at D3R"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "Community Fund / Flying Start Collection",
        "Door coverage of D3LR when aircraft is on the ground"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PO",
          "qty": 4,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "WEX",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "LCO",
          "qty": 9,
          "locationType": "area"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "EXT",
          "qty": 5,
          "locationType": "area"
        },
        {
          "code": "ILJ",
          "qty": 10,
          "locationType": "area"
        }
      ],
      "role2": "GCC 3"
    },
    {
      "number": 8,
      "title": "Cabin Crew - Galley Operator",
      "role": "Cabin Crew",
      "displayTitle": "No. 8 (Cabin Crew - Galley Operator)",
      "service": {
        "summary": "WT Galley Operator if not operated by number 4,Responsible for PRAs and cabin PAs",
        "cabin": [
          "WT"
        ]
      },
      "seating": {
        "seat": "D4R",
        "descriptor": "Outboard",
        "facing": "FWD",
        "full": "D4R: Outboard FWD"
      },
      "doorResponsibility": "D4R",
      "demo": {
        "position": "NA",
        "pointsOut": [
          "NA"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "WT Galley, 1 x Toilet at D4R"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "Door coverage of D4LR when aircraft is on the ground"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "JEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "ELT",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "MP",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "M2",
          "qty": 2,
          "locationType": "area"
        }
      ],
      "role2": "Galley Operator"
    },
    {
      "number": 9,
      "title": "Cabin Crew",
      "role": "Cabin Crew",
      "displayTitle": "No. 9 (Cabin Crew)",
      "service": {
        "summary": "WTP & WT cabin serving on aircraft-right",
        "cabin": [
          "WTP",
          "WT"
        ]
      },
      "seating": {
        "seat": "D2R",
        "descriptor": "NA",
        "facing": "FWD",
        "full": "D2R: FWD"
      },
      "doorResponsibility": "NA",
      "demo": {
        "position": "Row 15 on aircraft-right",
        "pointsOut": [
          "D3LR followed by D2LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D2R to AFT CW cabin on aircraft-right"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "NA"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        }
      ]
    },
    {
      "number": 10,
      "title": "Cabin Crew - GCC 4",
      "role": "Cabin Crew",
      "displayTitle": "No. 10 (Cabin Crew - GCC 4)",
      "service": {
        "summary": "CW cabin serving rows 1 to 7 on aircraft-right",
        "cabin": [
          "CW"
        ]
      },
      "seating": {
        "seat": "D1L",
        "descriptor": "Outboard",
        "facing": "AFT",
        "full": "D1L: Outboard AFT"
      },
      "doorResponsibility": "NA",
      "demo": {
        "position": "Row 1 on aircraft-left",
        "pointsOut": [
          "D2LR followed by D1LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D1L to D2L, 1 x Toilet at D2L"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "NA"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "ILJ",
          "qty": 5,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        }
      ],
      "role2": "GCC 4"
    },
    {
      "number": 11,
      "title": "Cabin Crew",
      "role": "Cabin Crew",
      "displayTitle": "No. 11 (Cabin Crew)",
      "service": {
        "summary": "WT cabin serving on aircraft-left, WTP pre-take off service on aircraft-left",
        "cabin": [
          "WT"
        ]
      },
      "seating": {
        "seat": "D4L",
        "descriptor": "Inboard",
        "facing": "FWD",
        "full": "D4L: Inboard FWD"
      },
      "doorResponsibility": "NA",
      "demo": {
        "position": "Adjacent to D3R",
        "pointsOut": [
          "D4LR followed by D3LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D3R to D4R"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "If GCC position is allocated to number 3 then IFR responsibility is reallocated to number 11"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "area"
        }
      ]
    },
    {
      "number": 12,
      "title": "Cabin Crew",
      "role": "Cabin Crew",
      "displayTitle": "No. 12 (Cabin Crew)",
      "service": {
        "summary": "WT cabin serving on aircraft-right, assists with CW cabin pre-departure service",
        "cabin": [
          "WT"
        ]
      },
      "seating": {
        "seat": "D4R",
        "descriptor": "Inboard",
        "facing": "FWD",
        "full": "D4R: Inboard FWD"
      },
      "doorResponsibility": "NA",
      "demo": {
        "position": "Row 7 on aircraft-left",
        "pointsOut": [
          "D2LR followed by D1LR"
        ]
      },
      "aor": {
        "hasAor": false,
        "area": "NA"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "NA"
      ],
      "equipmentChecks": [
        {
          "code": "ET",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "HVT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "PBE",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "LJ",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FG",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "MRT",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "DEM",
          "qty": 1,
          "locationType": "area"
        }
      ]
    }
  ]
};
