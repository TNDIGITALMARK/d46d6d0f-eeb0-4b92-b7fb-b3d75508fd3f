'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  AlertTriangle,
  Camera,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Flag,
  User,
  Eye,
  EyeOff,
  Lock,
  Zap,
  Heart,
  MessageCircle,
  FileText,
  HelpCircle
} from 'lucide-react';

export default function SafetyPage() {
  const [reportForm, setReportForm] = useState({
    reportedUser: '',
    category: '',
    description: '',
    evidence: ''
  });

  const [verificationStatus, setVerificationStatus] = useState({
    id: 'pending',
    photo: 'verified',
    phone: 'not_started'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showLastSeen: true,
    showDistance: true,
    allowMessages: 'verified',
    photoAccess: 'connections'
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report submitted:', reportForm);
    // Handle report submission
    alert('Report submitted successfully. Our team will review it within 24 hours.');
    setReportForm({ reportedUser: '', category: '', description: '', evidence: '' });
  };

  const handleVerificationStart = (type: string) => {
    console.log('Starting verification for:', type);
    if (type === 'id') {
      setVerificationStatus({...verificationStatus, id: 'in_progress'});
    } else if (type === 'phone') {
      setVerificationStatus({...verificationStatus, phone: 'in_progress'});
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 electric-blue-gradient rounded-full flex items-center justify-center">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold mb-4">Safety Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your safety is our top priority. Use these tools to verify your identity,
              report issues, and control your privacy settings.
            </p>
          </div>

          <Tabs defaultValue="verification" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="reporting">Report User</TabsTrigger>
              <TabsTrigger value="resources">Safety Tips</TabsTrigger>
            </TabsList>

            {/* Verification Tab */}
            <TabsContent value="verification">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="connectout-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>Account Verification</span>
                    </CardTitle>
                    <CardDescription>
                      Verify your account to build trust with other members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* ID Verification */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          verificationStatus.id === 'verified'
                            ? 'bg-green-100 text-green-600'
                            : verificationStatus.id === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {verificationStatus.id === 'verified' ? (
                            <CheckCircle size={20} />
                          ) : verificationStatus.id === 'in_progress' ? (
                            <Clock size={20} />
                          ) : (
                            <FileText size={20} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">ID Verification</h4>
                          <p className="text-sm text-muted-foreground">
                            Verify with government-issued ID
                          </p>
                        </div>
                      </div>
                      {verificationStatus.id === 'verified' ? (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      ) : verificationStatus.id === 'in_progress' ? (
                        <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleVerificationStart('id')}
                          className="connectout-button-primary"
                        >
                          Start
                        </Button>
                      )}
                    </div>

                    {/* Photo Verification */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <Camera size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold">Photo Verification</h4>
                          <p className="text-sm text-muted-foreground">
                            Selfie verification completed
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>

                    {/* Phone Verification */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          verificationStatus.phone === 'verified'
                            ? 'bg-green-100 text-green-600'
                            : verificationStatus.phone === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold">Phone Verification</h4>
                          <p className="text-sm text-muted-foreground">
                            Verify your phone number
                          </p>
                        </div>
                      </div>
                      {verificationStatus.phone === 'not_started' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerificationStart('phone')}
                        >
                          Start
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="connectout-card">
                  <CardHeader>
                    <CardTitle>Verification Benefits</CardTitle>
                    <CardDescription>
                      Why verification matters for your safety and success
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 electric-blue-gradient rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="text-white" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold">Higher Visibility</h4>
                        <p className="text-sm text-muted-foreground">
                          Verified profiles appear first in search results
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 warm-amber-gradient rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="text-white" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold">More Matches</h4>
                        <p className="text-sm text-muted-foreground">
                          Build trust and get 3x more connections
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="text-white" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold">Enhanced Safety</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect with confidence in a safer environment
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="text-white" size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold">Priority Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Get faster response times from our team
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <Card className="connectout-card">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can see your information and how you appear to others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Profile Visibility</Label>
                        <Select
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) => setPrivacySettings({...privacySettings, profileVisibility: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Everyone</SelectItem>
                            <SelectItem value="verified">Verified users only</SelectItem>
                            <SelectItem value="connections">My connections only</SelectItem>
                            <SelectItem value="private">Private (invisible)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Who can message me</Label>
                        <Select
                          value={privacySettings.allowMessages}
                          onValueChange={(value) => setPrivacySettings({...privacySettings, allowMessages: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="verified">Verified users only</SelectItem>
                            <SelectItem value="connections">My connections only</SelectItem>
                            <SelectItem value="nobody">Nobody</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Photo Access</Label>
                        <Select
                          value={privacySettings.photoAccess}
                          onValueChange={(value) => setPrivacySettings({...privacySettings, photoAccess: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Everyone</SelectItem>
                            <SelectItem value="connections">My connections only</SelectItem>
                            <SelectItem value="request">Request access required</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Last Seen</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others know when you were last active
                          </p>
                        </div>
                        <Button
                          variant={privacySettings.showLastSeen ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPrivacySettings({...privacySettings, showLastSeen: !privacySettings.showLastSeen})}
                        >
                          {privacySettings.showLastSeen ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Distance</Label>
                          <p className="text-sm text-muted-foreground">
                            Display your distance to other users
                          </p>
                        </div>
                        <Button
                          variant={privacySettings.showDistance ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPrivacySettings({...privacySettings, showDistance: !privacySettings.showDistance})}
                        >
                          {privacySettings.showDistance ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>
                      </div>

                      <div className="p-4 bg-secondary/10 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Lock className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-sm">Data Protection</h4>
                            <p className="text-xs text-muted-foreground">
                              Your data is encrypted and never shared with third parties.
                              Read our Privacy Policy for more details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="connectout-button-primary">
                      Save Privacy Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reporting Tab */}
            <TabsContent value="reporting">
              <Card className="connectout-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="w-5 h-5 text-destructive" />
                    <span>Report a User</span>
                  </CardTitle>
                  <CardDescription>
                    Help us keep ConnectOut safe by reporting inappropriate behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReportSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="reportedUser">User to Report *</Label>
                      <Input
                        id="reportedUser"
                        placeholder="Username or profile name"
                        value={reportForm.reportedUser}
                        onChange={(e) => setReportForm({...reportForm, reportedUser: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Report Category *</Label>
                      <Select value={reportForm.category} onValueChange={(value) => setReportForm({...reportForm, category: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="harassment">Harassment or bullying</SelectItem>
                          <SelectItem value="inappropriate_content">Inappropriate content</SelectItem>
                          <SelectItem value="fake_profile">Fake or impersonation account</SelectItem>
                          <SelectItem value="spam">Spam or unsolicited messages</SelectItem>
                          <SelectItem value="threats">Threats or violence</SelectItem>
                          <SelectItem value="underage">Underage user</SelectItem>
                          <SelectItem value="privacy">Privacy violation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Detailed Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide specific details about the incident..."
                        value={reportForm.description}
                        onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                        className="mt-1 min-h-[120px]"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        The more details you provide, the faster we can investigate
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="evidence">Evidence (Optional)</Label>
                      <Textarea
                        id="evidence"
                        placeholder="Screenshots, message content, or other evidence..."
                        value={reportForm.evidence}
                        onChange={(e) => setReportForm({...reportForm, evidence: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div className="p-4 bg-destructive/5 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                        <div className="text-sm">
                          <h4 className="font-semibold text-destructive">Important</h4>
                          <p className="text-muted-foreground">
                            False reports may result in action against your account.
                            Only report genuine safety concerns or policy violations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setReportForm({ reportedUser: '', category: '', description: '', evidence: '' })}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="connectout-button-primary"
                        disabled={!reportForm.reportedUser || !reportForm.category || !reportForm.description}
                      >
                        Submit Report
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Safety Tips Tab */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="connectout-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>Meeting Safely</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Always meet in public places for first dates</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Tell a friend about your plans and location</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Trust your instincts - leave if you feel uncomfortable</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Don't share personal information too quickly</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="connectout-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <span>Online Safety</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Keep conversations on the platform initially</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Be cautious of users asking for money or gifts</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Report suspicious or inappropriate behavior</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Verify profiles before meeting in person</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="connectout-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>Emergency Resources</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold">24/7 Crisis Hotlines</h4>
                      <p className="text-sm text-muted-foreground">Emergency: 911</p>
                      <p className="text-sm text-muted-foreground">National Suicide Prevention: 988</p>
                      <p className="text-sm text-muted-foreground">LGBT National Hotline: 1-888-843-4564</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="connectout-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <span>Get Help</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Need additional support or have questions about safety?
                    </p>
                    <Button variant="outline" className="w-full">
                      Contact Support Team
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}