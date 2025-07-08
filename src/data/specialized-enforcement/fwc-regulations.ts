
export type FwcTopic = {
  id: string;
  title: string;
  icon: string;
  description: string;
  points: string[];
  note?: string;
};

export const fwcData: FwcTopic[] = [
  {
    id: "boating-safety",
    title: "Boating Safety Equipment",
    icon: "LifeBuoy",
    description: "Minimum required safety equipment for recreational vessels in Florida.",
    points: [
      "One wearable, USCG-approved Personal Flotation Device (PFD) for each person on board. Children under 6 must wear a PFD at all times on a vessel under 26 feet.",
      "Vessels 16 feet or longer must have at least one Type IV (throwable) PFD.",
      "A sound-producing device (horn, whistle) is required.",
      "Fire extinguisher(s) are required on most motorboats with enclosed compartments or fuel tanks.",
      "Visual distress signals (flares, flags) are required for coastal waters, and for all boats on federally controlled waters.",
      "Navigation lights are required for operation between sunset and sunrise.",
    ],
    note: "These are minimums. Requirements can change based on vessel length and whether you are on state or federal waters. When in doubt, check the latest FWC regulations.",
  },
  {
    id: "fishing-license",
    title: "Fishing License Requirements",
    icon: "Fish",
    description: "General requirements for saltwater and freshwater fishing licenses.",
    points: [
      "A fishing license is required to attempt to take fish. If you are casting a line, you need a license.",
      "Florida residents fishing from land or a structure fixed to land in saltwater do not need a saltwater fishing license.",
      "Residents 65 years of age or older are exempt.",
      "Children under 16 are exempt.",
      "Specific permits are required for certain species, like snook, lobster, and tarpon.",
      "Licenses can be purchased online via the FWC website or at most bait and tackle shops.",
    ],
    note: "License requirements are complex and have many exemptions. Always verify the specific situation. The 'GoOutdoorsFL' app is an official resource.",
  },
  {
    id: "dui-bui",
    title: "Boating Under the Influence (BUI)",
    icon: "Beer",
    description: "Operating a vessel while under the influence of alcohol or drugs is a crime.",
    points: [
      "The legal blood alcohol limit for BUI is 0.08%, the same as for DUI.",
      "For persons under 21, the limit is 0.02%.",
      "By operating a vessel on Florida waters, you have given implied consent to submit to a breath or urine test.",
      "Penalties for BUI are similar to DUI, including fines, imprisonment, and suspension of your boating privileges.",
      "FWC officers have the authority to stop a vessel for safety checks or if they observe reckless operation, which can lead to a BUI investigation.",
    ],
  },
];
