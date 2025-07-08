// --- Data Types ---

export type FishingRegulation = {
  speciesName: string;
  commonNames: string;
  facRule: string;
  licenseRequired: string;
  gearRestrictions: string;
  officerNotes: string;
  atlantic: {
    season: string;
    slotLimit: string;
    bagLimit: string;
  };
  gulf: {
    season: string;
    slotLimit: string;
    bagLimit: string;
  };
};

export type InvertebrateRegulation = {
    speciesName: string;
    facRule: string;
    licensePermits: string;
    season: string;
    minSize: string;
    bagLimit: string;
    harvestMethod: string;
    otherRules: string[];
    officerNotes: string;
};

export type GearRegulation = {
    gearName: string;
    facRule: string;
    rules: string[];
    officerNotes: string;
}

export type HuntingRegulation = {
  speciesName: string;
  facRule: string;
  licensePermits: string;
  legalHours: string;
  legalMethods: string;
  bagLimit: string;
  antlerRules?: string;
  officerNotes: string;
  seasonDates: Record<string, Record<string, string>>;
};

export type TrappingRegulation = {
    speciesName: string;
    facRule: string;
    licensePermits: string;
    season: string;
    legalMethods: string;
    officerNotes: string;
}

export type FirearmsMethodInfo = {
    topic: string;
    rules: string[];
}

export type BoatingTopic = {
  title: string;
  icon: string;
  details: string[];
  url?: string;
}

export type ProtectedSpeciesInfo = {
  speciesName: string;
  category: 'Protected' | 'Nuisance' | 'Regulated';
  protocol: string;
};

export type LicenseInfo = {
    licenseName: string;
    whatItCovers: string;
    permitsIncluded: string;
    costResident: string;
    notes: string;
}

// --- FISHING REGULATIONS DATABASE ---

export const fishingRegulations: FishingRegulation[] = [
  {
    speciesName: "Snook",
    commonNames: "Linesider, Robalo",
    facRule: "68B-21, F.A.C.",
    licenseRequired: "Yes, Saltwater License + Snook Permit Required",
    gearRestrictions: "Hook and line only. No snatch hooks.",
    officerNotes: "Common violation is possession during closed season or keeping an out-of-slot fish. Check date and location of catch. Fish must be landed in whole condition.",
    atlantic: {
      season: "Open Feb. 1–May 31 & Sept. 1–Dec. 14",
      slotLimit: 'Not less than 28" or more than 32" total length',
      bagLimit: "1 per person, per day",
    },
    gulf: {
      season: "Open March 1–April 30 & Sept. 1–Nov. 30",
      slotLimit: 'Not less than 28" or more than 33" total length',
      bagLimit: "1 per person, per day",
    },
  },
  {
    speciesName: "Redfish (Red Drum)",
    commonNames: "Red, Channel Bass",
    facRule: "68B-22, F.A.C.",
    licenseRequired: "Yes, Saltwater License",
    gearRestrictions: "Hook and line, cast net. Cannot be harvested commercially.",
    officerNotes: "Catch-and-release only in all of Florida. Possession is a common violation. Check for fish hidden in coolers or livewells.",
    atlantic: {
      season: "Catch-and-release only",
      slotLimit: "N/A (Possession Prohibited)",
      bagLimit: "0 (Possession Prohibited)",
    },
    gulf: {
      season: "Catch-and-release only",
      slotLimit: "N/A (Possession Prohibited)",
      bagLimit: "0 (Possession Prohibited)",
    },
  },
  {
    speciesName: "Spotted Sea Trout",
    commonNames: "Trout, Gator Trout",
    facRule: "68B-37, F.A.C.",
    licenseRequired: "Yes, Saltwater License",
    gearRestrictions: "Hook and line, cast net.",
    officerNotes: "Regulations vary significantly by management zone. It is critical to know which zone the angler was fishing in.",
    atlantic: {
      season: "Open year-round",
      slotLimit: 'Not less than 15" or more than 19" total length. May possess one over 19".',
      bagLimit: "2 per person (in NE Zone), 3 per person (in SE Zone)",
    },
    gulf: {
      season: "Open year-round",
      slotLimit: 'Not less than 15" or more than 19" total length. May possess one over 19".',
      bagLimit: "3 per person",
    },
  },
  {
    speciesName: "Dolphin (Mahi-Mahi)",
    commonNames: "Mahi, Dorado",
    facRule: "68B-55, F.A.C.",
    licenseRequired: "Yes, Saltwater License",
    gearRestrictions: "Hook and line, spearing.",
    officerNotes: "Often caught far offshore. Violations typically relate to exceeding bag limits on successful trips. No minimum size, but a vessel limit applies.",
    atlantic: {
      season: "Open year-round",
      slotLimit: "No minimum size",
      bagLimit: "5 per person, up to 30 per vessel, whichever is less",
    },
    gulf: {
      season: "Open year-round",
      slotLimit: "No minimum size",
      bagLimit: "5 per person, up to 30 per vessel, whichever is less",
    },
  },
  {
    speciesName: "Largemouth Bass",
    commonNames: "Black Bass",
    facRule: "68A-23.005, F.A.C.",
    licenseRequired: "Yes, Freshwater License",
    gearRestrictions: "Hook and line only. No snatch hooks.",
    officerNotes: "Check for compliance with bag limits. Possession of undersized fish is a common violation. Tournament anglers may have specific exemptions.",
    atlantic: {
      season: "Open year-round",
      slotLimit: 'No minimum length. Only one bass may be 16" or longer.',
      bagLimit: "5 per person, per day",
    },
    gulf: {
      season: "Open year-round",
      slotLimit: 'No minimum length. Only one bass may be 16" or longer.',
      bagLimit: "5 per person, per day",
    },
  },
];

