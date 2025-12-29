/**
 * Gym Service - Business logic layer following AuthService pattern
 */

import { 
    Gym, 
    GymMember, 
    CheckinRecord, 
    PaymentRecord,
    CreateGymMemberDTO, 
    GymPackage
  } from '../types/domain/core/gym';
  import { User } from '../types/domain/core/user';
  import { gymRepository } from './repositories/GymRepository';
  import { gymMemberRepository } from './repositories/GymMemberRepository';
  import { checkinRepository } from './repositories/CheckinRepository';
  import { paymentRepository } from './repositories/PaymentRepository';
  import { userRepository } from './repositories/UserRepository';
  import { UserFriendlyError } from '../utils/errorHandler';
  
  export class GymService {
    /**
     * Create a new gym with owner assignment
     */
    async createGymWithOwner(gymData: any, ownerId: string): Promise<{ gymId: string; gym: Gym }> {
      try {
        // Check if owner already has a gym
        const existingGyms = await gymRepository.getGymsByOwner(ownerId);
        if (existingGyms.length > 0) {
          throw new UserFriendlyError(
            'Gym already exists',
            'You already own a gym. You can only own one gym at a time.',
            'GYM_ALREADY_EXISTS',
            false
          );
        }
  
        // Create gym
        const gymId = await gymRepository.createGym({
          ...gymData,
          ownerId
        });
  
        // Get the created gym
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym creation failed',
            'Failed to create gym. Please try again.',
            'GYM_CREATION_FAILED',
            true
          );
        }
  
        // Update user role to gym_owner
        await userRepository.updateUserRole(ownerId, 'gym_owner', gymId);
  
        return { gymId, gym };
      } catch (error: any) {
        console.error('❌ Error creating gym with owner:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to create gym',
          'An unexpected error occurred. Please try again.',
          'GYM_SERVICE_ERROR',
          true
        );
      }
    }
  
    /**
     * Add a member to gym (basic - without package)
     */
    async addGymMember(
      gymId: string, 
      userId: string, 
      memberData: Omit<CreateGymMemberDTO, 'gymId' | 'userId'> = {}
    ): Promise<{ memberId: string; member: GymMember }> {
      try {
        // Validate gym exists
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
          );
        }
  
        // Validate user exists
        const user = await userRepository.getById(userId);
        if (!user) {
          throw new UserFriendlyError(
            'User not found',
            'The user does not exist.',
            'USER_NOT_FOUND',
            false
          );
        }
  
        // Check if user is already a member
        const existingMember = await gymMemberRepository.getMemberByUserAndGym(userId, gymId);
        if (existingMember) {
          throw new UserFriendlyError(
            'Already a member',
            'This user is already a member of this gym.',
            'ALREADY_MEMBER',
            false
          );
        }
  
        // Create member
        const memberId = await gymMemberRepository.createMember({
          gymId,
          userId,
          ...memberData
        });
  
        // Get created member
        const member = await gymMemberRepository.getById(memberId);
        if (!member) {
          throw new UserFriendlyError(
            'Member creation failed',
            'Failed to create member. Please try again.',
            'MEMBER_CREATION_FAILED',
            true
          );
        }
  
        // Update user's role
        await userRepository.updateUserRole(userId, 'member', gymId);
  
        // Update gym stats
        await gymRepository.updateGymStats(gymId, {
          totalMembers: (gym.totalMembers || 0) + 1,
          activeMembers: (gym.activeMembers || 0) + 1
        });
  
        return { memberId, member };
      } catch (error: any) {
        console.error('❌ Error adding gym member:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to add member',
          'An unexpected error occurred. Please try again.',
          'MEMBER_SERVICE_ERROR',
          true
        );
      }
    }
  
    /**
     * Assign package to existing member
     */
    async assignPackageToMember(
      gymId: string,
      memberId: string,
      packageId: string
    ): Promise<void> {
      try {
        // Validate gym exists
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
          );
        }
  
        // Validate member exists and belongs to this gym
        const member = await gymMemberRepository.getById(memberId);
        if (!member || member.gymId !== gymId) {
          throw new UserFriendlyError(
            'Member not found',
            'The member does not exist or is not part of this gym.',
            'MEMBER_NOT_FOUND',
            false
          );
        }
  
        // Find the package in gym's packages
        const gymPackage = gym.packages.find(p => p.id === packageId);
        if (!gymPackage) {
          throw new UserFriendlyError(
            'Package not found',
            'The selected package does not exist in this gym.',
            'PACKAGE_NOT_FOUND',
            false
          );
        }
  
        // Use repository to assign package
        await gymMemberRepository.assignPackageToMember(memberId, packageId, gymPackage);
  
      } catch (error: any) {
        console.error('❌ Error assigning package to member:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to assign package',
          'An unexpected error occurred. Please try again.',
          'PACKAGE_ASSIGNMENT_ERROR',
          true
        );
      }
    }
  
    /**
     * Add member with package in one step (convenience method)
     */
    async addGymMemberWithPackage(
      gymId: string, 
      userId: string,
      packageId: string,
      memberData: Omit<CreateGymMemberDTO, 'gymId' | 'userId' | 'packageId'> = {}
    ): Promise<{ memberId: string; member: GymMember }> {
      try {
        // First add the member
        const { memberId, member } = await this.addGymMember(gymId, userId, memberData);
        
        // Then assign the package
        await this.assignPackageToMember(gymId, memberId, packageId);
        
        // Get updated member with package
        const updatedMember = await gymMemberRepository.getById(memberId);
        if (!updatedMember) {
          throw new UserFriendlyError(
            'Member update failed',
            'Failed to assign package to member.',
            'PACKAGE_ASSIGNMENT_FAILED',
            true
          );
        }
  
        return { memberId, member: updatedMember };
      } catch (error: any) {
        console.error('❌ Error adding gym member with package:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to add member with package',
          'An unexpected error occurred. Please try again.',
          'MEMBER_WITH_PACKAGE_ERROR',
          true
        );
      }
    }
  
    /**
     * Record checkin with validation
     */
    async recordCheckin(
      gymId: string,
      memberId: string,
      userId: string,
      method: string,
      location?: any
    ): Promise<{ checkinId: string; checkin: CheckinRecord }> {
      try {
        // Validate gym and member
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
          );
        }
  
        const member = await gymMemberRepository.getById(memberId);
        if (!member || member.gymId !== gymId) {
          throw new UserFriendlyError(
            'Member not found',
            'The member does not exist or is not part of this gym.',
            'MEMBER_NOT_FOUND',
            false
          );
        }
  
        if (member.status !== 'active') {
          throw new UserFriendlyError(
            'Inactive member',
            'This member account is not active.',
            'MEMBER_INACTIVE',
            false
          );
        }
  
        // Create checkin
        const checkinId = await checkinRepository.create({
          gymId,
          memberId,
          userId,
          method: method as any,
          checkinTime: new Date(),
          notes: `Checkin via ${method}`,
          location,
          createdAt: new Date()
        });
  
        // Get created checkin
        const checkin = await checkinRepository.getById(checkinId);
        if (!checkin) {
          throw new UserFriendlyError(
            'Checkin creation failed',
            'Failed to record checkin. Please try again.',
            'CHECKIN_CREATION_FAILED',
            true
          );
        }
  
        // Update member stats
        await gymMemberRepository.updateCheckinStats(memberId, new Date());
  
        // Update gym stats
        await gymRepository.updateGymStats(gymId, {
          totalCheckinsToday: (gym.totalCheckinsToday || 0) + 1
        });
  
        return { checkinId, checkin };
      } catch (error: any) {
        console.error('❌ Error recording checkin:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to record checkin',
          'An unexpected error occurred. Please try again.',
          'CHECKIN_SERVICE_ERROR',
          true
        );
      }
    }
  
    /**
     * Record payment with validation
     */
    async recordPayment(
      gymId: string,
      memberId: string,
      userId: string,
      paymentData: any
    ): Promise<{ paymentId: string; payment: PaymentRecord }> {
      try {
        // Validate gym and member
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
          );
        }
  
        const member = await gymMemberRepository.getById(memberId);
        if (!member || member.gymId !== gymId) {
          throw new UserFriendlyError(
            'Member not found',
            'The member does not exist or is not part of this gym.',
            'MEMBER_NOT_FOUND',
            false
          );
        }
  
        // Create payment
        const paymentId = await paymentRepository.create({
          gymId,
          memberId,
          userId,
          amount: paymentData.amount,
          currency: paymentData.currency || 'NPR',
          method: paymentData.method,
          status: 'completed',
          paymentDate: new Date(),
          dueDate: paymentData.dueDate,
          periodStart: paymentData.periodStart,
          periodEnd: paymentData.periodEnd,
          packageId: paymentData.packageId,
          notes: paymentData.notes,
          createdAt: new Date(),
          updatedAt: new Date()
        });
  
        // Get created payment
        const payment = await paymentRepository.getById(paymentId);
        if (!payment) {
          throw new UserFriendlyError(
            'Payment creation failed',
            'Failed to record payment. Please try again.',
            'PAYMENT_CREATION_FAILED',
            true
          );
        }
  
        // Update member payment status
        await gymMemberRepository.updatePaymentStatus(memberId, {
          amount: paymentData.amount,
          paymentDate: new Date(),
          nextPaymentDate: paymentData.nextPaymentDate,
          status: 'completed'
        });
  
        // Update gym revenue
        await gymRepository.updateGymStats(gymId, {
          monthlyRevenue: (gym.monthlyRevenue || 0) + paymentData.amount
        });
  
        return { paymentId, payment };
      } catch (error: any) {
        console.error('❌ Error recording payment:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to record payment',
          'An unexpected error occurred. Please try again.',
          'PAYMENT_SERVICE_ERROR',
          true
        );
      }
    }
  
    /**
     * Get gym dashboard data
     */
    async getGymDashboard(gymId: string): Promise<{
      gym: Gym;
      stats: {
        totalMembers: number;
        activeMembers: number;
        newMembersThisMonth: number;
        checkinsToday: number;
        revenueThisMonth: number;
        overduePayments: number;
      };
      recentCheckins: CheckinRecord[];
      recentPayments: PaymentRecord[];
    }> {
      try {
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
          );
        }
  
        const [members, checkinsToday, paymentsThisMonth, overdueMembers] = await Promise.all([
          gymMemberRepository.getMembersByGym(gymId),
          checkinRepository.getTodayCheckins(gymId),
          paymentRepository.getMonthlyPayments(gymId),
          gymMemberRepository.getOverdueMembers(gymId)
        ]);
  
        const activeMembers = members.filter(m => m.status === 'active');
        const newMembersThisMonth = members.filter(m => {
          const joinDate = m.joinDate;
          const now = new Date();
          return joinDate.getMonth() === now.getMonth() && 
                 joinDate.getFullYear() === now.getFullYear();
        });
  
        const stats = {
          totalMembers: members.length,
          activeMembers: activeMembers.length,
          newMembersThisMonth: newMembersThisMonth.length,
          checkinsToday: checkinsToday.length,
          revenueThisMonth: paymentsThisMonth.reduce((sum, p) => sum + p.amount, 0),
          overduePayments: overdueMembers.length
        };
  
        const recentCheckins = checkinsToday.slice(0, 10);
        const recentPayments = paymentsThisMonth.slice(0, 10);
  
        return { gym, stats, recentCheckins, recentPayments };
      } catch (error: any) {
        console.error('❌ Error getting gym dashboard:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to load dashboard',
          'An unexpected error occurred. Please try again.',
          'DASHBOARD_LOAD_ERROR',
          true
        );
      }
    }
  
    /**
     * Check if user can perform action based on role
     */
    async checkPermission(
      userId: string,
      gymId: string,
      requiredPermission: string
    ): Promise<boolean> {
      try {
        const user = await userRepository.getById(userId);
        if (!user) return false;
  
        // Gym owners have all permissions
        if (user.role === 'gym_owner' && user.gymId === gymId) {
          return true;
        }
  
        // Check staff permissions
        if ((user.role === 'gym_staff' || user.role === 'gym_trainer') && user.gymId === gymId) {
          // This would check against gym staff permissions table
          // For now, basic implementation
          return true;
        }
  
        return false;
      } catch (error) {
        console.error('❌ Error checking permission:', error);
        return false;
      }
    }
  
    /**
     * Add gym staff/trainer
     */
    async addGymStaff(
      gymId: string,
      userId: string,
      staffRole: 'gym_staff' | 'gym_trainer',
      staffData?: {
        permissions?: {
          canCheckin: boolean;
          canRecordPayments: boolean;
          canManageMembers: boolean;
          canViewReports: boolean;
          canManageStaff?: boolean;
        };
        specialization?: string[];
        bio?: string;
        hourlyRate?: number;
      }
    ): Promise<void> {
      try {
        // Validate gym exists
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
          throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
          );
        }
  
        // Validate user exists
        const user = await userRepository.getById(userId);
        if (!user) {
          throw new UserFriendlyError(
            'User not found',
            'The user does not exist.',
            'USER_NOT_FOUND',
            false
          );
        }
  
        // Use UserRepository to update user role
        await userRepository.updateUserRole(userId, staffRole, gymId);
        
      } catch (error: any) {
        console.error('❌ Error adding gym staff:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to add staff',
          'An unexpected error occurred. Please try again.',
          'STAFF_SERVICE_ERROR',
          true
        );
      }
    }
  
    /**
     * Remove user from gym
     */
    async removeFromGym(
      gymId: string,
      userId: string
    ): Promise<void> {
      try {
        // Remove gym member record
        const member = await gymMemberRepository.getMemberByUserAndGym(userId, gymId);
        if (member) {
          await gymMemberRepository.delete(member.id);
          
          // Update gym stats
          const gym = await gymRepository.getById(gymId);
          if (gym) {
            await gymRepository.updateGymStats(gymId, {
              totalMembers: Math.max(0, (gym.totalMembers || 0) - 1),
              activeMembers: Math.max(0, (gym.activeMembers || 0) - 1)
            });
          }
        }
  
        // Clear user's gym association
        const user = await userRepository.getById(userId);
        if (user && user.gymId === gymId) {
          // Reset to regular member without gym
          await userRepository.update(userId, {
            gymId: undefined,
            gymRole: undefined,
            updatedAt: new Date()
          });
        }
        
      } catch (error: any) {
        console.error('❌ Error removing from gym:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to remove from gym',
          'An unexpected error occurred. Please try again.',
          'REMOVE_GYM_ERROR',
          true
        );
      }
    }

    /**
     * Add a new package to gym
     */
    async addGymPackage(
        gymId: string,
        packageData: Omit<GymPackage, 'id' | 'createdAt'>
    ): Promise<{ packageId: string; gymPackage: GymPackage }> {
        try {
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
            throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
            );
        }
    
        // Create new package with ID and timestamp
        const newPackage: GymPackage = {
            ...packageData,
            id: `pkg_${Date.now()}_${gym.packages.length}`,
            createdAt: new Date(),
            isActive: packageData.isActive !== undefined ? packageData.isActive : true
        };
    
        // Add to gym's packages
        const updatedPackages = [...gym.packages, newPackage];
        await gymRepository.update(gymId, {
            packages: updatedPackages,
            updatedAt: new Date()
        });
    
        return { packageId: newPackage.id, gymPackage: newPackage };
        } catch (error: any) {
        console.error('❌ Error adding gym package:', error);
        if (error instanceof UserFriendlyError) {
            throw error;
        }
        throw new UserFriendlyError(
            'Failed to add package',
            'An unexpected error occurred. Please try again.',
            'ADD_PACKAGE_ERROR',
            true
        );
        }
    }
    
    /**
     * Update existing gym package
     */
    async updateGymPackage(
        gymId: string,
        packageId: string,
        updateData: Partial<Omit<GymPackage, 'id' | 'createdAt'>>
    ): Promise<void> {
        try {
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
            throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
            );
        }
    
        // Find the package to update
        const packageIndex = gym.packages.findIndex(p => p.id === packageId);
        if (packageIndex === -1) {
            throw new UserFriendlyError(
            'Package not found',
            'The package does not exist in this gym.',
            'PACKAGE_NOT_FOUND',
            false
            );
        }
    
        // Update the package
        const updatedPackages = [...gym.packages];
        updatedPackages[packageIndex] = {
            ...updatedPackages[packageIndex], // Keep existing ID and createdAt
            ...updateData,                    // Apply updates
            isActive: updateData.isActive !== undefined 
            ? updateData.isActive 
            : updatedPackages[packageIndex].isActive
        };
    
        await gymRepository.update(gymId, {
            packages: updatedPackages,
            updatedAt: new Date()
        });
        } catch (error: any) {
        console.error('❌ Error updating gym package:', error);
        if (error instanceof UserFriendlyError) {
            throw error;
        }
        throw new UserFriendlyError(
            'Failed to update package',
            'An unexpected error occurred. Please try again.',
            'UPDATE_PACKAGE_ERROR',
            true
        );
        }
    }
    
    /**
     * Delete gym package
     */
    async deleteGymPackage(gymId: string, packageId: string): Promise<void> {
        try {
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
            throw new UserFriendlyError(
            'Gym not found',
            'The gym does not exist.',
            'GYM_NOT_FOUND',
            false
            );
        }
    
        // Check if package exists
        const packageExists = gym.packages.some(p => p.id === packageId);
        if (!packageExists) {
            throw new UserFriendlyError(
            'Package not found',
            'The package does not exist in this gym.',
            'PACKAGE_NOT_FOUND',
            false
            );
        }
    
        // Remove package
        const updatedPackages = gym.packages.filter(p => p.id !== packageId);
        await gymRepository.update(gymId, {
            packages: updatedPackages,
            updatedAt: new Date()
        });
        } catch (error: any) {
        console.error('❌ Error deleting gym package:', error);
        if (error instanceof UserFriendlyError) {
            throw error;
        }
        throw new UserFriendlyError(
            'Failed to delete package',
            'An unexpected error occurred. Please try again.',
            'DELETE_PACKAGE_ERROR',
            true
        );
        }
    }
  }
  
  export const gymService = new GymService();