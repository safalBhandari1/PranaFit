

// /**
//  * Unified User model - Single source of truth for user data
//  * Compatible with Firebase Auth and our app requirements
//  */

// export interface User {
//     // Firebase Auth compatibility
//     uid: string;
//     email: string;
//     displayName: string;
//     photoURL?: string;
    
//     // App-specific fields
//     createdAt: Date;
//     lastActive: Date;
    
//     // GYM MVP FEATURES - ADDED
//     role?: UserRole;
//     gymId?: string;
//     gymRole?: GymRole;
//     phoneNumber?: string;
//     profileImage?: string;
//     updatedAt?: Date;
//   }
  
//   // User Role Types - ADDED
//   export type UserRole = 'member' | 'gym_owner' | 'gym_staff' | 'gym_trainer';
//   export type GymRole = 'owner' | 'staff' | 'trainer';
  
//   // User Registration Data - ADDED
//   export interface UserRegistrationData {
//     name: string;
//     email: string;
//     password: string;
//     role: UserRole;
//     phoneNumber?: string;
//   }
  
//   /**
//    * User preferences for Phase 2 features
//    */
//   export interface UserPreferences {
//     theme: 'light' | 'dark' | 'system';
//     weightUnit: 'kg' | 'lbs';
//     distanceUnit: 'km' | 'miles';
//     defaultWorkoutDuration: number;
//     restTimeBetweenSets: number;
    
//     // Notifications
//     notifications: {
//       workoutReminders: boolean;
//       streakReminders: boolean;
//       goalAchievements: boolean;
//       emailNotifications: boolean;
//       pushNotifications: boolean;
//     };
    
//     // Social features ready
//     social: {
//       isPublic: boolean;
//       allowFollowers: boolean;
//       showProgress: boolean;
//     };
//   }
  
//   /**
//    * Extended user profile for social features
//    */
//   export interface UserProfile {
//     user: User;
//     preferences: UserPreferences;
//     profile?: {
//       bio: string;
//       location: string;
//       website: string;
//       socialLinks: Record<string, string>;
//     };
//     followers?: string[];
//     following?: string[];
//     blockedUsers?: string[];
//   }
  
//   // Export types that might be used by repositories
//   export type { User as UserDocument };

/**
 * Unified User model - Single source of truth for user data
 * Compatible with Firebase Auth and our app requirements
 */

export type UserRole = 'fitness_user' | 'gym_owner' | 'gym_staff' | 'gym_trainer';
export type GymRole = 'owner' | 'staff' | 'trainer' | 'member';

export interface User {
// Document ID - NEW: Now equals Firebase Auth UID
  id: string;

  // Firebase Auth compatibility
  uid: string;  // Keep this field for reference, but id = uid
  email: string;
  displayName: string;
  photoURL?: string;
  
  // App-specific fields
  role: UserRole;
  phoneNumber?: string;
  profileImage?: string;
  
  // Gym memberships (empty array for fitness_user)
  gymMemberships: Array<{
    gymId: string;
    gymRole: GymRole;
    joinedAt: Date;
    isActive: boolean;
    membershipCode?: string; // Gym-specific member ID (e.g., GYM001)
  }>;
  
  // Currently active gym (for users with gym memberships)
  currentGymId?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
}

// User Registration Data
export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
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