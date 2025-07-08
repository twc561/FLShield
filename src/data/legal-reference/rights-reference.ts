
export type RightsInfo = {
  id: string;
  title: string;
  icon: string;
  whenToUse: string;
  script: string;
  officerTakeaway: string;
};

export const rightsReferenceData: RightsInfo[] = [
  {
    id: 'rights1',
    title: 'Miranda Rights (For Suspects)',
    icon: 'MicOff',
    whenToUse: 'Before any CUSTODIAL INTERROGATION. The suspect must be in custody (not free to leave) AND you must be about to ask them incriminating questions about a crime.',
    script: '"You have the right to remain silent. Anything you say can and will be used against you in a court of law. You have the right to an attorney. If you cannot afford an attorney, one will be provided for you. Do you understand the rights I have just read to you? With these rights in mind, do you wish to speak to me?"',
    officerTakeaway: 'Read this verbatim from your agency-issued card. The key is "Custody + Interrogation = Miranda." A routine traffic stop or a consensual encounter is not custody. However, once you make an arrest, or restrain a person to the degree associated with a formal arrest, Miranda applies before questioning.',
  },
  {
    id: 'rights2',
    title: 'Garrity Rights (For Officers)',
    icon: 'ShieldCheck',
    whenToUse: 'During an administrative or internal investigation when you, the officer, are being compelled to answer questions by your department under threat of discipline (like termination).',
    script: '"I am being ordered to provide this statement. I understand that my answers can be used for administrative purposes but are protected from criminal prosecution under Garrity v. New Jersey. This statement is being given under duress and is not voluntary."',
    officerTakeaway: 'Garrity protects you from having a compelled statement used against you in a criminal case. It is your "administrative" version of Miranda. If you are the subject of an internal investigation and are ordered to give a statement, you should invoke your Garrity rights, often with the advice of your union representative or an attorney.',
  },
  {
    id: 'rights3',
    title: 'Weingarten Rights (For Union Employees)',
    icon: 'Users',
    whenToUse: 'For any employee who is a member of a union, during an investigatory interview with their employer that the employee reasonably believes could lead to disciplinary action.',
    script: '"I believe this discussion could lead to disciplinary action being taken against me. I respectfully request that my union representative be present at this meeting before I answer any questions."',
    officerTakeaway: 'This applies to you as a unionized employee. If your supervisor calls you in for an interview that you think could result in discipline (e.g., regarding a citizen complaint), you have the right to have a union rep present. You must make the request; it is not automatic.',
  },
  {
    id: 'rights4',
    title: 'Florida Stop and Frisk Law',
    icon: 'Search',
    whenToUse: 'When you have reasonable suspicion that a person has committed, is committing, or is about to commit a crime, allowing for a temporary detention.',
    script: 'N/A - This is a legal standard you must articulate, not a script read to a suspect.',
    officerTakeaway: 'This is Florida\'s version of Terry v. Ohio (F.S. § 901.151). You can briefly detain someone on reasonable suspicion. You can only conduct a pat-down (frisk) for weapons if you have separate reasonable suspicion to believe the person is armed and dangerous. The frisk is for weapons only, not evidence. Document all facts supporting your suspicion in your report.',
  },
   {
    id: 'rights5',
    title: 'Public Safety Exception to Miranda',
    icon: 'Siren',
    whenToUse: 'When a suspect is in custody but there is an immediate threat to public safety that requires questioning to neutralize the danger. This allows you to ask narrow questions before reading Miranda.',
    script: 'N/A - This is a legal exception, not a script read to a suspect. The questioning must be focused *only* on the immediate threat.',
    officerTakeaway: 'The classic example is asking an armed suspect "Where is the gun?" after they\'ve been arrested in a public place like a supermarket. The question is necessary to protect the public from a loose weapon. You cannot ask, "Where is the gun and why did you rob the bank?" Only the first part is covered by the exception.',
  },
];
