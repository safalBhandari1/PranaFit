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
  
    /**
     * Create a new gym member - Following create pattern with auto code generation
     */
    // In GymMemberRepository.ts - Simplify createMember
    async createMember(memberData: CreateGymMemberDTO): Promise<string> {
        try {
        // Generate member code if not provided
        let memberCode = memberData.memberCode;
        if (!memberCode) {
            const gymMembers = await this.getMembersByGym(memberData.gymId);
            memberCode = `GYM${String(gymMembers.length + 1).padStart(3, '0')}`;
        }
        
        const memberToCreate: Omit<GymMember, 'id'> & { uid?: string } = {
            gymId: memberData.gymId,
            userId: memberData.userId,
            memberCode,
            status: 'active' as MemberStatus,
            joinDate: memberData.joinDate || new Date(),
            autoRenew: true,
            totalPaid: 0,
            paymentStatus: 'pending' as PaymentStatus,
            totalCheckins: 0,
            averageWeeklyVisits: 0,
            notes: memberData.notes || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            // currentPackage is NOT set here - it will be set via separate method
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