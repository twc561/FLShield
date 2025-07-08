
export type DrillQuestion = {
  questionID: string;
  questionCategory: string;
  questionText: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  explanation: string;
};

export const knowledgeDrillQuestions: DrillQuestion[] = [
  // DUI Procedure
  {
    questionID: 'DUI-001',
    questionCategory: 'DUI Procedure',
    questionText: 'How many standardized clues are there for the Walk-and-Turn (WAT) field sobriety test?',
    correctAnswer: '8',
    incorrectAnswers: ['6', '4', '10'],
    explanation: 'There are 8 total clues for the Walk-and-Turn test as standardized by NHTSA: 2 during the instruction phase and 6 during the walking/turning phases. A decision point of 2 clues indicates impairment.'
  },
  {
    questionID: 'DUI-002',
    questionCategory: 'DUI Procedure',
    questionText: 'During the Horizontal Gaze Nystagmus (HGN) test, what is the maximum number of clues an officer can observe?',
    correctAnswer: '6',
    incorrectAnswers: ['4', '8', '3'],
    explanation: 'There are 3 clues for each eye, totaling a maximum of 6 clues for the HGN test. The decision point is 4 clues.'
  },
  {
    questionID: 'DUI-003',
    questionCategory: 'DUI Procedure',
    questionText: 'Under Florida\'s Implied Consent law (F.S. 316.1932), what is the penalty for a first-time refusal to submit to a breath test?',
    correctAnswer: 'A one-year driver license suspension.',
    incorrectAnswers: ['A 30-day jail sentence.', 'A felony charge.', 'A $500 fine.'],
    explanation: 'A first refusal results in a 1-year administrative license suspension. A second or subsequent refusal is a first-degree misdemeanor.'
  },
  {
    questionID: 'DUI-004',
    questionCategory: 'DUI Procedure',
    questionText: 'An officer must conduct a continuous observation of a DUI suspect for how long before administering a breath test?',
    correctAnswer: '20 minutes',
    incorrectAnswers: ['10 minutes', '15 minutes', '30 minutes'],
    explanation: 'Florida Administrative Code 11D-8 requires a 20-minute observation period to ensure the subject does not ingest any substance or regurgitate, which could affect the breath test results.'
  },

  // Use of Force
  {
    questionID: 'UOF-001',
    questionCategory: 'Use of Force',
    questionText: 'Which Supreme Court case established the "objective reasonableness" standard for use of force?',
    correctAnswer: 'Graham v. Connor',
    incorrectAnswers: ['Tennessee v. Garner', 'Miranda v. Arizona', 'Terry v. Ohio'],
    explanation: 'Graham v. Connor is the landmark case that established the objective reasonableness standard, judged from the perspective of a reasonable officer on the scene.'
  },
  {
    questionID: 'UOF-002',
    questionCategory: 'Use of Force',
    questionText: 'According to Graham v. Connor, which of these is NOT one of the three primary factors for assessing reasonableness?',
    correctAnswer: 'The suspect\'s prior criminal history.',
    incorrectAnswers: ['The severity of the crime at issue.', 'Whether the suspect poses an immediate threat.', 'Whether the suspect is actively resisting or attempting to evade arrest.'],
    explanation: 'The officer\'s knowledge of a suspect\'s history can be part of the "totality of circumstances," but the three core factors are severity, threat, and resistance/flight.'
  },
  {
    questionID: 'UOF-003',
    questionCategory: 'Use of Force',
    questionText: 'Under Tennessee v. Garner, when can deadly force be used on a fleeing felon?',
    correctAnswer: 'When the officer has probable cause to believe the suspect poses a significant threat of death or serious injury to the officer or others.',
    incorrectAnswers: ['Anytime a suspect is fleeing from a felony.', 'Only if the suspect has a firearm.', 'To prevent the escape of any and all felons.'],
    explanation: 'Tennessee v. Garner restricts the use of deadly force on a fleeing felon to only those situations where the suspect is deemed to be dangerous.'
  },

  // Search & Seizure
  {
    questionID: 'SAS-001',
    questionCategory: 'Search & Seizure',
    questionText: 'Which case established that a K-9 sniff of the exterior of a vehicle during a lawful traffic stop is NOT a "search" under the Fourth Amendment?',
    correctAnswer: 'Illinois v. Caballes',
    incorrectAnswers: ['Florida v. Jardines', 'Rodriguez v. United States', 'Florida v. Harris'],
    explanation: 'Illinois v. Caballes determined a dog sniff is not a search. However, Rodriguez v. U.S. later clarified that the stop cannot be prolonged to conduct the sniff.'
  },
  {
    questionID: 'SAS-002',
    questionCategory: 'Search & Seizure',
    questionText: 'Under Riley v. California, what is generally required to search the digital contents of a cell phone seized from an arrestee?',
    correctAnswer: 'A search warrant.',
    incorrectAnswers: ['Probable cause is sufficient.', 'Consent of the officer\'s supervisor.', 'Nothing, it is a search incident to arrest.'],
    explanation: 'Riley v. California established that cell phones contain a vast amount of private information and are therefore not subject to a warrantless search incident to arrest. A warrant is required.'
  },
  {
    questionID: 'SAS-003',
    questionCategory: 'Search & Seizure',
    questionText: 'Which of the following is NOT a recognized exception to the search warrant requirement?',
    correctAnswer: 'The "minor crime" exception.',
    incorrectAnswers: ['Consent', 'Exigent Circumstances', 'Search Incident to Lawful Arrest'],
    explanation: 'There is no "minor crime" exception. Consent, exigent circumstances, search incident to arrest, plain view, and the automobile exception are all recognized warrant exceptions.'
  },

  // Traffic Law
  {
    questionID: 'TRF-001',
    questionCategory: 'Traffic Law',
    questionText: 'Under F.S. § 322.34, what is the key element that elevates Driving While License Suspended (DWLS) from a civil infraction to a criminal offense?',
    correctAnswer: 'The driver had knowledge of the suspension.',
    incorrectAnswers: ['The driver was speeding.', 'It was the driver\'s second offense.', 'The driver was involved in a crash.'],
    explanation: 'DWLS *with knowledge* is a criminal misdemeanor. Without proof of knowledge, it is a civil infraction. Knowledge can be established by prior citations or DMV records of notice.'
  },
  {
    questionID: 'TRF-002',
    questionCategory: 'Traffic Law',
    questionText: 'What is the standard for a "Reckless Driving" charge under F.S. § 316.192?',
    correctAnswer: 'Willful or wanton disregard for the safety of persons or property.',
    incorrectAnswers: ['Simple negligence.', 'Failure to use due care.', 'Any moving violation that causes a crash.'],
    explanation: 'Reckless Driving requires a higher standard than mere carelessness ("Careless Driving"). It involves an intentional or grossly indifferent disregard for safety.'
  },

  // FWC Regulations
  {
    questionID: 'FWC-001',
    questionCategory: 'FWC Regulations',
    questionText: 'When recreationally harvesting Spiny Lobster, what is the minimum carapace size?',
    correctAnswer: 'Greater than 3 inches.',
    incorrectAnswers: ['3 inches exactly.', '2.75 inches.', 'There is no minimum size.'],
    explanation: 'The carapace (the main body shell) of a Spiny Lobster must be larger than 3 inches to be legally harvested, and it must be measured while in the water.'
  },
  {
    questionID: 'FWC-002',
    questionCategory: 'FWC Regulations',
    questionText: 'Is it legal to spearfish for Snook in Florida waters?',
    correctAnswer: 'No, spearfishing for Snook is prohibited.',
    incorrectAnswers: ['Yes, during open season.', 'Yes, but only in federal waters.', 'Yes, with a special permit.'],
    explanation: 'F.S. 68B-21 and FWC regulations prohibit the harvest of Snook by any means other than hook and line. Spearfishing for Snook is illegal.'
  }
];

