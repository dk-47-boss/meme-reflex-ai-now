
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureCardsProps {
  config: {
    cardLayout: string;
    features: { name: string; emoji: string; description: string; }[];
    cardStyle: string;
    showDescription: boolean;
  };
  featureHandlers: (() => void)[];
  isVoiceModeActive: boolean;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ config, featureHandlers, isVoiceModeActive }) => {
  return (
    <div className={config.cardLayout}>
      {config.features.map((feature, index) => (
        <Card 
          key={feature.name}
          className={`bg-card/50 backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300 group animate-float ${config.cardStyle} ${index === 0 ? 'border-destructive/50' : ''}`}
          onClick={featureHandlers[index]}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2 group-hover:animate-bounce">{feature.emoji}</div>
            <h3 className="font-bold text-foreground mb-1 text-sm font-chakra">{feature.name}</h3>
            {config.showDescription && <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>}
            {index === 0 ? (
              <Badge variant={isVoiceModeActive ? 'destructive' : 'secondary'} className={`${isVoiceModeActive ? 'animate-pulse' : ''}`}>
                {isVoiceModeActive ? `${feature.emoji} ACTIVE` : '🔇 tap'}
              </Badge>
            ) : (
              <Badge variant="secondary">
                {['⚡ operational', '🟢 hunting ghosts', '💫 chaos ready'][index - 1]}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
