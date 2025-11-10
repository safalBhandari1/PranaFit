import { Exercise, WorkoutType } from "../../workout/types/workout";

// Project structure for training programs
export interface Project {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    days: ProjectDay[];
    createdAt: Date;
    templateSource?: string; // If created from template
  }
  
  // Individual day in a project
  export interface ProjectDay {
    index: number;
    name: string;
    workoutType: WorkoutType;
    targetExercises?: Exercise[]; // For gym/calisthenics/yoga
    duration?: number; // For cardio types
    completed?: boolean;
  }
  
  // Project template structure
  export interface ProjectTemplate {
    id: string;
    name: string;
    description: string;
    days: ProjectDay[];
    category: string;
  }