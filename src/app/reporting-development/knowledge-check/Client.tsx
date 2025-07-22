
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { DrillQuestion } from '@/data/training/knowledge-drill';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function KnowledgeCheckClient({ questions }: { questions: DrillQuestion[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<DrillQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);

  // This effect runs only on the client, after the initial render.
  useEffect(() => {
    setIsMounted(true);
    // Initial shuffle of questions.
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
  }, [questions]);

  const currentQuestion = useMemo(() => shuffledQuestions[currentQuestionIndex], [shuffledQuestions, currentQuestionIndex]);

  // This effect shuffles the answer options whenever the question changes.
  useEffect(() => {
    if (currentQuestion) {
      setAnswerOptions(shuffleArray([...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer]));
    }
  }, [currentQuestion]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  // This prevents hydration errors by rendering a skeleton on the server and initial client render.
  if (!isMounted || shuffledQuestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-2">
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Skeleton className="h-6 w-6 rounded-full"/>
              <Skeleton className="h-6 w-full"/>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Skeleton className="h-6 w-6 rounded-full"/>
              <Skeleton className="h-6 w-full"/>
            </div>
             <div className="flex items-center gap-4 rounded-md border p-4">
              <Skeleton className="h-6 w-6 rounded-full"/>
              <Skeleton className="h-6 w-full"/>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
          <CardDescription>You've completed this knowledge drill.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg font-semibold">Your Score:</p>
          <p className="text-4xl font-bold text-primary">{percentage}%</p>
          <p className="text-muted-foreground">You answered {score} out of {shuffledQuestions.length} questions correctly.</p>
          <Button onClick={handleRestart} className="mt-6">
            <RefreshCw className="mr-2 h-4 w-4" />
            Take Another Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-3 py-4 max-w-4xl min-h-screen">
      <Card className="overflow-hidden">
        <CardHeader className="pb-6 px-4 sm:px-6">
          <CardTitle className="text-xl">Knowledge Drill</CardTitle>
          <CardDescription className="text-sm">{currentQuestion.questionCategory}</CardDescription>
          <div className="pt-4 space-y-2">
            <Progress value={((currentQuestionIndex + 1) / shuffledQuestions.length) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</p>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-8">
          <div className="space-y-8">
            <p className="text-base sm:text-lg font-semibold leading-relaxed break-words">{currentQuestion.questionText}</p>
            
            <RadioGroup
              value={selectedAnswer ?? ''}
              onValueChange={setSelectedAnswer}
              disabled={isAnswered}
              className="space-y-4"
            >
              {answerOptions.map((answer, index) => {
                const isCorrect = answer === currentQuestion.correctAnswer;
                const isSelected = answer === selectedAnswer;
                return (
                  <Label
                    key={index}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer min-h-[60px] block",
                      isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                      isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10"
                    )}
                  >
                    <RadioGroupItem value={answer} id={`q${index}`} className="mt-0.5 flex-shrink-0" />
                    <span className="break-words leading-relaxed text-sm sm:text-base flex-1">{answer}</span>
                  </Label>
                );
              })}
            </RadioGroup>

            {isAnswered && (
              <div className="mt-8">
                <Alert variant={selectedAnswer === currentQuestion.correctAnswer ? 'default' : 'destructive'} className={cn(selectedAnswer === currentQuestion.correctAnswer && "border-green-500/50 bg-green-500/5")}>
                   <div className="flex items-start gap-2">
                     {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                     <div className="flex-1 min-w-0">
                       <AlertTitle className="text-sm font-semibold mb-1">{selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect"}</AlertTitle>
                       <AlertDescription className="break-words leading-relaxed text-sm">
                         {currentQuestion.explanation}
                       </AlertDescription>
                     </div>
                   </div>
                </Alert>
              </div>
            )}

            <div className="pt-8 border-t mt-12">
              <div className="flex justify-center sm:justify-end">
                {isAnswered ? (
                  <Button onClick={handleNextQuestion} className="w-full sm:w-auto min-h-[48px] text-sm px-6">
                    {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                ) : (
                  <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full sm:w-auto min-h-[48px] text-sm px-6">
                    Submit Answer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
