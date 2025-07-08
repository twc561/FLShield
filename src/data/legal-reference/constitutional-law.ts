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
      { title: 'Reasonable Expectation of Privacy', text: 'The standard for whether a "search" occurred. Does a person expect privacy, and is that expectation reasonable?' },
      { title: 'Warrant Requirement', text: 'A warrant, based on probable cause and describing the place to be searched and items to be seized, is the default.' },
      { title: 'Exclusionary Rule', text: 'Evidence obtained in violation of the Fourth Amendment is generally inadmissible in court (Mapp v. Ohio).' },
    ],
    officerTakeaway: 'This is the most important amendment for your day-to-day job. Every stop, frisk, search, and arrest you make is governed by the Fourth Amendment. Knowing the warrant exceptions (consent, exigent circumstances, search incident to arrest, automobile exception) is critical.',
  },
  {
    id: 'amendment5',
    title: 'Fifth Amendment',
    icon: 'MicOff',
    summary: 'Guarantees the right to a grand jury, forbids “double jeopardy,” and protects against self-incrimination. It also requires that “due process of law” be part of any proceeding that denies a citizen “life, liberty or property.”',
    keyPoints: [
      { title: 'Right to Remain Silent', text: 'Suspects cannot be compelled to provide self-incriminating testimony.' },
      { title: 'Miranda v. Arizona', text: 'This case established the requirement to inform suspects in custody of their right to remain silent and right to an attorney before interrogation.' },
      { title: 'Due Process', text: 'Ensures that legal proceedings are fair and that citizens are given notice and an opportunity to be heard.' },
    ],
    officerTakeaway: 'This is the foundation of Miranda rights. Once a suspect is in custody, any interrogation requires a valid Miranda waiver. Understanding the difference between a pre-arrest interview and a post-arrest custodial interrogation is key.',
  },
  {
    id: 'amendment6',
    title: 'Sixth Amendment',
    icon: 'Gavel',
    summary: 'Guarantees the rights of criminal defendants, including the right to a public trial without unnecessary delay, the right to a lawyer, the right to an impartial jury, and the right to know who your accusers are and the nature of the charges and evidence against you.',
    keyPoints: [
      { title: 'Right to Counsel', text: 'A defendant has the right to have an attorney present at all critical stages of a criminal proceeding (Gideon v. Wainwright). This right attaches once formal charges are filed.' },
      { title: 'Speedy Trial', text: 'Protects a defendant from being held indefinitely without trial.' },
      { title: 'Confrontation Clause', text: 'A defendant has the right to confront witnesses who are testifying against them.' },
    ],
    officerTakeaway: 'This amendment governs what happens after you make an arrest. Your reports and testimony are critical because the defendant has a right to confront that evidence. Once a suspect invokes their Sixth Amendment right to counsel (after being charged), you cannot question them without their lawyer present.',
  },
  {
    id: 'amendment1',
    title: 'First Amendment',
    icon: 'MessageSquare',
    summary: 'Protects several basic freedoms: freedom of religion, freedom of speech, freedom of the press, the right to assemble, and the right to petition the government.',
    keyPoints: [
      { title: 'Freedom of Speech', text: 'Protects most forms of speech, but not incitement to violence, "fighting words," or true threats.' },
      { title: 'Right to Assemble', text: 'People have the right to gather peacefully. You can enforce time, place, and manner restrictions, but not ban assembly based on the content of their message.' },
      { title: 'Right to Record', text: 'Courts have consistently upheld the right of citizens to record police officers in public spaces, as long as they are not physically interfering with your duties.' },
    ],
    officerTakeaway: 'People have the right to say offensive things to you and to record you. Your actions should not be based on the content of their speech. An arrest must be based on unlawful conduct, not protected speech. A valid arrest based on probable cause is the best defense against a retaliatory arrest claim.',
  },
];
