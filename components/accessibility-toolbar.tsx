"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Contrast as Contrast2, X, Menu } from "lucide-react"

interface AccessibilityToolbarProps {
  theme: string
  onThemeToggle: () => void
  highContrast: boolean
  onContrastToggle: () => void
  fontSize: string
  onFontSizeChange: (size: string) => void
}

export default function AccessibilityToolbar({
  theme,
  onThemeToggle,
  highContrast,
  onContrastToggle,
  fontSize,
  onFontSizeChange,
}: AccessibilityToolbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Toolbar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle accessibility menu"
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition flex items-center justify-center focus-ring"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Toolbar Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-8 z-50 glass rounded-2xl p-6 w-80 border-white/20 shadow-2xl"
          role="region"
          aria-label="Accessibility controls"
        >
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wide">Accessibility Options</h3>

          <div className="space-y-4">
            {/* Theme Toggle */}
            <div>
              <label className="text-sm font-medium block mb-2">Theme</label>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={onThemeToggle}
                  aria-pressed={theme === "light"}
                >
                  <Sun size={16} /> Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={onThemeToggle}
                  aria-pressed={theme === "dark"}
                >
                  <Moon size={16} /> Dark
                </Button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div>
              <label className="text-sm font-medium block mb-2">Contrast</label>
              <Button
                variant={highContrast ? "default" : "outline"}
                className="w-full gap-2"
                onClick={onContrastToggle}
                aria-pressed={highContrast}
              >
                <Contrast2 size={16} /> {highContrast ? "High Contrast ON" : "High Contrast OFF"}
              </Button>
            </div>

            {/* Font Size Controls */}
            <div>
              <label className="text-sm font-medium block mb-2">Text Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Small", value: "small", icon: "A" },
                  { label: "Normal", value: "normal", icon: "A" },
                  { label: "Large", value: "large", icon: "A" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onFontSizeChange(option.value)}
                    aria-pressed={fontSize === option.value}
                    className={`p-2 rounded-lg border transition text-xs font-medium focus-ring ${
                      fontSize === option.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <span
                      className={
                        option.value === "small" ? "text-xs" : option.value === "large" ? "text-lg" : "text-base"
                      }
                    >
                      {option.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Large Option */}
            <div>
              <Button
                variant={fontSize === "extra-large" ? "default" : "outline"}
                className="w-full"
                onClick={() => onFontSizeChange("extra-large")}
                aria-pressed={fontSize === "extra-large"}
              >
                Extra Large Text
              </Button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              💡 Tip: Use keyboard shortcuts with Tab to navigate and Enter to select.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
