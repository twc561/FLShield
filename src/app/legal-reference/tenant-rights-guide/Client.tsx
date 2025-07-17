
"use client"

import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Home, 
  DollarSign, 
  Eye, 
  Gavel, 
  Shield, 
  Calendar,
  Truck,
  AlertTriangle,
  Phone,
  FileText,
  Clock
} from 'lucide-react'
import type { TenantRightsSection } from '@/data/legal-reference/tenant-rights'
import { tenantRightsResources } from '@/data/legal-reference/tenant-rights'

interface TenantRightsClientProps {
  data: TenantRightsSection[]
}

const sectionIcons = {
  'overview-basics': AlertTriangle,
  'rent-payment-security': DollarSign,
  'habitability-standards': Home,
  'eviction-procedures': Gavel,
  'illegal-eviction-practices': Shield,
  'privacy-entry-rights': Eye,
  'discrimination-retaliation': Shield,
  'lease-termination': Calendar,
  'mobile-home-rights': Truck
}

type SectionProps = {
  title: string
  children: React.ReactNode
  icon?: React.ComponentType<any>
}

const Section = ({ title, children, icon: Icon }: SectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-5 w-5 text-blue-600" />}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
)

export function TenantRightsClient({ data }: TenantRightsClientProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Law Enforcement Note</AlertTitle>
        <AlertDescription>
          This guide provides context for landlord-tenant disputes officers may encounter. 
          Civil matters require different approaches than criminal matters. When in doubt, 
          refer parties to appropriate civil legal resources.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Officer Guide</TabsTrigger>
          <TabsTrigger value="sections">Laws & Rights</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="quick-ref">Quick Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Florida Landlord-Tenant Law Overview
              </CardTitle>
              <CardDescription>
                Key legal framework governing rental housing relationships in Florida
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {data.map((section) => {
                  const Icon = sectionIcons[section.id as keyof typeof sectionIcons]
                  return (
                    <Card key={section.id} className="p-4">
                      <div className="flex items-start gap-3">
                        {Icon && <Icon className="h-5 w-5 text-blue-600 mt-1" />}
                        <div>
                          <h4 className="font-semibold text-sm">{section.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Officer Guidance</AlertTitle>
                <AlertDescription>
                  Most landlord-tenant disputes are civil matters. Criminal charges may apply for:
                  illegal eviction methods (harassment, utility shutoffs), criminal trespass by landlords,
                  or fraud/theft related to security deposits.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {data.map((section) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons]
              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                      
                      {section.content.map((subsection, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{subsection.title}</CardTitle>
                            {subsection.legalBasis && (
                              <Badge variant="outline" className="w-fit">
                                {subsection.legalBasis}
                              </Badge>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <Section title="Key Points">
                              <ul className="space-y-1 text-sm">
                                {subsection.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </Section>

                            {subsection.timeframes && (
                              <Section title="Important Timeframes" icon={Clock}>
                                <ul className="space-y-1 text-sm">
                                  {subsection.timeframes.map((timeframe, timeIndex) => (
                                    <li key={timeIndex} className="flex items-start gap-2">
                                      <Clock className="h-3 w-3 text-blue-600 mt-1" />
                                      <span>{timeframe}</span>
                                    </li>
                                  ))}
                                </ul>
                              </Section>
                            )}

                            {subsection.consequences && (
                              <Section title="Legal Consequences" icon={AlertTriangle}>
                                <ul className="space-y-1 text-sm">
                                  {subsection.consequences.map((consequence, consIndex) => (
                                    <li key={consIndex} className="flex items-start gap-2">
                                      <AlertTriangle className="h-3 w-3 text-orange-600 mt-1" />
                                      <span>{consequence}</span>
                                    </li>
                                  ))}
                                </ul>
                              </Section>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>
                  Key organizations for tenant assistance and complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tenantRightsResources.emergencyContacts.map((contact, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-3">
                      <div className="font-semibold text-sm">{contact.organization}</div>
                      <div className="text-sm text-blue-600">{contact.phone}</div>
                      <div className="text-xs text-muted-foreground">{contact.purpose}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Key Statutes
                </CardTitle>
                <CardDescription>
                  Primary Florida laws governing landlord-tenant relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tenantRightsResources.keyStatutes.map((statute, index) => (
                    <div key={index} className="bg-muted/50 p-2 rounded text-sm">
                      {statute}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Officer Field Tips
                </CardTitle>
                <CardDescription>
                  Best practices for handling landlord-tenant disputes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tenantRightsResources.officerTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>v>

          <Card>
            <CardHeader>
              <CardTitle>Important Documents for Tenants</CardTitle>
              <CardDescription>
                Documents tenants should maintain for legal protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {tenantRightsResources.commonDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="h-3 w-3 text-blue-600" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-ref" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Notice Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• Rent nonpayment: <strong>3 days</strong></div>
                <div>• Lease violations: <strong>7 days</strong></div>
                <div>• Entry notice: <strong>12 hours</strong></div>
                <div>• Month-to-month termination: <strong>30 days</strong></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Security Deposits</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• Return timeframe: <strong>15-30 days</strong></div>
                <div>• Interest may be required</div>
                <div>• Written notice for deductions</div>
                <div>• Normal wear excluded</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Prohibited Actions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• Self-help evictions</div>
                <div>• Utility shutoffs</div>
                <div>• Discriminatory practices</div>
                <div>• Retaliatory actions</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Entry Rights</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• 12-hour notice required</div>
                <div>• 7:30 AM - 8:00 PM only</div>
                <div>• Emergency exceptions</div>
                <div>• Reasonable purposes only</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tenant Defenses</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• Improper notice</div>
                <div>• Habitability issues</div>
                <div>• Retaliation claims</div>
                <div>• Discrimination</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Criminal Elements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• Illegal eviction methods</div>
                <div>• Fraudulent practices</div>
                <div>• Criminal trespass</div>
                <div>• Theft of deposits</div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Officer Best Practices</AlertTitle>
            <AlertDescription className="text-sm">
              • Document all interactions and evidence • Refer civil disputes to appropriate legal resources 
              • Identify potential criminal violations (illegal evictions, fraud) • Protect tenant safety during disputes 
              • Understand when to involve social services • Know local housing authority contacts
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
