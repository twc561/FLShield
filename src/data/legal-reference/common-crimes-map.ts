
export type CommonCrimeMapEntry = {
  crimeName: string;
  statuteNumber: string;
  keywords: string[];
};

// This map provides a fast, reliable, local lookup for common crimes
// to bypass the AI identification step and guarantee accuracy.
export const commonCrimesMap: CommonCrimeMapEntry[] = [
  // --- Serious Felonies ---
  {
    crimeName: "First Degree Murder",
    statuteNumber: "782.04",
    keywords: ["murder", "first degree murder", "homicide"],
  },
  {
    crimeName: "Kidnapping",
    statuteNumber: "787.01",
    keywords: ["kidnapping", "abduction"],
  },
  {
    crimeName: "Robbery",
    statuteNumber: "812.13",
    keywords: ["robbery"],
  },
  {
    crimeName: "Burglary",
    statuteNumber: "810.02",
    keywords: ["burglary", "b&e", "breaking and entering"],
  },
  {
    crimeName: "Aggravated Battery",
    statuteNumber: "784.045",
    keywords: ["aggravated battery", "battery with a weapon"],
  },
  {
    crimeName: "Aggravated Assault",
    statuteNumber: "784.021",
    keywords: ["aggravated assault", "assault with a weapon"],
  },
  {
    crimeName: "Drug Trafficking",
    statuteNumber: "893.135",
    keywords: ["trafficking", "drug trafficking"],
  },
  {
    crimeName: "Dealing in Stolen Property",
    statuteNumber: "812.019",
    keywords: ["dealing in stolen property", "fencing"],
  },
  {
    crimeName: "Felony Battery",
    statuteNumber: "784.041",
    keywords: ["felony battery"],
  },
  
  // --- Common Felonies & Misdemeanors ---
   {
    crimeName: "Theft",
    statuteNumber: "812.014",
    keywords: ["theft", "petit theft", "grand theft", "stolen", "shoplifting", "retail theft"],
  },
  {
    crimeName: "Possession of a Controlled Substance",
    statuteNumber: "893.13",
    keywords: ["possession", "drug possession", "controlled substance", "possession of cannabis", "possession of marijuana"],
  },
   {
    crimeName: "Resisting Officer With Violence",
    statuteNumber: "843.01",
    keywords: ["resisting with violence", "rowv"],
  },
   {
    crimeName: "Resisting Officer Without Violence",
    statuteNumber: "843.02",
    keywords: ["resisting without violence", "rowov", "resisting arrest"],
  },
  {
    crimeName: "Battery",
    statuteNumber: "784.03",
    keywords: ["battery", "simple battery"],
  },
  {
    crimeName: "Assault",
    statuteNumber: "784.011",
    keywords: ["assault"],
  },
  {
    crimeName: "Criminal Mischief",
    statuteNumber: "806.13",
    keywords: ["criminal mischief", "vandalism"],
  },
  {
    crimeName: "Possession of Drug Paraphernalia",
    statuteNumber: "893.147",
    keywords: ["paraphernalia", "drug paraphernalia"],
  },

  // --- Common Misdemeanors ---
  {
    crimeName: "Disorderly Conduct",
    statuteNumber: "877.03",
    keywords: ["disorderly conduct", "breach of peace", "disorderly"],
  },
  {
    crimeName: "Loitering or Prowling",
    statuteNumber: "856.021",
    keywords: ["loitering", "prowling"],
  },
  {
    crimeName: "Trespass on Property Other Than Structure or Conveyance",
    statuteNumber: "810.09",
    keywords: ["trespass", "trespassing", "trespass after warning"],
  },
  {
    crimeName: "Trespass in Structure or Conveyance",
    statuteNumber: "810.08",
    keywords: ["trespass in structure", "trespass in vehicle"],
  },
  {
    crimeName: "Disorderly Intoxication",
    statuteNumber: "856.011",
    keywords: ["disorderly intoxication", "public intoxication", "drunk in public"],
  },
  {
    crimeName: "Driving Under the Influence (DUI)",
    statuteNumber: "316.193",
    keywords: ["dui", "driving under the influence", "dwi"],
  },
  {
    crimeName: "No Valid Driver's License",
    statuteNumber: "322.03",
    keywords: ["no valid driver's license", "nvdl", "no license"],
  },
  {
    crimeName: "Driving While License Suspended (DWLS)",
    statuteNumber: "322.34",
    keywords: ["dwls", "driving while suspended", "suspended license"],
  },
  {
    crimeName: "Carrying a Concealed Weapon",
    statuteNumber: "790.01",
    keywords: ["carrying concealed weapon", "ccw"],
  }
];
