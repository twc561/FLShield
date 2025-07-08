
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
  {
    id: "manatee-zones",
    title: "Vessel Speed & Manatee Zones",
    icon: "AlertTriangle",
    description: "Rules for operating vessels in designated manatee protection zones.",
    points: [
      "Manatee zones are legally enforceable speed zones, marked by waterway signs.",
      "'Slow Speed / Minimum Wake' means the vessel is fully settled in the water and creating the smallest wake possible.",
      "'Idle Speed / No Wake' means the minimum speed needed to maintain steerage.",
      "Violations are a noncriminal infraction, but can become a misdemeanor if the operator has prior convictions.",
      "These zones are critical for protecting Florida's manatee population from boat strikes."
    ],
    note: "Zone boundaries can change seasonally. Always refer to the posted signs on the water and official FWC maps for current regulations."
  },
  {
    id: "diver-down",
    title: "Diver-Down Flag Rules",
    icon: "Flag",
    description: "Requirements for displaying and operating around diver-down flags to protect snorkelers and scuba divers.",
    points: [
      "Two types of flags are recognized: the traditional red flag with a white diagonal stripe, and the blue and white 'Alpha' flag.",
      "On a vessel, the flag must be at least 20x24 inches and displayed at the highest point for 360-degree visibility.",
      "On a float/buoy, the flag must be at least 12x12 inches.",
      "Vessel operators must make a reasonable effort to stay at least 300 feet away from a diver-down flag in open water.",
      "In rivers, inlets, and navigation channels, boaters must stay at least 100 feet away.",
      "Boaters must operate at idle speed if they must come within these distances."
    ],
    note: "This is a critical safety rule. Violations can lead to serious accidents and carry significant penalties. The responsibility is on both the diver to display the flag properly and the boater to respect it."
  },
  {
    id: "pwc-rules",
    title: "Personal Watercraft (PWC) Regulations",
    icon: "Waves",
    description: "Specific rules governing the operation of personal watercraft like Jet Skis, Sea-Doos, etc.",
    points: [
        "A person must be at least 14 years of age to operate a PWC in Florida.",
        "Anyone born on or after January 1, 1988, must have successfully completed a boating safety course and possess a Boating Safety Education ID Card.",
        "The operator must wear an approved, non-inflatable PFD.",
        "A safety lanyard must be attached from the start/stop switch to the operator's person or PFD.",
        "PWCs cannot be operated from 1/2 hour after sunset to 1/2 hour before sunrise.",
        "Reckless operation includes weaving through congested traffic, jumping the wake of another vessel unreasonably close, or swerving at the last minute to avoid a collision."
    ],
    note: "PWC operators are often tourists or new boaters. Education is a key component of enforcement for minor infractions. Reckless operation, however, poses a serious danger and should be addressed accordingly."
  },
  {
    id: "hunting-regs",
    title: "Hunting License & Regulations Overview",
    icon: "Crosshair",
    description: "Basic overview of hunting license requirements and key regulations.",
    points: [
        "A hunting license is required to attempt to take game.",
        "Specific permits are required for certain species, like deer, turkey, and waterfowl.",
        "It is illegal to hunt on or from any state or county road right-of-way.",
        "It is prohibited to take wildlife on another person's property without landowner permission.",
        "It is illegal to discharge a firearm over or across any public road.",
        "Taking or attempting to take game at night with a light is generally illegal and known as 'night hunting'."
    ],
    note: "FWC has primary jurisdiction, but local LEOs may encounter violations like illegal night hunting, trespassing, or unsafe shooting. Always verify season dates and specific Wildlife Management Area (WMA) rules if applicable."
  }
];
