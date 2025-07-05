"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lightbulb, Zap, Eye, Trophy, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface InstructionScreenProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

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

export function InstructionScreen({
  difficulty,
  onDifficultyChange,
  onStartGame,
}: InstructionScreenProps) {
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
                    Lift the cover to see the bulb's state - lit, warm, or cold
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
                  Light bulbs stay warm for a short time after being turned off.
                  Use this to deduce which switch controls the bulb even when
                  it's not currently on!
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
                          onClick={() => onDifficultyChange(level)}
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
                  onClick={onStartGame}
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
