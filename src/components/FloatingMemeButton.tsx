
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
                <span className="font-bold">screen capture</span>
                <span className="text-xs opacity-80">instant OCR analysis</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => {
                  alert('Voice trigger activated! Say "yo meme me!"');
                  setIsOpen(false);
                }}
              >
                <span className="text-3xl mb-2">🎤</span>
                <span className="font-bold">voice trigger</span>
                <span className="text-xs opacity-80">hands-free vibes</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-blue-500/50 text-white hover:bg-blue-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => {
                  alert('Smart keyboard activated! AI meme suggestions while typing.');
                  setIsOpen(false);
                }}
              >
                <span className="text-3xl mb-2">⌨️</span>
                <span className="font-bold">smart keyboard</span>
                <span className="text-xs opacity-80">type + meme sync</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-pink-500/50 text-white hover:bg-pink-600/20 h-24 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => {
                  alert('Auto-detect enabled! Monitoring for awkward moments...');
                  setIsOpen(false);
                }}
              >
                <span className="text-3xl mb-2">🔔</span>
                <span className="font-bold">auto-detect</span>
                <span className="text-xs opacity-80">passive cringe alerts</span>
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
