
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
    id: 'vehicle-search-cannabis-2024',
    title: 'Vehicle Search: Cannabis Odor',
    category: 'legal-update',
    categoryIcon: '⚖️',
    hook: 'You stop a car for speeding. You smell burnt cannabis coming from inside. Can you legally search the entire vehicle under the Carroll Doctrine in Florida based on the smell alone?',
    interactionType: 'true-false',
    correctAnswer: false,
    rationale: 'As of 2024 in Florida, the smell of burnt cannabis alone is no longer sufficient probable cause for a vehicle search due to the legality of hemp. You need "smell-plus"—additional evidence suggesting illegal activity.',
    citation: 'State v. Harris (2024)',
    deepDiveLinks: [
      {
        title: 'Read Florida Statute 316.193',
        url: '/legal-reference/statutes',
        icon: '📖'
      },
      {
        title: 'Vehicle Search Guidelines',
        url: '/field-procedures/scenario-checklists',
        icon: '🚗'
      },
      {
        title: 'Controlled Substances Guide',
        url: '/specialized-enforcement/controlled-substances-guide',
        icon: '🔬'
      }
    ],
    smeAttribution: 'Reviewed by Florida P.R.I.D.E. Legal Division',
    dateCreated: '2024-01-15',
    difficulty: 'intermediate'
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
