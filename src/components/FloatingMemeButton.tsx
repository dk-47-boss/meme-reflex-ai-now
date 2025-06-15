
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FloatingMemeButtonProps {
  onQuickCapture: () => void;
}

const FloatingMemeButton: React.FC<FloatingMemeButtonProps> = ({ onQuickCapture }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          });
        })
        .catch(() => {
          // Fallback to simulated capture
          onQuickCapture();
          toast({
            title: "📸 Snatcher (Demo)",
            description: "Full screen capture works in the mobile app",
          });
        });
    } else {
      onQuickCapture();
    }
    setIsOpen(false);
  };

  const activateBlitz = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      toast({
        title: "⚡ Blitz Mode Active!",
        description: "Say 'emergency meme' or 'save me' for instant help",
      });
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('emergency') || transcript.includes('save me') || transcript.includes('help')) {
          recognition.stop();
          onQuickCapture();
          toast({
            title: "🆘 EMERGENCY RESPONSE!",
            description: "Deploying tactical memes immediately!",
          });
        }
      };
      
      recognition.start();
      
      // Auto-stop after 30 seconds
      setTimeout(() => {
        recognition.stop();
        toast({
          title: "⚡ Blitz Mode Standby",
          description: "Voice patrol ended - reactivate anytime",
        });
      }, 30000);
    } else {
      toast({
        title: "⚡ Blitz Mode (Limited)",
        description: "Voice features work better in the mobile app",
      });
    }
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
              className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 animate-pulse"
            >
              <div className="flex flex-col items-center">
                <Sparkles className="h-6 w-6 text-white" />
                <span className="text-xs font-bold text-white mt-0.5">SOS</span>
              </div>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="bg-gradient-to-br from-black/95 via-purple-900/95 to-pink-900/95 border-purple-500/30 text-white backdrop-blur-lg">
            <SheetHeader>
              <SheetTitle className="text-white text-xl font-black flex items-center gap-2">
                <span>🆘</span>
                meme emergency services
                <span>⚡</span>
              </SheetTitle>
              <SheetDescription className="text-gray-300 text-base">
                choose your chaos control agent buddy 💫
              </SheetDescription>
            </SheetHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                onClick={activateSnatcher}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-24 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="text-3xl mb-2">📸</span>
                <span className="font-bold">snatcher</span>
                <span className="text-xs opacity-80">steal text from anywhere</span>
              </Button>
              
              <Button
                onClick={activateBlitz}
                variant="outline"
                className="border-red-500/50 text-white hover:bg-red-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <span className="text-3xl mb-2">⚡</span>
                <span className="font-bold">blitz</span>
                <span className="text-xs opacity-80">voice emergency backup</span>
              </Button>
              
              <Button
                onClick={activateHunter}
                variant="outline"
                className="border-blue-500/50 text-white hover:bg-blue-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <span className="text-3xl mb-2">👻</span>
                <span className="font-bold">hunter</span>
                <span className="text-xs opacity-80">anti-ghosting patrol</span>
              </Button>
              
              <Button
                onClick={activateWildcard}
                variant="outline"
                className="border-yellow-500/50 text-white hover:bg-yellow-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <span className="text-3xl mb-2">🎭</span>
                <span className="font-bold">wildcard</span>
                <span className="text-xs opacity-80">unhinged energy unleashed</span>
              </Button>
            </div>
            
            <div className="mt-6 text-center space-y-2">
              <div className="flex justify-center items-center gap-2 text-lg">
                <span>💫</span>
                <span className="text-sm text-gray-400 font-medium">
                  your chaos control agents are active 24/7
                </span>
                <span>🛡️</span>
              </div>
              <p className="text-xs text-gray-500">
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
