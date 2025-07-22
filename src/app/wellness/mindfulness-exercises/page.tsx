
"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, PlayCircle, PauseCircle, RotateCcw } from "lucide-react"

const mindfulnessExercises = [
  {
    id: "box-breathing",
    title: "Box Breathing (Tactical Breathing)",
    duration: "4-8 minutes",
    difficulty: "Beginner",
    description: "Used by military and law enforcement to manage stress and maintain focus.",
    instructions: [
      "Sit comfortably with your back straight",
      "Inhale through your nose for 4 counts",
      "Hold your breath for 4 counts", 
      "Exhale through your mouth for 4 counts",
      "Hold empty for 4 counts",
      "Repeat the cycle 4-8 times"
    ],
    benefits: ["Reduces stress hormones", "Improves focus", "Calms nervous system", "Can be done anywhere"]
  },
  {
    id: "body-scan",
    title: "Progressive Body Scan",
    duration: "10-15 minutes",
    difficulty: "Beginner",
    description: "Systematic relaxation technique to release physical tension.",
    instructions: [
      "Lie down or sit comfortably",
      "Close your eyes and take 3 deep breaths",
      "Start at your toes, notice any tension",
      "Tense and then relax each muscle group",
      "Move up through legs, torso, arms, neck, face",
      "End by relaxing your entire body"
    ],
    benefits: ["Releases muscle tension", "Improves body awareness", "Promotes better sleep", "Reduces physical stress"]
  },
  {
    id: "mindful-observation", 
    title: "Mindful Observation (5-4-3-2-1)",
    duration: "5 minutes",
    difficulty: "Beginner",
    description: "Grounding technique using your five senses to stay present.",
    instructions: [
      "Notice 5 things you can see",
      "Notice 4 things you can touch",
      "Notice 3 things you can hear",
      "Notice 2 things you can smell",
      "Notice 1 thing you can taste",
      "Take slow, deep breaths throughout"
    ],
    benefits: ["Grounds you in the present", "Reduces anxiety", "Improves situational awareness", "Quick stress relief"]
  },
  {
    id: "loving-kindness",
    title: "Loving-Kindness Meditation",
    duration: "10-20 minutes", 
    difficulty: "Intermediate",
    description: "Builds compassion and emotional resilience for challenging interactions.",
    instructions: [
      "Sit quietly and breathe naturally",
      "Start by sending goodwill to yourself: 'May I be safe, may I be peaceful'",
      "Extend to loved ones: 'May you be safe, may you be peaceful'", 
      "Include neutral people (citizens you encounter)",
      "Include difficult people (challenging suspects/situations)",
      "End by including all beings"
    ],
    benefits: ["Builds empathy", "Reduces burnout", "Improves community relations", "Increases emotional resilience"]
  },
  {
    id: "walking-meditation",
    title: "Walking Meditation",
    duration: "10-20 minutes",
    difficulty: "Beginner", 
    description: "Mindful movement practice perfect for patrol breaks.",
    instructions: [
      "Find a quiet path 10-20 steps long",
      "Walk very slowly, focusing on each step",
      "Notice the lifting, moving, and placing of each foot",
      "When you reach the end, pause and turn mindfully",
      "If your mind wanders, gently return to the steps",
      "Continue for the full duration"
    ],
    benefits: ["Combines movement with mindfulness", "Perfect for breaks", "Improves concentration", "Reduces restlessness"]
  }
]

export default function MindfulnessExercisesPage() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const startTimer = (exerciseId: string, minutes: number) => {
    setActiveTimer(exerciseId)
    setTimeRemaining(minutes * 60)
    
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setActiveTimer(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    setActiveTimer(null)
    setTimeRemaining(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Mindfulness Exercises"
        description="Evidence-based mindfulness practices designed for law enforcement professionals to manage stress and maintain peak performance."
      />

      {/* Active Timer Display */}
      {activeTimer && (
        <Card className="mb-6 border-primary">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-medium">Session in progress</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono">{formatTime(timeRemaining)}</span>
              <Button variant="outline" size="sm" onClick={stopTimer}>
                <PauseCircle className="w-4 h-4 mr-1" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Start Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Start - Tactical Breathing</CardTitle>
          <CardDescription>
            The most essential technique every officer should know. Perfect for high-stress situations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">How to do it:</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-medium text-primary">1.</span>
                  Inhale through nose for 4 counts
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">2.</span>
                  Hold breath for 4 counts
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">3.</span>
                  Exhale through mouth for 4 counts
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">4.</span>
                  Hold empty for 4 counts
                </li>
              </ol>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">When to use:</h4>
              <ul className="text-sm space-y-1">
                <li>• Before high-risk operations</li>
                <li>• After stressful encounters</li>
                <li>• During court appearances</li>
                <li>• At the end of shift</li>
              </ul>
              <Button
                onClick={() => startTimer("box-breathing", 5)}
                disabled={activeTimer !== null}
                className="w-full"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Start 5-Minute Session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Exercises */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Mindfulness Exercises</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {mindfulnessExercises.map((exercise) => (
            <AccordionItem key={exercise.id} value={exercise.id} className="border rounded-lg">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-left">{exercise.title}</h3>
                        <p className="text-sm text-muted-foreground text-left">{exercise.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {exercise.duration}
                      </Badge>
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Instructions:</h4>
                        <ol className="space-y-2 text-sm">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="font-medium text-primary">{index + 1}.</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Benefits:</h4>
                        <ul className="space-y-1 text-sm mb-4">
                          {exercise.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                        <Button
                          onClick={() => {
                            const minutes = parseInt(exercise.duration.split('-')[0])
                            startTimer(exercise.id, minutes)
                          }}
                          disabled={activeTimer !== null}
                          variant="outline"
                          className="w-full"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Timer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Usage Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Best Practices:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Start with just 5 minutes daily</li>
                <li>• Practice during low-stress times first</li>
                <li>• Use before shift to set intentions</li>
                <li>• Don't judge yourself - it takes practice</li>
                <li>• Find what works for you</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">When NOT to Practice:</h4>
              <ul className="space-y-2 text-sm">
                <li>• During active emergency response</li>
                <li>• While driving (except breathing)</li>
                <li>• During weapons handling</li>
                <li>• When immediate action is required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
