"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  RotateCcw,
  Timer,
  Trophy,
  Star,
  Zap,
  Eye,
  Award,
  TrendingUp,
  Play,
  HelpCircle,
  Volume2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

// Sound effects helper
const playClickSound = () => {
  try {
    // Create a simple click sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      audioContext.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    // Fallback - no sound if audio context fails
    console.log("Audio not available");
  }
};

const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Success melody
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log("Audio not available");
  }
};

const playErrorSound = () => {
  try {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Error sound
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.log("Audio not available");
  }
};

// Modern Light Bulb Component
function ModernLightBulb({
  state,
  warmPercentage = 0,
}: {
  state: BulbState;
  warmPercentage?: number;
}) {
  return (
    <div className="relative">
      <motion.div
        className={cn(
          "relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full transition-all duration-500",
          state === "on" && "shadow-2xl shadow-yellow-400/50",
          state === "warm" && "shadow-lg shadow-orange-400/30"
        )}
        animate={{
          scale: state === "on" ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: state === "on" ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Bulb Body */}
        <div
          className={cn(
            "h-full w-full rounded-full border-2 sm:border-3 lg:border-4 transition-all duration-500",
            state === "off" && "bg-gray-700 border-gray-600",
            state === "on" &&
              "bg-gradient-to-br from-yellow-200 to-yellow-400 border-yellow-300",
            state === "warm" &&
              "bg-gradient-to-br from-orange-200 to-orange-400 border-orange-300"
          )}
        >
          {/* Inner Glow */}
          {state === "on" && (
            <motion.div
              className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Warm Indicator */}
          {state === "warm" && (
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 opacity-60" />
          )}

          {/* Filament */}
          <div className="absolute left-1/2 top-1/2 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 -translate-x-1/2 -translate-y-1/2">
            <div
              className={cn(
                "h-full w-full rounded-full border-2 border-dashed transition-all duration-500",
                state === "off" && "border-gray-500",
                state === "on" && "border-yellow-600",
                state === "warm" && "border-orange-600"
              )}
            />
          </div>
        </div>

        {/* Base */}
        <div className="absolute -bottom-1 left-1/2 h-2 w-4 sm:h-2.5 sm:w-5 lg:h-3 lg:w-6 -translate-x-1/2 rounded-b-lg bg-gray-600 border-2 border-gray-700" />
      </motion.div>

      {/* Warm Progress Ring */}
      {state === "warm" && warmPercentage > 0 && (
        <div className="absolute -inset-4">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray={`${warmPercentage}, 100`}
              className="transition-all duration-300"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// Custom Dark Switch Component
function CustomSwitch({
  isOn,
  onToggle,
  label,
  disabled = false,
}: {
  isOn: boolean;
  onToggle: () => void;
  label: string;
  disabled?: boolean;
}) {
  const handleToggle = () => {
    if (!disabled) {
      playClickSound();
      onToggle();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 sm:space-y-3">
      <motion.label
        className="relative cursor-pointer"
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <input
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            "relative w-20 h-9 sm:w-22 sm:h-10 lg:w-24 lg:h-11 rounded-md border-2 border-black transition-all duration-400",
            "bg-black",
            isOn
              ? "shadow-[inset_0px_0px_1px_0px_rgba(0,0,0,1),inset_-85px_0px_50px_-50px_rgba(1,78,4,0.6)]"
              : "shadow-[inset_0px_0px_1px_0px_rgba(0,0,0,1),inset_90px_0px_50px_-50px_rgba(126,4,4,0.56)]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{
            boxShadow: isOn
              ? "inset 0px 0px 1px 0px rgba(0, 0, 0, 1), inset -85px 0px 50px -50px rgba(1, 78, 4, 0.6)"
              : "inset 0px 0px 1px 0px rgba(0, 0, 0, 1), inset 90px 0px 50px -50px rgba(126, 4, 4, 0.56)",
          }}
        >
          <motion.div
            className={cn(
              "absolute top-0.5 bottom-0.5 left-0.5 w-6 sm:w-7 lg:w-8 rounded-sm border border-gray-600",
              "bg-gradient-to-b from-gray-800 to-gray-900",
              "flex items-center justify-around",
              "shadow-[0px_10px_5px_1px_rgba(0,0,0,0.15)]"
            )}
            animate={{
              x: isOn ? "50px" : "0px",
              boxShadow: isOn
                ? "0px 10px 5px 1px rgba(0, 0, 0, 0.15), inset -10px 0px 10px -5px rgba(1, 112, 4, 0.1)"
                : "0px 10px 5px 1px rgba(0, 0, 0, 0.15), inset 10px 0px 10px -5px rgba(126, 4, 4, 0.1)",
            }}
            transition={{ duration: 0.4, ease: [0.99, 0.1, 0.1, 0.99] }}
          >
            {/* Light indicator */}
            <div
              className={cn(
                "w-1 h-1 rounded-full border border-gray-800 transition-all duration-400",
                isOn
                  ? "bg-green-500 shadow-[0px_0px_10px_0px_rgb(57,230,14)]"
                  : "bg-red-500 shadow-[0px_0px_10px_1px_rgb(241,28,28)]"
              )}
            />

            {/* Texture lines */}
            <div className="w-0.5 h-5 bg-gray-900 shadow-[-0.7px_-1.5px_1px_0px_rgba(192,192,192,0.3),0px_2px_3px_rgba(0,0,0,0.3)]" />
            <div className="w-0.5 h-5 bg-gray-900 shadow-[-0.7px_-1.5px_1px_0px_rgba(192,192,192,0.3),0px_2px_3px_rgba(0,0,0,0.3)]" />
            <div className="w-0.5 h-5 bg-gray-900 shadow-[-0.7px_-1.5px_1px_0px_rgba(192,192,192,0.3),0px_2px_3px_rgba(0,0,0,0.3)]" />

            {/* Light indicator */}
            <div
              className={cn(
                "w-1 h-1 rounded-full border border-gray-800 transition-all duration-400",
                isOn
                  ? "bg-green-500 shadow-[0px_0px_10px_0px_rgb(57,230,14)]"
                  : "bg-red-500 shadow-[0px_0px_10px_1px_rgb(241,28,28)]"
              )}
            />
          </motion.div>
        </div>
      </motion.label>

      <Badge
        variant={isOn ? "default" : "secondary"}
        className="text-xs sm:text-sm bg-gray-800 text-gray-300 border-gray-700"
      >
        {label}
      </Badge>
    </div>
  );
}

// Cover Component
function ModernCover() {
  return (
    <motion.div
      className="relative h-32 w-32 rounded-full"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
    >
      {/* Glass Dome */}
      <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-300/80 to-gray-400/60 backdrop-blur-sm border-2 border-gray-400/50 shadow-xl">
        {/* Reflection */}
        <div className="absolute top-2 left-4 h-6 w-3 rounded-full bg-white/40 blur-sm" />
        <div className="absolute top-6 right-6 h-3 w-2 rounded-full bg-white/30 blur-sm" />
      </div>

      {/* Base */}
      <div className="absolute -bottom-1 left-1/2 h-3 w-16 -translate-x-1/2 rounded-b-lg bg-gradient-to-b from-gray-600 to-gray-700 border-2 border-gray-800" />
    </motion.div>
  );
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
      name: "Beginner",
      color: "bg-green-600",
      multiplier: 1,
    },
    medium: {
      warmTime: 10,
      minOnTime: 2000,
      name: "Intermediate",
      color: "bg-blue-600",
      multiplier: 1.5,
    },
    hard: {
      warmTime: 6,
      minOnTime: 3000,
      name: "Advanced",
      color: "bg-orange-600",
      multiplier: 2,
    },
    expert: {
      warmTime: 4,
      minOnTime: 4000,
      name: "Expert",
      color: "bg-red-600",
      multiplier: 3,
    },
  };

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
    const correctSwitchOnTime = switchOnTimeRef.current;

    if (isCorrectSwitchOn) {
      if (!correctSwitchOnTime) {
        switchOnTimeRef.current = Date.now();
      }
      setBulbState("on");
    } else {
      if (correctSwitchOnTime) {
        const timeOn = Date.now() - correctSwitchOnTime;
        if (timeOn >= difficultySettings[difficulty].minOnTime) {
          setBulbState("warm");
          setWarmTimeRemaining(difficultySettings[difficulty].warmTime);
        } else {
          setBulbState("off");
        }
        switchOnTimeRef.current = null;
      } else {
        setBulbState("off");
      }
    }
  }, [switchStates, correctSwitch, gamePhase, difficulty]);

  // Handle switch toggle
  const handleSwitchToggle = (index: number) => {
    if (gamePhase !== "playing") return;

    setSwitchStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // Lift cover
  const liftCover = () => {
    if (gamePhase !== "playing") return;
    setIsCovered(false);
    setGamePhase("revealed");

    setTimeout(() => {
      setShowAnswerSelection(true);
    }, 1500);
  };

  // Make guess
  const makeGuess = (guessIndex: number) => {
    if (gamePhase !== "revealed" || correctSwitch === null) return;

    setSelectedSwitch(guessIndex);
    const correct = guessIndex === correctSwitch;
    setIsCorrect(correct);
    setGamePhase("completed");
    setShowAnswerSelection(false);

    // Play sound effect
    if (correct) {
      playSuccessSound();
    } else {
      playErrorSound();
    }

    // Clear game timer
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }

    // Calculate score
    if (correct) {
      const timeBonus = Math.max(0, 60 - timeElapsed) * 2;
      const difficultyBonus = difficultySettings[difficulty].multiplier;
      const roundScore = Math.round((100 + timeBonus) * difficultyBonus);
      setScore(roundScore);
      setCurrentStreak((prev) => prev + 1);
    } else {
      setCurrentStreak(0);
    }

    // Update stats
    setGameStats((prev) => ({
      totalAttempts: prev.totalAttempts + 1,
      correctGuesses: prev.correctGuesses + (correct ? 1 : 0),
      averageTime: Math.round(
        (prev.averageTime * prev.totalAttempts + timeElapsed) /
          (prev.totalAttempts + 1)
      ),
      highScore: Math.max(prev.highScore, correct ? score : 0),
      streakCount: Math.max(
        prev.streakCount,
        currentStreak + (correct ? 1 : 0)
      ),
    }));
  };

  // Reset game
  const resetGame = () => {
    initializeGame();
  };

  // Start game
  const startGame = () => {
    setShowInstructions(false);
    initializeGame();
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2">
        <div className="mx-auto max-w-7xl h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Lightbulb className="h-12 w-12 text-yellow-500" />
              Light Switch Puzzle
            </h1>
            <p className="text-2xl text-gray-300">
              A classic logic puzzle with a modern twist
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <Card className="mb-4 bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-white">
                  How to Play
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 sm:mb-3 text-white text-lg sm:text-xl">
                      1. Experiment
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                      Toggle the switches to test which one controls the hidden
                      light bulb
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Eye className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 sm:mb-3 text-white text-lg sm:text-xl">
                      2. Reveal
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                      Lift the cover to see the bulb's state - lit, warm, or
                      cold
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 sm:mb-3 text-white text-lg sm:text-xl">
                      3. Solve
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                      Choose which switch you think controls the bulb
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                  <h4 className="font-semibold text-yellow-400 mb-2 sm:mb-3 text-lg sm:text-xl">
                    💡 Key Insight
                  </h4>
                  <p className="text-yellow-200 text-sm sm:text-base lg:text-lg">
                    Light bulbs stay warm for a short time after being turned
                    off. Use this to deduce which switch controls the bulb even
                    when it's not currently on!
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-6 sm:mb-8">
                    <label className="block text-base sm:text-lg font-medium text-gray-300 mb-3 sm:mb-4">
                      Choose Difficulty
                    </label>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4">
                      {(Object.keys(difficultySettings) as Difficulty[]).map(
                        (level) => (
                          <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={cn(
                              "px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-all",
                              difficulty === level
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            )}
                          >
                            {difficultySettings[level].name}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={startGame}
                    className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl"
                  >
                    <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Start Playing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 sm:p-4 lg:p-6">
        <div className="mx-auto max-w-7xl h-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 text-center"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-2 sm:gap-3">
              <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-yellow-500" />
              Light Switch Puzzle
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-gray-300">
              <div className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                <Timer className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{timeElapsed}s</span>
              </div>
              <Badge
                className={cn(
                  "text-white text-sm sm:text-base lg:text-lg px-2 sm:px-3 lg:px-4 py-1",
                  difficultySettings[difficulty].color
                )}
              >
                {difficultySettings[difficulty].name}
              </Badge>
              {currentStreak > 0 && (
                <div className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <span>Streak: {currentStreak}</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full">
            {/* Game Stats - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 space-y-4 order-3 lg:order-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold mb-4 text-center text-white text-base sm:text-lg">
                      Your Stats
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">
                          Success Rate
                        </span>
                        <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                          {gameStats.totalAttempts > 0
                            ? Math.round(
                                (gameStats.correctGuesses /
                                  gameStats.totalAttempts) *
                                  100
                              )
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">
                          High Score
                        </span>
                        <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                          {gameStats.highScore}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">
                          Best Streak
                        </span>
                        <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                          {gameStats.streakCount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">
                          Avg Time
                        </span>
                        <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                          {gameStats.averageTime}s
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold mb-4 text-center text-white text-base sm:text-lg">
                      Difficulty Info
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">
                          Warm Time
                        </span>
                        <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                          {difficultySettings[difficulty].warmTime}s
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm sm:text-base">
                          Score Multiplier
                        </span>
                        <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                          {difficultySettings[difficulty].multiplier}x
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowInstructions(true)}
                  className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                  size="lg"
                >
                  <HelpCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">How to Play</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={resetGame}
                  className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                  disabled={gamePhase === "intro"}
                  size="lg"
                >
                  <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">New Game</span>
                </Button>
              </div>
            </motion.div>

            {/* Main Game Area - Center Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-6 text-center order-1 lg:order-2"
            >
              <Card className="mb-4 bg-gray-800 border-gray-700 h-full">
                <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center h-full">
                  {/* Light Bulb Container */}
                  <div className="relative mb-6 sm:mb-8 flex h-32 sm:h-40 lg:h-48 w-full items-center justify-center">
                    {/* Light Bulb */}
                    <div className="absolute z-10">
                      <ModernLightBulb
                        state={isCovered ? "off" : bulbState}
                        warmPercentage={
                          (warmTimeRemaining /
                            difficultySettings[difficulty].warmTime) *
                          100
                        }
                      />
                    </div>

                    {/* Cover */}
                    <AnimatePresence>
                      {isCovered && (
                        <motion.div
                          className="absolute z-20"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -40, opacity: 0 }}
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

                  {/* Warm Time Display */}
                  {!isCovered && bulbState === "warm" && (
                    <motion.div
                      className="mb-6 w-full max-w-md mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-gradient-to-r from-orange-900/60 to-red-900/60 border-orange-600">
                        <CardContent className="p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-orange-300 font-semibold text-lg">
                              Bulb is still warm!
                            </span>
                            <span className="text-orange-200 font-mono text-lg">
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
                          <div className="mt-2 text-sm text-orange-400">
                            The bulb was recently turned off
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Game Status */}
                  <div className="text-center w-full">
                    {gamePhase === "playing" && (
                      <div className="space-y-4">
                        <p className="text-gray-300 text-base sm:text-lg lg:text-xl">
                          Test the switches, then reveal the bulb
                        </p>
                        <Button
                          size="lg"
                          onClick={liftCover}
                          className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                        >
                          <Eye className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                          Lift Cover
                        </Button>
                      </div>
                    )}

                    {gamePhase === "completed" && selectedSwitch !== null && (
                      <motion.div
                        className={cn(
                          "rounded-2xl p-6 text-center",
                          isCorrect
                            ? "bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-2 border-green-600"
                            : "bg-gradient-to-r from-red-900/60 to-rose-900/60 border-2 border-red-600"
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="mb-4 text-6xl">
                          {isCorrect ? "🎉" : "😅"}
                        </div>
                        <h3 className="mb-3 text-2xl font-bold text-white">
                          {isCorrect ? "Correct!" : "Try Again!"}
                        </h3>
                        <p className="mb-4 text-gray-300 text-lg">
                          {isCorrect
                            ? `Switch ${
                                selectedSwitch + 1
                              } was indeed the correct answer!`
                            : `Switch ${
                                correctSwitch !== null ? correctSwitch + 1 : ""
                              } was the correct answer.`}
                        </p>

                        {isCorrect && (
                          <div className="mb-4 space-y-2">
                            <div className="text-3xl font-bold text-blue-400">
                              +{score} Points
                            </div>
                            <div className="text-gray-400">
                              Time Bonus: +{Math.max(0, 60 - timeElapsed) * 2} •
                              Difficulty:{" "}
                              {difficultySettings[difficulty].multiplier}x
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 text-lg"
                        >
                          <RotateCcw className="mr-2 h-5 w-5" />
                          Play Again
                        </Button>
                      </motion.div>
                    )}

                    {showAnswerSelection && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl mx-auto"
                      >
                        <Card className="border-yellow-600/30 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm shadow-2xl">
                          <CardContent className="p-6 sm:p-8">
                            <div className="text-center mb-6 sm:mb-8">
                              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500/20 rounded-full mb-4">
                                <Lightbulb className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400" />
                              </div>
                              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                                Which switch controls the bulb?
                              </h3>
                              <p className="text-gray-300 text-sm sm:text-base">
                                Based on your observations, make your choice
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                              {[0, 1, 2].map((index) => (
                                <motion.div
                                  key={index}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full h-24 sm:h-28 border-2 border-gray-600 bg-gradient-to-br from-gray-700/80 to-gray-800/80 text-white hover:border-yellow-500/50 hover:bg-gradient-to-br hover:from-yellow-500/10 hover:to-orange-500/10 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group"
                                    onClick={() => makeGuess(index)}
                                  >
                                    <div className="text-center">
                                      <div className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                                        {index + 1}
                                      </div>
                                      <div className="text-sm sm:text-base font-medium text-gray-300 group-hover:text-yellow-300 transition-colors">
                                        Switch {index + 1}
                                      </div>
                                      <div className="text-xs text-gray-400 group-hover:text-yellow-400 transition-colors mt-1">
                                        Click to choose
                                      </div>
                                    </div>
                                  </Button>
                                </motion.div>
                              ))}
                            </div>

                            <div className="mt-6 sm:mt-8 text-center">
                              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                Think carefully - you only get one guess!
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Control Panel - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 order-2 lg:order-3"
            >
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardContent className="p-4 sm:p-6 flex flex-col justify-center h-full">
                  <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold text-center text-white">
                    Control Switches
                  </h3>

                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8 flex-1 lg:flex lg:flex-col lg:justify-center">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="text-center">
                        <CustomSwitch
                          isOn={switchStates[index]}
                          onToggle={() => handleSwitchToggle(index)}
                          label={`Switch ${index + 1}`}
                          disabled={gamePhase !== "playing"}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
