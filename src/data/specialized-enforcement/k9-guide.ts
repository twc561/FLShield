
export type K9Topic = {
  id: string;
  title: string;
  icon: string;
  description: string;
  points: { caseName?: string; summary: string }[];
  takeaway: string;
};

export const k9Data: K9Topic[] = [
  {
    id: "k9-sniff",
    title: "The K-9 Sniff & Vehicle Searches",
    icon: "Car",
    description: "Key case law governing the use of narcotics K-9s during traffic stops.",
    points: [
      {
        caseName: "Florida v. Harris (2013)",
        summary: "An alert by a well-trained and certified narcotics dog is sufficient to establish probable cause to search a vehicle. Reliability is based on the dog's training and certification records, not its field performance statistics.",
      },
      {
        caseName: "Illinois v. Caballes (2005)",
        summary: "A dog sniff of the exterior of a car during a lawful traffic stop is NOT a Fourth Amendment search, as long as it does not prolong the stop.",
      },
      {
        caseName: "Rodriguez v. United States (2015)",
        summary: "An officer cannot extend a completed traffic stop, even for a few minutes, to wait for a K-9 to arrive. The traffic stop's mission ends when the ticket or warning is issued. Any further detention requires separate reasonable suspicion.",
      },
    ],
    takeaway: "Your K-9's training records are paramount. A sniff is not a search, but the detention of the driver is. Articulate in your report why the sniff did not unreasonably prolong the stop, or what separate reasonable suspicion you had to justify a longer detention.",
  },
  {
    id: "k9-residence",
    title: "K-9 Sniffs at a Residence",
    icon: "Home",
    description: "Using a K-9 at a person's home has stricter rules than a vehicle.",
    points: [
      {
        caseName: "Florida v. Jardines (2013)",
        summary: "Using a drug-sniffing dog on a homeowner's porch (curtilage) to investigate the contents of the home is a search and requires a warrant.",
      },
      {
        summary: "The curtilage is the area immediately surrounding a home (e.g., front porch, attached driveway, fenced yard) where a person has a reasonable expectation of privacy.",
      },
    ],
    takeaway: "You cannot bring your K-9 onto the curtilage of a home for an exploratory sniff without a warrant. The front door is off-limits. However, a sniff from a public sidewalk or street is generally permissible.",
  },
  {
    id: "k9-force",
    title: "K-9 as a Use of Force",
    icon: "ShieldAlert",
    description: "The deployment of a K-9 for apprehension is a significant use of force.",
    points: [
      {
        caseName: "Graham v. Connor (1989)",
        summary: "A K-9 bite is a 'seizure' under the Fourth Amendment and must be objectively reasonable. The 'Graham Factors' apply: severity of the crime, whether the suspect is an immediate threat, and whether they are actively resisting or fleeing.",
      },
      {
        summary: "You must give a verbal warning that a K-9 will be released if it is feasible and safe to do so. This gives the suspect a chance to surrender.",
      },
    ],
    takeaway: "Your report must articulate a clear justification for the K-9 deployment. Detail the suspect's actions, the threat they posed, and why the K-9 was a reasonable tool for apprehension under the circumstances. Always document your warnings.",
  },
  {
    id: "k9-docs",
    title: "Documentation & Testimony",
    icon: "FileText",
    description: "Meticulous record-keeping is a handler's best friend in court.",
    points: [
      {
        summary: "Maintain detailed and up-to-date training logs for your K-9. This includes hours, scenarios, finds (positive/negative), and certification results.",
      },
      {
        summary: "Your deployment/utilization logs are also critical. Document every time your K-9 is used in the field, including alerts, searches, and apprehensions.",
      },
      {
        summary: "When testifying, be prepared to describe your K-9's training, alert behavior (passive vs. aggressive), and reliability in a clear and concise manner for the judge and jury.",
      },
    ],
    takeaway: "In court, you are testifying for both yourself and your K-9. Your credibility and your dog's reliability are established through your professional demeanor and your detailed records.",
  },
];
