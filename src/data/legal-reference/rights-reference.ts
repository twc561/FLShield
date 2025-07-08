
export type RightsInfo = {
  id: string;
  title: string;
  legalSource: string;
  plainLanguageSummary: string;
  legalTriggers: {
    title: string;
    explanation: string;
    definitions: {
      term: string;
      definition: string;
    }[];
  };
  keyPrinciples: {
    title: string;
    points: string[];
  };
  keyCase: {
    caseName: string;
    citation: string;
    holding: string;
  };
};

export const rightsReferenceData: RightsInfo[] = [
  {
    id: "RIGHT_GARRITY",
    title: "Garrity Rights (For Officers)",
    legalSource: "Fifth Amendment / Garrity v. New Jersey",
    plainLanguageSummary: "A procedural protection for public employees, including police officers, that prevents statements compelled during an internal, administrative investigation from being used against them in a subsequent criminal prosecution.",
    legalTriggers: {
      title: "When Does This Apply?",
      explanation: "Garrity Rights are triggered when an officer is ordered by their department to give a statement as a condition of their employment during an administrative investigation. The threat of disciplinary action (like termination) for refusing to answer is what makes the statement 'compelled.'",
      definitions: [
        {
          term: "Administrative Investigation",
          definition: "An internal inquiry into potential policy violations, misconduct, or fitness for duty. This is separate from a criminal investigation into whether a law was broken."
        },
        {
          term: "Compelled Statement",
          definition: "An interview where the officer is given a direct order to answer questions and is informed that refusing to answer will result in disciplinary action."
        }
      ]
    },
    keyPrinciples: {
      title: "What You Must Know",
      points: [
        "Garrity is not automatic; you or your representative should assert it.",
        "It provides 'use immunity,' meaning your compelled statement and evidence derived from it cannot be used to prosecute you criminally.",
        "It does NOT protect you from departmental discipline. You can still be fired based on what you say in a Garrity-protected statement.",
        "Refusing a direct order to speak in a purely administrative investigation (after being given Garrity warnings) can be considered insubordination.",
        "If you are being questioned as part of a criminal investigation (not administrative), your standard Fifth Amendment Miranda rights apply."
      ]
    },
    keyCase: {
      caseName: "Garrity v. New Jersey",
      citation: "385 U.S. 493 (1967)",
      holding: "The Supreme Court ruled that a government employee's statements, compelled under the threat of job termination, cannot be used against them in a criminal trial."
    }
  },
  {
    id: "RIGHT_WEINGARTEN",
    title: "Weingarten Rights (For Union Employees)",
    legalSource: "National Labor Relations Act / NLRB v. J. Weingarten, Inc.",
    plainLanguageSummary: "The right of a unionized employee to have a union representative present during an investigatory interview that the employee reasonably believes could lead to disciplinary action.",
    legalTriggers: {
      title: "When Does This Apply?",
      explanation: "This right applies to you as a union member. It triggers specifically during an 'investigatory interview'—a meeting with a supervisor or internal affairs where questions are being asked to obtain information that could be used as a basis for discipline.",
      definitions: [
        {
          term: "Investigatory Interview",
          definition: "A meeting where a supervisor is questioning an employee to obtain information that could be used as a basis for discipline or to investigate the employee's conduct. This is not a routine work instruction or meeting."
        },
        {
          term: "Reasonable Belief",
          definition: "The employee must have a reasonable belief that discipline could result from the interview. This is an objective standard."
        }
      ]
    },
    keyPrinciples: {
      title: "What You Must Know",
      points: [
        "You, the employee, must make a clear request for union representation. It is not automatic and management is not required to inform you of this right.",
        "Once requested, the employer must either grant the request, deny it and end the interview, or offer you the choice of continuing without representation.",
        "The role of the representative is to assist you and act as an observer, not to obstruct the interview.",
        "This right applies specifically to investigatory interviews, not to routine conversations or meetings where discipline is simply being announced."
      ]
    },
    keyCase: {
      caseName: "NLRB v. J. Weingarten, Inc.",
      citation: "420 U.S. 251 (1975)",
      holding: "The Supreme Court affirmed that unionized employees have a right under the National Labor Relations Act to request the presence of a union representative during an investigatory interview."
    }
  },
  {
    id: "RIGHT_STOP_AND_FRISK",
    title: "Florida Stop and Frisk Law (Terry Stop)",
    legalSource: "Fourth Amendment / Terry v. Ohio / F.S. § 901.151",
    plainLanguageSummary: "This law allows an officer to briefly detain a person for investigation if the officer has a reasonable suspicion that the person has committed, is committing, or is about to commit a crime. If the officer also reasonably believes the person is armed and dangerous, they may conduct a limited pat-down for weapons.",
    legalTriggers: {
      title: "When Does This Apply?",
      explanation: "This is a two-part test. First, the 'Stop' is triggered by reasonable suspicion of criminal activity. Second, the 'Frisk' is independently triggered by a reasonable suspicion that the person is armed and dangerous. You can have a valid stop without having grounds to conduct a frisk.",
      definitions: [
        {
          term: "Reasonable Suspicion",
          definition: "More than a mere hunch, but less than probable cause. It must be based on specific, articulable facts and rational inferences from those facts, in light of the officer's experience."
        },
        {
          term: "Frisk (Pat-Down)",
          definition: "A limited search of the outer clothing for weapons only. It is not a search for evidence or contraband."
        }
      ]
    },
    keyPrinciples: {
      title: "What You Must Know",
      points: [
        "The stop must be temporary and last no longer than necessary to effectuate its purpose.",
        "You must be able to articulate every specific fact that led to your suspicion (e.g., time of day, location, suspect's actions, your knowledge of the area).",
        "The frisk is not automatic. You need separate facts to justify the belief the person is armed (e.g., seeing a bulge, suspect reaching for waistband, nature of the suspected crime).",
        "If you feel an object during the frisk whose contour makes its identity as contraband 'immediately apparent' (Plain Feel Doctrine), you may seize it."
      ]
    },
    keyCase: {
      caseName: "Terry v. Ohio",
      citation: "392 U.S. 1 (1968)",
      holding: "The Supreme Court ruled that it is not a violation of the Fourth Amendment for police to stop and frisk a person if they have reasonable suspicion that a crime is afoot and that the person is armed."
    }
  },
  {
    id: "RIGHT_PUBLIC_SAFETY_EXCEPTION",
    title: "Public Safety Exception to Miranda",
    legalSource: "Fifth Amendment / New York v. Quarles",
    plainLanguageSummary: "A narrow exception to the Miranda rule that allows officers to question a suspect in custody *before* reading them their rights, but only when there is an immediate and objective threat to public safety that requires neutralization.",
    legalTriggers: {
      title: "When Does This Apply?",
      explanation: "This exception is triggered by an 'exigency' requiring immediate action to protect police or the public. The classic scenario involves a discarded firearm that could be found by a member of the public. The threat must be immediate and the questions must be aimed at resolving that specific threat.",
      definitions: [
        {
          term: "Exigency",
          definition: "An emergency situation requiring swift action to prevent danger, the destruction of evidence, or the escape of a suspect."
        }
      ]
    },
    keyPrinciples: {
      title: "What You Must Know",
      points: [
        "The questioning must be narrowly tailored to neutralizing the public safety threat. It cannot be investigatory.",
        "Example of a permitted question: 'Where is the gun?'",
        "Example of a question NOT permitted: 'Where is the gun and why did you shoot him?'",
        "Once the immediate threat is resolved (e.g., the weapon is located), the exception ends. Any further questioning requires Miranda warnings.",
        "The officer's subjective motivation for asking the question is not the primary factor; the objective existence of a public safety threat is."
      ]
    },
    keyCase: {
      caseName: "New York v. Quarles",
      citation: "467 U.S. 649 (1984)",
      holding: "The Supreme Court created a 'public safety' exception to the Miranda rule, recognizing that the need to secure public safety can sometimes outweigh the need for the prophylactic Miranda warnings."
    }
  }
];
