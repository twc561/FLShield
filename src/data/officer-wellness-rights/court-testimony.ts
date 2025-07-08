
export type CourtTestimonyTopic = {
  id: string;
  title: string;
  icon: string;
  description: string;
  points: string[];
  takeaway: string;
};

export const courtTestimonyData: CourtTestimonyTopic[] = [
  {
    id: "topic1",
    title: "Preparation is Key",
    icon: "ClipboardCheck",
    description: "Your testimony begins long before you take the stand.",
    points: [
      "Thoroughly review your report, notes, BWC footage, and all associated evidence. Know your case inside and out.",
      "Meet with the prosecutor (ASA) before trial. Discuss the facts, potential defense strategies, and any weaknesses in the case.",
      "Visit the courtroom beforehand if you're unfamiliar with it to get comfortable with the layout.",
      "Ensure your uniform is clean and professional. Your appearance communicates respect for the court.",
      "Get a good night's sleep. Court requires mental sharpness.",
    ],
    takeaway: "Confidence on the stand comes from preparation. An unprepared officer is a defense attorney's best weapon.",
  },
  {
    id: "topic2",
    title: "On the Witness Stand",
    icon: "Mic",
    description: "Your demeanor and delivery are just as important as the facts.",
    points: [
      "Listen carefully to the entire question before you start to answer.",
      "Pause before answering. This gives you time to formulate your thought and allows for an objection.",
      "Speak clearly, slowly, and loudly enough for the jury to hear you. Make eye contact with the jury when answering.",
      "Answer only the question that was asked. Do not volunteer extra information.",
      "If you don't know the answer, say 'I don't know' or 'I don't recall.' Never guess or speculate.",
      "If you don't understand a question, ask for it to be repeated or rephrased.",
    ],
    takeaway: "Your job is to be a professional, neutral presenter of the facts. Project competence and honesty.",
  },
  {
    id: "topic3",
    title: "Handling Cross-Examination",
    icon: "Swords",
    description: "The defense attorney's job is to challenge your testimony and credibility. Stay professional.",
    points: [
      "Remain calm and polite, even if the attorney is aggressive or confrontational. Do not get into an argument.",
      "Be wary of 'yes or no' questions. If a question can't be answered truthfully with a simple yes or no, you can state that. The judge will decide.",
      "Do not agree with the defense attorney's summary of your testimony. Stick to what you know and observed.",
      "If the attorney asks about minor inconsistencies in your report, it's okay to admit them if they are true. 'Yes, I see I wrote 'street' when it should have been 'avenue'. That was an error.' Honesty builds credibility.",
      "Remember you are speaking to the jury, not the defense attorney. Direct your answers to them.",
    ],
    takeaway: "Losing your cool is losing your credibility. A professional and calm demeanor under pressure reinforces your testimony.",
  },
  {
    id: "topic4",
    title: "The Golden Rules",
    icon: "Star",
    description: "Fundamental principles to always remember.",
    points: [
      "Always tell the truth. Your integrity is your most valuable asset.",
      "Your report is not evidence, but your testimony about what's in the report is. You must be able to articulate the facts from memory, using your report to refresh your recollection if permitted.",
      "Avoid police jargon and acronyms. Speak in plain language that the jury can understand.",
      "Be professional at all times in and around the courthouse, even on breaks. You are always being observed.",
    ],
    takeaway: "Truth, professionalism, and preparation are the three pillars of effective court testimony.",
  },
];
