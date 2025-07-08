
export type FirstAidTopic = {
  id: string;
  title: string;
  icon: string;
  description: string;
  steps: { title: string; text: string }[];
  officerTakeaway: string;
};

export const firstAidData: FirstAidTopic[] = [
  {
    id: "hemorrhage-control",
    title: "Massive Hemorrhage Control (Extremity)",
    icon: "PlusSquare",
    description: "Steps for controlling life-threatening bleeding from an arm or leg using a tourniquet.",
    steps: [
      {
        title: "Step 1: Expose and Identify",
        text: "Expose the wound to identify the source of the massive bleeding. Remove clothing as necessary.",
      },
      {
        title: "Step 2: Apply Tourniquet",
        text: "Apply a commercial tourniquet (e.g., CAT, SOFTT-W) 'high and tight' on the injured limb, above the bleeding site.",
      },
      {
        title: "Step 3: Tighten",
        text: "Tighten the windlass until the bleeding stops completely. The absence of a distal pulse is a good indicator of success.",
      },
      {
        title: "Step 4: Secure and Mark Time",
        text: "Secure the windlass in its clip or holder. Write the time of application on the tourniquet or directly on the patient's forehead ('T' and time).",
      },
      {
        title: "Step 5: Reassess",
        text: "If bleeding continues, consider applying a second tourniquet directly above the first. Never remove a tourniquet once applied.",
      },
    ],
    officerTakeaway: "Your own safety is paramount. Ensure the scene is secure before rendering aid. Apply direct pressure while you are getting your tourniquet ready. A properly applied tourniquet will be painful to the patient; this is normal. Stopping the bleed is the priority.",
  },
  {
    id: "airway-management",
    title: "Basic Airway Management",
    icon: "Wind",
    description: "Ensuring an unconscious patient has a clear airway.",
    steps: [
      {
        title: "Step 1: Check Responsiveness",
        text: "Assess if the patient is conscious or unconscious. Do not move them if a spinal injury is suspected.",
      },
      {
        title: "Step 2: Open the Airway",
        text: "Use the head-tilt, chin-lift maneuver. If a spinal injury is suspected, use the jaw-thrust maneuver instead.",
      },
      {
        title: "Step 3: Check for Obstructions",
        text: "Look, listen, and feel for breathing. If there are foreign objects (blood, vomit) in the mouth, turn the patient on their side (if no spinal injury) and clear it with your fingers or suction.",
      },
      {
        title: "Step 4: Consider Recovery Position",
        text: "If the patient is unconscious but breathing on their own, place them in the recovery position to help keep the airway clear.",
      },
    ],
    officerTakeaway: "An obstructed airway can be fatal in minutes. This is a critical first step after controlling massive bleeding. Do not place anything under the patient's head.",
  },
  {
    id: "gsw-chest",
    title: "Sucking Chest Wound",
    icon: "ShieldAlert",
    description: "Treating a penetrating injury to the chest.",
    steps: [
      {
        title: "Step 1: Expose the Wound",
        text: "Wipe the wound area clean of blood and expose the injury.",
      },
      {
        title: "Step 2: Apply Vented Chest Seal",
        text: "Place a vented chest seal directly over the wound as the patient exhales. Ensure a good seal on all sides.",
      },
      {
        title: "Step 3: Check for Exit Wound",
        text: "Log roll the patient (maintaining spinal alignment) to check for an exit wound. If one is found, apply another chest seal to it.",
      },
      {
        title: "Step 4: Monitor Breathing",
        text: "Watch the patient for signs of developing tension pneumothorax (severe difficulty breathing, anxiety, tracheal deviation). Be prepared to 'burp' the seal if necessary.",
      },
    ],
    officerTakeaway: "Any hole in the 'box' (shoulders to navel, front or back) can be a sucking chest wound. The purpose of the seal is to stop air from being drawn into the chest cavity, which can collapse a lung.",
  },
];
