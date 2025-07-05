"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HelpCircle, RotateCcw, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameStats {
  totalAttempts: number;
  correctGuesses: number;
  averageTime: number;
  highScore: number;
  streakCount: number;
}

type Difficulty = "easy" | "medium" | "hard" | "expert";

interface GameStatsPanelProps {
  gameStats: GameStats;
  currentStreak: number;
  difficulty: Difficulty;
  gamePhase: "intro" | "playing" | "revealed" | "completed";
  onShowInstructions: () => void;
  onResetGame: () => void;
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

export function GameStatsPanel({
  gameStats,
  currentStreak,
  difficulty,
  gamePhase,
  onShowInstructions,
  onResetGame,
}: GameStatsPanelProps) {
  return (
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
                        (gameStats.correctGuesses / gameStats.totalAttempts) *
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
                  Avg Time
                </span>
                <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                  {gameStats.averageTime}s
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
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 text-center text-white text-base sm:text-lg">
              Game Info
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm sm:text-base">
                  Difficulty
                </span>
                <Badge
                  className={cn(
                    "text-white text-xs sm:text-sm",
                    difficultySettings[difficulty].color
                  )}
                >
                  {difficultySettings[difficulty].name}
                </Badge>
              </div>
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
                  Multiplier
                </span>
                <span className="font-bold text-gray-200 text-sm sm:text-base lg:text-lg">
                  {difficultySettings[difficulty].multiplier}x
                </span>
              </div>
              {currentStreak > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Current Streak
                  </span>
                  <span className="font-bold text-yellow-400 text-sm sm:text-base lg:text-lg">
                    {currentStreak}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        <Button
          variant="outline"
          onClick={onShowInstructions}
          className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
          size="lg"
        >
          <HelpCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">How to Play</span>
        </Button>

        <Button
          variant="outline"
          onClick={onResetGame}
          className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
          disabled={gamePhase === "intro"}
          size="lg"
        >
          <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">New Game</span>
        </Button>
      </div>
    </motion.div>
  );
}
