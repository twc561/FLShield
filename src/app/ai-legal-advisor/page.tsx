'use client';

import * as React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
    ShieldAlert, 
    Sparkles, 
    Loader2, 
    Bot, 
    Scale, 
    Gavel, 
    FileText, 
    Clock, 
    Bookmark,
    BookmarkCheck,
    Copy,
    Download,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    Search,
    Filter,
    TrendingUp,
    MessageSquare,
    Brain,
    Target,
    Eye
} from 'lucide-react';
import { getAdvisorResponse, type AdvisorOutput } from '@/ai/flows/legalAdvisor';
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from '@/hooks/use-toast';

interface ConversationEntry {
    id: string;
    timestamp: Date;
    scenario: string;
    result: AdvisorOutput;
    isBookmarked: boolean;
    tags: string[];
}

const ResultCard = ({ 
    title, 
    icon: Icon, 
    items, 
    variant = "default" 
}: { 
    title: string; 
    icon: React.ElementType; 
    items: { content: string; source: string }[]; 
    variant?: "default" | "critical" | "warning"
}) => {
    if (items.length === 0) return null;

    const borderColor = variant === "critical" ? "border-red-500/50" : 
                       variant === "warning" ? "border-yellow-500/50" : "border-border";

    return (
        <Card className={`bg-muted/30 hover:bg-muted/50 transition-colors ${borderColor}`}>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                    <Icon className={`h-5 w-5 ${
                        variant === "critical" ? "text-red-500" :
                        variant === "warning" ? "text-yellow-500" : "text-primary"
                    }`} />
                    {title}
                    <Badge variant="outline" className="ml-auto">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4 py-2">
                        <p className="text-foreground/90 leading-relaxed">{item.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                                {item.source}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(item.content)}
                                className="h-6 px-2"
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const QuickScenarios = ({ onSelect }: { onSelect: (scenario: string) => void }) => {
    const scenarios = [
        "During a wellness check, a subject is making threats but has not committed a crime. What are the criteria for an involuntary hold?",
        "A suspect consents to a vehicle search but then changes their mind halfway through. Can the search continue?",
        "An officer observes someone running from a high-crime area at night. What level of contact is justified?",
        "A domestic violence victim recants their statement. What are the officer's obligations?",
        "A suspect invokes Miranda rights during questioning. When can interrogation resume?",
        "An off-duty officer witnesses a crime in another jurisdiction. What are their authorities and limitations?"
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarios.map((scenario, index) => (
                <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start whitespace-normal"
                    onClick={() => onSelect(scenario)}
                >
                    <div className="flex items-start gap-3">
                        <Target className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span className="text-sm">{scenario}</span>
                    </div>
                </Button>
            ))}
        </div>
    );
};

const ConversationHistory = ({ 
    history, 
    onSelectConversation,
    onToggleBookmark,
    onClearHistory 
}: {
    history: ConversationEntry[];
    onSelectConversation: (entry: ConversationEntry) => void;
    onToggleBookmark: (id: string) => void;
    onClearHistory: () => void;
}) => {
    const [filter, setFilter] = React.useState<'all' | 'bookmarked'>('all');
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredHistory = history.filter(entry => {
        const matchesFilter = filter === 'all' || entry.isBookmarked;
        const matchesSearch = entry.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button
                    variant={filter === 'bookmarked' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(filter === 'all' ? 'bookmarked' : 'all')}
                >
                    <Bookmark className="h-4 w-4" />
                </Button>
                {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={onClearHistory}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                    {filteredHistory.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No conversations found</p>
                        </div>
                    ) : (
                        filteredHistory.map((entry) => (
                            <Card 
                                key={entry.id} 
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => onSelectConversation(entry)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium line-clamp-2 mb-2">
                                                {entry.scenario}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {entry.timestamp.toLocaleDateString()} {entry.timestamp.toLocaleTimeString()}
                                            </div>
                                            {entry.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {entry.tags.slice(0, 3).map((tag, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleBookmark(entry.id);
                                            }}
                                        >
                                            {entry.isBookmarked ? 
                                                <BookmarkCheck className="h-4 w-4 text-primary" /> : 
                                                <Bookmark className="h-4 w-4" />
                                            }
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default function AiLegalAdvisorPage() {
    const [scenario, setScenario] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [result, setResult] = React.useState<AdvisorOutput | null>(null);
    const [conversationHistory, setConversationHistory] = React.useState<ConversationEntry[]>([]);
    const [currentTags, setCurrentTags] = React.useState<string[]>([]);
    const [analysisMode, setAnalysisMode] = React.useState<'standard' | 'comprehensive'>('standard');
    const { toast } = useToast();

    // Load conversation history from localStorage on mount
    React.useEffect(() => {
        const saved = localStorage.getItem('ai-advisor-history');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setConversationHistory(parsed.map((entry: any) => ({
                    ...entry,
                    timestamp: new Date(entry.timestamp)
                })));
            } catch (error) {
                console.error('Failed to load conversation history:', error);
            }
        }
    }, []);

    // Save conversation history to localStorage
    React.useEffect(() => {
        localStorage.setItem('ai-advisor-history', JSON.stringify(conversationHistory));
    }, [conversationHistory]);

    const generateTags = (scenario: string, result: AdvisorOutput): string[] => {
        const tags: string[] = [];

        // Extract tags from scenario keywords
        const keywords = scenario.toLowerCase();
        if (keywords.includes('traffic')) tags.push('Traffic');
        if (keywords.includes('domestic')) tags.push('Domestic Violence');
        if (keywords.includes('drug') || keywords.includes('narcotic')) tags.push('Narcotics');
        if (keywords.includes('search') || keywords.includes('warrant')) tags.push('Search & Seizure');
        if (keywords.includes('miranda') || keywords.includes('confession')) tags.push('Miranda Rights');
        if (keywords.includes('use of force') || keywords.includes('force')) tags.push('Use of Force');
        if (keywords.includes('mental') || keywords.includes('baker')) tags.push('Mental Health');
        if (keywords.includes('juvenile') || keywords.includes('minor')) tags.push('Juvenile');

        // Add tags based on result content
        if (result.statutoryGuidelines.length > 0) tags.push('Statutes');
        if (result.relevantCaseLaw.length > 0) tags.push('Case Law');

        return tags.length > 0 ? tags : ['General'];
    };

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!scenario.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const input = {
                scenario: scenario.trim(),
                analysisMode: analysisMode as 'standard' | 'comprehensive',
                includeRiskFactors: true,
                includePracticalGuidance: true
            };

            // Call the server action directly
            const { getAdvisorResponse } = await import('@/ai/flows/legalAdvisor');
            const response = await getAdvisorResponse(input);

            setResult(response);

            // Add to conversation history
            const newEntry: ConversationEntry = {
                id: Date.now().toString(),
                timestamp: new Date(),
                scenario,
                result: response,
                isBookmarked: false,
                tags: generateTags(scenario, response)
            };

            setConversationHistory(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50
            setCurrentTags(newEntry.tags);

            toast({
                title: "Analysis Complete",
                description: "Your scenario has been analyzed and added to conversation history."
            });

        } catch (err: any) {
            console.error('AI Advisor Error:', err);
            setError(
                err?.message || 
                'The AI model failed to generate a response. Please try again later.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectQuickScenario = (selectedScenario: string) => {
        setScenario(selectedScenario);
    };

    const handleSelectConversation = (entry: ConversationEntry) => {
        setScenario(entry.scenario);
        setResult(entry.result);
        setCurrentTags(entry.tags);
    };

    const handleToggleBookmark = (id: string) => {
        setConversationHistory(prev => 
            prev.map(entry => 
                entry.id === id ? { ...entry, isBookmarked: !entry.isBookmarked } : entry
            )
        );
    };

    const handleClearHistory = () => {
        setConversationHistory([]);
        toast({
            title: "History Cleared",
            description: "All conversation history has been cleared."
        });
    };

    const exportResults = () => {
        if (!result) return;

        const exportData = {
            scenario,
            timestamp: new Date().toISOString(),
            analysis: result,
            tags: currentTags
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-advisor-analysis-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="animate-fade-in-up space-y-6">
            <PageHeader
                title="AI Legal Advisor"
                description="Advanced scenario analysis with conversation history and comprehensive insights."
            />

            <Alert variant="destructive" className="border-2">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>This is an informational tool, NOT a legal advisor.</AlertTitle>
                <AlertDescription>
                    All information must be verified. You are solely responsible for your actions.
                    This tool provides educational guidance based on available legal resources.
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="analyze" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="analyze" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Analyze
                    </TabsTrigger>
                    <TabsTrigger value="quick-scenarios" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Quick Scenarios
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        History ({conversationHistory.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="analyze" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Scenario Analysis
                                {currentTags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {currentTags.map((tag, index) => (
                                            <Badge key={index} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardTitle>
                            <CardDescription>
                                Describe your scenario for comprehensive legal analysis. The AI will examine policy, statutes, and case law.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleAnalyze}>
                            <CardContent className="space-y-4">
                                <Textarea
                                    placeholder="e.g., 'During a wellness check, a subject is making threats but has not committed a crime. What are the criteria for an involuntary hold?'"
                                    className="min-h-[120px] text-base"
                                    value={scenario}
                                    onChange={(e) => setScenario(e.target.value)}
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <label className="text-sm font-medium">Analysis Mode:</label>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant={analysisMode === 'standard' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setAnalysisMode('standard')}
                                            >
                                                Standard
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={analysisMode === 'comprehensive' ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setAnalysisMode('comprehensive')}
                                            >
                                                Comprehensive
                                            </Button>
                                        </div>
                                    </div>

                                    {result && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={exportResults}
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Export
                                        </Button>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    ⚠️ Warning: Do NOT enter PII, case numbers, or any other sensitive information.
                                </p>
                            </CardContent>
                            <CardContent>
                                <Button type="submit" disabled={isLoading || !scenario.trim()}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    {isLoading ? 'Analyzing...' : 'Analyze Scenario'}
                                </Button>
                            </CardContent>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="quick-scenarios" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Common Scenarios</CardTitle>
                            <CardDescription>
                                Select a pre-written scenario to quickly analyze common law enforcement situations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <QuickScenarios onSelect={handleSelectQuickScenario} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversation History</CardTitle>
                            <CardDescription>
                                Review your previous analyses. Bookmark important scenarios for quick reference.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ConversationHistory
                                history={conversationHistory}
                                onSelectConversation={handleSelectConversation}
                                onToggleBookmark={handleToggleBookmark}
                                onClearHistory={handleClearHistory}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center justify-center text-center text-muted-foreground py-8"
                    >
                         <Bot className="w-12 h-12 text-primary mb-4 animate-pulse" />
                        <p className="text-lg font-medium">AI is synthesizing information...</p>
                        <p className="text-sm">
                            {analysisMode === 'comprehensive' ? 
                                'Performing comprehensive analysis...' : 
                                'This may take a moment.'}
                        </p>
                    </motion.div>
                )}

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Analysis Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                {result && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                                Intelligence Briefing
                            </h2>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                    {analysisMode} analysis
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {new Date().toLocaleTimeString()}
                                </Badge>
                            </div>
                        </div>

                        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <Eye className="h-5 w-5 text-primary" />
                                    Executive Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                                    {result.atAGlanceSummary.map((item, index) => (
                                        <li key={index} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6">
                            <ResultCard 
                                title="Statutory Guidelines" 
                                icon={Scale} 
                                items={result.statutoryGuidelines}
                                variant="warning"
                            />
                            <ResultCard 
                                title="Relevant Case Law" 
                                icon={Gavel} 
                                items={result.relevantCaseLaw}
                                variant="critical"
                            />
                        </div>

                        {analysisMode === 'comprehensive' && (
                            <Card className="bg-muted/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-lg">
                                        <TrendingUp className="h-5 w-5 text-blue-500" />
                                        Risk Assessment & Recommendations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Alert>
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertTitle>Key Risk Factors</AlertTitle>
                                            <AlertDescription>
                                                Consider documentation requirements, witness availability, and potential constitutional challenges.
                                            </AlertDescription>
                                        </Alert>

                                        <Alert>
                                            <CheckCircle className="h-4 w-4" />
                                            <AlertTitle>Best Practices</AlertTitle>
                                            <AlertDescription>
                                                Ensure proper articulation, consider de-escalation opportunities, and maintain detailed records.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}