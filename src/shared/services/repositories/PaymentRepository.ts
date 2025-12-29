/**
 * Payment Repository - Following pattern
 */

import { 
    where, 
    orderBy, 
    query
  } from 'firebase/firestore';
  import { BaseRepository } from './BaseRepository';
  import { PaymentRecord, CreatePaymentDTO } from '../../types/domain/core/gym';
  import { handleFirebaseError } from '../../utils/errorHandler';
  
  export class PaymentRepository extends BaseRepository<PaymentRecord> {
    constructor() {
      super('payments');
    }
  
    /**
     * Create payment record
     */
    async createPayment(paymentData: CreatePaymentDTO): Promise<string> {
      try {
        return await this.create({
          ...paymentData,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (error: any) {
        console.error('❌ Error creating payment:', error);
        throw handleFirebaseError(error);
      }
    }
  
    /**
     * Get payments by gym
     */
    async getPaymentsByGym(gymId: string): Promise<PaymentRecord[]> {
      return this.query([
        where('gymId', '==', gymId),
        orderBy('paymentDate', 'desc')
      ]);
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
     * Update payment status
     */
    async updatePaymentStatus(paymentId: string, status: string, notes?: string): Promise<void> {
      return this.update(paymentId, {
        status,
        notes: notes ? `${this.getById(paymentId)?.notes || ''}\n${notes}`.trim() : undefined,
        updatedAt: new Date()
      });
    }
  }
  
  export const paymentRepository = new PaymentRepository();