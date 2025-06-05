"use client";

import { motion } from "framer-motion";

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating energy orbs */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 3 === 0
                ? "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)"
                : i % 3 === 1
                ? "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)"
                : "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Energy streams */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Pulsing nodes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
          }}
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Quantum field lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(0.5px)" }}
      >
        <defs>
          <linearGradient
            id="fieldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={`field-${i}`}
            d={`M ${Math.random() * 100} ${Math.random() * 100} Q ${
              Math.random() * 200
            } ${Math.random() * 100} ${Math.random() * 300} ${
              Math.random() * 200
            }`}
            stroke="url(#fieldGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
            animate={{
              d: [
                `M ${Math.random() * 100} ${Math.random() * 100} Q ${
                  Math.random() * 200
                } ${Math.random() * 100} ${Math.random() * 300} ${
                  Math.random() * 200
                }`,
                `M ${Math.random() * 150} ${Math.random() * 150} Q ${
                  Math.random() * 250
                } ${Math.random() * 150} ${Math.random() * 350} ${
                  Math.random() * 250
                }`,
                `M ${Math.random() * 100} ${Math.random() * 100} Q ${
                  Math.random() * 200
                } ${Math.random() * 100} ${Math.random() * 300} ${
                  Math.random() * 200
                }`,
              ],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
