
export type DailyBriefing = {
  briefingDate: string;
  headline: string;
  caseInfo: {
    caseName: string;
    citation: string;
    court: string;
  };
  plainLanguageSummary: string;
  tacticalImpact: {
    title: string;
    points: string[];
  };
  keyQuote: string;
};

// In a production app, this object would be generated and overwritten daily
// by the automated AI analysis workflow.
export const dailyBriefingData: DailyBriefing = {
  briefingDate: "July 9, 2025",
  headline: "AI-Generated Public Intelligence Briefing",
  caseInfo: {
    caseName: "Synthesized from Public News & RSS Feeds",
    citation: "For Situational Awareness Only",
    court: "Florida Public Information",
  },
  plainLanguageSummary:
    "This briefing is a demonstration of an AI model's ability to synthesize publicly available information. In a real-world scenario, this would be populated with AI-summarized content from verified law enforcement press releases, local news RSS feeds, and public safety alerts. The goal is to provide officers with a concise, scannable summary of recent significant events, crime trends, and officer safety bulletins relevant to their patrol area before they begin their shift.",
  tacticalImpact: {
    title: "Example Tactical Impact Points",
    points: [
      "Be on the lookout (BOLO) for a blue sedan, license plate XYZ, involved in a series of commercial burglaries in the downtown area.",
      "Increased reports of vehicle break-ins have been noted near public parks. Advise citizens not to leave valuables in their cars.",
      "A new counterfeit bill scheme involving fraudulent $50 bills has been reported by several local businesses.",
      "Officer Safety Bulletin: A subject known to be armed and dangerous, John Doe, has been seen in the area. Approach with extreme caution."
    ],
  },
  keyQuote:
    "This AI-generated summary demonstrates how public data can be transformed into actionable intelligence, enhancing officer safety and situational awareness without accessing any confidential information.",
};

// Data structure for the new interactive daily briefing overlay
export type InteractiveBriefing = {
  title: string;
  publishDate: string;
  scenario: {
    title: string;
    situation: string;
    question: string;
    options: {
      text: string;
      feedback: string;
      isCorrect: boolean;
    }[];
  };
  knowledgeDive: {
    title: string;
    takeaways: string[];
    details: string;
  };
  relatedGuideLink: string;
  relatedGuideTitle: string;
};

// Example data for one day's briefing.
export const interactiveBriefingData: InteractiveBriefing = {
  title: "Daily Briefing: Traffic Stops & Searches",
  publishDate: "2024-07-20", // In a real app, this would match the current date
  scenario: {
    title: "Scenario: The Traffic Stop",
    situation: "You conduct a lawful traffic stop for a broken taillight. Upon making contact, you smell the faint odor of fresh marijuana coming from the vehicle. The driver appears nervous.",
    question: "What is your next legal step?",
    options: [
      {
        text: "Order the driver out and immediately search the vehicle.",
        feedback: "Incorrect. While the odor is a factor, recent case law in Florida suggests smell alone is not sufficient PC for a vehicle search due to legal hemp. You need more evidence ('plus factors').",
        isCorrect: false
      },
      {
        text: "Begin a DUI investigation based on the odor.",
        feedback: "Correct. The odor provides reasonable suspicion to expand the scope of the stop to a DUI investigation. This allows you to ask more questions and request Field Sobriety Tests.",
        isCorrect: true
      },
      {
        text: "Ignore the smell and just issue the taillight ticket.",
        feedback: "Suboptimal. While safe, you would be failing to investigate a potential criminal violation based on reasonable suspicion.",
        isCorrect: false
      }
    ]
  },
  knowledgeDive: {
    title: "Deep Dive: The Automobile Exception",
    takeaways: [
      "Established in Carroll v. U.S.",
      "Allows for warrantless search of a vehicle if there is probable cause to believe it contains evidence of a crime.",
      "Justified by the inherent mobility of vehicles.",
      "The scope of the search is limited to areas where the evidence could reasonably be found."
    ],
    details: "This exception is one of the most frequently used in law enforcement. It is crucial to be able to articulate your specific, fact-based probable cause in your report to justify the warrantless search."
  },
  relatedGuideLink: "/legal-reference/case-law",
  relatedGuideTitle: "Explore the Case Law Vault"
};
