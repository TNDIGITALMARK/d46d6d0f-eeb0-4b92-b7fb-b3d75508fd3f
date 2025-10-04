'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Heart,
  MessageCircle,
  MapPin,
  Filter,
  X,
  Star,
  Shield,
  Zap,
  Calendar,
  Users,
  Search
} from 'lucide-react';

// Mock profile data
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Alex',
    age: 28,
    location: 'Downtown, 2.1 miles',
    bio: 'Fitness enthusiast, love trying new restaurants and exploring the city nightlife.',
    interests: ['Fitness & Health', 'Food & Dining', 'Nightlife'],
    photos: ['/api/placeholder/300/400'],
    isVerified: true,
    relationshipGoals: ['dating', 'friends'],
    lastActive: '5 min ago'
  },
  {
    id: 2,
    name: 'Marcus',
    age: 32,
    location: 'Midtown, 3.7 miles',
    bio: 'Artist and photographer. Always up for gallery walks and coffee discussions.',
    interests: ['Art & Culture', 'Photography', 'Travel & Adventure'],
    photos: ['/api/placeholder/300/400'],
    isVerified: true,
    relationshipGoals: ['ltr', 'friends'],
    lastActive: '12 min ago'
  },
  {
    id: 3,
    name: 'David',
    age: 26,
    location: 'West Side, 1.8 miles',
    bio: 'Tech professional by day, DJ by night. Love music festivals and beach trips.',
    interests: ['Music & Dance', 'Technology', 'Travel & Adventure'],
    photos: ['/api/placeholder/300/400'],
    isVerified: false,
    relationshipGoals: ['hookups', 'friends'],
    lastActive: '1 hr ago'
  },
  {
    id: 4,
    name: 'Jordan',
    age: 30,
    location: 'East Village, 4.2 miles',
    bio: 'Yoga instructor and wellness coach. Looking for meaningful connections.',
    interests: ['Wellness', 'Fitness & Health', 'Spirituality'],
    photos: ['/api/placeholder/300/400'],
    isVerified: true,
    relationshipGoals: ['dating', 'ltr'],
    lastActive: '3 hr ago'
  },
  {
    id: 5,
    name: 'Ryan',
    age: 24,
    location: 'Brooklyn, 6.1 miles',
    bio: 'Graduate student, love board games, hiking, and cozy movie nights.',
    interests: ['Gaming', 'Outdoor Activities', 'Movies & TV'],
    photos: ['/api/placeholder/300/400'],
    isVerified: false,
    relationshipGoals: ['friends', 'dating'],
    lastActive: '6 hr ago'
  },
  {
    id: 6,
    name: 'Carlos',
    age: 35,
    location: 'Upper West, 5.3 miles',
    bio: 'Chef and food blogger. Always looking for the next great culinary adventure.',
    interests: ['Food & Dining', 'Travel & Adventure', 'Art & Culture'],
    photos: ['/api/placeholder/300/400'],
    isVerified: true,
    relationshipGoals: ['dating', 'friends'],
    lastActive: '1 day ago'
  }
];

const RELATIONSHIP_FILTERS = [
  { value: 'hookups', label: 'Casual Hookups' },
  { value: 'dating', label: 'Dating' },
  { value: 'friends', label: 'Friends' },
  { value: 'ltr', label: 'Long-term' },
];

