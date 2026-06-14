import React, { useState, useEffect, useRef } from 'react';
import { Smartphone } from 'lucide-react';
import { GameOverScreen } from './GameOverScreen';
import { StartScreen } from './StartScreen';

// Game Constants
const GAME_HEIGHT = 500;
const BIRD_SIZE = 34; // Size of the phone icon
const BIRD_X = 60; // Fixed horizontal position of the bird
const PIPE_WIDTH = 50;
const PIPE_GAP = 160; 
const GRAVITY = 0.35;  
const JUMP = -6.5;     
const SPEED = 1.8;     
const PIPE_SPAWN_X = 400; 

const FlappyPhoneGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Render State
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState([]);

  // Physics Engine State
  const requestRef = useRef();
  const stateRef = useRef({
    birdY: GAME_HEIGHT / 2,
    velocity: 0,
    pipes: [],
    score: 0
  });

  const generatePipe = (xPos) => {
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

  useEffect(() => {
    if (isPlaying && !gameOver) {
      const update = () => {
        const state = stateRef.current;
        state.velocity += GRAVITY;
        state.birdY += state.velocity;
        state.pipes.forEach(pipe => pipe.x -= SPEED);

        const lastPipe = state.pipes[state.pipes.length - 1];
        if (lastPipe && lastPipe.x < PIPE_SPAWN_X - 200) {
          state.pipes.push(generatePipe(PIPE_SPAWN_X));
        }
        if (state.pipes.length > 0 && state.pipes[0].x < -PIPE_WIDTH) {
          state.pipes.shift();
        }

        const birdHitbox = {
          top: state.birdY + 4,
          bottom: state.birdY + BIRD_SIZE - 4,
          left: BIRD_X + 4,
          right: BIRD_X + BIRD_SIZE - 4
        };

        if (birdHitbox.bottom >= GAME_HEIGHT || birdHitbox.top <= 0) {
          handleGameOver(state.score);
          return;
        }

        for (let i = 0; i < state.pipes.length; i++) {
          const pipe = state.pipes[i];
          const pipeHitbox = {
            left: pipe.x, right: pipe.x + PIPE_WIDTH,
            topPipeBottom: pipe.gapTop, bottomPipeTop: pipe.gapTop + PIPE_GAP
          };

          if (birdHitbox.right > pipeHitbox.left && birdHitbox.left < pipeHitbox.right) {
            if (birdHitbox.top < pipeHitbox.topPipeBottom || birdHitbox.bottom > pipeHitbox.bottomPipeTop) {
              handleGameOver(state.score);
              return;
            }
          }

          if (!pipe.passed && birdHitbox.left > pipeHitbox.right) {
            pipe.passed = true;
            state.score += 1;
            setScore(state.score);
          }
        }

        setBirdY(state.birdY);
        setBirdRotation(Math.min(Math.max(state.velocity * 4, -25), 90));
        setPipes([...state.pipes]);
        requestRef.current = requestAnimationFrame(update);
      };
      
      if (stateRef.current.pipes.length === 0) stateRef.current.pipes.push(generatePipe(PIPE_SPAWN_X));
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
    if (!isPlaying && !gameOver) setIsPlaying(true);
    if (gameOver) return; 
    stateRef.current.velocity = JUMP;
  };

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

  useEffect(() => { resetGame(); }, []);

  return (
    <div 
      className="relative w-full max-w-[400px] bg-background border border-border rounded-lg overflow-hidden cursor-pointer"
      style={{ height: GAME_HEIGHT }}
      onPointerDown={(e) => { e.preventDefault(); jump(); }}
    >
      {pipes.map((pipe, i) => (
        <React.Fragment key={i}>
          <div className="absolute bg-foreground/10" style={{ left: pipe.x, top: 0, width: PIPE_WIDTH, height: pipe.gapTop }} />
          <div className="absolute bg-foreground/10" style={{ left: pipe.x, top: pipe.gapTop + PIPE_GAP, width: PIPE_WIDTH, bottom: 0 }} />
        </React.Fragment>
      ))}

      <div 
        className="absolute z-10 transition-transform duration-75 flex items-center justify-center"
        style={{ left: BIRD_X, top: birdY, width: BIRD_SIZE, height: BIRD_SIZE, transform: `rotate(${birdRotation}deg)` }}
      >
        <Smartphone className="w-8 h-8 text-foreground" strokeWidth={1.5} />
      </div>

      <div className="absolute top-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <span className="text-4xl font-light text-foreground/40">{score}</span>
      </div>

      {!isPlaying && !gameOver && <StartScreen />}
      {gameOver && <GameOverScreen score={score} highScore={highScore} onRestart={resetGame} />}
    </div>
  );
};

export default FlappyPhoneGame;
