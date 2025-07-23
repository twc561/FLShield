
'use client';

import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  MapPin, 
  Search, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Shield,
  Clock,
  Radio,
  Car,
  Users,
  Mic,
  Phone,
  FileText,
  BarChart3,
  Activity,
  Navigation
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AccordionSectionProps {
  id: string;
  title: string;
  icon: React.ElementType;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  variant?: 'default' | 'priority' | 'alert';
  badge?: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  children,
  variant = 'default',
  badge
}) => {
  const headerBg = variant === 'priority' ? 'bg-navy-900' : 
                   variant === 'alert' ? 'bg-red-900/20' : 
                   'bg-muted/20';
  
  const iconColor = variant === 'priority' ? 'text-gold-400' :
                    variant === 'alert' ? 'text-red-400' :
                    'text-primary';

  return (
    <Card className="mb-3 overflow-hidden border-border/50">
      <button
        onClick={() => onToggle(id)}
        className={`w-full p-4 ${headerBg} hover:bg-opacity-80 transition-colors flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span className="font-medium text-foreground">{title}</span>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="p-4 pt-0">
              {children}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default function AICentricDashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [mounted, setMounted] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(['ai-briefing']) // AI Priority Briefing expanded by default
  );
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 pb-20">
      {/* Header Status Bar */}
      <div className="sticky top-0 z-10 bg-navy-900/95 backdrop-blur-sm border-b border-gold-400/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gold-400/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Officer {user?.displayName || 'Shield'}</p>
              <p className="text-xs text-gold-400">On Patrol - Zone 4</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white font-mono">{currentTime.toLocaleTimeString()}</p>
            <p className="text-xs text-gold-400">Active</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 max-w-md mx-auto">
        {/* AI Priority Briefing - Always First */}
        <AccordionSection
          id="ai-briefing"
          title="AI Priority Briefing"
          icon={Bot}
          isExpanded={expandedSections.has('ai-briefing')}
          onToggle={toggleSection}
          variant="priority"
          badge="3 Alerts"
        >
          <div className="space-y-3">
            <Alert className="border-yellow-500/50 bg-yellow-500/10">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-sm">
                <strong>BOLO Alert:</strong> White Ford F-150, License: ABC-1234, last seen 2 miles from your location (I-95 & Commercial Blvd)
              </AlertDescription>
            </Alert>
            
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm">
                <strong>Trend Alert:</strong> 3 vehicle break-ins reported in your patrol zone in the last 2 hours
              </AlertDescription>
            </Alert>

            <Alert className="border-green-500/50 bg-green-500/10">
              <Activity className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-sm">
                <strong>Intel Update:</strong> Traffic enforcement detail at US-1 & Sunrise showing 23% reduction in speeding violations
              </AlertDescription>
            </Alert>
          </div>
        </AccordionSection>

        {/* Active Call Details */}
        <AccordionSection
          id="active-call"
          title="Active Call: Traffic Accident"
          icon={Radio}
          isExpanded={expandedSections.has('active-call')}
          onToggle={toggleSection}
          variant="alert"
          badge="Priority 2"
        >
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-sm">1755 E Sunrise Blvd, Fort Lauderdale</p>
                  <p className="text-xs text-muted-foreground">2.3 miles • 4 min arrival</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><strong>CAD Notes:</strong> Minor rear-end collision, no injuries reported, traffic backing up in eastbound lanes</p>
              <p className="text-xs text-muted-foreground"><strong>Premise History:</strong> 2 prior calls to this intersection (traffic incidents)</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Navigation className="h-4 w-4 mr-2" />
                Navigate
              </Button>
              <Button size="sm" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Request Backup
              </Button>
            </div>
          </div>
        </AccordionSection>

        {/* Quick Actions & Search */}
        <AccordionSection
          id="quick-actions"
          title="Quick Actions & Search"
          icon={Search}
          isExpanded={expandedSections.has('quick-actions')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                size="lg" 
                className="h-16 flex flex-col gap-1 bg-navy-800 hover:bg-navy-700"
                onClick={() => router.push('/field-procedures/visual-evidence-identifier')}
              >
                <Car className="h-5 w-5" />
                <span className="text-xs">Run Plate</span>
              </Button>
              
              <Button 
                size="lg" 
                className="h-16 flex flex-col gap-1 bg-navy-800 hover:bg-navy-700"
                onClick={() => router.push('/ai-tools')}
              >
                <Users className="h-5 w-5" />
                <span className="text-xs">Run Person</span>
              </Button>
              
              <Button 
                size="lg" 
                className="h-16 flex flex-col gap-1 bg-navy-800 hover:bg-navy-700"
                onClick={() => router.push('/reporting-development/ai-report-writer')}
              >
                <FileText className="h-5 w-5" />
                <span className="text-xs">Field Report</span>
              </Button>
              
              <Button 
                size="lg" 
                className="h-16 flex flex-col gap-1 bg-navy-800 hover:bg-navy-700"
                onClick={() => router.push('/legal-reference/statutes')}
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs">Check Statute</span>
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search Florida Shield..."
                className="pl-10 pr-12 bg-muted/20"
              />
              <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </AccordionSection>

        {/* Patrol Zone Intel */}
        <AccordionSection
          id="patrol-intel"
          title="Patrol Zone Intel"
          icon={BarChart3}
          isExpanded={expandedSections.has('patrol-intel')}
          onToggle={toggleSection}
          badge="Zone 4"
        >
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2">Recent Activity (Last 8 Hours)</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span>Vehicle Break-ins</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Traffic Stops</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Welfare Checks</span>
                  <Badge variant="secondary">2</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Active BOLOs in Zone</h4>
              <div className="text-xs text-muted-foreground">
                <p>• Suspect: B/M, 25-30 yrs, red shirt (shoplifting)</p>
                <p>• Vehicle: Blue Honda Civic, damage to rear bumper</p>
              </div>
            </div>

            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/agency-intelligence')}
            >
              View Full Intel Report
            </Button>
          </div>
        </AccordionSection>

        {/* Emergency Tools */}
        <AccordionSection
          id="emergency-tools"
          title="Emergency Response Tools"
          icon={AlertTriangle}
          isExpanded={expandedSections.has('emergency-tools')}
          onToggle={toggleSection}
          variant="alert"
        >
          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="destructive" 
              className="justify-start"
              onClick={() => router.push('/emergency-response/baker-act-guide')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Baker Act Assessment
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => router.push('/emergency-response/first-aid-guide')}
            >
              <Activity className="h-4 w-4 mr-2" />
              First Aid Protocols
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => router.push('/emergency-response/hazmat-guide')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              HAZMAT Response
            </Button>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
