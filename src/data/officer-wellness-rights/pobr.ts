
export type PobrRight = {
  id: string;
  title: string;
  icon: string;
  statuteRef: string;
  explanation: string;
};

export const pobrData: PobrRight[] = [
  {
    id: "right1",
    title: "Right to Representation",
    icon: "Users",
    statuteRef: "§ 112.532(1)(i)",
    explanation:
      "When you are being interrogated as part of an official investigation that could lead to disciplinary action, you have the right to have counsel or a union representative present. The interrogation must be suspended for a reasonable time until you can get your representative.",
  },
  {
    id: "right2",
    title: "Interrogation Conduct",
    icon: "Clock",
    statuteRef: "§ 112.532(1)(a)-(c)",
    explanation:
      "Interrogations must be conducted at a reasonable hour, preferably while you are on duty. You cannot be subjected to threats, promises, or coercion. The interrogation must be for a reasonable length of time, allowing for breaks.",
  },
  {
    id: "right3",
    title: "Notice of Investigation",
    icon: "FileText",
    statuteRef: "§ 112.532(1)(d)",
    explanation:
      "Before an interrogation, you must be informed in writing of the nature of the investigation and the specific allegations against you. You must also be informed of the name and rank of the officer in charge of the investigation and the interrogators.",
  },
  {
    id: "right4",
    title: "No Polygraph or Truth Verification",
    icon: "ZapOff",
    statuteRef: "§ 112.532(1)(g)",
    explanation:
      "You cannot be required to take a polygraph, deception verification test, or similar examination as a condition of continued employment. These can only be administered if you consent.",
  },
  {
    id: "right5",
    title: "Garrity Rights",
    icon: "ShieldCheck",
    statuteRef: "Implicit in § 112.532",
    explanation:
      "While not explicitly named in the statute, the principles of Garrity v. New Jersey apply. If you are ordered to answer questions under threat of termination, your answers cannot be used against you in a subsequent criminal prosecution. This is a critical protection.",
  },
  {
    id: "right6",
    title: "Review of Complaint and Witness Statements",
    icon: "Eye",
    statuteRef: "§ 112.533(1)",
    explanation:
      "You have the right to review the complaint and all witness statements before you are required to provide a statement yourself. This allows you and your representative to understand the full scope of the allegations before you respond.",
  },
];
