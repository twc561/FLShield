export type SftsTest = {
  id: string;
  name: string;
  instructions: string;
  clues: string[];
};

export type FstGuideline = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details?: string[];
  sftsTests?: SftsTest[];
  script?: string;
};

export const fstData: FstGuideline[] = [
  {
    id: "phase1",
    title: "Phase One: Vehicle in Motion",
    icon: "Move",
    description: "Initial observations of driving that create reasonable suspicion for a traffic stop.",
    details: [
      "Weaving across lane lines or straddling a lane line.",
      "Swerving to avoid a collision or object.",
      "Driving significantly below the speed limit (10+ mph).",
      "Making wide turns or driving with headlights off at night.",
      "Braking erratically or stopping inappropriately.",
      "Following too closely or responding slowly to traffic signals."
    ]
  },
  {
    id: "phase2",
    title: "Phase Two: Personal Contact",
    icon: "User",
    description: "Observations made during the initial face-to-face interaction with the driver.",
    details: [
      "Odor of an alcoholic beverage coming from the driver's breath or vehicle.",
      "Slurred, mumbled, or slow speech.",
      "Bloodshot, watery, or glassy eyes.",
      "Fumbling with driver's license or registration.",
      "Admission of drinking or consuming drugs.",
      "Inconsistent answers to simple questions.",
      "Unusual or inappropriate demeanor (argumentative, sleepy, etc.)."
    ]
  },
  {
    id: "phase3",
    title: "Phase Three: Standardized Field Sobriety Tests (SFSTs)",
    icon: "Footprints",
    description: "A battery of standardized and validated tests to assess impairment.",
    sftsTests: [
      {
        id: "hgn",
        name: "Horizontal Gaze Nystagmus (HGN)",
        instructions: "Check for equal pupil size and tracking. Check for medical clearance. Instruct suspect to follow stimulus with eyes only, keeping head still. Perform two passes for each check.",
        clues: [
          "Lack of Smooth Pursuit (each eye)",
          "Distinct and Sustained Nystagmus at Maximum Deviation (each eye)",
          "Onset of Nystagmus Prior to 45 Degrees (each eye)",
        ]
      },
      {
        id: "walk-and-turn",
        name: "Walk and Turn",
        instructions: "Instruct suspect to place feet in heel-to-toe position on a line, take nine heel-to-toe steps, turn as instructed, and take nine heel-to-toe steps back. Demonstrate.",
        clues: [
          "Cannot keep balance while listening to instructions.",
          "Starts before instructions are finished.",
          "Stops while walking to regain balance.",
          "Does not touch heel-to-toe.",
          "Steps off the line.",
          "Uses arms to balance.",
          "Improper turn.",
          "Incorrect number of steps.",
        ]
      },
      {
        id: "one-leg-stand",
        name: "One-Leg Stand",
        instructions: "Instruct suspect to stand with feet together, raise one leg approximately six inches off the ground, and count aloud by thousands for 30 seconds. Demonstrate.",
        clues: [
          "Sways while balancing.",
          "Uses arms to balance.",
          "Hops to maintain balance.",
          "Puts foot down.",
        ]
      },
    ]
  },
  {
    id: "phase4",
    title: "Implied Consent Warning (Post-Arrest)",
    icon: "FileText",
    description: "To be read verbatim after a lawful arrest for DUI (F.S. § 316.1932).",
    script: `I am now requesting that you submit to a lawful test of your breath for the purpose of determining its alcohol content. 
    
(If breath test is impractical or refused, or drugs are suspected): I am now requesting that you submit to a lawful test of your urine for the purpose of determining the presence of any chemical or controlled substance.

Should you refuse to submit to the breath or urine test I have requested of you, your privilege to operate a motor vehicle will be suspended for a period of one year for a first refusal, or a period of 18 months if your privilege has been previously suspended for a prior refusal.

Additionally, if you refuse to submit to the test I have requested, and your driving privilege has been previously suspended for a prior refusal to submit to a lawful test of your breath, urine, or blood, you will be committing a misdemeanor of the first degree.

Do you wish to submit to this test?`
  },
];
