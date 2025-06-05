"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernSwitchProps {
  isOn: boolean;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}

export function ModernSwitch({
  isOn,
  disabled = false,
  label,
  onClick,
}: ModernSwitchProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        className={cn(
          "relative w-20 h-40 rounded-2xl backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-4",
          isOn
            ? "bg-gradient-to-b from-emerald-400/20 to-emerald-600/20 border-emerald-400/30 shadow-lg shadow-emerald-500/20 focus:ring-emerald-400/20"
            : "bg-gradient-to-b from-slate-400/10 to-slate-600/10 border-slate-400/20 shadow-lg shadow-slate-500/10 focus:ring-slate-400/20",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        onClick={() => !disabled && onClick?.()}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        disabled={disabled}
        aria-label={label}
        role="switch"
        aria-checked={isOn}
      >
        {/* Switch track background */}
        <div className="absolute inset-2 rounded-xl overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 rounded-xl transition-all duration-300",
              isOn
                ? "bg-gradient-to-b from-emerald-200/30 to-emerald-800/30"
                : "bg-gradient-to-b from-slate-200/20 to-slate-800/30"
            )}
          >
            {/* Inner track groove */}
            <div className="absolute left-1/2 top-3 bottom-3 w-8 -translate-x-1/2 rounded-full bg-black/10 shadow-inner" />
          </div>
        </div>

        {/* Toggle handle */}
        <motion.div
          className="absolute left-1/2 w-7 h-7 -translate-x-1/2 rounded-full shadow-lg backdrop-blur-sm"
          style={{
            background: isOn
              ? "linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #dcfce7 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
          }}
          initial={false}
          animate={{
            y: isOn ? 6 : 26,
            boxShadow: isOn
              ? "0 4px 20px rgba(16, 185, 129, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)"
              : "0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {/* Handle inner glow */}
          <div
            className={cn(
              "absolute inset-0.5 rounded-full transition-all duration-300",
              isOn
                ? "bg-gradient-to-br from-emerald-100/80 to-emerald-200/60 shadow-inner"
                : "bg-gradient-to-br from-white/90 to-slate-100/70 shadow-inner"
            )}
          />

          {/* Handle center dot */}
          <div
            className={cn(
              "absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
              isOn
                ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                : "bg-slate-400"
            )}
          />
        </motion.div>

        {/* Status indicator light */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          animate={{
            backgroundColor: isOn ? "#10b981" : "#64748b",
            boxShadow: isOn
              ? "0 0 12px rgba(16, 185, 129, 0.8), 0 0 4px rgba(16, 185, 129, 0.4)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ON/OFF labels */}
        <div className="absolute left-2 top-2 text-xs font-medium text-slate-400">
          ON
        </div>
        <div className="absolute left-2 bottom-6 text-xs font-medium text-slate-400">
          OFF
        </div>
      </motion.button>

      {/* Switch label */}
      <div className="text-center">
        <h3 className="text-lg font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
          {label}
        </h3>
        <div
          className={cn(
            "w-3 h-3 rounded-full mx-auto mt-2 transition-all duration-300 shadow-lg",
            isOn
              ? "bg-emerald-400 shadow-emerald-400/50"
              : "bg-slate-500 shadow-slate-500/30"
          )}
        />
        <div className="text-sm text-slate-400 mt-1">
          {isOn ? "Active" : "Inactive"}
        </div>
      </div>
    </div>
  );
}
