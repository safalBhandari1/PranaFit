

// src/features/projects/types/project.ts
import { Exercise, WorkoutType } from "../../workout/types/workout";

export interface TrainingProject {
  id: string;
  title: string;
  description: string;
  type: 'gym' | 'calisthenics' | 'yoga' |'running' | 'cycling' | 'walking' | 'jumba' | 'mixed' | 'rest' | 'diet';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  progress: ProjectProgress;
  isPublic: boolean;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  focusAreas?: string[];
  
  // ✅ CRITICAL FIX: Add userId for Firebase queries
  userId: string;
  
  // Optional fields for templates
  templateSource?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';

    // ✅ NEW: Diet-specific fields (optional)
    dietType?: 'weight-loss' | 'weight-gain';
    dailyCalorieTarget?: number;
    dailyProteinTarget?: number;
    dailyCarbsTarget?: number;
    dailyFatTarget?: number;

}

export interface DailyWorkout {
  dayIndex: number;
  name: string;
  date: Date;
  completed: boolean;
  completedAt?: Date;
  activities: WorkoutActivity[];
  focusAreas?: string[];

    // ✅ NEW: For diet projects
    meals?: NepaliMeal[];
    totalCalories?: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFat?: number;
    allMealsCompleted?: boolean;
}

export interface WorkoutActivity {
  id: string;
  name: string;
  type: WorkoutType;
  exercises: Exercise[];
  estimatedDuration: number;
  notes?: string;
}

export interface ProjectProgress {
  completedDays: number;
  totalDays: number;
  completionPercentage: number;
  currentDayIndex: number;
  startedAt: Date;
  estimatedCompletion?: Date;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed' | 'diet';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  category: 'beginner' | 'intermediate' | 'advanced' | 'muscle-building' | 'weight-loss';
  difficulty: number;
  estimatedDuration: number;
  popularity: number;
  isFeatured: boolean;
  author?: string;
  focusAreas?: string[];

    // ✅ NEW: Diet-specific template fields
    dietType?: 'weight-loss' | 'weight-gain';
    dailyCalorieTarget?: number;
    dailyProteinTarget?: number;
    dailyCarbsTarget?: number;
    dailyFatTarget?: number;
}

// Project creation data
export interface CreateProjectData {
  title: string;
  description: string;
  type: 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed' | 'diet';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  isPublic: boolean;
  focusAreas?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';


    // ✅ NEW: Diet-specific creation data
    dietType?: 'weight-loss' | 'weight-gain';
    dailyCalorieTarget?: number;
    dailyProteinTarget?: number;
    dailyCarbsTarget?: number;
    dailyFatTarget?: number;
}


// ✅ NEW: Nepali Diet Types
export interface NepaliMeal {
  id: string;
  time: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake';
  name: string;
  options: MealOption[];
  selectedOptionId: string | null;
  completed: boolean;
  completedAt?: Date;
}

export interface MealOption {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}