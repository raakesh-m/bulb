# 🧩 Light Switch Puzzle

A modern, interactive light switch puzzle game built with Next.js 15 and React 19, featuring beautiful dark UI design, custom animated switches, and immersive sound effects. This is a reimagined version of the classic "3-Switch Light Bulb" logic puzzle with a sleek, contemporary interface.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-black?style=for-the-badge&logo=framer)

## 🎯 Overview

The Light Switch Puzzle transforms the traditional 3-switch puzzle into an immersive deduction experience. Players must identify which of three switches controls a hidden light bulb using strategic experimentation and thermal analysis.

### 🔍 The Challenge

One of three switches controls a mysterious light bulb hidden under a glass dome. Your mission:

1. **🔬 Experiment** - Toggle switches to gather thermal data
2. **👁️ Reveal** - Lift the cover to expose the bulb's state
3. **🧠 Analyze** - Examine the bulb's condition (lit, warm from recent use, or cold)
4. **✅ Solve** - Deduce which switch is the correct controller

## ✨ Features

### 🎮 Gameplay

- **4 Difficulty Levels**: Beginner → Intermediate → Advanced → Expert
- **Dynamic Thermal System**: Bulbs retain heat for varying durations based on difficulty
- **Advanced Scoring**: Time bonuses, difficulty multipliers, and streak tracking
- **Persistent Statistics**: Game stats saved automatically to local storage
- **Comprehensive Analytics**: Success rates, high scores, average completion times, and streak tracking
- **Full Keyboard Controls**: Navigate with 1/2/3 keys for switches, Space for cover, R to reset, H for help

### 🎨 Visual Design

- **Dark Theme UI**: Sleek dark interface with beautiful gradients
- **Custom Animated Switches**: Industrial-style switches with LED indicators and sound effects
- **Smooth Animations**: Fluid transitions and micro-interactions using Framer Motion
- **Responsive Design**: Optimized for desktop and mobile experiences
- **Modern Components**: Built with Radix UI primitives for accessibility
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks

### 🔧 Technical Features

- **Next.js 15**: Latest React framework with App Router
- **React 19**: Latest component-based UI library with concurrent features
- **TypeScript**: Full type safety and IntelliSense support
- **Framer Motion**: Fluid animations and physics-based interactions
- **Web Audio API**: Dynamic sound effects for enhanced UX
- **Tailwind CSS**: Utility-first styling with custom configurations
- **Component Architecture**: Modular, reusable components for maintainability
- **Local Storage**: Persistent game statistics across sessions
- **Progressive Web App (PWA)**: Installable on mobile and desktop with offline support
- **Service Worker**: Caching and offline functionality for seamless experience

### 🎵 Sound System

- **Centralized Audio Management**: Dedicated sound utility class
- **Multiple Sound Effects**: Switch clicks, success sounds, and error feedback
- **Web Audio API**: Dynamic sound generation without external audio files
- **Graceful Degradation**: Works without audio support
- **Configurable Settings**: Toggle sound on/off with persistent preferences

### 🏗️ Architecture

