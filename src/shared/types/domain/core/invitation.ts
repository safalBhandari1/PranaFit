// NEW FILE: src/shared/types/domain/core/invitation.ts
/**
 * Gym Invitation System - Data Models
 * Features: 7-day expiration, role-based permissions, duplicate prevention
 */

export type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'cancelled' | 'expired';
export type InvitationRole = 'owner' | 'staff' | 'trainer' | 'member';

export interface GymInvitation {
  // Core identifiers
  id: string;
  
  // Gym information
  gymId: string;
  gymName: string;
  
  // Invited user information
  invitedUserId: string;
  invitedUserEmail: string;
  invitedUserName?: string;
  
  // Inviter information (who sent the invitation)
  invitedByName: string;
  invitedByUserId: string;
  invitedByUserRole: 'owner' | 'staff'; // Only owners/staff can invite
  
  // Invitation details
  role: InvitationRole;
  status: InvitationStatus;
  message?: string;

// ✅ NEW: Member data for member invitations
 memberData?: MemberData;
  
  // Timestamps
  createdAt: Date;
  updatedAt?: Date;
  expiresAt: Date; // 7 days from creation
  acceptedAt?: Date;
  declinedAt?: Date;
  cancelledAt?: Date;
  
  // Metadata
  invitationCode: string; // Unique code for tracking
  isRead: boolean;
}

// NEW: Member data interface for invitations
export interface MemberData {
    // Personal Information (Required for member invitations)
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    dateOfBirth?: Date;
    
    // Emergency Contact (REQUIRED for members)
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
    
    // Social Media (Optional)
    socialMedia?: {
      tiktok?: string;
      instagram?: string;
      facebook?: string;
    };
    
    // Additional info
    notes?: string;
    healthNotes?: string;
  }

export interface UserSearchResult {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAlreadyMember: boolean;
  existingRole?: 'owner' | 'staff' | 'trainer' | 'member';
}

export interface InvitationStats {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  expired: number;
}

// Helper types for UI
export interface InvitationFormData {
  invitedUserId: string;
  role: InvitationRole;
  message?: string;
  memberData?: MemberData;
}

// Error types
export type InvitationErrorCode = 
  | 'USER_ALREADY_MEMBER'
  | 'DUPLICATE_INVITATION'
  | 'INSUFFICIENT_PERMISSIONS'
  | 'STAFF_LIMIT_EXCEEDED'
  | 'INVALID_ROLE_SELECTION'
  | 'INVITATION_EXPIRED'
  | 'USER_NOT_FOUND'; 

export class InvitationError extends Error {
  constructor(
    public code: InvitationErrorCode,
    message: string,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = 'InvitationError';
  }
}