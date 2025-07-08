export type ChecklistItem = {
  StepNumber: number;
  CheckItem: string;
  WhatToLookFor: string;
  RelevantCitation: string;
};

export type InspectionCategory = {
  CategoryName: string;
  CommonViolations: string[];
  GoverningRule: string;
  OfficerNotes: string;
};

export type HazmatPlacard = {
  UN_ID: string;
  ProperShippingName: string;
  HazardClass: string;
  ERG_GuideNumber: string;
  KeyEmergencyActions: string;
};

export type OversizeQuestion = {
  question: string;
  answer: string;
};

export type CmvViolation = {
  ViolationName: string;
  CommonName: string;
  Citation: string;
  ViolationType: "Driver" | "Vehicle" | "Cargo";
  Severity: "Standard" | "Out-of-Service";
  OfficerNotes: string;
};

export type CommercialVehicleGuide = {
  firstFiveMinutesChecklist: ChecklistItem[];
  walkAroundInspectionGuide: InspectionCategory[];
  specializedCargoReference: {
    hazmatPlacards: HazmatPlacard[];
    oversizeLoadGuide: OversizeQuestion[];
  };
  commonCmvViolations: CmvViolation[];
};

export const commercialVehicleGuideData: CommercialVehicleGuide = {
  firstFiveMinutesChecklist: [
    {
      StepNumber: 1,
      CheckItem: "CDL Class & Endorsements",
      WhatToLookFor:
        "Does the license class (A, B, C) match the vehicle being operated? Are endorsements like (H) HazMat, (N) Tanker, or (P) Passenger present if required by the load or vehicle type?",
      RelevantCitation: "F.S. § 322.03 / 49 C.F.R. § 383",
    },
    {
      StepNumber: 2,
      CheckItem: "Medical Certificate (Med Card)",
      WhatToLookFor:
        "Driver must have a current, valid medical certificate. Check the expiration date. Some drivers have a 'medical certification' status electronically linked to their CDL ('certified-interstate').",
      RelevantCitation: "49 C.F.R. § 391.41",
    },
    {
      StepNumber: 3,
      CheckItem: "Hours of Service (HOS)",
      WhatToLookFor:
        "Check the driver's logbook (paper or Electronic Logging Device - ELD). Are they within the 11-hour driving limit and 14-hour duty day? Check for falsification (e.g., logs too neat, conflicting fuel receipts).",
      RelevantCitation: "49 C.F.R. § 395",
    },
    {
      StepNumber: 4,
      CheckItem: "Vehicle Registration (IRP)",
      WhatToLookFor:
        "Look for the 'Apportioned' registration or International Registration Plan (IRP) 'cab card.' This shows the vehicle is registered to operate in multiple states.",
      RelevantCitation: "F.S. § 320.0715",
    },
    {
      StepNumber: 5,
      CheckItem: "Fuel Tax Decal (IFTA)",
      WhatToLookFor:
        "Look for the International Fuel Tax Agreement (IFTA) decal on the exterior of the cab (usually on the lower corner of the driver and passenger doors).",
      RelevantCitation: "F.S. § 207.004",
    },
  ],
  walkAroundInspectionGuide: [
    {
      CategoryName: "Tires",
      CommonViolations: [
        "Tire tread depth less than 4/32 inch on a steering axle.",
        "Tire tread depth less than 2/32 inch on any non-steering axle.",
        "Visible fabric, bumps, knots, or cuts on the sidewall.",
        "Audible air leak from any tire.",
      ],
      GoverningRule: "49 C.F.R. § 393.75",
      OfficerNotes:
        "A bad steer tire is an immediate out-of-service violation. Use a tread depth gauge. A simple visual inspection can reveal major safety issues.",
    },
    {
      CategoryName: "Lights & Reflective Tape",
      CommonViolations: [
        "Inoperative headlight, taillight, brake light, or turn signal.",
        "Missing or inoperative clearance lights (amber on front, red on rear).",
        "Required red-and-white reflective tape is missing, obscured, or damaged along sides and rear of the trailer.",
      ],
      GoverningRule: "49 C.F.R. § 393.11",
      OfficerNotes:
        "Proper lighting is critical for preventing nighttime collisions. Have the driver activate all lights for inspection. Reflective tape violations are very common.",
    },
    {
      CategoryName: "Brakes (Audible Leaks & Adjustment)",
      CommonViolations: [
        "Audible air leak from brake lines or chambers.",
        "Pushrod stroke exceeds the legal limit (requires specialized knowledge to measure, but visible slack can be an indicator).",
        "Broken or missing brake components.",
      ],
      GoverningRule: "49 C.F.R. § 393.45",
      OfficerNotes:
        "With the engine off, listen for audible air leaks, which are serious violations. While you may not be certified to conduct a full brake inspection, obvious, audible leaks are a major safety red flag.",
    },
    {
      CategoryName: "Load Securement",
      CommonViolations: [
        "Insufficient number of tie-downs for the length/weight of cargo.",
        "Damaged/frayed straps, cracked chains, or defective binders.",
        "Unsecured equipment on the vehicle (dunnage, tools, etc.).",
        "Load has shifted and is no longer stable.",
      ],
      GoverningRule: "49 C.F.R. § 393 - Cargo Securement Rules",
      OfficerNotes:
        "This is a major public safety risk. Unsecured loads can cause fatal accidents. Be meticulous in checking straps and binders. As a rule of thumb, there should be one tie-down for every 10 feet of cargo.",
    },
    {
      CategoryName: "Coupling Devices (5th Wheel)",
      CommonViolations: [
        "Cracks or breaks in the 5th wheel plate, slide rails, or mounting brackets.",
        "Insufficient lubrication on the 5th wheel plate.",
        "The locking jaw is not securely closed around the trailer's kingpin.",
        "The release handle is not in the fully locked position.",
      ],
      GoverningRule: "49 C.F.R. § 393.70",
      OfficerNotes:
        "A failure in the coupling system can lead to a catastrophic trailer separation. Visually inspect for cracks and ensure the connection appears secure.",
    },
  ],
  specializedCargoReference: {
    hazmatPlacards: [
      {
        UN_ID: "1203",
        ProperShippingName: "Gasoline",
        HazardClass: "3",
        ERG_GuideNumber: "128",
        KeyEmergencyActions:
          "IMMEDIATE ACTION: Isolate spill or leak area for at least 50 meters. FIRE: Use dry chemical, CO2, or water spray. Vapors are heavier than air and may form explosive mixtures.",
      },
      {
        UN_ID: "1993",
        ProperShippingName: "Flammable Liquid, n.o.s.",
        HazardClass: "3",
        ERG_GuideNumber: "128",
        KeyEmergencyActions:
          "This is a generic entry for various flammable liquids. Follow the same precautions as gasoline (ERG 128). Isolate, stay upwind, and avoid ignition sources.",
      },
      {
        UN_ID: "1075",
        ProperShippingName: "Liquefied petroleum gas (LPG)",
        HazardClass: "2.1",
        ERG_GuideNumber: "115",
        KeyEmergencyActions:
          "EXTREMELY FLAMMABLE GAS. Risk of BLEVE (Boiling Liquid Expanding Vapor Explosion). Do not approach if tank is venting loudly or has discoloration from heat. Evacuate at least 800 meters (1/2 mile) for large fire.",
      },
      {
        UN_ID: "1017",
        ProperShippingName: "Chlorine",
        HazardClass: "2.3",
        ERG_GuideNumber: "124",
        KeyEmergencyActions:
          "TOXIC INHALATION HAZARD. Vapors are heavier than air and corrosive. Stay upwind and uphill. Evacuate downwind. Use of SCBA is critical for any entry.",
      },
    ],
    oversizeLoadGuide: [
      {
        question: "What are the flag & banner requirements for an oversize load?",
        answer:
          "Red or fluorescent orange flags, 18 inches square, must mark the corners and any projections of the load. An 'OVERSIZE LOAD' banner (black letters on yellow background) is required on the front of the escort vehicle and the rear of the load-carrying vehicle.",
      },
      {
        question: "What are the standard time-of-day/holiday travel restrictions?",
        answer:
          "Oversize loads are generally restricted from moving from 30 minutes after sunset to 30 minutes before sunrise. Movement is also typically prohibited on major holidays (e.g., Thanksgiving, Christmas, New Year's Day).",
      },
      {
        question: "What key information must be on the oversize permit?",
        answer:
          "The permit must be in the vehicle and available for inspection. It must specify the exact dimensions of the load (width, height, length), the gross weight, and the approved route of travel. The driver must be on the permitted route.",
      },
    ],
  },
  commonCmvViolations: [
    {
      ViolationName: "Logbook not current / Falsified",
      CommonName: "Inaccurate Logs",
      Citation: "49 C.F.R. § 395.8",
      ViolationType: "Driver",
      Severity: "Out-of-Service",
      OfficerNotes:
        "A common indicator of a falsified log is handwriting that is too neat or entries that are identical day after day. Compare the logbook entries to supporting documents like fuel receipts or bills of lading to verify accuracy. An ELD malfunction without proper notification is also a violation.",
    },
    {
      ViolationName: "Driving beyond 11-hour/14-hour limits",
      CommonName: "Hours of Service Violation",
      Citation: "49 C.F.R. § 395.3",
      ViolationType: "Driver",
      Severity: "Out-of-Service",
      OfficerNotes:
        "This is a critical safety violation indicating driver fatigue. The driver will be placed out-of-service and must take a 10-hour break before driving again. This is a primary focus of DOT inspections.",
    },
    {
      ViolationName: "No medical certificate in possession",
      CommonName: "No Med Card",
      Citation: "49 C.F.R. § 391.41",
      ViolationType: "Driver",
      Severity: "Standard",
      OfficerNotes:
        "While not an out-of-service violation, this is a common citation. The driver must have their med card with them. If their license shows 'certified-interstate,' check the state's online system to verify if possible.",
    },
    {
      ViolationName: "Tire tread depth less than 4/32 inch on steering axle",
      CommonName: "Bad Steer Tire",
      Citation: "49 C.F.R. § 393.75(b)",
      ViolationType: "Vehicle",
      Severity: "Out-of-Service",
      OfficerNotes:
        "This is one of the most serious and common equipment violations. A blowout on a steer axle can be catastrophic. The vehicle cannot be moved until the tire is replaced.",
    },
    {
      ViolationName: "Improper or insufficient cargo securement",
      CommonName: "Unsecured Load",
      Citation: "49 C.F.R. § 393.100",
      ViolationType: "Cargo",
      Severity: "Out-of-Service",
      OfficerNotes:
        "If the load has shifted, straps are broken, or there are not enough tie-downs, the vehicle is out-of-service until the load is made safe. This prevents a major roadway hazard.",
    },
  ],
};
