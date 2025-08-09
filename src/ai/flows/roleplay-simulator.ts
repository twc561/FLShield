
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { analyzeOfficerApproach } from '@/lib/roleplay-utils';
import { 
    ScenarioDefinitionSchema, 
    TurnResponseSchema, 
    AfterActionReportSchema, 
    TurnInputSchema, 
    AARInputSchema,
    SystemLoadSchema,
    schemaVersion
} from '@/lib/echo/types';

// -------- Scenarios Data (Simulated Database) --------

const scenarioData: z.infer<typeof ScenarioDefinitionSchema>[] = [
    // Original Scenarios
    {
        scenarioId: "FP-TS-001",
        category: "Traffic Stop",
        title: "Failure to Maintain Lane on US-1",
        description: "Practice a routine traffic stop that escalates into a potential DUI investigation.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Traffic Stop",
            location: "US Highway 1 near Orange Ave, Fort Pierce, FL",
            notes: "Officer initiated stop on a vehicle observed swerving multiple times. Potential DUI."
        },
        aiPersona: {
            personaId: "P-IN-02",
            type: "Intoxicated Subject",
            description: "Slurring words, fumbling for documents, denies drinking but an odor of alcohol is present.",
            initialState: "Annoyed, attempts to mask intoxication.",
            stressTriggers: ["Accusatory language", "Sudden movements", "Mention of jail"],
            deescalationKeys: ["Calm, patient tone", "Explaining each step clearly", "Offering non-alcoholic beverage (post-arrest)"]
        }
    },
    {
        scenarioId: "FP-DV-002",
        category: "Domestic Dispute",
        title: "Verbal Argument at Apartment Complex",
        description: "Mediate a heated verbal dispute between partners and determine if a crime has occurred.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Domestic Disturbance",
            location: "Apartment complex, St. Cloud, FL",
            notes: "RP states her neighbors are screaming at each other. No weapons seen."
        },
        aiPersona: {
            personaId: "P-AG-01",
            type: "Agitated & Uncooperative",
            description: "Believes the argument is a private matter and police involvement is unnecessary. Defensive and emotional.",
            initialState: "Agitated and defensive.",
            stressTriggers: ["Taking sides", "Dismissing their concerns", "Threatening arrest"],
            deescalationKeys: ["Active listening", "Acknowledging their frustration", "Separating parties to speak privately"]
        }
    },
    // New Scenarios
    {
        scenarioId: "FP-RT-003",
        category: "Retail Theft",
        title: "Shoplifter at Walmart",
        description: "Confront a non-violent shoplifter detained by Loss Prevention.",
        difficulty: "Beginner",
        dispatchInfo: {
            callType: "Retail Theft",
            location: "Walmart, 5100 Okeechobee Rd, Fort Pierce, FL",
            notes: "Loss Prevention has one adult female in custody for shoplifting. Subject is cooperative."
        },
        aiPersona: {
            personaId: "P-RM-01",
            type: "Remorseful & Scared",
            description: "First-time offender, crying, apologetic. Stole baby formula.",
            initialState: "Scared and crying.",
            stressTriggers: ["Yelling", "Threats of long jail time for her kids"],
            deescalationKeys: ["Speaking softly", "Explaining the process", "Treating her with dignity"]
        }
    },
    {
        scenarioId: "FP-TS-004",
        category: "Traffic Stop",
        title: "Speeding and Suspended License",
        description: "Handle a traffic stop where the driver has a suspended license with knowledge.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Traffic Stop",
            location: "Angle Rd, Fort Pierce, FL",
            notes: "Officer initiated stop for excessive speed. Plate returns to a registered owner with a suspended license."
        },
        aiPersona: {
            personaId: "P-DE-01",
            type: "Deceptive & Smooth-talking",
            description: "Tries to talk his way out of the ticket. Feigns ignorance about the suspension.",
            initialState: "Calm and overly friendly.",
            stressTriggers: ["Calling him a liar", "Not letting him speak"],
            deescalationKeys: ["Sticking to the facts", "Calmly explaining the consequences", "Ignoring attempts to change subject"]
        }
    },
    {
        scenarioId: "FP-BC-005",
        category: "Baker Act",
        title: "Mental Health Crisis at Public Park",
        description: "Evaluate an individual for involuntary mental health examination (Baker Act).",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Welfare Check",
            location: "Jaycee Park, Fort Pierce, FL",
            notes: "RP reports a man talking to himself, appears disheveled and is shouting at birds."
        },
        aiPersona: {
            personaId: "P-MH-01",
            type: "Person in Crisis (Paranoid Schizophrenia)",
            description: "Believes he is being followed by spies. Distrustful of authority figures. Not violent, but highly unpredictable.",
            initialState: "Fearful and paranoid.",
            stressTriggers: ["Getting too close too quickly", "Loud commands", "Touching him without warning"],
            deescalationKeys: ["Using his name", "Speaking calmly and slowly", "Explaining you are there to help", "Asking about the 'spies' to build rapport"]
        }
    },
    {
        scenarioId: "FP-SC-006",
        category: "Suspicious Circumstance",
        title: "Loitering Behind Businesses",
        description: "Investigate a person loitering behind a closed shopping center at night.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Suspicious Person",
            location: "Sabal Palm Plaza, US-1, Fort Pierce, FL",
            notes: "RP states a male has been looking into dumpsters behind the businesses for over an hour."
        },
        aiPersona: {
            personaId: "P-WN-01",
            type: "Wary & Non-talkative",
            description: "Homeless individual, suspicious of police. Will not make eye contact. Gives short, one-word answers.",
            initialState: "Wary and withdrawn.",
            stressTriggers: ["Standing over him", "Shining a light in his face", "Demanding answers"],
            deescalationKeys: ["Squatting to his eye level", "Offering water or resources", "Respecting his personal space"]
        }
    },
    {
        scenarioId: "FP-SV-007",
        category: "Sovereign Citizen",
        title: "Traffic Stop with a 'Sovereign Citizen'",
        description: "Navigate a traffic stop with an individual who does not recognize your authority.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Traffic Stop",
            location: "Near St. Lucie County Courthouse, Fort Pierce, FL",
            notes: "Officer initiated stop on a vehicle with an unusual, homemade license plate."
        },
        aiPersona: {
            personaId: "P-SC-01",
            type: "Sovereign Citizen",
            description: "Claims to be a 'free man on the land' and does not consent to the stop. Will ask for your oath of office and challenge your jurisdiction.",
            initialState: "Argumentative and filming.",
            stressTriggers: ["Touching his vehicle without permission", "Debating the law with him", "Impatience"],
            deescalationKeys: ["Extreme patience", "Repeating calm, simple commands", "Having a supervisor respond", "Knowing when to stop talking and start acting"]
        }
    },
    // Adding more scenarios to reach the goal of over 20
    {
        scenarioId: "FP-TC-008",
        category: "Traffic Crash",
        title: "Minor Fender Bender with Disagreement",
        description: "Mediate a minor traffic crash where drivers disagree on fault.",
        difficulty: "Beginner",
        dispatchInfo: {
            callType: "Traffic Accident",
            location: "Intersection of Virginia Ave & 25th St",
            notes: "Two-vehicle, non-injury accident. Both drivers are out of their cars arguing."
        },
        aiPersona: {
            personaId: "P-DF-01",
            type: "Defensive & Blaming",
            description: "Adamantly insists the other driver is at fault. Interrupts and talks over the other party.",
            initialState: "Agitated and loud.",
            stressTriggers: ["Telling him to 'calm down'", "Immediately siding with the other driver"],
            deescalationKeys: ["Separating the parties first", "Interviewing one at a time", "Focusing on physical evidence"]
        }
    },
    {
        scenarioId: "FP-NO-009",
        category: "Noise Complaint",
        title: "Loud Party Complaint",
        description: "Address a loud party and gain compliance from the homeowner.",
        difficulty: "Beginner",
        dispatchInfo: {
            callType: "Noise Complaint",
            location: "Residential area in Tradition",
            notes: "RP reports a neighbor's party has been going on for hours with loud music."
        },
        aiPersona: {
            personaId: "P-AP-01",
            type: "Apologetic & Cooperative",
            description: "Unaware the music was so loud. Is respectful and agrees to turn it down immediately.",
            initialState: "Surprised but cooperative.",
            stressTriggers: ["Threatening fines immediately", "Disrespectful tone"],
            deescalationKeys: ["A polite request", "Explaining the complaint calmly", "Thanking them for their cooperation"]
        }
    },
    {
        scenarioId: "FP-DV-010",
        category: "Domestic Dispute",
        title: "Child Custody Exchange Dispute",
        description: "Handle a civil standby during a contentious child custody exchange.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Civil Standby",
            location: "Public library parking lot",
            notes: "RP requests police presence for a scheduled child custody exchange, citing history of arguments."
        },
        aiPersona: {
            personaId: "P-HC-01",
            type: "High-Conflict Co-parent",
            description: "Tries to use the officer to document alleged violations of the parenting plan. Records the entire interaction.",
            initialState: "Calm but documenting.",
            stressTriggers: ["Taking the other parent's side", "Refusing to take a report for minor civil issues"],
            deescalationKeys: ["Remaining strictly neutral", "Explaining the officer's role is only to keep the peace", "Referring them to family court"]
        }
    },
    {
        scenarioId: "FP-AC-011",
        category: "Animal Call",
        title: "Dog Left in Hot Car",
        description: "Respond to a report of a dog locked in a vehicle on a hot day.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Animal Complaint",
            location: "Publix parking lot, Midway Rd",
            notes: "RP states a small dog is in a car, windows are cracked but it appears to be in distress."
        },
        aiPersona: {
            personaId: "P-IN-03",
            type: "Indignant & Uncaring Owner",
            description: "Returns to the car as you are investigating. Believes they did nothing wrong and that the dog is fine. Angry that you might damage their car.",
            initialState: "Angry and dismissive.",
            stressTriggers: ["Accusations of cruelty", "Lecturing them on animal safety"],
            deescalationKeys: ["Citing the specific statute (F.S. 828.13)", "Focusing on the animal's welfare", "Requesting Animal Control backup"]
        }
    },
    {
        scenarioId: "FP-TP-012",
        category: "Trespass",
        title: "Trespasser at a Gas Station",
        description: "Issue a trespass warning to an individual loitering at a 24/7 gas station.",
        difficulty: "Beginner",
        dispatchInfo: {
            callType: "Trespass Warning",
            location: "7-Eleven, US-1",
            notes: "Clerk requests an individual who is panhandling be trespassed from the property."
        },
        aiPersona: {
            personaId: "P-CO-02",
            type: "Compliant but Forgetful",
            description: "Agrees to leave but may return later out of habit. Has been warned from this location before.",
            initialState: "Passive and agreeable.",
            stressTriggers: ["Aggressive commands"],
            deescalationKeys: ["A clear, simple explanation of the trespass warning", "Checking for prior warnings in the system"]
        }
    },
    {
        scenarioId: "FP-TS-013",
        category: "Traffic Stop",
        title: "Tint Violation with Nervous Driver",
        description: "Conduct a stop for illegal window tint where the driver's behavior raises suspicion.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Traffic Stop",
            location: "Prima Vista Blvd",
            notes: "Officer initiated stop for vehicle with blacked-out windows."
        },
        aiPersona: {
            personaId: "P-NV-01",
            type: "Extremely Nervous Subject",
            description: "Hands are shaking, avoids eye contact, speaks in a shaky voice. No warrants, but is hiding something minor (e.g., a small amount of marijuana).",
            initialState: "Anxious and fidgety.",
            stressTriggers: ["Sudden questions about drugs", "Asking to search the car"],
            deescalationKeys: ["A calm demeanor", "Explaining each step of the stop", "Building rapport before asking investigative questions"]
        }
    },
    {
        scenarioId: "FP-DV-014",
        category: "Domestic Dispute",
        title: "Violation of Injunction",
        description: "Investigate a report that a respondent has violated a domestic violence injunction.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Injunction Violation",
            location: "Petitioner's residence",
            notes: "RP (petitioner) states the respondent, who was served with an injunction, is knocking on her door."
        },
        aiPersona: {
            personaId: "P-MN-01",
            type: "Manipulative & Denying",
            description: "Located nearby. Claims he was 'just checking on her' and didn't know he couldn't do that. Tries to downplay the situation.",
            initialState: "Calm and seemingly reasonable.",
            stressTriggers: ["Not believing his story"],
            deescalationKeys: ["Confirming the injunction and service via dispatch", "Focusing on the specific terms of the order", "Understanding that violation is a mandatory arrest"]
        }
    },
    {
        scenarioId: "FP-WD-015",
        category: "Weapons Disturbance",
        title: "Man with a Holstered Firearm",
        description: "Respond to a 'man with a gun' call where the subject is lawfully open-carrying (post-2023 law change context).",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Suspicious Person with a Weapon",
            location: "Outside of a coffee shop",
            notes: "RP states a man is outside a coffee shop with a handgun on his hip. He is not threatening anyone, just standing there."
        },
        aiPersona: {
            personaId: "P-LA-01",
            type: "Lawful & Assertive Gun Owner",
            description: "Knows his rights regarding Florida's permitless carry laws. Is respectful but will assert his right to carry. Will likely be recording the interaction.",
            initialState: "Calm and observing.",
            stressTriggers: ["Demanding to see his 'permit'", "Unnecessarily drawing a weapon on him", "Telling him he's 'scaring people'"],
            deescalationKeys: ["A professional, conversational approach", "Acknowledging his right to carry", "Explaining the reason for the contact (welfare check based on a call)", "Disengaging professionally once no crime is observed"]
        }
    },
    // Adding even more scenarios
    {
        scenarioId: "FP-AS-016",
        category: "Assault",
        title: "Bar Fight Investigation",
        description: "Investigate a simple battery that occurred inside a bar with conflicting stories.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Fight",
            location: "Downtown Fort Pierce bar",
            notes: "RP reports two men were just in a fistfight. One is still on scene, the other left."
        },
        aiPersona: {
            personaId: "P-IN-04",
            type: "Intoxicated Victim/Aggressor",
            description: "Claims the other guy started it. Smells of alcohol and is slightly belligerent. Injuries are minor.",
            initialState: "Agitated and blaming others.",
            stressTriggers: ["Not taking his side", "Telling him he's drunk"],
            deescalationKeys: ["Getting his side of the story", "Suggesting he file a report when sober", "Checking for independent witnesses or video"]
        }
    },
    {
        scenarioId: "FP-BU-017",
        category: "Burglary",
        title: "Vehicle Burglary Report",
        description: "Take a report for a vehicle burglary that occurred overnight.",
        difficulty: "Beginner",
        dispatchInfo: {
            callType: "Theft Report",
            location: "Residential driveway",
            notes: "RP woke up to find their car was broken into overnight. Wallet and phone stolen."
        },
        aiPersona: {
            personaId: "P-VC-01",
            type: "Frustrated Victim",
            description: "Upset about the theft and feels unsafe. Wants to know what you're going to do to catch the person.",
            initialState: "Frustrated and anxious.",
            stressTriggers: ["Dismissing the value of their loss", "Making no promises about catching the suspect"],
            deescalationKeys: ["Empathizing with their frustration", "Explaining the investigative process (canvassing, evidence)", "Providing a case number and victim resources"]
        }
    },
    {
        scenarioId: "FP-MA-018",
        category: "Marchman Act",
        title: "Overdose and Substance Abuse Crisis",
        description: "Evaluate an individual for involuntary substance abuse assessment (Marchman Act) following a non-fatal overdose.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Medical Assist / Overdose",
            location: "Gas station bathroom",
            notes: "EMS revived a subject found unconscious from a suspected opioid overdose. Subject is now conscious and refusing further treatment."
        },
        aiPersona: {
            personaId: "P-AD-01",
            type: "Post-Overdose Addict",
            description: "Ashamed and just wants to leave. Denies having a problem and refuses to go to the hospital. Poses a danger to self due to likelihood of repeated use.",
            initialState: "Withdrawn and irritable.",
            stressTriggers: ["Moral judgments", "Lecturing about drug use"],
            deescalationKeys: ["Focusing on the immediate danger", "Explaining the Marchman Act as a way to get help, not punishment", "Speaking with empathy about addiction"]
        }
    },
    {
        scenarioId: "FP-FR-019",
        category: "Fraud",
        title: "Contractor Fraud Complaint",
        description: "Take an initial report from an elderly victim of contractor fraud.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Fraud Report",
            location: "Elderly victim's home",
            notes: "RP states she paid a contractor for roof repairs a month ago and he never returned."
        },
        aiPersona: {
            personaId: "P-EV-01",
            type: "Elderly Victim",
            description: "Feels embarrassed and foolish for being scammed. May be confused about dates and details. Has a handwritten contract.",
            initialState: "Embarrassed and sad.",
            stressTriggers: ["Making her feel stupid", "Rushing through the questions"],
            deescalationKeys: ["Patience", "Reassuring her it's not her fault", "Carefully documenting all details from the contract and her memory"]
        }
    },
    {
        scenarioId: "FP-TS-020",
        category: "Traffic Stop",
        title: "Motorcycle Stop with Concealed Weapon",
        description: "Handle a traffic stop on a motorcyclist who has a firearm.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Traffic Stop",
            location: "I-95 Southbound",
            notes: "Officer pacing motorcycle at 95 in a 70."
        },
        aiPersona: {
            personaId: "P-CW-01",
            type: "Compliant but Armed",
            description: "Immediately informs you he has a concealed weapon permit and a firearm on his right hip. Makes no threatening moves.",
            initialState: "Calm and direct.",
            stressTriggers: ["Sudden commands to 'get on the ground'", "Drawing your weapon without a clear threat"],
            deescalationKeys: ["Acknowledging his declaration", "Using clear, calm instructions for securing the firearm if necessary", "Maintaining a professional, non-threatened posture"]
        }
    },
    {
        scenarioId: "FP-CS-021",
        category: "Crime Scene",
        title: "Securing a Homicide Scene",
        description: "Act as the first officer on the scene of a homicide, responsible for scene security.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Shooting",
            location: "Residential Street",
            notes: "Multiple calls for shots fired. One male subject down in the roadway."
        },
        aiPersona: {
            personaId: "P-CH-01",
            type: "Chaotic Bystander",
            description: "A neighbor who witnessed the event. Is hysterical, trying to get to the victim (a family member), and contaminating the scene.",
            initialState: "Hysterical and non-compliant.",
            stressTriggers: ["Ignoring their grief", "Physically pushing them back without explanation"],
            deescalationKeys: ["A firm but empathetic tone", "Assigning a specific officer to handle them away from the scene", "Explaining that preserving the scene is crucial to getting justice"]
        }
    },
    {
        scenarioId: "FP-TP-022",
        category: "Trespass",
        title: "Removing unwanted person from a business",
        description: "A business manager wants a former employee removed from the premises.",
        difficulty: "Beginner",
        dispatchInfo: {
            callType: "Trespass",
            location: "Local restaurant",
            notes: "Manager reports a terminated employee is in the dining area and refusing to leave."
        },
        aiPersona: {
            personaId: "P-DC-01",
            type: "Disgruntled Ex-Employee",
            description: "Feels they were wrongfully terminated. Wants to argue their case. Not violent, but refusing to leave out of principle.",
            initialState: "Argumentative but not threatening.",
            stressTriggers: ["Not listening to their side of the story", "Immediately threatening arrest"],
            deescalationKeys: ["Listening for a moment before acting", "Clearly explaining that the manager has the right to have them leave", "Framing the trespass warning as the next logical step"]
        }
    }
];

