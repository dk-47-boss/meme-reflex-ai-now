
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MemeVibeClassifierProps {
  inputText: string;
  onVibeDetected: (vibe: string, memes: any[]) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const VIBE_CATEGORIES = {
  'awkward-silence': {
    keywords: ['...', 'um', 'okay', 'sure', 'idk', 'whatever', 'silence'],
    memes: [
      { id: 1, title: 'Awkward Monkey', url: 'https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif', tags: ['awkward'] },
      { id: 2, title: 'This is Fine', url: 'https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif', tags: ['awkward'] },
      { id: 3, title: 'Nervous Laugh', url: 'https://media.giphy.com/media/32mC2kXYWCsg0/giphy.gif', tags: ['awkward'] }
    ]
  },
  'getting-roasted': {
    keywords: ['burn', 'savage', 'destroyed', 'owned', 'rekt', 'damn', 'brutal'],
    memes: [
      { id: 4, title: 'Apply Cold Water', url: 'https://media.giphy.com/media/r1HGFou3mUwMw/giphy.gif', tags: ['roast'] },
      { id: 5, title: 'Oof Size Large', url: 'https://media.giphy.com/media/ZUwjT4TrkElu8/giphy.gif', tags: ['roast'] },
      { id: 6, title: 'Emotional Damage', url: 'https://media.giphy.com/media/ro08ZmQ1MeqZypzgDN/giphy.gif', tags: ['roast'] }
    ]
  },
  'flirt-confusion': {
    keywords: ['cute', 'beautiful', 'hot', 'date', 'love', 'crush', 'flirt', '😍', '😘', '🥰'],
    memes: [
      { id: 7, title: 'Blushing', url: 'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif', tags: ['flirt'] },
      { id: 8, title: 'Heart Eyes', url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', tags: ['flirt'] },
      { id: 9, title: 'Smooth', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif', tags: ['flirt'] }
    ]
  },
  'ghosting-vibes': {
    keywords: ['read', 'seen', 'ignore', 'ghost', 'left on read', 'no reply', 'silence'],
    memes: [
      { id: 10, title: 'Left on Read', url: 'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif', tags: ['ghost'] },
      { id: 11, title: 'Waiting', url: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif', tags: ['ghost'] },
      { id: 12, title: 'Disappearing', url: 'https://media.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif', tags: ['ghost'] }
    ]
  },
  'cringe-moments': {
    keywords: ['cringe', 'embarrassing', 'awkward', 'yikes', 'oof', 'secondhand', 'uncomfortable'],
    memes: [
      { id: 13, title: 'Facepalm', url: 'https://media.giphy.com/media/XsUtdIeJ0MWMo/giphy.gif', tags: ['cringe'] },
      { id: 14, title: 'Hide', url: 'https://media.giphy.com/media/4PT6v3PQKG6Yg/giphy.gif', tags: ['cringe'] },
      { id: 15, title: 'Yikes', url: 'https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif', tags: ['cringe'] }
    ]
  },
  'big-win-energy': {
    keywords: ['yes', 'win', 'success', 'amazing', 'awesome', 'great', 'perfect', 'nailed it'],
    memes: [
      { id: 16, title: 'Victory Dance', url: 'https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif', tags: ['win'] },
      { id: 17, title: 'Celebration', url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', tags: ['win'] },
      { id: 18, title: 'Success Kid', url: 'https://media.giphy.com/media/msKNSs8rmJ5m/giphy.gif', tags: ['win'] }
    ]
  },
  'loss-fail': {
    keywords: ['fail', 'loss', 'mistake', 'wrong', 'bad', 'terrible', 'disaster', 'mess'],
    memes: [
      { id: 19, title: 'Epic Fail', url: 'https://media.giphy.com/media/TgmiJ4AZ3HSiIqpOj6/giphy.gif', tags: ['fail'] },
      { id: 20, title: 'Disappointed', url: 'https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif', tags: ['fail'] },
      { id: 21, title: 'Facepalm', url: 'https://media.giphy.com/media/3xz2BLBOt13X9AgjEA/giphy.gif', tags: ['fail'] }
    ]
  },
  'sarcastic-comebacks': {
    keywords: ['really', 'seriously', 'sure', 'obviously', 'wow', 'great', 'fantastic', 'brilliant'],
    memes: [
      { id: 22, title: 'Eye Roll', url: 'https://media.giphy.com/media/Fjr6v88OPk7U4/giphy.gif', tags: ['sarcasm'] },
      { id: 23, title: 'Sarcastic Clap', url: 'https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif', tags: ['sarcasm'] },
      { id: 24, title: 'Really?', url: 'https://media.giphy.com/media/jeXiz1RAvzX44/giphy.gif', tags: ['sarcasm'] }
    ]
  }
};

const MemeVibeClassifier: React.FC<MemeVibeClassifierProps> = ({
  inputText,
  onVibeDetected,
  isAnalyzing,
  setIsAnalyzing
}) => {

  const analyzeVibe = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to analyze",
        description: "Please enter some text to detect the vibe",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple keyword-based classification (in production, this would use a proper AI model)
    const text = inputText.toLowerCase();
    let detectedVibe = 'awkward-silence'; // default
    let maxMatches = 0;

    // Find the vibe with the most keyword matches
    Object.entries(VIBE_CATEGORIES).forEach(([vibe, data]) => {
      const matches = data.keywords.filter(keyword => text.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedVibe = vibe;
      }
    });

    // If no keywords match, use sentiment analysis fallback
    if (maxMatches === 0) {
      if (text.includes('?') && text.length < 20) {
        detectedVibe = 'awkward-silence';
      } else if (text.includes('!') || text.includes('great') || text.includes('amazing')) {
        detectedVibe = 'big-win-energy';
      } else if (text.includes('no') || text.includes('bad') || text.includes('wrong')) {
        detectedVibe = 'loss-fail';
      }
    }

    const vibeData = VIBE_CATEGORIES[detectedVibe];
    const vibeName = detectedVibe.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    setIsAnalyzing(false);
    onVibeDetected(vibeName, vibeData.memes);
  };

  return (
    <Button 
      onClick={analyzeVibe}
      disabled={isAnalyzing || !inputText.trim()}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
    >
      {isAnalyzing ? "🧠 Analyzing Vibe..." : "⚡ Get Perfect Memes"}
    </Button>
  );
};

export default MemeVibeClassifier;
