// /**
//  * Gym Service - Business logic layer following AuthService pattern
//  */

// import { 
//     Gym, 
//     GymMember, 
//     CheckinRecord, 
//     PaymentRecord,
//     CreateGymMemberDTO, 
//     GymPackage
//   } from '../types/domain/core/gym';
//   import { User } from '../types/domain/core/user';
//   import { gymRepository } from './repositories/GymRepository';
//   import { gymMemberRepository } from './repositories/GymMemberRepository';
//   import { checkinRepository } from './repositories/CheckinRepository';
//   import { paymentRepository } from './repositories/PaymentRepository';
//   import { userRepository } from './repositories/UserRepository';
//   import { UserFriendlyError } from '../utils/errorHandler';
  
//   export class GymService {
//     /**
//      * Create a new gym with owner assignment
//      */
//     async createGymWithOwner(gymData: any, ownerId: string): Promise<{ gymId: string; gym: Gym }> {
//       try {
//         // Check if owner already has a gym
//         const existingGyms = await gymRepository.getGymsByOwner(ownerId);
//         if (existingGyms.length > 0) {
//           throw new UserFriendlyError(
//             'Gym already exists',
//             'You already own a gym. You can only own one gym at a time.',
//             'GYM_ALREADY_EXISTS',
//             false
//           );
//         }
  
//         // Create gym
//         const gymId = await gymRepository.createGym({
//           ...gymData,
//           ownerId
//         });
  
//         // Get the created gym
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym creation failed',
//             'Failed to create gym. Please try again.',
//             'GYM_CREATION_FAILED',
//             true
//           );
//         }
  
//         // Update user role to gym_owner
//         await userRepository.updateUserRole(ownerId, 'gym_owner', gymId);
  
//         return { gymId, gym };
//       } catch (error: any) {
//         console.error('❌ Error creating gym with owner:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to create gym',
//           'An unexpected error occurred. Please try again.',
//           'GYM_SERVICE_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Add a member to gym (basic - without package)
//      */
//     async addGymMember(
//       gymId: string, 
//       userId: string, 
//       memberData: Omit<CreateGymMemberDTO, 'gymId' | 'userId'> = {}
//     ): Promise<{ memberId: string; member: GymMember }> {
//       try {
//         // Validate gym exists
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//           );
//         }
  
//         // Validate user exists
//         const user = await userRepository.getById(userId);
//         if (!user) {
//           throw new UserFriendlyError(
//             'User not found',
//             'The user does not exist.',
//             'USER_NOT_FOUND',
//             false
//           );
//         }
  
//         // Check if user is already a member
//         const existingMember = await gymMemberRepository.getMemberByUserAndGym(userId, gymId);
//         if (existingMember) {
//           throw new UserFriendlyError(
//             'Already a member',
//             'This user is already a member of this gym.',
//             'ALREADY_MEMBER',
//             false
//           );
//         }
  
//         // Create member
//         const memberId = await gymMemberRepository.createMember({
//           gymId,
//           userId,
//           ...memberData
//         });
  
//         // Get created member
//         const member = await gymMemberRepository.getById(memberId);
//         if (!member) {
//           throw new UserFriendlyError(
//             'Member creation failed',
//             'Failed to create member. Please try again.',
//             'MEMBER_CREATION_FAILED',
//             true
//           );
//         }
  
//         // Update user's role
//         await userRepository.updateUserRole(userId, 'member', gymId);
  
//         // Update gym stats
//         await gymRepository.updateGymStats(gymId, {
//           totalMembers: (gym.totalMembers || 0) + 1,
//           activeMembers: (gym.activeMembers || 0) + 1
//         });
  
//         return { memberId, member };
//       } catch (error: any) {
//         console.error('❌ Error adding gym member:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to add member',
//           'An unexpected error occurred. Please try again.',
//           'MEMBER_SERVICE_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Assign package to existing member
//      */
//     async assignPackageToMember(
//       gymId: string,
//       memberId: string,
//       packageId: string
//     ): Promise<void> {
//       try {
//         // Validate gym exists
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//           );
//         }
  
//         // Validate member exists and belongs to this gym
//         const member = await gymMemberRepository.getById(memberId);
//         if (!member || member.gymId !== gymId) {
//           throw new UserFriendlyError(
//             'Member not found',
//             'The member does not exist or is not part of this gym.',
//             'MEMBER_NOT_FOUND',
//             false
//           );
//         }
  
//         // Find the package in gym's packages
//         const gymPackage = gym.packages.find(p => p.id === packageId);
//         if (!gymPackage) {
//           throw new UserFriendlyError(
//             'Package not found',
//             'The selected package does not exist in this gym.',
//             'PACKAGE_NOT_FOUND',
//             false
//           );
//         }
  
