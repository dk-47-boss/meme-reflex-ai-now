
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Meme {
  id: number;
  title: string;
  content: string;
  tags: string[];
  type: 'text' | 'image';
}

interface MemeDisplayProps {
  memes: Meme[];
  vibe: string;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ memes, vibe }) => {
  
  const handleCopyMeme = async (meme: Meme) => {
    try {
      await navigator.clipboard.writeText(meme.content);
      toast({
        title: "Meme copied! 📋",
        description: "Ready to paste that fire content anywhere"
      });
    } catch (error) {
      toast({
        title: "Copy failed 😭",
        description: "Try selecting the text manually",
        variant: "destructive"
      });
    }
  };

  const handleShareMeme = async (meme: Meme) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Perfect meme for ${vibe.toLowerCase()} vibes`,
          text: meme.content
        });
        toast({
          title: "Meme shared! 📤",
          description: "Spreading the chaos successfully"
        });
      } else {
        await navigator.clipboard.writeText(meme.content);
        toast({
          title: "Meme copied for sharing! 📋",
          description: "Paste it wherever you want to spread the vibes"
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast({
        title: "Sharing failed 💀",
        description: "But the meme is still fire, copy it manually",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          perfect memes for that "{vibe.toLowerCase()}" energy 🎯
        </h2>
        <p className="text-gray-300 text-lg">
          tap to copy any meme instantly - ready to paste anywhere 📱
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-2xl">📋</span>
          <span className="text-sm text-gray-400">copy-paste ready memes</span>
          <span className="text-2xl">🔥</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme, index) => (
          <Card 
            key={meme.id} 
            className="bg-black/40 border-purple-500/30 backdrop-blur-lg overflow-hidden hover:border-pink-400/50 transition-all duration-300 hover:scale-105 group shadow-xl cursor-pointer"
            onClick={() => handleCopyMeme(meme)}
          >
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-white text-lg">{meme.title}</h3>
                  <div className="bg-black/60 rounded-full px-2 py-1 text-xs text-white font-medium">
                    #{index + 1}
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 mb-4 min-h-[120px] relative group-hover:border-purple-400/50 transition-colors">
                  <pre className="text-white text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {meme.content}
                  </pre>
                  
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-purple-600 rounded px-2 py-1 text-xs text-white font-medium">
                      Click to copy!
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {meme.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyMeme(meme);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareMeme(meme);
                    }}
                    className="border-white/50 text-white hover:bg-white/10"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10 space-y-4">
        <div className="flex justify-center items-center gap-4 text-3xl">
          <span>📱</span>
          <span>📋</span>
          <span>🔥</span>
          <span>💯</span>
        </div>
        <p className="text-gray-300 font-medium">
          💡 All memes are copy-paste ready - perfect for texting, social media, and group chats
        </p>
        <p className="text-gray-500 text-sm">
          Mobile app dropping soon with even more features 🚀
        </p>
      </div>
    </div>
  );
};

export default MemeDisplay;
