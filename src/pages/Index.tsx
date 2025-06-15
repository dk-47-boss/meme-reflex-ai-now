
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Sparkles, Mic, Keyboard, Radar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MemeVibeClassifier from "@/components/MemeVibeClassifier";
import FloatingMemeButton from "@/components/FloatingMemeButton";
import MemeDisplay from "@/components/MemeDisplay";
import NativeService from "@/components/NativeService";

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [detectedVibe, setDetectedVibe] = useState<string | null>(null);
  const [suggestedMemes, setSuggestedMemes] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Enhanced voice recognition with background monitoring
  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition && isVoiceModeActive) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('emergency meme') || transcript.includes('save me') || transcript.includes('help me')) {
          simulateVoiceTrigger();
        }
      };

      recognition.start();
      return () => recognition.stop();
    }
  }, [isVoiceModeActive]);

  // Enhanced notification monitoring with more chaos
  useEffect(() => {
    const interval = setInterval(() => {
      const chaosNotifications = [
        "🚨 WhatsApp: Someone's typing for 15 minutes straight",
        "👻 Instagram: Left on read by your crush (again)",
        "💀 Snapchat: They opened your snap 6 hours ago",
        "😬 iMessage: 'Delivered' since the stone age",
        "🎭 Discord: They're online but ignoring your DMs",
        "⚡ TikTok: They liked your comment but won't text back"
      ];
      
      if (Math.random() < 0.4) { // 40% chance every 8 seconds
        const notification = chaosNotifications[Math.floor(Math.random() * chaosNotifications.length)];
        setNotifications(prev => [notification, ...prev.slice(0, 2)]);
        
        toast({
          title: "Chaos Control Alert! 🛡️",
          description: notification,
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleVibeDetection = (vibe: string, memes: any[]) => {
    setDetectedVibe(vibe);
    setSuggestedMemes(memes);
    toast({
      title: "Vibe Successfully Yoinked! 🎯",
      description: `Found ${memes.length} absolutely fire memes for that "${vibe}" energy`,
    });
  };

  const simulateVoiceTrigger = () => {
    const emergencyPhrases = [
      "BUDDY THEY JUST SAID THE MOST UNHINGED THING",
      "why do they text like a LinkedIn post 💀",
      "not them treating me like a side quest",
      "the secondhand embarrassment is ASTRONOMICAL"
    ];
    const randomPhrase = emergencyPhrases[Math.floor(Math.random() * emergencyPhrases.length)];
    setInputText(randomPhrase);
    toast({
      title: "🚨 EMERGENCY MEME DEPLOYMENT!",
      description: `Voice activated: "${randomPhrase}"`,
    });
  };

  const simulateSnatcher = () => {
    // Enhanced screen capture simulation
    const yoinkedTexts = [
      "buddy really thought that was smooth 💀",
      "sir the delusion is concerning",
      "not you manifesting a text back",
      "they're really acting like the main character",
      "the audacity has me speechless ngl"
    ];
    
    const captured = yoinkedTexts[Math.floor(Math.random() * yoinkedTexts.length)];
    setInputText(captured);
    
    toast({
      title: "📸 Snatcher Activated!",
      description: "Text successfully stolen from the digital streets",
    });
    
    // Auto-analyze after capture
    setTimeout(() => {
      const analyzer = document.querySelector('[data-analyze-button]') as HTMLElement;
      analyzer?.click();
    }, 1500);
  };

  const simulateHunter = () => {
    setInputText("they really ghosted me like I'm casper...");
    toast({
      title: "👻 Hunter Deployed!",
      description: "Anti-ghosting protocol activated - scanning for signs of life",
    });
  };

  const toggleVoiceMode = () => {
    setIsVoiceModeActive(!isVoiceModeActive);
    toast({
      title: isVoiceModeActive ? "🎤 VoiceWave Deactivated" : "🎤 VoiceWave ACTIVE!",
      description: isVoiceModeActive ? "Voice emergency services offline" : "Say 'emergency meme' for instant backup",
    });
  };

  const simulateWildcard = () => {
    const scenarios = [
      "plot twist: you're about to become the main character",
      "chaos mode: saying something completely unhinged", 
      "unleashing the unfiltered thoughts energy",
      "activating zero social anxiety protocol"
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setInputText(scenario);
    
    toast({
      title: "🎭 Wildcard UNLEASHED!",
      description: "All social filters have been disabled buddy",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-x-hidden">
      {/* Native Service Integration */}
      <NativeService onTriggerMeme={simulateVoiceTrigger} />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        {/* New funky elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-green-500/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      {/* Funky Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl animate-spin">🌀</span>
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              MemeVault Pro
            </h1>
            <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
            <span className="text-4xl animate-spin">✨</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-2 font-medium">
            where digital chaos meets tactical meme deployment 🎭
          </p>
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            emergency vibes delivered in under 2.5 seconds no cap
            <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
          </p>
        </div>

        {/* Controlled Status Bar */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <Badge className={`${isVoiceModeActive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'} text-white`}>
            <Mic className="h-3 w-3 mr-1" />
            voicewave {isVoiceModeActive ? 'LIVE' : 'standby'}
          </Badge>
          <Badge className="bg-purple-500 text-white">
            <Radar className="h-3 w-3 mr-1" />
            vibes: immaculate
          </Badge>
          <Badge className="bg-blue-500 text-white animate-pulse">
            <Keyboard className="h-3 w-3 mr-1" />
            chaos: controlled
          </Badge>
          <Badge className="bg-pink-500 text-white">
            👻 ghost patrol: active
          </Badge>
        </div>

        {/* 4 Quick Action Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <Button
            onClick={simulateSnatcher}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-20 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl mb-1">📸</span>
            <span className="font-bold text-sm">snatcher</span>
          </Button>
          
          <Button
            onClick={toggleVoiceMode}
            className={`${isVoiceModeActive ? 'bg-gradient-to-r from-red-600 to-orange-600 animate-pulse' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} hover:scale-105 text-white h-20 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <span className="text-2xl mb-1">🎤</span>
            <span className="font-bold text-sm">voicewave</span>
          </Button>
          
          <Button
            onClick={simulateHunter}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-20 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl mb-1">👻</span>
            <span className="font-bold text-sm">hunter</span>
          </Button>
          
          <Button
            onClick={simulateWildcard}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white h-20 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl mb-1">🎭</span>
            <span className="font-bold text-sm">wildcard</span>
          </Button>
        </div>

        {/* Main Input Area */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg max-w-2xl mx-auto mb-8 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              spill the digital tea buddy ☕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="drop that unhinged convo or tell me what main character moment is happening..."
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
                <span className="text-sm text-gray-300">vibe successfully captured:</span>
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
                  {detectedVibe} energy locked and loaded 🔥
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

        {/* Updated Feature Demo Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card 
            className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={toggleVoiceMode}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">🎤</div>
              <h3 className="font-bold text-white mb-2 text-lg">VoiceWave</h3>
              <p className="text-sm text-gray-300 mb-3">voice-activated emergency meme deployment</p>
              <Badge className={`${isVoiceModeActive ? 'bg-red-500/20 text-red-300 border-red-400/50 animate-pulse' : 'bg-gray-500/20 text-gray-300 border-gray-400/50'}`}>
                {isVoiceModeActive ? '🎤 VOICEWAVE ACTIVE' : '🔇 tap to activate'}
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={simulateSnatcher}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">📸</div>
              <h3 className="font-bold text-white mb-2 text-lg">Snatcher</h3>
              <p className="text-sm text-gray-300 mb-3">steal text from literally anywhere</p>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/50">
                ⚡ fully operational
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={simulateHunter}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">👻</div>
              <h3 className="font-bold text-white mb-2 text-lg">Hunter</h3>
              <p className="text-sm text-gray-300 mb-3">anti-ghosting patrol & comeback generator</p>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/50">
                🟢 actively hunting ghosts
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-400/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={simulateWildcard}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce">🎭</div>
              <h3 className="font-bold text-white mb-2 text-lg">Wildcard</h3>
              <p className="text-sm text-gray-300 mb-3">unleash your unhinged energy</p>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/50">
                💫 chaos ready to deploy
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
            no cap, your chaos control agents got your back 24/7 💫
          </p>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <FloatingMemeButton onQuickCapture={simulateSnatcher} />
    </div>
  );
};

export default Index;
