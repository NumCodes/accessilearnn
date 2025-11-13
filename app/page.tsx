"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Contrast as Contrast2, Volume2, ArrowRight, BookOpen, Users, Zap } from "lucide-react"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import Link from "next/link"

export default function Home() {
  const [theme, setTheme] = useState("light")
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    const savedContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = localStorage.getItem("fontSize") || "normal"

    setTheme(savedTheme)
    setHighContrast(savedContrast)
    setFontSize(savedFontSize)

    applyTheme(savedTheme, savedContrast, savedFontSize)
  }, [])

  const applyTheme = (newTheme, contrast, size) => {
    const html = document.documentElement

    // Remove existing classes
    html.classList.remove("dark", "high-contrast", "text-sm", "text-base", "text-lg", "text-xl")

    // Apply theme
    if (newTheme === "dark") {
      html.classList.add("dark")
    }

    if (contrast) {
      html.classList.add("high-contrast")
    }

    // Apply font size
    switch (size) {
      case "small":
        html.classList.add("text-sm")
        break
      case "large":
        html.classList.add("text-lg")
        break
      case "extra-large":
        html.classList.add("text-xl")
        break
      default:
        html.classList.add("text-base")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme, highContrast, fontSize)
  }

  const toggleContrast = () => {
    const newContrast = !highContrast
    setHighContrast(newContrast)
    localStorage.setItem("highContrast", String(newContrast))
    applyTheme(theme, newContrast, fontSize)
  }

  const changeFontSize = (size) => {
    setFontSize(size)
    localStorage.setItem("fontSize", size)
    applyTheme(theme, highContrast, size)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col">
      {/* Accessibility Toolbar */}
      <AccessibilityToolbar
        theme={theme}
        onThemeToggle={toggleTheme}
        highContrast={highContrast}
        onContrastToggle={toggleContrast}
        fontSize={fontSize}
        onFontSizeChange={changeFontSize}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus-ring rounded-lg p-1">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="text-primary-foreground" size={24} />
            </div>
            <span className="font-bold text-xl">AccessiLearn</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition focus-ring rounded px-2 py-1"
            >
              Features
            </a>
            <a
              href="#mission"
              className="text-muted-foreground hover:text-foreground transition focus-ring rounded px-2 py-1"
            >
              Mission
            </a>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition focus-ring"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Education Without Barriers
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                AccessiLearn is an inclusive learning platform designed for everyone. Whether you have visual, auditory,
                or motor disabilities, our platform adapts to your needs.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard" className="focus-ring rounded-lg">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight size={18} />
                  </Button>
                </Link>
                <a href="#features" className="focus-ring rounded-lg">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Accessibility Features</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Designed with WCAG compliance in mind, our platform ensures everyone can learn effectively.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <Card className="glass hover:shadow-lg transition border-white/20">
                <CardHeader>
                  <Volume2 className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Text-to-Speech</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Listen to lessons with natural voice synthesis. Perfect for visual learners and those with reading
                    difficulties.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="glass hover:shadow-lg transition border-white/20">
                <CardHeader>
                  <Zap className="w-8 h-8 text-accent mb-2" />
                  <CardTitle>Keyboard Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Navigate the entire platform using only your keyboard. Full support for screen readers and assistive
                    technology.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="glass hover:shadow-lg transition border-white/20">
                <CardHeader>
                  <Contrast2 className="w-8 h-8 text-secondary mb-2" />
                  <CardTitle>High Contrast Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Switch to high-contrast mode for better visibility. Includes adjustable font sizes for comfortable
                    reading.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20 sm:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  We believe that education should be accessible to everyone, regardless of their abilities.
                  AccessiLearn removes barriers and creates an inclusive learning environment where all students can
                  thrive.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Built for Everyone</h3>
                      <p className="text-sm text-muted-foreground">Designed with diverse needs in mind from day one.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Adaptive Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        Customize your learning experience with accessibility tools.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-8 border-white/20">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Get Started Today</h3>
                  <p className="text-muted-foreground">
                    Explore our library of accessible lessons and begin your learning journey.
                  </p>
                  <Link href="/dashboard" className="focus-ring rounded-lg inline-block">
                    <Button className="w-full gap-2">
                      Enter Dashboard <ArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">AccessiLearn</h4>
              <p className="text-sm text-muted-foreground">Built for everyone. Education without barriers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition focus-ring rounded px-1"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition focus-ring rounded px-1"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Accessibility</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition focus-ring rounded px-1"
                  >
                    Statement
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition focus-ring rounded px-1"
                  >
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Credits</h4>
              <p className="text-sm text-muted-foreground">Made with accessibility in mind.</p>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 AccessiLearn. All rights reserved.</p>
            <p>Built for Everyone by Num Codes</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
