import { WorkoutSession } from "../../features/workout/types/workout"

// Common types used across features
export interface User {
    id: string;
    email: string;
    name: string;
    gym?: string;
  }
  
  // Global stats for workout completion tracking
  export interface GlobalStats {
    totalWorkouts: number;
    workoutsThisWeek: number;
    totalDuration: number;
    caloriesBurned: number;
    recentWorkouts: WorkoutSession[];
  }