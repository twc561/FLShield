
export type CommonCrimeMapEntry = {
  crimeName: string;
  statuteNumber: string;
  instructionID: string; // Add the direct link to the instruction
  keywords: string[];
};

// This map provides a fast, reliable, local lookup for common crimes
// to bypass the AI identification step and guarantee accuracy.
export const commonCrimesMap: CommonCrimeMapEntry[] = [
  // --- Serious Felonies ---
  {
    crimeName: "First Degree Murder",
    statuteNumber: "782.04",
    instructionID: "FL_JI_CRIM_7_2",
    keywords: ["murder", "first degree murder", "homicide"],
  },
  {
    crimeName: "Second Degree Murder",
    statuteNumber: "782.04",
    instructionID: "FL_JI_CRIM_7_3",
    keywords: ["murder", "homicide", "depraved mind"],
  },
  {
    crimeName: "Kidnapping",
    statuteNumber: "787.01",
    instructionID: "FL_JI_CRIM_9_1",
    keywords: ["kidnapping", "abduction"],
  },
  {
    crimeName: "Robbery",
    statuteNumber: "812.13",
    instructionID: "FL_JI_CRIM_15_1",
    keywords: ["robbery", "rob", "robbery with a firearm"],
  },
  {
    crimeName: "Burglary",
    statuteNumber: "810.02",
    instructionID: "FL_JI_CRIM_13_1",
    keywords: ["burglary", "b&e", "breaking and entering"],
  },
  {
    crimeName: "Aggravated Battery",
    statuteNumber: "784.045",
    instructionID: "FL_JI_CRIM_8_7",
    keywords: ["aggravated battery", "agg batt", "battery with a weapon"],
  },
  {
    crimeName: "Aggravated Assault",
    statuteNumber: "784.021",
    instructionID: "FL_JI_CRIM_8_4",
    keywords: ["aggravated assault", "agg assault", "assault with a weapon"],
  },
  {
    crimeName: "Drug Trafficking",
    statuteNumber: "893.135",
    instructionID: "FL_JI_CRIM_25_7",
    keywords: ["trafficking", "drug trafficking"],
  },
  {
    crimeName: "Dealing in Stolen Property",
    statuteNumber: "812.019",
    instructionID: "FL_JI_CRIM_14_4",
    keywords: ["dealing in stolen property", "fencing"],
  },
  {
    crimeName: "Felony Battery",
    statuteNumber: "784.041",
    instructionID: "FL_JI_CRIM_8_6",
    keywords: ["felony battery"],
  },
  
  // --- Common Felonies & Misdemeanors ---
   {
    crimeName: "Theft",
    statuteNumber: "812.014",
    instructionID: "FL_JI_CRIM_14_1",
    keywords: ["theft", "petit theft", "grand theft", "stolen", "shoplifting", "retail theft"],
  },
  {
    crimeName: "Possession of a Controlled Substance",
    statuteNumber: "893.13",
    instructionID: "FL_JI_CRIM_25_2",
    keywords: ["possession", "drug possession", "controlled substance", "possession of cannabis", "possession of marijuana", "possession of cocaine"],
  },
   {
    crimeName: "Resisting Officer With Violence",
    statuteNumber: "843.01",
    instructionID: "FL_JI_CRIM_21_2",
    keywords: ["resisting with violence", "rowv", "battery on leo"],
  },
   {
    crimeName: "Resisting Officer Without Violence",
    statuteNumber: "843.02",
    // No standard instruction, elements come from case law. AI fallback is appropriate.
    instructionID: "AI_FALLBACK", 
    keywords: ["resisting without violence", "rowov", "resisting arrest"],
  },
  {
    crimeName: "Battery",
    statuteNumber: "784.03",
    instructionID: "FL_JI_CRIM_8_5",
    keywords: ["battery", "simple battery"],
  },
  {
    crimeName: "Assault",
    statuteNumber: "784.011",
    instructionID: "FL_JI_CRIM_8_3",
    keywords: ["assault", "simple assault"],
  },
  {
    crimeName: "Criminal Mischief",
    statuteNumber: "806.13",
    instructionID: "FL_JI_CRIM_12_3",
    keywords: ["criminal mischief", "vandalism"],
  },
  {
    crimeName: "Possession of Drug Paraphernalia",
    statuteNumber: "893.147",
    instructionID: "FL_JI_CRIM_25_17",
    keywords: ["paraphernalia", "drug paraphernalia"],
  },

  // --- Common Misdemeanors ---
  {
    crimeName: "Disorderly Conduct",
    statuteNumber: "877.03",
    // No standard instruction, elements come from case law. AI fallback is appropriate.
    instructionID: "AI_FALLBACK", 
    keywords: ["disorderly conduct", "breach of peace", "disorderly"],
  },
  {
    crimeName: "Loitering or Prowling",
    statuteNumber: "856.021",
    // No standard instruction, elements come from case law. AI fallback is appropriate.
    instructionID: "AI_FALLBACK", 
    keywords: ["loitering", "prowling"],
  },
  {
    crimeName: "Trespass on Property Other Than Structure or Conveyance",
    statuteNumber: "810.09",
    // No standard instruction, elements come from case law. AI fallback is appropriate.
    instructionID: "AI_FALLBACK", 
    keywords: ["trespass", "trespassing", "trespass after warning"],
  },
  {
    crimeName: "Trespass in Structure or Conveyance",
    statuteNumber: "810.08",
    // This often uses the Burglary instruction (13.1) as a base, but is distinct.
    instructionID: "FL_JI_CRIM_13_1", 
    keywords: ["trespass in structure", "trespass in vehicle"],
  },
  {
    crimeName: "Disorderly Intoxication",
    statuteNumber: "856.011",
     // No standard instruction, elements come from case law. AI fallback is appropriate.
    instructionID: "AI_FALLBACK",
    keywords: ["disorderly intoxication", "public intoxication", "drunk in public"],
  },
  {
    crimeName: "Driving Under the Influence (DUI)",
    statuteNumber: "316.193",
    // No standard instruction for the crime itself, handled by specific rules of evidence.
    instructionID: "AI_FALLBACK", 
    keywords: ["dui", "driving under the influence", "dwi"],
  },
  {
    crimeName: "No Valid Driver's License",
    statuteNumber: "322.03",
    // No standard instruction, elements are statutory.
    instructionID: "AI_FALLBACK", 
    keywords: ["no valid driver's license", "nvdl", "no license"],
  },
  {
    crimeName: "Driving While License Suspended (DWLS)",
    statuteNumber: "322.34",
    // No standard instruction, elements are statutory.
    instructionID: "AI_FALLBACK", 
    keywords: ["dwls", "driving while suspended", "suspended license"],
  },
  {
    crimeName: "Carrying a Concealed Weapon",
    statuteNumber: "790.01",
    // No standard instruction, elements are statutory.
    instructionID: "AI_FALLBACK", 
    keywords: ["carrying concealed weapon", "ccw"],
  }
];
