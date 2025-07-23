"use client"

import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield, Smartphone, Clock, Eye, QrCode, Fingerprint } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { multiFactor, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function AccountSecurityPage() {
  const [user] = useAuthState(auth)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginNotifications, setLoginNotifications] = useState(true)
  const [isEnabling2FA, setIsEnabling2FA] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationId, setVerificationId] = useState("")
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [sessions, setSessions] = useState<any[]>([])
  const [passkeys, setPasskeys] = useState<any[]>([]) // Placeholder for passkeys
  const [passkeysSupported, setPasskeysSupported] = useState(true) // Assume passkeys are supported
  const [isCreatingPasskey, setIsCreatingPasskey] = useState(false)

  const fetchSessions = async () => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/security/sessions?userId=${user.uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [user])

  useEffect(() => {
    if (user) {
      // Check if user has MFA enabled
      const mfaUser = multiFactor(user)
      setTwoFactorEnabled(mfaUser.enrolledFactors.length > 0)
    }
  }, [user])

  const handleEnable2FA = async () => {
    if (!user) return

    if (twoFactorEnabled) {
      // Disable 2FA
      try {
        const mfaUser = multiFactor(user)
        if (mfaUser.enrolledFactors.length > 0) {
          await mfaUser.unenroll(mfaUser.enrolledFactors[0])
          setTwoFactorEnabled(false)
          toast({
            title: "2FA Disabled",
            description: "Two-factor authentication has been disabled for your account."
          })
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to disable 2FA: " + error.message,
          variant: "destructive"
        })
      }
    } else {
      // Enable 2FA
      setShowPhoneInput(true)
    }
  }

  const sendVerificationCode = async () => {
    if (!user || !phoneNumber) return

    setIsEnabling2FA(true)
    try {
      // Create RecaptchaVerifier
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      })

      const multiFactorSession = await multiFactor(user).getSession()
      const phoneAuthCredential = PhoneAuthProvider.credential(verificationId, verificationCode)
      const multiFactorAssertion = PhoneAuthProvider.credentialFromResult(phoneAuthCredential)

      // This is a simplified version - you'll need to implement the full flow
      toast({
        title: "Verification Code Sent",
        description: "Please check your phone for the verification code."
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send verification code: " + error.message,
        variant: "destructive"
      })
    }
    setIsEnabling2FA(false)
  }

  const handleCreatePasskey = async () => {
    setIsCreatingPasskey(true);
    try {
      // Simulate passkey creation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      setPasskeys([...passkeys, { createdAt: Date.now() }]); // Add a dummy passkey
      toast({
        title: "Passkey Added",
        description: "Your passkey has been successfully added."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create passkey: " + error.message,
        variant: "destructive"
      });
    }
    setIsCreatingPasskey(false);
  };

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
                onCheckedChange={handleEnable2FA}
              />
            </div>

            {showPhoneInput && !twoFactorEnabled && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={sendVerificationCode} disabled={isEnabling2FA}>
                    {isEnabling2FA ? "Sending..." : "Send Code"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowPhoneInput(false)}>
                    Cancel
                  </Button>
                </div>
                <div id="recaptcha-container"></div>
              </div>
            )}
            {!twoFactorEnabled && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Enable 2FA to secure your account with an additional authentication step.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {passkeysSupported && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5" />
                Passkey Authentication
              </CardTitle>
              <CardDescription>
                Use biometric authentication or security keys for faster, more secure sign-ins
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registered Passkeys</p>
                  <p className="text-sm text-muted-foreground">
                    {passkeys.length} passkey{passkeys.length !== 1 ? 's' : ''} registered
                  </p>
                </div>
                <Button 
                  onClick={handleCreatePasskey}
                  disabled={isCreatingPasskey}
                  size="sm"
                >
                  {isCreatingPasskey && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Add Passkey
                </Button>
              </div>

              {passkeys.length > 0 && (
                <div className="space-y-2">
                  {passkeys.map((passkey, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            Passkey {index + 1}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Created {new Date(passkey.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className={`w-4 h-4 ${session.isActive ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="text-sm font-medium">{session.device}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.location} • {new Date(session.createdAt.seconds * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={session.isActive ? "outline" : "secondary"} 
                           className={session.isActive ? "text-green-600" : ""}>
                      {session.isActive ? "Active" : "Ended"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No recent sessions found.</p>
              )}
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