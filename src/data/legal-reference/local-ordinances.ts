
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
    | "Animal Ordinances";
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
 * A comprehensive index of common local ordinances.
 * This list populates the initial view of the guide.
 */
export const ordinanceIndex: OrdinancePlaceholder[] = [
  // --- Alcohol & Public Behavior ---
  {
    ordinanceNumber: "Sec. 42-61",
    ordinanceTitle: "Possession/consumption of alcoholic beverages in open containers",
    jurisdiction: "City of Fort Pierce",
    category: "Alcohol & Public Behavior",
  },
  {
    ordinanceNumber: "Sec. 16-33",
    ordinanceTitle: "Nudity and Sexual Conduct Prohibited",
    jurisdiction: "St. Lucie County",
    category: "Alcohol & Public Behavior",
  },
  {
    ordinanceNumber: "Sec. 32-101",
    ordinanceTitle: "Noise - General Prohibition; classification",
    jurisdiction: "City of Fort Pierce",
    category: "Alcohol & Public Behavior",
  },
  {
    ordinanceNumber: "Sec. 2-5-24",
    ordinanceTitle: "Alcoholic Beverages in County Parks",
    jurisdiction: "St. Lucie County",
    category: "Alcohol & Public Behavior",
  },
  {
    ordinanceNumber: "Sec. 50-1",
    ordinanceTitle: "Curfew for Minors",
    jurisdiction: "City of Fort Pierce",
    category: "Alcohol & Public Behavior",
  },
  {
    ordinanceNumber: "Sec. 16-31",
    ordinanceTitle: "Loitering or Prowling Prohibited",
    jurisdiction: "St. Lucie County",
    category: "Alcohol & Public Behavior",
  },

  // --- Traffic & Parking ---
  {
    ordinanceNumber: "Sec. 76.01",
    ordinanceTitle: "Parking on residential lawns prohibited",
    jurisdiction: "St. Lucie County", // Note: PSL enforces this heavily
    category: "Traffic & Parking",
  },
  {
    ordinanceNumber: "Sec. 70-76",
    ordinanceTitle: "Parking for certain purposes prohibited",
    jurisdiction: "City of Fort Pierce",
    category: "Traffic & Parking",
  },
  {
    ordinanceNumber: "Sec. 70-79",
    ordinanceTitle: "Parking of commercial vehicles in residential areas",
    jurisdiction: "City of Fort Pierce",
    category: "Traffic & Parking",
  },
  {
    ordinanceNumber: "Sec. 71.01",
    ordinanceTitle: "Operation of golf carts on public streets",
    jurisdiction: "St. Lucie County",
    category: "Traffic & Parking",
  },
  {
    ordinanceNumber: "Sec. 70-46",
    ordinanceTitle: "Skateboards, roller skates, etc., in roadway",
    jurisdiction: "City of Fort Pierce",
    category: "Traffic & Parking",
  },
  {
    ordinanceNumber: "Sec. 70-80",
    ordinanceTitle: "Parking trailers, recreational vehicles, and boats",
    jurisdiction: "City of Fort Pierce",
    category: "Traffic & Parking",
  },

  // --- Property & Code Enforcement ---
  {
    ordinanceNumber: "Sec. 22-51",
    ordinanceTitle: "Nuisances prohibited - Overgrowth",
    jurisdiction: "City of Fort Pierce",
    category: "Property & Code Enforcement",
  },
  {
    ordinanceNumber: "Sec. 4-4-1",
    ordinanceTitle: "Lot mowing and maintenance",
    jurisdiction: "St. Lucie County",
    category: "Property & Code Enforcement",
  },
  {
    ordinanceNumber: "Sec. 22-53",
    ordinanceTitle: "Abandoned/inoperable vehicles on public or private property",
    jurisdiction: "City of Fort Pierce",
    category: "Property & Code Enforcement",
  },
  {
    ordinanceNumber: "Sec. 4-4-23",
    ordinanceTitle: "Inoperable and unlicensed vehicles declared a nuisance",
    jurisdiction: "St. Lucie County",
    category: "Property & Code Enforcement",
  },
  {
    ordinanceNumber: "Sec. 20-21",
    ordinanceTitle: "Garbage and trash container requirements",
    jurisdiction: "City of Fort Pierce",
    category: "Property & Code Enforcement",
  },
  {
    ordinanceNumber: "Sec. 62-231",
    ordinanceTitle: "Unauthorized connections to water system",
    jurisdiction: "City of Fort Pierce",
    category: "Property & Code Enforcement",
  },

  // --- Animal Ordinances ---
  {
    ordinanceNumber: "Sec. 10-4",
    ordinanceTitle: "Animals at large prohibited",
    jurisdiction: "City of Fort Pierce",
    category: "Animal Ordinances",
  },
  {
    ordinanceNumber: "Sec. 90.04",
    ordinanceTitle: "Control of dogs and cats (Leash Law)",
    jurisdiction: "St. Lucie County",
    category: "Animal Ordinances",
  },
  {
    ordinanceNumber: "Sec. 10-5",
    ordinanceTitle: "Public nuisance animals (Barking Dogs)",
    jurisdiction: "City of Fort Pierce",
    category: "Animal Ordinances",
  },
  {
    ordinanceNumber: "Sec. 90.06",
    ordinanceTitle: "Animal cruelty and neglect",
    jurisdiction: "St. Lucie County",
    category: "Animal Ordinances",
  },
  {
    ordinanceNumber: "Sec. 10-6",
    ordinanceTitle: "Sanitary disposal of animal feces",
    jurisdiction: "City of Fort Pierce",
    category: "Animal Ordinances",
  },

  // --- Business & Licensing ---
  {
    ordinanceNumber: "Sec. 26-61",
    ordinanceTitle: "Business tax receipt required",
    jurisdiction: "City of Fort Pierce",
    category: "Business & Licensing",
  },
  {
    ordinanceNumber: "Sec. 2-8-16",
    ordinanceTitle: "Peddlers and solicitors",
    jurisdiction: "St. Lucie County",
    category: "Business & Licensing",
  },
  {
    ordinanceNumber: "Sec. 26-151",
    ordinanceTitle: "Mobile food vendors; regulations",
    jurisdiction: "City of Fort Pierce",
    category: "Business & Licensing",
  },
];