- **Modular Components**: Separated concerns with dedicated components
- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Error Handling**: Graceful error handling for localStorage and audio
- **Performance Optimized**: Minimal bundle size with only necessary dependencies
- **Shared Type System**: Centralized type definitions for consistency
- **Configuration Management**: Persistent user preferences and settings
- **Performance Monitoring**: Built-in performance tracking and optimization insights
- **Keyboard Navigation**: Full accessibility with keyboard controls
- **Progressive Web App**: Installable with offline support and service worker caching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd incandescent-puzzle

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start playing!

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run preview      # Build and start production server
npm run clean        # Clean build artifacts
```

## 🎯 How to Play

### Phase 1: Experimentation 🔬

- Toggle the custom switches to test which one controls the hidden light bulb
- Each switch activation generates satisfying click sounds and visual feedback
- Observe switch states and plan your revelation strategy
- Consider the thermal properties of the bulb system

### Phase 2: Revelation 👁️

- Click "Lift Cover" to remove the glass dome
- Analyze the light bulb's state:
  - **🟡 Lit**: Currently active (switch is ON)
  - **🟠 Warm**: Recently active (thermal residue detected)
  - **⚫ Cold**: Inactive (no recent thermal activity)

### Phase 3: Deduction 🧠

- Submit your hypothesis about which switch controls the bulb
- Receive points based on accuracy and completion time
- Build your streak and improve your statistics
- Challenge yourself with higher difficulty levels

### ⌨️ Keyboard Controls

For enhanced accessibility and speed:

- **1, 2, 3** - Toggle switches 1, 2, and 3 respectively
- **Space** - Lift/lower the cover
- **R** - Reset the current game
- **H** - Show help and instructions
- **M** - Toggle sound on/off

All interactions can be performed using either mouse/touch or keyboard controls.

## 📊 Difficulty Levels

| Level            | Thermal Retention | Minimum Activation | Score Multiplier |
| ---------------- | ----------------- | ------------------ | ---------------- |
| **Beginner**     | 15 seconds        | 1 second           | 1.0x             |
| **Intermediate** | 10 seconds        | 2 seconds          | 1.5x             |
| **Advanced**     | 6 seconds         | 3 seconds          | 2.0x             |
| **Expert**       | 4 seconds         | 4 seconds          | 3.0x             |

## 🏗️ Project Structure

```
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout with metadata & PWA setup
│   ├── page.tsx                  # Home page component
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── modern-incandescent-puzzle.tsx  # Main game component
│   ├── game-stats-panel.tsx     # Statistics display component
│   ├── instruction-screen.tsx   # Tutorial and setup screen
│   ├── game-controls-panel.tsx  # Switch controls component
│   ├── error-boundary.tsx       # Error handling component
│   ├── service-worker-registration.tsx  # PWA installation & updates
│   └── ui/                       # Reusable UI components (Radix + Tailwind)
├── lib/                          # Utilities and configurations
│   ├── utils.ts                  # Helper functions
│   ├── sound-utils.ts           # Audio management utilities
│   ├── local-storage.ts         # Local storage operations
│   ├── types.ts                 # Shared TypeScript types
│   ├── keyboard-controls.ts     # Keyboard navigation utility
│   ├── game-config.ts           # Configuration management
│   └── performance-monitor.ts   # Performance tracking utility
├── styles/                       # Additional stylesheets
├── public/                       # Static assets & PWA files
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service worker
│   └── offline.html             # Offline fallback page
└── next.config.mjs              # Next.js configuration
```

## 🎨 Design Philosophy

### Visual Aesthetics

- **Dark Theme**: Professional dark interface with subtle gradients
- **Modern Industrial**: Sleek switches inspired by professional equipment
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Responsive**: Mobile-first design with touch-friendly interactions

### User Experience

- **Progressive Disclosure**: Information revealed as needed
- **Immediate Feedback**: Real-time visual and audio responses
- **Gamification**: Scoring system with achievements and streaks
- **Intuitive Controls**: Clear visual hierarchy and interaction patterns
- **Data Persistence**: Automatic saving of progress and statistics

## 🛠️ Technologies Used

### Core Framework

- **Next.js 15**: React framework with App Router and server components
- **React 19**: Latest component-based UI library with concurrent features
- **TypeScript**: Static type checking and enhanced developer experience

### Styling & Animation

- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Framer Motion**: Production-ready motion library for React
- **Radix UI**: Low-level UI primitives for accessibility

### Audio & Interaction

- **Web Audio API**: Dynamic sound generation for switch clicks and game events
- **Custom Switch Components**: Hand-crafted animated switches with physics

### Development Tools

- **ESLint**: Code linting and style enforcement
- **PostCSS**: CSS processing and optimization
- **Git**: Version control with semantic commits

## 📈 Performance Optimizations

- **Server-Side Rendering**: Fast initial page loads with Next.js
- **Component Optimization**: Memoized calculations and useCallback hooks
- **Audio Context Management**: Efficient sound generation without external files
- **Optimized Animations**: Hardware-accelerated transforms
- **Bundle Optimization**: Tree-shaking and code splitting
- **Minimal Dependencies**: Only essential packages included

## 🔧 Configuration

### Environment Variables

No environment variables required for basic functionality.

### Build Configuration

The project is configured for optimal production builds:

- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Optimized Tailwind CSS output
- Automatic code splitting

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Platforms

The project is optimized for deployment on:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting provider**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Inspired by the classic 3-switch light bulb puzzle
- Built with modern web technologies for optimal performance
- Designed with accessibility and user experience in mind

---

**Enjoy solving the puzzle!** 🧩✨
