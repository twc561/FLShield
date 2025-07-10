
export type Statute = {
  id: string;
  code: string;
  title: string;
  description: string;
  fullText: string;
  degreeOfCharge: string;
  practicalSummary: string;
  example: string;
  url: string;
  elementsOfTheCrime?: string | null;
  category: string;
};

const allStatutes: Statute[] = [
  // --- Crimes Against Persons ---
  {
    id: 's784-011',
    code: 'F.S. § 784.011',
    title: 'Assault',
    category: 'Crimes Against Persons',
    description: 'Defines the crime of assault as an intentional, unlawful threat by word or act to do violence to the person of another, coupled with an apparent ability to do so, and doing some act which creates a well-founded fear in such other person that such violence is imminent.',
    fullText: 'An “assault” is an intentional, unlawful threat by word or act to do violence to the person of another, coupled with an apparent ability to do so, and doing some act which creates a well-founded fear in such other person that such violence is imminent.',
    degreeOfCharge: 'Second-degree Misdemeanor',
    practicalSummary: "This is a 'threat' crime; no physical contact is required. Your investigation must establish that the suspect's threat was intentional, that they had the ability to carry it out, and that their actions caused a reasonable fear in the victim. The victim's perception is key—did they actually feel that violence was about to happen?",
    example: "A suspect raises their fist, takes an aggressive step towards a victim, and screams 'I'm going to knock you out!' Even though no punch is thrown, the combination of the words, the action (raised fist, step forward), and the victim's resulting fear completes the elements of an assault.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.011.html'
  },
  {
    id: 's784-021',
    code: 'F.S. § 784.021',
    title: 'Aggravated Assault',
    category: 'Crimes Against Persons',
    description: 'Elevates a simple assault to a felony. Occurs when a person commits an assault with a deadly weapon without an intent to kill, or with an intent to commit a felony.',
    fullText: 'An “aggravated assault” is an assault: (a) With a deadly weapon without intent to kill; or (b) With an intent to commit a felony.',
    degreeOfCharge: 'Third-degree Felony',
    practicalSummary: "The key difference from simple assault is the presence of a 'deadly weapon' or the intent to commit another felony. A 'deadly weapon' is anything likely to produce death or great bodily harm. Your report must clearly describe the weapon and how it was used to threaten the victim.",
    example: "A suspect pulls out a knife during an argument and points it at the victim, saying 'I'll cut you.' This is Aggravated Assault because the knife is a deadly weapon used to create fear of imminent violence, elevating it from a misdemeanor to a felony.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.021.html'
  },
  {
    id: 's784-03',
    code: 'F.S. § 784.03',
    title: 'Battery',
    category: 'Crimes Against Persons',
    description: 'Defines the crime of battery as actually and intentionally touching or striking another person against their will, or intentionally causing bodily harm to another person.',
    fullText: 'The offense of battery occurs when a person: 1. Actually and intentionally touches or strikes another person against the will of the other; or 2. Intentionally causes bodily harm to another person.',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: "This is unwanted physical contact. Unlike assault, battery requires touching. It can be as minor as an unwanted poke or as serious as a punch, as long as it's intentional and against the victim's will. Documenting any visible injuries or lack thereof is important, as is the victim's statement that the contact was unwanted.",
    example: "During a heated argument, one person intentionally shoves another. The shove is an intentional, unwanted touching, which constitutes a battery. The severity of injury is not required, only the intentional, unwanted contact.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.03.html'
  },
  {
    id: 's784-041',
    code: 'F.S. § 784.041',
    title: 'Felony Battery',
    category: 'Crimes Against Persons',
    description: 'Elevates a simple battery to a felony. Occurs when a person actually and intentionally strikes another person against their will and, in doing so, causes great bodily harm, permanent disability, or permanent disfigurement.',
    fullText: 'A person commits felony battery if he or she: (a) Actually and intentionally touches or strikes another person against the will of the other; and (b) Causes great bodily harm, permanent disability, or permanent disfigurement.',
    degreeOfCharge: 'Third-degree Felony',
    practicalSummary: "The distinction between misdemeanor battery and felony battery is the level of injury. Your investigation must focus on documenting 'great bodily harm.' This means photographing injuries, getting medical records if possible, and using specific descriptions in your report (e.g., 'deep laceration requiring stitches,' 'broken bone,' 'unconscious') rather than just 'injured.'",
    example: "A suspect punches a victim once, causing the victim to fall and break their arm. Because the battery resulted in 'great bodily harm' (a broken bone), the charge is elevated from a simple misdemeanor battery to a felony battery.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.041.html'
  },
  {
    id: 's784-045',
    code: 'F.S. § 784.045',
    title: 'Aggravated Battery',
    category: 'Crimes Against Persons',
    description: 'A more serious form of battery. It occurs when a person, in committing a battery, intentionally or knowingly causes great bodily harm, uses a deadly weapon, or commits a battery on a victim who was pregnant at the time.',
    fullText: 'A person commits aggravated battery who, in committing battery: (a) Intentionally or knowingly causes great bodily harm, permanent disability, or permanent disfigurement; or (b) Uses a deadly weapon. A person also commits aggravated battery if the person who was the victim of the battery was pregnant at the time of the offense and the offender knew or should have known that the victim was pregnant.',
    degreeOfCharge: 'Second-degree Felony',
    practicalSummary: "Aggravated Battery is a step above Felony Battery. It can be charged in two main ways: 1) The battery was committed with a deadly weapon (e.g., hitting someone with a baseball bat), or 2) The suspect *intended* to cause the severe injury, not just that a severe injury was the result. The third way is if the victim is known to be pregnant. Your investigation should focus on intent and the use of weapons.",
    example: "A suspect attacks a victim with a beer bottle, striking them in the head. Using the bottle as a weapon to commit the battery constitutes Aggravated Battery, regardless of the severity of the injury, because a 'deadly weapon' was used.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.045.html'
  },
  {
    id: 's784-07',
    code: 'F.S. § 784.07',
    title: 'Assault or Battery of LEO, etc.',
    category: 'Crimes Against Persons',
    description: 'Enhances the penalties for assault, aggravated assault, battery, and aggravated battery when the victim is a law enforcement officer, firefighter, emergency medical care provider, or other specified public servant engaged in the lawful performance of their duties.',
    fullText: 'Whenever any person is charged with committing an assault or battery upon a law enforcement officer...while the officer...is engaged in the lawful performance of his or her duties, the offense for which the person is charged shall be reclassified to a higher degree.',
    degreeOfCharge: 'Reclassification/Enhancement',
    practicalSummary: "This is a penalty-enhancement statute, not a standalone crime. If you are assaulted or battered while on duty, the suspect is charged with the underlying crime (e.g., Battery) and this statute is applied to make the charge more severe. Your report must clearly state that you were in uniform, on duty, and performing a lawful function when the offense occurred.",
    example: "During an arrest, a suspect pushes you. The push is a Battery under 784.03. Because you are an on-duty officer, the charge is enhanced by 784.07, making it a felony instead of a misdemeanor.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.07.html'
  },
  {
    id: 's782-04',
    code: 'F.S. § 782.04',
    title: 'Murder',
    category: 'Crimes Against Persons',
    description: "Defines the unlawful killing of a human being and establishes the distinct elements for different degrees of murder. It notably defines first-degree murder as a killing perpetrated with a 'premeditated design' or one committed during the course of another dangerous felony (felony murder).",
    fullText: 'The unlawful killing of a human being: (1)(a) When perpetrated from a premeditated design to effect the death of the person killed or any human being; (b) When committed by a person engaged in the perpetration of, or in the attempt to perpetrate, any specified felony... constitutes murder in the a.first degree.',
    degreeOfCharge: 'First-degree or Capital Felony',
    practicalSummary: "For homicide investigators, this statute directs your focus. For first-degree murder, your investigation must uncover evidence showing the suspect planned or deliberated the killing beforehand. This includes evidence of motive, acquiring a weapon, lying in wait, or making prior threats. For felony murder, you must prove the death occurred during another serious crime like robbery or kidnapping.",
    example: "A suspect breaks into a home to commit a burglary. The homeowner confronts them, and in the ensuing struggle, the homeowner is killed. Even if the suspect didn't specifically intend to kill, because the death occurred during the commission of a felony (burglary), the State can pursue a first-degree murder charge under the felony murder rule of this statute.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0782/Sections/0782.04.html'
  },
  {
    id: 's784-048',
    code: 'F.S. § 784.048',
    title: 'Stalking',
    category: 'Crimes Against Persons',
    description: 'Defines stalking as willfully, maliciously, and repeatedly following, harassing, or cyberstalking another person.',
    fullText: 'Any person who willfully, maliciously, and repeatedly follows, harasses, or cyberstalks another person commits the offense of stalking.',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: 'Stalking requires a pattern of conduct. A single incident is not enough. "Harass" means a course of conduct directed at a specific person which causes substantial emotional distress and serves no legitimate purpose. Cyberstalking involves this pattern using electronic means. Aggravated Stalking is a felony and occurs when the suspect makes a credible threat, violates an injunction, or stalks a minor under 16.',
    example: 'A person repeatedly drives past their ex-partner\'s house, sends them dozens of unwanted text messages daily, and shows up at their workplace uninvited, causing the victim to fear for their safety. This pattern constitutes stalking.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/Sections/0784.048.html'
  },
  {
    id: 's787-01',
    code: 'F.S. § 787.01',
    title: 'Kidnapping',
    category: 'Crimes Against Persons',
    description: 'Defines kidnapping as forcibly, secretly, or by threat confining, abducting, or imprisoning another person against their will and without lawful authority.',
    fullText: 'The term “kidnapping” means forcibly, secretly, or by threat confining, abducting, or imprisoning another person against her or his will and without lawful authority, with intent to: (a) Hold for ransom or reward or as a shield or hostage. (b) Commit or facilitate commission of any felony. (c) Inflict bodily harm upon or to terrorize the victim or another person. (d) Interfere with the performance of any governmental or political function.',
    degreeOfCharge: 'First-degree Felony',
    practicalSummary: 'Kidnapping is the intentional and unlawful confinement of a person against their will by force or threat. The movement of the victim is not necessarily required if they are confined. The charge is often enhanced if it is done to facilitate another felony, like a robbery or sexual battery.',
    example: 'A suspect grabs a victim in a parking lot, forces them into a car at gunpoint, and drives away. This is a clear case of kidnapping.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0787/Sections/0787.01.html'
  },

  // --- Property Crimes ---
  {
    id: 's806-13',
    code: 'F.S. § 806.13',
    title: 'Criminal Mischief',
    category: 'Property Crimes',
    description: 'Defines the crime of willfully and maliciously injuring or damaging any real or personal property belonging to another. The severity of the offense is tiered based on the monetary value of the damage caused.',
    fullText: 'A person commits the offense of criminal mischief if he or she willfully and maliciously injures or damages any real or personal property belonging to another. The degree of the offense depends on the amount of the damage.',
    degreeOfCharge: 'Varies (by damage amount)',
    practicalSummary: "This is Florida's vandalism statute. Similar to theft, the most important element for your report is establishing the monetary value of the damage. Get repair estimates or receipts for the damaged property. Also, 'maliciously' means the act was done with ill will or hatred, which can be inferred from the circumstances (e.g., spray-painting a rival's car).",
    example: "A suspect intentionally keys the side of a car during a dispute. You obtain a repair estimate from a body shop for $1,200. Because the damage exceeds the $1,000 threshold, the suspect can be charged with felony criminal mischief.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0806/Sections/0806.13.html'
  },
  {
    id: 's810-02',
    code: 'F.S. § 810.02',
    title: 'Burglary',
    category: 'Property Crimes',
    description: 'Defines burglary as entering a dwelling, a structure, or a conveyance with the intent to commit an offense therein, unless the premises are at the time open to the public or the defendant is licensed or invited to enter.',
    fullText: '“Burglary” means: (a) Entering a dwelling, a structure, or a conveyance with the intent to commit an offense therein... (b) Notwithstanding a licensed or invited entry, remaining in a dwelling, structure, or conveyance: 1. Surreptitiously, with the intent to commit an offense therein; 2. After permission to remain has been withdrawn, with the intent to commit an offense therein; or 3. To commit or attempt to commit a forcible felony.',
    degreeOfCharge: 'Varies (typically Felony)',
    practicalSummary: "The core of burglary is 'intent.' The person enters without permission *with the goal of committing another crime inside* (usually theft). This intent can be inferred from the circumstances, like forced entry or entering at night. Note the 'remaining in' clause: a person who enters legally but then hides to commit a crime later is also guilty of burglary.",
    example: "A suspect breaks a window and climbs into a closed convenience store after midnight. Even if you catch them before they have taken anything, the act of forced entry into a closed business is sufficient evidence to infer they entered 'with the intent to commit an offense therein' (theft), thus completing the crime of burglary.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0810/Sections/0810.02.html'
  },
  {
    id: 's810-08',
    code: 'F.S. § 810.08',
    title: 'Trespass in Structure or Conveyance',
    category: 'Property Crimes',
    description: 'Prohibits willfully entering or remaining in any structure or conveyance without being authorized, licensed, or invited.',
    fullText: 'Whoever, without being authorized, licensed, or invited, willfully enters or remains in any structure or conveyance...commits the offense of trespass in a structure or conveyance.',
    degreeOfCharge: 'Second-degree Misdemeanor',
    practicalSummary: 'This is a lesser offense than burglary. The key difference is the lack of "intent to commit an offense therein." This charge is used when someone is in a place they shouldn\'t be, but you cannot prove they intended to commit another crime like theft. It becomes a felony if a human being is in the structure/conveyance at the time.',
    example: 'A homeless person enters an abandoned building to sleep for the night. They have not forced entry and do not intend to steal anything. This would be Trespass, not Burglary.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0810/Sections/0810.08.html'
  },
    {
    id: 's810-09',
    code: 'F.S. § 810.09',
    title: 'Trespass on Property Other Than Structure or Conveyance',
    category: 'Property Crimes',
    description: 'Prohibits willfully entering or remaining on any property other than a structure or conveyance without being authorized, licensed, or invited, especially after being warned to depart.',
    fullText: 'A person who, without being authorized, licensed, or invited, willfully enters upon or remains in any property other than a structure or conveyance...as to which notice against entering or remaining is given...commits the offense of trespass on property other than a structure or conveyance.',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: 'This is for trespassing on open land, in a park after hours, or at a business after being asked to leave. The key element is notice. This can be a "No Trespassing" sign or a verbal warning from an owner or law enforcement. Your report must document that the warning was given and the suspect refused to leave.',
    example: 'You are dispatched to a convenience store where a person is loitering and harassing customers. The store manager asks them to leave, and they refuse. You arrive and give them a lawful order to leave the property, and they still refuse. You can now arrest them for Trespass After Warning.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0810/Sections/0810.09.html'
  },
  {
    id: 's812-014',
    code: 'F.S. § 812.014',
    title: 'Theft',
    category: 'Property Crimes',
    description: "Consolidates various historical theft offenses into a single, unified statute. It defines theft as knowingly obtaining or using another's property with the intent to deprive them of it, either permanently or temporarily. The severity of the offense is tiered based on the monetary value of the property stolen.",
    fullText: 'A person commits theft if he or she knowingly obtains or uses, or endeavors to obtain or to use, the property of another with intent to, either temporarily or permanently: (a) Deprive the other person of a right to the property or a benefit from the property. (b) Appropriate the property to his or her own use or to the use of any person not entitled to the use of the property. The degree of the offense depends on the value of the property taken.',
    degreeOfCharge: 'Varies (by value)',
    practicalSummary: "This is your go-to statute for nearly all property theft. The most critical part of your investigation is to clearly establish and document the value of the stolen property, as this dictates whether you have a misdemeanor petit theft or a felony grand theft. Be specific about make, model, condition, and get receipts or victim estimates whenever possible.",
    example: "A suspect shoplifts a high-end jacket from a department store. You confirm with the store's loss prevention that the jacket's retail price is $755. Because the value exceeds the $750 threshold, your investigation supports a charge of Grand Theft in the Third Degree under this statute, rather than a misdemeanor petit theft.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0812/Sections/0812.014.html'
  },
  {
    id: 's812-13',
    code: 'F.S. § 812.13',
    title: 'Robbery',
    category: 'Property Crimes',
    description: 'Defines robbery as the taking of money or other property which may be the subject of larceny from the person or custody of another, with intent to either permanently or temporarily deprive the person or the owner of the money or other property, when in the course of the taking there is the use of force, violence, assault, or putting in fear.',
    fullText: '“Robbery” means the taking of money or other property...from the person or custody of another...when in the course of the taking there is the use of force, violence, assault, or putting in fear.',
    degreeOfCharge: 'Varies (Felony)',
    practicalSummary: "Robbery is theft by force or threat of force. The key distinction from theft is the 'force, violence, assault, or putting in fear' element. It must happen 'in the course of the taking.' This includes the act of taking itself, as well as the flight immediately after. Robbery is always a felony, and the severity increases if a weapon is carried or used.",
    example: "A suspect snatches a purse from a victim's shoulder. The act of using force to pull the purse away from the victim's resistance elevates the crime from a simple theft to a robbery. If the suspect had simply picked up a purse the victim had left on a bench, it would be theft.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0812/Sections/0812.13.html'
  },
  {
    id: 's817-568',
    code: 'F.S. § 817.568',
    title: 'Criminal use of personal ID info',
    category: 'Property Crimes',
    description: 'Prohibits the fraudulent use or possession of another person\'s personal identification information without their consent to commit any crime. It is the primary statute used to charge identity theft.',
    fullText: 'Any person who willfully and fraudulently uses, or possesses with intent to fraudulently use, personal identification information concerning another person without first obtaining that person’s consent, commits the offense of fraudulent use of personal identification information.',
    degreeOfCharge: 'Varies (Felony/Misdemeanor)',
    practicalSummary: "This is Florida's identity theft law. Your investigation needs to show two main things: 1) The suspect possessed or used someone else's personal info (name, DOB, SSN, bank account number, etc.), and 2) They did it with fraudulent intent, meaning for some kind of unlawful purpose or gain. Documenting the financial loss is crucial for determining the degree of the felony.",
    example: "A suspect uses a stolen credit card number to make online purchases. They have willfully and fraudulently used the victim's personal identification information (the credit card number) without consent. The value of the fraudulent purchases will determine the severity of the charge.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0817/Sections/0817.568.html'
  },
  {
    id: 's817-034',
    code: 'F.S. § 817.034',
    title: 'Fraudulent schemes',
    category: 'Property Crimes',
    description: 'Broadly covers organized fraud, making it illegal to engage in any systematic, ongoing course of conduct with intent to defraud one or more persons.',
    fullText: 'Any person who engages in a scheme to defraud and obtains property thereby is guilty of organized fraud...',
    degreeOfCharge: 'Varies (by value, Felony)',
    practicalSummary: 'This is for complex, ongoing fraud cases, not simple one-off scams. Think of contractor fraud where someone takes deposits from multiple victims and does no work, or a complex identity theft ring. Your investigation needs to document the "scheme" itself—the pattern of behavior across multiple victims or transactions.',
    example: 'A suspect sets up a fake charity website, solicits donations from dozens of people, and then uses the money for personal expenses. This is a scheme to defraud, chargeable under this statute.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0817/Sections/0817.034.html'
  },
    {
    id: 's831-01',
    code: 'F.S. § 831.01',
    title: 'Forgery',
    category: 'Property Crimes',
    description: 'Prohibits falsely making, altering, forging, or counterfeiting a public record, certificate, return, or attestation of any public officer or court, with intent to injure or defraud any person.',
    fullText: 'Whoever falsely makes, alters, forges or counterfeits a public record...or a certificate, return or attestation of any clerk or register of a court...with intent to injure or defraud any person, shall be guilty of a felony of the third degree.',
    degreeOfCharge: 'Third-degree Felony',
    practicalSummary: 'This statute deals with forging official documents. For an officer, the most common application is a suspect signing another person\'s name to a traffic citation or notice to appear. Your investigation must prove the signature is false and that the suspect did it with intent to defraud (i.e., to avoid the ticket).',
    example: 'During a traffic stop, a driver provides their brother\'s name and signs the citation with their brother\'s signature to avoid getting points on their own suspended license. This act is Forgery.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0831/Sections/0831.01.html'
  },
  {
    id: 's831-02',
    code: 'F.S. § 831.02',
    title: 'Uttering forged instruments',
    category: 'Property Crimes',
    description: 'Prohibits passing or attempting to pass ("uttering") a forged document as true, knowing it to be forged, with the intent to injure or defraud.',
    fullText: 'Whoever utters and publishes as true a false, forged or altered record, deed, instrument or other writing...knowing the same to be false, altered, forged or counterfeited, with intent to injure or defraud any person, shall be guilty of a felony of the third degree.',
    degreeOfCharge: 'Third-degree Felony',
    practicalSummary: 'Forgery is creating the fake document; Uttering is trying to use it. They are often charged together. The key is proving the suspect knew the document was fake and intended to defraud someone by using it.',
    example: 'A suspect tries to cash a stolen and forged check at a bank. Attempting to pass the bad check to the teller is the act of "uttering." The suspect can be charged with both Forgery (for signing the check) and Uttering (for trying to cash it).',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0831/Sections/0831.02.html'
  },

  // --- Public Order & Obstruction ---
  {
    id: 's843-01',
    code: 'F.S. § 843.01',
    title: 'Resisting Officer With Violence',
    category: 'Public Order & Obstruction',
    description: 'Prohibits knowingly and willfully resisting, obstructing, or opposing any law enforcement officer by offering or doing violence to the person of such officer.',
    fullText: 'Whoever knowingly and willfully resists, obstructs, or opposes any officer...in the lawful execution of any legal duty, by offering or doing violence to the person of such officer is guilty of a felony of the third degree.',
    degreeOfCharge: 'Third-degree Felony',
    practicalSummary: "This is for physical resistance against an officer. The key elements are that you must be engaged in a 'lawful execution of a legal duty' (e.g., making a lawful arrest) and the suspect must 'offer or do violence.' This can include striking, kicking, pushing, or even making a physical motion that constitutes an offer of violence (like pulling back a fist to punch).",
    example: "While you are attempting to handcuff a lawfully arrested suspect, they tense up, pull their arm away, and then intentionally strike you in the chest with their elbow. This act of violence during the arrest constitutes Resisting with Violence.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0843/Sections/0843.01.html'
  },
  {
    id: 's843-02',
    code: 'F.S. § 843.02',
    title: 'Resisting Officer Without Violence',
    category: 'Public Order & Obstruction',
    description: 'Prohibits resisting, obstructing, or opposing any law enforcement officer in the lawful execution of any legal duty, without offering or doing violence.',
    fullText: 'Whoever shall resist, obstruct, or oppose any officer...in the lawful execution of any legal duty, without offering or doing violence to the person of the officer, shall be guilty of a misdemeanor of the first degree.',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: "This is for non-violent obstruction. It covers acts like repeatedly refusing to provide your name during a lawful stop, tensing up and pulling away from an officer's grip during an arrest (without striking), or giving false information to impede an investigation. The resistance must be active and knowing, not just a passive lack of cooperation.",
    example: "You are investigating a crime and have a suspect lawfully detained. When you attempt to place them in handcuffs, they repeatedly pull their arms away and lock them under their body, forcing you to struggle to gain control. This is a classic example of Resisting without Violence.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0843/Sections/0843.02.html'
  },
  {
    id: 's843-06',
    code: 'F.S. § 843.06',
    title: 'Neglect or refusal to aid peace officer',
    category: 'Public Order & Obstruction',
    description: 'Makes it a misdemeanor to refuse or neglect to assist a peace officer in executing a legal process or apprehending a person, after being commanded to do so by the officer.',
    fullText: 'Whoever, being required in the name of the state by any...peace officer, neglects or refuses to assist him or her in the execution of his or her office in a criminal case...or in the apprehension of any person for a breach of the peace or a violation of a law, shall be guilty of a misdemeanor of the second degree.',
    degreeOfCharge: 'Second-degree Misdemeanor',
    practicalSummary: 'This is a rarely used statute, but it gives an officer the authority to command a citizen to help in an emergency. The classic example is commanding a citizen to help you pursue a fleeing felon. It must be a direct command.',
    example: 'You are a lone officer chasing a violent felon on foot. The suspect runs past a group of able-bodied adults. You yell, "Stop that man! I\'m a police officer and I need your help!" If they willfully refuse to assist, they could be charged under this statute.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0843/Sections/0843.06.html'
  },
  {
    id: 's877-03',
    code: 'F.S. § 877.03',
    title: 'Breach of the peace; disorderly conduct',
    category: 'Public Order & Obstruction',
    description: 'Prohibits acts that are of a nature to corrupt the public morals, or outrage the sense of public decency, or affect the peace and quiet of persons who may witness them.',
    fullText: 'Whoever commits such acts as are of a nature to corrupt the public morals, or outrage the sense of public decency, or affect the peace and quiet of persons who may witness them...shall be guilty of a misdemeanor of the second degree.',
    degreeOfCharge: 'Second-degree Misdemeanor',
    practicalSummary: 'This is a catch-all statute for behavior that doesn\'t fit another specific crime but is disrupting public order. The key is that the conduct must be more than just annoying or loud; it must rise to the level of inciting violence or creating a public disturbance. This charge is heavily scrutinized under the First Amendment, so be sure the conduct goes beyond just offensive speech.',
    example: 'A person in a crowded public park starts screaming profanities and challenging others to fight, causing families to flee the area in fear. This action goes beyond protected speech and affects the peace and quiet of those present, constituting disorderly conduct.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0877/Sections/0877.03.html'
  },
  
  // --- Traffic Offenses ---
  {
    id: 's316-193',
    code: 'F.S. § 316.193',
    title: 'Driving Under the Influence (DUI)',
    category: 'Traffic Offenses',
    description: "Establishes the legal framework for the offense of Driving Under the Influence (DUI). It provides two primary methods for proving the offense: demonstrating that the person's 'normal faculties are impaired' by alcohol or a controlled substance, or proving their blood/breath alcohol level is 0.08 or higher.",
    fullText: 'A person is guilty of the offense of driving under the influence and is subject to punishment as provided in subsection (2) if the person is driving or in actual physical control of a vehicle within this state and: (a) The person is under the influence of alcoholic beverages, any chemical substance set forth in s. 877.111, or any substance controlled under chapter 893, when affected to the extent that the person’s normal faculties are impaired; (b) The person has a blood-alcohol level of 0.08 or more grams of alcohol per 100 milliliters of blood; or (c) The person has a breath-alcohol level of 0.08 or more grams of alcohol per 210 liters of breath.',
    degreeOfCharge: 'Misdemeanor (enhanced to Felony)',
    practicalSummary: "This is the cornerstone of all DUI enforcement. Your report must meticulously document every indicator of impairment—driving pattern, physical signs (slurred speech, glassy eyes), and performance on Standardized Field Sobriety Tests (SFSTs). This 'impairment' evidence is crucial and can secure a conviction even if the suspect refuses a breath test. Remember, a DUI can be based on impairment from drugs, not just alcohol.",
    example: "You initiate a traffic stop for swerving. The driver exhibits no odor of alcohol but has pinpoint pupils, is sweating profusely, and performs poorly on SFSTs, showing difficulty with balance and following instructions. They admit to taking prescription painkillers. Based on your documented observations of impaired normal faculties, you can make a DUI arrest under this statute, even without alcohol being involved.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0316/Sections/0316.193.html'
  },
  {
    id: 's316-192',
    code: 'F.S. § 316.192',
    title: 'Reckless Driving',
    category: 'Traffic Offenses',
    description: 'Defines reckless driving as operating any vehicle in willful or wanton disregard for the safety of persons or property.',
    fullText: 'Any person who drives any vehicle in willful or wanton disregard for the safety of persons or property is guilty of reckless driving.',
    degreeOfCharge: 'Criminal Traffic Misdemeanor',
    practicalSummary: 'Reckless driving is a criminal offense, a significant step above careless driving. It requires a mental state of "willful or wanton disregard." This means the driver knew their driving was dangerous and did it anyway. Your report must detail the extreme nature of the driving that justifies this charge, such as excessive speed in a school zone, or weaving through heavy traffic at high speed.',
    example: 'A driver is observed traveling at 90 mph in a 45 mph zone, aggressively changing lanes without signaling, and passing cars on the shoulder. This pattern of behavior demonstrates a willful and wanton disregard for safety and would support a Reckless Driving charge.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0316/Sections/0316.192.html'
  },
  {
    id: 's322-34',
    code: 'F.S. § 322.34',
    title: 'Driving while license suspended, revoked...',
    category: 'Traffic Offenses',
    description: 'Makes it unlawful for any person to drive a motor vehicle upon the highways of this state while his or her driver license or driving privilege is canceled, suspended, or revoked.',
    fullText: 'Except as provided in subsection (1), any person whose driver license or driving privilege has been canceled, suspended, or revoked...who drives a vehicle upon the highways of this state while such license or privilege is canceled, suspended, or revoked is guilty of a moving violation.',
    degreeOfCharge: 'Varies (Civil/Criminal)',
    practicalSummary: 'This is the DWLS (Driving While License Suspended) statute. The most important distinction for an officer is whether the driver had "knowledge" of the suspension. Driving with knowledge is a criminal misdemeanor; without knowledge is a civil infraction. Knowledge is often established by checking the driver\'s history for prior DWLS citations or records of mailed notices from the DMV.',
    example: 'You stop a driver and your database query shows their license is suspended and that they were cited for DWLS last month. The prior citation establishes "knowledge," allowing you to make a criminal arrest for DWLS with Knowledge.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0322/Sections/0322.34.html'
  },
  {
    id: 's316-027',
    code: 'F.S. § 316.027',
    title: 'Crash involving death or personal injuries',
    category: 'Traffic Offenses',
    description: 'Requires the driver of any vehicle involved in a crash resulting in injury or death to immediately stop the vehicle at the scene.',
    fullText: 'The driver of any vehicle involved in a crash occurring on public or private property which results in injury to any person must immediately stop the vehicle at the scene of the crash, or as close thereto as possible... Leaving the scene of a crash involving death is a first degree felony.',
    degreeOfCharge: 'Felony',
    practicalSummary: 'This is the "Hit and Run" statute for crashes with injuries. Your investigation must prove the suspect was the driver, that they were involved in a crash causing injury, and that they failed to remain at the scene to render aid and provide information. This is a very serious offense.',
    example: 'A driver strikes a pedestrian, causing serious injury. The driver slows down, looks back, and then speeds away without stopping. This act constitutes Leaving the Scene of a Crash with Serious Bodily Injury, a second-degree felony.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0316/Sections/0316.027.html'
  },

  // --- Drug Offenses ---
  {
    id: 's893-13',
    code: 'F.S. § 893.13',
    title: 'Possession of a Controlled Substance',
    category: 'Drug Offenses',
    description: 'Makes it unlawful for any person to sell, manufacture, deliver, or possess with intent to sell, a controlled substance. It also criminalizes the simple possession of a controlled substance.',
    fullText: 'Except as authorized by this chapter and chapter 499, a person may not sell, manufacture, or deliver, or possess with intent to sell, manufacture, or deliver, a controlled substance. ... A person may not be in actual or constructive possession of a controlled substance unless such controlled substance was lawfully obtained from a practitioner or pursuant to a valid prescription.',
    degreeOfCharge: 'Varies (Felony/Misdemeanor)',
    practicalSummary: "This is your primary drug enforcement statute. 'Possession' can be 'actual' (in their hand or pocket) or 'constructive' (in a place under their control, like their car's center console, where they know it's there). For 'possession with intent to sell,' you need more evidence than just possession—things like baggies, scales, large amounts of cash, or the quantity of the drugs themselves.",
    example: "During a traffic stop, you find a small baggie of cocaine in a suspect's pocket. This is 'actual possession' and a felony. If you find the same baggie in a locked glove box for which the driver has the key, this is 'constructive possession.'",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0893/Sections/0893.13.html'
  },
  {
    id: 's893-135',
    code: 'F.S. § 893.135',
    title: 'Drug Trafficking',
    category: 'Drug Offenses',
    description: 'Establishes the offense of trafficking in controlled substances, which is based on possessing, selling, or manufacturing specific quantities of illegal drugs. This statute is notable for imposing mandatory minimum prison sentences.',
    fullText: 'Any person who knowingly sells, purchases, manufactures, delivers, or brings into this state, or who is knowingly in actual or constructive possession of, [specific weights] of [a controlled substance]...commits a felony of the first degree, which felony shall be known as “trafficking.”',
    degreeOfCharge: 'First-degree Felony',
    practicalSummary: "Trafficking is all about weight. Your most critical job in a trafficking case is to properly weigh and document the total weight of the seized drugs, as this determines whether the charge applies and which mandatory sentence the suspect faces. The thresholds are strict (e.g., 28 grams for cocaine, 4 grams for heroin/fentanyl).",
    example: "You execute a search warrant and recover 30 grams of cocaine. Because the weight exceeds the 28-gram threshold, the suspect is charged with Trafficking in Cocaine, which carries a mandatory minimum prison sentence, rather than simple possession.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0893/Sections/0893.135.html'
  },
  {
    id: 's893-147',
    code: 'F.S. § 893.147',
    title: 'Possession of Drug Paraphernalia',
    category: 'Drug Offenses',
    description: 'Makes it unlawful for any person to use, or to possess with intent to use, drug paraphernalia.',
    fullText: 'It is unlawful for any person to use, or to possess with intent to use, drug paraphernalia: (a) To plant, propagate, cultivate, grow, harvest, manufacture, compound, convert, produce, process, prepare, test, analyze, pack, repack, store, contain, or conceal a controlled substance... (b) To inject, ingest, inhale, or otherwise introduce into the human body a controlled substance...',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: 'This charge often accompanies a possession charge. It covers items like pipes, bongs, grinders, and needles. The key is to articulate in your report why you believe the item is paraphernalia, often based on residue, odor, or the context in which it was found.',
    example: 'During a search, you find a glass pipe with burnt marijuana residue inside. The suspect can be charged with possession of paraphernalia, in addition to any charge for possessing the marijuana itself.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0893/Sections/0893.147.html'
  },

  // --- Weapons Offenses ---
  {
    id: 's790-01',
    code: 'F.S. § 790.01',
    title: 'Carrying Concealed Weapon/Firearm',
    category: 'Weapons Offenses',
    description: 'Prohibits any person from carrying a concealed weapon or electric weapon or device on or about his or her person unless they are licensed to do so. A separate subsection applies to carrying a concealed firearm.',
    fullText: 'A person who is not licensed under s. 790.06 and who carries a concealed weapon or electric weapon or device on or about his or her person commits a misdemeanor of the first degree. A person who is not licensed under s. 790.06 and who carries a concealed firearm on or about his or her person commits a felony of the third degree.',
    degreeOfCharge: 'Felony (firearm) / Misdemeanor (other weapon)',
    practicalSummary: "The key element is 'concealed,' meaning hidden from the ordinary sight of another person. The weapon must be 'on or about the person,' which includes being readily accessible to them (e.g., under a car seat). Your report should describe where the weapon was found and why it was considered concealed. The crime is a felony if it's a firearm and a misdemeanor for other weapons like knives or brass knuckles.",
    example: "During a consensual encounter, a suspect lifts their shirt to get their wallet, revealing a handgun tucked into their waistband that was not visible before. If they do not have a concealed weapons permit, this constitutes Carrying a Concealed Firearm.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0790/Sections/0790.01.html'
  },
  {
    id: 's790-23',
    code: 'F.S. § 790.23',
    title: 'Possession of Firearm by Felon',
    category: 'Weapons Offenses',
    description: 'Makes it unlawful for a person who has been convicted of a felony to own, possess, or have in their care, custody, or control any firearm, ammunition, or electric weapon or device.',
    fullText: 'It is unlawful for any person to own or to have in his or her care, custody, possession, or control any firearm, ammunition, or electric weapon or device...if that person has been...convicted of a felony in the courts of this state or of any other state.',
    degreeOfCharge: 'Second-degree Felony',
    practicalSummary: "This is the 'possession of a firearm by a convicted felon' statute. The elements are simple: 1) The suspect has a prior felony conviction, and 2) They were in actual or constructive possession of a firearm. Confirming the felony conviction through a criminal history check is a critical step in your investigation.",
    example: "You stop a vehicle for a traffic violation. The driver is a convicted felon. You see a handgun on the passenger seat. The driver is in constructive possession of the firearm, and because he is a convicted felon, he can be charged under this statute.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0790/Sections/0790.23.html'
  },
  {
    id: 's790-15',
    code: 'F.S. § 790.15',
    title: 'Discharging Firearm in Public',
    category: 'Weapons Offenses',
    description: 'Prohibits knowingly discharging a firearm in any public place or on the right-of-way of any paved public road, highway, or street, or over any of these areas.',
    fullText: 'Any person who knowingly discharges a firearm in any public place or on the right-of-way of any paved public road, highway, or street or over any occupied premises is guilty of a misdemeanor of the first degree. This section does not apply to persons lawfully defending life or property.',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: "This statute is for reckless gun use, like celebratory gunfire. Your investigation should focus on collecting evidence of the discharge (casings, witness testimony) and establishing the location as a public place or roadway. Self-defense is a key exception.",
    example: "Residents report hearing gunshots on New Year's Eve. You find a suspect in their front yard with a handgun and spent shell casings nearby. The suspect admits to 'firing a few rounds into the air to celebrate.' This is a direct violation of this statute.",
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0790/Sections/0790.15.html'
  },
  {
    id: 's790-053',
    code: 'F.S. § 790.053',
    title: 'Open carrying of weapons',
    category: 'Weapons Offenses',
    description: 'Prohibits the open carrying of any weapon or electric weapon or device.',
    fullText: 'Except as otherwise provided by law and in subsection (2), it is unlawful for any person to openly carry on or about his or her person any firearm or electric weapon or device.',
    degreeOfCharge: 'Second-degree Misdemeanor',
    practicalSummary: 'Florida is not an open-carry state for firearms. A person cannot have a firearm visible on their person in public. There are exceptions for hunting, fishing, and camping, or while at a firing range. Note that the 2023 "permitless carry" law applies to CONCEALED carry, not open carry.',
    example: 'A person is walking down a public sidewalk with a handgun visibly tucked into their waistband, not covered by a shirt. This is a violation of the open carry statute.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0790/Sections/0790.053.html'
  },
  {
    id: 's790-10',
    code: 'F.S. § 790.10',
    title: 'Improper exhibition of dangerous weapons or firearms',
    category: 'Weapons Offenses',
    description: 'If any person having or carrying any dirk, sword, sword cane, firearm, electric weapon or device, or other weapon shall, in the presence of one or more persons, exhibit the same in a rude, careless, angry, or threatening manner, not in necessary self-defense, the person so offending shall be guilty of a misdemeanor of the first degree, punishable as provided in s. 775.082 or s. 775.083.',
    fullText: 'If any person having or carrying any dirk, sword, sword cane, firearm, electric weapon or device, or other weapon shall, in the presence of one or more persons, exhibit the same in a rude, careless, angry, or threatening manner, not in necessary self-defense, the person so offending shall be guilty of a misdemeanor of the first degree, punishable as provided in s. 775.082 or s. 775.083.',
    degreeOfCharge: 'First-degree Misdemeanor',
    practicalSummary: 'This statute makes it illegal to display a weapon or firearm in a rude, careless, angry, or threatening way in front of others, when not acting in necessary self-defense. The key is the manner of exhibition—it must be done in a way that is intimidating or reckless. Simply having a firearm is not a crime; exhibiting it improperly is.',
    example: 'During a heated argument over a parking spot, one driver lifts his shirt to reveal a handgun tucked in his waistband to intimidate the other driver. This act constitutes improper exhibition because the firearm was displayed in a threatening manner, not for self-defense.',
    url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0790/Sections/0790.10.html'
  },
];

type StatuteIndexItem = Omit<Statute, 'description' | 'fullText' | 'practicalSummary' | 'example' | 'elementsOfTheCrime' | 'url'>;

export const statuteIndex: StatuteIndexItem[] = allStatutes.map(s => ({
  id: s.id,
  code: s.code,
  title: s.title,
  degreeOfCharge: s.degreeOfCharge,
  category: s.category,
}));

export const statutesFullData: Record<string, Statute> = allStatutes.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {} as Record<string, Statute>);
