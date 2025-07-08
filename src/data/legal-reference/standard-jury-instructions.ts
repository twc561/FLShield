export type InstructionInfo = {
  id: string;
  title: string;
  icon: string;
  description: string;
  officerTakeaway: string;
};

export const standardJuryInstructionsData: InstructionInfo[] = [
  {
    id: 'sji1',
    title: 'What are Standard Jury Instructions?',
    icon: 'ListChecks',
    description: 'These are the official, pre-approved set of instructions that a judge reads to the jury before they begin deliberations. They explain the law that must be applied to the facts of the case. Florida has specific instructions for every criminal offense.',
    officerTakeaway: 'The jury instructions are essentially the "rules of the game" for the trial. They turn the complex language of a statute into a clear checklist for the jury.',
  },
  {
    id: 'sji2',
    title: 'The Elements of the Crime',
    icon: 'Target',
    description: 'For every crime, the instructions list the specific "elements" that the State must prove beyond a reasonable doubt. If even one element is not proven, the jury must find the defendant not guilty.',
    officerTakeaway: 'This is the most critical part for you. Your investigation and report must provide evidence for *every single element* listed in the jury instruction for the crime you are charging. If your report doesn\'t establish probable cause for each element, the case may not even be filed by the prosecutor.',
  },
  {
    id: 'sji3',
    title: 'Example: Robbery Instruction (Simplified)',
    icon: 'Gavel',
    description: 'A typical instruction for Robbery might say: "To prove the crime of Robbery, the State must prove the following four elements beyond a reasonable doubt: 1. The defendant took money or property from the person or custody of another. 2. The defendant intended to permanently or temporarily deprive the person of the property. 3. In the course of the taking, there was a use of force, violence, assault, or putting in fear. 4. The property taken was of some value."',
    officerTakeaway: 'Looking at this instruction, you can see your report needs to cover more than just "he stole something." You need to articulate the force used (Element 3), the intent (Element 2), what was taken (Element 1), and its value (Element 4). This structure should guide your investigation and report writing.',
  },
  {
    id: 'sji4',
    title: 'Reasonable Doubt',
    icon: 'HelpCircle',
    description: 'The instructions provide the official definition of "proof beyond a reasonable doubt." It is not a mere possible doubt, but a real doubt that would cause a reasonable and prudent person to hesitate before acting in their own most important affairs.',
    officerTakeaway: 'This is the high bar your evidence must meet. It reinforces the need for thorough, detailed, and unbiased investigation. Your credibility as a witness is key to overcoming the defense\'s attempts to create reasonable doubt in the minds of the jury.',
  },
];
