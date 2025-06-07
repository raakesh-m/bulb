"use client";

import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

interface EnhancedLightBulbProps {
  state: "off" | "on" | "warm";
  warmPercentage?: number;
}

export function EnhancedLightBulb({
  state,
  warmPercentage = 0,
}: EnhancedLightBulbProps) {
  return (
    <BulbContainer>
      {/* Quantum field glow effect */}
      <AnimatePresence>
        {state !== "off" && (
          <motion.div
            className="quantum-glow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: state === "on" ? 1 : warmPercentage * 0.8,
              scale: state === "on" ? 1.2 : 0.8 + warmPercentage * 0.4,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Energy particles */}
      {state === "on" && (
        <div className="particle-field">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="energy-particle"
              style={{
                left: `${50 + Math.cos((i * 22.5 * Math.PI) / 180) * 120}px`,
                top: `${110 + Math.sin((i * 22.5 * Math.PI) / 180) * 120}px`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.cos((i * 22.5 * Math.PI) / 180) * 20, 0],
                y: [0, Math.sin((i * 22.5 * Math.PI) / 180) * 20, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced quantum light bulb SVG */}
      <motion.div
        className="bulb-svg-container"
        animate={{
          filter:
            state === "on"
              ? "drop-shadow(0 0 30px rgba(0, 255, 255, 0.6))"
              : "drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))",
        }}
        transition={{ duration: 0.4 }}
      >
        <svg
          width="160"
          height="240"
          viewBox="0 0 160 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Quantum-themed bulb socket */}
          <g>
            <motion.rect
              x="52"
              y="180"
              width="56"
              height="45"
              rx="8"
              fill="url(#quantumSocketGradient)"
              animate={{
                fill:
                  state === "on"
                    ? "url(#quantumSocketActiveGradient)"
                    : "url(#quantumSocketGradient)",
              }}
            />

            {/* Quantum threading with glowing effect */}
            <g className="threading">
              {[188, 196, 204, 212, 220].map((y, i) => (
                <motion.line
                  key={i}
                  x1="52"
                  y1={y}
                  x2="108"
                  y2={y}
                  stroke={state === "on" ? "#00FFFF" : "#64748B"}
                  strokeWidth="2"
                  animate={{
                    opacity: state === "on" ? [0.5, 1, 0.5] : 0.6,
                    filter:
                      state === "on"
                        ? "drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))"
                        : "none",
                  }}
                  transition={{
                    duration: 2,
                    repeat: state === "on" ? Infinity : 0,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </g>
          </g>

          {/* Enhanced quantum bulb glass */}
          <motion.path
            d="M80 25 C110 25, 135 50, 135 85 C135 110, 128 130, 115 148 C108 160, 102 170, 96 178 L64 178 C58 170, 52 160, 45 148 C32 130, 25 110, 25 85 C25 50, 50 25, 80 25 Z"
            fill={
              state === "off"
                ? "url(#quantumBulbOff)"
                : state === "on"
                ? "url(#quantumBulbOn)"
                : "url(#quantumBulbWarm)"
            }
            stroke="url(#quantumBulbStroke)"
            strokeWidth="2.5"
            animate={{
              filter:
                state === "on"
                  ? "drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))"
                  : "none",
              strokeWidth: state === "on" ? 3 : 2.5,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Quantum filament design with neural network pattern */}
          <g className="quantum-filament">
            <motion.path
              d="M60 70 Q80 55 100 70 Q80 85 60 70 M60 95 Q80 80 100 95 Q80 110 60 95 M60 120 Q80 105 100 120 Q80 135 60 120 M60 145 Q80 130 100 145 Q80 160 60 145"
              stroke={
                state === "off"
                  ? "#64748B"
                  : state === "on"
                  ? "#00FFFF"
                  : `rgba(0, 255, 255, ${0.3 + 0.7 * warmPercentage})`
              }
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                filter:
                  state === "on"
                    ? "drop-shadow(0 0 15px rgba(0, 255, 255, 0.9))"
                    : "none",
                opacity:
                  state === "on"
                    ? [0.7, 1, 0.7]
                    : state === "off"
                    ? 0.4
                    : warmPercentage,
              }}
              transition={{
                duration: 1.5,
                repeat: state === "on" ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Central quantum core */}
            <motion.circle
              cx="80"
              cy="110"
              r="8"
              fill={
                state === "off"
                  ? "#374151"
                  : state === "on"
                  ? "#00FFFF"
                  : `rgba(0, 255, 255, ${warmPercentage})`
              }
              animate={{
                r: state === "on" ? [6, 10, 6] : 6,
                filter:
                  state === "on"
                    ? "drop-shadow(0 0 20px rgba(0, 255, 255, 1))"
                    : "none",
              }}
              transition={{
                duration: 2,
                repeat: state === "on" ? Infinity : 0,
              }}
            />

            {/* Neural connection lines */}
            <motion.path
              d="M80 60 L80 170 M65 85 L95 135 M95 85 L65 135"
              stroke={
                state === "off"
                  ? "#64748B"
                  : state === "on"
                  ? "#00FFFF"
                  : `rgba(0, 255, 255, ${0.3 + 0.7 * warmPercentage})`
              }
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{
                strokeDashoffset: state === "on" ? [0, -8] : 0,
                opacity:
                  state === "on" ? 1 : state === "off" ? 0.3 : warmPercentage,
              }}
              transition={{
                duration: 1,
                repeat: state === "on" ? Infinity : 0,
                ease: "linear",
              }}
            />
          </g>

          {/* Quantum reflection with holographic effect */}
          <AnimatePresence>
            {state !== "off" && (
              <motion.ellipse
                cx="65"
                cy="85"
                rx="12"
                ry="30"
                fill="url(#quantumReflection)"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: state === "on" ? 0.9 : 0.6 * warmPercentage,
                  scale: state === "on" ? 1.1 : 0.8 + 0.3 * warmPercentage,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>

          {/* Enhanced gradients for quantum theme */}
          <defs>
            {/* Quantum socket gradients */}
            <linearGradient
              id="quantumSocketGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient
              id="quantumSocketActiveGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#164E63" />
              <stop offset="50%" stopColor="#0C4A6E" />
              <stop offset="100%" stopColor="#083344" />
            </linearGradient>

            {/* Quantum bulb gradients */}
            <radialGradient id="quantumBulbOff" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="80%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>
            <radialGradient id="quantumBulbOn" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#F0FFFE" />
              <stop offset="30%" stopColor="#CDFFFE" />
              <stop offset="60%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0891B2" />
            </radialGradient>
            <radialGradient id="quantumBulbWarm" cx="0.3" cy="0.3">
              <stop
                offset="0%"
                stopColor="#F0FFFE"
                stopOpacity={0.3 + 0.7 * warmPercentage}
              />
              <stop
                offset="40%"
                stopColor="#CDFFFE"
                stopOpacity={0.2 + 0.6 * warmPercentage}
              />
              <stop
                offset="80%"
                stopColor="#67E8F9"
                stopOpacity={0.1 + 0.4 * warmPercentage}
              />
              <stop
                offset="100%"
                stopColor="#0891B2"
                stopOpacity={0.05 + 0.3 * warmPercentage}
              />
            </radialGradient>

            {/* Quantum stroke gradient */}
            <linearGradient id="quantumBulbStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#0E7490" />
            </linearGradient>

            {/* Quantum reflection gradient */}
            <radialGradient id="quantumReflection" cx="0.2" cy="0.2">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="40%" stopColor="rgba(6,182,212,0.6)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </BulbContainer>
  );
}

const BulbContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 280px;

  .quantum-glow {
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(0, 255, 255, 0.4) 0%,
      rgba(6, 182, 212, 0.3) 30%,
      rgba(14, 116, 144, 0.2) 60%,
      transparent 100%
    );
    filter: blur(20px);
    z-index: -2;
  }

  .particle-field {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }

  .energy-particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: radial-gradient(
      circle,
      #00ffff 0%,
      #06b6d4 50%,
      transparent 100%
    );
    border-radius: 50%;
    filter: blur(0.5px);
  }

  .bulb-svg-container {
    position: relative;
    z-index: 1;
  }

  .quantum-filament {
    filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3));
  }

  .threading {
    opacity: 0.8;
  }
`;
