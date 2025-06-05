"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernSwitchProps {
  isOn: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  glowColor?: string;
  size?: "sm" | "md" | "lg";
}

export function ModernSwitch({
  isOn,
  onClick,
  label,
  disabled = false,
  glowColor = "blue",
  size = "md",
}: ModernSwitchProps) {
  const sizeClasses = {
    sm: {
      container: "w-16 h-8",
      track: "w-14 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-7",
    },
    md: {
      container: "w-20 h-10",
      track: "w-18 h-8",
      thumb: "w-6 h-6",
      translate: "translate-x-9",
    },
    lg: {
      container: "w-24 h-12",
      track: "w-22 h-10",
      thumb: "w-8 h-8",
      translate: "translate-x-11",
    },
  };

  const currentSize = sizeClasses[size];

  const colorSchemes = {
    blue: {
      active: "from-cyan-400 via-blue-500 to-indigo-600",
      glow: "shadow-cyan-500/50",
      thumb: "from-white to-cyan-100",
    },
    green: {
      active: "from-emerald-400 via-green-500 to-teal-600",
      glow: "shadow-emerald-500/50",
      thumb: "from-white to-emerald-100",
    },
    purple: {
      active: "from-violet-400 via-purple-500 to-indigo-600",
      glow: "shadow-violet-500/50",
      thumb: "from-white to-violet-100",
    },
    orange: {
      active: "from-orange-400 via-amber-500 to-yellow-600",
      glow: "shadow-orange-500/50",
      thumb: "from-white to-orange-100",
    },
  };

  const colors =
    colorSchemes[glowColor as keyof typeof colorSchemes] || colorSchemes.blue;

  return (
    <div className="flex flex-col items-center gap-3 group">
      {/* Switch Container */}
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative flex items-center justify-center p-2 rounded-2xl transition-all duration-300",
          "bg-gradient-to-br from-slate-800/60 to-slate-900/80",
          "border border-slate-600/30 backdrop-blur-lg",
          "hover:border-slate-500/50 hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-cyan-500/50",
          disabled && "opacity-50 cursor-not-allowed hover:scale-100",
          currentSize.container
        )}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        {/* Background Glow Effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
            isOn && colors.glow,
            isOn && "opacity-30"
          )}
          animate={{
            opacity: isOn ? 0.3 : 0,
            scale: isOn ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Switch Track */}
        <motion.div
          className={cn(
            "relative rounded-full transition-all duration-500",
            "border-2 border-slate-600/40 backdrop-blur-sm",
            currentSize.track,
            isOn
              ? `bg-gradient-to-r ${colors.active} shadow-lg ${colors.glow}`
              : "bg-gradient-to-r from-slate-700 to-slate-800 shadow-inner"
          )}
          animate={{
            backgroundColor: isOn ? undefined : "#334155",
          }}
        >
          {/* Track Inner Shadow */}
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "shadow-inner shadow-black/20"
            )}
          />

          {/* Energy Particles (when active) */}
          {isOn && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {/* Switch Thumb */}
          <motion.div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 left-1 rounded-full",
              "shadow-lg border border-white/20",
              currentSize.thumb,
              isOn
                ? `bg-gradient-to-br ${colors.thumb} shadow-white/40`
                : "bg-gradient-to-br from-slate-300 to-slate-400 shadow-slate-500/40"
            )}
            animate={{
              x: isOn ? currentSize.translate.split("translate-x-")[1] : "0",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            {/* Thumb Highlight */}
            <div
              className={cn(
                "absolute top-1 left-1 w-2 h-2 rounded-full",
                "bg-gradient-to-br from-white/60 to-transparent"
              )}
            />

            {/* Thumb Center Dot */}
            <motion.div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-1 h-1 rounded-full transition-colors duration-300",
                isOn ? colors.active.split(" ")[1] : "bg-slate-500"
              )}
              animate={{
                scale: isOn ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: isOn ? Infinity : 0,
                repeatDelay: 2,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Activation Ripple Effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl border-2 opacity-0",
            colors.active.includes("cyan")
              ? "border-cyan-400"
              : colors.active.includes("emerald")
              ? "border-emerald-400"
              : colors.active.includes("violet")
              ? "border-violet-400"
              : "border-orange-400"
          )}
          animate={{
            scale: isOn ? [1, 1.3, 1] : 1,
            opacity: isOn ? [0, 0.6, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isOn ? Infinity : 0,
            repeatDelay: 3,
          }}
        />
      </motion.button>

      {/* Switch Label */}
      <div className="flex flex-col items-center gap-1">
        <motion.span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isOn ? "text-white" : "text-slate-400"
          )}
          animate={{
            scale: isOn ? 1.05 : 1,
          }}
        >
          {label}
        </motion.span>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              isOn
                ? colors.active.includes("cyan")
                  ? "bg-cyan-400 shadow-cyan-400/50"
                  : colors.active.includes("emerald")
                  ? "bg-emerald-400 shadow-emerald-400/50"
                  : colors.active.includes("violet")
                  ? "bg-violet-400 shadow-violet-400/50"
                  : "bg-orange-400 shadow-orange-400/50"
                : "bg-slate-500"
            )}
            animate={{
              scale: isOn ? [1, 1.3, 1] : 1,
              opacity: isOn ? [0.7, 1, 0.7] : 0.5,
            }}
            transition={{
              duration: 2,
              repeat: isOn ? Infinity : 0,
            }}
          />
          <span
            className={cn(
              "text-xs font-mono transition-colors duration-300",
              isOn ? "text-emerald-400" : "text-slate-500"
            )}
          >
            {isOn ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}
