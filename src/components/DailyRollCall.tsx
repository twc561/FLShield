'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, ThumbsUp, ThumbsDown, ExternalLink, Archive } from 'lucide-react';
import { DailyRollCallModule, getTodaysModule } from '@/data/daily-roll-call';
import Link from 'next/link';

interface DailyRollCallProps {
  className?: string;
}

type CompletionState = 'not-started' | 'answered' | 'completed';

export function DailyRollCall({ className }: DailyRollCallProps) {
  const [module, setModule] = useState<DailyRollCallModule | null>(null);
  const [completionState, setCompletionState] = useState<CompletionState>('not-started');
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  useEffect(() => {
    const todaysModule = getTodaysModule();
    setModule(todaysModule);

    // Check if user has completed today's module
    const completionKey = `daily-roll-call-${todaysModule.id}`;
    const isCompleted = localStorage.getItem(completionKey);
    if (isCompleted) {
      setCompletionState('completed');
    }
  }, []);

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
      <Card className={`border-2 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="h-5 w-5 animate-spin" />
            <span>Loading today's briefing...</span>
          </div>
        </CardContent>
      </Card>
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
    <Card className={`border-2 border-primary/20 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{module.categoryIcon}</div>
            <div>
              <CardTitle className="text-lg">Daily Roll Call</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={categoryColors[module.category]}>
                  {module.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                {completionState === 'completed' && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link href="/daily-briefing" className="text-muted-foreground hover:text-primary">
            <Archive className="h-5 w-5" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Step 1: The Hook */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold text-base mb-2">{module.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {module.hook}
          </p>
        </div>

        {/* Step 2: The Interaction */}
        {completionState === 'not-started' && (
          <div className="space-y-3">
            {module.interactionType === 'multiple-choice' && module.options && (
              <div className="space-y-2">
                {module.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {module.interactionType === 'true-false' && (
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleAnswerSelect(true)}
                >
                  True
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
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
                  className="flex-1 border-green-200 hover:bg-green-50"
                  onClick={() => handleAnswerSelect('legal')}
                >
                  Legal
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 hover:bg-red-50"
                  onClick={() => handleAnswerSelect('not-legal')}
                >
                  Not Legal
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: The Reveal & Rationale */}
        {completionState !== 'not-started' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${isCorrectAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className={`text-sm font-medium ${isCorrectAnswer ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrectAnswer ? '✅ Correct!' : '❌ Incorrect'}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Explanation:</strong> {module.rationale}
              </p>
              <p className="text-xs text-muted-foreground italic">
                <strong>Legal Citation:</strong> {module.citation}
              </p>
            </div>

            {/* Step 4: The Deeper Dive */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Explore Further:</h4>
              <div className="grid grid-cols-1 gap-2">
                {module.deepDiveLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className="flex items-center space-x-2 p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-sm flex-1">{link.title}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Feedback & Completion */}
            {completionState === 'answered' && (
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Was this briefing helpful?</span>
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

            {module.smeAttribution && (
              <p className="text-xs text-muted-foreground italic border-t pt-3">
                {module.smeAttribution}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}