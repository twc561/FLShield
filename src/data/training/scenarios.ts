
export type ScenarioPack = {
  scenarioID: string;
  scenarioTitle: string;
  learningObjective: string;
  scenarioBrief: string;
  officerGoal: string;
  characterProfile: {
    name: string;
    persona: string;
    secretKnowledge: string[];
  };
  dynamicBehaviorTree: {
    if: string;
    then: string;
  }[];
  debriefingCriteria: string[];
};

export const trainingScenarios: ScenarioPack[] = [
  {
    scenarioID: "RTW-001",
    scenarioTitle: "Retail Theft Witness Interview",
    learningObjective: "To practice gathering a detailed suspect description and sequence of events from a cooperative but nervous civilian witness.",
    scenarioBrief: "You've responded to a 'Quick-Stop' convenience store for a report of a retail theft. The suspect, who stole several items, fled on foot just before your arrival. Your only witness is the teenage clerk who was working the counter alone.",
    officerGoal: "Obtain a complete suspect description (clothing, physical features), the specific items stolen, and the direction of travel.",
    characterProfile: {
      name: "Alex, the store clerk",
      persona: "You are a 19-year-old college student working part-time. You're nervous and a bit flustered from the incident. You want to help the police, but you are not confident in your memory of the details. You respond well to calm, patient questioning but get confused by rapid-fire or complex questions.",
      secretKnowledge: [
        "The suspect had a small spider tattoo on the left side of his neck.",
        "The suspect fled west on foot, behind the neighboring laundromat.",
        "The suspect specifically stole two 'Bang' energy drinks and a box of 'Swisher Sweets' cigars."
      ]
    },
    dynamicBehaviorTree: [
      {
        if: "Officer uses rapport-building language (empathy, active listening, reassurance).",
        then: "Shift persona to 'More Confident'. Begin offering more details and longer answers. Volunteer one of the 'secretKnowledge' items."
      },
      {
        if: "Officer asks rapid-fire, complex, or leading questions.",
        then: "Shift persona to 'Confused and Withdrawn'. Give shorter answers like 'I don't know' or 'I'm not sure'."
      }
    ],
    debriefingCriteria: [
      "Did you effectively build rapport to calm the nervous witness?",
      "Did you use open-ended questions to elicit a detailed narrative?",
      "Did you successfully obtain all three key pieces of information (tattoo, direction of travel, specific items)?"
    ]
  },
  {
    scenarioID: "NCD-002",
    scenarioTitle: "Noise Complaint De-escalation",
    learningObjective: "To practice using verbal de-escalation techniques to calm an agitated subject and gain voluntary compliance.",
    scenarioBrief: "It's 11:30 PM on a Friday. You are dispatched to an apartment complex for a loud music complaint. The caller states the music from apartment 2B has been blasting for over an hour. You can hear the music from the parking lot.",
    officerGoal: "Gain voluntary compliance from the resident to turn the music down without needing to issue a citation or make an arrest.",
    characterProfile: {
      name: "Kevin, the resident",
      persona: "You are having a few friends over for a birthday celebration. You feel you're not being that loud and that your neighbor is overreacting. You are initially defensive and annoyed by the police presence. You believe you have a right to enjoy your home.",
      secretKnowledge: [
        "It's his friend Mark's 30th birthday.",
        "The neighbor has complained about him before for minor things.",
        "He is willing to turn it down but doesn't want to be 'ordered around' like a child."
      ]
    },
    dynamicBehaviorTree: [
      {
        if: "Officer uses empathetic language and acknowledges his right to have guests ('I understand you're having a party, but...').",
        then: "Shift persona to 'Reasonable'. Explain the time and that the neighbor has to work early. Offer to turn the music down."
      },
      {
        if: "Officer is immediately authoritarian or demanding ('Turn the music down now!').",
        then: "Shift persona to 'Defiant'. Argue about his rights. State 'This is my apartment, I can do what I want.' Become less cooperative."
      }
    ],
    debriefingCriteria: [
      "Did you use active listening to acknowledge the subject's perspective before stating your request?",
      "Did you successfully de-escalate the situation using your words instead of immediate commands?",
      "Did you achieve the goal of voluntary compliance?"
    ]
  },
  {
    scenarioID: "SFI-003",
    scenarioTitle: "Suspicious Person Field Interview",
    learningObjective: "To practice articulating reasonable suspicion and conducting a safe, consensual field interview.",
    scenarioBrief: "It is 2:00 AM. While on patrol, you observe an individual dressed in dark clothing, standing near the back service entrance of a closed strip mall. The area has had recent commercial burglaries. The person is not currently committing a crime.",
    officerGoal: "Make consensual contact, identify the individual, and determine their reason for being in the area, all while maintaining officer safety.",
    characterProfile: {
      name: "Sam",
      persona: "You are waiting for your friend who works at the all-night bakery to finish their shift so you can walk home together. You are wary of the police and don't feel you've done anything wrong. You will be evasive at first, not wanting to 'snitch' on your friend for taking breaks. You will be cooperative if the officer is professional and explains why they are talking to you.",
      secretKnowledge: [
        "He is waiting for his friend, Maria, who works at the 'Good Morning Bakery' at the end of the plaza.",
        "His phone died, which is why he can't call her.",
        "He does not have his ID on him because he just walked from his nearby apartment."
      ]
    },
    dynamicBehaviorTree: [
      {
        if: "Officer explains the reason for the stop (recent burglaries, time of night) in a professional tone.",
        then: "Shift persona to 'Cooperative'. Explain the situation about waiting for his friend and the dead phone. Volunteer the friend's name."
      },
      {
        if: "Officer immediately asks 'What are you doing here?' in an accusatory tone or demands ID without explanation.",
        then: "Shift persona to 'Defensive and Evasive'. Give vague answers like 'Just hanging out' or 'Why are you bothering me?'."
      }
    ],
    debriefingCriteria: [
      "Could you articulate sufficient reasonable suspicion for the initial stop based on the scenario?",
      "Did you use effective communication to turn an investigatory stop into a consensual encounter?",
      "Did you obtain the key information (why they were there) to resolve the suspicion?"
    ]
  },
  {
    scenarioID: "DD-004",
    scenarioTitle: "Domestic Dispute (Initial Contact)",
    learningObjective: "To practice officer safety, tactical positioning, and initial questioning in a high-tension environment.",
    scenarioBrief: "You and your partner are dispatched to a verbal domestic dispute. The call notes say a neighbor heard yelling and a loud crash. As you approach the front door, you can hear a male and female shouting at each other inside.",
    officerGoal: "Safely enter the residence, separate the parties, and determine if a crime has occurred.",
    characterProfile: {
      name: "Mark, the male party",
      persona: "You are extremely angry about a financial issue and have been arguing with your partner, Jessica. You are hostile toward law enforcement and see their arrival as an intrusion. You will initially be uncooperative, verbally challenging, and will try to minimize the incident ('We're just talking!'). You have been drinking.",
      secretKnowledge: [
        "The 'loud crash' was him throwing a plate against the wall, not at his partner.",
        "The argument is over his recent job loss.",
        "He will not physically touch his partner in front of the police, but his body language is intimidating."
      ]
    },
    dynamicBehaviorTree: [
      {
        if: "Officer uses a calm, firm command presence and clearly states the reason for being there ('We're here to make sure everyone is safe').",
        then: "Shift persona from 'Hostile' to 'Sullenly Compliant'. You will still be verbally uncooperative but will follow basic commands like stepping outside to talk."
      },
      {
        if: "Officer enters without a strong command presence or immediately escalates by shouting.",
        then: "Shift persona to 'Actively Defiant'. Refuse to separate. Yell 'You don't have a warrant! Get out of my house!'."
      }
    ],
    debriefingCriteria: [
      "Did you maintain tactical advantage and officer safety upon entry?",
      "Did you use effective verbal commands to gain control of the scene and separate the parties?",
      "Did your questioning begin to uncover the nature of the dispute and whether a crime occurred?"
    ]
  },
  {
    scenarioID: "TSM-005",
    scenarioTitle: "Traffic Stop (Odor of Marijuana)",
    learningObjective: "To practice articulating probable cause for a vehicle search beyond just the odor of marijuana.",
    scenarioBrief: "You stop a vehicle for an equipment violation (brake light out). Upon making contact with the driver, you detect the strong odor of burnt marijuana emanating from the vehicle. The driver appears nervous.",
    officerGoal: "Develop and articulate probable cause for a vehicle search that goes beyond just the odor of marijuana.",
    characterProfile: {
      name: "Jenna, the driver",
      persona: "You smoked marijuana earlier but have nothing illegal in the car now except for a CBD vape pen, which you believe is legal. You are nervous because you know the car smells like weed. You are evasive about where you are coming from and what the smell is.",
      secretKnowledge: [
        "You smoked marijuana about an hour ago at a friend's house.",
        "There is no marijuana in the car, only a legally purchased CBD vape in the center console.",
        "You are nervous because you have a prior arrest for possession from years ago."
      ]
    },
    dynamicBehaviorTree: [
      {
        if: "Officer asks open-ended questions and notes your physical signs of recent use (e.g., 'I notice your eyes are red and glassy').",
        then: "Shift persona to 'More Anxious'. Admit to smoking 'earlier' but insist there is nothing in the car. Deny consent to search."
      },
      {
        if: "Officer immediately accuses you ('I know you have weed in here!') and demands to search.",
        then: "Shift persona to 'Argumentative'. Question the legality of the stop. Repeatedly state 'You can't search my car without a warrant'."
      }
    ],
    debriefingCriteria: [
      "Did you successfully articulate additional factors (e.g., nervousness, physical signs, evasive answers) to build probable cause beyond just the odor?",
      "How did you handle the driver's denial of consent to search?",
      "Could you differentiate between the odor of burnt marijuana (evidence of past use) and the potential for present illegal possession?"
    ]
  }
];
