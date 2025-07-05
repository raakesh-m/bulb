// Shared TypeScript types and interfaces for the Light Switch Puzzle game

export type Difficulty = "easy" | "medium" | "hard" | "expert";
export type GamePhase = "intro" | "playing" | "revealed" | "completed";
export type BulbState = "off" | "on" | "warm";

export interface GameStats {
  totalAttempts: number;
  correctGuesses: number;
  averageTime: number;
  highScore: number;
  streakCount: number;
}

export interface DifficultySettings {
  warmTime: number;
  minOnTime: number;
  name: string;
  color: string;
  multiplier: number;
}

export interface GameConfig {
  enableSound: boolean;
  enableAnimations: boolean;
  showTimer: boolean;
  showStatistics: boolean;
  autoSave: boolean;
  keyboardControls: boolean;
}

export interface GameState {
  correctSwitch: number | null;
  switchStates: boolean[];
  bulbState: BulbState;
  isCovered: boolean;
  gamePhase: GamePhase;
  selectedSwitch: number | null;
  isCorrect: boolean | null;
  warmTimeRemaining: number;
  difficulty: Difficulty;
  score: number;
  timeElapsed: number;
  showInstructions: boolean;
  showAnswerSelection: boolean;
  currentStreak: number;
}

export interface SwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label: string;
  disabled?: boolean;
}

export interface LightBulbProps {
  state: BulbState;
  warmPercentage?: number;
}

export interface GameControlsPanelProps {
  switchStates: boolean[];
  gamePhase: GamePhase;
  onSwitchToggle: (index: number) => void;
}

export interface GameStatsPanelProps {
  gameStats: GameStats;
  currentStreak: number;
  difficulty: Difficulty;
  gamePhase: GamePhase;
  onShowInstructions: () => void;
  onResetGame: () => void;
}

export interface InstructionScreenProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

// Constants
export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: {
    warmTime: 15,
    minOnTime: 1000,
    name: "Beginner",
    color: "bg-green-600",
    multiplier: 1,
  },
  medium: {
    warmTime: 10,
    minOnTime: 2000,
    name: "Intermediate",
    color: "bg-blue-600",
    multiplier: 1.5,
  },
  hard: {
    warmTime: 6,
    minOnTime: 3000,
    name: "Advanced",
    color: "bg-orange-600",
    multiplier: 2,
  },
  expert: {
    warmTime: 4,
    minOnTime: 4000,
    name: "Expert",
    color: "bg-red-600",
    multiplier: 3,
  },
};

export const DEFAULT_GAME_CONFIG: GameConfig = {
  enableSound: true,
  enableAnimations: true,
  showTimer: true,
  showStatistics: true,
  autoSave: true,
  keyboardControls: true,
};

// Keyboard mapping
export const KEYBOARD_CONTROLS = {
  SWITCH_1: "1",
  SWITCH_2: "2",
  SWITCH_3: "3",
  LIFT_COVER: " ", // Space bar
  RESET_GAME: "r",
  SHOW_HELP: "h",
  TOGGLE_SOUND: "m",
} as const;
