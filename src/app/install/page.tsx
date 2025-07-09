
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Smartphone, Monitor, ArrowUpFromSquare, MoreVertical, PlusSquare } from "lucide-react"

const InstructionStep = ({ step, text }: { step: number, text: React.ReactNode }) => (
    <li className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">{step}</div>
        <p className="text-muted-foreground pt-1">{text}</p>
    </li>
);

export default function InstallPage() {
    return (
        <div className="animate-fade-in-up">
            <PageHeader
                title="How to Install Shield FL"
                description="Get a native app experience by adding Shield FL to your device's home screen."
            />
            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Apple className="w-6 h-6"/>
                            iPhone or iPad
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-4">
                            <InstructionStep step={1} text={<>Open shieldfl.app in the <strong>Safari</strong> browser.</>} />
                            <InstructionStep step={2} text={<>Tap the <strong>Share</strong> button (the icon with a square and an arrow pointing up <ArrowUpFromSquare className="inline-block h-4 w-4" />).</>} />
                            <InstructionStep step={3} text={<>Scroll down in the share menu and tap <strong>'Add to Home Screen'</strong>.</>} />
                            <InstructionStep step={4} text={<>Confirm the name and tap <strong>'Add'</strong> in the top-right corner.</>} />
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Smartphone className="w-6 h-6"/>
                            Android Device
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ol className="space-y-4">
                            <InstructionStep step={1} text={<>Open shieldfl.app in the <strong>Chrome</strong> browser.</>} />
                            <InstructionStep step={2} text={<>Tap the <strong>Menu</strong> button (the three vertical dots <MoreVertical className="inline-block h-4 w-4" /> in the top corner).</>} />
                            <InstructionStep step={3} text={<>Tap <strong>'Install app'</strong> or <strong>'Add to Home screen'</strong> from the menu.</>} />
                            <InstructionStep step={4} text={<>Follow the on-screen prompts to confirm the installation.</>} />
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Monitor className="w-6 h-6"/>
                            Desktop Computer
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ol className="space-y-4">
                            <InstructionStep step={1} text={<>Open shieldfl.app in <strong>Chrome</strong> or <strong>Microsoft Edge</strong>.</>} />
                            <InstructionStep step={2} text={<>In the address bar at the top, look for the <strong>Install icon</strong> (it looks like a small screen with a down arrow <PlusSquare className="inline-block h-4 w-4" />).</>} />
                            <InstructionStep step={3} text={<>Click the icon and then click the <strong>'Install'</strong> button.</>} />
                            <InstructionStep step={4} text={<>The app will now be available in your computer's applications folder.</>} />
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
