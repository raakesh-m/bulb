# 🧠⚡ Neural Illumination Challenge

A modern, interactive quantum-themed puzzle game built with Next.js 15, featuring advanced glassmorphism UI design and particle effects. This is a reimagined version of the classic "3-Switch Light Bulb" logic puzzle with a futuristic twist.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer)

## 🎯 Overview

The Neural Illumination Challenge transforms the traditional 3-switch puzzle into an immersive quantum deduction experience. Players must identify which of three quantum switches controls a hidden photon emitter using advanced thermal analysis and strategic manipulation.

### 🔬 The Challenge

One of three quantum switches controls a mysterious light bulb hidden under a glass dome. Your mission:

1. **Experiment** with the quantum switches to gather thermal data
2. **Deploy** the revelation protocol to expose the photon state
3. **Analyze** the bulb's condition (lit, warm from recent use, or cold)
4. **Deduce** which switch is the correct control matrix

## ✨ Features

### 🎮 Gameplay

- **4 Difficulty Levels**: Novice → Detective → Expert → Master
- **Dynamic Thermal System**: Bulbs retain heat for varying durations based on difficulty
- **Advanced Scoring**: Time bonuses, difficulty multipliers, and streak tracking
- **Comprehensive Statistics**: Success rates, high scores, average completion times

### 🎨 Visual Design

- **Glassmorphism UI**: Modern frosted glass aesthetic with backdrop blur effects
- **Quantum Particle Field**: 50+ animated background particles with physics-based movement
- **Gradient Animations**: Smooth color transitions and hover effects
- **Responsive Design**: Optimized for desktop and mobile experiences

### 🔧 Technical Features

- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety and IntelliSense support
- **Framer Motion**: Fluid animations and micro-interactions
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling with custom gradients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/raakesh-m/bulb.git
cd bulb

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start playing!

## 🎯 How to Play

### Phase 1: Experimentation

- Toggle quantum switches to generate thermal signatures
- Each switch activation is recorded in the quantum matrix
- Observe switch states and plan your revelation strategy

### Phase 2: Revelation

- Deploy the revelation protocol to remove the quantum cover
- Analyze the photon emitter's state:
  - **🔴 Lit**: Currently active (switch is ON)
  - **🟡 Warm**: Recently active (thermal residue detected)
  - **⚫ Cold**: Inactive (no recent thermal activity)

### Phase 3: Deduction

- Submit your hypothesis about which control matrix governs the emitter
- Receive neural points based on accuracy and completion time
- Build your streak and climb the leaderboards

## 📊 Difficulty Levels

| Level         | Thermal Retention | Minimum Activation | Score Multiplier |
| ------------- | ----------------- | ------------------ | ---------------- |
| **Novice**    | 15 seconds        | 1 second           | 1.0x             |
| **Detective** | 10 seconds        | 2 seconds          | 1.5x             |
| **Expert**    | 6 seconds         | 3 seconds          | 2.0x             |
| **Master**    | 4 seconds         | 4 seconds          | 3.0x             |

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page component
├── components/            # React components
│   ├── modern-incandescent-puzzle.tsx  # Main game component
│   ├── modern-light-bulb.tsx          # Advanced SVG bulb with effects
│   ├── modern-switch.tsx              # Glassmorphism toggle switches
│   ├── modern-cover.tsx               # Glass dome with reflections
│   └── particle-field.tsx             # Background particle system
├── components/ui/         # Reusable UI components (Radix + Tailwind)
└── lib/                   # Utilities and configurations
```

## 🎨 Design Philosophy

### Visual Aesthetics

- **Glassmorphism**: Frosted glass effects with subtle transparency
- **Quantum Theme**: Sci-fi inspired gradients and particle effects
- **Accessibility**: High contrast ratios and keyboard navigation
- **Responsive**: Mobile-first design with touch-friendly interactions

### User Experience

- **Progressive Disclosure**: Information revealed as needed
- **Immediate Feedback**: Real-time visual responses to interactions
- **Gamification**: Scoring system with achievements and streaks
- **Intuitive Controls**: Clear visual hierarchy and interaction patterns

## 🛠️ Technologies Used

### Core Framework

- **Next.js 15**: React framework with App Router and server components
- **React 18**: Component-based UI library with hooks
- **TypeScript**: Static type checking and enhanced developer experience

### Styling & Animation

- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Framer Motion**: Production-ready motion library for React
- **Radix UI**: Low-level UI primitives for accessibility

### Development Tools

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting (if configured)
- **Git**: Version control with semantic commits

## 📈 Performance Optimizations

- **Client-Side Hydration**: Particles rendered only after mount to prevent hydration mismatches
- **Component Optimization**: Memoized calculations and useCallback hooks
- **Lazy Loading**: Dynamic imports for non-critical components
- **Optimized Animations**: Hardware-accelerated transforms with Framer Motion

## 🌟 Key Improvements Over Original

| Feature           | Original         | Neural Illumination Challenge          |
| ----------------- | ---------------- | -------------------------------------- |
| **Visual Design** | Basic SVG        | Professional glassmorphism + particles |
| **Difficulty**    | Single mode      | 4 adaptive difficulty levels           |
| **Scoring**       | None             | Advanced algorithm with bonuses        |
| **Statistics**    | None             | Comprehensive tracking dashboard       |
| **UI/UX**         | Static interface | Animated, responsive, accessible       |
| **Theme**         | Basic puzzle     | Quantum/neural sci-fi aesthetic        |
| **Feedback**      | Simple states    | Rich animations and thermal analysis   |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original 3-Switch Puzzle concept for the foundational game logic
- Radix UI team for accessible component primitives
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth, performant animations

---

_Transform your puzzle-solving experience with quantum-enhanced deduction capabilities._ 🚀✨

**[🎮 Play Now](http://localhost:3000)** • **[📖 Documentation](#)** • **[🐛 Report Bug](https://github.com/raakesh-m/bulb/issues)**
