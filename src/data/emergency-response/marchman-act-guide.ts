
export type MarchmanActGuide = {
  id: string;
  title: string;
  controllingStatute: string;
  plainLanguagePurpose: string;
  comparisonWithBakerAct: {
    title: string;
    explanation: string;
    table: {
      feature: string;
      marchmanAct: string;
      bakerAct: string;
    }[];
  };
  criteriaForInitiation: {
    title: string;
    criteriaPoints: {
      criterion: string;
      whatItLooksLike: string;
    }[];
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

export const marchmanActGuideData: MarchmanActGuide = {
  id: "FL_MARCHMAN_ACT_397",
  title: "The Marchman Act: A Procedural Field Guide",
  controllingStatute: "Chapter 397, Florida Statutes - The Hal S. Marchman Act",
  plainLanguagePurpose: "The Marchman Act is a civil legal process designed to provide emergency assessment, stabilization, and treatment for individuals who are critically impaired by substance abuse and have lost the power of self-control.",
  comparisonWithBakerAct: {
    title: "Marchman Act vs. Baker Act: Which One Applies?",
    explanation: "The key difference is the underlying cause of the person's crisis. Use this table to make the right determination.",
    table: [
      {
        feature: "Primary Cause",
        marchmanAct: "Substance Abuse / Drug & Alcohol Impairment",
        bakerAct: "Mental Illness / Psychiatric Crisis",
      },
      {
        feature: "Core Standard",
        marchmanAct: "Loss of self-control regarding substance use, leading to danger.",
        bakerAct: "Danger to self/others due to mental illness.",
      },
      {
        feature: "Destination",
        marchmanAct: "Licensed Service Provider (e.g., Detox Facility)",
        bakerAct: "Receiving Facility (e.g., Hospital, Crisis Stabilization Unit)",
      },
    ],
  },
  criteriaForInitiation: {
    title: "Criteria for Involuntary Assessment (with Examples)",
    criteriaPoints: [
      {
        criterion: "The person has lost the power of self-control with respect to substance use.",
        whatItLooksLike: "Articulate specific observations: Subject admits to an inability to stop using despite negative consequences (e.g., 'I can't stop drinking'); witness statements confirm a pattern of uncontrollable use; subject is found in a state of extreme intoxication and unable to function.",
      },
      {
        criterion: "The person is likely to suffer from neglect or refuse to care for themselves, and such refusal or neglect poses a real and present threat of substantial harm.",
        whatItLooksLike: "Articulate specific observations: Subject is found in unsanitary conditions, is severely malnourished or dehydrated directly due to substance use, or is unable to provide for their own basic needs like food, shelter, or medical care for an existing serious condition.",
      },
      {
        criterion: "There is a substantial likelihood the person will cause serious bodily harm to themselves or others in the near future, as evidenced by recent behavior.",
        whatItLooksLike: "Articulate specific observations: Overt threats of suicide or harm to others while intoxicated; a recent history of physical violence while under the influence; repeated attempts to operate a vehicle while severely impaired; recent accidental overdoses requiring medical intervention.",
      },
    ],
  },
  officerProcedure: {
    title: "Your Step-by-Step Field Procedure",
    steps: [
      "1. Secure the scene and ensure it is safe for all parties involved.",
      "2. Attempt de-escalation. If the subject is cooperative, a voluntary admission to a treatment facility is always the preferable outcome.",
      "3. If involuntary criteria are met, inform the subject they are being taken for an assessment for their safety under the Marchman Act.",
      "4. Take the subject into protective custody. Note: This is a civil custody, not a criminal arrest. Use of force should be reasonable and necessary for transport.",
      "5. Transport the subject to the nearest appropriate licensed service provider (detox or addiction receiving facility).",
      "6. Complete your agency's required forms (e.g., Ex Parte Petition), clearly articulating your observations for EACH of the required criteria you have witnessed.",
    ],
  },
  officerImmunity: {
    title: "Officer's Good Faith Immunity",
    explanation: "Per F.S. § 397.6774, law enforcement officers acting in good faith in connection with Marchman Act procedures are provided with immunity from civil and criminal liability. Your detailed and objective report narrative is the best evidence of your good faith.",
  },
  translatedResources: {
    title: "Information for Family (Translated)",
    explanation: "This section provides a basic explanation of the process in multiple languages. This can be used to help communicate with family members on scene, if tactically appropriate.",
    english: {
      language: "English",
      whatIsHappening: "The officer is taking your loved one to a specialized medical facility for an emergency substance abuse assessment under a civil law called the Marchman Act. This is not a criminal arrest. This action is being taken because there is concern for their immediate safety due to substance use. They will be evaluated by medical professionals to determine the necessary level of care.",
    },
    spanish: {
      language: "Spanish (Español)",
      whatIsHappening: "El oficial está llevando a su ser querido a un centro médico especializado para una evaluación de emergencia por abuso de sustancias bajo una ley civil llamada Ley Marchman. Esto no es un arresto criminal. Esta acción se toma porque existe una preocupación por su seguridad inmediata debido al uso de sustancias. Será evaluado por profesionales médicos para determinar el nivel de atención necesario.",
    },
    haitian_creole: {
      language: "Haitian Creole (Kreyòl Ayisyen)",
      whatIsHappening: "Ofisye a ap mennen moun ou renmen an nan yon etablisman medikal espesyalize pou yon evalyasyon ijans pou abi sibstans anba yon lwa sivil ki rele Lwa Marchman. Sa a se pa yon arestasyon kriminèl. Aksyon sa a pran paske gen enkyetid pou sekirite imedya li akoz itilizasyon sibstans. Pwofesyonèl medikal pral evalye li pou detèmine nivo swen ki nesesè.",
    },
  },
};
