
export type UpdatePlaceholder = {
  updateID: string;
  headline: string;
  subheading: string;
  updateDate: string;
  category: string;
  icon: 'Newspaper' | 'Gavel';
};

export type UpdateDetail = {
  updateID: string;
  headline: string;
  sourceInfo: {
    sourceName: string;
    citation: string;
    sourceType: "Case Law" | "Statutory Change";
  };
  plainLanguageSummary: string;
  tacticalImpactForOfficers: {
    title: string;
    points: string[];
  };
  keyQuoteOrText: string;
};


export const statutoryCaseLawUpdatesIndex: UpdatePlaceholder[] = [
  {
    updateID: "CASELAW_SC24_5678",
    headline: "Court Clarifies 'Plain Smell' Doctrine for Vehicle Searches",
    subheading: "Jones v. State",
    updateDate: "2025-07-08",
    category: "Case Law - Search & Seizure",
    icon: 'Gavel',
  },
  {
    updateID: "STATUTE_HB543_2023",
    headline: "Permitless Carry Goes Into Effect",
    subheading: "F.S. § 790.01",
    updateDate: "2023-07-01",
    category: "Statutory Change - Firearms",
    icon: 'Newspaper',
  },
   {
    updateID: "CASELAW_USSC_VEGA_2022",
    headline: "SCOTUS Rules Miranda Violation Not Grounds for Civil Suit",
    subheading: "Vega v. Tekoh",
    updateDate: "2022-06-23",
    category: "Case Law - Custodial Interrogation",
    icon: 'Gavel',
  },
  {
    updateID: "CASELAW_FLA_JARDINES_2013",
    headline: "K-9 Sniff at Front Door Ruled a Search",
    subheading: "Florida v. Jardines",
    updateDate: "2013-03-26",
    category: "Case Law - K-9 Operations",
    icon: 'Gavel',
  },
  {
    updateID: "STATUTE_FENTANYL_2022",
    headline: "Enhanced Penalties for Fentanyl Trafficking",
    subheading: "F.S. § 893.135",
    updateDate: "2022-10-01",
    category: "Statutory Change - Drug Offenses",
    icon: 'Newspaper',
  },
   {
    updateID: "CASELAW_USSC_RILEY_2014",
    headline: "Warrant Required for Cell Phone Search Incident to Arrest",
    subheading: "Riley v. California",
    updateDate: "2014-06-25",
    category: "Case Law - Search & Seizure",
    icon: 'Gavel',
  },
  {
    updateID: "CASELAW_USSC_RODRIGUEZ_2015",
    headline: "Traffic Stop Cannot Be Prolonged for K-9 Sniff",
    subheading: "Rodriguez v. United States",
    updateDate: "2015-04-21",
    category: "Case Law - Traffic Stops",
    icon: 'Gavel',
  },
   {
    updateID: "CASELAW_USSC_CARPENTER_2018",
    headline: "Warrant Required for Historical Cell-Site Location Data",
    subheading: "Carpenter v. United States",
    updateDate: "2018-06-22",
    category: "Case Law - Search & Seizure",
    icon: 'Gavel',
  },
  {
    updateID: "STATUTE_HB7065_2021",
    headline: "New Law Clarifies 'Stand Your Ground' for Law Enforcement",
    subheading: "F.S. § 776.012",
    updateDate: "2021-06-29",
    category: "Statutory Change - Use of Force",
    icon: 'Newspaper',
  },
];
