export type CrisisInterventionGuideline = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  officerTakeaway: string;
};

export const crisisInterventionData: CrisisInterventionGuideline[] = [
  {
    id: "baker-act-criteria",
    title: "Baker Act Criteria (Involuntary Examination)",
    icon: "ClipboardCheck",
    description: "Legal standards for initiating a Baker Act under F.S. § 394.463.",
    details: [
      "There is reason to believe the person is mentally ill.",
      "The person has refused voluntary examination OR is unable to determine that examination is necessary.",
      "Without care or treatment, the person is likely to suffer from neglect or refuse to care for themselves, posing a real and present threat of substantial harm.",
      "There is a substantial likelihood that without care or treatment the person will cause serious bodily harm to themselves or others in the near future, as evidenced by recent behavior.",
    ],
    officerTakeaway: "You must articulate specific, recent behaviors in your report. Vague statements like 'acting erratically' are not enough. Document direct quotes, specific actions, and observations that support one of the criteria above. The 'likelihood of serious harm' is the key legal threshold.",
  },
  {
    id: "marchman-act-criteria",
    title: "Marchman Act Criteria (Substance Abuse)",
    icon: "Pill",
    description: "Legal standards for involuntary assessment for substance abuse under F.S. § 397.675.",
    details: [
      "There is good faith reason to believe the person is substance abuse impaired.",
      "The person has lost the power of self-control with respect to substance use.",
      "The person is likely to inflict physical harm on themselves or others unless admitted, OR their judgment is so impaired that they are incapable of appreciating their need for care.",
    ],
    officerTakeaway: "Similar to the Baker Act, but the root cause must be substance abuse, not mental illness. Often, these co-occur. Your report needs to detail evidence of substance use (paraphernalia, admissions, track marks) and how it's leading to self-neglect or dangerous behavior.",
  },
  {
    id: "deescalation-techniques",
    title: "Tactical De-escalation Techniques",
    icon: "MessageCircle",
    description: "Practical communication strategies to lower the intensity of a crisis situation.",
    details: [
      "Introduce yourself and state your purpose: 'I'm Officer [Name], and I'm here to help.'",
      "Use active listening: repeat back what they say to show you understand ('So what I'm hearing is...').",
      "Use 'I' statements instead of 'You' statements: 'I am concerned for your safety,' not 'You are being unsafe.'",
      "Lower your voice and slow your speech. Maintain a calm, non-threatening posture.",
      "Offer simple, clear choices to give them a sense of control: 'Can we talk over here on the curb?'",
      "Acknowledge their feelings without judgment: 'It sounds like you are very angry right now.'",
    ],
    officerTakeaway: "Your tone and body language are your primary tools. De-escalation creates time and options, increasing safety for everyone. It is a show of professional strength, not weakness.",
  },
  {
    id: "documentation",
    title: "Critical Documentation",
    icon: "FileText",
    description: "Key details to include in your report for any crisis intervention call.",
    details: [
      "Subject's specific statements, especially threats of harm to self or others. Use direct quotes.",
      "Specific behaviors observed (e.g., 'pacing frantically,' 'throwing objects,' 'crying uncontrollably').",
      "Any evidence of self-neglect (e.g., poor hygiene, lack of food, hazardous living conditions).",
      "Names and statements of all witnesses and family members.",
      "List all de-escalation techniques you attempted, both successful and unsuccessful.",
      "If force was used, articulate why de-escalation failed or was not possible.",
    ],
    officerTakeaway: "Your report is a legal document that justifies your actions. A detailed, objective report protects you from liability and ensures the individual gets the proper follow-up care. Paint a clear picture with your words.",
  },
];
