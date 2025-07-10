export type MirandaWarningGuideData = {
  id: string;
  title: string;
  legalSource: string;
  plainLanguageSummary: string;
  legalTriggers: {
    title: string;
    explanation: string;
    definitions: {
      term: string;
      definition: string;
    }[];
  };
  mirandaWarningTranslations: {
    title: string;
    english: LanguageContent;
    spanish: LanguageContent;
    haitian_creole: LanguageContent;
  };
  rightsBreakdown: {
    title: string;
    rights: {
      rightName: string;
      explanation: string;
    }[];
  };
  keyCase: {
    caseName: string;
    citation: string;
    holding: string;
  };
};

export type LanguageContent = {
  language: string;
  warningLines: string[];
  waiverQuestions: string[];
};

export const mirandaWarningGuideData: MirandaWarningGuideData = {
  id: "RIGHT_MIRANDA",
  title: "Miranda Warning: A Practical Field Guide",
  legalSource: "Fifth & Sixth Amendments, as interpreted by Miranda v. Arizona",
  plainLanguageSummary:
    "A procedural safeguard designed to protect a suspect's Fifth Amendment right against self-incrimination during a custodial interrogation.",

  legalTriggers: {
    title: "When is Miranda Required?",
    explanation:
      "Miranda rights must be read before any questioning only when two conditions are met simultaneously: CUSTODY and INTERROGATION.",
    definitions: [
      {
        term: "Custody",
        definition:
          "A formal arrest or a situation where a suspect's freedom of action is curtailed to a degree associated with a formal arrest. A 'reasonable person' in the suspect's position would not feel free to leave. This is more than a temporary investigative detention like a traffic stop.",
      },
      {
        term: "Interrogation",
        definition:
          "Direct questioning about the crime under investigation, or any words or actions by police (other than those normally attendant to arrest and custody) that are reasonably likely to elicit an incriminating response from the suspect.",
      },
    ],
  },

  mirandaWarningTranslations: {
    title: "Verbatim Warning & Waiver Scripts",
    english: {
      language: "English",
      warningLines: [
        "You have the right to remain silent.",
        "Anything you say can and will be used against you in a court of law.",
        "You have the right to an attorney.",
        "If you cannot afford an attorney, one will be provided for you prior to any questioning.",
      ],
      waiverQuestions: [
        "Do you understand each of these rights I have explained to you?",
        "Having these rights in mind, do you wish to talk to me now?",
      ],
    },
    spanish: {
      language: "Spanish (Español)",
      warningLines: [
        "Usted tiene el derecho a permanecer callado.",
        "Cualquier cosa que usted diga puede y será usada en su contra en una corte de ley.",
        "Usted tiene el derecho a un abogado.",
        "Si no puede pagar un abogado, se le asignará uno antes de cualquier interrogatorio.",
      ],
      waiverQuestions: [
        "¿Entiende cada uno de estos derechos que le he explicado?",
        "Teniendo estos derechos en mente, ¿desea hablar conmigo ahora?",
      ],
    },
    haitian_creole: {
      language: "Haitian Creole (Kreyòl Ayisyen)",
      warningLines: [
        "Ou gen dwa pou rete an silans.",
        "Nenpòt sa ou di kab e ke yo pral sèvi avè l kont ou nan yon tribinal.",
        "Ou gen dwa pou w genyen yon avoka.",
        "Si ou pa gen mwayen pou w peye yon avoka, y ap ba ou youn anvan yo poze w kesyon.",
      ],
      waiverQuestions: [
        "Èske ou konprann chak dwa sa yo mwen fin eksplike ou la?",
        "Paske ou konnen dwa sa yo, èske ou vle pale avè m kounye a?",
      ],
    },
  },

  rightsBreakdown: {
    title: "Context: What Each Right Means",
    rights: [
      {
        rightName: "The Right to Remain Silent",
        explanation:
          "This means the suspect is not required to answer any questions or provide any information. If they invoke this right (e.g., by saying 'I don't want to talk'), all interrogation must cease immediately. This right can be invoked at any time.",
      },
      {
        rightName: "Anything You Say Can Be Used Against You",
        explanation:
          "This serves as a clear warning that their statements are not 'off the record' and will be used by the prosecution to prove their guilt. It ensures their waiver of the right to silence is made with full knowledge of the consequences.",
      },
      {
        rightName: "The Right to an Attorney",
        explanation:
          "The suspect has the right to have an attorney present *during* the interrogation. If the suspect makes a clear, unambiguous request for a lawyer (e.g., 'I want a lawyer'), all interrogation must cease until their lawyer is present.",
      },
      {
        rightName: "The Right to a Provided Attorney",
        explanation:
          "This ensures that the right to counsel is not dependent on the suspect's ability to pay. It informs them that a public defender will be appointed for them free of charge if they request one.",
      },
    ],
  },

  keyCase: {
    caseName: "Miranda v. Arizona",
    citation: "384 U.S. 436 (1966)",
    holding:
      "The Supreme Court held that due to the coercive nature of custodial interrogations, a suspect must be informed of their constitutional rights before questioning to ensure any statements made are voluntary.",
  },
};
