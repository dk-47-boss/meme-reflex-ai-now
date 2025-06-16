
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Meme {
  id: number;
  title: string;
  url: string;
  tags: string[];
  type?: 'image' | 'video';
}

interface MemeDisplayProps {
  memes: Meme[];
  vibe: string;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ memes, vibe }) => {
  
  const handleShareMeme = async (meme: Meme) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `this meme hits different for ${vibe.toLowerCase()} energy`,
          text: `sending you this fire meme: ${meme.title} 🔥`,
          url: meme.url
        });
        toast({
          title: "shared the vibe! 📤",
          description: "meme sent to the group chat fr"
        });
      } else {
        await navigator.clipboard.writeText(meme.url);
        toast({
          title: "link copied buddy! 📋",
          description: "paste that fire content anywhere"
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast({
        title: "sharing failed rip 💀",
        description: "try the copy button instead",
        variant: "destructive"
      });
    }
  };

  const handleCopyMeme = async (meme: Meme) => {
    try {
      await navigator.clipboard.writeText(meme.url);
      toast({
        title: "YouTube link copied! 🎯",
        description: "ready to share that fire content"
      });
    } catch (error) {
      toast({
        title: "copy failed buddy 😭",
        description: "try selecting the URL manually",
        variant: "destructive"
      });
    }
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    // Convert other YouTube URLs to embed format if needed
    return url;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          perfect memes for that "{vibe.toLowerCase()}" energy 🎯
        </h2>
        <p className="text-gray-300 text-lg">
          tap any video to watch + copy link instantly (no cap)
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-2xl">💯</span>
          <span className="text-sm text-gray-400">these hit different fr</span>
          <span className="text-2xl">🔥</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme, index) => (
          <Card 
            key={meme.id} 
            className="bg-black/40 border-purple-500/30 backdrop-blur-lg overflow-hidden hover:border-pink-400/50 transition-all duration-300 hover:scale-105 group shadow-xl"
          >
            <CardContent className="p-0">
              <div className="relative">
                {meme.type === 'video' && meme.url.includes('youtube.com') ? (
                  <div className="relative">
                    <iframe
                      src={getEmbedUrl(meme.url)}
                      title={meme.title}
                      className="w-full h-56"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute top-3 left-3 bg-red-600 rounded px-2 py-1 text-xs text-white font-bold flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      YOUTUBE
                    </div>
                  </div>
                ) : meme.type === 'video' ? (
                  <video
                    src={meme.url}
                    className="w-full h-56 object-cover cursor-pointer"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      video.paused ? video.play() : video.pause();
                    }}
                    onMouseOver={e => e.currentTarget.play()}
                    onMouseOut={e => e.currentTarget.pause()}
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img 
                    src={meme.url} 
                    alt={meme.title}
                    className="w-full h-56 object-cover cursor-pointer transition-all duration-300 group-hover:brightness-110"
                    onClick={() => handleCopyMeme(meme)}
                    loading="lazy"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyMeme(meme);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      copy link
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareMeme(meme);
                      }}
                      className="border-white/50 text-white hover:bg-white/10 shadow-lg"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      share
                    </Button>
                  </div>
                </div>
                
                <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1 text-xs text-white font-medium flex items-center gap-1">
                  #{index + 1} fire 🔥
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-white mb-2 text-lg">{meme.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {meme.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10 space-y-4">
        <div className="flex justify-center items-center gap-4 text-3xl">
          <span>💀</span>
          <span>🤌</span>
          <span>✨</span>
          <span>👑</span>
        </div>
        <p className="text-gray-300 font-medium">
          💡 these YouTube videos are perfectly curated for your current vibe check
        </p>
        <p className="text-gray-500 text-sm">
          mobile app dropping soon with even more fire features 🚀
        </p>
      </div>
    </div>
  );
};

export default MemeDisplay;