//         // Use repository to assign package
//         await gymMemberRepository.assignPackageToMember(memberId, packageId, gymPackage);
  
//       } catch (error: any) {
//         console.error('❌ Error assigning package to member:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to assign package',
//           'An unexpected error occurred. Please try again.',
//           'PACKAGE_ASSIGNMENT_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Add member with package in one step (convenience method)
//      */
//     async addGymMemberWithPackage(
//       gymId: string, 
//       userId: string,
//       packageId: string,
//       memberData: Omit<CreateGymMemberDTO, 'gymId' | 'userId' | 'packageId'> = {}
//     ): Promise<{ memberId: string; member: GymMember }> {
//       try {
//         // First add the member
//         const { memberId, member } = await this.addGymMember(gymId, userId, memberData);
        
//         // Then assign the package
//         await this.assignPackageToMember(gymId, memberId, packageId);
        
//         // Get updated member with package
//         const updatedMember = await gymMemberRepository.getById(memberId);
//         if (!updatedMember) {
//           throw new UserFriendlyError(
//             'Member update failed',
//             'Failed to assign package to member.',
//             'PACKAGE_ASSIGNMENT_FAILED',
//             true
//           );
//         }
  
//         return { memberId, member: updatedMember };
//       } catch (error: any) {
//         console.error('❌ Error adding gym member with package:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to add member with package',
//           'An unexpected error occurred. Please try again.',
//           'MEMBER_WITH_PACKAGE_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Record checkin with validation
//      */
//     async recordCheckin(
//       gymId: string,
//       memberId: string,
//       userId: string,
//       method: string,
//       location?: any
//     ): Promise<{ checkinId: string; checkin: CheckinRecord }> {
//       try {
//         // Validate gym and member
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//           );
//         }
  
//         const member = await gymMemberRepository.getById(memberId);
//         if (!member || member.gymId !== gymId) {
//           throw new UserFriendlyError(
//             'Member not found',
//             'The member does not exist or is not part of this gym.',
//             'MEMBER_NOT_FOUND',
//             false
//           );
//         }
  
//         if (member.status !== 'active') {
//           throw new UserFriendlyError(
//             'Inactive member',
//             'This member account is not active.',
//             'MEMBER_INACTIVE',
//             false
//           );
//         }
  
//         // Create checkin
//         const checkinId = await checkinRepository.create({
//           gymId,
//           memberId,
//           userId,
//           method: method as any,
//           checkinTime: new Date(),
//           notes: `Checkin via ${method}`,
//           location,
//           createdAt: new Date()
//         });
  
//         // Get created checkin
//         const checkin = await checkinRepository.getById(checkinId);
//         if (!checkin) {
//           throw new UserFriendlyError(
//             'Checkin creation failed',
//             'Failed to record checkin. Please try again.',
//             'CHECKIN_CREATION_FAILED',
//             true
//           );
//         }
  
//         // Update member stats
//         await gymMemberRepository.updateCheckinStats(memberId, new Date());
  
//         // Update gym stats
//         await gymRepository.updateGymStats(gymId, {
//           totalCheckinsToday: (gym.totalCheckinsToday || 0) + 1
//         });
  
//         return { checkinId, checkin };
//       } catch (error: any) {
//         console.error('❌ Error recording checkin:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to record checkin',
//           'An unexpected error occurred. Please try again.',
//           'CHECKIN_SERVICE_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Record payment with validation
//      */
//     async recordPayment(
//       gymId: string,
//       memberId: string,
//       userId: string,
//       paymentData: any
//     ): Promise<{ paymentId: string; payment: PaymentRecord }> {
//       try {
//         // Validate gym and member
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//           );
//         }
  
//         const member = await gymMemberRepository.getById(memberId);
//         if (!member || member.gymId !== gymId) {
//           throw new UserFriendlyError(
//             'Member not found',
//             'The member does not exist or is not part of this gym.',
//             'MEMBER_NOT_FOUND',
//             false
//           );
//         }
  
//         // Create payment
//         const paymentId = await paymentRepository.create({
//           gymId,
//           memberId,
//           userId,
//           amount: paymentData.amount,
//           currency: paymentData.currency || 'NPR',
//           method: paymentData.method,
//           status: 'completed',
//           paymentDate: new Date(),
//           dueDate: paymentData.dueDate,
//           periodStart: paymentData.periodStart,
//           periodEnd: paymentData.periodEnd,
//           packageId: paymentData.packageId,
//           notes: paymentData.notes,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         });
  