export const invertebrateRegulations: InvertebrateRegulation[] = [
    {
        speciesName: "Spiny Lobster",
        facRule: "68B-24, F.A.C.",
        licensePermits: "Saltwater License + Lobster Permit",
        season: "Regular: Aug. 6 - Mar. 31; Mini-Season: Last consecutive Wed/Thurs of July",
        minSize: "Carapace must be > 3 inches, measured in water",
        bagLimit: "6 per person per day (Monroe County and Biscayne Park have different limits during mini-season)",
        harvestMethod: "By hand, bully net, or hoop net. Spearing is prohibited.",
        otherRules: ["Egg-bearing females must be released unharmed.", "Tail must be kept whole and attached to carapace until landing."],
        officerNotes: "Check for dive flag compliance. Common violations are possession of separated tails on the water, taking egg-bearing females, and oversized bag limits during mini-season."
    },
    {
        speciesName: "Stone Crab",
        facRule: "68B-13, F.A.C.",
        licensePermits: "Recreational Saltwater License",
        season: "Open Oct. 15 - May 1",
        minSize: "Claw must be 2 7/8 inches at the forearm",
        bagLimit: "1 gallon of claws per person, or 2 gallons per vessel, whichever is less.",
        harvestMethod: "Traps or by hand.",
        otherRules: ["Harvest of whole crabs is prohibited. Claws only.", "It is illegal to take claws from egg-bearing females."],
        officerNotes: "Common violations are harvesting claws during closed season and taking undersized claws. Check for traps in navigable channels or unmarked traps."
    },
    {
        speciesName: "Blue Crab",
        facRule: "68B-45, F.A.C.",
        licensePermits: "No license required for recreational use of up to 5 traps.",
        season: "Open year-round",
        minSize: "No minimum size",
        bagLimit: "10 gallons of whole crabs per person per day.",
        harvestMethod: "Up to 5 traps, dip nets, or lines.",
        otherRules: ["Harvest of egg-bearing females is prohibited."],
        officerNotes: "Ensure recreational crabbers are not using more than 5 traps. Check for proper buoy markings on traps if used."
    },
];

