
"use client"

import { useState } from "react"
import { reportTemplates } from "@/data"
import { PageHeader } from "@/components/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ReportAssistantPage() {
  const { toast } = useToast()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "The report template has been copied.",
      })
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Report Writing Assistant"
        description="Streamline your reporting with pre-made templates. Click to copy."
      />
      <div className="space-y-6">
        {reportTemplates.map((template, index) => (
          <Card
            key={template.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48 rounded-md border p-4 bg-background/50">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                  {template.template}
                </pre>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleCopy(template.id, template.template)}
              >
                {copiedId === template.id ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copiedId === template.id ? "Copied!" : "Copy Template"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: React.CSSProperties & { [key: string]: string | number };
    }
}
