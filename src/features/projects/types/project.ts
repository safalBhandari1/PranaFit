// import { Exercise, WorkoutType } from "../../workout/types/workout";

// // Project structure for training programs
// export interface Project {
//     id: string;
//     name: string;
//     description?: string;
//     isActive: boolean;
//     days: ProjectDay[];
//     createdAt: Date;
//     templateSource?: string; // If created from template
//   }
  
//   // Individual day in a project
//   export interface ProjectDay {
//     index: number;
//     name: string;
//     workoutType: WorkoutType;
//     targetExercises?: Exercise[]; // For gym/calisthenics/yoga
//     duration?: number; // For cardio types
//     completed?: boolean;
//   }
  
//   // Project template structure
//   export interface ProjectTemplate {
//     id: string;
//     name: string;
//     description: string;
//     days: ProjectDay[];
//     category: string;
//   }

import { Exercise, WorkoutType } from "../../workout/types/workout";

export interface TrainingProject {
  id: string;
  title: string; // Changed from 'name' to match old screen
  description: string;
  type: 'gym' | 'calisthenics' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed' | 'rest'; // Match old types
  duration: number; // in days (matches old screen)
  dailyWorkouts: DailyWorkout[]; // Changed from 'days' to match old screen
  progress: ProjectProgress;
  isPublic: boolean;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  startDate: Date; // Added for old screen compatibility
  endDate: Date; // Added for old screen compatibility
  focusAreas?: string[]; // Added for muscle groups
}

export interface DailyWorkout {
  dayIndex: number;
  name: string;
  date: Date;
  completed: boolean;
  completedAt?: Date;
  activities: WorkoutActivity[]; // Changed from 'workouts' to match old screen
  focusAreas?: string[]; // Muscle groups for the day
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
  type: 'gym' | 'calisthenics' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  category: 'beginner' | 'intermediate' | 'advanced' | 'muscle-building' | 'weight-loss';
  difficulty: number;
  estimatedDuration: number;
  popularity: number;
  isFeatured: boolean;
  author?: string;
  focusAreas?: string[]; // Main muscle groups covered
}

// Project creation data
export interface CreateProjectData {
  title: string;
  description: string;
  type: 'gym' | 'calisthenics' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  isPublic: boolean;
  focusAreas?: string[];
}