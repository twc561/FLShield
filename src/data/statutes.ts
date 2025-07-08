
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
    description: 'Provides the foundational framework for criminal sentencing in Florida by establishing the specific classifications for felonies (Capital, Life, First Degree, Second Degree, Third Degree) and misdemeanors (First Degree, Second Degree). It serves as the primary reference for determining the potential severity of charges.',
    fullText: 'For the purpose of sentencing, felonies are divided into five classes: capital, life, first degree, second degree, and third degree. Misdemeanors are divided into two classes: first degree and second degree. This statute outlines the general penalties associated with each classification.',
    degreeOfCharge: 'Classification Statute',
    practicalSummary: "This is your Rosetta Stone for Florida criminal charges. It translates a specific offense into its corresponding penalty level. When another statute says an act is a 'third-degree felony,' this is the statute that defines what that means in terms of potential prison time and fines. It's essential for writing accurate reports and understanding the gravity of the charges you file.",
    example: "You arrest a suspect for Aggravated Battery under F.S. 784.045, which is a second-degree felony. You consult F.S. 775.08 to confirm that a second-degree felony carries a maximum sentence of 15 years in prison. This informs your report and the subsequent charging decisions by the State Attorney's Office.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0775/Sections/0775.08.html'
  },
  {
    id: 's2',
    code: 'F.S. § 812.014',
    title: 'Theft',
    description: "Consolidates various historical theft offenses into a single, unified statute. It defines theft as knowingly obtaining or using another's property with the intent to deprive them of it, either permanently or temporarily. The severity of the offense is tiered based on the monetary value of the property stolen.",
    fullText: 'A person commits theft if he or she knowingly obtains or uses, or endeavors to obtain or to use, the property of another with intent to, either temporarily or permanently: (a) Deprive the other person of a right to the property or a benefit from the property. (b) Appropriate the property to his or her own use or to the use of any person not entitled to the use of the property. The degree of the offense depends on the value of the property taken.',
    degreeOfCharge: 'Varies (by value)',
    practicalSummary: "This is your go-to statute for nearly all property theft. The most critical part of your investigation is to clearly establish and document the value of the stolen property, as this dictates whether you have a misdemeanor petit theft or a felony grand theft. Be specific about make, model, condition, and get receipts or victim estimates whenever possible.",
    example: "A suspect shoplifts a high-end jacket from a department store. You confirm with the store's loss prevention that the jacket's retail price is $755. Because the value exceeds the $750 threshold, your investigation supports a charge of Grand Theft in the Third Degree under this statute, rather than a misdemeanor petit theft.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0812/Sections/0812.014.html'
  },
  {
    id: 's3',
    code: 'F.S. § 782.04',
    title: 'Murder',
    description: "Defines the unlawful killing of a human being and establishes the distinct elements for different degrees of murder. It notably defines first-degree murder as a killing perpetrated with a 'premeditated design' or one committed during the course of another dangerous felony (felony murder).",
    fullText: 'The unlawful killing of a human being: (1)(a) When perpetrated from a premeditated design to effect the death of the person killed or any human being; (b) When committed by a person engaged in the perpetration of, or in the attempt to perpetrate, any specified felony... constitutes murder in the a.first degree.',
    degreeOfCharge: 'First-degree or Capital Felony',
    practicalSummary: "For homicide investigators, this statute directs your focus. For first-degree murder, your investigation must uncover evidence showing the suspect planned or deliberated the killing beforehand. This includes evidence of motive, acquiring a weapon, lying in wait, or making prior threats. For felony murder, you must prove the death occurred during another serious crime like robbery or kidnapping.",
    example: "A suspect breaks into a home to commit a burglary. The homeowner confronts them, and in the ensuing struggle, the homeowner is killed. Even if the suspect didn't specifically intend to kill, because the death occurred during the commission of a felony (burglary), the State can pursue a first-degree murder charge under the felony murder rule of this statute.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0782/Sections/0782.04.html'
  },
  {
    id: 's4',
    code: 'F.S. § 316.193',
    title: 'Driving under the influence; penalties',
    description: "Establishes the legal framework for the offense of Driving Under the Influence (DUI). It provides two primary methods for proving the offense: demonstrating that the person's 'normal faculties are impaired' by alcohol or a controlled substance, or proving their blood/breath alcohol level is 0.08 or higher.",
    fullText: 'A person is guilty of the offense of driving under the influence and is subject to punishment as provided in subsection (2) if the person is driving or in actual physical control of a vehicle within this state and: (a) The person is under the influence of alcoholic beverages, any chemical substance set forth in s. 877.111, or any substance controlled under chapter 893, when affected to the extent that the person’s normal faculties are impaired; (b) The person has a blood-alcohol level of 0.08 or more grams of alcohol per 100 milliliters of blood; or (c) The person has a breath-alcohol level of 0.08 or more grams of alcohol per 210 liters of breath.',
    degreeOfCharge: 'Misdemeanor (enhanced to Felony)',
    practicalSummary: "This is the cornerstone of all DUI enforcement. Your report must meticulously document every indicator of impairment—driving pattern, physical signs (slurred speech, glassy eyes), and performance on Standardized Field Sobriety Tests (SFSTs). This 'impairment' evidence is crucial and can secure a conviction even if the suspect refuses a breath test. Remember, a DUI can be based on impairment from drugs, not just alcohol.",
    example: "You initiate a traffic stop for swerving. The driver exhibits no odor of alcohol but has pinpoint pupils, is sweating profusely, and performs poorly on SFSTs, showing difficulty with balance and following instructions. They admit to taking prescription painkillers. Based on your documented observations of impaired normal faculties, you can make a DUI arrest under this statute, even without alcohol being involved.",
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0316/Sections/0316.193.html'
  }
];
