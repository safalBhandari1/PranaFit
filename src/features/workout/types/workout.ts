
// // Workout type enumeration - matches your requirements
// export enum WorkoutType {
//     GYM = 'gym',
//     CALISTHENICS = 'calisthenics',
//     YOGA = 'yoga',
//     RUNNING = 'running',
//     CYCLING = 'cycling',
//     WALKING = 'walking',
//     ELLIPTICAL = 'elliptical',
//     JUMBA = 'jumba'
//   }
  
//   // Gym-specific split types
//   export enum GymSplitType {
//     PUSH = 'push',
//     PULL = 'pull',
//     LEGS = 'legs',
//     UPPER = 'upper',
//     LOWER = 'lower',
//     FULL_BODY = 'full-body',
//     ARMS = 'arms',
//     MUSCLE_GROUP = 'muscle-group'
//   }
  
//   // Exercise interface with type-safe categorization
//   export interface Exercise {
//     id: string;
//     name: string;
//     workoutType: WorkoutType; // Ensures exercises are filtered by type
//     muscleGroup?: string;
//     equipment?: string;
//     custom?: boolean; // For user-created exercises
//     description?: string;
//     difficulty?:string
//   }
  
//   // Gym workout split with enum type
//   export interface GymWorkoutSplit {
//     id: GymSplitType;
//     name: string;
//     targetMuscles: string[];
//     suggestedExercises: Exercise[];
//   }
  
//   // Workout session with project context support
//   export interface WorkoutSession {
//     id: string;
//     type: WorkoutType;
//     exercises: Exercise[];
//     startTime: Date;
//     endTime?: Date;
//     duration: number; // in minutes
//     calories?: number;
//     notes?: string;
    
//     // Project context for project-initiated workouts
//     projectContext?: {
//       projectId: string;
//       projectName: string;
//       dayIndex: number;
//       dayName: string;
//     };
  
//     // Gym-specific context
//     gymSplitType?: GymSplitType;
//     customMuscleGroups?: string[];

//     // ✅ ADD CARDIO PROPERTIES TO BASE INTERFACE
//     distance?: number;
//     elevation?: number;
//     pace?: number;
//     caloriesBurned?: number;
//     intensity?: number;
//   }
  
//   // Modal step management for the single modal approach
//   export type WorkoutStep = 
//     | 'type-selection'
//     | 'gym-split-selection'
//     | 'exercise-selection'
//     | 'active-session'
//     | 'completion';


//     //for gym active session step
//     export interface WorkoutSet {
//         setId: string;
//         exerciseId: string;
//         setNumber: number;
//         reps: number;
//         weight: number;
//         completed: boolean;
//         restTime?: number;
//       }
      
//       export interface PersonalRecords {
//         maxReps: number;
//         maxRepsWeight: number;
//         maxWeight: number;
//         maxWeightReps: number;
//       }
      
//       export interface WorkoutExercise {
//         id: string;
//         exerciseId: string;
//         name: string;
//         muscleGroup: string;
//         equipment: string;
//         sets: WorkoutSet[];
//         personalRecords: PersonalRecords;
//         volume: number;
//         notes: string;
//       }

// // Add these interfaces at the bottom of the file:
// // Cardio-specific tracking
// export interface CardioSession extends WorkoutSession {
//   distance?: number;
//   elevation?: number;
//   pace?: number;
//   caloriesBurned?: number;
//   intensity?: number; // 1-10 scale
// }

// // Structured-specific tracking (Yoga/Calisthenics)
// // Structured exercise set (different from gym sets)
// export interface StructuredExerciseSet {
//   setId: string;
//   setNumber: number;
//   reps?: number;
//   time: number; // seconds
//   isActive: boolean;
// }

// // Structured exercise with tracking properties
// export interface StructuredExercise {
//   id: string;
//   exerciseId: string;
//   name: string;
//   muscleGroup?: string;
//   equipment?: string;
//   sets?: StructuredExerciseSet[];
//   duration?: number; // for timed exercises
//   reps?: number; // for rep-based exercises
//   isPRTimerActive?: boolean;
// }

// // Structured session type
// export interface StructuredSession extends WorkoutSession {
//   exercises: Exercise[];
//   trackingMode: 'sets' | 'pr';
// }


//WORK IN PROGRESS
// // Workout type enumeration - matches your requirements
// export enum WorkoutType {
//   GYM = 'gym',
//   CALISTHENICS = 'calisthenics',
//   YOGA = 'yoga',
//   RUNNING = 'running',
//   CYCLING = 'cycling',
//   WALKING = 'walking',
//   ELLIPTICAL = 'elliptical',
//   JUMBA = 'jumba'
// }

// // Gym-specific split types
// export enum GymSplitType {
//   PUSH = 'push',
//   PULL = 'pull',
//   LEGS = 'legs',
//   UPPER = 'upper',
//   LOWER = 'lower',
//   FULL_BODY = 'full-body',
//   ARMS = 'arms',
//   MUSCLE_GROUP = 'muscle-group'
// }

