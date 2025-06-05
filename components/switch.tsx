"use client";

import { motion } from "framer-motion";

interface SwitchProps {
  isOn: boolean;
  disabled?: boolean;
  label: string;
}

export function Switch({ isOn, disabled = false, label }: SwitchProps) {
  return (
    <div
      className="relative"
      aria-label={label}
      role="switch"
      aria-checked={isOn}
    >
      <motion.div
        className={cn(
          "relative h-24 w-16 rounded-xl shadow-lg transition-colors",
          isOn
            ? "bg-gradient-to-b from-green-400 to-green-600 shadow-green-500/30"
            : "bg-gradient-to-b from-slate-600 to-slate-800 shadow-slate-900/50",
          disabled && "opacity-60"
        )}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {/* Switch plate background */}
        <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-slate-700 to-slate-900">
          {/* Switch track */}
          <div className="absolute left-1/2 top-2 h-16 w-6 -translate-x-1/2 rounded-full bg-slate-800 shadow-inner">
            {/* Toggle handle */}
            <motion.div
              className={cn(
                "absolute left-1/2 h-6 w-6 -translate-x-1/2 rounded-full shadow-lg",
                isOn
                  ? "bg-gradient-to-b from-white to-green-100"
                  : "bg-gradient-to-b from-slate-300 to-slate-500"
              )}
              initial={false}
              animate={{
                y: isOn ? 10 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          </div>

          {/* LED indicator */}
          <div className="absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full">
            <motion.div
              className={cn(
                "h-full w-full rounded-full transition-colors",
                isOn
                  ? "bg-green-400 shadow-lg shadow-green-400/50"
                  : "bg-slate-600"
              )}
              animate={{
                boxShadow: isOn ? "0 0 10px rgba(34, 197, 94, 0.8)" : "none",
              }}
            />
          </div>
        </div>

        {/* Switch screws */}
        <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-slate-500 shadow-inner" />
        <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-slate-500 shadow-inner" />
        <div className="absolute bottom-1 left-1 h-2 w-2 rounded-full bg-slate-500 shadow-inner" />
        <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-slate-500 shadow-inner" />
      </motion.div>

      {/* Not allowed overlay */}
      {disabled && (
        <div className="absolute inset-0 cursor-not-allowed rounded-xl" />
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
