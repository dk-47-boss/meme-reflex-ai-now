
import React from 'react';

interface HeaderProps {
  config: {
    headerIcons: string[];
    description: string;
  };
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>{config.headerIcons[0]}</span>
        <span className="text-4xl animate-pulse">{config.headerIcons[1]}</span>
        <h1 
          className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse font-chakra"
          style={{ textShadow: "0 0 12px hsl(var(--primary) / 0.8)" }}
        >
          MemeVault
        </h1>
        <span className="text-4xl animate-pulse">{config.headerIcons[2]}</span>
        <span className="text-4xl animate-spin" style={{ animationDuration: '3.5s' }}>{config.headerIcons[3]}</span>
      </div>
      <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium">
        {config.description}
      </p>
      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        emergency vibes delivered in under 2.5 seconds no cap
        <span className="inline-block w-2 h-2 bg-primary/70 rounded-full animate-pulse"></span>
      </p>
    </div>
  );
};

export default Header;
