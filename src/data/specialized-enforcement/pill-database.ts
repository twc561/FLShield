
export type PillInfo = {
  imprint: string;
  color: string;
  shape: string;
  drugName: string;
  primaryUse: string;
  keyWarnings: string;
};

// This is a small, hard-coded database of known pills.
// In a real application, this would be a much larger, managed database.
export const pillDatabase: PillInfo[] = [
  // The Metoprolol the user is testing with.
  {
    imprint: 'M 25',
    color: 'White',
    shape: 'Round',
    drugName: 'Metoprolol Tartrate',
    primaryUse: 'A beta-blocker used to treat high blood pressure, chest pain (angina), and to improve survival after a heart attack.',
    keyWarnings: 'Can cause dizziness and fatigue. Do not stop taking abruptly, as this can cause serious heart problems. May mask signs of low blood sugar in diabetics.',
  },
  // A common controlled substance for contrast.
  {
    imprint: 'E 7',
    color: 'White',
    shape: 'Round',
    drugName: 'Subutex (Buprenorphine)',
    primaryUse: 'Used to treat opioid dependence and addiction.',
    keyWarnings: 'High potential for abuse and addiction. Can cause respiratory distress, especially when combined with other depressants like alcohol or benzodiazepines. Keep away from children.',
  },
  // Another common non-narcotic.
  {
    imprint: 'L484',
    color: 'White',
    shape: 'Capsule-shape',
    drugName: 'Acetaminophen (Tylenol)',
    primaryUse: 'A common over-the-counter pain reliever and fever reducer.',
    keyWarnings: 'Exceeding the maximum daily dose can cause severe liver damage. Avoid drinking alcohol while taking this medication.',
  },
  // The Doxycycline that was being incorrectly identified.
  {
    imprint: '100 Doxy',
    color: 'Blue',
    shape: 'Round',
    drugName: 'Doxycycline Hyclate',
    primaryUse: 'A tetracycline antibiotic used to treat a wide variety of bacterial infections.',
    keyWarnings: 'Can increase sun sensitivity. Should be taken with a full glass of water and remain upright for at least 30 minutes to prevent throat irritation. Do not take with dairy or calcium supplements.',
  }
];
