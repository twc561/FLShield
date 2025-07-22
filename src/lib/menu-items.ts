
import * as React from "react"
import { 
  Shield, 
  Crown,
  Smartphone,
  Download,
  Bot,
  ShieldQuestion,
  MessageSquare,
  FileCheck,
  Siren,
  AlertCircle,
  HeartPulse,
  Biohazard,
  FlaskConical,
  Wind,
  ListChecks,
  Languages,
  Building,
  Newspaper,
  Activity,
  CreditCard,
  Lock,
  Stethoscope,
  Truck,
  Dog,
  Heart,
  Users,
  Search,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  Brain,
  Car,
  Home,
  ShoppingCart,
  UserSearch,
  FileBadge,
  TrafficCone,
  ShieldAlert,
  KeyRound,
  Gavel,
  ClipboardEdit,
  Camera,
  ShieldCheck,
  Scale,
  Fish,
  GraduationCap,
  Mic,
  BrainCircuit,
  Zap,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  Plus,
  Bookmark
} from "lucide-react"

type SubMenuItem = {
  href: string
  label: string
  icon: React.ElementType
  isPremium?: boolean
  isNew?: boolean
  isPopular?: boolean
  lastUsed?: string
  usageCount?: number
  tags?: string[]
}

type MenuItem = {
  href?: string
  label: string
  icon: React.ElementType
  items?: SubMenuItem[]
  priority?: 'critical' | 'high' | 'medium' | 'low'
  category?: 'emergency' | 'daily' | 'reference' | 'training' | 'admin'
}

type MenuSection = {
  title: string
  description: string
  items: MenuItem[]
  icon: React.ElementType
  color: string
}

