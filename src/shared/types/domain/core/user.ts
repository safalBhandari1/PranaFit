/**
 * Unified User model - Single source of truth for user data
 * Compatible with Firebase Auth and our app requirements
 */

// UPDATE: src/shared/types/domain/core/user.ts
export type UserRole = 'fitness_user' | 'gym_owner' | 'gym_staff' | 'gym_trainer';
export type GymRole = 'owner' | 'staff' | 'trainer' | 'member';

export interface User {
  // Document ID - Now equals Firebase Auth UID
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
  
  // UPDATED: Gym memberships with memberId reference
  gymMemberships: Array<{
    gymId: string;
    gymRole: GymRole;
    memberId?: string; // ✅ NEW: Reference to gym_members document
    joinedAt: Date;
    isActive: boolean;
    // ❌ REMOVED: membershipCode (now stored in gym_members collection)
  }>;

  // Invitation system support
  pendingInvitations?: string[]; // Array of invitation IDs
  
  
  // Staff invitation tracking
  invitationStats?: {
    sent: number;
    accepted: number;
    lastInvitationSent?: Date;
  };
  
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