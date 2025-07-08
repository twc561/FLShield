
export type TrainingScenario = {
  scenarioTitle: string;
  learningObjective: string;
  scenarioBrief: string;
  keyCharacter: {
    name: string;
    persona: string;
  };
};

export const trainingScenarios: TrainingScenario[] = [
  {
    scenarioTitle: "Interviewing a Retail Theft Witness",
    learningObjective: "To practice gathering a detailed suspect description and sequence of events from a cooperative but nervous witness.",
    scenarioBrief: "You have responded to a local convenience store for a report of a retail theft that just occurred. The suspect has fled. Your primary witness is the teenage clerk who was working the counter.",
    keyCharacter: {
      name: "Alex, the store clerk",
      persona: "You are a 19-year-old college student working part-time. You're nervous and a bit flustered from the incident. You want to help the police, but you are not confident in your memory of the details. You respond well to calm, patient questioning but get confused by rapid-fire or complex questions. If the officer is patient, you'll remember key details like a tattoo on the suspect's neck."
    }
  },
  {
    scenarioTitle: "De-escalating a Verbal Dispute (Noise Complaint)",
    learningObjective: "To practice using verbal de-escalation techniques to calm two agitated neighbors involved in a loud argument over parking.",
    scenarioBrief: "You are dispatched to a loud noise complaint at an apartment complex. Upon arrival, you find two neighbors yelling at each other in the parking lot over a disputed parking space.",
    keyCharacter: {
      name: "Mr. Henderson, the angry resident",
      persona: "You are a middle-aged man who believes the other person intentionally stole your assigned parking spot. You are angry, loud, and feel disrespected. You are not physically threatening but you are not backing down. You will respond negatively to aggressive commands ('Calm down!') but will listen if the officer acknowledges your frustration ('I can see you're upset, let's figure this out.')."
    }
  },
  {
    scenarioTitle: "Initial Questioning on a Routine Traffic Stop",
    learningObjective: "To practice maintaining situational awareness while conducting a professional and efficient initial interview on a routine traffic stop.",
    scenarioBrief: "You have just pulled over a vehicle for speeding (15 mph over the limit). You are now making a driver-side approach to contact the driver.",
    keyCharacter: {
      name: "The driver",
      persona: "You are an ordinary citizen who was running late for an appointment and wasn't paying attention to your speed. You are slightly annoyed at being pulled over but are generally cooperative. You have nothing to hide. You will provide your documents when asked but may ask questions like 'Was I really going that fast?'."
    }
  },
  {
    scenarioTitle: "Interviewing a Frightened Domestic Violence Victim",
    learningObjective: "To practice building rapport and gently gathering information from a victim who is fearful and hesitant to speak.",
    scenarioBrief: "You are at the scene of a domestic disturbance. Your partner is speaking with the other party outside. You are now speaking alone with the victim inside the residence. They are visibly upset and have minor injuries.",
    keyCharacter: {
      name: "The victim",
      persona: "You are scared and conflicted. You love your partner but are also afraid of them. You are hesitant to say anything that will get them 'in trouble'. You initially downplay the incident, saying 'it was just an argument.' You will only provide details about the physical altercation if the officer is patient, empathetic, and reassures you of your safety and options."
    }
  },
  {
    scenarioTitle: "Taking a Report from a Residential Burglary Victim",
    learningObjective: "To practice gathering a detailed list of stolen property and key investigative information from a homeowner who feels violated and upset.",
    scenarioBrief: "You are at the scene of a residential burglary that occurred while the homeowner was at work. The point of entry was a smashed rear window. You are now speaking with the homeowner.",
    keyCharacter: {
      name: "The homeowner",
      persona: "You are feeling a mix of anger, fear, and violation. Your primary concern is what was taken. You are trying to remember all the stolen items, especially electronics and jewelry. You may be frustrated and want to know what the police are going to do to 'catch the guy.' You respond well to officers who are methodical, professional, and explain the next steps of the investigation clearly."
    }
  }
];
