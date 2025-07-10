

export type InstructionPlaceholder = {
  id: string; // e.g., "FL_JI_CRIM_8_1"
  instructionNumber: string; // e.g., "8.1"
  instructionTitle: string; // e.g., "Burglary"
  category: string; // e.g., "Property Crimes"
  icon: string; // Adding an icon for the UI
};

export type ElementToProve = {
    element: string;
    officerActions: string;
}

export type InstructionDetail = {
  id: string;
  instructionNumber: string;
  instructionTitle: string;
  fullText: string;
  plainLanguageSummary: string;
  elementsToProve: {
    title: string;
    elements: ElementToProve[];
  };
  relatedStatute: string;
};

// This file now serves as a fallback or reference, but is not directly used by the new Navigator UI.
// The new system uses the instruction-map.ts for lookups.
export const standardJuryInstructionsPlaceholders: InstructionPlaceholder[] = [
  // Crimes Against Persons
  { id: "FL_JI_CRIM_7_2", instructionNumber: "7.2", instructionTitle: "First Degree Premeditated Murder", category: "Crimes Against Persons", icon: "Swords" },
  { id: "FL_JI_CRIM_7_3", instructionNumber: "7.3", instructionTitle: "Second Degree Murder", category: "Crimes Against Persons", icon: "Swords" },
  { id: "FL_JI_CRIM_8_3", instructionNumber: "8.3", instructionTitle: "Assault", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_4", instructionNumber: "8.4", instructionTitle: "Aggravated Assault", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_5", instructionNumber: "8.5", instructionTitle: "Battery", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_6", instructionNumber: "8.6", instructionTitle: "Felony Battery", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_7", instructionNumber: "8.7", instructionTitle: "Aggravated Battery", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_9_1", instructionNumber: "9.1", instructionTitle: "Kidnapping", category: "Crimes Against Persons", icon: "UserCog" },
  
  // Property Crimes
  { id: "FL_JI_CRIM_13_1", instructionNumber: "13.1", instructionTitle: "Burglary", category: "Property Crimes", icon: "Home" },
  { id: "FL_JI_CRIM_14_1", instructionNumber: "14.1", instructionTitle: "Theft", category: "Property Crimes", icon: "ShoppingCart" },
  { id: "FL_JI_CRIM_15_1", instructionNumber: "15.1", instructionTitle: "Robbery", category: "Property Crimes", icon: "DollarSign" },
  { id: "FL_JI_CRIM_12_3", instructionNumber: "12.3", instructionTitle: "Criminal Mischief", category: "Property Crimes", icon: "Paintbrush" },
  { id: "FL_JI_CRIM_14_4", instructionNumber: "14.4", instructionTitle: "Dealing in Stolen Property", category: "Property Crimes", icon: "Replace" },

  // Drug Offenses
  { id: "FL_JI_CRIM_25_2", instructionNumber: "25.2", instructionTitle: "Possession of a Controlled Substance", category: "Drug Offenses", icon: "FlaskConical" },
  { id: "FL_JI_CRIM_25_7", instructionNumber: "25.7", instructionTitle: "Drug Trafficking", category: "Drug Offenses", icon: "Truck" },
  { id: "FL_JI_CRIM_25_17", instructionNumber: "25.17", instructionTitle: "Possession of Drug Paraphernalia", category: "Drug Offenses", icon: "Pipette" },

  // Anticipatory Crimes
  { id: "FL_JI_CRIM_5_1", instructionNumber: "5.1", instructionTitle: "Attempt", category: "Inchoate Crimes", icon: "IterationCw" },
  { id: "FL_JI_CRIM_10_1", instructionNumber: "10.1", instructionTitle: "Conspiracy", category: "Inchoate Crimes", icon: "Users" },
  
  // Defenses
  { id: "FL_JI_CRIM_3_6_F", instructionNumber: "3.6(f)", instructionTitle: "Justifiable Use of Deadly Force", category: "Defenses", icon: "ShieldCheck" },
  { id: "FL_JI_CRIM_3_6_G", instructionNumber: "3.6(g)", instructionTitle: "Justifiable Use of Non-Deadly Force", category: "Defenses", icon: "Shield" },
  { id: "FL_JI_CRIM_3_6_A", instructionNumber: "3.6(a)", instructionTitle: "Insanity", category: "Defenses", icon: "BrainCircuit" },
  
  // Resisting Officer
  { id: "FL_JI_CRIM_21_2", instructionNumber: "21.2", instructionTitle: "Resisting Officer With Violence", category: "Public Order & Obstruction", icon: "UserX" }
];


// This is the new data source containing the full text for analysis.
export const juryInstructionDetails: Record<string, Omit<InstructionDetail, 'plainLanguageSummary' | 'elementsToProve'>> = {
  'FL_JI_CRIM_13_1': {
    id: 'FL_JI_CRIM_13_1',
    instructionNumber: '13.1',
    instructionTitle: 'Burglary',
    relatedStatute: 'F.S. § 810.02',
    fullText: `To prove the crime of Burglary, the State must prove the following two elements beyond a reasonable doubt:
    1. (Defendant) entered a [structure] [conveyance] owned by or in the possession of (person alleged).
    2. At the time of entering the [structure] [conveyance], (defendant) had the intent to commit an offense other than burglary or trespass in that [structure] [conveyance].
    The offense intended cannot be trespass or burglary. It is not necessary for the State to prove that the offense intended was actually committed.
    A person "enters" a structure or conveyance when they cross the plane of the threshold of the structure or conveyance.`
  },
  'FL_JI_CRIM_15_1': {
    id: 'FL_JI_CRIM_15_1',
    instructionNumber: '15.1',
    instructionTitle: 'Robbery',
    relatedStatute: 'F.S. § 812.13',
    fullText: `To prove the crime of Robbery, the State must prove the following three elements beyond a reasonable doubt:
    1. (Defendant) took [money or property] from the person or custody of (person alleged).
    2. (Defendant) used force, violence, assault, or putting in fear in the course of the taking.
    3. The property taken was of some value.
    "In the course of the taking" means that the act occurred prior to, at the same time as, or subsequent to the taking of the property and that the act and the taking of the property constitute a continuous series of acts or events.`
  }
  // Add other instruction details here as needed.
};
