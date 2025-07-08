
export type HazmatPlacard = {
  id: string; // The 4-digit UN/NA number
  name: string;
  guideNumber: string; // ERG Guide Number
  hazards: string[];
  publicSafety: string[];
  emergencyResponse: string[];
};

// This is a small sample based on the 2020 Emergency Response Guidebook (ERG).
export const hazmatData: HazmatPlacard[] = [
  {
    id: "1203",
    name: "Gasoline / Petrol",
    guideNumber: "128",
    hazards: [
      "HIGHLY FLAMMABLE: Will be easily ignited by heat, sparks or flames.",
      "Vapors may form explosive mixtures with air.",
      "Vapors may travel to source of ignition and flash back.",
      "Inhalation or contact with material may irritate or burn skin and eyes.",
    ],
    publicSafety: [
      "Isolate spill or leak area immediately for at least 50 meters (150 feet) in all directions.",
      "Keep unauthorized personnel away.",
      "Stay upwind, uphill, and/or upstream.",
      "Large Spill: Consider initial downwind evacuation for at least 300 meters (1000 feet).",
    ],
    emergencyResponse: [
      "Wear positive pressure self-contained breathing apparatus (SCBA).",
      "For fire, use dry chemical, CO2, water spray or regular foam.",
      "Water spray may be ineffective but can be used to cool fire-exposed containers.",
      "First Aid: Move victim to fresh air. Remove and isolate contaminated clothing.",
    ],
  },
  {
    id: "1075",
    name: "Petroleum gases, liquefied / LPG",
    guideNumber: "115",
    hazards: [
      "EXTREMELY FLAMMABLE. Vapors are heavier than air and may travel to an ignition source.",
      "May explode if ignited in a confined area.",
      "Vapors may cause dizziness or asphyxiation without warning.",
      "Contact with gas or liquefied gas may cause burns, severe injury and/or frostbite.",
    ],
    publicSafety: [
      "Isolate spill or leak area immediately for at least 100 meters (330 feet) in all directions.",
      "Large Spill: Consider initial downwind evacuation for at least 800 meters (1/2 mile).",
      "Keep unauthorized personnel away. Stay upwind.",
    ],
    emergencyResponse: [
      "Wear positive pressure self-contained breathing apparatus (SCBA).",
      "If tank is rupturing, LEAVE AREA IMMEDIATELY (BLEVE risk).",
      "Stop flow of gas if you can do so without risk.",
      "Use water spray to reduce vapors but do not spray water directly on leak or safety devices.",
      "First Aid: Move victim to fresh air. For frostbite, gently warm affected areas.",
    ],
  },
   {
    id: "1005",
    name: "Ammonia, anhydrous",
    guideNumber: "125",
    hazards: [
      "TOXIC; may be fatal if inhaled. Vapors are irritating and corrosive.",
      "Contact with gas or liquefied gas may cause burns, severe injury and/or frostbite.",
      "Flammable, although it requires a strong ignition source.",
    ],
    publicSafety: [
      "Isolate spill or leak area immediately for at least 100 meters (330 feet) in all directions.",
      "Large Spill: Consider initial downwind evacuation for at least 800 meters (1/2 mile).",
      "Keep unauthorized personnel away. Stay upwind and uphill.",
    ],
    emergencyResponse: [
      "Wear positive pressure self-contained breathing apparatus (SCBA) and chemical protective clothing.",
      "Stop flow of gas if you can do so without risk.",
      "Use water spray to reduce vapors, but do not apply water directly to the liquid.",
      "First Aid: Move victim to fresh air. Flush skin and eyes with running water for at least 20 minutes.",
    ],
  },
   {
    id: "1017",
    name: "Chlorine",
    guideNumber: "124",
    hazards: [
      "TOXIC; may be fatal if inhaled. Vapors are heavier than air and will spread along the ground.",
      "Causes severe skin burns and eye damage.",
      "Is an oxidizer which can ignite combustibles (wood, paper, oil, etc.).",
      "Containers may explode when heated.",
    ],
    publicSafety: [
      "Isolate spill or leak area immediately for at least 100 meters (330 feet) in all directions.",
      "Large Spill: Consider initial downwind evacuation for at least 1000 meters (0.6 miles).",
      "Keep unauthorized personnel away. Stay upwind and uphill.",
    ],
    emergencyResponse: [
      "Wear positive pressure self-contained breathing apparatus (SCBA) and chemical protective clothing.",
      "Stop leak if you can do so without risk.",
      "Use water spray to reduce vapors, but do not apply water directly on leak or safety devices.",
      "First Aid: Move victim to fresh air. Flush skin and eyes with running water for at least 20 minutes. Effects of exposure may be delayed.",
    ],
  },
];
