
import React, { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { toast } from "@/hooks/use-toast";

interface NativeServiceProps {
  onTriggerMeme: () => void;
}

const NativeService: React.FC<NativeServiceProps> = ({ onTriggerMeme }) => {
  
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeNativeFeatures();
    } else {
      // Web fallback - simulate native features
      initializeWebFallback();
    }
  }, []);

  const initializeNativeFeatures = async () => {
    try {
      // Initialize background app monitoring
      await setupVibeWatchdog();
      
      // Initialize floating overlay
      await setupSaveMyAssButton();
      
      // Initialize clipboard monitoring
      await setupCringeDetector();
      
      toast({
        title: "🚀 All Systems Online!",
        description: "Your meme guardian angels are now protecting you bestie",
      });
    } catch (error) {
      console.error('Failed to initialize native features:', error);
      toast({
        title: "⚠️ Basic Mode Only",
        description: "Some features need the mobile app to be fully fire",
        variant: "destructive"
      });
    }
  };

  const initializeWebFallback = () => {
    // Simulate native features in web environment
    toast({
      title: "🌐 Demo Mode Active",
      description: "Full power unlocks in the mobile app fr",
    });

    // Enhanced web simulation
    setupSirenMode();
    setupGhostBuster();
    setupChaosMode();
  };

  const setupVibeWatchdog = async () => {
    // This would monitor other apps for text input in the native version
    console.log('🐕 Vibe Watchdog is now sniffing for awkward energy...');
    
    // Simulate detection of chat apps
    const chatApps = ['WhatsApp', 'Instagram', 'Snapchat', 'iMessage', 'Discord', 'TikTok DMs'];
    
    setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance every 5 seconds
        const app = chatApps[Math.floor(Math.random() * chatApps.length)];
        const situations = [
          'typing for 10 minutes straight',
          'left on read for 3 hours',
          'triple texted again',
          'seen but not replied',
          'typing then deleting repeatedly'
        ];
        const situation = situations[Math.floor(Math.random() * situations.length)];
        
        toast({
          title: `🚨 ${app} SOS Alert!`,
          description: `${situation} - tap floating button for backup!`,
        });
      }
    }, 5000);
  };

  const setupSaveMyAssButton = async () => {
    // This would create a system-level floating button in native version
    console.log('🆘 Save My Ass button is now floating above all apps...');
    
    // For now, enhance the existing floating button
    const floatingButton = document.querySelector('[data-floating-meme]');
    if (floatingButton) {
      floatingButton.setAttribute('style', 
        'position: fixed; z-index: 9999; bottom: 20px; right: 20px; opacity: 0.9; box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);'
      );
    }
  };

  const setupCringeDetector = async () => {
    // Monitor clipboard for awkward text patterns
    console.log('😬 Cringe Detector is scanning your clipboard...');
    
    // Simulate clipboard detection
    setInterval(() => {
      if (Math.random() < 0.08) { // 8% chance
        const cringeTexts = [
          "just typed 'hey' 47 times...",
          "wrote a paragraph then deleted it",
          "accidentally sent a voice note",
          "replied to wrong person 💀",
          "double-tapped their story by mistake"
        ];
        const text = cringeTexts[Math.floor(Math.random() * cringeTexts.length)];
        
        toast({
          title: "😬 Cringe Alert Detected!",
          description: text,
        });
      }
    }, 8000);
  };

  const setupSirenMode = () => {
    // Enhanced keyboard monitoring for web
    let typingTimer: NodeJS.Timeout;
    let panicKeyPressed = false;
    
    document.addEventListener('keydown', (event) => {
      clearTimeout(typingTimer);
      
      // Panic key combination: Ctrl+Shift+M
      if (event.ctrlKey && event.shiftKey && event.key === 'M') {
        if (!panicKeyPressed) {
          panicKeyPressed = true;
          onTriggerMeme();
          toast({
            title: "🚨 SIREN MODE ACTIVATED!",
            description: "Emergency meme deployment initiated!",
          });
          setTimeout(() => { panicKeyPressed = false; }, 3000);
        }
      }
      
      // Check for frantic typing patterns
      if (event.key === 'Backspace') {
        setTimeout(() => {
          if (Math.random() < 0.2) {
            toast({
              title: "🔥 Siren Mode Standby",
              description: "Detected panic deleting - say the word and I got you",
            });
          }
        }, 2000);
      }
      
      typingTimer = setTimeout(() => {
        // User stopped typing - analyze what they might be writing
        if (Math.random() < 0.12) {
          toast({
            title: "⌨️ Siren Mode Ready",
            description: "Press Ctrl+Shift+M if you need immediate backup",
          });
        }
      }, 4000);
    });
  };

  const setupGhostBuster = () => {
    // Enhanced screen monitoring
    let lastActivity = Date.now();
    
    // Monitor for screen activity
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        lastActivity = Date.now();
      });
    });
    
    // Check for being left on read patterns
    setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      
      if (inactiveTime > 30000 && Math.random() < 0.1) { // 30 seconds inactive
        const ghostScenarios = [
          "staring at 'delivered' for too long",
          "refresh count: probably over 50",
          "last seen 2 hours ago but still online",
          "they viewed your story but didn't reply"
        ];
        const scenario = ghostScenarios[Math.floor(Math.random() * ghostScenarios.length)];
        
        toast({
          title: "👻 Ghost Buster Alert!",
          description: scenario + " - need a comeback?",
        });
      }
    }, 15000);
  };

  const setupChaosMode = () => {
    // Random chaos interventions
    setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance every 20 seconds
        const chaosEvents = [
          {
            title: "🎭 Chaos Mode: Vibe Check",
            description: "Random confidence boost incoming in 3... 2... 1..."
          },
          {
            title: "⚡ Chaos Mode: Reality Check", 
            description: "They're probably just busy bestie, don't overthink it"
          },
          {
            title: "🔮 Chaos Mode: Future Vision",
            description: "Plot twist: this convo will be iconic in 2 hours"
          },
          {
            title: "💎 Chaos Mode: Main Character",
            description: "Reminder: you're the main character in this story"
          }
        ];
        
        const event = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
        toast(event);
      }
    }, 20000);
  };

  return null; // This is a service component, no UI
};

export default NativeService;
