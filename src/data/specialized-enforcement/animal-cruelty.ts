import type { Scenario } from "@/data/field-procedures/scenario-checklists";

// --- Data Types for Animal Cruelty Guide ---

export type LegalDefinition = {
  title: string;
  definition: string;
};
export type LegalComparison = {
  misdemeanor: string;
  felony: string;
};
export type RecognitionIndicator = {
  category: string;
  icon: string;
  indicators: string[];
};
export type ReportWritingTip = {
  title: string;
  content: string;
};
export type AgencyContact = {
  name: string;
  phone: string;
  notes: string;
};

export type AnimalCrueltyGuide = {
  legalFoundation: {
    definitions: LegalDefinition[];
    comparison: LegalComparison;
  };
  recognitionGuide: RecognitionIndicator[];
  investigativePlaybook: Scenario;
  reportWriting: {
    tips: ReportWritingTip[];
    vetRole: { title: string; content: string; };
    photoLogTemplate: {key: string; value: string}[];
  };
  agencyDirectory: {
    stLucie: AgencyContact[];
    otherFlorida: AgencyContact[];
  };
};

// --- Comprehensive Guide Data ---

export const animalCrueltyGuideData: AnimalCrueltyGuide = {
  legalFoundation: {
    definitions: [
      {
        title: "Animal",
        definition: "Includes every living dumb creature.",
      },
      {
        title: "Cruelty/Torment",
        definition: "Any act, omission, or neglect causing unnecessary or unjustifiable pain or suffering to an animal.",
      },
      {
        title: "Unnecessary Pain or Suffering",
        definition: "Pain or suffering that is not required for a legitimate purpose, such as veterinary care or humane euthanasia.",
      },
      {
        title: "Abandonment",
        definition: "Leaving an animal to fend for itself, dumping it, or leaving it on public or private property without provision for its care.",
      },
    ],
    comparison: {
      misdemeanor: "Focuses on acts of neglect such as failing to provide necessary food, water, or shelter, leading to unnecessary suffering (F.S. § 828.13), or any act that results in cruel treatment (F.S. § 828.12(1)).",
      felony: "Focuses on intentional acts that cause cruel death, or the excessive and repeated infliction of unnecessary pain or suffering. This is also known as 'Aggravated Animal Cruelty' (F.S. § 828.12(2)).",
    },
  },
  recognitionGuide: [
    {
      category: "Simple Neglect",
      icon: "Trash2",
      indicators: [
        "Emaciated body (ribs, spine, hips visible).",
        "Overgrown nails causing difficulty walking.",
        "Severely matted fur, often with feces or urine.",
        "Lack of access to clean water or potable food.",
        "Inadequate shelter from sun, rain, or cold.",
      ],
    },
    {
      category: "Hoarding",
      icon: "Home",
      indicators: [
        "Overwhelming smell of ammonia (urine) or feces upon approach.",
        "Numerous animals in poor condition.",
        "Owner seems unaware of the negative effects on the animals.",
        "Owner isolates from the community and denies access to the home.",
      ],
    },
    {
      category: "Physical Abuse",
      icon: "Bone",
      indicators: [
        "Unexplained injuries like fractures, burns, or lacerations.",
        "Owner gives vague or conflicting stories about how injuries occurred.",
        "Animal is overly fearful, cowering, or aggressive towards owner.",
        "Witness accounts of the animal being struck, kicked, or thrown.",
      ],
    },
    {
      category: "Animal Fighting (Dogfighting)",
      icon: "Swords",
      indicators: [
        "Multiple dogs (usually pit bull-type) with scars on face, neck, and legs.",
        "Presence of treadmills, springpoles, or a fighting pit.",
        "Possession of 'breaking sticks' used to pry open dogs' jaws.",
        "Animals kept on heavy chains in isolated areas.",
      ],
    },
  ],
  investigativePlaybook: {
    id: "animal-cruelty-investigation",
    name: "Animal Cruelty Investigation",
    subtitle: "F.S. §828.12, §828.13",
    category: "Specialized Investigations",
    icon: "Stethoscope",
    goal: "To safely investigate reports of animal cruelty, document evidence, ensure the welfare of animal victims, and coordinate with Animal Control.",
    keyStatutes: ["F.S. §828.12 (Cruelty to Animals)", "F.S. §828.13 (Confinement of Animals)"],
    initialStepId: "start",
    walkthrough: {
      start: {
        phase: "Dispatch & Response",
        title: "Receiving the Call",
        content: "You receive a call regarding animal cruelty or neglect. What is the most critical piece of initial information?",
        aiTip: "Ask dispatch for the specific nature of the complaint (e.g., 'dog left in hot car,' 'starving horses,' 'sounds of dog fighting'). This determines your urgency and if you need specialized backup like Animal Control from the start.",
        choices: [{ text: "Proceed to scene.", nextStepId: "arrival" }],
      },
      arrival: {
        phase: "Scene Assessment",
        title: "Initial Scene Assessment",
        content: "You arrive on scene. What is your first action?",
        aiTip: "Observe from a distance first. Take note of the overall property condition. Look and listen for animals in distress before you make contact with any individuals to avoid evidence being hidden or destroyed.",
        choices: [{ text: "I've made initial observations. Make contact?", nextStepId: "contact" }],
      },
      contact: {
        phase: "Scene Assessment",
        title: "Contact with Owner/Suspect",
        content: "You are making contact with the property or animal owner.",
        aiLegalNote: "You are on private property. You can engage in a 'knock and talk' but cannot enter the home or backyard without a warrant, exigent circumstances, or valid consent. Evidence in 'plain view' from your lawful position is admissible.",
        choices: [{ text: "Assess the animal's condition.", nextStepId: "assess_animal" }],
      },
      assess_animal: {
        phase: "Evidence Documentation",
        title: "Assessing Animal & Environment",
        content: "You are now observing the animal(s) and their living conditions.",
        aiTip: "Begin photographing everything immediately from your lawful vantage point. Capture the animal's body condition, its access to food/water/shelter, and the general state of the environment.",
        choices: [
            { text: "Is there evidence of felony cruelty (intentional abuse, fighting)?", nextStepId: "felony_cruelty"},
            { text: "Is there evidence of misdemeanor neglect?", nextStepId: "neglect_cruelty"},
            { text: "No evidence of a crime.", nextStepId: "no_crime"}
        ]
      },
      felony_cruelty: {
        phase: "Evidence Documentation",
        title: "Felony Cruelty Indicators",
        content: "You have observed evidence of intentional abuse or fighting (e.g., fresh injuries, fighting paraphernalia).",
        aiLegalNote: "This elevates the situation significantly. You likely have probable cause for an arrest for Aggravated Animal Cruelty. Secure the suspect and the scene. This is now a felony crime scene.",
        choices: [{ text: "Notify Animal Control for seizure.", nextStepId: "resolution_seizure" }]
      },
      neglect_cruelty: {
        phase: "Evidence Documentation",
        title: "Misdemeanor Neglect Indicators",
        content: "You observe evidence of neglect (e.g., no food/water, emaciation). The animal's life does not appear to be in immediate, imminent danger.",
        aiTip: "This is a common scenario. Your primary partner is Animal Control. They can issue civil citations and work with the owner. You will document the criminal aspect. A criminal charge often depends on the severity and chronicity of the neglect.",
        choices: [{ text: "Notify Animal Control to respond.", nextStepId: "resolution_ac" }]
      },
      no_crime: {
        phase: "Resolution & Reporting",
        title: "No Evidence of a Crime",
        content: "The conditions, while perhaps not ideal, do not meet the criminal standard for cruelty or neglect.",
        aiTip: "Document your observations thoroughly in a field interview card or incident report to establish a record in case of future calls. You can still offer the owner information for local resources like low-cost vet care or pet food banks.",
        isEnd: true
      },
      resolution_seizure: {
        phase: "Resolution & Reporting",
        title: "Seizure & Arrest",
        content: "Animal Control is en route to take custody of the animal evidence. You are proceeding with a felony arrest.",
        aiTip: "Coordinate with Animal Control. Ensure they document the chain of custody for the animals. Your report should clearly state that you transferred custody to a specific Animal Control Officer.",
        isEnd: true,
      },
      resolution_ac: {
        phase: "Resolution & Reporting",
        title: "Coordination with Animal Control",
        content: "Animal Control is responding to handle the civil/code aspects.",
        aiTip: "Share your observations with the Animal Control Officer. Determine if a criminal charge is warranted in addition to their actions. If so, you will write a report and may need their report as a supplement. If not, document your actions and defer to AC.",
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: "Initial Response",
        icon: "Siren",
        items: [
          "Observe the scene from a distance before making contact.",
          "Identify and interview the complainant, witnesses, and suspect.",
          "Assess the immediate welfare of any animals involved.",
        ],
      },
      {
        section: "Investigation & Evidence",
        icon: "Camera",
        items: [
          "Photograph the animals, their injuries, and their living conditions extensively.",
          "Document the availability and condition of food, water, and shelter.",
          "Note the animal's physical body condition and demeanor.",
          "Look for evidence of intentional injury, fighting, or long-term neglect.",
          "Record any statements or admissions from the owner.",
        ],
      },
      {
        section: "Concluding Actions",
        icon: "ShieldCheck",
        items: [
          "Determine if a criminal violation (misdemeanor or felony) has occurred.",
          "Coordinate with Animal Control for animal seizure and civil enforcement.",
          "If making an arrest, articulate the specific elements of the crime in your PC Affidavit.",
          "Provide a detailed report to the State Attorney's Office, including photos and witness info.",
        ],
      },
    ],
  },
  reportWriting: {
    tips: [
      {
        title: "Articulating Poor Body Condition",
        content: "The dog's ribs, spine, and pelvic bones were clearly visible from a distance, with no discernible body fat and obvious loss of muscle mass, consistent with a Body Condition Score of 1 out of 9.",
      },
      {
        title: "Articulating Lack of Water",
        content: "The only visible water bowl was overturned and dry. The ground beneath it was dusty, indicating it had been empty for a significant period. A second bowl contained dark green, stagnant water with algae and mosquito larvae.",
      },
      {
        title: "Articulating Inadequate Shelter",
        content: "The only available shelter was a dilapidated wooden structure with no roof, offering no protection from the rain or the direct sun, which was measured at 92 degrees Fahrenheit at the time of my investigation.",
      },
    ],
    vetRole: {
      title: "The Veterinarian's Role",
      content: "Your report and photos provide the 'before' picture. The veterinarian's exam and report provide the expert analysis that proves, in medical terms, the extent of the animal's suffering and neglect. The vet's report is often the most crucial piece of evidence for securing a conviction. Your job is to provide them with a strong foundation.",
    },
    photoLogTemplate: [
        { key: 'photoNum', value: 'Photo #' },
        { key: 'timestamp', value: 'Time/Date' },
        { key: 'description', value: 'Brief Description' },
    ],
  },
  agencyDirectory: {
    stLucie: [
      {
        name: "St. Lucie County Animal Safety, Services & Protection",
        phone: "772-462-8120",
        notes: "Primary contact for unincorporated St. Lucie County. Handles seizure, transport, and housing of animal victims.",
      },
      {
        name: "Fort Pierce Animal Control",
        phone: "772-467-3139",
        notes: "Handles animal-related calls within the city limits of Fort Pierce.",
      },
      {
        name: "Port St. Lucie Animal Control",
        phone: "772-871-5042",
        notes: "Handles animal-related calls within the city limits of Port St. Lucie.",
      }
    ],
    otherFlorida: [
        {
            name: "Miami-Dade Animal Services",
            phone: "305-884-1101",
            notes: "Emergency contact for animal cruelty and injuries in Miami-Dade County."
        },
        {
            name: "Orange County Animal Services",
            phone: "407-836-3111",
            notes: "Main line for all animal-related services and emergencies in Orange County."
        },
        {
            name: "Hillsborough County Pet Resource Center",
            phone: "813-744-5660",
            notes: "Handles animal control and cruelty investigations for Hillsborough County."
        },
        {
            name: "FWC Wildlife Alert Hotline",
            phone: "888-404-3922",
            notes: "For cases involving wildlife (alligators, sea turtles, etc.) or certain exotic species."
        }
    ],
  },
};
