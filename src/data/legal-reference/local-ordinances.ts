
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
  icon: string;
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
 * A pre-defined list of common local ordinances for faster access.
 * The AI search can be used for ordinances not listed here.
 */
export const ordinanceIndex: OrdinancePlaceholder[] = [
    {
        ordinanceNumber: "Sec. 21-28",
        ordinanceTitle: "Open Container of Alcoholic Beverage",
        jurisdiction: "Miami-Dade County",
        category: "Alcohol & Public Behavior",
        icon: "Beer"
    },
    {
        ordinanceNumber: "Sec. 39-16.1",
        ordinanceTitle: "Excessive and Unreasonable Noise",
        jurisdiction: "Orange County",
        category: "Public Order & Safety",
        icon: "Volume2"
    },
     {
        ordinanceNumber: "Sec. 8A-177",
        ordinanceTitle: "Trespassing on Property (After Warning)",
        jurisdiction: "Miami-Dade County",
        category: "Property & Code Enforcement",
        icon: "Ban"
    }
];

/**
 * Pre-filled details for the common ordinances.
 */
export const ordinanceDetailsData: Record<string, OrdinanceDetail> = {
    "Sec. 21-28": {
        ordinanceNumber: "Sec. 21-28",
        ordinanceTitle: "Possession of open containers of alcoholic beverages in public",
        jurisdiction: "Miami-Dade County",
        fullOrdinanceText: "It shall be unlawful for any person to drink or consume any alcoholic beverage or to possess in an open container any alcoholic beverage in any public place or upon any public street, sidewalk, or park, except at a sidewalk cafe or at a public event for which a permit has been issued.",
        summary: "This ordinance prohibits drinking or having an open container of alcohol in public places like streets and parks within Miami-Dade County, unless it's a permitted event or sidewalk cafe.",
        enforcementNotes: "The key element is 'open container' in a public space. This is a common charge for street-level disorder. The officer must observe the container is open and contains an alcoholic beverage. This is typically a civil citation, not a physical arrest unless other crimes are involved.",
        penalty: "Civil Infraction, fine up to $100.",
        relatedStateStatute: "F.S. § 562.453 (Possession of open containers in vehicles - state law)"
    },
    "Sec. 39-16.1": {
        ordinanceNumber: "Sec. 39-16.1",
        ordinanceTitle: "Excessive and Unreasonable Noise",
        jurisdiction: "Orange County",
        fullOrdinanceText: "It shall be unlawful for any person to make, continue, or cause to be made or continued any excessive, unnecessary or unreasonable loud noise which unreasonably annoys, disturbs, injures or endangers the comfort, repose, health, peace or safety of others within the limits of the county.",
        summary: "This ordinance makes it illegal to create excessive or unreasonably loud noise that disturbs others' peace and safety in Orange County.",
        enforcementNotes: "This is a performance-based standard. The key is articulating 'unreasonable.' Factors to note in your report: time of day, duration of the noise, proximity to residences, and whether you received complaints from specific victims. A warning is often the first step, with a citation issued for non-compliance.",
        penalty: "Civil Infraction, fine varies.",
        relatedStateStatute: "F.S. § 403.415 (Local noise pollution control)"
    },
     "Sec. 8A-177": {
        ordinanceNumber: "Sec. 8A-177",
        ordinanceTitle: "Trespassing on Property",
        jurisdiction: "Miami-Dade County",
        fullOrdinanceText: "No person shall willfully enter into or upon any property of another, or into any public building or property, or remain in such place, in defiance of a lawful order of a police officer not to enter or to leave such place.",
        summary: "This ordinance makes it a violation to enter or remain on property after being given a lawful order to leave by a police officer.",
        enforcementNotes: "This is the local ordinance version of trespass after warning. You must give a clear, lawful order to the person to leave the property. Their defiance of *your* specific order is the key element of the violation. Document the exact wording of your warning in the report.",
        penalty: "Misdemeanor, punishable by fine or imprisonment.",
        relatedStateStatute: "F.S. § 810.09 (Trespass on property other than structure or conveyance)"
    }
};
