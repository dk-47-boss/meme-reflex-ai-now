
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
      { id: 1, title: 'Awkward Monkey Puppet', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', tags: ['awkward', 'silence', 'chup', 'bandar'], type: 'video' },
      { id: 2, title: 'Kapil Sharma Awkward Moments', url: 'https://www.youtube.com/embed/jNQXAC9IVRw', tags: ['awkward', 'kapil', 'comedy'], type: 'video' },
      { id: 3, title: 'Rajpal Yadav Comedy Scenes', url: 'https://www.youtube.com/embed/kJQP7kiw5Fk', tags: ['nervous', 'rajpal', 'bollywood'], type: 'video' }
    ]
  },
  'getting-roasted': {
    keywords: ['burn', 'savage', 'destroyed', 'owned', 'rekt', 'damn', 'brutal', 'roasted', 'murdered', '💀', 'le li', 'baj gayi', 'beizzati', 'waat lag gayi', 'bhaiiiii', 'chaap', 'mere diyeche', 'kaluvital', 'vaangi viten', 'band baj gayi', 'khatam', 'tata bye bye', 'baja di', 'mummy kasam'],
    memes: [
      { id: 4, title: 'Paresh Rawal Best Roasts', url: 'https://www.youtube.com/embed/u9Dg-g7t2l4', tags: ['roast', 'burn', 'paresh rawal'], type: 'video' },
      { id: 5, title: 'Akshay Kumar Comedy Roasts', url: 'https://www.youtube.com/embed/sTSA_sWGM44', tags: ['roast', 'akshay', 'bollywood'], type: 'video' },
      { id: 6, title: 'Emotional Damage Compilation', url: 'https://www.youtube.com/embed/njO8mmr2MoQ', tags: ['damage', 'emotional', 'roast'], type: 'video' },
      { id: 7, title: 'Hera Pheri Roast Scenes', url: 'https://www.youtube.com/embed/lYIRO97dhII', tags: ['hera pheri', 'babu bhaiya', 'comedy'], type: 'video' }
    ]
  },
  'flirt-confusion': {
    keywords: ['cute', 'beautiful', 'hot', 'date', 'love', 'crush', 'flirt', '😍', '😘', '🥰', 'bestie', 'sundar', 'pyar', 'pyaar', 'ishq', 'mohabbat', 'jaan', 'sundor', 'bhalobasha', 'azhagu', 'kadhal', 'baby', 'sweetheart'],
    memes: [
      { id: 8, title: 'SRK Romantic Scenes', url: 'https://www.youtube.com/embed/sfmmDSE1y6Q', tags: ['srk', 'romance', 'bollywood'], type: 'video' },
      { id: 9, title: 'Bollywood Love Songs', url: 'https://www.youtube.com/embed/HcVKjQB4fys', tags: ['love', 'songs', 'bollywood'], type: 'video' },
      { id: 10, title: 'Ranveer Singh Flirting', url: 'https://www.youtube.com/embed/kGtI496QFXg', tags: ['ranveer', 'flirt', 'bollywood'], type: 'video' },
      { id: 11, title: 'Kareena Kapoor Romantic Scenes', url: 'https://www.youtube.com/embed/CX11yw6YL1w', tags: ['kareena', 'romance', 'bollywood'], type: 'video' }
    ]
  },
  'ghosting-vibes': {
    keywords: ['read', 'seen', 'ignore', 'ghost', 'left on read', 'no reply', 'silence', 'delivered', 'jawab nahi', 'dekh ke chhod diya', 'reply nahi kiya', 'uttor nei', 'reply nei', 'bathil illai', 'paathutu amaidhi', 'seen karke chhod diya', 'blue tick', 'double tick'],
    memes: [
      { id: 12, title: 'Waiting Memes Compilation', url: 'https://www.youtube.com/embed/uMK0prafzw0', tags: ['waiting', 'ghost', 'memes'], type: 'video' },
      { id: 13, title: 'Left on Read Pain', url: 'https://www.youtube.com/embed/QtuqmThPE5c', tags: ['read', 'pain', 'relatable'], type: 'video' },
      { id: 14, title: 'Amitabh Waiting Scenes', url: 'https://www.youtube.com/embed/yOWK_ZLbv8c', tags: ['amitabh', 'waiting', 'bollywood'], type: 'video' },
      { id: 15, title: 'WhatsApp Blue Tick Memes', url: 'https://www.youtube.com/embed/2WPCLda_erI', tags: ['whatsapp', 'blue tick', 'memes'], type: 'video' }
    ]
  },
  'sus-moments': {
    keywords: ['sus', 'weird', 'strange', 'uncomfortable', 'yikes', 'oof', 'secondhand', 'cap', 'ajeeb', 'garbar', 'kuch toh gadbad hai', 'daya', 'bhyaparta ki', 'sandhegam', 'enna nadakuthu', 'shak', 'doubt'],
    memes: [
      { id: 16, title: 'CID Suspicious Moments', url: 'https://www.youtube.com/embed/heTGFOtV7xI', tags: ['cid', 'suspicious', 'investigation'], type: 'video' },
      { id: 17, title: 'Jethalal Funny Moments', url: 'https://www.youtube.com/embed/VmOyuGIVPjU', tags: ['jethalal', 'tmkoc', 'comedy'], type: 'video' },
      { id: 18, title: 'Akshay Kumar Sus Scenes', url: 'https://www.youtube.com/embed/JcXVKSU9ejY', tags: ['akshay', 'suspicious', 'bollywood'], type: 'video' },
      { id: 19, title: 'Salman Khan Expressions', url: 'https://www.youtube.com/embed/4TuEWtXBT_0', tags: ['salman', 'expressions', 'bollywood'], type: 'video' }
    ]
  },
  'big-win-energy': {
    keywords: ['yes', 'win', 'success', 'amazing', 'awesome', 'great', 'perfect', 'nailed it', 'slay', 'fire', '🔥', 'jeete', 'safal', 'kamaal', 'badhiya', 'aag laga di', 'macha diya', 'jitechi', 'darun', 'vetri', 'arputham', 'semma', 'zabardast', 'shandar'],
    memes: [
      { id: 20, title: 'Victory Dance Compilation', url: 'https://www.youtube.com/embed/0-sEoDqtDJ8', tags: ['victory', 'dance', 'celebration'], type: 'video' },
      { id: 21, title: 'Ranveer Singh Celebrations', url: 'https://www.youtube.com/embed/7AuOn7dvx54', tags: ['ranveer', 'celebration', 'energy'], type: 'video' },
      { id: 22, title: 'MS Dhoni Winning Moments', url: 'https://www.youtube.com/embed/MsqKmCd6HoY', tags: ['dhoni', 'cricket', 'victory'], type: 'video' },
      { id: 23, title: 'Bollywood Victory Songs', url: 'https://www.youtube.com/embed/l_MyUGq7pgs', tags: ['victory', 'bollywood', 'songs'], type: 'video' }
    ]
  },
  'loss-fail': {
    keywords: ['fail', 'loss', 'mistake', 'wrong', 'bad', 'terrible', 'disaster', 'mess', 'rip', 'L', 'haar', 'galti', 'bekar', 'bura hua', 'here gechi', 'bhul', 'khub kharap', 'tholvi', 'thavaru', 'mosam', 'gaya kaam se'],
    memes: [
      { id: 24, title: 'Epic Fail Compilation', url: 'https://www.youtube.com/embed/qs_eOvbyTGo', tags: ['fail', 'epic', 'funny'], type: 'video' },
      { id: 25, title: 'Aamir Khan Disappointed', url: 'https://www.youtube.com/embed/1zwmPo2wWQ4', tags: ['aamir', 'disappointed', 'bollywood'], type: 'video' },
      { id: 26, title: 'Cricket Fail Moments', url: 'https://www.youtube.com/embed/XYZ123abc', tags: ['cricket', 'fail', 'sports'], type: 'video' }
    ]
  },
  'sarcastic-comebacks': {
    keywords: ['really', 'seriously', 'sure', 'obviously', 'wow', 'great', 'fantastic', 'brilliant', 'bet', 'haan haan', 'bilkul', 'sahi hai', 'bohot khoob', 'thik ache', 'darun byapar', 'aama aama', 'sari sari', 'waah', 'kya baat hai'],
    memes: [
      { id: 27, title: 'Sarcastic Bollywood Dialogues', url: 'https://www.youtube.com/embed/ABC123xyz', tags: ['sarcasm', 'bollywood', 'dialogues'], type: 'video' },
      { id: 28, title: 'Irrfan Khan Best Lines', url: 'https://www.youtube.com/embed/DEF456uvw', tags: ['irrfan', 'sarcasm', 'wit'], type: 'video' },
      { id: 29, title: 'Stand Up Comedy Roasts', url: 'https://www.youtube.com/embed/GHI789rst', tags: ['standup', 'roast', 'comedy'], type: 'video' }
    ]
  },
  'relatable-pain': {
    keywords: ['relatable', 'story of my life', 'so true', 'same here', 'it be like that', 'hamesha', 'roz ka hai', 'meri kahani', 'ekdom thik', 'ithu en kathai', 'same to same', 'bilkul sahi'],
    memes: [
      { id: 30, title: 'Relatable Indian Problems', url: 'https://www.youtube.com/embed/JKL012mno', tags: ['relatable', 'indian', 'problems'], type: 'video' },
      { id: 31, title: 'Student Life Struggles', url: 'https://www.youtube.com/embed/PQR345stu', tags: ['student', 'relatable', 'struggle'], type: 'video' },
      { id: 32, title: 'Desi Parent Expectations', url: 'https://www.youtube.com/embed/VWX678yzz', tags: ['parents', 'desi', 'expectations'], type: 'video' },
      { id: 33, title: 'Rajpal Yadav Relatable Moments', url: 'https://www.youtube.com/embed/AAA111bbb', tags: ['rajpal', 'relatable', 'comedy'], type: 'video' }
    ]
  },
  'bollywood-chaos': {
    keywords: ['bollywood', 'filmi', 'drama', 'natak', 'overacting', 'dramatic', 'filmy', 'cinema', 'movie', 'picture', 'hero', 'heroine'],
    memes: [
      { id: 34, title: 'Bollywood Logic Compilation', url: 'https://www.youtube.com/embed/BBB222ccc', tags: ['bollywood', 'logic', 'funny'], type: 'video' },
      { id: 35, title: 'Overacting Scenes', url: 'https://www.youtube.com/embed/CCC333ddd', tags: ['overacting', 'dramatic', 'bollywood'], type: 'video' },
      { id: 36, title: 'Iconic Bollywood Dialogues', url: 'https://www.youtube.com/embed/DDD444eee', tags: ['dialogues', 'iconic', 'bollywood'], type: 'video' },
      { id: 37, title: 'Behind The Scenes Chaos', url: 'https://www.youtube.com/embed/EEE555fff', tags: ['bts', 'chaos', 'movies'], type: 'video' }
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
    let detectedVibe = 'relatable-pain';
    let maxScore = 0;

    // Enhanced scoring system for better variety
    Object.entries(VIBE_CATEGORIES).forEach(([vibe, data]) => {
      let score = 0;
      
      data.keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
          if (keyword.length > 3) {
            score += 3;
          } else {
            score += 1;
          }
        }
      });
      
      if (vibe === 'bollywood-chaos' && (text.includes('filmi') || text.includes('drama') || text.includes('hero'))) {
        score += 5;
      }
      
      score += Math.random() * 2;
      
      if (score > maxScore) {
        maxScore = score;
        detectedVibe = vibe;
      }
    });

    // Enhanced fallback logic
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
        const vibes = Object.keys(VIBE_CATEGORIES);
        detectedVibe = vibes[Math.floor(Math.random() * vibes.length)];
      }
    }

    const vibeData = VIBE_CATEGORIES[detectedVibe as keyof typeof VIBE_CATEGORIES];
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
