import { Gym, CreateGymDTO, UpdateGymDTO, GymMember, CreateGymMemberDTO, UpdateGymMemberDTO, MemberStatus, GymPackage } from '../types/domain/core/gym';
import { User } from '../types/domain/core/user';
import { gymRepository } from './repositories/GymRepository';
import { userRepository } from './repositories/UserRepository';
import { gymMemberRepository } from './repositories/GymMemberRepository';
import { checkinRepository } from './repositories/CheckinRepository';
import { paymentRepository } from './repositories/PaymentRepository';
import { UserFriendlyError } from '../utils/errorHandler';
import { validateEmergencyContact } from '../utils/memberHelpers';
import { GymInvitation, MemberData } from '../types/domain/core/invitation';

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
  
      // Create gym member record with ALL required fields
      const memberId = await gymMemberRepository.createMember({
        gymId,
        userId,
        memberCode,
        firstName: rest.firstName,
        lastName: rest.lastName,
        phoneNumber: rest.phoneNumber,
        email: rest.email,
        address: rest.address,
        dateOfBirth: rest.dateOfBirth,
        socialMedia: rest.socialMedia,
        emergencyContact: rest.emergencyContact, // REQUIRED
        joinDate: rest.joinDate || new Date(),
        notes: rest.notes,
        healthNotes: rest.healthNotes,
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

    /**
     * Add user to gym with specific role (called when invitation is accepted)
     */

    async addUserToGymWithRole(
        gymId: string,
        userId: string,
        role: 'owner' | 'staff' | 'trainer' | 'member',
        membershipCode?: string
    ): Promise<void> {
        try {
        console.log(`🎯 Adding user ${userId} to gym ${gymId} as ${role}`);
        
        // Get gym and user
        const [gym, user] = await Promise.all([
            gymRepository.getById(gymId),
            userRepository.getById(userId)
        ]);
    
        if (!gym) {
            throw new UserFriendlyError(
            'Gym not found',
            'The gym no longer exists',
            'GYM_NOT_FOUND',
            false
            );
        }
    
        if (!user) {
            throw new UserFriendlyError(
            'User not found',
            'The user no longer exists',
            'USER_NOT_FOUND',
            false
            );
        }
    
        // Check if user already has a role in this gym
        const existingMembership = user.gymMemberships?.find(m => 
            m.gymId === gymId && m.isActive
        );
        
        if (existingMembership) {
            throw new UserFriendlyError(
            'Already a member',
            `You are already a ${existingMembership.gymRole} in this gym`,
            'ALREADY_MEMBER',
            false
            );
        }
    
        // Generate membership code if not provided
        const finalMembershipCode = membershipCode || 
            `${role.toUpperCase()}_${gym.slug.toUpperCase()}_${userId.slice(0, 4)}`;
    
        // Add user to appropriate gym array - FIXED TYPE ERROR
        const updateData: Partial<Gym> = { updatedAt: new Date() };
        
        // Use type-safe approach instead of dynamic key
        switch (role) {
            case 'owner':
            updateData.owners = [...gym.owners, userId];
            break;
            case 'staff':
            updateData.staff = [...gym.staff, userId];
            break;
            case 'trainer':
            updateData.trainers = [...gym.trainers, userId];
            break;
            case 'member':
            updateData.members = [...gym.members, userId];
            // If adding as member, update statistics
            updateData.totalMembers = (gym.totalMembers || 0) + 1;
            updateData.activeMembers = (gym.activeMembers || 0) + 1;
            break;
            default:
            throw new Error('Invalid role');
        }
    
        // Update gym document
        await gymRepository.update(gymId, updateData);
        console.log(`✅ User added to ${role} array`);
    
        // Update user's gym memberships
        const updatedMemberships = [
            ...(user.gymMemberships || []),
            {
            gymId,
            gymRole: role,
            joinedAt: new Date(),
            isActive: true,
            membershipCode: finalMembershipCode
            }
        ];
    
        // Determine if we should update user's global role
        let userRoleUpdate = user.role;
        if (user.role === 'fitness_user') {
            if (role === 'owner') userRoleUpdate = 'gym_owner';
            else if (role === 'staff') userRoleUpdate = 'gym_staff';
            else if (role === 'trainer') userRoleUpdate = 'gym_trainer';
            // If role is 'member', keep as 'fitness_user'
        }
    
        await userRepository.update(userId, {
            gymMemberships: updatedMemberships,
            role: userRoleUpdate,
            // Set as current gym if user doesn't have one
            currentGymId: user.currentGymId || gymId,
            updatedAt: new Date()
        });
    
        console.log(`✅ User ${userId} successfully added as ${role} to gym ${gymId}`);
    
        } catch (error: any) {
        console.error('❌ Error adding user to gym with role:', error);
        if (error instanceof UserFriendlyError) {
            throw error;
        }
        throw new UserFriendlyError(
            'Failed to add user to gym',
            error.message || 'Please try again',
            'ADD_USER_TO_GYM_ERROR',
            true
        );
        }
    }

    // ADD THESE METHODS TO src/shared/services/GymService.ts
// Add them to the existing GymService class

/**
 * Get members by gym with filtering and sorting
 */
async getMembersByGym(
    gymId: string, 
    options?: {
      status?: MemberStatus;
      searchTerm?: string;
      sortBy?: 'name' | 'joinDate' | 'lastPayment' | 'lastCheckin';
      limit?: number;
    }
  ): Promise<GymMember[]> {
    try {
      // Get all members for this gym
      let members = await gymMemberRepository.getMembersByGym(gymId, options?.status);
      
      // Apply search filter if provided
      if (options?.searchTerm) {
        members = members.filter(member => {
          const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
          const email = member.email?.toLowerCase() || '';
          const phone = member.phoneNumber?.toLowerCase() || '';
          const searchTerm = options.searchTerm!.toLowerCase();
          
          return (
            fullName.includes(searchTerm) ||
            email.includes(searchTerm) ||
            phone.includes(searchTerm)
          );
        });
      }
      
      // Apply sorting if provided
      if (options?.sortBy) {
        members.sort((a, b) => {
          switch (options.sortBy) {
            case 'name':
              const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
              const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
              return nameA.localeCompare(nameB);
              
            case 'joinDate':
              return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
              
            case 'lastPayment':
              const dateA = a.lastPaymentDate ? new Date(a.lastPaymentDate).getTime() : 0;
              const dateB = b.lastPaymentDate ? new Date(b.lastPaymentDate).getTime() : 0;
              return dateB - dateA;
              
            case 'lastCheckin':
              const checkinA = a.lastCheckin ? new Date(a.lastCheckin).getTime() : 0;
              const checkinB = b.lastCheckin ? new Date(b.lastCheckin).getTime() : 0;
              return checkinB - checkinA;
              
            default:
              return 0;
          }
        });
      }
      
      // Apply limit if provided
      if (options?.limit) {
        members = members.slice(0, options.limit);
      }
      
      return members;
    } catch (error: any) {
      console.error('❌ Error getting members by gym:', error);
      throw new UserFriendlyError(
        'Failed to load members',
        error.message || 'Please try again',
        'LOAD_MEMBERS_ERROR',
        true
      );
    }
  }
  
  /**
   * Get member statistics for dashboard
   */
  async getMemberStatistics(gymId: string): Promise<{
    total: number;
    active: number;
    newThisWeek: number;
    overduePayments: number;
    averageCheckinsPerWeek: number;
  }> {
    try {
      const members = await gymMemberRepository.getMembersByGym(gymId);
      const activeMembers = members.filter(m => m.status === 'active');
      
      // Calculate new members this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newThisWeek = members.filter(m => 
        new Date(m.joinDate) > oneWeekAgo
      ).length;
      
      // Calculate overdue payments
      const today = new Date();
      const overduePayments = members.filter(m => 
        m.paymentStatus === 'overdue' && m.status === 'active'
      ).length;
      
      // Calculate average checkins per week
      const totalCheckins = members.reduce((sum, m) => sum + (m.totalCheckins || 0), 0);
      const averageCheckinsPerWeek = members.length > 0 
        ? totalCheckins / members.length / 4.33 // Approximate weeks per month
        : 0;
      
      return {
        total: members.length,
        active: activeMembers.length,
        newThisWeek,
        overduePayments,
        averageCheckinsPerWeek: Math.round(averageCheckinsPerWeek * 10) / 10,
      };
    } catch (error: any) {
      console.error('❌ Error getting member statistics:', error);
      throw new UserFriendlyError(
        'Failed to load statistics',
        error.message || 'Please try again',
        'LOAD_STATS_ERROR',
        true
      );
    }
  }
  
  /**
   * Update member with new data (including emergency contact)
   */
  async updateMember(
    memberId: string, 
    updateData: UpdateGymMemberDTO
  ): Promise<GymMember> {
    try {
      const member = await gymMemberRepository.getById(memberId);
      if (!member) {
        throw new UserFriendlyError(
          'Member not found',
          'The specified member does not exist',
          'MEMBER_NOT_FOUND',
          false
        );
      }
      
      // Validate emergency contact if provided
      if (updateData.emergencyContact) {
        const validation = validateEmergencyContact(updateData.emergencyContact);
        if (!validation.isValid) {
          throw new UserFriendlyError(
            'Invalid emergency contact',
            validation.errors.join(', '),
            'INVALID_EMERGENCY_CONTACT',
            false
          );
        }
      }
      
      // Update the member
      await gymMemberRepository.update(memberId, {
        ...updateData,
        updatedAt: new Date(),
      });
      
      // Get updated member
      const updatedMember = await gymMemberRepository.getById(memberId);
      if (!updatedMember) {
        throw new UserFriendlyError(
          'Update failed',
          'Failed to retrieve updated member',
          'UPDATE_FAILED',
          false
        );
      }
      
      console.log(`✅ Updated member ${member.memberCode}`);
      return updatedMember;
    } catch (error: any) {
      console.error('❌ Error updating member:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to update member',
        error.message || 'Please try again',
        'UPDATE_MEMBER_ERROR',
        true
      );
    }
  }

  /**
 * Add new package to gym
 */
async addGymPackage(gymId: string, packageData: Omit<GymPackage, 'id' | 'createdAt'>): Promise<{ packageId: string; gymPackage: GymPackage }> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError('Gym not found', 'The specified gym does not exist', 'GYM_NOT_FOUND', false);
      }
  
      const newPackage: GymPackage = {
        ...packageData,
        id: `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date()
      };
  
      const updatedPackages = [...gym.packages, newPackage];
      
      await gymRepository.update(gymId, {
        packages: updatedPackages,
        updatedAt: new Date()
      });
  
      console.log(`✅ Package "${newPackage.name}" added to gym ${gym.name}`);
      return { packageId: newPackage.id, gymPackage: newPackage };
    } catch (error: any) {
      console.error('❌ Error adding gym package:', error);
      if (error instanceof UserFriendlyError) throw error;
      throw new UserFriendlyError(
        'Failed to add package',
        error.message || 'Please try again',
        'ADD_PACKAGE_ERROR',
        true
      );
    }
  }
  
  /**
   * Update existing package
   */
  async updateGymPackage(gymId: string, packageId: string, updateData: Partial<Omit<GymPackage, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError('Gym not found', 'The specified gym does not exist', 'GYM_NOT_FOUND', false);
      }
  
      const packageIndex = gym.packages.findIndex(pkg => pkg.id === packageId);
      if (packageIndex === -1) {
        throw new UserFriendlyError('Package not found', 'The specified package does not exist', 'PACKAGE_NOT_FOUND', false);
      }
  
      const updatedPackages = [...gym.packages];
      updatedPackages[packageIndex] = {
        ...updatedPackages[packageIndex],
        ...updateData
      };
  
      await gymRepository.update(gymId, {
        packages: updatedPackages,
        updatedAt: new Date()
      });
  
      console.log(`✅ Package "${packageId}" updated in gym ${gym.name}`);
    } catch (error: any) {
      console.error('❌ Error updating gym package:', error);
      if (error instanceof UserFriendlyError) throw error;
      throw new UserFriendlyError(
        'Failed to update package',
        error.message || 'Please try again',
        'UPDATE_PACKAGE_ERROR',
        true
      );
    }
  }
  
  /**
   * Delete package from gym
   */
  async deleteGymPackage(gymId: string, packageId: string): Promise<void> {
    try {
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError('Gym not found', 'The specified gym does not exist', 'GYM_NOT_FOUND', false);
      }
  
      const updatedPackages = gym.packages.filter(pkg => pkg.id !== packageId);
      
      await gymRepository.update(gymId, {
        packages: updatedPackages,
        updatedAt: new Date()
      });
  
      console.log(`✅ Package "${packageId}" deleted from gym ${gym.name}`);
    } catch (error: any) {
      console.error('❌ Error deleting gym package:', error);
      if (error instanceof UserFriendlyError) throw error;
      throw new UserFriendlyError(
        'Failed to delete package',
        error.message || 'Please try again',
        'DELETE_PACKAGE_ERROR',
        true
      );
    }
  }
  
  /**
 * Update multiple packages at once (for gym editing)
 */
async updateGymPackages(gymId: string, packages: Omit<GymPackage, 'id' | 'createdAt'>[] | GymPackage[]): Promise<void> {
    try {
      console.log('📦 UPDATE GYM PACKAGES CALLED:');
      console.log('- Gym ID:', gymId);
      console.log('- Package count:', packages.length);
      console.log('- First package:', packages[0]);
      console.log('- All packages:', packages.map((p, i) => ({
        index: i,
        name: 'name' in p ? p.name : 'NO_NAME',
        price: 'price' in p ? p.price : 'NO_PRICE',
        hasId: 'id' in p,
        id: 'id' in p ? (p as any).id : 'NO_ID'
      })));
      
      const gym = await gymRepository.getById(gymId);
      if (!gym) {
        throw new UserFriendlyError('Gym not found', 'The specified gym does not exist', 'GYM_NOT_FOUND', false);
      }
  
      console.log('📦 CURRENT GYM PACKAGES:', gym.packages.map(p => ({ name: p.name, price: p.price, id: p.id })));
  
      // Process packages - ensure they have IDs and timestamps
      const processedPackages = packages.map((pkg, index) => {
        // Check if it's already a GymPackage (has id)
        if ('id' in pkg && pkg.id) {
          console.log(`- Keeping existing package: ${pkg.name} (${pkg.id})`);
          return {
            ...pkg,
            createdAt: (pkg as GymPackage).createdAt || new Date()
          } as GymPackage;
        }
        
        // Otherwise it's Omit<GymPackage, 'id' | 'createdAt'> - create full package
        const newId = `pkg_${Date.now()}_${index}`;
        console.log(`- Creating new package: ${pkg.name} (${newId}) with price: ${pkg.price}`);
        return {
          ...pkg,
          id: newId,
          createdAt: new Date()
        } as GymPackage;
      });
  
      console.log('📦 FINAL PACKAGES TO SAVE:', processedPackages.map(p => ({ name: p.name, price: p.price, id: p.id })));
  
      await gymRepository.update(gymId, {
        packages: processedPackages,
        updatedAt: new Date()
      });
  
      console.log(`✅ ${packages.length} packages updated for gym ${gym.name}`);
      
      // Verify the update
      const updatedGym = await gymRepository.getById(gymId);
      console.log('📦 VERIFICATION - Updated gym packages:', updatedGym?.packages?.map(p => ({ name: p.name, price: p.price })));
      
    } catch (error: any) {
      console.error('❌ Error updating gym packages:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      if (error instanceof UserFriendlyError) throw error;
      throw new UserFriendlyError(
        'Failed to update packages',
        error.message || 'Please try again',
        'UPDATE_PACKAGES_ERROR',
        true
      );
    }
  }
/**
 * Create member from invitation WITH USER-PROVIDED DATA
 * Called when user accepts a member invitation and provides their information
 */
async createMemberFromInvitation(
    invitation: GymInvitation,
    userId: string,
    memberData: MemberData
  ): Promise<GymMember> {
    try {
      console.log('🎯 Creating member from invitation with USER-PROVIDED data:', { 
        invitationId: invitation.id, 
        userId,
        hasMemberData: !!memberData,
        memberDataFields: Object.keys(memberData)
      });
      
      if (!memberData) {
        throw new UserFriendlyError(
          'Missing member data',
          'Member data is required to join as a member',
          'MEMBER_DATA_MISSING',
          false
        );
      }
      
      // Validate emergency contact
      const emergencyValidation = validateEmergencyContact(memberData.emergencyContact);
      if (!emergencyValidation.isValid) {
        throw new UserFriendlyError(
          'Invalid emergency contact',
          emergencyValidation.errors.join(', '),
          'INVALID_EMERGENCY_CONTACT',
          false
        );
      }
      
      // ✅ FIXED: Convert MemberData to CreateGymMemberDTO
      const createMemberDto: CreateGymMemberDTO = {
        // Required fields from invitation and user
        gymId: invitation.gymId,
        userId: userId,
        
        // Personal information from form
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        phoneNumber: memberData.phoneNumber,
        email: memberData.email,
        address: memberData.address,
        dateOfBirth: memberData.dateOfBirth,
        
        // Emergency Contact (REQUIRED)
        emergencyContact: memberData.emergencyContact,
        
        // Social Media (Optional)
        socialMedia: memberData.socialMedia,
        
        // Membership details
        joinDate: new Date(),
        notes: memberData.notes,
        healthNotes: memberData.healthNotes,
        
        // No packageId initially - will be assigned later
        // No memberCode initially - will be generated
      };
      
      console.log('✅ Converted to CreateGymMemberDTO:', {
        hasGymId: !!createMemberDto.gymId,
        hasUserId: !!createMemberDto.userId,
        hasEmergencyContact: !!createMemberDto.emergencyContact
      });
      
      // ✅ FIXED: Use addGymMember which already handles all the logic
      const gymMember = await this.addGymMember(createMemberDto);
      
      console.log('✅ Member created successfully:', gymMember.memberCode);
      
      return gymMember;
      
    } catch (error: any) {
      console.error('❌ Error creating member from invitation:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to create member',
        error.message || 'Please try again',
        'CREATE_MEMBER_ERROR',
        true
      );
    }
  }

  // Add these methods to the existing GymService class in src/shared/services/GymService.ts

/**
 * Change a user's team role (owner ↔ staff ↔ trainer)
 */
async changeTeamRole(gymId: string, userId: string, newRole: 'owner' | 'staff' | 'trainer'): Promise<void> {
    try {
      console.log(`🎯 Changing team role for user ${userId} in gym ${gymId} to ${newRole}`);
      
      const [gym, user] = await Promise.all([
        gymRepository.getById(gymId),
        userRepository.getById(userId)
      ]);
  
      if (!gym) {
        throw new Error('Gym not found');
      }
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Determine current role from gym arrays
      let currentRole: 'owner' | 'staff' | 'trainer' | null = null;
      if (gym.owners.includes(userId)) currentRole = 'owner';
      else if (gym.staff.includes(userId)) currentRole = 'staff';
      else if (gym.trainers.includes(userId)) currentRole = 'trainer';
  
      if (!currentRole) {
        throw new Error('User is not in the team');
      }
  
      console.log(`📊 Current role: ${currentRole}, New role: ${newRole}`);
  
      // If role is not changing, do nothing
      if (currentRole === newRole) {
        console.log(`⚠️ User already has role ${newRole}, no change needed`);
        return;
      }
  
      // Prepare update data
      const updateData: Partial<Gym> = { updatedAt: new Date() };
  
      // Remove from old array
      switch (currentRole) {
        case 'owner':
          updateData.owners = gym.owners.filter(id => id !== userId);
          break;
        case 'staff':
          updateData.staff = gym.staff.filter(id => id !== userId);
          break;
        case 'trainer':
          updateData.trainers = gym.trainers.filter(id => id !== userId);
          break;
      }
  
      // Add to new array (if not already there)
      switch (newRole) {
        case 'owner':
          updateData.owners = [...(updateData.owners || gym.owners), userId];
          break;
        case 'staff':
          updateData.staff = [...(updateData.staff || gym.staff), userId];
          break;
        case 'trainer':
          updateData.trainers = [...(updateData.trainers || gym.trainers), userId];
          break;
      }
  
      // Update gym document
      await gymRepository.update(gymId, updateData);
      console.log(`✅ Updated gym arrays`);
  
      // Update user's gymMemberships
      const updatedMemberships = user.gymMemberships?.map(membership => {
        if (membership.gymId === gymId) {
          return {
            ...membership,
            gymRole: newRole,
          };
        }
        return membership;
      }) || [];
  
      // Determine new global role for user
      let newGlobalRole = user.role;
      const hasOtherGymRoles = updatedMemberships.some(m => 
        m.gymId !== gymId && (m.gymRole === 'owner' || m.gymRole === 'staff' || m.gymRole === 'trainer')
      );
  
      if (!hasOtherGymRoles) {
        // Update global role based on new gym role
        switch (newRole) {
          case 'owner':
            newGlobalRole = 'gym_owner';
            break;
          case 'staff':
            newGlobalRole = 'gym_staff';
            break;
          case 'trainer':
            newGlobalRole = 'gym_trainer';
            break;
        }
      }
  
      await userRepository.update(userId, {
        gymMemberships: updatedMemberships,
        role: newGlobalRole,
        updatedAt: new Date(),
      });
  
      console.log(`✅ Successfully changed ${user.displayName}'s role from ${currentRole} to ${newRole}`);
    } catch (error: any) {
      console.error('❌ Error changing team role:', error);
      throw new UserFriendlyError(
        'Failed to change role',
        error.message || 'Please try again',
        'CHANGE_ROLE_ERROR',
        true
      );
    }
  }
  
  /**
   * Remove user from team (remove from all role arrays)
   */
  async removeFromTeam(gymId: string, userId: string): Promise<void> {
    try {
      console.log(`🎯 Removing user ${userId} from team in gym ${gymId}`);
      
      const [gym, user] = await Promise.all([
        gymRepository.getById(gymId),
        userRepository.getById(userId)
      ]);
  
      if (!gym) {
        throw new Error('Gym not found');
      }
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Check if user is in any role array
      const isOwner = gym.owners.includes(userId);
      const isStaff = gym.staff.includes(userId);
      const isTrainer = gym.trainers.includes(userId);
  
      if (!isOwner && !isStaff && !isTrainer) {
        throw new Error('User is not in the team');
      }
  
      console.log(`📊 User roles: owner=${isOwner}, staff=${isStaff}, trainer=${isTrainer}`);
  
      // Prepare update data
      const updateData: Partial<Gym> = { updatedAt: new Date() };
  
      // Remove from all role arrays
      if (isOwner) {
        updateData.owners = gym.owners.filter(id => id !== userId);
      }
      if (isStaff) {
        updateData.staff = gym.staff.filter(id => id !== userId);
      }
      if (isTrainer) {
        updateData.trainers = gym.trainers.filter(id => id !== userId);
      }
  
      // Update gym document
      await gymRepository.update(gymId, updateData);
      console.log(`✅ Removed from gym arrays`);
  
      // Update user's gymMemberships - either remove this gym or set to 'member'
      const updatedMemberships = user.gymMemberships?.filter(m => m.gymId !== gymId) || [];
  
      // Check if user has any other gym roles
      const hasOtherGymRoles = updatedMemberships.some(m => 
        m.gymRole === 'owner' || m.gymRole === 'staff' || m.gymRole === 'trainer'
      );
  
      let newGlobalRole = user.role;
      if (!hasOtherGymRoles && user.role.startsWith('gym_')) {
        // If no other gym roles, revert to fitness_user
        newGlobalRole = 'fitness_user';
      }
  
      await userRepository.update(userId, {
        gymMemberships: updatedMemberships,
        role: newGlobalRole,
        updatedAt: new Date(),
      });
  
      console.log(`✅ Successfully removed ${user.displayName} from team`);
    } catch (error: any) {
      console.error('❌ Error removing from team:', error);
      throw new UserFriendlyError(
        'Failed to remove from team',
        error.message || 'Please try again',
        'REMOVE_FROM_TEAM_ERROR',
        true
      );
    }
  }
}

export const gymService = new GymService();