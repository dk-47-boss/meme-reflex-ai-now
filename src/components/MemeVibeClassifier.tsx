
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
    keywords: ['...', 'um', 'okay', 'sure', 'idk', 'whatever', 'silence', 'awkward', 'chup', 'kya bolu', 'theek hai', 'pata nahi', 'ki bolbo', 'pesama iru', 'enna solrathu', 'bas kar'],
    memes: [
      { id: 1, title: 'Awkward Monkey Puppet / Chup Bandar', url: 'https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif', tags: ['awkward', 'silence', 'chup', 'bandar'], type: 'image' },
      { id: 2, title: 'Kapil Sharma Awkward Smile', url: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif', tags: ['awkward', 'kapil', 'smile'], type: 'image' },
      { id: 3, title: 'Rajpal Yadav Nervous Laugh', url: 'https://media.giphy.com/media/32mC2kXYWCsg0/giphy.gif', tags: ['nervous', 'rajpal', 'hasi'], type: 'image' }
    ]
  },
  'getting-roasted': {
    keywords: ['burn', 'savage', 'destroyed', 'owned', 'rekt', 'damn', 'brutal', 'roasted', 'murdered', '💀', 'le li', 'baj gayi', 'beizzati', 'waat lag gayi', 'bhaiiiii', 'chaap', 'mere diyeche', 'kaluvital', 'vaangi viten', 'band baj gayi', 'khatam', 'tata bye bye', 'baja di', 'mummy kasam'],
    memes: [
      { id: 4, title: 'Paresh Rawal Burn / Beizzati Ho Gayi', url: 'https://media.giphy.com/media/r1HGFou3mUwMw/giphy.gif', tags: ['roast', 'burn', 'paresh rawal'], type: 'image' },
      { id: 5, title: 'Akshay Kumar Oof Size Large', url: 'https://media.giphy.com/media/ZUwjT4TrkElu8/giphy.gif', tags: ['oof', 'akshay', 'big'], type: 'image' },
      { id: 6, title: 'Emotional Damage - Steven He', url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWFqZXA0emdwb2RucnVmcjRld2t6cGlqMWw3bjB6d3o2dDR5Zjh0eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/977YesTjNfQC7vQdpS/giphy.gif', tags: ['damage', 'emotional', 'steven he'], type: 'video' },
      { id: 7, title: 'Phir Hera Pheri - Babu Bhaiya Roast', url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', tags: ['hera pheri', 'babu bhaiya', 'roast'], type: 'image' }
    ]
  },
  'flirt-confusion': {
    keywords: ['cute', 'beautiful', 'hot', 'date', 'love', 'crush', 'flirt', '😍', '😘', '🥰', 'bestie', 'sundar', 'pyar', 'pyaar', 'ishq', 'mohabbat', 'jaan', 'sundor', 'bhalobasha', 'azhagu', 'kadhal', 'baby', 'sweetheart'],
    memes: [
      { id: 8, title: 'Shah Rukh Khan Flirt Mode', url: 'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif', tags: ['srk', 'flirt', 'bollywood'], type: 'image' },
      { id: 9, title: 'Kajol Heart Eyes / Pyaar Bhari Aankhen', url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', tags: ['kajol', 'love', 'pyaar'], type: 'image' },
      { id: 10, title: 'Ranveer Singh Smooth Criminal', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif', tags: ['ranveer', 'smooth', 'bollywood'], type: 'image' },
      { id: 11, title: 'Kareena Kapoor Blushing', url: 'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif', tags: ['kareena', 'blush', 'sharam'], type: 'image' }
    ]
  },
  'ghosting-vibes': {
    keywords: ['read', 'seen', 'ignore', 'ghost', 'left on read', 'no reply', 'silence', 'delivered', 'jawab nahi', 'dekh ke chhod diya', 'reply nahi kiya', 'uttor nei', 'reply nei', 'bathil illai', 'paathutu amaidhi', 'seen karke chhod diya', 'blue tick', 'double tick'],
    memes: [
      { id: 12, title: 'Amitabh Bachchan Waiting / Intezaar', url: 'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif', tags: ['amitabh', 'waiting', 'intezaar'], type: 'image' },
      { id: 13, title: 'Rajesh Khanna Left on Read Pain', url: 'https://media.giphy.com/media/tIeCLkB8geYtW/giphy.gif', tags: ['rajesh khanna', 'pain', 'dard'], type: 'image' },
      { id: 14, title: 'Waiting Skeleton Meme', url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWFqZXA0emdwb2RucnVmcjRld2t6cGlqMWw3bjB6d3o2dDR5Zjh0eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/977YesTjNfQC7vQdpS/giphy.gif', tags: ['waiting', 'forever', 'skeleton'], type: 'image' },
      { id: 15, title: 'Suniel Shetty Gayab Ho Gaya', url: 'https://media.giphy.com/media/4pMX5rJ4AZ3HSiIqpOj6/giphy.gif', tags: ['suniel shetty', 'ghost', 'gayab'], type: 'image' }
    ]
  },
  'sus-moments': {
    keywords: ['sus', 'weird', 'strange', 'uncomfortable', 'yikes', 'oof', 'secondhand', 'cap', 'ajeeb', 'garbar', 'kuch toh gadbad hai', 'daya', 'bhyaparta ki', 'sandhegam', 'enna nadakuthu', 'shak', 'doubt'],
    memes: [
      { id: 16, title: 'CID Daya Darwaza Tod Do', url: 'https://media.giphy.com/media/XsUtdIeJ0MWMo/giphy.gif', tags: ['cid', 'daya', 'sus'], type: 'image' },
      { id: 17, title: 'Jethalal Suspicious Look', url: 'https://media.giphy.com/media/4PT6v3PQKG6Yg/giphy.gif', tags: ['jethalal', 'suspicious', 'tmkoc'], type: 'image' },
      { id: 18, title: 'Akshay Kumar Side Eye Energy', url: 'https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif', tags: ['akshay', 'side-eye', 'sus'], type: 'image' },
      { id: 19, title: 'Salman Khan Doubting Face', url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', tags: ['salman', 'doubt', 'shak'], type: 'image' }
    ]
  },
  'big-win-energy': {
    keywords: ['yes', 'win', 'success', 'amazing', 'awesome', 'great', 'perfect', 'nailed it', 'slay', 'fire', '🔥', 'jeete', 'safal', 'kamaal', 'badhiya', 'aag laga di', 'macha diya', 'jitechi', 'darun', 'vetri', 'arputham', 'semma', 'zabardast', 'shandar'],
    memes: [
      { id: 20, title: 'Hrithik Roshan Victory Dance', url: 'https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif', tags: ['hrithik', 'victory', 'dance'], type: 'image' },
      { id: 21, title: 'Ranveer Singh Celebration Time', url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', tags: ['ranveer', 'celebrate', 'jashn'], type: 'image' },
      { id: 22, title: 'Kapil Dev Success Kid', url: 'https://media.giphy.com/media/msKNSs8rmJ5m/giphy.gif', tags: ['kapil dev', 'success', 'win'], type: 'image' },
      { id: 23, title: 'MS Dhoni Helicopter Shot', url: 'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif', tags: ['dhoni', 'helicopter', 'win'], type: 'image' }
    ]
  },
  'loss-fail': {
    keywords: ['fail', 'loss', 'mistake', 'wrong', 'bad', 'terrible', 'disaster', 'mess', 'rip', 'L', 'haar', 'galti', 'bekar', 'bura hua', 'here gechi', 'bhul', 'khub kharap', 'tholvi', 'thavaru', 'mosam', 'gaya kaam se'],
    memes: [
      { id: 24, title: 'Aamir Khan Epic Fail Face', url: 'https://media.giphy.com/media/TgmiJ4AZ3HSiIqpOj6/giphy.gif', tags: ['aamir', 'fail', 'disappointed'], type: 'image' },
      { id: 25, title: 'Taarak Mehta Disappointment', url: 'https://media.giphy.com/media/3o7abGQa0aRJUurpII/giphy.gif', tags: ['tmkoc', 'sad', 'nirasha'], type: 'image' },
      { id: 26, title: 'Rajpal Yadav Internal Screaming', url: 'https://media.giphy.com/media/3xz2BLBOt13X9AgjEA/giphy.gif', tags: ['rajpal', 'scream', 'internal'], type: 'image' }
    ]
  },
  'sarcastic-comebacks': {
    keywords: ['really', 'seriously', 'sure', 'obviously', 'wow', 'great', 'fantastic', 'brilliant', 'bet', 'haan haan', 'bilkul', 'sahi hai', 'bohot khoob', 'thik ache', 'darun byapar', 'aama aama', 'sari sari', 'waah', 'kya baat hai'],
    memes: [
      { id: 27, title: 'Naseeruddin Shah Epic Eye Roll', url: 'https://media.giphy.com/media/Fjr6v88OPk7U4/giphy.gif', tags: ['naseeruddin', 'eye roll', 'sarcasm'], type: 'image' },
      { id: 28, title: 'Irrfan Khan Sarcastic Applause', url: 'https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif', tags: ['irrfan', 'clap', 'sarcastic'], type: 'image' },
      { id: 29, title: 'Pankaj Tripathi Are You Serious', url: 'https://media.giphy.com/media/jeXiz1RAvzX44/giphy.gif', tags: ['pankaj tripathi', 'serious', 'really'], type: 'image' }
    ]
  },
  'relatable-pain': {
    keywords: ['relatable', 'story of my life', 'so true', 'same here', 'it be like that', 'hamesha', 'roz ka hai', 'meri kahani', 'ekdom thik', 'ithu en kathai', 'same to same', 'bilkul sahi'],
    memes: [
      { id: 30, title: 'Main Gareeb Hoon / I am poor', url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzh6d21yOGg0M2QxbTBtcGcwN3J0ZzZxaHVod2ZpMWZ0eXNmaXN0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/S52H6P52Gj3C1V2o5w/giphy.mp4', tags: ['relatable', 'pain', 'poor', 'gareeb'], type: 'video' },
      { id: 31, title: 'Control Uday Control - Welcome', url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVqdnVobm1sNW90cGoxZ2hjZGZtMmVnZ2lmcGRwMWw4MG8wbjN1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SA9QG5eFEOVkY/giphy.mp4', tags: ['control', 'relatable', 'welcome'], type: 'video' },
      { id: 32, title: 'Paisa Laya? / Did you bring money?', url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWQ4MmhqM2J0dmxveWpjNmZiaGtmd2dvdmlqdHYwaXJmcGpudjd6NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KGd6ns721d25LwQ2gA/giphy.mp4', tags: ['money', 'relatable', 'hera pheri'], type: 'video' },
      { id: 33, title: 'Ye Kya Bol Diya - Rajpal Yadav', url: 'https://media.giphy.com/media/xT9IgfNPRprdidd3Bm/giphy.gif', tags: ['rajpal', 'relatable', 'kya bol diya'], type: 'image' }
    ]
  },
  'bollywood-chaos': {
    keywords: ['bollywood', 'filmi', 'drama', 'natak', 'overacting', 'dramatic', 'filmy', 'cinema', 'movie', 'picture', 'hero', 'heroine'],
    memes: [
      { id: 34, title: 'Tum Se Na Ho Payega - Gangs of Wasseypur', url: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif', tags: ['gangs of wasseypur', 'tum se na ho payega', 'bollywood'], type: 'image' },
      { id: 35, title: 'Rahul Gandhi Pappu Dance', url: 'https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif', tags: ['rahul gandhi', 'dance', 'pappu'], type: 'image' },
      { id: 36, title: 'Virat Kohli Celebration', url: 'https://media.giphy.com/media/3o7abAHdYvw8AaQ4UE/giphy.gif', tags: ['virat kohli', 'celebration', 'cricket'], type: 'image' },
      { id: 37, title: 'Anurag Kashyap Frustrated', url: 'https://media.giphy.com/media/26gR1v0rIDrLSsZTq/giphy.gif', tags: ['anurag kashyap', 'frustrated', 'bollywood'], type: 'image' }
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
    await new Promise(resolve => setTimeout(resolve, 1500));

    const text = inputText.toLowerCase();
    let detectedVibe = 'relatable-pain'; // better default for Indian context
    let maxScore = 0;

    // Enhanced scoring system for better variety
    Object.entries(VIBE_CATEGORIES).forEach(([vibe, data]) => {
      let score = 0;
      
      // Keyword matching with different weights
      data.keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
          // Give higher scores for exact matches and phrases
          if (keyword.length > 3) {
            score += 3; // Higher weight for longer keywords
          } else {
            score += 1;
          }
        }
      });
      
      // Add context bonuses for Indian/Bollywood content
      if (vibe === 'bollywood-chaos' && (text.includes('filmi') || text.includes('drama') || text.includes('hero'))) {
        score += 5;
      }
      
      // Random factor to ensure variety (10% influence)
      score += Math.random() * 2;
      
      if (score > maxScore) {
        maxScore = score;
        detectedVibe = vibe;
      }
    });

    // Enhanced fallback logic with more nuanced detection
    if (maxScore === 0) {
      if (text.includes('fr') || text.includes('no cap') || text.includes('periodt') || text.includes('sahi hai')) {
        detectedVibe = 'big-win-energy';
      } else if (text.includes('bestie') || text.includes('bae') || text.includes('jaan') || text.includes('baby')) {
        detectedVibe = 'flirt-confusion';
      } else if (text.includes('bruh') || text.includes('💀') || text.includes('not me') || text.includes('bhai')) {
        detectedVibe = 'getting-roasted';
      } else if (text.includes('sus') || text.includes('cap') || text.includes('ajeeb') || text.includes('gadbad')) {
        detectedVibe = 'sus-moments';
      } else if (text.length < 20 && text.includes('?')) {
        detectedVibe = 'awkward-silence';
      } else if (text.includes('same') || text.includes('relate') || text.includes('hamesha') || text.includes('roz ka')) {
        detectedVibe = 'relatable-pain';
      } else if (text.includes('bollywood') || text.includes('filmi') || text.includes('hero') || text.includes('actress')) {
        detectedVibe = 'bollywood-chaos';
      } else {
        // Randomize when no clear pattern is found
        const vibes = Object.keys(VIBE_CATEGORIES);
        detectedVibe = vibes[Math.floor(Math.random() * vibes.length)];
      }
    }

    const vibeData = VIBE_CATEGORIES[detectedVibe as keyof typeof VIBE_CATEGORIES];
    
    // Shuffle memes to ensure variety
    const shuffledMemes = [...vibeData.memes].sort(() => Math.random() - 0.5);
    
    const vibeName = detectedVibe.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    console.log(`Detected vibe: ${vibeName}, Score: ${maxScore}, Memes: ${shuffledMemes.length}`);
    
    setIsAnalyzing(false);
    onVibeDetected(vibeName, shuffledMemes);
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
