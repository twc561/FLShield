
export interface TenantRightsSection {
  id: string
  title: string
  description: string
  content: Array<{
    title: string
    details: string[]
    legalBasis?: string
    timeframes?: string[]
    consequences?: string[]
  }>
}

export const tenantRightsData: TenantRightsSection[] = [
  {
    id: "overview-basics",
    title: "Florida Landlord-Tenant Law Overview",
    description: "Essential background and key principles for understanding tenant-landlord disputes",
    content: [
      {
        title: "Primary Legal Framework",
        legalBasis: "F.S. Chapter 83 - Landlord and Tenant",
        details: [
          "Florida Residential Landlord and Tenant Act governs most rental relationships",
          "Applies to single-family homes, apartments, condos, and mobile homes",
          "Does not apply to hotels, motels, or transient occupancy",
          "Local ordinances may provide additional protections",
          "Federal Fair Housing Act applies to all rental housing"
        ]
      },
      {
        title: "Officer's Role in Civil Disputes",
        details: [
          "Landlord-tenant disputes are primarily civil matters, not criminal",
          "Officers should maintain neutrality and not give legal advice",
          "Document observations factually without taking sides",
          "Refer parties to appropriate civil legal resources",
          "Arrest only if criminal laws are violated (trespass, assault, etc.)",
          "Self-help evictions may constitute criminal violations"
        ]
      },
      {
        title: "When Police May Intervene",
        details: [
          "Threats of violence or actual violence between parties",
          "Criminal trespass after proper legal eviction",
          "Destruction of property or vandalism",
          "Theft of tenant's belongings during illegal eviction",
          "Harassment that rises to criminal level",
          "Violation of protective orders or injunctions"
        ]
      }
    ]
  },
  {
    id: "rent-payment-security",
    title: "Rent & Security Deposits",
    description: "Legal requirements for rent collection and security deposit handling",
    content: [
      {
        title: "Rent Payment Rules",
        legalBasis: "F.S. § 83.56 - Termination for nonpayment of rent",
        details: [
          "Rent is due when specified in lease agreement",
          "Grace period only if specified in lease",
          "Late fees must be reasonable and specified in lease",
          "Landlord must provide 3 days written notice before eviction for nonpayment",
          "Partial payments may be accepted without waiving right to evict"
        ],
        timeframes: [
          "3 days written notice required for nonpayment eviction",
          "Tenant has right to cure by paying full amount within 3 days"
        ]
      },
      {
        title: "Security Deposit Protections",
        legalBasis: "F.S. § 83.49 - Security deposits",
        details: [
          "Maximum security deposit varies by county (typically 1-2 months rent)",
          "Must be held in separate account or bonded",
          "Landlord must pay interest if required by local ordinance",
          "Cannot be used for normal wear and tear",
          "Detailed written notice required for any deductions"
        ],
        timeframes: [
          "15 days to return deposit if no deductions",
          "30 days to return deposit with itemized deductions",
          "Tenant has 15 days to object to deductions in writing"
        ],
        consequences: [
          "Landlord may forfeit right to retain any portion if improper notice given",
          "Tenant may recover damages plus attorney fees for wrongful retention"
        ]
      },
      {
        title: "Common Payment Disputes",
        details: [
          "Disputes over late fees and their reasonableness",
          "Arguments about partial payment acceptance",
          "Confusion over security deposit vs. last month's rent",
          "Disagreements about utility payment responsibilities",
          "Issues with application fees and move-in costs"
        ]
      }
    ]
  },
  {
    id: "habitability-standards",
    title: "Habitability & Living Conditions",
    description: "Landlord obligations for maintaining safe and livable rental properties",
    content: [
      {
        title: "Warranty of Habitability",
        legalBasis: "F.S. § 83.51 - Landlord obligations",
        details: [
          "Landlord must maintain premises in good repair and comply with applicable building, housing, and health codes",
          "Must keep common areas clean and safe",
          "Must maintain electrical, plumbing, sanitary, heating, ventilating, and air conditioning systems",
          "Must provide functioning facilities for heat, running water, and hot water",
          "Must provide adequate locks and keys for unit security",
          "Must maintain structural components including roofs, windows, screens, doors, floors, steps, porches, exterior walls, and foundations"
        ],
        consequences: [
          "Tenant may terminate lease with 7 days written notice if landlord fails to maintain habitability",
          "Tenant may withhold rent after proper notice procedures",
          "Tenant may seek damages for uninhabitable conditions"
        ]
      },
      {
        title: "Health and Safety Issues",
        details: [
          "Landlord must address mold issues that affect habitability",
          "Must disclose known lead paint hazards in pre-1978 properties",
          "Must provide information about asbestos if known to exist",
          "Cannot retaliate against tenant for reporting environmental hazards",
          "Must maintain smoke detectors and carbon monoxide detectors as required"
        ]
      },
      {
        title: "Pest Control Responsibilities",
        legalBasis: "F.S. § 83.51(2)(a)",
        details: [
          "Landlord responsible for extermination of pests in common areas",
          "Landlord responsible for extermination of wood-destroying organisms",
          "Tenant responsible for keeping unit clean to prevent attraction of pests",
          "Tenant may be responsible for pest control if infestation caused by tenant's conduct"
        ]
      },
      {
        title: "Common Field Situations",
        details: [
          "Tenants calling about no heat/AC during extreme weather",
          "Complaints about water leaks or plumbing failures",
          "Disputes over who is responsible for pest problems",
          "Arguments about maintenance delays and emergency repairs",
          "Tenants refusing to pay rent due to habitability issues"
        ]
      }
    ]
  },
  {
    id: "eviction-procedures",
    title: "Eviction Process & Legal Procedures",
    description: "Legal eviction procedures and what officers need to know about the process",
    content: [
      {
        title: "Grounds for Eviction",
        legalBasis: "F.S. Chapter 83, Part II - Landlord and Tenant",
        details: [
          "Nonpayment of rent (3 day notice required)",
          "Material violation of lease terms (7 day notice with right to cure)",
          "Repeat violations within 12 months (7 day notice, no cure)",
          "Criminal activity on premises (immediate notice)",
          "Holdover after lease expiration (varies by lease type)",
          "Violation of Florida law (7 day notice)"
        ]
      },
      {
        title: "Required Notice Periods",
        timeframes: [
          "3 days for nonpayment of rent",
          "7 days for curable lease violations",
          "7 days for non-curable repeat violations",
          "30 days for month-to-month tenancy termination",
          "15 days for week-to-week tenancy termination"
        ],
        details: [
          "Notice must be in writing and properly served",
          "Must specify exact reason and cure period if applicable",
          "Cannot combine different types of notices",
          "Must allow full cure period before filing lawsuit"
        ]
      },
      {
        title: "Court Process Requirements",
        details: [
          "Landlord must file lawsuit in county court after notice period expires",
          "Tenant has right to respond and contest eviction",
          "Sheriff executes final eviction order, not landlord",
          "Tenant has right to legal representation",
          "Judge determines if eviction is proper under law",
          "Appeals process available for both parties"
        ]
      },
      {
        title: "Officer's Role in Evictions",
        details: [
          "Only sheriff's deputies can execute court-ordered evictions",
          "Verify court order is valid and current before acting",
          "Allow reasonable time for tenant to gather belongings",
          "Document condition of premises and any abandoned property",
          "Do not remove tenants without proper court order",
          "Arrest for trespass only after legal eviction is complete"
        ]
      }
    ]
  },
  {
    id: "illegal-eviction-practices",
    title: "Illegal Eviction & Self-Help Prohibitions",
    description: "What landlords cannot do and potential criminal violations",
    content: [
      {
        title: "Self-Help Eviction Prohibitions",
        legalBasis: "F.S. § 83.67 - Prohibited practices",
        details: [
          "Cannot change locks without providing immediate access",
          "Cannot shut off utilities to force tenant out",
          "Cannot remove tenant's belongings from unit",
          "Cannot physically remove tenant without court order",
          "Cannot harass or threaten tenant to leave",
          "Cannot block access to common areas or parking"
        ],
        consequences: [
          "Tenant entitled to damages plus attorney fees",
          "Criminal charges possible for illegal eviction methods",
          "Landlord may be ordered to restore utilities/access"
        ]
      },
      {
        title: "Potential Criminal Violations",
        details: [
          "Theft - removing tenant's belongings without court order",
          "Criminal mischief - damaging tenant's property",
          "Trespass - entering unit without proper notice",
          "Harassment - repeated unwanted contact to force move-out",
          "Assault/battery - physical confrontations",
          "Extortion - demanding money under threat of illegal eviction"
        ]
      }
    ]
  },
  {
    id: "privacy-entry-rights",
    title: "Privacy & Landlord Entry Rights",
    description: "Tenant privacy rights and landlord's limited right of entry",
    content: [
      {
        title: "Notice Requirements for Entry",
        legalBasis: "F.S. § 83.53 - Landlord's access to dwelling unit",
        details: [
          "12 hours advance notice required for non-emergency entry",
          "Entry only between 7:30 AM and 8:00 PM unless tenant consents",
          "Must specify reasonable purpose for entry",
          "Tenant may refuse entry except for specific legal purposes",
          "Cannot abuse right of access or harass tenant"
        ],
        timeframes: [
          "12 hours minimum notice required",
          "Entry permitted 7:30 AM to 8:00 PM only"
        ]
      },
      {
        title: "Permitted Reasons for Entry",
        details: [
          "Inspect premises for damage or needed repairs",
          "Make necessary or agreed-upon repairs",
          "Show unit to prospective tenants, buyers, or contractors",
          "Supply essential services as specified in lease",
          "Court order or other legal process",
          "Emergency situations threatening property or safety"
        ]
      }
    ]
  },
  {
    id: "discrimination-retaliation",
    title: "Discrimination & Retaliation Protection",
    description: "Fair housing protections and anti-retaliation laws",
    content: [
      {
        title: "Protected Classes Under Fair Housing",
        legalBasis: "Federal Fair Housing Act & Florida Fair Housing Act",
        details: [
          "Race, color, national origin",
          "Religion and familial status",
          "Sex and disability",
          "Age (in some jurisdictions)",
          "Sexual orientation and gender identity (varies by locality)",
          "Source of income (varies by locality)",
          "Military status (federal protection)"
        ]
      },
      {
        title: "Anti-Retaliation Protections",
        legalBasis: "F.S. § 83.64 - Retaliatory conduct prohibited",
        details: [
          "Cannot retaliate for complaints to authorities",
          "Cannot retaliate for exercising legal rights",
          "Cannot retaliate for organizing tenant unions",
          "Cannot retaliate for requesting repairs",
          "Presumption of retaliation if action taken within 6 months of protected activity"
        ],
        consequences: [
          "Tenant may recover actual damages",
          "Attorney fees and court costs recoverable",
          "Punitive damages possible in some cases"
        ]
      }
    ]
  },
  {
    id: "lease-termination",
    title: "Lease Termination & Move-Out Rights",
    description: "Legal procedures for ending tenancy and move-out protections",
    content: [
      {
        title: "Early Termination Rights",
        legalBasis: "F.S. § 83.595 - Domestic violence protection",
        details: [
          "Domestic violence victims may terminate with proper documentation",
          "Military personnel have federal SCRA protections",
          "Uninhabitable conditions may justify early termination",
          "Landlord's material breach may allow termination"
        ],
        timeframes: [
          "30 days notice for domestic violence termination"
        ]
      },
      {
        title: "Abandoned Property Rights",
        legalBasis: "F.S. § 83.67 - Disposition of personal property remaining on premises",
        details: [
          "Landlord must store abandoned property for 10 days",
          "Must provide written notice of intent to dispose",
          "Tenant responsible for reasonable storage costs",
          "Valuable items (>$500) require additional procedures",
          "Personal papers and photos must be held for 30 days"
        ]
      }
    ]
  }
];

export const tenantRightsResources = {
  emergencyContacts: [
    {
      organization: "Florida Attorney General's Office",
      phone: "1-866-966-7226",
      purpose: "Consumer protection and landlord-tenant disputes"
    },
    {
      organization: "Legal Aid Organizations",
      phone: "Varies by county",
      purpose: "Free legal assistance for low-income tenants"
    },
    {
      organization: "HUD Fair Housing Hotline",
      phone: "1-800-669-9777",
      purpose: "Housing discrimination complaints"
    },
    {
      organization: "Clerk of Court (Civil Division)",
      phone: "Varies by county",
      purpose: "Eviction court records and procedures"
    }
  ],
  keyStatutes: [
    "F.S. Chapter 83 - Landlord and Tenant",
    "F.S. § 760.20-760.37 - Fair Housing Act",
    "F.S. § 83.595 - Domestic Violence Protections",
    "F.S. § 83.67 - Prohibited Practices"
  ]
};