//         // Get created payment
//         const payment = await paymentRepository.getById(paymentId);
//         if (!payment) {
//           throw new UserFriendlyError(
//             'Payment creation failed',
//             'Failed to record payment. Please try again.',
//             'PAYMENT_CREATION_FAILED',
//             true
//           );
//         }
  
//         // Update member payment status
//         await gymMemberRepository.updatePaymentStatus(memberId, {
//           amount: paymentData.amount,
//           paymentDate: new Date(),
//           nextPaymentDate: paymentData.nextPaymentDate,
//           status: 'completed'
//         });
  
//         // Update gym revenue
//         await gymRepository.updateGymStats(gymId, {
//           monthlyRevenue: (gym.monthlyRevenue || 0) + paymentData.amount
//         });
  
//         return { paymentId, payment };
//       } catch (error: any) {
//         console.error('❌ Error recording payment:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to record payment',
//           'An unexpected error occurred. Please try again.',
//           'PAYMENT_SERVICE_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Get gym dashboard data
//      */
//     async getGymDashboard(gymId: string): Promise<{
//       gym: Gym;
//       stats: {
//         totalMembers: number;
//         activeMembers: number;
//         newMembersThisMonth: number;
//         checkinsToday: number;
//         revenueThisMonth: number;
//         overduePayments: number;
//       };
//       recentCheckins: CheckinRecord[];
//       recentPayments: PaymentRecord[];
//     }> {
//       try {
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//           );
//         }
  
//         const [members, checkinsToday, paymentsThisMonth, overdueMembers] = await Promise.all([
//           gymMemberRepository.getMembersByGym(gymId),
//           checkinRepository.getTodayCheckins(gymId),
//           paymentRepository.getMonthlyPayments(gymId),
//           gymMemberRepository.getOverdueMembers(gymId)
//         ]);
  
//         const activeMembers = members.filter(m => m.status === 'active');
//         const newMembersThisMonth = members.filter(m => {
//           const joinDate = m.joinDate;
//           const now = new Date();
//           return joinDate.getMonth() === now.getMonth() && 
//                  joinDate.getFullYear() === now.getFullYear();
//         });
  
//         const stats = {
//           totalMembers: members.length,
//           activeMembers: activeMembers.length,
//           newMembersThisMonth: newMembersThisMonth.length,
//           checkinsToday: checkinsToday.length,
//           revenueThisMonth: paymentsThisMonth.reduce((sum, p) => sum + p.amount, 0),
//           overduePayments: overdueMembers.length
//         };
  
//         const recentCheckins = checkinsToday.slice(0, 10);
//         const recentPayments = paymentsThisMonth.slice(0, 10);
  
//         return { gym, stats, recentCheckins, recentPayments };
//       } catch (error: any) {
//         console.error('❌ Error getting gym dashboard:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to load dashboard',
//           'An unexpected error occurred. Please try again.',
//           'DASHBOARD_LOAD_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Check if user can perform action based on role
//      */
//     async checkPermission(
//       userId: string,
//       gymId: string,
//       requiredPermission: string
//     ): Promise<boolean> {
//       try {
//         const user = await userRepository.getById(userId);
//         if (!user) return false;
  
//         // Gym owners have all permissions
//         if (user.role === 'gym_owner' && user.gymId === gymId) {
//           return true;
//         }
  
//         // Check staff permissions
//         if ((user.role === 'gym_staff' || user.role === 'gym_trainer') && user.gymId === gymId) {
//           // This would check against gym staff permissions table
//           // For now, basic implementation
//           return true;
//         }
  
//         return false;
//       } catch (error) {
//         console.error('❌ Error checking permission:', error);
//         return false;
//       }
//     }
  
//     /**
//      * Add gym staff/trainer
//      */
//     async addGymStaff(
//       gymId: string,
//       userId: string,
//       staffRole: 'gym_staff' | 'gym_trainer',
//       staffData?: {
//         permissions?: {
//           canCheckin: boolean;
//           canRecordPayments: boolean;
//           canManageMembers: boolean;
//           canViewReports: boolean;
//           canManageStaff?: boolean;
//         };
//         specialization?: string[];
//         bio?: string;
//         hourlyRate?: number;
//       }
//     ): Promise<void> {
//       try {
//         // Validate gym exists
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//           throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//           );
//         }
  
//         // Validate user exists
//         const user = await userRepository.getById(userId);
//         if (!user) {
//           throw new UserFriendlyError(
//             'User not found',
//             'The user does not exist.',
//             'USER_NOT_FOUND',
//             false
//           );
//         }
  
//         // Use UserRepository to update user role
//         await userRepository.updateUserRole(userId, staffRole, gymId);
        
