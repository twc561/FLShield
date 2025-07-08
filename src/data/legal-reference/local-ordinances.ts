export type OrdinanceInfo = {
  id: string;
  title: string;
  icon: string;
  description: string;
  examples: string[];
  officerTakeaway: string;
};

export const localOrdinancesData: OrdinanceInfo[] = [
  {
    id: 'ord1',
    title: 'What are Local Ordinances?',
    icon: 'Home',
    description: 'Local ordinances are laws passed by a city or county government. They regulate issues within that specific jurisdiction and are enforceable by law enforcement, though they are subordinate to state and federal law.',
    examples: [
        'Open Container Laws: Many cities have ordinances prohibiting open containers of alcohol in public areas like parks or streets, which may be more restrictive than state law.',
        'Noise Ordinances: These set specific times and decibel levels for what constitutes a noise violation, giving you objective criteria for enforcement.',
        'Parking Regulations: Ordinances detail where parking is prohibited (e.g., within a certain distance of a fire hydrant or crosswalk).',
        'Juvenile Curfews: Some municipalities have specific hours during which minors are not allowed in public without a valid reason.',
    ],
    officerTakeaway: 'You are expected to know and enforce the ordinances of the jurisdiction you work in. These are often the basis for your initial contact with the public and can be effective tools for addressing quality-of-life issues. Always be sure what you are enforcing is a local ordinance and not just a "common practice."',
  },
  {
    id: 'ord2',
    title: 'Enforcement and Penalties',
    icon: 'Gavel',
    description: 'Enforcement of local ordinances typically results in a civil citation or notice to appear, rather than a physical arrest, though some can be criminal in nature.',
    examples: [
        'A noise ordinance violation usually results in a written warning or a citation with a fine.',
        'An open container violation is typically a non-criminal infraction requiring a citation.',
        'Some ordinances, particularly those mirroring state misdemeanors, can be arrestable offenses. It is crucial to know which is which.',
    ],
    officerTakeaway: 'Confirm your authority to arrest for a specific ordinance violation. Many are non-arrestable, and an unlawful arrest can lead to civil liability and suppression of evidence. The ordinance itself will specify the penalty and enforcement mechanism.',
  },
  {
    id: 'ord3',
    title: 'Ordinances vs. State Statutes',
    icon: 'Scale',
    description: 'A local ordinance cannot conflict with a state statute. If a state law and a local ordinance both cover the same topic, the state law preempts (overrides) the local one if they are in conflict.',
    examples: [
        'Firearms: The state of Florida has preempted all local regulation of firearms. A city cannot create an ordinance banning a type of firearm that is legal under state law.',
        'Traffic: Most moving violations are covered by state statute (Chapter 316). Localities typically only regulate parking and non-moving infractions.',
    ],
    officerTakeaway: 'When in doubt, charge under the state statute. It has broader applicability and avoids any challenges of preemption. However, for issues not covered by state law (like local noise levels), ordinances are your primary tool.',
  },
];
