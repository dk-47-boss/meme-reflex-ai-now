
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import MemeVibeClassifier from "@/components/MemeVibeClassifier";

interface MainInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleVibeDetection: (vibe: string, memes: any[]) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  detectedVibe: string | null;
}

const MainInput: React.FC<MainInputProps> = ({
  inputText,
  setInputText,
  handleVibeDetection,
  isAnalyzing,
  setIsAnalyzing,
  detectedVibe
}) => {
  return (
    <Card className="bg-black/30 border-primary/30 backdrop-blur-lg max-w-2xl mx-auto mt-8 mb-8 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2 font-chakra">
          <MessageSquare className="h-5 w-5 text-primary" />
          spill the digital tea ☕
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="drop that unhinged convo or tell me what main character moment is happening..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="bg-secondary/50 border-primary/30 text-foreground placeholder:text-muted-foreground min-h-[120px] text-lg"
        />
        
        <MemeVibeClassifier
          inputText={inputText}
          onVibeDetected={handleVibeDetection}
          isAnalyzing={isAnalyzing}
          setIsAnalyzing={setIsAnalyzing}
        />

        {detectedVibe && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">vibe successfully captured:</span>
            <Badge variant="default" className="bg-primary text-primary-foreground border-none">
              {detectedVibe} energy locked and loaded 🔥
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainInput;
