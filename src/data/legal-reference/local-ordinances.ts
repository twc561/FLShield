
// --- Data Types ---

export type OrdinancePlaceholder = {
  ordinanceNumber: string;
  ordinanceTitle: string;
  jurisdiction: string;
  category:
    | "Alcohol & Public Behavior"
    | "Traffic & Parking"
    | "Property & Code Enforcement"
    | "Business & Licensing"
    | "Animal Ordinances"
    | "Public Order & Safety";
};

export type OrdinanceDetail = {
  ordinanceNumber: string;
  ordinanceTitle: string;
  jurisdiction: string;
  fullOrdinanceText: string;
  summary: string;
  enforcementNotes: string;
  penalty: string;
  relatedStateStatute: string;
};

// --- Static Data for the Guide ---

/**
 * The pre-defined ordinance list has been removed to ensure accuracy.
 * The guide now relies exclusively on the AI Analyst for real-time data.
 */
export const ordinanceIndex: OrdinancePlaceholder[] = [];

/**
 * The pre-filled ordinance cache has been removed to ensure accuracy.
 * The guide now relies exclusively on the AI Analyst for real-time data.
 */
export const ordinanceDetailsData: Record<string, OrdinanceDetail> = {};
