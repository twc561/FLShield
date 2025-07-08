
export type EncounterType = {
  id: string;
  title: string;
  icon: string;
  legalStandard: string;
  officerActions: string[];
  keyPoints: string[];
  caseLaw: { name: string; summary: string };
};

export const fieldInterviewData: EncounterType[] = [
  {
    id: "encounter1",
    title: "Consensual Encounter",
    icon: "Users",
    legalStandard: "No Justification Required",
    officerActions: [
      "Approach the individual and engage in conversation.",
      "You may ask questions, including asking for identification.",
      "The individual is free to leave at any time and does not have to answer your questions.",
      "Your tone should be conversational, not demanding."
    ],
    keyPoints: [
      "A reasonable person must feel free to terminate the encounter.",
      "Do not use language or physical actions that imply the person is not free to leave (e.g., 'Stay right there,' blocking their path).",
      "This is the baseline for all police-citizen interactions."
    ],
    caseLaw: {
      name: "Florida v. Bostick (1991)",
      summary: "The key test for a consensual encounter is whether a reasonable person would feel free to decline the officers' requests or otherwise terminate the encounter. It is not about whether the person *actually* felt free, but about the objective circumstances."
    }
  },
  {
    id: "encounter2",
    title: "Investigatory Detention (Terry Stop)",
    icon: "Search",
    legalStandard: "Reasonable Suspicion",
    officerActions: [
      "Articulate specific facts and circumstances that lead you to believe criminal activity is afoot.",
      "You may detain the individual for a reasonable amount of time to confirm or dispel your suspicion.",
      "You may ask for identification and an explanation of their actions.",
      "If you have separate reasonable suspicion that the person is armed and dangerous, you may conduct a limited pat-down (frisk) for weapons only."
    ],
    keyPoints: [
      "Reasonable suspicion is more than a hunch, but less than probable cause.",
      "The stop must be limited in scope and duration.",
      "The frisk is not a search for evidence; it is for officer safety.",
      "Document every fact that contributed to your reasonable suspicion in your report."
    ],
    caseLaw: {
      name: "Terry v. Ohio (1968)",
      summary: "Established the legal precedent for temporary detentions (stops) and pat-downs (frisks) based on reasonable suspicion. This allows officers to investigate suspicious circumstances without needing full probable cause for an arrest."
    }
  },
  {
    id: "encounter3",
    title: "Arrest",
    icon: "Handcuffs",
    legalStandard: "Probable Cause",
    officerActions: [
      "Establish probable cause based on the totality of the circumstances that a crime has been, is being, or is about to be committed.",
      "Inform the individual they are under arrest.",
      "Conduct a full search incident to lawful arrest of the person and the area within their immediate control.",
      "Read the individual their Miranda rights if you intend to conduct a custodial interrogation."
    ],
    keyPoints: [
      "Probable cause exists when the facts and circumstances would lead a reasonable person to believe a crime has occurred.",
      "A search incident to arrest is automatic and justified for officer safety and to preserve evidence.",
      "The line between detention and arrest is crossed when the seizure is no longer temporary and brief."
    ],
    caseLaw: {
      name: "Atwater v. City of Lago Vista (2001)",
      summary: "The Fourth Amendment does not forbid a warrantless arrest for a minor criminal offense, even one punishable only by a fine. If you have probable cause for any jailable offense, you can make a full custodial arrest."
    }
  },
  {
    id: "encounter4",
    title: "Special Considerations: Juveniles",
    icon: "Baby",
    legalStandard: "Varies (Heightened Scrutiny)",
    officerActions: [
      "A juvenile's age is a relevant factor in determining whether they are 'in custody' for Miranda purposes.",
      "What might be a non-custodial encounter for an adult could be considered custodial for a child in the same situation.",
      "Attempt to notify a parent or guardian as soon as practical after taking a juvenile into custody.",
      "Be aware of your department's specific policies regarding the interrogation and detention of juveniles."
    ],
    keyPoints: [
      "Courts apply extra scrutiny to interactions with juveniles.",
      "Always err on the side of caution when determining if a situation is custodial.",
      "Documentation of your interactions with juveniles is even more critical."
    ],
    caseLaw: {
      name: "J.D.B. v. North Carolina (2011)",
      summary: "The Supreme Court ruled that a child's age, when known to the officer, must be considered as part of the 'totality of the circumstances' when determining if a suspect is in custody and therefore entitled to Miranda warnings."
    }
  }
];
