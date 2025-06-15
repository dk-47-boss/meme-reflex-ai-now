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
          title: "Chaos Alert! 🛡️",
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
    // Auto-analyze after trigger
    setTimeout(() => {
      const analyzer = document.querySelector('[data-analyze-button]') as HTMLElement;
      analyzer?.click();
    }, 1500);
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
    // Auto-analyze after deploying
    setTimeout(() => {
      const analyzer = document.querySelector('[data-analyze-button]') as HTMLElement;
      analyzer?.click();
    }, 1500);
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
    // Auto-analyze after unleashing
    setTimeout(() => {
      const analyzer = document.querySelector('[data-analyze-button]') as HTMLElement;
      analyzer?.click();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Native Service Integration */}
      <NativeService onTriggerMeme={simulateVoiceTrigger} />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      {/* Funky Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl animate-spin">🌀</span>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent animate-pulse font-chakra">
              MemeVault
            </h1>
            <Zap className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-4xl animate-spin">✨</span>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium">
            where digital chaos meets tactical meme deployment 🎭
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            emergency vibes delivered in under 2.5 seconds no cap
            <span className="inline-block w-2 h-2 bg-primary/70 rounded-full animate-pulse"></span>
          </p>
        </div>

        {/* Controlled Status Bar */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <Badge variant={isVoiceModeActive ? 'destructive' : 'secondary'} className={`${isVoiceModeActive ? 'animate-pulse' : ''}`}>
            <Mic className="h-3 w-3 mr-1" />
            voicewave {isVoiceModeActive ? 'LIVE' : 'standby'}
          </Badge>
          <Badge variant="secondary">
            <Radar className="h-3 w-3 mr-1" />
            vibes: immaculate
          </Badge>
          <Badge variant="secondary" className="animate-pulse">
            <Keyboard className="h-3 w-3 mr-1" />
            chaos: controlled
          </Badge>
          <Badge variant="secondary">
            👻 ghost patrol: active
          </Badge>
        </div>

        {/* Updated Feature Demo Cards - Made Smaller */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card 
            className="bg-card/50 border-destructive/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group animate-float"
            onClick={toggleVoiceMode}
            style={{ animationDelay: '0s' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2 group-hover:animate-bounce">🎤</div>
              <h3 className="font-bold text-foreground mb-1 text-sm font-chakra">VoiceWave</h3>
              <p className="text-xs text-muted-foreground mb-2">voice-activated emergency meme deployment</p>
              <Badge variant={isVoiceModeActive ? 'destructive' : 'secondary'} className={`${isVoiceModeActive ? 'animate-pulse' : ''}`}>
                {isVoiceModeActive ? '🎤 ACTIVE' : '🔇 tap'}
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-card/50 border-primary/30 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group animate-float"
            onClick={simulateSnatcher}
            style={{ animationDelay: '1s' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2 group-hover:animate-bounce">📸</div>
              <h3 className="font-bold text-foreground mb-1 text-sm font-chakra">Snatcher</h3>
              <p className="text-xs text-muted-foreground mb-2">steal text from literally anywhere</p>
              <Badge variant="secondary">
                ⚡ operational
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-card/50 border-primary/30 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group animate-float"
            onClick={simulateHunter}
            style={{ animationDelay: '2s' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2 group-hover:animate-bounce">👻</div>
              <h3 className="font-bold text-foreground mb-1 text-sm font-chakra">Hunter</h3>
              <p className="text-xs text-muted-foreground mb-2">anti-ghosting patrol & comeback generator</p>
              <Badge variant="secondary">
                🟢 hunting ghosts
              </Badge>
            </CardContent>
          </Card>

          <Card 
            className="bg-card/50 border-primary/30 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group animate-float"
            onClick={simulateWildcard}
            style={{ animationDelay: '0.5s' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2 group-hover:animate-bounce">🎭</div>
              <h3 className="font-bold text-foreground mb-1 text-sm font-chakra">Wildcard</h3>
              <p className="text-xs text-muted-foreground mb-2">unleash your unhinged energy</p>
              <Badge variant="secondary">
                💫 chaos ready
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Meme Results */}
        {suggestedMemes.length > 0 && (
          <MemeDisplay 
            memes={suggestedMemes} 
            vibe={detectedVibe || ''} 
          />
        )}

        {/* Main Input Area - Now at Bottom */}
        <Card className="bg-black/30 border-primary/30 backdrop-blur-lg max-w-2xl mx-auto mt-8 mb-8 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2 font-chakra">
              <MessageSquare className="h-5 w-5 text-primary" />
              spill the digital tea ☕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="drop that unhinged convo or tell me what main character moment is happening..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-secondary/50 border-primary/30 text-foreground placeholder:text-muted-foreground min-h-[120px] text-lg"
            />
            
            <MemeVibeClassifier
              inputText={inputText}
              onVibeDetected={handleVibeDetection}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />

            {detectedVibe && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">vibe successfully captured:</span>
                <Badge variant="default" className="bg-primary text-primary-foreground border-none">
                  {detectedVibe} energy locked and loaded 🔥
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gen Z Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center items-center gap-4 text-2xl">
            <span>💯</span>
            <span>🔥</span>
            <span>✨</span>
            <span>💀</span>
            <span>👑</span>
          </div>
          <p className="text-muted-foreground text-sm">
            built different for the chronically online generation
          </p>
          <p className="text-xs text-muted-foreground/70">
            no cap, your chaos control agents got your back 24/7 💫
          </p>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <FloatingMemeButton 
        onQuickCapture={simulateSnatcher} 
        onToggleVoiceMode={toggleVoiceMode}
        isVoiceModeActive={isVoiceModeActive}
      />
    </div>
  );
};

export default Index;
