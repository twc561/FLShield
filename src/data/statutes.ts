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
};

export const statutes: Statute[] = [
  {
    id: 's1',
    code: 'F.S. § 775.08',
    title: 'Classes and degrees of offenses',
    description: 'Defines the classification of felonies and misdemeanors in the state of Florida.',
    fullText: 'For the purpose of sentencing, felonies are divided into five classes: capital, life, first degree, second degree, and third degree. Misdemeanors are divided into two classes: first degree and second degree. This statute outlines the general penalties associated with each classification.',
    degreeOfCharge: 'Classification Statute',
    practicalSummary: "This statute is the master key for understanding criminal penalties in Florida. It defines what constitutes a first, second, or third-degree felony or misdemeanor, and sets the maximum penalties for each, which is critical for charging decisions.",
    example: "When you arrest someone for Grand Theft of property valued at $1,000, you know from F.S. 812.014 that it's a third-degree felony. F.S. 775.08 tells you that a third-degree felony is punishable by up to 5 years in prison.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0775/Sections/0775.08.html'
  },
  {
    id: 's2',
    code: 'F.S. § 812.014',
    title: 'Theft',
    description: 'Consolidates various theft offenses into a single statute and outlines penalties based on the value of property stolen.',
    fullText: 'A person commits theft if he or she knowingly obtains or uses, or endeavors to obtain or to use, the property of another with intent to, either temporarily or permanently: (a) Deprive the other person of a right to the property or a benefit from the property. (b) Appropriate the property to his or her own use or to the use of any person not entitled to the use of the property. The degree of the offense depends on the value of the property taken.',
    degreeOfCharge: 'Varies (by value)',
    practicalSummary: "This is Florida's consolidated theft statute. The key for officers is to document the value of the stolen property, as this determines the charge, ranging from a petit theft misdemeanor to a first-degree felony.",
    example: "A suspect shoplifts a $50 shirt. That's Petit Theft, a misdemeanor. A different suspect steals a car worth $40,000. That's Grand Theft, a felony. The core act is theft, but the documented value changes the entire scope of the charge.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0812/Sections/0812.014.html'
  },
  {
    id: 's3',
    code: 'F.S. § 782.04',
    title: 'Murder',
    description: 'Defines the unlawful killing of a human being, distinguishing between different degrees of murder.',
    fullText: 'The unlawful killing of a human being: (1)(a) When perpetrated from a premeditated design to effect the death of the person killed or any human being; (b) When committed by a person engaged in the perpetration of, or in the attempt to perpetrate, any specified felony... constitutes murder in the a.first degree.',
    degreeOfCharge: 'First-degree or Capital Felony',
    practicalSummary: "Defines the most serious homicide offense. For officers, the critical element to investigate and document for first-degree murder is 'premeditated design'—evidence of planning, motive, or deliberate intent to kill.",
    example: "A suspect waits for their estranged spouse to leave work, follows them home, and shoots them. The acts of waiting, following, and bringing a weapon are all evidence that can be used to establish the premeditation required for a first-degree murder charge.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0782/Sections/0782.04.html'
  },
  {
    id: 's4',
    code: 'F.S. § 316.193',
    title: 'Driving under the influence; penalties',
    description: 'Outlines the offense of driving under the influence (DUI) of alcoholic beverages or controlled substances and the associated penalties.',
    fullText: 'A person is guilty of the offense of driving under the influence and is subject to punishment as provided in subsection (2) if the person is driving or in actual physical control of a vehicle within this state and: (a) The person is under the influence of alcoholic beverages, any chemical substance set forth in s. 877.111, or any substance controlled under chapter 893, when affected to the extent that the person’s normal faculties are impaired; (b) The person has a blood-alcohol level of 0.08 or more grams of alcohol per 100 milliliters of blood; or (c) The person has a breath-alcohol level of 0.08 or more grams of alcohol per 210 liters of breath.',
    degreeOfCharge: 'Misdemeanor (enhanced to Felony)',
    practicalSummary: "This is the core DUI statute. Your investigation must establish either 1) impairment of 'normal faculties' through observation and SFSTs, or 2) a BAC of .08 or higher. Note that prior convictions can elevate the charge to a felony.",
    example: "You stop a driver for weaving. They have bloodshot eyes, slurred speech, and an odor of alcohol. They perform poorly on SFSTs. Even if they refuse the breath test, your detailed report documenting impairment of normal faculties is the primary evidence for a DUI charge under this statute.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0316/Sections/0316.193.html'
  }
];
