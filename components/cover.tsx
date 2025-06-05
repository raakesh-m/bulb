"use client";

import { motion } from "framer-motion";

export function Cover() {
  return (
    <motion.div
      className="relative"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width="180"
        height="120"
        viewBox="0 0 180 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Cover shadow */}
        <ellipse cx="90" cy="110" rx="80" ry="8" fill="rgba(0,0,0,0.3)" />

        {/* Main cover body */}
        <path
          d="M20 60C20 33.49 41.49 12 68 12H112C138.51 12 160 33.49 160 60V85C160 91.627 154.627 97 148 97H32C25.373 97 20 91.627 20 85V60Z"
          fill="url(#coverGradient)"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Cover rim */}
        <path
          d="M25 60C25 36.804 43.804 18 67 18H113C136.196 18 155 36.804 155 60V80C155 86.627 149.627 92 143 92H37C30.373 92 25 86.627 25 80V60Z"
          fill="url(#coverInnerGradient)"
        />

        {/* Handle */}
        <rect
          x="80"
          y="5"
          width="20"
          height="12"
          rx="6"
          fill="url(#handleGradient)"
        />
        <rect x="82" y="7" width="16" height="8" rx="4" fill="#94A3B8" />

        {/* Ventilation slots */}
        <g opacity="0.6">
          <rect x="40" y="35" width="20" height="2" rx="1" fill="#64748B" />
          <rect x="40" y="45" width="20" height="2" rx="1" fill="#64748B" />
          <rect x="40" y="55" width="20" height="2" rx="1" fill="#64748B" />
          <rect x="40" y="65" width="20" height="2" rx="1" fill="#64748B" />

          <rect x="120" y="35" width="20" height="2" rx="1" fill="#64748B" />
          <rect x="120" y="45" width="20" height="2" rx="1" fill="#64748B" />
          <rect x="120" y="55" width="20" height="2" rx="1" fill="#64748B" />
          <rect x="120" y="65" width="20" height="2" rx="1" fill="#64748B" />
        </g>

        {/* Highlight */}
        <path
          d="M30 25C30 25 50 20 90 20C130 20 150 25 150 25"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="coverGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="coverInnerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="handleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
