// CORRECTED: src/shared/services/InvitationService.ts
/**
 * Invitation Service - Core business logic for gym invitations
 * Features: 7-day expiration, duplicate prevention, role validation
 */

import { 
    GymInvitation, 
    InvitationStatus, 
    InvitationRole,
    InvitationFormData,
    InvitationError,
    InvitationErrorCode,
    UserSearchResult
  } from '../types/domain/core/invitation';
  import { User } from '../types/domain/core/user';
  import { Gym } from '../types/domain/core/gym';
  import { PermissionService } from './PermissionService';
  import { userRepository } from './repositories/UserRepository';
  import { gymRepository } from './repositories/GymRepository';
  import { BaseRepository } from './repositories/BaseRepository';
  import { UserFriendlyError } from '../utils/errorHandler';
  import { where, QueryConstraint } from 'firebase/firestore';
  
  // Extended BaseRepository for invitations
  class InvitationRepository extends BaseRepository<GymInvitation> {
    constructor() {
      super('invitations');
    }
    
    async getPendingInvitation(gymId: string, userId: string): Promise<GymInvitation | null> {
      try {
        // Use Firebase QueryConstraint format
        const constraints: QueryConstraint[] = [
          where('gymId', '==', gymId),
          where('invitedUserId', '==', userId),
          where('status', '==', 'pending')
        ];
        
        const invitations = await this.query(constraints);
        return invitations.length > 0 ? invitations[0] : null;
      } catch (error) {
        console.error('Error getting pending invitation:', error);
        return null;
      }
    }
    
    async getInvitationsBySender(gymId: string, senderId: string): Promise<GymInvitation[]> {
      try {
        const constraints: QueryConstraint[] = [
          where('gymId', '==', gymId),
          where('invitedByUserId', '==', senderId),
          where('status', '==', 'pending')
        ];
        
        return await this.query(constraints);
      } catch (error) {
        console.error('Error getting invitations by sender:', error);
        return [];
      }
    }
    
    async getInvitationsForUser(userId: string): Promise<GymInvitation[]> {
      try {
        const constraints: QueryConstraint[] = [
          where('invitedUserId', '==', userId),
          where('status', '==', 'pending')
        ];
        
        return await this.query(constraints);
      } catch (error) {
        console.error('Error getting invitations for user:', error);
        return [];
      }
    }
    
    async getExpiredInvitations(): Promise<GymInvitation[]> {
      try {
        const now = new Date();
        const allInvitations = await this.getAll();
        
        return allInvitations.filter(invitation => 
          invitation.status === 'pending' && 
          invitation.expiresAt < now
        );
      } catch (error) {
        console.error('Error getting expired invitations:', error);
        return [];
      }
    }
  }
  
  export class InvitationService {
    private invitationRepo: InvitationRepository;
    
    constructor() {
      this.invitationRepo = new InvitationRepository();
    }
    
    /**
     * Generate a unique invitation code
     */
    private generateInvitationCode(): string {
      // Use timestamp + random string
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `PRANA-${timestamp}-${randomStr}`;
    }
    
    /**
     * Search for users to invite (by email or name)
     */
    async searchUsers(searchTerm: string, currentGymId: string): Promise<UserSearchResult[]> {
      if (!searchTerm || searchTerm.trim().length < 2) {
        return [];
      }
      
      const term = searchTerm.trim().toLowerCase();
      const allUsers = await userRepository.getAll();
      
      // Get current gym to check existing members
      const gym = await gymRepository.getById(currentGymId);
      if (!gym) return [];
      
      // Create set of existing member IDs for quick lookup
      const existingMemberIds = new Set([
        ...gym.owners,
        ...gym.staff,
        ...gym.trainers,
        ...gym.members
      ]);
      
      // Filter users by search term
      const filteredUsers = allUsers.filter(user => {
        const emailMatch = user.email.toLowerCase().includes(term);
        const nameMatch = user.displayName?.toLowerCase().includes(term) || false;
        return emailMatch || nameMatch;
      });
      
      // Transform to search results
      return filteredUsers.map(user => {
        const isAlreadyMember = existingMemberIds.has(user.id);
        let existingRole: 'owner' | 'staff' | 'trainer' | 'member' | undefined;
        
        if (isAlreadyMember) {
          // Find user's role in this gym
          const membership = user.gymMemberships?.find(m => m.gymId === currentGymId);
          existingRole = membership?.gymRole;
        }
        
        return {
          id: user.id,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL,
          isAlreadyMember,
          existingRole
        };
      });
    }
    

/**
 * Send invitation to a user (UPDATED: NO member data collection for member invitations)
 * @throws InvitationError with specific error codes
 */
async sendInvitation(
    gymId: string,
    formData: InvitationFormData,
    inviterUserId: string,
    inviterName: string,
    inviterRole: string
  ): Promise<{ success: boolean; invitationId?: string; error?: string }> {
    try {
      console.log('🎯 Starting invitation process:', { 
        gymId, 
        invitedUserId: formData.invitedUserId,
        role: formData.role,
        hasMemberData: !!formData.memberData 
      });
      
      // ✅ UPDATED: NO member data validation for member invitations
      if (formData.role === 'member') {
        console.log('📋 Member invitation - data will be collected by USER at acceptance time');
        // We NO LONGER require memberData when sending member invitations
        // Users will provide their own data when accepting
        
        // Clear any memberData that might have been accidentally included
        formData.memberData = undefined;
      }
      
      // 1. Validate all entities exist
      const [gym, targetUser, inviter] = await Promise.all([
        gymRepository.getById(gymId),
        userRepository.getById(formData.invitedUserId),
        userRepository.getById(inviterUserId)
      ]);
      
      if (!gym) {
        throw new InvitationError('USER_NOT_FOUND', 'Gym not found');
      }
      
      if (!targetUser) {
        throw new InvitationError('USER_NOT_FOUND', 'User not found');
      }
      
      if (!inviter) {
        throw new InvitationError('USER_NOT_FOUND', 'Inviter not found');
      }
      
      console.log('✅ All entities validated');
      
      // 2. Check inviter's permission to invite to this role
      if (!PermissionService.canInviteRole(inviterRole, formData.role)) {
        throw new InvitationError(
          'INSUFFICIENT_PERMISSIONS', 
          `You don't have permission to invite ${formData.role}s`
        );
      }
      
      console.log('✅ Permission validated');
      
      // 3. Check if user is already a member of this gym
      const existingMembership = targetUser.gymMemberships?.find(m => 
        m.gymId === gymId && m.isActive
      );
      
      if (existingMembership) {
        throw new InvitationError(
          'USER_ALREADY_MEMBER',
          `User is already a ${existingMembership.gymRole} in this gym`
        );
      }
      
      console.log('✅ User is not already a member');
      
      // 4. Check for pending invitations (prevent duplicates)
      const existingInvitation = await this.invitationRepo.getPendingInvitation(
        gymId, 
        formData.invitedUserId
      );
      
      if (existingInvitation) {
        const isExpired = new Date() > existingInvitation.expiresAt;
        
        if (!isExpired) {
          throw new InvitationError(
            'DUPLICATE_INVITATION',
            'User already has a pending invitation'
          );
        } else {
          // Mark expired invitation as expired
          await this.invitationRepo.update(existingInvitation.id, {
            status: 'expired',
            updatedAt: new Date()
          });
        }
      }
      
      console.log('✅ No duplicate invitations found');
      
      // 5. For staff, check invitation limit (max 500)
      if (inviterRole === 'staff') {
        const staffInvitations = await this.invitationRepo.getInvitationsBySender(
          gymId, 
          inviterUserId
        );
        
        const acceptedInvitations = staffInvitations.filter(i => i.status === 'accepted').length;
        
        if (!PermissionService.canStaffSendInvitation(inviterUserId, acceptedInvitations)) {
          throw new InvitationError(
            'STAFF_LIMIT_EXCEEDED',
            'Staff invitation limit reached (max 500 members)'
          );
        }
      }
      
      console.log('✅ Staff limit validated (if applicable)');
      
      // 6. Create invitation object
      const now = new Date();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration
      
      const invitationData: Omit<GymInvitation, 'id'> = {
        gymId,
        gymName: gym.name,
        invitedUserId: formData.invitedUserId,
        invitedUserEmail: targetUser.email,
        invitedUserName: targetUser.displayName,
        invitedByName: inviterName,
        invitedByUserId: inviterUserId,
        invitedByUserRole: inviterRole as 'owner' | 'staff',
        role: formData.role,
        status: 'pending',
        message: formData.message?.trim(),
        
        // ✅ UPDATED: NO memberData for member invitations
        // Users will provide their own data at acceptance time
        memberData: undefined, // Always undefined now
        
        createdAt: now,
        expiresAt,
        invitationCode: this.generateInvitationCode(),
        isRead: false
      };
      
      console.log('📝 Creating invitation WITHOUT member data for member invitations');
      
      // 7. Save invitation (Firebase will auto-generate ID)
      const invitationId = await this.invitationRepo.create(invitationData);
      
      // 8. Add to user's pending invitations
      await this.addPendingInvitationToUser(formData.invitedUserId, invitationId);
      
      // 9. Update inviter's stats
      await this.updateInviterStats(inviterUserId);
      
      console.log('✅ Invitation sent successfully, ID:', invitationId);
      
      return { success: true, invitationId };
      
    } catch (error: any) {
      console.error('❌ Error sending invitation:', error);
      
      if (error instanceof InvitationError) {
        return { 
          success: false, 
          error: error.message 
        };
      }
      
      return { 
        success: false, 
        error: 'Failed to send invitation. Please try again.' 
      };
    }
  }
    
    /**
     * Accept an invitation
     */
    async acceptInvitation(invitationId: string, userId: string): Promise<{ 
        success: boolean; 
        error?: string;
        invitation?: GymInvitation;
    }> {
        try {
        console.log('🎯 Accepting invitation:', { invitationId, userId });
        
        const invitation = await this.invitationRepo.getById(invitationId);
        
        if (!invitation) {
            return { success: false, error: 'Invitation not found' };
        }
        
        if (invitation.invitedUserId !== userId) {
            return { success: false, error: 'This invitation is not for you' };
        }
        
        if (invitation.status !== 'pending') {
            return { success: false, error: 'Invitation is no longer valid' };
        }
        
        if (new Date() > invitation.expiresAt) {
            await this.invitationRepo.update(invitationId, {
            status: 'expired',
            updatedAt: new Date()
            });
            return { success: false, error: 'Invitation has expired' };
        }
        
        console.log('✅ Invitation validated, proceeding to accept...');
        
        // Update invitation status FIRST
        await this.invitationRepo.update(invitationId, {
            status: 'accepted',
            acceptedAt: new Date(),
            updatedAt: new Date()
        });
        
        // Remove from user's pending invitations
        await this.removePendingInvitationFromUser(userId, invitationId);
        
        console.log('✅ Invitation marked as accepted');
        
        return { 
            success: true,
            invitation: { ...invitation, status: 'accepted', acceptedAt: new Date() }
        };
        
        } catch (error: any) {
        console.error('❌ Error accepting invitation:', error);
        return { 
            success: false, 
            error: error.message || 'Failed to accept invitation' 
        };
        }
    }
    
    // Add this new method to the InvitationService class:
    async getInvitationDetails(invitationId: string): Promise<GymInvitation | null> {
        return this.invitationRepo.getById(invitationId);
    }
    
    async getUserPendingInvitationsCount(userId: string): Promise<number> {
        const invitations = await this.getUserPendingInvitations(userId);
        return invitations.length;
    }
    
    /**
     * Decline an invitation
     */
    async declineInvitation(invitationId: string, userId: string): Promise<{ success: boolean; error?: string }> {
      try {
        const invitation = await this.invitationRepo.getById(invitationId);
        
        if (!invitation || invitation.invitedUserId !== userId) {
          return { success: false, error: 'Invitation not found' };
        }
        
        await this.invitationRepo.update(invitationId, {
          status: 'declined',
          declinedAt: new Date(),
          updatedAt: new Date()
        });
        
        await this.removePendingInvitationFromUser(userId, invitationId);
        
        return { success: true };
        
      } catch (error: any) {
        console.error('Error declining invitation:', error);
        return { success: false, error: 'Failed to decline invitation' };
      }
    }
    
    /**
     * Cancel an invitation (by sender)
     */
    async cancelInvitation(invitationId: string, senderId: string): Promise<{ success: boolean; error?: string }> {
      try {
        const invitation = await this.invitationRepo.getById(invitationId);
        
        if (!invitation || invitation.invitedByUserId !== senderId) {
          return { success: false, error: 'Invitation not found or you are not the sender' };
        }
        
        if (invitation.status !== 'pending') {
          return { success: false, error: 'Only pending invitations can be cancelled' };
        }
        
        await this.invitationRepo.update(invitationId, {
          status: 'cancelled',
          cancelledAt: new Date(),
          updatedAt: new Date()
        });
        
        await this.removePendingInvitationFromUser(invitation.invitedUserId, invitationId);
        
        return { success: true };
        
      } catch (error: any) {
        console.error('Error cancelling invitation:', error);
        return { success: false, error: 'Failed to cancel invitation' };
      }
    }
    
    /**
     * Get user's pending invitations
     */
    async getUserPendingInvitations(userId: string): Promise<GymInvitation[]> {
      try {
        const user = await userRepository.getById(userId);
        if (!user?.pendingInvitations?.length) {
          return [];
        }
        
        const invitations = await Promise.all(
          user.pendingInvitations.map(id => this.invitationRepo.getById(id))
        );
        
        return invitations.filter(Boolean) as GymInvitation[];
        
      } catch (error) {
        console.error('Error getting user invitations:', error);
        return [];
      }
    }
    
    /**
     * Clean up expired invitations (cron job)
     */
    async cleanupExpiredInvitations(): Promise<void> {
      try {
        const expiredInvitations = await this.invitationRepo.getExpiredInvitations();
        
        for (const invitation of expiredInvitations) {
          await this.invitationRepo.update(invitation.id, {
            status: 'expired',
            updatedAt: new Date()
          });
          
          await this.removePendingInvitationFromUser(invitation.invitedUserId, invitation.id);
        }
        
      } catch (error) {
        console.error('Error cleaning up expired invitations:', error);
      }
    }
    
    /**
     * Get invitation stats for a gym
     */
    async getGymInvitationStats(gymId: string): Promise<{
      total: number;
      pending: number;
      accepted: number;
      declined: number;
      expired: number;
    }> {
      try {
        const allInvitations = await this.invitationRepo.getAll();
        const gymInvitations = allInvitations.filter(i => i.gymId === gymId);
        
        return {
          total: gymInvitations.length,
          pending: gymInvitations.filter(i => i.status === 'pending').length,
          accepted: gymInvitations.filter(i => i.status === 'accepted').length,
          declined: gymInvitations.filter(i => i.status === 'declined').length,
          expired: gymInvitations.filter(i => i.status === 'expired').length
        };
      } catch (error) {
        console.error('Error getting invitation stats:', error);
        return { total: 0, pending: 0, accepted: 0, declined: 0, expired: 0 };
      }
    }
    
    // Private helper methods
    
    private async addPendingInvitationToUser(userId: string, invitationId: string): Promise<void> {
      const user = await userRepository.getById(userId);
      if (!user) return;
      
      const pendingInvitations = [...(user.pendingInvitations || []), invitationId];
      
      await userRepository.update(userId, {
        pendingInvitations,
        updatedAt: new Date()
      });
    }
    
    private async removePendingInvitationFromUser(userId: string, invitationId: string): Promise<void> {
      const user = await userRepository.getById(userId);
      if (!user?.pendingInvitations) return;
      
      const pendingInvitations = user.pendingInvitations.filter(id => id !== invitationId);
      
      await userRepository.update(userId, {
        pendingInvitations,
        updatedAt: new Date()
      });
    }
    
    private async updateInviterStats(inviterId: string): Promise<void> {
      const inviter = await userRepository.getById(inviterId);
      if (!inviter) return;
      
      const currentStats = inviter.invitationStats || { sent: 0, accepted: 0 };
      
      await userRepository.update(inviterId, {
        invitationStats: {
          ...currentStats,
          sent: currentStats.sent + 1,
          lastInvitationSent: new Date()
        },
        updatedAt: new Date()
      });
    }
  }
  
  // Export singleton instance
  export const invitationService = new InvitationService();