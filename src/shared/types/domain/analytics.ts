/**
 * Enhanced Analytics Types for Progress Tab
 */

export interface WorkoutTrend {
    date: string; // ISO string or YYYY-MM-DD
    workoutCount: number;
    totalDuration: number;
    totalVolume?: number;
    caloriesBurned: number;
  }
  
  export interface VolumeProgression {
    exerciseId: string;
    exerciseName: string;
    dataPoints: { date: string; volume: number }[];
    currentVolume: number;
    previousVolume: number;
    percentageChange: number;
    trend: 'up' | 'down' | 'stable';
  }
  
  export interface PersonalRecord {
    id: string;
    exerciseId: string;
    exerciseName: string;
    recordType: 'weight' | 'reps' | 'time' | 'distance' | 'volume';
    value: number;
    date: Date;
    previousValue?: number;
    improvement: number; // percentage
    workoutId: string;
    workoutType: string;
  }
  
  export interface WeeklyPattern {
    day: string; // 'Mon', 'Tue', etc.
    workoutCount: number;
    averageDuration: number;
  }
  
  export interface EnhancedWorkoutStats {
    // Basic stats (existing)
    totalWorkouts: number;
    workoutsThisWeek: number;
    workoutsThisMonth: number;
    totalDuration: number;
    totalCalories: number;
    averageDuration: number;
    favoriteWorkoutType: string;
    currentStreak: number;
    longestStreak: number;
    consistency: number;
    
    // Enhanced analytics (new)
    weeklyTrend: WorkoutTrend[]; // Last 4 weeks
    volumeProgression: VolumeProgression[]; // Top 5 exercises
    personalRecords: PersonalRecord[]; // Top PRs
    weeklyPattern: WeeklyPattern[]; // Workouts by day of week
    workoutTypeDistribution: { type: string; count: number; percentage: number }[];
    estimated1RM: { exercise: string; estimated1RM: number }[];
    
    // Performance metrics
    averageVolumePerWorkout: number;
    bestVolumeWorkout: number;
    bestVolumeDate: Date;
    progressScore: number; // 0-100 overall progress
  }
  
  export interface ChartDataPoint {
    x: string | number;
    y: number;
    label?: string;
  }
  
  export interface ChartConfig {
    color: string;
    strokeWidth?: number;
    showGrid?: boolean;
    showLabels?: boolean;
  }