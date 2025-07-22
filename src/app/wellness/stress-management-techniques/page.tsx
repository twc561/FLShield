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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  Brain, 
  Heart, 
  Clock, 
  Users, 
  Phone, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Moon,
  Dumbbell
} from "lucide-react"

const stressManagementCategories = [
  {
    id: "immediate",
    title: "Immediate Stress Response",
    icon: Shield,
    description: "Quick techniques for high-stress situations",
    techniques: [
      {
        name: "Tactical Breathing",
        timeRequired: "30 seconds - 2 minutes",
        situation: "During or immediately after high-stress incidents",
        steps: [
          "Breathe in through nose for 4 counts",
          "Hold for 4 counts", 
          "Exhale through mouth for 4 counts",
          "Hold empty for 4 counts",
          "Repeat 4-6 cycles"
        ],
        benefits: "Activates parasympathetic nervous system, reduces cortisol, improves decision-making"
      },
      {
        name: "Progressive Muscle Release",
        timeRequired: "2-5 minutes",
        situation: "After physical confrontations or high-tension encounters",
        steps: [
          "Clench fists tightly for 5 seconds, then release",
          "Tense shoulders up to ears for 5 seconds, then drop",
          "Tighten facial muscles for 5 seconds, then relax",
          "Take 3 deep breaths between each muscle group"
        ],
        benefits: "Releases physical tension, prevents muscle fatigue, improves body awareness"
      },
      {
        name: "Grounding Technique (5-4-3-2-1)",
        timeRequired: "2-3 minutes",
        situation: "When feeling overwhelmed or dissociated",
        steps: [
          "Name 5 things you can see",
          "Name 4 things you can touch",
          "Name 3 things you can hear",
          "Name 2 things you can smell",
          "Name 1 thing you can taste"
        ],
        benefits: "Brings focus to present moment, reduces anxiety, improves situational awareness"
      }
    ]
  },
  {
    id: "shift",
    title: "During-Shift Management",
    icon: Clock,
    description: "Maintaining wellness throughout your shift",
    techniques: [
      {
        name: "Micro-Recovery Breaks",
        timeRequired: "1-3 minutes",
        situation: "Between calls or during brief downtime",
        steps: [
          "Find a quiet spot in your vehicle or station",
          "Close eyes or focus on a fixed point",
          "Take 5 slow, deep breaths",
          "Do neck and shoulder rolls",
          "Set a positive intention for the next call"
        ],
        benefits: "Prevents stress accumulation, maintains energy levels, improves focus"
      },
      {
        name: "Cognitive Reframing",
        timeRequired: "2-5 minutes", 
        situation: "After difficult interactions with public",
        steps: [
          "Identify the negative thought (e.g., 'Everyone hates cops')",
          "Challenge it: 'Is this absolutely true?'",
          "Find evidence against it",
          "Reframe positively: 'Most people appreciate our service'",
          "Focus on your mission to serve and protect"
        ],
        benefits: "Reduces negative thinking patterns, maintains professional perspective, prevents burnout"
      },
      {
        name: "Hydration & Nutrition Reset",
        timeRequired: "5-10 minutes",
        situation: "Mid-shift energy crashes or stress eating urges",
        steps: [
          "Drink 16-20oz of water slowly",
          "Eat protein-rich snack if hungry",
          "Avoid caffeine overload",
          "Take 5 minutes to eat mindfully",
          "Check in with your body's needs"
        ],
        benefits: "Maintains physical energy, supports mental clarity, prevents crash cycles"
      }
    ]
  },
  {
    id: "post-shift",
    title: "Post-Shift Decompression",
    icon: Moon,
    description: "Transitioning from work to personal life",
    techniques: [
      {
        name: "Decompression Drive",
        timeRequired: "10-20 minutes",
        situation: "On the way home from shift",
        steps: [
          "Drive a longer route home when possible",
          "Play calming music or silence",
          "Practice deep breathing at red lights",
          "Mentally review positive moments from shift",
          "Set intention to leave work stress at work"
        ],
        benefits: "Creates transition space, prevents bringing work stress home, improves family relationships"
      },
      {
        name: "Physical Release Routine",
        timeRequired: "15-30 minutes",
        situation: "After physically or emotionally demanding shifts",
        steps: [
          "Change out of uniform immediately",
          "Take a hot shower or bath",
          "Do light stretching or walk",
          "Physical activity (gym, run, sports)",
          "Listen to music or podcast"
        ],
        benefits: "Releases physical tension, symbolic transition, improves sleep quality"
      },
      {
        name: "Emotional Processing",
        timeRequired: "10-20 minutes",
        situation: "After traumatic or emotionally heavy calls",
        steps: [
          "Write briefly about the incident (just facts)",
          "Identify emotions you're feeling",
          "Call a trusted friend, family member, or peer support",
          "Practice self-compassion statements",
          "Plan a positive activity for later"
        ],
        benefits: "Prevents emotional buildup, maintains perspective, strengthens support networks"
      }
    ]
  },
  {
    id: "long-term",
    title: "Long-Term Resilience",
    icon: Dumbbell,
    description: "Building sustainable stress resistance",
    techniques: [
      {
        name: "Regular Exercise Routine",
        timeRequired: "30-60 minutes, 3-5x per week",
        situation: "Ongoing stress management and physical fitness",
        steps: [
          "Choose activities you enjoy (lifting, running, sports)",
          "Schedule workouts like appointments",
          "Start small and build consistency",
          "Include both cardio and strength training",
          "Consider group activities for social support"
        ],
        benefits: "Reduces stress hormones, improves mood, builds physical resilience, social connection"
      },
      {
        name: "Sleep Hygiene Protocol",
        timeRequired: "Daily routine",
        situation: "Managing shift work and sleep challenges",
        steps: [
          "Keep consistent sleep schedule when possible",
          "Create dark, cool sleep environment",
          "Avoid screens 1 hour before bed",
          "Use blackout curtains for day sleeping",
          "Consider melatonin (consult doctor)"
        ],
        benefits: "Improves recovery, enhances decision-making, boosts immune system, regulates mood"
      },
      {
        name: "Professional Support Network",
        timeRequired: "Ongoing relationship building",
        situation: "Preventing isolation and building resilience",
        steps: [
          "Maintain relationships with other officers",
          "Participate in peer support programs",
          "Consider professional counseling",
          "Join law enforcement social groups",
          "Mentor newer officers"
        ],
        benefits: "Reduces isolation, provides perspective, builds mutual support, career satisfaction"
      }
    ]
  }
]

