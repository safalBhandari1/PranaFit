// shared/types/domain/core/user.ts

/**
 * Unified User model - Single source of truth for user data
 * Compatible with Firebase Auth and our app requirements
 */

export interface User {
    // Firebase Auth compatibility
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    
    // App-specific fields
    createdAt: Date;
    lastActive: Date;
    
    // Phase 2 ready - Gym & Social features
    gymId?: string;
    profileImage?: string;
    updatedAt?: Date;
  }
  
  /**
   * User preferences for Phase 2 features
   */
  export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    weightUnit: 'kg' | 'lbs';
    distanceUnit: 'km' | 'miles';
    defaultWorkoutDuration: number;
    restTimeBetweenSets: number;
    
    // Notifications
    notifications: {
      workoutReminders: boolean;
      streakReminders: boolean;
      goalAchievements: boolean;
      emailNotifications: boolean;
      pushNotifications: boolean;
    };
    
    // Social features ready
    social: {
      isPublic: boolean;
      allowFollowers: boolean;
      showProgress: boolean;
    };
  }
  
  /**
   * Extended user profile for social features
   */
  export interface UserProfile {
    user: User;
    preferences: UserPreferences;
    profile?: {
      bio: string;
      location: string;
      website: string;
      socialLinks: Record<string, string>;
    };
    followers?: string[];
    following?: string[];
    blockedUsers?: string[];
  }
  
  // Export types that might be used by repositories
  export type { User as UserDocument };