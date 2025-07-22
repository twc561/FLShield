
"use client"

import { MarketingHeader } from "@/components/MarketingHeader";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    const effectiveDate = "July 9, 2025";

    return (
        <>
            <MarketingHeader />
            <main>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
                    <PageHeader
                        title="Privacy Policy"
                        description={`Last Updated: ${effectiveDate}`}
                    />
                    <Card>
                        <CardContent className="pt-6 text-foreground/90 space-y-6">
                            <div className="space-y-2">
                                <h2 id="intro" className="text-xl font-semibold border-b pb-2">1. Introduction</h2>
                                <p>Welcome to Shield FL. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application. By using the Service, you consent to the data practices described in this policy.</p>
                            </div>

                            <div className="space-y-2">
                                <h2 id="collection" className="text-xl font-semibold border-b pb-2">2. Information We Collect</h2>
                                <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Account Data:</strong> When you register, we collect personal information, such as your name, email address, and agency affiliation, to create and manage your account.</li>
                                    <li><strong>Usage Data:</strong> We may automatically collect information about your usage of the Service, such as features accessed and time spent on the application, to improve our services. This data is anonymized and aggregated.</li>
                                    <li><strong>Device Data:</strong> Information about the device you use to access the Service, such as IP address, browser type, and operating system.</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h2 id="confidentiality" className="text-xl font-semibold border-b pb-2">3. Confidentiality of AI Interactions</h2>
                                <p>Certain features, such as the "Active Listener" chatbot and "Report Proofreader," are designed for absolute confidentiality. We affirm the following:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Text and voice inputs into these designated confidential features are processed in memory and are <strong>never logged, stored, or recorded</strong> on our servers.</li>
                                    <li>These interactions are ephemeral and cannot be reviewed by Shield FL staff or any third party.</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h2 id="use" className="text-xl font-semibold border-b pb-2">4. How We Use Your Information</h2>
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Create and manage your account.</li>
                                    <li>Provide, operate, and maintain the Service.</li>
                                    <li>Improve, personalize, and expand the Service.</li>
                                    <li>Communicate with you regarding service updates or administrative matters.</li>
                                    <li>Monitor and analyze usage and trends to improve your experience.</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h2 id="disclosure" className="text-xl font-semibold border-b pb-2">5. Disclosure of Your Information</h2>
                                <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. We may share information with third-party vendors and service providers who perform services for us or on our behalf and require access to such information to do that work. We will not share your information with any other third party without your consent, except as required by law.</p>
                            </div>

                            <div className="space-y-2">
                                <h2 id="security" className="text-xl font-semibold border-b pb-2">6. Security of Your Information</h2>
                                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                            </div>

                            <div className="space-y-2">
                                <h2 id="contact" className="text-xl font-semibold border-b pb-2">7. Contact Us</h2>
                                <p>If you have questions or comments about this Privacy Policy, please contact us at: support@shieldfl.app</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