//       } catch (error: any) {
//         console.error('❌ Error adding gym staff:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to add staff',
//           'An unexpected error occurred. Please try again.',
//           'STAFF_SERVICE_ERROR',
//           true
//         );
//       }
//     }
  
//     /**
//      * Remove user from gym
//      */
//     async removeFromGym(
//       gymId: string,
//       userId: string
//     ): Promise<void> {
//       try {
//         // Remove gym member record
//         const member = await gymMemberRepository.getMemberByUserAndGym(userId, gymId);
//         if (member) {
//           await gymMemberRepository.delete(member.id);
          
//           // Update gym stats
//           const gym = await gymRepository.getById(gymId);
//           if (gym) {
//             await gymRepository.updateGymStats(gymId, {
//               totalMembers: Math.max(0, (gym.totalMembers || 0) - 1),
//               activeMembers: Math.max(0, (gym.activeMembers || 0) - 1)
//             });
//           }
//         }
  
//         // Clear user's gym association
//         const user = await userRepository.getById(userId);
//         if (user && user.gymId === gymId) {
//           // Reset to regular member without gym
//           await userRepository.update(userId, {
//             gymId: undefined,
//             gymRole: undefined,
//             updatedAt: new Date()
//           });
//         }
        
//       } catch (error: any) {
//         console.error('❌ Error removing from gym:', error);
//         if (error instanceof UserFriendlyError) {
//           throw error;
//         }
//         throw new UserFriendlyError(
//           'Failed to remove from gym',
//           'An unexpected error occurred. Please try again.',
//           'REMOVE_GYM_ERROR',
//           true
//         );
//       }
//     }

//     /**
//      * Add a new package to gym
//      */
//     async addGymPackage(
//         gymId: string,
//         packageData: Omit<GymPackage, 'id' | 'createdAt'>
//     ): Promise<{ packageId: string; gymPackage: GymPackage }> {
//         try {
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//             throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//             );
//         }
    
//         // Create new package with ID and timestamp
//         const newPackage: GymPackage = {
//             ...packageData,
//             id: `pkg_${Date.now()}_${gym.packages.length}`,
//             createdAt: new Date(),
//             isActive: packageData.isActive !== undefined ? packageData.isActive : true
//         };
    
//         // Add to gym's packages
//         const updatedPackages = [...gym.packages, newPackage];
//         await gymRepository.update(gymId, {
//             packages: updatedPackages,
//             updatedAt: new Date()
//         });
    
//         return { packageId: newPackage.id, gymPackage: newPackage };
//         } catch (error: any) {
//         console.error('❌ Error adding gym package:', error);
//         if (error instanceof UserFriendlyError) {
//             throw error;
//         }
//         throw new UserFriendlyError(
//             'Failed to add package',
//             'An unexpected error occurred. Please try again.',
//             'ADD_PACKAGE_ERROR',
//             true
//         );
//         }
//     }
    
//     /**
//      * Update existing gym package
//      */
//     async updateGymPackage(
//         gymId: string,
//         packageId: string,
//         updateData: Partial<Omit<GymPackage, 'id' | 'createdAt'>>
//     ): Promise<void> {
//         try {
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//             throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//             );
//         }
    
//         // Find the package to update
//         const packageIndex = gym.packages.findIndex(p => p.id === packageId);
//         if (packageIndex === -1) {
//             throw new UserFriendlyError(
//             'Package not found',
//             'The package does not exist in this gym.',
//             'PACKAGE_NOT_FOUND',
//             false
//             );
//         }
    
//         // Update the package
//         const updatedPackages = [...gym.packages];
//         updatedPackages[packageIndex] = {
//             ...updatedPackages[packageIndex], // Keep existing ID and createdAt
//             ...updateData,                    // Apply updates
//             isActive: updateData.isActive !== undefined 
//             ? updateData.isActive 
//             : updatedPackages[packageIndex].isActive
//         };
    
//         await gymRepository.update(gymId, {
//             packages: updatedPackages,
//             updatedAt: new Date()
//         });
//         } catch (error: any) {
//         console.error('❌ Error updating gym package:', error);
//         if (error instanceof UserFriendlyError) {
//             throw error;
//         }
//         throw new UserFriendlyError(
//             'Failed to update package',
//             'An unexpected error occurred. Please try again.',
//             'UPDATE_PACKAGE_ERROR',
//             true
//         );
//         }
//     }
    
//     /**
//      * Delete gym package
//      */
//     async deleteGymPackage(gymId: string, packageId: string): Promise<void> {
//         try {
//         const gym = await gymRepository.getById(gymId);
//         if (!gym) {
//             throw new UserFriendlyError(
//             'Gym not found',
//             'The gym does not exist.',
//             'GYM_NOT_FOUND',
//             false
//             );
//         }
    
