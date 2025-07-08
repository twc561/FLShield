
export type RuleInfo = {
  id: string;
  title: string;
  ruleNumber: string;
  icon: string;
  summary: string;
  officerImpact: string;
};

export const rulesOfCriminalProcedureData: RuleInfo[] = [
  {
    id: 'rule1',
    title: 'Notice to Appear (NTA)',
    ruleNumber: 'Rule 3.125',
    icon: 'FileText',
    summary: 'This rule authorizes a law enforcement officer to issue a written "Notice to Appear" in lieu of making a physical arrest for misdemeanors and ordinance violations. The NTA is a court summons with a scheduled appearance date.',
    officerImpact: 'This is your primary tool for handling minor offenses without tying up resources with a trip to the jail. Issuing an NTA is considered a "non-custodial arrest." You must be certain of the person\'s identity and that they will appear in court. If they refuse to sign or you believe they won\'t appear, a physical arrest is still an option.',
  },
  {
    id: 'rule2',
    title: 'First Appearance',
    ruleNumber: 'Rule 3.130',
    icon: 'Gavel',
    summary: 'Unless previously released, every arrested person must be taken before a judicial officer within 24 hours of arrest. At this hearing, the judge informs the defendant of the charges, advises them of their right to counsel, and considers the conditions of pretrial release.',
    officerImpact: 'Your probable cause affidavit (PCA) is the primary document the judge uses at this hearing to determine if there was sufficient cause for the arrest. A well-written, detailed PCA that clearly articulates the facts is crucial. If your PCA is weak, the judge may release the defendant on their own recognizance.',
  },
  {
    id: 'rule3',
    title: 'Pretrial Detention and Release',
    ruleNumber: 'Rule 3.131 & 3.132',
    icon: 'Lock',
    summary: 'These rules govern who is entitled to pretrial release and under what conditions. They also outline the procedures for holding a defendant with no bond ("pretrial detention"), which is reserved for specific dangerous crimes when there is a substantial probability the defendant poses a threat to the community.',
    officerImpact: 'When you arrest someone for a serious felony, your report should articulate any facts that suggest the defendant is a danger to the community. This information can be used by the prosecutor to argue for pretrial detention or a high bond amount at first appearance.',
  },
  {
    id: 'rule4',
    title: 'Discovery',
    ruleNumber: 'Rule 3.220',
    icon: 'Search',
    summary: 'This rule governs the exchange of information and evidence between the prosecution and the defense. It requires the prosecutor to disclose a wide range of materials to the defendant, including witness lists, statements, expert reports, and any exculpatory evidence (Brady Material).',
    officerImpact: 'Everything you document can be subject to discovery. This includes your report, notes, body camera footage, and even emails about the case. It also means you may be deposed by the defense attorney, where they can ask you detailed questions about your report and investigation under oath before trial.',
  },
  {
    id: 'rule5',
    title: 'Motion to Suppress Evidence',
    ruleNumber: 'Rule 3.190(g)',
    icon: 'ShieldOff',
    summary: 'This rule allows the defense to file a motion to suppress evidence that was allegedly obtained illegally (e.g., through a search or seizure that violated the Fourth Amendment).',
    officerImpact: 'This is where your actions on the street are scrutinized in court. If a defense attorney files a motion to suppress, you will have to testify about the legal justification for your stop, search, or seizure. If the judge agrees the evidence was obtained illegally, it will be excluded from the trial, often resulting in the case being dismissed.',
  },
];
