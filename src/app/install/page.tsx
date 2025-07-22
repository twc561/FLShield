
'use client'

import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Smartphone, Monitor, Share, MoreVertical, AppWindow } from "lucide-react"

const InstructionStep = ({ step, children }: { step: number, children: React.ReactNode }) => (
    <li className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">{step}</div>
        <p className="text-muted-foreground pt-1">{children}</p>
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
                            <InstructionStep step={1}>Open shieldfl.app in the <strong>Safari</strong> browser.</InstructionStep>
                            <InstructionStep step={2}>
                                Tap the <strong>Share</strong> button (the icon with a square and an arrow pointing up <Share className="inline-block h-4 w-4 align-middle" />).
                            </InstructionStep>
                            <InstructionStep step={3}>Scroll down in the share menu and tap <strong>'Add to Home Screen'</strong>.</InstructionStep>
                            <InstructionStep step={4}>Confirm the name and tap <strong>'Add'</strong> in the top-right corner.</InstructionStep>
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
                            <InstructionStep step={1}>Open shieldfl.app in the <strong>Chrome</strong> browser.</InstructionStep>
                            <InstructionStep step={2}>
                                Tap the <strong>Menu</strong> button (the three vertical dots <MoreVertical className="inline-block h-4 w-4 align-middle" /> in the top corner).
                            </InstructionStep>
                            <InstructionStep step={3}>Tap <strong>'Install app'</strong> or <strong>'Add to Home screen'</strong> from the menu.</InstructionStep>
                            <InstructionStep step={4}>Follow the on-screen prompts to confirm the installation.</InstructionStep>
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
                            <InstructionStep step={1}>Open shieldfl.app in <strong>Chrome</strong> or <strong>Microsoft Edge</strong>.</InstructionStep>
                            <InstructionStep step={2}>
                                In the address bar at the top, look for the <strong>Install icon</strong> (it looks like a small screen with a down arrow <AppWindow className="inline-block h-4 w-4 align-middle" />).
                            </InstructionStep>
                            <InstructionStep step={3}>Click the icon and then click the <strong>'Install'</strong> button.</InstructionStep>
                            <InstructionStep step={4}>The app will now be available in your computer's applications folder.</InstructionStep>
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
'use client'

import { useState } from 'react'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Smartphone, 
  Download, 
  Share, 
  Plus, 
  Chrome, 
  Safari, 
  Info,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export default function InstallPage() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  const handleInstallClick = async () => {
    // @ts-ignore
    if (window.deferredPrompt) {
      // @ts-ignore
      window.deferredPrompt.prompt()
      // @ts-ignore
      const { outcome } = await window.deferredPrompt.userChoice
      console.log(`User response: ${outcome}`)
      // @ts-ignore
      window.deferredPrompt = null
    } else {
      setShowInstallPrompt(true)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Install Shield FL App"
        description="Get the full app experience with offline access and native mobile features"
      />

      <div className="space-y-6">
        {/* Quick Install Button */}
        <Card className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-600/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Download className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl">Quick Install</CardTitle>
            <CardDescription>
              Install Shield FL directly to your device for the best experience
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={handleInstallClick}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download className="w-5 h-5 mr-2" />
              Install App Now
            </Button>
          </CardContent>
        </Card>

        {/* Platform-specific instructions */}
        <Tabs defaultValue="android" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="android" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Android
            </TabsTrigger>
            <TabsTrigger value="ios" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              iPhone/iPad
            </TabsTrigger>
          </TabsList>

          <TabsContent value="android" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Chrome className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-lg">Android Installation</CardTitle>
                </div>
                <CardDescription>
                  Install using Chrome, Edge, or Samsung Internet browser
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <p className="font-medium">Open in Chrome or Edge</p>
                      <p className="text-sm text-muted-foreground">
                        Navigate to shieldfl.com in your mobile browser
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <p className="font-medium">Look for the install banner</p>
                      <p className="text-sm text-muted-foreground">
                        A banner should appear at the bottom saying "Add Shield FL to Home screen"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <p className="font-medium">Tap "Install" or "Add to Home Screen"</p>
                      <p className="text-sm text-muted-foreground">
                        If no banner appears, tap the menu (⋮) and select "Install app" or "Add to Home screen"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <p className="font-medium">Confirm installation</p>
                      <p className="text-sm text-muted-foreground">
                        Tap "Install" in the confirmation dialog
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Alternative Method</AlertTitle>
                  <AlertDescription>
                    If you don't see an install option, try: Menu (⋮) → "Add to Home screen" → Name it "Shield FL" → "Add"
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ios" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Safari className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-lg">iPhone/iPad Installation</CardTitle>
                </div>
                <CardDescription>
                  Install using Safari browser (required for iOS)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Important</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    You must use Safari browser on iOS. Chrome and other browsers don't support app installation on iOS.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <p className="font-medium">Open Safari</p>
                      <p className="text-sm text-muted-foreground">
                        Navigate to shieldfl.com in Safari browser
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <p className="font-medium">Tap the Share button</p>
                      <p className="text-sm text-muted-foreground">
                        Look for the share icon (square with arrow pointing up) at the bottom of Safari
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <p className="font-medium">Find "Add to Home Screen"</p>
                      <p className="text-sm text-muted-foreground">
                        Scroll down in the share menu and tap "Add to Home Screen"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <p className="font-medium">Customize and add</p>
                      <p className="text-sm text-muted-foreground">
                        The name should auto-fill as "Shield FL". Tap "Add" in the top right
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    The Shield FL app icon should now appear on your home screen. Tap it to launch the app.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Benefits of installing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-500" />
              Benefits of Installing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">🚀 Faster Loading</h4>
                <p className="text-sm text-muted-foreground">
                  App loads instantly and works offline
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">📱 Native Feel</h4>
                <p className="text-sm text-muted-foreground">
                  Full-screen experience without browser UI
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">🔄 Background Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Stay up-to-date with latest features
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">🏠 Home Screen Access</h4>
                <p className="text-sm text-muted-foreground">
                  Quick access from your device's home screen
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium mb-1">Don't see install option?</h4>
              <p className="text-sm text-muted-foreground">
                Make sure you're using a supported browser (Chrome/Edge on Android, Safari on iOS) and have a stable internet connection.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">App not working properly?</h4>
              <p className="text-sm text-muted-foreground">
                Try refreshing the page or reinstalling the app. Clear your browser cache if issues persist.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Need help?</h4>
              <p className="text-sm text-muted-foreground">
                Contact support through the app menu or visit our support page for additional assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
