
export type Phrase = {
  phraseID: string;
  category: string;
  englishText: string;
  spanishText: string;
  haitianCreoleText: string;
};

export const translationPhrases: Phrase[] = [
  // Initial Contact & Simple Commands
  {
    phraseID: 'CMD-001',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Hello, I am a police officer.',
    spanishText: 'Hola, soy un oficial de policía.',
    haitianCreoleText: 'Bonjou, mwen se yon ofisye polis.',
  },
  {
    phraseID: 'CMD-002',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Do you speak English?',
    spanishText: '¿Habla usted inglés?',
    haitianCreoleText: 'Èske ou pale Anglè?',
  },
  {
    phraseID: 'CMD-003',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Please calm down.',
    spanishText: 'Por favor, cálmese.',
    haitianCreoleText: 'Tanpri, kalme ou.',
  },
  {
    phraseID: 'CMD-004',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Show me your hands.',
    spanishText: 'Muéstreme las manos.',
    haitianCreoleText: 'Montre m men ou.',
  },
  {
    phraseID: 'CMD-005',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Do not move.',
    spanishText: 'No se mueva.',
    haitianCreoleText: 'Pa deplase.',
  },
  {
    phraseID: 'CMD-006',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Step out of the car.',
    spanishText: 'Salga del carro.',
    haitianCreoleText: 'Soti nan machin nan.',
  },
  {
    phraseID: 'CMD-007',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Turn around slowly.',
    spanishText: 'Dese la vuelta despacio.',
    haitianCreoleText: 'Vire dousman.',
  },
  {
    phraseID: 'CMD-008',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Put your hands behind your back.',
    spanishText: 'Ponga las manos detrás de la espalda.',
    haitianCreoleText: 'Mete men ou dèyè do ou.',
  },
  {
    phraseID: 'CMD-009',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Come here.',
    spanishText: 'Venga aquí.',
    haitianCreoleText: 'Vini isit la.',
  },
  {
    phraseID: 'CMD-010',
    category: 'Initial Contact & Simple Commands',
    englishText: 'Wait here.',
    spanishText: 'Espere aquí.',
    haitianCreoleText: 'Rete tann isit la.',
  },

  // Investigative & Information Gathering Questions
  {
    phraseID: 'INV-001',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'What is your name?',
    spanishText: '¿Cuál es su nombre?',
    haitianCreoleText: 'Kijan ou rele?',
  },
  {
    phraseID: 'INV-002',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'What is your date of birth?',
    spanishText: '¿Cuál es su fecha de nacimiento?',
    haitianCreoleText: 'Ki dat ou fèt?',
  },
  {
    phraseID: 'INV-003',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Do you have identification?',
    spanishText: '¿Tiene identificación?',
    haitianCreoleText: 'Èske ou gen idantifikasyon?',
  },
  {
    phraseID: 'INV-004',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Where do you live?',
    spanishText: '¿Dónde vive usted?',
    haitianCreoleText: 'Ki kote ou rete?',
  },
  {
    phraseID: 'INV-005',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'What happened?',
    spanishText: '¿Qué pasó?',
    haitianCreoleText: 'Sa k te pase?',
  },
  {
    phraseID: 'INV-006',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Are you injured?',
    spanishText: '¿Está herido(a)?',
    haitianCreoleText: 'Èske ou blese?',
  },
  {
    phraseID: 'INV-007',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Do you need paramedics?',
    spanishText: '¿Necesita paramédicos?',
    haitianCreoleText: 'Èske ou bezwen anbilans?',
  },
  {
    phraseID: 'INV-008',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Did you see who did this?',
    spanishText: '¿Vio quién hizo esto?',
    haitianCreoleText: 'Èske ou te wè ki moun ki fè sa?',
  },
  {
    phraseID: 'INV-009',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Can you describe the person?',
    spanishText: '¿Puede describir a la persona?',
    haitianCreoleText: 'Èske ou ka dekri moun nan?',
  },
  {
    phraseID: 'INV-010',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'What direction did they go?',
    spanishText: '¿En qué dirección se fueron?',
    haitianCreoleText: 'Nan ki direksyon yo te ale?',
  },
  {
    phraseID: 'INV-011',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Is anything missing?',
    spanishText: '¿Falta algo?',
    haitianCreoleText: 'Èske gen yon bagay ki manke?',
  },
  {
    phraseID: 'INV-012',
    category: 'Investigative & Information Gathering Questions',
    englishText: 'Do you have a phone?',
    spanishText: '¿Tiene un teléfono?',
    haitianCreoleText: 'Èske ou gen yon telefòn?',
  },

  // Traffic Stop Specific
  {
    phraseID: 'TRF-001',
    category: 'Traffic Stop Specific',
    englishText: 'You were pulled over for speeding.',
    spanishText: 'Lo detuve por exceso de velocidad.',
    haitianCreoleText: 'Mwen te kanpe ou pou vitès.',
  },
  {
    phraseID: 'TRF-002',
    category: 'Traffic Stop Specific',
    englishText: 'You were pulled over for running a red light.',
    spanishText: 'Lo detuve por pasarse una luz roja.',
    haitianCreoleText: 'Mwen te kanpe ou paske ou te pase yon limyè wouj.',
  },
  {
    phraseID: 'TRF-003',
    category: 'Traffic Stop Specific',
    englishText: 'You were pulled over for running a stop sign.',
    spanishText: 'Lo detuve por no parar en la señal de pare.',
    haitianCreoleText: 'Mwen te kanpe ou paske ou pa t kanpe nan siy stop la.',
  },
  {
    phraseID: 'TRF-004',
    category: 'Traffic Stop Specific',
    englishText: 'License, registration, and proof of insurance, please.',
    spanishText: 'Licencia, registración y prueba de seguro, por favor.',
    haitianCreoleText: 'Lisans, anrejistreman, ak prèv asirans, tanpri.',
  },
  {
    phraseID: 'TRF-005',
    category: 'Traffic Stop Specific',
    englishText: 'Please remain in your vehicle.',
    spanishText: 'Por favor, permanezca en su vehículo.',
    haitianCreoleText: 'Tanpri, rete nan machin ou an.',
  },
  {
    phraseID: 'TRF-006',
    category: 'Traffic Stop Specific',
    englishText: 'Do you know why I pulled you over?',
    spanishText: '¿Sabe por qué lo detuve?',
    haitianCreoleText: 'Èske ou konnen poukisa m te kanpe ou?',
  },
  {
    phraseID: 'TRF-007',
    category: 'Traffic Stop Specific',
    englishText: 'Do you have any weapons in the car?',
    spanishText: '¿Tiene armas en el carro?',
    haitianCreoleText: 'Èske ou gen zam nan machin nan?',
  },

  // Legal Warnings & Consent
  {
    phraseID: 'LGL-001',
    category: 'Legal Warnings & Consent',
    englishText: 'You are under arrest.',
    spanishText: 'Está bajo arresto.',
    haitianCreoleText: 'Ou anba arestasyon.',
  },
  {
    phraseID: 'LGL-002',
    category: 'Legal Warnings & Consent',
    englishText: 'You have the right to remain silent.',
    spanishText: 'Tiene derecho a permanecer en silencio.',
    haitianCreoleText: 'Ou gen dwa pou ou pa pale.',
  },
  {
    phraseID: 'LGL-003',
    category: 'Legal Warnings & Consent',
    englishText: 'You have the right to an attorney.',
    spanishText: 'Tiene derecho a un abogado.',
    haitianCreoleText: 'Ou gen dwa a yon avoka.',
  },
  {
    phraseID: 'LGL-004',
    category: 'Legal Warnings & Consent',
    englishText: 'I am not arresting you, but you are being detained.',
    spanishText: 'No lo estoy arrestando, pero está detenido.',
    haitianCreoleText: 'Mwen pa arete ou, men ou anba detansyon.',
  },
  {
    phraseID: 'LGL-005',
    category: 'Legal Warnings & Consent',
    englishText: 'Am I free to go?',
    spanishText: '¿Soy libre de irme?',
    haitianCreoleText: 'Èske m ka ale?',
  },
  {
    phraseID: 'LGL-006',
    category: 'Legal Warnings & Consent',
    englishText: 'Do I have your consent to search your vehicle?',
    spanishText: '¿Tengo su consentimiento para registrar su vehículo?',
    haitianCreoleText: 'Èske m gen konsantman ou pou m fouye machin ou an?',
  },
  {
    phraseID: 'LGL-007',
    category: 'Legal Warnings & Consent',
    englishText: 'Do I have your consent to search your person?',
    spanishText: '¿Tengo su consentimiento para registrar su persona?',
    haitianCreoleText: 'Èske m gen konsantman ou pou m fouye ou?',
  },
  {
    phraseID: 'LGL-008',
    category: 'Legal Warnings & Consent',
    englishText: 'You can say no. This is voluntary.',
    spanishText: 'Puede decir que no. Esto es voluntario.',
    haitianCreoleText: 'Ou ka di non. Sa a se volontè.',
  },
  {
    phraseID: 'LGL-009',
    category: 'Legal Warnings & Consent',
    englishText: 'You are receiving a citation.',
    spanishText: 'Está recibiendo una citación.',
    haitianCreoleText: 'Ou ap resevwa yon sitasyon.',
  },
  {
    phraseID: 'LGL-010',
    category: 'Legal Warnings & Consent',
    englishText: 'Sign here. This is not an admission of guilt.',
    spanishText: 'Firme aquí. Esto no es una admisión de culpabilidad.',
    haitianCreoleText: 'Siyen isit la. Sa a se pa yon admisyon de koupab.',
  },

  // Emergency & Medical
  {
    phraseID: 'EMG-001',
    category: 'Emergency & Medical',
    englishText: 'Is anyone hurt?',
    spanishText: '¿Hay alguien herido?',
    haitianCreoleText: 'Èske gen moun ki blese?',
  },
  {
    phraseID: 'EMG-002',
    category: 'Emergency & Medical',
    englishText: 'Where does it hurt?',
    spanishText: '¿Dónde le duele?',
    haitianCreoleText: 'Ki kote li fè ou mal?',
  },
  {
    phraseID: 'EMG-003',
    category: 'Emergency & Medical',
    englishText: 'We have called for an ambulance.',
    spanishText: 'Hemos llamado a una ambulancia.',
    haitianCreoleText: 'Nou rele yon anbilans.',
  },
  {
    phraseID: 'EMG-004',
    category: 'Emergency & Medical',
    englishText: 'Do you have any medical conditions?',
    spanishText: '¿Tiene alguna condición médica?',
    haitianCreoleText: 'Èske ou gen nenpòt kondisyon medikal?',
  },
  {
    phraseID: 'EMG-005',
    category: 'Emergency & Medical',
    englishText: 'Are you taking any medication?',
    spanishText: '¿Está tomando algún medicamento?',
    haitianCreoleText: 'Èske w ap pran nenpòt medikaman?',
  },
  {
    phraseID: 'EMG-006',
    category: 'Emergency & Medical',
    englishText: 'Stay with me. Help is on the way.',
    spanishText: 'Quédese conmigo. La ayuda está en camino.',
    haitianCreoleText: 'Rete avè m. Èd la ap vini.',
  },
];

    