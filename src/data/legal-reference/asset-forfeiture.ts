
export interface AssetForfeitureGuide {
  definitions: {
    title: string;
    definition: string;
  }[];
  procedures: {
    title: string;
    description: string;
    steps: string[];
  }[];
  legalFoundations: {
    title: string;
    statute: string;
    summary: string;
  }[];
  propertyTypes: {
    category: string;
    description: string;
    examples: string[];
    requirements: string[];
  }[];
  timeframes: {
    stage: string;
    timeLimit: string;
    description: string;
  }[];
  noticeRequirements: {
    type: string;
    timeline: string;
    recipient: string;
    method: string;
  }[];
  defensesAndChallenges: {
    defense: string;
    description: string;
    burden: string;
  }[];
}

export const assetForfeitureData: AssetForfeitureGuide = {
  definitions: [
    {
      title: "Civil Asset Forfeiture",
      definition: "A legal process that allows law enforcement to seize and forfeit property connected to criminal activity, regardless of whether the property owner is charged with or convicted of a crime."
    },
    {
      title: "Criminal Asset Forfeiture",
      definition: "Forfeiture that occurs as part of a criminal case, requiring a criminal conviction before property can be permanently forfeited."
    },
    {
      title: "Contraband",
      definition: "Property that is illegal to possess or use, such as controlled substances, illegal weapons, or items used in prohibited activities."
    },
    {
      title: "Instrumentality",
      definition: "Property used to facilitate or commit a crime, such as vehicles used in drug trafficking or equipment used in illegal operations."
    },
    {
      title: "Proceeds",
      definition: "Property derived from or traceable to criminal activity, including money, assets, or other benefits obtained through illegal means."
    },
    {
      title: "Innocent Owner",
      definition: "A person who owns property subject to forfeiture but did not know of or consent to the illegal use of their property."
    }
  ],
  procedures: [
    {
      title: "Initial Seizure",
      description: "Immediate steps for seizing property subject to forfeiture",
      steps: [
        "Establish probable cause that property is subject to forfeiture",
        "Document the seizure with photographs and detailed inventory",
        "Issue proper receipt to person from whom property was seized",
        "Secure property in appropriate evidence facility",
        "Complete required seizure reports within 24 hours",
        "Notify supervisor and legal counsel of seizure"
      ]
    },
    {
      title: "Notice and Filing",
      description: "Legal requirements for initiating forfeiture proceedings",
      steps: [
        "File forfeiture complaint within 45 days of seizure",
        "Serve notice to all known interested parties",
        "Publish notice in newspaper of general circulation",
        "Allow 20 days for claimants to file responses",
        "Schedule hearing if claim is filed",
        "Prepare evidence and witness testimony"
      ]
    },
    {
      title: "Property Management",
      description: "Handling seized property during proceedings",
      steps: [
        "Maintain chain of custody documentation",
        "Store property in secure, climate-controlled facility",
        "Document any deterioration or damage",
        "Obtain court approval for sale of perishable items",
        "Maintain insurance coverage on valuable items",
        "Prepare disposition orders upon case resolution"
      ]
    }
  ],
  legalFoundations: [
    {
      title: "Florida Contraband Forfeiture Act",
      statute: "F.S. Chapter 932",
      summary: "Primary statute governing civil asset forfeiture in Florida, covering seizure procedures, notice requirements, and disposition of forfeited property."
    },
    {
      title: "Federal Forfeiture Laws",
      statute: "21 U.S.C. § 881",
      summary: "Federal statute allowing forfeiture of property used in or derived from drug trafficking, often used in conjunction with state proceedings."
    },
    {
      title: "RICO Forfeiture Provisions",
      statute: "18 U.S.C. § 1963",
      summary: "Allows forfeiture of property derived from racketeering activity, including organized crime and continuing criminal enterprises."
    },
    {
      title: "Due Process Requirements",
      statute: "U.S. Constitution, 14th Amendment",
      summary: "Constitutional protections requiring notice, opportunity to be heard, and proportionality in forfeiture proceedings."
    }
  ],
  propertyTypes: [
    {
      category: "Real Property",
      description: "Land, buildings, and permanent structures",
      examples: ["Homes used for drug manufacturing", "Commercial buildings housing illegal operations", "Land used for criminal enterprises"],
      requirements: ["Clear connection to criminal activity", "Substantial nexus between property and crime", "Property value proportional to offense"]
    },
    {
      category: "Vehicles",
      description: "Cars, boats, aircraft, and other transportation",
      examples: ["Vehicles used in drug trafficking", "Boats used for smuggling", "Aircraft used in illegal transportation"],
      requirements: ["Used to facilitate criminal activity", "Probable cause of illegal use", "Not merely incidental to crime"]
    },
    {
      category: "Currency and Financial Instruments",
      description: "Money, bank accounts, and financial assets",
      examples: ["Cash proceeds from drug sales", "Bank accounts containing criminal proceeds", "Cashier's checks from illegal activities"],
      requirements: ["Traceable to criminal activity", "Substantial connection to crime", "Not legitimate business proceeds"]
    },
    {
      category: "Personal Property",
      description: "Equipment, jewelry, and other movable items",
      examples: ["Drug manufacturing equipment", "Computers used for cybercrime", "Jewelry purchased with criminal proceeds"],
      requirements: ["Direct connection to criminal activity", "Used as instrumentality of crime", "Derived from criminal proceeds"]
    }
  ],
  timeframes: [
    {
      stage: "Initial Seizure",
      timeLimit: "Immediate",
      description: "Property may be seized immediately upon establishment of probable cause"
    },
    {
      stage: "Seizure Report",
      timeLimit: "24 hours",
      description: "Required seizure documentation must be completed within 24 hours"
    },
    {
      stage: "Forfeiture Filing",
      timeLimit: "45 days",
      description: "Forfeiture complaint must be filed within 45 days of seizure"
    },
    {
      stage: "Notice Service",
      timeLimit: "20 days",
      description: "Notice must be served on all interested parties within 20 days of filing"
    },
    {
      stage: "Claim Response",
      timeLimit: "20 days",
      description: "Claimants have 20 days to file response after receiving notice"
    },
    {
      stage: "Final Disposition",
      timeLimit: "1 year",
      description: "Most forfeiture cases should be resolved within one year of filing"
    }
  ],
  noticeRequirements: [
    {
      type: "Personal Service",
      timeline: "Within 20 days of filing",
      recipient: "Known property owners and lienholders",
      method: "Personal service by process server or certified mail"
    },
    {
      type: "Published Notice",
      timeline: "Within 20 days of filing",
      recipient: "Unknown or unlocatable parties",
      method: "Publication in newspaper of general circulation for 4 consecutive weeks"
    },
    {
      type: "Registered Mail",
      timeline: "Within 20 days of filing",
      recipient: "Last known address of property owner",
      method: "Certified mail, return receipt requested"
    },
    {
      type: "Posted Notice",
      timeline: "For real property only",
      recipient: "General public",
      method: "Notice posted conspicuously on the property"
    }
  ],
  defensesAndChallenges: [
    {
      defense: "Innocent Owner",
      description: "Property owner had no knowledge of or did not consent to illegal use of property",
      burden: "Claimant must prove by preponderance of evidence"
    },
    {
      defense: "Lack of Nexus",
      description: "Insufficient connection between property and criminal activity",
      burden: "State must prove substantial connection by clear and convincing evidence"
    },
    {
      defense: "Disproportionality",
      description: "Value of property is grossly disproportionate to the offense",
      burden: "Claimant must show excessive punishment under 8th Amendment"
    },
    {
      defense: "Procedural Defects",
      description: "Failure to comply with notice requirements or filing deadlines",
      burden: "Claimant must identify specific procedural violations"
    },
    {
      defense: "Legitimate Source",
      description: "Property was acquired through lawful means unrelated to criminal activity",
      burden: "Claimant must provide evidence of legitimate acquisition"
    },
    {
      defense: "Statute of Limitations",
      description: "Forfeiture action was not timely filed",
      burden: "Claimant must show untimely filing beyond statutory period"
    }
  ]
};
