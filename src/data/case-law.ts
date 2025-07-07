export type CaseLaw = {
  id: string;
  title: string;
  citation: string;
  summary: string;
  fullText: string;
};

export const caseLaws: CaseLaw[] = [
  {
    id: "cl1",
    title: "Terry v. Ohio",
    citation: "392 U.S. 1 (1968)",
    summary: "Established the 'Terry stop' or 'stop and frisk', allowing police to stop and search a person if they have a reasonable suspicion that the person has committed, is committing, or is about to commit a crime.",
    fullText: `In Terry v. Ohio, 392 U.S. 1 (1968), the Supreme Court of the United States held that the Fourth Amendment prohibition on unreasonable searches and seizures is not violated when a police officer stops a suspect on the street and frisks him or her without probable cause to arrest, if the police officer has a reasonable suspicion that the person has committed, is committing, or is about to commit a crime and has a reasonable belief that the person 'may be armed and presently dangerous.'`
  },
  {
    id: "cl2",
    title: "Miranda v. Arizona",
    citation: "384 U.S. 436 (1966)",
    summary: "Established that criminal suspects, prior to police questioning, must be informed of their constitutional right to an attorney and against self-incrimination.",
    fullText: `Miranda v. Arizona, 384 U.S. 436 (1966), was a landmark decision of the U.S. Supreme Court in which the Court ruled that the Fifth Amendment to the U.S. Constitution restricts prosecutors from using a person's statements made in response to interrogation in police custody as evidence at their trial unless they can show that the person was informed of the right to consult with an attorney before and during questioning, and of the right against self-incrimination before police questioning, and that the defendant not only understood these rights, but voluntarily waived them.`
  },
  {
    id: "cl3",
    title: "Graham v. Connor",
    citation: "490 U.S. 386 (1989)",
    summary: "Established the 'objective reasonableness' standard for use of force by law enforcement officers. The reasonableness of a particular use of force must be judged from the perspective of a reasonable officer on the scene.",
    fullText: `In Graham v. Connor, 490 U.S. 386 (1989), the Supreme Court held that all claims that law enforcement officials have used excessive force—deadly or not—in the course of an arrest, investigatory stop, or other 'seizure' of a free citizen should be analyzed under the Fourth Amendment and its 'objective reasonableness' standard. This standard requires a careful balancing of 'the nature and quality of the intrusion on the individual's Fourth Amendment interests' against the countervailing governmental interests at stake.`
  },
  {
    id: "cl4",
    title: "Tennessee v. Garner",
    citation: "471 U.S. 1 (1985)",
    summary: "Under the Fourth Amendment, a police officer may use deadly force to prevent the escape of a fleeing suspect only if the officer has a good-faith belief that the suspect poses a significant threat of death or serious physical injury to the officer or others.",
    fullText: `Tennessee v. Garner, 471 U.S. 1 (1985), is a civil case in which the Supreme Court of the United States held that, under the Fourth Amendment, when a law enforcement officer is pursuing a fleeing suspect, the officer may not use deadly force to prevent escape unless 'the officer has probable cause to believe that the suspect poses a significant threat of death or serious physical injury to the officer or others.' It was found that use of deadly force to prevent escape is an unreasonable seizure under the Fourth Amendment, in the absence of a significant threat.`
  }
];
