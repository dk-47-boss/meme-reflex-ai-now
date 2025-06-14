
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MemeVibeClassifier from "@/components/MemeVibeClassifier";
import FloatingMemeButton from "@/components/FloatingMemeButton";
import MemeDisplay from "@/components/MemeDisplay";

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [detectedVibe, setDetectedVibe] = useState<string | null>(null);
  const [suggestedMemes, setSuggestedMemes] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleVibeDetection = (vibe: string, memes: any[]) => {
    setDetectedVibe(vibe);
    setSuggestedMemes(memes);
    toast({
      title: "Vibe Detected! 🎯",
      description: `Found ${memes.length} perfect memes for "${vibe}" energy`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Meme Reflex ⚡
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Escape awkward conversations with AI-powered memes
          </p>
          <p className="text-sm text-gray-400">
            Perfect meme suggestions in under 5 seconds
          </p>
        </div>

        {/* Main Input Area */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Analyze Your Chat Vibe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your chat conversation here, or describe the situation..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 min-h-[120px]"
            />
            
            <MemeVibeClassifier
              inputText={inputText}
              onVibeDetected={handleVibeDetection}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />

            {detectedVibe && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-300">Detected vibe:</span>
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {detectedVibe}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meme Results */}
        {suggestedMemes.length > 0 && (
          <MemeDisplay 
            memes={suggestedMemes} 
            vibe={detectedVibe || ''} 
          />
        )}

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              title: "Floating Button",
              description: "Always-on screen capture & instant meme suggestions",
              icon: "📱",
              status: "Coming Soon"
            },
            {
              title: "Smart Keyboard",
              description: "AI-powered keyboard with built-in meme suggestions",
              icon: "⌨️",
              status: "Coming Soon"
            },
            {
              title: "Voice Trigger",
              description: "Say 'Yo, Meme Me!' for instant vibe analysis",
              icon: "🎤",
              status: "Coming Soon"
            },
            {
              title: "Notification Listener",
              description: "Passive monitoring for awkward conversation moments",
              icon: "🔔",
              status: "Coming Soon"
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{feature.description}</p>
                <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                  {feature.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingMemeButton onQuickCapture={() => {
        toast({
          title: "Quick Capture! 📸",
          description: "Screen capture feature coming soon for mobile app",
        });
      }} />
    </div>
  );
};

export default Index;
