
export type FstTest = {
  TestName: string;
  TotalClues: string;
  DecisionPoint: string;
  StandardizedClues: string[];
  VerbatimInstructions: string;
  InteractiveWalkthrough: { step: number; action: string }[];
  OfficerNotes: string;
};

export type LegalWarning = {
  Title: string;
  Script: string;
};

export type LanguageGuide = {
  Setup_Checklist_Title: string;
  Setup_Checklist_Items: string[];
  Medical_Clearance_Title: string;
  Medical_Clearance_Questions: string[];
  FstTests: FstTest[];
  Legal_Warnings: LegalWarning[];
};

export type TrilingualFstGuide = {
  english: LanguageGuide;
  spanish: LanguageGuide;
  haitian_creole: LanguageGuide;
};

export const fstTrilingualData: TrilingualFstGuide = {
  english: {
    Setup_Checklist_Title: "Establishing a Safe Testing Environment",
    Setup_Checklist_Items: [
      "Find a reasonably dry, hard, level, and non-slippery surface.",
      "Ensure the area is well-illuminated but away from flashing emergency lights.",
      "Position yourself and the subject away from traffic to prevent injury.",
      "Remove any immediate physical distractions or hazards.",
    ],
    Medical_Clearance_Title: "Pre-FST Medical Clearance",
    Medical_Clearance_Questions: [
      "Are you wearing glasses or contact lenses?",
      "Do you have any medical conditions or physical injuries that would prevent you from walking a straight line or balancing on one leg?",
    ],
    FstTests: [
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
        InteractiveWalkthrough: [
          { step: 1, action: "Check for equal pupil size and resting nystagmus." },
          { step: 2, action: "Check for equal tracking in both eyes." },
          { step: 3, action: "Check for Lack of Smooth Pursuit (2 passes)." },
          {
            step: 4,
            action:
              "Check for Distinct and Sustained Nystagmus at Maximum Deviation (hold for 4 seconds, 2 passes).",
          },
          {
            step: 5,
            action:
              "Check for Onset of Nystagmus Prior to 45 Degrees (move stimulus slowly, 2 passes).",
          },
          { step: 6, action: "Check for Vertical Gaze Nystagmus (2 passes)." }
        ],
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
          "Please put your left foot on the line and your right foot on the line ahead of it, with the heel of your right foot touching the toe of your left foot. Keep your hands at your sides. When I tell you to start, take nine heel-to-toe steps down the line, turn, and take nine heel-to-toe steps back. On the ninth step, keep your front foot on the line, and turn by taking a series of small steps with the other foot. While you are walking, keep your hands at your sides, watch your feet at all times, and count your steps out loud. Do you understand?",
        InteractiveWalkthrough: [
            { step: 1, action: "Instructional Phase: Give instructions and demonstrate. Observe for 'Cannot balance during instructions' and 'Starts too soon'."},
            { step: 2, action: "Walking Phase (First 9 Steps): Observe for clues 3-6 and 8."},
            { step: 3, action: "Turning Phase: Observe for 'Improper turn'."},
            { step: 4, action: "Walking Phase (Second 9 Steps): Observe for clues 3-6 and 8."},
        ],
        OfficerNotes:
          "The 'line' can be a real line or an imaginary one. If the subject steps off the line, instruct them to get back on and continue from that point. A subject who cannot complete the test or is in danger of falling should be stopped.",
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
          "Please stand with your feet together and your arms at your sides. When I tell you to, I want you to raise one leg, either leg, approximately six inches off the ground, foot pointed out. You must keep both legs straight and your arms at your sides. While holding that position, you must count out loud in the following manner: one thousand one, one thousand two, one thousand three, and so on, until told to stop. Do you understand?",
        InteractiveWalkthrough: [
            { step: 1, action: "Instructional Phase: Give instructions and demonstrate."},
            { step: 2, action: "Balance and Counting Phase: Time the subject for 30 seconds. Observe for any of the 4 clues."},
        ],
        OfficerNotes:
          "The officer must time the 30-second period. If a subject puts their foot down, instruct them to pick it back up and continue counting from where they left off. Putting the foot down three or more times is strong evidence of impairment.",
      },
    ],
    Legal_Warnings: [
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
    ],
  },
  spanish: {
    Setup_Checklist_Title: "Estableciendo un Entorno de Prueba Seguro",
    Setup_Checklist_Items: [
      "Encuentre una superficie razonablemente seca, dura, nivelada y no resbaladiza.",
      "Asegúrese de que el área esté bien iluminada pero alejada de las luces intermitentes de emergencia.",
      "Posiciónese usted y al sujeto lejos del tráfico para prevenir lesiones.",
      "Elimine cualquier distracción física o peligro inmediato.",
    ],
    Medical_Clearance_Title: "Evaluación Médica Previa a las Pruebas de Sobriedad",
    Medical_Clearance_Questions: [
      "¿Usa usted anteojos o lentes de contacto?",
      "¿Tiene alguna condición médica o lesión física que le impediría caminar en línea recta o balancearse en una pierna?",
    ],
    FstTests: [
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
        InteractiveWalkthrough: [
          { step: 1, action: "Check for equal pupil size and resting nystagmus." },
          { step: 2, action: "Check for equal tracking in both eyes." },
          { step: 3, action: "Check for Lack of Smooth Pursuit (2 passes)." },
          {
            step: 4,
            action:
              "Check for Distinct and Sustained Nystagmus at Maximum Deviation (hold for 4 seconds, 2 passes).",
          },
          {
            step: 5,
            action:
              "Check for Onset of Nystagmus Prior to 45 Degrees (move stimulus slowly, 2 passes).",
          },
          { step: 6, action: "Check for Vertical Gaze Nystagmus (2 passes)." }
        ],
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
          "Por favor, ponga su pie izquierdo en la línea y su pie derecho en la línea delante de él, con el talón de su pie derecho tocando la punta de su pie izquierdo. Mantenga sus manos a los lados. Cuando le diga que comience, dé nueve pasos de talón a punta por la línea, gire y dé nueve pasos de talón a punta de regreso. En el noveno paso, mantenga su pie delantero en la línea y gire dando una serie de pequeños pasos con el otro pie. Mientras camina, mantenga sus manos a los lados, mire sus pies en todo momento y cuente sus pasos en voz alta. ¿Entiende?",
        InteractiveWalkthrough: [
            { step: 1, action: "Instructional Phase: Give instructions and demonstrate. Observe for 'Cannot balance during instructions' and 'Starts too soon'."},
            { step: 2, action: "Walking Phase (First 9 Steps): Observe for clues 3-6 and 8."},
            { step: 3, action: "Turning Phase: Observe for 'Improper turn'."},
            { step: 4, action: "Walking Phase (Second 9 Steps): Observe for clues 3-6 and 8."},
        ],
        OfficerNotes:
          "The 'line' can be a real line or an imaginary one. If the subject steps off the line, instruct them to get back on and continue from that point. A subject who cannot complete the test or is in danger of falling should be stopped.",
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
          "Por favor, párese con los pies juntos y los brazos a los lados. Cuando yo le diga, quiero que levante una pierna, cualquiera de las dos, aproximadamente seis pulgadas del suelo, con el pie apuntando hacia afuera. Debe mantener ambas piernas rectas y los brazos a los lados. Mientras mantiene esa posición, debe contar en voz alta de la siguiente manera: mil uno, mil dos, mil tres, y así sucesivamente, hasta que se le diga que se detenga. ¿Entiende?",
        InteractiveWalkthrough: [
            { step: 1, action: "Instructional Phase: Give instructions and demonstrate."},
            { step: 2, action: "Balance and Counting Phase: Time the subject for 30 seconds. Observe for any of the 4 clues."},
        ],
        OfficerNotes:
          "The officer must time the 30-second period. If a subject puts their foot down, instruct them to pick it back up and continue counting from where they left off. Putting the foot down three or more times is strong evidence of impairment.",
      },
    ],
    Legal_Warnings: [
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
    ],
  },
  haitian_creole: {
    Setup_Checklist_Title: "Etabli yon Anviwònman Tès ki an Sekirite",
    Setup_Checklist_Items: [
      "Jwenn yon sifas ki rezonab sèk, di, plat, epi ki pa glise.",
      "Asire w zòn nan byen limen men lwen limyè ijans k ap flache.",
      "Pozisyone tèt ou ak sijè a lwen trafik pou anpeche blesi.",
      "Retire tout distraksyon fizik oswa danje imedya.",
    ],
    Medical_Clearance_Title: "Otorizasyon Medikal Anvan Tès Sobriyete",
    Medical_Clearance_Questions: [
      "Èske ou mete linèt oswa lantiy kontak?",
      "Èske ou gen nenpòt kondisyon medikal oswa blesi fizik ki ta anpeche w mache sou yon liy dwat oswa balanse sou yon sèl janm?",
    ],
    FstTests: [
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
        InteractiveWalkthrough: [
          { step: 1, action: "Check for equal pupil size and resting nystagmus." },
          { step: 2, action: "Check for equal tracking in both eyes." },
          { step: 3, action: "Check for Lack of Smooth Pursuit (2 passes)." },
          {
            step: 4,
            action:
              "Check for Distinct and Sustained Nystagmus at Maximum Deviation (hold for 4 seconds, 2 passes).",
          },
          {
            step: 5,
            action:
              "Check for Onset of Nystagmus Prior to 45 Degrees (move stimulus slowly, 2 passes).",
          },
          { step: 6, action: "Check for Vertical Gaze Nystagmus (2 passes)." }
        ],
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
          "Tanpri mete pye gòch ou sou liy lan ak pye dwat ou sou liy lan devan li, avèk talon pye dwat ou touche zòtèy pye gòch ou. Kenbe men ou sou kote ou. Lè m di w kòmanse, fè nèf pa talon-a-zòtèy sou liy lan, vire, epi fè nèf pa talon-a-zòtèy tounen. Nan nevyèm pa a, kenbe pye devan ou sou liy lan, epi vire lè w fè yon seri ti pa ak lòt pye a. Pandan w ap mache, kenbe men ou sou kote ou, gade pye ou tout tan, epi konte pa ou yo awotvwa. Èske ou konprann?",
        InteractiveWalkthrough: [
            { step: 1, action: "Instructional Phase: Give instructions and demonstrate. Observe for 'Cannot balance during instructions' and 'Starts too soon'."},
            { step: 2, action: "Walking Phase (First 9 Steps): Observe for clues 3-6 and 8."},
            { step: 3, action: "Turning Phase: Observe for 'Improper turn'."},
            { step: 4, action: "Walking Phase (Second 9 Steps): Observe for clues 3-6 and 8."},
        ],
        OfficerNotes:
          "The 'line' can be a real line or an imaginary one. If the subject steps off the line, instruct them to get back on and continue from that point. A subject who cannot complete the test or is in danger of falling should be stopped.",
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
          "Tanpri kanpe ak pye ou ansanm ak bra ou sou kote ou. Lè m di ou, mwen vle ou leve yon janm, nenpòt janm, apeprè sis pous anlè tè a, pye ou pwente deyò. Ou dwe kenbe tou de janm ou dwat ak bra ou sou kote ou. Pandan w ap kenbe pozisyon sa a, ou dwe konte awotvwa nan fason sa a: mil en, mil de, mil twa, ak sou sa, jiskaske yo di w sispann. Èske ou konprann?",
        InteractiveWalkthrough: [
            { step: 1, action: "Instructional Phase: Give instructions and demonstrate."},
            { step: 2, action: "Balance and Counting Phase: Time the subject for 30 seconds. Observe for any of the 4 clues."},
        ],
        OfficerNotes:
          "The officer must time the 30-second period. If a subject puts their foot down, instruct them to pick it back up and continue counting from where they left off. Putting the foot down three or more times is strong evidence of impairment.",
      },
    ],
    Legal_Warnings: [
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
    ],
  },
};
