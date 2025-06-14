
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Meme {
  id: number;
  title: string;
  url: string;
  tags: string[];
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
          title: `Perfect meme for ${vibe}`,
          text: `Check out this meme: ${meme.title}`,
          url: meme.url
        });
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(meme.url);
        toast({
          title: "Meme URL copied! 📋",
          description: "Paste it in your chat app"
        });
      }
    } catch (error) {
      console.error('Error sharing meme:', error);
      toast({
        title: "Share failed",
        description: "Try copying the image directly",
        variant: "destructive"
      });
    }
  };

  const handleCopyMeme = async (meme: Meme) => {
    try {
      // Try to copy the image as blob
      const response = await fetch(meme.url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      toast({
        title: "Meme copied! 🎯",
        description: "Paste it directly in your chat"
      });
    } catch (error) {
      // Fallback to URL copy
      try {
        await navigator.clipboard.writeText(meme.url);
        toast({
          title: "Meme URL copied! 📋",
          description: "Paste the link in your chat"
        });
      } catch (urlError) {
        toast({
          title: "Copy failed",
          description: "Try right-clicking to save the image",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Perfect Memes for "{vibe}" Energy 🎯
        </h2>
        <p className="text-gray-400">
          Tap any meme to copy and paste instantly
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme, index) => (
          <Card key={meme.id} className="bg-black/20 border-purple-500/30 backdrop-blur-sm overflow-hidden hover:border-purple-400/50 transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative group">
                <img 
                  src={meme.url} 
                  alt={meme.title}
                  className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => handleCopyMeme(meme)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyMeme(meme);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      📋 Copy Meme
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
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">{meme.title}</h3>
                <div className="flex flex-wrap gap-1">
                  {meme.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          💡 Pro tip: These memes are perfect for your current vibe. More categories coming soon!
        </p>
      </div>
    </div>
  );
};

export default MemeDisplay;
