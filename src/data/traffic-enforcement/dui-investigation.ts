// --- Data Types ---

export type DrivingCue = {
  cueName: string;
  associatedImpairment: string;
  reportWording: string;
  linkedStatute: string;
};

export type SensoryChecklist = {
  sight: string[];
  sound: string[];
  smell: string[];
};

export type DuiDetection = {
  vehicleInMotionCues: DrivingCue[];
  personalContactChecklist: SensoryChecklist;
  preFstScreeningQuestions: string[];
};

export type FstTest = {
  TestName: string;
  TotalClues: string;
  DecisionPoint: string;
  StandardizedClues: string[];
  VerbatimInstructions: string;
  OfficerNotes: string;
};

export type LegalWarning = {
  Title: string;
  Script: string;
};

export type LanguageGuide = {
  fstAdminGuide: FstTest[];
  impliedConsentScripts: LegalWarning[];
};

export type TrilingualFstGuide = {
  english: LanguageGuide;
  spanish: LanguageGuide;
  haitian_creole: LanguageGuide;
};

export type PreArrestScreening = {
  fstAdminGuide: TrilingualFstGuide;
  nonStandardizedTests: {
    description: string;
    legalCaveat: string;
  };
};

export type ArrestAndTesting = {
    articulatingProbableCause: {
        guide: string;
    },
    chemicalTestProcedures: {
        breathTest: { guide: string; };
        urineBloodTest: { guide: string; };
    }
};

export type CaseBuilding = {
    reportNarrativeBuilder: {
        template: string;
        prosecutorPhrases: string[];
    },
    courtTestimonyPrep: {
        prosecutionQuestions: string[];
        defenseQuestions: string[];
    }
};

export type DuiInvestigationGuide = {
  dui_detection: DuiDetection;
  pre_arrest_screening: PreArrestScreening;
  arrest_and_testing: ArrestAndTesting;
  case_building: CaseBuilding;
};


// --- Comprehensive Guide Data ---