export default function DiscoverPage() {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [filters, setFilters] = useState({
    ageRange: [21, 45],
    distance: [25],
    relationshipGoals: [] as string[],
    verifiedOnly: false,
    showOnlineOnly: false
  });

  const handleLike = (profileId: number) => {
    console.log('Liked profile:', profileId);
    // Remove from list after action
    setProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  const handlePass = (profileId: number) => {
    console.log('Passed profile:', profileId);
    // Remove from list after action
    setProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  const handleMessage = (profileId: number) => {
    console.log('Message profile:', profileId);
    window.location.href = `/messages/${profileId}`;
  };

  const selectedProfileData = profiles.find(p => p.id === selectedProfile);

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Discover</h1>
              <p className="text-muted-foreground">
                {profiles.length} people nearby looking to connect
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter size={18} />
                <span>Filters</span>
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by interests..."
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="connectout-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Filters
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
                    </label>
                    <Slider
                      value={filters.ageRange}
                      onValueChange={(value) => setFilters({...filters, ageRange: value})}
                      min={18}
                      max={60}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Distance: {filters.distance[0]} miles
                    </label>
                    <Slider
                      value={filters.distance}
                      onValueChange={(value) => setFilters({...filters, distance: value})}
                      min={5}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Looking For</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any connection type" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELATIONSHIP_FILTERS.map((filter) => (
                          <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="verified"
                        checked={filters.verifiedOnly}
                        onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})}
                        className="rounded"
                      />
                      <label htmlFor="verified" className="text-sm">Verified only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="online"
                        checked={filters.showOnlineOnly}
                        onChange={(e) => setFilters({...filters, showOnlineOnly: e.target.checked})}
                        className="rounded"
                      />
                      <label htmlFor="online" className="text-sm">Online now</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Grid */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {profiles.map((profile) => (
                  <Card
                    key={profile.id}
                    className={`connectout-card cursor-pointer transition-all hover:shadow-lg ${
                      selectedProfile === profile.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedProfile(profile.id)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Profile Image */}
                        <div className="aspect-[3/4] bg-gradient-to-b from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                          <Avatar className="w-32 h-32">
                            <AvatarImage src={profile.photos[0]} />
                            <AvatarFallback className="text-2xl">
                              {profile.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Status Indicators */}
                        <div className="absolute top-3 left-3 flex space-x-2">
                          {profile.isVerified && (
                            <div className="bg-primary/90 backdrop-blur-sm rounded-full p-1">
                              <Shield className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {profile.lastActive.includes('min') && (
                            <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-1">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex space-x-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMessage(profile.id);
                            }}
                          >
                            <MessageCircle size={14} />
                          </Button>
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{profile.name}, {profile.age}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin size={12} className="mr-1" />
                            {profile.location.split(',')[1]}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {profile.bio}
                        </p>

                        {/* Interests */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {profile.interests.slice(0, 3).map((interest, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {profile.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.interests.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePass(profile.id);
                            }}
                          >
                            <X size={16} className="mr-2" />
                            Pass
                          </Button>
                          <Button
                            className="flex-1 connectout-button-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(profile.id);
                            }}
                          >
                            <Heart size={16} className="mr-2" />
                            Like
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {profiles.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No more profiles</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or check back later for new members
                  </p>
                </div>
              )}
            </div>

            {/* Profile Detail Sidebar */}
            <div className="lg:col-span-1">
              {selectedProfileData ? (
                <Card className="connectout-card sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold flex items-center">
                          {selectedProfileData.name}
                          {selectedProfileData.isVerified && (
                            <Shield className="w-5 h-5 ml-2 text-primary" />
                          )}
                        </h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin size={14} className="mr-1" />
                          {selectedProfileData.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Age</div>
                        <div className="text-lg font-semibold">{selectedProfileData.age}</div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {selectedProfileData.bio}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfileData.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Looking For</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfileData.relationshipGoals.map((goal, index) => {
                          const goalLabel = RELATIONSHIP_FILTERS.find(f => f.value === goal)?.label;
                          return (
                            <Badge key={index} className="electric-blue-gradient text-white">
                              {goalLabel}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm text-muted-foreground">Last Active</div>
                      <div className="font-medium">{selectedProfileData.lastActive}</div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full connectout-button-primary"
                        onClick={() => handleMessage(selectedProfileData.id)}
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Send Message
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handlePass(selectedProfileData.id)}
                        >
                          <X size={16} className="mr-2" />
                          Pass
                        </Button>
                        <Button
                          className="flex-1 connectout-button-secondary"
                          onClick={() => handleLike(selectedProfileData.id)}
                        >
                          <Heart size={16} className="mr-2" />
                          Like
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="connectout-card">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Select a Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on any profile card to see more details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}