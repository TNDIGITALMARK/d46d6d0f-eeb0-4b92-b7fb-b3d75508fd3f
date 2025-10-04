'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Music,
  Coffee,
  Utensils,
  Gamepad2,
  Car,
  Shield,
  Share,
  Heart,
  MessageCircle,
  Star,
  Filter,
  Search
} from 'lucide-react';

// Mock events data
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Pride Night at Rooftop Bar',
    description: 'Join us for cocktails and great music with an amazing city view',
    host: 'David',
    hostAvatar: '/api/placeholder/40/40',
    category: 'nightlife',
    date: '2024-01-15',
    time: '8:00 PM',
    location: 'Downtown Rooftop, 2.1 miles away',
    attendees: 12,
    maxAttendees: 20,
    price: 'Free',
    tags: ['LGBTQ+', 'Nightlife', 'Music'],
    isVerified: true,
    safetyRating: 4.8
  },
  {
    id: 2,
    title: 'Coffee & Connect Brunch',
    description: 'Casual brunch meetup for meaningful conversations and new connections',
    host: 'Marcus',
    hostAvatar: '/api/placeholder/40/40',
    category: 'social',
    date: '2024-01-14',
    time: '11:00 AM',
    location: 'Midtown Café, 3.2 miles away',
    attendees: 8,
    maxAttendees: 12,
    price: '$15-25',
    tags: ['Brunch', 'Networking', 'Coffee'],
    isVerified: true,
    safetyRating: 5.0
  },
  {
    id: 3,
    title: 'Gaming Tournament Night',
    description: 'Friendly competition with board games and video games',
    host: 'Ryan',
    hostAvatar: '/api/placeholder/40/40',
    category: 'gaming',
    date: '2024-01-16',
    time: '7:00 PM',
    location: 'Gaming Lounge, 4.5 miles away',
    attendees: 6,
    maxAttendees: 16,
    price: '$10',
    tags: ['Gaming', 'Social', 'Competition'],
    isVerified: false,
    safetyRating: 4.5
  },
  {
    id: 4,
    title: 'Fitness Bootcamp Group',
    description: 'High-energy workout session followed by healthy smoothies',
    host: 'Alex',
    hostAvatar: '/api/placeholder/40/40',
    category: 'fitness',
    date: '2024-01-17',
    time: '9:00 AM',
    location: 'Central Park, 1.8 miles away',
    attendees: 15,
    maxAttendees: 25,
    price: 'Free',
    tags: ['Fitness', 'Health', 'Outdoors'],
    isVerified: true,
    safetyRating: 4.9
  }
];

const EVENT_CATEGORIES = [
  { value: 'all', label: 'All Events', icon: Calendar },
  { value: 'social', label: 'Social', icon: Coffee },
  { value: 'nightlife', label: 'Nightlife', icon: Music },
  { value: 'dining', label: 'Dining', icon: Utensils },
  { value: 'fitness', label: 'Fitness', icon: Users },
  { value: 'gaming', label: 'Gaming', icon: Gamepad2 }
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    price: 'free'
  });

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinEvent = (eventId: number) => {
    console.log('Joining event:', eventId);
    // Handle joining event
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating event:', newEvent);
    // Handle event creation
    setShowCreateEvent(false);
    setNewEvent({
      title: '',
      description: '',
      category: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      price: 'free'
    });
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = EVENT_CATEGORIES.find(cat => cat.value === category);
    return categoryData?.icon || Calendar;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Events & Meetups</h1>
              <p className="text-muted-foreground text-lg">
                Discover and create meaningful experiences with your community
              </p>
            </div>

            <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
              <DialogTrigger asChild>
                <Button className="connectout-button-primary">
                  <Plus className="mr-2" size={18} />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Plan a safe and fun meetup for the community
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="What's the event about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Give more details about your event..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category *</Label>
                      <Select value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {EVENT_CATEGORIES.slice(1).map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="maxAttendees">Max Attendees</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        value={newEvent.maxAttendees}
                        onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                        placeholder="20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      placeholder="Where will this happen?"
                    />
                  </div>

                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>All events are reviewed for safety before being published</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button type="button" variant="outline" onClick={() => setShowCreateEvent(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="connectout-button-primary"
                      disabled={!newEvent.title || !newEvent.description || !newEvent.category}
                    >
                      Create Event
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events by name, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {EVENT_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center space-x-2 whitespace-nowrap ${
                      selectedCategory === category.value ? 'connectout-button-primary' : ''
                    }`}
                  >
                    <Icon size={16} />
                    <span>{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {filteredEvents.map((event) => {
              const CategoryIcon = getCategoryIcon(event.category);
              return (
                <Card key={event.id} className="connectout-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="electric-blue-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                          <CategoryIcon className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={event.hostAvatar} />
                              <AvatarFallback>{event.host.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              Hosted by {event.host}
                            </span>
                            {event.isVerified && (
                              <Shield className="w-3 h-3 text-primary" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        <span className="text-sm font-medium">{event.safetyRating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <Badge className="warm-amber-gradient text-white text-xs">
                        {event.price}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {}}
                      >
                        <Share size={14} className="mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {}}
                      >
                        <Heart size={14} />
                      </Button>
                      <Button
                        className="connectout-button-primary"
                        onClick={() => handleJoinEvent(event.id)}
                      >
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Safety and Transportation */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="connectout-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Safety Features</span>
                </CardTitle>
                <CardDescription>
                  Every event includes built-in safety measures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 electric-blue-gradient rounded-full flex items-center justify-center">
                    <Shield className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Verified Hosts</h4>
                    <p className="text-sm text-muted-foreground">
                      All event hosts go through verification
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 warm-amber-gradient rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Public Venues</h4>
                    <p className="text-sm text-muted-foreground">
                      Events must be in safe, public locations
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Check-in System</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your location with trusted contacts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="connectout-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="w-5 h-5 text-primary" />
                  <span>Safe Transportation</span>
                </CardTitle>
                <CardDescription>
                  Get there safely with integrated ride sharing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">uber</span>
                  </div>
                  Request Uber to Event
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">lyft</span>
                  </div>
                  Request Lyft to Event
                </Button>

                <div className="p-3 bg-secondary/10 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Safety Tip</p>
                      <p className="text-muted-foreground">
                        Share your ride details with the event host or a friend
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}