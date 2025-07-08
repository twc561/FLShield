export type DomesticViolenceProtocol = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  officerTakeaway: string;
};

export const domesticViolenceData: DomesticViolenceProtocol[] = [
  {
    id: "dv1",
    title: "Initial Scene Management & Safety",
    icon: "Siren",
    description: "The first moments on a DV scene are critical for officer and victim safety.",
    details: [
      "Approach cautiously. Listen before you knock to assess the situation inside.",
      "Never stand directly in front of the door. Position for tactical advantage.",
      "Immediately separate all parties upon entry. Keep them separated and out of earshot.",
      "Visually scan all parties for injuries and scan the area for weapons.",
      "Request medical assistance for any injuries, no matter how minor they appear.",
    ],
    officerTakeaway: "These scenes are emotionally charged and highly unpredictable. Your tactical mindset is paramount. Control the scene before you begin the investigation.",
  },
  {
    id: "dv2",
    title: "Evidence Gathering & Investigation",
    icon: "Camera",
    description: "Building a case that can be prosecuted without victim cooperation requires thorough evidence collection.",
    details: [
      "Photograph all injuries on all parties, even minor redness or scratches.",
      "Photograph the scene, including any signs of a struggle, broken items, or disarray.",
      "Record 'excited utterances'—spontaneous statements made by parties upon your arrival.",
      "Interview all witnesses, including children, separately. Use open-ended questions.",
      "Check for prior DV history at the location and with the involved individuals through dispatch.",
      "Seize any weapons used or threatened to be used.",
    ],
    officerTakeaway: "Assume the victim may later recant. Your physical evidence and independent observations are what the prosecutor will rely on. 'Evidence-based prosecution' starts with your report.",
  },
  {
    id: "dv3",
    title: "Primary Aggressor Determination",
    icon: "UserCheck",
    description: "Identifying the primary aggressor is crucial and is not always the person who called 911.",
    details: [
      "Consider the history of domestic violence between the persons, if any.",
      "Compare the relative severity of the injuries to each person.",
      "Evaluate the fear level of each party.",
      "Identify any defensive injuries on one party versus offensive injuries on the other.",
      "Consider the size, weight, and physical strength of the individuals.",
      "Note who appears to be the dominant party controlling the situation.",
    ],
    officerTakeaway: "Florida law (F.S. § 741.29) encourages officers to arrest the primary aggressor. Avoid dual arrests unless both parties are clearly mutual combatants. Your detailed report must justify your primary aggressor decision.",
  },
  {
    id: "dv4",
    title: "Injunction for Protection Enforcement",
    icon: "FileShield",
    description: "Violating an injunction for protection is a criminal offense.",
    details: [
      "Confirm the injunction is valid and has been served on the respondent via FCIC/NCIC.",
      "Determine if the respondent committed an act of domestic violence or violated a specific provision of the order (e.g., no contact, came within 500 feet of residence).",
      "A knowing and willful violation of an injunction is a first-degree misdemeanor (F.S. § 741.31).",
      "Probable cause for a violation mandates a warrantless arrest.",
    ],
    officerTakeaway: "Always verify service of the injunction before taking enforcement action. The victim must have a copy, but final confirmation is through dispatch. Your PCA must state you confirmed service.",
  },
  {
    id: "dv5",
    title: "Victim Resources & Support",
    icon: "HeartHandshake",
    description: "Providing resources is a key part of the officer's role in breaking the cycle of violence.",
    details: [
      "Provide all victims with a brochure or card from a local certified domestic violence center.",
      "Clearly explain the process for obtaining an injunction for protection.",
      "Inform the victim about the next steps in the criminal process and provide the case number.",
      "If children are present, consider whether a report to the Department of Children and Families (DCF) is required.",
    ],
    officerTakeaway: "Your interaction may be the one chance a victim has to get help. Providing clear information on resources is as important as the arrest itself. Document that you provided these resources in your report.",
  },
];
