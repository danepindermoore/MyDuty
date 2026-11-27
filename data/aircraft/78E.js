globalThis.AOR_78E = {
  "aircraftCode": "78E",
  "importantInfo": {
    "notes": [
      "With eight crew, No. 6 works in CW from pre-takeoff until the end of the bar service after take-off, then assists with meal delivery in WTP and WT. The IFM decides whether No. 6 works in CW or WTP and WT for second service. No. 6 takes first rest and works in CW during second-rest breaks.",
      "With eight crew and fewer than 100 customers across WTP and WT, No. 6 should remain in CW for both services at the IFM’s discretion.",
      "With nine crew, follow CW standards. No. 6 remains in CW and No. 9 takes over from No. 6 alongside No. 7 on aircraft right in WTP and WT.",
      "If a GCC position is assigned, IFR is allocated to No.8.",
      "Position-level AOR and SEP equipment details should be checked against the current source PDF in Service Documents/Dual_Aisle."
    ]
  },
  "positions": [
    {
      "number": 1,
      "title": "SCCM - IFM",
      "role": "IFM",
      "displayTitle": "No. 1 (SCCM - IFM)",
      "service": {
        "summary": "Overall responsibility for all cabins, CW cabin serving rows 1 to 9 on aircraft-left",
        "cabin": [
          "CW"
        ]
      },
      "seating": {
        "seat": "D1L",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D1L: AFT"
      },
      "doorResponsibility": "D1L",
      "demo": {
        "position": "Row 1 on aircraft-left",
        "pointsOut": [
          "D2LR followed by D1LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D1L to D2L, 1 x Toilet at D1L"
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
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DEM",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "P.H2O",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "MP",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "WEX",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "ELT",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "3PO",
          "qty": 1,
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
        "summary": "CW cabin serving rows 1 to 9 on aircraft-right",
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
        "position": "Row 6 on aircraft-left",
        "pointsOut": [
          "D3LR followed by D2LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "D2L to AFT CW"
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
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
        },
        {
          "code": "DEM",
          "qty": 1,
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
        "summary": "Inflight Retail, Serves WTP and WT with No 4 when No 4 is serving in the cabin. Works from the front of WTP on aircraft left towards the rear, Delivers WTP pre-takeoff service on aircraft-right, If GCC position 2 then IFR is reassigned to No 8",
        "cabin": [
          "WT",
          "WTP"
        ],
        "extraCrew": [
          "No. 9 takes over aircraft-right WTP pre-takeoff service during boarding"
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
        "area": "WTP cabin, FWD WT cabin on aircraft-left, 1 x Toilet at D3L"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "Boarding alongside SCCM, If GCC position is allocated to number 3 then IFR is reallocated to number 8"
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
          "code": "ILJ",
          "qty": 16,
          "locationType": "area"
        },
        {
          "code": "EXT",
          "qty": 12,
          "locationType": "area"
        },
        {
          "code": "PO",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "LC",
          "qty": 4,
          "locationType": "area"
        },
        {
          "code": "LJ",
          "qty": 10,
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
        "summary": "Responsible for WT and WTP, May choose to be the dedicated WT Galley Operator, When serving in the cabin works with No. 3 from the front of WTP on aircraft left towards the rear, Delivers WTP pre-takeoff service on aircraft-left",
        "cabin": [
          "WT",
          "WTP"
        ],
        "extraCrew": [
          "Delivers WTP pre-takeoff service on aircraft left while No. 9 covers aircraft right"
        ]
      },
      "seating": {
        "seat": "D4L",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D4L: AFT"
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
        "area": "AFT WT cabin on aircraft-left, 1 x Toilet at D4L, OFAR"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "SEP Equipment in OFAR"
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
          "qty": 3,
          "locationType": "area"
        },
        {
          "code": "WEX",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "JEM",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "rest"
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
          "CW"
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
        "position": "Row 1 on aircraft-right",
        "pointsOut": [
          "D2LR followed by D1LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "CW Galley, D1R to D2R, OFCR"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "SEP Equipment in OFCR",
        "Boarding at D1L when two doors used for boarding",
        "Door coverage on ground: D1LR"
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
        },
        {
          "code": "PO",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "M2",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "FE",
          "qty": 1,
          "locationType": "rest"
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
          "code": "LJ",
          "qty": 1,
          "locationType": "rest"
        }
      ],
      "role2": "Galley Operator"
    },
    {
      "number": 6,
      "title": "Cabin Crew - GCC 4",
      "role": "Cabin Crew",
      "displayTitle": "No. 6 (Cabin Crew - GCC 4)",
      "service": {
        "summary": "CW pre-departure & bar round, WT & WTP meal delivery alongside No 7 from the front of WTP on aircraft right towards the rear, Works in either Club World or WTP and WT for second service at the IFM’s discretion, Should remain in Club World for both services at the IFM’s discretion when the combined WTP and WT load is under 100 customers, Covers Club World during 2nd rest",
        "cabin": [
          "CW"
        ],
        "extraCrew": [
          "Remains in Club World while No. 9 takes over in WTP and WT"
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
        "position": "Row 6 on aircraft-right",
        "pointsOut": [
          "D3LR followed by D2LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "MID CW Galley, D2R to AFT CW, 1 x Toilet at D2R"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "Door coverage on ground: D2LR"
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
          "code": "FE",
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
          "code": "EW",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "NC",
          "qty": 5,
          "locationType": "area"
        },
        {
          "code": "WCH",
          "qty": 1,
          "locationType": "area"
        },
        {
          "code": "S EXT",
          "qty": 8,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "PRM",
          "qty": 1,
          "locationType": "area"
        }
      ],
      "role2": "GCC 4"
    },
    {
      "number": 7,
      "title": "Cabin Crew - GCC 3",
      "role": "Cabin Crew",
      "displayTitle": "No. 7 (Cabin Crew - GCC 3)",
      "service": {
        "summary": "Community Fund / Flying Start, Serves WTP and WT from the front of WTP on aircraft right towards the rear",
        "cabin": [
          "WT",
          "WTP"
        ],
        "extraCrew": [
          "Works with No. 9 on aircraft right"
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
        "area": "WT cabin (FWD & AFT) on aircraft-right, 2 x Toilets at D3R"
      },
      "rest": "1st Rest",
      "additionalResponsibilities": [
        "Door coverage on ground: D3LR"
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
        },
        {
          "code": "PO",
          "qty": 2,
          "locationType": "area"
        },
        {
          "code": "LC",
          "qty": 4,
          "locationType": "area"
        },
        {
          "code": "SP",
          "qty": 2,
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
        "summary": "Galley Operator if not No 4, Responsible for PRAs and cabin Pas, If GCC position 2 assigned to No 5 then IFR reassigned to No 8",
        "cabin": [
          "WT",
          "WTP"
        ]
      },
      "seating": {
        "seat": "D4R",
        "descriptor": "NA",
        "facing": "AFT",
        "full": "D4R: AFT"
      },
      "doorResponsibility": "D4R",
      "demo": {
        "position": "Adjacent to D3R",
        "pointsOut": [
          "D4LR followed by D3LR"
        ]
      },
      "aor": {
        "hasAor": true,
        "area": "WT Galley"
      },
      "rest": "2nd Rest",
      "additionalResponsibilities": [
        "If GCC position is allocated to number 3 then IFR responsibility is reallocated to number 8",
        "Door coverage on ground: D4LR"
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
          "code": "DDC",
          "qty": 1,
          "locationType": "seat"
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
        "summary": "NA",
        "cabin": [
          "WT",
          "WTP"
        ],
        "extraCrew": [
          "Delivers WTP pre-takeoff service on aircraft right during boarding while No. 4 covers aircraft left",
          "Takes over from No. 6 and serves with No. 7 from the front of WTP on aircraft right towards the rear",
          "No. 6 remains in Club World"
        ]
      },
      "seating": {
        "seat": "D1L",
        "descriptor": "NA",
        "facing": "FWD",
        "full": "D1L: FWD"
      },
      "doorResponsibility": "NA",
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
        "NA"
      ],
      "equipmentChecks": [
        {
          "code": "NA",
          "qty": 1,
          "locationType": "area"
        }
      ]
    }
  ]
};
