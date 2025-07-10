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
