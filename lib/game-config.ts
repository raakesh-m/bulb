// Game configuration management with localStorage persistence

import React from "react";
import { GameConfig, DEFAULT_GAME_CONFIG } from "./types";

const CONFIG_STORAGE_KEY = "light-switch-puzzle-config";

export class GameConfigManager {
  private config: GameConfig;
  private listeners: Set<(config: GameConfig) => void> = new Set();

  constructor() {
    this.config = this.loadConfig();
  }

  // Load configuration from localStorage
  private loadConfig(): GameConfig {
    try {
      if (typeof window === "undefined") {
        return { ...DEFAULT_GAME_CONFIG };
      }

      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Validate the configuration structure
        const validConfig: GameConfig = {
          enableSound:
            typeof parsed.enableSound === "boolean"
              ? parsed.enableSound
              : DEFAULT_GAME_CONFIG.enableSound,
          enableAnimations:
            typeof parsed.enableAnimations === "boolean"
              ? parsed.enableAnimations
              : DEFAULT_GAME_CONFIG.enableAnimations,
          showTimer:
            typeof parsed.showTimer === "boolean"
              ? parsed.showTimer
              : DEFAULT_GAME_CONFIG.showTimer,
          showStatistics:
            typeof parsed.showStatistics === "boolean"
              ? parsed.showStatistics
              : DEFAULT_GAME_CONFIG.showStatistics,
          autoSave:
            typeof parsed.autoSave === "boolean"
              ? parsed.autoSave
              : DEFAULT_GAME_CONFIG.autoSave,
          keyboardControls:
            typeof parsed.keyboardControls === "boolean"
              ? parsed.keyboardControls
              : DEFAULT_GAME_CONFIG.keyboardControls,
        };

        return validConfig;
      }
    } catch (error) {
      console.warn("Failed to load game config from localStorage:", error);
    }

    return { ...DEFAULT_GAME_CONFIG };
  }

  // Save configuration to localStorage
  private saveConfig(): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(this.config));
      }
    } catch (error) {
      console.warn("Failed to save game config to localStorage:", error);
    }
  }

  // Get current configuration
  getConfig(): GameConfig {
    return { ...this.config };
  }

  // Update configuration
  updateConfig(updates: Partial<GameConfig>): void {
    const oldConfig = { ...this.config };
    this.config = { ...this.config, ...updates };
    this.saveConfig();

    // Notify listeners of changes
    this.listeners.forEach((listener) => listener(this.config));
  }

  // Update a single configuration value
  set<K extends keyof GameConfig>(key: K, value: GameConfig[K]): void {
    this.updateConfig({ [key]: value });
  }

  // Get a single configuration value
  get<K extends keyof GameConfig>(key: K): GameConfig[K] {
    return this.config[key];
  }

  // Reset configuration to defaults
  reset(): void {
    this.config = { ...DEFAULT_GAME_CONFIG };
    this.saveConfig();
    this.listeners.forEach((listener) => listener(this.config));
  }

  // Subscribe to configuration changes
  subscribe(listener: (config: GameConfig) => void): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Clear all configuration data
  clear(): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CONFIG_STORAGE_KEY);
      }
    } catch (error) {
      console.warn("Failed to clear game config from localStorage:", error);
    }

    this.config = { ...DEFAULT_GAME_CONFIG };
    this.listeners.forEach((listener) => listener(this.config));
  }

  // Export configuration as JSON string
  export(): string {
    return JSON.stringify(this.config, null, 2);
  }

  // Import configuration from JSON string
  import(configJson: string): boolean {
    try {
      const parsed = JSON.parse(configJson);

      // Validate that it's a valid configuration object
      if (typeof parsed === "object" && parsed !== null) {
        this.updateConfig(parsed);
        return true;
      }
    } catch (error) {
      console.warn("Failed to import game config:", error);
    }

    return false;
  }

  // Check if localStorage is available
  static isStorageAvailable(): boolean {
    try {
      if (typeof window === "undefined") return false;

      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Create a singleton instance
export const gameConfig = new GameConfigManager();

// React hook for using game configuration
export function useGameConfig() {
  const [config, setConfig] = React.useState(() => gameConfig.getConfig());

  React.useEffect(() => {
    const unsubscribe = gameConfig.subscribe(setConfig);
    return unsubscribe;
  }, []);

  return {
    config,
    updateConfig: (updates: Partial<GameConfig>) =>
      gameConfig.updateConfig(updates),
    reset: () => gameConfig.reset(),
    set: <K extends keyof GameConfig>(key: K, value: GameConfig[K]) =>
      gameConfig.set(key, value),
    get: <K extends keyof GameConfig>(key: K) => gameConfig.get(key),
  };
}
