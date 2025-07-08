
export type SubstancePlaceholder = {
  id: string;
  commonName: string;
  schedule: string;
  statute: string;
};

export const substancePlaceholders: SubstancePlaceholder[] = [
  // Schedule I
  { id: "heroin", commonName: "Heroin", schedule: "Schedule I", statute: "F.S. § 893.03(1)(c)" },
  { id: "mdma", commonName: "MDMA (Ecstasy/Molly)", schedule: "Schedule I", statute: "F.S. § 893.03(1)(c)" },
  { id: "lsd", commonName: "LSD (Acid)", schedule: "Schedule I", statute: "F.S. § 893.03(1)(c)" },
  { id: "psilocybin", commonName: "Psilocybin (Mushrooms)", schedule: "Schedule I", statute: "F.S. § 893.03(1)(c)" },
  { id: "cannabis", commonName: "Cannabis (Marijuana)", schedule: "Schedule I", statute: "F.S. § 893.03(1)(d)" },

  // Schedule II
  { id: "cocaine", commonName: "Cocaine", schedule: "Schedule II", statute: "F.S. § 893.03(2)(a)4" },
  { id: "methamphetamine", commonName: "Methamphetamine", schedule: "Schedule II", statute: "F.S. § 893.03(2)(c)5" },
  { id: "fentanyl", commonName: "Fentanyl", schedule: "Schedule II", statute: "F.S. § 893.03(2)(b)9" },
  { id: "oxycodone", commonName: "Oxycodone (OxyContin, Percocet)", schedule: "Schedule II", statute: "F.S. § 893.03(2)(a)17" },
  { id: "hydrocodone", commonName: "Hydrocodone (Vicodin, Norco)", schedule: "Schedule II", statute: "F.S. § 893.03(2)(a)12" },
  { id: "amphetamine", commonName: "Amphetamine (Adderall)", schedule: "Schedule II", statute: "F.S. § 893.03(2)(c)1" },
  { id: "methylphenidate", commonName: "Methylphenidate (Ritalin, Concerta)", schedule: "Schedule II", statute: "F.S. § 893.03(2)(a)15" },
  { id: "pcp", commonName: "PCP (Phencyclidine)", schedule: "Schedule II", statute: "F.S. § 893.03(2)(a)18" },

  // Schedule III
  { id: "ketamine", commonName: "Ketamine", schedule: "Schedule III", statute: "F.S. § 893.03(3)(a)" },
  { id: "anabolic-steroids", commonName: "Anabolic Steroids", schedule: "Schedule III", statute: "F.S. § 893.03(3)(c)" },
  { id: "buprenorphine", commonName: "Buprenorphine (Suboxone)", schedule: "Schedule III", statute: "F.S. § 893.03(3)(a)" },

  // Schedule IV
  { id: "alprazolam", commonName: "Alprazolam (Xanax)", schedule: "Schedule IV", statute: "F.S. § 893.03(4)(a)" },
  { id: "clonazepam", commonName: "Clonazepam (Klonopin)", schedule: "Schedule IV", statute: "F.S. § 893.03(4)(g)" },
  { id: "diazepam", commonName: "Diazepam (Valium)", schedule: "Schedule IV", statute: "F.S. § 893.03(4)(j)" },
  { id: "zolpidem", commonName: "Zolpidem (Ambien)", schedule: "Schedule IV", statute: "F.S. § 893.03(4)(z)" },
  { id: "tramadol", commonName: "Tramadol (Ultram)", schedule: "Schedule IV", statute: "F.S. § 893.03(4)(dd)" },

  // Schedule V
  { id: "pregabalin", commonName: "Pregabalin (Lyrica)", schedule: "Schedule V", statute: "F.S. § 893.03(5)(c)" },
  { id: "cough-syrup-with-codeine", commonName: "Cough Syrup with Codeine", schedule: "Schedule V", statute: "F.S. § 893.03(5)(b)" },
];
