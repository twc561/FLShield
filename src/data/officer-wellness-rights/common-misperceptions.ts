
export type Misperception = {
  id: string;
  category: "Search & Seizure" | "Interrogation" | "Use of Force" | "General Procedure";
  theMisperception: string;
  theReality: string;
  tacticalGuidance: {
    title: string;
    do: string[];
    dont: string[];
  };
  keyCaseLaw: {
    caseName: string;
    citation: string;
  };
};

export const commonMisperceptionsData: Misperception[] = [
  {
    id: "MISC-SEARCH-001",
    category: "Search & Seizure",
    theMisperception: "The odor of burnt or fresh marijuana alone is sufficient probable cause to search a vehicle.",
    theReality: "This is no longer true in Florida. Due to the legalization of medical marijuana and hemp (which is visually and olfactorily identical to illegal cannabis), the smell of marijuana alone is not enough to establish probable cause for a search. An officer must now articulate 'plus factors'—additional evidence that suggests the marijuana is being used or possessed illegally.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO articulate additional observations in your report, such as: visible drug paraphernalia, attempts to conceal something, signs of impairment, or admissions to illegal use.",
        "DO state that you are investigating a potential violation of both the criminal code AND traffic code (for DUI).",
        "DO focus on the 'totality of the circumstances' to justify your actions.",
      ],
      dont: [
        "DON'T base your vehicle search solely on the odor of marijuana. Your evidence will likely be suppressed.",
        "DON'T forget that the odor can still be a factor in your reasonable suspicion for a DUI investigation."
      ]
    },
    keyCaseLaw: {
      caseName: "Jones v. State (Fla. 2025)",
      citation: "Evolving Florida Case Law"
    }
  },
  {
    id: "MISC-SEARCH-002",
    category: "Search & Seizure",
    theMisperception: "A 'frisk' during a Terry Stop allows me to search the person's pockets for any contraband.",
    theReality: "A 'frisk' is strictly a limited pat-down of the outer clothing for weapons only. It is not a search for evidence. To justify a frisk, you need separate reasonable suspicion that the person is armed and dangerous. If you feel an object during the frisk whose identity as contraband is 'immediately apparent' without manipulation, you may seize it under the 'Plain Feel' doctrine. This is a very high standard to meet.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO articulate in your report why you believed the subject was armed (e.g., 'I observed a large bulge in their waistband consistent with a firearm').",
        "DO use an open-palm patting motion on the outer clothing.",
        "DO immediately stop the frisk if you determine the person is not armed."
      ],
      dont: [
        "DON'T squeeze, manipulate, or slide an object inside a pocket to figure out what it is. This exceeds the scope of a frisk and becomes an illegal search.",
        "DON'T frisk every person you detain. You must have separate, articulable suspicion they are armed."
      ]
    },
    keyCaseLaw: {
      caseName: "Terry v. Ohio / Minnesota v. Dickerson",
      citation: "392 U.S. 1 (1968) / 508 U.S. 366 (1993)"
    }
  },
  {
    id: "MISC-SEARCH-003",
    category: "Search & Seizure",
    theMisperception: "I can tell a homeowner that if they don't give consent to search, I'll just go get a warrant anyway.",
    theReality: "This tactic, known as 'threat of warrant,' can invalidate an otherwise voluntary consent. For consent to be valid, it must be freely and voluntarily given, not the result of coercion or duress. Telling someone you will get a warrant can be seen as coercive, implying they have no real choice. The court will examine the totality of the circumstances to determine if the consent was truly voluntary.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO ask for consent clearly and simply: 'Do you have any illegal items in your home? Would you be willing to consent to a search?'",
        "DO document the voluntary nature of the consent on your BWC and in your report.",
        "DO obtain a signed consent-to-search form whenever possible."
      ],
      dont: [
        "DON'T threaten to get a warrant unless you actually have probable cause and intend to apply for one if consent is refused. Even then, it's a risky tactic.",
        "DON'T suggest the person has no choice but to consent."
      ]
    },
    keyCaseLaw: {
      caseName: "Schneckloth v. Bustamonte",
      citation: "412 U.S. 218 (1973)"
    }
  },
  {
    id: "MISC-SEARCH-004",
    category: "Search & Seizure",
    theMisperception: "Once I arrest the driver, I can search the entire passenger compartment of the car.",
    theReality: "This was once the case, but Arizona v. Gant significantly limited vehicle searches incident to arrest. Now, you can only search the passenger compartment if it is reasonable to believe the unsecured arrestee could access the vehicle at the time of the search (officer safety) OR if it's reasonable to believe that evidence relevant to the crime of arrest might be found in the vehicle.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO secure the arrestee in your patrol car before conducting any search. This almost always removes the officer safety justification.",
        "DO ask yourself: 'What crime did I arrest them for, and could evidence of *that specific crime* be in the car?' (e.g., DUI arrest = maybe open containers; drug arrest = maybe more drugs/paraphernalia).",
        "DO rely on the 'Automobile Exception' if you develop separate probable cause that the vehicle contains contraband. This is a more robust exception than search incident to arrest."
      ],
      dont: [
        "DON'T conduct a 'search incident to arrest' of a vehicle after arresting the driver for a traffic offense like DWLS. There is no evidence of that crime to be found in the car."
      ]
    },
    keyCaseLaw: {
      caseName: "Arizona v. Gant",
      citation: "556 U.S. 332 (2009)"
    }
  },
  {
    id: "MISC-INTERROGATION-001",
    category: "Interrogation",
    theMisperception: "If a suspect says, 'I think I might need a lawyer,' I can ignore it and keep questioning them because it wasn't a clear request.",
    theReality: "Legally, this is correct. Under Davis v. United States, the request for counsel must be unambiguous, and police are not required to stop questioning for an equivocal statement. However, this is a major legal pitfall. Continuing to question after an ambiguous statement is a common reason confessions get suppressed.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO stop the interrogation and ask clarifying questions. The safest route is to ask, 'Are you telling me you want a lawyer right now?' This protects your case.",
        "DO document their exact words and your clarifying questions and their answers verbatim in your report and on your BWC.",
        "DO re-advise them of their right to counsel if you clarify and they agree to continue talking without a lawyer."
      ],
      dont: [
        "DON'T ignore the statement and 'plow through' with your questioning. This is a red flag for judges and can make your entire interrogation seem coercive, jeopardizing any confession obtained."
      ]
    },
    keyCaseLaw: {
      caseName: "Davis v. United States",
      citation: "512 U.S. 452 (1994)"
    }
  },
  {
    id: "MISC-INTERROGATION-002",
    category: "Interrogation",
    theMisperception: "If there's any danger at all on a scene, I don't need to read Miranda before questioning a suspect in custody.",
    theReality: "The 'Public Safety Exception' is extremely narrow. It only applies to questions necessary to neutralize an immediate and specific public danger, most often a hidden weapon. The exception allows you to ask questions like 'Where is the gun?' before reading Miranda, but it does NOT apply to general, investigatory questions about the crime itself.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO limit your pre-Miranda questions strictly to the location of the immediate threat (e.g., 'Where is the weapon?', 'Is anyone else hurt?').",
        "DO read the suspect their Miranda rights immediately after the public safety threat has been neutralized, before asking any further questions about the crime.",
        "DO articulate the specific public threat in your report (e.g., 'I asked for the gun's location because we were in a crowded park and I feared a child might find it')."
      ],
      dont: [
        "DON'T ask questions like 'Why did you shoot him?' or 'Where did you get the drugs from?' under the guise of public safety. These are investigatory and will be suppressed."
      ]
    },
    keyCaseLaw: {
      caseName: "New York v. Quarles",
      citation: "467 U.S. 649 (1984)"
    }
  },
  {
    id: "MISC-UOF-001",
    category: "Use of Force",
    theMisperception: "If a suspect with a knife is within 21 feet, I am automatically justified in using deadly force.",
    theReality: "This is a myth based on a misinterpretation of the 'Tueller Drill.' The drill is a training concept to illustrate reaction time, demonstrating how quickly a person with an edged weapon can cover 21 feet. It is NOT a legal rule or justification for the use of force. All use of force, including deadly force, is judged by the 'objective reasonableness' standard from Graham v. Connor, based on the totality of the circumstances at that exact moment.",
    tacticalGuidance: {
      title: "Field Guidance: Do's and Don'ts",
      do: [
        "DO assess the totality of the circumstances: the suspect's actions, their intent, their capability, and the presence of other people.",
        "DO articulate the suspect's specific threatening actions in your report, not just the distance (e.g., 'The suspect raised the knife and took an aggressive step towards me').",
        "DO remember that distance is only one of many factors in the use of force analysis."
      ],
      dont: [
        "DON'T write in your report 'The suspect was within 21 feet, so I used deadly force.' This shows a misunderstanding of the law and could be used against you.",
        "DON'T treat the '21-foot rule' as a legal justification; it is a tactical awareness tool only."
      ]
    },
    keyCaseLaw: {
      caseName: "Graham v. Connor",
      citation: "490 U.S. 386 (1989)"
    }
  }
];
