/**
 * Checkin Repository - Following pattern
 */

import { 
    where, 
    orderBy, 
    query,
    Timestamp
  } from 'firebase/firestore';
  import { BaseRepository } from './BaseRepository';
  import { CheckinRecord, CreateCheckinDTO, CheckinMethod } from '../../types/domain/core/gym';
  import { handleFirebaseError } from '../../utils/errorHandler';
  
  export class CheckinRepository extends BaseRepository<CheckinRecord> {
    constructor() {
      super('checkins');
    }
  
    /**
     * Create checkin record - FIXED: Add checkinTime and handle missing fields
     */
    async createCheckin(checkinData: CreateCheckinDTO): Promise<string> {
      try {
        const checkinToCreate: Omit<CheckinRecord, 'id'> & { uid?: string } = {
          ...checkinData,
          checkinTime: checkinData.checkinTime || new Date(), // ✅ FIX: Add checkinTime with default
          notes: checkinData.notes || `Checkin via ${checkinData.method}`,
          createdAt: new Date()
        };
  
        return await this.create(checkinToCreate);
      } catch (error: any) {
        console.error('❌ Error creating checkin:', error);
        throw handleFirebaseError(error);
      }
    }
  
    /**
     * Create checkin with default checkinTime - Helper method
     */
    async createCheckinNow(checkinData: Omit<CreateCheckinDTO, 'checkinTime'>): Promise<string> {
      return this.createCheckin({
        ...checkinData,
        checkinTime: new Date()
      });
    }
  
    /**
     * Get today's checkins for a gym
     */
    async getTodayCheckins(gymId: string): Promise<CheckinRecord[]> {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
  
      return this.query([
        where('gymId', '==', gymId),
        where('checkinTime', '>=', today),
        where('checkinTime', '<', tomorrow),
        orderBy('checkinTime', 'desc')
      ]);
    }
  
    /**
     * Get member checkin history
     */
    async getMemberCheckins(memberId: string, limit: number = 50): Promise<CheckinRecord[]> {
      return this.query([
        where('memberId', '==', memberId),
        orderBy('checkinTime', 'desc'),
        // limit would need startAfter for pagination
      ]);
    }
  
    /**
     * Get checkins by date range
     */
    async getCheckinsByDateRange(
      gymId: string, 
      startDate: Date, 
      endDate: Date
    ): Promise<CheckinRecord[]> {
      return this.query([
        where('gymId', '==', gymId),
        where('checkinTime', '>=', startDate),
        where('checkinTime', '<=', endDate),
        orderBy('checkinTime', 'desc')
      ]);
    }
  
    /**
     * Update checkout time - FIXED: Remove updatedAt since CheckinRecord doesn't have it
     */
    async recordCheckout(checkinId: string, checkoutTime: Date): Promise<void> {
      const checkin = await this.getById(checkinId);
      if (!checkin) throw new Error('Checkin not found');
  
      const durationMinutes = Math.round(
        (checkoutTime.getTime() - checkin.checkinTime.getTime()) / (1000 * 60)
      );
  
      return this.update(checkinId, {
        checkoutTime,
        durationMinutes
        // ✅ FIX: Removed updatedAt since CheckinRecord interface doesn't include it
      });
    }
  }
  
  export const checkinRepository = new CheckinRepository();