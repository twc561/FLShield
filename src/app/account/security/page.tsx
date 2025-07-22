
"use client"

import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield, Smartphone, Clock, Eye } from "lucide-react"
import { useState } from "react"

export default function AccountSecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginNotifications, setLoginNotifications] = useState(true)

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Account Security"
        description="Manage two-factor authentication, view login history, and configure security settings."
      />
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable 2FA</p>
                <p className="text-sm text-muted-foreground">
                  Require authentication from your phone when signing in
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
            {!twoFactorEnabled && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Enable 2FA to secure your account with an additional authentication step.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Login Activity
            </CardTitle>
            <CardDescription>
              Monitor recent access to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Mobile - Current Session</p>
                    <p className="text-xs text-muted-foreground">Tampa, FL • 2 hours ago</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Desktop</p>
                    <p className="text-xs text-muted-foreground">Tampa, FL • Yesterday</p>
                  </div>
                </div>
                <Badge variant="secondary">Ended</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone logs into your account
                </p>
              </div>
              <Switch
                checked={loginNotifications}
                onCheckedChange={setLoginNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Usage Analytics</p>
                <p className="text-sm text-muted-foreground">
                  Allow collection of usage data to improve the service
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline">
              Change Password
            </Button>
            <Button variant="outline">
              Download Account Data
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
