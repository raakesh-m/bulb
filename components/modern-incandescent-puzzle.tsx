"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernLightBulb } from "./modern-light-bulb";
import { ModernSwitch } from "./modern-switch";
import { ModernCover } from "./modern-cover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  RotateCcw,
  Lightbulb,
  Trophy,
  Timer,
  Target,
  Zap,
  Star,
  BookOpen,
  Settings,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Particle interface for consistent rendering
interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

type Difficulty = "easy" | "medium" | "hard" | "expert";
type GamePhase = "intro" | "playing" | "revealed" | "completed";
type BulbState = "off" | "on" | "warm";

interface GameStats {
  totalAttempts: number;
  correctGuesses: number;
  averageTime: number;
  highScore: number;
  streakCount: number;
}

export function ModernIncandescentPuzzle() {
  // Game state
  const [correctSwitch, setCorrectSwitch] = useState<number | null>(null);
  const [switchStates, setSwitchStates] = useState([false, false, false]);
  const [bulbState, setBulbState] = useState<BulbState>("off");
  const [isCovered, setIsCovered] = useState(true);
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [selectedSwitch, setSelectedSwitch] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [warmTimeRemaining, setWarmTimeRemaining] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showAnswerSelection, setShowAnswerSelection] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Game stats
  const [gameStats, setGameStats] = useState<GameStats>({
    totalAttempts: 0,
    correctGuesses: 0,
    averageTime: 0,
    highScore: 0,
    streakCount: 0,
  });

  // Refs
  const switchOnTimeRef = useRef<number | null>(null);
  const warmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Difficulty settings
  const difficultySettings = {
    easy: {
      warmTime: 15,
      minOnTime: 1000,
      name: "Novice",
      color: "bg-green-500",
      multiplier: 1,
    },
    medium: {
      warmTime: 10,
      minOnTime: 2000,
      name: "Detective",
      color: "bg-yellow-500",
      multiplier: 1.5,
    },
    hard: {
      warmTime: 6,
      minOnTime: 3000,
      name: "Expert",
      color: "bg-orange-500",
      multiplier: 2,
    },
    expert: {
      warmTime: 4,
      minOnTime: 4000,
      name: "Master",
      color: "bg-red-500",
      multiplier: 3,
    },
  };

  // Initialize client-side particles to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    const randomSwitch = Math.floor(Math.random() * 3);
    setCorrectSwitch(randomSwitch);
    setSwitchStates([false, false, false]);
    setBulbState("off");
    setIsCovered(true);
    setGamePhase("playing");
    setSelectedSwitch(null);
    setIsCorrect(null);
    setWarmTimeRemaining(0);
    setShowAnswerSelection(false);
    setTimeElapsed(0);
    switchOnTimeRef.current = null;
    startTimeRef.current = Date.now();

    // Clear timers
    if (warmTimerRef.current) {
      clearInterval(warmTimerRef.current);
      warmTimerRef.current = null;
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }

    // Start game timer
    gameTimerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
  }, []);

  // Handle warm glow countdown
  useEffect(() => {
    if (bulbState === "warm" && warmTimeRemaining > 0) {
      warmTimerRef.current = setInterval(() => {
        setWarmTimeRemaining((prev) => {
          const newTime = Math.max(0, prev - 0.1);
          if (newTime <= 0) {
            setBulbState("off");
            return 0;
          }
          return newTime;
        });
      }, 100);
    } else if (warmTimerRef.current) {
      clearInterval(warmTimerRef.current);
      warmTimerRef.current = null;
    }

    return () => {
      if (warmTimerRef.current) {
        clearInterval(warmTimerRef.current);
        warmTimerRef.current = null;
      }
    };
  }, [bulbState, warmTimeRemaining]);

  // Handle bulb state changes
  useEffect(() => {
    if (gamePhase !== "playing" || correctSwitch === null) return;

    const isCorrectSwitchOn = switchStates[correctSwitch];
    const settings = difficultySettings[difficulty];

    if (isCorrectSwitchOn) {
      if (bulbState !== "on") {
        setBulbState("on");
        switchOnTimeRef.current = Date.now();
      }
    } else {
      if (bulbState === "on" && switchOnTimeRef.current) {
        const timeElapsed = Date.now() - switchOnTimeRef.current;

        if (timeElapsed >= settings.minOnTime) {
          const warmTime = Math.min(timeElapsed / 1000, settings.warmTime);
          setBulbState("warm");
          setWarmTimeRemaining(warmTime);
        } else {
          setBulbState("off");
        }
        switchOnTimeRef.current = null;
      } else if (bulbState === "on") {
        setBulbState("off");
        switchOnTimeRef.current = null;
      }
    }
  }, [switchStates, correctSwitch, gamePhase, difficulty]);

  const toggleSwitch = useCallback(
    (index: number) => {
      if (gamePhase !== "playing") return;

      setSwitchStates((prev) => {
        const newStates = [...prev];
        newStates[index] = !newStates[index];
        return newStates;
      });
    },
    [gamePhase]
  );

  const liftCover = useCallback(() => {
    if (gamePhase !== "playing") return;

    setIsCovered(false);
    setGamePhase("revealed");
    setShowAnswerSelection(true);

    // Stop game timer
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
  }, [gamePhase]);

  const makeGuess = useCallback(
    (index: number) => {
      if (gamePhase !== "revealed" || selectedSwitch !== null) return;

      setSelectedSwitch(index);
      const correct = index === correctSwitch;
      setIsCorrect(correct);
      setShowAnswerSelection(false);
      setGamePhase("completed");

      // Calculate score
      const baseScore = 100;
      const timeBonus = Math.max(0, 60 - timeElapsed) * 2;
      const difficultyBonus =
        baseScore * (difficultySettings[difficulty].multiplier - 1);
      const finalScore = correct
        ? Math.round(baseScore + timeBonus + difficultyBonus)
        : 0;

      setScore(finalScore);

      // Update stats
      setGameStats((prev) => {
        const newStats = {
          totalAttempts: prev.totalAttempts + 1,
          correctGuesses: prev.correctGuesses + (correct ? 1 : 0),
          averageTime:
            (prev.averageTime * prev.totalAttempts + timeElapsed) /
            (prev.totalAttempts + 1),
          highScore: Math.max(prev.highScore, finalScore),
          streakCount: correct ? prev.streakCount + 1 : 0,
        };
        return newStats;
      });

      if (correct) {
        setCurrentStreak((prev) => prev + 1);
      } else {
        setCurrentStreak(0);
      }
    },
    [gamePhase, selectedSwitch, correctSwitch, timeElapsed, difficulty]
  );

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (warmTimerRef.current) clearInterval(warmTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Animated background particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl p-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Neural Illumination Challenge
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            Decode the mystery of the quantum light bulb using advanced
            deduction techniques
          </p>

          {/* Stats Dashboard */}
          <div className="flex justify-center gap-6 mb-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">
                      {gameStats.highScore}
                    </div>
                    <div className="text-xs text-slate-400">High Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">
                      {gameStats.totalAttempts > 0
                        ? Math.round(
                            (gameStats.correctGuesses /
                              gameStats.totalAttempts) *
                              100
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-xs text-slate-400">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">
                      {currentStreak}
                    </div>
                    <div className="text-xs text-slate-400">Current Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Difficulty Selector */}
          <div className="flex justify-center gap-2 mb-6">
            {(Object.keys(difficultySettings) as Difficulty[]).map((diff) => (
              <Button
                key={diff}
                variant={difficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setDifficulty(diff)}
                className={cn(
                  "transition-all duration-300",
                  difficulty === diff && difficultySettings[diff].color
                )}
                disabled={gamePhase === "playing" || gamePhase === "revealed"}
              >
                {difficultySettings[diff].name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Instructions Modal */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="m-4 max-w-4xl rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg p-8 shadow-2xl ring-1 ring-white/10"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      Neural Challenge Protocol
                    </h2>
                    <p className="text-slate-300">
                      Master the art of quantum deduction
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-slate-700/50 p-4">
                      <h3 className="mb-3 font-semibold text-blue-400 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Mission Objective
                      </h3>
                      <p className="text-sm leading-relaxed">
                        One of three quantum switches controls a hidden photon
                        emitter. Use advanced thermal analysis to identify the
                        correct control mechanism through strategic
                        manipulation.
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-700/50 p-4">
                      <h3 className="mb-3 font-semibold text-purple-400 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Operational Phases
                      </h3>
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs">
                            1
                          </Badge>
                          <span>
                            Experiment with quantum switches to gather thermal
                            data
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs">
                            2
                          </Badge>
                          <span>
                            Deploy the revelation protocol to expose the photon
                            state
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs">
                            3
                          </Badge>
                          <span>
                            Execute final analysis and submit your hypothesis
                          </span>
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-slate-700/50 p-4">
                      <h3 className="mb-3 font-semibold text-yellow-400 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Photon States Analysis
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
                          <span>
                            <strong>Full Emission:</strong> Target switch is
                            actively engaged
                          </span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></div>
                          <span>
                            <strong>Thermal Residue:</strong> Switch was engaged
                            but now disengaged
                          </span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-slate-500"></div>
                          <span>
                            <strong>Dormant State:</strong> Switch inactive or
                            insufficient engagement time
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-slate-700/50 p-4">
                      <h3 className="mb-3 font-semibold text-green-400 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Difficulty Protocols
                      </h3>
                      <div className="space-y-2 text-sm">
                        {(Object.keys(difficultySettings) as Difficulty[]).map(
                          (diff) => (
                            <div
                              key={diff}
                              className="flex items-center justify-between"
                            >
                              <span className="font-medium">
                                {difficultySettings[diff].name}:
                              </span>
                              <div className="flex items-center gap-2">
                                <span>
                                  {difficultySettings[diff].warmTime}s thermal
                                  retention
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {difficultySettings[diff].multiplier}x
                                  multiplier
                                </Badge>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-semibold px-8"
                    onClick={() => setShowInstructions(false)}
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Initialize Neural Interface
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Game Area */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Panel - Analysis Chamber */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Quantum Analysis Chamber
                    </h2>
                    <div className="flex items-center gap-4">
                      {gamePhase === "playing" && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Timer className="w-4 h-4" />
                          <span className="font-mono">
                            {Math.floor(timeElapsed / 60)}:
                            {(timeElapsed % 60).toString().padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          difficultySettings[difficulty].color
                        )}
                      >
                        {difficultySettings[difficulty].name}
                      </Badge>
                    </div>
                  </div>

                  {/* Photon Emitter Container */}
                  <div className="relative mb-8 flex h-96 w-96 items-center justify-center">
                    {/* Photon Emitter */}
                    <div className="absolute z-10">
                      <ModernLightBulb
                        state={isCovered ? "off" : bulbState}
                        warmPercentage={
                          warmTimeRemaining /
                          difficultySettings[difficulty].warmTime
                        }
                      />
                    </div>

                    {/* Quantum Cover */}
                    <AnimatePresence>
                      {isCovered && (
                        <motion.div
                          className="absolute z-20"
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -100, opacity: 0, rotateX: -10 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                        >
                          <ModernCover />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Thermal Analysis Display */}
                  {!isCovered && bulbState === "warm" && (
                    <motion.div
                      className="mb-6 w-full max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-orange-300 font-medium">
                              Thermal Decay Analysis
                            </span>
                            <span className="text-orange-200 font-mono">
                              {warmTimeRemaining.toFixed(1)}s
                            </span>
                          </div>
                          <Progress
                            value={
                              (warmTimeRemaining /
                                difficultySettings[difficulty].warmTime) *
                              100
                            }
                            className="h-3"
                          />
                          <div className="mt-2 text-xs text-orange-400/80">
                            Residual photon energy detected • Quantum signature
                            degrading
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Game Status Display */}
                  <div className="text-center w-full">
                    {gamePhase === "playing" && (
                      <div className="space-y-4">
                        <p className="text-slate-300 text-lg">
                          Manipulate quantum switches to gather thermal data
                        </p>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/20"
                          onClick={liftCover}
                        >
                          <Zap className="mr-2 h-5 w-5" />
                          Deploy Revelation Protocol
                        </Button>
                      </div>
                    )}

                    {gamePhase === "completed" && selectedSwitch !== null && (
                      <motion.div
                        className={cn(
                          "rounded-2xl p-6 text-center",
                          isCorrect
                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 ring-1 ring-green-500/30"
                            : "bg-gradient-to-r from-red-500/20 to-rose-500/20 ring-1 ring-red-500/30"
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="mb-4 text-6xl">
                          {isCorrect ? "🧠" : "⚡"}
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-white">
                          {isCorrect
                            ? "Neural Pattern Recognized!"
                            : "Quantum Interference Detected"}
                        </h3>
                        <p className="mb-4 text-lg text-slate-300">
                          {isCorrect
                            ? `Quantum Switch ${
                                selectedSwitch + 1
                              } confirmed as the primary control matrix!`
                            : `Quantum Switch ${
                                correctSwitch !== null ? correctSwitch + 1 : ""
                              } was the correct control matrix.`}
                        </p>

                        {isCorrect && (
                          <div className="mb-4 space-y-2">
                            <div className="text-3xl font-bold text-yellow-400">
                              +{score} Neural Points
                            </div>
                            <div className="text-sm text-slate-400">
                              Time Bonus: +{Math.max(0, 60 - timeElapsed) * 2} •
                              Difficulty Multiplier:{" "}
                              {difficultySettings[difficulty].multiplier}x
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Initialize New Sequence
                        </Button>
                      </motion.div>
                    )}

                    {showAnswerSelection && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                      >
                        <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm ring-1 ring-cyan-500/20">
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center">
                              Neural Analysis Complete - Submit Hypothesis
                            </h3>
                            <p className="mb-6 text-slate-300 text-center">
                              Based on your quantum observations, which control
                              matrix governs the photon emitter?
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                              {[0, 1, 2].map((index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="lg"
                                  className="h-20 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
                                  onClick={() => makeGuess(index)}
                                >
                                  <div className="text-center">
                                    <div className="text-xl font-bold mb-1">
                                      Matrix {index + 1}
                                    </div>
                                    <div className="text-xs opacity-75">
                                      Submit Analysis
                                    </div>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - Control Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quantum Control Panel */}
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-center">
                  Quantum Control Matrix
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {[0, 1, 2].map((index) => {
                    const colors = ["blue", "green", "purple"];
                    return (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex justify-center">
                              <ModernSwitch
                                isOn={switchStates[index]}
                                disabled={gamePhase !== "playing"}
                                label={`Matrix ${index + 1}`}
                                onClick={() => toggleSwitch(index)}
                                glowColor={colors[index]}
                                size="lg"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {gamePhase !== "playing"
                              ? "Quantum matrices locked during analysis phase"
                              : "Toggle quantum control matrix"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Neural Interface Panel */}
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-bold text-purple-400 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Neural Interface
                </h3>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setShowInstructions(true)}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Operational Manual
                  </Button>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">Total Sessions</div>
                      <div className="text-xl font-bold text-white">
                        {gameStats.totalAttempts}
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-slate-400 mb-1">
                        Avg. Analysis Time
                      </div>
                      <div className="text-xl font-bold text-white">
                        {gameStats.averageTime > 0
                          ? `${Math.round(gameStats.averageTime)}s`
                          : "--"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
