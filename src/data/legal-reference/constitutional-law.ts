
export type ConstitutionalPlaceholder = {
  id: string;
  title: string;
  subtitle: string;
  category: "U.S. Constitution" | "Florida Constitution";
};

export type LandmarkCase = {
  caseName: string;
  citation: string;
  holding: string;
};

export type ConstitutionalDetail = {
  id: string;
  title: string;
  fullText: string;
  plainLanguageSummary: string;
  testForOfficers: {
    title: string;
    points: string[];
  };
  landmarkCases: LandmarkCase[];
};

export const constitutionalLawPlaceholders: ConstitutionalPlaceholder[] = [
  // --- U.S. Constitution ---
  {
    id: "US_AMENDMENT_1",
    title: "First Amendment",
    subtitle: "Freedom of Speech, Press, and Assembly",
    category: "U.S. Constitution",
  },
  {
    id: "US_AMENDMENT_2",
    title: "Second Amendment",
    subtitle: "Right to Bear Arms",
    category: "U.S. Constitution",
  },
  {
    id: "US_AMENDMENT_4",
    title: "Fourth Amendment",
    subtitle: "Search and Seizure",
    category: "U.S. Constitution",
  },
  {
    id: "US_AMENDMENT_5",
    title: "Fifth Amendment",
    subtitle: "Rights in Criminal Cases, Due Process",
    category: "U.S. Constitution",
  },
  {
    id: "US_AMENDMENT_6",
    title: "Sixth Amendment",
    subtitle: "Right to a Fair Trial",
    category: "U.S. Constitution",
  },
  {
    id: "US_AMENDMENT_8",
    title: "Eighth Amendment",
    subtitle: "Bail, Fines, and Punishment",
    category: "U.S. Constitution",
  },
  {
    id: "US_AMENDMENT_14",
    title: "Fourteenth Amendment",
    subtitle: "Due Process and Equal Protection",
    category: "U.S. Constitution",
  },
  // --- Florida Constitution ---
  {
    id: "FL_ARTICLE_1_SEC_2",
    title: "Basic rights",
    subtitle: "Art. I, Sec. 2",
    category: "Florida Constitution",
  },
  {
    id: "FL_ARTICLE_1_SEC_9",
    title: "Due process",
    subtitle: "Art. I, Sec. 9",
    category: "Florida Constitution",
  },
  {
    id: "FL_ARTICLE_1_SEC_12",
    title: "Searches and seizures",
    subtitle: "Art. I, Sec. 12",
    category: "Florida Constitution",
  },
  {
    id: "FL_ARTICLE_1_SEC_14",
    title: "Pretrial release and detention",
    subtitle: "Art. I, Sec. 14",
    category: "Florida Constitution",
  },
  {
    id: "FL_ARTICLE_1_SEC_16",
    title: "Rights of accused and of victims",
    subtitle: "Art. I, Sec. 16",
    category: "Florida Constitution",
  },
  {
    id: "FL_ARTICLE_1_SEC_23",
    title: "Right of privacy",
    subtitle: "Art. I, Sec. 23",
    category: "Florida Constitution",
  },
];
