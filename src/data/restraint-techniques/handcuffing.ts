
export type HandcuffingTechnique = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  keySafetyPoints: string[];
  icon: string;
};

export type HandcuffingGuide = {
  principles: {
    title: string;
    points: string[];
  };
  techniques: HandcuffingTechnique[];
};

export const handcuffingData: HandcuffingGuide = {
  principles: {
    title: "Core Principles of Handcuffing",
    points: [
      "Approach from a position of advantage (typically the '2.5 position' behind the subject).",
      "Maintain control of the subject throughout the entire process.",
      "Check for tightness immediately after application (you should be able to slip one fingertip between the cuff and the wrist).",
      "Double-lock the handcuffs to prevent both tightening and shimming.",
      "Conduct a thorough search of the subject immediately after they are cuffed.",
      "Never turn your back on a handcuffed subject.",
    ],
  },
  techniques: [
    {
      id: "standing",
      title: "Standing Handcuffing",
      description: "For compliant or cooperative subjects.",
      icon: "User",
      steps: [
        "Instruct the subject to place their hands behind their back with palms facing out and thumbs up.",
        "Secure the top cuff on one wrist, maintaining control of the subject's hand.",
        "Bring the other hand back and apply the second cuff.",
        "Check for tightness by sliding a fingertip under the cuff.",
        "Double-lock both cuffs by engaging the locking mechanism with your key.",
        "Conduct a search of the subject's person.",
      ],
      keySafetyPoints: [
        "Keep the subject off-balance by having them lean forward slightly.",
        "Maintain verbal commands throughout the process.",
        "Watch for any signs of sudden resistance.",
      ],
    },
    {
      id: "kneeling",
      title: "Kneeling Handcuffing",
      description: "For semi-compliant subjects or when more control is needed.",
      icon: "PersonStanding",
      steps: [
        "Instruct the subject to kneel on both knees.",
        "Have them cross their ankles.",
        "Instruct them to place their hands on their head with fingers interlaced.",
        "Approach from the rear, controlling their hands.",
        "Bring one arm down at a time to apply the cuffs.",
        "Check for tightness and double-lock the cuffs.",
        "Assist the subject to their feet and conduct a search.",
      ],
      keySafetyPoints: [
        "Crossing the ankles makes it more difficult for the subject to stand up suddenly.",
        "Controlling the hands on the head limits their ability to launch an attack.",
        "Never lose physical control of the subject's hands during the transition.",
      ],
    },
    {
      id: "prone",
      title: "Prone Handcuffing",
      description: "For non-compliant, resistive subjects or high-risk situations.",
      icon: "UserX",
      steps: [
        "Order the subject to the ground in a prone position (face down).",
        "Instruct them to extend their arms out to their sides like an airplane, palms up.",
        "Instruct them to cross their ankles.",
        "Approach from a position of cover, maintaining control with your knee on their upper back if necessary and safe.",
        "Secure one hand, bring it to the small of their back, and apply one cuff.",
        "Bring the second hand back and apply the other cuff.",
        "Check for tightness and double-lock.",
        "Search the subject while they remain in the prone position before moving them.",
      ],
      keySafetyPoints: [
        "This technique offers the most control over a resistive subject.",
        "Be mindful of positional asphyxia. Do not apply excessive weight to the subject's back or neck.",
        "Once cuffed, move the subject to a seated or recovery position as soon as it is safe to do so.",
        "This is the standard technique for felony and high-risk stops.",
      ],
    },
  ],
};