// Enhanced menu structure with smart organization
export const menuSections: MenuSection[] = [
  {
    title: "Emergency & Critical Response",
    description: "Time-sensitive tools for emergency situations",
    icon: Siren,
    color: "text-red-600",
    items: [
      {
        label: "Emergency Response Protocols",
        icon: Siren,
        priority: 'critical',
        category: 'emergency',
        items: [
          { 
            href: "/emergency-response/baker-act-guide", 
            label: "Baker Act Procedures", 
            icon: Heart,
            isPopular: true,
            tags: ["mental health", "emergency", "involuntary"] 
          },
          { 
            href: "/emergency-response/alert-guides", 
            label: "Emergency Alert Protocols", 
            icon: AlertCircle,
            tags: ["amber alert", "silver alert", "blue alert"]
          },
          { 
            href: "/emergency-response/first-aid-guide", 
            label: "Field First Aid Guide", 
            icon: HeartPulse,
            isPopular: true,
            tags: ["medical", "first aid", "emergency"]
          },
          { 
            href: "/emergency-response/hazmat-guide", 
            label: "HAZMAT Response Guide", 
            icon: Biohazard,
            tags: ["hazmat", "chemical", "safety"]
          },
          { 
            href: "/emergency-response/marchman-act-guide", 
            label: "Marchman Act Procedures", 
            icon: FlaskConical,
            tags: ["substance abuse", "involuntary", "assessment"]
          },
        ],
      },
      {
        label: "Field Operations & Procedures",
        icon: ShieldCheck,
        priority: 'critical',
        category: 'daily',
        items: [
          { 
            href: "/field-procedures/scenario-checklists", 
            label: "Field Scenario Checklists", 
            icon: ListChecks,
            isPopular: true,
            tags: ["checklist", "procedures", "scenarios"]
          },
          { 
            href: "/traffic-enforcement/dui-investigation", 
            label: "DUI Investigation Guide", 
            icon: Car,
            isPopular: true,
            tags: ["dui", "traffic", "investigation"]
          },
          { 
            href: "/field-procedures/domestic-violence-protocol", 
            label: "Domestic Violence Protocol", 
            icon: ShieldAlert,
            isPopular: true,
            tags: ["domestic violence", "dv", "protocol"]
          },
          { 
            href: "/reporting-development/use-of-force-wizard", 
            label: "Use of Force Articulation", 
            icon: ShieldCheck,
            isPremium: true,
            isPopular: true,
            tags: ["use of force", "graham factors", "articulation"]
          },
        ],
      },
    ]
  },
  {
    title: "AI-Powered Tools",
    description: "Advanced AI assistance for modern policing",
    icon: Bot,
    color: "text-blue-600",
    items: [
      {
        label: "AI Assistant Tools",
        icon: Bot,
        priority: 'high',
        category: 'daily',
        items: [
          { 
            href: "/ai-legal-advisor", 
            label: "AI Legal Advisor", 
            icon: ShieldQuestion,
            isPremium: true,
            isNew: true,
            tags: ["ai", "legal", "advisor", "policy"]
          },
          { 
            href: "/reporting-development/ai-charge-assistant", 
            label: "AI Charge Assistant", 
            icon: Gavel,
            isPremium: true,
            isPopular: true,
            tags: ["charges", "ai", "assistant", "elements"]
          },
          { 
            href: "/reporting-development/ai-report-writer", 
            label: "AI Report Assistant", 
            icon: ClipboardEdit,
            isPremium: true,
            isPopular: true,
            tags: ["report writing", "ai", "narrative"]
          },
          { 
            href: "/training-development/role-play-simulator", 
            label: "AI Role-Play Simulator", 
            icon: MessageSquare,
            isPremium: true,
            isNew: true,
            tags: ["training", "roleplay", "simulation", "ai"]
          },
          { 
            href: "/field-procedures/visual-evidence-identifier", 
            label: "Visual Evidence ID", 
            icon: Camera,
            isPremium: true,
            isNew: true,
            tags: ["evidence", "identification", "visual", "ai"]
          },
          { 
            href: "/training-development/report-proofreader", 
            label: "Report Writing Feedback", 
            icon: FileCheck,
            isPremium: true,
            tags: ["proofreading", "feedback", "reports"]
          },
        ],
      },
    ]
  },
  {
    title: "Legal Reference & Research",
    description: "Comprehensive legal resources and search tools",
    icon: Scale,
    color: "text-green-600",
    items: [
      {
        label: "Legal Reference Library",
        icon: Scale,
        priority: 'high',
        category: 'reference',
        items: [
          { 
            href: "/legal-reference/statutes", 
            label: "Florida Statutes", 
            icon: Scale,
            isPopular: true,
            tags: ["statutes", "florida", "laws"]
          },
          { 
            href: "/legal-reference/case-law", 
            label: "Case Law Database", 
            icon: Gavel,
            isPopular: true,
            tags: ["case law", "decisions", "precedent"]
          },
          { 
            href: "/legal-reference/constitutional-law-guide", 
            label: "Constitutional Law", 
            icon: ShieldAlert,
            isPremium: true,
            tags: ["constitution", "fourth amendment", "rights"]
          },
          { 
            href: "/legal-reference/miranda-warning-guide", 
            label: "Miranda Rights Guide", 
            icon: ShieldCheck,
            isPopular: true,
            tags: ["miranda", "rights", "interrogation"]
          },
          { 
            href: "/legal-reference/rules-of-criminal-procedure", 
            label: "Criminal Procedure Rules", 
            icon: FileText,
            isPremium: true,
            tags: ["criminal procedure", "rules", "court"]
          },
          { 
            href: "/legal-reference/jury-instructions-navigator", 
            label: "Standard Jury Instructions", 
            icon: Users,
            isPremium: true,
            tags: ["jury instructions", "elements", "standard"]
          },
        ],
      },
    ]
  },
  {
    title: "Training & Development",
    description: "Professional development and skill building",
    icon: GraduationCap,
    color: "text-purple-600",
    items: [
      {
        label: "Training & Professional Development",
        icon: GraduationCap,
        priority: 'medium',
        category: 'training',
        items: [
          { 
            href: "/reporting-development/knowledge-check", 
            label: "Knowledge Assessment Drills", 
            icon: BrainCircuit,
            isPremium: true,
            isPopular: true,
            tags: ["assessment", "knowledge", "drills", "testing"]
          },
          { 
            href: "/training-development/common-misperceptions", 
            label: "Common Field Pitfalls", 
            icon: ShieldAlert,
            isPremium: true,
            tags: ["mistakes", "pitfalls", "common errors"]
          },
          { 
            href: "/officer-wellness-rights/court-testimony-guide", 
            label: "Court Testimony Preparation", 
            icon: Mic,
            isPremium: true,
            tags: ["testimony", "court", "preparation"]
          },
          { 
            href: "/field-procedures/interview-techniques", 
            label: "Interview Techniques", 
            icon: Users,
            isPremium: true,
            tags: ["interview", "techniques", "rapport"]
          },
        ],
      },
    ]
  },
  {
    title: "Specialized Enforcement",
    description: "Specialized units and enforcement areas",
    icon: Search,
    color: "text-orange-600",
    items: [
      {
        label: "Specialized Enforcement",
        icon: Search,
        priority: 'medium',
        category: 'reference',
        items: [
          { 
            href: "/specialized-enforcement/controlled-substances-guide", 
            label: "Drug Identification Guide", 
            icon: FlaskConical,
            isPremium: true,
            isPopular: true,
            tags: ["drugs", "controlled substances", "identification"]
          },
          { 
            href: "/specialized-enforcement/k9-officer-guide", 
            label: "K-9 Operations Manual", 
            icon: Dog,
            isPremium: true,
            tags: ["k9", "canine", "operations"]
          },
          { 
            href: "/traffic-enforcement/commercial-vehicle-info", 
            label: "Commercial Vehicle Guide", 
            icon: Truck,
            isPremium: true,
            tags: ["commercial vehicles", "cdl", "weight limits"]
          },
          { 
            href: "/specialized-enforcement/fwc-regulations-guide", 
            label: "Fish & Wildlife Regulations", 
            icon: Fish,
            isPremium: true,
            tags: ["fwc", "wildlife", "regulations"]
          },
          { 
            href: "/specialized-enforcement/animal-cruelty-investigation", 
            label: "Animal Cruelty Guide", 
            icon: Stethoscope,
            isPremium: true,
            tags: ["animal cruelty", "investigation"]
          },
        ],
      },
    ]
  },
  {
    title: "Officer Wellness & Support",
    description: "Mental health, wellness, and support resources",
    icon: Heart,
    color: "text-pink-600",
    items: [
      {
        label: "Officer Wellness & Rights",
        icon: Heart,
        priority: 'high',
        category: 'daily',
        items: [
          
          { 
            href: "/officer-wellness-rights/police-officers-bill-of-rights", 
            label: "Police Officer's Bill of Rights", 
            icon: ShieldCheck,
            isPremium: true,
            tags: ["pobr", "rights", "investigation"]
          },
          { 
            href: "/officer-wellness-rights/community-engagement-guide", 
            label: "Community Relations Guide", 
            icon: Users,
            isPremium: true,
            tags: ["community", "engagement", "relations"]
          },
          { 
            href: "/wellness/stress-management-techniques", 
            label: "Stress Management", 
            icon: Activity,
            tags: ["stress", "management", "wellness"]
          },
        ],
      },
    ]
  },
  {
    title: "Account & System",
    description: "Account management and system tools",
    icon: Settings,
    color: "text-gray-600",
    items: [
      {
        label: "Account & Billing",
        icon: CreditCard,
        priority: 'low',
        category: 'admin',
        items: [
          { 
            href: "/subscription", 
            label: "Upgrade to Pro", 
            icon: CreditCard,
            tags: ["subscription", "upgrade", "pro"]
          },
          { 
            href: "/account/subscription", 
            label: "Subscription Management", 
            icon: Settings,
            tags: ["billing", "subscription", "management"]
          },
          { 
            href: "/account/usage", 
            label: "Usage Analytics", 
            icon: TrendingUp,
            isPremium: true,
            tags: ["analytics", "usage", "statistics"]
          },
          { 
            href: "/account/security", 
            label: "Account Security", 
            icon: Lock,
            tags: ["security", "2fa", "login"]
          },
        ],
      },
      {
        label: "Tools & Utilities",
        icon: Settings,
        priority: 'low',
        category: 'admin',
        items: [
          { 
            href: "/notes", 
            label: "Digital Field Notes", 
            icon: ClipboardEdit,
            isPremium: true,
            isPopular: true,
            tags: ["notes", "field notes", "documentation"]
          },
          { 
            href: "/install", 
            label: "Install App", 
            icon: Smartphone,
            tags: ["install", "app", "mobile"]
          },
          { 
            href: "/field-translation-guide", 
            label: "Field Translator", 
            icon: Languages,
            isPremium: true,
            tags: ["translation", "languages", "field"]
          },
        ],
      },
    ]
  }
];

