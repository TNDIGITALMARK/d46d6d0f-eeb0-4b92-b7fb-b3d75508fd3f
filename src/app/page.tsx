import Navigation from '@/components/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, MessageCircle, Calendar, Zap, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 rainbow-gradient opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connect Authentically.
            <br />
            <span className="rainbow-gradient bg-clip-text text-transparent">
              Discover Your Prism.
            </span>
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            The premier social networking platform for gay men to connect, meet up, and build authentic relationships in a safe, inclusive environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="connectout-button-primary" asChild>
              <Link href="/onboarding">Join Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/discover">Explore Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your Community Awaits</h2>
            <p className="text-xl text-muted-foreground">
              Connect with like-minded individuals through our comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Inclusive Discovery */}
            <Card className="connectout-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="electric-blue-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <CardTitle>Inclusive Discovery</CardTitle>
                <CardDescription>
                  Connect with diverse individuals based on shared interests, location, and relationship goals.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Secure Connections */}
            <Card className="connectout-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="warm-amber-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <CardTitle>Secure Connections</CardTitle>
                <CardDescription>
                  Verified profiles and advanced privacy controls ensure safe and meaningful conversations.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Experiences & More */}
            <Card className="connectout-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="rainbow-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-white" size={24} />
                </div>
                <CardTitle>Experiences & More</CardTitle>
                <CardDescription>
                  From casual meetups to meaningful events, discover experiences that matter to you.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Trust Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-4xl font-bold mb-4">Safety & Trust</h2>
            <p className="text-xl text-muted-foreground">
              Your safety is our top priority. We've built comprehensive tools to ensure a secure experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Shield size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">ID Verification</h3>
              <p className="text-sm text-muted-foreground">Verified member profiles</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Real-time Moderation</h3>
              <p className="text-sm text-muted-foreground">24/7 safety monitoring</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Heart size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Community Guidelines</h3>
              <p className="text-sm text-muted-foreground">Respectful interactions</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <MessageCircle size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Report System</h3>
              <p className="text-sm text-muted-foreground">Easy reporting tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of gay men who have found meaningful connections through ConnectOut
          </p>
          <Button size="lg" className="connectout-button-primary" asChild>
            <Link href="/onboarding">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}