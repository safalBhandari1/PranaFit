// NEW FILE: src/shared/services/PermissionService.ts
/**
 * Permission Service - Enforces role hierarchy for gym invitations
 * Rules:
 * - Owner: Can invite all roles (owner, staff, trainer, member)
 * - Staff: Can invite members only (max 500 total)
 * - Trainer/Member: Cannot invite anyone
 */

import { InvitationRole } from '../types/domain/core/invitation';

export class PermissionService {
  private static readonly roleHierarchy: string[] = ['owner', 'staff', 'trainer', 'member'];
  
  /**
   * Check if inviter can invite to target role
   */
  static canInviteRole(inviterRole: string, targetRole: InvitationRole): boolean {
    // Convert to lowercase for safety
    const inviter = inviterRole.toLowerCase();
    const target = targetRole.toLowerCase();
    
    // Owner can invite all roles
    if (inviter === 'owner') {
      return true;
    }
    
    // Staff can only invite members
    if (inviter === 'staff' && target === 'member') {
      return true;
    }
    
    // Trainer and members cannot invite anyone
    return false;
  }
  
  /**
   * Get invitable roles based on inviter's role
   */
  static getInvitableRoles(inviterRole: string): InvitationRole[] {
    const role = inviterRole.toLowerCase();
    
    switch (role) {
      case 'owner':
        return ['owner', 'staff', 'trainer', 'member'];
      case 'staff':
        return ['member'];
      case 'trainer':
      case 'member':
      default:
        return [];
    }
  }
  
  /**
   * Validate staff invitation limit (max 500)
   */
  static canStaffSendInvitation(staffId: string, currentCount: number): boolean {
    // Staff can only send up to 500 invitations
    return currentCount < 500;
  }
  
  /**
   * Check if user can delete member (only owners)
   */
  static canDeleteMember(userRole: string): boolean {
    return userRole.toLowerCase() === 'owner';
  }
  
  /**
   * Check if user can record/edit payments (owners and staff)
   */
  static canManagePayments(userRole: string): boolean {
    const role = userRole.toLowerCase();
    return role === 'owner' || role === 'staff';
  }
  
  /**
   * Check if user can assign packages (owners and staff)
   */
  static canAssignPackages(userRole: string): boolean {
    const role = userRole.toLowerCase();
    return role === 'owner' || role === 'staff';
  }
  
  /**
   * Get role priority for sorting (lower number = higher priority)
   */
  static getRolePriority(role: string): number {
    const index = this.roleHierarchy.indexOf(role.toLowerCase());
    return index !== -1 ? index : 999;
  }
}