import React from 'react';
import { Smartphone } from 'lucide-react';

export const StartScreen = () => {
  return (
    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-30">
      <Smartphone className="w-10 h-10 text-foreground mb-4 opacity-50" strokeWidth={1} />
      <p className="text-foreground text-sm tracking-widest uppercase font-medium mb-6">Tap to start</p>
    </div>
  );
};
