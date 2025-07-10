
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


// This is the new data source containing the full text for analysis.
export const juryInstructionDetails: Record<string, Omit<InstructionDetail, 'plainLanguageSummary' | 'elementsToProve'>> = {
  // Crimes Against Persons
  'FL_JI_CRIM_7_2': { id: 'FL_JI_CRIM_7_2', instructionNumber: '7.2', instructionTitle: 'First Degree Premeditated Murder', relatedStatute: 'F.S. § 782.04', fullText: 'To prove the crime of First Degree Premeditated Murder, the State must prove the following three elements beyond a reasonable doubt: 1. (Victim) is dead. 2. The death was caused by the criminal act of (defendant). 3. There was a premeditated killing of (victim).' },
  'FL_JI_CRIM_7_3': { id: 'FL_JI_CRIM_7_3', instructionNumber: '7.3', instructionTitle: 'Second Degree Murder', relatedStatute: 'F.S. § 782.04', fullText: 'To prove the crime of Second Degree Murder, the State must prove the following two elements beyond a reasonable doubt: 1. (Victim) is dead. 2. The death was caused by the criminal act of (defendant) and the act was imminently dangerous to another and demonstrating a depraved mind without regard for human life.' },
  'FL_JI_CRIM_8_3': { id: 'FL_JI_CRIM_8_3', instructionNumber: '8.3', instructionTitle: 'Assault', relatedStatute: 'F.S. § 784.011', fullText: 'To prove the crime of Assault, the State must prove the following three elements beyond a reasonable doubt: 1. (Defendant) intentionally and unlawfully threatened, either by word or act, to do violence to (victim). 2. At the time, (defendant) appeared to have the ability to carry out the threat. 3. The act of (defendant) created in the mind of (victim) a well-founded fear that the violence was about to take place.' },
  'FL_JI_CRIM_8_4': { id: 'FL_JI_CRIM_8_4', instructionNumber: '8.4', instructionTitle: 'Aggravated Assault', relatedStatute: 'F.S. § 784.021', fullText: 'To prove the crime of Aggravated Assault, the State must prove the elements of assault and also that the assault was made with a deadly weapon or with an intent to commit a felony.' },
  'FL_JI_CRIM_8_5': { id: 'FL_JI_CRIM_8_5', instructionNumber: '8.5', instructionTitle: 'Battery', relatedStatute: 'F.S. § 784.03', fullText: 'To prove the crime of Battery, the State must prove the following element beyond a reasonable doubt: (Defendant) actually and intentionally touched or struck (victim) against [his] [her] will.' },
  'FL_JI_CRIM_8_6': { id: 'FL_JI_CRIM_8_6', instructionNumber: '8.6', instructionTitle: 'Felony Battery', relatedStatute: 'F.S. § 784.041', fullText: 'To prove the crime of Felony Battery, the State must prove the elements of battery and also that (defendant) caused (victim) great bodily harm, permanent disability, or permanent disfigurement.' },
  'FL_JI_CRIM_8_7': { id: 'FL_JI_CRIM_8_7', instructionNumber: '8.7', instructionTitle: 'Aggravated Battery', relatedStatute: 'F.S. § 784.045', fullText: 'To prove the crime of Aggravated Battery, the State must prove the elements of battery and also that the battery was committed with a deadly weapon or the defendant intentionally or knowingly caused great bodily harm.' },
  'FL_JI_CRIM_9_1': { id: 'FL_JI_CRIM_9_1', instructionNumber: '9.1', instructionTitle: 'Kidnapping', relatedStatute: 'F.S. § 787.01', fullText: 'To prove the crime of Kidnapping, the State must prove beyond a reasonable doubt that (defendant) forcibly, secretly, or by threat confined, abducted, or imprisoned (victim) against [his] [her] will and without lawful authority, with the intent to commit or facilitate the commission of any felony.' },
  // Property Crimes
  'FL_JI_CRIM_13_1': { id: 'FL_JI_CRIM_13_1', instructionNumber: '13.1', instructionTitle: 'Burglary', relatedStatute: 'F.S. § 810.02', fullText: 'To prove the crime of Burglary, the State must prove the following two elements beyond a reasonable doubt: 1. (Defendant) entered a [structure] [conveyance] owned by or in the possession of (person alleged). 2. At the time of entering the [structure] [conveyance], (defendant) had the intent to commit an offense other than burglary or trespass in that [structure] [conveyance]. The offense intended cannot be trespass or burglary. It is not necessary for the State to prove that the offense intended was actually committed.' },
  'FL_JI_CRIM_14_1': { id: 'FL_JI_CRIM_14_1', instructionNumber: '14.1', instructionTitle: 'Theft', relatedStatute: 'F.S. § 812.014', fullText: 'To prove the crime of Theft, the State must prove the following two elements beyond a reasonable doubt: 1. (Defendant) knowingly and unlawfully obtained or used, or endeavored to obtain or use the (property alleged) of (victim). 2. (Defendant) did so with intent to, either temporarily or permanently, deprive (victim) of [his] [her] right to the property or any benefit from it.' },
  'FL_JI_CRIM_15_1': { id: 'FL_JI_CRIM_15_1', instructionNumber: '15.1', instructionTitle: 'Robbery', relatedStatute: 'F.S. § 812.13', fullText: 'To prove the crime of Robbery, the State must prove the following three elements beyond a reasonable doubt: 1. (Defendant) took [money or property] from the person or custody of (person alleged). 2. (Defendant) used force, violence, assault, or putting in fear in the course of the taking. 3. The property taken was of some value.' },
  'FL_JI_CRIM_12_3': { id: 'FL_JI_CRIM_12_3', instructionNumber: '12.3', instructionTitle: 'Criminal Mischief', relatedStatute: 'F.S. § 806.13', fullText: 'To prove the crime of Criminal Mischief, the State must prove the following two elements beyond a reasonable doubt: 1. (Defendant) injured or damaged the property of (victim). 2. The injury or damage was done willfully and maliciously.' },
  'FL_JI_CRIM_14_4': { id: 'FL_JI_CRIM_14_4', instructionNumber: '14.4', instructionTitle: 'Dealing in Stolen Property', relatedStatute: 'F.S. § 812.019', fullText: 'To prove the crime of Dealing in Stolen Property, the State must prove the following two elements beyond a reasonable doubt: 1. (Defendant) trafficked in or endeavored to traffic in the property alleged. 2. (Defendant) knew or should have known that the property was stolen.' },
  // Drug Offenses
  'FL_JI_CRIM_25_2': { id: 'FL_JI_CRIM_25_2', instructionNumber: '25.2', instructionTitle: 'Possession of a Controlled Substance', relatedStatute: 'F.S. § 893.13', fullText: 'To prove the crime of Possession of a Controlled Substance, the State must prove the following three elements beyond a reasonable doubt: 1. (Defendant) possessed a certain substance. 2. The substance was (substance alleged). 3. (Defendant) had knowledge of the presence of the substance.' },
  'FL_JI_CRIM_25_7': { id: 'FL_JI_CRIM_25_7', instructionNumber: '25.7', instructionTitle: 'Drug Trafficking', relatedStatute: 'F.S. § 893.135', fullText: 'To prove the crime of Trafficking, the State must prove beyond a reasonable doubt that (defendant) knowingly was in actual or constructive possession of [or sold, purchased, manufactured, delivered, or brought into Florida] (a specific quantity) or more of (specific substance).' },
  'FL_JI_CRIM_25_17': { id: 'FL_JI_CRIM_25_17', instructionNumber: '25.17', instructionTitle: 'Possession of Drug Paraphernalia', relatedStatute: 'F.S. § 893.147', fullText: 'To prove the crime of Unlawful Use or Possession of Drug Paraphernalia, the State must prove the following two elements beyond a reasonable doubt: 1. (Defendant) [used] [possessed with intent to use] drug paraphernalia. 2. (Defendant) had knowledge of the presence of the drug paraphernalia.' },
  // Inchoate Crimes
  'FL_JI_CRIM_5_1': { id: 'FL_JI_CRIM_5_1', instructionNumber: '5.1', instructionTitle: 'Attempt', relatedStatute: 'F.S. § 777.04', fullText: 'To prove the crime of Attempt, the State must prove the following two elements beyond a reasonable doubt: 1. (Defendant) did some act toward committing the crime of (crime attempted) that went beyond just thinking or talking about it. 2. (Defendant) would have committed the crime except that [someone prevented [him] [her] from committing the crime] [or] [[he] [she] failed].' },
  'FL_JI_CRIM_10_1': { id: 'FL_JI_CRIM_10_1', instructionNumber: '10.1', instructionTitle: 'Conspiracy', relatedStatute: 'F.S. § 777.04', fullText: 'To prove the crime of Conspiracy, the State must prove the following two elements beyond a reasonable doubt: 1. The (defendant) intended that the offense of (offense conspired to commit) would be committed. 2. In order to carry out the intent, the (defendant) agreed, conspired, combined, or confederated with (person[s] with whom defendant allegedly conspired) to cause (offense conspired to commit) to be committed either by them, or one of them, or by some other person.' },
  // Defenses
  'FL_JI_CRIM_3_6_F': { id: 'FL_JI_CRIM_3_6_F', instructionNumber: '3.6(f)', instructionTitle: 'Justifiable Use of Deadly Force', relatedStatute: 'F.S. § 776.012', fullText: 'A person is justified in using deadly force if [he] [she] reasonably believes that such force is necessary to prevent imminent death or great bodily harm to [himself] [herself] or another, or to prevent the imminent commission of a forcible felony.' },
  'FL_JI_CRIM_3_6_G': { id: 'FL_JI_CRIM_3_6_G', instructionNumber: '3.6(g)', instructionTitle: 'Justifiable Use of Non-Deadly Force', relatedStatute: 'F.S. § 776.012', fullText: 'A person is justified in using non-deadly force against another when and to the extent that the person reasonably believes that such conduct is necessary to defend [himself] [herself] or another against the other’s imminent use of unlawful force.' },
  'FL_JI_CRIM_3_6_A': { id: 'FL_JI_CRIM_3_6_A', instructionNumber: '3.6(a)', instructionTitle: 'Insanity', relatedStatute: 'F.S. § 775.051', fullText: 'A person is considered to be insane when [he] [she] had a mental infirmity, disease, or defect and because of this condition, [he] [she] did not know what [he] [she] was doing or its consequences or, although [he] [she] knew what [he] [she] was doing and its consequences, [he] [she] did not know it was wrong.' },
  // Resisting Officer
  'FL_JI_CRIM_21_2': { id: 'FL_JI_CRIM_21_2', instructionNumber: '21.2', instructionTitle: 'Resisting Officer With Violence', relatedStatute: 'F.S. § 843.01', fullText: 'To prove the crime of Resisting Officer With Violence, the State must prove the following four elements beyond a reasonable doubt: 1. (Defendant) knowingly and willfully resisted, obstructed, or opposed (victim). 2. At the time, (victim) was a [law enforcement officer] [correctional officer]. 3. At the time, (victim) was engaged in the lawful execution of a legal duty. 4. In resisting, (defendant) offered to do violence or did violence to the person of (victim).' }
};
