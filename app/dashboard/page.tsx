"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import AccessibilityToolbar from "@/components/accessibility-toolbar"

interface Lesson {
  id: string
  title: string
  subject: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  completed: boolean
  score?: number
}

const LESSONS: Lesson[] = [
  {
    id: "math-101",
    title: "Basic Arithmetic",
    subject: "Math",
    description: "Learn the fundamentals of addition, subtraction, multiplication, and division.",
    difficulty: "beginner",
    completed: false,
  },
  {
    id: "math-102",
    title: "Fractions and Decimals",
    subject: "Math",
    description: "Master working with fractions and decimal numbers.",
    difficulty: "intermediate",
    completed: false,
  },
  {
    id: "science-101",
    title: "Life Sciences Basics",
    subject: "Science",
    description: "Introduction to cells, organisms, and ecosystems.",
    difficulty: "beginner",
    completed: false,
  },
  {
    id: "science-102",
    title: "Physics Fundamentals",
    subject: "Science",
    description: "Explore motion, forces, and energy.",
    difficulty: "intermediate",
    completed: false,
  },
  {
    id: "english-101",
    title: "Grammar Essentials",
    subject: "English",
    description: "Master sentence structure, parts of speech, and punctuation.",
    difficulty: "beginner",
    completed: false,
  },
  {
    id: "history-101",
    title: "World History Overview",
    subject: "History",
    description: "Discover major events and civilizations throughout history.",
    difficulty: "intermediate",
    completed: false,
  },
]

export default function DashboardPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [theme, setTheme] = useState("light")
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")
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

    // Load lessons with progress from localStorage
    const savedProgress = localStorage.getItem("lessonProgress")
    const progress = savedProgress ? JSON.parse(savedProgress) : {}

    const lessonsWithProgress = LESSONS.map((lesson) => ({
      ...lesson,
      completed: progress[lesson.id]?.completed || false,
      score: progress[lesson.id]?.score,
    }))

    setLessons(lessonsWithProgress)
  }, [])

  const applyTheme = (newTheme, contrast, size) => {
    const html = document.documentElement
    html.classList.remove("dark", "high-contrast", "text-sm", "text-base", "text-lg", "text-xl")

    if (newTheme === "dark") {
      html.classList.add("dark")
    }

    if (contrast) {
      html.classList.add("high-contrast")
    }

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

  const filteredLessons = filter === "all" ? lessons : lessons.filter((l) => l.difficulty === filter)
  const completedCount = lessons.filter((l) => l.completed).length
  const progressPercentage = Math.round((completedCount / lessons.length) * 100)

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            <span className="font-bold text-xl hidden sm:inline">AccessiLearn</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8 border-white/20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to Your Learning Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Select a lesson below and start learning. Your progress is automatically saved.
          </p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Your Progress</span>
              <span className="text-muted-foreground">
                {completedCount} of {lessons.length} lessons
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${progressPercentage}%`}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">{progressPercentage}% Complete</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Filter by Difficulty</h2>
          <div className="flex flex-wrap gap-2">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
              <Button
                key={level}
                variant={filter === level ? "default" : "outline"}
                onClick={() => setFilter(level)}
                className="capitalize focus-ring"
                aria-pressed={filter === level}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <section aria-label="Available lessons">
          <h2 className="text-2xl font-bold mb-6">Available Lessons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="focus-ring rounded-xl">
                <Card className="glass hover:shadow-lg transition h-full flex flex-col border-white/20 cursor-pointer group">
                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                            lesson.difficulty === "beginner"
                              ? "bg-primary/20 text-primary"
                              : lesson.difficulty === "intermediate"
                                ? "bg-accent/20 text-accent"
                                : "bg-secondary/20 text-secondary"
                          }`}
                        >
                          {lesson.difficulty}
                        </span>
                      </div>
                      {lesson.completed && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />}
                    </div>
                    <CardTitle className="group-hover:text-primary transition">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm">{lesson.subject}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>

                    <Button
                      className="w-full gap-2 group-hover:gap-3 transition-all"
                      asChild
                      onClick={(e) => e.preventDefault()}
                    >
                      <span>
                        {lesson.completed ? "Review Lesson" : "Start Lesson"}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No lessons available for this difficulty level.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AccessiLearn. Learning without barriers.</p>
        </div>
      </footer>
    </div>
  )
}
