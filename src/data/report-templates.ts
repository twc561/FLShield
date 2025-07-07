export type ReportTemplate = {
  id: string;
  title: string;
  description: string;
  template: string;
};

export const reportTemplates: ReportTemplate[] = [
  {
    id: 'rt1',
    title: 'Standard Incident Report Narrative',
    description: 'A basic template for documenting a general incident.',
    template: `On [Date] at approximately [Time], I, [Your Name and Rank/ID], was dispatched to [Location] regarding a [Nature of Call].

Upon arrival, I observed [Initial Observations]. I made contact with the following individuals:
- [Witness/Victim 1 Name], [Role]
- [Witness/Victim 2 Name], [Role]

[Witness/Victim 1] stated that [Summary of Statement].

[Witness/Victim 2] stated that [Summary of Statement].

Based on my investigation, the following actions were taken: [Actions Taken].

Evidence collected at the scene includes:
- [Evidence Item 1]
- [Evidence Item 2]

The scene was cleared at [Time]. This report is submitted for record.

`
  },
  {
    id: 'rt2',
    title: 'Traffic Stop Report',
    description: 'A template for documenting a routine traffic stop.',
    template: `On [Date] at approximately [Time], while on routine patrol in the area of [Location], I observed a [Vehicle Color, Make, Model] bearing license plate [Plate Number] commit the following traffic violation: [Violation].

I initiated a traffic stop on the vehicle. I approached the driver's side and made contact with the driver, identified by their Florida Driver's License as [Driver's Name].

I explained the reason for the stop. The driver's response was [Driver's Demeanor/Response].

[Check for wants/warrants, license status, etc.]. The driver's license was found to be [Status].

A [Citation/Warning] was issued for the violation.

The stop was concluded at [Time], and I returned to patrol.`
  }
];
