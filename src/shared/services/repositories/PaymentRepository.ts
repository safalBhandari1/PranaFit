// /**
//  * Payment Repository - Following pattern
//  */

// import { 
//     where, 
//     orderBy, 
//     query
//   } from 'firebase/firestore';
//   import { BaseRepository } from './BaseRepository';
//   import { PaymentRecord, CreatePaymentDTO, PaymentStatus, PaymentMethod } from '../../types/domain/core/gym';
//   import { handleFirebaseError } from '../../utils/errorHandler';
  
//   export class PaymentRepository extends BaseRepository<PaymentRecord> {
//     constructor() {
//       super('payments');
//     }
  
//     /**
//      * Create payment record - FIXED: Add missing currency field
//      */
//     async createPayment(paymentData: CreatePaymentDTO): Promise<string> {
//       try {
//         const paymentToCreate: Omit<PaymentRecord, 'id'> & { uid?: string } = {
//           ...paymentData,
//           currency: paymentData.currency || 'NPR', // ✅ FIX 1: Add currency with default
//           status: 'completed' as PaymentStatus,    // ✅ FIX 2: Cast to PaymentStatus
//           paymentDate: paymentData.paymentDate || new Date(),
//           createdAt: new Date(),
//           updatedAt: new Date()
//         };
  
//         return await this.create(paymentToCreate);
//       } catch (error: any) {
//         console.error('❌ Error creating payment:', error);
//         throw handleFirebaseError(error);
//       }
//     }
  
//     /**
//      * Get payments by gym
//      */
//     async getPaymentsByGym(gymId: string): Promise<PaymentRecord[]> {
//       return this.query([
//         where('gymId', '==', gymId),
//         orderBy('paymentDate', 'desc')
//       ]);
//     }
  
//     /**
//      * Get member payments
//      */
//     async getMemberPayments(memberId: string): Promise<PaymentRecord[]> {
//       return this.query([
//         where('memberId', '==', memberId),
//         orderBy('paymentDate', 'desc')
//       ]);
//     }
  
//     /**
//      * Get monthly payments for gym
//      */
//     async getMonthlyPayments(gymId: string): Promise<PaymentRecord[]> {
//       const now = new Date();
//       const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
//       const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
//       return this.query([
//         where('gymId', '==', gymId),
//         where('paymentDate', '>=', firstDay),
//         where('paymentDate', '<=', lastDay),
//         orderBy('paymentDate', 'desc')
//       ]);
//     }
  
//     /**
//      * Get overdue payments
//      */
//     async getOverduePayments(gymId: string): Promise<PaymentRecord[]> {
//       const today = new Date();
//       return this.query([
//         where('gymId', '==', gymId),
//         where('status', '==', 'overdue'),
//         where('dueDate', '<=', today),
//         orderBy('dueDate', 'asc')
//       ]);
//     }
  
//     /**
//      * Update payment status - FIXED: Proper typing and async handling
//      */
//     async updatePaymentStatus(paymentId: string, status: PaymentStatus, notes?: string): Promise<void> {
//       try {
//         // Get existing payment to preserve notes
//         const existingPayment = await this.getById(paymentId);
//         const currentNotes = existingPayment?.notes || '';
        
//         const updateData: Partial<PaymentRecord> = {
//           status,
//           updatedAt: new Date()
//         };
  
//         // Add notes if provided
//         if (notes) {
//           updateData.notes = currentNotes ? `${currentNotes}\n${notes}`.trim() : notes;
//         }
  
//         return await this.update(paymentId, updateData);
//       } catch (error: any) {
//         console.error('❌ Error updating payment status:', error);
//         throw handleFirebaseError(error);
//       }
//     }
//   }
  
//   export const paymentRepository = new PaymentRepository();

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
import { PaymentRecord, CreatePaymentDTO, PaymentStatus, PaymentMethod } from '../../types/domain/core/gym';
import { handleFirebaseError } from '../../utils/errorHandler';

export class PaymentRepository extends BaseRepository<PaymentRecord> {
  constructor() {
    super('payments');
  }

  /**
   * Create payment record - FIXED: Add missing currency field
   */
  async createPayment(paymentData: CreatePaymentDTO): Promise<string> {
    try {
      const paymentToCreate: Omit<PaymentRecord, 'id'> & { uid?: string } = {
        ...paymentData,
        currency: paymentData.currency || 'NPR', // ✅ FIX 1: Add currency with default
        status: 'completed' as PaymentStatus,    // ✅ FIX 2: Cast to PaymentStatus
        paymentDate: paymentData.paymentDate || new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return await this.create(paymentToCreate);
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
}

export const paymentRepository = new PaymentRepository();