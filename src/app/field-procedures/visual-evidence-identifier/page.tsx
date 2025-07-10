
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Pill, ShieldAlert, Swords } from "lucide-react";

const identifierCategories = [
    {
        title: "Pills & Controlled Substances",
        description: "Identify pills from an image using AI visual analysis.",
        href: "/field-procedures/visual-evidence-identifier/pills",
        icon: Pill,
    },
    {
        title: "HAZMAT Placards",
        description: "Identify a placard to get immediate ERG safety information.",
        href: "/field-procedures/visual-evidence-identifier/hazmat",
        icon: ShieldAlert,
    },
    {
        title: "Weapons & Ammunition",
        description: "Identify a weapon to get relevant Florida Statute links.",
        href: "/field-procedures/visual-evidence-identifier/weapons",
        icon: Swords,
    },
]

export default function VisualIdentifierHubPage() {
    return (
        <div className="animate-fade-in-up">
            <PageHeader
                title="Visual Evidence Identifier"
                description="Select a category to identify an item using your device's camera."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {identifierCategories.map((item) => (
                    <Link href={item.href} key={item.title} className="group">
                        <Card className="h-full hover:border-primary transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
