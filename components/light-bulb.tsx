"use client";

import { motion } from "framer-motion";

interface LightBulbProps {
  state: "off" | "on" | "warm";
  warmPercentage?: number;
}

export function LightBulb({ state, warmPercentage = 0 }: LightBulbProps) {
  return (
    <div className="relative">
      {/* Outer glow effect */}
      {state !== "off" && (
        <motion.div
          className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: state === "on" ? 0.6 : 0.3 * warmPercentage,
            scale: state === "on" ? 1 : 0.7 * warmPercentage + 0.3,
          }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Inner glow */}
      {state !== "off" && (
        <motion.div
          className="absolute left-1/2 top-1/2 -z-5 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 blur-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: state === "on" ? 0.8 : 0.5 * warmPercentage,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <svg
        width="140"
        height="200"
        viewBox="0 0 140 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Bulb base/socket */}
        <g>
          <rect x="50" y="150" width="40" height="35" rx="4" fill="#4A5568" />
          <rect x="52" y="152" width="36" height="31" rx="2" fill="#2D3748" />
          {/* Threading lines */}
          <line
            x1="50"
            y1="158"
            x2="90"
            y2="158"
            stroke="#6B7280"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="165"
            x2="90"
            y2="165"
            stroke="#6B7280"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="172"
            x2="90"
            y2="172"
            stroke="#6B7280"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="179"
            x2="90"
            y2="179"
            stroke="#6B7280"
            strokeWidth="1"
          />
        </g>

        {/* Bulb glass */}
        <motion.ellipse
          cx="70"
          cy="90"
          rx="45"
          ry="60"
          fill={
            state === "off"
              ? "url(#bulbGradientOff)"
              : state === "on"
              ? "url(#bulbGradientOn)"
              : "url(#bulbGradientWarm)"
          }
          fillOpacity={state === "off" ? 0.9 : 1}
          stroke="#E2E8F0"
          strokeWidth="2"
        />

        {/* Filament */}
        <g>
          <path
            d="M60 60 Q70 50 80 60 Q70 70 60 60 M60 80 Q70 70 80 80 Q70 90 60 80 M60 100 Q70 90 80 100 Q70 110 60 100 M60 120 Q70 110 80 120 Q70 130 60 120"
            stroke={
              state === "off"
                ? "#64748B"
                : state === "on"
                ? "#FCD34D"
                : `rgba(251, 191, 36, ${0.3 + 0.7 * warmPercentage})`
            }
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Reflection highlight */}
        {state !== "off" && (
          <motion.ellipse
            cx="55"
            cy="70"
            rx="12"
            ry="20"
            fill="white"
            fillOpacity={state === "on" ? 0.6 : 0.3 * warmPercentage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Gradients */}
        <defs>
          <radialGradient id="bulbGradientOff" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
          <radialGradient id="bulbGradientOn" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <radialGradient id="bulbGradientWarm" cx="0.3" cy="0.3">
            <stop
              offset="0%"
              stopColor="#FEF3C7"
              stopOpacity={0.3 + 0.7 * warmPercentage}
            />
            <stop
              offset="50%"
              stopColor="#FBBF24"
              stopOpacity={0.2 + 0.6 * warmPercentage}
            />
            <stop
              offset="100%"
              stopColor="#D97706"
              stopOpacity={0.1 + 0.5 * warmPercentage}
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