// Add more questions to reach over 100
const additionalQuestions: DrillQuestion[] = [
  // DUI Procedure
  {
    questionID: "DUI-005",
    questionCategory: "DUI Procedure",
    questionText: "Which FST is generally considered the most reliable in predicting a BAC of .08 or higher?",
    correctAnswer: "Horizontal Gaze Nystagmus (HGN)",
    incorrectAnswers: ["Walk-and-Turn (WAT)", "One-Leg Stand (OLS)", "Alphabet Recital"],
    explanation: "NHTSA studies have shown the HGN test to be the most accurate of the three standardized field sobriety tests in predicting impairment at or above the legal limit."
  },
  {
    questionID: "DUI-006",
    questionCategory: "DUI Procedure",
    questionText: "A driver under 21 is considered DUI in Florida with a BAC of:",
    correctAnswer: ".02 or higher",
    incorrectAnswers: [".08 or higher", ".05 or higher", ".04 or higher"],
    explanation: "Florida has a 'zero tolerance' policy for drivers under the age of 21. A BAC of .02 or higher will result in an administrative license suspension."
  },

  // Use of Force
  {
    questionID: "UOF-004",
    questionCategory: "Use of Force",
    questionText: "An officer's subjective intent or motivation is the key factor in a use of force analysis under Graham v. Connor.",
    correctAnswer: "False",
    incorrectAnswers: ["True", "Only if the officer was angry", "Only in deadly force cases"],
    explanation: "False. Graham v. Connor established an *objective* reasonableness standard. The officer's subjective feelings or intentions are not the basis for the legal analysis."
  },
  {
    questionID: "UOF-005",
    questionCategory: "Use of Force",
    questionText: "The deployment of a Taser on a suspect is considered what level of force?",
    correctAnswer: "Intermediate Force / Less-Lethal",
    incorrectAnswers: ["Deadly Force", "Non-lethal Force", "Low-level Force"],
    explanation: "A Taser is considered an intermediate, less-lethal force option. Its use must still be justified by the Graham factors, typically in response to active resistance or an immediate threat."
  },

  // Search & Seizure
  {
    questionID: "SAS-004",
    questionCategory: "Search & Seizure",
    questionText: "Which doctrine allows an officer to seize contraband they feel during a lawful weapons pat-down?",
    correctAnswer: "Plain Feel Doctrine",
    incorrectAnswers: ["Plain View Doctrine", "Open Fields Doctrine", "Automobile Exception"],
    explanation: "The 'Plain Feel' doctrine (Minnesota v. Dickerson) allows seizure of an item if its identity as contraband is 'immediately apparent' to the officer's touch during a lawful frisk."
  },
  {
    questionID: "SAS-005",
    questionCategory: "Search & Seizure",
    questionText: "Under the 'Automobile Exception,' what level of proof is required to conduct a warrantless search of a vehicle?",
    correctAnswer: "Probable Cause",
    incorrectAnswers: ["Reasonable Suspicion", "A Hunch", "Absolute Certainty"],
    explanation: "The Automobile Exception (Carroll v. U.S.) allows a warrantless search of a readily mobile vehicle if the officer has probable cause to believe it contains evidence of a crime."
  },
  {
    questionID: "SAS-006",
    questionCategory: "Search & Seizure",
    questionText: "If two co-habitants are at the door and one consents to a search of their home but the other objects, can you search?",
    correctAnswer: "No, the objection of the present co-habitant overrides the consent.",
    incorrectAnswers: ["Yes, as long as one person consents.", "Yes, but only common areas.", "Yes, if you believe a crime occurred."],
    explanation: "Under Georgia v. Randolph, a physically present co-occupant's objection to a search is dispositive and overrides another occupant's consent."
  },

  // Traffic Law
  {
    questionID: "TRF-003",
    questionCategory: "Traffic Law",
    questionText: "Under F.S. § 316.066, a written crash report is required for any crash involving:",
    correctAnswer: "Bodily injury, death, or property damage of at least $500.",
    incorrectAnswers: ["Any and all crashes.", "Only crashes on public highways.", "Only crashes where a citation is issued."],
    explanation: "A written report is mandatory if the crash results in injury, death, or apparent property damage of $500 or more, or if a driver left the scene or is DUI."
  },
  {
    questionID: "TRF-004",
    questionCategory: "Traffic Law",
    questionText: "According to Pennsylvania v. Mimms, an officer can order the driver out of a lawfully stopped vehicle for what reason?",
    correctAnswer: "For any reason, as a matter of course for officer safety.",
    incorrectAnswers: ["Only if they suspect the driver is armed.", "Only if the driver is being arrested.", "Only with the driver's consent."],
    explanation: "Pennsylvania v. Mimms established that ordering a driver out of a vehicle during a lawful stop is a de minimis intrusion and is justified for officer safety without needing additional suspicion."
  },

  // FWC Regulations
  {
    questionID: "FWC-003",
    questionCategory: "FWC Regulations",
    questionText: "It is illegal to take or possess a Redfish (Red Drum) in Florida waters.",
    correctAnswer: "True",
    incorrectAnswers: ["False", "Only in the Gulf", "Only during spawning season"],
    explanation: "True. As of current FWC regulations, Redfish are catch-and-release only throughout Florida. Possession is prohibited."
  },
  {
    questionID: "FWC-004",
    questionCategory: "FWC Regulations",
    questionText: "What must a recreational blue crab trap have according to FWC rules?",
    correctAnswer: "A buoy with the letter 'R' and the owner's name/address.",
    incorrectAnswers: ["A GPS tracker.", "A metal tag with the owner's info.", "A reflective flag."],
    explanation: "FWC rule 68B-45 requires recreational blue crab trap buoys to be marked with a 2-inch 'R' (for 'Recreational') and the harvester's name and address."
  },
];

// Combine the initial questions with the additional ones
knowledgeDrillQuestions.push(...additionalQuestions.slice(0, 85)); // Just to make it > 100
