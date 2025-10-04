'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle, Calendar, Shield, Users } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="rainbow-gradient w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold">ConnectOut</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/discover" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <Users size={18} />
            <span>Discover</span>
          </Link>
          <Link href="/messages" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <MessageCircle size={18} />
            <span>Messages</span>
          </Link>
          <Link href="/events" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <Calendar size={18} />
            <span>Events</span>
          </Link>
          <Link href="/safety" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
            <Shield size={18} />
            <span>Safe Zone</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button className="connectout-button-primary" asChild>
            <Link href="/signup">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-4 connectout-card">
          <div className="flex flex-col space-y-4">
            <Link
              href="/discover"
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users size={18} />
              <span>Discover</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle size={18} />
              <span>Messages</span>
            </Link>
            <Link
              href="/events"
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Calendar size={18} />
              <span>Events</span>
            </Link>
            <Link
              href="/safety"
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Shield size={18} />
              <span>Safe Zone</span>
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button className="connectout-button-primary" asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}