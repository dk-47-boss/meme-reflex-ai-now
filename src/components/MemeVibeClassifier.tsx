
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
      { 
        id: 1, 
        title: 'Awkward Silence Starter Pack', 
        content: 'When someone says "we need to talk" and then doesn\'t talk 👁️👄👁️',
        type: 'text',
        tags: ['awkward', 'silence', 'relatable']
      },
      { 
        id: 2, 
        title: 'Cricket Sounds', 
        content: '*awkward cricket noises* 🦗🦗🦗\n\nMe: Says something\nEveryone: 😐\nMe: 🤡',
        type: 'text',
        tags: ['cricket', 'awkward', 'silence']
      },
      { 
        id: 3, 
        title: 'Binod Classic', 
        content: 'Binod 🗿\n\n(Use this when you have nothing else to say)',
        type: 'text',
        tags: ['binod', 'classic', 'indian']
      },
      { 
        id: 4, 
        title: 'Drake No/Yes Format', 
        content: '🙅‍♂️ Having a normal conversation\n\n👉 Sitting in uncomfortable silence',
        type: 'text',
        tags: ['drake', 'format', 'choice']
      }
    ]
  },
  'getting-roasted': {
    keywords: ['burn', 'savage', 'destroyed', 'owned', 'rekt', 'damn', 'brutal', 'roasted', 'murdered', '💀', 'le li', 'baj gayi', 'beizzati', 'waat lag gayi', 'bhaiiiii', 'chaap', 'mere diyeche', 'kaluvital', 'vaangi viten', 'band baj gayi', 'khatam', 'tata bye bye', 'baja di', 'mummy kasam'],
    memes: [
      { 
        id: 5, 
        title: 'Emotional Damage', 
        content: 'EMOTIONAL DAMAGE 💀\n\n*Steven He voice*\n\nWhen someone roasts you so hard you question your existence',
        type: 'text',
        tags: ['emotional damage', 'steven he', 'roast']
      },
      { 
        id: 6, 
        title: 'Apply Cold Water', 
        content: '🔥🔥🔥 BURN DETECTED 🔥🔥🔥\n\nApply cold water to the burned area\n\n*That hit different fr* 💀',
        type: 'text',
        tags: ['burn', 'roast', 'fire']
      },
      { 
        id: 7, 
        title: 'Chapri Comeback', 
        content: 'Bhai ne baja di 🤡\n\nWhen the roast is so good you can\'t even be mad\n\n*Respect button pressed* 📍',
        type: 'text',
        tags: ['chapri', 'respect', 'indian']
      },
      { 
        id: 8, 
        title: 'Coffin Dance', 
        content: '⚰️💃🕺💃🕺⚰️\n\n*Coffin dance music intensifies*\n\nRIP to my self-esteem',
        type: 'text',
        tags: ['coffin dance', 'rip', 'meme']
      }
    ]
  },
  'flirt-confusion': {
    keywords: ['cute', 'beautiful', 'hot', 'date', 'love', 'crush', 'flirt', '😍', '😘', '🥰', 'bestie', 'sundar', 'pyar', 'pyaar', 'ishq', 'mohabbat', 'jaan', 'sundor', 'bhalobasha', 'azhagu', 'kadhal', 'baby', 'sweetheart'],
    memes: [
      { 
        id: 9, 
        title: 'Friendship Zone Alert', 
        content: 'POV: They called you "bestie" 🤡\n\n*Friendship zone entry sound effect*\n\nMe: 📍🤡📍',
        type: 'text',
        tags: ['friend zone', 'bestie', 'clown']
      },
      { 
        id: 10, 
        title: 'Mixed Signals', 
        content: 'Them: *sends heart emoji*\nMe: OMG THEY LIKE ME\nThem: *sends it to everyone in the group*\nMe: 🤡🤡🤡',
        type: 'text',
        tags: ['mixed signals', 'heart', 'confusion']
      },
      { 
        id: 11, 
        title: 'Overthinking Mode', 
        content: 'Me analyzing "haha" vs "HAHA" vs "😂"\n\n*Detective mode activated* 🕵️‍♂️\n\nBrain: This means something deep',
        type: 'text',
        tags: ['overthinking', 'analysis', 'texting']
      },
      { 
        id: 12, 
        title: 'Simp Card', 
        content: '┌─────────────────┐\n│   SIMP CARD     │\n│   ♥️ ACTIVATED   │\n│   💸💸💸💸💸    │\n└─────────────────┘\n\n*Wallet crying sounds*',
        type: 'text',
        tags: ['simp', 'card', 'money']
      }
    ]
  },
  'ghosting-vibes': {
    keywords: ['read', 'seen', 'ignore', 'ghost', 'left on read', 'no reply', 'silence', 'delivered', 'jawab nahi', 'dekh ke chhod diya', 'reply nahi kiya', 'uttor nei', 'reply nei', 'bathil illai', 'paathutu amaidhi', 'seen karke chhod diya', 'blue tick', 'double tick'],
    memes: [
      { 
        id: 13, 
        title: 'Blue Tick Torture', 
        content: 'Last seen: 2 hours ago ✓✓\n\nMe: Hey\nThem: *seen*\nMe: 🤡\n\n*Clown music intensifies*',
        type: 'text',
        tags: ['blue tick', 'seen', 'ghost']
      },
      { 
        id: 14, 
        title: 'Casper the Friendly Ghost', 
        content: 'POV: You\'ve been ghosted\n\n👻 Casper the Friendly Ghost\n🚫 This person\n\nAt least Casper shows up sometimes',
        type: 'text',
        tags: ['casper', 'ghost', 'comparison']
      },
      { 
        id: 15, 
        title: 'Typing Indicator Hell', 
        content: 'Them: *typing...*\nMe: 😊\nThem: *stops typing*\nMe: 😐\nThem: *typing...*\nMe: 😊\nThem: *stops typing*\nMe: 🤡',
        type: 'text',
        tags: ['typing', 'indicator', 'torture']
      },
      { 
        id: 16, 
        title: 'Double Text Shame', 
        content: 'Me: Hey\nMe: How are you?\nMe: Did you see my message?\nMe: Sorry for double texting\nMe: Triple texting*\nMe: 🤡🤡🤡🤡',
        type: 'text',
        tags: ['double text', 'shame', 'desperate']
      }
    ]
  },
  'sus-moments': {
    keywords: ['sus', 'weird', 'strange', 'uncomfortable', 'yikes', 'oof', 'secondhand', 'cap', 'ajeeb', 'garbar', 'kuch toh gadbad hai', 'daya', 'bhyaparta ki', 'sandhegam', 'enna nadakuthu', 'shak', 'doubt'],
    memes: [
      { 
        id: 17, 
        title: 'Among Us Sus', 
        content: '📮 SUS ALERT 📮\n\nWhen someone acts weird:\n"That\'s kinda sus bro"\n\n*Emergency meeting called*',
        type: 'text',
        tags: ['among us', 'sus', 'emergency']
      },
      { 
        id: 18, 
        title: 'Side Eye Monkey', 
        content: '🐵👀\n\n*Monkey puppet looking away then looking back*\n\nMe when someone says something sus',
        type: 'text',
        tags: ['monkey', 'side eye', 'puppet']
      },
      { 
        id: 19, 
        title: 'CID Daya', 
        content: 'Daya: "Kuch toh gadbad hai boss"\n\nACP: "Darwaza tod do Daya!"\n\n*When something feels off*',
        type: 'text',
        tags: ['cid', 'daya', 'gadbad']
      },
      { 
        id: 20, 
        title: 'Visible Confusion', 
        content: '????\n\n*Visible confusion*\n\nMath lady meme energy\n\nWhen nothing makes sense anymore',
        type: 'text',
        tags: ['confusion', 'math lady', 'question marks']
      }
    ]
  },
  'big-win-energy': {
    keywords: ['yes', 'win', 'success', 'amazing', 'awesome', 'great', 'perfect', 'nailed it', 'slay', 'fire', '🔥', 'jeete', 'safal', 'kamaal', 'badhiya', 'aag laga di', 'macha diya', 'jitechi', 'darun', 'vetri', 'arputham', 'semma', 'zabardast', 'shandar'],
    memes: [
      { 
        id: 21, 
        title: 'Leonardo DiCaprio Toast', 
        content: '🥂 *Leonardo DiCaprio raising glass*\n\n"Finally, some good fucking news"\n\nCheers to the W! 🎉',
        type: 'text',
        tags: ['leonardo', 'toast', 'celebration']
      },
      { 
        id: 22, 
        title: 'Dancing Pallbearers', 
        content: '⚰️💃🕺💃🕺⚰️\n\nBut make it CELEBRATION edition\n\n*Happy coffin dance for burying the haters*',
        type: 'text',
        tags: ['pallbearers', 'celebration', 'dance']
      },
      { 
        id: 23, 
        title: 'Sigma Grindset', 
        content: '💪 SIGMA MALE GRINDSET 💪\n\n✅ Wake up\n✅ Win\n✅ Refuse to elaborate\n✅ Leave\n\n*Chad energy activated*',
        type: 'text',
        tags: ['sigma', 'grindset', 'chad']
      },
      { 
        id: 24, 
        title: 'Stonks Guy', 
        content: '📈 STONKS 📈\n\n*Meme man pointing at upward graph*\n\nSuccess rate: 100%\nHater tears: Maximum',
        type: 'text',
        tags: ['stonks', 'success', 'graph']
      }
    ]
  },
  'loss-fail': {
    keywords: ['fail', 'loss', 'mistake', 'wrong', 'bad', 'terrible', 'disaster', 'mess', 'rip', 'L', 'haar', 'galti', 'bekar', 'bura hua', 'here gechi', 'bhul', 'khub kharap', 'tholvi', 'thavaru', 'mosam', 'gaya kaam se'],
    memes: [
      { 
        id: 25, 
        title: 'This is Fine Dog', 
        content: '🐕☕🔥\n\n*Dog sitting in burning room*\n\n"This is fine"\n\nMe when everything goes wrong',
        type: 'text',
        tags: ['this is fine', 'dog', 'fire']
      },
      { 
        id: 26, 
        title: 'Big L', 
        content: '🇱\n\nF in the chat boys\n\nAnother one bites the dust\n\n*Sad violin music*',
        type: 'text',
        tags: ['L', 'loss', 'F in chat']
      },
      { 
        id: 27, 
        title: 'Tom and Jerry Explosion', 
        content: '💥🐱💥\n\n*Tom after explosion with soot face*\n\nMe after my plans backfire spectacularly',
        type: 'text',
        tags: ['tom jerry', 'explosion', 'backfire']
      },
      { 
        id: 28, 
        title: 'Error 404', 
        content: 'ERROR 404\nSuccess Not Found\n\n*Windows XP error sound*\n\nPlease try again later... or never',
        type: 'text',
        tags: ['error 404', 'windows', 'failure']
      }
    ]
  },
  'sarcastic-comebacks': {
    keywords: ['really', 'seriously', 'sure', 'obviously', 'wow', 'great', 'fantastic', 'brilliant', 'bet', 'haan haan', 'bilkul', 'sahi hai', 'bohot khoob', 'thik ache', 'darun byapar', 'aama aama', 'sari sari', 'waah', 'kya baat hai'],
    memes: [
      { 
        id: 29, 
        title: 'Sarcastic Clap', 
        content: '👏 *slow clap* 👏\n\nWow, genius level intellect right there\n\n*Chef\'s kiss* 💋👌',
        type: 'text',
        tags: ['slow clap', 'sarcasm', 'genius']
      },
      { 
        id: 30, 
        title: 'Sure Jan', 
        content: '"Sure, Jan" 🙄\n\n*Brady Bunch mom energy*\n\nWhen someone says something obviously false',
        type: 'text',
        tags: ['sure jan', 'brady bunch', 'sarcasm']
      },
      { 
        id: 31, 
        title: 'Indian Aunty Sarcasm', 
        content: '"Waah beta, kya baat hai!" 👏\n\n*Aunty clapping sarcastically*\n\nBohot achha kiya tumne',
        type: 'text',
        tags: ['indian aunty', 'waah beta', 'sarcasm']
      },
      { 
        id: 32, 
        title: 'Mock SpongeBob', 
        content: 'tHaT\'s So SmArT oF yOu\n\n*Mocking SpongeBob meme*\n\n🧽🤡🧽',
        type: 'text',
        tags: ['spongebob', 'mocking', 'alternating caps']
      }
    ]
  },
  'relatable-pain': {
    keywords: ['relatable', 'story of my life', 'so true', 'same here', 'it be like that', 'hamesha', 'roz ka hai', 'meri kahani', 'ekdom thik', 'ithu en kathai', 'same to same', 'bilkul sahi'],
    memes: [
      { 
        id: 33, 
        title: 'It Be Like That Sometimes', 
        content: 'Life: *happens*\nMe: Why though?\nLife: It be like that sometimes\nMe: 😔\n\n*Sad Pepe energy*',
        type: 'text',
        tags: ['it be like that', 'life', 'sad pepe']
      },
      { 
        id: 34, 
        title: 'Sharma Ji Ka Beta', 
        content: 'Mom: "Sharma ji ka beta got 95%"\nMe with 85%: 🤡\n\nSharma ji ka beta: *exists*\nEvery Indian kid: 💀',
        type: 'text',
        tags: ['sharma ji ka beta', 'indian parents', 'comparison']
      },
      { 
        id: 35, 
        title: 'Monday Mood', 
        content: 'Sunday 11:59 PM: 😊\nMonday 12:00 AM: 💀\n\n*Internal screaming*\n\nWhy is Monday a thing?',
        type: 'text',
        tags: ['monday', 'weekend over', 'relatable']
      },
      { 
        id: 36, 
        title: 'Broke Student Life', 
        content: 'Bank Balance: ₹47\nMe: "I\'m financially stable"\n\n*Maggi for dinner again*\n\n🍜😭🍜',
        type: 'text',
        tags: ['broke', 'student', 'maggi']
      }
    ]
  },
  'bollywood-chaos': {
    keywords: ['bollywood', 'filmi', 'drama', 'natak', 'overacting', 'dramatic', 'filmy', 'cinema', 'movie', 'picture', 'hero', 'heroine'],
    memes: [
      { 
        id: 37, 
        title: 'Bollywood Logic', 
        content: 'Bollywood Physics:\n🚗 Car explodes after small bump\n💃 Dancing cures all problems\n🎵 Songs solve everything\n\n*Logic has left the chat*',
        type: 'text',
        tags: ['bollywood logic', 'physics', 'dancing']
      },
      { 
        id: 38, 
        title: 'Pushpa Style', 
        content: '"Pushpa ka style hai ye"\n\n*Allu Arjun shoulder gesture*\n\nJhukega nahi saala! 🔥',
        type: 'text',
        tags: ['pushpa', 'allu arjun', 'style']
      },
      { 
        id: 39, 
        title: 'Tum Mujhe Tumb Pasand Ho', 
        content: '"Tum mujhe tumb pasand ho"\n\n*Cringiest pickup line ever*\n\nBollywood romance in 2024: 🤡',
        type: 'text',
        tags: ['tumb pasand ho', 'cringe', 'pickup line']
      },
      { 
        id: 40, 
        title: 'Item Number Energy', 
        content: 'POV: Item number starts playing\n\nEveryone: *Starts dancing inappropriately*\n\n🕺💃🕺💃',
        type: 'text',
        tags: ['item number', 'dancing', 'bollywood']
      }
    ]
  },
  'viral-trending': {
    keywords: ['viral', 'trending', 'famous', 'popular', 'hit', 'buzz', 'talk', 'everywhere', 'social media', 'instagram', 'youtube', 'tiktok', 'reels'],
    memes: [
      { 
        id: 41, 
        title: 'Viral Sensation', 
        content: '📈 VIRAL ALERT 📈\n\n*Something random becomes a meme*\n\nInternet: "This is peak comedy"\n\n🤡🌍🤡',
        type: 'text',
        tags: ['viral', 'alert', 'internet']
      },
      { 
        id: 42, 
        title: 'Instagram Reel Trend', 
        content: 'New trending audio drops:\n\nEveryone: *Makes the same video*\n\nFYP: 🔄♾️🔄\n\n*Groundhog Day vibes*',
        type: 'text',
        tags: ['instagram', 'reel', 'trend']
      },
      { 
        id: 43, 
        title: 'Kacha Badam Madness', 
        content: '🥜 KACHA BADAM 🥜\n\n*Bhuban singing intensifies*\n\nWhole world: *Starts dancing*\n\nPure chaos energy',
        type: 'text',
        tags: ['kacha badam', 'bhuban', 'viral']
      },
      { 
        id: 44, 
        title: 'Pawri Ho Rahi Hai', 
        content: '"Ye humari car hai, ye hum hain, aur ye humari pawri ho rahi hai"\n\n*Pakistani girl becomes global sensation*\n\n🎉🚗🎉',
        type: 'text',
        tags: ['pawri', 'pakistani', 'global']
      }
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

    // Enhanced scoring system for better context understanding
    Object.entries(VIBE_CATEGORIES).forEach(([vibe, data]) => {
      let score = 0;
      
      data.keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
          // Weight longer, more specific keywords higher
          if (keyword.length > 5) {
            score += 4;
          } else if (keyword.length > 3) {
            score += 2;
          } else {
            score += 1;
          }
        }
      });
      
      // Context-specific boosting
      if (vibe === 'ghosting-vibes' && (text.includes('reply') || text.includes('message') || text.includes('text'))) {
        score += 5;
      }
      
      if (vibe === 'getting-roasted' && (text.includes('said') || text.includes('told') || text.includes('called'))) {
        score += 4;
      }
      
      if (vibe === 'flirt-confusion' && (text.includes('like') || text.includes('love') || text.includes('crush'))) {
        score += 4;
      }
      
      // Add slight randomness for variety
      score += Math.random() * 1.5;
      
      if (score > maxScore) {
        maxScore = score;
        detectedVibe = vibe;
      }
    });

    // Better fallback logic
    if (maxScore < 2) {
      const commonVibes = ['relatable-pain', 'sus-moments', 'awkward-silence', 'viral-trending'];
      detectedVibe = commonVibes[Math.floor(Math.random() * commonVibes.length)];
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