//         // Check if package exists
//         const packageExists = gym.packages.some(p => p.id === packageId);
//         if (!packageExists) {
//             throw new UserFriendlyError(
//             'Package not found',
//             'The package does not exist in this gym.',
//             'PACKAGE_NOT_FOUND',
//             false
//             );
//         }
    
//         // Remove package
//         const updatedPackages = gym.packages.filter(p => p.id !== packageId);
//         await gymRepository.update(gymId, {
//             packages: updatedPackages,
//             updatedAt: new Date()
//         });
//         } catch (error: any) {
//         console.error('❌ Error deleting gym package:', error);
//         if (error instanceof UserFriendlyError) {
//             throw error;
//         }
//         throw new UserFriendlyError(
//             'Failed to delete package',
//             'An unexpected error occurred. Please try again.',
//             'DELETE_PACKAGE_ERROR',
//             true
//         );
//         }
//     }
//   }
  
//   export const gymService = new GymService();


import { Gym, CreateGymDTO, UpdateGymDTO, GymMember, CreateGymMemberDTO } from '../types/domain/core/gym';
import { User } from '../types/domain/core/user';
import { gymRepository } from './repositories/GymRepository';
import { userRepository } from './repositories/UserRepository';
import { gymMemberRepository } from './repositories/GymMemberRepository';
import { checkinRepository } from './repositories/CheckinRepository';
import { paymentRepository } from './repositories/PaymentRepository';
import { UserFriendlyError } from '../utils/errorHandler';

