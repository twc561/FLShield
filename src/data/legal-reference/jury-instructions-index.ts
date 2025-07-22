export type JuryInstructionIndexItem = {
  id: string; // e.g., "FL_JI_CRIM_8_1"
  instructionNumber: string; // e.g., "8.1"
  instructionTitle: string; // e.g., "Burglary"
  category: string; // e.g., "Property Crimes"
  icon: string;
};

export const juryInstructionsIndex: JuryInstructionIndexItem[] = [
  // --- Crimes Against Persons ---
  { id: "FL_JI_CRIM_7_2", instructionNumber: "7.2", instructionTitle: "First Degree Premeditated Murder", category: "Crimes Against Persons", icon: "Swords" },
  { id: "FL_JI_CRIM_7_3", instructionNumber: "7.3", instructionTitle: "Second Degree Murder", category: "Crimes Against Persons", icon: "Swords" },
  { id: "FL_JI_CRIM_7_4", instructionNumber: "7.4", instructionTitle: "Manslaughter", category: "Crimes Against Persons", icon: "HeartPulse" },
  { id: "FL_JI_CRIM_7_7", instructionNumber: "7.7", instructionTitle: "Vehicular or Vessel Homicide", category: "Crimes Against Persons", icon: "CarCrash" },
  { id: "FL_JI_CRIM_8_3", instructionNumber: "8.3", instructionTitle: "Assault", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_4", instructionNumber: "8.4", instructionTitle: "Aggravated Assault", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_5", instructionNumber: "8.5", instructionTitle: "Battery", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_6", instructionNumber: "8.6", instructionTitle: "Felony Battery", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_7", instructionNumber: "8.7", instructionTitle: "Aggravated Battery", category: "Crimes Against Persons", icon: "UserX" },
  { id: "FL_JI_CRIM_8_11", instructionNumber: "8.11", instructionTitle: "Battery on a Law Enforcement Officer", category: "Crimes Against Persons", icon: "ShieldAlert" },
  { id: "FL_JI_CRIM_8_24", instructionNumber: "8.24", instructionTitle: "Stalking", category: "Crimes Against Persons", icon: "Eye" },
  { id: "FL_JI_CRIM_8_25", instructionNumber: "8.25", instructionTitle: "Aggravated Stalking", category: "Crimes Against Persons", icon: "Eye" },
  { id: "FL_JI_CRIM_9_1", instructionNumber: "9.1", instructionTitle: "Kidnapping", category: "Crimes Against Persons", icon: "UserCog" },
  { id: "FL_JI_CRIM_9_2", instructionNumber: "9.2", instructionTitle: "False Imprisonment", category: "Crimes Against Persons", icon: "Lock" },
  { id: "FL_JI_CRIM_16_1", instructionNumber: "16.1", instructionTitle: "Child Abuse", category: "Crimes Against Persons", icon: "Baby" },
  { id: "FL_JI_CRIM_16_2", instructionNumber: "16.2", instructionTitle: "Aggravated Child Abuse", category: "Crimes Against Persons", icon: "Baby" },
  { id: "FL_JI_CRIM_16_4", instructionNumber: "16.4", instructionTitle: "Child Neglect w/ Great Bodily Harm", category: "Crimes Against Persons", icon: "Baby" },

  // --- Property Crimes ---
  { id: "FL_JI_CRIM_13_1", instructionNumber: "13.1", instructionTitle: "Burglary", category: "Property Crimes", icon: "Home" },
  { id: "FL_JI_CRIM_14_1", instructionNumber: "14.1", instructionTitle: "Theft", category: "Property Crimes", icon: "ShoppingCart" },
  { id: "FL_JI_CRIM_14_2", instructionNumber: "14.2", instructionTitle: "Fraudulent Use of a Credit Card", category: "Property Crimes", icon: "CreditCard" },
  { id: "FL_JI_CRIM_14_3", instructionNumber: "14.3", instructionTitle: "Uttering a Forged Instrument", category: "Property Crimes", icon: "FileSignature" },
  { id: "FL_JI_CRIM_14_4", instructionNumber: "14.4", instructionTitle: "Dealing in Stolen Property", category: "Property Crimes", icon: "Replace" },
  { id: "FL_JI_CRIM_15_1", instructionNumber: "15.1", instructionTitle: "Robbery", category: "Property Crimes", icon: "DollarSign" },
  { id: "FL_JI_CRIM_12_3", instructionNumber: "12.3", instructionTitle: "Criminal Mischief", category: "Property Crimes", icon: "Paintbrush" },
  { id: "FL_JI_CRIM_12_4", instructionNumber: "12.4", instructionTitle: "Arson", category: "Property Crimes", icon: "Flame" },

  // --- Drug Offenses ---
  { id: "FL_JI_CRIM_25_2", instructionNumber: "25.2", instructionTitle: "Possession of a Controlled Substance", category: "Drug Offenses", icon: "FlaskConical" },
  { id: "FL_JI_CRIM_25_4", instructionNumber: "25.4", instructionTitle: "Possession with Intent to Sell", category: "Drug Offenses", icon: "Scale" },
  { id: "FL_JI_CRIM_25_7", instructionNumber: "25.7", instructionTitle: "Drug Trafficking", category: "Drug Offenses", icon: "Truck" },
  { id: "FL_JI_CRIM_25_17", instructionNumber: "25.17", instructionTitle: "Possession of Drug Paraphernalia", category: "Drug Offenses", icon: "Pipette" },

  // --- Inchoate Crimes ---
  { id: "FL_JI_CRIM_5_1", instructionNumber: "5.1", instructionTitle: "Attempt", category: "Inchoate Crimes", icon: "IterationCw" },
  { id: "FL_JI_CRIM_10_1", instructionNumber: "10.1", instructionTitle: "Conspiracy", category: "Inchoate Crimes", icon: "Users" },

  // --- Defenses ---
  { id: "FL_JI_CRIM_3_6_F", instructionNumber: "3.6(f)", instructionTitle: "Justifiable Use of Deadly Force", category: "Defenses", icon: "ShieldCheck" },
  { id: "FL_JI_CRIM_3_6_G", instructionNumber: "3.6(g)", instructionTitle: "Justifiable Use of Non-Deadly Force", category: "Defenses", icon: "Shield" },
  { id: "FL_JI_CRIM_3_6_A", instructionNumber: "3.6(a)", instructionTitle: "Insanity", category: "Defenses", icon: "BrainCircuit" },
  { id: "FL_JI_CRIM_3_6_D", instructionNumber: "3.6(d)", instructionTitle: "Entrapment", category: "Defenses", icon: "MousePointerClick" },

  // --- Public Order & Obstruction ---
  { id: "FL_JI_CRIM_21_1", instructionNumber: "21.1", instructionTitle: "Escape", category: "Public Order & Obstruction", icon: "Footprints" },
  { id: "FL_JI_CRIM_21_2", instructionNumber: "21.2", instructionTitle: "Resisting Officer With Violence", category: "Public Order & Obstruction", icon: "UserX" },
  { id: "FL_JI_CRIM_21_3", instructionNumber: "21.3", instructionTitle: "Resisting Officer Without Violence", category: "Public Order & Obstruction", icon: "UserX" },
  { id: "FL_JI_CRIM_21_7", instructionNumber: "21.7", instructionTitle: "Tampering with Evidence", category: "Public Order & Obstruction", icon: "Trash2" },
  { id: "FL_JI_CRIM_21_13", instructionNumber: "21.13", instructionTitle: "False Report of a Crime", category: "Public Order & Obstruction", icon: "PhoneOff" },

  // --- Traffic Offenses ---
  { id: "FL_JI_CRIM_28_1", instructionNumber: "28.1", instructionTitle: "Driving Under the Influence (DUI)", category: "Traffic Offenses", icon: "Car" },
  { id: "FL_JI_CRIM_28_4", instructionNumber: "28.4", instructionTitle: "Fleeing to Elude a Law Enforcement Officer", category: "Traffic Offenses", icon: "Car" },

  // --- Weapons Offenses ---
  { id: "FL_JI_CRIM_10_1_WEAPON", instructionNumber: "10.1", instructionTitle: "Carrying a Concealed Weapon", category: "Weapons Offenses", icon: "EyeOff" },
  { id: "FL_JI_CRIM_10_7", instructionNumber: "10.7", instructionTitle: "Possession of Firearm by Convicted Felon", category: "Weapons Offenses", icon: "Ban" },
  { id: "FL_JI_CRIM_10_12", instructionNumber: "10.12", instructionTitle: "Improper Exhibition of a Firearm", category: "Weapons Offenses", icon: "Eye" },
  { id: "FL_JI_CRIM_10_14", instructionNumber: "10.14", instructionTitle: "Discharging a Firearm in Public", category: "Weapons Offenses", icon: "Target" }
];