const warningSignsOfStress = [
  "Increased irritability or anger",
  "Difficulty sleeping or excessive fatigue",
  "Changes in appetite or eating patterns",
  "Increased alcohol or substance use",
  "Withdrawal from family and friends",
  "Difficulty concentrating or making decisions",
  "Physical symptoms (headaches, stomach issues)",
  "Feeling overwhelmed or hopeless",
  "Increased cynicism about the job",
  "Frequent illness or injuries"
]

export default function StressManagementTechniquesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Stress Management Techniques"
        description="Evidence-based strategies specifically designed for law enforcement professionals to manage job-related stress and build long-term resilience."
      />

      {/* Emergency Resources */}
      <Alert className="mb-6 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Crisis Resources:</strong> If you're experiencing thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) 
          or contact your Employee Assistance Program immediately. You're not alone, and help is available 24/7.
        </AlertDescription>
      </Alert>

      {/* Stress Level Quick Assessment */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Quick Stress Check
          </CardTitle>
          <CardDescription>
            Recognizing stress early allows for more effective intervention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-red-600">Warning Signs to Watch For:</h4>
              <ul className="space-y-1 text-sm">
                {warningSignsOfStress.slice(0, 5).map((sign, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 mt-1 text-red-500 flex-shrink-0" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Signs of Good Stress Management:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                  Sleeping well most nights
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                  Maintaining relationships
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                  Enjoying activities outside work
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                  Feeling confident in abilities
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                  Managing emotions effectively
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stress Management Categories */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Stress Management by Situation</h2>

        <div className="grid gap-4">
          {stressManagementCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {activeCategory === category.id ? "Hide" : "Show"} Techniques
                    </Button>
                  </div>
                </CardHeader>

                {activeCategory === category.id && (
                  <CardContent>
                    <div className="space-y-6">
                      {category.techniques.map((technique, index) => (
                        <div key={index} className="border border-border rounded-lg p-4 bg-card/50">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold">{technique.name}</h4>
                            <Badge variant="outline" className="ml-2">
                              {technique.timeRequired}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            <strong>Best for:</strong> {technique.situation}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium mb-2">Steps:</h5>
                              <ol className="space-y-1 text-sm">
                                {technique.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="flex gap-2">
                                    <span className="font-medium text-primary">{stepIndex + 1}.</span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Benefits:</h5>
                              <p className="text-sm">{technique.benefits}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Additional Resources */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Additional Support Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Professional Help:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Employee Assistance Program (EAP)</li>
                <li>• Department chaplain services</li>
                <li>• Peer support team members</li>
                <li>• Mental health professionals specializing in first responders</li>
                <li>• Critical Incident Stress Management (CISM) teams</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Self-Help Resources:</h4>
              <ul className="space-y-2 text-sm">
                <li>• First Responder Trauma Counselors</li>
                <li>• Blue Help organization</li>
                <li>• Police1 wellness articles</li>
                <li>• Mindfulness apps (Headspace, Calm)</li>
                <li>• Officer.com wellness resources</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Remember</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Stress is normal:</strong> Law enforcement is inherently stressful. Having stress reactions doesn't make you weak.
            </p>
            <p>
              <strong>Prevention works:</strong> Regular use of these techniques is more effective than crisis intervention.
            </p>
            <p>
              <strong>Get help early:</strong> The sooner you address stress, the easier it is to manage.
            </p>
            <p>
              <strong>You're not alone:</strong> Every officer deals with stress. Talking about it and getting help shows strength, not weakness.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}