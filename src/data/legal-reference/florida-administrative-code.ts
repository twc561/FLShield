
export type FacPlaceholder = {
  id: string; // e.g., "FAC_61A-3_0141"
  ruleNumber: string; // e.g., "61A-3.0141"
  ruleTitle: string;
  category: string;
  icon: string;
};

export type FacDetail = {
  id: string;
  ruleNumber: string;
  ruleTitle: string;
  governingAgency: string;
  fullText: string;
  plainLanguageSummary: string;
  enforcementGuidance: {
    title: string;
    points: string[];
  };
  relatedStateStatute: string;
};

export const facPlaceholders: FacPlaceholder[] = [
  // DBPR - Alcoholic Beverages & Tobacco
  {
    id: "FAC_61A-3_0141",
    ruleNumber: "61A-3.0141",
    ruleTitle: "Beverage and Food Service in Licensed Premises",
    category: "Dept. of Business & Professional Regulation (DBPR - Alcoholic Beverages & Tobacco)",
    icon: "Beer",
  },
  {
    id: "FAC_61A-4_006",
    ruleNumber: "61A-4.006",
    ruleTitle: "Hours of Sale and Service of Alcoholic Beverages",
    category: "Dept. of Business & Professional Regulation (DBPR - Alcoholic Beverages & Tobacco)",
    icon: "Clock",
  },
  // FWC
  {
    id: "FAC_68A-12_002",
    ruleNumber: "68A-12.002",
    ruleTitle: "General Methods of Taking Game",
    category: "Fish & Wildlife Conservation Commission (FWC)",
    icon: "Crosshair",
  },
  {
    id: "FAC_68A-24_002",
    ruleNumber: "68A-24.002",
    ruleTitle: "General Provisions for Taking, Possession, and Sale of Fur-bearing Animals",
    category: "Fish & Wildlife Conservation Commission (FWC)",
    icon: "Cat",
  },
  {
    id: "FAC_68B-22",
    ruleNumber: "68B-22",
    ruleTitle: "Red Drum (Redfish)",
    category: "Fish & Wildlife Conservation Commission (FWC)",
    icon: "Fish",
  },
  {
    id: "FAC_68D-24_003",
    ruleNumber: "68D-24.003",
    ruleTitle: "Vessel Speed Restrictions",
    category: "Fish & Wildlife Conservation Commission (FWC)",
    icon: "Waves",
  },
  // DHSMV
  {
    id: "FAC_15A-6_013",
    ruleNumber: "15A-6.013",
    ruleTitle: "Procedures for Breath Alcohol Testing",
    category: "Dept. of Highway Safety & Motor Vehicles (DHSMV)",
    icon: "Wind",
  },
  {
    id: "FAC_15B-11_002",
    ruleNumber: "15B-11.002",
    ruleTitle: "Exhaust Systems",
    category: "Dept. of Highway Safety & Motor Vehicles (DHSMV)",
    icon: "Truck",
  },
];
