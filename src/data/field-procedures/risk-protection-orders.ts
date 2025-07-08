
export type RpoGuideline = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  statuteReference: string;
};

export const riskProtectionOrderData: RpoGuideline[] = [
  {
    id: "rpo1",
    title: "What is a Risk Protection Order (RPO)?",
    icon: "ShieldAlert",
    description: "An RPO is a civil court order that temporarily prohibits an individual who is at high risk of harming themselves or others from purchasing or possessing firearms or ammunition.",
    details: [
      "It is a civil order, not a criminal one. The person is the 'Respondent,' not the 'Defendant.'",
      "The standard of proof is 'clear and convincing evidence,' which is lower than 'beyond a reasonable doubt.'",
      "An RPO can be temporary (ex parte) for up to 14 days, or final for up to one year, with the possibility of extension."
    ],
    statuteReference: "F.S. § 790.401"
  },
  {
    id: "rpo2",
    title: "Criteria for Filing a Petition",
    icon: "FileText",
    description: "An officer or agency may file a petition for an RPO if there is evidence that the person poses a significant danger.",
    details: [
      "The person must pose a 'significant danger of causing personal injury to himself or herself or others' by having a firearm.",
      "Evidence includes, but is not limited to: recent threats or acts of violence, a history of violence, substance abuse, or dangerous mental health symptoms.",
      "A single act or threat can be sufficient if it is severe enough.",
      "You must articulate specific facts in your petition. General statements are not enough."
    ],
    statuteReference: "F.S. § 790.401(3)"
  },
  {
    id: "rpo3",
    title: "The Petition and Hearing Process",
    icon: "Gavel",
    description: "The process begins with a law enforcement petition and requires sworn testimony and evidence presented to a judge.",
    details: [
      "The petition must be filed in the circuit court where the respondent resides.",
      "Your sworn affidavit detailing the evidence is the most critical part of the petition.",
      "The initial hearing is 'ex parte,' meaning the respondent is not present. If the judge grants a temporary RPO, a full hearing must be set within 14 days.",
      "At the full hearing, the respondent has the right to be present and be represented by an attorney. You will likely have to testify."
    ],
    statuteReference: "F.S. § 790.401(4)"
  },
  {
    id: "rpo4",
    title: "Serving the Order & Firearms Surrender",
    icon: "ClipboardCheck",
    description: "Once an RPO is granted, it must be served on the respondent, and they must surrender all firearms and ammunition.",
    details: [
      "Personal service of the order by a law enforcement officer is required.",
      "The order must include a notice of the penalties for violating it.",
      "The respondent must surrender all firearms and ammunition in their custody or control to the serving officer's agency immediately.",
      "The respondent must also surrender their concealed weapon license.",
      "Provide the respondent with a receipt for all surrendered property."
    ],
    statuteReference: "F.S. § 790.401(5-6)"
  },
  {
    id: "rpo5",
    title: "Violation of an RPO",
    icon: "Ban",
    description: "Knowingly possessing a firearm or ammunition while a Risk Protection Order is in effect is a criminal offense.",
    details: [
      "A person who knowingly has a firearm in their possession in violation of an RPO commits a third-degree felony.",
      "This provides a separate basis for arrest if a respondent is found to have retained or acquired firearms after the order was served.",
      "Proactive checks to ensure compliance may be warranted based on the circumstances."
    ],
    statuteReference: "F.S. § 790.401(9)(a)"
  }
];