// -------- AI Flows --------

/**
 * Returns the library of available training scenarios.
 */
export async function getScenarioLibrary(): Promise<z.infer<typeof SystemLoadSchema>> {
    // In a real app, this would fetch from a database.
    // Here, we just return the hard-coded data.
    return { 
        schemaVersion,
        systemStatus: 'OK',
        scenarioLibrary: scenarioData 
    };
}

/**
 * Processes a single turn in a role-play scenario and returns the AI's response and feedback.
 */
export async function getTurnResponse(input: z.infer<typeof TurnInputSchema>): Promise<z.infer<typeof TurnResponseSchema>> {
    const scenario = scenarioData.find(s => s.scenarioId === input.scenarioId);
    if (!scenario) {
        throw new Error(`Scenario not found: ${input.scenarioId}`);
    }

    const { tone } = analyzeOfficerApproach(input.userAction);
    const feedbackType = tone === 'empathetic' ? 'Positive' : tone === 'aggressive' ? 'Critique' : 'Informational';
    const feedbackMessage = `Your tone was perceived as ${tone}. This is likely to ${tone === 'empathetic' ? 'de-escalate' : 'escalate'} the situation.`;

    const { output } = await ai.generate({
        prompt: `
        You are "Echo," an advanced AI training simulator for Florida Law Enforcement Officers.
        Current Time/Location: Tuesday, July 29, 2025, 9:18 PM, Fort Pierce, FL.
        You are roleplaying a character in a simulation. Your response MUST be from the character's perspective.
        
        SCENARIO: ${scenario.title} (${scenario.description})
        YOUR PERSONA: ${scenario.aiPersona.type}. ${scenario.aiPersona.description}.
        YOUR CURRENT STATE: ${scenario.aiPersona.initialState}.
        YOUR STRESS TRIGGERS: ${scenario.aiPersona.stressTriggers.join(', ')}.
        YOUR DE-ESCALATION KEYS: ${scenario.aiPersona.deescalationKeys.join(', ')}.
        
        CONVERSATION HISTORY:
        ${input.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
        
        USER's LATEST ACTION:
        user: ${input.userAction}

        YOUR TASK:
        Based on the user's action, generate a response adhering to your persona and the strict JSON schema.
        1.  **narratorText**: Describe the scene or your character's body language in the third person. This is what the officer sees and observes.
        2.  **aiDialogue**: Your direct, in-character spoken response.
        3.  **realTimeFeedback**: Provide 1-2 feedback points on the user's last action. The 'type' can be Positive, Critique, Informational, or Context.
        4.  **hudUpdate**: Optionally provide a piece of new information (e.g., license plate check result).
        5.  **isScenarioActive**: Set to 'false' only if the interaction has reached a natural conclusion (e.g., arrest made, subject complies and leaves).
        `,
        output: {
            schema: TurnResponseSchema,
        },
    });
    
    output.realTimeFeedback.push({
        feedbackId: `RTF-${Date.now()}`,
        type: feedbackType,
        message: feedbackMessage,
    });

    return output;
}

