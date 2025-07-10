
export type InstructionMapEntry = {
  statuteNumber: string;
  crimeName: string;
  instructionID: string;
  keywords: string[];
};

// This map is the new "source of truth" that links a specific crime/statute
// to its exact corresponding jury instruction. It now includes keywords to aid search.
export const instructionMap: InstructionMapEntry[] = [
  { statuteNumber: '782.04', crimeName: 'First Degree Murder', instructionID: 'FL_JI_CRIM_7_2', keywords: ['murder', 'homicide', 'premeditated'] },
  { statuteNumber: '782.04', crimeName: 'Second Degree Murder', instructionID: 'FL_JI_CRIM_7_3', keywords: ['murder', 'homicide', 'depraved mind'] },
  { statuteNumber: '784.011', crimeName: 'Assault', instructionID: 'FL_JI_CRIM_8_3', keywords: ['assault', 'threat'] },
  { statuteNumber: '784.021', crimeName: 'Aggravated Assault', instructionID: 'FL_JI_CRIM_8_4', keywords: ['aggravated assault', 'assault with a deadly weapon'] },
  { statuteNumber: '784.03', crimeName: 'Battery', instructionID: 'FL_JI_CRIM_8_5', keywords: ['battery', 'touching', 'striking'] },
  { statuteNumber: '784.041', crimeName: 'Felony Battery', instructionID: 'FL_JI_CRIM_8_6', keywords: ['felony battery', 'great bodily harm'] },
  { statuteNumber: '784.045', crimeName: 'Aggravated Battery', instructionID: 'FL_JI_CRIM_8_7', keywords: ['aggravated battery', 'battery with a deadly weapon'] },
  { statuteNumber: '787.01', crimeName: 'Kidnapping', instructionID: 'FL_JI_CRIM_9_1', keywords: ['kidnapping', 'abduction', 'confining'] },
  { statuteNumber: '810.02', crimeName: 'Burglary', instructionID: 'FL_JI_CRIM_13_1', keywords: ['burglary', 'breaking and entering', 'b&e'] },
  { statuteNumber: '812.014', crimeName: 'Theft', instructionID: 'FL_JI_CRIM_14_1', keywords: ['theft', 'larceny', 'stolen', 'petit', 'grand'] },
  { statuteNumber: '812.13', crimeName: 'Robbery', instructionID: 'FL_JI_CRIM_15_1', keywords: ['robbery', 'force', 'fear'] },
  { statuteNumber: '806.13', crimeName: 'Criminal Mischief', instructionID: 'FL_JI_CRIM_12_3', keywords: ['criminal mischief', 'vandalism', 'damage'] },
  { statuteNumber: '812.019', crimeName: 'Dealing in Stolen Property', instructionID: 'FL_JI_CRIM_14_4', keywords: ['dealing in stolen property', 'fencing', 'trafficking stolen'] },
  { statuteNumber: '893.13', crimeName: 'Possession of a Controlled Substance', instructionID: 'FL_JI_CRIM_25_2', keywords: ['possession', 'drugs', 'cocaine', 'heroin', 'methamphetamine'] },
  { statuteNumber: '893.135', crimeName: 'Drug Trafficking', instructionID: 'FL_JI_CRIM_25_7', keywords: ['trafficking', 'drug sales', 'large quantity'] },
  { statuteNumber: '893.147', crimeName: 'Possession of Drug Paraphernalia', instructionID: 'FL_JI_CRIM_25_17', keywords: ['paraphernalia', 'pipe', 'bong'] },
  { statuteNumber: '777.04', crimeName: 'Attempt', instructionID: 'FL_JI_CRIM_5_1', keywords: ['attempt', 'solicitation'] },
  { statuteNumber: '777.04', crimeName: 'Conspiracy', instructionID: 'FL_JI_CRIM_10_1', keywords: ['conspiracy', 'agreement'] },
  { statuteNumber: '776.012', crimeName: 'Justifiable Use of Deadly Force', instructionID: 'FL_JI_CRIM_3_6_F', keywords: ['self defense', 'deadly force', 'stand your ground'] },
  { statuteNumber: '776.012', crimeName: 'Justifiable Use of Non-Deadly Force', instructionID: 'FL_JI_CRIM_3_6_G', keywords: ['self defense', 'non-deadly force'] },
  { statuteNumber: '775.051', crimeName: 'Insanity', instructionID: 'FL_JI_CRIM_3_6_A', keywords: ['insanity defense'] },
  { statuteNumber: '843.01', crimeName: 'Resisting Officer With Violence', instructionID: 'FL_JI_CRIM_21_2', keywords: ['resisting with violence', 'rowv', 'battery on leo'] }
];
