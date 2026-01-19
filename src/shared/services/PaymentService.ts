// src/shared/services/PaymentService.ts
import { 
    PaymentRecord, 
    CreatePaymentDTO, 
    UpdatePaymentDTO,
    PaymentStatus,
    PaymentMethod,
    PaymentSummary,
    GymPaymentSettings,
    GymPackage
  } from '../types/domain/core/gym';
  import { GymMember } from '../types/domain/core/gym';
  import { paymentRepository } from './repositories/PaymentRepository';
  import { gymMemberRepository } from './repositories/GymMemberRepository';
  import { gymRepository } from './repositories/GymRepository';
  import { userRepository } from './repositories/UserRepository';
  import { PermissionService } from './PermissionService';
  import { UserFriendlyError } from '../utils/errorHandler';
  
  export class PaymentService {
    /**
     * Create a new payment with validation and business logic
     */
   // In src/shared/services/PaymentService.ts
// Update the createPayment method:

async createPayment(paymentData: CreatePaymentDTO, currentUserRole: string): Promise<PaymentRecord> {
    try {
      console.log('🎯 Creating payment:', { 
        memberId: paymentData.memberId,
        amount: paymentData.amount,
        method: paymentData.method,
        userRole: currentUserRole
      });
  
      // 1. Check permission
      if (!PermissionService.canManagePayments(currentUserRole)) {
        throw new UserFriendlyError(
          'Permission Denied',
          'Only owners and staff can record payments',
          'PAYMENT_PERMISSION_DENIED',
          false
        );
      }
  
      // 2. Validate member exists and belongs to gym
      const member = await gymMemberRepository.getById(paymentData.memberId);
      if (!member) {
        throw new UserFriendlyError(
          'Member not found',
          'The specified member does not exist',
          'MEMBER_NOT_FOUND',
          false
        );
      }
  
      if (member.gymId !== paymentData.gymId) {
        throw new UserFriendlyError(
          'Invalid gym',
          'Member does not belong to this gym',
          'INVALID_GYM',
          false
        );
      }
  
    // ✅ SIMPLIFIED: No verification logic, always completed
    const now = new Date();
    const finalPaymentData = {
    ...paymentData,
    currency: paymentData.currency || 'NPR',
    paymentDate: paymentData.paymentDate || now,
    dueDate: paymentData.dueDate || now,
    periodStart: paymentData.periodStart || now,
    periodEnd: paymentData.periodEnd || now,
    status: 'completed' as PaymentStatus, // ✅ Always completed
    createdAt: now,
    updatedAt: now
    };

    // Create payment
    const paymentId = await paymentRepository.createPayment(finalPaymentData);
    const payment = await paymentRepository.getById(paymentId);
      if (!payment) {
        throw new UserFriendlyError(
          'Payment creation failed',
          'Failed to retrieve created payment',
          'PAYMENT_CREATION_FAILED',
          false
        );
      }
  
      console.log('✅ Payment created successfully:', paymentId);
      return payment;
  
    } catch (error: any) {
      console.error('❌ Error creating payment:', error);
      if (error instanceof UserFriendlyError) {
        throw error;
      }
      throw new UserFriendlyError(
        'Failed to create payment',
        error.message || 'Please try again',
        'CREATE_PAYMENT_ERROR',
        true
      );
    }
  }
  
    /**
     * Get payments by gym with filtering
     */
    async getPaymentsByGym(
      gymId: string, 
      options?: {
        status?: PaymentStatus;
        method?: PaymentMethod;
        startDate?: Date;
        endDate?: Date;
        memberId?: string;
        limit?: number;
        offset?: number;
      }
    ): Promise<{ payments: PaymentRecord[]; total: number }> {
      try {
        // Get all payments for filtering
        const allPayments = await paymentRepository.getPaymentsByGym(gymId);
        
        // Apply filters
        let filtered = allPayments;
        
        if (options?.status) {
          filtered = filtered.filter(p => p.status === options.status);
        }
        
        if (options?.method) {
          filtered = filtered.filter(p => p.method === options.method);
        }
        
        if (options?.startDate) {
          const start = new Date(options.startDate);
          filtered = filtered.filter(p => new Date(p.paymentDate) >= start);
        }
        
        if (options?.endDate) {
          const end = new Date(options.endDate);
          filtered = filtered.filter(p => new Date(p.paymentDate) <= end);
        }
        
        if (options?.memberId) {
          filtered = filtered.filter(p => p.memberId === options.memberId);
        }
        
        // Apply pagination
        const total = filtered.length;
        const start = options?.offset || 0;
        const end = options?.limit ? start + options.limit : total;
        const payments = filtered.slice(start, end);
        
        return { payments, total };
        
      } catch (error: any) {
        console.error('❌ Error getting payments by gym:', error);
        throw new UserFriendlyError(
          'Failed to load payments',
          error.message || 'Please try again',
          'LOAD_PAYMENTS_ERROR',
          true
        );
      }
    }
  
    /**
     * Get overdue payments (due date passed, status not completed)
     */
    async getOverduePayments(gymId: string): Promise<PaymentRecord[]> {
      try {
        const allPayments = await paymentRepository.getPaymentsByGym(gymId);
        const now = new Date();
        
        return allPayments.filter(payment => {
          const dueDate = new Date(payment.dueDate);
          const isOverdue = dueDate < now && payment.status !== 'completed';
          return isOverdue;
        });
      } catch (error: any) {
        console.error('❌ Error getting overdue payments:', error);
        throw new UserFriendlyError(
          'Failed to load overdue payments',
          error.message || 'Please try again',
          'LOAD_OVERDUE_ERROR',
          true
        );
      }
    }
  
    /**
     * Get payments due soon (within next 3 days)
     */
    async getDueSoonPayments(gymId: string, days: number = 3): Promise<PaymentRecord[]> {
      try {
        const allPayments = await paymentRepository.getPaymentsByGym(gymId);
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + days);
        
        return allPayments.filter(payment => {
          const dueDate = new Date(payment.dueDate);
          const isDueSoon = dueDate >= now && dueDate <= futureDate && payment.status !== 'completed';
          return isDueSoon;
        });
      } catch (error: any) {
        console.error('❌ Error getting due soon payments:', error);
        throw new UserFriendlyError(
          'Failed to load due soon payments',
          error.message || 'Please try again',
          'LOAD_DUE_SOON_ERROR',
          true
        );
      }
    }
  
    /**
     * Update an existing payment - FIXED VERSION
     */
    // async updatePayment(
    //   paymentId: string,
    //   updateData: {
    //     amount?: number;
    //     method?: PaymentMethod;
    //     paymentDate?: Date;
    //     dueDate?: Date;
    //     notes?: string;
    //     status?: PaymentStatus; // ✅ FIXED: Added status field
    //   },
    //   currentUserId: string,
    //   currentUserRole: string
    // ): Promise<PaymentRecord> {
    //   try {
    //     console.log('🎯 Updating payment:', { 
    //       paymentId,
    //       updateData,
    //       currentUserId,
    //       currentUserRole 
    //     });
  
    //     // 1. Get the existing payment
    //     const payment = await paymentRepository.getById(paymentId);
    //     if (!payment) {
    //       throw new UserFriendlyError(
    //         'Payment not found',
    //         'The specified payment does not exist',
    //         'PAYMENT_NOT_FOUND',
    //         false
    //       );
    //     }
  
    //     // 2. Check edit permissions
    //     const canEdit = this.canEditPayment(payment, currentUserId, currentUserRole);
    //     if (!canEdit) {
    //       throw new UserFriendlyError(
    //         'Edit permission denied',
    //         'You do not have permission to edit this payment',
    //         'EDIT_PERMISSION_DENIED',
    //         false
    //       );
    //     }
  
    //     // 3. Prepare update data
    //     const updateDataToSend: Partial<PaymentRecord> = {
    //       ...updateData,
    //       updatedAt: new Date()
    //     };
  
    //     // 5. Update the payment
    //     await paymentRepository.update(paymentId, updateDataToSend);
  
    //     // 6. Get updated payment
    //     const updatedPayment = await paymentRepository.getById(paymentId);
    //     if (!updatedPayment) {
    //       throw new UserFriendlyError(
    //         'Update failed',
    //         'Failed to retrieve updated payment',
    //         'UPDATE_FAILED',
    //         false
    //       );
    //     }
  
    //     // 7. Update member's payment status if amount changed
    //     if (updateData.amount !== undefined && updateData.amount !== payment.amount) {
    //       await this.updateMemberPaymentStatus(payment.memberId, updatedPayment);
    //     }
  
    //     console.log('✅ Payment updated successfully:', paymentId);
    //     return updatedPayment;
  
    //   } catch (error: any) {
    //     console.error('❌ Error updating payment:', error);
    //     if (error instanceof UserFriendlyError) {
    //       throw error;
    //     }
    //     throw new UserFriendlyError(
    //       'Failed to update payment',
    //       error.message || 'Please try again',
    //       'UPDATE_PAYMENT_ERROR',
    //       true
    //     );
    //   }
    // }
    async updatePayment(
        paymentId: string,
        updateData: UpdatePaymentDTO,
        currentUserId: string,
        currentUserRole: string
      ): Promise<PaymentRecord> {
        try {
          console.log('🎯 Updating payment with full data:', { 
            paymentId,
            updateData,
            currentUserId,
            currentUserRole 
          });
      
          // 1. Get the existing payment
          const payment = await paymentRepository.getById(paymentId);
          if (!payment) {
            throw new UserFriendlyError(
              'Payment not found',
              'The specified payment does not exist',
              'PAYMENT_NOT_FOUND',
              false
            );
          }
      
          // 2. Check edit permissions (only owners can edit)
          if (currentUserRole !== 'owner') {
            throw new UserFriendlyError(
              'Edit permission denied',
              'Only owners can edit payments',
              'EDIT_PERMISSION_DENIED',
              false
            );
          }
      
          // 3. Prepare update data with all fields
          const updateDataToSend: Partial<PaymentRecord> = {
            ...updateData,
            updatedAt: new Date()
          };
      
          // 4. Handle package changes - CRITICAL LOGIC
          let packageChanged = false;
          let oldPackageId = payment.packageId;
          let newPackageId = updateData.packageId;
          
          if (newPackageId !== undefined && newPackageId !== payment.packageId) {
            console.log('🔄 Package change detected:', { oldPackageId, newPackageId });
            packageChanged = true;
            
            // Update package fields
            updateDataToSend.packageId = newPackageId;
            updateDataToSend.packageName = updateData.packageName;
            
            // If changing from package to product/service, clear package dates
            if (newPackageId === 'products_services') {
              console.log('📦 Changing from package to product/service');
              updateDataToSend.periodStart = undefined;
              updateDataToSend.periodEnd = undefined;
            } else if (newPackageId && newPackageId !== 'products_services') {
              // Changing to a package, ensure dates are set
              if (updateData.periodStart) {
                updateDataToSend.periodStart = updateData.periodStart;
              }
              if (updateData.periodEnd) {
                updateDataToSend.periodEnd = updateData.periodEnd;
              }
            }
          } else if (updateData.periodStart || updateData.periodEnd) {
            // Same package but dates changed
            if (updateData.periodStart) {
              updateDataToSend.periodStart = updateData.periodStart;
            }
            if (updateData.periodEnd) {
              updateDataToSend.periodEnd = updateData.periodEnd;
            }
          }
      
          // 5. Handle discount updates
          if (updateData.discountPercentage !== undefined) {
            updateDataToSend.discountPercentage = updateData.discountPercentage;
            if (updateData.originalAmount !== undefined) {
              updateDataToSend.originalAmount = updateData.originalAmount;
            } else if (updateData.discountPercentage === 0) {
              // If discount removed, clear original amount
              updateDataToSend.originalAmount = undefined;
            }
          }
      
          // 6. Update the payment in Firestore
          console.log('📝 Updating payment document with:', updateDataToSend);
          await paymentRepository.update(paymentId, updateDataToSend);
      
          // 7. Get updated payment
          const updatedPayment = await paymentRepository.getById(paymentId);
          if (!updatedPayment) {
            throw new UserFriendlyError(
              'Update failed',
              'Failed to retrieve updated payment',
              'UPDATE_FAILED',
              false
            );
          }
      
          // 8. ✅ CRITICAL: Handle member package updates
          if (packageChanged && payment.memberId) {
            try {
              const member = await gymMemberRepository.getById(payment.memberId);
              if (!member) {
                console.log('⚠️ Member not found for package update');
              } else {
                // Scenario 1: Changing to a package (not product/service)
                if (newPackageId && newPackageId !== 'products_services') {
                  const gym = await gymRepository.getById(payment.gymId);
                  if (gym) {
                    const gymPackage = gym.packages.find(p => p.id === newPackageId);
                    if (gymPackage && updateData.periodStart) {
                      console.log('🔄 Assigning new package to member:', gymPackage.name);
                      await gymMemberRepository.assignOrRenewPackage(
                        payment.memberId,
                        gymPackage,
                        updateData.periodStart,
                        false // Always new assignment when changing packages
                      );
                    }
                  }
                }
                // Scenario 2: Changing from package to product/service
                else if (oldPackageId && oldPackageId !== 'products_services' && newPackageId === 'products_services') {
                  console.log('🔄 Removing package from member (changing to product/service)');
                  // Clear package from member
                  await gymMemberRepository.update(payment.memberId, {
                    currentPackage: undefined,
                    expiryDate: undefined,
                    updatedAt: new Date()
                  });
                }
                // Scenario 3: Removing package entirely (if newPackageId is undefined/empty)
                else if (oldPackageId && oldPackageId !== 'products_services' && !newPackageId) {
                  console.log('🔄 Removing package from member');
                  await gymMemberRepository.update(payment.memberId, {
                    currentPackage: undefined,
                    expiryDate: undefined,
                    updatedAt: new Date()
                  });
                }
              }
            } catch (error) {
              console.error('❌ Error updating member package after payment edit:', error);
              // Don't fail the payment update if package update fails
            }
          }
      
          console.log('✅ Payment updated successfully:', paymentId);
          return updatedPayment;
      
        } catch (error: any) {
          console.error('❌ Error updating payment:', error);
          if (error instanceof UserFriendlyError) {
            throw error;
          }
          throw new UserFriendlyError(
            'Failed to update payment',
            error.message || 'Please try again',
            'UPDATE_PAYMENT_ERROR',
            true
          );
        }
      }
  
    /**
     * Delete payment (owner only)
     */
    async deletePayment(
      paymentId: string, 
      currentUserRole: string
    ): Promise<void> {
      try {
        // Only owners can delete payments
        if (!PermissionService.canDeleteMember(currentUserRole)) {
          throw new UserFriendlyError(
            'Delete permission denied',
            'Only owners can delete payments',
            'DELETE_PERMISSION_DENIED',
            false
          );
        }
  
        const payment = await paymentRepository.getById(paymentId);
        if (!payment) {
          throw new UserFriendlyError(
            'Payment not found',
            'The specified payment does not exist',
            'PAYMENT_NOT_FOUND',
            false
          );
        }
  
        await paymentRepository.delete(paymentId);
        console.log('✅ Payment deleted:', paymentId);
  
      } catch (error: any) {
        console.error('❌ Error deleting payment:', error);
        if (error instanceof UserFriendlyError) {
          throw error;
        }
        throw new UserFriendlyError(
          'Failed to delete payment',
          error.message || 'Please try again',
          'DELETE_PAYMENT_ERROR',
          true
        );
      }
    }
  
    /**
     * Get payment summary for analytics
     */
    async getPaymentSummary(
      gymId: string,
      period: 'month' | 'quarter' | 'year' | 'custom',
      startDate?: Date,
      endDate?: Date
    ): Promise<PaymentSummary> {
      try {
        const payments = await paymentRepository.getPaymentsByGym(gymId);
        
        // Calculate date range
        const now = new Date();
        let periodStart: Date;
        let periodEnd: Date = now;
        
        switch (period) {
          case 'month':
            periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            periodStart = new Date(now.getFullYear(), quarter * 3, 1);
            break;
          case 'year':
            periodStart = new Date(now.getFullYear(), 0, 1);
            break;
          case 'custom':
            periodStart = startDate || new Date(now.getFullYear(), now.getMonth(), 1);
            periodEnd = endDate || now;
            break;
          default:
            periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        }
  
        // Filter payments by period
        const periodPayments = payments.filter(p => {
          const paymentDate = new Date(p.paymentDate);
          return paymentDate >= periodStart && paymentDate <= periodEnd;
        });
  
        // Calculate summary
        const totalAmount = periodPayments.reduce((sum, p) => sum + p.amount, 0);
        const cashAmount = periodPayments
          .filter(p => p.method === 'cash')
          .reduce((sum, p) => sum + p.amount, 0);
        const digitalAmount = periodPayments
          .filter(p => p.method !== 'cash')
          .reduce((sum, p) => sum + p.amount, 0);
        
        // Get overdue amount
        const overduePayments = await this.getOverduePayments(gymId);
        const overdueAmount = overduePayments.reduce((sum, p) => sum + p.amount, 0);
  
        // Calculate collection rate (simplified)
        const allMembers = await gymMemberRepository.getMembersByGym(gymId);
        const activeMembers = allMembers.filter(m => m.status === 'active').length;
        const expectedRevenue = activeMembers * 2000; // Simplified: assume 2000 NPR per member
        const collectionRate = expectedRevenue > 0 ? (totalAmount / expectedRevenue) * 100 : 0;
  
        const periodLabel = period === 'custom' 
          ? `${periodStart.toLocaleDateString()} - ${periodEnd.toLocaleDateString()}`
          : period === 'month' ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
          : period === 'quarter' ? `${now.getFullYear()}-Q${Math.floor(now.getMonth() / 3) + 1}`
          : `${now.getFullYear()}`;
  
        return {
          period: periodLabel,
          totalAmount,
          totalTransactions: periodPayments.length,
          cashAmount,
          digitalAmount,
          overdueAmount,
          collectionRate: Math.min(100, Math.round(collectionRate * 100) / 100) // Cap at 100%
        };
  
      } catch (error: any) {
        console.error('❌ Error getting payment summary:', error);
        throw new UserFriendlyError(
          'Failed to generate payment summary',
          error.message || 'Please try again',
          'SUMMARY_ERROR',
          true
        );
      }
    }
  
    /**
     * Calculate payment status based on due date
     */
    calculatePaymentStatus(payment: PaymentRecord): PaymentStatus {
      if (payment.status === 'completed') return 'completed';
      if (payment.status === 'failed') return 'failed';
      
      const now = new Date();
      const dueDate = new Date(payment.dueDate);
      const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDue <= 0) return 'overdue';
      if (daysUntilDue <= 3) return 'due_soon';
      return 'pending';
    }
  
    /**
     * Check if user can edit payment
     * Owners: Always
     * Staff: Only within 24h of creation and their own recordings
     */
    private canEditPayment(
      payment: PaymentRecord, 
      currentUserId: string,
      currentUserRole: string
    ): boolean {
      if (currentUserRole === 'owner') return true;
      if (currentUserRole !== 'staff') return false;
      
      // Staff can only edit their own payments within 24h
      const isOwner = payment.userId === currentUserId;
      const hoursSinceCreation = (Date.now() - payment.createdAt.getTime()) / (1000 * 60 * 60);
      const within24h = hoursSinceCreation <= 24;
      
      return isOwner && within24h;
    }
  
    /**
     * Update member's payment status and dates
     */
    private async updateMemberPaymentStatus(memberId: string, payment: PaymentRecord): Promise<void> {
      try {
        const member = await gymMemberRepository.getById(memberId);
        if (!member) return;
  
        const updateData: any = {
          updatedAt: new Date()
        };
  
        if (payment.status === 'completed') {
          updateData.lastPaymentDate = payment.paymentDate;
          updateData.paymentStatus = 'completed';
          
          // Calculate next payment date (30 days after this payment)
          const nextPaymentDate = new Date(payment.paymentDate);
          nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
          updateData.nextPaymentDate = nextPaymentDate;
          
          updateData.totalPaid = (member.totalPaid || 0) + payment.amount;
        }
  
        await gymMemberRepository.update(memberId, updateData);
      } catch (error) {
        console.error('❌ Error updating member payment status:', error);
        // Don't throw - this is a background update
      }
    }
  
    /**
     * Send payment reminders for due/overdue payments
     */
    async sendPaymentReminders(gymId: string): Promise<{ sent: number; failed: number }> {
      try {
        const [dueSoonPayments, overduePayments] = await Promise.all([
          this.getDueSoonPayments(gymId, 3),
          this.getOverduePayments(gymId)
        ]);
  
        const allReminders = [...dueSoonPayments, ...overduePayments];
        let sent = 0;
        let failed = 0;
  
        // TODO: Implement actual notification sending
        // For now, just log and update last reminder sent
        console.log(`📨 Would send ${allReminders.length} payment reminders`);
  
        return { sent, failed };
      } catch (error) {
        console.error('❌ Error sending payment reminders:', error);
        return { sent: 0, failed: 0 };
      }
    }

    /**
     * Get package by ID from gym
     */
    private async getPackageById(gymId: string, packageId: string): Promise<GymPackage | null> {
        try {
        const gym = await gymRepository.getById(gymId);
        if (!gym) return null;
        
        const gymPackage = gym.packages.find(p => p.id === packageId);
        return gymPackage || null;
        } catch (error) {
        console.error('❌ Error getting package:', error);
        return null;
        }
    }
    
    /**
     * Check if payment is a package renewal
     */
    private async isPackageRenewal(memberId: string, packageId: string): Promise<boolean> {
        try {
        const hasPackage = await gymMemberRepository.hasPackage(memberId, packageId);
        return hasPackage;
        } catch (error) {
        console.error('❌ Error checking package renewal:', error);
        return false;
        }
    }
  
  }
  
  export const paymentService = new PaymentService();