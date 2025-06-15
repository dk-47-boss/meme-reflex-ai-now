
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { toast } from "@/hooks/use-toast";

interface NativeServiceProps {
  onTriggerMeme: () => void;
  onServiceReady?: (services: {
    activateVibeWatchdog: () => void;
    activateCringeDetector: () => void;
    deactivateFeature: (featureName: string) => void;
    activeFeatures: string[];
  }) => void;
}

const NativeService: React.FC<NativeServiceProps> = ({ onTriggerMeme, onServiceReady }) => {
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeNativeFeatures();
    } else {
      // Web fallback - more controlled notifications
      initializeWebFallback();
    }
  }, []);

  // Expose functions to parent when component mounts
  useEffect(() => {
    if (onServiceReady) {
      onServiceReady({
        activateVibeWatchdog,
        activateCringeDetector,
        deactivateFeature,
        activeFeatures
      });
    }
  }, [activeFeatures, onServiceReady]);

  const initializeNativeFeatures = async () => {
    try {
      toast({
        title: "🚀 Vibe Check Emergency HQ Online!",
        description: "Your digital guardian angels are locked and loaded bestie",
      });
    } catch (error) {
      console.error('Failed to initialize native features:', error);
      toast({
        title: "⚠️ Basic Vibes Only",
        description: "Some features need the mobile app to be fully fire",
        variant: "destructive"
      });
    }
  };

  const initializeWebFallback = () => {
    toast({
      title: "🌐 Demo Vibes Active",
      description: "Full chaos unlocks in the mobile app fr fr",
    });

    // Only setup features that user activates
    setupKeyboardShortcuts();
  };

  const setupKeyboardShortcuts = () => {
    let panicKeyPressed = false;
    
    document.addEventListener('keydown', (event) => {
      // Panic key combination: Ctrl+Shift+M
      if (event.ctrlKey && event.shiftKey && event.key === 'M') {
        if (!panicKeyPressed) {
          panicKeyPressed = true;
          onTriggerMeme();
          toast({
            title: "🚨 EMERGENCY VIBES ACTIVATED!",
            description: "Tactical meme deployment incoming!",
          });
          setTimeout(() => { panicKeyPressed = false; }, 3000);
        }
      }
    });
  };

  // Only show notifications when features are actively being used
  const activateVibeWatchdog = () => {
    if (activeFeatures.includes('vibe-watchdog')) return;
    
    setActiveFeatures(prev => [...prev, 'vibe-watchdog']);
    console.log('🐕 Vibe Watchdog is now sniffing for awkward energy...');
    
    toast({
      title: "🐕 Vibe Watchdog Activated!",
      description: "Now monitoring for digital drama across all apps",
    });

    // Controlled monitoring - only occasional alerts
    const watchdogInterval = setInterval(() => {
      if (!activeFeatures.includes('vibe-watchdog')) {
        clearInterval(watchdogInterval);
        return;
      }
      
      if (Math.random() < 0.08) { // Reduced to 8% chance every 15 seconds
        const chatApps = ['WhatsApp', 'Instagram', 'Snapchat', 'iMessage', 'Discord', 'TikTok DMs'];
        const app = chatApps[Math.floor(Math.random() * chatApps.length)];
        const situations = [
          'typing for 10 minutes straight',
          'left on read for 3 hours', 
          'triple texted again',
          'seen but not replied'
        ];
        const situation = situations[Math.floor(Math.random() * situations.length)];
        
        toast({
          title: `🚨 ${app} Alert!`,
          description: `${situation} - need backup?`,
        });
      }
    }, 15000);
  };

  const activateCringeDetector = () => {
    if (activeFeatures.includes('cringe-detector')) return;
    
    setActiveFeatures(prev => [...prev, 'cringe-detector']);
    console.log('😬 Cringe Detector scanning...');
    
    toast({
      title: "😬 Cringe Detector Online!",
      description: "Monitoring for secondhand embarrassment moments",
    });

    const cringeInterval = setInterval(() => {
      if (!activeFeatures.includes('cringe-detector')) {
        clearInterval(cringeInterval);
        return;
      }
      
      if (Math.random() < 0.05) { // Very low chance - 5% every 20 seconds
        const cringeTexts = [
          "just typed 'hey' 47 times...",
          "wrote a paragraph then deleted it",
          "accidentally sent a voice note",
          "double-tapped their story by mistake"
        ];
        const text = cringeTexts[Math.floor(Math.random() * cringeTexts.length)];
        
        toast({
          title: "😬 Cringe Alert!",
          description: text,
        });
      }
    }, 20000);
  };

  const deactivateFeature = (featureName: string) => {
    setActiveFeatures(prev => prev.filter(f => f !== featureName));
    toast({
      title: `${featureName} Deactivated`,
      description: "Feature stopped - reactivate anytime bestie",
    });
  };

  return null;
};

export default NativeService;
