"use client";

import { motion } from "framer-motion";

interface ModernLightBulbProps {
  state: "off" | "on" | "warm";
  warmPercentage?: number;
}

export function ModernLightBulb({
  state,
  warmPercentage = 0,
}: ModernLightBulbProps) {
  return (
    <div className="relative">
      {/* Outer glow effect */}
      {state !== "off" && (
        <motion.div
          className="absolute left-1/2 top-1/2 -z-20 rounded-full blur-3xl"
          style={{
            width: state === "on" ? "300px" : `${200 * warmPercentage + 100}px`,
            height:
              state === "on" ? "300px" : `${200 * warmPercentage + 100}px`,
            background:
              state === "on"
                ? "radial-gradient(circle, rgba(255,204,0,0.8) 0%, rgba(255,165,0,0.6) 40%, rgba(255,140,0,0.3) 70%, transparent 100%)"
                : `radial-gradient(circle, rgba(255,204,0,${
                    0.6 * warmPercentage
                  }) 0%, rgba(255,165,0,${
                    0.4 * warmPercentage
                  }) 40%, rgba(255,140,0,${
                    0.2 * warmPercentage
                  }) 70%, transparent 100%)`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: state === "on" ? 1 : warmPercentage,
            scale: state === "on" ? 1 : 0.7 * warmPercentage + 0.3,
          }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Inner glow */}
      {state !== "off" && (
        <motion.div
          className="absolute left-1/2 top-1/2 -z-10 rounded-full blur-xl"
          style={{
            width: "180px",
            height: "180px",
            background:
              state === "on"
                ? "radial-gradient(circle, rgba(255,235,59,0.9) 0%, rgba(255,193,7,0.7) 50%, transparent 100%)"
                : `radial-gradient(circle, rgba(255,235,59,${
                    0.7 * warmPercentage
                  }) 0%, rgba(255,193,7,${
                    0.5 * warmPercentage
                  }) 50%, transparent 100%)`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: state === "on" ? 1 : 0.8 * warmPercentage,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Particles effect for "on" state */}
      {state === "on" && (
        <div
          className="absolute left-1/2 top-1/2 -z-5"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.cos((i * 30 * Math.PI) / 180) * 100}px`,
                top: `${Math.sin((i * 30 * Math.PI) / 180) * 100}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      <svg
        width="160"
        height="220"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Enhanced bulb base/socket */}
        <g>
          <rect
            x="55"
            y="170"
            width="50"
            height="40"
            rx="6"
            fill="url(#socketGradient)"
          />
          <rect
            x="57"
            y="172"
            width="46"
            height="36"
            rx="4"
            fill="url(#socketInnerGradient)"
          />
          {/* Threading lines with better styling */}
          <g opacity="0.7">
            <line
              x1="55"
              y1="178"
              x2="105"
              y2="178"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <line
              x1="55"
              y1="186"
              x2="105"
              y2="186"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <line
              x1="55"
              y1="194"
              x2="105"
              y2="194"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <line
              x1="55"
              y1="202"
              x2="105"
              y2="202"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* Enhanced bulb glass with modern design */}
        <motion.path
          d="M80 30 C105 30, 125 50, 125 80 C125 100, 120 120, 110 135 C105 145, 100 155, 95 165 L65 165 C60 155, 55 145, 50 135 C40 120, 35 100, 35 80 C35 50, 55 30, 80 30 Z"
          fill={
            state === "off"
              ? "url(#bulbGradientOff)"
              : state === "on"
              ? "url(#bulbGradientOn)"
              : "url(#bulbGradientWarm)"
          }
          stroke="url(#bulbStroke)"
          strokeWidth="2"
          initial={false}
          animate={{
            filter:
              state === "on"
                ? "drop-shadow(0 0 20px rgba(255,235,59,0.5))"
                : "none",
          }}
        />

        {/* Modern filament design */}
        <g opacity={state === "off" ? 0.4 : 1}>
          <motion.path
            d="M65 70 Q80 60 95 70 Q80 80 65 70 M65 90 Q80 80 95 90 Q80 100 65 90 M65 110 Q80 100 95 110 Q80 120 65 110 M65 130 Q80 120 95 130 Q80 140 65 130"
            stroke={
              state === "off"
                ? "#64748B"
                : state === "on"
                ? "#FFF176"
                : `rgba(255, 241, 118, ${0.3 + 0.7 * warmPercentage})`
            }
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              filter:
                state === "on"
                  ? "drop-shadow(0 0 10px rgba(255,241,118,0.8))"
                  : "none",
            }}
          />
          {/* Central filament support */}
          <motion.line
            x1="80"
            y1="60"
            x2="80"
            y2="145"
            stroke={
              state === "off"
                ? "#64748B"
                : state === "on"
                ? "#FFF176"
                : `rgba(255, 241, 118, ${0.3 + 0.7 * warmPercentage})`
            }
            strokeWidth="1.5"
          />
        </g>

        {/* Enhanced reflection highlight */}
        {state !== "off" && (
          <motion.ellipse
            cx="65"
            cy="80"
            rx="15"
            ry="25"
            fill="url(#reflectionGradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: state === "on" ? 0.8 : 0.4 * warmPercentage,
              scale: state === "on" ? 1 : 0.8 + 0.2 * warmPercentage,
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Gradients */}
        <defs>
          {/* Socket gradients */}
          <linearGradient id="socketGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="50%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id="socketInnerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>

          {/* Bulb gradients */}
          <radialGradient id="bulbGradientOff" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
          <radialGradient id="bulbGradientOn" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#FFFDE7" />
            <stop offset="30%" stopColor="#FFF9C4" />
            <stop offset="70%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FCD34D" />
          </radialGradient>
          <radialGradient id="bulbGradientWarm" cx="0.3" cy="0.3">
            <stop
              offset="0%"
              stopColor="#FFFDE7"
              stopOpacity={0.2 + 0.8 * warmPercentage}
            />
            <stop
              offset="30%"
              stopColor="#FFF9C4"
              stopOpacity={0.15 + 0.7 * warmPercentage}
            />
            <stop
              offset="70%"
              stopColor="#FEF3C7"
              stopOpacity={0.1 + 0.6 * warmPercentage}
            />
            <stop
              offset="100%"
              stopColor="#FCD34D"
              stopOpacity={0.05 + 0.5 * warmPercentage}
            />
          </radialGradient>

          {/* Stroke gradient */}
          <linearGradient id="bulbStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Reflection gradient */}
          <radialGradient id="reflectionGradient" cx="0.3" cy="0.2">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
