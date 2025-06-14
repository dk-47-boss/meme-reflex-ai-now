
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.618c387161174e1a97ee314456594ffd',
  appName: 'meme-reflex-ai-now',
  webDir: 'dist',
  server: {
    url: 'https://618c3871-6117-4e1a-97ee-314456594ffd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
