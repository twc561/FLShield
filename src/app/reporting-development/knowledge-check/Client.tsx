
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
  const [shuffledQuestions, setShuffledQuestions] = useState<DrillQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);

  useEffect(() => {
    // This shuffle only runs on the client, preventing a hydration mismatch.
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
  }, [questions]);

  const currentQuestion = useMemo(() => shuffledQuestions[currentQuestionIndex], [shuffledQuestions, currentQuestionIndex]);

  useEffect(() => {
    // This effect runs on the client whenever the question changes, ensuring the answer order is random but stable for the current question.
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

  if (shuffledQuestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Drill</CardTitle>
          <CardDescription>Loading questions...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
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
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Drill</CardTitle>
        <CardDescription>{currentQuestion.questionCategory}</CardDescription>
        <div className="pt-4">
          <Progress value={((currentQuestionIndex + 1) / shuffledQuestions.length) * 100} />
          <p className="text-xs text-muted-foreground text-right mt-1">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold">{currentQuestion.questionText}</p>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
        >
          {answerOptions.map((answer, index) => {
            const isCorrect = answer === currentQuestion.correctAnswer;
            const isSelected = answer === selectedAnswer;
            return (
              <Label
                key={index}
                className={cn(
                  "flex items-center gap-4 rounded-md border p-4 transition-colors hover:bg-muted/50 cursor-pointer",
                  isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                  isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500/10"
                )}
              >
                <RadioGroupItem value={answer} id={`q${index}`} />
                <span>{answer}</span>
              </Label>
            );
          })}
        </RadioGroup>

        {isAnswered && (
          <Alert variant={selectedAnswer === currentQuestion.correctAnswer ? 'default' : 'destructive'} className={cn(selectedAnswer === currentQuestion.correctAnswer && "border-green-500/50 bg-green-500/5")}>
             {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect"}</AlertTitle>
            <AlertDescription>
              {currentQuestion.explanation}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end">
          {isAnswered ? (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          ) : (
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
