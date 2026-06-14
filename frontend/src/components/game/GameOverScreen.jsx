import React from 'react';
import { Button } from '@/components/ui/button';

export const GameOverScreen = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center z-30">
      <p className="text-foreground text-lg tracking-widest uppercase font-bold mb-8">Game Over</p>
      
      <div className="flex gap-12 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Score</span>
          <span className="text-3xl font-light text-foreground">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Best</span>
          <span className="text-3xl font-light text-foreground">{highScore}</span>
        </div>
      </div>

      <Button onClick={(e) => { e.stopPropagation(); onRestart(); }} variant="outline" className="rounded-full px-8">
        Try Again
      </Button>
    </div>
  );
};
