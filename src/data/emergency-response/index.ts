export type GuidePlaceholder = {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
};

export type AlertPlaceholder = GuidePlaceholder; // They share the same structure

export const emergencyResponseIndex: GuidePlaceholder[] = [
  {
    id: "ER_BAKER_MARCHMAN",
    title: "Baker Act & Marchman Act",
    subtitle: "Involuntary commitment for mental health & substance abuse.",
    icon: "BrainCircuit"
  },
  {
    id: "ER_FIRST_AID",
    title: "First Aid Field Guide",
    subtitle: "Immediate tactical medical reference.",
    icon: "HeartPulse"
  },
  {
    id: "ER_HAZMAT",
    title: "HAZMAT Placard Guide",
    subtitle: "Identify hazardous materials and response actions.",
    icon: "Biohazard"
  },
  {
    id: "ER_AMBER_ALERT",
    title: "Amber Alert Guide",
    subtitle: "Criteria and procedure for child abductions.",
    icon: "AlertCircle"
  },
  {
    id: "ER_SILVER_ALERT",
    title: "Silver Alert Guide",
    subtitle: "Criteria for missing persons with cognitive impairment.",
    icon: "UserSearch"
  }
];
