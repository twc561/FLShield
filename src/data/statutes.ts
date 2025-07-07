export type Statute = {
  id: string;
  code: string;
  title: string;
  description: string;
  fullText: string;
};

export const statutes: Statute[] = [
  {
    id: 's1',
    code: 'F.S. § 775.08',
    title: 'Classes and degrees of offenses',
    description: 'Defines the classification of felonies and misdemeanors in the state of Florida.',
    fullText: 'For the purpose of sentencing, felonies are divided into five classes: capital, life, first degree, second degree, and third degree. Misdemeanors are divided into two classes: first degree and second degree. This statute outlines the general penalties associated with each classification.'
  },
  {
    id: 's2',
    code: 'F.S. § 812.014',
    title: 'Theft',
    description: 'Consolidates various theft offenses into a single statute and outlines penalties based on the value of property stolen.',
    fullText: 'A person commits theft if he or she knowingly obtains or uses, or endeavors to obtain or to use, the property of another with intent to, either temporarily or permanently: (a) Deprive the other person of a right to the property or a benefit from the property. (b) Appropriate the property to his or her own use or to the use of any person not entitled to the use of the property. The degree of the offense depends on the value of the property taken.'
  },
  {
    id: 's3',
    code: 'F.S. § 782.04',
    title: 'Murder',
    description: 'Defines the unlawful killing of a human being, distinguishing between different degrees of murder.',
    fullText: 'The unlawful killing of a human being: (1)(a) When perpetrated from a premeditated design to effect the death of the person killed or any human being; (b) When committed by a person engaged in the perpetration of, or in the attempt to perpetrate, any specified felony... constitutes murder in the first degree.'
  },
  {
    id: 's4',
    code: 'F.S. § 316.193',
    title: 'Driving under the influence; penalties',
    description: 'Outlines the offense of driving under the influence (DUI) of alcoholic beverages or controlled substances and the associated penalties.',
    fullText: 'A person is guilty of the offense of driving under the influence and is subject to punishment as provided in subsection (2) if the person is driving or in actual physical control of a vehicle within this state and: (a) The person is under the influence of alcoholic beverages, any chemical substance set forth in s. 877.111, or any substance controlled under chapter 893, when affected to the extent that the person’s normal faculties are impaired; (b) The person has a blood-alcohol level of 0.08 or more grams of alcohol per 100 milliliters of blood; or (c) The person has a breath-alcohol level of 0.08 or more grams of alcohol per 210 liters of breath.'
  }
];
