
export type UpdateInfo = {
  id: string;
  title: string;
  date: string;
  type: 'Statute Change' | 'Case Law';
  icon: 'Newspaper' | 'Gavel';
  summary: string;
  officerImpact: string;
};

// NOTE: This data is for demonstration purposes. In a real-world application, this content would be
// populated from a frequently updated legal database or news feed.
export const statutoryCaseLawUpdatesData: UpdateInfo[] = [
  {
    id: 'update1',
    title: 'New "Permitless Carry" Law',
    date: 'Effective July 1, 2023',
    type: 'Statute Change',
    icon: 'Newspaper',
    summary: 'House Bill 543 amended Florida Statutes to allow eligible individuals to carry a concealed weapon or firearm without a government-issued permit. It does not change who is eligible to own or possess a firearm, only the requirement for a permit to carry concealed.',
    officerImpact: 'You can no longer demand to see a concealed weapons permit from someone lawfully carrying concealed. A Terry stop must still be based on reasonable suspicion of a crime, not just the presence of a firearm. The list of prohibited persons (convicted felons, etc.) and prohibited places (courthouses, schools) remains the same.',
  },
  {
    id: 'update2',
    title: 'Vega v. Tekoh (U.S. Supreme Court)',
    date: 'June 23, 2022',
    type: 'Case Law',
    icon: 'Gavel',
    summary: 'The Supreme Court ruled that a violation of Miranda rules is not, by itself, a violation of the Fifth Amendment for which an officer can be sued civilly under § 1983.',
    officerImpact: 'This ruling protects you from being personally sued in a civil rights lawsuit for a Miranda violation. However, the primary consequence remains: any statement obtained in violation of Miranda will be suppressed in the criminal case. The incentive to get Miranda right is still extremely high, as it directly impacts the strength of your case.',
  },
  {
    id: 'update3',
    title: 'Fentanyl Penalty Enhancements',
    date: 'Effective October 1, 2022',
    type: 'Statute Change',
    icon: 'Newspaper',
    summary: 'A new state law enhanced penalties for trafficking in fentanyl and other synthetic opioids, making it a capital felony to sell fentanyl that results in a death.',
    officerImpact: 'For any overdose death, the investigation must now include a focus on identifying the dealer who supplied the narcotics. Your evidence collection at the scene, including the victim\'s phone and paraphernalia, is critical for tracing the drugs back to the source for a potential homicide prosecution.',
  },
];
