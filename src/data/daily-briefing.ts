
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
  briefingDate: "July 8, 2025",
  headline: "Court Clarifies \"Plain Smell\" Doctrine for Vehicle Searches",
  caseInfo: {
    caseName: "Jones v. State",
    citation: "SC24-5678 (Fla. 2025)",
    court: "Florida Supreme Court",
  },
  plainLanguageSummary:
    "In a significant ruling today, the Florida Supreme Court addressed the \"plain smell\" doctrine as it applies to vehicles, particularly in light of Florida's medical marijuana laws. The court held that the odor of burnt marijuana alone is no longer sufficient probable cause for a warrantless search of a vehicle, as it is impossible for an officer to distinguish between the smell of legal medical marijuana and illegal recreational marijuana.",
  tacticalImpact: {
    title: "What This Means For Your Next Shift",
    points: [
      "You must now articulate additional factors beyond just the smell of burnt marijuana to establish probable cause for a vehicle search.",
      "Focus on observing other indicators of illegal activity, such as attempts to conceal items, presence of paraphernalia associated with illegal use, or admissions from the subject about illegal use.",
      "Your report narrative must be very specific about these \"plus factors.\" Simply stating \"I smelled marijuana\" will likely result in suppressed evidence.",
    ],
  },
  keyQuote:
    "The odor of marijuana, standing alone, will no longer suffice to furnish probable cause for a search of a vehicle. The State must show a nexus between the odor and illegal activity.",
};