// // Exercise interface with type-safe categorization
// export interface Exercise {
//   id: string;
//   name: string;
//   workoutType: WorkoutType; // Ensures exercises are filtered by type
//   muscleGroup?: string;
//   equipment?: string;
//   custom?: boolean; // For user-created exercises
//   description?: string;
//   difficulty?: string;
// }

// // Gym workout split with enum type
// export interface GymWorkoutSplit {
//   id: GymSplitType;
//   name: string;
//   targetMuscles: string[];
//   suggestedExercises: Exercise[];
// }

// // Workout session with project context support
// export interface WorkoutSession {
//   id: string;
//   // 🚀 FIX: Add missing userId for Firebase compatibility
//   userId: string;
//   type: WorkoutType;
//   exercises: Exercise[];
//   startTime: Date;
//   endTime?: Date;
//   duration: number; // in minutes
//   // 🚀 FIX: Add missing completed status
//   completed: boolean;
//   calories?: number;
//   notes?: string;
  
//   // Project context for project-initiated workouts
//   projectContext?: {
//     projectId: string;
//     projectName: string;
//     dayIndex: number;
//     dayName: string;
//   };

//   // Gym-specific context
//   gymSplitType?: GymSplitType;
//   customMuscleGroups?: string[];

//   // Cardio properties
//   distance?: number;
//   elevation?: number;
//   pace?: number;
//   caloriesBurned?: number;
//   intensity?: number;

//   // Firebase ready
//   _createdAt?: Date;
//   _updatedAt?: Date;

//   // 🚀 NEW: Status tracking for optimistic updates
//   _status?: 'optimistic' | 'synced' | 'error';
//   _optimisticId?: string;

//   // 🚀 NEW: Enhanced analytics fields
//   totalVolume?: number;
//   personalRecords?: PersonalRecord[];
//   workoutMetrics?: WorkoutMetrics;
// }

// // Modal step management for the single modal approach
// export type WorkoutStep = 
//   | 'type-selection'
//   | 'gym-split-selection'
//   | 'exercise-selection'
//   | 'active-session'
//   | 'completion';

// // Gym-specific interfaces
// export interface WorkoutSet {
//   setId: string;
//   exerciseId: string;
//   setNumber: number;
//   reps: number;
//   weight: number;
//   completed: boolean;
//   restTime?: number;
// }

// export interface PersonalRecords {
//   maxReps: number;
//   maxRepsWeight: number;
//   maxWeight: number;
//   maxWeightReps: number;
// }

// export interface WorkoutExercise {
//   id: string;
//   exerciseId: string;
//   name: string;
//   muscleGroup: string;
//   equipment: string;
//   sets: WorkoutSet[];
//   personalRecords: PersonalRecords;
//   volume: number;
//   notes: string;
// }

// // Cardio-specific tracking
// export interface CardioSession extends WorkoutSession {
//   distance?: number;
//   elevation?: number;
//   pace?: number;
//   caloriesBurned?: number;
//   intensity?: number;
// }

// // Structured-specific tracking
// export interface StructuredExerciseSet {
//   setId: string;
//   setNumber: number;
//   reps?: number;
//   time: number; // seconds
//   isActive: boolean;
// }

// export interface StructuredExercise {
//   id: string;
//   exerciseId: string;
//   name: string;
//   muscleGroup?: string;
//   equipment?: string;
//   sets?: StructuredExerciseSet[];
//   duration?: number;
//   reps?: number;
//   isPRTimerActive?: boolean;
// }

// export interface StructuredSession extends WorkoutSession {
//   exercises: Exercise[];
//   trackingMode: 'sets' | 'pr';
// }

// // 🚀 NEW: Analytics and Progress Tracking Interfaces
// export interface WorkoutStats {
//   totalWorkouts: number;
//   workoutsThisWeek: number;
//   workoutsThisMonth: number;
//   totalDuration: number;
//   totalCalories: number;
//   averageDuration: number;
//   favoriteWorkoutType: WorkoutType;
//   currentStreak: number;
//   longestStreak: number;
//   consistency: number;
// }

// export interface PersonalRecord {
//   id: string;
//   exerciseId: string;
//   exerciseName: string;
//   recordType: 'weight' | 'reps' | 'time' | 'distance';
//   value: number;
//   date: Date;
//   workoutId: string;
//   workoutType: WorkoutType;
// }

// export interface WorkoutMetrics {
//   volume: number;
//   intensity: number;
//   efficiency: number;
//   recoveryTime: number;
//   prCount: number;
// }

// export interface WeeklyFrequency {
//   week: string;
//   workoutCount: number;
//   totalDuration: number;
//   caloriesBurned: number;
// }

// export interface ExerciseProgress {
//   exerciseId: string;
//   exerciseName: string;
//   progressData: {
//     date: Date;
//     value: number;
//     workoutId: string;
//   }[];
// }

// // Enhanced session with status tracking
// export interface EnhancedWorkoutSession extends WorkoutSession {
//   _status?: 'optimistic' | 'synced' | 'error';
//   _optimisticId?: string;
// }

