// User types
export interface User {
    id: string;
    email: string;
    name: string;
    gymId?: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Workout types
  export type WorkoutType = 'strength' | 'cardio' | 'calisthenics';
  
  export interface WorkoutExercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number; // for cardio/calisthenics
    completed?: boolean;
  }
  
  export interface WorkoutSet {
    id: string;
    setNumber: number;
    reps: number;
    weight?: number;
    completed: boolean;
  }
  
  export interface WorkoutSession {
    id: string;
    userId: string;
    type: WorkoutType;
    startTime: Date;
    endTime?: Date;
    duration: number; // in minutes
    exercises: WorkoutExercise[];
    caloriesBurned?: number;
    notes?: string;
    projectId?: string; // Linked to a training project
    completed: boolean;
  }
  
  // Project types
  export interface TrainingProject {
    id: string;
    userId: string;
    name: string;
    description?: string;
    workouts: WorkoutSession[];
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
    targetGoals?: string[];
  }
  
  // Social types
  export interface UserMatch {
    id: string;
    userId: string;
    matchedUserId: string;
    status: 'pending' | 'matched' | 'rejected';
    createdAt: Date;
  }
  
  export interface ActivityPost {
    id: string;
    userId: string;
    workoutSessionId: string;
    content?: string;
    likes: string[]; // user IDs who liked
    comments: ActivityComment[];
    createdAt: Date;
    visibility: 'public' | 'gym' | 'private';
  }
  
  export interface ActivityComment {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
  }
  
  export interface Follow {
    id: string;
    followerId: string;
    followingId: string;
    createdAt: Date;
  }
  
  // Gym types
  export interface Gym {
    id: string;
    name: string;
    location: string;
    members: string[]; // user IDs
    createdAt: Date;
  }
  
  // Analytics types
  export interface UserStats {
    userId: string;
    totalWorkouts: number;
    totalDuration: number; // in minutes
    totalCalories: number;
    streak: number;
    lastWorkoutDate?: Date;
    favoriteExercise?: string;
  }
  
  export interface WorkoutAnalytics {
    workoutSessionId: string;
    userId: string;
    performanceMetrics: {
      totalVolume: number;
      averageIntensity: number;
      recoveryTime: number;
    };
    improvements: string[];
    recommendations: string[];
  }
  
  // Notification types
  export interface Notification {
    id: string;
    userId: string;
    type: 'like' | 'comment' | 'match' | 'follow' | 'workout_reminder';
    title: string;
    message: string;
    read: boolean;
    relatedId?: string; // ID of related entity (post, user, etc.)
    createdAt: Date;
  }
  
  // App settings types
  export interface UserPreferences {
    userId: string;
    notifications: {
      workoutReminders: boolean;
      socialInteractions: boolean;
      matchRequests: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'gym' | 'private';
      activityVisibility: 'public' | 'gym' | 'private';
    };
    units: 'metric' | 'imperial';
    theme: 'light' | 'dark' | 'auto';
  }
  
  // Template types
  export interface WorkoutTemplate {
    id: string;
    name: string;
    type: WorkoutType;
    exercises: WorkoutExercise[];
    description?: string;
    estimatedDuration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string[];
  }
  
  // Match analytics types
  export interface MatchPreferences {
    userId: string;
    preferredGymTime: string[]; // ['morning', 'afternoon', 'evening']
    workoutTypes: WorkoutType[];
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    goals: string[];
    ageRange?: [number, number];
  }
  
  // Export all types as a namespace for easier access
  export * as DomainTypes from './index';