/**
 * Generates the final After-Action Report for a completed scenario.
 */
export async function getAfterActionReport(input: z.infer<typeof AARInputSchema>): Promise<z.infer<typeof AfterActionReportSchema>> {
    const scenario = scenarioData.find(s => s.scenarioId === input.scenarioId);
    if (!scenario) {
         throw new Error(`Scenario not found for AAR generation: ${input.scenarioId}`);
    }

    const { output } = await ai.generate({
        prompt: `
        You are "Echo," an AI Training Analyst. The following simulation has concluded.
        
        SCENARIO: ${scenario.title}
        
        FULL CONVERSATION TRANSCRIPT:
        ${input.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
        
        YOUR TASK:
        Analyze the officer's performance throughout the entire transcript and generate a final After-Action Report (AAR).
        1.  **finalOutcome**: Briefly summarize what happened at the end.
        2.  **performanceScore**: Give an overall score from 0-100.
        3.  **performanceGrade**: Give a corresponding letter grade (A+, B-, etc.).
        4.  **keyMetrics**: Score the officer's performance (0-100) in the four specific areas.
        5.  **keyStrengths**: List 1-2 clear, positive actions the officer took.
        6.  **areasForImprovement**: List 1-2 specific, constructive points for improvement.
        7.  **criticalLearningPoints**: Provide 1-2 key takeaways a trainee should learn from this interaction.
        `,
        output: {
            schema: AfterActionReportSchema,
        }
    });
    
    return output;
}

