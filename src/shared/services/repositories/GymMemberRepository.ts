import { 
    where, 
    orderBy, 
    query,
    limit,
    QueryConstraint
  } from 'firebase/firestore';
  import { BaseRepository } from './BaseRepository';
  import { 
    GymMember, 
    CreateGymMemberDTO,
    MemberStatus,
    PaymentStatus,
    GymPackage
  } from '../../types/domain/core/gym';
  import { handleFirebaseError } from '../../utils/errorHandler';
  
  export class GymMemberRepository extends BaseRepository<GymMember> {
    constructor() {
      super('gym_members');
    }
  
    // UPDATE: src/shared/services/repositories/GymMemberRepository.ts
    // In the createMember method, update to include new fields:

    async createMember(memberData: CreateGymMemberDTO): Promise<string> {
        try {
        // Generate member code if not provided
        let memberCode = memberData.memberCode;
        if (!memberCode) {
            const gymMembers = await this.getMembersByGym(memberData.gymId);
            memberCode = `GYM${String(gymMembers.length + 1).padStart(3, '0')}`;
        }
        
        const memberToCreate: Omit<GymMember, 'id'> & { uid?: string } = {
            // Basic info
            gymId: memberData.gymId,
            userId: memberData.userId,
            memberCode,
            status: 'active' as MemberStatus,
            
            // Personal information (NEW)
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            phoneNumber: memberData.phoneNumber,
            email: memberData.email,
            address: memberData.address,
            dateOfBirth: memberData.dateOfBirth,
            socialMedia: memberData.socialMedia,
            
            // Emergency Contact (REQUIRED)
            emergencyContact: memberData.emergencyContact,
            
            // Membership
            joinDate: memberData.joinDate || new Date(),
            autoRenew: true,
            
            // Payment tracking
            totalPaid: 0,
            paymentStatus: 'pending' as PaymentStatus,
            
            // Attendance
            totalCheckins: 0,
            averageWeeklyVisits: 0,
            
            // Additional info
            notes: memberData.notes,
            healthNotes: memberData.healthNotes,
            
            // Timestamps
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        return await this.create(memberToCreate);
        } catch (error: any) {
        console.error('❌ Error creating gym member:', error);
        throw handleFirebaseError(error);
        }
    }


    // Add new method to assign package
    async assignPackageToMember(
        memberId: string, 
        packageId: string, 
        gymPackage: GymPackage // Full package object from gym
    ): Promise<void> {
        const member = await this.getById(memberId);
        if (!member) throw new Error('Member not found');
        
        // Calculate expiry date based on package duration
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + gymPackage.durationDays);
        
        return this.update(memberId, {
        currentPackage: gymPackage,
        expiryDate,
        updatedAt: new Date()
        });
    }

    /**
     * Assign or renew package for member with enhanced logic
     */
    async assignOrRenewPackage(
        memberId: string,
        gymPackage: GymPackage,
        startDate: Date,
        isRenewal: boolean = false
    ): Promise<void> {
        try {
        const member = await this.getById(memberId);
        if (!member) {
            throw new Error('Member not found');
        }
    
        let newExpiryDate: Date;
        let shouldUpdatePackage = true;
    
        // Check if this is the same package for renewal
        const isSamePackage = member.currentPackage?.id === gymPackage.id;
    
        if (isRenewal && member.currentPackage && member.expiryDate && isSamePackage) {
            // RENEWAL: Extend from current expiry or start date (whichever is later)
            const baseDate = member.expiryDate > startDate ? member.expiryDate : startDate;
            newExpiryDate = new Date(baseDate);
            newExpiryDate.setDate(newExpiryDate.getDate() + gymPackage.durationDays);
            console.log(`🔄 Renewing package: ${gymPackage.name}, new expiry: ${newExpiryDate.toDateString()}`);
        } else if (member.currentPackage && !isSamePackage) {
            // PACKAGE CHANGE: Start fresh from start date
            newExpiryDate = new Date(startDate);
            newExpiryDate.setDate(newExpiryDate.getDate() + gymPackage.durationDays);
            console.log(`🔄 Changing package: ${member.currentPackage.name} → ${gymPackage.name}`);
        } else {
            // NEW ASSIGNMENT: No current package
            newExpiryDate = new Date(startDate);
            newExpiryDate.setDate(newExpiryDate.getDate() + gymPackage.durationDays);
            console.log(`🔄 Assigning new package: ${gymPackage.name}`);
        }
    
        // Prepare update data
        const updateData: any = {
            currentPackage: gymPackage,
            expiryDate: newExpiryDate,
            lastPaymentDate: startDate,
            nextPaymentDate: newExpiryDate,
            paymentStatus: 'completed',
            updatedAt: new Date()
        };
    
        // Update member
        await this.update(memberId, updateData);
        console.log(`✅ Package ${gymPackage.name} assigned to member ${memberId}`);
    
        } catch (error: any) {
        console.error('❌ Error assigning/renewing package:', error);
        throw handleFirebaseError(error);
        }
    }
    
    /**
     * Check if member already has a specific package
     */
    async hasPackage(memberId: string, packageId: string): Promise<boolean> {
        try {
        const member = await this.getById(memberId);
        return member?.currentPackage?.id === packageId;
        } catch (error) {
        console.error('❌ Error checking member package:', error);
        return false;
        }
    }
  
  
    /**
     * Get members by gym - Following getUsersByGym pattern
     */
    async getMembersByGym(gymId: string, status?: MemberStatus): Promise<GymMember[]> {
      const constraints: QueryConstraint[] = [where('gymId', '==', gymId)];
      
      if (status) {
        constraints.push(where('status', '==', status));
      }
      
      constraints.push(orderBy('joinDate', 'desc')); // ✅ Fixed: Added to QueryConstraint array
      
      return this.query(constraints);
    }
  
    /**
     * Get member by user ID and gym - For checking existing membership
     */
    async getMemberByUserAndGym(userId: string, gymId: string): Promise<GymMember | null> {
      const members = await this.query([
        where('userId', '==', userId),
        where('gymId', '==', gymId),
        orderBy('joinDate', 'desc'),
        limit(1)
      ]);
      
      return members.length > 0 ? members[0] : null;
    }
  
    /**
     * Get active members by gym - For dashboard
     */
    async getActiveMembersByGym(gymId: string): Promise<GymMember[]> {
      return this.query([
        where('gymId', '==', gymId),
        where('status', '==', 'active'),
        orderBy('lastCheckin', 'desc')
      ]);
    }
  
    /**
     * Get members with overdue payments - For notifications
     */
    async getOverdueMembers(gymId: string): Promise<GymMember[]> {
      const today = new Date();
      return this.query([
        where('gymId', '==', gymId),
        where('status', '==', 'active'),
        where('paymentStatus', '==', 'overdue'),
        where('nextPaymentDate', '<=', today),
        orderBy('nextPaymentDate', 'asc')
      ]);
    }
  
    /**
     * Search members by name (via user displayName - would need join in service layer)
     * This is a simplified version
     */
    async searchMembersByCode(gymId: string, searchText: string): Promise<GymMember[]> {
      if (!searchText.trim()) return [];
      
      return this.query([
        where('gymId', '==', gymId),
        where('memberCode', '>=', searchText),
        where('memberCode', '<=', searchText + '\uf8ff')
      ]);
    }
  
    /**
     * Update member checkin stats - Following update pattern
     */
    async updateCheckinStats(memberId: string, checkinTime: Date): Promise<void> {
      const member = await this.getById(memberId);
      if (!member) throw new Error('Member not found');
      
      const totalCheckins = (member.totalCheckins || 0) + 1;
      
      // Simple weekly average calculation
      const weeksSinceJoin = Math.max(1, Math.floor(
        (new Date().getTime() - member.joinDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
      ));
      const averageWeeklyVisits = totalCheckins / weeksSinceJoin;
      
      return this.update(memberId, {
        totalCheckins,
        lastCheckin: checkinTime,
        averageWeeklyVisits,
        updatedAt: new Date()
      });
    }
  
    /**
     * Update payment status - For payment tracking
     */
    async updatePaymentStatus(
      memberId: string, 
      paymentData: {
        amount: number;
        paymentDate: Date;
        nextPaymentDate?: Date;
        status: PaymentStatus;
      }
    ): Promise<void> {
      const member = await this.getById(memberId);
      if (!member) throw new Error('Member not found');
      
      const totalPaid = (member.totalPaid || 0) + paymentData.amount;
      
      return this.update(memberId, {
        lastPaymentDate: paymentData.paymentDate,
        nextPaymentDate: paymentData.nextPaymentDate,
        totalPaid,
        paymentStatus: paymentData.status,
        updatedAt: new Date()
      });
    }
  
    /**
     * Count active members - Following count pattern
     */
    async countActiveMembers(gymId: string): Promise<number> {
      try {
        const members = await this.getActiveMembersByGym(gymId);
        return members.length;
      } catch (error: any) {
        console.error('❌ Error counting active members:', error);
        return 0;
      }
    }
  }
  
  export const gymMemberRepository = new GymMemberRepository();