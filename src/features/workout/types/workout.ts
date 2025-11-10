
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
    difficulty?:string
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
    type: WorkoutType;
    exercises: Exercise[];
    startTime: Date;
    endTime?: Date;
    duration: number; // in minutes
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
  }
  
  // Modal step management for the single modal approach
  export type WorkoutStep = 
    | 'type-selection'
    | 'gym-split-selection'
    | 'exercise-selection'
    | 'active-session'
    | 'completion';