"use client";

import { motion } from "framer-motion";

export function ModernCover() {
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ y: -8, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg
        width="200"
        height="140"
        viewBox="0 0 200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Cover shadow */}
        <ellipse
          cx="100"
          cy="130"
          rx="90"
          ry="10"
          fill="rgba(0,0,0,0.2)"
          filter="blur(4px)"
        />

        {/* Main dome shape */}
        <path
          d="M25 80 C25 50, 50 25, 100 25 C150 25, 175 50, 175 80 C175 95, 170 105, 160 110 L40 110 C30 105, 25 95, 25 80 Z"
          fill="url(#glassDomeGradient)"
          stroke="url(#glassStroke)"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Inner glass reflection */}
        <path
          d="M35 80 C35 55, 55 35, 100 35 C145 35, 165 55, 165 80 C165 90, 162 98, 155 103 L45 103 C38 98, 35 90, 35 80 Z"
          fill="url(#innerGlassGradient)"
          opacity="0.6"
        />

        {/* Top highlight reflection */}
        <ellipse
          cx="80"
          cy="50"
          rx="25"
          ry="15"
          fill="url(#topReflectionGradient)"
          opacity="0.8"
          transform="rotate(-15 80 50)"
        />

        {/* Side highlight */}
        <ellipse
          cx="140"
          cy="70"
          rx="8"
          ry="20"
          fill="url(#sideReflectionGradient)"
          opacity="0.6"
          transform="rotate(20 140 70)"
        />

        {/* Base rim */}
        <ellipse
          cx="100"
          cy="110"
          rx="75"
          ry="8"
          fill="url(#baseRimGradient)"
          stroke="url(#baseRimStroke)"
          strokeWidth="1"
        />

        {/* Handle */}
        <g>
          <rect
            x="90"
            y="18"
            width="20"
            height="12"
            rx="6"
            fill="url(#handleGradient)"
            stroke="url(#handleStroke)"
            strokeWidth="0.5"
          />
          <rect
            x="92"
            y="20"
            width="16"
            height="8"
            rx="4"
            fill="url(#handleInnerGradient)"
          />
          {/* Handle highlight */}
          <rect
            x="93"
            y="21"
            width="6"
            height="2"
            rx="1"
            fill="rgba(255,255,255,0.6)"
          />
        </g>

        {/* Decorative pattern on glass */}
        <g opacity="0.1">
          <circle cx="70" cy="60" r="2" fill="white" />
          <circle cx="130" cy="60" r="1.5" fill="white" />
          <circle cx="100" cy="45" r="1" fill="white" />
          <circle cx="85" cy="75" r="1.5" fill="white" />
          <circle cx="115" cy="80" r="1" fill="white" />
        </g>

        {/* Glass distortion effect lines */}
        <g opacity="0.15" stroke="white" strokeWidth="0.5" fill="none">
          <path d="M45 85 Q100 82 155 85" />
          <path d="M50 95 Q100 92 150 95" />
        </g>

        {/* Gradients and filters */}
        <defs>
          {/* Main glass dome gradient */}
          <radialGradient id="glassDomeGradient" cx="0.3" cy="0.2">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="40%" stopColor="rgba(240,248,255,0.3)" />
            <stop offset="80%" stopColor="rgba(226,238,255,0.2)" />
            <stop offset="100%" stopColor="rgba(203,213,225,0.1)" />
          </radialGradient>

          {/* Inner glass gradient */}
          <radialGradient id="innerGlassGradient" cx="0.5" cy="0.3">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="60%" stopColor="rgba(240,248,255,0.2)" />
            <stop offset="100%" stopColor="rgba(226,238,255,0.1)" />
          </radialGradient>

          {/* Top reflection gradient */}
          <radialGradient id="topReflectionGradient" cx="0.3" cy="0.2">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Side reflection gradient */}
          <linearGradient
            id="sideReflectionGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Base rim gradient */}
          <linearGradient id="baseRimGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Handle gradients */}
          <linearGradient id="handleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="handleInnerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Stroke gradients */}
          <linearGradient id="glassStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(203,213,225,0.3)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.2)" />
          </linearGradient>

          <linearGradient id="baseRimStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="handleStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Glass effect filter */}
          <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            <feOffset dx="0" dy="1" />
          </filter>
        </defs>
      </svg>

      {/* Floating particles around the dome */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
