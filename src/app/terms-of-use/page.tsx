
import { MarketingHeader } from "@/components/MarketingHeader";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Info } from "lucide-react";
import Link from 'next/link';

export default function TermsOfUsePage() {
    const effectiveDate = "January 15, 2025";

    return (
        <>
            <MarketingHeader />
            <main>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
                    <PageHeader
                        title="Terms of Use"
                        description={`Last Updated: ${effectiveDate}`}
                    />
                    
                    <Alert className="mb-6">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important Legal Agreement</AlertTitle>
                        <AlertDescription>
                            These Terms of Use constitute a legally binding agreement between you and Shield FL. 
                            Please read carefully before using our services. By accessing or using Shield FL, 
                            you agree to be bound by these terms.
                        </AlertDescription>
                    </Alert>

                    <Card>
                        <CardContent className="pt-6 text-foreground/90 space-y-8">
                            <div className="space-y-3">
                                <h2 id="definitions" className="text-xl font-semibold border-b pb-2">1. Definitions</h2>
                                <div className="space-y-2 text-sm">
                                    <p><strong>"Service"</strong> refers to the Shield FL web application, mobile application, and all related services, features, and content.</p>
                                    <p><strong>"User," "you," or "your"</strong> refers to any individual who accesses or uses the Service.</p>
                                    <p><strong>"Law Enforcement Personnel"</strong> refers to sworn peace officers, deputies, detectives, and other certified law enforcement professionals.</p>
                                    <p><strong>"Content"</strong> refers to all information, data, text, software, music, sound, photographs, graphics, video, messages, or other materials.</p>
                                    <p><strong>"AI Services"</strong> refers to artificial intelligence-powered features including but not limited to legal analysis, report generation, and conversational assistance.</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 id="acceptance" className="text-xl font-semibold border-b pb-2">2. Acceptance of Terms</h2>
                                <p>By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy-policy" className="underline text-primary">Privacy Policy</Link>. If you do not agree to these Terms, you may not use the Service.</p>
                                <p>We may modify these Terms at any time. Continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="description" className="text-xl font-semibold border-b pb-2">3. Description of Service</h2>
                                <p>Shield FL is a comprehensive, AI-powered law enforcement reference platform designed to provide active law enforcement officers with:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Real-time access to Florida statutes, case law, and legal precedents</li>
                                    <li>AI-assisted report writing and narrative generation tools</li>
                                    <li>Field procedure guides and scenario-based training materials</li>
                                    <li>Emergency response protocols and safety resources</li>
                                    <li>Officer wellness and mental health support tools</li>
                                    <li>Training simulations and role-playing scenarios</li>
                                    <li>Multi-language translation services for field work</li>
                                </ul>
                                <p className="font-medium">The Service is intended to supplement, not replace, an officer's training, experience, and professional judgment.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="eligibility" className="text-xl font-semibold border-b pb-2">4. User Eligibility and Verification</h2>
                                <div className="space-y-2">
                                    <p><strong>Eligibility Requirements:</strong></p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Must be an active, certified law enforcement officer in good standing</li>
                                        <li>Must be employed by a recognized law enforcement agency</li>
                                        <li>Must provide valid law enforcement credentials for verification</li>
                                        <li>Must be at least 18 years of age</li>
                                        <li>Must have legal authority to enter into this agreement</li>
                                    </ul>
                                </div>
                                <p><strong>Verification Process:</strong> We reserve the right to verify your credentials at any time through official channels. Failure to provide satisfactory verification or loss of law enforcement status will result in immediate account termination.</p>
                                <p><strong>Account Responsibilities:</strong> You are solely responsible for maintaining the confidentiality of your account credentials. Account sharing is strictly prohibited and will result in immediate termination.</p>
                            </div>

                            <Alert variant="destructive" className="my-8">
                                <ShieldAlert className="h-4 w-4" />
                                <AlertTitle>5. CRITICAL DISCLAIMERS AND LIMITATIONS</AlertTitle>
                                <AlertDescription className="space-y-3">
                                    <p className="font-bold">BY USING THIS SERVICE, YOU EXPLICITLY ACKNOWLEDGE AND AGREE:</p>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <p className="font-semibold">5.1 Not Legal Advice</p>
                                            <p>Shield FL does NOT provide legal advice. All information is for reference and educational purposes only. You must consult with qualified legal counsel, your agency's legal advisor, or the State Attorney's Office for legal advice.</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold">5.2 Supplemental Tool Only</p>
                                            <p>The Service is a supplemental reference tool that does not replace, override, or supersede your training, experience, professional judgment, agency policies, standard operating procedures, or direct supervisory orders.</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold">5.3 AI-Generated Content Limitations</p>
                                            <p>AI-generated content may contain inaccuracies, errors, omissions, or outdated information. You must independently verify all AI-generated content against official sources before relying on it for any law enforcement action.</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold">5.4 No Warranties</p>
                                            <p>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee accuracy, completeness, timeliness, or reliability of any information provided.</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold">5.5 Information Currency</p>
                                            <p>Laws, statutes, case law, and procedures change frequently. There may be delays in updating our database. Always verify current law and procedures through official channels.</p>
                                        </div>
                                    </div>
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-3">
                                <h2 id="acceptable-use" className="text-xl font-semibold border-b pb-2">6. Acceptable Use Policy</h2>
                                <div className="space-y-2">
                                    <p><strong>Permitted Uses:</strong></p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Professional law enforcement reference and research</li>
                                        <li>Training and educational purposes</li>
                                        <li>Report writing assistance and documentation</li>
                                        <li>Emergency response protocol consultation</li>
                                    </ul>
                                    
                                    <p><strong>Prohibited Uses:</strong></p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Sharing account credentials with unauthorized individuals</li>
                                        <li>Using the Service for personal, non-professional purposes</li>
                                        <li>Reverse engineering, decompiling, or attempting to extract source code</li>
                                        <li>Introducing viruses, malware, or other harmful code</li>
                                        <li>Attempting to gain unauthorized access to other users' accounts</li>
                                        <li>Using the Service for any illegal or unauthorized purpose</li>
                                        <li>Violating any applicable laws, regulations, or third-party rights</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 id="data-security" className="text-xl font-semibold border-b pb-2">7. Data Security and CJIS Compliance</h2>
                                <p>We maintain strict security measures in compliance with Criminal Justice Information Services (CJIS) requirements:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>All data is encrypted in transit and at rest</li>
                                    <li>Access controls and audit logging are implemented</li>
                                    <li>Regular security assessments and penetration testing</li>
                                    <li>Incident response procedures for any security breaches</li>
                                    <li>Compliance with federal and state data protection requirements</li>
                                </ul>
                                <p>However, you acknowledge that no system is 100% secure, and you use the Service at your own risk.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="liability" className="text-xl font-semibold border-b pb-2">8. Limitation of Liability</h2>
                                <p className="font-bold">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>SHIELD FL, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                                    <li>THIS INCLUDES DAMAGES RESULTING FROM: (a) USE OR INABILITY TO USE THE SERVICE; (b) RELIANCE ON ANY INFORMATION PROVIDED; (c) UNAUTHORIZED ACCESS TO YOUR DATA; (d) ANY ACTION TAKEN OR NOT TAKEN BASED ON SERVICE CONTENT</li>
                                    <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM</li>
                                    <li>SOME JURISDICTIONS DO NOT ALLOW LIMITATION OF LIABILITY, SO THESE LIMITATIONS MAY NOT APPLY TO YOU</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h2 id="indemnification" className="text-xl font-semibold border-b pb-2">9. Indemnification</h2>
                                <p>You agree to indemnify, defend, and hold harmless Shield FL and its affiliates from any claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Your use or misuse of the Service</li>
                                    <li>Violation of these Terms or applicable laws</li>
                                    <li>Any action taken based on information from the Service</li>
                                    <li>Infringement of third-party rights</li>
                                    <li>Your negligence or willful misconduct</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h2 id="intellectual-property" className="text-xl font-semibold border-b pb-2">10. Intellectual Property Rights</h2>
                                <p>The Service and all original content, features, and functionality are owned by Shield FL and protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Service solely for its intended professional purposes.</p>
                                <p><strong>User Content:</strong> You retain ownership of content you submit but grant us a license to use, modify, and display such content as necessary to provide the Service.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="termination" className="text-xl font-semibold border-b pb-2">11. Termination</h2>
                                <div className="space-y-2">
                                    <p><strong>Termination by Us:</strong> We may terminate or suspend your account immediately for:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Violation of these Terms</li>
                                        <li>Loss of law enforcement status</li>
                                        <li>Failure to verify credentials</li>
                                        <li>Suspected fraudulent or illegal activity</li>
                                        <li>Non-payment of fees (if applicable)</li>
                                    </ul>
                                    <p><strong>Effect of Termination:</strong> Upon termination, your right to use the Service ceases immediately. We may delete your account and data as permitted by law and our Privacy Policy.</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 id="jurisdiction" className="text-xl font-semibold border-b pb-2">12. Jurisdictional Scope</h2>
                                <p>Shield FL is optimized for Florida law enforcement and designed primarily for use under Florida state law. While accessible globally, content may not be applicable or accurate for other jurisdictions. International users assume all risks and responsibility for compliance with local laws.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="dispute-resolution" className="text-xl font-semibold border-b pb-2">13. Dispute Resolution and Governing Law</h2>
                                <div className="space-y-2">
                                    <p><strong>Governing Law:</strong> These Terms are governed by Florida state law, without regard to conflict of law principles.</p>
                                    <p><strong>Jurisdiction:</strong> Any legal proceedings must be brought exclusively in state or federal courts located in St. Lucie County, Florida.</p>
                                    <p><strong>Arbitration:</strong> For claims under $10,000, you agree to binding arbitration under the rules of the American Arbitration Association, with proceedings conducted in St. Lucie County, Florida.</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 id="force-majeure" className="text-xl font-semibold border-b pb-2">14. Force Majeure</h2>
                                <p>We shall not be liable for any failure to perform due to unforeseen circumstances or causes beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="severability" className="text-xl font-semibold border-b pb-2">15. Severability</h2>
                                <p>If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will remain in full force and effect. The unenforceable provision will be replaced with an enforceable provision that most closely reflects the original intent.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="entire-agreement" className="text-xl font-semibold border-b pb-2">16. Entire Agreement</h2>
                                <p>These Terms, together with our Privacy Policy and any additional terms applicable to specific services, constitute the complete agreement between you and Shield FL regarding use of the Service and supersede all prior agreements and understandings.</p>
                            </div>

                            <div className="space-y-3">
                                <h2 id="contact" className="text-xl font-semibold border-b pb-2">17. Contact Information</h2>
                                <p>For questions about these Terms, please contact us at:</p>
                                <div className="ml-4 space-y-1">
                                    <p>Email: legal@shieldfl.com</p>
                                    <p>Address: Shield FL Legal Department<br />
                                    St. Lucie County, Florida</p>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                                <p className="font-medium">Document Information:</p>
                                <p>Effective Date: {effectiveDate}</p>
                                <p>Version: 2.0</p>
                                <p>This document was last reviewed and approved by legal counsel on {effectiveDate}.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
