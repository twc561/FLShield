export interface DailyRollCallModule {
  id: string;
  title: string;
  category: 'legal-update' | 'procedural-refresher' | 'scenario-based' | 'case-law-spotlight' | 'officer-safety';
  categoryIcon: string;
  hook: string;
  interactionType: 'multiple-choice' | 'true-false' | 'legal-not-legal';
  options?: string[];
  correctAnswer: string | number;
  rationale: string;
  citation: string;
  deepDiveLinks: {
    title: string;
    url: string;
    icon: string;
  }[];
  smeAttribution?: string;
  dateCreated: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

export const dailyRollCallModules: DailyRollCallModule[] = [
  {
    id: "traffic-stop-search-2024-001",
    title: "Traffic Stop Search Authority",
    category: "legal-update",
    categoryIcon: "⚖️",
    hook: "You pull over a vehicle for speeding and smell marijuana. The driver says it's legal hemp. Can you search?",
    interactionType: "multiple-choice",
    options: [
      "Yes, any marijuana smell gives probable cause",
      "No, hemp is legal so no probable cause exists",
      "Only with additional indicators beyond smell alone",
      "Only if the driver consents"
    ],
    correctAnswer: 2,
    rationale: "Recent Florida case law suggests that the smell of marijuana alone may not constitute probable cause due to the legalization of hemp. Officers need 'plus factors' - additional indicators like behavior, paraphernalia, or admissions - to establish probable cause for a search.",
    citation: "State v. Sampson, 334 So. 3d 1061 (Fla. 2022)",
    deepDiveLinks: [
      {
        title: "Vehicle Search Protocols",
        url: "/field-procedures/scenario-checklists",
        icon: "🚗"
      },
      {
        title: "Controlled Substances Guide",
        url: "/specialized-enforcement/controlled-substances-guide",
        icon: "💊"
      }
    ],
    smeAttribution: "Legal Affairs Division",
    dateCreated: "2024-01-15",
    difficulty: "intermediate"
  },
  {
    id: 'baker-act-criteria-refresher',
    title: 'Baker Act: Imminent Danger Criteria',
    category: 'procedural-refresher',
    categoryIcon: '🧠',
    hook: 'A person is standing on a bridge threatening to jump but has not made any overt physical actions toward self-harm. They are coherent and responding to questions. Do you have sufficient grounds for a Baker Act?',
    interactionType: 'multiple-choice',
    options: [
      'A) Yes, the threat alone is sufficient',
      'B) No, they must take physical action first',
      'C) Yes, if they appear mentally ill',
      'D) Only if they have a weapon'
    ],
    correctAnswer: 0,
    rationale: 'Under Florida Statute 394.463, a credible threat of self-harm combined with apparent inability to make rational decisions about their safety constitutes "imminent danger." The threat itself, when credible, is sufficient grounds.',
    citation: 'F.S. 394.463 - Baker Act Criteria',
    deepDiveLinks: [
      {
        title: 'Complete Baker Act Guide',
        url: '/emergency-response/baker-act-guide',
        icon: '🏥'
      },
      {
        title: 'Mental Health Crisis Protocols',
        url: '/field-procedures/scenario-checklists',
        icon: '🆘'
      }
    ],
    dateCreated: '2024-01-16',
    difficulty: 'basic'
  },
  {
    id: 'terry-stop-scenario',
    title: 'Terry Stop: Reasonable Articulable Suspicion',
    category: 'scenario-based',
    categoryIcon: '🎯',
    hook: 'At 2 AM, you observe a person walking between parked cars in a residential area, trying door handles but not entering any vehicles. When they see your patrol car, they immediately walk away quickly. Can you conduct a Terry stop?',
    interactionType: 'legal-not-legal',
    correctAnswer: 'legal',
    rationale: 'This behavior provides reasonable articulable suspicion of criminal activity (attempted burglary of vehicles). The totality of circumstances - late hour, checking door handles, evasive behavior upon seeing police - justifies a Terry stop.',
    citation: 'Terry v. Ohio (1968); Florida v. J.L. (2000)',
    deepDiveLinks: [
      {
        title: 'Terry Stop Guidelines',
        url: '/field-procedures/field-interview-contact',
        icon: '👮'
      },
      {
        title: 'Constitutional Law Guide',
        url: '/legal-reference/constitutional-law-guide',
        icon: '📜'
      },
      {
        title: 'Case Law: Terry v. Ohio',
        url: '/legal-reference/case-law',
        icon: '⚖️'
      }
    ],
    dateCreated: '2024-01-17',
    difficulty: 'intermediate'
  },
  {
    id: 'graham-connor-spotlight',
    title: 'Use of Force: Graham v. Connor Standard',
    category: 'case-law-spotlight',
    categoryIcon: '🛑',
    hook: 'Graham v. Connor established the "objective reasonableness" standard for use of force. Which factor is NOT considered in this analysis?',
    interactionType: 'multiple-choice',
    options: [
      'A) Severity of the crime',
      'B) Officer\'s subjective fear',
      'C) Immediacy of threat',
      'D) Active resistance by subject'
    ],
    correctAnswer: 1,
    rationale: 'The Graham standard specifically requires OBJECTIVE reasonableness, not subjective feelings. Courts examine the totality of circumstances from the perspective of a reasonable officer, not the individual officer\'s personal fears or motivations.',
    citation: 'Graham v. Connor, 490 U.S. 386 (1989)',
    deepDiveLinks: [
      {
        title: 'Use of Force Wizard',
        url: '/reporting-development/use-of-force-wizard',
        icon: '📝'
      },
      {
        title: 'Constitutional Law Guide',
        url: '/legal-reference/constitutional-law-guide',
        icon: '📜'
      }
    ],
    dateCreated: '2024-01-18',
    difficulty: 'advanced'
  },
  {
    id: 'weapon-concealment-indicators',
    title: 'Officer Safety: Weapon Concealment Indicators',
    category: 'officer-safety',
    categoryIcon: '🛡️',
    hook: 'During a traffic stop, the driver keeps their right hand pressed against their right hip/waistband area and avoids moving that arm. What is your primary concern and immediate action?',
    interactionType: 'multiple-choice',
    options: [
      'A) They may be injured - ask about medical issues',
      'B) Possible concealed weapon - maintain tactical awareness',
      'C) Nervous behavior - reassure them',
      'D) Hidden contraband - prepare to search'
    ],
    correctAnswer: 1,
    rationale: 'Favoring one side of the body, especially protecting the waistband area, is a classic indicator of weapon concealment. Maintain tactical positioning, consider backup, and be prepared for potential threat escalation.',
    citation: 'Florida P.R.I.D.E. Officer Safety Manual',
    deepDiveLinks: [
      {
        title: 'Traffic Stop Procedures',
        url: '/traffic-enforcement/dui-investigation',
        icon: '🚨'
      },
      {
        title: 'Officer Safety Protocols',
        url: '/field-procedures/scenario-checklists',
        icon: '🛡️'
      }
    ],
    dateCreated: '2024-01-19',
    difficulty: 'basic'
  },
  {
    id: "use-of-force-continuum-2024-003",
    title: "Use of Force Decision Making",
    category: "officer-safety",
    categoryIcon: "🛡️",
    hook: "A suspect is verbally resistant but not physically threatening. They refuse to comply with lawful orders. What's your next step?",
    interactionType: "multiple-choice",
    options: [
      "Immediately use physical force",
      "Deploy taser or pepper spray",
      "Continue verbal commands and consider presence of other officers",
      "Call for backup and wait"
    ],
    correctAnswer: 2,
    rationale: "The use of force continuum requires officers to use the minimum force necessary. With verbal resistance only, continue with verbal commands and officer presence. Physical force should only escalate if the subject becomes physically resistant.",
    citation: "Graham v. Connor, 490 U.S. 386 (1989)",
    deepDiveLinks: [
      {
        title: "Use of Force Wizard",
        url: "/reporting-development/use-of-force-wizard",
        icon: "⚖️"
      }
    ],
    dateCreated: "2024-01-23",
    difficulty: "intermediate"
  },
  {
    id: "domestic-violence-protocol-2024-004",
    title: "Domestic Violence Response",
    category: "procedural-refresher",
    categoryIcon: "🧠",
    hook: "You respond to a domestic disturbance. The victim has visible injuries but refuses to cooperate. Can you make an arrest?",
    interactionType: "true-false",
    correctAnswer: "True",
    rationale: "Florida law allows for arrest in domestic violence cases even without victim cooperation if there is probable cause that domestic violence occurred. Visible injuries can provide sufficient probable cause.",
    citation: "F.S. 741.29 - Domestic Violence Arrests",
    deepDiveLinks: [
      {
        title: "Domestic Violence Protocol",
        url: "/field-procedures/domestic-violence-protocol",
        icon: "🏠"
      }
    ],
    dateCreated: "2024-01-24",
    difficulty: "basic"
  },
  {
    id: "search-incident-arrest-2024-005",
    title: "Search Incident to Arrest Scope",
    category: "case-law-spotlight",
    categoryIcon: "🛑",
    hook: "After arresting a suspect in their home, how far can you search without a warrant?",
    interactionType: "multiple-choice",
    options: [
      "The entire house for officer safety",
      "Only the room where arrest occurred",
      "The arrestee's person and immediate grabbing area",
      "Anywhere the suspect had access to in the last hour"
    ],
    correctAnswer: 2,
    rationale: "Search incident to arrest is limited to the arrestee's person and the area within their immediate control (grabbing distance). This protects officer safety and prevents destruction of evidence without requiring broader home searches.",
    citation: "Chimel v. California, 395 U.S. 752 (1969)",
    deepDiveLinks: [
      {
        title: "Case Law Vault",
        url: "/legal-reference/case-law",
        icon: "📚"
      }
    ],
    dateCreated: "2024-01-25",
    difficulty: "advanced"
  },
  {
    id: "miranda-custody-determination-2024-006",
    title: "Custody Determination for Miranda",
    category: "scenario-based",
    categoryIcon: "🎯",
    hook: "A suspect voluntarily comes to the station for questioning. Halfway through, they ask to leave. Are they in custody?",
    interactionType: "true-false",
    correctAnswer: "False",
    rationale: "Custody for Miranda purposes depends on whether a reasonable person would feel free to leave. If the suspect voluntarily came and can leave when they ask, they are not in custody and Miranda warnings are not required.",
    citation: "Berkemer v. McCarty, 468 U.S. 420 (1984)",
    deepDiveLinks: [
      {
        title: "Miranda Warning Guide",
        url: "/legal-reference/miranda-warning-guide",
        icon: "📋"
      }
    ],
    dateCreated: "2024-01-26",
    difficulty: "intermediate"
  },
  {
    id: "evidence-preservation-2024-007",
    title: "Digital Evidence Handling",
    category: "procedural-refresher",
    categoryIcon: "🧠",
    hook: "You seize a smartphone as evidence. The screen is locked. What's the proper first step?",
    interactionType: "multiple-choice",
    options: [
      "Try common passcodes like 1234",
      "Place in airplane mode and document condition",
      "Connect to charger to prevent battery death",
      "Take photos of the screen immediately"
    ],
    correctAnswer: 1,
    rationale: "Digital evidence must be isolated from networks immediately to prevent remote wiping. Airplane mode stops network connections while preserving the device state. Document everything before taking any action.",
    citation: "SWGDE Best Practices for Mobile Device Evidence",
    deepDiveLinks: [
      {
        title: "Digital Evidence Guide",
        url: "/field-procedures/digital-evidence-field-guide",
        icon: "📱"
      }
    ],
    dateCreated: "2024-01-27",
    difficulty: "intermediate"
  },
  {
    id: "terry-stop-justification-2024-008",
    title: "Terry Stop Reasonable Suspicion",
    category: "case-law-spotlight",
    categoryIcon: "🛑",
    hook: "You see someone walking away quickly from an area where a burglary was just reported. Is this enough for a Terry stop?",
    interactionType: "legal-not-legal",
    correctAnswer: "Legal",
    rationale: "The combination of proximity to a recent crime and flight can provide reasonable suspicion for a Terry stop. However, flight alone is not sufficient - it must be combined with other articulable facts.",
    citation: "Illinois v. Wardlow, 528 U.S. 119 (2000)",
    deepDiveLinks: [
      {
        title: "Field Interview Contact Guide",
        url: "/field-procedures/field-interview-contact",
        icon: "👥"
      }
    ],
    dateCreated: "2024-01-28",
    difficulty: "intermediate"
  },
  {
    id: "baker-act-criteria-2024-009",
    title: "Baker Act Involuntary Examination",
    category: "officer-safety",
    categoryIcon: "🛡️",
    hook: "A person threatens to harm themselves but is not currently attempting it. They refuse help. Can you Baker Act them?",
    interactionType: "true-false",
    correctAnswer: "True",
    rationale: "The Baker Act allows involuntary examination if there's reason to believe a person is mentally ill and poses a threat to themselves or others. Threats of self-harm meet this criteria even without immediate action.",
    citation: "F.S. 394.463 - Involuntary Examination",
    deepDiveLinks: [
      {
        title: "Baker Act Guide",
        url: "/emergency-response/baker-act-guide",
        icon: "🏥"
      }
    ],
    dateCreated: "2024-01-29",
    difficulty: "basic"
  },
  {
    id: "consent-search-withdrawal-2024-010",
    title: "Withdrawal of Consent",
    category: "legal-update",
    categoryIcon: "⚖️",
    hook: "During a consensual vehicle search, the owner says 'I want you to stop searching now.' Must you stop immediately?",
    interactionType: "true-false",
    correctAnswer: "True",
    rationale: "Consent can be withdrawn at any time during a search. Once consent is clearly withdrawn, the search must stop unless another legal justification exists (warrant, exigent circumstances, etc.).",
    citation: "Florida v. Jimeno, 500 U.S. 248 (1991)",
    deepDiveLinks: [
      {
        title: "Constitutional Law Guide",
        url: "/legal-reference/constitutional-law-guide",
        icon: "📜"
      }
    ],
    dateCreated: "2024-01-30",
    difficulty: "basic"
  },
  {
    id: "pursuit-policy-2024-011",
    title: "Vehicle Pursuit Initiation",
    category: "officer-safety",
    categoryIcon: "🛡️",
    hook: "A vehicle fails to stop for a traffic violation and begins to speed away through a school zone during dismissal. Do you pursue?",
    interactionType: "multiple-choice",
    options: [
      "Yes, failure to stop justifies pursuit",
      "No, school zone makes it too dangerous",
      "Yes, but only until they leave the school zone",
      "Depends on the severity of the original violation"
    ],
    correctAnswer: 1,
    rationale: "Most agencies prohibit pursuits through school zones during active hours due to extreme danger to children. Public safety outweighs the need to immediately apprehend for minor traffic violations.",
    citation: "Agency Pursuit Policy Guidelines",
    deepDiveLinks: [
      {
        title: "Traffic Enforcement Guide",
        url: "/traffic-enforcement/traffic-statutes-schedules",
        icon: "🚦"
      }
    ],
    dateCreated: "2024-01-31",
    difficulty: "intermediate"
  },
  {
    id: "crime-scene-contamination-2024-012",
    title: "Crime Scene Preservation",
    category: "procedural-refresher",
    categoryIcon: "🧠",
    hook: "You arrive first at a burglary scene. The homeowner wants to check what was stolen. Do you let them enter?",
    interactionType: "true-false",
    correctAnswer: "False",
    rationale: "Crime scene integrity is paramount. Allowing anyone, including victims, to enter before processing can contaminate evidence. Secure the scene first, then obtain a list of missing items through interview.",
    citation: "Crime Scene Processing Standards",
    deepDiveLinks: [
      {
        title: "Crime Scene Management",
        url: "/field-procedures/crime-scene-management",
        icon: "🔍"
      }
    ],
    dateCreated: "2024-02-01",
    difficulty: "basic"
  },
  {
    id: "interview-recording-2024-013",
    title: "Interview Recording Requirements",
    category: "legal-update",
    categoryIcon: "⚖️",
    hook: "During a custodial interrogation of a felony suspect, your recording equipment malfunctions. Can you continue?",
    interactionType: "multiple-choice",
    options: [
      "Yes, recording is preferred but not required",
      "No, must stop immediately and get working equipment",
      "Yes, but must document the malfunction thoroughly",
      "Depends on the type of felony being investigated"
    ],
    correctAnswer: 2,
    rationale: "While electronic recording is strongly preferred and often required by policy, if equipment fails during questioning, you can continue but must thoroughly document the malfunction and reasons for continuing.",
    citation: "F.S. 934.03 - Electronic Recording Requirements",
    deepDiveLinks: [
      {
        title: "Interview Techniques Guide",
        url: "/field-procedures/interview-techniques",
        icon: "🎙️"
      }
    ],
    dateCreated: "2024-02-02",
    difficulty: "intermediate"
  },
  {
    id: "juvenile-questioning-2024-014",
    title: "Juvenile Interrogation Rights",
    category: "scenario-based",
    categoryIcon: "🎯",
    hook: "A 16-year-old is in custody for theft. They waive Miranda rights but ask for their parents. Can you continue questioning?",
    interactionType: "true-false",
    correctAnswer: "False",
    rationale: "When a juvenile requests their parents during custodial interrogation, questioning must stop until a parent or guardian is present, even if Miranda rights were initially waived.",
    citation: "F.S. 985.101 - Juvenile Rights During Interrogation",
    deepDiveLinks: [
      {
        title: "Miranda Warning Guide",
        url: "/legal-reference/miranda-warning-guide",
        icon: "📋"
      }
    ],
    dateCreated: "2024-02-03",
    difficulty: "advanced"
  },
  {
    id: "dui-roadside-testing-2024-015",
    title: "DUI Field Sobriety Testing",
    category: "procedural-refresher",
    categoryIcon: "🧠",
    hook: "A DUI suspect has a prosthetic leg. They refuse field sobriety tests citing their disability. What's your next step?",
    interactionType: "multiple-choice",
    options: [
      "Arrest them for refusal to submit to testing",
      "Modify the tests to accommodate their disability",
      "Skip field tests and proceed to breath test",
      "Use only non-physical cognitive tests"
    ],
    correctAnswer: 3,
    rationale: "Physical disabilities may make standard field sobriety tests unreliable. Use alternative methods like preliminary breath test, cognitive tests, or other indicators of impairment that don't require physical balance.",
    citation: "NHTSA DUI Testing Guidelines - Disability Accommodations",
    deepDiveLinks: [
      {
        title: "DUI Investigation Guide",
        url: "/traffic-enforcement/dui-investigation",
        icon: "🚗"
      }
    ],
    dateCreated: "2024-02-04",
    difficulty: "intermediate"
  },
  {
    id: "evidence-chain-custody-2024-016",
    title: "Chain of Custody Integrity",
    category: "procedural-refresher",
    categoryIcon: "🧠",
    hook: "You collected evidence but forgot to seal it before shift end. Next shift asks about it. What should you do?",
    interactionType: "multiple-choice",
    options: [
      "Go back and seal it, documenting the delay",
      "Have the next shift officer seal it for you",
      "Document the oversight and continue processing normally",
      "Restart the evidence collection process"
    ],
    correctAnswer: 0,
    rationale: "Chain of custody requires immediate and proper handling. If evidence wasn't properly secured, the collecting officer should correct it as soon as possible and thoroughly document the circumstances and delay.",
    citation: "Evidence Handling Procedures Manual",
    deepDiveLinks: [
      {
        title: "Evidence Management Guide",
        url: "/field-procedures/evidence-management-guide",
        icon: "📦"
      }
    ],
    dateCreated: "2024-02-05",
    difficulty: "basic"
  }
];

export function getTodaysModule(): DailyRollCallModule {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const moduleIndex = dayOfYear % dailyRollCallModules.length;
  return dailyRollCallModules[moduleIndex];
}

export function getModulesByCategory(category: DailyRollCallModule['category']): DailyRollCallModule[] {
  return dailyRollCallModules.filter(module => module.category === category);
}