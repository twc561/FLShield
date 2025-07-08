
import { PageHeader } from "@/components/PageHeader";
import { dailyBriefingData } from "@/data/daily-briefing";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, MessageCircle, AlertTriangle } from "lucide-react";

export default function DailyBriefingPage() {
  const briefing = dailyBriefingData;

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Daily Legal Briefing"
        description={`Today's update: ${briefing.briefingDate}`}
      />

      <Card className="w-full">
        <CardHeader>
          <Badge variant="destructive" className="w-fit mb-2">{briefing.caseInfo.court}</Badge>
          <CardTitle className="text-2xl md:text-3xl tracking-tight">{briefing.headline}</CardTitle>
          <CardDescription className="pt-2 text-base">
            {briefing.caseInfo.caseName} / {briefing.caseInfo.citation}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-muted-foreground leading-relaxed">
            {briefing.plainLanguageSummary}
          </p>

          <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
             <h3 className="font-semibold text-lg text-accent-foreground/90 mb-3 flex items-center">
                <AlertTriangle className="mr-3 h-5 w-5"/>
                {briefing.tacticalImpact.title}
             </h3>
             <ul className="space-y-3">
                {briefing.tacticalImpact.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-accent mt-1 flex-shrink-0"/>
                        <span className="text-accent-foreground/80">{point}</span>
                    </li>
                ))}
             </ul>
          </div>

          <div>
             <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
                "{briefing.keyQuote}"
             </blockquote>
          </div>
        </CardContent>
      </Card>
        <p className="text-center text-sm text-muted-foreground mt-8">Disclaimer: This briefing is for informational purposes only and is not a substitute for legal advice or agency training.</p>
    </div>
  );
}
