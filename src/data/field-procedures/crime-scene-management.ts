export type ProcedureStep = {
  id: string;
  title:string;
  icon: string;
  description: string;
  content: string[];
  keyPoints: string[];
};

export const crimeSceneManagementData: ProcedureStep[] = [
  {
    id: "step1",
    title: "Initial Response & Officer Safety",
    icon: "Siren",
    description: "The first responding officer's actions are critical to the successful preservation of a crime scene.",
    content: [
      "Approach the scene cautiously, scanning for threats to officer safety.",
      "Note any persons or vehicles leaving the immediate area.",
      "Address any immediate medical needs for victims or suspects without unnecessarily contaminating the scene.",
      "Secure and separate witnesses and suspects."
    ],
    keyPoints: [
      "Your safety is the #1 priority.",
      "Assume the scene is not secure until confirmed otherwise.",
      "Every person at the scene is a potential source of information or contamination."
    ]
  },
  {
    id: "step2",
    title: "Secure and Protect the Scene",
    icon: "Radio",
    description: "Establish firm boundaries to prevent unauthorized entry and protect evidence.",
    content: [
      "Establish a perimeter using crime scene tape or natural barriers. It is better to make the perimeter too large than too small.",
      "Identify a single entry/exit point for all authorized personnel.",
      "Communicate the scene boundaries to dispatch and responding units.",
      "Protect the scene from environmental factors (rain, sun) if possible and necessary."
    ],
    keyPoints: [
      "A contaminated scene can lead to lost cases.",
      "Document the original state of the scene before any alterations.",
      "The perimeter is your first line of defense against contamination."
    ]
  },
  {
    id: "step3",
    title: "Initiate Crime Scene Log",
    icon: "Clipboard",
    description: "Maintain a detailed record of everyone who enters or exits the scene.",
    content: [
      "Designate an officer to maintain the crime scene log.",
      "Record the name, agency, time of entry, reason for entry, and time of exit for every individual.",
      "This includes law enforcement, medical personnel, and any other officials.",
      "The log is a critical piece of evidence for establishing chain of custody."
    ],
    keyPoints: [
      "If their name isn't in the log, they weren't in the scene.",
      "This log will be scrutinized in court.",
      "Be precise with times and spellings."
    ]
  },
  {
    id: "step4",
    title: "Preliminary Survey / Walkthrough",
    icon: "Search",
    description: "Conduct an initial assessment of the scene with investigators or supervisors.",
    content: [
      "The first responding officer should brief the lead investigator.",
      "Conduct a slow, methodical walkthrough of the scene to get an overview.",
      "Note the location of potential evidence and develop a plan for processing.",
      "Avoid touching or moving anything during this initial survey."
    ],
    keyPoints: [
      "This is for planning, not collecting.",
      "Establish your path of entry and exit to minimize contamination.",
      "Communicate observations clearly with the investigative team."
    ]
  },
  {
    id: "step5",
    title: "Document and Process the Scene",
    icon: "Camera",
    description: "Systematically document the scene through notes, photographs, and sketches.",
    content: [
      "Take detailed notes on everything observed, including smells, sounds, and lighting.",
      "Photograph the scene from overall, mid-range, and close-up perspectives. Use a photo log.",
      "Create a crime scene sketch (rough and final) including measurements and a legend.",
      "Conduct a systematic search for evidence (e.g., grid, spiral, strip search)."
    ],
    keyPoints: [
      "Document the scene as if you are the only one who will ever see it.",
      "Take more photos than you think you need.",
      "Your notes should be able to recreate the entire scene in someone else's mind."
    ]
  },
  {
    id: "step6",
    title: "Collect and Package Evidence",
    icon: "Package",
    description: "Properly collect, package, and label all evidence to maintain its integrity.",
    content: [
      "Each item of evidence must be collected and packaged separately.",
      "Use appropriate containers (paper bags for biological evidence, paint cans for arson evidence).",
      "Label each package with case number, item number, date, time, location found, and your initials.",
      "Maintain the chain of custody by documenting every transfer of evidence."
    ],
    keyPoints: [
      "Improper packaging can destroy evidence.",
      "Chain of custody is non-negotiable.",
      "Wear appropriate personal protective equipment (PPE) at all times."
    ]
  },
  {
    id: "step7",
    title: "Final Walkthrough and Scene Release",
    icon: "CheckCircle",
    description: "Ensure all evidence has been collected and the scene is fully processed before release.",
    content: [
      "Conduct a final walkthrough with the investigative team to ensure nothing was missed.",
      "Remove all equipment and materials used during processing.",
      "Ensure all evidence is secured and the crime scene log is completed.",
      "Formally release the scene back to the property owner, documenting the time and to whom it was released."
    ],
    keyPoints: [
      "Once you release the scene, you can't go back.",
      "This is the last chance to ensure a thorough job.",
      "Document the release of the scene in your final report."
    ]
  }
];
