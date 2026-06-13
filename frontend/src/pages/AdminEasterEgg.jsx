import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Smartphone, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Game Constants
const GAME_HEIGHT = 500;
const BIRD_SIZE = 34; // Size of the phone icon
const BIRD_X = 60; // Fixed horizontal position of the bird
const PIPE_WIDTH = 50;
const PIPE_GAP = 160; // Increased gap to make it more forgiving
const GRAVITY = 0.35;  // Reduced from 0.6 to make it much floatier
const JUMP = -6.5;     // Reduced from -8.5 so it doesn't jump as violently
const SPEED = 1.8;     // Reduced from 2.5 to give more reaction time
const PIPE_SPAWN_X = 400; // Start off-screen to the right

const AdminEasterEgg = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Render State (used only for CSS rendering)
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState([]);

  // Physics Engine State (source of truth to avoid React batching issues in animation frames)
  const requestRef = useRef();
  const stateRef = useRef({
    birdY: GAME_HEIGHT / 2,
    velocity: 0,
    pipes: [],
    score: 0
  });

  const generatePipe = (xPos) => {
    // Random gap top position between 50px and (GAME_HEIGHT - PIPE_GAP - 50px)
    const minGapTop = 50;
    const maxGapTop = GAME_HEIGHT - PIPE_GAP - 50;
    const gapTop = Math.floor(Math.random() * (maxGapTop - minGapTop + 1)) + minGapTop;
    return { x: xPos, gapTop, passed: false };
  };

  const resetGame = () => {
    stateRef.current = {
      birdY: GAME_HEIGHT / 2,
      velocity: 0,
      pipes: [generatePipe(PIPE_SPAWN_X)],
      score: 0
    };
    setGameOver(false);
    setIsPlaying(false);
    setScore(0);
    setBirdY(GAME_HEIGHT / 2);
    setBirdRotation(0);
    setPipes(stateRef.current.pipes);
  };

  // The main Game Loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      const update = () => {
        const state = stateRef.current;
        
        // 1. Apply Gravity
        state.velocity += GRAVITY;
        state.birdY += state.velocity;

        // 2. Move Pipes
        state.pipes.forEach(pipe => {
          pipe.x -= SPEED;
        });

        // 3. Spawn and Remove Pipes
        const lastPipe = state.pipes[state.pipes.length - 1];
        if (lastPipe && lastPipe.x < PIPE_SPAWN_X - 200) {
          state.pipes.push(generatePipe(PIPE_SPAWN_X));
        }
        if (state.pipes.length > 0 && state.pipes[0].x < -PIPE_WIDTH) {
          state.pipes.shift();
        }

        // 4. Collision Detection
        const birdHitbox = {
          top: state.birdY + 4, // slight padding for fair hitbox
          bottom: state.birdY + BIRD_SIZE - 4,
          left: BIRD_X + 4,
          right: BIRD_X + BIRD_SIZE - 4
        };

        // Floor / Ceiling Collision
        if (birdHitbox.bottom >= GAME_HEIGHT || birdHitbox.top <= 0) {
          handleGameOver(state.score);
          return;
        }

        // Pipe Collision
        for (let i = 0; i < state.pipes.length; i++) {
          const pipe = state.pipes[i];
          const pipeHitbox = {
            left: pipe.x,
            right: pipe.x + PIPE_WIDTH,
            topPipeBottom: pipe.gapTop,
            bottomPipeTop: pipe.gapTop + PIPE_GAP
          };

          // Horizontal overlap
          if (birdHitbox.right > pipeHitbox.left && birdHitbox.left < pipeHitbox.right) {
            // Vertical overlap (hit the top pipe OR hit the bottom pipe)
            if (birdHitbox.top < pipeHitbox.topPipeBottom || birdHitbox.bottom > pipeHitbox.bottomPipeTop) {
              handleGameOver(state.score);
              return;
            }
          }

          // Score tracking
          if (!pipe.passed && birdHitbox.left > pipeHitbox.right) {
            pipe.passed = true;
            state.score += 1;
            setScore(state.score);
          }
        }

        // 5. Update Render State
        setBirdY(state.birdY);
        // Calculate rotation based on velocity (downward is positive velocity)
        setBirdRotation(Math.min(Math.max(state.velocity * 4, -25), 90));
        // Clone array to trigger re-render
        setPipes([...state.pipes]);

        requestRef.current = requestAnimationFrame(update);
      };
      
      // Initialize first pipe if empty
      if (stateRef.current.pipes.length === 0) {
        stateRef.current.pipes.push(generatePipe(PIPE_SPAWN_X));
      }

      requestRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, gameOver]);

  const handleGameOver = (finalScore) => {
    setGameOver(true);
    setIsPlaying(false);
    setHighScore(prev => Math.max(prev, finalScore));
  };

  const jump = () => {
    if (!isPlaying && !gameOver) {
      setIsPlaying(true);
    }
    if (gameOver) {
      // Don't auto-reset on tap to prevent accidental resets during game over screen
      return; 
    }
    stateRef.current.velocity = JUMP;
  };

  // Keyboard support (Spacebar)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Initial setup
  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center min-h-[85vh] select-none">
      
      {/* Header */}
      <div className="text-center mb-8 w-full">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Restricted Area</p>
        <p className="text-sm text-muted-foreground/60">Admins only. Play a game instead.</p>
      </div>

      <div className="w-full flex justify-center">
        
        {/* Minimalist Game Container */}
        <div 
          className="relative w-full max-w-[400px] bg-background border border-border rounded-lg overflow-hidden cursor-pointer"
          style={{ height: GAME_HEIGHT }}
          onPointerDown={(e) => {
            e.preventDefault();
            jump();
          }}
        >
          {/* Pipes */}
          {pipes.map((pipe, i) => (
            <React.Fragment key={i}>
              <div 
                className="absolute bg-foreground/10"
                style={{
                  left: pipe.x,
                  top: 0,
                  width: PIPE_WIDTH,
                  height: pipe.gapTop,
                }}
              />
              <div 
                className="absolute bg-foreground/10"
                style={{
                  left: pipe.x,
                  top: pipe.gapTop + PIPE_GAP,
                  width: PIPE_WIDTH,
                  bottom: 0,
                }}
              />
            </React.Fragment>
          ))}

          {/* The Player (Flappy Phone) */}
          <div 
            className="absolute z-10 transition-transform duration-75 flex items-center justify-center"
            style={{
              left: BIRD_X,
              top: birdY,
              width: BIRD_SIZE,
              height: BIRD_SIZE,
              transform: `rotate(${birdRotation}deg)`
            }}
          >
            <Smartphone className="w-8 h-8 text-foreground" strokeWidth={1.5} />
          </div>

          {/* Score HUD */}
          <div className="absolute top-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <span className="text-4xl font-light text-foreground/40">
              {score}
            </span>
          </div>

          {/* Start Screen Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-30">
              <Smartphone className="w-10 h-10 text-foreground mb-4 opacity-50" strokeWidth={1} />
              <p className="text-foreground text-sm tracking-widest uppercase font-medium mb-6">Tap to start</p>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameOver && (
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

              <Button onClick={(e) => { e.stopPropagation(); resetGame(); }} variant="outline" className="rounded-full px-8">
                Try Again
              </Button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminEasterEgg;