// Legacy menu items for backward compatibility
export const menuItems: MenuItem[] = menuSections.flatMap(section => section.items);

// Smart menu helpers
export const getPopularItems = () => {
  return menuSections
    .flatMap(section => section.items)
    .flatMap(item => item.items || [])
    .filter(item => item.isPopular)
    .slice(0, 8);
};

export const getNewItems = () => {
  return menuSections
    .flatMap(section => section.items)
    .flatMap(item => item.items || [])
    .filter(item => item.isNew)
    .slice(0, 6);
};

export const getCriticalItems = () => {
  return menuSections
    .filter(section => section.items.some(item => item.priority === 'critical'))
    .flatMap(section => section.items)
    .filter(item => item.priority === 'critical')
    .flatMap(item => item.items || [])
    .slice(0, 10);
};

export const searchMenuItems = (query: string) => {
  const searchTerm = query.toLowerCase();
  const results: (SubMenuItem & { category: string })[] = [];

  menuSections.forEach(section => {
    section.items.forEach(menuItem => {
      if (menuItem.items) {
        menuItem.items.forEach(subItem => {
          const matchScore = 
            (subItem.label.toLowerCase().includes(searchTerm) ? 10 : 0) +
            (subItem.tags?.some(tag => tag.includes(searchTerm)) ? 5 : 0) +
            (section.title.toLowerCase().includes(searchTerm) ? 3 : 0);

          if (matchScore > 0) {
            results.push({
              ...subItem,
              category: menuItem.label,
              matchScore
            });
          }
        });
      }
    });
  });

  return results.sort((a, b) => (b as any).matchScore - (a as any).matchScore);
};
