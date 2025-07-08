export type AlertGuideline = {
  id: string;
  title: string;
  icon: string;
  criteria: { title: string; text: string }[];
};

type AlertGuideData = {
    amber: AlertGuideline;
    silver: AlertGuideline;
}

export const alertGuideData: AlertGuideData = {
  amber: {
    id: "amber-alert",
    title: "AMBER Alert",
    icon: "AlertCircle",
    criteria: [
      {
        title: "Child's Age",
        text: "The child must be under 18 years of age.",
      },
      {
        title: "Clear Indication of Abduction",
        text: "There must be a clear indication that an abduction has occurred. This is not for runaways or missing children under non-threatening circumstances.",
      },
      {
        title: "Imminent Danger",
        text: "The law enforcement agency's investigation must conclude that the child's life is in imminent danger of death or serious bodily harm.",
      },
      {
        title: "Sufficient Information",
        text: "There must be a detailed description of the child, abductor, and/or vehicle to broadcast to the public. A photo of the child should be provided as soon as possible.",
      },
      {
        title: "Activation Recommendation",
        text: "The alert must be recommended for activation by the local law enforcement agency of jurisdiction.",
      },
    ],
  },
  silver: {
    id: "silver-alert",
    title: "Silver Alert",
    icon: "UserSearch",
    criteria: [
      {
        title: "Missing Person's Age",
        text: "The missing person must be 60 years of age or older.",
      },
      {
        title: "Cognitive Impairment",
        text: "The missing person must have a clear indication of an irreversible deterioration of intellectual faculties (e.g., Alzheimer's disease or dementia). A physician's note is helpful but not required if observations support this.",
      },
      {
        title: "Vehicle Involvement",
        text: "The disappearance must place the person in danger and they are operating a motor vehicle. The vehicle's description and tag number must be known.",
      },
      {
        title: "Alternative for Younger Persons",
        text: "The alert may also be issued for a person age 18-59 who has irreversible deterioration of intellectual faculties, OR for a person age 18 or older who has been declared missing and is endangered (Purple Alert).",
      },
    ],
  },
};
