'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Calendar, TrendingUp, Brain } from 'lucide-react';
import { dailyRollCallModules } from '@/data/daily-roll-call';

interface BriefingStatsProps {
  className?: string;
}

interface UserProgress {
  totalCompleted: number;
  streak: number;
  lastCompletionDate: string | null;
  categoryProgress: Record<string, number>;
}

export function BriefingStats({ className }: BriefingStatsProps) {
  const [progress, setProgress] = useState<UserProgress>({
    totalCompleted: 0,
    streak: 0,
    lastCompletionDate: null,
    categoryProgress: {}
  });

  useEffect(() => {
    // Calculate user progress from localStorage
    const calculateProgress = () => {
      const completedModules: string[] = [];
      const categoryCount: Record<string, { completed: number; total: number }> = {};

      // Initialize category counts
      dailyRollCallModules.forEach(module => {
        if (!categoryCount[module.category]) {
          categoryCount[module.category] = { completed: 0, total: 0 };
        }
        categoryCount[module.category].total++;
      });

      // Check completed modules
      dailyRollCallModules.forEach(module => {
        const completionKey = `daily-roll-call-${module.id}`;
        const completion = localStorage.getItem(completionKey);

        if (completion) {
          completedModules.push(module.id);
          categoryCount[module.category].completed++;
        }
      });

      // Calculate streak (simplified - in production, this would be more sophisticated)
      const streak = completedModules.length > 0 ? Math.min(completedModules.length, 7) : 0;

      const categoryProgress: Record<string, number> = {};
      Object.entries(categoryCount).forEach(([category, { completed, total }]) => {
        categoryProgress[category] = (completed / total) * 100;
      });

      setProgress({
        totalCompleted: completedModules.length,
        streak,
        lastCompletionDate: completedModules.length > 0 ? new Date().toISOString() : null,
        categoryProgress
      });
    };

    calculateProgress();
  }, []);

  const completionPercentage = (progress.totalCompleted / dailyRollCallModules.length) * 100;

  const categoryNames = {
    'legal-update': 'Legal Updates',
    'procedural-refresher': 'Procedures',
    'scenario-based': 'Scenarios',
    'case-law-spotlight': 'Case Law',
    'officer-safety': 'Safety'
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-yellow-600" />
            <span>Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completed</span>
              <span>{progress.totalCompleted}/{dailyRollCallModules.length}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completionPercentage.toFixed(0)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <span>Current Streak</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              {progress.streak}
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.streak === 1 ? 'day' : 'days'} in a row
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span>Category Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(progress.categoryProgress).map(([category, percentage]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-xs font-medium">
                  {categoryNames[category as keyof typeof categoryNames] || category}
                </span>
                <div className="flex items-center space-x-2">
                  <Progress value={percentage} className="h-1 w-16" />
                  <span className="text-xs text-muted-foreground w-8">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}