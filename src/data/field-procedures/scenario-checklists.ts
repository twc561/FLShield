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
    name: 'DUI Investigation',
    goal: 'To safely stop, investigate, and if probable cause exists, arrest an impaired driver. To thoroughly document evidence for successful prosecution.',
    keyStatutes: ['F.S. §316.193 (DUI)', 'F.S. §316.1932 (Implied Consent)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'You receive a BOLO for a possible impaired driver.',
        aiTip: "Listen for details like vehicle description, location, direction of travel, and the specific driving pattern reported (e.g., 'swerving all over the road,'). This forms the basis of your reasonable suspicion.",
        choices: [
          { text: "I have located the vehicle.", nextStepId: "arrival" }
        ],
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Observation of Driving Pattern',
        content: 'You are now behind the suspect vehicle and observing its movement. What specific driving cues are you looking for to corroborate the BOLO?',
        aiTip: 'Document any observed traffic infractions. This independent observation is crucial and will be the legal foundation for your traffic stop, separate from the initial BOLO.',
        choices: [
          { text: 'I have observed a violation and initiated a stop.', nextStepId: 'scene_control' },
        ],
      },
      'scene_control': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Personal Contact',
        content: 'You have initiated the traffic stop and are making a driver-side approach. As you get to the window, what are your first sensory observations?',
        aiTip: "Engage your senses. Note the odor of alcoholic beverages, the driver's appearance (bloodshot/watery eyes), their speech (slurred/thick-tongued), and their ability to produce their documents. These are key elements for your report.",
        choices: [
          { text: 'Does the driver admit to drinking?', nextStepId: 'admitted_drinking' },
          { text: 'The driver denies drinking.', nextStepId: 'denied_drinking' },
        ],
      },
      'admitted_drinking': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Admission of Consumption',
        content: 'The driver has admitted to consuming alcohol. What are your next 2-3 investigative questions?',
        aiTip: "Don't stop at the first admission. Ask clarifying questions: 'How much have you had to drink?' 'What time was your last drink?' 'Where were you drinking?' This helps establish a timeline and context for their impairment.",
        choices: [
          { text: "Proceed to evidence gathering (FSTs).", nextStepId: "evidence_gathering" }
        ]
      },
      'denied_drinking': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Denial of Consumption',
        content: 'The driver denies drinking despite your sensory observations.',
        aiTip: "Rely on your own senses and observations. A denial in the face of strong evidence can show consciousness of guilt. Document the denial alongside your direct observations in your report.",
        choices: [
          { text: "Proceed to evidence gathering (FSTs).", nextStepId: "evidence_gathering" }
        ]
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Field Sobriety Tests (FSTs)',
        content: 'You are preparing to conduct Field Sobriety Tests. Do you have a safe, level, and well-lit area to perform them?',
        aiTip: 'Officer safety and test validity are paramount. Ensure the location is free of hazards and away from the flashing lights of your patrol car, which can affect the HGN test.',
        choices: [
          { text: 'Does the driver consent to FSTs?', nextStepId: 'fst_consent' },
          { text: 'The driver refuses FSTs.', nextStepId: 'fst_refusal' },
        ],
      },
      'fst_consent': {
        phase: 'Evidence Gathering & Documentation',
        title: 'FSTs - Consent Given',
        content: 'The driver has consented to perform FSTs. What is your procedure?',
        content: 'Administer the Standardized Field Sobriety Tests (SFSTs) per NHTSA guidelines. Document every clue you observe for the Horizontal Gaze Nystagmus (HGN), Walk-and-Turn, and One-Leg Stand tests. Your detailed notes are critical for your report.',
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
  'traffic-stop-moving-violation': {
    id: 'traffic-stop-moving-violation',
    name: 'Traffic Stop (Moving Violation)',
    goal: 'To safely conduct a traffic stop for an observed moving violation, issue the appropriate enforcement action (citation/warning), and document the encounter thoroughly.',
    keyStatutes: ['F.S. §316 (State Uniform Traffic Control)', 'F.S. §322 (Driver Licenses)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Observation of Violation',
        content: 'You observe a vehicle commit a moving violation. What is the first piece of information you should relay to dispatch before activating your lights?',
        aiTip: "Radioing the license plate, vehicle description, location, and number of occupants to dispatch *before* the stop ensures that the information is recorded and available to backup units if the stop goes bad.",
        choices: [
          { text: "I've relayed the info and initiated the stop.", nextStepId: "arrival" }
        ],
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Scene Safety & Positioning',
        content: 'You have initiated the stop and the driver is pulling over. What are your top 3 priorities for scene safety as you come to a stop?',
        aiTip: '1. Location: Ensure you are out of active traffic lanes. 2. Positioning: Angle your patrol car to create a safety buffer. 3. Illumination: Use your lights to illuminate the suspect vehicle\'s interior and warn other drivers.',
        choices: [
          { text: 'The scene is safe. Proceeding with approach.', nextStepId: 'scene_control' },
        ],
      },
      'scene_control': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Driver Contact',
        content: 'You are at the driver\'s window. What is your standard opening line and initial request?',
        aiTip: "A professional greeting sets the tone. 'Good evening, I'm Officer [Name] with the [Agency]. The reason I stopped you is for [violation]. May I please see your license, registration, and proof of insurance?'",
        choices: [
          { text: "The driver's license/ID is valid.", nextStepId: 'valid_license' },
          { text: "The driver's license is suspended/revoked.", nextStepId: 'suspended_license' },
          { text: "The driver has no ID.", nextStepId: 'no_id' },
        ],
      },
      'valid_license': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Routine Stop Procedure',
        content: 'The driver has a valid license and there are no other immediate issues.',
        aiTip: 'Even on a routine stop, maintain situational awareness. Watch all occupants\' hands and check your mirrors frequently. Write the citation in your vehicle for safety.',
        choices: [
          { text: "Proceed to enforcement action.", nextStepId: "evidence_gathering" }
        ]
      },
      'suspended_license': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Suspended License',
        content: 'Dispatch advises the driver\'s license is suspended.',
        aiLegalNote: "Confirm the suspension is criminal ('DWLS with Knowledge') before making a custodial arrest. If it is, this is a mandatory arrest situation in many jurisdictions. The original traffic stop is now a criminal investigation.",
        choices: [
          { text: "Proceed with criminal investigation/arrest.", nextStepId: "resolution" }
        ]
      },
      'no_id': {
        phase: 'Scene Control & Initial Investigation',
        title: 'No Identification',
        content: 'The driver cannot produce identification.',
        aiTip: "Attempt to identify the driver through other means (verbal information, vehicle registration, mobile fingerprint scanner if available). If you cannot positively identify the driver to issue a citation, a custodial arrest may be necessary.",
        choices: [
          { text: "Proceed with investigation.", nextStepId: "evidence_gathering" }
        ]
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Enforcement Decision',
        content: 'You have the driver\'s information and have decided on your enforcement action (citation or warning).',
        aiTip: 'Before writing, double-check the statute number for the violation. An incorrect statute can lead to the citation being dismissed.',
        choices: [
          { text: 'Did the stop reveal probable cause for a search?', nextStepId: 'search_pc' },
          { text: 'No search is necessary.', nextStepId: 'resolution' },
        ],
      },
      'search_pc': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Probable Cause for Search',
        content: 'During the stop, you developed probable cause to search the vehicle (e.g., odor of marijuana, contraband in plain view).',
        aiLegalNote: 'Clearly articulate the *separate* probable cause for the search in your report. The initial traffic violation justifies the stop, but not the search. The automobile exception allows a warrantless search of the vehicle based on this new PC.',
        choices: [
          { text: 'The search is complete. Proceed to resolution.', nextStepId: 'resolution' },
        ],
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Concluding the Stop',
        content: 'You have completed your investigation and are ready to issue the citation/warning or make an arrest.',
        aiLegalNote: "The mission of a traffic stop is complete once the enforcement action is issued. Under `Rodriguez v. United States`, you cannot prolong the stop to conduct further investigation (like asking for consent to search) without developing separate, articulable reasonable suspicion.",
        isEnd: true,
      }
    },
    staticChecklist: [
      {
        section: 'Pre-Stop & Stop',
        icon: 'Car',
        items: [
          'Observe moving violation.',
          'Radio dispatch with plate, vehicle description, location, and violation.',
          'Activate emergency lights and select a safe stopping location.',
          'Position patrol car angled to the left for a safety lane and illumination.',
          'Visually scan the vehicle interior and occupants during approach.',
        ],
      },
      {
        section: 'Driver Contact & Investigation',
        icon: 'Search',
        items: [
          "Introduce self, state reason for stop.",
          "Obtain driver's license, registration, and proof of insurance.",
          "Run driver and vehicle through dispatch/MDT for wants/warrants and license status.",
          "Check for signs of impairment or other criminal indicators.",
          "Make enforcement decision (citation or warning).",
          "If a search is conducted, articulate the separate probable cause for it.",
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          "Write and double-check citation for accuracy.",
          "Explain the citation and the driver's options clearly.",
          "Return documents to the driver.",
          "Wait for the driver to safely pull back into traffic before leaving.",
          "Clear the call with dispatch.",
        ],
      },
    ],
  },
};
