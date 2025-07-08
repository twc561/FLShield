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
  subtitle: string;
  category: string;
  icon: string;
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
    subtitle: 'F.S. §316.193, §316.1932',
    category: 'Patrol Operations',
    icon: 'Car',
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
        content: 'The driver has consented to perform FSTs. Administer the Standardized Field Sobriety Tests (SFSTs) per NHTSA guidelines. Document every clue you observe for the Horizontal Gaze Nystagmus (HGN), Walk-and-Turn, and One-Leg Stand tests. Your detailed notes are critical for your report.',
        choices: [
          { text: 'The investigation is complete. Proceed to resolution.', nextStepId: 'resolution' },
        ],
      },
      'fst_refusal': {
        phase: 'Evidence Gathering & Documentation',
        title: 'FSTs - Refusal',
        content: "The driver has refused to perform FSTs. Clearly document the driver's refusal in your report. Make sure your body camera captures the refusal. Explain to the driver that you will now make your arrest decision based on the evidence you have gathered so far (driving pattern, physical observations, admissions, etc.). The refusal itself can be used as evidence of consciousness of guilt.",
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
    subtitle: 'F.S. §316, §322',
    category: 'Patrol Operations',
    icon: 'TrafficCone',
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
        content: "You are at the driver's window. What is your standard opening line and initial request?",
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
  'domestic-violence-investigation': {
    id: 'domestic-violence-investigation',
    name: 'Domestic Violence Investigation',
    subtitle: 'F.S. §741.28, §784.03',
    category: 'Crimes Against Persons',
    icon: 'ShieldAlert',
    goal: 'To safely intervene, ensure victim safety, identify the primary aggressor, and gather sufficient evidence for an evidence-based prosecution.',
    keyStatutes: ['F.S. §741.28 (DV Definition)', 'F.S. §784.03 (Battery)', 'F.S. §741.31 (Injunction Violation)'],
    initialStepId: 'start',
    walkthrough: {
        'start': {
            phase: 'Dispatch & Tactical Approach',
            title: 'Receiving the Call',
            content: 'You are dispatched to a physical domestic disturbance. Critical info to get from dispatch: Are weapons involved? Is anyone injured? History of calls at this address? Who is the complainant?',
            aiTip: 'Park your vehicle at least one house away. Turn down your radio and listen at the door/windows for a few moments before knocking. Always have a cover officer.',
            choices: [{ text: "Arrived on scene.", nextStepId: "arrival" }]
        },
        'arrival': {
            phase: 'Scene Control & Initial Contact',
            title: 'Tactical Approach & Scene Entry',
            content: "You've made it to the location. When the door is opened, position yourselves to prevent it from being closed on you. Immediately move to visually identify and separate all parties involved.",
            aiTip: 'Never let the involved parties see you write in your notepad; it can escalate tension. Observe and listen first, document later when safe.',
            choices: [{ text: "Parties are separated. Begin investigation.", nextStepId: "investigation" }]
        },
        'investigation': {
            phase: 'Investigation & Evidence',
            title: 'Initial Investigation & Injury Assessment',
            content: "You've separated the parties and are beginning your interviews. Are there visible injuries on any person?",
            aiTip: "Your first priority is safety and medical aid. Even if injuries seem minor, ask if the person wants EMS to respond. This demonstrates care and is crucial for documentation.",
            choices: [{ text: "Yes, injuries are visible.", nextStepId: "injuries_yes" }, { text: "No, no visible injuries.", nextStepId: "injuries_no" }]
        },
        'injuries_yes': {
            phase: 'Investigation & Evidence',
            title: 'Visible Injuries Found',
            content: "Immediately call for EMS if injuries are significant. Photograph all injuries on all parties from multiple angles (with and without a scale). Ask specific questions about how the injuries occurred. Note any inconsistencies.",
            choices: [{ text: "Next, check for children.", nextStepId: "check_children" }]
        },
        'injuries_no': {
            phase: 'Investigation & Evidence',
            title: 'No Visible Injuries',
            content: "State in your report that you observed no visible injuries on any party at the time of your investigation. Ask if anyone is hurt or requires medical attention, even without visible signs. The absence of injury does not mean a crime did not occur.",
            choices: [{ text: "Next, check for children.", nextStepId: "check_children" }]
        },
        'check_children': {
            phase: 'Investigation & Evidence',
            title: 'Presence of Children',
            content: 'Are children present or were they present during the altercation?',
            choices: [{ text: "Yes, children are present.", nextStepId: "children_present" }, { text: "No, no children present.", nextStepId: "children_not_present" }]
        },
        'children_present': {
            phase: 'Investigation & Evidence',
            title: 'Children Present',
            content: "Check on the welfare and safety of the children immediately. Conduct a brief, non-leading interview with the children if age-appropriate and away from the parents.",
            aiLegalNote: "You are a mandatory reporter. If you have any suspicion of child abuse or neglect (F.S. §39.201), you must make a report to the DCF hotline.",
            choices: [{ text: "Proceed to determine primary aggressor.", nextStepId: "primary_aggressor" }]
        },
        'children_not_present': {
            phase: 'Investigation & Evidence',
            title: 'No Children Present',
            content: "Document in your report that no children were present during the incident.",
            choices: [{ text: "Proceed to determine primary aggressor.", nextStepId: "primary_aggressor" }]
        },
        'primary_aggressor': {
            phase: 'Enforcement & Resolution',
            title: 'Primary Aggressor Determination',
            content: "Based on the totality of the circumstances (injuries, statements, evidence, history), have you identified the primary aggressor?",
            aiTip: "Review defensive vs. offensive injuries, relative size/strength of parties, and history of calls to justify your decision. Avoid dual arrests unless absolutely necessary and articulable.",
            choices: [{ text: "Yes, primary aggressor identified.", nextStepId: "arrest" }, { text: "No, cannot determine.", nextStepId: "no_arrest" }]
        },
        'arrest': {
            phase: 'Enforcement & Resolution',
            title: 'Arrest Made',
            content: 'Place the primary aggressor under arrest. Provide the victim(s) with a domestic violence information card/pamphlet, which includes contact information for local shelters and instructions on how to file for an injunction for protection. Document in your report that you provided this information.',
            aiLegalNote: "Per F.S. §741.29, Florida has a pro-arrest policy for domestic violence. If you have probable cause to believe a domestic violence crime has been committed, you SHALL arrest and take that person into custody.",
            isEnd: true
        },
        'no_arrest': {
            phase: 'Enforcement & Resolution',
            title: 'No Arrest Made',
            content: 'Thoroughly document in your report why a primary aggressor could not be identified (e.g., conflicting stories with no independent evidence). Strongly advise and assist with temporary separation of the parties. Provide all parties with DV resources.',
            isEnd: true
        }
    },
    staticChecklist: [
      {
        section: 'Scene Management',
        icon: 'ShieldAlert',
        items: [
          'Conduct a tactical, listening approach.',
          'Immediately separate all parties upon entry.',
          'Check on the welfare of any children present.',
          'Call for EMS for any significant injuries.',
          'Scan the residence for signs of a struggle or physical evidence.',
        ]
      },
      {
        section: 'Investigation',
        icon: 'Search',
        items: [
          'Obtain independent, recorded statements from all parties.',
          'Photograph all injuries, damaged property, and the overall scene.',
          'Ask about relationship status and if they live together (defines the "domestic" nature).',
          'Run all parties for warrants and history (injunctions, prior DV calls).',
          'Attempt to identify the primary aggressor based on the evidence.',
        ]
      },
      {
        section: 'Resolution & Reporting',
        icon: 'FileText',
        items: [
          'If probable cause exists, arrest the primary aggressor.',
          'Read Miranda Rights post-arrest if questioning about the crime.',
          'Provide the victim(s) with a DV resources pamphlet/card.',
          'Document in the narrative that the victim was provided with resources.',
          'Complete the full offense report, ensuring all elements of Assault/Battery are articulated.',
          'If required, make a DCF report regarding any children involved.',
        ]
      }
    ]
  },
  'burglary-residential-in-progress': {
    id: 'burglary-residential-in-progress',
    name: 'Burglary (Residential) In Progress',
    subtitle: 'F.S. §810.02',
    category: 'Property Crimes',
    icon: 'Home',
    goal: 'To safely clear a structure, apprehend suspects if present, and preserve the crime scene.',
    keyStatutes: ['F.S. §810.02 (Burglary)'],
    initialStepId: 'start',
    walkthrough: {
        'start': {
            phase: 'Dispatch & Tactical Approach',
            title: 'Receiving the Call',
            content: 'Dispatch reports a burglary in progress. Key info: Is the caller the homeowner? Are they inside or outside? Is there a suspect description? Were weapons seen? What was the point of entry?',
            aiTip: 'All responding units should turn off sirens and lights several blocks away to maintain a silent approach. Determine rally points before arriving.',
            choices: [{ text: "Arriving near scene.", nextStepId: "arrival" }]
        },
        'arrival': {
            phase: 'Perimeter & Containment',
            title: 'Containment and Observation',
            content: 'You are the first unit on scene. What is your primary job?',
            aiTip: 'Containment and observation from a position of cover. Do not rush to the front door. The first two units should cover the primary corners of the structure to observe all points of exit.',
            choices: [{ text: "Perimeter is set. Any suspects seen?", nextStepId: "perimeter_check" }]
        },
        'perimeter_check': {
            phase: 'Perimeter & Containment',
            title: 'Perimeter Check',
            content: 'You are holding the perimeter and observing the residence.',
            choices: [{ text: "Yes, suspect is seen exiting.", nextStepId: "suspect_exiting" }, { text: "No, no suspect seen.", nextStepId: "entry_decision" }]
        },
        'suspect_exiting': {
            phase: 'Perimeter & Containment',
            title: 'Suspect Seen Exiting',
            content: 'Give clear verbal commands from cover. Initiate a felony stop procedure. Do not abandon the perimeter until the suspect is in custody and it\'s confirmed they were acting alone.',
            isEnd: true
        },
        'entry_decision': {
            phase: 'Building Entry & Search',
            title: 'Entry Decision',
            content: 'Based on all available information, do you believe the suspect is still inside the residence?',
            choices: [{ text: "Yes, believe suspect is inside.", nextStepId: "make_entry" }, { text: "No, believe suspect is gone.", nextStepId: "hold_perimeter" }]
        },
        'make_entry': {
            phase: 'Building Entry & Search',
            title: 'Making Entry',
            content: "Form an entry team (minimum two officers). Announce your presence loudly ('Police Department! Come out with your hands up!'). Begin a slow, methodical search.",
            aiTip: "Do not enter through the same point of entry as the burglar if possible. They may be watching it. Be mindful of 'fatal funnels' like doorways and hallways.",
            choices: [{ text: "A suspect is located inside.", nextStepId: "suspect_found" }, { text: "The structure is clear, no suspect found.", nextStepId: "structure_clear" }]
        },
        'hold_perimeter': {
            phase: 'Building Entry & Search',
            title: 'Holding Perimeter (Suspect Gone)',
            content: 'Do not enter. Hold the perimeter and treat the location as a crime scene. Wait for the homeowner/keyholder to arrive to avoid contaminating evidence.',
            isEnd: true
        },
        'suspect_found': {
            phase: 'Resolution & Investigation',
            title: 'Suspect Found Inside',
            content: 'You have located and arrested a suspect inside. Secure them away from the main crime scene area. Read Miranda Rights. After the arrest, conduct a final, slower walk-through to ensure no other suspects are present and to identify evidence.',
            choices: [{ text: "Begin scene preservation.", nextStepId: "final_actions" }]
        },
        'structure_clear': {
            phase: 'Resolution & Investigation',
            title: 'Structure Clear (Suspect Gone)',
            content: 'The structure is clear. Once the homeowner arrives, conduct a walk-through with them to determine what, if anything, was stolen. Establish a single entry/exit path to avoid contaminating the scene.',
            choices: [{ text: "Begin scene preservation.", nextStepId: "final_actions" }]
        },
        'final_actions': {
            phase: 'Resolution & Investigation',
            title: 'Scene Investigation',
            content: "The scene is safe. Photograph the scene extensively, especially points of entry/exit. Look for fingerprints, footprints, or tools left behind. Canvass the neighborhood for witnesses and video surveillance.",
            aiLegalNote: 'Your warrantless entry was justified by exigent circumstances (a felony in progress). Once the scene is secure, you need a search warrant for a full forensic search unless you get valid consent from the homeowner.',
            isEnd: true
        }
    },
    staticChecklist: [
      {
        section: 'Tactical Response',
        icon: 'Building',
        items: [
          'Conduct a silent, emergency response approach.',
          'Establish a secure 360-degree perimeter with responding units.',
          'Communicate positions and observations clearly via radio.',
          'If a suspect is inside, make loud announcements before entry.',
          'Conduct a slow, methodical, and safe search of the structure.',
          'If a suspect is apprehended, conduct a safe felony arrest procedure.',
        ]
      },
      {
        section: 'Crime Scene Investigation',
        icon: 'Search',
        items: [
          'After the scene is safe, secure it with crime scene tape.',
          'Create a single path for entry/exit to minimize contamination.',
          'Photograph the entire scene (overall, mid-range, and close-up).',
          'Document and photograph all points of entry and exit.',
          'Identify, flag, and collect any potential evidence (fingerprints, DNA, tools).',
          'Interview the homeowner to get a list of stolen property with serial numbers.',
        ]
      },
      {
        section: 'Reporting & Follow-Up',
        icon: 'FileText',
        items: [
          'Conduct a thorough neighborhood canvass for witnesses or video evidence.',
          'Provide the victim with a case number and victim\'s rights information.',
          'Complete the full offense report for Burglary (F.S. §810.02).',
          'Enter all stolen property with serial numbers into FCIC/NCIC.',
          'If a suspect was arrested, complete all associated arrest paperwork.',
        ]
      }
    ]
  },
  'retail-theft': {
    id: 'retail-theft',
    name: 'Retail Theft (Shoplifting)',
    subtitle: 'F.S. §812.014, §812.015',
    category: 'Property Crimes',
    icon: 'ShoppingCart',
    goal: 'To investigate a retail theft, identify the suspect, recover stolen merchandise, and take appropriate enforcement action based on the value of the goods.',
    keyStatutes: ['F.S. §812.014 (Theft)', 'F.S. §812.015 (Retail Theft)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'You are dispatched to a local business for a shoplifter in custody with Loss Prevention (LP).',
        aiTip: 'While en route, ask dispatch if the suspect is cooperative, their description, and the value of the merchandise. This helps you prepare for your contact.',
        choices: [
          { text: "Arriving at the business.", nextStepId: "arrival" }
        ],
      },
      'arrival': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Contact with Loss Prevention',
        content: 'You meet the LP officer. What are the first three things you need from them?',
        aiTip: '1. The suspect. 2. The stolen merchandise. 3. The video evidence. A good LP officer will have all three ready for you.',
        choices: [
          { text: "LP has suspect, merchandise, and video.", nextStepId: "evidence_gathering" },
          { text: "Suspect has fled (BOLO).", nextStepId: "bolo" }
        ],
      },
      'bolo': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Suspect Fled - BOLO',
        content: 'The suspect fled before your arrival. What information do you need for a BOLO?',
        aiTip: 'Get a detailed description of the suspect, their direction and method of travel (foot/vehicle), and a description of the stolen goods. Broadcast this immediately.',
        choices: [
          { text: "Proceed to gather evidence for a warrant.", nextStepId: "evidence_gathering_bolo" }
        ]
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Reviewing Evidence (Suspect in Custody)',
        content: 'You are reviewing the evidence with LP.',
        aiTip: "Watch the surveillance video with the LP officer. Have them narrate what they saw, specifically pointing out the moment the suspect selected the merchandise and the moment they passed all points of sale without attempting to pay. This establishes intent.",
        choices: [
          { text: "What is the total value of the stolen merchandise?", nextStepId: "value_determination" }
        ]
      },
      'evidence_gathering_bolo': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Reviewing Evidence (For Warrant)',
        content: 'You are reviewing evidence to identify the suspect who fled.',
        aiTip: 'Secure a high-quality copy of the surveillance footage and a receipt for the stolen items. If the suspect used a credit card or loyalty card during any part of their visit, that can be a valuable investigative lead.',
        isEnd: true
      },
      'value_determination': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Determining Value',
        content: 'The LP officer provides you with a receipt for the stolen items.',
        aiLegalNote: 'The value of the merchandise is the single most important factor for charging. Under $100 is Petit Theft (2nd Deg Misd). $100-$749.99 is Petit Theft (1st Deg Misd). $750 or more is Grand Theft (Felony). Confirm the value from an official store receipt.',
        choices: [
          { text: "The value is under $750 (Misdemeanor).", nextStepId: "misdemeanor_theft" },
          { text: "The value is $750 or more (Felony).", nextStepId: "felony_theft" }
        ]
      },
      'misdemeanor_theft': {
        phase: 'Resolution & Enforcement Action',
        title: 'Misdemeanor Theft Resolution',
        content: 'The theft is a misdemeanor. The suspect is identified and cooperative.',
        aiTip: 'For most misdemeanor thefts, issuing a Notice to Appear (NTA) is the most efficient resolution. This saves a trip to the jail and court time. Ensure you have positive ID and the suspect signs the NTA.',
        isEnd: true
      },
      'felony_theft': {
        phase: 'Resolution & Enforcement Action',
        title: 'Felony Theft Resolution',
        content: 'The theft is a felony due to the value of the items.',
        aiLegalNote: 'A felony charge requires a physical arrest and transport to the county jail. Your PC affidavit must clearly state the total value of the stolen goods and reference the store receipt.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Initial Response & Scene Management',
        icon: 'ShoppingCart',
        items: [
          'Respond to the location and contact Loss Prevention (LP).',
          'Secure the suspect if they are detained and not already in a secure office.',
          'Take possession of the stolen merchandise.',
          'Request a copy of the surveillance footage.',
        ],
      },
      {
        section: 'Investigation & Evidence Collection',
        icon: 'Search',
        items: [
          'Watch surveillance video to confirm all elements of the theft.',
          'Obtain a printed receipt detailing the exact value of all stolen items.',
          'Interview the LP officer and obtain a written statement.',
          'Identify the suspect via ID, or run a criminal history check if needed.',
          'Read Miranda rights if you plan to question the suspect about the incident.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Determine the correct charge (Petit or Grand Theft) based on value.',
          'Take appropriate enforcement action: physical arrest for felony, or Notice to Appear (NTA) for misdemeanor.',
          'Return recovered property to the business and have them sign a property receipt.',
          'Complete a detailed offense report including the value of items and PC.',
        ],
      },
    ]
  },
  'traffic-crash-investigation': {
    id: 'traffic-crash-investigation',
    name: 'Traffic Crash Investigation',
    subtitle: 'F.S. §316.061, §316.066',
    category: 'Patrol Operations',
    icon: 'CarCrash',
    goal: 'To safely manage a traffic crash scene, render aid, conduct a thorough investigation, determine the at-fault party, and restore normal traffic flow.',
    keyStatutes: ['F.S. §316.061 (Crashes involving damage)', 'F.S. §316.066 (Written reports of crashes)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'You are dispatched to a vehicle crash. What key information will determine your response mode?',
        aiTip: "The single most important piece of information is 'Are there injuries?' A crash with injuries requires an expedited response (lights and sirens) and an immediate request for Fire/EMS.",
        choices: [
          { text: "Arriving on scene.", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Scene Arrival & Safety',
        content: 'You are the first officer on scene. What are your top 3 priorities?',
        aiTip: '1. Position your vehicle to protect the scene and create a safety lane for other responders. 2. Check for injuries and render aid. 3. Identify all involved vehicles and drivers.',
        choices: [
          { text: "The scene is safe, no major injuries. Begin investigation.", nextStepId: "investigation" }
        ]
      },
      'investigation': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Driver & Witness Interviews',
        content: 'You are beginning your investigation. How should you conduct your interviews?',
        aiTip: 'Separate the drivers and interview them individually. Get their account of what happened. Then, locate independent witnesses; their neutral perspective is invaluable. Ask for license, registration, and insurance from all drivers.',
        choices: [
          { text: "Is this a criminal traffic investigation (e.g., DUI, leaving the scene)?", nextStepId: "criminal_crash" },
          { text: "This is a standard civil traffic investigation.", nextStepId: "civil_crash" }
        ]
      },
      'criminal_crash': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Criminal Crash Investigation',
        content: 'Your investigation reveals evidence of a crime (like DUI). How does this change your approach?',
        aiLegalNote: 'The investigation now requires Miranda warnings before you question the at-fault driver about the criminal aspect. The "accident report privilege" does not apply to criminal investigations. What they tell you for the crash report can be used against them for the criminal charge.',
        choices: [
          { text: "Proceed to gathering physical evidence.", nextStepId: "evidence_gathering" }
        ]
      },
      'civil_crash': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Civil Crash Investigation',
        content: 'This is a non-criminal crash investigation.',
        aiLegalNote: 'Under the "accident report privilege," statements a driver makes to you for the purpose of completing the crash report cannot be used against them in court for a traffic citation. Your citation must be based on your independent evidence (witness statements, physical evidence).',
        choices: [
          { text: "Proceed to gathering physical evidence.", nextStepId: "evidence_gathering" }
        ]
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Documenting Physical Evidence',
        content: 'You are ready to document the physical evidence at the scene.',
        aiTip: 'Look for skid marks, tire marks, debris fields, and damage to vehicles. Photograph everything. These pieces of evidence help you reconstruct the crash and determine fault independently of driver statements.',
        choices: [
          { text: "Do you have conflicting statements from drivers?", nextStepId: "conflicting_statements" },
          { text: "The facts and statements are clear.", nextStepId: "clear_facts" }
        ]
      },
      'conflicting_statements': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Conflicting Statements',
        content: 'The drivers are giving completely different versions of events.',
        aiTip: 'Rely on the physical evidence and independent witness statements to determine fault. If you cannot determine who was at fault based on this independent evidence, you may have to issue no citations and document that the fault was indeterminable.',
        choices: [
          { text: "Investigation complete. Proceed to resolution.", nextStepId: "resolution" }
        ]
      },
      'clear_facts': {
        phase: 'Resolution & Enforcement Action',
        title: 'Determining Fault',
        content: 'The evidence and statements clearly indicate which driver was at fault.',
        aiTip: 'Issue the at-fault driver a citation for the violation that caused the crash (e.g., Failure to Yield, Following Too Closely). Explain the citation and the process to the driver.',
        choices: [
          { text: "Proceed to resolution.", nextStepId: "resolution" }
        ]
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Concluding the Investigation',
        content: 'You have gathered all information and are ready to clear the scene.',
        aiTip: 'Complete your field sketch and notes. Ensure all drivers have exchanged information. Once safe, clear the vehicles and debris from the roadway to restore normal traffic flow. You will complete the official Florida Traffic Crash Report (long or short form) later.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Initial Response & Scene Management',
        icon: 'Siren',
        items: [
          'Position vehicle to protect the scene. Request Fire/EMS if injuries are reported.',
          'Check all parties for injuries and render aid as needed.',
          'Identify and separate all involved drivers and locate independent witnesses.',
          'Secure hazardous areas and direct traffic if necessary.',
        ],
      },
      {
        section: 'Investigation & Evidence Collection',
        icon: 'Search',
        items: [
          'Obtain license, registration, and insurance from all drivers.',
          'Interview all drivers and witnesses separately.',
          'Photograph vehicle damage, final rest positions, skid marks, and the overall scene.',
          'Measure and document skid marks and the location of key evidence for your field sketch.',
          'Determine the at-fault driver based on physical evidence and independent witness statements.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Issue citation(s) to the at-fault driver(s) if applicable.',
          'Provide all drivers with the case number and instructions on how to obtain the report.',
          'Ensure drivers exchange information.',
          'Clear the roadway and restore normal traffic flow.',
          'Complete and submit the official Florida Traffic Crash Report.',
        ],
      },
    ]
  },
  'missing-person-adult': {
    id: 'missing-person-adult',
    name: 'Missing Person (Adult)',
    subtitle: 'F.S. §937.021',
    category: 'General Investigations',
    icon: 'UserSearch',
    goal: 'To conduct a thorough initial investigation for a missing adult, assess risk factors, and initiate appropriate alerts or resources.',
    keyStatutes: ['F.S. §937.021 (Missing Persons Investigations)', 'Silver/Purple Alert criteria'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'You are dispatched to a report of a missing adult.',
        aiTip: 'Ask the reporting person to gather a recent, clear photograph of the missing person before your arrival. This is the single most important tool you will have.',
        choices: [
          { text: "Arriving on scene to meet the complainant.", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Initial Interview',
        content: 'You are meeting with the person reporting the missing individual. What is your primary goal?',
        aiTip: "Your primary goal is to gather a complete description and assess risk. Use a standard agency form if available. Get their full name, DOB, height, weight, hair/eye color, clothing worn, and any distinguishing scars, marks, or tattoos.",
        choices: [
          { text: "Begin risk assessment.", nextStepId: "risk_assessment" }
        ]
      },
      'risk_assessment': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Risk Factor Assessment',
        content: 'You are assessing if the person is missing under endangered circumstances.',
        aiTip: "Ask key questions: Do they have any cognitive impairments (dementia, Alzheimer's)? Any known mental health issues or suicidal statements? Are they dependent on medication they don't have? Is this completely out of character for them?",
        choices: [
          { text: "Does the person meet criteria for a state-level alert (Silver/Purple)?", nextStepId: "alert_criteria_met" },
          { text: "No state-level alert criteria met.", nextStepId: "no_alert" }
        ]
      },
      'alert_criteria_met': {
        phase: 'Scene Control & Initial Investigation',
        title: 'State Alert Criteria Met',
        content: 'The missing person appears to meet criteria for a Silver or Purple Alert.',
        aiLegalNote: 'Silver Alert: 60+ with cognitive impairment OR 18-59 with irreversible deterioration of faculties, and in a vehicle. Purple Alert: 18+ and has a mental/developmental disability and is in danger. You must gather all information to pass to the FDLE Missing Endangered Persons Information Clearinghouse.',
        choices: [
          { text: "Proceed with investigation.", nextStepId: "evidence_gathering" }
        ]
      },
      'no_alert': {
        phase: 'Scene Control & Initial Investigation',
        title: 'No State Alert Criteria',
        content: 'The person is missing, but does not meet the strict criteria for a state-level alert.',
        aiTip: 'The person is still considered missing. Your investigation continues. You must still enter them into FCIC/NCIC as a missing person.',
        choices: [
          { text: "Proceed with investigation.", nextStepId: "evidence_gathering" }
        ]
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Investigative Steps',
        content: 'You are continuing your on-scene investigation.',
        aiTip: "Obtain the photo. Get contact info for their friends and family. Ask about their cell phone number and recent activity. Get a description of their vehicle if applicable. Get consent to search their room/residence for clues (e.g., a note, travel plans).",
        choices: [
          { text: "Have you entered the person into FCIC/NCIC?", nextStepId: "fcic_entry" }
        ]
      },
      'fcic_entry': {
        phase: 'Resolution & Enforcement Action',
        title: 'FCIC/NCIC Entry',
        content: 'You are preparing to enter the missing person into the system.',
        aiLegalNote: 'Florida Statute §937.022 requires law enforcement to enter a missing person into FCIC/NCIC within 2 hours of receiving the report. There is NO 24-hour waiting period to take a missing person report.',
        choices: [
          { text: "The initial investigation is complete.", nextStepId: "resolution" }
        ]
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Concluding Initial Investigation',
        content: 'You have completed your preliminary investigation and documentation.',
        aiTip: 'Broadcast a local BOLO with the photo and description to all units. Provide the complainant with your case number and contact information. The case will be forwarded to detectives for follow-up.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Initial Response & Information Gathering',
        icon: 'UserSearch',
        items: [
          'Obtain a recent photograph of the missing person.',
          'Interview the complainant and gather a full physical description and clothing worn.',
          'Determine the last known location, time, and circumstances of when they were seen.',
          'Assess for any risk factors (medical issues, mental health, foul play suspected).',
        ],
      },
      {
        section: 'Investigation & Resources',
        icon: 'Search',
        items: [
          'Determine if criteria are met for a Silver or Purple Alert.',
          'Obtain contact information for friends, family, and employer.',
          'Gather information on their cell phone, vehicle, and social media habits.',
          'Conduct a preliminary search of the immediate area and their residence.',
          'Broadcast a local BOLO to all patrol units.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Enter the missing person into FCIC/NCIC within the 2-hour state mandate.',
          'Complete a detailed offense/incident report.',
          'Provide the complainant with the case number and your contact information.',
          'Forward all information to the appropriate investigative unit (e.g., detectives).',
        ],
      },
    ]
  },
   'stolen-vehicle-recovery': {
    id: 'stolen-vehicle-recovery',
    name: 'Stolen Vehicle Recovery',
    subtitle: 'F.S. §812.014',
    category: 'Patrol Operations',
    icon: 'KeyRound',
    goal: 'To safely conduct a high-risk traffic stop on an occupied stolen vehicle, apprehend suspects, and recover the vehicle.',
    keyStatutes: ['F.S. §812.014 (Grand Theft of a Motor Vehicle)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Vehicle Identification',
        content: 'You have received an LPR (License Plate Reader) hit or have visually identified a vehicle that is listed as stolen in FCIC/NCIC.',
        aiTip: 'Immediately request backup and confirm the stolen status with dispatch. Do not initiate a stop until backup units are in position. This is now a high-risk stop.',
        choices: [
          { text: "The stolen status is confirmed and backup is arriving.", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'High-Risk Stop Coordination',
        content: 'You and your backup units are in position to conduct a high-risk traffic stop.',
        aiTip: 'Choose a location that offers tactical advantage (e.g., well-lit, open area, away from crowds). The primary unit should be the contact officer giving commands. All other units provide cover.',
        choices: [
          { text: "The stop has been initiated.", nextStepId: "scene_control" }
        ]
      },
      'scene_control': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Verbal Commands & Suspect Removal',
        content: "You are giving loud, clear verbal commands to the occupants of the vehicle.",
        aiTip: 'Use a standard, systematic command sequence. "Driver, show me your hands! Turn off the vehicle! Toss the keys out the window!" Remove occupants one at a time, directing them back to a position of cover.',
        choices: [
          { text: "All occupants are out and secured.", nextStepId: "evidence_gathering" },
          { text: "The vehicle flees.", nextStepId: "vehicle_flees" }
        ]
      },
      'vehicle_flees': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Vehicle Flees',
        content: 'The suspect vehicle has fled from the stop.',
        aiLegalNote: 'Do not pursue unless it meets your agency\'s pursuit policy. The safety of the public outweighs the recovery of the vehicle. Broadcast the vehicle\'s last known direction of travel and request aviation assets if available.',
        isEnd: true
      },
      'evidence_gathering': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Clearing and Securing the Vehicle',
        content: 'All occupants are in custody. What is the next step?',
        aiTip: 'After all occupants are secured, conduct a systematic clear of the vehicle to ensure no one else is hiding inside. Once clear, the vehicle is a crime scene.',
        choices: [
          { text: "Is there evidence of other crimes in plain view?", nextStepId: "plain_view_evidence" },
          { text: "The vehicle is clear.", nextStepId: "resolution" }
        ]
      },
      'plain_view_evidence': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Plain View Evidence',
        content: 'While clearing the vehicle, you observe narcotics or a weapon in plain view.',
        aiLegalNote: 'This plain view observation provides separate probable cause to search the vehicle for additional evidence related to that crime. Your report must articulate what you saw and where you saw it from a lawful vantage point.',
        choices: [
          { text: "Proceed to process the scene.", nextStepId: "resolution" }
        ]
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Processing and Recovery',
        content: 'The scene is secure. How do you process the vehicle?',
        aiTip: 'The vehicle will need to be towed to a secure facility for processing by a forensics unit. They will search for fingerprints, DNA, and other evidence. Document the condition of the vehicle, any damage, and the location of recovery.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Identification & Pre-Stop Actions',
        icon: 'KeyRound',
        items: [
          'Receive LPR hit or visually identify a stolen vehicle.',
          'Confirm stolen status with dispatch via VIN/Tag.',
          'Request backup units and wait for them to get in position.',
          'Select a safe location to conduct a high-risk traffic stop.',
        ],
      },
      {
        section: 'High-Risk Stop & Apprehension',
        icon: 'Search',
        items: [
          'Initiate the stop and provide loud, clear verbal commands.',
          'Direct occupants to show hands, turn off the car, and remove keys.',
          'Call out occupants one at a time and secure them in handcuffs.',
          'Once all occupants are secured, safely clear the interior of the vehicle.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Secure the vehicle as a crime scene.',
          'Conduct a search incident to arrest of all occupants.',
          'Read Miranda warnings to all suspects before questioning.',
          'Arrange for the vehicle to be towed to a secure location for processing.',
          'Notify the original reporting agency and owner of the recovery.',
          'Complete a detailed report documenting the high-risk stop procedures.',
        ],
      },
    ]
  },
  'unattended-death': {
    id: 'unattended-death',
    name: 'Unattended Death Investigation',
    subtitle: 'F.S. §406',
    category: 'Death Investigations',
    icon: 'HeartPulse',
    goal: 'To professionally and respectfully manage an unattended death scene, determine if it is suspicious, and coordinate with the Medical Examiner\'s office.',
    keyStatutes: ['F.S. §406 (Medical Examiners)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'You are dispatched to a residence for a welfare check or a report of an unattended death.',
        aiTip: 'Request EMS to respond with you. Even if death is obvious, EMS can provide an official pronouncement, which is necessary for your report.',
        choices: [
          { text: "Arriving on scene.", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Scene Entry & Assessment',
        content: 'You have arrived and need to make entry. What is your priority?',
        aiTip: "If the door is locked, you may need to force entry for a welfare check. Upon entry, your first priority is to confirm if the person is deceased. Your second priority is to treat the entire scene as a potential crime scene until proven otherwise. Don't touch anything.",
        choices: [
          { text: "The person is confirmed deceased. Begin scene assessment.", nextStepId: "scene_assessment" }
        ]
      },
      'scene_assessment': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Assessing for Suspicious Circumstances',
        content: 'You are conducting a preliminary assessment of the scene.',
        aiTip: 'Look for signs of a struggle, forced entry, or weapons. Note the position of the body. Are there prescription bottles or signs of drug use? Is there a note? Observe everything from a distance.',
        choices: [
          { text: "The death appears suspicious.", nextStepId: "suspicious_death" },
          { text: "The death appears non-suspicious.", nextStepId: "non_suspicious_death" }
        ]
      },
      'suspicious_death': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Suspicious Death Protocol',
        content: 'The circumstances of the death appear suspicious.',
        aiLegalNote: 'This is now a homicide investigation until proven otherwise. Immediately exit the primary scene, secure it with crime scene tape, and notify your supervisor and homicide detectives. Start a crime scene log.',
        isEnd: true
      },
      'non_suspicious_death': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Non-Suspicious Death Investigation',
        content: 'The death appears to be from natural causes or is an obvious suicide.',
        aiTip: 'Even if it appears non-suspicious, limit your movement in the scene. Your job now is to identify the deceased, locate next of kin, and gather information for the Medical Examiner.',
        choices: [
          { text: "Have you notified the Medical Examiner's office?", nextStepId: "me_notified" }
        ]
      },
      'me_notified': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Medical Examiner Notification',
        content: 'You have contacted the on-call Medical Examiner Investigator.',
        aiLegalNote: 'Florida Statute §406.12 requires you to report any unattended death to the ME. The ME has jurisdiction over the body and determines if they will respond to the scene or release the body to a funeral home.',
        choices: [
          { text: "The ME will respond to the scene.", nextStepId: "me_responding" },
          { text: "The ME has released the body.", nextStepId: "me_release" }
        ]
      },
      'me_responding': {
        phase: 'Resolution & Enforcement Action',
        title: 'ME Responding',
        content: "The Medical Examiner's Investigator is en route.",
        aiTip: 'Preserve the scene until the ME Investigator arrives. Do not move or cover the body unless instructed to do so. Prepare a summary of your findings to brief the investigator.',
        isEnd: true
      },
      'me_release': {
        phase: 'Resolution & Enforcement Action',
        title: 'ME Release',
        content: "The Medical Examiner has released the body and will not be responding.",
        aiTip: 'You will need to coordinate with the next of kin to arrange for a funeral home to take custody of the body. Document the name of the ME Investigator who gave the release, the funeral home, and the time of removal in your report.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Initial Response & Scene Management',
        icon: 'HeartPulse',
        items: [
          'Request EMS to respond to the scene.',
          'Make entry and confirm the subject is deceased.',
          'Assess for any immediate threats or hazards.',
          'Treat the location as a crime scene; limit movement and do not touch anything.',
        ],
      },
      {
        section: 'Investigation & Notifications',
        icon: 'Search',
        items: [
          'Look for signs of foul play, forced entry, or a struggle.',
          'Notify your supervisor. If suspicious, notify detectives immediately.',
          'Notify the Medical Examiner\'s office of the death.',
          'Attempt to identify the deceased through ID, mail, or other documents.',
          'Locate contact information for next of kin.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Brief the ME Investigator upon their arrival or document their release instructions.',
          'Assist with notifying next of kin if necessary and per agency policy.',
          'Coordinate with the funeral home for removal if released by ME.',
          'Document all observations, notifications, and actions in a detailed report.',
        ],
      },
    ]
  },
  'serving-arrest-warrant': {
    id: 'serving-arrest-warrant',
    name: 'Serving an Arrest Warrant',
    subtitle: 'F.S. §901.02, §901.16',
    category: 'Patrol Operations',
    icon: 'FileBadge',
    goal: 'To safely and lawfully take a wanted person into custody at a known location based on a valid arrest warrant.',
    keyStatutes: ['F.S. §901.02 (Issuance of arrest warrants)', 'F.S. §901.16 (Method of arrest by officer with warrant)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Warrant Confirmation & Planning',
        content: 'You have received information on the location of a person with an active arrest warrant.',
        aiTip: 'Before taking any action, confirm the warrant is still active and valid through dispatch. Review the warrant for any special conditions (e.g., no-knock, bond amount). Formulate a brief tactical plan.',
        choices: [
          { text: "The warrant is confirmed. Proceed to location.", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Approach and Positioning',
        content: 'You and your backup units have arrived at the location.',
        aiTip: 'Approach with caution. The suspect may be aware of the warrant and could be hostile. Have at least one officer cover the rear of the location to prevent escape.',
        choices: [
          { text: "Ready to make contact at the door.", nextStepId: "contact" }
        ]
      },
      'contact': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Making Contact',
        content: 'You are at the door of the residence where the suspect is believed to be.',
        aiLegalNote: 'Under Payton v. New York, an arrest warrant founded on probable cause implicitly carries the limited authority to enter a dwelling in which the suspect lives when there is reason to believe the suspect is within.',
        choices: [
          { text: "Make contact and announce presence.", nextStepId: "announcement" }
        ]
      },
      'announcement': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Knock and Announce',
        content: 'You knock on the door and announce your presence.',
        aiLegalNote: 'Florida Statute §901.19 requires you to announce your authority and purpose before forcing entry, unless there are exigent circumstances or the warrant specifies "no-knock".',
        choices: [
          { text: "The suspect answers the door and is compliant.", nextStepId: "compliant_arrest" },
          { text: "The suspect refuses to exit or is not at the door.", nextStepId: "forced_entry" }
        ]
      },
      'compliant_arrest': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Compliant Arrest',
        content: 'The suspect has surrendered without incident.',
        aiTip: 'Give clear commands. Handcuff, search incident to arrest, and secure the suspect in a patrol vehicle. Verify their identity against the warrant information.',
        choices: [
          { text: "Suspect is in custody. Proceed to resolution.", nextStepId: "resolution" }
        ]
      },
      'forced_entry': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Forced Entry & Search',
        content: 'After announcing your purpose and being denied entry, you force the door open.',
        aiTip: 'Once entry is made, your priority is locating and securing the suspect. Conduct a methodical search of the structure for the person named in the warrant. This is a search for a person, not for evidence.',
        aiLegalNote: 'The arrest warrant only authorizes you to search for the person named in it, in places where a person could reasonably be hiding. It is not a search warrant for the entire premises.',
        choices: [
          { text: "The suspect is located and arrested.", nextStepId: "resolution" }
        ]
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Post-Arrest Procedures',
        content: 'The wanted person is in custody.',
        aiTip: 'Transport the suspect to the appropriate detention facility. Complete the arrest affidavit and your agency\'s use of force report if applicable. Ensure the warrant is cleared from the system by dispatch or records personnel.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Planning & Approach',
        icon: 'FileBadge',
        items: [
          'Confirm the arrest warrant is active and valid with dispatch.',
          'Review warrant for charges, bond info, and special conditions.',
          'Formulate a tactical plan with backup units.',
          'Approach the location cautiously and establish a perimeter.',
        ],
      },
      {
        section: 'Execution & Arrest',
        icon: 'Search',
        items: [
          'Knock and announce your identity and purpose ("Police, with a warrant!").',
          'If entry is denied or there is no answer, consider forcing entry.',
          'Locate, identify, and secure the suspect.',
          'Conduct a search incident to arrest for weapons or contraband.',
          'Clear the location to ensure no other threats are present.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Transport the prisoner to the appropriate facility.',
          'Notify dispatch to clear the warrant from FCIC/NCIC.',
          'Complete a detailed arrest report and any necessary supplements.',
          'Turn in the original warrant with a "return of service" documenting the arrest.',
        ],
      },
    ]
  },
  'protest-crowd-management': {
    id: 'protest-crowd-management',
    name: 'Protest & Crowd Management',
    subtitle: 'F.S. §870.01, §877.03',
    category: 'Patrol Operations',
    icon: 'Users',
    goal: 'To protect the First Amendment rights of protestors while maintaining public order, protecting property, and ensuring the safety of all parties.',
    keyStatutes: ['F.S. §870.01 (Affrays and riots)', 'F.S. §877.03 (Breach of the peace; disorderly conduct)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Pre-Event Intelligence',
        content: 'You are assigned to a planned protest or demonstration.',
        aiTip: 'Before the event, gather intelligence. What group is protesting? What is their message? Have their past events been violent? What is the planned route or location? This information helps determine staffing and tactical needs.',
        choices: [
          { text: "The event is beginning.", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Initial Deployment & Observation',
        content: 'You are on scene as the crowd gathers.',
        aiTip: 'Maintain a visible but non-confrontational presence. Your initial role is observation. Identify any potential counter-protestors or agitators. Try to make contact with the protest organizers to establish a line of communication.',
        choices: [
          { text: "The protest is peaceful.", nextStepId: "peaceful_protest" },
          { text: "Unlawful activity is beginning.", nextStepId: "unlawful_activity" }
        ]
      },
      'peaceful_protest': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Monitoring a Lawful Assembly',
        content: 'The crowd is lawfully exercising their First Amendment rights.',
        aiLegalNote: 'Citizens have a right to be in public spaces and to express unpopular opinions. Your role is to facilitate this right by providing security, managing traffic, and keeping them separate from any counter-protestors. Do not take enforcement action based on the content of their speech.',
        choices: [
          { text: "An unlawful act occurs.", nextStepId: "unlawful_activity" },
          { text: "The event concludes peacefully.", nextStepId: "resolution_peaceful" }
        ]
      },
      'unlawful_activity': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Unlawful Activity Begins',
        content: 'Members of the crowd are beginning to engage in unlawful acts (e.g., blocking traffic, destroying property, fighting).',
        aiTip: 'Your posture must now shift from monitoring to enforcement. If possible, use a specialized team to make targeted arrests of the specific individuals breaking the law, rather than moving on the entire crowd. This can de-escalate the situation by removing agitators.',
        choices: [
          { text: "Is the entire crowd becoming violent and uncontrollable?", nextStepId: "riot_conditions" },
          { text: "We are making targeted arrests.", nextStepId: "targeted_arrests" }
        ]
      },
      'riot_conditions': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Unlawful Assembly / Riot Conditions',
        content: 'The situation has escalated to a large-scale disturbance.',
        aiLegalNote: 'Before taking widespread enforcement action, a clear dispersal order must be given. This order must be loud, clear, repeated, and give the crowd a reasonable amount of time and a clear exit path to comply. This is a legal prerequisite for an unlawful assembly charge.',
        choices: [
          { text: "Dispersal orders have been given.", nextStepId: "resolution_dispersal" }
        ]
      },
      'targeted_arrests': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Targeted Arrests',
        content: 'You are making arrests of specific violators.',
        aiTip: 'Ensure your body camera is recording. Clearly articulate the specific crime the individual is being arrested for (e.g., "You are under arrest for vandalizing that vehicle."). This is crucial for defending against claims of retaliatory arrest.',
        choices: [
          { text: "Arrests are made. The crowd remains.", nextStepId: "peaceful_protest" }
        ]
      },
      'resolution_peaceful': {
        phase: 'Resolution & Enforcement Action',
        title: 'Peaceful Conclusion',
        content: 'The protest has ended and the crowd is dispersing on its own.',
        aiTip: 'Continue to monitor the area until traffic returns to normal and all groups have left the area to prevent any post-event confrontations.',
        isEnd: true
      },
      'resolution_dispersal': {
        phase: 'Resolution & Enforcement Action',
        title: 'Enforcing Dispersal Order',
        content: 'The crowd has been given lawful orders to disperse but has refused.',
        aiTip: 'Your agency\'s specialized response team (e.g., riot squad) should take the lead. Actions may include use of chemical agents and mass arrest procedures. All actions must be documented thoroughly.',
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Planning & Initial Deployment',
        icon: 'Users',
        items: [
          'Gather intelligence on the protesting group and any counter-protestors.',
          'Establish communication with event organizers if possible.',
          'Deploy resources to monitor and provide security.',
          'Ensure traffic control plans are in place for any marches.',
        ],
      },
      {
        section: 'Scene Management & Enforcement',
        icon: 'Search',
        items: [
          'Protect the First Amendment rights of peaceful protestors.',
          'Keep opposing groups separated to prevent conflict.',
          'Identify and record individuals engaging in criminal acts.',
          'If necessary, use a specialized team to make targeted arrests of law-breakers.',
          'If the assembly becomes unlawful, issue clear and repeated dispersal orders.',
          'Provide a clear and safe exit route for those attempting to comply with dispersal orders.',
        ],
      },
      {
        section: 'Concluding Actions & Paperwork',
        icon: 'FileText',
        items: [
          'Maintain a presence until all crowds have dispersed and order is restored.',
          'Process any arrestees according to department policy.',
          'Document all enforcement actions, including use of force and dispersal orders, in detailed reports.',
          'Debrief with command staff to evaluate the response.',
        ],
      },
    ]
  },
   'active-assailant-response-initial': {
    id: 'active-assailant-response-initial',
    name: 'Active Assailant (Initial Response)',
    subtitle: 'Tactical Emergency Response',
    category: 'Emergency Response',
    icon: 'Siren',
    goal: 'To immediately enter a hostile environment, locate, and neutralize an active threat to stop the killing of innocent persons.',
    keyStatutes: ['N/A (Focus is on immediate tactical action)'],
    initialStepId: 'start',
    walkthrough: {
      'start': {
        phase: 'Initial Information & Arrival',
        title: 'Receiving the Call',
        content: 'Dispatch reports an active shooter at a school, mall, or office building.',
        aiTip: 'This is the most dangerous call you will ever receive. Your mindset must shift immediately from "patrol officer" to "hunter." Your singular goal is to move to the sound of the guns and stop the killing.',
        choices: [
          { text: "I am en route. What is the priority?", nextStepId: "arrival" }
        ]
      },
      'arrival': {
        phase: 'Initial Information & Arrival',
        title: 'Arrival and Entry',
        content: 'You are the first officer arriving on scene.',
        aiTip: "Do not wait for backup. Do not wait for SWAT. The moment you arrive, you must make entry. Every second you wait, more people could be killed. Communicate your point of entry to dispatch.",
        choices: [
          { text: "I am making entry.", nextStepId: "entry" }
        ]
      },
      'entry': {
        phase: 'Scene Control & Initial Investigation',
        title: 'Movement to Threat',
        content: 'You have entered the building. How do you locate the threat?',
        aiTip: "Move to the sound of gunfire. If there is no gunfire, move towards areas with the highest concentration of victims or screams. Bypass wounded victims; you cannot stop to render aid until the threat is neutralized. Your job is to stop the killing.",
        choices: [
          { text: "I have located the assailant.", nextStepId: "contact" }
        ]
      },
      'contact': {
        phase: 'Evidence Gathering & Documentation',
        title: 'Contact with Assailant',
        content: 'You have made contact with the active assailant.',
        aiLegalNote: 'Your use of deadly force is justified to stop the threat to innocent life. Engage the threat immediately and decisively. Do not attempt to negotiate. Do not try to make a routine arrest. Neutralize the threat.',
        choices: [
          { text: "The threat is neutralized.", nextStepId: "threat_neutralized" }
        ]
      },
      'threat_neutralized': {
        phase: 'Resolution & Enforcement Action',
        title: 'Threat Neutralized & Aftermath',
        content: 'The primary assailant is down.',
        aiTip: 'Do not assume the threat is over. There may be more than one attacker. Begin a slow, methodical clear of the immediate area. Be prepared for improvised explosive devices (IEDs). Communicate that the threat is down to responding units.',
        choices: [
          { text: "The immediate area is secure. What now?", nextStepId: "resolution" }
        ]
      },
      'resolution': {
        phase: 'Resolution & Enforcement Action',
        title: 'Transition to Rescue Task Force',
        content: 'Additional officers have arrived on scene.',
        aiTip: "Once the threat is confirmed to be neutralized, the mission transitions. The next wave of officers will form Rescue Task Forces (RTFs) with Fire/EMS personnel to enter the 'warm zone' and begin treating and evacuating the wounded. You may be assigned to provide security for one of these teams.",
        isEnd: true
      }
    },
    staticChecklist: [
      {
        section: 'Initial Response & Entry',
        icon: 'ShieldAlert',
        items: [
          'Immediately recognize the nature of the call and shift to an active-threat mindset.',
          'Upon arrival, make solo entry or form up with the first available officers.',
          'Move directly to the sound of gunfire or other indicators of the threat.',
          'Bypass wounded victims; the priority is to stop the killing.',
        ],
      },
      {
        section: 'Locating & Neutralizing Threat',
        icon: 'Search',
        items: [
          'Utilize cover and concealment while moving through the structure.',
          'Maintain 360-degree awareness.',
          'Upon contact with the assailant, use decisive and effective force to neutralize the threat.',
          'Communicate to dispatch that the threat is down.',
          'Reload and prepare for additional threats; do not assume there is only one assailant.',
        ],
      },
      {
        section: 'Post-Neutralization & Coordination',
        icon: 'FileText',
        items: [
          'Begin a slow, methodical clear of the immediate area.',
          'Be aware of the potential for IEDs.',
          'Link up with other responding officers to establish a unified command.',
          'Transition to providing security for Rescue Task Forces (RTFs) to facilitate medical aid.',
          'Provide a detailed debrief to command staff once relieved.',
        ],
      },
    ]
  },
};
