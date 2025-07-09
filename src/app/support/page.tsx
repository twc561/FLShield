
import { PageHeader } from "@/components/PageHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader
        title="Support Center"
        description="Find answers to frequently asked questions about Florida Shield."
      />
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">What is Florida Shield?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Florida Shield is a secure, AI-powered mobile application designed exclusively for Florida Law Enforcement Officers. It serves as an instant-access field reference guide and training tool.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Is this app a replacement for my department's policy?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No. Florida Shield is an informational and training aid. It is not a substitute for your agency's policies, procedures, or direct orders from a supervisor. Always follow your department's specific guidelines.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">How is the legal information kept up-to-date?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Our legal database is continuously updated to reflect changes in Florida Statutes and major case law rulings. The AI models are also regularly fine-tuned with the latest information to ensure accuracy.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">Can I use this application for official reports?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No. Florida Shield is NOT a CJIS-compliant system. You must not enter any real case information, PII, or other sensitive data into the application. Tools like the AI Charge Assistant are for training and guidance only, and any output should be verified and entered into your agency's official reporting system.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
