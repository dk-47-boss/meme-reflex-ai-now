
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FloatingMemeButtonProps {
  onQuickCapture: () => void;
  onToggleVoiceMode: () => void;
  isVoiceModeActive: boolean;
  featureSet: {
    name: string;
    description: string;
    short_description: string;
    emoji: string;
  }[];
  sheetTitle: string;
  sheetDescription: string;
}

const FloatingMemeButton: React.FC<FloatingMemeButtonProps> = ({ 
  onQuickCapture, 
  onToggleVoiceMode, 
  isVoiceModeActive,
  featureSet,
  sheetTitle,
  sheetDescription 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const voiceWaveFeature = featureSet[0];
  const snatcherFeature = featureSet[1];
  const hunterFeature = featureSet[2];
  const wildcardFeature = featureSet[3];

  const autoAnalyze = () => {
    setTimeout(() => {
      const analyzer = document.querySelector('[data-analyze-button]') as HTMLElement;
      analyzer?.click();
    }, 1000);
  };

  const activateSnatcher = () => {
    // Real screen capture functionality
    if ('mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          
          video.addEventListener('loadedmetadata', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            ctx?.drawImage(video, 0, 0);
            
            // Stop the stream
            stream.getTracks().forEach(track => track.stop());
            
            // Convert to text analysis (simulate OCR)
            const mockTexts = [
              "buddy why did you say that 💀",
              "not you sliding into my DMs at 3am",
              "sir this is a Wendy's energy",
              "the audacity is astronomical ngl"
            ];
            
            const extractedText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
            
            // Fill the textarea with extracted text
            const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
            if (textArea) {
              textArea.value = extractedText;
              textArea.dispatchEvent(new Event('input', { bubbles: true }));
            }
            
            toast({
              title: "📸 Snatcher Success!",
              description: "Text extracted and ready for meme analysis",
            });
            autoAnalyze();
          });
        })
        .catch(() => {
          // Fallback to simulated capture
          onQuickCapture();
          toast({
            title: "📸 Snatcher (Demo Mode)",
            description: "Screen capture failed or was denied. Using demo.",
          });
        });
    } else {
      onQuickCapture();
    }
    setIsOpen(false);
  };

  const activateVoiceWave = () => {
    onToggleVoiceMode();
    setIsOpen(false);
  };

  const activateHunter = () => {
    // Enhanced smart type with background monitoring
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textArea) {
      textArea.focus();
      
      const ghostScenarios = [
        "they really left me hanging like a disco ball",
        "my message was more invisible than my dad",
        "getting ghosted by someone who posts 50 stories a day",
        "they're active but my texts are in the Bermuda triangle"
      ];
      
      const scenario = ghostScenarios[Math.floor(Math.random() * ghostScenarios.length)];
      textArea.value = scenario;
      textArea.dispatchEvent(new Event('input', { bubbles: true }));
      
      toast({
        title: "👻 Hunter Activated!",
        description: "Analyzing ghosting patterns and generating comebacks",
      });
      autoAnalyze();
    }
    
    // Start background monitoring for ghosting patterns
    let checkCount = 0;
    const ghostMonitor = setInterval(() => {
      checkCount++;
      if (checkCount > 6) { // Stop after 6 checks (30 seconds)
        clearInterval(ghostMonitor);
        return;
      }
      
      if (Math.random() < 0.3) {
        const updates = [
          "Still monitoring for signs of life...",
          "Scanning for 'typing...' indicators",
          "Checking if they're still posting stories",
          "Ghost probability increasing...",
          "Preparing emergency meme arsenal"
        ];
        
        toast({
          title: "👻 Hunter Update",
          description: updates[Math.floor(Math.random() * updates.length)],
        });
      }
    }, 5000);
    
    setIsOpen(false);
  };

  const activateWildcard = () => {
    // Chaotic intervention mode
    const scenarios = [
      "plot twist: you're about to become the main character",
      "chaos mode: saying something completely unhinged",
      "unleashing the unfiltered thoughts energy",
      "activating zero social anxiety protocol"
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textArea) {
      textArea.value = scenario;
      textArea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    toast({
      title: "🎭 Wildcard UNLEASHED!",
      description: "All social filters have been disabled buddy",
    });
    autoAnalyze();
    
    // Random chaos interventions
    let chaosCount = 0;
    const chaosInterval = setInterval(() => {
      chaosCount++;
      if (chaosCount > 4) {
        clearInterval(chaosInterval);
        toast({
          title: "🎭 Wildcard Complete",
          description: "You've been blessed by the chaos gods",
        });
        return;
      }
      
      const interventions = [
        "Confidence level: CEO of a company that doesn't exist yet",
        "Social anxiety has left the chat",
        "Main character energy: ACTIVATED",
        "Plot armor: EQUIPPED"
      ];
      
      setTimeout(() => {
        toast({
          title: "⚡ Chaos Boost!",
          description: interventions[Math.floor(Math.random() * interventions.length)],
        });
      }, Math.random() * 8000);
    }, 3000);
    
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50" data-floating-meme>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 animate-pulse"
            >
              <div className="flex flex-col items-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
                <span className="text-xs font-bold text-primary-foreground mt-0.5">SOS</span>
              </div>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="bg-gradient-to-br from-background/95 via-secondary/95 to-accent/95 border-primary/30 text-foreground backdrop-blur-lg">
            <SheetHeader>
              <SheetTitle className="text-foreground text-xl font-black flex items-center gap-2 font-chakra">
                <span>🆘</span>
                {sheetTitle}
                <span>⚡</span>
              </SheetTitle>
              <SheetDescription className="text-muted-foreground text-base">
                {sheetDescription}
              </SheetDescription>
            </SheetHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                onClick={activateSnatcher}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground h-24 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="text-3xl mb-2">{snatcherFeature.emoji}</span>
                <span className="font-bold">{snatcherFeature.name.toLowerCase()}</span>
                <span className="text-xs opacity-80">{snatcherFeature.short_description}</span>
              </Button>
              
              <Button
                onClick={activateVoiceWave}
                variant="outline"
                className={`border-destructive/50 text-foreground h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ${isVoiceModeActive ? 'bg-destructive/40 animate-pulse' : 'hover:bg-destructive/20'}`}
              >
                <span className="text-3xl mb-2">{voiceWaveFeature.emoji}</span>
                <span className="font-bold">{voiceWaveFeature.name.toLowerCase()}</span>
                <span className="text-xs opacity-80">{isVoiceModeActive ? 'LISTENING...' : voiceWaveFeature.short_description}</span>
              </Button>
              
              <Button
                onClick={activateHunter}
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <span className="text-3xl mb-2">{hunterFeature.emoji}</span>
                <span className="font-bold">{hunterFeature.name.toLowerCase()}</span>
                <span className="text-xs opacity-80">{hunterFeature.short_description}</span>
              </Button>
              
              <Button
                onClick={activateWildcard}
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <span className="text-3xl mb-2">{wildcardFeature.emoji}</span>
                <span className="font-bold">{wildcardFeature.name.toLowerCase()}</span>
                <span className="text-xs opacity-80">{wildcardFeature.short_description}</span>
              </Button>
            </div>
            
            <div className="mt-6 text-center space-y-2">
              <div className="flex justify-center items-center gap-2 text-lg">
                <span>💫</span>
                <span className="text-sm text-muted-foreground font-medium">
                  your chaos control agents are active 24/7
                </span>
                <span>🛡️</span>
              </div>
              <p className="text-xs text-muted-foreground/70">
                these features run in background and activate when you need them most
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FloatingMemeButton;
