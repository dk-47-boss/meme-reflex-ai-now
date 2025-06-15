
import React from 'react';
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";

const themes = [
  { name: 'Synthwave', value: 'synthwave' },
  { name: 'Retro Neon', value: 'retro-neon-arcade' },
  { name: 'Cyberpunk', value: 'cyberpunk-vaporwave' },
  { name: 'Sunset', value: 'sunset-vibes' },
  { name: 'Electric Mint', value: 'electric-mint' },
  { name: 'Hot Magenta', value: 'hot-magenta-chaos' },
];

interface ThemeSwitcherProps {
  setTheme: (theme: string) => void;
  currentTheme: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ setTheme, currentTheme }) => {
  return (
    <div className="my-8 p-4 bg-card/50 border border-primary/20 rounded-lg backdrop-blur-sm max-w-2xl mx-auto">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-chakra text-foreground">
        <Paintbrush className="h-5 w-5 text-primary" />
        Vibe Check: Choose Your Theme
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.value}
            variant={currentTheme === theme.value ? 'default' : 'secondary'}
            onClick={() => setTheme(theme.value)}
            className={`transition-all duration-200 ${currentTheme === theme.value ? 'ring-2 ring-primary' : ''}`}
          >
            {theme.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