export class GymService {
  /**
   * Create a new gym with multiple owners support
   */
  async createGymWithOwners(gymData: CreateGymDTO, ownerUserIds: string[]): Promise<Gym> {
    try {
      if (!ownerUserIds || ownerUserIds.length === 0) {
        throw new UserFriendlyError(
          'No owners specified',
          'At least one owner must be specified when creating a gym',
          'NO_OWNERS_SPECIFIED',
          false
        );
      }

      // Validate all owners exist
      const ownerPromises = ownerUserIds.map(userId => userRepository.getById(userId));
      const owners = await Promise.all(ownerPromises);
      
      const missingOwners = owners.filter(owner => !owner);
      if (missingOwners.length > 0) {
        throw new UserFriendlyError(
          'Invalid owners',
          'One or more specified owners do not exist',
          'INVALID_OWNERS',
          false
        );
      }

      // Create gym with owners array
      const gymToCreate = {
        ...gymData,
        // Initialize empty arrays for other roles
        owners: ownerUserIds,
        staff: [],
        trainers: [],
        members: [],
        
        // Set initial statistics
        totalMembers: 0,
        activeMembers: 0,
        totalCheckinsToday: 0,
        monthlyRevenue: 0,
        
        // Status
        status: 'active' as const,
      };

      // Create gym in Firestore
      const gymId = await gymRepository.createGym(gymToCreate);
      const gym = await gymRepository.getById(gymId);
      
      if (!gym) {
        throw new UserFriendlyError(
          'Gym creation failed',
          'Failed to retrieve created gym',
          'GYM_CREATION_FAILED',
          false
        );
      }

      // Update each owner's gym membership
      const updatePromises = ownerUserIds.map(async (ownerId) => {
        // Get current user
        const owner = await userRepository.getById(ownerId);
        if (!owner) return;

        // Create gym membership entry
        const updatedMemberships = [
          ...(owner.gymMemberships || []),
          {
            gymId: gym.id,
            gymRole: 'owner' as const,
            joinedAt: new Date(),
            isActive: true,
            membershipCode: `OWNER_${gym.slug.toUpperCase()}_${ownerId.slice(0, 4)}`
          }
        ];

        // Update user with new membership and set as current gym
        await userRepository.update(ownerId, {
          gymMemberships: updatedMemberships,
          currentGymId: gym.id, // Set as current gym
          updatedAt: new Date(),
          // Update role to gym_owner if not already
          role: owner.role === 'fitness_user' ? 'gym_owner' : owner.role
        });
      });

      await Promise.all(updatePromises);
      console.log(`✅ Gym "${gym.name}" created with ${ownerUserIds.length} owner(s)`);
      return gym;

    } catch (error: any) {
      console.error('❌ Error creating gym with owners:', error);
      console.log('🔍 POST-FIX: User lookup result for', ownerUserIds[0], ':', {
        user: await userRepository.getById(ownerUserIds[0]),
        hasId: !!(await userRepository.getById(ownerUserIds[0]))?.id,
        hasUid: !!(await userRepository.getById(ownerUserIds[0]))?.uid
      });
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        
        'Failed to create gym',
        error.message || 'Please try again',
        'GYM_CREATION_ERROR',
        true
      );
    }

    
  }

  /**
   * Add a gym member (paying member)
   */
    //   async addGymMember(memberData: CreateGymMemberDTO): Promise<GymMember> {
    //     try {
    //       const { gymId, userId, ...rest } = memberData;

    //       // Verify gym exists
    //       const gym = await gymRepository.getById(gymId);
    //       if (!gym) {
    //         throw new UserFriendlyError(
    //           'Gym not found',
    //           'The specified gym does not exist',
    //           'GYM_NOT_FOUND',
    //           false
    //         );
    //       }

    //       // Verify user exists
    //       const user = await userRepository.getById(userId);
    //       if (!user) {
    //         throw new UserFriendlyError(
    //           'User not found',
    //           'The specified user does not exist',
    //           'USER_NOT_FOUND',
    //           false
    //         );
    //       }

    //       // Generate member code if not provided
    //       const memberCode = rest.memberCode || `M${gym.slug.toUpperCase()}_${(gym.totalMembers + 1).toString().padStart(3, '0')}`;

    //       // Create gym member record
    //       const gymMember = await gymMemberRepository.createMember({
    //         gymId,
    //         userId,
    //         memberCode,
    //         status: 'active',
    //         joinDate: rest.joinDate || new Date(),
    //         totalCheckins: 0,
    //         totalPaid: 0,
    //         paymentStatus: 'pending',
    //         autoRenew: true,
    //         ...rest
    //       });

    //       // Update user's gym membership
    //       const updatedMemberships = [
    //         ...(user.gymMemberships || []),
    //         {
    //           gymId,
    //           gymRole: 'member' as const,
    //           joinedAt: new Date(),
    //           isActive: true,
    //           membershipCode: memberCode
    //         }
    //       ];

    //       await userRepository.update(userId, {
    //         gymMemberships: updatedMemberships,
    //         // Don't set as currentGymId for members automatically
    //         updatedAt: new Date()
    //       });

    //       // Update gym's members array and statistics
    //       await gymRepository.update(gymId, {
    //         members: [...gym.members, userId],
    //         totalMembers: (gym.totalMembers || 0) + 1,
    //         activeMembers: (gym.activeMembers || 0) + 1,
    //         updatedAt: new Date()
    //       });

    //       console.log(`✅ Added member ${memberCode} to gym ${gym.name}`);
    //       return gymMember;

    //     } catch (error: any) {
    //       console.error('❌ Error adding gym member:', error);
    //       if (error instanceof UserFriendlyError) {
    //         throw error;
    //       }
    //       throw new UserFriendlyError(
    //         'Failed to add gym member',
    //         error.message || 'Please try again',
    //         'ADD_MEMBER_ERROR',
    //         true
    //       );
    //     }
    //   }
    async addGymMember(memberData: CreateGymMemberDTO): Promise<GymMember> {
        try {
        const { gymId, userId, ...rest } = memberData;
    
        // Verify gym exists
        const gym = await gymRepository.getById(gymId);
        if (!gym) {
            throw new UserFriendlyError(
            'Gym not found',
            'The specified gym does not exist',
            'GYM_NOT_FOUND',
            false
            );
        }
    
        // Verify user exists
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new UserFriendlyError(
            'User not found',
            'The specified user does not exist',
            'USER_NOT_FOUND',
            false
            );
        }
    
        // Generate member code if not provided
        const memberCode = rest.memberCode || `M${gym.slug.toUpperCase()}_${(gym.totalMembers + 1).toString().padStart(3, '0')}`;
    
        // Create gym member record - ONLY PASS DTO FIELDS
        const memberId = await gymMemberRepository.createMember({
            gymId,
            userId,
            memberCode,
            joinDate: rest.joinDate || new Date(),
            notes: rest.notes
        });
    
        // Get the created member to return
        const gymMember = await gymMemberRepository.getById(memberId);
        if (!gymMember) {
            throw new UserFriendlyError(
            'Member creation failed',
            'Failed to retrieve created member',
            'MEMBER_CREATION_FAILED',
            false
            );
        }
    
        // Update user's gym membership
        const updatedMemberships = [
            ...(user.gymMemberships || []),
            {
            gymId,
            gymRole: 'member' as const,
            joinedAt: new Date(),
            isActive: true,
            membershipCode: memberCode
            }
        ];
    
        await userRepository.update(userId, {
            gymMemberships: updatedMemberships,
            // Don't set as currentGymId for members automatically
            updatedAt: new Date()
        });
    
        // Update gym's members array and statistics
        await gymRepository.update(gymId, {
            members: [...gym.members, userId],
            totalMembers: (gym.totalMembers || 0) + 1,
            activeMembers: (gym.activeMembers || 0) + 1,
            updatedAt: new Date()
        });
    
        console.log(`✅ Added member ${memberCode} to gym ${gym.name}`);
        return gymMember;
    
        } catch (error: any) {
        console.error('❌ Error adding gym member:', error);
        if (error instanceof UserFriendlyError) {
            throw error;
        }
        throw new UserFriendlyError(
            'Failed to add gym member',
            error.message || 'Please try again',
            'ADD_MEMBER_ERROR',
            true
        );
        }
    }

  /**
   * Add additional owner to gym
   */
  async addGymOwner(gymId: string, newOwnerId: string): Promise<void> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError(
          'Gym not found',
          'The specified gym does not exist',
          'GYM_NOT_FOUND',
          false
        );
      }

      // Check if already an owner
      if (gym.owners.includes(newOwnerId)) {
        throw new UserFriendlyError(
          'Already an owner',
          'This user is already an owner of this gym',
          'ALREADY_OWNER',
          false
        );
      }

      // Get new owner user
      const newOwner = await userRepository.getById(newOwnerId);
      if (!newOwner) {
        throw new UserFriendlyError(
          'User not found',
          'The specified user does not exist',
          'USER_NOT_FOUND',
          false
        );
      }

      // Update gym's owners array
      await gymRepository.update(gymId, {
        owners: [...gym.owners, newOwnerId],
        updatedAt: new Date()
      });

      // Update user's gym membership
      const updatedMemberships = [
        ...(newOwner.gymMemberships || []),
        {
          gymId,
          gymRole: 'owner' as const,
          joinedAt: new Date(),
          isActive: true,
          membershipCode: `OWNER_${gym.slug.toUpperCase()}_${newOwnerId.slice(0, 4)}`
        }
      ];

      await userRepository.update(newOwnerId, {
        gymMemberships: updatedMemberships,
        // Update role to gym_owner if not already
        role: newOwner.role === 'fitness_user' ? 'gym_owner' : newOwner.role,
        updatedAt: new Date()
      });

      console.log(`✅ Added ${newOwner.displayName} as owner to ${gym.name}`);

    } catch (error: any) {
      console.error('❌ Error adding gym owner:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to add gym owner',
        error.message || 'Please try again',
        'ADD_OWNER_ERROR',
        true
      );
    }
  }

  /**
   * Switch user's current active gym
   */
  async switchCurrentGym(userId: string, gymId: string): Promise<void> {
    try {
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new UserFriendlyError(
          'User not found',
          'The specified user does not exist',
          'USER_NOT_FOUND',
          false
        );
      }

      // Verify user has access to this gym
      const hasAccess = user.gymMemberships?.some(m => m.gymId === gymId);
      if (!hasAccess) {
        throw new UserFriendlyError(
          'No access to gym',
          'You do not have access to this gym',
          'NO_GYM_ACCESS',
          false
        );
      }

      // Update user's current gym
      await userRepository.update(userId, {
        currentGymId: gymId,
        updatedAt: new Date()
      });

      console.log(`✅ Switched ${user.displayName}'s current gym to ${gymId}`);
    } catch (error: any) {
      console.error('❌ Error switching gym:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to switch gym',
        error.message || 'Please try again',
        'SWITCH_GYM_ERROR',
        true
      );
    }
  }

  /**
   * Get all gyms a user has access to
   */
  async getUserGyms(userId: string): Promise<Gym[]> {
    try {
      const user = await userRepository.getById(userId);
      if (!user || !user.gymMemberships || user.gymMemberships.length === 0) {
        return [];
      }

      // Get all gyms the user has access to
      const gymPromises = user.gymMemberships.map(m => gymRepository.getById(m.gymId));
      const gyms = await Promise.all(gymPromises);
      
      // Filter out null gyms and return
      return gyms.filter((gym): gym is Gym => gym !== null);
    } catch (error: any) {
      console.error('❌ Error getting user gyms:', error);
      return [];
    }
  }

  /**
   * Remove user from gym (any role)
   */
  async removeUserFromGym(gymId: string, userId: string): Promise<void> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError(
          'Gym not found',
          'The specified gym does not exist',
          'GYM_NOT_FOUND',
          false
        );
      }

      const user = await userRepository.getById(userId);
      if (!user) {
        throw new UserFriendlyError(
          'User not found',
          'The specified user does not exist',
          'USER_NOT_FOUND',
          false
        );
      }

      // Find user's role in this gym
      const userMembership = user.gymMemberships?.find(m => m.gymId === gymId);
      if (!userMembership) {
        throw new UserFriendlyError(
          'User not in gym',
          'This user is not a member of this gym',
          'USER_NOT_IN_GYM',
          false
        );
      }

      // Remove from gym's appropriate array
      const updateData: any = { updatedAt: new Date() };
      
      switch (userMembership.gymRole) {
        case 'owner':
          updateData.owners = gym.owners.filter(id => id !== userId);
          break;
        case 'staff':
          updateData.staff = gym.staff.filter(id => id !== userId);
          break;
        case 'trainer':
          updateData.trainers = gym.trainers.filter(id => id !== userId);
          break;
        case 'member':
          updateData.members = gym.members.filter(id => id !== userId);
          // Also update statistics
          updateData.totalMembers = Math.max(0, (gym.totalMembers || 0) - 1);
          updateData.activeMembers = Math.max(0, (gym.activeMembers || 0) - 1);
          break;
      }

      await gymRepository.update(gymId, updateData);

      // Remove from user's gym memberships
      const updatedMemberships = user.gymMemberships?.filter(m => m.gymId !== gymId) || [];
      await userRepository.update(userId, {
        gymMemberships: updatedMemberships,
        // If this was the current gym, clear it
        currentGymId: user.currentGymId === gymId ? undefined : user.currentGymId,
        updatedAt: new Date()
      });

      console.log(`✅ Removed ${user.displayName} from ${gym.name}`);
    } catch (error: any) {
      console.error('❌ Error removing user from gym:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to remove user from gym',
        error.message || 'Please try again',
        'REMOVE_USER_ERROR',
        true
      );
    }
  }

  /**
   * Get gym dashboard data
   */
  async getGymDashboard(gymId: string): Promise<{
    gym: Gym;
    totalMembers: number;
    activeMembers: number;
    checkinsToday: number;
    revenueThisMonth: number;
    recentCheckins: any[];
    recentPayments: any[];
  }> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError(
          'Gym not found',
          'The specified gym does not exist',
          'GYM_NOT_FOUND',
          false
        );
      }

      // Get recent checkins (today)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const recentCheckins = await checkinRepository.getTodayCheckins(gymId);
      const recentPayments = await paymentRepository.getRecentPayments(gymId, 10);

      return {
        gym,
        totalMembers: gym.totalMembers || 0,
        activeMembers: gym.activeMembers || 0,
        checkinsToday: gym.totalCheckinsToday || 0,
        revenueThisMonth: gym.monthlyRevenue || 0,
        recentCheckins,
        recentPayments
      };
    } catch (error: any) {
      console.error('❌ Error getting gym dashboard:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to load gym dashboard',
        error.message || 'Please try again',
        'DASHBOARD_ERROR',
        true
      );
    }
  }

  /**
   * Add staff/trainer to gym
   */
  async addGymStaff(gymId: string, userId: string, role: 'staff' | 'trainer'): Promise<void> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError(
          'Gym not found',
          'The specified gym does not exist',
          'GYM_NOT_FOUND',
          false
        );
      }

      const user = await userRepository.getById(userId);
      if (!user) {
        throw new UserFriendlyError(
          'User not found',
          'The specified user does not exist',
          'USER_NOT_FOUND',
          false
        );
      }

      // Check if already has a role in this gym
      const existingRole = user.gymMemberships?.find(m => m.gymId === gymId)?.gymRole;
      if (existingRole) {
        throw new UserFriendlyError(
          'Already has role',
          `This user is already a ${existingRole} in this gym`,
          'ALREADY_HAS_ROLE',
          false
        );
      }

      // Update gym's appropriate array
      const updateData: any = { updatedAt: new Date() };
      const arrayName = role === 'staff' ? 'staff' : 'trainers';
      updateData[arrayName] = [...gym[arrayName], userId];

      await gymRepository.update(gymId, updateData);

      // Update user's gym membership
      const updatedMemberships = [
        ...(user.gymMemberships || []),
        {
          gymId,
          gymRole: role,
          joinedAt: new Date(),
          isActive: true,
          membershipCode: `${role.toUpperCase()}_${gym.slug.toUpperCase()}_${userId.slice(0, 4)}`
        }
      ];

      await userRepository.update(userId, {
        gymMemberships: updatedMemberships,
        // Update global role if needed
        role: user.role === 'fitness_user' ? `gym_${role}` : user.role,
        updatedAt: new Date()
      });

      console.log(`✅ Added ${user.displayName} as ${role} to ${gym.name}`);
    } catch (error: any) {
      console.error('❌ Error adding gym staff:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to add gym staff',
        error.message || 'Please try again',
        'ADD_STAFF_ERROR',
        true
      );
    }
  }
}

export const gymService = new GymService();