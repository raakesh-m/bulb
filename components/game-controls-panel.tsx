"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SoundUtils } from "@/lib/sound-utils";

type GamePhase = "intro" | "playing" | "revealed" | "completed";

interface GameControlsPanelProps {
  switchStates: boolean[];
  gamePhase: GamePhase;
  onSwitchToggle: (index: number) => void;
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
      SoundUtils.playClickSound();
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

export function GameControlsPanel({
  switchStates,
  gamePhase,
  onSwitchToggle,
}: GameControlsPanelProps) {
  return (
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
                  onToggle={() => onSwitchToggle(index)}
                  label={`Switch ${index + 1}`}
                  disabled={gamePhase !== "playing"}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
