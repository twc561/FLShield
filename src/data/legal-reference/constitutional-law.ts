
export type ConstitutionalAmendment = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  keyPoints: { title: string; text: string }[];
  officerTakeaway: string;
};

export const constitutionalLawData: ConstitutionalAmendment[] = [
  {
    id: 'amendment4',
    title: 'Fourth Amendment',
    icon: 'Search',
    summary: 'Protects people from unreasonable searches and seizures. This means the government can’t search you, your home, or your belongings without a warrant or probable cause.',
    keyPoints: [
      { title: 'Reasonable Expectation of Privacy', text: 'The standard for whether a "search" occurred. The Fourth Amendment protects people, not places. The key question is whether a person has a subjective expectation of privacy that society recognizes as reasonable.' },
      { title: 'Warrant Requirement', text: 'A warrant, based on probable cause sworn by affidavit and describing with particularity the place to be searched and items to be seized, is the default. Searches without a warrant are presumptively unreasonable.' },
      { title: 'Exclusionary Rule', text: 'Evidence obtained in violation of the Fourth Amendment is generally inadmissible in court (Mapp v. Ohio). This is the "fruit of the poisonous tree" doctrine.' },
      { title: 'Florida Stop and Frisk Law', text: 'Florida Statute § 901.151 codifies the principles of Terry v. Ohio, allowing an officer to temporarily detain a person based on reasonable suspicion of a crime and conduct a pat-down for weapons if there is reasonable suspicion they are armed.' }
    ],
    officerTakeaway: 'This is the most important amendment for your day-to-day job. Every stop, frisk, search, and arrest you make is governed by the Fourth Amendment. Knowing the warrant exceptions (consent, exigent circumstances, search incident to arrest, automobile exception) is critical to ensuring your evidence is admissible.',
  },
  {
    id: 'amendment5',
    title: 'Fifth Amendment',
    icon: 'MicOff',
    summary: 'Guarantees the right to a grand jury, forbids “double jeopardy,” and protects against self-incrimination. It also requires that “due process of law” be part of any proceeding that denies a citizen “life, liberty or property.”',
    keyPoints: [
      { title: 'Right to Remain Silent', text: 'Suspects cannot be compelled in any criminal case to be a witness against themselves.' },
      { title: 'Miranda v. Arizona', text: 'This case established the requirement to inform suspects in custody of their right to remain silent and right to an attorney before interrogation begins.' },
      { title: 'Garrity Rights', text: 'A protection for public employees (including LEOs), ensuring that statements compelled during an administrative investigation cannot be used against them in a criminal prosecution.' },
    ],
    officerTakeaway: 'This is the foundation of Miranda rights. The key is "Custody + Interrogation = Miranda." Understanding the difference between a pre-arrest interview and a post-arrest custodial interrogation is key to protecting the admissibility of a confession.',
  },
  {
    id: 'amendment6',
    title: 'Sixth Amendment',
    icon: 'Gavel',
    summary: 'Guarantees the rights of criminal defendants, including the right to a speedy and public trial, the right to a lawyer, the right to an impartial jury, and the right to know who your accusers are and the nature of the charges and evidence against you.',
    keyPoints: [
      { title: 'Right to Counsel', text: 'A defendant has the right to have an attorney present at all critical stages of a criminal proceeding (Gideon v. Wainwright). This right attaches once formal charges are filed ("adversarial judicial proceedings have been initiated").' },
      { title: 'Speedy Trial', text: 'Florida Rule of Criminal Procedure 3.191 sets specific time limits: 90 days for a misdemeanor, 175 days for a felony.' },
      { title: 'Confrontation Clause', text: 'A defendant has the right to confront witnesses who are testifying against them. Your report is not testimony, but you will have to testify in person about its contents.' },
    ],
    officerTakeaway: 'This amendment governs what happens after you make an arrest. Once a suspect invokes their Sixth Amendment right to counsel (after being charged), you cannot question them about that charge without their lawyer present, even if they agree to talk.',
  },
  {
    id: 'amendment1',
    title: 'First Amendment',
    icon: 'MessageSquare',
    summary: 'Protects several basic freedoms: freedom of religion, speech, the press, the right to assemble peacefully, and the right to petition the government.',
    keyPoints: [
      { title: 'Freedom of Speech', text: 'Protects most forms of speech, but not incitement to imminent lawless action, "fighting words," or true threats.' },
      { title: 'Right to Assemble', text: 'People have the right to gather peacefully. You can enforce reasonable, content-neutral time, place, and manner restrictions.' },
      { title: 'Right to Record', text: 'Florida courts, in line with federal circuits, have affirmed the right of citizens to record police officers in public spaces, as long as they are not physically interfering with your duties or violating a reasonable expectation of privacy.' },
    ],
    officerTakeaway: 'People have the right to say offensive things to you and to record you. Your actions must be based on unlawful conduct, not protected speech. A valid arrest for an actual crime (e.g., disorderly conduct, resisting without violence) is the best defense against a First Amendment retaliatory arrest claim.',
  },
   {
    id: 'amendment14',
    title: 'Fourteenth Amendment',
    icon: 'Landmark',
    summary: 'Grants citizenship to all persons born or naturalized in the U.S. and guarantees all citizens “equal protection of the laws.” It also incorporates most of the Bill of Rights, making them applicable to state and local governments.',
    keyPoints: [
      { title: 'Due Process Clause', text: 'Prevents states from depriving any person of life, liberty, or property without due process of law. This is the mechanism that applies the 4th, 5th, and 6th Amendments to your actions as a state/local officer.' },
      { title: 'Equal Protection Clause', text: 'Requires that individuals in similar situations be treated equally by the law. It is the constitutional basis for prohibiting discriminatory policing practices.' },
    ],
    officerTakeaway: 'This amendment is the constitutional bridge that makes the federal Bill of Rights apply to you. It demands fair procedures and unbiased enforcement in all your duties, from traffic stops to arrests.',
  },
];
