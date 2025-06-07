"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightBulb } from "./light-bulb";
import StyledSwitch from "./styled-switch";
import { Cover } from "./cover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw, Lightbulb, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function IncandescantPuzzle() {
  // Game state
  const [correctSwitch, setCorrectSwitch] = useState<number | null>(null);
  const [switchStates, setSwitchStates] = useState([false, false, false]);
  const [bulbState, setBulbState] = useState("off"); // "off", "on", "warm"
  const [isCovered, setIsCovered] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [warmTimeRemaining, setWarmTimeRemaining] = useState(0);
  const [instructions, setInstructions] = useState(true);
  const [showAnswerSelection, setShowAnswerSelection] = useState(false);

  // Refs to track timing
  const switchOnTimeRef = useRef<number | null>(null);
  const warmTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the game
  const initializeGame = useCallback(() => {
    const randomSwitch = Math.floor(Math.random() * 3);
    setCorrectSwitch(randomSwitch);
    setSwitchStates([false, false, false]);
    setBulbState("off");
    setIsCovered(true);
    setGameStarted(true);
    setGameEnded(false);
    setSelectedSwitch(null);
    setIsCorrect(null);
    setWarmTimeRemaining(0);
    setShowAnswerSelection(false);
    switchOnTimeRef.current = null;

    if (warmTimerRef.current) {
      clearInterval(warmTimerRef.current);
      warmTimerRef.current = null;
    }
  }, []);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

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

  // Handle bulb state changes based on switch states
  useEffect(() => {
    if (!gameStarted || gameEnded || correctSwitch === null) return;

    const isCorrectSwitchOn = switchStates[correctSwitch];

    if (isCorrectSwitchOn) {
      if (bulbState !== "on") {
        setBulbState("on");
        switchOnTimeRef.current = Date.now();
      }
    } else {
      if (bulbState === "on" && switchOnTimeRef.current) {
        const timeElapsed = Date.now() - switchOnTimeRef.current;

        if (timeElapsed >= 2000) {
          const warmTime = Math.min(timeElapsed / 1000, 10);
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
  }, [switchStates, correctSwitch, gameStarted, gameEnded]);

  const toggleSwitch = useCallback(
    (index: number) => {
      if (!gameStarted || gameEnded) return;

      setSwitchStates((prev) => {
        const newStates = [...prev];
        newStates[index] = !newStates[index];
        return newStates;
      });
    },
    [gameStarted, gameEnded]
  );

  const liftCover = useCallback(() => {
    if (!gameStarted || gameEnded) return;

    setIsCovered(false);
    setGameEnded(true);
    setShowAnswerSelection(true);
  }, [gameStarted, gameEnded]);

  const makeGuess = useCallback(
    (index: number) => {
      if (!gameStarted || !gameEnded || selectedSwitch !== null) return;

      setSelectedSwitch(index);
      setIsCorrect(index === correctSwitch);
      setShowAnswerSelection(false);
    },
    [gameStarted, gameEnded, selectedSwitch, correctSwitch]
  );

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (warmTimerRef.current) {
        clearInterval(warmTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="mx-auto max-w-6xl">
        {/* Instructions modal */}
        <AnimatePresence>
          {instructions && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="m-4 max-w-2xl rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl ring-1 ring-white/10"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-amber-500/20 p-3">
                    <Lightbulb className="h-8 w-8 text-amber-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    The 3-Switch Mystery
                  </h2>
                </div>
                <div className="space-y-4 text-slate-300">
                  <p className="text-lg">
                    <span className="font-semibold text-amber-400">
                      The Challenge:
                    </span>{" "}
                    One of three switches controls a hidden light bulb. Your
                    mission is to figure out which one!
                  </p>
                  <div className="rounded-lg bg-slate-700/50 p-4">
                    <h3 className="mb-3 font-semibold text-amber-400">
                      How to Play:
                    </h3>
                    <ol className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                          1
                        </span>
                        <span>
                          Toggle the switches on and off to experiment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                          2
                        </span>
                        <span>
                          When ready, lift the cover to reveal the bulb's state
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                          3
                        </span>
                        <span>Use the clues to make your final guess</span>
                      </li>
                    </ol>
                  </div>
                  <div className="rounded-lg bg-slate-700/50 p-4">
                    <h3 className="mb-3 font-semibold text-amber-400">
                      Bulb States:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
                        <span>
                          <span className="font-medium text-yellow-300">
                            Fully lit
                          </span>{" "}
                          - The correct switch is ON
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
                        <span>
                          <span className="font-medium text-amber-400">
                            Warm glow
                          </span>{" "}
                          - The switch was ON but is now OFF
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                        <span>
                          <span className="font-medium text-slate-400">
                            Off
                          </span>{" "}
                          - The switch is OFF or wasn't on long enough
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="rounded-lg bg-blue-500/10 p-3 text-sm italic text-blue-300">
                    💡 Pro tip: The warm glow fades over time, lasting up to 10
                    seconds based on how long the switch was on!
                  </p>
                </div>
                <Button
                  className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-lg font-semibold hover:from-amber-600 hover:to-orange-600"
                  onClick={() => setInstructions(false)}
                >
                  Start the Challenge
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Game Area */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Panel - Bulb Area */}
          <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col items-center">
                <h2 className="mb-8 text-2xl font-bold text-white">
                  The Mystery Bulb
                </h2>

                {/* Bulb Container */}
                <div className="relative mb-8 flex h-80 w-80 items-center justify-center">
                  {/* Bulb */}
                  <div className="absolute z-10">
                    <LightBulb
                      state={isCovered ? "off" : bulbState}
                      warmPercentage={warmTimeRemaining / 10}
                    />
                  </div>

                  {/* Cover */}
                  <AnimatePresence>
                    {isCovered && (
                      <motion.div
                        className="absolute z-20"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <Cover />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Warm glow timer */}
                {!isCovered && bulbState === "warm" && (
                  <motion.div
                    className="mb-6 w-full max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                      <span>Cooling down...</span>
                      <span>{warmTimeRemaining.toFixed(1)}s</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                        initial={{
                          width: `${(warmTimeRemaining / 10) * 100}%`,
                        }}
                        animate={{ width: "0%" }}
                        transition={{
                          duration: warmTimeRemaining,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Game Status */}
                <div className="text-center">
                  {!gameEnded ? (
                    <div className="space-y-4">
                      <p className="text-slate-300">
                        Experiment with the switches, then lift the cover when
                        ready
                      </p>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        onClick={liftCover}
                      >
                        <Zap className="mr-2 h-5 w-5" />
                        Lift Cover
                      </Button>
                    </div>
                  ) : selectedSwitch !== null ? (
                    <motion.div
                      className={cn(
                        "rounded-xl p-6 text-center",
                        isCorrect
                          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 ring-1 ring-green-500/30"
                          : "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 ring-1 ring-red-500/30"
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="mb-4 text-4xl">
                        {isCorrect ? "🎉" : "❌"}
                      </div>
                      <h3 className="mb-2 text-xl font-bold">
                        {isCorrect ? "Brilliant!" : "Not quite!"}
                      </h3>
                      <p className="mb-4">
                        {isCorrect
                          ? `Switch ${
                              selectedSwitch + 1
                            } was indeed the correct answer!`
                          : `Switch ${
                              correctSwitch !== null ? correctSwitch + 1 : ""
                            } was the correct switch.`}
                      </p>
                      <Button
                        onClick={resetGame}
                        className="bg-slate-600 hover:bg-slate-700"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Play Again
                      </Button>
                    </motion.div>
                  ) : showAnswerSelection ? (
                    <div className="rounded-xl bg-blue-500/10 p-6 ring-1 ring-blue-500/30">
                      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                      <p className="text-blue-300">
                        Now make your guess using the answer panel →
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Controls */}
          <div className="space-y-6">
            {/* Switch Control Panel */}
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-bold text-white">
                  Control Panel
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {[0, 1, 2].map((index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "group relative cursor-pointer transition-transform hover:scale-105",
                              gameEnded && "cursor-not-allowed opacity-60"
                            )}
                            onClick={() => toggleSwitch(index)}
                          >
                            <StyledSwitch
                              isOn={switchStates[index]}
                              disabled={gameEnded}
                              label={`Switch ${index + 1}`}
                            />
                            <div className="mt-3 text-center">
                              <span className="text-sm font-medium text-slate-300">
                                Switch {index + 1}
                              </span>
                              <div
                                className={cn(
                                  "mt-1 h-2 w-2 rounded-full mx-auto transition-colors",
                                  switchStates[index]
                                    ? "bg-green-400 shadow-lg shadow-green-400/50"
                                    : "bg-slate-600"
                                )}
                              />
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          {gameEnded
                            ? "Switches locked after cover is lifted"
                            : "Click to toggle switch"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Answer Selection Panel */}
            <AnimatePresence>
              {showAnswerSelection && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm ring-1 ring-amber-500/20">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-full bg-amber-500/20 p-2">
                          <AlertCircle className="h-5 w-5 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-amber-400">
                          Make Your Guess
                        </h3>
                      </div>
                      <p className="mb-6 text-slate-300">
                        Based on what you observed, which switch do you think
                        controls the bulb?
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {[0, 1, 2].map((index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="lg"
                            className="h-16 border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400"
                            onClick={() => makeGuess(index)}
                          >
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                Switch {index + 1}
                              </div>
                              <div className="text-xs opacity-75">
                                Click to guess
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions Button */}
            <div className="text-center">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setInstructions(true)}
              >
                View Instructions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
