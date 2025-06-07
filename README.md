# 🧩 Light Switch Puzzle

A modern, interactive light switch puzzle game built with Next.js 15, featuring beautiful dark UI design, custom animated switches, and immersive sound effects. This is a reimagined version of the classic "3-Switch Light Bulb" logic puzzle with a sleek, contemporary interface.

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
- **Comprehensive Statistics**: Success rates, high scores, average completion times

### 🎨 Visual Design

- **Dark Theme UI**: Sleek dark interface with beautiful gradients
- **Custom Animated Switches**: Industrial-style switches with LED indicators and sound effects
- **Smooth Animations**: Fluid transitions and micro-interactions using Framer Motion
- **Responsive Design**: Optimized for desktop and mobile experiences
- **Modern Components**: Built with Radix UI primitives for accessibility

### 🔧 Technical Features

- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety and IntelliSense support
- **Framer Motion**: Fluid animations and physics-based interactions
- **Web Audio API**: Dynamic sound effects for enhanced UX
- **Tailwind CSS**: Utility-first styling with custom configurations

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

## 🎯 How to Play

### Phase 1: Experimentation 🔬

- Toggle the custom switches to test which one controls the hidden light bulb
- Each switch activation is recorded and generates satisfying click sounds
- Observe switch states and plan your revelation strategy

### Phase 2: Revelation 👁️

- Click "Lift Cover" to remove the glass dome
- Analyze the light bulb's state:
  - **🟡 Lit**: Currently active (switch is ON)
  - **🟠 Warm**: Recently active (thermal residue detected)
  - **⚫ Cold**: Inactive (no recent thermal activity)

### Phase 3: Deduction 🧠

- Submit your hypothesis about which switch controls the bulb
- Receive points based on accuracy and completion time
- Build your streak and climb the leaderboards

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
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page component
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── modern-incandescent-puzzle.tsx  # Main game component
│   ├── ui/                       # Reusable UI components (Radix + Tailwind)
│   └── theme-provider.tsx        # Theme context provider
├── lib/                          # Utilities and configurations
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
├── styles/                       # Additional stylesheets
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

## 🚀 Production Deployment

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Setup

The project is configured for easy deployment on:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting provider**

### Environment Variables

No environment variables required for basic functionality.

### Production Optimizations Included

- ✅ TypeScript build error handling
- ✅ ESLint configuration
- ✅ Image optimization settings
- ✅ Performance monitoring ready
- ✅ SEO-friendly metadata

## 🌟 Key Improvements Over Classic Puzzle

| Feature           | Traditional      | Light Switch Puzzle                  |
| ----------------- | ---------------- | ------------------------------------ |
| **Visual Design** | Basic interface  | Professional dark theme + animations |
| **Difficulty**    | Single mode      | 4 adaptive difficulty levels         |
| **Scoring**       | None             | Advanced algorithm with bonuses      |
| **Statistics**    | None             | Comprehensive tracking dashboard     |
| **UI/UX**         | Static interface | Animated, responsive, accessible     |
| **Audio**         | Silent           | Dynamic sound effects                |
| **Feedback**      | Simple states    | Rich animations and thermal analysis |

## 🎵 Audio Features

- **Switch Click Sounds**: Satisfying click feedback using Web Audio API
- **Success Melody**: Celebratory tune for correct answers
- **Error Sound**: Gentle notification for incorrect guesses
- **No External Files**: All sounds generated dynamically for faster loading

## 📱 Responsive Design

- **Mobile-First**: Optimized for touch interactions
- **Tablet-Ready**: Perfect layout for medium screens
- **Desktop Enhanced**: Full-featured experience with hover effects
- **Accessible**: Screen reader friendly and keyboard navigable

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
- Web Audio API for enabling dynamic sound generation

## 🎮 Play Now

Experience the modern light switch puzzle and test your deduction skills!

**[🚀 Live Demo](#)** • **[📖 Documentation](#)** • **[🐛 Report Bug](#)**

---

_Challenge your mind with the ultimate deduction puzzle._ 🧩✨
