
export type EvidenceType = {
  category: string;
  description: string;
  handlingProcedures: string[];
  storageRequirements: string[];
  chainOfCustodyNotes: string[];
  commonMistakes: string[];
};

export type ChainOfCustodyStep = {
  step: number;
  title: string;
  description: string;
  requiredDocumentation: string[];
  criticalConsiderations: string[];
};

export type EvidenceGuide = {
  overviewPrinciples: {
    title: string;
    principles: string[];
  };
  evidenceTypes: EvidenceType[];
  chainOfCustodyProcedure: ChainOfCustodyStep[];
  digitalEvidenceSpecial: {
    title: string;
    procedures: string[];
    tools: string[];
  };
  courtPreparation: {
    title: string;
    steps: string[];
    testimonyTips: string[];
  };
  commonPitfalls: {
    title: string;
    pitfalls: {
      mistake: string;
      consequence: string;
      prevention: string;
    }[];
  };
};

export const evidenceManagementData: EvidenceGuide = {
  overviewPrinciples: {
    title: "Core Evidence Management Principles",
    principles: [
      "Maintain unbroken chain of custody from collection to disposition",
      "Document everything - when, where, who, what, how, and why",
      "Preserve evidence in its original state whenever possible",
      "Use proper packaging and labeling for each evidence type",
      "Secure evidence immediately to prevent contamination or loss",
      "Follow agency protocols for storage and transfer procedures"
    ]
  },
  evidenceTypes: [
    {
      category: "Physical Evidence",
      description: "Tangible items that can be collected and preserved",
      handlingProcedures: [
        "Wear gloves to prevent contamination",
        "Use tweezers or tools to avoid direct contact when possible",
        "Photograph evidence in place before collection",
        "Package immediately after collection"
      ],
      storageRequirements: [
        "Use appropriate containers (paper bags for biological, plastic for non-porous)",
        "Label with case number, date, time, location, and collecting officer",
        "Store in secure evidence locker or room",
        "Maintain proper temperature and humidity controls"
      ],
      chainOfCustodyNotes: [
        "Record exact time and location of collection",
        "Document who was present during collection",
        "Note condition of evidence when collected",
        "Record any changes in custody or location"
      ],
      commonMistakes: [
        "Using plastic bags for wet or biological evidence",
        "Failing to photograph before collection",
        "Not wearing gloves during collection",
        "Inadequate labeling or documentation"
      ]
    },
    {
      category: "Biological Evidence",
      description: "Blood, saliva, hair, DNA samples, and other biological materials",
      handlingProcedures: [
        "Allow wet biological evidence to air dry before packaging",
        "Use sterile swabs for sample collection",
        "Never mix samples from different locations",
        "Collect comparison samples when appropriate"
      ],
      storageRequirements: [
        "Use paper bags or cardboard boxes - never plastic",
        "Store in refrigerated environment when possible",
        "Separate different samples to prevent cross-contamination",
        "Follow biohazard protocols for handling"
      ],
      chainOfCustodyNotes: [
        "Document exact location where sample was collected",
        "Record method of collection used",
        "Note if sample was wet or dry when collected",
        "Document any presumptive testing performed"
      ],
      commonMistakes: [
        "Using plastic bags which can cause degradation",
        "Mixing samples from different sources",
        "Not allowing wet evidence to dry properly",
        "Failing to maintain proper storage temperature"
      ]
    },
    {
      category: "Digital Evidence",
      description: "Electronic devices, data, and digital media",
      handlingProcedures: [
        "Document device state (on/off, screen content, connections)",
        "Photograph device and surrounding area",
        "Power down devices properly to preserve data",
        "Use Faraday bags to prevent remote access"
      ],
      storageRequirements: [
        "Store in secure, climate-controlled environment",
        "Use anti-static bags when appropriate",
        "Keep devices isolated from networks",
        "Maintain detailed logs of all examinations"
      ],
      chainOfCustodyNotes: [
        "Record device serial numbers and identifying information",
        "Document all passwords or security measures observed",
        "Note any data visible on screens before seizure",
        "Record who had access to device and when"
      ],
      commonMistakes: [
        "Not documenting screen contents before seizure",
        "Failing to use Faraday bags for smartphones",
        "Attempting to access device without proper training",
        "Not maintaining isolation from networks"
      ]
    },
    {
      category: "Firearm Evidence",
      description: "Weapons, ammunition, and ballistic evidence",
      handlingProcedures: [
        "Ensure weapon is safe and unloaded",
        "Document serial numbers and identifying marks",
        "Use string through trigger guard for transport",
        "Never insert anything into the barrel"
      ],
      storageRequirements: [
        "Store in locked, secure evidence container",
        "Separate from ammunition",
        "Use gun boxes or proper racks",
        "Maintain detailed inventory logs"
      ],
      chainOfCustodyNotes: [
        "Record weapon condition when found (loaded/unloaded)",
        "Document number of rounds and their location",
        "Note any damage or modifications to weapon",
        "Record safety position and any forensic testing"
      ],
      commonMistakes: [
        "Inserting objects into barrel which can damage rifling",
        "Not properly securing weapon during transport",
        "Failing to document ammunition separately",
        "Not recording weapon's exact condition when found"
      ]
    }
  ],
  chainOfCustodyProcedure: [
    {
      step: 1,
      title: "Initial Collection and Documentation",
      description: "Proper collection techniques and immediate documentation",
      requiredDocumentation: [
        "Date, time, and exact location of collection",
        "Detailed description of evidence",
        "Photographs from multiple angles",
        "Weather conditions if relevant"
      ],
      criticalConsiderations: [
        "Wear appropriate PPE to prevent contamination",
        "Use proper collection tools and containers",
        "Document evidence condition before collection",
        "Maintain scene integrity during collection"
      ]
    },
    {
      step: 2,
      title: "Initial Packaging and Labeling",
      description: "Secure packaging with complete identification",
      requiredDocumentation: [
        "Evidence tag with case number and item number",
        "Collecting officer's name and badge number",
        "Brief description of contents",
        "Initial packaging date and time"
      ],
      criticalConsiderations: [
        "Use appropriate packaging materials for evidence type",
        "Seal containers with evidence tape",
        "Initial evidence tag immediately",
        "Ensure labels are legible and complete"
      ]
    },
    {
      step: 3,
      title: "Transfer to Evidence Storage",
      description: "Moving evidence from field to secure storage",
      requiredDocumentation: [
        "Chain of custody form completed",
        "Evidence room log entry",
        "Storage location documented",
        "Condition upon receipt noted"
      ],
      criticalConsiderations: [
        "Maintain physical control until properly stored",
        "Verify evidence room procedures are followed",
        "Obtain receipt from evidence custodian",
        "Document any changes in evidence condition"
      ]
    },
    {
      step: 4,
      title: "Laboratory Submission",
      description: "Proper procedures for forensic analysis",
      requiredDocumentation: [
        "Laboratory submission form",
        "Specific tests requested",
        "Updated chain of custody",
        "Expected timeframe for results"
      ],
      criticalConsiderations: [
        "Follow laboratory packaging requirements",
        "Include all relevant case information",
        "Maintain security during transport",
        "Track submission status and results"
      ]
    },
    {
      step: 5,
      title: "Court Preparation and Presentation",
      description: "Preparing evidence for legal proceedings",
      requiredDocumentation: [
        "Complete chain of custody documentation",
        "Laboratory reports and analysis",
        "Photographs and collection notes",
        "Evidence disposition plans"
      ],
      criticalConsiderations: [
        "Review all documentation for completeness",
        "Verify evidence integrity is maintained",
        "Prepare for testimony regarding collection",
        "Coordinate with prosecutor for presentation"
      ]
    }
  ],
  digitalEvidenceSpecial: {
    title: "Special Considerations for Digital Evidence",
    procedures: [
      "Use write-blocking devices when creating forensic images",
      "Maintain hash values to verify data integrity",
      "Document all software and tools used in examination",
      "Preserve original media in unaltered state",
      "Use only forensically sound examination methods"
    ],
    tools: [
      "Faraday bags for cell phone isolation",
      "Write-blocking hardware for storage devices",
      "Forensic imaging software",
      "Hash verification utilities",
      "Secure storage containers"
    ]
  },
  courtPreparation: {
    title: "Preparing Evidence for Court",
    steps: [
      "Review complete chain of custody documentation",
      "Verify all evidence tags and seals are intact",
      "Prepare clear photographs showing evidence condition",
      "Organize documentation in chronological order",
      "Coordinate with laboratory analysts for testimony",
      "Practice explaining collection procedures clearly"
    ],
    testimonyTips: [
      "Speak clearly and use simple, non-technical language",
      "Refer to your notes and documentation when needed",
      "Explain your training and experience with evidence handling",
      "Describe each step of the collection process in detail",
      "Be prepared to explain why specific procedures were followed",
      "Acknowledge any deviations from standard procedure honestly"
    ]
  },
  commonPitfalls: {
    title: "Common Evidence Handling Mistakes to Avoid",
    pitfalls: [
      {
        mistake: "Cross-contamination between evidence items",
        consequence: "Evidence may be deemed inadmissible or unreliable",
        prevention: "Use separate tools and containers for each item, change gloves between collections"
      },
      {
        mistake: "Inadequate documentation of collection procedures",
        consequence: "Challenges to evidence authenticity in court",
        prevention: "Document every step thoroughly, including negative results or observations"
      },
      {
        mistake: "Improper storage leading to degradation",
        consequence: "Loss of evidentiary value or complete destruction",
        prevention: "Follow specific storage requirements for each evidence type"
      },
      {
        mistake: "Gaps in chain of custody documentation",
        consequence: "Evidence may be excluded from trial proceedings",
        prevention: "Maintain continuous documentation of who had custody and when"
      },
      {
        mistake: "Failure to preserve original condition",
        consequence: "Accusations of evidence tampering or contamination",
        prevention: "Document original condition thoroughly and minimize handling"
      }
    ]
  }
};