export const gearRegulations: GearRegulation[] = [
    {
        gearName: "Cast Nets",
        facRule: "68B-4.0081, F.A.C.",
        rules: ["Maximum radius of 14 feet.", "Considered 'allowable gear' for many non-game fish species.", "Cannot be used for freshwater game fish."],
        officerNotes: "Check for use in freshwater for harvesting game fish like bass, which is illegal."
    },
    {
        gearName: "Spearfishing",
        facRule: "68B-2.007, F.A.C.",
        rules: ["Spearfishing of Snook, Redfish, Billfish, Sharks, and Bonefish is prohibited.", "Possession of a speared lobster is prohibited.", "Spearfishing is not allowed in state parks, or within 100 yards of a public beach, commercial or public fishing pier, or bridge.", "You cannot spearfish for freshwater game fish."],
        officerNotes: "Verify species. Spearfishing for protected species like Snook is a major violation. Also check location for proximity to piers or beaches."
    },
    {
        gearName: "Blue Crab Traps (Recreational)",
        facRule: "68B-45.004, F.A.C.",
        rules: ["Maximum of 5 traps per person.", "Buoy must have a legible 'R' at least 2 inches high.", "Buoy must display owner's name and address.", "Traps must be pulled manually (no mechanical devices)."],
        officerNotes: "Check for number of traps and proper buoy markings. Unmarked or numerous traps may indicate commercial activity without proper license."
    }
]

// --- HUNTING REGULATIONS DATABASE ---

export const huntingRegulations: HuntingRegulation[] = [
  {
    speciesName: "White-tailed Deer",
    facRule: "68A-13, F.A.C.",
    licensePermits: "Hunting License, Deer Permit",
    legalHours: "One-half hour before sunrise to one-half hour after sunset",
    legalMethods: "Rifles, shotguns, muzzleloaders, bows, crossbows during appropriate seasons.",
    bagLimit: "2 per day (combined zones). Annual limit of 5 deer.",
    antlerRules: "Must have at least one antler at least 5 inches in length, OR at least 3 points on one side, OR a main beam of at least 10 inches. Varies by WMA.",
    officerNotes: "Common violations include hunting out of season, hunting without license/permits, taking deer without legal antlers, and untagged deer. Check for properly notched tags.",
    seasonDates: {
      "Zone A": { Archery: "Aug 3-Sep 1", General_Gun: "Oct 26-Jan 5" },
      "Zone B": { Archery: "Oct 12-Nov 10", General_Gun: "Nov 23-Feb 16" },
      "Zone C": { Archery: "Sep 14-Oct 13", General_Gun: "Nov 2-Jan 19" },
      "Zone D": { Archery: "Sep 28-Oct 27", General_Gun: "Nov 9-Jan 1" },
    }
  },
  {
    speciesName: "Osceola Turkey",
    facRule: "68A-13.004, F.A.C.",
    licensePermits: "Hunting License, Turkey Permit",
    legalHours: "One-half hour before sunrise until sunset",
    legalMethods: "Shotguns (10 gauge or smaller), bows, crossbows. No rifles or handguns.",
    bagLimit: "2 per season. Only bearded turkeys or gobblers.",
    officerNotes: "Main violations are hunting over bait, using illegal firearms/ammo (e.g., rifle or shot larger than No. 2), and taking hens.",
    seasonDates: {
      "South of SR 70": { Spring: "Mar 7-Apr 12", Fall: "N/A" },
      "North of SR 70": { Spring: "Mar 21-Apr 26", Fall: "N/A" },
    }
  },
  {
    speciesName: "Wild Hog",
    facRule: "68A-12.002, F.A.C.",
    licensePermits: "No license required for wild hogs on private land.",
    legalHours: "Daylight hours. Night hunting allowed on private land with landowner permission.",
    legalMethods: "Any legal rifle, shotgun, crossbow, bow, or pistol. No restrictions on magazine capacity.",
    bagLimit: "No size or bag limit on private lands.",
    officerNotes: "Wild hogs are not considered game animals. Primary violations involve hunting on public land without permission or hunting from a roadway.",
    seasonDates: {
      "Private Land": { All_Year: "Year-round" },
      "Public Land": { Varies: "Check specific WMA regulations" }
    }
  }
];

export const trappingRegulations: TrappingRegulation[] = [
    {
        speciesName: "Raccoon",
        facRule: "68A-24.002, F.A.C.",
        licensePermits: "Trapping License",
        season: "Statewide: Dec. 1 - Mar. 1",
        legalMethods: "Live traps, foothold traps, body-gripping traps, snares.",
        officerNotes: "Check for trapping license and that traps are being used within the legal season."
    },
    {
        speciesName: "Otter",
        facRule: "68A-24.002, F.A.C.",
        licensePermits: "Trapping License, CITES tag required for export.",
        season: "Statewide: Dec. 1 - Mar. 1",
        legalMethods: "Live traps, foothold traps, body-gripping traps with a 10-inch maximum jaw spread.",
        officerNotes: "Otter pelts require a CITES tag from FWC for legal sale or transport out of state. This is a key enforcement point."
    }
]

