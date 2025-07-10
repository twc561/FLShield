
export type CommonCrimeMapEntry = {
  crimeName: string;
  statuteNumber: string;
  keywords: string[];
};

// This map provides a fast, reliable, local lookup for common crimes
// to bypass the AI identification step and guarantee accuracy.
export const commonCrimesMap: CommonCrimeMapEntry[] = [
  {
    crimeName: "First Degree Murder",
    statuteNumber: "782.04",
    keywords: ["murder", "first degree murder", "homicide"],
  },
  {
    crimeName: "Assault",
    statuteNumber: "784.011",
    keywords: ["assault"],
  },
  {
    crimeName: "Aggravated Assault",
    statuteNumber: "784.021",
    keywords: ["aggravated assault", "assault with a weapon"],
  },
  {
    crimeName: "Battery",
    statuteNumber: "784.03",
    keywords: ["battery", "simple battery"],
  },
  {
    crimeName: "Felony Battery",
    statuteNumber: "784.041",
    keywords: ["felony battery"],
  },
  {
    crimeName: "Aggravated Battery",
    statuteNumber: "784.045",
    keywords: ["aggravated battery", "battery with a weapon"],
  },
  {
    crimeName: "Kidnapping",
    statuteNumber: "787.01",
    keywords: ["kidnapping", "abduction"],
  },
  {
    crimeName: "Burglary",
    statuteNumber: "810.02",
    keywords: ["burglary", "b&e", "breaking and entering"],
  },
  {
    crimeName: "Theft",
    statuteNumber: "812.014",
    keywords: ["theft", "petit theft", "grand theft", "stolen"],
  },
  {
    crimeName: "Robbery",
    statuteNumber: "812.13",
    keywords: ["robbery"],
  },
  {
    crimeName: "Criminal Mischief",
    statuteNumber: "806.13",
    keywords: ["criminal mischief", "vandalism"],
  },
  {
    crimeName: "Dealing in Stolen Property",
    statuteNumber: "812.019",
    keywords: ["dealing in stolen property", "fencing"],
  },
  {
    crimeName: "Possession of a Controlled Substance",
    statuteNumber: "893.13",
    keywords: ["possession", "drug possession", "controlled substance"],
  },
  {
    crimeName: "Drug Trafficking",
    statuteNumber: "893.135",
    keywords: ["trafficking", "drug trafficking"],
  },
  {
    crimeName: "Possession of Drug Paraphernalia",
    statuteNumber: "893.147",
    keywords: ["paraphernalia"],
  },
  {
    crimeName: "Resisting Officer With Violence",
    statuteNumber: "843.01",
    keywords: ["resisting with violence", "rowv"],
  },
   {
    crimeName: "Resisting Officer Without Violence",
    statuteNumber: "843.02",
    keywords: ["resisting without violence", "rowov"],
  },
];
