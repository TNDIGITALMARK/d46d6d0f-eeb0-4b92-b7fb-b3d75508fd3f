'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Camera, MapPin, Heart, Users, Zap, ArrowRight, ArrowLeft } from 'lucide-react';

const INTERESTS = [
  'Fitness & Health', 'Art & Culture', 'Music & Dance', 'Travel & Adventure',
  'Food & Dining', 'Gaming', 'Sports', 'Reading', 'Movies & TV', 'Fashion',
  'Technology', 'Photography', 'Nightlife', 'Outdoor Activities', 'Business',
  'Activism', 'Spirituality', 'Wellness', 'Comedy', 'Theater'
];

const RELATIONSHIP_GOALS = [
  { value: 'hookups', label: 'Casual Hookups' },
  { value: 'dating', label: 'Dating & Romance' },
  { value: 'friends', label: 'Friendship & Networking' },
  { value: 'ltr', label: 'Long-term Relationship' },
  { value: 'open', label: 'Open to All' }
];

const BODY_TYPES = [
  'Slim', 'Athletic', 'Average', 'Muscular', 'Stocky', 'Large', 'Prefer not to say'
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    interests: [] as string[],
    relationshipGoals: [] as string[],
    bodyType: '',
    height: '',
    ethnicity: '',
    locationRadius: '25',
    showDistance: true,
    showAge: true,
    photoPrivacy: 'public',
    safetyAgreed: false
  });

  const steps = [
    { title: 'Basic Info', icon: Users },
    { title: 'About You', icon: Heart },
    { title: 'Preferences', icon: Zap },
    { title: 'Safety First', icon: Shield }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      relationshipGoals: prev.relationshipGoals.includes(goal)
        ? prev.relationshipGoals.filter(g => g !== goal)
        : [...prev.relationshipGoals, goal]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log('Profile created:', formData);
    window.location.href = '/discover';
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Create Your Profile</h1>
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="mb-4" />

            <div className="flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index <= currentStep
                        ? 'electric-blue-gradient text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs text-center">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="connectout-card">
            <CardContent className="p-8">
              {/* Step 0: Basic Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-2xl mb-2">Let's start with the basics</CardTitle>
                    <CardDescription>
                      Tell us a bit about yourself to get started
                    </CardDescription>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Display Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="How should people know you?"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          max="99"
                          value={formData.age}
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                          placeholder="18"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          value={formData.height}
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                          placeholder="5'10&quot;"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="City, State"
                          className="mt-1 pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bodyType">Body Type</Label>
                      <Select value={formData.bodyType} onValueChange={(value) => setFormData({...formData, bodyType: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select body type" />
                        </SelectTrigger>
                        <SelectContent>
                          {BODY_TYPES.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ethnicity">Ethnicity</Label>
                      <Input
                        id="ethnicity"
                        value={formData.ethnicity}
                        onChange={(e) => setFormData({...formData, ethnicity: e.target.value})}
                        placeholder="Optional"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: About You */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-2xl mb-2">Tell us about yourself</CardTitle>
                    <CardDescription>
                      Share your interests and what makes you unique
                    </CardDescription>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell others what makes you interesting..."
                      className="mt-1 min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <Label>Interests & Hobbies *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select at least 3 interests to help others find you
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((interest) => (
                        <Badge
                          key={interest}
                          variant={formData.interests.includes(interest) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            formData.interests.includes(interest)
                              ? 'electric-blue-gradient text-white'
                              : 'hover:bg-primary/10'
                          }`}
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {formData.interests.length}
                    </p>
                  </div>

                  <div>
                    <Label>Looking For *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      What type of connections are you seeking?
                    </p>
                    <div className="space-y-3">
                      {RELATIONSHIP_GOALS.map((goal) => (
                        <div key={goal.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal.value}
                            checked={formData.relationshipGoals.includes(goal.value)}
                            onCheckedChange={() => handleGoalToggle(goal.value)}
                          />
                          <Label htmlFor={goal.value} className="cursor-pointer">
                            {goal.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-2xl mb-2">Privacy & Discovery</CardTitle>
                    <CardDescription>
                      Control how others can find and interact with you
                    </CardDescription>
                  </div>

                  <div>
                    <Label>Discovery Radius: {formData.locationRadius} miles</Label>
                    <Input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={formData.locationRadius}
                      onChange={(e) => setFormData({...formData, locationRadius: e.target.value})}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>5 miles</span>
                      <span>100 miles</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showDistance"
                        checked={formData.showDistance}
                        onCheckedChange={(checked) => setFormData({...formData, showDistance: checked as boolean})}
                      />
                      <Label htmlFor="showDistance">Show distance to other users</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showAge"
                        checked={formData.showAge}
                        onCheckedChange={(checked) => setFormData({...formData, showAge: checked as boolean})}
                      />
                      <Label htmlFor="showAge">Show my age on profile</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Photo Privacy</Label>
                    <Select value={formData.photoPrivacy} onValueChange={(value) => setFormData({...formData, photoPrivacy: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Everyone can see</SelectItem>
                        <SelectItem value="connections">Connections only</SelectItem>
                        <SelectItem value="private">Private - Ask permission</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="connectout-card bg-primary/5 p-4">
                    <div className="flex items-start space-x-3">
                      <Camera className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Add Photos Later</h4>
                        <p className="text-sm text-muted-foreground">
                          You can add photos to your profile after completing setup.
                          Verified photos get better visibility!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Safety Tutorial */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-2xl mb-2">Safety First</CardTitle>
                    <CardDescription>
                      Your safety is our top priority. Please review these important guidelines.
                    </CardDescription>
                  </div>

                  <div className="space-y-4">
                    <div className="connectout-card bg-primary/5 p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Profile Verification</h4>
                          <p className="text-sm text-muted-foreground">
                            Verify your profile with ID to build trust and get better matches
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="connectout-card bg-secondary/5 p-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Meet Safely</h4>
                          <p className="text-sm text-muted-foreground">
                            Always meet in public places and tell a friend your plans
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="connectout-card bg-destructive/5 p-4">
                      <div className="flex items-start space-x-3">
                        <Zap className="w-5 h-5 text-destructive mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Report & Block</h4>
                          <p className="text-sm text-muted-foreground">
                            Use our reporting tools if someone makes you uncomfortable
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="safetyAgreed"
                        checked={formData.safetyAgreed}
                        onCheckedChange={(checked) => setFormData({...formData, safetyAgreed: checked as boolean})}
                      />
                      <Label htmlFor="safetyAgreed" className="text-sm">
                        I agree to the ConnectOut Community Guidelines and understand
                        the safety recommendations. I'm 18+ and consent to connect
                        with other adult users.
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    className="connectout-button-primary"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 0 && (!formData.name || !formData.age || !formData.location)) ||
                      (currentStep === 1 && (formData.interests.length < 3 || !formData.bio || formData.relationshipGoals.length === 0)) ||
                      (currentStep === 2 && false) // No validation needed for preferences
                    }
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="connectout-button-primary"
                    onClick={handleComplete}
                    disabled={!formData.safetyAgreed}
                  >
                    Complete Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}