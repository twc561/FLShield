
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
    drugName: 'Acetaminophen (500mg)',
    primaryUse: 'A common over-the-counter pain reliever and fever reducer.',
    keyWarnings: 'Exceeding the maximum daily dose can cause severe liver damage. Avoid drinking alcohol while taking this medication.',
  },
  // The Doxycycline that was being incorrectly identified.
  {
    imprint: '100 Doxy',
    color: 'Blue',
    shape: 'Round',
    drugName: 'Doxycycline Hyclate (100mg)',
    primaryUse: 'A tetracycline antibiotic used to treat a wide variety of bacterial infections.',
    keyWarnings: 'Can increase sun sensitivity. Should be taken with a full glass of water and remain upright for at least 30 minutes to prevent throat irritation. Do not take with dairy or calcium supplements.',
  },
  // Common antibiotic
  {
    imprint: 'AMOXI 875',
    color: 'White',
    shape: 'Oval',
    drugName: 'Amoxicillin (875mg)',
    primaryUse: 'A penicillin-type antibiotic used to treat bacterial infections such as pneumonia, bronchitis, and infections of the ear, nose, throat, urinary tract, and skin.',
    keyWarnings: 'Do not use if you have a known allergy to penicillin. Complete the full course of treatment as prescribed by a doctor, even if symptoms improve.',
  },
  // Common anti-inflammatory
  {
    imprint: 'IBU 800',
    color: 'White',
    shape: 'Oval',
    drugName: 'Ibuprofen (800mg)',
    primaryUse: 'A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, fever, and inflammation.',
    keyWarnings: 'May increase the risk of heart attack or stroke. Can cause stomach bleeding. Should be taken with food or milk to reduce stomach upset.',
  },
  // Common controlled substance (opioid)
  {
    imprint: 'M523',
    color: 'White',
    shape: 'Oval',
    drugName: 'Oxycodone/Acetaminophen (10/325mg)',
    primaryUse: 'An opioid pain medication used to treat moderate to severe pain. Also known by brand names like Percocet.',
    keyWarnings: 'High potential for addiction, abuse, and misuse, which can lead to overdose and death. Do not consume with alcohol. Causes respiratory depression.',
  }
];