export const duiInvestigationGuideData: DuiInvestigationGuide = {
  dui_detection: {
    vehicleInMotionCues: [
      {
        cueName: "Weaving across lane lines",
        associatedImpairment: "Difficulty with steering, divided attention",
        reportWording: "I observed the vehicle fail to maintain a single lane, weaving...",
        linkedStatute: "316.089",
      },
      {
        cueName: "Straddling a lane line",
        associatedImpairment: "Impaired perception, divided attention",
        reportWording: "The vehicle was straddling the center dashed line for approximately...",
        linkedStatute: "316.089",
      },
       {
        cueName: "Extremely wide turn",
        associatedImpairment: "Impaired judgment and coordination",
        reportWording: "The vehicle made an extremely wide right turn, crossing into the opposing lane...",
        linkedStatute: "316.151",
      },
       {
        cueName: "Stopping in lane for no apparent reason",
        associatedImpairment: "Impaired judgment, confusion, falling asleep",
        reportWording: "The vehicle came to a complete stop in an active lane of travel...",
        linkedStatute: "316.195",
      },
      {
        cueName: "Responding slowly to traffic signals",
        associatedImpairment: "Slowed reaction time, impaired perception",
        reportWording: "The traffic signal turned green, and the vehicle remained stationary for several seconds...",
        linkedStatute: "316.1925",
      },
      {
        cueName: "Driving without headlights at night",
        associatedImpairment: "Forgetfulness, lack of awareness",
        reportWording: "I observed the vehicle operating at night without any illuminated headlights...",
        linkedStatute: "316.217",
      },
    ],
    personalContactChecklist: {
      sight: [
        "Bloodshot, watery, or glassy eyes",
        "Fumbling with wallet for license/registration",
        "Soiled or disheveled clothing",
        "Spills on clothing (e.g., from a drink)",
        "Empty containers in plain view",
      ],
      sound: [
        "Slurred, thick-tongued, or mumbled speech",
        "Admission to drinking/drug use",
        "Inconsistent or illogical answers to simple questions",
        "Unusually loud or boisterous behavior",
        "Slow to respond to questions or commands",
      ],
      smell: [
        "Odor of an alcoholic beverage emanating from the subject's breath or person",
        "Odor of burnt or fresh cannabis from within the vehicle",
        "Strong 'cover-up' odors like cologne, perfume, or air freshener",
      ],
    },
    preFstScreeningQuestions: [
        "Where are you coming from tonight?",
        "Have you had anything to drink or consume tonight? If so, what, how much, and when was your last one?",
        "Are you currently ill or have you recently been injured?",
        "Are you taking any medication, prescribed or over-the-counter?",
        "Do you have any physical disabilities or conditions that would affect your balance?"
    ],
  },
  pre_arrest_screening: {
    fstAdminGuide: {
        english: {
            fstAdminGuide: [
                {
                    TestName: "Horizontal Gaze Nystagmus (HGN)",
                    TotalClues: "6",
                    DecisionPoint: "4",
                    StandardizedClues: [
                      "1. Lack of Smooth Pursuit (Left Eye)",
                      "2. Lack of Smooth Pursuit (Right Eye)",
                      "3. Distinct and Sustained Nystagmus at Maximum Deviation (Left Eye)",
                      "4. Distinct and Sustained Nystagmus at Maximum Deviation (Right Eye)",
                      "5. Onset of Nystagmus Prior to 45 Degrees (Left Eye)",
                      "6. Onset of Nystagmus Prior to 45 Degrees (Right Eye)",
                    ],
                    VerbatimInstructions:
                      "I am going to check your eyes. Please keep your head still and follow this stimulus with your eyes only. Do not move your head. Do you understand?",
                    OfficerNotes:
                      "Keep stimulus 12-15 inches from the subject's nose and slightly above eye level. Each clue observed in one eye counts as one clue. Vertical Nystagmus is an indicator of high doses of alcohol or certain drugs, but is not one of the 6 standardized clues.",
                },
                {
                    TestName: "Walk-and-Turn (WAT)",
                    TotalClues: "8",
                    DecisionPoint: "2",
                    StandardizedClues: [
                      "1. Cannot keep balance while listening to instructions.",
                      "2. Starts before instructions are finished.",
                      "3. Stops while walking to regain balance.",
                      "4. Does not touch heel-to-toe.",
                      "5. Steps off the line.",
                      "6. Uses arms to balance.",
                      "7. Improper turn.",
                      "8. Incorrect number of steps.",
                    ],
                    VerbatimInstructions:
                      "Please put your left foot on the line and your right foot on the line ahead of it, with the heel of your right foot touching the toe of your left foot. Keep your hands at your sides. Do not start until I tell you to. When I tell you to start, take nine heel-to-toe steps down the line, turn, and take nine heel-to-toe steps back. On the ninth step, keep your front foot on the line, and turn by taking a series of small steps with the other foot. While you are walking, keep your hands at your sides, watch your feet at all times, and count your steps out loud. Do you understand?",
                    OfficerNotes:
                      "The 'line' can be a real line or an imaginary one. If the subject steps off the line, instruct them to get back on and continue from that point. A subject who cannot complete the test or is in danger of falling should be stopped for their safety.",
                },
                {
                    TestName: "One-Leg Stand (OLS)",
                    TotalClues: "4",
                    DecisionPoint: "2",
                    StandardizedClues: [
                      "1. Sways while balancing.",
                      "2. Uses arms to balance.",
                      "3. Hops to maintain balance.",
                      "4. Puts foot down.",
                    ],
                    VerbatimInstructions:
                      "Please stand with your feet together and your arms at your sides. Do not start until I tell you to. When I tell you to, I want you to raise one leg, either leg, approximately six inches off the ground, foot pointed out. You must keep both legs straight and your arms at your sides. While holding that position, you must count out loud in the following manner: one thousand one, one thousand two, one thousand three, and so on, until told to stop. Do you understand?",
                    OfficerNotes:
                      "The officer must time the 30-second period. If a subject puts their foot down, instruct them to pick it back up and continue counting from where they left off. Putting the foot down three or more times is strong evidence of impairment.",
                },
            ],
            impliedConsentScripts: [
                {
                    Title: "Pre-Arrest Refusal to Submit to FSTs",
                    Script:
                      "I would like you to perform a few field sobriety tests so I can determine if you are safe to drive. These tests are voluntary. However, your refusal to take these tests may be used as evidence against you in court. Do you still refuse?",
                },
                {
                    Title: "Implied Consent Warning - First Refusal",
                    Script:
                      "I am now requesting that you submit to a lawful test of your breath for the purpose of determining its alcohol content. Should you refuse, your privilege to operate a motor vehicle will be suspended for a period of one year. Do you wish to submit to this test?",
                },
                {
                    Title: "Implied Consent Warning - Second/Subsequent Refusal",
                    Script:
                      "I am now requesting that you submit to a lawful test of your breath. Should you refuse to submit to this test, and if your driving privilege has been previously suspended for a prior refusal to submit to a lawful test of your breath, urine, or blood, your privilege to operate a motor vehicle will be suspended for 18 months and you will be committing a misdemeanor of the first degree. Do you wish to submit to this test?",
                },
                {
                    Title: "Implied Consent Warning - CMV Operator",
                    Script:
                      "You are operating a commercial motor vehicle. I am now requesting you submit to a lawful test of your breath. If you refuse, you will be disqualified from operating a commercial motor vehicle for a period of one year. Do you wish to submit to this test?",
                },
            ]
        },
        spanish: {
            fstAdminGuide: [
                {
                    TestName: "Nistagmo de Mirada Horizontal (HGN)",
                    TotalClues: "6",
                    DecisionPoint: "4",
                    StandardizedClues: [
                      "1. Lack of Smooth Pursuit (Left Eye)",
                      "2. Lack of Smooth Pursuit (Right Eye)",
                      "3. Distinct and Sustained Nystagmus at Maximum Deviation (Left Eye)",
                      "4. Distinct and Sustained Nystagmus at Maximum Deviation (Right Eye)",
                      "5. Onset of Nystagmus Prior to 45 Degrees (Left Eye)",
                      "6. Onset of Nystagmus Prior to 45 Degrees (Right Eye)",
                    ],
                    VerbatimInstructions:
                      "Voy a revisar sus ojos. Por favor, mantenga su cabeza quieta y siga este estímulo solo con sus ojos. No mueva su cabeza. ¿Entiende?",
                    OfficerNotes:
                      "Keep stimulus 12-15 inches from the subject's nose and slightly above eye level. Each clue observed in one eye counts as one clue. Vertical Nystagmus is an indicator of high doses of alcohol or certain drugs, but is not one of the 6 standardized clues.",
                },
                {
                    TestName: "Caminar y Girar (WAT)",
                    TotalClues: "8",
                    DecisionPoint: "2",
                    StandardizedClues: [
                      "1. Cannot keep balance while listening to instructions.",
                      "2. Starts before instructions are finished.",
                      "3. Stops while walking to regain balance.",
                      "4. Does not touch heel-to-toe.",
                      "5. Steps off the line.",
                      "6. Uses arms to balance.",
                      "7. Improper turn.",
                      "8. Incorrect number of steps.",
                    ],
                    VerbatimInstructions:
                      "Por favor, ponga su pie izquierdo en la línea y su pie derecho en la línea delante de él, con el talón de su pie derecho tocando la punta de su pie izquierdo. Mantenga sus manos a los lados. No comience hasta que yo le diga. Cuando le diga que comience, dé nueve pasos de talón a punta por la línea, gire y dé nueve pasos de talón a punta de regreso. En el noveno paso, mantenga su pie delantero en la línea y gire dando una serie de pequeños pasos con el otro pie. Mientras camina, mantenga sus manos a los lados, mire sus pies en todo momento y cuente sus pasos en voz alta. ¿Entiende?",
                    OfficerNotes:
                      "The 'line' can be a real line or an imaginary one. If the subject steps off the line, instruct them to get back on and continue from that point. A subject who cannot complete the test or is in danger of falling should be stopped for their safety.",
                },
                {
                    TestName: "Pararse en una Pierna (OLS)",
                    TotalClues: "4",
                    DecisionPoint: "2",
                    StandardizedClues: [
                      "1. Sways while balancing.",
                      "2. Uses arms to balance.",
                      "3. Hops to maintain balance.",
                      "4. Puts foot down.",
                    ],
                    VerbatimInstructions:
                      "Por favor, párese con los pies juntos y los brazos a los lados. No comience hasta que yo le diga. Cuando yo le diga, quiero que levante una pierna, cualquiera de las dos, aproximadamente seis pulgadas del suelo, con el pie apuntando hacia afuera. Debe mantener ambas piernas rectas y los brazos a los lados. Mientras mantiene esa posición, debe contar en voz alta de la siguiente manera: mil uno, mil dos, mil tres, y así sucesivamente, hasta que se le diga que se detenga. ¿Entiende?",
                    OfficerNotes:
                      "The officer must time the 30-second period. If a subject puts their foot down, instruct them to pick it back up and continue counting from where they left off. Putting the foot down three or more times is strong evidence of impairment.",
                },
            ],
            impliedConsentScripts: [
                {
                    Title: "Negativa a Realizar Pruebas de Sobriedad (Pre-Arresto)",
                    Script:
                      "Me gustaría que realizara algunas pruebas de sobriedad en el campo para que yo pueda determinar si está en condiciones seguras para conducir. Estas pruebas son voluntarias. Sin embargo, su negativa a realizar estas pruebas puede ser utilizada como evidencia en su contra en un tribunal. ¿Aún se niega?",
                },
                {
                    Title: "Advertencia de Consentimiento Implícito - Primera Negativa",
                    Script:
                      "Ahora le solicito que se someta a una prueba legal de su aliento con el propósito de determinar su contenido de alcohol. Si se negara, su privilegio para operar un vehículo motorizado será suspendido por un período de un año. ¿Desea someterse a esta prueba?",
                },
                {
                    Title: "Advertencia de Consentimiento Implícito - Segunda/Subsiguiente Negativa",
                    Script:
                      "Ahora le solicito que se someta a una prueba legal de su aliento. Si se negara a someterse a esta prueba, y si su privilegio de conducir ha sido previamente suspendido por una negativa anterior a someterse a una prueba legal de su aliento, orina o sangre, su privilegio para operar un vehículo motorizado será suspendido por 18 meses y estará cometiendo un delito menor de primer grado. ¿Desea someterse a esta prueba?",
                },
                {
                    Title: "Advertencia de Consentimiento Implícito - Operador de CMV",
                    Script:
                      "Usted está operando un vehículo motorizado comercial. Ahora le solicito que se someta a una prueba legal de su aliento. Si se niega, será descalificado para operar un vehículo motorizado comercial por un período de un año. ¿Desea someterse a esta prueba?",
                },
            ]
        },
        haitian_creole: {
            fstAdminGuide: [
                 {
                    TestName: "Nistagmous Gade Orizontal (HGN)",
                    TotalClues: "6",
                    DecisionPoint: "4",
                    StandardizedClues: [
                      "1. Lack of Smooth Pursuit (Left Eye)",
                      "2. Lack of Smooth Pursuit (Right Eye)",
                      "3. Distinct and Sustained Nystagmus at Maximum Deviation (Left Eye)",
                      "4. Distinct and Sustained Nystagmus at Maximum Deviation (Right Eye)",
                      "5. Onset of Nystagmus Prior to 45 Degrees (Left Eye)",
                      "6. Onset of Nystagmus Prior to 45 Degrees (Right Eye)",
                    ],
                    VerbatimInstructions:
                      "Mwen pral tcheke je ou. Tanpri kenbe tèt ou fiks epi swiv estimilis sa a sèlman ak je ou. Pa deplase tèt ou. Èske ou konprann?",
                    OfficerNotes:
                      "Keep stimulus 12-15 inches from the subject's nose and slightly above eye level. Each clue observed in one eye counts as one clue. Vertical Nystagmus is an indicator of high doses of alcohol or certain drugs, but is not one of the 6 standardized clues.",
                },
                {
                    TestName: "Mache epi Vire (WAT)",
                    TotalClues: "8",
                    DecisionPoint: "2",
                    StandardizedClues: [
                      "1. Cannot keep balance while listening to instructions.",
                      "2. Starts before instructions are finished.",
                      "3. Stops while walking to regain balance.",
                      "4. Does not touch heel-to-toe.",
                      "5. Steps off the line.",
                      "6. Uses arms to balance.",
                      "7. Improper turn.",
                      "8. Incorrect number of steps.",
                    ],
                    VerbatimInstructions:
                      "Tanpri mete pye gòch ou sou liy lan ak pye dwat ou sou liy lan devan li, avèk talon pye dwat ou touche zòtèy pye gòch ou. Kenbe men ou sou kote ou. Pa kòmanse jiskaske m di w. Lè m di w kòmanse, fè nèf pa talon-a-zòtèy sou liy lan, vire, epi fè nèf pa talon-a-zòtèy tounen. Nan nevyèm pa a, kenbe pye devan ou sou liy lan, epi vire lè w fè yon seri ti pa ak lòt pye a. Pandan w ap mache, kenbe men ou sou kote ou, gade pye ou tout tan, epi konte pa ou yo awotvwa. Èske ou konprann?",
                    OfficerNotes:
                      "The 'line' can be a real line or an imaginary one. If the subject steps off the line, instruct them to get back on and continue from that point. A subject who cannot complete the test or is in danger of falling should be stopped for their safety.",
                },
                {
                    TestName: "Kanpe sou yon Janm (OLS)",
                    TotalClues: "4",
                    DecisionPoint: "2",
                    StandardizedClues: [
                      "1. Sways while balancing.",
                      "2. Uses arms to balance.",
                      "3. Hops to maintain balance.",
                      "4. Puts foot down.",
                    ],
                    VerbatimInstructions:
                      "Tanpri kanpe ak pye ou ansanm ak bra ou sou kote ou. Pa kòmanse jiskaske m di ou. Lè m di ou, mwen vle ou leve yon janm, nenpòt janm, apeprè sis pous anlè tè a, pye ou pwente deyò. Ou dwe kenbe tou de janm ou dwat ak bra ou sou kote ou. Pandan w ap kenbe pozisyon sa a, ou dwe konte awotvwa nan fason sa a: mil en, mil de, mil twa, ak sou sa, jiskaske yo di w sispann. Èske ou konprann?",
                    OfficerNotes:
                      "The officer must time the 30-second period. If a subject puts their foot down, instruct them to pick it back up and continue counting from where they left off. Putting the foot down three or more times is strong evidence of impairment.",
                },
            ],
            impliedConsentScripts: [
                {
                    Title: "Refi pou Fè Tès Sobriyete (Anvan Arestasyon)",
                    Script:
                      "Mwen ta renmen ou fè kèk tès sobriyete nan teren an pou m ka detèmine si ou an sekirite pou w kondwi. Tès sa yo volontè. Sepandan, refi w pou fè tès sa yo ka itilize kòm prèv kont ou nan tribinal. Èske ou toujou refize?",
                },
                {
                    Title: "Avètisman Konsantman Enplisit - Premye Refi",
                    Script:
                      "Kounye a, mwen mande w pou w soumèt tèt ou a yon tès legal souf ou nan bi pou detèmine kontni alkòl li. Si w ta refize, privilèj ou pou opere yon veyikil motorize ap sispann pou yon peryòd yon ane. Èske w vle soumèt tèt ou a tès sa a?",
                },
                {
                    Title: "Avètisman Konsantman Enplisit - Dezyèm/Apre Refi",
                    Script:
                      "Kounye a, mwen mande w pou w soumèt tèt ou a yon tès legal souf ou. Si w ta refize soumèt tèt ou a tès sa a, epi si privilèj kondwi w te deja sispann pou yon refi anvan pou soumèt tèt ou a yon tès legal souf, irin, oswa san, privilèj ou pou opere yon veyikil motorize ap sispann pou 18 mwa epi w ap komèt yon deli minè premye degre. Èske w vle soumèt tèt ou a tès sa a?",
                },
                {
                    Title: "Avètisman Konsantman Enplisit - Operatè CMV",
                    Script:
                      "Ou ap opere yon veyikil motorize komèsyal. Kounye a, mwen mande w pou w soumèt tèt ou a yon tès legal souf ou. Si w refize, w ap diskalifye pou opere yon veyikil motorize komèsyal pou yon peryòd yon ane. Èske w vle soumèt tèt ou a tès sa a?",
                },
            ]
        }
    },
    nonStandardizedTests: {
      description: "Tests like reciting the alphabet (from a specific point to a specific point), counting backwards, or the finger-to-nose test are not scientifically validated like the SFSTs.",
      legalCaveat: "These tests should not be used to determine probable cause on their own. However, they can be valuable as additional, observable evidence of a subject's impairment and inability to follow instructions (divided attention). Document your observations of their performance, not just whether they 'passed' or 'failed'.",
    },
  },
  arrest_and_testing: {
    articulatingProbableCause: {
        guide: "To make a lawful DUI arrest, you must have probable cause based on the 'totality of the circumstances.' In your report, structure your justification chronologically, detailing everything from Phase 1 (driving pattern), Phase 2 (personal contact observations), and Phase 3 (FST performance). A strong PCA connects all these observations to show a clear picture of impairment.",
    },
    chemicalTestProcedures: {
        breathTest: {
            guide: "1. Mandatory 20-minute observation period where the subject has nothing in their mouth and does not vomit.\n2. Read the Implied Consent warning verbatim.\n3. Calibrate and prepare the Intoxilyzer instrument per training.\n4. Instruct the subject on how to provide a proper breath sample.\n5. If subject refuses or provides an insufficient sample after being instructed, document it as a refusal."
        },
        urineBloodTest: {
            guide: "Urine Test: Can be requested if you have probable cause to believe the driver is under the influence of drugs or a controlled substance.\n\nBlood Test: Can be requested if the driver is involved in a crash with Serious Bodily Injury or death, or if they are at a medical facility and incapable of giving a breath/urine sample due to injury."
        }
    }
  },
  case_building: {
    reportNarrativeBuilder: {
        template: `On [Date] at approximately [Time], I observed [Driving Cue]. I initiated a traffic stop at [Location]. Upon making contact with the driver, I observed [Personal Contact Cues - Sight, Sound, Smell]. The driver admitted to [Driver Statements]. I conducted SFSTs, and observed the following clues: [List HGN, WAT, OLS clues]. Based on the totality of the circumstances, I determined the driver's normal faculties were impaired and placed them under arrest for DUI.`,
        prosecutorPhrases: [
            "Based on my training and experience in DUI detection...",
            "The totality of my observations led me to believe the subject's normal faculties were impaired.",
            "The subject had difficulty with divided attention tasks, as evidenced by...",
            "The subject's performance on the SFSTs was not consistent with a sober person.",
        ]
    },
    courtTestimonyPrep: {
        prosecutionQuestions: [
            "Officer, please describe your training and certification in DUI detection.",
            "What first drew your attention to the defendant's vehicle?",
            "Can you walk the jury through the HGN test and the clues you observed?",
            "In your opinion, were the defendant's normal faculties impaired?",
        ],
        defenseQuestions: [
            "Officer, was the ground where you performed the tests perfectly level and dry?",
            "Did you ask my client if they had any injuries that would affect their balance?",
            "Isn't it true that my client's red eyes could have been from fatigue?",
            "How much traffic was passing by during the tests, officer? Was it distracting?",
            "You can't be 100% certain my client wasn't just nervous, can you?"
        ]
    }
  }
};
