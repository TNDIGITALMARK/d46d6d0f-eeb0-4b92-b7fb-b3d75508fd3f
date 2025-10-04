'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Shield,
  Calendar,
  MapPin,
  Image,
  Smile,
  Paperclip,
  Flag
} from 'lucide-react';

// Mock conversation data
const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: 'Alex',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Hey! Thanks for the like. How\'s your evening going?',
    timestamp: '2 min ago',
    unread: 2,
    isOnline: true,
    isVerified: true,
    location: '2.1 miles away'
  },
  {
    id: 2,
    name: 'Marcus',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'That gallery opening was amazing! We should definitely go to the next one.',
    timestamp: '1 hr ago',
    unread: 0,
    isOnline: false,
    isVerified: true,
    location: '3.7 miles away'
  },
  {
    id: 3,
    name: 'David',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'I\'m DJing at Rooftop tonight if you want to come by!',
    timestamp: '3 hr ago',
    unread: 1,
    isOnline: true,
    isVerified: false,
    location: '1.8 miles away'
  },
  {
    id: 4,
    name: 'Jordan',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Would love to grab coffee sometime this week',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: false,
    isVerified: true,
    location: '4.2 miles away'
  }
];

const MOCK_MESSAGES = {
  1: [
    {
      id: 1,
      senderId: 1,
      message: 'Hey! Thanks for the like. Love your profile pics!',
      timestamp: '8:45 PM',
      isMe: false
    },
    {
      id: 2,
      senderId: 'me',
      message: 'Thanks! You look great too. I see we both love fitness and good food 😊',
      timestamp: '8:47 PM',
      isMe: true
    },
    {
      id: 3,
      senderId: 1,
      message: 'Definitely! Have you tried that new Mediterranean place downtown?',
      timestamp: '8:48 PM',
      isMe: false
    },
    {
      id: 4,
      senderId: 'me',
      message: 'Not yet, but it\'s been on my list! Want to check it out together this weekend?',
      timestamp: '8:50 PM',
      isMe: true
    },
    {
      id: 5,
      senderId: 1,
      message: 'Hey! Thanks for the like. How\'s your evening going?',
      timestamp: '9:15 PM',
      isMe: false
    }
  ]
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedConversationData = MOCK_CONVERSATIONS.find(c => c.id === selectedConversation);
  const messages = selectedConversation ? MOCK_MESSAGES[selectedConversation as keyof typeof MOCK_MESSAGES] || [] : [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      // Add message to conversation logic would go here
      setNewMessage('');
    }
  };

  const filteredConversations = MOCK_CONVERSATIONS.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="connectout-card h-[calc(100vh-8rem)]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Messages
                    <Badge variant="secondary">
                      {MOCK_CONVERSATIONS.reduce((acc, conv) => acc + conv.unread, 0)}
                    </Badge>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors ${
                          selectedConversation === conversation.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conversation.avatar} />
                              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conversation.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold truncate">{conversation.name}</h4>
                                {conversation.isVerified && (
                                  <Shield className="w-3 h-3 text-primary flex-shrink-0" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground flex-shrink-0">
                                {conversation.timestamp}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground truncate mb-1">
                              {conversation.lastMessage}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {conversation.location}
                              </span>
                              {conversation.unread > 0 && (
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-xs text-primary-foreground">
                                    {conversation.unread}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              {selectedConversationData ? (
                <Card className="connectout-card h-[calc(100vh-8rem)] flex flex-col">
                  {/* Chat Header */}
                  <CardHeader className="border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={selectedConversationData.avatar} />
                            <AvatarFallback>{selectedConversationData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {selectedConversationData.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{selectedConversationData.name}</h3>
                            {selectedConversationData.isVerified && (
                              <Shield className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            {selectedConversationData.isOnline ? (
                              <span className="text-green-500">Online now</span>
                            ) : (
                              <span>Last seen {selectedConversationData.timestamp}</span>
                            )}
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {selectedConversationData.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages Area */}
                  <CardContent className="flex-1 p-0 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.isMe
                                ? 'electric-blue-gradient text-white'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.isMe ? 'text-blue-100' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t border-border p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Image size={16} />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Smile size={16} />
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="connectout-button-primary"
                        size="sm"
                      >
                        <Send size={16} />
                      </Button>
                    </div>

                    {/* Safety Notice */}
                    <div className="mt-3 p-2 bg-secondary/10 rounded-lg">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Shield size={12} />
                        <span>Keep conversations respectful. Report inappropriate behavior.</span>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                          <Flag size={12} className="mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="connectout-card h-[calc(100vh-8rem)] flex items-center justify-center">
                  <CardContent className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the left to start messaging
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="connectout-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="electric-blue-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="text-white" size={20} />
                </div>
                <h4 className="font-semibold mb-1">Plan Meetup</h4>
                <p className="text-xs text-muted-foreground">Coordinate a safe meetup</p>
              </CardContent>
            </Card>

            <Card className="connectout-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="warm-amber-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-white" size={20} />
                </div>
                <h4 className="font-semibold mb-1">Safety Center</h4>
                <p className="text-xs text-muted-foreground">Report or block users</p>
              </CardContent>
            </Card>

            <Card className="connectout-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="rainbow-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="text-white" size={20} />
                </div>
                <h4 className="font-semibold mb-1">Video Chat</h4>
                <p className="text-xs text-muted-foreground">Start a video call</p>
              </CardContent>
            </Card>

            <Card className="connectout-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="text-primary" size={20} />
                </div>
                <h4 className="font-semibold mb-1">Share Location</h4>
                <p className="text-xs text-muted-foreground">Share safe meeting spot</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}