// Workout type enumeration - matches your requirements
export enum WorkoutType {
  GYM = 'gym',
  CALISTHENICS = 'calisthenics',
  YOGA = 'yoga',
  RUNNING = 'running',
  CYCLING = 'cycling',
  WALKING = 'walking',
  ELLIPTICAL = 'elliptical',
  JUMBA = 'jumba'
}

// Gym-specific split types
export enum GymSplitType {
  PUSH = 'push',
  PULL = 'pull',
  LEGS = 'legs',
  UPPER = 'upper',
  LOWER = 'lower',
  FULL_BODY = 'full-body',
  ARMS = 'arms',
  MUSCLE_GROUP = 'muscle-group'
}

// Exercise interface with type-safe categorization
export interface Exercise {
  id: string;
  name: string;
  workoutType: WorkoutType; // Ensures exercises are filtered by type
  muscleGroup?: string;
  equipment?: string;
  custom?: boolean; // For user-created exercises
  description?: string;
  difficulty?: string;
}

// Gym workout split with enum type
export interface GymWorkoutSplit {
  id: GymSplitType;
  name: string;
  targetMuscles: string[];
  suggestedExercises: Exercise[];
}

// Workout session with project context support
export interface WorkoutSession {
  id: string;
  // 🚀 FIX: Add missing userId for Firebase compatibility
  userId: string;
  type: WorkoutType;
  exercises: Exercise[];
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  // 🚀 FIX: Add missing completed status
  completed: boolean;
  calories?: number;
  notes?: string;
  
  // Project context for project-initiated workouts
  projectContext?: {
    projectId: string;
    projectName: string;
    dayIndex: number;
    dayName: string;
  };

  // Gym-specific context
  gymSplitType?: GymSplitType;
  customMuscleGroups?: string[];

  // Cardio properties
  distance?: number;
  elevation?: number;
  pace?: number;
  caloriesBurned?: number;
  intensity?: number;

  // Firebase ready
  _createdAt?: Date;
  _updatedAt?: Date;

  // 🚀 NEW: Status tracking for optimistic updates
  _status?: 'optimistic' | 'synced' | 'error';
  _optimisticId?: string;

  // 🚀 NEW: Enhanced analytics fields
  totalVolume?: number;
  personalRecords?: PersonalRecord[];
  workoutMetrics?: WorkoutMetrics;

  // 🚀 NEW: Optional tracking data capture
  trackingData?: WorkoutExercise[] | StructuredExercise[];
  cardioMetrics?: CardioMetrics;
}

// Modal step management for the single modal approach
export type WorkoutStep = 
  | 'type-selection'
  | 'gym-split-selection'
  | 'exercise-selection'
  | 'active-session'
  | 'completion';

// Gym-specific interfaces
export interface WorkoutSet {
  setId: string;
  exerciseId: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
  restTime?: number;
}

export interface PersonalRecords {
  maxReps: number;
  maxRepsWeight: number;
  maxWeight: number;
  maxWeightReps: number;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  sets: WorkoutSet[];
  personalRecords: PersonalRecords;
  volume: number;
  notes: string;
}

// Cardio-specific tracking
export interface CardioSession extends WorkoutSession {
  distance?: number;
  elevation?: number;
  pace?: number;
  caloriesBurned?: number;
  intensity?: number;
}

// Cardio metrics for enhanced tracking
export interface CardioMetrics {
  distance?: number;
  elevation?: number;
  pace?: number;
  intensity?: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
}

// Structured-specific tracking
export interface StructuredExerciseSet {
  setId: string;
  setNumber: number;
  reps?: number;
  time: number; // seconds
  isActive: boolean;
}

export interface StructuredExercise {
  id: string;
  exerciseId: string;
  name: string;
  muscleGroup?: string;
  equipment?: string;
  sets?: StructuredExerciseSet[];
  duration?: number;
  reps?: number;
  isPRTimerActive?: boolean;
}

export interface StructuredSession extends WorkoutSession {
  exercises: Exercise[];
  trackingMode: 'sets' | 'pr';
}

// 🚀 NEW: Analytics and Progress Tracking Interfaces
export interface WorkoutStats {
  totalWorkouts: number;
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  totalDuration: number;
  totalCalories: number;
  averageDuration: number;
  favoriteWorkoutType: WorkoutType;
  currentStreak: number;
  longestStreak: number;
  consistency: number;
}

export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  recordType: 'weight' | 'reps' | 'time' | 'distance';
  value: number;
  date: Date;
  workoutId: string;
  workoutType: WorkoutType;
}

export interface WorkoutMetrics {
  volume: number;
  intensity: number;
  efficiency: number;
  recoveryTime: number;
  prCount: number;
}

export interface WeeklyFrequency {
  week: string;
  workoutCount: number;
  totalDuration: number;
  caloriesBurned: number;
}

export interface ExerciseProgress {
  exerciseId: string;
  exerciseName: string;
  progressData: {
    date: Date;
    value: number;
    workoutId: string;
  }[];
}

// Enhanced session with status tracking
export interface EnhancedWorkoutSession extends WorkoutSession {
  _status?: 'optimistic' | 'synced' | 'error';
  _optimisticId?: string;
}