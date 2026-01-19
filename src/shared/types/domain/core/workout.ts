
// //   // Export for repository compatibility
// //   export type { WorkoutSession as WorkoutSessionDocument };
// import { 
//     WorkoutType, 
//     GymSplitType, 
//     WorkoutStep,
//     Exercise,
//     WorkoutSet, 
//     PersonalRecords,
//     WorkoutExercise,
//     GymWorkoutSplit,
//     WorkoutSession,
//     CardioSession,
//     StructuredSession,
//     StructuredExercise,
//     StructuredExerciseSet,
//     // 🚀 NEW: Export analytics types
//     WorkoutStats,
//     PersonalRecord,
//     WorkoutMetrics,
//     WeeklyFrequency,
//     ExerciseProgress,
//     EnhancedWorkoutSession
//   } from '../../../../features/workout/types/workout';
  
//   /**
//    * Workout types - Re-export from features since they're comprehensive and used everywhere
//    * Single source of truth for workout data
//    */
  
//   // Re-export all types from workout features
//   export { 
//     WorkoutType, 
//     GymSplitType, 
//     WorkoutStep,
//     type Exercise,
//     type WorkoutSet, 
//     type PersonalRecords,
//     type WorkoutExercise,
//     type GymWorkoutSplit,
//     type WorkoutSession,
//     type CardioSession,
//     type StructuredSession,
//     type StructuredExercise,
//     type StructuredExerciseSet,
//     // 🚀 NEW: Export analytics types
//     type WorkoutStats,
//     type PersonalRecord, 
//     type WorkoutMetrics,
//     type WeeklyFrequency,
//     type ExerciseProgress,
//     type EnhancedWorkoutSession
//   } from '../../../../features/workout/types/workout';
  
//   /**
//    * Simplified version for AppStore if needed
//    * (AppStore doesn't need all the workout-specific properties)
//    */
//   export interface BasicWorkoutSession {
//     id: string;
//     userId: string;
//     type: WorkoutType;
//     startTime: Date;
//     endTime?: Date;
//     duration: number;
//     completed: boolean;
//   }
  
//   // Export for repository compatibility
//   export type { WorkoutSession as WorkoutSessionDocument };

import { 
    WorkoutType, 
    GymSplitType, 
    WorkoutStep,
    Exercise,
    WorkoutSet, 
    PersonalRecords,
    WorkoutExercise,
    GymWorkoutSplit,
    WorkoutSession,
    CardioSession,
    StructuredSession,
    StructuredExercise,
    StructuredExerciseSet,
    // 🚀 NEW: Export analytics types
    WorkoutStats,
    PersonalRecord,
    WorkoutMetrics,
    WeeklyFrequency,
    ExerciseProgress,
    EnhancedWorkoutSession
  } from '../../../../features/workout/types/workout';
  
  // 🚀 NEW: Import enhanced analytics types
  import { EnhancedWorkoutStats, WorkoutTrend, VolumeProgression, WeeklyPattern } from '../analytics';
  
  // Re-export all types from workout features
  export { 
    WorkoutType, 
    GymSplitType, 
    WorkoutStep,
    type Exercise,
    type WorkoutSet, 
    type PersonalRecords,
    type WorkoutExercise,
    type GymWorkoutSplit,
    type WorkoutSession,
    type CardioSession,
    type StructuredSession,
    type StructuredExercise,
    type StructuredExerciseSet,
    // 🚀 NEW: Export analytics types
    type WorkoutStats,
    type PersonalRecord, 
    type WorkoutMetrics,
    type WeeklyFrequency,
    type ExerciseProgress,
    type EnhancedWorkoutSession,
    // 🚀 NEW: Export enhanced analytics
    type EnhancedWorkoutStats,
    type WorkoutTrend,
    type VolumeProgression,
    type WeeklyPattern
  } from '../../../../features/workout/types/workout';
  
  // 🚀 NEW: Export analytics types directly
  export type { EnhancedWorkoutStats, WorkoutTrend, VolumeProgression, WeeklyPattern } from '../analytics';
  
  /**
   * Simplified version for AppStore if needed
   * (AppStore doesn't need all the workout-specific properties)
   */
  export interface BasicWorkoutSession {
    id: string;
    userId: string;
    type: WorkoutType;
    startTime: Date;
    endTime?: Date;
    duration: number;
    completed: boolean;
  }
  
  // Export for repository compatibility
  export type { WorkoutSession as WorkoutSessionDocument };