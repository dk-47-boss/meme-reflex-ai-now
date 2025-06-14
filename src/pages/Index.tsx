
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Sparkles } from "lucide-react";
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
      description: `Found ${memes.length} fire memes for that "${vibe}" energy`,
    });
  };

  const simulateVoiceTrigger = () => {
    const mockPhrases = [
      "this is so awkward lol",
      "bruh you just roasted me 💀",
      "wait are you flirting with me rn",
      "why did you leave me on read"
    ];
    const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
    setInputText(randomPhrase);
    toast({
      title: "Voice Activated! 🎤",
      description: `Detected: "${randomPhrase}"`,
    });
  };

  const simulateNotificationListener = () => {
    const scenarios = [
      { text: "um okay whatever", vibe: "awkward-silence" },
      { text: "you got absolutely destroyed", vibe: "getting-roasted" },
      { text: "hey beautiful 😍", vibe: "flirt-confusion" }
    ];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setInputText(scenario.text);
    
    toast({
      title: "Notification Detected! 🔔",
      description: "Found awkward energy in your recent messages",
    });
    
    // Auto-analyze after short delay
    setTimeout(() => {
      const analyzer = document.querySelector('[data-analyze-button]') as HTMLElement;
      analyzer?.click();
    }, 1000);
  };

  const simulateSmartKeyboard = () => {
    setInputText("typing something super cringe rn...");
    toast({
      title: "Smart Keyboard Active! ⌨️",
      description: "Auto-detecting your typing vibe",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Meme Reflex
            </h1>
            <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-2 font-medium">
            escape awkward convos with AI-powered memes ✨
          </p>
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            perfect meme suggestions in under 5 seconds fr fr
          </p>
        </div>

        {/* Main Input Area */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg max-w-2xl mx-auto mb-8 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              drop your chat situation bestie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="paste that awkward convo or just tell me what's happening..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 min-h-[120px] text-lg"
            />
            
            <MemeVibeClassifier
              inputText={inputText}
              onVibeDetected={handleVibeDetection}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />

            {detectedVibe && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-300">vibe check:</span>
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
                  {detectedVibe} energy detected 🔥
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

        {/* Interactive Feature Demo Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Live Features */}
          <Card 
            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={simulateVoiceTrigger}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">🎤</div>
              <h3 className="font-bold text-white mb-2 text-lg">Voice Trigger</h3>
              <p className="text-sm text-gray-300 mb-3">say "yo meme me!" for instant vibes</p>
              <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                ✨ try it now
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={simulateSmartKeyboard}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">⌨️</div>
              <h3 className="font-bold text-white mb-2 text-lg">Smart Keyboard</h3>
              <p className="text-sm text-gray-300 mb-3">AI keyboard with meme suggestions</p>
              <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                ✨ demo mode
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-pink-900/50 to-red-900/50 border-pink-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={simulateNotificationListener}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">🔔</div>
              <h3 className="font-bold text-white mb-2 text-lg">Auto-Detect</h3>
              <p className="text-sm text-gray-300 mb-3">passive cringe detection in your DMs</p>
              <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                ✨ live demo
              </Badge>
            </CardContent>
          </Card>

          {/* Future Mobile Feature */}
          <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-400/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-white mb-2 text-lg">Floating Button</h3>
              <p className="text-sm text-gray-300 mb-3">always-on screen capture for mobile</p>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-300">
                coming to mobile app
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Gen Z Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center items-center gap-4 text-2xl">
            <span>💯</span>
            <span>🔥</span>
            <span>✨</span>
            <span>💀</span>
            <span>👑</span>
          </div>
          <p className="text-gray-400 text-sm">
            built different for the chronically online generation
          </p>
          <p className="text-xs text-gray-500">
            no cap, this hits different when you need that perfect reaction 💯
          </p>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <FloatingMemeButton onQuickCapture={() => {
        toast({
          title: "Screen Captured! 📸",
          description: "analyzing the vibe... (mobile feature preview)",
        });
        // Simulate screen capture analysis
        setTimeout(() => {
          setInputText("just captured some awkward energy on my screen...");
        }, 1500);
      }} />
    </div>
  );
};

export default Index;
