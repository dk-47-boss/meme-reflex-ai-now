
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface FloatingMemeButtonProps {
  onQuickCapture: () => void;
}

const FloatingMemeButton: React.FC<FloatingMemeButtonProps> = ({ onQuickCapture }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <span className="text-2xl">⚡</span>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="bg-black/90 border-purple-500/30 text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Quick Meme Actions ⚡</SheetTitle>
              <SheetDescription className="text-gray-400">
                Choose your meme reflex method
              </SheetDescription>
            </SheetHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                onClick={() => {
                  onQuickCapture();
                  setIsOpen(false);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white h-20 flex flex-col items-center justify-center"
              >
                <span className="text-2xl mb-1">📸</span>
                <span className="text-sm">Screen Capture</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-600/20 h-20 flex flex-col items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl mb-1">🎤</span>
                <span className="text-sm">Voice Trigger</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-600/20 h-20 flex flex-col items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl mb-1">⌨️</span>
                <span className="text-sm">Smart Keyboard</span>
              </Button>
              
              <Button
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-600/20 h-20 flex flex-col items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl mb-1">🔔</span>
                <span className="text-sm">Auto-Detect</span>
              </Button>
            </div>
            
            <p className="text-center text-sm text-gray-400 mt-4">
              Mobile features coming soon! Current web demo shows the core AI vibe detection.
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FloatingMemeButton;
