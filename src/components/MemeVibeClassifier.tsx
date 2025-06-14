
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
    keywords: ['...', 'um', 'okay', 'sure', 'idk', 'whatever', 'silence', 'awkward'],
    memes: [
      { id: 1, title: 'awkward monkey puppet', url: 'https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif', tags: ['awkward', 'silence'] },
      { id: 2, title: 'this is fine dog', url: 'https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif', tags: ['awkward', 'fine'] },
      { id: 3, title: 'nervous laugh', url: 'https://media.giphy.com/media/32mC2kXYWCsg0/giphy.gif', tags: ['nervous', 'awkward'] }
    ]
  },
  'getting-roasted': {
    keywords: ['burn', 'savage', 'destroyed', 'owned', 'rekt', 'damn', 'brutal', 'roasted', 'murdered', '💀'],
    memes: [
      { id: 4, title: 'apply cold water to burned area', url: 'https://media.giphy.com/media/r1HGFou3mUwMw/giphy.gif', tags: ['roast', 'burn'] },
      { id: 5, title: 'oof size large', url: 'https://media.giphy.com/media/ZUwjT4TrkElu8/giphy.gif', tags: ['oof', 'big'] },
      { id: 6, title: 'emotional damage', url: 'https://media.giphy.com/media/ro08ZmQ1MeqZypzgDN/giphy.gif', tags: ['damage', 'emotional'] }
    ]
  },
  'flirt-confusion': {
    keywords: ['cute', 'beautiful', 'hot', 'date', 'love', 'crush', 'flirt', '😍', '😘', '🥰', 'bestie'],
    memes: [
      { id: 7, title: 'blushing anime girl', url: 'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif', tags: ['blush', 'anime'] },
      { id: 8, title: 'heart eyes', url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', tags: ['love', 'hearts'] },
      { id: 9, title: 'smooth criminal', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif', tags: ['smooth', 'cool'] }
    ]
  },
  'ghosting-vibes': {
    keywords: ['read', 'seen', 'ignore', 'ghost', 'left on read', 'no reply', 'silence', 'delivered'],
    memes: [
      { id: 10, title: 'left on read pain', url: 'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif', tags: ['read', 'pain'] },
      { id: 11, title: 'waiting skeleton', url: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif', tags: ['waiting', 'forever'] },
      { id: 12, title: 'homer disappearing', url: 'https://media.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif', tags: ['disappear', 'ghost'] }
    ]
  },
  'cringe-moments': {
    keywords: ['cringe', 'embarrassing', 'awkward', 'yikes', 'oof', 'secondhand', 'uncomfortable', 'sus'],
    memes: [
      { id: 13, title: 'ultimate facepalm', url: 'https://media.giphy.com/media/XsUtdIeJ0MWMo/giphy.gif', tags: ['facepalm', 'disappointed'] },
      { id: 14, title: 'hiding in shame', url: 'https://media.giphy.com/media/4PT6v3PQKG6Yg/giphy.gif', tags: ['hide', 'shame'] },
      { id: 15, title: 'yikes forever', url: 'https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif', tags: ['yikes', 'cringe'] }
    ]
  },
  'big-win-energy': {
    keywords: ['yes', 'win', 'success', 'amazing', 'awesome', 'great', 'perfect', 'nailed it', 'slay', 'fire', '🔥'],
    memes: [
      { id: 16, title: 'victory dance', url: 'https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif', tags: ['victory', 'dance'] },
      { id: 17, title: 'celebration time', url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', tags: ['party', 'celebrate'] },
      { id: 18, title: 'success kid', url: 'https://media.giphy.com/media/msKNSs8rmJ5m/giphy.gif', tags: ['success', 'win'] }
    ]
  },
  'loss-fail': {
    keywords: ['fail', 'loss', 'mistake', 'wrong', 'bad', 'terrible', 'disaster', 'mess', 'rip', 'L'],
    memes: [
      { id: 19, title: 'epic fail compilation', url: 'https://media.giphy.com/media/TgmiJ4AZ3HSiIqpOj6/giphy.gif', tags: ['fail', 'epic'] },
      { id: 20, title: 'big disappointment', url: 'https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif', tags: ['disappointed', 'sad'] },
      { id: 21, title: 'internal screaming', url: 'https://media.giphy.com/media/3xz2BLBOt13X9AgjEA/giphy.gif', tags: ['scream', 'internal'] }
    ]
  },
  'sarcastic-comebacks': {
    keywords: ['really', 'seriously', 'sure', 'obviously', 'wow', 'great', 'fantastic', 'brilliant', 'bet'],
    memes: [
      { id: 22, title: 'epic eye roll', url: 'https://media.giphy.com/media/Fjr6v88OPk7U4/giphy.gif', tags: ['eye roll', 'sarcasm'] },
      { id: 23, title: 'sarcastic applause', url: 'https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif', tags: ['clap', 'sarcastic'] },
      { id: 24, title: 'are you serious rn', url: 'https://media.giphy.com/media/jeXiz1RAvzX44/giphy.gif', tags: ['serious', 'really'] }
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
        title: "bestie where's the tea? ☕",
        description: "drop some text so i can read the vibe check",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Enhanced vibe detection with Gen Z context
    await new Promise(resolve => setTimeout(resolve, 1500));

    const text = inputText.toLowerCase();
    let detectedVibe = 'awkward-silence'; // default fallback
    let maxMatches = 0;

    // Advanced keyword matching with context
    Object.entries(VIBE_CATEGORIES).forEach(([vibe, data]) => {
      const matches = data.keywords.filter(keyword => text.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedVibe = vibe;
      }
    });

    // Enhanced sentiment analysis with Gen Z slang
    if (maxMatches === 0) {
      if (text.includes('fr') || text.includes('no cap') || text.includes('periodt')) {
        detectedVibe = 'big-win-energy';
      } else if (text.includes('bestie') || text.includes('bae') || text.includes('💖')) {
        detectedVibe = 'flirt-confusion';
      } else if (text.includes('bruh') || text.includes('💀') || text.includes('not me')) {
        detectedVibe = 'getting-roasted';
      } else if (text.includes('sus') || text.includes('cap') || text.includes('💅')) {
        detectedVibe = 'sarcastic-comebacks';
      } else if (text.length < 20 && text.includes('?')) {
        detectedVibe = 'awkward-silence';
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
      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
      data-analyze-button
    >
      {isAnalyzing ? "🧠 reading the room..." : "⚡ gimme those memes bestie"}
    </Button>
  );
};

export default MemeVibeClassifier;
