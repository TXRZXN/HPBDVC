"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 bg-card/50 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary"
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5 text-primary" />
      ) : (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
}