/**
 * A pre-filled cache of common ordinance details.
 * This simulates a local database and ensures the most frequently accessed
 * ordinances load instantly without an AI call.
 */
export const ordinanceDetailsData: Record<string, OrdinanceDetail> = {
  "Sec. 42-61": {
    ordinanceNumber: "Sec. 42-61",
    ordinanceTitle: "Possession and consumption of alcoholic beverages in open containers",
    jurisdiction: "City of Fort Pierce",
    fullOrdinanceText: "It shall be unlawful for any person to possess or consume any alcoholic beverage in an open container on any public street, sidewalk, alley or other public property within the city...",
    summary: "This ordinance makes it illegal to have an open container of alcohol on public property, such as streets, sidewalks, and parks, within the city limits of Fort Pierce.",
    enforcementNotes: "This is a common violation, especially in public parks and downtown areas. An 'open container' includes a can, bottle, or flask with a broken seal. The charge is a non-criminal city ordinance violation.",
    penalty: "Non-criminal infraction, fine up to $500.",
    relatedStateStatute: "F.S. § 562.453",
  },
  "Sec. 76.01": {
    ordinanceNumber: "Sec. 76.01",
    ordinanceTitle: "Parking on residential lawns prohibited",
    jurisdiction: "St. Lucie County",
    fullOrdinanceText: "No person shall park a vehicle on any residential lawn or on any portion of a residential lot or parcel which has not been paved or otherwise improved for parking... All tires must be off the grass.",
    summary: "This ordinance prohibits parking any vehicle on the grass of a residential property. All tires must be on a paved or improved surface like a driveway.",
    enforcementNotes: "This is a very common code violation enforced by both law enforcement and code enforcement officers, particularly within the City of Port St. Lucie, which adopts the county ordinance. This is a primary stop justification for suspicious vehicles in residential areas at night.",
    penalty: "Non-criminal infraction.",
    relatedStateStatute: "F.S. § 316.1951",
  },
};
