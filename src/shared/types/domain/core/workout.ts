// // shared/types/domain/core/workout.ts

// import { Exercise, GymSplitType, WorkoutType } from '../../../../features/workout/types/workout';

// /**
//  * Unified Workout model - Single source of truth for workout data
//  * Combines properties from workout flows and AppStore requirements
//  */

// // Re-export all ACTUALLY USED types from workout features
// export { 
//     WorkoutType, 
//     GymSplitType, 
//     WorkoutStep,
//     type Exercise,
//     type WorkoutSet, 
//     type PersonalRecords,
//     type WorkoutExercise,
//     type GymWorkoutSplit
//   } from '../../../../features/workout/types/workout';
  
//   /**
//    * WorkoutSession interface that works for both:
//    * - AppStore (needs userId, basic structure)
//    * - Workout components (needs projectContext, cardio properties, etc.)
//    */
//   export interface WorkoutSession {
//     // Core identifiers
//     id: string;
//     userId: string; // ✅ ADDED - Missing from workout types but needed for AppStore
    
//     // Workout content
//     type: WorkoutType;
//     exercises: Exercise[];
    
//     // Timing
//     startTime: Date;
//     endTime?: Date;
//     duration: number;
    
//     // Status
//     completed: boolean; // ✅ ADDED - Required by AppStore
    
//     // Performance metrics (from workout types)
//     calories?: number;
//     caloriesBurned?: number; // Support both property names during transition
//     notes?: string;
    
//     // Context (from workout types - used by components)
//     projectContext?: {
//       projectId: string;
//       projectName: string;
//       dayIndex: number;
//       dayName: string;
//     };
    
//     // Gym specific (from workout types)
//     gymSplitType?: GymSplitType;
//     customMuscleGroups?: string[];
    
//     // Cardio specific (from workout types)
//     distance?: number;
//     elevation?: number;
//     pace?: number;
//     intensity?: number;
    
//     // Firebase ready
//     _createdAt?: Date;
//     _updatedAt?: Date;
//   }
  
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
  
  /**
   * Workout types - Re-export from features since they're comprehensive and used everywhere
   * Single source of truth for workout data
   */
  
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
    type EnhancedWorkoutSession
  } from '../../../../features/workout/types/workout';
  
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