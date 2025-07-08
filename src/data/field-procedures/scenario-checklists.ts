
export type ChecklistItem = {
  id: string;
  text: string;
  subItems?: string[];
};

export type Scenario = {
  id: string;
  title: string;
  icon: string;
  description: string;
  checklist: ChecklistItem[];
};

export const scenarioChecklistsData: Scenario[] = [
  {
    id: "scenario1",
    title: "DUI Traffic Stop Checklist",
    icon: "Car",
    description: "A step-by-step checklist for conducting a standard DUI investigation, from initial observation to arrest or release.",
    checklist: [
      { id: "dui1", text: "Phase 1: Vehicle in Motion" },
      { id: "dui2", text: "Observe moving violation or other signs of impairment (swerving, lane drifting, etc.)." },
      { id: "dui3", text: "Note specific time, location, and driving pattern." },
      { id: "dui4", text: "Initiate traffic stop in a safe location." },
      { id: "dui5", text: "Phase 2: Personal Contact" },
      { id: "dui6", text: "Observe and note driver's appearance (flushed face, glassy eyes)." },
      { id: "dui7", text: "Listen for slurred speech or unusual statements." },
      { id: "dui8", text: "Note any odor of alcoholic beverages or other substances." },
      { id: "dui9", text: "Ask for license, registration, and proof of insurance." },
      { id: "dui10", text: "Note any fumbling or difficulty retrieving documents." },
      { id: "dui11", text: "Ask pre-exit questions (e.g., 'Have you been drinking tonight?')." },
      { id: "dui12", text: "Phase 3: Pre-Arrest Screening (SFSTs)" },
      { id: "dui13", text: "Ensure suspect is out of the vehicle and in a safe, level area." },
      { id: "dui14", text: "Ask about any medical conditions that might affect performance." },
      { id: "dui15", text: "Administer Standardized Field Sobriety Tests per NHTSA guidelines.",
        subItems: [
          "Horizontal Gaze Nystagmus (HGN)",
          "Walk and Turn",
          "One-Leg Stand"
        ]
      },
      { id: "dui16", text: "Document all clues observed for each test." },
      { id: "dui17", text: "Phase 4: Arrest Decision" },
      { id: "dui18", text: "Based on the totality of circumstances (Phases 1-3), make arrest decision." },
      { id: "dui19", text: "If arresting: handcuff, search incident to arrest, and secure suspect." },
      { id: "dui20", text: "Read Florida's Implied Consent warning verbatim." },
      { id: "dui21", text: "Transport to station/BAT facility for breath/urine test." },
      { id: "dui22", text: "If not arresting: issue any applicable citations and release." },
    ]
  },
  {
    id: "scenario2",
    title: "Domestic Violence Initial Response",
    icon: "Home",
    description: "A checklist for the critical first steps when responding to a domestic violence call.",
    checklist: [
        { id: "dv1", text: "Approach scene cautiously; listen before knocking." },
        { id: "dv2", text: "Position yourselves for tactical advantage at the door." },
        { id: "dv3", text: "Once inside, immediately identify and separate all parties." },
        { id: "dv4", text: "Check for injuries and request medical assistance if needed." },
        { id: "dv5", text: "Secure the scene and identify any weapons." },
        { id: "dv6", text: "Interview parties separately and out of earshot of one another." },
        { id: "dv7", text: "Identify the primary aggressor based on statements, evidence, and injuries." },
        { id: "dv8", text: "Check for prior history of domestic violence at the location or involving the subjects." },
        { id: "dv9", text: "Photograph injuries and any damage to the property." },
        { id: "dv10", text: "Determine if a crime has been committed and make an arrest if probable cause exists." },
        { id: "dv11", text: "Provide victim with information on resources (e.g., shelters, injunctions)." },
        { id: "dv12", text: "Write a detailed report including all statements, observations, and actions taken." },
    ]
  }
];