export const firearmsMethodsGuide: FirearmsMethodInfo[] = [
    {
        topic: "General Gun Season",
        rules: ["Centerfire rifles are permitted.", "Pistols and revolvers are permitted.", "Muzzleloaders are permitted.", "Shotguns are permitted, but slugs must be used for deer."],
    },
    {
        topic: "Migratory Birds (Ducks, Dove)",
        rules: ["Shotgun must be 10-gauge or smaller.", "Shotgun must be plugged and incapable of holding more than 3 shells in total (magazine and chamber).", "Lead shot is prohibited for waterfowl hunting."],
    },
    {
        topic: "Prohibited Methods",
        rules: ["Shooting from a moving vehicle is prohibited.", "Use of artificial light (e.g., spotlight) to take deer is prohibited.", "Use of bait is illegal for turkey and deer.", "Hunting from a public road or right-of-way is prohibited."],
    },
]


// --- BOATING & SPECIES GUIDE ---

export const boatingTopics: BoatingTopic[] = [
    {
        title: "PWC (Jet Ski) Regulations",
        icon: "Waves",
        details: [
          "Operator must be at least 14 years of age.",
          "Anyone born on or after Jan 1, 1988, must have a Boating Safety Education ID Card.",
          "Operator must wear an approved, non-inflatable PFD.",
          "Safety lanyard must be attached to the operator.",
          "Operation is prohibited from 1/2 hour after sunset to 1/2 hour before sunrise.",
        ]
    },
    {
        title: "Diver-Down Flag Rules",
        icon: "Flag",
        details: [
          "Flag must be at least 20x24 inches on a vessel, or 12x12 inches on a float.",
          "Boaters must stay at least 300 feet away in open water.",
          "Boaters must stay at least 100 feet away in inlets, rivers, and channels.",
          "Boaters must operate at idle speed within these distances.",
        ]
    },
    {
        title: "Boating Under the Influence (BUI)",
        icon: "Wind",
        details: [
            "Elements of the Offense (F.S. §327.35): Operating a vessel while normal faculties are impaired by alcohol/drugs, or with a BAC/BAL of 0.08 or higher.",
            "Legal Limit: 0.08 BAC for adults, 0.02 BAC for persons under 21.",
            "Implied Consent: By operating a vessel, a person has consented to a breath or urine test.",
            "Penalties for Refusal: Civil penalty and potential for misdemeanor charge on second refusal.",
        ]
    },
    {
        title: "Manatee & Speed Zone Guide",
        icon: "Info",
        details: [
            "Manatee zones are legally enforceable speed restrictions posted on markers.",
            "'Idle Speed / No Wake': The minimum speed required to maintain steerage.",
            "'Slow Speed / Minimum Wake': Vessel is fully settled in the water, not on a plane, and creating the smallest possible wake.",
            "Violating a posted manatee zone is a noncriminal infraction.",
        ],
        url: "https://myfwc.com/conservation/manatee/boat-operators/"
    },
    {
        title: "Boating Accident Reporting",
        icon: "Siren",
        details: [
            "An operator must report a boating accident to FWC, the county sheriff, or police department.",
            "Report immediately if accident results in: death, disappearance of a person, or injury requiring medical treatment beyond first aid.",
            "Report within a specified time if property damage appears to be at least $2,000.",
            "Leaving the scene of an accident involving injury or death is a felony.",
        ]
    }
];

