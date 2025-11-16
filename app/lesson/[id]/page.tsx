"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, Mic, Globe, ArrowLeft, ArrowRight, CheckCircle, Loader2, Pause, RotateCcw, Hand } from "lucide-react"
import Link from "next/link"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import { useParams } from "next/navigation"

interface LessonContent {
  id: string
  title: string
  subject: string
  content: string
  nextLessonId?: string
  prevLessonId?: string
}

const LESSON_CONTENT: Record<string, LessonContent> = {
  "math-101": {
    id: "math-101",
    title: "Basic Arithmetic",
    subject: "Math",
    content: `
      Arithmetic is the foundation of mathematics. It deals with basic operations on numbers.

      The Four Basic Operations:
      1. Addition - Combining numbers to find the total. Example: 5 + 3 = 8
      2. Subtraction - Finding the difference between numbers. Example: 8 - 3 = 5
      3. Multiplication - Repeated addition of numbers. Example: 4 × 3 = 12
      4. Division - Splitting numbers into equal parts. Example: 12 ÷ 3 = 4

      Properties of Arithmetic:
      • Commutative Property: a + b = b + a (order doesn't matter for addition and multiplication)
      • Associative Property: (a + b) + c = a + (b + c)
      • Distributive Property: a × (b + c) = (a × b) + (a × c)

      Practice Tips:
      Use real-world examples like counting objects or sharing items equally. Start with small numbers and gradually increase complexity.
    `,
    nextLessonId: "math-102",
  },
  "math-102": {
    id: "math-102",
    title: "Fractions and Decimals",
    subject: "Math",
    content: `
      Fractions and decimals are ways to represent parts of whole numbers.

      Understanding Fractions:
      A fraction consists of two parts: numerator (top) and denominator (bottom).
      - The numerator tells you how many parts you have.
      - The denominator tells you how many equal parts the whole is divided into.
      Example: 3/4 means you have 3 parts out of 4 equal parts.

      Types of Fractions:
      1. Proper fractions: numerator < denominator (example: 2/3)
      2. Improper fractions: numerator ≥ denominator (example: 5/3)
      3. Mixed numbers: whole number + fraction (example: 1 2/3)

      Understanding Decimals:
      Decimals are another way to write fractions with denominators of 10, 100, 1000, etc.
      - 0.5 = 5/10 = 1/2
      - 0.25 = 25/100 = 1/4
      - 0.75 = 75/100 = 3/4

      Converting Between Fractions and Decimals:
      To convert a fraction to a decimal, divide the numerator by the denominator.
      To convert a decimal to a fraction, count the decimal places and use that as your denominator.
    `,
    prevLessonId: "math-101",
    nextLessonId: "science-101",
  },
  "science-101": {
    id: "science-101",
    title: "Life Sciences Basics",
    subject: "Science",
    content: `
      Life science, or biology, is the study of living organisms and how they interact with their environment.

      What is Life?
      Living things have certain characteristics:
      1. Organization - Living things have organized structures made of cells
      2. Metabolism - They perform chemical reactions for energy
      3. Growth - They increase in size and complexity
      4. Reproduction - They create offspring
      5. Response to Environment - They react to their surroundings
      6. Adaptation - They change over time to survive better

      The Cell:
      The cell is the basic unit of life. All living things are made of one or more cells.
      - Unicellular organisms have only one cell
      - Multicellular organisms have many cells

      Cell Structures:
      • Nucleus - Contains genetic material (DNA) and controls cell activities
      • Mitochondria - Produces energy for the cell (powerhouse)
      • Cell Membrane - Controls what enters and exits the cell
      • Cytoplasm - Gel-like substance where organelles float

      Ecosystems:
      An ecosystem is a community of organisms and their physical environment working together.
      Key relationships include predator-prey, producer-consumer, and decomposer interactions.
    `,
    prevLessonId: "math-102",
    nextLessonId: "science-102",
  },
  "science-102": {
    id: "science-102",
    title: "Physics Fundamentals",
    subject: "Science",
    content: `
      Physics is the study of matter, energy, and the forces that act on objects.

      Motion and Forces:
      Motion is a change in position over time. Forces cause changes in motion.
      Newton's Laws of Motion:
      1. Objects at rest stay at rest, and moving objects stay in motion unless acted upon by force
      2. Force equals mass times acceleration (F = ma)
      3. For every action, there is an equal and opposite reaction

      Energy:
      Energy is the ability to do work. There are different types:
      • Kinetic Energy - Energy of motion (moving objects)
      • Potential Energy - Energy stored based on position or composition
      • Heat Energy - From temperature differences
      • Light Energy - From electromagnetic waves
      • Sound Energy - From vibrations

      Work and Power:
      Work = Force × Distance
      Power = Work / Time

      Simple Machines:
      Tools that help us do work more easily:
      • Levers - change the direction of force
      • Pulleys - lift objects using ropes
      • Inclined Planes - reduce the force needed
      • Screws - convert rotational motion
      • Wedges - split objects
    `,
    prevLessonId: "science-101",
  },
  "english-101": {
    id: "english-101",
    title: "Grammar Essentials",
    subject: "English",
    content: `
      Grammar is the system of rules that governs how we use language effectively.

      Parts of Speech:
      1. Nouns - Names of people, places, things, or ideas
      2. Verbs - Words that show action or state of being
      3. Adjectives - Words that describe nouns
      4. Adverbs - Words that describe verbs or adjectives
      5. Pronouns - Words that replace nouns
      6. Prepositions - Words that show relationships in space or time
      7. Conjunctions - Words that connect other words or phrases
      8. Interjections - Words that express emotion

      Sentence Structure:
      A complete sentence needs a subject (who/what) and a predicate (what they do).
      Example: "The cat sleeps." (Cat = subject, sleeps = predicate)

      Verb Tenses:
      • Present - happening now
      • Past - already happened
      • Future - will happen
      • Progressive - ongoing action
      • Perfect - completed before another time

      Punctuation Rules:
      • Period (.) - End of sentence
      • Comma (,) - Pause in sentence
      • Question Mark (?) - End of question
      • Exclamation Point (!) - Strong emotion
      • Quotation Marks ("") - Exact words spoken
      • Apostrophe (') - Possession or contraction
    `,
  },
  "history-101": {
    id: "history-101",
    title: "World History Overview",
    subject: "History",
    content: `
      History is the study of past events, people, and civilizations that shaped our world.

      Major Historical Periods:
      1. Ancient History - Human civilization's earliest forms (3000 BCE - 500 CE)
      2. Medieval Period - Middle Ages in Europe (500 - 1500 CE)
      3. Renaissance - Rebirth of learning and art (1300 - 1600)
      4. Age of Exploration - Discovery and colonization (1400s - 1600s)
      5. Industrial Revolution - Shift to machine-based production (1750 - 1850)
      6. Modern Era - Contemporary times

      Great Civilizations:
      • Egypt - Known for pyramids, hieroglyphics, and Nile River
      • Greece - Birthplace of democracy, philosophy, and Olympics
      • Rome - Vast empire with advanced engineering and government
      • China - Ancient innovations like papermaking and gunpowder
      • Americas - Indigenous civilizations like Maya and Aztec

      World Wars:
      World War I (1914-1918) and World War II (1939-1945) significantly changed global politics and society.

      Key Historical Concepts:
      • Cause and Effect - Understanding why events happened
      • Change Over Time - How societies evolve
      • Primary vs Secondary Sources - Original documents vs. interpretations
      • Perspectives - Different viewpoints of historical events
    `,
    nextLessonId: "math-101",
  },
}

