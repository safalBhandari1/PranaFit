
// import { Exercise, WorkoutType } from "../../workout/types/workout";

// export interface TrainingProject {
//   id: string;
//   title: string; // Changed from 'name' to match old screen
//   description: string;
//   type: 'gym' | 'calisthenics' | 'yoga' |'running' | 'cycling' | 'walking' | 'jumba' | 'mixed' | 'rest'; // Match old types
//   duration: number; // in days (matches old screen)
//   dailyWorkouts: DailyWorkout[]; // Changed from 'days' to match old screen
//   progress: ProjectProgress;
//   isPublic: boolean;
//   downloadCount: number;
//   createdAt: Date;
//   updatedAt: Date;
//   isActive: boolean;
//   startDate: Date; // Added for old screen compatibility
//   endDate: Date; // Added for old screen compatibility
//   focusAreas?: string[]; // Added for muscle groups
// }

// export interface DailyWorkout {
//   dayIndex: number;
//   name: string;
//   date: Date;
//   completed: boolean;
//   completedAt?: Date;
//   activities: WorkoutActivity[]; // Changed from 'workouts' to match old screen
//   focusAreas?: string[]; // Muscle groups for the day
// }

// export interface WorkoutActivity {
//   id: string;
//   name: string;
//   type: WorkoutType;
//   exercises: Exercise[];
//   estimatedDuration: number;
//   notes?: string;
// }

// export interface ProjectProgress {
//   completedDays: number;
//   totalDays: number;
//   completionPercentage: number;
//   currentDayIndex: number;
//   startedAt: Date;
//   estimatedCompletion?: Date;
// }

// export interface ProjectTemplate {
//   id: string;
//   name: string;
//   description: string;
//   type: 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed';
//   duration: number;
//   dailyWorkouts: DailyWorkout[];
//   category: 'beginner' | 'intermediate' | 'advanced' | 'muscle-building' | 'weight-loss';
//   difficulty: number;
//   estimatedDuration: number;
//   popularity: number;
//   isFeatured: boolean;
//   author?: string;
//   focusAreas?: string[]; // Main muscle groups covered
// }

// // Project creation data
// export interface CreateProjectData {
//   title: string;
//   description: string;
//   type: 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed';
//   duration: number;
//   dailyWorkouts: DailyWorkout[];
//   isPublic: boolean;
//   focusAreas?: string[];
// }


// src/features/projects/types/project.ts
import { Exercise, WorkoutType } from "../../workout/types/workout";

export interface TrainingProject {
  id: string;
  title: string;
  description: string;
  type: 'gym' | 'calisthenics' | 'yoga' |'running' | 'cycling' | 'walking' | 'jumba' | 'mixed' | 'rest';
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
}

export interface DailyWorkout {
  dayIndex: number;
  name: string;
  date: Date;
  completed: boolean;
  completedAt?: Date;
  activities: WorkoutActivity[];
  focusAreas?: string[];
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
  type: 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  category: 'beginner' | 'intermediate' | 'advanced' | 'muscle-building' | 'weight-loss';
  difficulty: number;
  estimatedDuration: number;
  popularity: number;
  isFeatured: boolean;
  author?: string;
  focusAreas?: string[];
}

// Project creation data
export interface CreateProjectData {
  title: string;
  description: string;
  type: 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'walking' | 'jumba' | 'mixed';
  duration: number;
  dailyWorkouts: DailyWorkout[];
  isPublic: boolean;
  focusAreas?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}