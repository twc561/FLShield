
export type JuryInstructionIndexItem = {
  id: string; // e.g., "FL_JI_CRIM_8_1"
  instructionNumber: string; // e.g., "8.1"
  instructionTitle: string; // e.g., "Burglary"
  category: string; // e.g., "Property Crimes"
  icon: string;
};

export const juryInstructionsIndex: JuryInstructionIndexItem[] = [
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
