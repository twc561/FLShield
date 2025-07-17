
export interface ShiftActivity {
  id: string
  time: string
  type: 'Traffic Stop' | 'Call for Service' | 'Report Writing' | 'Patrol' | 'Investigation' | 'Administrative' | 'Training' | 'Court' | 'Other'
  location?: string
  description: string
  disposition: string
  reportNumber?: string
  arrestsMade?: number
  citationsIssued?: number
  warningsGiven?: number
}

export interface ShiftMetrics {
  totalCalls: number
  totalTrafficStops: number
  totalArrests: number
  totalCitations: number
  totalWarnings: number
  milesPatrolled?: number
  fuelUsed?: number
}

export interface ShiftReportData {
  officerInfo: {
    name: string
    badgeNumber: string
    unit: string
    beat: string
  }
  shiftDetails: {
    date: string
    startTime: string
    endTime: string
    supervisor: string
    partner?: string
  }
  activities: ShiftActivity[]
  metrics: ShiftMetrics
  equipmentStatus: {
    vehicle: {
      mileageStart: number
      mileageEnd: number
      fuelLevel: 'Full' | '3/4' | '1/2' | '1/4' | 'Low'
      condition: 'Good' | 'Minor Issues' | 'Needs Maintenance'
      issues?: string
    }
    radio: 'Operational' | 'Issues' | 'Non-Functional'
    bodyCamera: 'Operational' | 'Issues' | 'Non-Functional'
    weapon: 'Secured' | 'Issues'
    otherEquipment?: string
  }
  notableEvents: string[]
  trainingCompleted?: string[]
  followUpRequired?: string[]
  shiftSummary: string
}

export const shiftReportTemplate: ShiftReportData = {
  officerInfo: {
    name: '',
    badgeNumber: '',
    unit: '',
    beat: ''
  },
  shiftDetails: {
    date: '',
    startTime: '',
    endTime: '',
    supervisor: '',
    partner: ''
  },
  activities: [],
  metrics: {
    totalCalls: 0,
    totalTrafficStops: 0,
    totalArrests: 0,
    totalCitations: 0,
    totalWarnings: 0,
    milesPatrolled: 0,
    fuelUsed: 0
  },
  equipmentStatus: {
    vehicle: {
      mileageStart: 0,
      mileageEnd: 0,
      fuelLevel: 'Full',
      condition: 'Good'
    },
    radio: 'Operational',
    bodyCamera: 'Operational',
    weapon: 'Secured'
  },
  notableEvents: [],
  trainingCompleted: [],
  followUpRequired: [],
  shiftSummary: ''
}

export const activityTypes = [
  'Traffic Stop',
  'Call for Service',
  'Report Writing',
  'Patrol',
  'Investigation',
  'Administrative',
  'Training',
  'Court',
  'Other'
] as const

export const commonDispositions = [
  'Completed',
  'Report Filed',
  'Citation Issued',
  'Warning Given',
  'Arrest Made',
  'Referred to Detective',
  'No Action Required',
  'Follow-up Needed',
  'Unfounded',
  'Unable to Locate'
] as const
