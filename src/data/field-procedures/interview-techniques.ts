
export type InterviewTechnique = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  phases: { name: string; description: string; officerActions: string[] }[];
  bestFor: string;
};

export const interviewTechniquesData: InterviewTechnique[] = [
  {
    id: "technique1",
    title: "Cognitive Interviewing",
    icon: "BrainCircuit",
    summary: "A method designed to enhance memory retrieval in cooperative witnesses and victims by using techniques derived from cognitive psychology.",
    bestFor: "Cooperative witnesses and victims who have experienced a traumatic or complex event.",
    phases: [
      {
        name: "Rapport Building",
        description: "Establish a comfortable and trusting environment.",
        officerActions: [
          "Introduce yourself and explain the purpose of the interview.",
          "Personalize the interview; use the witness's name.",
          "Reassure them that they are not in trouble and their help is valuable."
        ]
      },
      {
        name: "Explain the Process",
        description: "Tell the witness how the interview will work.",
        officerActions: [
          "Instruct the witness to report everything, no matter how trivial it seems.",
          "Encourage them to speak slowly and not to guess or fabricate details.",
          "Explain that you will ask them to recall the event in different ways."
        ]
      },
      {
        name: "Free Recall / Narration",
        description: "Allow the witness to give an uninterrupted account of the event.",
        officerActions: [
          "Ask an open-ended question like, 'Tell me everything you remember from start to finish.'",
          "Do not interrupt. Use active listening cues (nodding, 'uh-huh').",
          "Take notes on key points to probe later."
        ]
      },
      {
        name: "Questioning & Probing",
        description: "Use specific memory-enhancing techniques to gather more details.",
        officerActions: [
          "'Change Perspective': 'Try to describe the event from the perspective of someone else who was there.'",
          "'Reverse Order': 'Tell me what happened, but starting from the end and going backwards.'",
          "'Context Reinstatement': 'Try to reconstruct the scene in your mind. What were you feeling? What was the weather like?'"
        ]
      },
      {
        name: "Closure",
        description: "End the interview on a positive and supportive note.",
        officerActions: [
          "Summarize the key points to ensure accuracy.",
          "Thank the witness for their time and cooperation.",
          "Provide your contact information for any follow-up."
        ]
      }
    ]
  },
  {
    id: "technique2",
    title: "The PEACE Model",
    icon: "Users",
    summary: "An ethical, rapport-based interview framework focused on information gathering rather than confession-seeking. It is a non-accusatory approach.",
    bestFor: "General investigative interviews with victims, witnesses, and even initial interviews with suspects.",
    phases: [
      {
        name: "P - Planning and Preparation",
        description: "Before the interview begins, plan your approach.",
        officerActions: [
          "Review case files, witness statements, and evidence.",
          "Define the aims and objectives of the interview.",
          "Prepare key topics and questions, but remain flexible.",
          "Set up the interview environment to be free from distractions."
        ]
      },
      {
        name: "E - Engage and Explain",
        description: "Build rapport and explain the interview process.",
        officerActions: [
          "Introduce yourself and explain your role.",
          "Explain the reasons for the interview and its objectives.",
          "Outline the process (e.g., 'I'll ask some questions, you'll have a chance to speak'). Address any concerns."
        ]
      },
      {
        name: "A - Account, Clarification, and Challenge",
        description: "Obtain the individual's account and probe for details.",
        officerActions: [
          "Start with open-ended questions to get their uninterrupted story ('Account').",
          "Use probing questions to expand on their account and clarify details ('Clarification').",
          "If inconsistencies arise, 'Challenge' them respectfully and professionally, using the evidence you have. This should be a last resort, not a primary tactic."
        ]
      },
      {
        name: "C - Closure",
        description: "Bring the interview to a structured conclusion.",
        officerActions: [
          "Summarize the person's account to ensure you understood correctly.",
          "Allow them to add or correct any information.",
          "Explain the next steps in the investigation."
        ]
      },
      {
        name: "E - Evaluation",
        description: "After the interview, evaluate the information and your performance.",
        officerActions: [
          "Review the interview objectives: Were they met?",
          "Assess the credibility of the information provided.",
          "Identify new leads or areas for further investigation.",
          "Reflect on your own performance to improve for future interviews."
        ]
      }
    ]
  }
];
