"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, RefreshCw, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function ServiceWorkerRegistration() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);

            // Check for updates
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    setUpdateAvailable(true);
                  }
                });
              }
            });
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }

    // Check if app is already installed
    if (
      window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);

      // Show install prompt after a short delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for appinstalled event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
      setShowInstallPrompt(false);
    }
  };

  const handleUpdateClick = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
          window.location.reload();
        }
      });
    }
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
  };

  // Don't show prompts if app is already installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Install Prompt */}
      {showInstallPrompt && isInstallable && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Download className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">
                    Install Light Switch Puzzle
                  </h3>
                  <p className="text-gray-300 text-xs mt-1">
                    Install the app for a better experience with offline play
                    and quick access.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={handleInstallClick}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
                    >
                      Install
                    </Button>
                    <Button
                      onClick={dismissInstallPrompt}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 px-3 py-1 text-xs"
                    >
                      Later
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={dismissInstallPrompt}
                  size="sm"
                  variant="ghost"
                  className="p-1 h-auto text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Update Available Prompt */}
      {updateAvailable && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-600 p-2 rounded-full">
                  <RefreshCw className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">
                    Update Available
                  </h3>
                  <p className="text-gray-300 text-xs mt-1">
                    A new version of the app is available with improvements and
                    bug fixes.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={handleUpdateClick}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs"
                    >
                      Update Now
                    </Button>
                    <Button
                      onClick={() => setUpdateAvailable(false)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 px-3 py-1 text-xs"
                    >
                      Later
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => setUpdateAvailable(false)}
                  size="sm"
                  variant="ghost"
                  className="p-1 h-auto text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
