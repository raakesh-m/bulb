// Sound utility for switch interactions
export class SoundUtils {
  private static audioContext: AudioContext | null = null;

  // Initialize audio context
  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Generate a mechanical switch click sound
  static playClickSound(isOn: boolean = true) {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for on/off states
      const baseFreq = isOn ? 800 : 600;
      oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        baseFreq * 0.3,
        audioContext.currentTime + 0.1
      );

      // Filter for mechanical sound
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2000, audioContext.currentTime);
      filter.Q.setValueAtTime(10, audioContext.currentTime);

      // Volume envelope for click effect
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.15
      );

      oscillator.type = "square";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.warn("Audio playback failed:", error);
    }
  }

  // Play a more sophisticated mechanical switch sound
  static playMechanicalSwitch(isOn: boolean = true) {
    try {
      const audioContext = this.getAudioContext();

      // Create multiple oscillators for complex sound
      const createMechanicalClick = (freq: number, delay: number = 0) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.setValueAtTime(freq, audioContext.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(
          freq * 0.1,
          audioContext.currentTime + delay + 0.08
        );

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1500, audioContext.currentTime + delay);
        filter.Q.setValueAtTime(8, audioContext.currentTime + delay);

        gain.gain.setValueAtTime(0, audioContext.currentTime + delay);
        gain.gain.linearRampToValueAtTime(
          0.2,
          audioContext.currentTime + delay + 0.005
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + delay + 0.12
        );

        osc.type = "square";
        osc.start(audioContext.currentTime + delay);
        osc.stop(audioContext.currentTime + delay + 0.12);
      };

      // Create layered mechanical sound
      if (isOn) {
        createMechanicalClick(900, 0); // Initial click
        createMechanicalClick(1200, 0.02); // Spring tension
        createMechanicalClick(600, 0.04); // Contact closure
      } else {
        createMechanicalClick(700, 0); // Release click
        createMechanicalClick(500, 0.015); // Spring release
        createMechanicalClick(300, 0.03); // Contact open
      }
    } catch (error) {
      console.warn("Mechanical switch sound failed:", error);
    }
  }
}
