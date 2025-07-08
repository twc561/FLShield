export type WalkthroughStep = {
  phase: string;
  title: string;
  content: string;
  aiTip?: string;
  aiLegalNote?: string;
  choices?: {
    text: string;
    nextStepId: string;
  }[];
  isEnd?: boolean;
};

export type Scenario = {
  id: string;
  name: string;
  goal: string;
  keyStatutes: string[];
  walkthrough: Record<string, WalkthroughStep>;
  initialStepId: string;
  staticChecklist: {
    section: string;
    icon: string;
    items: string[];
  }[];
};

export const scenarioChecklistsData: Record<string, Scenario> = {
  'dui-investigation': {
    id: 'dui-investigation',
    name: 'DUI (Driving Under the Influence) Investigation',
    goal: 'To safely stop, investigate, and if probable cause exists, arrest an impaired driver. To thoroughly document evidence for successful prosecution.',
    keyStatutes: ['F.S. §316.193 (DUI)', 'F.S. §316.1932 (Implied Consent)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'What is the critical information you need from dispatch for a potential DUI?',
        aiTip: "Listen for details like vehicle description, location, direction of travel, and the specific driving pattern reported (e.g., 'swerving all over the road,' 'driving without headlights'). This forms the basis of your reasonable suspicion.",
        choices: [
          { text: "I have the information. Proceed to arrival.", nextStepId: "arrival" }
        ],
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Arrival & Observation',
        content: 'You have located the suspect vehicle. What are your top priorities for assessing the scene and positioning your patrol vehicle before initiating the stop?',
        aiTip: 'Position your patrol car to the left of the suspect vehicle and at an angle. This provides a safety barrier from passing traffic and illuminates the interior of the suspect vehicle with your takedown lights.',
        choices: [
          { text: 'I have observed the driving and am ready to stop.', nextStepId: 'scene_control' },
        ],
      },
      'scene_control': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Personal Contact',
        content: 'You have initiated the traffic stop. What are your first steps to control the scene and what are the most important initial questions to ask the driver?',
        aiTip: "Observe the driver's reaction to your lights and siren. Note how they pull over. During your approach, watch their hands. Ask for license and registration first to observe their fine motor skills.",
        choices: [
          { text: 'Does the driver admit to drinking?', nextStepId: 'admitted_drinking' },
          { text: 'The driver denies drinking.', nextStepId: 'denied_drinking' },
        ],
      },
      'admitted_drinking': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Admission of Consumption',
        content: 'The driver has admitted to consuming alcohol. What are your next 2-3 investigative steps?',
        aiTip: "Don't stop at the first admission. Ask clarifying questions: 'How much have you had to drink?' 'What time was your last drink?' 'Where were you drinking?' This helps establish a timeline and context for their impairment.",
        choices: [
          { text: "Proceed to evidence gathering (FSTs).", nextStepId: "evidence_gathering" }
        ]
      },
      'denied_drinking': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Denial of Consumption',
        content: 'The driver denies drinking. What are your next steps?',
        aiTip: "Rely on your own senses and observations. Document the odor of an alcoholic beverage, bloodshot/watery eyes, slurred speech, and any fumbling with documents. A denial in the face of strong evidence can show consciousness of guilt.",
        choices: [
          { text: "Proceed to evidence gathering (FSTs).", nextStepId: "evidence_gathering" }
        ]
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Field Sobriety Tests (FSTs)',
        content: 'You are preparing to conduct Field Sobriety Tests. What are the top 5 pieces of evidence or observations you must document?',
        aiTip: 'The top 5 are: 1. Odor of alcohol/drugs. 2. Driver\'s appearance/speech. 3. Any admissions. 4. Driving pattern. 5. Performance on FSTs. Document everything.',
        choices: [
          { text: 'Does the driver consent to FSTs?', nextStepId: 'fst_consent' },
          { text: 'The driver refuses FSTs.', nextStepId: 'fst_refusal' },
        ],
      },
      'fst_consent': {
        phase: 'Evidence Gathering & Documentation',
        title: 'FSTs - Consent Given',
        content: 'The driver has consented to perform FSTs. What is your procedure?',
        content: 'Administer the Standardized Field Sobriety Tests (SFSTs) on a flat, dry, well-lit surface, away from your vehicle\'s flashing lights. Document every clue you observe for the Horizontal Gaze Nystagmus (HGN), Walk-and-Turn, and One-Leg Stand tests. Your detailed notes are critical for your report.',
        choices: [
          { text: 'The investigation is complete. Proceed to resolution.', nextStepId: 'resolution' },
        ],
      },
      'fst_refusal': {
        phase: 'Evidence Gathering & Documentation',
        title: 'FSTs - Refusal',
        content: 'The driver has refused to perform FSTs. How do you proceed?',
        content: "Clearly document the driver's refusal in your report. Make sure your body camera captures the refusal. Explain to the driver that you will now make your arrest decision based on the evidence you have gathered so far (driving pattern, physical observations, admissions, etc.). The refusal itself can be used as evidence of consciousness of guilt.",
        choices: [
          { text: 'The investigation is complete. Proceed to resolution.', nextStepId: 'resolution' },
        ],
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Making the Arrest Decision',
        content: 'Based on the totality of the circumstances from your investigation, what is the appropriate resolution?',
        aiLegalNote: "Probable cause for a DUI arrest is based on the totality of everything you've observed up to this point. You do not need a breath test result or a confession to make a lawful arrest.",
        choices: [
          { text: "Arrest for DUI", nextStepId: 'arrest_procedure' },
          { text: "Issue citations and release", nextStepId: 'release_procedure' }
        ]
      },
      'arrest_procedure': {
        phase: 'Resolution & Enforcement Action',
        title: 'Post-Arrest Procedures',
        content: 'You have made a DUI arrest. What are your key post-arrest procedures?',
        aiLegalNote: 'After the arrest and securing the suspect, you MUST read the Florida Implied Consent warning (F.S. §316.1932) verbatim before requesting a breath, blood, or urine test. This is separate from Miranda rights, which should be read before any post-arrest questioning about the offense.',
        isEnd: true,
      },
      'release_procedure': {
        phase: 'Resolution & Enforcement Action',
        title: 'No Arrest - Release',
        content: 'You have determined there is not sufficient probable cause for a DUI arrest.',
        aiTip: 'Even if you do not make a DUI arrest, ensure the driver is safe to operate the vehicle. If you still have concerns about their sobriety, consider helping them arrange for a ride. Document your observations and issue any applicable traffic citations.',
        isEnd: true,
      },
    },
    staticChecklist: [
      {
        section: 'Initial Response & Scene Management',
        icon: 'Car',
        items: [
          'Observe and note vehicle in motion (weaving, speeding, etc.).',
          'Select a safe, well-lit location for the traffic stop.',
          'Note driver actions upon stopping (e.g., slow to stop, abrupt stop).',
          'Conduct a safe approach, observing occupants and looking for furtive movements.',
        ],
      },
      {
        section: 'Investigation & Evidence Collection',
        icon: 'Search',
        items: [
          "Observe for physical signs of impairment: odor of alcohol, bloodshot/watery eyes, slurred speech.",
          "Request documents (license, registration) and note any fumbling or difficulty.",
          "Ask key questions: 'Where are you coming from?', 'Have you had anything to drink/consume tonight?'.",
          "Administer Standardized Field Sobriety Tests (SFSTs) on a safe, level surface.",
          "Document all observed clues for HGN, Walk-and-Turn, and One-Leg Stand.",
          "Secure any evidence in plain view (e.g., open containers).",
          "If applicable, document the driver's refusal to perform SFSTs.",
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          "Make arrest decision based on the totality of the circumstances.",
          "If arresting: handcuff, search incident to arrest, and secure suspect.",
          "Read Florida Implied Consent warning verbatim before requesting breath/urine test.",
          "Read Miranda rights before any post-arrest questioning.",
          "Arrange for vehicle to be towed/impounded per department policy.",
          "Complete detailed and thorough Probable Cause Affidavit (PCA), documenting all observations from initial call to transport.",
        ],
      },
    ],
  },
};
