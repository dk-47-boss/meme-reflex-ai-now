
import React from 'react';
import { Button } from "@/components/ui/button";

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
      { id: 1, title: 'Binod Meme Compilation', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', tags: ['binod', 'trending', 'indian'], type: 'video' },
      { id: 2, title: 'Rasode Mein Kaun Tha Viral', url: 'https://www.youtube.com/embed/jNQXAC9IVRw', tags: ['rasode', 'viral', 'trending'], type: 'video' },
      { id: 3, title: 'Akshay Kumar Bala Challenge', url: 'https://www.youtube.com/embed/kJQP7kiw5Fk', tags: ['bala', 'challenge', 'trending'], type: 'video' },
      { id: 4, title: 'Pawri Ho Rahi Hai Original', url: 'https://www.youtube.com/embed/abc123xyz', tags: ['pawri', 'pakistan', 'viral'], type: 'video' }
    ]
  },
  'getting-roasted': {
    keywords: ['burn', 'savage', 'destroyed', 'owned', 'rekt', 'damn', 'brutal', 'roasted', 'murdered', '💀', 'le li', 'baj gayi', 'beizzati', 'waat lag gayi', 'bhaiiiii', 'chaap', 'mere diyeche', 'kaluvital', 'vaangi viten', 'band baj gayi', 'khatam', 'tata bye bye', 'baja di', 'mummy kasam'],
    memes: [
      { id: 5, title: 'Carry Minati Roast Compilation', url: 'https://www.youtube.com/embed/u9Dg-g7t2l4', tags: ['carryminati', 'roast', 'trending'], type: 'video' },
      { id: 6, title: 'Hindustani Bhau Viral Moments', url: 'https://www.youtube.com/embed/sTSA_sWGM44', tags: ['hindustani bhau', 'bigg boss', 'viral'], type: 'video' },
      { id: 7, title: 'Chapri Roast Reels Instagram', url: 'https://www.youtube.com/embed/njO8mmr2MoQ', tags: ['chapri', 'instagram', 'roast'], type: 'video' },
      { id: 8, title: 'Triggered Insaan Best Roasts', url: 'https://www.youtube.com/embed/lYIRO97dhII', tags: ['triggered insaan', 'roast', 'youtube'], type: 'video' }
    ]
  },
  'flirt-confusion': {
    keywords: ['cute', 'beautiful', 'hot', 'date', 'love', 'crush', 'flirt', '😍', '😘', '🥰', 'bestie', 'sundar', 'pyar', 'pyaar', 'ishq', 'mohabbat', 'jaan', 'sundor', 'bhalobasha', 'azhagu', 'kadhal', 'baby', 'sweetheart'],
    memes: [
      { id: 9, title: 'Yashraj Mukhate Love Mashup', url: 'https://www.youtube.com/embed/sfmmDSE1y6Q', tags: ['yashraj mukhate', 'love', 'mashup'], type: 'video' },
      { id: 10, title: 'Kokilaben Love Song Remix', url: 'https://www.youtube.com/embed/HcVKjQB4fys', tags: ['kokila ben', 'love', 'remix'], type: 'video' },
      { id: 11, title: 'Biggini Shoot Instagram Trend', url: 'https://www.youtube.com/embed/kGtI496QFXg', tags: ['biggini shoot', 'instagram', 'trending'], type: 'video' },
      { id: 12, title: 'Deepika Padukone Gehraiyaan Memes', url: 'https://www.youtube.com/embed/CX11yw6YL1w', tags: ['deepika', 'gehraiyaan', 'memes'], type: 'video' }
    ]
  },
  'ghosting-vibes': {
    keywords: ['read', 'seen', 'ignore', 'ghost', 'left on read', 'no reply', 'silence', 'delivered', 'jawab nahi', 'dekh ke chhod diya', 'reply nahi kiya', 'uttor nei', 'reply nei', 'bathil illai', 'paathutu amaidhi', 'seen karke chhod diya', 'blue tick', 'double tick'],
    memes: [
      { id: 13, title: 'Kanta Laga Girl Viral Video', url: 'https://www.youtube.com/embed/uMK0prafzw0', tags: ['kanta laga', 'viral', 'girl'], type: 'video' },
      { id: 14, title: 'Arey Yaar Meme Compilation', url: 'https://www.youtube.com/embed/QtuqmThPE5c', tags: ['arey yaar', 'disappointment', 'meme'], type: 'video' },
      { id: 15, title: 'Munna Bhai Circuit Dialogues', url: 'https://www.youtube.com/embed/yOWK_ZLbv8c', tags: ['munna bhai', 'circuit', 'bollywood'], type: 'video' },
      { id: 16, title: 'Shehnaaz Gill Funny Moments', url: 'https://www.youtube.com/embed/2WPCLda_erI', tags: ['shehnaaz gill', 'bigg boss', 'funny'], type: 'video' }
    ]
  },
  'sus-moments': {
    keywords: ['sus', 'weird', 'strange', 'uncomfortable', 'yikes', 'oof', 'secondhand', 'cap', 'ajeeb', 'garbar', 'kuch toh gadbad hai', 'daya', 'bhyaparta ki', 'sandhegam', 'enna nadakuthu', 'shak', 'doubt'],
    memes: [
      { id: 17, title: 'Daya Darwaza Tod Do Viral', url: 'https://www.youtube.com/embed/heTGFOtV7xI', tags: ['daya', 'cid', 'darwaza tod'], type: 'video' },
      { id: 18, title: 'Saiman Says Sus Moments', url: 'https://www.youtube.com/embed/VmOyuGIVPjU', tags: ['saiman says', 'sus', 'youtube'], type: 'video' },
      { id: 19, title: 'Tanmay Bhat Reaction Memes', url: 'https://www.youtube.com/embed/JcXVKSU9ejY', tags: ['tanmay bhat', 'reaction', 'suspicious'], type: 'video' },
      { id: 20, title: 'Fukra Insaan Cringe Compilation', url: 'https://www.youtube.com/embed/4TuEWtXBT_0', tags: ['fukra insaan', 'cringe', 'youtube'], type: 'video' }
    ]
  },
  'big-win-energy': {
    keywords: ['yes', 'win', 'success', 'amazing', 'awesome', 'great', 'perfect', 'nailed it', 'slay', 'fire', '🔥', 'jeete', 'safal', 'kamaal', 'badhiya', 'aag laga di', 'macha diya', 'jitechi', 'darun', 'vetri', 'arputham', 'semma', 'zabardast', 'shandar'],
    memes: [
      { id: 21, title: 'Indian Cricket World Cup 2023', url: 'https://www.youtube.com/embed/0-sEoDqtDJ8', tags: ['cricket', 'world cup', 'victory'], type: 'video' },
      { id: 22, title: 'Rohit Sharma Six Machine', url: 'https://www.youtube.com/embed/7AuOn7dvx54', tags: ['rohit sharma', 'cricket', 'sixes'], type: 'video' },
      { id: 23, title: 'Virat Kohli 100th Century', url: 'https://www.youtube.com/embed/MsqKmCd6HoY', tags: ['virat kohli', 'century', 'cricket'], type: 'video' },
      { id: 24, title: 'RRR Oscar Win Celebration', url: 'https://www.youtube.com/embed/l_MyUGq7pgs', tags: ['rrr', 'oscar', 'rajamouli'], type: 'video' }
    ]
  },
  'loss-fail': {
    keywords: ['fail', 'loss', 'mistake', 'wrong', 'bad', 'terrible', 'disaster', 'mess', 'rip', 'L', 'haar', 'galti', 'bekar', 'bura hua', 'here gechi', 'bhul', 'khub kharap', 'tholvi', 'thavaru', 'mosam', 'gaya kaam se'],
    memes: [
      { id: 25, title: 'Indian Team Asia Cup 2023 Loss', url: 'https://www.youtube.com/embed/qs_eOvbyTGo', tags: ['cricket', 'loss', 'asia cup'], type: 'video' },
      { id: 26, title: 'Hardik Pandya IPL Controversy', url: 'https://www.youtube.com/embed/1zwmPo2wWQ4', tags: ['hardik pandya', 'ipl', 'controversy'], type: 'video' },
      { id: 27, title: 'Bollywood Box Office Flops 2023', url: 'https://www.youtube.com/embed/XYZ123abc', tags: ['bollywood', 'flop', 'box office'], type: 'video' }
    ]
  },
  'sarcastic-comebacks': {
    keywords: ['really', 'seriously', 'sure', 'obviously', 'wow', 'great', 'fantastic', 'brilliant', 'bet', 'haan haan', 'bilkul', 'sahi hai', 'bohot khoob', 'thik ache', 'darun byapar', 'aama aama', 'sari sari', 'waah', 'kya baat hai'],
    memes: [
      { id: 28, title: 'Kapil Sharma Sarcastic Moments', url: 'https://www.youtube.com/embed/ABC123xyz', tags: ['kapil sharma', 'sarcasm', 'comedy'], type: 'video' },
      { id: 29, title: 'Alia Bhatt Gangubai Dialogues', url: 'https://www.youtube.com/embed/DEF456uvw', tags: ['alia bhatt', 'gangubai', 'sarcasm'], type: 'video' },
      { id: 30, title: 'Bhuvan Bam BB Ki Vines Best', url: 'https://www.youtube.com/embed/GHI789rst', tags: ['bhuvan bam', 'bb ki vines', 'comedy'], type: 'video' }
    ]
  },
  'relatable-pain': {
    keywords: ['relatable', 'story of my life', 'so true', 'same here', 'it be like that', 'hamesha', 'roz ka hai', 'meri kahani', 'ekdom thik', 'ithu en kathai', 'same to same', 'bilkul sahi'],
    memes: [
      { id: 31, title: 'Engineering Students Life Memes', url: 'https://www.youtube.com/embed/JKL012mno', tags: ['engineering', 'student', 'relatable'], type: 'video' },
      { id: 32, title: 'Desi Parent Problems Compilation', url: 'https://www.youtube.com/embed/PQR345stu', tags: ['desi parents', 'problems', 'relatable'], type: 'video' },
      { id: 33, title: 'Middle Class Family Struggles', url: 'https://www.youtube.com/embed/VWX678yzz', tags: ['middle class', 'family', 'struggles'], type: 'video' },
      { id: 34, title: 'Sharma Ji Ka Beta Memes', url: 'https://www.youtube.com/embed/AAA111bbb', tags: ['sharma ji ka beta', 'comparison', 'relatable'], type: 'video' }
    ]
  },
  'bollywood-chaos': {
    keywords: ['bollywood', 'filmi', 'drama', 'natak', 'overacting', 'dramatic', 'filmy', 'cinema', 'movie', 'picture', 'hero', 'heroine'],
    memes: [
      { id: 35, title: 'Pushpa Srivalli Song Dance Trend', url: 'https://www.youtube.com/embed/BBB222ccc', tags: ['pushpa', 'srivalli', 'dance trend'], type: 'video' },
      { id: 36, title: 'KGF Rocky Bhai Dialogues', url: 'https://www.youtube.com/embed/CCC333ddd', tags: ['kgf', 'rocky bhai', 'dialogues'], type: 'video' },
      { id: 37, title: 'Kabir Singh Toxic Masculinity Memes', url: 'https://www.youtube.com/embed/DDD444eee', tags: ['kabir singh', 'toxic', 'memes'], type: 'video' },
      { id: 38, title: 'Allu Arjun Pushpa Style Instagram', url: 'https://www.youtube.com/embed/EEE555fff', tags: ['allu arjun', 'pushpa', 'style'], type: 'video' }
    ]
  },
  'viral-trending': {
    keywords: ['viral', 'trending', 'famous', 'popular', 'hit', 'buzz', 'talk', 'everywhere', 'social media', 'instagram', 'youtube', 'tiktok', 'reels'],
    memes: [
      { id: 39, title: 'Kacha Badam Original Song Viral', url: 'https://www.youtube.com/embed/FFF666ggg', tags: ['kacha badam', 'viral song', 'bengali'], type: 'video' },
      { id: 40, title: 'Bachpan Ka Pyaar Sahdev Meme', url: 'https://www.youtube.com/embed/GGG777hhh', tags: ['bachpan ka pyaar', 'sahdev', 'viral'], type: 'video' },
      { id: 41, title: 'Kala Chashma Challenge Instagram', url: 'https://www.youtube.com/embed/HHH888iii', tags: ['kala chashma', 'challenge', 'bollywood'], type: 'video' },
      { id: 42, title: 'Oh Bhai Maro Mujhe Maro Meme', url: 'https://www.youtube.com/embed/III999jjj', tags: ['oh bhai maro', 'meme', 'comedy'], type: 'video' },
      { id: 43, title: 'Ek Minute Instagram Reel Trend', url: 'https://www.youtube.com/embed/JJJ000kkk', tags: ['ek minute', 'instagram', 'trend'], type: 'video' },
      { id: 44, title: 'Jigra Alia Bhatt Instagram Posts', url: 'https://www.youtube.com/embed/KKK111lll', tags: ['jigra', 'alia bhatt', 'instagram'], type: 'video' },
      { id: 45, title: 'Nora Fatehi Dance Reels Compilation', url: 'https://www.youtube.com/embed/LLL222mmm', tags: ['nora fatehi', 'dance', 'reels'], type: 'video' },
      { id: 46, title: 'Bade Miyan Chote Miyan Trailer Memes', url: 'https://www.youtube.com/embed/MMM333nnn', tags: ['bade miyan chote miyan', 'trailer', 'memes'], type: 'video' }
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
      return;
    }

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const text = inputText.toLowerCase();
    let detectedVibe = 'viral-trending';
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
      
      // Boost viral-trending for general queries
      if (vibe === 'viral-trending' && (text.includes('meme') || text.includes('funny') || text.includes('video'))) {
        score += 5;
      }
      
      score += Math.random() * 2;
      
      if (score > maxScore) {
        maxScore = score;
        detectedVibe = vibe;
      }
    });

    // Enhanced fallback logic to include trending content
    if (maxScore === 0) {
      const vibes = Object.keys(VIBE_CATEGORIES);
      detectedVibe = vibes[Math.floor(Math.random() * vibes.length)];
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
