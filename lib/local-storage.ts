// Utility functions for localStorage operations

interface GameStats {
  totalAttempts: number;
  correctGuesses: number;
  averageTime: number;
  highScore: number;
  streakCount: number;
}

const STORAGE_KEY = "light-switch-puzzle-stats";

export const LocalStorage = {
  // Load game statistics from localStorage
  loadGameStats(): GameStats {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate the data structure
        if (
          typeof parsed.totalAttempts === "number" &&
          typeof parsed.correctGuesses === "number" &&
          typeof parsed.averageTime === "number" &&
          typeof parsed.highScore === "number" &&
          typeof parsed.streakCount === "number"
        ) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Failed to load game stats from localStorage:", error);
    }

    // Return default stats if loading fails or data is invalid
    return {
      totalAttempts: 0,
      correctGuesses: 0,
      averageTime: 0,
      highScore: 0,
      streakCount: 0,
    };
  },

  // Save game statistics to localStorage
  saveGameStats(stats: GameStats): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.warn("Failed to save game stats to localStorage:", error);
    }
  },

  // Clear all stored game statistics
  clearGameStats(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear game stats from localStorage:", error);
    }
  },

  // Check if localStorage is available
  isAvailable(): boolean {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },
};
