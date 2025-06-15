
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Mic, Radar, Keyboard } from "lucide-react";

interface StatusBarProps {
  isVoiceModeActive: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ isVoiceModeActive }) => {
  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      <Badge variant={isVoiceModeActive ? 'destructive' : 'secondary'} className={`${isVoiceModeActive ? 'animate-pulse' : ''}`}>
        <Mic className="h-3 w-3 mr-1" />
        voicewave {isVoiceModeActive ? 'LIVE' : 'standby'}
      </Badge>
      <Badge variant="secondary">
        <Radar className="h-3 w-3 mr-1" />
        vibes: immaculate
      </Badge>
      <Badge variant="secondary" className="animate-pulse">
        <Keyboard className="h-3 w-3 mr-1" />
        chaos: controlled
      </Badge>
      <Badge variant="secondary">
        👻 ghost patrol: active
      </Badge>
    </div>
  );
};

export default StatusBar;
