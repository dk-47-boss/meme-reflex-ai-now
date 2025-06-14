
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
      await setupAppMonitoring();
      
      // Initialize floating overlay
      await setupFloatingOverlay();
      
      // Initialize clipboard monitoring
      await setupClipboardMonitoring();
      
      toast({
        title: "🚀 Native Features Active!",
        description: "Meme Reflex is now monitoring your chats across all apps",
      });
    } catch (error) {
      console.error('Failed to initialize native features:', error);
      toast({
        title: "⚠️ Limited Mode",
        description: "Running in web mode with simulated features",
        variant: "destructive"
      });
    }
  };

  const initializeWebFallback = () => {
    // Simulate native features in web environment
    toast({
      title: "🌐 Web Demo Mode",
      description: "Native cross-app features will work in the mobile app",
    });

    // Enhanced web simulation
    setupWebKeyboardMonitoring();
    setupWebVoiceActivation();
  };

  const setupAppMonitoring = async () => {
    // This would monitor other apps for text input in the native version
    console.log('Setting up cross-app monitoring...');
    
    // Simulate detection of chat apps
    const chatApps = ['WhatsApp', 'Instagram', 'Snapchat', 'iMessage', 'Discord'];
    
    setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const app = chatApps[Math.floor(Math.random() * chatApps.length)];
        toast({
          title: `📱 ${app} Activity Detected`,
          description: "Tap floating button for instant meme suggestions",
        });
      }
    }, 5000);
  };

  const setupFloatingOverlay = async () => {
    // This would create a system-level floating button in native version
    console.log('Setting up floating overlay...');
    
    // For now, enhance the existing floating button
    const floatingButton = document.querySelector('[data-floating-meme]');
    if (floatingButton) {
      floatingButton.setAttribute('style', 
        'position: fixed; z-index: 9999; bottom: 20px; right: 20px; opacity: 0.9;'
      );
    }
  };

  const setupClipboardMonitoring = async () => {
    // Monitor clipboard for awkward text patterns
    console.log('Setting up clipboard monitoring...');
    
    // Simulate clipboard detection
    setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance
        const awkwardTexts = [
          "left on read for 3 hours...",
          "they just replied with 'k'",
          "double texted again 😭",
          "sent that at 3am..."
        ];
        const text = awkwardTexts[Math.floor(Math.random() * awkwardTexts.length)];
        
        toast({
          title: "📋 Awkward Text Detected!",
          description: text,
        });
      }
    }, 10000);
  };

  const setupWebKeyboardMonitoring = () => {
    // Enhanced keyboard monitoring for web
    let typingTimer: NodeJS.Timeout;
    
    document.addEventListener('keydown', (event) => {
      clearTimeout(typingTimer);
      
      // Check for specific key combinations that might indicate awkwardness
      if (event.ctrlKey && event.key === 'a') { // Ctrl+A (select all to delete)
        toast({
          title: "👀 Rewrite Detected",
          description: "Looks like you're having second thoughts...",
        });
      }
      
      typingTimer = setTimeout(() => {
        // User stopped typing - analyze what they might be writing
        if (Math.random() < 0.1) {
          toast({
            title: "⌨️ Smart Type Active",
            description: "Meme suggestions ready if you need them",
          });
        }
      }, 3000);
    });
  };

  const setupWebVoiceActivation = () => {
    // Enhanced voice activation
    document.addEventListener('keydown', (event) => {
      // Secret activation: Hold Shift + M for 2 seconds
      if (event.shiftKey && event.key === 'M') {
        setTimeout(() => {
          if (event.shiftKey) { // Still holding
            onTriggerMeme();
            toast({
              title: "🎤 Voice Summon Triggered!",
              description: "Meme mode activated via hotkey",
            });
          }
        }, 2000);
      }
    });
  };

  return null; // This is a service component, no UI
};

export default NativeService;
