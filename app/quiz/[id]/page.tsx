"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, CheckCircle2, X, ArrowRight, Loader2, BookOpen, Mic, RotateCcw } from "lucide-react"
import Link from "next/link"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import { useParams } from "next/navigation"

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Quiz {
  lessonId: string
  title: string
  questions: Question[]
}

const QUIZ_DATA: Record<string, Quiz> = {
  "math-101": {
    lessonId: "math-101",
    title: "Basic Arithmetic Quiz",
    questions: [
      {
        id: "1",
        question: "What is 15 + 23?",
        options: ["35", "38", "40", "42"],
        correct: 1,
        explanation: "To add 15 + 23, we add the ones place (5 + 3 = 8) and the tens place (1 + 2 = 3), giving us 38.",
      },
      {
        id: "2",
        question: "What is 50 - 17?",
        options: ["30", "32", "33", "35"],
        correct: 2,
        explanation: "When subtracting 50 - 17, we can think of it as 50 - 10 - 7 = 40 - 7 = 33.",
      },
      {
        id: "3",
        question: "What is 6 × 7?",
        options: ["40", "42", "44", "48"],
        correct: 1,
        explanation: "Multiplying 6 × 7 means adding 6 seven times: 6 + 6 + 6 + 6 + 6 + 6 + 6 = 42.",
      },
      {
        id: "4",
        question: "What is 48 ÷ 6?",
        options: ["6", "8", "9", "10"],
        correct: 1,
        explanation: "Division asks how many 6s go into 48. Since 6 × 8 = 48, the answer is 8.",
      },
      {
        id: "5",
        question: "Which property states that 3 + 5 = 5 + 3?",
        options: ["Associative", "Commutative", "Distributive", "Identity"],
        correct: 1,
        explanation: "The Commutative Property states that the order does not matter for addition and multiplication.",
      },
    ],
  },
  "math-102": {
    lessonId: "math-102",
    title: "Fractions and Decimals Quiz",
    questions: [
      {
        id: "1",
        question: "What fraction is equivalent to 0.5?",
        options: ["1/3", "1/2", "2/3", "3/4"],
        correct: 1,
        explanation: "0.5 means 5/10, which simplifies to 1/2.",
      },
      {
        id: "2",
        question: "What is 1/4 as a decimal?",
        options: ["0.2", "0.25", "0.3", "0.5"],
        correct: 1,
        explanation: "1/4 means dividing 1 by 4, which equals 0.25.",
      },
      {
        id: "3",
        question: "What is 3/4 + 1/4?",
        options: ["4/8", "1", "5/4", "2"],
        correct: 1,
        explanation: "When adding fractions with the same denominator, add the numerators: (3 + 1)/4 = 4/4 = 1.",
      },
      {
        id: "4",
        question: "Convert 1 1/2 to an improper fraction.",
        options: ["2/2", "3/2", "4/2", "5/2"],
        correct: 1,
        explanation: "1 1/2 = (1 × 2 + 1)/2 = 3/2.",
      },
      {
        id: "5",
        question: "Which decimal is the largest?",
        options: ["0.45", "0.54", "0.4", "0.5"],
        correct: 1,
        explanation: "Comparing decimals: 0.54 is larger than 0.5, 0.5 is larger than 0.45, and 0.4 is the smallest.",
      },
    ],
  },
  "science-101": {
    lessonId: "science-101",
    title: "Life Sciences Basics Quiz",
    questions: [
      {
        id: "1",
        question: "What is the basic unit of life?",
        options: ["Atom", "Cell", "Molecule", "Organism"],
        correct: 1,
        explanation: "The cell is the smallest unit of life and is the building block of all living organisms.",
      },
      {
        id: "2",
        question: "Which organelle produces energy for the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"],
        correct: 1,
        explanation:
          "Mitochondria is known as the powerhouse of the cell because it produces energy through cellular respiration.",
      },
      {
        id: "3",
        question: "What is the main function of the cell nucleus?",
        options: ["Make proteins", "Control cell activities", "Produce energy", "Store water"],
        correct: 1,
        explanation: "The nucleus contains DNA and controls all cell activities, including growth and reproduction.",
      },
      {
        id: "4",
        question: "Which is an example of a unicellular organism?",
        options: ["Bacteria", "Cat", "Plant", "Human"],
        correct: 0,
        explanation:
          "Bacteria are single-celled organisms (unicellular), while cats, plants, and humans are multicellular.",
      },
      {
        id: "5",
        question: "What are the living and non-living things in an area called together?",
        options: ["Community", "Ecosystem", "Population", "Habitat"],
        correct: 1,
        explanation: "An ecosystem includes both the living organisms (biotic) and the physical environment (abiotic).",
      },
    ],
  },
  "science-102": {
    lessonId: "science-102",
    title: "Physics Fundamentals Quiz",
    questions: [
      {
        id: "1",
        question: "According to Newton's First Law, what happens to an object at rest?",
        options: [
          "It must move",
          "It stays at rest unless acted upon by force",
          "It accelerates",
          "It changes direction",
        ],
        correct: 1,
        explanation:
          "Newton's First Law of Motion states that objects at rest remain at rest unless an external force acts on them.",
      },
      {
        id: "2",
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correct: 1,
        explanation:
          "The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kg of mass at 1 m/s².",
      },
      {
        id: "3",
        question: "What type of energy does a moving object have?",
        options: ["Potential energy", "Kinetic energy", "Heat energy", "Chemical energy"],
        correct: 1,
        explanation: "Kinetic energy is the energy of motion. A moving object possesses kinetic energy.",
      },
      {
        id: "4",
        question: "If you push twice as hard on an object, what happens to the force?",
        options: ["It stays the same", "It doubles", "It halves", "It becomes negative"],
        correct: 1,
        explanation: "Force is directly proportional to the push you apply. Pushing twice as hard doubles the force.",
      },
      {
        id: "5",
        question: "Which is a simple machine?",
        options: ["Computer", "Television", "Lever", "Microwave"],
        correct: 2,
        explanation:
          "A lever is a simple machine that changes the direction or magnitude of force to make work easier.",
      },
    ],
  },
  "english-101": {
    lessonId: "english-101",
    title: "Grammar Essentials Quiz",
    questions: [
      {
        id: "1",
        question: 'What part of speech is "quickly" in "She ran quickly"?',
        options: ["Noun", "Verb", "Adverb", "Adjective"],
        correct: 2,
        explanation: 'An adverb describes a verb or adjective. "Quickly" describes how she ran.',
      },
      {
        id: "2",
        question: "Which sentence is grammatically correct?",
        options: ["The dog are running", "The dogs is running", "The dog is running", "The dog run"],
        correct: 2,
        explanation: "Subject-verb agreement requires a singular subject with a singular verb and plural with plural.",
      },
      {
        id: "3",
        question: 'What does an apostrophe show in "Maria\'s book"?',
        options: ["Plural", "Possession", "Contraction", "Quotation"],
        correct: 1,
        explanation: 'An apostrophe followed by "s" shows possession. The book belongs to Maria.',
      },
      {
        id: "4",
        question: "Which punctuation mark ends an exclamatory sentence?",
        options: ["Period", "Question mark", "Exclamation point", "Comma"],
        correct: 2,
        explanation: "An exclamation point (!) expresses strong emotion and ends an exclamatory sentence.",
      },
      {
        id: "5",
        question: 'What is the verb in "The cat sleeps peacefully"?',
        options: ["cat", "sleeps", "peacefully", "the"],
        correct: 1,
        explanation: 'A verb shows action or state of being. "Sleeps" is the action the cat is performing.',
      },
    ],
  },
  "history-101": {
    lessonId: "history-101",
    title: "World History Overview Quiz",
    questions: [
      {
        id: "1",
        question: "Which civilization is known for building the pyramids?",
        options: ["Greece", "Egypt", "Rome", "China"],
        correct: 1,
        explanation: "Ancient Egypt is famous for its pyramids, which were built as monumental tombs for pharaohs.",
      },
      {
        id: "2",
        question: "What was the Industrial Revolution?",
        options: [
          "A war between nations",
          "A shift to machine-based production",
          "An art movement",
          "A political system",
        ],
        correct: 1,
        explanation:
          "The Industrial Revolution (1750-1850) marked a shift from agricultural to machine-based production.",
      },
      {
        id: "3",
        question: "Which ancient civilization created democracy?",
        options: ["Rome", "Egypt", "Greece", "Persia"],
        correct: 2,
        explanation: "Ancient Greece, particularly Athens, is credited with developing the concept of democracy.",
      },
      {
        id: "4",
        question: "What was the Renaissance?",
        options: ["A scientific discovery", "A rebirth of learning and art", "A war", "A trade route"],
        correct: 1,
        explanation: "The Renaissance (1300-1600) was a period of rebirth of learning, art, and culture in Europe.",
      },
      {
        id: "5",
        question: "When did World War II occur?",
        options: ["1914-1918", "1939-1945", "1900-1920", "1950-1960"],
        correct: 1,
        explanation: "World War II lasted from 1939 to 1945 and significantly changed world politics.",
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const lessonId = params.id as string
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false)
  const [theme, setTheme] = useState("light")
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [mounted, setMounted] = useState(false)
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

    const quizData = QUIZ_DATA[lessonId]
    if (quizData) {
      setQuiz(quizData)
      setSelectedAnswers(new Array(quizData.questions.length).fill(null))
    }

    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()
        // Simple voice recognition for answer selection
        const answerMap: Record<string, number> = {
          first: 0,
          a: 0,
          one: 0,
          second: 1,
          b: 1,
          two: 1,
          third: 2,
          c: 2,
          three: 2,
          fourth: 3,
          d: 3,
          four: 3,
        }
        const answer = answerMap[transcript]
        if (answer !== undefined) {
          handleAnswerSelect(answer)
        }
      }
    }
  }, [lessonId])

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

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = index
    setSelectedAnswers(newAnswers)
  }

  const handleSpeakQuestion = () => {
    const question = quiz?.questions[currentQuestion]
    if (!question) return

    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel()
      setIsSpeakingQuestion(false)
      return
    }

    const text = `${question.question}. Options: ${question.options.map((opt, i) => `${i + 1}. ${opt}`).join(". ")}`
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsSpeakingQuestion(false)
    window.speechSynthesis.speak(utterance)
    setIsSpeakingQuestion(true)
  }

  const handleVoiceAnswer = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser.")
      return
    }
    recognitionRef.current.start()
  }

  const handleSubmitQuiz = () => {
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return answer === quiz!.questions[index].correct ? count + 1 : count
    }, 0)

    const percentage = Math.round((correctCount / quiz!.questions.length) * 100)

    // Save quiz results
    const progress = JSON.parse(localStorage.getItem("lessonProgress") || "{}")
    progress[lessonId] = {
      completed: true,
      score: percentage,
      date: new Date().toISOString(),
    }
    localStorage.setItem("lessonProgress", JSON.stringify(progress))

    setShowResults(true)
  }

  if (!mounted || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const correctCount = selectedAnswers.reduce((count, answer, index) => {
    return answer === quiz.questions[index].correct ? count + 1 : count
  }, 0)
  const percentage = Math.round((correctCount / quiz.questions.length) * 100)

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 focus-ring rounded-lg p-1 inline-block">
            <BookOpen size={20} />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="font-bold text-lg sm:text-xl mt-2">{quiz.title}</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <>
            {/* Progress */}
            <Card className="glass mb-6 border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Question */}
            <Card className="glass mb-8 border-white/20">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>{question.question}</CardTitle>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={handleSpeakQuestion}>
                    <Volume2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition focus-ring ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-muted/50"
                      }`}
                      aria-pressed={selectedAnswers[currentQuestion] === index}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index ? "border-primary bg-primary" : "border-border"
                          }`}
                        >
                          {selectedAnswers[currentQuestion] === index && (
                            <span className="text-primary-foreground font-bold">✓</span>
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <Button onClick={handleVoiceAnswer} variant="outline" className="w-full mt-6 gap-2 bg-transparent">
                  <Mic size={16} />
                  Say Your Answer
                </Button>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex-1"
              >
                Previous
              </Button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <Button onClick={handleSubmitQuiz} disabled={selectedAnswers.includes(null)} className="flex-1">
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="flex-1 gap-2">
                  Next <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <Card className="glass border-white/20">
              <CardHeader className="text-center">
                <div className="mb-4">
                  {percentage >= 70 ? (
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  ) : (
                    <X className="w-16 h-16 text-destructive mx-auto mb-4" />
                  )}
                </div>
                <CardTitle className="text-3xl">{percentage}%</CardTitle>
                <CardDescription>
                  {percentage >= 70
                    ? "Great job! You passed the quiz."
                    : "Keep practicing! Review the lesson and try again."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Score Details</p>
                    <p className="text-2xl font-bold">
                      {correctCount} / {quiz.questions.length} Correct
                    </p>
                  </div>

                  {/* Review Answers */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Review Your Answers</h3>
                    {quiz.questions.map((q, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <p className="font-medium mb-2">{q.question}</p>
                        <div className="space-y-2 text-sm">
                          <p className={selectedAnswers[index] === q.correct ? "text-primary" : "text-destructive"}>
                            Your answer: {q.options[selectedAnswers[index]!]}
                          </p>
                          {selectedAnswers[index] !== q.correct && (
                            <p className="text-primary">Correct answer: {q.options[q.correct]}</p>
                          )}
                          <p className="text-muted-foreground">{q.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setCurrentQuestion(0)
                        setSelectedAnswers(new Array(quiz.questions.length).fill(null))
                        setShowResults(false)
                      }}
                      className="flex-1"
                      variant="outline"
                      className="gap-2"
                    >
                      <RotateCcw size={16} />
                      Retake Quiz
                    </Button>
                    <Link href="/dashboard" className="flex-1 focus-ring rounded-lg">
                      <Button className="w-full">Back to Dashboard</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="max-x-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>Quiz Performance Saved to Your Profile</p>
        </div>
      </footer>
    </div>
  )
}
