import { PageHeader } from "@/components/PageHeader"
import { flowcharts } from "@/data/flowcharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitFork } from "lucide-react"

export default function FlowchartsPage() {
  const flowchart = flowcharts[0]

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Interactive Flowcharts"
        description="Visualize complex legal procedures and decision-making processes."
      />
      <Card>
        <CardHeader>
          <CardTitle>{flowchart.title}</CardTitle>
          <CardDescription>{flowchart.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-background/50 overflow-x-auto">
            {/* This is a simplified static representation for demonstration. */}
            <svg width="800" height="400" className="min-w-[800px]">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              {/* Nodes */}
              <g transform="translate(350, 30)">
                <rect x="-100" y="-20" width="200" height="40" rx="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14">Start: Subject Encounter</text>
              </g>

              <g transform="translate(350, 110)">
                <rect x="-100" y="-20" width="200" height="40" rx="5" ry="5" transform="rotate(45)" fill="hsl(var(--card))" stroke="hsl(var(--border))"/>
                <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14">Is subject compliant?</text>
              </g>

              <g transform="translate(150, 200)">
                <rect x="-100" y="-20" width="200" height="40" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14">Verbal commands</text>
              </g>

              <g transform="translate(550, 200)">
                <rect x="-100" y="-20" width="200" height="40" rx="5" ry="5" transform="rotate(45)" fill="hsl(var(--card))" stroke="hsl(var(--border))"/>
                <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14">Active Resistance?</text>
              </g>
              
              <g transform="translate(350, 300)">
                <rect x="-100" y="-20" width="200" height="40" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14">Control holds</text>
              </g>
              
              <g transform="translate(700, 300)">
                 <rect x="-100" y="-20" width="200" height="40" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                 <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14">Defensive tactics</text>
              </g>

              {/* Lines */}
              <line x1="350" y1="50" x2="350" y2="80" stroke="hsl(var(--muted-foreground))" markerEnd="url(#arrow)" />
              <line x1="350" y1="140" x2="150" y2="170" stroke="hsl(var(--muted-foreground))" markerEnd="url(#arrow)" />
              <text x="250" y="150" fill="hsl(var(--muted-foreground))" fontSize="12">Yes</text>
              <line x1="350" y1="140" x2="550" y2="170" stroke="hsl(var(--muted-foreground))" markerEnd="url(#arrow)" />
              <text x="450" y="150" fill="hsl(var(--muted-foreground))" fontSize="12">No</text>
              <line x1="550" y1="230" x2="350" y2="270" stroke="hsl(var(--muted-foreground))" markerEnd="url(#arrow)" />
              <text x="450" y="260" fill="hsl(var(--muted-foreground))" fontSize="12">Passive</text>
              <line x1="550" y1="230" x2="700" y2="270" stroke="hsl(var(--muted-foreground))" markerEnd="url(#arrow)" />
              <text x="625" y="260" fill="hsl(var(--muted-foreground))" fontSize="12">Active</text>
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
