export type FlowchartNode = {
  id: string;
  type: 'decision' | 'process' | 'terminator';
  text: string;
  outputs: { to: string, label?: string }[];
};

export type Flowchart = {
  id: string;
  title: string;
  description: string;
  nodes: FlowchartNode[];
};

// This is a simplified representation for demonstration purposes.
export const flowcharts: Flowchart[] = [
  {
    id: 'fc1',
    title: 'Use of Force Decision Tree',
    description: 'A simplified flowchart to guide use-of-force decisions.',
    nodes: [
      { id: 'start', type: 'terminator', text: 'START: Subject Encounter', outputs: [{ to: 'd1' }] },
      { id: 'd1', type: 'decision', text: 'Is subject compliant?', outputs: [{ to: 'p1', label: 'Yes' }, { to: 'd2', label: 'No' }] },
      { id: 'p1', type: 'process', text: 'Verbal commands, maintain presence', outputs: [{ to: 'end_c' }] },
      { id: 'd2', type: 'decision', text: 'Passive or Active Resistance?', outputs: [{ to: 'p2', label: 'Passive' }, { to: 'd3', label: 'Active' }] },
      { id: 'p2', type: 'process', text: 'Control holds, escort techniques', outputs: [{ to: 'end_r' }] },
      { id: 'd3', type: 'decision', text: 'Threat of harm to officer/others?', outputs: [{ to: 'p3', label: 'Yes' }, { to: 'p2', label: 'No' }] },
      { id: 'p3', type: 'process', text: 'Defensive tactics, less-lethal options', outputs: [{ to: 'd4' }] },
      { id: 'd4', type: 'decision', text: 'Threat of death or serious bodily harm?', outputs: [{ to: 'p4', label: 'Yes' }, { to: 'p3', label: 'No' }] },
      { id: 'p4', type: 'process', text: 'Deadly force may be justified', outputs: [{ to: 'end_d' }] },
      { id: 'end_c', type: 'terminator', text: 'END: Compliance Achieved', outputs: [] },
      { id: 'end_r', type: 'terminator', text: 'END: Subject in Custody', outputs: [] },
      { id: 'end_d', type: 'terminator', text: 'END: Threat Neutralized', outputs: [] },
    ]
  }
];
