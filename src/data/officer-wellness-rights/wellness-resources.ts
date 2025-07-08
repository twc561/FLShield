
export type WellnessResource = {
  resourceType: string;
  contactName: string;
  phoneNumber: string;
  description: string;
};

// NOTE: These are representative examples. In a real application, these would be populated
// with the actual, verified contact information for a specific agency and region.
export const wellnessResources: WellnessResource[] = [
  {
    resourceType: "Peer Support Team",
    contactName: "Sgt. Mike Johnson (Coordinator)",
    phoneNumber: "772-555-0101",
    description: "Confidential, 24/7 support from trained fellow officers who understand the job. Your first call when you need to talk."
  },
  {
    resourceType: "Agency Chaplaincy",
    contactName: "Chaplain David Chen",
    phoneNumber: "772-555-0102",
    description: "Spiritual and emotional support for all officers and their families, regardless of faith or affiliation."
  },
  {
    resourceType: "Official Mental Health Services",
    contactName: "Solutions EAP (Employee Assistance Program)",
    phoneNumber: "800-555-0199",
    description: "Professional and confidential counseling services provided through the agency's official partner. Sessions are covered by insurance."
  }
];
