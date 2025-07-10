
export type InstructionMapEntry = {
  statuteNumber: string;
  crimeName: string;
  instructionID: string;
};

// This map is the new "source of truth" that links a specific crime/statute
// to its exact corresponding jury instruction.
export const instructionMap: InstructionMapEntry[] = [
  { statuteNumber: '782.04', crimeName: 'First Degree Murder', instructionID: 'FL_JI_CRIM_7_2' },
  { statuteNumber: '782.04', crimeName: 'Second Degree Murder', instructionID: 'FL_JI_CRIM_7_3' },
  { statuteNumber: '784.011', crimeName: 'Assault', instructionID: 'FL_JI_CRIM_8_3' },
  { statuteNumber: '784.021', crimeName: 'Aggravated Assault', instructionID: 'FL_JI_CRIM_8_4' },
  { statuteNumber: '784.03', crimeName: 'Battery', instructionID: 'FL_JI_CRIM_8_5' },
  { statuteNumber: '784.041', crimeName: 'Felony Battery', instructionID: 'FL_JI_CRIM_8_6' },
  { statuteNumber: '784.045', crimeName: 'Aggravated Battery', instructionID: 'FL_JI_CRIM_8_7' },
  { statuteNumber: '787.01', crimeName: 'Kidnapping', instructionID: 'FL_JI_CRIM_9_1' },
  { statuteNumber: '810.02', crimeName: 'Burglary', instructionID: 'FL_JI_CRIM_13_1' },
  { statuteNumber: '812.014', crimeName: 'Theft', instructionID: 'FL_JI_CRIM_14_1' },
  { statuteNumber: '812.13', crimeName: 'Robbery', instructionID: 'FL_JI_CRIM_15_1' },
  { statuteNumber: '806.13', crimeName: 'Criminal Mischief', instructionID: 'FL_JI_CRIM_12_3' },
  { statuteNumber: '812.019', crimeName: 'Dealing in Stolen Property', instructionID: 'FL_JI_CRIM_14_4' },
  { statuteNumber: '893.13', crimeName: 'Possession of a Controlled Substance', instructionID: 'FL_JI_CRIM_25_2' },
  { statuteNumber: '893.135', crimeName: 'Drug Trafficking', instructionID: 'FL_JI_CRIM_25_7' },
  { statuteNumber: '893.147', crimeName: 'Possession of Drug Paraphernalia', instructionID: 'FL_JI_CRIM_25_17' },
  { statuteNumber: '777.04', crimeName: 'Attempt', instructionID: 'FL_JI_CRIM_5_1' },
  { statuteNumber: '777.04', crimeName: 'Conspiracy', instructionID: 'FL_JI_CRIM_10_1' },
  { statuteNumber: '776.012', crimeName: 'Justifiable Use of Deadly Force', instructionID: 'FL_JI_CRIM_3_6_F' },
  { statuteNumber: '776.012', crimeName: 'Justifiable Use of Non-Deadly Force', instructionID: 'FL_JI_CRIM_3_6_G' },
  { statuteNumber: '775.051', crimeName: 'Insanity', instructionID: 'FL_JI_CRIM_3_6_A' },
  { statuteNumber: '843.01', crimeName: 'Resisting Officer With Violence', instructionID: 'FL_JI_CRIM_21_2' }
];
