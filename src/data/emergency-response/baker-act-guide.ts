
export type CriteriaPoint = {
    criterion: string;
    whatItLooksLike: string;
};

export type TrilingualCriteria = {
    criteriaPoints: CriteriaPoint[];
};

export type BakerActGuide = {
  id: string;
  title: string;
  controllingStatute: string;
  plainLanguagePurpose: string;
  comparisonWithMarchmanAct: {
    title: string;
    explanation: string;
    table: {
      feature: string;
      bakerAct: string;
      marchmanAct: string;
    }[];
  };
  criteriaForInitiation: {
    title: string;
    english: TrilingualCriteria;
    spanish: TrilingualCriteria;
    haitian_creole: TrilingualCriteria;
  };
  officerProcedure: {
    title: string;
    steps: string[];
  };
  officerImmunity: {
    title: string;
    explanation: string;
  };
  translatedResources: {
    title: string;
    explanation: string;
    english: { language: string; whatIsHappening: string; };
    spanish: { language: string; whatIsHappening: string; };
    haitian_creole: { language: string; whatIsHappening: string; };
  };
};

export const bakerActGuideData: BakerActGuide = {
  id: "FL_BAKER_ACT_394",
  title: "The Baker Act: A Procedural Field Guide",
  controllingStatute: "Chapter 394, Florida Statutes - The Florida Mental Health Act",
  plainLanguagePurpose: "The Baker Act is a civil legal process that allows for the temporary, involuntary examination of an individual who is believed to be mentally ill and poses a danger to themselves or others.",
  comparisonWithMarchmanAct: {
    title: "Baker Act vs. Marchman Act: Which One Applies?",
    explanation: "The key difference is the underlying cause of the person's crisis. Use this table to make the right determination.",
    table: [
      {
        feature: "Primary Cause",
        bakerAct: "Mental Illness / Psychiatric Crisis",
        marchmanAct: "Substance Abuse / Drug & Alcohol Impairment",
      },
      {
        feature: "Core Standard",
        bakerAct: "Danger to self/others due to mental illness.",
        marchmanAct: "Loss of self-control regarding substance use, leading to danger.",
      },
      {
        feature: "Destination",
        bakerAct: "Receiving Facility (e.g., Hospital, Crisis Stabilization Unit)",
        marchmanAct: "Licensed Service Provider (e.g., Detox Facility)",
      },
    ],
  },
  criteriaForInitiation: {
    title: "Criteria for Involuntary Examination (with Examples)",
    english: {
        criteriaPoints: [
          {
            criterion: "There is reason to believe the person is mentally ill.",
            whatItLooksLike: "Articulate specific observations: Subject exhibits disorganized thoughts, hallucinations (auditory/visual), delusions (bizarre, fixed false beliefs), or severe depression/mania that deviates from their normal behavior.",
          },
          {
            criterion: "Because of their mental illness, the person has refused voluntary examination or is unable to determine that examination is necessary.",
            whatItLooksLike: "Articulate specific observations: You or EMS offered a voluntary examination, and the subject refused. Or, the subject is so detached from reality (e.g., catatonic, severely delusional) they cannot make a rational decision.",
          },
          {
            criterion: "Without care or treatment, the person is likely to suffer from neglect or refuse to care for themselves, posing a real and present threat of substantial harm to their well-being.",
            whatItLooksLike: "Articulate specific observations: Subject is not eating, drinking, or attending to critical medical needs directly as a result of their mental state. The environment is unsanitary to a degree that is dangerous to health.",
          },
          {
            criterion: "There is a substantial likelihood that without care or treatment, the person will cause serious bodily harm to themselves or others in the near future, as evidenced by recent behavior.",
            whatItLooksLike: "Articulate specific observations: Overt threats of suicide or harm to others, coupled with an apparent means or plan. Recent violent acts or attempts at self-harm. Escalating, threatening behavior toward a specific person.",
          },
        ],
    },
    spanish: {
        criteriaPoints: [
          {
            criterion: "Hay razones para creer que la persona tiene una enfermedad mental.",
            whatItLooksLike: "Articule observaciones específicas: El sujeto exhibe pensamientos desorganizados, alucinaciones (auditivas/visuales), delirios (creencias falsas y extrañas), o depresión/manía severa que se desvía de su comportamiento normal.",
          },
          {
            criterion: "Debido a su enfermedad mental, la persona ha rechazado un examen voluntario o es incapaz de determinar que el examen es necesario.",
            whatItLooksLike: "Articule observaciones específicas: Usted o el personal de emergencias médicas ofrecieron un examen voluntario y el sujeto se negó. O, el sujeto está tan desconectado de la realidad (p. ej., catatónico, severamente delirante) que no puede tomar una decisión racional.",
          },
          {
            criterion: "Sin cuidado o tratamiento, es probable que la persona sufra de negligencia o se niegue a cuidarse a sí misma, lo que representa una amenaza real y presente de daño sustancial para su bienestar.",
            whatItLooksLike: "Articule observaciones específicas: El sujeto no come, no bebe o no atiende necesidades médicas críticas como resultado directo de su estado mental. El entorno es insalubre hasta un grado que es peligroso para la salud.",
          },
          {
            criterion: "Existe una probabilidad sustancial de que sin cuidado o tratamiento, la persona cause un daño corporal grave a sí misma o a otros en un futuro cercano, como lo demuestra su comportamiento reciente.",
            whatItLooksLike: "Articule observaciones específicas: Amenazas abiertas de suicidio o de dañar a otros, junto con un medio o plan aparente. Actos violentos recientes o intentos de autolesión. Comportamiento amenazante y creciente hacia una persona específica.",
          },
        ],
    },
    haitian_creole: {
        criteriaPoints: [
          {
            criterion: "Gen rezon pou kwè moun nan gen yon maladi mantal.",
            whatItLooksLike: "Atikile obsèvasyon espesifik: Sijè a montre panse dezòganize, alisinasyon (odyo/vizyèl), deli (kwayans fòs, etranj), oswa depresyon/mani grav ki diferan de konpòtman nòmal li.",
          },
          {
            criterion: "Akoz maladi mantal li, moun nan refize yon egzamen volontè oswa li pa kapab detèmine si egzamen an nesesè.",
            whatItLooksLike: "Atikile obsèvasyon espesifik: Ou menm oswa pèsonèl ijans medikal te ofri yon egzamen volontè epi sijè a te refize. Oswa, sijè a tèlman dekonekte de reyalite a (pa egzanp, katatonik, gwo deli) li pa ka pran yon desizyon rasyonèl.",
          },
          {
            criterion: "San swen oswa tretman, moun nan gen anpil chans pou l soufri akoz neglijans oswa refize pran swen tèt li, sa ki reprezante yon menas reyèl e prezan pou gwo domaj nan byennèt li.",
            whatItLooksLike: "Atikile obsèvasyon espesifik: Sijè a pa manje, pa bwè, oswa pa okipe bezwen medikal kritik dirèkteman akoz eta mantal li. Anviwònman an pa ijyenik nan yon pwen ki danjere pou sante.",
          },
          {
            criterion: "Gen yon gwo pwobabilite ke san swen oswa tretman, moun nan pral lakòz gwo domaj kòporèl sou tèt li oswa sou lòt moun nan fiti prè, jan konpòtman resan li montre sa.",
            whatItLooksLike: "Atikile obsèvasyon espesifik: Menas klè pou swisid oswa pou fè lòt moun mal, ansanm ak yon mwayen oswa plan aparan. Aksyon vyolan resan oswa tantativ pou fè tèt li mal. Konpòtman menasan k ap ogmante anvè yon moun espesifik.",
          },
        ],
    },
  },
  officerProcedure: {
    title: "Your Step-by-Step Field Procedure",
    steps: [
      "1. Secure the scene and ensure it is safe. Request backup; these are often two-officer calls.",
      "2. Attempt de-escalation. If CIT-trained, use those skills. A voluntary trip to the hospital is always preferable.",
      "3. If involuntary criteria are met, inform the subject they are being taken for an examination for their safety under the Baker Act.",
      "4. Take the subject into protective custody. Note: This is a civil custody. Use of force should be reasonable and necessary to prevent harm and ensure transport.",
      "5. Transport the subject to the nearest appropriate Baker Act receiving facility.",
      "6. Complete your agency's required forms (e.g., Report of Law Enforcement Officer Initiating Involuntary Examination), clearly articulating your observations for EACH of the required criteria.",
    ],
  },
  officerImmunity: {
    title: "Officer's Good Faith Immunity",
    explanation: "Per F.S. § 394.459, law enforcement officers acting in good faith in connection with Baker Act procedures are provided with immunity from civil and criminal liability. Your detailed and objective report narrative is the best evidence of your good faith.",
  },
  translatedResources: {
    title: "Information for Family (Translated)",
    explanation: "This section provides a basic explanation of the process in multiple languages. This can be used to help communicate with family members on scene, if tactically appropriate.",
    english: {
      language: "English",
      whatIsHappening: "The officer is taking your loved one to a specialized medical facility for an emergency mental health evaluation under a civil law called the Baker Act. This is not a criminal arrest. This action is being taken because there is concern for their immediate safety due to a suspected mental health crisis. They will be evaluated by medical professionals and can be held for up to 72 hours for observation and stabilization.",
    },
    spanish: {
      language: "Spanish (Español)",
      whatIsHappening: "El oficial está llevando a su ser querido a un centro médico especializado para una evaluación de salud mental de emergencia bajo una ley civil llamada Ley Baker. Esto no es un arresto criminal. Esta acción se toma porque existe una preocupación por su seguridad inmediata debido a una presunta crisis de salud mental. Será evaluado por profesionales médicos y puede ser retenido hasta por 72 horas para observación y estabilización.",
    },
    haitian_creole: {
      language: "Haitian Creole (Kreyòl Ayisyen)",
      whatIsHappening: "Ofisye a ap mennen moun ou renmen an nan yon etablisman medikal espesyalize pou yon evalyasyon sante mantal ijans anba yon lwa sivil ki rele Lwa Baker. Sa a se pa yon arestasyon kriminèl. Aksyon sa a pran paske gen enkyetid pou sekirite imedya li akoz yon sispèk kriz sante mantal. Pwofesyonèl medikal pral evalye li epi li ka rete jiska 72 èdtan pou obsèvasyon ak estabilizasyon.",
    },
  },
};
