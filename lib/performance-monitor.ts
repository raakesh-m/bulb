// Performance monitoring utility for tracking app performance

import React from "react";

export interface PerformanceMetrics {
  renderTime: number;
  loadTime: number;
  interactionTime: number;
  memoryUsage?: number;
  timestamp: number;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observers: Set<(metrics: PerformanceMetrics) => void> = new Set();
  private isEnabled: boolean = true;

  constructor() {
    this.setupPerformanceObserver();
  }

  // Setup performance observer for Web Vitals
  private setupPerformanceObserver() {
    if (typeof window === "undefined") return;

    // Observe paint and navigation timings
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "paint") {
            this.recordPaintTiming(entry as PerformanceEntry);
          } else if (entry.entryType === "navigation") {
            this.recordNavigationTiming(entry as PerformanceNavigationTiming);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ["paint", "navigation"] });
      } catch (e) {
        console.warn("Performance observer not supported:", e);
      }
    }
  }

  // Record paint timing (FCP, LCP)
  private recordPaintTiming(entry: PerformanceEntry) {
    if (!this.isEnabled) return;

    const metrics: PerformanceMetrics = {
      renderTime: entry.startTime,
      loadTime: 0,
      interactionTime: 0,
      memoryUsage: this.getMemoryUsage(),
      timestamp: Date.now(),
    };

    this.addMetrics(metrics);
  }

  // Record navigation timing
  private recordNavigationTiming(entry: PerformanceNavigationTiming) {
    if (!this.isEnabled) return;

    const metrics: PerformanceMetrics = {
      renderTime: entry.domContentLoadedEventEnd - entry.fetchStart,
      loadTime: entry.loadEventEnd - entry.fetchStart,
      interactionTime: entry.domInteractive - entry.fetchStart,
      memoryUsage: this.getMemoryUsage(),
      timestamp: Date.now(),
    };

    this.addMetrics(metrics);
  }

  // Get memory usage if available
  private getMemoryUsage(): number | undefined {
    if (typeof window !== "undefined" && "performance" in window) {
      const perf = window.performance as any;
      if (perf.memory) {
        return perf.memory.usedJSHeapSize / 1024 / 1024; // MB
      }
    }
    return undefined;
  }

  // Add metrics to collection
  private addMetrics(metrics: PerformanceMetrics) {
    this.metrics.push(metrics);

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    // Notify observers
    this.observers.forEach((observer) => observer(metrics));
  }

  // Record a custom timing
  recordTiming(
    name: string,
    startTime: number,
    endTime: number = performance.now()
  ) {
    if (!this.isEnabled) return;

    const duration = endTime - startTime;
    const metrics: PerformanceMetrics = {
      renderTime: duration,
      loadTime: 0,
      interactionTime: 0,
      memoryUsage: this.getMemoryUsage(),
      timestamp: Date.now(),
    };

    this.addMetrics(metrics);
  }

  // Start timing for a specific operation
  startTiming(name: string): () => void {
    if (!this.isEnabled) return () => {};

    const startTime = performance.now();

    return () => {
      this.recordTiming(name, startTime);
    };
  }

  // Measure React component render time
  measureRender<T>(component: string, renderFn: () => T): T {
    if (!this.isEnabled) return renderFn();

    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();

    this.recordTiming(`${component}-render`, startTime, endTime);
    return result;
  }

  // Get average metrics
  getAverageMetrics(): Partial<PerformanceMetrics> {
    if (this.metrics.length === 0) return {};

    const totals = this.metrics.reduce(
      (acc, metrics) => ({
        renderTime: acc.renderTime + metrics.renderTime,
        loadTime: acc.loadTime + metrics.loadTime,
        interactionTime: acc.interactionTime + metrics.interactionTime,
        memoryUsage: acc.memoryUsage + (metrics.memoryUsage || 0),
      }),
      { renderTime: 0, loadTime: 0, interactionTime: 0, memoryUsage: 0 }
    );

    return {
      renderTime: totals.renderTime / this.metrics.length,
      loadTime: totals.loadTime / this.metrics.length,
      interactionTime: totals.interactionTime / this.metrics.length,
      memoryUsage: totals.memoryUsage / this.metrics.length,
    };
  }

  // Get latest metrics
  getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0
      ? this.metrics[this.metrics.length - 1]
      : null;
  }

  // Get all metrics
  getAllMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  // Subscribe to metrics updates
  subscribe(observer: (metrics: PerformanceMetrics) => void): () => void {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  // Clear all metrics
  clear() {
    this.metrics = [];
  }

  // Enable/disable monitoring
  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  // Check if monitoring is enabled
  isMonitoringEnabled(): boolean {
    return this.isEnabled;
  }

  // Get performance insights
  getInsights(): {
    slowRenders: number;
    highMemoryUsage: boolean;
    averageLoadTime: number;
    recommendations: string[];
  } {
    const averages = this.getAverageMetrics();
    const recommendations: string[] = [];

    const slowRenders = this.metrics.filter((m) => m.renderTime > 16).length; // 60fps = 16ms
    const highMemoryUsage = (averages.memoryUsage || 0) > 50; // 50MB threshold

    if (slowRenders > this.metrics.length * 0.3) {
      recommendations.push(
        "Consider optimizing component renders - many frames are taking longer than 16ms"
      );
    }

    if (highMemoryUsage) {
      recommendations.push(
        "Memory usage is high - consider reviewing component cleanup and avoiding memory leaks"
      );
    }

    if ((averages.loadTime || 0) > 3000) {
      recommendations.push(
        "Load time is high - consider code splitting and lazy loading"
      );
    }

    return {
      slowRenders,
      highMemoryUsage,
      averageLoadTime: averages.loadTime || 0,
      recommendations,
    };
  }
}

// Create a singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);
  const [averages, setAverages] = React.useState<Partial<PerformanceMetrics>>(
    {}
  );

  React.useEffect(() => {
    const unsubscribe = performanceMonitor.subscribe((newMetrics) => {
      setMetrics(newMetrics);
      setAverages(performanceMonitor.getAverageMetrics());
    });

    return unsubscribe;
  }, []);

  return {
    latestMetrics: metrics,
    averageMetrics: averages,
    insights: performanceMonitor.getInsights(),
    clear: () => performanceMonitor.clear(),
    enable: () => performanceMonitor.enable(),
    disable: () => performanceMonitor.disable(),
    isEnabled: performanceMonitor.isMonitoringEnabled(),
  };
}

// Performance measurement decorator for functions
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>) => {
    const endTiming = performanceMonitor.startTiming(name);
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.finally(() => endTiming());
      }
      endTiming();
      return result;
    } catch (error) {
      endTiming();
      throw error;
    }
  }) as T;
}
