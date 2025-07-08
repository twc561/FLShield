
export type AnimalCrueltyTopic = {
  id: string;
  title: string;
  icon: string;
  description: string;
  checklist: string[];
  officerTakeaway: string;
};

export const animalCrueltyData: AnimalCrueltyTopic[] = [
  {
    id: "topic1",
    title: "Initial Scene Assessment",
    icon: "Search",
    description: "First observations are critical for establishing probable cause.",
    checklist: [
      "Are there obvious signs of distress (panting, lethargy, crying)?",
      "What is the overall environment like? Is there excessive filth, debris, or hazardous materials?",
      "Is there access to clean food and water? Check the bowls; are they empty, dirty, or fresh?",
      "Is there adequate shelter from the elements (sun, rain)?",
      "Note any strong, unusual odors like ammonia (from urine) or decay.",
    ],
    officerTakeaway: "Your first few minutes on scene create the foundation of your case. Photograph everything before you touch or change anything. Your report should paint a vivid picture of the conditions you found.",
  },
  {
    id: "topic2",
    title: "Evidence of Neglect (Misdemeanor Cruelty)",
    icon: "Trash2",
    description: "Documenting the failure to provide necessary sustenance or shelter (F.S. § 828.13).",
    checklist: [
      "Body Condition: Is the animal emaciated? Can you clearly see ribs, spine, and hip bones? (Look up Body Condition Score charts).",
      "Coat Condition: Is the fur matted, filthy, or infested with fleas/ticks?",
      "Hoof/Nail Condition: Are the animal's nails so overgrown they are causing difficulty walking?",
      "Medical Issues: Are there open sores, untreated injuries, or obvious signs of illness (discharge from eyes/nose)?",
      "Tethering: Is the animal on a tether that is too short, too heavy, or entangled, restricting its movement?",
    ],
    officerTakeaway: "Neglect cases are built on a collection of observations. A single issue might not be enough, but multiple factors paint a clear picture of neglect. Photograph every detail.",
  },
  {
    id: "topic3",
    title: "Evidence of Intentional/Aggravated Cruelty (Felony)",
    icon: "Bone",
    description: "Identifying acts that are intentional, cruel, or result in excessive pain or suffering (F.S. § 828.12).",
    checklist: [
      "Witness Statements: Are there witnesses to the suspect striking, kicking, or torturing the animal?",
      "Physical Injuries: Are there signs of non-accidental trauma like suspicious fractures, burns, or lacerations?",
      "Animal Fighting: Are there signs of animal fighting, such as scarring, treadmills, spring poles, or multiple animals kept in isolated, poor conditions?",
      "Poisoning: Is there evidence of poison or contaminated food/water sources?",
    ],
    officerTakeaway: "The key difference between misdemeanor and felony cruelty is often intent. Your report must clearly articulate the facts that suggest the act was intentional or malicious, not just negligent. An owner's admission or witness testimony is golden here.",
  },
  {
    id: "topic4",
    title: "Documentation and Seizure",
    icon: "Camera",
    description: "Properly documenting and handling animal evidence.",
    checklist: [
      "Take overall, medium, and close-up photos of the animals and their environment.",
      "Take video if possible, as it can capture behavior and conditions more effectively than photos alone.",
      "If you seize the animals, document the chain of custody from the scene to the animal shelter/veterinarian.",
      "Get a statement from the veterinarian who examines the animals, as their expert opinion will be crucial for court.",
      "Identify all potential suspects and document their relationship to the animals.",
    ],
    officerTakeaway: "Treat animal victims like any other form of evidence. The chain of custody and expert medical documentation are what win these cases in court.",
  },
];
