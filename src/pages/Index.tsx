import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Brush, Paintbrush, MessageSquare, Zap, Sparkles, Mic, Keyboard, Radar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MemeVibeClassifier from "@/components/MemeVibeClassifier";
import FloatingMemeButton from "@/components/FloatingMemeButton";
import MemeDisplay from "@/components/MemeDisplay";
import NativeService from "@/components/NativeService";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const themeConfig = {
  synthwave: {
    title: "MemeVault",
    description: "where digital chaos meets tactical meme deployment 🎭",
    sheetTitle: "meme emergency services",
    sheetDescription: "choose your chaos control agent buddy 💫",
    features: [
      { name: 'VoiceWave', description: 'voice-activated emergency meme deployment', short_description: 'voice emergency backup', emoji: '🎤' },
      { name: 'Snatcher', description: 'steal text from literally anywhere', short_description: 'steal text from anywhere', emoji: '📸' },
      { name: 'Hunter', description: 'anti-ghosting patrol & comeback generator', short_description: 'anti-ghosting patrol', emoji: '👻' },
      { name: 'Wildcard', description: 'unleash your unhinged energy', short_description: 'unhinged energy unleashed', emoji: '🎭' }
    ],
  },
  'retro-neon-arcade': {
    title: "Arcade Alley",
    description: "insert coin to deploy tactical memes 🕹️",
    sheetTitle: "Player Select",
    sheetDescription: "choose your special move 🍄",
    features: [
      { name: 'Pixel Pulse', description: '8-bit audio emergency broadcast', short_description: '8-bit audio backup', emoji: '👾' },
      { name: 'Glitch Grab', description: 'extract text from pixelated screens', short_description: 'grab pixel text', emoji: '🕹️' },
      { name: 'Ghost Hunt', description: 'track high scores of vanished players', short_description: 'hunt digital ghosts', emoji: '👻' },
      { name: 'Power-Up', description: 'gain a temporary social buff', short_description: 'get a 1-UP', emoji: '🍄' }
    ],
  },
  'cyberpunk-vaporwave': {
    title: "NetRunner's Deck",
    description: "jack in to the meme-stream for tactical data 🌃",
    sheetTitle: "System Interface",
    sheetDescription: "select your program to execute 💾",
    features: [
      { name: 'EchoNet', description: 'broadcast across the net', short_description: 'net-wide broadcast', emoji: '🌐' },
      { name: 'Data-Thief', description: 'jack-in and extract data streams', short_description: 'steal data streams', emoji: '💾' },
      { name: 'Shadow Run', description: 'hunt rogue AIs in the digital rain', short_description: 'hunt rogue AIs', emoji: '🤖' },
      { name: 'Glitch Protocol', description: 'initiate reality distortion', short_description: 'distort reality', emoji: '🌀' }
    ],
  },
  'sunset-vibes': {
    title: "Sunset Memery",
    description: "chasing golden hour memes into the horizon 🌅",
    sheetTitle: "Golden Hour Toolkit",
    sheetDescription: "pick your instrument for the moment ✨",
    features: [
      { name: 'Serenade', description: 'whisper sweet nothings to the breeze', short_description: 'whisper to the breeze', emoji: '🎶' },
      { name: 'Vibe Catch', description: 'capture the essence of golden hour', short_description: 'capture the vibe', emoji: '🌇' },
      { name: 'Sun Sentinel', description: 'watch over fading conversations', short_description: 'watch convos fade', emoji: '🧡' },
      { name: 'Main Character', description: 'your moment to shine in the spotlight', short_description: 'become the star', emoji: '✨' }
    ],
  },
  'electric-mint': {
    title: "Fresh Memes",
    description: "serving up crisp, cool memes on demand 🍃",
    sheetTitle: "Refreshment Station",
    sheetDescription: "pick your tool to cool things down 🧊",
    features: [
      { name: 'Minty Mic', description: 'a fresh take on voice commands', short_description: 'fresh voice commands', emoji: '🍃' },
      { name: 'Fresh Take', description: 'grab the freshest screen content', short_description: 'grab fresh content', emoji: '🌿' },
      { name: 'Cool Tracker', description: 'keep tabs with a chill vibe', short_description: 'track with chill', emoji: '🧊' },
      { name: 'Refresh', description: 'reboot your social battery', short_description: 'reboot social battery', emoji: '💧' }
    ],
  },
  'hot-magenta-chaos': {
    title: "Chaos Core",
    description: "unleashing pure, unadulterated meme mayhem 💥",
    sheetTitle: "Agent of Chaos",
    sheetDescription: "choose your weapon of destruction 😈",
    features: [
      { name: 'Chaos Call', description: 'scream into the void, with style', short_description: 'scream into the void', emoji: '💥' },
      { name: 'Magenta Snag', description: 'violently yoink text with color', short_description: 'yoink colorful text', emoji: '💖' },
      { name: 'Anarchy Agent', description: 'sow discord in your group chats', short_description: 'create group chaos', emoji: '😈' },
      { name: 'Mayhem Mode', description: 'embrace the beautiful chaotic mess', short_description: 'embrace the mess', emoji: '🌪️' }
    ],
  }
};

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [detectedVibe, setDetectedVibe] = useState<string | null>(null);
  const [suggestedMemes, setSuggestedMemes] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState('synthwave');

  const currentThemeConfig = themeConfig[currentTheme as keyof typeof themeConfig];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

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

  const featureHandlers = [toggleVoiceMode, simulateSnatcher, simulateHunter, simulateWildcard];

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <div className="fixed top-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full bg-card/50 backdrop-blur-sm border-primary/30 hover:bg-card/70 animate-[pulse_4s_ease-in-out_infinite]">
              <Brush className="h-5 w-5 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-background/90 backdrop-blur-lg border-primary/20">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold flex items-center gap-2 font-chakra text-foreground">
                <Paintbrush className="h-5 w-5 text-primary" />
                Vibe Check: Choose Your Theme
              </SheetTitle>
            </SheetHeader>
            <ThemeSwitcher setTheme={setCurrentTheme} currentTheme={currentTheme} />
          </SheetContent>
        </Sheet>
      </div>
      {/* Native Service Integration */}
      <NativeService onTriggerMeme={simulateVoiceTrigger} />
      
      {/* Funky Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl animate-spin">🌀</span>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 
              className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse font-chakra"
              style={{ textShadow: "0 0 12px hsl(var(--primary) / 0.8)" }}
            >
              {currentThemeConfig.title}
            </h1>
            <Zap className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-4xl animate-spin">✨</span>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium">
            {currentThemeConfig.description}
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
          {currentThemeConfig.features.map((feature, index) => (
            <Card 
              key={feature.name}
              className={`bg-card/50 ${index === 0 ? 'border-destructive/50' : 'border-primary/30'} backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group animate-float`}
              onClick={featureHandlers[index]}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2 group-hover:animate-bounce">{feature.emoji}</div>
                <h3 className="font-bold text-foreground mb-1 text-sm font-chakra">{feature.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                {index === 0 ? (
                  <Badge variant={isVoiceModeActive ? 'destructive' : 'secondary'} className={`${isVoiceModeActive ? 'animate-pulse' : ''}`}>
                    {isVoiceModeActive ? `${feature.emoji} ACTIVE` : '🔇 tap'}
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    {['⚡ operational', '🟢 hunting ghosts', '💫 chaos ready'][index - 1]}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
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
        featureSet={currentThemeConfig.features}
        sheetTitle={currentThemeConfig.sheetTitle}
        sheetDescription={currentThemeConfig.sheetDescription}
      />
    </div>
  );
};

export default Index;
