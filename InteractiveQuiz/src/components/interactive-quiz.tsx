import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Trophy, RotateCcw, Play, CheckCircle, XCircle, ArrowLeft, Star } from "lucide-react"
import { quizCategories, type Quiz } from "../lib/quiz-data"

// Quiz state interface for TypeScript
interface QuizState {
  currentQuestion: number
  selectedAnswers: (number | null)[]
  score: number
  timeRemaining: number
  isCompleted: boolean
  showResults: boolean
  showExplanation: boolean
}

// Initial quiz state
const getInitialState = (timeLimit: number): QuizState => ({
  currentQuestion: 0,
  selectedAnswers: [],
  score: 0,
  timeRemaining: timeLimit,
  isCompleted: false,
  showResults: false,
  showExplanation: false,
})

export default function InteractiveQuiz() {
  // Main state
  const [selectedCategory, setSelectedCategory] = useState<Quiz | null>(null)
  const [quizState, setQuizState] = useState<QuizState>(getInitialState(300))
  const [isStarted, setIsStarted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Load quiz state from localStorage on component mount
  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory")
    const savedState = localStorage.getItem("quizState")
    const savedIsStarted = localStorage.getItem("quizStarted")

    if (savedCategory) {
      try {
        const categoryId = JSON.parse(savedCategory)
        const category = quizCategories.find((cat) => cat.id === categoryId)
        if (category) {
          setSelectedCategory(category)
        }
      } catch (error) {
        console.error("Error parsing saved category:", error)
      }
    }

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        setQuizState(parsedState)
      } catch (error) {
        console.error("Error parsing saved quiz state:", error)
      }
    }

    if (savedIsStarted) {
      setIsStarted(JSON.parse(savedIsStarted))
    }
  }, [])

  // Save quiz state to localStorage whenever it changes
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory.id))
    }
    if (isStarted) {
      localStorage.setItem("quizState", JSON.stringify(quizState))
      localStorage.setItem("quizStarted", JSON.stringify(isStarted))
    }
  }, [selectedCategory, quizState, isStarted])

  // Timer effect - runs every second when quiz is active
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStarted && !quizState.isCompleted && quizState.timeRemaining > 0 && selectedCategory) {
      interval = setInterval(() => {
        setQuizState((prev) => {
          const newTimeRemaining = prev.timeRemaining - 1

          // Auto-complete quiz when time runs out
          if (newTimeRemaining <= 0) {
            return {
              ...prev,
              timeRemaining: 0,
              isCompleted: true,
              showResults: true,
            }
          }

          return {
            ...prev,
            timeRemaining: newTimeRemaining,
          }
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isStarted, quizState.isCompleted, quizState.timeRemaining, selectedCategory])

  // Format time display (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Select a quiz category
  const selectCategory = (category: Quiz) => {
    setSelectedCategory(category)
    const initialState = getInitialState(category.timeLimit)
    initialState.selectedAnswers = new Array(category.questions.length).fill(null)
    setQuizState(initialState)
    setIsStarted(false)
    setShowFeedback(false)
  }

  // Start the quiz
  const startQuiz = () => {
    if (!selectedCategory) return
    setIsStarted(true)
    const initialState = getInitialState(selectedCategory.timeLimit)
    initialState.selectedAnswers = new Array(selectedCategory.questions.length).fill(null)
    setQuizState(initialState)
  }

  // Reset to category selection
  const resetToCategories = () => {
    setSelectedCategory(null)
    setQuizState(getInitialState(300))
    setIsStarted(false)
    setShowFeedback(false)
    localStorage.removeItem("selectedCategory")
    localStorage.removeItem("quizState")
    localStorage.removeItem("quizStarted")
  }

  // Reset the current quiz
  const resetQuiz = () => {
    if (!selectedCategory) return
    const initialState = getInitialState(selectedCategory.timeLimit)
    initialState.selectedAnswers = new Array(selectedCategory.questions.length).fill(null)
    setQuizState(initialState)
    setIsStarted(false)
    setShowFeedback(false)
    localStorage.removeItem("quizState")
    localStorage.removeItem("quizStarted")
  }

  // Handle answer selection
  const selectAnswer = (answerIndex: number) => {
    if (quizState.isCompleted || !selectedCategory) return

    setQuizState((prev) => {
      const newSelectedAnswers = [...prev.selectedAnswers]
      newSelectedAnswers[prev.currentQuestion] = answerIndex

      return {
        ...prev,
        selectedAnswers: newSelectedAnswers,
      }
    })

    // Show feedback animation
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 1500)
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (!selectedCategory) return

    if (quizState.currentQuestion < selectedCategory.questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false,
      }))
    } else {
      // Quiz completed - calculate final score
      completeQuiz()
    }
  }

  // Navigate to previous question
  const previousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        showExplanation: false,
      }))
    }
  }

  // Complete the quiz and calculate score
  const completeQuiz = useCallback(() => {
    if (!selectedCategory) return

    const finalScore = quizState.selectedAnswers.reduce((score:number, answer, index) => {
      if (answer === selectedCategory.questions[index].correctAnswer) {
        return score + 1
      }
      return score
    }, 0)

    setQuizState((prev:any) => ({
      ...prev,
      score: finalScore,
      isCompleted: true,
      showResults: true,
    }))
  }, [quizState.selectedAnswers, selectedCategory])

  // Toggle explanation visibility
  const toggleExplanation = () => {
    setQuizState((prev) => ({
      ...prev,
      showExplanation: !prev.showExplanation,
    }))
  }

  // Category selection screen
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 py-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quiz Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your favorite category and test your knowledge! Each quiz has different time limits and difficulty
              levels.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizCategories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => selectCategory(category)}
              >
                <CardHeader className="text-center space-y-4">
                  <div
                    className={`mx-auto w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-2xl`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-800">{category.questions.length}</div>
                      <div className="text-xs text-gray-600">Questions</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-800">{Math.floor(category.timeLimit / 60)}m</div>
                      <div className="text-xs text-gray-600">Time Limit</div>
                    </div>
                  </div>
                  <Button
                    className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 transform hover:scale-105 transition-all duration-200`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Quiz Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Timed Challenges</h3>
                <p className="text-sm text-gray-600">Each category has its own time limit</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Detailed Explanations</h3>
                <p className="text-sm text-gray-600">Learn from every question</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Your progress is automatically saved</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <RotateCcw className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">Retake Anytime</h3>
                <p className="text-sm text-gray-600">Practice as many times as you want</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Get current question data
  const currentQ = selectedCategory.questions[quizState.currentQuestion]
  const progress = ((quizState.currentQuestion + 1) / selectedCategory.questions.length) * 100
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestion]

  // Quiz start screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <Button onClick={resetToCategories} variant="outline" size="sm" className="absolute top-4 left-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            <div
              className={`mx-auto w-20 h-20 bg-gradient-to-r ${selectedCategory.color} rounded-full flex items-center justify-center text-3xl`}
            >
              {selectedCategory.icon}
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {selectedCategory.title}
            </CardTitle>
            <p className="text-gray-600 text-lg">{selectedCategory.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedCategory.questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(selectedCategory.timeLimit)}</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Auto-Save</div>
                <div className="text-sm text-gray-600">Progress Saved</div>
              </div>
            </div>
            <Button
              onClick={startQuiz}
              className={`w-full py-6 text-lg font-semibold bg-gradient-to-r ${selectedCategory.color} hover:opacity-90 transform hover:scale-105 transition-all duration-200`}
            >
              <Play className="w-5 h-5 mr-2" />
              Start {selectedCategory.title} Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results screen
  if (quizState.showResults) {
    const percentage = Math.round((quizState.score / selectedCategory.questions.length) * 100)
    const getScoreColor = () => {
      if (percentage >= 80) return "text-green-600"
      if (percentage >= 60) return "text-yellow-600"
      return "text-red-600"
    }

    const getScoreMessage = () => {
      if (percentage >= 90) return "Outstanding! 🎉"
      if (percentage >= 80) return "Excellent work! 👏"
      if (percentage >= 70) return "Good job! 👍"
      if (percentage >= 60) return "Not bad! 🙂"
      return "Keep practicing! 💪"
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div
              className={`mx-auto w-24 h-24 bg-gradient-to-r ${selectedCategory.color} rounded-full flex items-center justify-center text-3xl`}
            >
              {selectedCategory.icon}
            </div>
            <CardTitle className="text-3xl font-bold">{selectedCategory.title} Completed!</CardTitle>
            <p className="text-xl text-gray-600">{getScoreMessage()}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${getScoreColor()}`}>
                {quizState.score}/{selectedCategory.questions.length}
              </div>
              <div className="text-2xl text-gray-600">{percentage}% Correct</div>
              <Progress value={percentage} className="w-full h-4" />
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-6">Review Your Answers</h3>
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {selectedCategory.questions.map((question, index) => {
                  const userAnswer = quizState.selectedAnswers[index]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Your answer:</span>{" "}
                              <span
                                className={
                                  userAnswer !== null
                                    ? isCorrect
                                      ? "text-green-600"
                                      : "text-red-600"
                                    : "text-gray-500"
                                }
                              >
                                {userAnswer !== null ? question.options[userAnswer] : "Not answered"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p>
                                <span className="font-medium">Correct answer:</span>{" "}
                                <span className="text-green-600">{question.options[question.correctAnswer]}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={resetToCategories} variant="outline" className="px-8 py-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Choose Another Category
              </Button>
              <Button
                onClick={resetQuiz}
                className={`px-8 py-3 bg-gradient-to-r ${selectedCategory.color} hover:opacity-90`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake This Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main quiz interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with progress and timer */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Button onClick={resetToCategories} variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Categories
                </Button>
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${selectedCategory.color} rounded-full flex items-center justify-center text-sm`}
                >
                  {selectedCategory.icon}
                </div>
                <Badge variant="outline" className="text-sm font-medium">
                  {selectedCategory.title} - Question {quizState.currentQuestion + 1} of{" "}
                  {selectedCategory.questions.length}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className={quizState.timeRemaining < 60 ? "text-red-600 font-bold" : ""}>
                    {formatTime(quizState.timeRemaining)}
                  </span>
                </div>
              </div>
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Quiz
              </Button>
            </div>
            <div className="mt-4">
              <Progress value={progress} className="w-full h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transform transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 leading-relaxed">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="grid gap-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQ.correctAnswer
                const showCorrectAnswer = quizState.showExplanation && isCorrect
                const showIncorrectAnswer = quizState.showExplanation && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={quizState.isCompleted}
                    className={`
                      p-4 text-left rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02]
                      ${
                        isSelected
                          ? showCorrectAnswer
                            ? "border-green-500 bg-green-50 text-green-800"
                            : showIncorrectAnswer
                              ? "border-red-500 bg-red-50 text-red-800"
                              : "border-blue-500 bg-blue-50 text-blue-800"
                          : showCorrectAnswer
                            ? "border-green-500 bg-green-50 text-green-800"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                      }
                      ${showFeedback && isSelected ? "animate-pulse" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                        ${
                          isSelected
                            ? showCorrectAnswer
                              ? "border-green-500 bg-green-500 text-white"
                              : showIncorrectAnswer
                                ? "border-red-500 bg-red-500 text-white"
                                : "border-blue-500 bg-blue-500 text-white"
                            : showCorrectAnswer
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-gray-300"
                        }
                      `}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{option}</span>
                      {showCorrectAnswer && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                      {showIncorrectAnswer && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && (
              <div className="mt-6 space-y-4">
                <Button onClick={toggleExplanation} variant="outline" className="w-full">
                  {quizState.showExplanation ? "Hide" : "Show"} Explanation
                </Button>

                {quizState.showExplanation && (
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold text-blue-600">Explanation:</span> {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={previousQuestion}
                disabled={quizState.currentQuestion === 0}
                variant="outline"
                className="px-6"
              >
                Previous
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={selectedAnswer === null}
                className={`px-6 bg-gradient-to-r ${selectedCategory.color} hover:opacity-90`}
              >
                {quizState.currentQuestion === selectedCategory.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
