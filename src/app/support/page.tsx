
'use client'

import { PageHeader } from "@/components/PageHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MarketingHeader } from "@/components/MarketingHeader"

export default function SupportPage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
          <PageHeader
            title="Frequently Asked Questions"
            description="Here are answers to some common questions about the Shield FL platform. We believe in transparency and want to provide you with all the information you need to see how Shield FL can become an invaluable asset for your agency."
          />
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg text-left">What is Shield FL?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Shield FL is a Public Records Intelligence Engine for law enforcement. It uses advanced AI to make public information—like state statutes, published court opinions (case law), and publicly accessible law enforcement policy manuals—instantly searchable. The goal is to give officers immediate, reliable answers to support confident and defensible decision-making in the field.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg text-left">What kind of information does Shield FL process?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Shield FL exclusively processes information that is already in the public domain. This includes Florida State Statutes, published court opinions, and publicly accessible law enforcement policy manuals. Our platform does not access, store, or transmit any confidential Criminal Justice Information (CJI), such as criminal histories, active case files, or any data from FCIC/NCIC.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg text-left">Is the Shield FL platform CJIS compliant?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  No, and this is by design. The CJIS Security Policy applies to systems that handle confidential Criminal Justice Information (CJI). By focusing exclusively on public records, Shield FL operates in a different category where CJIS compliance is not applicable. This allows us to provide a powerful, efficient, and accessible reference tool without the complexities and costs associated with processing protected data.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg text-left">If you&apos;re not CJIS compliant, how do you handle security?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  We understand that any platform used by law enforcement must be secure. We have engineered Shield FL with enterprise-grade security best practices from the ground up. Our platform is built on Google Cloud&apos;s secure infrastructure and includes mandatory Multi-Factor Authentication (MFA), end-to-end data encryption, and strict internal access controls. Our commitment is to provide a reliable and trustworthy platform for accessing public information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg text-left">How can my agency&apos;s policies be added to the platform?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Since our platform works with publicly accessible documents, the process is simple. You can provide us with a copy of your policy manual in the same way you would for any public records request—typically via a direct link on your website or as an email attachment. Our team then ingests the document, indexes it, and integrates it into your agency&apos;s private version of the Shield FL search engine.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg text-left">What are the primary benefits of using Shield FL for my agency?</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Increased Officer Confidence & Decision Velocity:</strong> Officers get instant, clear answers, allowing them to act decisively and correctly.</li>
                    <li><strong>Improved Training & Consistency:</strong> The platform acts as a virtual training sergeant, ensuring every officer applies your policies consistently.</li>
                    <li><strong>Reduced Agency Risk:</strong> Officers can write stronger, more defensible reports by citing the specific policies and statutes that justify their actions, directly from the app.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </>
  )
}
