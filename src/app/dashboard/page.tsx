'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  Clock, 
  Radio, 
  Car, 
  Users, 
  BookOpen, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Bell,
  Target,
  Briefcase,
  Eye,
  Phone,
  Scale,
  Heart,
  Zap
} from 'lucide-react';
import AICommandSearch from '@/components/AICommandSearch';
import { useContextualDashboard } from '@/hooks/use-contextual-dashboard';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  priority: 'high' | 'medium';
}

interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge?: {
    text: string;
    variant: 'default' | 'destructive' | 'warning' | 'secondary';
  };
  priority: 'critical' | 'operational' | 'administrative';
}

interface ToolsMenuItem {
  id: string;
  title: string;
  icon: React.ElementType;
  items: {
    label: string;
    href: string;
    description: string;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { contextualData, isLoading } = useContextualDashboard();
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [currentShift, setCurrentShift] = useState('Day Watch - Alpha');

  // Quick Actions - Most time-sensitive operations
  const quickActions: QuickAction[] = [
    { id: 'run-plate', label: 'Run Plate', icon: Car, href: '/field-procedures/vehicle-lookup', priority: 'high' },
    { id: 'new-report', label: 'New Report', icon: FileText, href: '/reports', priority: 'high' },
    { id: 'check-warrant', label: 'Check Warrant', icon: Target, href: '/legal-reference/warrant-check', priority: 'high' },
    { id: 'e-ticket', label: 'E-Ticket', icon: FileText, href: '/traffic-enforcement/e-citation', priority: 'medium' }
  ];

  // Primary Dashboard Modules - Core operational functions
  const dashboardModules: DashboardModule[] = [
    {
      id: 'active-alerts',
      title: 'Active Alerts',
      description: 'BOLOs, APBs, and urgent notifications',
      icon: AlertTriangle,
      href: '/alerts/active',
      badge: activeAlerts > 0 ? { text: activeAlerts.toString(), variant: 'destructive' } : undefined,
      priority: 'critical'
    },
    {
      id: 'my-cases',
      title: 'My Cases',
      description: 'Active investigations and follow-ups',
      icon: Briefcase,
      href: '/cases/active',
      badge: { text: '7', variant: 'default' },
      priority: 'operational'
    },
    {
      id: 'patrol-log',
      title: 'Patrol Log',
      description: 'Current shift activities and locations',
      icon: MapPin,
      href: '/patrol/log',
      priority: 'operational'
    },
    {
      id: 'radio-traffic',
      title: 'Radio Traffic',
      description: 'Live dispatch and unit communications',
      icon: Radio,
      href: '/dispatch/radio',
      badge: { text: 'Live', variant: 'secondary' },
      priority: 'critical'
    },
    {
      id: 'ai-advisor',
      title: 'AI Legal Advisor',
      description: 'Instant legal guidance and case analysis',
      icon: Scale,
      href: '/ai-legal-advisor',
      priority: 'operational'
    },
    {
      id: 'field-notes',
      title: 'Field Notes',
      description: 'Quick notes and observations',
      icon: FileText,
      href: '/notes',
      priority: 'operational'
    }
  ];

  // Tools & Resources - Less frequent but important functions
  const toolsMenuItems: ToolsMenuItem[] = [
    {
      id: 'department',
      title: 'Department Directory',
      icon: Users,
      items: [
        { label: 'Unit Directory', href: '/directory/units', description: 'Officer contacts and assignments' },
        { label: 'Chain of Command', href: '/directory/command', description: 'Supervisory structure' },
        { label: 'Emergency Contacts', href: '/directory/emergency', description: '24/7 critical contacts' }
      ]
    },
    {
      id: 'legal-reference',
      title: 'Legal Code Reference',
      icon: BookOpen,
      items: [
        { label: 'Florida Statutes', href: '/legal-reference/statutes', description: 'Searchable statute database' },
        { label: 'Case Law', href: '/legal-reference/case-law', description: 'Recent legal precedents' },
        { label: 'Procedures Manual', href: '/legal-reference/procedures', description: 'Department SOPs' }
      ]
    },
    {
      id: 'training',
      title: 'Training Materials',
      icon: BookOpen,
      items: [
        { label: 'Daily Briefing', href: '/daily-briefing', description: 'Shift briefing and updates' },
        { label: 'Role Play Simulator', href: '/training-development/role-play-simulator', description: 'Interactive scenarios' },
        { label: 'Knowledge Checks', href: '/reporting-development/knowledge-check', description: 'Skill assessments' }
      ]
    },
    {
      id: 'wellness',
      title: 'Officer Wellness',
      icon: Heart,
      items: [
        { label: 'Active Listener', href: '/wellness/active-listener', description: 'Confidential AI support' },
        { label: 'Stress Management', href: '/wellness/stress-management-techniques', description: 'Wellness resources' },
        { label: 'Critical Incident Support', href: '/wellness/live-debrief', description: 'Post-incident guidance' }
      ]
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: Settings,
      items: [
        { label: 'Account Settings', href: '/account', description: 'Profile and preferences' },
        { label: 'Security Settings', href: '/security', description: 'Authentication and access' },
        { label: 'Notification Settings', href: '/settings/notifications', description: 'Alert preferences' }
      ]
    }
  ];

  const handleModuleClick = (module: DashboardModule) => {
    router.push(module.href);
  };

  const handleQuickAction = (action: QuickAction) => {
    router.push(action.href);
  };

  const criticalModules = dashboardModules.filter(m => m.priority === 'critical');
  const operationalModules = dashboardModules.filter(m => m.priority === 'operational');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section: Search & Quick Actions */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-700 px-4 pt-8 pb-6">
        {/* Shift Status Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Florida Shield</h1>
              <p className="text-sm text-slate-300">{currentShift}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Dominant Search Bar */}
        <div className="mb-4">
          <AICommandSearch />
        </div>

        {/* Quick Actions - Gradient Integrated */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.slice(0, 4).map((action) => (
            <Button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              variant="secondary"
              className={`
                h-14 flex-col gap-1 text-xs font-medium transition-all duration-200
                ${action.priority === 'high' 
                  ? 'bg-slate-700/80 hover:bg-slate-600/80 border-amber-400/20' 
                  : 'bg-slate-700/60 hover:bg-slate-600/60 border-slate-600/40'
                }
                backdrop-blur-sm border text-white
              `}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content: Modular Dashboard */}
      <div className="px-4 py-6 space-y-6">
        {/* Critical Priority Modules */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-white">Critical Operations</h2>
          </div>
          {criticalModules.map((module) => (
            <Card 
              key={module.id} 
              className="bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              onClick={() => handleModuleClick(module)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      module.priority === 'critical' ? 'bg-red-900/30' : 'bg-blue-900/30'
                    }`}>
                      <module.icon className={`w-5 h-5 ${
                        module.priority === 'critical' ? 'text-red-400' : 'text-blue-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{module.title}</h3>
                      <p className="text-sm text-slate-400">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {module.badge && (
                      <Badge variant={module.badge.variant}>
                        {module.badge.text}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Operational Modules */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Operational Tools</h2>
          <div className="grid gap-3">
            {operationalModules.map((module) => (
              <Card 
                key={module.id} 
                className="bg-slate-800/60 border-slate-700 hover:bg-slate-700/60 transition-all duration-200 cursor-pointer backdrop-blur-sm"
                onClick={() => handleModuleClick(module)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-900/20">
                        <module.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{module.title}</h3>
                        <p className="text-sm text-slate-400">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.badge && (
                        <Badge variant={module.badge.variant}>
                          {module.badge.text}
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Resources - Collapsible */}
        <div className="space-y-3">
          <Collapsible open={toolsMenuOpen} onOpenChange={setToolsMenuOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-slate-800/40 rounded-lg border border-slate-700 hover:bg-slate-700/40 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-white">Tools & Resources</h2>
              </div>
              {toolsMenuOpen ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-3 mt-3">
              {toolsMenuItems.map((category) => (
                <Card key={category.id} className="bg-slate-800/40 border-slate-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-slate-400" />
                      <CardTitle className="text-white text-base">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    {category.items.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="w-full justify-start text-left p-3 h-auto hover:bg-slate-700/40"
                        onClick={() => router.push(item.href)}
                      >
                        <div>
                          <div className="font-medium text-white">{item.label}</div>
                          <div className="text-sm text-slate-400">{item.description}</div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Status Footer */}
        <div className="pt-4 pb-8">
          <Alert className="bg-slate-800/60 border-slate-700">
            <Bell className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-slate-300">
              All systems operational. Last sync: {new Date().toLocaleTimeString()}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}