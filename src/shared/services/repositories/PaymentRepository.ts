
// src/shared/services/repositories/PaymentRepository.ts
/**
 * Payment Repository - Following pattern
 */

import { 
    where, 
    orderBy, 
    query,
    limit
} from 'firebase/firestore';
import { BaseRepository } from './BaseRepository';
import { 
  PaymentRecord, 
  CreatePaymentDTO, 
  PaymentStatus, 
  PaymentMethod,
  UpdatePaymentDTO
} from '../../types/domain/core/gym';
import { handleFirebaseError } from '../../utils/errorHandler';

export class PaymentRepository extends BaseRepository<PaymentRecord> {
  constructor() {
    super('payments');
  }

  /**
   * Create payment record - FIXED: Add missing currency field and required dueDate
   */
    async createPayment(paymentData: CreatePaymentDTO): Promise<string> {
        try {
        const paymentToCreate: Omit<PaymentRecord, 'id'> & { uid?: string } = {
            // Required fields
            gymId: paymentData.gymId,
            memberId: paymentData.memberId,
            userId: paymentData.userId,
            amount: paymentData.amount,
            currency: paymentData.currency || 'NPR',
            method: paymentData.method,
            status: paymentData.status || 'completed',
            
            // Dates
            paymentDate: paymentData.paymentDate || new Date(),
            dueDate: paymentData.dueDate || new Date(),
            periodStart: paymentData.periodStart || new Date(),
            periodEnd: paymentData.periodEnd || new Date(),
            
            // Optional fields
            packageId: paymentData.packageId,
            packageName: paymentData.packageName,
            discountPercentage: paymentData.discountPercentage || 0,
            originalAmount: paymentData.originalAmount || paymentData.amount,
            notes: paymentData.notes,
            receiptUrl: paymentData.receiptUrl,
            digitalPayment: paymentData.digitalPayment,
            transactionId: paymentData.transactionId,
            
            // Timestamps
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    
        return await this.create(paymentToCreate);
        } catch (error: any) {
        console.error('❌ Error creating payment:', error);
        throw handleFirebaseError(error);
        }
    }

async getPaymentsByGym(gymId: string): Promise<PaymentRecord[]> {
    console.log('🔍 getPaymentsByGym - DEBUG VERSION');
    console.log('Looking for gymId:', gymId);
    
    try {
      // First try the query
      const queryResult = await this.query([
        where('gymId', '==', gymId)
      ]);
      
      console.log('Query returned:', queryResult.length, 'payments');
      
      // If query fails, use getAll as fallback
      if (queryResult.length === 0) {
        console.log('⚠️ Query returned 0, using getAll fallback...');
        const allPayments = await this.getAll();
        const filtered = allPayments.filter(p => p.gymId === gymId);
        console.log('Fallback found:', filtered.length, 'payments');
        return filtered.sort((a, b) => 
          new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
        );
      }
      
      // Sort the query results
      return queryResult.sort((a, b) => 
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
      );
      
    } catch (error: any) {
      console.error('❌ Error in getPaymentsByGym:', error);
      
      // Ultimate fallback
      const allPayments = await this.getAll();
      return allPayments
        .filter(p => p.gymId === gymId)
        .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
    }
  }

  /**
   * Get recent payments (for dashboard)
   */
  async getRecentPayments(gymId: string, count: number = 10): Promise<PaymentRecord[]> {
    // Get all payments sorted by date, then slice
    const allPayments = await this.getPaymentsByGym(gymId);
    return allPayments.slice(0, count);
  }

  /**
   * Get member payments
   */
  async getMemberPayments(memberId: string): Promise<PaymentRecord[]> {
    return this.query([
      where('memberId', '==', memberId),
      orderBy('paymentDate', 'desc')
    ]);
  }

  /**
   * Get monthly payments for gym
   */
  async getMonthlyPayments(gymId: string): Promise<PaymentRecord[]> {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return this.query([
      where('gymId', '==', gymId),
      where('paymentDate', '>=', firstDay),
      where('paymentDate', '<=', lastDay),
      orderBy('paymentDate', 'desc')
    ]);
  }

  /**
   * Get overdue payments
   */
  async getOverduePayments(gymId: string): Promise<PaymentRecord[]> {
    const today = new Date();
    return this.query([
      where('gymId', '==', gymId),
      where('status', '==', 'overdue'),
      where('dueDate', '<=', today),
      orderBy('dueDate', 'asc')
    ]);
  }

  /**
   * Update payment status - FIXED: Proper typing and async handling
   */
  async updatePaymentStatus(paymentId: string, status: PaymentStatus, notes?: string): Promise<void> {
    try {
      // Get existing payment to preserve notes
      const existingPayment = await this.getById(paymentId);
      const currentNotes = existingPayment?.notes || '';
      
      const updateData: Partial<PaymentRecord> = {
        status,
        updatedAt: new Date()
      };

      // Add notes if provided
      if (notes) {
        updateData.notes = currentNotes ? `${currentNotes}\n${notes}`.trim() : notes;
      }

      return await this.update(paymentId, updateData);
    } catch (error: any) {
      console.error('❌ Error updating payment status:', error);
      throw handleFirebaseError(error);
    }
  }

  /**
   * Get payments with advanced filtering
   */
  async getPaymentsWithFilters(
    gymId: string,
    filters: {
      status?: PaymentStatus;
      method?: PaymentMethod;
      startDate?: Date;
      endDate?: Date;
      memberId?: string;
    }
  ): Promise<PaymentRecord[]> {
    try {
      let payments = await this.getPaymentsByGym(gymId);
      
      if (filters.status) {
        payments = payments.filter(p => p.status === filters.status);
      }
      
      if (filters.method) {
        payments = payments.filter(p => p.method === filters.method);
      }
      
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        payments = payments.filter(p => new Date(p.paymentDate) >= start);
      }
      
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        payments = payments.filter(p => new Date(p.paymentDate) <= end);
      }
      
      if (filters.memberId) {
        payments = payments.filter(p => p.memberId === filters.memberId);
      }
      
      return payments;
    } catch (error: any) {
      console.error('❌ Error getting payments with filters:', error);
      throw handleFirebaseError(error);
    }
  }

  /**
   * Get payments by date range
   */
  async getPaymentsByDateRange(
    gymId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PaymentRecord[]> {
    try {
      const allPayments = await this.getPaymentsByGym(gymId);
      return allPayments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= startDate && paymentDate <= endDate;
      });
    } catch (error: any) {
      console.error('❌ Error getting payments by date range:', error);
      throw handleFirebaseError(error);
    }
  }

  /**
   * Get total revenue for period
   */
  async getRevenueForPeriod(
    gymId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ total: number; cash: number; digital: number }> {
    try {
      const payments = await this.getPaymentsByDateRange(gymId, startDate, endDate);
      
      const total = payments.reduce((sum, p) => sum + p.amount, 0);
      const cash = payments
        .filter(p => p.method === 'cash')
        .reduce((sum, p) => sum + p.amount, 0);
      const digital = payments
        .filter(p => p.method !== 'cash')
        .reduce((sum, p) => sum + p.amount, 0);
      
      return { total, cash, digital };
    } catch (error: any) {
      console.error('❌ Error getting revenue:', error);
      throw handleFirebaseError(error);
    }
  }

  /**
   * Get member payment history with pagination
   */
  async getMemberPaymentHistory(
    memberId: string,
    limit?: number,
    offset: number = 0 // ✅ FIX: Remove question mark, keep default
  ): Promise<{ payments: PaymentRecord[]; total: number }> {
    try {
      const allPayments = await this.getMemberPayments(memberId);
      const total = allPayments.length;
      const payments = limit ? allPayments.slice(offset, offset + limit) : allPayments;
      
      return { payments, total };
    } catch (error: any) {
      console.error('❌ Error getting member payment history:', error);
      throw handleFirebaseError(error);
    }
  }

  /**
   * Update payment with verification
   */
//   async verifyCashPayment(
//     paymentId: string,
//     verifiedBy: string
//   ): Promise<void> {
//     try {
//       await this.update(paymentId, {
//         status: 'completed',
//         updatedAt: new Date()
//       });
//     } catch (error: any) {
//       console.error('❌ Error verifying cash payment:', error);
//       throw handleFirebaseError(error);
//     }
//   }

  /**
   * Count payments by status
   */
  async countPaymentsByStatus(gymId: string): Promise<Record<PaymentStatus, number>> {
    try {
      const payments = await this.getPaymentsByGym(gymId);
      const counts: Record<PaymentStatus, number> = {
        pending: 0,
        completed: 0,
        failed: 0,
        overdue: 0,
        due_soon: 0,
        partially_paid: 0
      };
      
      payments.forEach(payment => {
        if (payment.status in counts) {
          counts[payment.status as PaymentStatus]++;
        }
      });
      
      return counts;
    } catch (error: any) {
      console.error('❌ Error counting payments by status:', error);
      throw handleFirebaseError(error);
    }
  }
}

export const paymentRepository = new PaymentRepository();