export const boatingSafetyEquipment: Record<string, string[]> = {
    "< 16 feet": [
        "PFD: One USCG-approved wearable for each person.",
        "Registration: Certificate of Registration on board.",
        "Fire Extinguisher: One B-I type required if vessel has built-in fuel tank.",
        "Sound Device: Whistle or horn.",
        "Nav Lights: Required for sunset to sunrise operation.",
    ],
    "16 to < 26 feet": [
        "PFD: One USCG-approved wearable for each person AND one Type IV (throwable).",
        "Registration: Certificate of Registration on board.",
        "Fire Extinguisher: One B-I type required.",
        "Sound Device: Whistle or horn.",
        "Nav Lights: Required for sunset to sunrise operation.",
        "Visual Distress Signals: 3 handheld red flares (or approved equivalent) for coastal waters.",
    ],
    "26 to < 40 feet": [
        "PFD: One USCG-approved wearable for each person AND one Type IV (throwable).",
        "Registration: Certificate of Registration on board.",
        "Fire Extinguisher: Two B-I types or one B-II type.",
        "Sound Device: Bell and horn/whistle.",
        "Nav Lights: Required for sunset to sunrise operation.",
        "Visual Distress Signals: 3 handheld red flares (or approved equivalent) for coastal waters.",
    ]
}

// --- PROTECTED & NUISANCE SPECIES GUIDE ---

export const protectedSpeciesInfo: ProtectedSpeciesInfo[] = [
  {
    speciesName: "Gopher Tortoise",
    category: "Protected",
    protocol: "It is illegal to harass, possess, or damage burrows (a third-degree felony). Stop all site work (e.g., construction, mowing). Call FWC Dispatch to report the violation and get an FWC officer to respond.",
  },
  {
    speciesName: "American Alligator",
    category: "Regulated",
    protocol: "It is illegal to kill, harass, or possess an alligator without proper permits. For nuisance gators (in pools, garages, posing a threat), do not attempt to capture. Call the FWC's Statewide Nuisance Alligator Program (SNAP) at 866-FWC-GATOR.",
  },
  {
    speciesName: "Sea Turtles",
    category: "Protected",
    protocol: "All five species in Florida are protected. It is illegal to harass, take, or possess turtles, nests, or eggs. For a stranded or dead turtle, or a disturbed nest, call FWC's Wildlife Alert Hotline at 888-404-3922. Secure the area until an FWC officer arrives.",
  },
  {
    speciesName: "Florida Panther",
    category: "Protected",
    protocol: "Federally protected as an endangered species. Illegal to harass or harm. If you encounter an injured or dead panther (e.g., roadkill), secure the scene and immediately notify FWC Dispatch for response by their biologists.",
  },
  {
    speciesName: "Manatee",
    category: "Protected",
    protocol: "Illegal to harass, which includes feeding, giving water, or separating a calf from its mother. For injured, distressed, or dead manatees, call the FWC Wildlife Alert Hotline at 888-404-3922.",
  },
  {
    speciesName: "Bald Eagle",
    category: "Protected",
    protocol: "Federally and state protected. Do not approach nest or harass. Call FWC Dispatch for any injured birds or disturbances to nest sites."
  },
  {
    speciesName: "Invasive Species (Iguanas, Tegus, Lionfish)",
    category: "Nuisance",
    protocol: "No permit required to humanely kill. May be done on private property with landowner permission and on 25 designated public lands. Discharge of firearms is subject to local ordinances. No poison or traps may be used that would endanger native wildlife."
  }
];

// --- LICENSING & PERMITS ---

export const licenseData: LicenseInfo[] = [
    {
        licenseName: "Gold Sportsman's License",
        whatItCovers: "Hunting, Freshwater Fishing, and Saltwater Fishing.",
        permitsIncluded: "Deer, Turkey, Snook, Lobster, WMA, Migratory Bird, Waterfowl.",
        costResident: "~$100.00",
        notes: "The all-in-one option for the avid outdoorsman. Does not include tarpon tag or federal duck stamp."
    },
    {
        licenseName: "Saltwater Shoreline-only License",
        whatItCovers: "Allows fishing for saltwater species from land or a structure fixed to land.",
        permitsIncluded: "None. Snook and Lobster permits must be purchased separately.",
        costResident: "No-cost (for residents)",
        notes: "This license is free for Florida residents but is required. It does NOT cover fishing from a boat."
    },
    {
        licenseName: "Military Gold Sportsman's License",
        whatItCovers: "Same as Gold Sportsman's.",
        permitsIncluded: "Same as Gold Sportsman's.",
        costResident: "~$20.00",
        notes: "Available to active duty and retired military members who are Florida residents. Must present military ID."
    }
]
