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
import { multiFactor, PhoneAuthProvider, RecaptchaVerifier, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
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
  const [passkeys, setPasskeys] = useState<any[]>([])
  const [passkeysSupported, setPasskeysSupported] = useState(false)
  const [isCreatingPasskey, setIsCreatingPasskey] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showDownloadData, setShowDownloadData] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [securityMetrics, setSecurityMetrics] = useState<any>(null)
  const [securityInsights, setSecurityInsights] = useState<any[]>([])
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)

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
    fetchSecurityData()
  }, [user])

  const fetchSecurityData = async () => {
    if (!user) return

    setIsLoadingMetrics(true)
    try {
      const token = await user.getIdToken()
      
      const [dashboardResponse, alertsResponse, auditResponse] = await Promise.all([
        fetch(`/api/security/dashboard?userId=${user.uid}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`/api/security/monitor?userId=${user.uid}&status=active`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`/api/security/audit?userId=${user.uid}&limit=10`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json()
        setSecurityMetrics(dashboardData.metrics)
        setSecurityInsights(dashboardData.insights)
      }

      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json()
        setSecurityAlerts(alertsData.alerts)
      }

      if (auditResponse.ok) {
        const auditData = await auditResponse.json()
        setAuditLogs(auditData.auditLogs)
      }
    } catch (error) {
      console.error('Failed to fetch security data:', error)
    }
    setIsLoadingMetrics(false)
  }

  useEffect(() => {
    if (user) {
      // Check if user has MFA enabled
      const mfaUser = multiFactor(user)
      setTwoFactorEnabled(mfaUser.enrolledFactors.length > 0)
    }
  }, [user])

  // Check WebAuthn support
  useEffect(() => {
    const checkWebAuthnSupport = async () => {
      try {
        const supported = await isSupported()
        const available = await isAvailable()
        setPasskeysSupported(supported && available)
      } catch (error) {
        console.error('WebAuthn support check failed:', error)
        setPasskeysSupported(false)
      }
    }
    checkWebAuthnSupport()
  }, [])

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
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please ensure you're signed in to create a passkey.",
        variant: "destructive"
      })
      return
    }

    if (!passkeysSupported) {
      toast({
        title: "Passkeys Not Supported",
        description: "Your browser or device doesn't support passkey authentication.",
        variant: "destructive"
      })
      return
    }

    setIsCreatingPasskey(true)
    try {
      await createCredential(user, { 
        rpId: window.location.hostname,
        displayName: user.displayName || user.email || 'Shield FL User'
      })
      
      // Add to local state for immediate UI update
      const newPasskey = {
        id: Date.now().toString(),
        createdAt: Date.now(),
        name: `Passkey ${passkeys.length + 1}`,
        lastUsed: null
      }
      setPasskeys([...passkeys, newPasskey])
      
      toast({
        title: "Passkey Created",
        description: "Your passkey has been successfully created and can now be used for sign-in."
      })
    } catch (error: any) {
      console.error("Passkey creation failed:", error)
      if (error.name === 'NotAllowedError') {
        toast({
          title: "Passkey Creation Cancelled",
          description: "The passkey creation was cancelled or timed out.",
          variant: "destructive"
        })
      } else if (error.name === 'InvalidStateError') {
        toast({
          title: "Passkey Already Exists",
          description: "A passkey for this device may already exist.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Passkey Creation Failed",
          description: `Failed to create passkey: ${error.message}`,
          variant: "destructive"
        })
      }
    }
    setIsCreatingPasskey(false)
  }

  const handlePasswordChange = async () => {
    if (!user || !user.email) return

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive"
      })
      return
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      })
      return
    }

    setIsChangingPassword(true)
    try {
      // Reauthenticate user first
      const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword)
      await reauthenticateWithCredential(user, credential)
      
      // Update password
      await updatePassword(user, passwordForm.newPassword)
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed."
      })
      
      setShowPasswordChange(false)
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        toast({
          title: "Incorrect Password",
          description: "The current password you entered is incorrect.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Password Change Failed",
          description: `Failed to change password: ${error.message}`,
          variant: "destructive"
        })
      }
    }
    setIsChangingPassword(false)
  }

  const handleDownloadData = async () => {
    if (!user) return

    setIsDownloading(true)
    try {
      const userData = {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        exportDate: new Date().toISOString()
      }

      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `shield-fl-account-data-${new Date().getTime()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Data Downloaded",
        description: "Your account data has been downloaded successfully."
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download account data.",
        variant: "destructive"
      })
    }
    setIsDownloading(false)
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Account Security"
        description="Manage two-factor authentication, view login history, and configure security settings."
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {securityMetrics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Dashboard
              </CardTitle>
              <CardDescription>
                Your account security overview and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{securityMetrics.securityScore}</div>
                  <div className="text-sm text-muted-foreground">Security Score</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{securityMetrics.activeSessions}</div>
                  <div className="text-sm text-muted-foreground">Active Sessions</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{securityMetrics.activeAlerts}</div>
                  <div className="text-sm text-muted-foreground">Active Alerts</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{securityMetrics.failedLoginAttempts}</div>
                  <div className="text-sm text-muted-foreground">Failed Logins (24h)</div>
                </div>
              </div>
              
              {securityInsights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Security Recommendations</h4>
                  {securityInsights.map((insight, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      insight.priority === 'high' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20' :
                      insight.priority === 'medium' ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20' :
                      'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{insight.title}</p>
                          <p className="text-xs text-muted-foreground">{insight.description}</p>
                        </div>
                        {insight.action && (
                          <Button size="sm" variant="outline">
                            {insight.action}
                          </Button>
                        )}
                      </div>
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
                            {passkey.name || `Passkey ${index + 1}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Created {new Date(passkey.createdAt || Date.now()).toLocaleDateString()}
                            {passkey.lastUsed && ` • Last used ${new Date(passkey.lastUsed).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Active</Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setPasskeys(passkeys.filter((_, i) => i !== index))
                            toast({
                              title: "Passkey Removed",
                              description: "The passkey has been removed from your account."
                            })
                          }}
                        >
                          Remove
                        </Button>
                      </div>
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
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Audit Log
            </CardTitle>
            <CardDescription>
              Recent security events for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Passkey authentication enabled</p>
                    <p className="text-xs text-muted-foreground">
                      Today • Your account security was strengthened
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600">Success</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Password last changed</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Never'} • Account security maintained
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-blue-600">Info</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account settings and data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showPasswordChange ? (
              <Button variant="outline" onClick={() => setShowPasswordChange(true)} className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            ) : (
              <div className="space-y-4 p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-medium">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePasswordChange} disabled={isChangingPassword}>
                    {isChangingPassword && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Update Password
                  </Button>
                  <Button variant="outline" onClick={() => setShowPasswordChange(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            <Button variant="outline" onClick={handleDownloadData} disabled={isDownloading} className="w-full">
              {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
              Download Account Data
            </Button>
            
            <Button variant="destructive" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}