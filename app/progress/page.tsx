"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { BookOpen, CheckCircle, Download, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import AccessibilityToolbar from "@/components/accessibility-toolbar"

interface LessonProgress {
  completed: boolean
  score?: number
  date?: string
}

interface ProgressData {
  [key: string]: LessonProgress
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData>({})
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

    const saved = localStorage.getItem("lessonProgress")
    if (saved) {
      setProgressData(JSON.parse(saved))
    }
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

  // Calculate statistics
  const totalLessons = Object.keys(progressData).length
  const completedLessons = Object.values(progressData).filter((p) => p.completed).length
  const averageScore =
    completedLessons > 0
      ? Math.round(
          Object.values(progressData)
            .filter((p) => p.completed && p.score)
            .reduce((sum, p) => sum + (p.score || 0), 0) / completedLessons,
        )
      : 0

  // Prepare chart data
  const chartData = Object.entries(progressData)
    .filter(([_, p]) => p.completed && p.score)
    .map(([lessonId, p]) => ({
      name: lessonId.replace("-", " "),
      score: p.score || 0,
    }))
    .sort((a, b) => b.score - a.score)

  const progressTimeline = Object.entries(progressData)
    .filter(([_, p]) => p.date)
    .map(([lessonId, p]) => ({
      date: new Date(p.date!).toLocaleDateString(),
      score: p.score || 0,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
            <BookOpen className="text-primary" size={24} />
            <span className="font-bold text-xl hidden sm:inline">AccessiLearn</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 focus-ring rounded-lg p-2">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Learning Progress</h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lessons Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedLessons}</div>
              <p className="text-xs text-muted-foreground mt-2">of {totalLessons} total lessons</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground mt-2">Across all quizzes</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Math.round((completedLessons / (totalLessons || 1)) * 100)}%</div>
              <p className="text-xs text-muted-foreground mt-2">Course progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quiz Scores Chart */}
          {chartData.length > 0 && (
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>Your scores across completed lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Bar dataKey="score" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Progress Trend Chart */}
          {progressTimeline.length > 0 && (
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Progress Trend</CardTitle>
                <CardDescription>Your scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="var(--color-accent)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detailed Progress List */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>Your status and scores for each lesson</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(progressData).map(([lessonId, progress]) => (
                <div
                  key={lessonId}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {progress.completed ? (
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-border rounded-full flex-shrink-0"></div>
                    )}
                    <div>
                      <p className="font-medium">{lessonId.replace("-", " ").toUpperCase()}</p>
                      {progress.date && (
                        <p className="text-xs text-muted-foreground">{new Date(progress.date).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  {progress.completed && progress.score && (
                    <div className="text-right">
                      <p className="font-bold text-lg">{progress.score}%</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalLessons === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No progress yet. Start learning!</p>
                <Link href="/dashboard" className="focus-ring rounded-lg inline-block">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Options */}
        {completedLessons > 0 && (
          <Card className="glass border-white/20 mt-8">
            <CardHeader>
              <CardTitle>Export Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="gap-2 flex-1 bg-transparent"
                  onClick={() => {
                    const data = JSON.stringify(progressData, null, 2)
                    const element = document.createElement("a")
                    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`)
                    element.setAttribute("download", "accessilearn-progress.json")
                    element.style.display = "none"
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }}
                >
                  <Download size={16} />
                  Download Progress
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 flex-1 bg-transparent"
                  onClick={() => {
                    const text = `AccessiLearn Progress Report\n\nCompleted Lessons: ${completedLessons}/${totalLessons}\nAverage Score: ${averageScore}%\n\n${Object.entries(
                      progressData,
                    )
                      .map(([id, p]) => `${id}: ${p.completed ? p.score || "Completed" : "Not Started"}`)
                      .join("\n")}`
                    navigator.clipboard.writeText(text)
                    alert("Progress report copied to clipboard!")
                  }}
                >
                  <Share2 size={16} />
                  Copy Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AccessiLearn. Your data is saved locally on your device.</p>
        </div>
      </footer>
    </div>
  )
}
