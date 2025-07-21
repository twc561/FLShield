
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
  // --- Common Beta Blockers (Cardiological) ---
  {
    imprint: 'M 25',
    color: 'White',
    shape: 'Round',
    drugName: 'Metoprolol Tartrate (25mg)',
    primaryUse: 'A beta-blocker used to treat high blood pressure, chest pain (angina), and to improve survival after a heart attack.',
    keyWarnings: 'Can cause dizziness and fatigue. Do not stop taking abruptly, as this can cause serious heart problems. May mask signs of low blood sugar in diabetics.',
  },
  {
    imprint: 'ATN 50',
    color: 'White',
    shape: 'Round',
    drugName: 'Atenolol (50mg)',
    primaryUse: 'A beta-blocker used to treat high blood pressure (hypertension) and chest pain (angina).',
    keyWarnings: 'Should not be stopped suddenly. May worsen symptoms of heart failure in some patients. Can cause fatigue and cold extremities.',
  },

  // --- Common Opioids / Controlled Substances ---
  {
    imprint: 'E 7',
    color: 'White',
    shape: 'Round',
    drugName: 'Subutex (Buprenorphine)',
    primaryUse: 'Used to treat opioid dependence and addiction.',
    keyWarnings: 'High potential for abuse and addiction. Can cause respiratory distress, especially when combined with other depressants like alcohol or benzodiazepines. Keep away from children.',
  },
  {
    imprint: 'M523',
    color: 'White',
    shape: 'Oval',
    drugName: 'Oxycodone/Acetaminophen (10/325mg)',
    primaryUse: 'An opioid pain medication used to treat moderate to severe pain. Also known by brand names like Percocet.',
    keyWarnings: 'High potential for addiction, abuse, and misuse, which can lead to overdose and death. Do not consume with alcohol. Causes respiratory depression.',
  },

  // --- Common Over-the-Counter ---
  {
    imprint: 'L484',
    color: 'White',
    shape: 'Capsule-shape',
    drugName: 'Acetaminophen (500mg)',
    primaryUse: 'A common over-the-counter pain reliever and fever reducer.',
    keyWarnings: 'Exceeding the maximum daily dose can cause severe liver damage. Avoid drinking alcohol while taking this medication.',
  },
  {
    imprint: 'IBU 800',
    color: 'White',
    shape: 'Oval',
    drugName: 'Ibuprofen (800mg)',
    primaryUse: 'A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, fever, and inflammation.',
    keyWarnings: 'May increase the risk of heart attack or stroke. Can cause stomach bleeding. Should be taken with food or milk to reduce stomach upset.',
  },

  // --- Common Antibiotics ---
  {
    imprint: '100 Doxy',
    color: 'Blue',
    shape: 'Round',
    drugName: 'Doxycycline Hyclate (100mg)',
    primaryUse: 'A tetracycline antibiotic used to treat a wide variety of bacterial infections.',
    keyWarnings: 'Can increase sun sensitivity. Should be taken with a full glass of water and remain upright for at least 30 minutes to prevent throat irritation. Do not take with dairy or calcium supplements.',
  },
  {
    imprint: 'AMOXI 875',
    color: 'White',
    shape: 'Oval',
    drugName: 'Amoxicillin (875mg)',
    primaryUse: 'A penicillin-type antibiotic used to treat bacterial infections such as pneumonia, bronchitis, and infections of the ear, nose, throat, urinary tract, and skin.',
    keyWarnings: 'Do not use if you have a known allergy to penicillin. Complete the full course of treatment as prescribed by a doctor, even if symptoms improve.',
  },
  
  // --- Other Common Medications ---
  {
    imprint: 'LUPIN 10',
    color: 'Pink',
    shape: 'Round',
    drugName: 'Lisinopril (10mg)',
    primaryUse: 'An ACE inhibitor used to treat high blood pressure and heart failure.',
    keyWarnings: 'Can cause a dry cough, dizziness, or angioedema (swelling). Monitor kidney function and potassium levels.',
  },
  {
    imprint: 'ATV 20',
    color: 'White',
    shape: 'Round',
    drugName: 'Atorvastatin (Lipitor, 20mg)',
    primaryUse: 'A statin used to lower cholesterol and reduce the risk of heart attack and stroke.',
    keyWarnings: 'Can cause muscle pain or weakness (rhabdomyolysis). Liver function should be monitored. Avoid grapefruit juice.',
  },
  {
    imprint: 'APO 10',
    color: 'White',
    shape: 'Round',
    drugName: 'Amlodipine (Norvasc, 10mg)',
    primaryUse: 'A calcium channel blocker used to treat high blood pressure and chest pain (angina).',
    keyWarnings: 'May cause swelling in the ankles or feet, dizziness, and flushing.',
  },
  {
    imprint: 'KEPPRA 500',
    color: 'Yellow',
    shape: 'Oval',
    drugName: 'Levetiracetam (Keppra, 500mg)',
    primaryUse: 'An anticonvulsant used to treat seizures in people with epilepsy.',
    keyWarnings: 'Can cause mood changes, drowsiness, and dizziness. Do not stop taking suddenly as this can increase seizure frequency.',
  },
  {
    imprint: 'GAB 300',
    color: 'Yellow',
    shape: 'Capsule-shape',
    drugName: 'Gabapentin (Neurontin, 300mg)',
    primaryUse: 'Used to treat seizures and nerve pain. Also sometimes used for anxiety.',
    keyWarnings: 'Can cause significant drowsiness and dizziness. Has potential for abuse and dependence. Do not stop taking abruptly.',
  },
  {
    imprint: 'MET 500',
    color: 'White',
    shape: 'Round',
    drugName: 'Metformin (500mg)',
    primaryUse: 'A first-line medication for the treatment of type 2 diabetes.',
    keyWarnings: 'Can cause gastrointestinal side effects. In rare cases, can lead to a serious condition called lactic acidosis.',
  },
  {
    imprint: 'ZOLOFT 50',
    color: 'Blue',
    shape: 'Oval',
    drugName: 'Sertraline (Zoloft, 50mg)',
    primaryUse: 'An SSRI antidepressant used to treat depression, anxiety, PTSD, and panic disorders.',
    keyWarnings: 'May increase suicidal thoughts in young adults. Do not stop taking abruptly (discontinuation syndrome). Can cause nausea and insomnia.',
  },
  {
    imprint: 'SYNTHROID 100',
    color: 'Green',
    shape: 'Round',
    drugName: 'Levothyroxine (Synthroid, 100mcg)',
    primaryUse: 'A thyroid hormone used to treat hypothyroidism.',
    keyWarnings: 'Must be taken on an empty stomach. Dosage is very specific; taking too much can cause symptoms of hyperthyroidism like a rapid heart rate.',
  },
  // Additional common medications
  {
    imprint: 'XANAX 1.0',
    color: 'Blue',
    shape: 'Oval',
    drugName: 'Alprazolam (Xanax, 1mg)',
    primaryUse: 'A benzodiazepine used to treat anxiety and panic disorders.',
    keyWarnings: 'High potential for addiction and abuse. Can cause severe withdrawal symptoms. Dangerous when combined with alcohol or opioids.',
  },
  {
    imprint: 'V 36 01',
    color: 'Yellow',
    shape: 'Round',
    drugName: 'Hydrocodone/Acetaminophen (Vicodin, 5/500mg)',
    primaryUse: 'An opioid pain medication used to treat moderate to severe pain.',
    keyWarnings: 'High potential for addiction and respiratory depression. Contains acetaminophen which can cause liver damage in high doses.',
  },
  {
    imprint: 'ADDERALL 20 MG',
    color: 'Orange',
    shape: 'Round',
    drugName: 'Amphetamine/Dextroamphetamine (Adderall, 20mg)',
    primaryUse: 'A stimulant used to treat ADHD and narcolepsy.',
    keyWarnings: 'High potential for abuse and dependence. Can cause cardiovascular problems and psychiatric effects.',
  },
  {
    imprint: 'OC 80',
    color: 'Green',
    shape: 'Round',
    drugName: 'OxyContin (Oxycodone, 80mg)',
    primaryUse: 'A long-acting opioid pain medication for severe, chronic pain.',
    keyWarnings: 'Extremely high potential for addiction and fatal overdose. This is a high-dose formulation that can be lethal if misused.',
  },
  {
    imprint: 'TEVA 833',
    color: 'Yellow',
    shape: 'Round',
    drugName: 'Clonazepam (Klonopin, 0.5mg)',
    primaryUse: 'A benzodiazepine used to treat seizures and panic disorder.',
    keyWarnings: 'Can cause dependence and withdrawal symptoms. Dangerous when combined with alcohol or opioids.',
  }
];
