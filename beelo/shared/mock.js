/* BEELO + Hive mock data. ALL DATA IS INVENTED SAMPLE DATA. Not live MLS. Generated; do not hand-edit.
   Lookup helpers: MOCK.byId(collection, id), MOCK.doorLabel(door), MOCK.cardFeeFor(amount). */
window.MOCK = {
 "generatedFor": "BEELO + Hive pitch prototypes",
 "isSample": true,
 "now": "2026-11-26T21:00:00.000Z",
 "agent": {
  "id": "ag1",
  "name": "Jordan Ellis",
  "brokerage": "Ellis Realty Group",
  "phone": "(214) 555-0148",
  "twilioNumber": "(469) 555-0199",
  "email": "jordan@ellisrealty.example",
  "doors": 23,
  "plan": "Hive",
  "stripeConnected": true,
  "quietHours": {
   "start": "21:00",
   "end": "08:00"
  }
 },
 "owners": [
  {
   "id": "o1",
   "name": "Marcus Bell",
   "email": "marcus@owner.example",
   "phone": "(972) 555-0110",
   "spendLimit": 300,
   "feeMode": "addon",
   "doorIds": [
    "d1",
    "d18"
   ]
  },
  {
   "id": "o2",
   "name": "Priya Natarajan",
   "email": "priya@owner.example",
   "phone": "(972) 555-0111",
   "spendLimit": 500,
   "feeMode": "included",
   "doorIds": [
    "d2",
    "d16"
   ]
  },
  {
   "id": "o3",
   "name": "Dale & Rita Hughes",
   "email": "dale@owner.example",
   "phone": "(972) 555-0112",
   "spendLimit": 500,
   "feeMode": "included",
   "doorIds": [
    "d3",
    "d19"
   ]
  },
  {
   "id": "o4",
   "name": "Sofia Alvarez",
   "email": "sofia@owner.example",
   "phone": "(972) 555-0113",
   "spendLimit": 750,
   "feeMode": "addon",
   "doorIds": [
    "d4",
    "d21"
   ]
  },
  {
   "id": "o5",
   "name": "Ken Watanabe",
   "email": "ken@owner.example",
   "phone": "(972) 555-0114",
   "spendLimit": 1000,
   "feeMode": "included",
   "doorIds": [
    "d5",
    "d15",
    "d17"
   ]
  },
  {
   "id": "o6",
   "name": "Lorraine Pike",
   "email": "lorraine@owner.example",
   "phone": "(972) 555-0115",
   "spendLimit": 300,
   "feeMode": "included",
   "doorIds": [
    "d6",
    "d13",
    "d22"
   ]
  },
  {
   "id": "o7",
   "name": "Andre Thomas",
   "email": "andre@owner.example",
   "phone": "(972) 555-0116",
   "spendLimit": 500,
   "feeMode": "addon",
   "doorIds": [
    "d7",
    "d14"
   ]
  },
  {
   "id": "o8",
   "name": "Beth Calloway",
   "email": "beth@owner.example",
   "phone": "(972) 555-0117",
   "spendLimit": 500,
   "feeMode": "included",
   "doorIds": [
    "d8"
   ]
  },
  {
   "id": "o9",
   "name": "Omar Haddad",
   "email": "omar@owner.example",
   "phone": "(972) 555-0118",
   "spendLimit": 750,
   "feeMode": "included",
   "doorIds": [
    "d9"
   ]
  },
  {
   "id": "o10",
   "name": "Grace Lindqvist",
   "email": "grace@owner.example",
   "phone": "(972) 555-0119",
   "spendLimit": 1000,
   "feeMode": "addon",
   "doorIds": [
    "d10",
    "d23"
   ]
  },
  {
   "id": "o11",
   "name": "Tyrone Banks",
   "email": "tyrone@owner.example",
   "phone": "(972) 555-0120",
   "spendLimit": 300,
   "feeMode": "included",
   "doorIds": [
    "d11"
   ]
  },
  {
   "id": "o12",
   "name": "Helen Ochoa",
   "email": "helen@owner.example",
   "phone": "(972) 555-0121",
   "spendLimit": 500,
   "feeMode": "included",
   "doorIds": [
    "d12",
    "d20"
   ]
  }
 ],
 "doors": [
  {
   "id": "d1",
   "address": "2417 Legacy Oak Dr",
   "unit": "",
   "city": "Frisco",
   "state": "TX",
   "zip": "75034",
   "beds": 2,
   "baths": 2,
   "sqft": 1957,
   "yearBuilt": 2000,
   "rent": 3200,
   "ownerId": "o1",
   "tenantIds": [
    "t1"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 443000,
    "low": 416000,
    "high": 470000,
    "change12mo": -0.23,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 383000,
   "purchaseYear": 2017,
   "annualTax": 9303,
   "annualInsurance": 2343,
   "mgmtFeePct": 8
  },
  {
   "id": "d2",
   "address": "8024 Coral Ridge Ln",
   "unit": "",
   "city": "Frisco",
   "state": "TX",
   "zip": "75034",
   "beds": 2,
   "baths": 2,
   "sqft": 1832,
   "yearBuilt": 2003,
   "rent": 3050,
   "ownerId": "o2",
   "tenantIds": [
    "t2"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 425000,
    "low": 400000,
    "high": 451000,
    "change12mo": 0.21,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 290000,
   "purchaseYear": 2013,
   "annualTax": 8925,
   "annualInsurance": 2053,
   "mgmtFeePct": 8
  },
  {
   "id": "d3",
   "address": "7531 Panther Creek Pkwy",
   "unit": "",
   "city": "Frisco",
   "state": "TX",
   "zip": "75034",
   "beds": 2,
   "baths": 2,
   "sqft": 2042,
   "yearBuilt": 2013,
   "rent": 3125,
   "ownerId": "o3",
   "tenantIds": [
    "t3"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 434000,
    "low": 408000,
    "high": 460000,
    "change12mo": -1.3,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 328000,
   "purchaseYear": 2013,
   "annualTax": 9114,
   "annualInsurance": 2808,
   "mgmtFeePct": 8
  },
  {
   "id": "d4",
   "address": "2154 Cottonwood Bend",
   "unit": "",
   "city": "McKinney",
   "state": "TX",
   "zip": "75070",
   "beds": 3,
   "baths": 2,
   "sqft": 2291,
   "yearBuilt": 1988,
   "rent": 3400,
   "ownerId": "o4",
   "tenantIds": [
    "t4"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 473000,
    "low": 445000,
    "high": 501000,
    "change12mo": -1.79,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 411000,
   "purchaseYear": 2021,
   "annualTax": 9933,
   "annualInsurance": 2700,
   "mgmtFeePct": 8
  },
  {
   "id": "d5",
   "address": "3129 Stacy Ridge Ct",
   "unit": "",
   "city": "McKinney",
   "state": "TX",
   "zip": "75070",
   "beds": 3,
   "baths": 2,
   "sqft": 2380,
   "yearBuilt": 2000,
   "rent": 3750,
   "ownerId": "o5",
   "tenantIds": [
    "t5"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 520000,
    "low": 489000,
    "high": 551000,
    "change12mo": 0.4,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 368000,
   "purchaseYear": 2018,
   "annualTax": 10920,
   "annualInsurance": 2109,
   "mgmtFeePct": 8
  },
  {
   "id": "d6",
   "address": "4093 Willow Glen Dr",
   "unit": "",
   "city": "Plano",
   "state": "TX",
   "zip": "75024",
   "beds": 2,
   "baths": 2,
   "sqft": 1958,
   "yearBuilt": 1999,
   "rent": 2625,
   "ownerId": "o6",
   "tenantIds": [
    "t6"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 364000,
    "low": 342000,
    "high": 386000,
    "change12mo": -0.26,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 232000,
   "purchaseYear": 2021,
   "annualTax": 7644,
   "annualInsurance": 2365,
   "mgmtFeePct": 8
  },
  {
   "id": "d7",
   "address": "6273 Brookstone Way",
   "unit": "",
   "city": "Plano",
   "state": "TX",
   "zip": "75024",
   "beds": 2,
   "baths": 2,
   "sqft": 2097,
   "yearBuilt": 1994,
   "rent": 3100,
   "ownerId": "o7",
   "tenantIds": [
    "t7"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 431000,
    "low": 405000,
    "high": 457000,
    "change12mo": 2.89,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 374000,
   "purchaseYear": 2013,
   "annualTax": 9051,
   "annualInsurance": 2558,
   "mgmtFeePct": 8
  },
  {
   "id": "d8",
   "address": "1667 Parkhaven Ln",
   "unit": "Unit B",
   "city": "Plano",
   "state": "TX",
   "zip": "75024",
   "beds": 3,
   "baths": 2,
   "sqft": 2281,
   "yearBuilt": 2015,
   "rent": 3725,
   "ownerId": "o8",
   "tenantIds": [
    "t8"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 518000,
    "low": 487000,
    "high": 549000,
    "change12mo": 5.25,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 334000,
   "purchaseYear": 2012,
   "annualTax": 10878,
   "annualInsurance": 1788,
   "mgmtFeePct": 8
  },
  {
   "id": "d9",
   "address": "4559 Bluestem Trl",
   "unit": "",
   "city": "Allen",
   "state": "TX",
   "zip": "75013",
   "beds": 3,
   "baths": 2,
   "sqft": 2264,
   "yearBuilt": 2005,
   "rent": 3150,
   "ownerId": "o9",
   "tenantIds": [
    "t9"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 436000,
    "low": 410000,
    "high": 462000,
    "change12mo": -1.07,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 378000,
   "purchaseYear": 2015,
   "annualTax": 9156,
   "annualInsurance": 2676,
   "mgmtFeePct": 8
  },
  {
   "id": "d10",
   "address": "4204 Ridgeview Cir",
   "unit": "",
   "city": "Allen",
   "state": "TX",
   "zip": "75013",
   "beds": 2,
   "baths": 2,
   "sqft": 1999,
   "yearBuilt": 2002,
   "rent": 3450,
   "ownerId": "o10",
   "tenantIds": [
    "t10"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 478000,
    "low": 449000,
    "high": 507000,
    "change12mo": 6.29,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 352000,
   "purchaseYear": 2021,
   "annualTax": 10038,
   "annualInsurance": 2048,
   "mgmtFeePct": 8
  },
  {
   "id": "d11",
   "address": "5005 Lantana Hill Rd",
   "unit": "",
   "city": "Prosper",
   "state": "TX",
   "zip": "75078",
   "beds": 4,
   "baths": 2.5,
   "sqft": 2759,
   "yearBuilt": 2016,
   "rent": 4500,
   "ownerId": "o11",
   "tenantIds": [
    "t11"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 626000,
    "low": 588000,
    "high": 664000,
    "change12mo": 2.78,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 436000,
   "purchaseYear": 2015,
   "annualTax": 13146,
   "annualInsurance": 2036,
   "mgmtFeePct": 8
  },
  {
   "id": "d12",
   "address": "653 Gentle Creek Ct",
   "unit": "",
   "city": "Prosper",
   "state": "TX",
   "zip": "75078",
   "beds": 3,
   "baths": 2,
   "sqft": 2320,
   "yearBuilt": 2004,
   "rent": 3675,
   "ownerId": "o12",
   "tenantIds": [
    "t12"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 512000,
    "low": 481000,
    "high": 543000,
    "change12mo": 2.11,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 319000,
   "purchaseYear": 2019,
   "annualTax": 10752,
   "annualInsurance": 2144,
   "mgmtFeePct": 8
  },
  {
   "id": "d13",
   "address": "2674 Mockingbird Run",
   "unit": "",
   "city": "Denton",
   "state": "TX",
   "zip": "76201",
   "beds": 3,
   "baths": 2,
   "sqft": 2430,
   "yearBuilt": 2001,
   "rent": 3225,
   "ownerId": "o6",
   "tenantIds": [
    "t13"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 447000,
    "low": 420000,
    "high": 474000,
    "change12mo": 0.19,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 318000,
   "purchaseYear": 2019,
   "annualTax": 9387,
   "annualInsurance": 2910,
   "mgmtFeePct": 8
  },
  {
   "id": "d14",
   "address": "1208 Hickory Bend",
   "unit": "",
   "city": "Denton",
   "state": "TX",
   "zip": "76201",
   "beds": 2,
   "baths": 2,
   "sqft": 1943,
   "yearBuilt": 2001,
   "rent": 3250,
   "ownerId": "o7",
   "tenantIds": [
    "t14"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 452000,
    "low": 425000,
    "high": 479000,
    "change12mo": -0.84,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 372000,
   "purchaseYear": 2015,
   "annualTax": 9492,
   "annualInsurance": 1707,
   "mgmtFeePct": 8
  },
  {
   "id": "d15",
   "address": "2863 Duck Pond Ln",
   "unit": "",
   "city": "Garland",
   "state": "TX",
   "zip": "75040",
   "beds": 3,
   "baths": 2,
   "sqft": 2250,
   "yearBuilt": 2008,
   "rent": 3125,
   "ownerId": "o5",
   "tenantIds": [
    "t15"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 434000,
    "low": 408000,
    "high": 460000,
    "change12mo": -0.16,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 300000,
   "purchaseYear": 2021,
   "annualTax": 9114,
   "annualInsurance": 1875,
   "mgmtFeePct": 8
  },
  {
   "id": "d16",
   "address": "3251 Cedar Elm St",
   "unit": "Unit B",
   "city": "Richardson",
   "state": "TX",
   "zip": "75080",
   "beds": 3,
   "baths": 2,
   "sqft": 2304,
   "yearBuilt": 1995,
   "rent": 3825,
   "ownerId": "o2",
   "tenantIds": [
    "t16"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 530000,
    "low": 498000,
    "high": 562000,
    "change12mo": 0.69,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 351000,
   "purchaseYear": 2021,
   "annualTax": 11130,
   "annualInsurance": 2616,
   "mgmtFeePct": 8
  },
  {
   "id": "d17",
   "address": "2680 Pecan Hollow",
   "unit": "",
   "city": "Richardson",
   "state": "TX",
   "zip": "75080",
   "beds": 3,
   "baths": 2,
   "sqft": 2305,
   "yearBuilt": 2001,
   "rent": 3475,
   "ownerId": "o5",
   "tenantIds": [
    "t17"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 482000,
    "low": 453000,
    "high": 511000,
    "change12mo": 1.68,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 351000,
   "purchaseYear": 2015,
   "annualTax": 10122,
   "annualInsurance": 2094,
   "mgmtFeePct": 8
  },
  {
   "id": "d18",
   "address": "3190 Lakeshore Vista",
   "unit": "",
   "city": "Little Elm",
   "state": "TX",
   "zip": "75068",
   "beds": 2,
   "baths": 2,
   "sqft": 2018,
   "yearBuilt": 2006,
   "rent": 2950,
   "ownerId": "o1",
   "tenantIds": [
    "t18"
   ],
   "status": "occupied",
   "valuation": {
    "estimate": 411000,
    "low": 386000,
    "high": 436000,
    "change12mo": -0.27,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 344000,
   "purchaseYear": 2021,
   "annualTax": 8631,
   "annualInsurance": 2951,
   "mgmtFeePct": 8
  },
  {
   "id": "d19",
   "address": "7767 Sandpiper Pt",
   "unit": "",
   "city": "Little Elm",
   "state": "TX",
   "zip": "75068",
   "beds": 4,
   "baths": 2.5,
   "sqft": 2569,
   "yearBuilt": 2015,
   "rent": 3900,
   "ownerId": "o3",
   "tenantIds": [],
   "status": "vacant",
   "valuation": {
    "estimate": 541000,
    "low": 509000,
    "high": 573000,
    "change12mo": 6.86,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 382000,
   "purchaseYear": 2018,
   "annualTax": 11361,
   "annualInsurance": 2544,
   "mgmtFeePct": 8
  },
  {
   "id": "d20",
   "address": "8685 Bowie Mill Rd",
   "unit": "",
   "city": "Arlington",
   "state": "TX",
   "zip": "76010",
   "beds": 4,
   "baths": 2.5,
   "sqft": 2536,
   "yearBuilt": 1992,
   "rent": 4075,
   "ownerId": "o12",
   "tenantIds": [],
   "status": "vacant",
   "valuation": {
    "estimate": 565000,
    "low": 531000,
    "high": 599000,
    "change12mo": 1.32,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 356000,
   "purchaseYear": 2017,
   "annualTax": 11865,
   "annualInsurance": 1845,
   "mgmtFeePct": 8
  },
  {
   "id": "d21",
   "address": "2005 Sycamore Bluff",
   "unit": "",
   "city": "Fort Worth",
   "state": "TX",
   "zip": "76137",
   "beds": 3,
   "baths": 2,
   "sqft": 2196,
   "yearBuilt": 1999,
   "rent": 3650,
   "ownerId": "o4",
   "tenantIds": [],
   "status": "vacant",
   "valuation": {
    "estimate": 506000,
    "low": 476000,
    "high": 536000,
    "change12mo": 4.71,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 366000,
   "purchaseYear": 2021,
   "annualTax": 10626,
   "annualInsurance": 2405,
   "mgmtFeePct": 8
  },
  {
   "id": "d22",
   "address": "4148 Ranch Gate Rd",
   "unit": "",
   "city": "Fort Worth",
   "state": "TX",
   "zip": "76137",
   "beds": 3,
   "baths": 2,
   "sqft": 2341,
   "yearBuilt": 1990,
   "rent": 4050,
   "ownerId": "o6",
   "tenantIds": [],
   "status": "make-ready",
   "valuation": {
    "estimate": 563000,
    "low": 529000,
    "high": 597000,
    "change12mo": 4.78,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 370000,
   "purchaseYear": 2017,
   "annualTax": 11823,
   "annualInsurance": 2449,
   "mgmtFeePct": 8
  },
  {
   "id": "d23",
   "address": "4338 Trinity Mills Ct",
   "unit": "",
   "city": "Carrollton",
   "state": "TX",
   "zip": "75006",
   "beds": 3,
   "baths": 2,
   "sqft": 2266,
   "yearBuilt": 2010,
   "rent": 3100,
   "ownerId": "o10",
   "tenantIds": [],
   "status": "make-ready",
   "valuation": {
    "estimate": 432000,
    "low": 406000,
    "high": 458000,
    "change12mo": 2.58,
    "asOf": "2026-11-01",
    "label": "Estimate, not an appraisal"
   },
   "purchasePrice": 274000,
   "purchaseYear": 2018,
   "annualTax": 9072,
   "annualInsurance": 2544,
   "mgmtFeePct": 8
  }
 ],
 "tenants": [
  {
   "id": "t1",
   "name": "Aaliyah Brooks",
   "doorId": "d1",
   "phone": "(214) 555-0210",
   "email": "aaliyah@tenant.example",
   "leaseStart": "2025-01-01",
   "leaseEnd": "2026-01-01",
   "rent": 3200,
   "balance": 0,
   "autopay": false
  },
  {
   "id": "t2",
   "name": "Chris Delgado",
   "doorId": "d2",
   "phone": "(214) 555-0211",
   "email": "chris@tenant.example",
   "leaseStart": "2026-02-01",
   "leaseEnd": "2027-02-01",
   "rent": 3050,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t3",
   "name": "Mei Chen",
   "doorId": "d3",
   "phone": "(214) 555-0212",
   "email": "mei@tenant.example",
   "leaseStart": "2025-03-01",
   "leaseEnd": "2026-03-01",
   "rent": 3125,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t4",
   "name": "Jamal Wright",
   "doorId": "d4",
   "phone": "(214) 555-0213",
   "email": "jamal@tenant.example",
   "leaseStart": "2026-04-01",
   "leaseEnd": "2027-04-01",
   "rent": 3400,
   "balance": 3400,
   "autopay": false
  },
  {
   "id": "t5",
   "name": "Erin O’Neal",
   "doorId": "d5",
   "phone": "(214) 555-0214",
   "email": "erin@tenant.example",
   "leaseStart": "2025-05-01",
   "leaseEnd": "2026-05-01",
   "rent": 3750,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t6",
   "name": "Luis Romero",
   "doorId": "d6",
   "phone": "(214) 555-0215",
   "email": "luis@tenant.example",
   "leaseStart": "2026-06-01",
   "leaseEnd": "2027-06-01",
   "rent": 2625,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t7",
   "name": "Tasha Greene",
   "doorId": "d7",
   "phone": "(214) 555-0216",
   "email": "tasha@tenant.example",
   "leaseStart": "2025-07-01",
   "leaseEnd": "2026-07-01",
   "rent": 3100,
   "balance": 0,
   "autopay": false
  },
  {
   "id": "t8",
   "name": "Nate Fowler",
   "doorId": "d8",
   "phone": "(214) 555-0217",
   "email": "nate@tenant.example",
   "leaseStart": "2026-08-01",
   "leaseEnd": "2027-08-01",
   "rent": 3725,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t9",
   "name": "Hannah Kim",
   "doorId": "d9",
   "phone": "(214) 555-0218",
   "email": "hannah@tenant.example",
   "leaseStart": "2025-09-01",
   "leaseEnd": "2026-09-01",
   "rent": 3150,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t10",
   "name": "Victor Osei",
   "doorId": "d10",
   "phone": "(214) 555-0219",
   "email": "victor@tenant.example",
   "leaseStart": "2026-01-01",
   "leaseEnd": "2027-01-01",
   "rent": 3450,
   "balance": 0,
   "autopay": false
  },
  {
   "id": "t11",
   "name": "Brianna Cole",
   "doorId": "d11",
   "phone": "(214) 555-0220",
   "email": "brianna@tenant.example",
   "leaseStart": "2025-02-01",
   "leaseEnd": "2026-02-01",
   "rent": 4500,
   "balance": 4500,
   "autopay": true
  },
  {
   "id": "t12",
   "name": "Sam Patel",
   "doorId": "d12",
   "phone": "(214) 555-0221",
   "email": "sam@tenant.example",
   "leaseStart": "2026-03-01",
   "leaseEnd": "2027-03-01",
   "rent": 3675,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t13",
   "name": "Kayla Moreno",
   "doorId": "d13",
   "phone": "(214) 555-0222",
   "email": "kayla@tenant.example",
   "leaseStart": "2025-04-01",
   "leaseEnd": "2026-04-01",
   "rent": 3225,
   "balance": 0,
   "autopay": false
  },
  {
   "id": "t14",
   "name": "Derek Shaw",
   "doorId": "d14",
   "phone": "(214) 555-0223",
   "email": "derek@tenant.example",
   "leaseStart": "2026-05-01",
   "leaseEnd": "2027-05-01",
   "rent": 3250,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t15",
   "name": "Imani Ford",
   "doorId": "d15",
   "phone": "(214) 555-0224",
   "email": "imani@tenant.example",
   "leaseStart": "2025-06-01",
   "leaseEnd": "2026-06-01",
   "rent": 3125,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t16",
   "name": "Paul Nguyen",
   "doorId": "d16",
   "phone": "(214) 555-0225",
   "email": "paul@tenant.example",
   "leaseStart": "2026-07-01",
   "leaseEnd": "2027-07-01",
   "rent": 3825,
   "balance": 0,
   "autopay": false
  },
  {
   "id": "t17",
   "name": "Rosa Jimenez",
   "doorId": "d17",
   "phone": "(214) 555-0226",
   "email": "rosa@tenant.example",
   "leaseStart": "2025-08-01",
   "leaseEnd": "2026-08-01",
   "rent": 3475,
   "balance": 0,
   "autopay": true
  },
  {
   "id": "t18",
   "name": "Ty Henderson",
   "doorId": "d18",
   "phone": "(214) 555-0227",
   "email": "ty@tenant.example",
   "leaseStart": "2026-09-01",
   "leaseEnd": "2027-09-01",
   "rent": 2950,
   "balance": 2950,
   "autopay": true
  }
 ],
 "vendors": [
  {
   "id": "v1",
   "name": "Lone Star Plumbing",
   "trade": "Plumbing",
   "rating": 4.8,
   "avgResponseMin": 11,
   "insuranceOnFile": true,
   "insuranceExp": "2027-03-31",
   "phone": "(214) 555-0301",
   "emergency": true
  },
  {
   "id": "v2",
   "name": "BlueBonnet Rooter",
   "trade": "Plumbing",
   "rating": 4.5,
   "avgResponseMin": 18,
   "insuranceOnFile": true,
   "insuranceExp": "2027-01-15",
   "phone": "(972) 555-0302",
   "emergency": true
  },
  {
   "id": "v3",
   "name": "Trinity Drain & Pipe",
   "trade": "Plumbing",
   "rating": 4.2,
   "avgResponseMin": 24,
   "insuranceOnFile": true,
   "insuranceExp": "2026-12-20",
   "phone": "(469) 555-0303",
   "emergency": true
  },
  {
   "id": "v4",
   "name": "North Texas Air",
   "trade": "HVAC",
   "rating": 4.7,
   "avgResponseMin": 14,
   "insuranceOnFile": true,
   "insuranceExp": "2027-05-01",
   "phone": "(214) 555-0304",
   "emergency": true
  },
  {
   "id": "v5",
   "name": "Sparks Electric Co.",
   "trade": "Electrical",
   "rating": 4.6,
   "avgResponseMin": 20,
   "insuranceOnFile": true,
   "insuranceExp": "2027-02-28",
   "phone": "(972) 555-0305",
   "emergency": true
  },
  {
   "id": "v6",
   "name": "Handy Hank Services",
   "trade": "General",
   "rating": 4.4,
   "avgResponseMin": 35,
   "insuranceOnFile": false,
   "insuranceExp": null,
   "phone": "(469) 555-0306",
   "emergency": false
  },
  {
   "id": "v7",
   "name": "Prairie Appliance Repair",
   "trade": "Appliance",
   "rating": 4.3,
   "avgResponseMin": 40,
   "insuranceOnFile": true,
   "insuranceExp": "2027-04-10",
   "phone": "(214) 555-0307",
   "emergency": false
  },
  {
   "id": "v8",
   "name": "SecureLock Locksmith",
   "trade": "Locksmith",
   "rating": 4.9,
   "avgResponseMin": 9,
   "insuranceOnFile": true,
   "insuranceExp": "2027-06-30",
   "phone": "(972) 555-0308",
   "emergency": true
  }
 ],
 "tickets": [
  {
   "id": "HV-1040",
   "title": "Kitchen sink leaking under cabinet",
   "trade": "Plumbing",
   "urgency": "normal",
   "status": "new",
   "doorId": "d1",
   "tenantId": "t1",
   "ownerId": "o1",
   "vendorId": null,
   "description": "Kitchen sink leaking under cabinet. Reported by Aaliyah.",
   "photos": [
    {
     "kind": "leak",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 48,
   "openedAt": "2026-11-26T19:00:00.000Z",
   "updatedAt": "2026-11-26T20:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-26T19:00:00.000Z",
     "who": "Aaliyah Brooks",
     "text": "Opened ticket with photo"
    }
   ]
  },
  {
   "id": "HV-1041",
   "title": "AC not cooling upstairs",
   "trade": "HVAC",
   "urgency": "high",
   "status": "new",
   "doorId": "d2",
   "tenantId": "t2",
   "ownerId": "o2",
   "vendorId": null,
   "description": "AC not cooling upstairs. Reported by Chris.",
   "photos": [
    {
     "kind": "ac",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 74,
   "openedAt": "2026-11-26T06:00:00.000Z",
   "updatedAt": "2026-11-26T09:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-26T06:00:00.000Z",
     "who": "Chris Delgado",
     "text": "Opened ticket with photo"
    }
   ]
  },
  {
   "id": "HV-1042",
   "title": "Burst pipe in laundry room",
   "trade": "Plumbing",
   "urgency": "emergency",
   "status": "new",
   "doorId": "d3",
   "tenantId": "t3",
   "ownerId": "o3",
   "vendorId": null,
   "description": "Burst pipe in laundry room. Reported by Mei.",
   "photos": [
    {
     "kind": "pipe",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 96,
   "openedAt": "2026-11-26T00:00:00.000Z",
   "updatedAt": "2026-11-26T03:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-26T00:00:00.000Z",
     "who": "Mei Chen",
     "text": "Opened ticket with photo"
    }
   ]
  },
  {
   "id": "HV-1043",
   "title": "Front door lock sticking",
   "trade": "Locksmith",
   "urgency": "low",
   "status": "assigned",
   "doorId": "d4",
   "tenantId": "t4",
   "ownerId": "o4",
   "vendorId": "v8",
   "description": "Front door lock sticking. Reported by Jamal.",
   "photos": [
    {
     "kind": "door",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-25T16:00:00.000Z",
   "updatedAt": "2026-11-25T19:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-25T16:00:00.000Z",
     "who": "Jamal Wright",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-25T17:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to SecureLock Locksmith"
    }
   ]
  },
  {
   "id": "HV-1044",
   "title": "Dishwasher won’t drain",
   "trade": "Appliance",
   "urgency": "normal",
   "status": "assigned",
   "doorId": "d5",
   "tenantId": "t5",
   "ownerId": "o5",
   "vendorId": "v7",
   "description": "Dishwasher won’t drain. Reported by Erin.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 48,
   "openedAt": "2026-11-25T05:00:00.000Z",
   "updatedAt": "2026-11-25T08:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-25T05:00:00.000Z",
     "who": "Erin O’Neal",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-25T06:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Prairie Appliance Repair"
    }
   ]
  },
  {
   "id": "HV-1045",
   "title": "Breaker keeps tripping in garage",
   "trade": "Electrical",
   "urgency": "high",
   "status": "scheduled",
   "doorId": "d6",
   "tenantId": "t6",
   "ownerId": "o6",
   "vendorId": "v5",
   "description": "Breaker keeps tripping in garage. Reported by Luis.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 74,
   "openedAt": "2026-11-24T18:00:00.000Z",
   "updatedAt": "2026-11-24T21:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-24T18:00:00.000Z",
     "who": "Luis Romero",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-24T19:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Sparks Electric Co."
    }
   ]
  },
  {
   "id": "HV-1046",
   "title": "Ceiling stain under bathroom",
   "trade": "Plumbing",
   "urgency": "high",
   "status": "scheduled",
   "doorId": "d7",
   "tenantId": "t7",
   "ownerId": "o7",
   "vendorId": "v1",
   "description": "Ceiling stain under bathroom. Reported by Tasha.",
   "photos": [
    {
     "kind": "leak",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 74,
   "openedAt": "2026-11-24T08:00:00.000Z",
   "updatedAt": "2026-11-24T11:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-24T08:00:00.000Z",
     "who": "Tasha Greene",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-24T09:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1047",
   "title": "Garbage disposal jammed",
   "trade": "Plumbing",
   "urgency": "low",
   "status": "in-progress",
   "doorId": "d8",
   "tenantId": "t8",
   "ownerId": "o8",
   "vendorId": "v1",
   "description": "Garbage disposal jammed. Reported by Nate.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-24T01:00:00.000Z",
   "updatedAt": "2026-11-24T04:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-24T01:00:00.000Z",
     "who": "Nate Fowler",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-24T02:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1048",
   "title": "Water heater making noise",
   "trade": "Plumbing",
   "urgency": "normal",
   "status": "in-progress",
   "doorId": "d9",
   "tenantId": "t9",
   "ownerId": "o9",
   "vendorId": "v1",
   "description": "Water heater making noise. Reported by Hannah.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 48,
   "openedAt": "2026-11-23T19:00:00.000Z",
   "updatedAt": "2026-11-23T22:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-23T19:00:00.000Z",
     "who": "Hannah Kim",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-23T20:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1049",
   "title": "Fence board loose",
   "trade": "General",
   "urgency": "low",
   "status": "awaiting-approval",
   "doorId": "d10",
   "tenantId": "t10",
   "ownerId": "o10",
   "vendorId": "v6",
   "description": "Fence board loose. Reported by Victor.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-23T07:00:00.000Z",
   "updatedAt": "2026-11-23T10:00:00.000Z",
   "cost": 313.78,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-23T07:00:00.000Z",
     "who": "Victor Osei",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-23T08:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Handy Hank Services"
    }
   ]
  },
  {
   "id": "HV-1050",
   "title": "No heat, 38°F outside",
   "trade": "HVAC",
   "urgency": "emergency",
   "status": "completed",
   "doorId": "d11",
   "tenantId": "t11",
   "ownerId": "o11",
   "vendorId": "v4",
   "description": "No heat, 38°F outside. Reported by Brianna.",
   "photos": [
    {
     "kind": "ac",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 96,
   "openedAt": "2026-11-22T23:00:00.000Z",
   "updatedAt": "2026-11-23T02:00:00.000Z",
   "cost": 305.24,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-22T23:00:00.000Z",
     "who": "Brianna Cole",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-23T00:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to North Texas Air"
    }
   ]
  },
  {
   "id": "HV-1051",
   "title": "Toilet running constantly",
   "trade": "Plumbing",
   "urgency": "low",
   "status": "completed",
   "doorId": "d12",
   "tenantId": "t12",
   "ownerId": "o12",
   "vendorId": "v1",
   "description": "Toilet running constantly. Reported by Sam.",
   "photos": [
    {
     "kind": "leak",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-22T14:00:00.000Z",
   "updatedAt": "2026-11-22T17:00:00.000Z",
   "cost": 592.5,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-22T14:00:00.000Z",
     "who": "Sam Patel",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-22T15:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1052",
   "title": "Kitchen sink leaking under cabinet",
   "trade": "Plumbing",
   "urgency": "normal",
   "status": "completed",
   "doorId": "d13",
   "tenantId": "t13",
   "ownerId": "o6",
   "vendorId": "v1",
   "description": "Kitchen sink leaking under cabinet. Reported by Kayla.",
   "photos": [
    {
     "kind": "leak",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 48,
   "openedAt": "2026-11-22T02:00:00.000Z",
   "updatedAt": "2026-11-22T05:00:00.000Z",
   "cost": 633.76,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-22T02:00:00.000Z",
     "who": "Kayla Moreno",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-22T03:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1053",
   "title": "AC not cooling upstairs",
   "trade": "HVAC",
   "urgency": "high",
   "status": "closed",
   "doorId": "d14",
   "tenantId": "t14",
   "ownerId": "o7",
   "vendorId": "v4",
   "description": "AC not cooling upstairs. Reported by Derek.",
   "photos": [
    {
     "kind": "ac",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 74,
   "openedAt": "2026-11-21T19:00:00.000Z",
   "updatedAt": "2026-11-21T22:00:00.000Z",
   "cost": 116.41,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-21T19:00:00.000Z",
     "who": "Derek Shaw",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-21T20:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to North Texas Air"
    }
   ]
  },
  {
   "id": "HV-1054",
   "title": "Burst pipe in laundry room",
   "trade": "Plumbing",
   "urgency": "emergency",
   "status": "closed",
   "doorId": "d15",
   "tenantId": "t15",
   "ownerId": "o5",
   "vendorId": "v1",
   "description": "Burst pipe in laundry room. Reported by Imani.",
   "photos": [
    {
     "kind": "pipe",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 96,
   "openedAt": "2026-11-21T09:00:00.000Z",
   "updatedAt": "2026-11-21T12:00:00.000Z",
   "cost": 241.46,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-21T09:00:00.000Z",
     "who": "Imani Ford",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-21T10:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1055",
   "title": "Front door lock sticking",
   "trade": "Locksmith",
   "urgency": "low",
   "status": "closed",
   "doorId": "d16",
   "tenantId": "t16",
   "ownerId": "o2",
   "vendorId": "v8",
   "description": "Front door lock sticking. Reported by Paul.",
   "photos": [
    {
     "kind": "door",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-21T01:00:00.000Z",
   "updatedAt": "2026-11-21T04:00:00.000Z",
   "cost": 98.9,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-21T01:00:00.000Z",
     "who": "Paul Nguyen",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-21T02:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to SecureLock Locksmith"
    }
   ]
  },
  {
   "id": "HV-1056",
   "title": "Dishwasher won’t drain",
   "trade": "Appliance",
   "urgency": "normal",
   "status": "completed",
   "doorId": "d17",
   "tenantId": "t17",
   "ownerId": "o5",
   "vendorId": "v7",
   "description": "Dishwasher won’t drain. Reported by Rosa.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 48,
   "openedAt": "2026-11-20T16:00:00.000Z",
   "updatedAt": "2026-11-20T19:00:00.000Z",
   "cost": 612.58,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-20T16:00:00.000Z",
     "who": "Rosa Jimenez",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-20T17:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Prairie Appliance Repair"
    }
   ]
  },
  {
   "id": "HV-1057",
   "title": "Breaker keeps tripping in garage",
   "trade": "Electrical",
   "urgency": "high",
   "status": "assigned",
   "doorId": "d18",
   "tenantId": "t18",
   "ownerId": "o1",
   "vendorId": "v5",
   "description": "Breaker keeps tripping in garage. Reported by Ty.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 74,
   "openedAt": "2026-11-20T05:00:00.000Z",
   "updatedAt": "2026-11-20T08:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-20T05:00:00.000Z",
     "who": "Ty Henderson",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-20T06:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Sparks Electric Co."
    }
   ]
  },
  {
   "id": "HV-1058",
   "title": "Ceiling stain under bathroom",
   "trade": "Plumbing",
   "urgency": "high",
   "status": "scheduled",
   "doorId": "d1",
   "tenantId": "t1",
   "ownerId": "o1",
   "vendorId": "v1",
   "description": "Ceiling stain under bathroom. Reported by Aaliyah.",
   "photos": [
    {
     "kind": "leak",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 74,
   "openedAt": "2026-11-19T23:00:00.000Z",
   "updatedAt": "2026-11-20T02:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-19T23:00:00.000Z",
     "who": "Aaliyah Brooks",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-20T00:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1059",
   "title": "Garbage disposal jammed",
   "trade": "Plumbing",
   "urgency": "low",
   "status": "completed",
   "doorId": "d2",
   "tenantId": "t2",
   "ownerId": "o2",
   "vendorId": "v1",
   "description": "Garbage disposal jammed. Reported by Chris.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-19T11:00:00.000Z",
   "updatedAt": "2026-11-19T14:00:00.000Z",
   "cost": 100,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-19T11:00:00.000Z",
     "who": "Chris Delgado",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-19T12:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Lone Star Plumbing"
    }
   ]
  },
  {
   "id": "HV-1060",
   "title": "Water heater making noise",
   "trade": "Plumbing",
   "urgency": "normal",
   "status": "new",
   "doorId": "d3",
   "tenantId": "t3",
   "ownerId": "o3",
   "vendorId": null,
   "description": "Water heater making noise. Reported by Mei.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 48,
   "openedAt": "2026-11-19T05:00:00.000Z",
   "updatedAt": "2026-11-19T08:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-19T05:00:00.000Z",
     "who": "Mei Chen",
     "text": "Opened ticket with photo"
    }
   ]
  },
  {
   "id": "HV-1061",
   "title": "Fence board loose",
   "trade": "General",
   "urgency": "low",
   "status": "completed",
   "doorId": "d4",
   "tenantId": "t4",
   "ownerId": "o4",
   "vendorId": "v6",
   "description": "Fence board loose. Reported by Jamal.",
   "photos": [
    {
     "kind": "generic",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-18T20:00:00.000Z",
   "updatedAt": "2026-11-18T23:00:00.000Z",
   "cost": 411.64,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-18T20:00:00.000Z",
     "who": "Jamal Wright",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-18T21:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to Handy Hank Services"
    }
   ]
  },
  {
   "id": "HV-1062",
   "title": "No heat, 38°F outside",
   "trade": "HVAC",
   "urgency": "emergency",
   "status": "closed",
   "doorId": "d5",
   "tenantId": "t5",
   "ownerId": "o5",
   "vendorId": "v4",
   "description": "No heat, 38°F outside. Reported by Erin.",
   "photos": [
    {
     "kind": "ac",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 96,
   "openedAt": "2026-11-18T10:00:00.000Z",
   "updatedAt": "2026-11-18T13:00:00.000Z",
   "cost": 457.6,
   "billTo": "owner",
   "timeline": [
    {
     "at": "2026-11-18T10:00:00.000Z",
     "who": "Erin O’Neal",
     "text": "Opened ticket with photo"
    },
    {
     "at": "2026-11-18T11:00:00.000Z",
     "who": "Jordan Ellis",
     "text": "Assigned to North Texas Air"
    }
   ]
  },
  {
   "id": "HV-1063",
   "title": "Toilet running constantly",
   "trade": "Plumbing",
   "urgency": "low",
   "status": "new",
   "doorId": "d6",
   "tenantId": "t6",
   "ownerId": "o6",
   "vendorId": null,
   "description": "Toilet running constantly. Reported by Luis.",
   "photos": [
    {
     "kind": "leak",
     "label": "Tenant photo"
    }
   ],
   "aiUrgencyScore": 21,
   "openedAt": "2026-11-18T00:00:00.000Z",
   "updatedAt": "2026-11-18T03:00:00.000Z",
   "cost": null,
   "billTo": null,
   "timeline": [
    {
     "at": "2026-11-18T00:00:00.000Z",
     "who": "Luis Romero",
     "text": "Opened ticket with photo"
    }
   ]
  }
 ],
 "ticketStatuses": [
  "new",
  "assigned",
  "scheduled",
  "in-progress",
  "awaiting-approval",
  "completed",
  "closed"
 ],
 "ledger": [
  {
   "id": "L1",
   "date": "2025-12-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L2",
   "date": "2025-12-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L3",
   "date": "2025-12-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L4",
   "date": "2025-12-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L5",
   "date": "2025-12-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L6",
   "date": "2025-12-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L7",
   "date": "2025-12-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L8",
   "date": "2025-12-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L9",
   "date": "2025-12-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L10",
   "date": "2025-12-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L11",
   "date": "2025-12-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L12",
   "date": "2025-12-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L13",
   "date": "2025-12-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L14",
   "date": "2025-12-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L15",
   "date": "2025-12-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L16",
   "date": "2025-12-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L17",
   "date": "2025-12-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L18",
   "date": "2025-12-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L19",
   "date": "2025-12-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L20",
   "date": "2025-12-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L21",
   "date": "2025-12-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L22",
   "date": "2025-12-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L23",
   "date": "2025-12-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L24",
   "date": "2025-12-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L25",
   "date": "2025-12-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L26",
   "date": "2025-12-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L27",
   "date": "2025-12-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L28",
   "date": "2025-12-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L29",
   "date": "2025-12-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L30",
   "date": "2025-12-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L31",
   "date": "2025-12-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L32",
   "date": "2025-12-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L33",
   "date": "2025-12-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L34",
   "date": "2025-12-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L35",
   "date": "2025-12-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L36",
   "date": "2025-12-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L37",
   "date": "2025-12-10",
   "doorId": "d19",
   "ownerId": "o3",
   "type": "repair",
   "memo": "Make-ready cleaning",
   "amount": -315.15
  },
  {
   "id": "L38",
   "date": "2025-12-16",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "repair",
   "memo": "Appliance repair",
   "amount": -600.53
  },
  {
   "id": "L39",
   "date": "2025-12-22",
   "doorId": "d23",
   "ownerId": "o10",
   "type": "repair",
   "memo": "Appliance repair",
   "amount": -261.9
  },
  {
   "id": "L40",
   "date": "2026-01-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L41",
   "date": "2026-01-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L42",
   "date": "2026-01-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L43",
   "date": "2026-01-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L44",
   "date": "2026-01-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L45",
   "date": "2026-01-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L46",
   "date": "2026-01-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L47",
   "date": "2026-01-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L48",
   "date": "2026-01-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L49",
   "date": "2026-01-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L50",
   "date": "2026-01-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L51",
   "date": "2026-01-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L52",
   "date": "2026-01-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L53",
   "date": "2026-01-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L54",
   "date": "2026-01-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L55",
   "date": "2026-01-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L56",
   "date": "2026-01-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L57",
   "date": "2026-01-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L58",
   "date": "2026-01-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L59",
   "date": "2026-01-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L60",
   "date": "2026-01-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L61",
   "date": "2026-01-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L62",
   "date": "2026-01-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L63",
   "date": "2026-01-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L64",
   "date": "2026-01-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L65",
   "date": "2026-01-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L66",
   "date": "2026-01-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L67",
   "date": "2026-01-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L68",
   "date": "2026-01-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L69",
   "date": "2026-01-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L70",
   "date": "2026-01-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L71",
   "date": "2026-01-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L72",
   "date": "2026-01-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L73",
   "date": "2026-01-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L74",
   "date": "2026-01-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L75",
   "date": "2026-01-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L76",
   "date": "2026-01-10",
   "doorId": "d23",
   "ownerId": "o10",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -284.4
  },
  {
   "id": "L77",
   "date": "2026-01-16",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -573.33
  },
  {
   "id": "L78",
   "date": "2026-01-22",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "repair",
   "memo": "Make-ready cleaning",
   "amount": -476.52
  },
  {
   "id": "L79",
   "date": "2026-02-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L80",
   "date": "2026-02-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L81",
   "date": "2026-02-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L82",
   "date": "2026-02-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L83",
   "date": "2026-02-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L84",
   "date": "2026-02-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L85",
   "date": "2026-02-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L86",
   "date": "2026-02-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L87",
   "date": "2026-02-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L88",
   "date": "2026-02-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L89",
   "date": "2026-02-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L90",
   "date": "2026-02-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L91",
   "date": "2026-02-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L92",
   "date": "2026-02-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L93",
   "date": "2026-02-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L94",
   "date": "2026-02-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L95",
   "date": "2026-02-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L96",
   "date": "2026-02-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L97",
   "date": "2026-02-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L98",
   "date": "2026-02-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L99",
   "date": "2026-02-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L100",
   "date": "2026-02-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L101",
   "date": "2026-02-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L102",
   "date": "2026-02-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L103",
   "date": "2026-02-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L104",
   "date": "2026-02-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L105",
   "date": "2026-02-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L106",
   "date": "2026-02-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L107",
   "date": "2026-02-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L108",
   "date": "2026-02-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L109",
   "date": "2026-02-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L110",
   "date": "2026-02-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L111",
   "date": "2026-02-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L112",
   "date": "2026-02-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L113",
   "date": "2026-02-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L114",
   "date": "2026-02-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L115",
   "date": "2026-02-10",
   "doorId": "d20",
   "ownerId": "o12",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -337.15
  },
  {
   "id": "L116",
   "date": "2026-02-16",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -220.14
  },
  {
   "id": "L117",
   "date": "2026-02-22",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -465.46
  },
  {
   "id": "L118",
   "date": "2026-03-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L119",
   "date": "2026-03-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L120",
   "date": "2026-03-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L121",
   "date": "2026-03-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L122",
   "date": "2026-03-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L123",
   "date": "2026-03-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L124",
   "date": "2026-03-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L125",
   "date": "2026-03-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L126",
   "date": "2026-03-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L127",
   "date": "2026-03-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L128",
   "date": "2026-03-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L129",
   "date": "2026-03-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L130",
   "date": "2026-03-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L131",
   "date": "2026-03-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L132",
   "date": "2026-03-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L133",
   "date": "2026-03-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L134",
   "date": "2026-03-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L135",
   "date": "2026-03-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L136",
   "date": "2026-03-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L137",
   "date": "2026-03-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L138",
   "date": "2026-03-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L139",
   "date": "2026-03-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L140",
   "date": "2026-03-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L141",
   "date": "2026-03-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L142",
   "date": "2026-03-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L143",
   "date": "2026-03-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L144",
   "date": "2026-03-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L145",
   "date": "2026-03-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L146",
   "date": "2026-03-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L147",
   "date": "2026-03-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L148",
   "date": "2026-03-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L149",
   "date": "2026-03-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L150",
   "date": "2026-03-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L151",
   "date": "2026-03-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L152",
   "date": "2026-03-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L153",
   "date": "2026-03-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L154",
   "date": "2026-03-10",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "repair",
   "memo": "Appliance repair",
   "amount": -501.27
  },
  {
   "id": "L155",
   "date": "2026-03-16",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "repair",
   "memo": "Appliance repair",
   "amount": -506.56
  },
  {
   "id": "L156",
   "date": "2026-03-22",
   "doorId": "d19",
   "ownerId": "o3",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -201.93
  },
  {
   "id": "L157",
   "date": "2026-04-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L158",
   "date": "2026-04-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L159",
   "date": "2026-04-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L160",
   "date": "2026-04-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L161",
   "date": "2026-04-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L162",
   "date": "2026-04-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L163",
   "date": "2026-04-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L164",
   "date": "2026-04-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L165",
   "date": "2026-04-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L166",
   "date": "2026-04-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L167",
   "date": "2026-04-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L168",
   "date": "2026-04-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L169",
   "date": "2026-04-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L170",
   "date": "2026-04-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L171",
   "date": "2026-04-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L172",
   "date": "2026-04-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L173",
   "date": "2026-04-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L174",
   "date": "2026-04-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L175",
   "date": "2026-04-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L176",
   "date": "2026-04-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L177",
   "date": "2026-04-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L178",
   "date": "2026-04-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L179",
   "date": "2026-04-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L180",
   "date": "2026-04-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L181",
   "date": "2026-04-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L182",
   "date": "2026-04-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L183",
   "date": "2026-04-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L184",
   "date": "2026-04-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L185",
   "date": "2026-04-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L186",
   "date": "2026-04-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L187",
   "date": "2026-04-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L188",
   "date": "2026-04-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L189",
   "date": "2026-04-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L190",
   "date": "2026-04-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L191",
   "date": "2026-04-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L192",
   "date": "2026-04-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L193",
   "date": "2026-04-10",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -287.77
  },
  {
   "id": "L194",
   "date": "2026-04-16",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -152.33
  },
  {
   "id": "L195",
   "date": "2026-04-22",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -155.05
  },
  {
   "id": "L196",
   "date": "2026-05-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L197",
   "date": "2026-05-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L198",
   "date": "2026-05-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L199",
   "date": "2026-05-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L200",
   "date": "2026-05-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L201",
   "date": "2026-05-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L202",
   "date": "2026-05-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L203",
   "date": "2026-05-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L204",
   "date": "2026-05-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L205",
   "date": "2026-05-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L206",
   "date": "2026-05-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L207",
   "date": "2026-05-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L208",
   "date": "2026-05-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L209",
   "date": "2026-05-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L210",
   "date": "2026-05-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L211",
   "date": "2026-05-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L212",
   "date": "2026-05-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L213",
   "date": "2026-05-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L214",
   "date": "2026-05-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L215",
   "date": "2026-05-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L216",
   "date": "2026-05-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L217",
   "date": "2026-05-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L218",
   "date": "2026-05-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L219",
   "date": "2026-05-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L220",
   "date": "2026-05-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L221",
   "date": "2026-05-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L222",
   "date": "2026-05-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L223",
   "date": "2026-05-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L224",
   "date": "2026-05-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L225",
   "date": "2026-05-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L226",
   "date": "2026-05-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L227",
   "date": "2026-05-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L228",
   "date": "2026-05-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L229",
   "date": "2026-05-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L230",
   "date": "2026-05-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L231",
   "date": "2026-05-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L232",
   "date": "2026-05-10",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -294.38
  },
  {
   "id": "L233",
   "date": "2026-05-16",
   "doorId": "d22",
   "ownerId": "o6",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -140.53
  },
  {
   "id": "L234",
   "date": "2026-05-22",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -529.91
  },
  {
   "id": "L235",
   "date": "2026-06-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L236",
   "date": "2026-06-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L237",
   "date": "2026-06-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L238",
   "date": "2026-06-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L239",
   "date": "2026-06-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L240",
   "date": "2026-06-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L241",
   "date": "2026-06-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L242",
   "date": "2026-06-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L243",
   "date": "2026-06-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L244",
   "date": "2026-06-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L245",
   "date": "2026-06-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L246",
   "date": "2026-06-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L247",
   "date": "2026-06-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L248",
   "date": "2026-06-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L249",
   "date": "2026-06-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L250",
   "date": "2026-06-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L251",
   "date": "2026-06-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L252",
   "date": "2026-06-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L253",
   "date": "2026-06-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L254",
   "date": "2026-06-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L255",
   "date": "2026-06-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L256",
   "date": "2026-06-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L257",
   "date": "2026-06-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L258",
   "date": "2026-06-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L259",
   "date": "2026-06-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L260",
   "date": "2026-06-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L261",
   "date": "2026-06-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L262",
   "date": "2026-06-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L263",
   "date": "2026-06-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L264",
   "date": "2026-06-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L265",
   "date": "2026-06-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L266",
   "date": "2026-06-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L267",
   "date": "2026-06-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L268",
   "date": "2026-06-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L269",
   "date": "2026-06-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L270",
   "date": "2026-06-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L271",
   "date": "2026-06-10",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -501.26
  },
  {
   "id": "L272",
   "date": "2026-06-16",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -171.72
  },
  {
   "id": "L273",
   "date": "2026-06-22",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -231.6
  },
  {
   "id": "L274",
   "date": "2026-07-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L275",
   "date": "2026-07-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L276",
   "date": "2026-07-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L277",
   "date": "2026-07-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L278",
   "date": "2026-07-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L279",
   "date": "2026-07-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L280",
   "date": "2026-07-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L281",
   "date": "2026-07-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L282",
   "date": "2026-07-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L283",
   "date": "2026-07-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L284",
   "date": "2026-07-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L285",
   "date": "2026-07-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L286",
   "date": "2026-07-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L287",
   "date": "2026-07-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L288",
   "date": "2026-07-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L289",
   "date": "2026-07-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L290",
   "date": "2026-07-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L291",
   "date": "2026-07-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L292",
   "date": "2026-07-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L293",
   "date": "2026-07-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L294",
   "date": "2026-07-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L295",
   "date": "2026-07-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L296",
   "date": "2026-07-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L297",
   "date": "2026-07-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L298",
   "date": "2026-07-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L299",
   "date": "2026-07-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L300",
   "date": "2026-07-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L301",
   "date": "2026-07-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L302",
   "date": "2026-07-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L303",
   "date": "2026-07-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L304",
   "date": "2026-07-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L305",
   "date": "2026-07-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L306",
   "date": "2026-07-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L307",
   "date": "2026-07-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L308",
   "date": "2026-07-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L309",
   "date": "2026-07-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L310",
   "date": "2026-07-10",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "repair",
   "memo": "Plumbing repair",
   "amount": -116.54
  },
  {
   "id": "L311",
   "date": "2026-07-16",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -139.72
  },
  {
   "id": "L312",
   "date": "2026-07-22",
   "doorId": "d21",
   "ownerId": "o4",
   "type": "repair",
   "memo": "Appliance repair",
   "amount": -353.5
  },
  {
   "id": "L313",
   "date": "2026-08-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L314",
   "date": "2026-08-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L315",
   "date": "2026-08-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L316",
   "date": "2026-08-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L317",
   "date": "2026-08-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L318",
   "date": "2026-08-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L319",
   "date": "2026-08-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L320",
   "date": "2026-08-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L321",
   "date": "2026-08-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L322",
   "date": "2026-08-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L323",
   "date": "2026-08-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L324",
   "date": "2026-08-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L325",
   "date": "2026-08-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L326",
   "date": "2026-08-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L327",
   "date": "2026-08-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L328",
   "date": "2026-08-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L329",
   "date": "2026-08-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L330",
   "date": "2026-08-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L331",
   "date": "2026-08-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L332",
   "date": "2026-08-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L333",
   "date": "2026-08-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L334",
   "date": "2026-08-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L335",
   "date": "2026-08-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L336",
   "date": "2026-08-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L337",
   "date": "2026-08-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L338",
   "date": "2026-08-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L339",
   "date": "2026-08-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L340",
   "date": "2026-08-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L341",
   "date": "2026-08-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L342",
   "date": "2026-08-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L343",
   "date": "2026-08-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L344",
   "date": "2026-08-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L345",
   "date": "2026-08-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L346",
   "date": "2026-08-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L347",
   "date": "2026-08-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L348",
   "date": "2026-08-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L349",
   "date": "2026-08-10",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "repair",
   "memo": "Make-ready cleaning",
   "amount": -240.23
  },
  {
   "id": "L350",
   "date": "2026-08-16",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -365.17
  },
  {
   "id": "L351",
   "date": "2026-08-22",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -299.01
  },
  {
   "id": "L352",
   "date": "2026-09-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L353",
   "date": "2026-09-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L354",
   "date": "2026-09-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L355",
   "date": "2026-09-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L356",
   "date": "2026-09-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L357",
   "date": "2026-09-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L358",
   "date": "2026-09-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L359",
   "date": "2026-09-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L360",
   "date": "2026-09-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L361",
   "date": "2026-09-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L362",
   "date": "2026-09-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L363",
   "date": "2026-09-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L364",
   "date": "2026-09-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L365",
   "date": "2026-09-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L366",
   "date": "2026-09-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L367",
   "date": "2026-09-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L368",
   "date": "2026-09-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L369",
   "date": "2026-09-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L370",
   "date": "2026-09-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L371",
   "date": "2026-09-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L372",
   "date": "2026-09-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L373",
   "date": "2026-09-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L374",
   "date": "2026-09-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L375",
   "date": "2026-09-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L376",
   "date": "2026-09-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L377",
   "date": "2026-09-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L378",
   "date": "2026-09-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L379",
   "date": "2026-09-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L380",
   "date": "2026-09-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L381",
   "date": "2026-09-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L382",
   "date": "2026-09-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L383",
   "date": "2026-09-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L384",
   "date": "2026-09-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L385",
   "date": "2026-09-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L386",
   "date": "2026-09-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L387",
   "date": "2026-09-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L388",
   "date": "2026-09-10",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -231.57
  },
  {
   "id": "L389",
   "date": "2026-09-16",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -343.16
  },
  {
   "id": "L390",
   "date": "2026-09-22",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -464.45
  },
  {
   "id": "L391",
   "date": "2026-10-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L392",
   "date": "2026-10-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L393",
   "date": "2026-10-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L394",
   "date": "2026-10-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L395",
   "date": "2026-10-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L396",
   "date": "2026-10-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L397",
   "date": "2026-10-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L398",
   "date": "2026-10-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L399",
   "date": "2026-10-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L400",
   "date": "2026-10-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L401",
   "date": "2026-10-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L402",
   "date": "2026-10-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L403",
   "date": "2026-10-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L404",
   "date": "2026-10-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L405",
   "date": "2026-10-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L406",
   "date": "2026-10-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L407",
   "date": "2026-10-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L408",
   "date": "2026-10-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L409",
   "date": "2026-10-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L410",
   "date": "2026-10-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L411",
   "date": "2026-10-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L412",
   "date": "2026-10-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L413",
   "date": "2026-10-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L414",
   "date": "2026-10-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L415",
   "date": "2026-10-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L416",
   "date": "2026-10-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L417",
   "date": "2026-10-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L418",
   "date": "2026-10-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L419",
   "date": "2026-10-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L420",
   "date": "2026-10-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L421",
   "date": "2026-10-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L422",
   "date": "2026-10-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L423",
   "date": "2026-10-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L424",
   "date": "2026-10-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L425",
   "date": "2026-10-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L426",
   "date": "2026-10-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L427",
   "date": "2026-10-10",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "repair",
   "memo": "Make-ready cleaning",
   "amount": -317.17
  },
  {
   "id": "L428",
   "date": "2026-10-16",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "repair",
   "memo": "HVAC service",
   "amount": -164.95
  },
  {
   "id": "L429",
   "date": "2026-10-22",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -588.12
  },
  {
   "id": "L430",
   "date": "2026-11-01",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3200
  },
  {
   "id": "L431",
   "date": "2026-11-05",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -256
  },
  {
   "id": "L432",
   "date": "2026-11-01",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3050
  },
  {
   "id": "L433",
   "date": "2026-11-05",
   "doorId": "d2",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -244
  },
  {
   "id": "L434",
   "date": "2026-11-01",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L435",
   "date": "2026-11-05",
   "doorId": "d3",
   "ownerId": "o3",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L436",
   "date": "2026-11-01",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3400
  },
  {
   "id": "L437",
   "date": "2026-11-05",
   "doorId": "d4",
   "ownerId": "o4",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -272
  },
  {
   "id": "L438",
   "date": "2026-11-01",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3750
  },
  {
   "id": "L439",
   "date": "2026-11-05",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -300
  },
  {
   "id": "L440",
   "date": "2026-11-01",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2625
  },
  {
   "id": "L441",
   "date": "2026-11-05",
   "doorId": "d6",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -210
  },
  {
   "id": "L442",
   "date": "2026-11-01",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3100
  },
  {
   "id": "L443",
   "date": "2026-11-05",
   "doorId": "d7",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -248
  },
  {
   "id": "L444",
   "date": "2026-11-01",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3725
  },
  {
   "id": "L445",
   "date": "2026-11-05",
   "doorId": "d8",
   "ownerId": "o8",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -298
  },
  {
   "id": "L446",
   "date": "2026-11-01",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3150
  },
  {
   "id": "L447",
   "date": "2026-11-05",
   "doorId": "d9",
   "ownerId": "o9",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -252
  },
  {
   "id": "L448",
   "date": "2026-11-01",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3450
  },
  {
   "id": "L449",
   "date": "2026-11-05",
   "doorId": "d10",
   "ownerId": "o10",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -276
  },
  {
   "id": "L450",
   "date": "2026-11-01",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "rent",
   "memo": "Rent received",
   "amount": 4500
  },
  {
   "id": "L451",
   "date": "2026-11-05",
   "doorId": "d11",
   "ownerId": "o11",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -360
  },
  {
   "id": "L452",
   "date": "2026-11-01",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3675
  },
  {
   "id": "L453",
   "date": "2026-11-05",
   "doorId": "d12",
   "ownerId": "o12",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -294
  },
  {
   "id": "L454",
   "date": "2026-11-01",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3225
  },
  {
   "id": "L455",
   "date": "2026-11-05",
   "doorId": "d13",
   "ownerId": "o6",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -258
  },
  {
   "id": "L456",
   "date": "2026-11-01",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3250
  },
  {
   "id": "L457",
   "date": "2026-11-05",
   "doorId": "d14",
   "ownerId": "o7",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -260
  },
  {
   "id": "L458",
   "date": "2026-11-01",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3125
  },
  {
   "id": "L459",
   "date": "2026-11-05",
   "doorId": "d15",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -250
  },
  {
   "id": "L460",
   "date": "2026-11-01",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3825
  },
  {
   "id": "L461",
   "date": "2026-11-05",
   "doorId": "d16",
   "ownerId": "o2",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -306
  },
  {
   "id": "L462",
   "date": "2026-11-01",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "rent",
   "memo": "Rent received",
   "amount": 3475
  },
  {
   "id": "L463",
   "date": "2026-11-05",
   "doorId": "d17",
   "ownerId": "o5",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -278
  },
  {
   "id": "L464",
   "date": "2026-11-01",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "rent",
   "memo": "Rent received",
   "amount": 2950
  },
  {
   "id": "L465",
   "date": "2026-11-05",
   "doorId": "d18",
   "ownerId": "o1",
   "type": "mgmt-fee",
   "memo": "Management fee (8%)",
   "amount": -236
  },
  {
   "id": "L466",
   "date": "2026-11-10",
   "doorId": "d20",
   "ownerId": "o12",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -358.74
  },
  {
   "id": "L467",
   "date": "2026-11-16",
   "doorId": "d1",
   "ownerId": "o1",
   "type": "repair",
   "memo": "Make-ready cleaning",
   "amount": -375.79
  },
  {
   "id": "L468",
   "date": "2026-11-22",
   "doorId": "d5",
   "ownerId": "o5",
   "type": "repair",
   "memo": "Lock rekey",
   "amount": -278.65
  }
 ],
 "ownerBills": [
  {
   "id": "INV-2026-031",
   "ownerId": "o1",
   "date": "2026-11-03",
   "due": "2026-11-17",
   "items": [
    {
     "desc": "Portfolio analysis, Q4",
     "amount": 150
    },
    {
     "desc": "Lease renewal prep, 2417 Legacy Oak Dr",
     "amount": 95
    }
   ],
   "status": "paid",
   "payments": [
    {
     "at": "2026-11-09T10:14:00-06:00",
     "method": "Card •••• 4242",
     "amount": 245,
     "cardFee": 7.41,
     "stripeRef": "pi_mock_31A"
    }
   ]
  },
  {
   "id": "INV-2026-032",
   "ownerId": "o2",
   "date": "2026-11-03",
   "due": "2026-11-17",
   "items": [
    {
     "desc": "Make-ready coordination",
     "amount": 125
    }
   ],
   "status": "paid",
   "payments": [
    {
     "at": "2026-11-12T08:40:00-06:00",
     "method": "ACH",
     "amount": 125,
     "cardFee": 0,
     "stripeRef": "pi_mock_32B"
    }
   ]
  },
  {
   "id": "INV-2026-033",
   "ownerId": "o3",
   "date": "2026-11-10",
   "due": "2026-11-24",
   "items": [
    {
     "desc": "Insurance claim assistance",
     "amount": 200
    }
   ],
   "status": "overdue",
   "payments": []
  },
  {
   "id": "INV-2026-034",
   "ownerId": "o4",
   "date": "2026-11-15",
   "due": "2026-11-29",
   "items": [
    {
     "desc": "Portfolio analysis, Q4",
     "amount": 150
    }
   ],
   "status": "open",
   "payments": []
  },
  {
   "id": "INV-2026-035",
   "ownerId": "o1",
   "date": "2026-11-20",
   "due": "2026-12-04",
   "items": [
    {
     "desc": "Tenant placement fee",
     "amount": 850
    },
    {
     "desc": "Listing photos",
     "amount": 175
    }
   ],
   "status": "partial",
   "payments": [
    {
     "at": "2026-11-22T13:05:00-06:00",
     "method": "Card •••• 4242",
     "amount": 500,
     "cardFee": 14.8,
     "stripeRef": "pi_mock_35C"
    }
   ]
  },
  {
   "id": "INV-2026-036",
   "ownerId": "o7",
   "date": "2026-11-24",
   "due": "2026-12-08",
   "items": [
    {
     "desc": "Eviction filing coordination",
     "amount": 300
    }
   ],
   "status": "open",
   "payments": []
  }
 ],
 "listings": [
  {
   "id": "MLS-S1",
   "address": "4812 Wildflower Way",
   "city": "Frisco",
   "zip": "75034",
   "price": 439900,
   "beds": 3,
   "baths": 2,
   "sqft": 1985,
   "dom": 12,
   "status": "Active",
   "photo": "house",
   "source": "Sample MLS feed (mock)",
   "sourceUrl": "#sample-MLS-S1"
  },
  {
   "id": "MLS-S2",
   "address": "921 Starwood Ct",
   "city": "Frisco",
   "zip": "75034",
   "price": 449000,
   "beds": 3,
   "baths": 2.5,
   "sqft": 2110,
   "dom": 4,
   "status": "Active",
   "photo": "house",
   "source": "Sample MLS feed (mock)",
   "sourceUrl": "#sample-MLS-S2"
  },
  {
   "id": "MLS-S3",
   "address": "3307 Rolling Hills Dr",
   "city": "Frisco",
   "zip": "75033",
   "price": 499000,
   "beds": 4,
   "baths": 3,
   "sqft": 2640,
   "dom": 21,
   "status": "Active",
   "photo": "house",
   "source": "Sample MLS feed (mock)",
   "sourceUrl": "#sample-MLS-S3"
  },
  {
   "id": "MLS-S4",
   "address": "1150 Heritage Pkwy",
   "city": "McKinney",
   "zip": "75070",
   "price": 375000,
   "beds": 3,
   "baths": 2,
   "sqft": 1780,
   "dom": 33,
   "status": "Price drop",
   "photo": "house",
   "source": "Sample MLS feed (mock)",
   "sourceUrl": "#sample-MLS-S4"
  },
  {
   "id": "MLS-S5",
   "address": "7605 Elm Hollow Ln",
   "city": "Plano",
   "zip": "75024",
   "price": 525000,
   "beds": 4,
   "baths": 2.5,
   "sqft": 2480,
   "dom": 7,
   "status": "Pending",
   "photo": "house",
   "source": "Sample MLS feed (mock)",
   "sourceUrl": "#sample-MLS-S5"
  }
 ],
 "leads": [
  {
   "id": "LD1",
   "name": "Rachel Moss",
   "phone": "(214) 555-0411",
   "source": "Missed call",
   "intent": "Buyer",
   "budget": 450000,
   "area": "Frisco",
   "status": "new",
   "createdAt": "2026-11-26T19:00:00.000Z",
   "note": "Wants 3 bed near Legacy West."
  },
  {
   "id": "LD2",
   "name": "Derrick Lam",
   "phone": "(972) 555-0412",
   "source": "Zillow form",
   "intent": "Buyer",
   "budget": 380000,
   "area": "McKinney",
   "status": "contacted",
   "createdAt": "2026-11-25T19:00:00.000Z",
   "note": "Pre-approved, first-time buyer."
  },
  {
   "id": "LD3",
   "name": "Marcus Bell",
   "phone": "(972) 555-0110",
   "source": "Hive owner",
   "intent": "Seller",
   "budget": null,
   "area": "Frisco",
   "status": "nurture",
   "createdAt": "2026-11-23T21:00:00.000Z",
   "note": "Existing owner client. Asked about selling a rental."
  },
  {
   "id": "LD4",
   "name": "Ana Ruiz",
   "phone": "(469) 555-0414",
   "source": "Open house",
   "intent": "Buyer",
   "budget": 520000,
   "area": "Plano",
   "status": "new",
   "createdAt": "2026-11-26T16:00:00.000Z",
   "note": "Relocating from Austin in March."
  }
 ],
 "calls": [
  {
   "id": "C1",
   "from": "(214) 555-0411",
   "name": "Rachel Moss",
   "at": "2026-11-26T19:00:00.000Z",
   "durationSec": 74,
   "missed": true,
   "leadId": "LD1",
   "summary": "Buyer, 3 bed under $450K in Frisco, wants showings this weekend.",
   "transcript": [
    [
     "Caller",
     "Hi, I saw a sign on Wildflower Way. Is it still available?"
    ],
    [
     "BEELO",
     "Jordan is with a client. I can help. Are you looking to buy in Frisco?"
    ],
    [
     "Caller",
     "Yes, three bedrooms, under four-fifty. We’re pre-approved."
    ],
    [
     "BEELO",
     "Got it. I’ll send Jordan your info and two matches. Is Saturday good for showings?"
    ],
    [
     "Caller",
     "Saturday morning works."
    ]
   ]
  },
  {
   "id": "C2",
   "from": "(214) 555-0212",
   "name": "Mei Chen",
   "at": "2026-11-26T01:00:00.000Z",
   "durationSec": 52,
   "missed": true,
   "leadId": null,
   "summary": "Tenant: dishwasher not draining. Ticket HV-1044 opened.",
   "transcript": [
    [
     "Caller",
     "Hi, it’s Mei at the Plano house. The dishwasher won’t drain."
    ],
    [
     "BEELO",
     "Sorry about that. I opened a ticket and texted you a link to add a photo."
    ],
    [
     "Caller",
     "Great, thanks."
    ]
   ]
  },
  {
   "id": "C3",
   "from": "(972) 555-0110",
   "name": "Marcus Bell",
   "at": "2026-11-23T23:00:00.000Z",
   "durationSec": 188,
   "missed": false,
   "leadId": "LD3",
   "summary": "Owner asking what his rental would sell for; open to a 1031 exchange.",
   "transcript": [
    [
     "Caller",
     "Jordan, what do you think my Legacy Oak place is worth now?"
    ],
    [
     "Jordan",
     "Values are up in that pocket. I’ll pull an estimate and range for you."
    ],
    [
     "Caller",
     "If it’s good I might sell and roll it into something bigger."
    ],
    [
     "Jordan",
     "A 1031 could work. Let’s talk with your CPA."
    ]
   ]
  }
 ],
 "pricing": {
  "hive": 25,
  "beelo": 39,
  "bundle": 55,
  "period": "per agent, per month",
  "ownerBilled": false
 },
 "alertRules": {
  "repeatEveryMin": 5,
  "quietHours": {
   "start": "21:00",
   "end": "08:00",
   "exceptEmergency": true
  },
  "numberPerAgent": true
 },
 "emergencyTimers": {
  "responseMin": 15,
  "acceptMin": 30,
  "fixHours": 24
 },
 "cardFee": {
  "pct": 2.9,
  "fixed": 0.3,
  "note": "Card processing fee paid by the payer, shown before the total. Processed through the agent’s own connected Stripe account."
 }
};
(function (M) {
  /* Non-enumerable so structuredClone(MOCK) works (it skips non-enumerable props). */
  const def = (k, f) => Object.defineProperty(M, k, { value: f, enumerable: false });
  def('byId', (col, id) => (M[col] || []).find((x) => x.id === id) || null);
  def('doorLabel', (d) => d.address + (d.unit ? ', ' + d.unit : '') + ', ' + d.city);
  def('cardFeeFor', (amt) => Math.round((amt * M.cardFee.pct / 100 + M.cardFee.fixed) * 100) / 100);
})(window.MOCK);
