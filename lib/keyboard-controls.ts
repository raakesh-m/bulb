// Keyboard controls utility for accessibility and enhanced user experience

import { KEYBOARD_CONTROLS } from "./types";

export class KeyboardControls {
  private listeners: Map<string, () => void> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // Enable keyboard controls
  enable() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      document.addEventListener("keydown", this.handleKeyDown);
    }
  }

  // Disable keyboard controls
  disable() {
    if (this.isEnabled) {
      this.isEnabled = false;
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }

  // Register a keyboard shortcut
  register(key: string, callback: () => void) {
    this.listeners.set(key.toLowerCase(), callback);
  }

  // Unregister a keyboard shortcut
  unregister(key: string) {
    this.listeners.delete(key.toLowerCase());
  }

  // Clear all registered shortcuts
  clear() {
    this.listeners.clear();
  }

  // Handle keydown events
  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isEnabled) return;

    // Ignore if user is typing in an input field
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    const key = event.key.toLowerCase();
    const callback = this.listeners.get(key);

    if (callback) {
      event.preventDefault();
      callback();
    }
  }

  // Get help text for registered shortcuts
  getHelpText(): string[] {
    const shortcuts = [
      `Press "${KEYBOARD_CONTROLS.SWITCH_1}" to toggle Switch 1`,
      `Press "${KEYBOARD_CONTROLS.SWITCH_2}" to toggle Switch 2`,
      `Press "${KEYBOARD_CONTROLS.SWITCH_3}" to toggle Switch 3`,
      `Press "${KEYBOARD_CONTROLS.LIFT_COVER}" (Space) to lift cover`,
      `Press "${KEYBOARD_CONTROLS.RESET_GAME}" to reset game`,
      `Press "${KEYBOARD_CONTROLS.SHOW_HELP}" to show help`,
      `Press "${KEYBOARD_CONTROLS.TOGGLE_SOUND}" to toggle sound`,
    ];
    return shortcuts;
  }

  // Check if keyboard controls are supported
  static isSupported(): boolean {
    return typeof document !== "undefined" && "addEventListener" in document;
  }
}

// Create a singleton instance
export const keyboardControls = new KeyboardControls();
