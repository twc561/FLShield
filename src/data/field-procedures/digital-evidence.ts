
export type DigitalEvidencePrinciple = {
  id: string;
  title: string;
  icon: string;
  description: string;
  guidelines: string[];
  caseLaw: { name: string; summary: string };
};

export const digitalEvidenceData: DigitalEvidencePrinciple[] = [
  {
    id: "principle1",
    title: "Key Legal Principle: Get a Warrant",
    icon: "Gavel",
    description: "The Supreme Court has affirmed that digital devices, especially smartphones, hold a vast amount of private information and are subject to the highest privacy protections under the Fourth Amendment.",
    guidelines: [
      "A search of a digital device generally requires a search warrant.",
      "Seizing a device incident to arrest is permissible, but searching its contents is not.",
      "Exceptions to the warrant rule (exigent circumstances, consent) are narrowly construed and must be clearly articulated.",
      "Consent to search a device must be knowing, voluntary, and unambiguous. The scope of the consent should be clearly documented."
    ],
    caseLaw: {
      name: "Riley v. California (2014)",
      summary: "The Court ruled unanimously that police must obtain a warrant before searching the digital contents of a cell phone seized from an individual who has been arrested. The data on a phone is not analogous to a physical object and has a much higher expectation of privacy."
    }
  },
  {
    id: "principle2",
    title: "Handling Smartphones & Tablets",
    icon: "Smartphone",
    description: "Mobile devices are the most common form of digital evidence. Proper handling is critical to prevent data loss or inadmissibility.",
    guidelines: [
      "If the device is on, do not turn it off. If it is off, do not turn it on.",
      "Attempt to disable network connectivity immediately by placing the device in Airplane Mode if possible.",
      "Place the device in a Faraday bag or other radio frequency-blocking container to prevent remote wiping or new data from overwriting old data.",
      "Document the physical condition of the device, including any damage, screen display, and connected cables.",
      "Charge the device if possible to prevent data loss from a dead battery."
    ],
    caseLaw: {
      name: "N/A",
      summary: "Best practices are guided by forensic science principles and the legal standards set by cases like Riley v. California."
    }
  },
  {
    id: "principle3",
    title: "Handling Laptops & Computers",
    icon: "Laptop",
    description: "Computers present unique challenges due to encryption, operating systems, and power states.",
    guidelines: [
      "If the computer is on, consult with a digital forensics expert before disconnecting power, as this could trigger data loss or encryption.",
      "Photograph the screen to document what was displayed upon seizure.",
      "If the computer is off, do not turn it on. Transport it to a secure location for forensic examination.",
      "Seize all connected peripherals, including power cords, external drives, keyboards, and mice.",
      "Ask the user for any login passwords, but do not compel them to provide it without legal authority."
    ],
    caseLaw: {
      name: "United States v. Jones (2012)",
      summary: "While not directly about computer searches, this case (regarding GPS trackers) reinforced that physical intrusion onto property to gather information is a search, underscoring the need for warrants when dealing with suspects' property."
    }
  },
  {
    id: "principle4",
    title: "Body-Worn & In-Car Cameras",
    icon: "Camera",
    description: "Your own equipment creates digital evidence that requires proper handling and is subject to discovery.",
    guidelines: [
      "Ensure your camera is recording during all investigative and enforcement encounters as per department policy.",
      "Provide a clear, verbal statement at the beginning of a recording identifying the date, time, and location if possible.",
      "Do not delete or alter recordings. All footage should be uploaded and stored securely at the end of your shift.",
      "Be aware that all your recorded footage, including non-evidentiary parts, may be subject to review by prosecutors and defense attorneys."
    ],
    caseLaw: {
      name: "Brady v. Maryland (1963)",
      summary: "This case requires prosecutors to disclose all exculpatory evidence. Body camera footage that contradicts your report or shows a different perspective is considered Brady material and must be turned over to the defense."
    }
  },
];
