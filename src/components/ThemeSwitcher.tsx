
import React from 'react';
import { Button } from "@/components/ui/button";

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
    <div className="grid grid-cols-2 gap-3 pt-6">
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
  );
};

export default ThemeSwitcher;
