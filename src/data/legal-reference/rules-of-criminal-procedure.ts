
export type RulePlaceholder = {
  id: string;
  ruleNumber: string;
  ruleTitle: string;
  category: "Pre-Trial Procedures & Arrest" | "Search & Seizure" | "Discovery & Evidence" | "First Appearance & Pre-Trial Release";
  icon: string;
};

export type RuleDetail = {
  id: string;
  ruleNumber: string;
  ruleTitle: string;
  fullText: string;
  plainLanguageSummary: string;
  fieldApplicationForOfficers: {
    title: string;
    points: string[];
  };
  keyCaseExample: {
    caseName: string;
    citation: string;
    holding: string;
  };
};

export const rulesOfCriminalProcedurePlaceholders: RulePlaceholder[] = [
  // --- Pre-Trial Procedures & Arrest ---
  {
    id: "FL_CRIM_PRO_3_121",
    ruleNumber: "Rule 3.121",
    ruleTitle: "Arrest Warrant",
    category: "Pre-Trial Procedures & Arrest",
    icon: "FileBadge",
  },
  {
    id: "FL_CRIM_PRO_3_125",
    ruleNumber: "Rule 3.125",
    ruleTitle: "Notice to Appear",
    category: "Pre-Trial Procedures & Arrest",
    icon: "FileText",
  },
  
  // --- First Appearance & Pre-Trial Release ---
  {
    id: "FL_CRIM_PRO_3_130",
    ruleNumber: "Rule 3.130",
    ruleTitle: "First Appearance",
    category: "First Appearance & Pre-Trial Release",
    icon: "Gavel",
  },
  {
    id: "FL_CRIM_PRO_3_131",
    ruleNumber: "Rule 3.131",
    ruleTitle: "Pretrial Release",
    category: "First Appearance & Pre-Trial Release",
    icon: "LockOpen",
  },
  {
    id: "FL_CRIM_PRO_3_132",
    ruleNumber: "Rule 3.132",
    ruleTitle: "Pretrial Detention",
    category: "First Appearance & Pre-Trial Release",
    icon: "Lock",
  },
  
  // --- Discovery & Evidence ---
  {
    id: "FL_CRIM_PRO_3_220",
    ruleNumber: "Rule 3.220",
    ruleTitle: "Discovery",
    category: "Discovery & Evidence",
    icon: "Search",
  },
  
  // --- Search and Seizure ---
  {
    id: "FL_CRIM_PRO_3_190_G",
    ruleNumber: "Rule 3.190(g)",
    ruleTitle: "Motion to Suppress Evidence",
    category: "Search & Seizure",
    icon: "ShieldOff",
  },
   {
    id: "FL_CRIM_PRO_3_190_H",
    ruleNumber: "Rule 3.190(h)",
    ruleTitle: "Motion to Suppress Confession",
    category: "Search & Seizure",
    icon: "MicOff",
  }
];
