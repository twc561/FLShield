
export type TrafficViolationIndexItem = {
    StatuteNumber: string;
    CommonName: string;
    Category: string;
};

export type TrafficViolation = TrafficViolationIndexItem & {
  StatuteTitle: string;
  ViolationType: "Moving" | "Non-Moving" | "Criminal";
  InfractionType: "Civil" | "Criminal";
  Elements: string[];
  BaseFine: string;
  Points: string;
  OfficerNotes: string;
};

// Note: Fines are estimates and can vary by county.
const allTrafficViolations: TrafficViolation[] = [
  // --- Core Moving Violations ---
  {
    StatuteNumber: "316.1925",
    StatuteTitle: "Careless driving.",
    CommonName: "Careless Driving",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "Core Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle.",
      "The defendant did so in a careless manner, that is, without care or caution for the safety of other persons or property.",
      "The defendant's driving was of a character likely to endanger other persons or property.",
    ],
    BaseFine: "166",
    Points: "3",
    OfficerNotes: "This is a broad statute useful when a specific violation isn't clear but the driving is unsafe. Clearly articulate in your narrative why the driving was careless (e.g., 'driver was looking at their phone and drifted into the other lane,' 'driver accelerated erratically in heavy traffic'). This is not a lesser included of Reckless Driving.",
  },
  {
    StatuteNumber: "316.192",
    StatuteTitle: "Reckless Driving.",
    CommonName: "Reckless Driving",
    ViolationType: "Criminal",
    InfractionType: "Criminal",
    Category: "Core Moving Violations",
    Elements: [
        "The defendant drove a vehicle.",
        "The defendant did so with a willful or wanton disregard for the safety of persons or property."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "4",
    OfficerNotes: "Reckless Driving is a criminal offense requiring a higher standard than Careless Driving. 'Willful' means intentional and knowing. 'Wanton' means with a conscious and intentional indifference to consequences. This is for extreme cases of dangerous driving (e.g., high-speed weaving through heavy traffic, street racing).",
  },
  {
    StatuteNumber: "316.075",
    StatuteTitle: "Traffic control signal devices.",
    CommonName: "Running a Red Light",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "Core Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle.",
      "The defendant faced a steady circular red signal or red arrow.",
      "The defendant failed to stop at a clearly marked stop line or, if none, before entering the crosswalk or intersection."
    ],
    BaseFine: "262",
    Points: "3",
    OfficerNotes: "The key is establishing the light was red *before* the vehicle entered the intersection. Note your position and clear view of the traffic signal in your report. Violation is captured by red light cameras in many jurisdictions.",
  },
  {
    StatuteNumber: "316.183",
    StatuteTitle: "Unlawful speed.",
    CommonName: "Speeding",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "Core Moving Violations",
    Elements: [
        "The defendant operated a motor vehicle.",
        "The defendant did so at a speed greater than was reasonable and prudent under the conditions.",
        "Or, the defendant exceeded the posted maximum speed limit."
    ],
    BaseFine: "Varies by speed",
    Points: "3-4",
    OfficerNotes: "Document the posted speed limit and the speed at which you paced the vehicle or the reading from your RADAR/LIDAR unit. Note the device's serial number and calibration checks in your log/report. Fines and points increase significantly for speeds 30+ mph over the limit.",
  },
  {
    StatuteNumber: "316.0895",
    StatuteTitle: "Following too closely.",
    CommonName: "Following Too Closely",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "Core Moving Violations",
    Elements: [
        "The defendant operated a motor vehicle.",
        "The defendant followed another vehicle more closely than is reasonable and prudent.",
        "The defendant did not have due regard for the speed of such vehicles and the traffic upon and the condition of the highway."
    ],
    BaseFine: "166",
    Points: "3",
    OfficerNotes: "Often cited after a rear-end collision. Document the distance between vehicles and the speed/traffic conditions that made it unsafe. A good rule of thumb is the 'one car length for every 10 mph' rule, but the statute is based on reasonableness.",
  },
  // --- Equipment & Non-Moving Violations ---
  {
    StatuteNumber: "320.07(3)(a)",
    StatuteTitle: "Expiration of registration.",
    CommonName: "Expired Tag (< 6 Months)",
    ViolationType: "Non-Moving",
    InfractionType: "Civil",
    Category: "Equipment & Non-Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle on a public highway.",
      "The vehicle's registration had been expired for a period of 6 months or less."
    ],
    BaseFine: "116",
    Points: "0",
    OfficerNotes: "This is a non-moving violation. If the registration is expired by MORE than 6 months, it becomes a criminal misdemeanor under F.S. 320.07(3)(c). Always check the exact expiration date.",
  },
  {
    StatuteNumber: "316.605",
    StatuteTitle: "Licensing of vehicles.",
    CommonName: "Tag Not Attached / Obscured",
    ViolationType: "Non-Moving",
    InfractionType: "Civil",
    Category: "Equipment & Non-Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle.",
      "The license plate was not securely attached in the proper location.",
      "Or, the license plate was obscured, covered, or defaced so that the numbers were not plainly visible."
    ],
    BaseFine: "116",
    Points: "0",
    OfficerNotes: "This includes license plate covers that are tinted or frosted, as well as frames that cover the state name ('Florida') or registration decal. The plate must be plainly visible and legible.",
  },
  {
    StatuteNumber: "316.2953",
    StatuteTitle: "Side windows; restrictions on sunscreening material.",
    CommonName: "Window Tint Violation",
    ViolationType: "Non-Moving",
    InfractionType: "Civil",
    Category: "Equipment & Non-Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle.",
      "The front side windows (to the immediate right and left of the driver) had a sunscreening material.",
      "To wit, the material had a light transmittance of less than 28 percent."
    ],
    BaseFine: "116",
    Points: "0",
    OfficerNotes: "Must be verified with an agency-issued tint meter. Document the tint meter's serial number and the final reading in your report or citation notes. The windshield strip cannot go below the AS-1 line. Rear and back-side windows have a different, more lenient standard (15%).",
  },
  {
    StatuteNumber: "316.221",
    StatuteTitle: "Taillamps.",
    CommonName: "Inoperative Taillight",
    ViolationType: "Non-Moving",
    InfractionType: "Civil",
    Category: "Equipment & Non-Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle between sunset and sunrise.",
      "The vehicle was not equipped with at least two red taillamps.",
      "Or, one or more of the required taillamps was not plainly visible from 1,000 feet."
    ],
    BaseFine: "116",
    Points: "0",
    OfficerNotes: "This is a common primary violation for a traffic stop at night. It is a fix-it ticket in some jurisdictions if the driver can show proof of repair.",
  },
  // --- License, Registration & Insurance Violations ---
  {
    StatuteNumber: "322.03",
    StatuteTitle: "Drivers must be licensed; penalties.",
    CommonName: "No Valid Driver License",
    ViolationType: "Criminal",
    InfractionType: "Criminal",
    Category: "License, Registration & Insurance Violations",
    Elements: [
        "The defendant operated a motor vehicle on a public highway.",
        "The defendant did not have a valid driver license issued to them."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "0",
    OfficerNotes: "This is a second-degree misdemeanor. This is for individuals who have never been issued a license. It is different from DWLS/R. A physical arrest is permissible.",
  },
  {
    StatuteNumber: "322.34(2)",
    StatuteTitle: "Driving while license suspended, revoked, canceled, or disqualified.",
    CommonName: "DWLS With Knowledge",
    ViolationType: "Criminal",
    InfractionType: "Criminal",
    Category: "License, Registration & Insurance Violations",
    Elements: [
      "The defendant drove a motor vehicle upon a highway in this state.",
      "At the time, the defendant's driver license was suspended, revoked, or canceled.",
      "The defendant had knowledge of the suspension/revocation."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "0",
    OfficerNotes: "This is a criminal offense, often a misdemeanor but can be a felony with prior convictions. 'Knowledge' is presumed if a notice was mailed to the driver's address on file, or if they were previously cited for it. This is a common arrest situation.",
  },
  {
    StatuteNumber: "316.646(1)",
    StatuteTitle: "Security required; proof of security and display thereof.",
    CommonName: "No Proof of Insurance",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "License, Registration & Insurance Violations",
    Elements: [
        "The defendant operated a motor vehicle.",
        "The defendant failed to provide proof of personal injury protection (PIP) and property damage liability (PDL) insurance upon request by a law enforcement officer."
    ],
    BaseFine: "180+",
    Points: "0",
    OfficerNotes: "A driver must provide proof of valid, current Florida insurance. If they cannot, but they are confirmed to have it via a database check, a citation is not typically issued. This citation can lead to a license suspension if not addressed.",
  },
  // --- Additional Moving Violations ---
  {
    StatuteNumber: "316.074(1)",
    StatuteTitle: "Obedience to and required traffic control devices.",
    CommonName: "Failure to Stop at Stop Sign",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "Core Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle.",
      "The defendant approached a stop sign.",
      "The defendant failed to stop at the clearly marked stop line, or if none, before entering the crosswalk or intersection."
    ],
    BaseFine: "166",
    Points: "3",
    OfficerNotes: "Must come to a complete stop. Rolling stops are violations. Note the vehicle's position when you observed the violation and whether there was a marked stop line.",
  },
  {
    StatuteNumber: "316.085",
    StatuteTitle: "Limitations on overtaking, passing, changing lanes and changing course.",
    CommonName: "Improper Lane Change",
    ViolationType: "Moving", 
    InfractionType: "Civil",
    Category: "Core Moving Violations",
    Elements: [
      "The defendant operated a motor vehicle.",
      "The defendant changed lanes or course without ensuring the movement could be made safely.",
      "Or, the defendant failed to give an appropriate signal before changing lanes."
    ],
    BaseFine: "166",
    Points: "3",
    OfficerNotes: "Look for failure to signal, cutting off other vehicles, or changing lanes when unsafe. Document the traffic conditions and proximity to other vehicles.",
  },
  {
    StatuteNumber: "316.172",
    StatuteTitle: "Persons upon bicycles.",
    CommonName: "Bicycle on Sidewalk Violation", 
    ViolationType: "Non-Moving",
    InfractionType: "Civil",
    Category: "Equipment & Non-Moving Violations",
    Elements: [
      "The defendant rode a bicycle upon a sidewalk.",
      "The defendant was in a business district or where prohibited by local ordinance."
    ],
    BaseFine: "60",
    Points: "0",
    OfficerNotes: "Check local ordinances as many municipalities prohibit sidewalk cycling in business districts. This is typically a warning situation unless creating a hazard.",
  },
  {
    StatuteNumber: "316.194",
    StatuteTitle: "Careless or negligent operation of motor vehicle resulting in injury or death.",
    CommonName: "Vehicular Homicide",
    ViolationType: "Criminal",
    InfractionType: "Criminal", 
    Category: "Serious Bodily Injury / Fatality Violations",
    Elements: [
      "The defendant operated a motor vehicle in a careless or negligent manner.",
      "The defendant's operation caused or contributed to the death of another person."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "Varies",
    OfficerNotes: "This is a second-degree felony. Requires proof that careless/negligent driving was the cause of death. Conduct thorough crash investigation and consult with Traffic Homicide Unit.",
  },
  {
    StatuteNumber: "322.15",
    StatuteTitle: "Unlawful use of license.",
    CommonName: "Lending License to Another",
    ViolationType: "Criminal",
    InfractionType: "Criminal",
    Category: "License, Registration & Insurance Violations", 
    Elements: [
      "The defendant lent their driver license to another person.",
      "Or, the defendant knowingly permitted another to use their license.",
      "Or, the defendant used a license not issued to them."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "0",
    OfficerNotes: "This is a second-degree misdemeanor. Often discovered during traffic stops when the license doesn't match the driver's appearance or when multiple people claim the same license.",
  },
  {
    StatuteNumber: "316.302",
    StatuteTitle: "Commercial motor vehicles; safety regulations.",
    CommonName: "Commercial Vehicle Safety Violation",
    ViolationType: "Moving",
    InfractionType: "Civil",
    Category: "Equipment & Non-Moving Violations",
    Elements: [
      "The defendant operated a commercial motor vehicle.",
      "The vehicle or its operation violated federal or state safety regulations."
    ],
    BaseFine: "Varies",
    Points: "Varies",
    OfficerNotes: "Requires knowledge of CDL regulations and DOT requirements. Common violations include logbook violations, weight limits, and equipment failures. May require vehicle inspection.",
  },
  // --- Serious Bodily Injury / Fatality Violations ---
  {
    StatuteNumber: "316.027(2)(c)",
    StatuteTitle: "Leaving scene of crash involving death.",
    CommonName: "Leaving Scene with Death",
    ViolationType: "Criminal",
    InfractionType: "Criminal",
    Category: "Serious Bodily Injury / Fatality Violations",
    Elements: [
        "The defendant was the driver of a vehicle involved in a crash.",
        "The crash resulted in the death of a person.",
        "The defendant willfully failed to remain at the scene of the crash, or to give information and render aid."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "Varies",
    OfficerNotes: "This is a first-degree felony with a mandatory minimum of 4 years in prison. The investigation focuses on identifying the driver who fled. Seizing the vehicle and processing for forensic evidence (DNA, fingerprints) is critical.",
  },
  {
    StatuteNumber: "316.193(3)(c)2",
    StatuteTitle: "Driving under the influence; penalties.",
    CommonName: "DUI with Serious Bodily Injury",
    ViolationType: "Criminal",
    InfractionType: "Criminal",
    Category: "Serious Bodily Injury / Fatality Violations",
    Elements: [
        "The defendant drove or was in actual physical control of a vehicle.",
        "The defendant was under the influence to the extent their normal faculties were impaired, or had a BAL/BAC of .08 or higher.",
        "As a result of operating the vehicle, the defendant caused or contributed to causing serious bodily injury to another."
    ],
    BaseFine: "Varies (Criminal)",
    Points: "Varies",
    OfficerNotes: "'Serious bodily injury' means an injury that creates a substantial risk of death, serious personal disfigurement, or protracted loss or impairment of the function of any bodily member or organ. This is a third-degree felony and requires a mandatory blood draw from the driver.",
  }
];

export const trafficViolationsIndex: TrafficViolationIndexItem[] = allTrafficViolations.map(v => ({
    StatuteNumber: v.StatuteNumber,
    CommonName: v.CommonName,
    Category: v.Category
}));

export const trafficViolationsFullData: Record<string, TrafficViolation> = allTrafficViolations.reduce((acc, v) => {
    acc[v.StatuteNumber] = v;
    return acc;
}, {} as Record<string, TrafficViolation>);
