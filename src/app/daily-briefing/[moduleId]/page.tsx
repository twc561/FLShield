
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock, ThumbsUp, ThumbsDown, Calendar, BookOpen } from 'lucide-react';
import { dailyRollCallModules, DailyRollCallModule } from '@/data/daily-roll-call';
import Link from 'next/link';

type CompletionState = 'not-started' | 'answered' | 'completed';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  
  const [module, setModule] = useState<DailyRollCallModule | null>(null);
  const [completionState, setCompletionState] = useState<CompletionState>('not-started');
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  useEffect(() => {
    const foundModule = dailyRollCallModules.find(m => m.id === moduleId);
    setModule(foundModule || null);

    if (foundModule) {
      // Check if user has completed this module
      const completionKey = `daily-roll-call-${foundModule.id}`;
      const isCompleted = localStorage.getItem(completionKey);
      if (isCompleted) {
        setCompletionState('completed');
        try {
          const completionData = JSON.parse(isCompleted);
          setSelectedAnswer(completionData.userAnswer);
          setFeedback(completionData.feedback);
        } catch (e) {
          // Handle legacy completion data
        }
      }
    }
  }, [moduleId]);

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
    setCompletionState('answered');
  };

  const handleComplete = () => {
    if (!module) return;
    
    setCompletionState('completed');
    
    // Store completion in localStorage
    const completionKey = `daily-roll-call-${module.id}`;
    localStorage.setItem(completionKey, JSON.stringify({
      completed: true,
      date: new Date().toISOString(),
      userAnswer: selectedAnswer,
      feedback
    }));
  };

  const handleFeedback = (isHelpful: boolean) => {
    setFeedback(isHelpful ? 'helpful' : 'not-helpful');
  };

  if (!module) {
    return (
      <div className="animate-fade-in-up">
        <PageHeader
          title="Module Not Found"
          description="The requested training module could not be found."
        />
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">Module not found</h3>
          <p className="text-sm text-muted-foreground mb-4">The requested module doesn't exist or may have been moved.</p>
          <Link href="/daily-briefing">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Daily Briefing Archive
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCorrectAnswer = selectedAnswer === module.correctAnswer;
  const categoryColors = {
    'legal-update': 'bg-blue-100 text-blue-800 border-blue-200',
    'procedural-refresher': 'bg-green-100 text-green-800 border-green-200',
    'scenario-based': 'bg-purple-100 text-purple-800 border-purple-200',
    'case-law-spotlight': 'bg-red-100 text-red-800 border-red-200',
    'officer-safety': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <Link href="/daily-briefing">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Archive
          </Button>
        </Link>
        
        <PageHeader
          title={module.title}
          description={`${module.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} • ${module.difficulty} difficulty`}
        />
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{module.categoryIcon}</div>
              <div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className={categoryColors[module.category]}>
                    {module.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  <Badge variant="secondary">{module.difficulty}</Badge>
                  {completionState === 'completed' && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(module.dateCreated).toLocaleDateString()}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Module Content */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-base mb-3">Scenario</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {module.hook}
            </p>
            <div className="p-3 bg-card rounded border-l-4 border-l-primary">
              <p className="text-sm leading-relaxed">
                {module.rationale}
              </p>
            </div>
          </div>

          {/* Interaction Section */}
          {completionState === 'not-started' && (
            <div className="space-y-4">
              <h4 className="font-medium">What would you do?</h4>
              {module.interactionType === 'multiple-choice' && module.options && (
                <div className="space-y-2">
                  {module.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4 text-sm"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {module.interactionType === 'true-false' && (
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1 p-4"
                    onClick={() => handleAnswerSelect(true)}
                  >
                    True
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 p-4"
                    onClick={() => handleAnswerSelect(false)}
                  >
                    False
                  </Button>
                </div>
              )}

              {module.interactionType === 'legal-not-legal' && (
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1 p-4 border-green-200 hover:bg-green-50"
                    onClick={() => handleAnswerSelect('legal')}
                  >
                    Legal
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 p-4 border-red-200 hover:bg-red-50"
                    onClick={() => handleAnswerSelect('not-legal')}
                  >
                    Not Legal
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Results & Learning */}
          {completionState !== 'not-started' && (
            <div className="space-y-4">
              {/* Answer Feedback */}
              <div className={`p-4 rounded-lg border-2 ${isCorrectAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`text-sm font-medium ${isCorrectAnswer ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrectAnswer ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {module.explanation}
                </p>
              </div>

              {/* Key Takeaways */}
              {module.keyTakeaways && module.keyTakeaways.length > 0 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Key Takeaways</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {module.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Resources */}
              {module.relatedResources && module.relatedResources.length > 0 && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Related Resources</h4>
                  <div className="space-y-2">
                    {module.relatedResources.map((resource, index) => (
                      <Link key={index} href={resource.url} className="block">
                        <div className="flex items-center text-sm text-primary hover:underline">
                          <BookOpen className="h-3 w-3 mr-2" />
                          {resource.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feedback & Completion */}
          {completionState === 'answered' && (
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Was this module helpful?</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={feedback === 'helpful' ? 'default' : 'outline'}
                    onClick={() => handleFeedback(true)}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant={feedback === 'not-helpful' ? 'default' : 'outline'}
                    onClick={() => handleFeedback(false)}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleComplete} className="w-full">
                Mark as Complete
              </Button>
            </div>
          )}

          {/* SME Attribution */}
          {module.smeAttribution && (
            <p className="text-xs text-muted-foreground italic border-t pt-3">
              {module.smeAttribution}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
