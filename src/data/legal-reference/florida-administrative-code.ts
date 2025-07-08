export type FacInfo = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  officerImpact: string;
};

export const floridaAdministrativeCodeData: FacInfo[] = [
  {
    id: 'fac1',
    title: 'What is the Florida Administrative Code (FAC)?',
    icon: 'Building',
    description: 'The FAC is the official compilation of the rules and regulations of Florida\'s state agencies. While the Florida Statutes are the laws passed by the Legislature, the FAC contains the specific rules that agencies create to implement and enforce those laws.',
    details: [
      'It is a massive body of regulations covering everything from environmental protection to professional licensing.',
      'For law enforcement, the most relevant sections are those created by the Florida Department of Law Enforcement (FDLE) and the Department of Highway Safety and Motor Vehicles (DHSMV).',
      'The FAC provides the detailed "how-to" for many statutory requirements.'
    ],
    officerImpact: 'The FAC dictates the specific procedures you must follow for things like officer certification, use of the breathalyzer, and vehicle inspections. Failure to follow these rules can jeopardize a case or even your certification.',
  },
  {
    id: 'fac2',
    title: 'Chapter 11B: Criminal Justice Standards and Training Commission (CJSTC)',
    icon: 'Award',
    description: 'This chapter, administered by FDLE, governs all aspects of law enforcement officer certification, training, and standards of conduct in Florida.',
    details: [
      '11B-27: Sets forth the standards for certification, including moral character requirements and grounds for disciplinary action.',
      '11B-30: Outlines the curriculum requirements for basic recruit training.',
      '11B-35: Details the requirements for mandatory retraining, including firearms qualification and continuing education.'
    ],
    officerImpact: 'This chapter is the rulebook for your career. It defines what can get you decertified (e.g., a felony conviction, false statements, excessive force) and the training you are required to maintain to keep your job.',
  },
  {
    id: 'fac3',
    title: 'Chapter 11D-8: Implied Consent Program (Breath Testing)',
    icon: 'Wind',
    description: 'This chapter contains the highly specific rules for administering breath alcohol tests using the Intoxilyzer or similar instruments.',
    details: [
      'Sets requirements for the approval and registration of breath test instruments.',
      'Defines the qualifications and training required for breath test operators and agency inspectors.',
      'Specifies the exact operational procedures, including observation periods, required checks, and documentation, that must be followed for a breath test to be admissible in court.'
    ],
    officerImpact: 'If you are a breath test operator, you must know these rules inside and out. Any deviation from the procedures outlined in 11D-8 can lead to the suppression of the breath test result in a DUI case, potentially causing the case to be lost.',
  },
];
