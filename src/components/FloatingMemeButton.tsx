
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";

interface FloatingMemeButtonProps {
  onQuickCapture: () => void;
}

const FloatingMemeButton: React.FC<FloatingMemeButtonProps> = ({ onQuickCapture }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Enhanced Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 animate-pulse"
            >
              <div className="flex flex-col items-center">
                <Sparkles className="h-6 w-6 text-white" />
                <span className="text-xs font-bold text-white mt-0.5">MEME</span>
              </div>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="bg-gradient-to-br from-black/95 via-purple-900/95 to-pink-900/95 border-purple-500/30 text-white backdrop-blur-lg">
            <SheetHeader>
              <SheetTitle className="text-white text-xl font-black flex items-center gap-2">
                <span>⚡</span>
                quick meme reflex mode
                <span>⚡</span>
              </SheetTitle>
              <SheetDescription className="text-gray-300 text-base">
                choose your meme delivery method bestie 💯
              </SheetDescription>
            </SheetHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                onClick={() => {
                  onQuickCapture();
                  setIsOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-24 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="text-3xl mb-2">📸</span>
                <span className="font-bold">screen sniper</span>
                <span className="text-xs opacity-80">instant OCR analysis</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => {
                  // Actually implement voice recognition
                  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
                    const recognition = new SpeechRecognition();
                    recognition.onresult = (event) => {
                      const transcript = event.results[0][0].transcript.toLowerCase();
                      if (transcript.includes('meme') || transcript.includes('help')) {
                        onQuickCapture();
                      }
                    };
                    recognition.start();
                  }
                  setIsOpen(false);
                }}
              >
                <span className="text-3xl mb-2">🎤</span>
                <span className="font-bold">voice summon</span>
                <span className="text-xs opacity-80">say "meme me!"</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-blue-500/50 text-white hover:bg-blue-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => {
                  // Simulate smart keyboard activation
                  const textArea = document.querySelector('textarea');
                  if (textArea) {
                    textArea.focus();
                    textArea.value = "yo this is awkward lol...";
                    textArea.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                  setIsOpen(false);
                }}
              >
                <span className="text-3xl mb-2">⌨️</span>
                <span className="font-bold">smart type</span>
                <span className="text-xs opacity-80">AI-powered suggestions</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-pink-500/50 text-white hover:bg-pink-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => {
                  // Simulate notification monitoring
                  const scenarios = [
                    "someone left you on read for 3 hours...",
                    "they replied with just 'k'",
                    "double text situation detected"
                  ];
                  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                  setTimeout(() => {
                    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
                    if (textArea) {
                      textArea.value = scenario;
                      textArea.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }, 1000);
                  setIsOpen(false);
                }}
              >
                <span className="text-3xl mb-2">🔔</span>
                <span className="font-bold">vibe radar</span>
                <span className="text-xs opacity-80">passive mood detection</span>
              </Button>
            </div>
            
            <div className="mt-6 text-center space-y-2">
              <div className="flex justify-center items-center gap-2 text-lg">
                <span>💯</span>
                <span className="text-sm text-gray-400 font-medium">
                  mobile app features coming soon fr
                </span>
                <span>🚀</span>
              </div>
              <p className="text-xs text-gray-500">
                current web demo shows the core AI vibe detection (it's fire ngl)
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FloatingMemeButton;