const SIGN_LANGUAGE_RESOURCES = {
  "math-101": {
    title: "Basic Arithmetic in ASL",
    description: "Learn arithmetic operations using American Sign Language",
    videoUrl: "https://www.youtube.com/embed/Bq9Jw8ofSZ4", // Placeholder
    interpreterLink: "https://www.lifeprint.com", // ASL learning resource
  },
  "math-102": {
    title: "Fractions and Decimals in ASL",
    description: "Understanding fractions using visual sign language demonstrations",
    videoUrl: "https://www.youtube.com/embed/Owiklmh7o34",
    interpreterLink: "https://www.lifeprint.com",
  },
  "science-101": {
    title: "Life Sciences in ASL",
    description: "Biology concepts explained through American Sign Language",
    videoUrl: "https://www.youtube.com/embed/cY4W_1_zEhA",
    interpreterLink: "https://www.lifeprint.com",
  },
  "science-102": {
    title: "Physics Fundamentals in ASL",
    description: "Physics concepts with visual ASL demonstrations",
    videoUrl: "https://www.youtube.com/embed/GA3g0pGw_N4",
    interpreterLink: "https://www.lifeprint.com",
  },
  "english-101": {
    title: "Grammar Essentials in ASL",
    description: "Grammar rules explained using American Sign Language",
    videoUrl: "https://www.youtube.com/embed/_tM3Ebuflng",
    interpreterLink: "https://www.lifeprint.com",
  },
  "history-101": {
    title: "World History Overview in ASL",
    description: "Historical events and periods presented in American Sign Language",
    videoUrl: "https://www.youtube.com/embed/_LFOmsBDJ4A",
    interpreterLink: "https://www.lifeprint.com",
  },
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.id as string
  const [lesson, setLesson] = useState<LessonContent | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [showTranslation, setShowTranslation] = useState(false)
  const [showSignLanguage, setShowSignLanguage] = useState(false)
  const [theme, setTheme] = useState("light")
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [mounted, setMounted] = useState(false)
  const [signLanguageUrl, setSignLanguageUrl] = useState("")

  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    const savedContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = localStorage.getItem("fontSize") || "normal"

    setTheme(savedTheme)
    setHighContrast(savedContrast)
    setFontSize(savedFontSize)
    applyTheme(savedTheme, savedContrast, savedFontSize)

    // Load lesson
    const foundLesson = LESSON_CONTENT[lessonId]
    setLesson(foundLesson || null)

    const signLanguageResource = SIGN_LANGUAGE_RESOURCES[lessonId] as any
    if (signLanguageResource) {
      setSignLanguageUrl(signLanguageResource.videoUrl)
    }

    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [lessonId])

  useEffect(() => {
    if (!recognitionRef.current) return

    recognitionRef.current.onresult = (event: any) => {
      let interim = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.toLowerCase().trim()
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + " ")

          if (transcript.includes("next")) {
            if (lesson?.nextLessonId) {
              console.log("[v0] Voice command detected: next, navigating to", lesson.nextLessonId)
              router.push(`/lesson/${lesson.nextLessonId}`)
            }
          }

          if (transcript.includes("prev") || transcript.includes("previous")) {
            if (lesson?.prevLessonId) {
              console.log("[v0] Voice command detected: prev, navigating to", lesson.prevLessonId)
              router.push(`/lesson/${lesson.prevLessonId}`)
            } else {
              router.push("/dashboard")
            }
          }
        } else {
          interim += transcript
        }
      }
    }
  }, [lesson, router])

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

  // Text-to-Speech
  const handleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause()
      setIsSpeaking(false)
      return
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
      setIsSpeaking(true)
      return
    }

    window.speechSynthesis.cancel()

    const textToSpeak = showTranslation ? translatedText : lesson?.content || ""
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1
    utterance.onend = () => setIsSpeaking(false)

    speechSynthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  // Speech-to-Text
  const handleSpeechToText = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in your browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      setTranscript("")
      recognitionRef.current.start()
    }
  }

  // Translation
  const handleTranslate = async () => {
    if (translatedText) {
      setShowTranslation(!showTranslation)
      return
    }

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: lesson?.content,
          targetLanguage: "es", // Spanish
        }),
      })

      const data = await response.json()
      setTranslatedText(data.translatedText)
      setShowTranslation(true)
    } catch (error) {
      console.error("Translation error:", error)
      alert("Translation service is unavailable. Using original text.")
    }
  }

  const completeLesson = () => {
    const progress = JSON.parse(localStorage.getItem("lessonProgress") || "{}")
    progress[lessonId] = { completed: true, score: 100, date: new Date().toISOString() }
    localStorage.setItem("lessonProgress", JSON.stringify(progress))
    alert("Lesson completed! Redirecting to Quiz...")
  }

  if (!mounted || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    )
  }

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 focus-ring rounded-lg p-1">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <div className="text-center flex-1">
            <h1 className="font-bold text-lg sm:text-xl">{lesson.title}</h1>
          </div>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson Controls */}
        <Card className="glass mb-8 border-white/20">
          <CardHeader>
            <CardTitle>Accessibility Tools</CardTitle>
            <CardDescription>Use these tools to customize your learning experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-4 gap-3">
              <Button onClick={handleTextToSpeech} className="gap-2" variant={isSpeaking ? "default" : "outline"}>
                {isSpeaking ? <Pause size={18} /> : <Volume2 size={18} />}
                {isSpeaking ? "Pause" : "Listen"}
              </Button>

              <Button onClick={handleSpeechToText} className="gap-2" variant={isListening ? "default" : "outline"}>
                {isListening ? <Loader2 size={18} className="animate-spin" /> : <Mic size={18} />}
                {isListening ? "Listening..." : "Voice Input"}
              </Button>

              <Button onClick={handleTranslate} className="gap-2" variant={showTranslation ? "default" : "outline"}>
                <Globe size={18} />
                {translatedText ? "Translate" : "Translate"}
              </Button>

              <Button
                onClick={() => setShowSignLanguage(!showSignLanguage)}
                className="gap-2"
                variant={showSignLanguage ? "default" : "outline"}
              >
                <Hand size={18} />
                {showSignLanguage ? "Hide Sign" : "Sign Lang"}
              </Button>
            </div>

            {transcript && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Your Voice Input:</p>
                <p className="text-foreground">{transcript}</p>
                <Button size="sm" variant="ghost" className="mt-2 gap-2" onClick={() => setTranscript("")}>
                  <RotateCcw size={16} />
                  Clear
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sign Language Video Section */}
        {showSignLanguage && (
          <Card className="glass mb-8 border-white/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hand size={20} />
                Sign Language Interpretation
              </CardTitle>
              <CardDescription>
                {SIGN_LANGUAGE_RESOURCES[lessonId]?.description || "American Sign Language (ASL) interpretation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signLanguageUrl && (
                  <div className="bg-black/30 rounded-lg overflow-hidden aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={signLanguageUrl}
                      title="Sign Language Interpretation"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {SIGN_LANGUAGE_RESOURCES[lessonId]?.interpreterLink && (
                    <a
                      href={SIGN_LANGUAGE_RESOURCES[lessonId]?.interpreterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg hover:bg-blue-500/30 transition-colors focus-ring"
                    >
                      <p className="font-medium text-sm mb-1">Learn ASL Online</p>
                      <p className="text-xs text-muted-foreground">Visit Lifeprint.com for free ASL lessons</p>
                    </a>
                  )}

                  <a
                    href="https://www.nad.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-cyan-500/20 border border-cyan-400/50 rounded-lg hover:bg-cyan-500/30 transition-colors focus-ring"
                  >
                    <p className="font-medium text-sm mb-1">NAD Resources</p>
                    <p className="text-xs text-muted-foreground">National Association of the Deaf</p>
                  </a>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg text-sm">
                  <p className="font-medium text-foreground mb-2">Sign Language Support:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>American Sign Language (ASL) video interpretations available</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>Professional interpreters for complex concepts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>Synchronized with lesson content for better understanding</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>Additional resources from Deaf community organizations</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Need a Live Interpreter?</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    AccessiLearn partners with professional sign language interpreters for personalized learning
                    sessions.
                  </p>
                  <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                    <a href="https://www.vli.com" target="_blank" rel="noopener noreferrer">
                      Book a Professional Interpreter
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lesson Content */}
        <Card className="glass mb-8 border-white/20">
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
            <CardDescription>{lesson.subject}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {showTranslation ? translatedText : lesson.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation and Quiz Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href={lesson.prevLessonId ? `/lesson/${lesson.prevLessonId}` : "/dashboard"}
            className="flex-1 focus-ring rounded-lg"
          >
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <ArrowLeft size={18} />
              Previous
            </Button>
          </Link>

          <Link href={`/quiz/${lessonId}`} className="flex-1 focus-ring rounded-lg">
            <Button className="w-full gap-2">
              <CheckCircle size={18} />
              Take Quiz
            </Button>
          </Link>

          <Link
            href={lesson.nextLessonId ? `/lesson/${lesson.nextLessonId}` : "/dashboard"}
            className="flex-1 focus-ring rounded-lg"
          >
            <Button className="w-full gap-2">
              Next
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="max-x-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>Lesson: {lesson.subject} | Using accessibility features</p>
        </div>
      </footer>
    </div>
  )
}
