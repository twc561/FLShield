
export type PredictiveCacheMap = {
    [key: string]: string[];
};

/**
 * This map defines which statutes should be predictively pre-cached
 * when a user enters a specific scenario or guide. The key is the
 * scenario ID (from scenario-checklists.ts), and the value is an
 * array of relevant statute IDs (from statutes.ts), ranked by importance.
 */
export const predictiveCacheMap: PredictiveCacheMap = {
    'dui-investigation': [
        's4',      // F.S. § 316.193 (DUI)
        's316-1932', // F.S. § 316.1932 (Implied Consent) - NOTE: This ID needs to be created/verified
        's316-192',  // F.S. § 316.192 (Reckless Driving)
        's316-1925', // F.S. § 316.1925 (Careless Driving)
    ],
    'domestic-violence-investigation': [
        's784-03',  // F.S. § 784.03 (Battery)
        's784-011', // F.S. § 784.011 (Assault)
        's741-28',  // F.S. § 741.28 (DV Definition) - NOTE: This ID needs to be created/verified
        's741-31',  // F.S. § 741.31 (Injunction Violation) - NOTE: This ID needs to be created/verified
        's784-041', // F.S. § 784.041 (Felony Battery)
        's784-021', // F.S. § 784.021 (Aggravated Assault)
        's901-15',  // F.S. § 901.15 (Arrest w/o warrant) - NOTE: This ID needs to be created/verified
    ],
    'animal-cruelty-investigation': [
        's828-12',  // F.S. § 828.12 (Cruelty to animals) - NOTE: This ID needs to be created/verified
        's828-13',  // F.S. § 828.13 (Confinement of animals) - NOTE: This ID needs to be created/verified
    ],
    'traffic-stop-moving-violation': [
        's322-34-2', // F.S. § 322.34(2) (DWLS With Knowledge)
        's322-03',   // F.S. § 322.03 (No Valid Driver License)
        's316-646-1',// F.S. § 316.646(1) (No Proof of Insurance)
        's316-1925', // F.S. § 316.1925 (Careless Driving)
    ],
    'retail-theft': [
        's2',      // F.S. § 812.014 (Theft)
        's812-015',  // F.S. § 812.015 (Retail Theft) - NOTE: This ID needs to be created/verified
        's843-02',   // F.S. § 843.02 (Resisting w/o Violence)
    ],
    'burglary-residential-in-progress': [
        's810-02',   // F.S. § 810.02 (Burglary)
        's806-13',   // F.S. § 806.13 (Criminal Mischief)
        's2',        // F.S. § 812.014 (Theft)
        's843-01',   // F.S. § 843.01 (Resisting w/ Violence)
        's843-02',   // F.S. § 843.02 (Resisting w/o Violence)
    ],
    'fwc-boating-bui-stop': [
        's4',        // F.S. § 316.193 (DUI) - BUI is in a different chapter but elements are similar
        's327-35',   // F.S. § 327.35 (BUI) - NOTE: This ID needs to be created/verified
    ],
    'fwc-saltwater-fishing-stop': [
        's379-354',  // F.S. § 379.354 (Licensing) - NOTE: This ID needs to be created/verified
        's379-401',  // F.S. § 379.401 (Illegal taking/possession of fish) - NOTE: This ID needs to be created/verified
    ]
};
