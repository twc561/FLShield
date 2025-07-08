
export type K9TopicPlaceholder = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
};

export const k9GuideIndex = {
  forHandlers: [
    {
      id: "K9_HANDLER_CASELAW_VEHICLE",
      title: "Case Law: Vehicle Sniffs",
      subtitle: "Legal standards for K-9 sniffs of vehicles.",
      icon: "Car",
    },
    {
      id: "K9_HANDLER_CASELAW_RESIDENCE",
      title: "Case Law: Residential Sniffs",
      subtitle: "Curtilage rules and warrant requirements.",
      icon: "Home",
    },
    {
      id: "K9_HANDLER_CASELAW_FORCE",
      title: "Case Law: K-9 as Use of Force",
      subtitle: "Objective reasonableness for apprehensions.",
      icon: "ShieldAlert",
    },
    {
      id: "K9_HANDLER_TRAINING_RECORDS",
      title: "Training & Certification Documentation",
      subtitle: "Best practices for maintaining defensible logs.",
      icon: "FileText",
    },
    {
      id: "K9_HANDLER_SCENT_DISCRIMINATION",
      title: "Scent Discrimination & Tracking",
      subtitle: "Advanced techniques and evidentiary considerations.",
      icon: "Wind",
    },
  ],
  forPatrol: [
    {
      id: "K9_PATROL_ASSIST",
      title: "How to Assist a K-9 Unit",
      subtitle: "Your role in scene security and support.",
      icon: "Users",
    },
    {
      id: "K9_PATROL_CAPABILITIES",
      title: "Understanding K-9 Capabilities",
      subtitle: "What a K-9 alert means and what it doesn't.",
      icon: "BrainCircuit",
    },
    {
      id: "K9_PATROL_REQUESTING",
      title: "Requesting a K-9 Unit",
      subtitle: "When and how to request a K-9 for a search.",
      icon: "Radio",
    },
    {
      id: "K9_PATROL_SAFETY_TRACK",
      title: "Officer Safety on a K-9 Track",
      subtitle: "Positioning and responsibilities as a cover officer.",
      icon: "Footprints",
    },
  ],
};
