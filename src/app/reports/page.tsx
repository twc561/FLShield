"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { reportTemplates } from "@/data/report-templates"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };


  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <PageHeader
        title="Report Writing Assistant"
        description="Streamline your reporting with pre-made templates. Click to copy."
      />
      <div className="space-y-6">
        {reportTemplates.map((template) => (
          <motion.div
            key={template.id}
            variants={itemVariants}
          >
            <Card>
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
