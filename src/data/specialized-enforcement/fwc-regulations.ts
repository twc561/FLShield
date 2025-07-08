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

export type BoatingTopic = {
  title: string;
  icon: string;
  details: string[];
}

export type BoatingSafetyEquipment = {
    title: string;
    icon: string;
    checklists: Record<string, string[]>;
    topics: BoatingTopic[];
};

export type BuiReference = {
    title: string;
    icon: string;
    details: string[];
}

export type ManateeZoneInfo = {
    title: string;
    icon: string;
    details: string[];
    url: string;
}

export type ProtectedSpeciesInfo = {
  speciesName: string;
  category: string;
  protocol: string;
};


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
    speciesName: "Largemouth Bass",
    commonNames: "Black Bass",
    facRule: "68A-23.005, F.A.C.",
    licenseRequired: "Yes, Freshwater License",
    gearRestrictions: "Hook and line only. No snatch hooks.",
    officerNotes: "Check for compliance with bag limits. Possession of undersized fish is a common violation. Tournament anglers may have specific exemptions.",
    atlantic: { // Note: Freshwater regs are statewide, but structure is kept for consistency.
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

// --- BOATING & SPECIES GUIDE ---

export const boatingSafetyEquipment: BoatingSafetyEquipment = {
    title: "Boating Safety Equipment",
    icon: "LifeBuoy",
    checklists: {
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
    },
    topics: [
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
    ]
};

export const buiReference: BuiReference = {
    title: "Boating Under the Influence (BUI)",
    icon: "Wind",
    details: [
        "Elements of the Offense (F.S. §327.35): Operating a vessel while normal faculties are impaired by alcohol/drugs, or with a BAC/BAL of 0.08 or higher.",
        "Legal Limit: 0.08 BAC for adults, 0.02 BAC for persons under 21.",
        "Implied Consent: By operating a vessel, a person has consented to a breath or urine test.",
        "Penalties for Refusal: Civil penalty and potential for misdemeanor charge on second refusal.",
        "FWC officers have authority to conduct BUI investigations. Local LEOs do as well on waters within their jurisdiction.",
    ]
}

export const manateeZoneInfo: ManateeZoneInfo = {
    title: "Manatee & Speed Zone Guide",
    icon: "Info",
    details: [
        "Manatee zones are legally enforceable speed restrictions posted on markers.",
        "'Idle Speed / No Wake': The minimum speed required to maintain steerage.",
        "'Slow Speed / Minimum Wake': Vessel is fully settled in the water, not on a plane, and creating the smallest possible wake.",
        "Violating a posted manatee zone is a noncriminal infraction. Repeat violations can be criminal.",
        "These zones are critical for preventing boat strikes on manatees.",
    ],
    url: "https://myfwc.com/conservation/manatee/boat-operators/"
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
    category: "Nuisance",
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
];
