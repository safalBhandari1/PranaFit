// src/features/gym/stores/useGymStore.ts
import { create } from 'zustand';
import { 
  Gym, 
  GymMember, 
  CheckinRecord, 
  PaymentRecord,
  CreateGymDTO,
  UpdateGymDTO,
  CreateGymMemberDTO,
  MemberStatus,
  GymPackage,
  GymSettings
} from '../../../shared/types/domain/core/gym';
import { gymService } from '../../../shared/services/GymService';
import { gymRepository } from '../../../shared/services/repositories/GymRepository';
import { gymMemberRepository } from '../../../shared/services/repositories/GymMemberRepository';
import { checkinRepository } from '../../../shared/services/repositories/CheckinRepository';
import { paymentRepository } from '../../../shared/services/repositories/PaymentRepository';
import { UserFriendlyError, handleFirebaseError } from '../../../shared/utils/errorHandler';
import { useAppStore } from '../../../shared/stores/useAppStore';

interface GymStore {
  // Current gym state
  currentGym: Gym | null;
  isLoading: boolean;
  error: string | null;
  
  // Gym members
  members: GymMember[];
  activeMembers: GymMember[];
  selectedMember: GymMember | null;
  isMembersLoading: boolean;
  
  // Checkins & Payments
  todayCheckins: CheckinRecord[];
  recentPayments: PaymentRecord[];
  isCheckinsLoading: boolean;
  isPaymentsLoading: boolean;
  
  // Gym dashboard data
  dashboardStats: {
    totalMembers: number;
    activeMembers: number;
    newMembersThisMonth: number;
    checkinsToday: number;
    revenueThisMonth: number;
    overduePayments: number;
  } | null;
  isDashboardLoading: boolean;
  

// Actions - Gym Management
    createGym: (gymData: Omit<CreateGymDTO, 'ownerId'> & {
        description?: string;
        contactEmail?: string;
        website?: string;
        logoUrl?: string;
        coverImageUrl?: string;
    }) => Promise<{ gymId: string; gym: Gym }>;
    loadCurrentGym: (gymId: string) => Promise<void>;
    updateGym: (gymId: string, updateData: UpdateGymDTO) => Promise<void>;
    clearCurrentGym: () => void;
  
  // Actions - Member Management
  addMember: (userId: string, memberData?: Omit<CreateGymMemberDTO, 'gymId' | 'userId'>) => Promise<{ memberId: string; member: GymMember }>;
  addMemberWithPackage: (userId: string, packageId: string, memberData?: Omit<CreateGymMemberDTO, 'gymId' | 'userId' | 'packageId'>) => Promise<{ memberId: string; member: GymMember }>;
  assignPackageToMember: (memberId: string, packageId: string) => Promise<void>;
  loadMembers: (gymId: string) => Promise<void>;
  searchMembers: (searchText: string) => Promise<GymMember[]>;
  updateMemberStatus: (memberId: string, status: MemberStatus) => Promise<void>;
  deleteMember: (memberId: string) => Promise<void>;
  
  // Actions - Checkins
  recordCheckin: (memberId: string, method: string, location?: any) => Promise<{ checkinId: string; checkin: CheckinRecord }>;
  recordCheckout: (checkinId: string) => Promise<void>;
  loadTodayCheckins: (gymId: string) => Promise<void>;
  
  // Actions - Payments
  recordPayment: (memberId: string, paymentData: {
    amount: number;
    method: string;
    packageId?: string;
    dueDate?: Date;
    periodStart?: Date;
    periodEnd?: Date;
    notes?: string;
  }) => Promise<{ paymentId: string; payment: PaymentRecord }>;
  loadRecentPayments: (gymId: string) => Promise<void>;

  // Add these new methods:
  addGymPackage: (packageData: Omit<GymPackage, 'id' | 'createdAt'>) => Promise<{ packageId: string; gymPackage: GymPackage }>;
  updateGymPackage: (packageId: string, updateData: Partial<Omit<GymPackage, 'id' | 'createdAt'>>) => Promise<void>;
  deleteGymPackage: (packageId: string) => Promise<void>;
  
  // Actions - Dashboard
  loadDashboardData: (gymId: string) => Promise<void>;
  refreshDashboard: (gymId: string) => Promise<void>;
  
  // Utility
  clearError: () => void;
  resetStore: () => void;
}

// Helper to get current user ID safely
const getCurrentUserId = (): string => {
  try {
    const user = useAppStore.getState().user;
    if (!user?.uid) {
      throw new UserFriendlyError(
        'No user ID available',
        'Please sign in to perform this action',
        'AUTH_REQUIRED',
        false
      );
    }
    return user.uid;
  } catch (error: any) {
    if (error instanceof UserFriendlyError) throw error;
    throw new UserFriendlyError(
      'Authentication error',
      'Please sign in to continue',
      'AUTH_ERROR',
      false
    );
  }
};

// Helper to get current gym ID
const getCurrentGymId = (): string => {
  const state = useGymStore.getState();
  if (!state.currentGym?.id) {
    throw new UserFriendlyError(
      'No gym selected',
      'Please select a gym first',
      'GYM_NOT_SELECTED',
      false
    );
  }
  return state.currentGym.id;
};

export const useGymStore = create<GymStore>((set, get) => ({
  // Initial State
  currentGym: null,
  isLoading: false,
  error: null,
  
  members: [],
  activeMembers: [],
  selectedMember: null,
  isMembersLoading: false,
  
  todayCheckins: [],
  recentPayments: [],
  isCheckinsLoading: false,
  isPaymentsLoading: false,
  
  dashboardStats: null,
  isDashboardLoading: false,
  
  // Actions - Gym Management
  
  /**
   * Create a new gym
   */
  createGym: async (gymData) => {
    set({ isLoading: true, error: null });
    try {
      const userId = getCurrentUserId();
      const result = await gymService.createGymWithOwner(gymData, userId);
      
      set({ 
        currentGym: result.gym,
        isLoading: false 
      });
      
      return result;
    } catch (error: any) {
      console.error('❌ Error creating gym:', error);
      set({ 
        error: error.message || 'Failed to create gym',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Load current gym
   */
  loadCurrentGym: async (gymId: string) => {
    set({ isLoading: true, error: null });
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
      
      set({ 
        currentGym: gym,
        isLoading: false 
      });
    } catch (error: any) {
      console.error('❌ Error loading gym:', error);
      set({ 
        error: error.message || 'Failed to load gym',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Update gym - FIXED: Convert packages from DTO to full GymPackage
   */
//   updateGym: async (gymId: string, updateData: UpdateGymDTO) => {
//     set({ isLoading: true, error: null });
//     try {
//       // Don't allow updating packages through this method - use separate package methods
//       const { packages: _, ...safeUpdateData } = updateData;
      
//       await gymRepository.update(gymId, safeUpdateData);
      
//       // Refresh current gym if it's the same
//       const { currentGym } = get();
//       if (currentGym?.id === gymId) {
//         const updatedGym = await gymRepository.getById(gymId);
//         set({ currentGym: updatedGym });
//       }
      
//       set({ isLoading: false });
//     } catch (error: any) {
//       console.error('❌ Error updating gym:', error);
//       set({ 
//         error: error.message || 'Failed to update gym',
//         isLoading: false 
//       });
//       throw handleFirebaseError(error);
//     }
//   },

updateGym: async (gymId: string, updateData: UpdateGymDTO) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Fetch the current, complete object from the database
      const currentGym = await gymRepository.getById(gymId);
      if (!currentGym) {
        throw new UserFriendlyError('Gym not found', 'The gym does not exist.', 'GYM_NOT_FOUND', false);
      }
      
      // 2. Handle settings merge FIRST
      let mergedSettings: GymSettings | undefined;
      if (updateData.settings) {
        mergedSettings = {
          ...currentGym.settings, // Start with all current values
          ...updateData.settings  // Overlay the new partial values
        };
      }
      
      // 3. Create the update object WITHOUT spreading updateData.settings
      const { settings: _, packages: __, ...otherUpdateData } = updateData;
      
      const mergedUpdateData: Partial<Gym> = {
        ...otherUpdateData,
        packages: undefined // Explicitly exclude from general update
      };
      
      // 4. Add merged settings if they exist
      if (mergedSettings) {
        mergedUpdateData.settings = mergedSettings;
      }
      
      // 5. Save the merged, complete object back to the database
      await gymRepository.update(gymId, mergedUpdateData);
      
      // 6. Refresh current gym in store
      const { currentGym: storeGym } = get();
      if (storeGym?.id === gymId) {
        const updatedGym = await gymRepository.getById(gymId);
        set({ currentGym: updatedGym });
      }
      
      set({ isLoading: false });
    } catch (error: any) {
      console.error('❌ Error updating gym:', error);
      set({ 
        error: error.message || 'Failed to update gym',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  clearCurrentGym: () => {
    set({ currentGym: null });
  },
  
  // Actions - Member Management
  
  /**
   * Add member to gym
   */
  addMember: async (userId: string, memberData = {}) => {
    set({ isMembersLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const result = await gymService.addGymMember(gymId, userId, memberData);
      
      // Update local state optimistically
      set((state) => ({
        members: [result.member, ...state.members],
        activeMembers: [result.member, ...state.activeMembers],
        isMembersLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return result;
    } catch (error: any) {
      console.error('❌ Error adding member:', error);
      set({ 
        error: error.message || 'Failed to add member',
        isMembersLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Add member with package
   */
  addMemberWithPackage: async (userId: string, packageId: string, memberData = {}) => {
    set({ isMembersLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const result = await gymService.addGymMemberWithPackage(gymId, userId, packageId, memberData);
      
      // Update local state optimistically
      set((state) => ({
        members: [result.member, ...state.members],
        activeMembers: [result.member, ...state.activeMembers],
        isMembersLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return result;
    } catch (error: any) {
      console.error('❌ Error adding member with package:', error);
      set({ 
        error: error.message || 'Failed to add member',
        isMembersLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Assign package to existing member
   */
  assignPackageToMember: async (memberId: string, packageId: string) => {
    set({ isMembersLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      await gymService.assignPackageToMember(gymId, memberId, packageId);
      
      // Update local state
      const updatedMembers = await gymMemberRepository.getMembersByGym(gymId);
      const activeMembers = updatedMembers.filter(m => m.status === 'active');
      
      set({ 
        members: updatedMembers,
        activeMembers,
        isMembersLoading: false 
      });
      
    } catch (error: any) {
      console.error('❌ Error assigning package:', error);
      set({ 
        error: error.message || 'Failed to assign package',
        isMembersLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Load all members for current gym
   */
  loadMembers: async (gymId: string) => {
    set({ isMembersLoading: true, error: null });
    try {
      const [members, activeMembers] = await Promise.all([
        gymMemberRepository.getMembersByGym(gymId),
        gymMemberRepository.getActiveMembersByGym(gymId)
      ]);
      
      set({ 
        members,
        activeMembers,
        isMembersLoading: false 
      });
    } catch (error: any) {
      console.error('❌ Error loading members:', error);
      set({ 
        error: error.message || 'Failed to load members',
        isMembersLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Search members
   */
  searchMembers: async (searchText: string): Promise<GymMember[]> => {
    try {
      const gymId = getCurrentGymId();
      if (!searchText.trim()) {
        return get().members;
      }
      
      return await gymMemberRepository.searchMembersByCode(gymId, searchText);
    } catch (error: any) {
      console.error('❌ Error searching members:', error);
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Update member status - FIXED: Use MemberStatus type
   */
  updateMemberStatus: async (memberId: string, status: MemberStatus) => {
    set({ isMembersLoading: true, error: null });
    try {
      await gymMemberRepository.update(memberId, { 
        status: status as MemberStatus, // ✅ Cast to correct type
        updatedAt: new Date()
      });
      
      // Refresh members list
      const gymId = getCurrentGymId();
      await get().loadMembers(gymId);
      
      set({ isMembersLoading: false });
    } catch (error: any) {
      console.error('❌ Error updating member status:', error);
      set({ 
        error: error.message || 'Failed to update member',
        isMembersLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Delete member
   */
  deleteMember: async (memberId: string) => {
    set({ isMembersLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      
      // Get member before deletion to update stats
      const member = await gymMemberRepository.getById(memberId);
      
      // Delete member
      await gymMemberRepository.delete(memberId);
      
      // Update gym stats if member was active
      if (member?.status === 'active') {
        const gym = await gymRepository.getById(gymId);
        if (gym) {
          await gymRepository.updateGymStats(gymId, {
            totalMembers: Math.max(0, (gym.totalMembers || 0) - 1),
            activeMembers: Math.max(0, (gym.activeMembers || 0) - 1)
          });
        }
      }
      
      // Update local state
      set((state) => ({
        members: state.members.filter(m => m.id !== memberId),
        activeMembers: state.activeMembers.filter(m => m.id !== memberId),
        isMembersLoading: false
      }));
      
      // Refresh dashboard
      get().refreshDashboard(gymId).catch(console.error);
      
    } catch (error: any) {
      console.error('❌ Error deleting member:', error);
      set({ 
        error: error.message || 'Failed to delete member',
        isMembersLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  // Actions - Checkins
  
  /**
   * Record checkin
   */
  recordCheckin: async (memberId: string, method: string, location?: any) => {
    set({ isCheckinsLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const userId = getCurrentUserId();
      
      const result = await gymService.recordCheckin(gymId, memberId, userId, method, location);
      
      // Update local state optimistically
      set((state) => ({
        todayCheckins: [result.checkin, ...state.todayCheckins],
        isCheckinsLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return result;
    } catch (error: any) {
      console.error('❌ Error recording checkin:', error);
      set({ 
        error: error.message || 'Failed to record checkin',
        isCheckinsLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Record checkout
   */
  recordCheckout: async (checkinId: string) => {
    set({ isCheckinsLoading: true, error: null });
    try {
      await checkinRepository.recordCheckout(checkinId, new Date());
      
      set({ isCheckinsLoading: false });
    } catch (error: any) {
      console.error('❌ Error recording checkout:', error);
      set({ 
        error: error.message || 'Failed to record checkout',
        isCheckinsLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Load today's checkins
   */
  loadTodayCheckins: async (gymId: string) => {
    set({ isCheckinsLoading: true, error: null });
    try {
      const checkins = await checkinRepository.getTodayCheckins(gymId);
      
      set({ 
        todayCheckins: checkins,
        isCheckinsLoading: false 
      });
    } catch (error: any) {
      console.error('❌ Error loading checkins:', error);
      set({ 
        error: error.message || 'Failed to load checkins',
        isCheckinsLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  // Actions - Payments
  
  /**
   * Record payment
   */
  recordPayment: async (memberId: string, paymentData) => {
    set({ isPaymentsLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const userId = getCurrentUserId();
      
      const result = await gymService.recordPayment(gymId, memberId, userId, paymentData);
      
      // Update local state optimistically
      set((state) => ({
        recentPayments: [result.payment, ...state.recentPayments],
        isPaymentsLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return result;
    } catch (error: any) {
      console.error('❌ Error recording payment:', error);
      set({ 
        error: error.message || 'Failed to record payment',
        isPaymentsLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Load recent payments
   */
  loadRecentPayments: async (gymId: string) => {
    set({ isPaymentsLoading: true, error: null });
    try {
      const payments = await paymentRepository.getMonthlyPayments(gymId);
      
      set({ 
        recentPayments: payments,
        isPaymentsLoading: false 
      });
    } catch (error: any) {
      console.error('❌ Error loading payments:', error);
      set({ 
        error: error.message || 'Failed to load payments',
        isPaymentsLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },

   /**
   * Add new package to current gym
   */
   addGymPackage: async (packageData) => {
    set({ isLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const result = await gymService.addGymPackage(gymId, packageData);
      
      // Update current gym with new package
      const { currentGym } = get();
      if (currentGym) {
        set({
          currentGym: {
            ...currentGym,
            packages: [...currentGym.packages, result.gymPackage]
          },
          isLoading: false
        });
      }
      
      return result;
    } catch (error: any) {
      console.error('❌ Error adding gym package:', error);
      set({ 
        error: error.message || 'Failed to add package',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Update existing package
   */
  updateGymPackage: async (packageId: string, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      await gymService.updateGymPackage(gymId, packageId, updateData);
      
      // Update current gym
      const { currentGym } = get();
      if (currentGym) {
        const updatedPackages = currentGym.packages.map(pkg =>
          pkg.id === packageId ? { ...pkg, ...updateData } : pkg
        );
        
        set({
          currentGym: {
            ...currentGym,
            packages: updatedPackages
          },
          isLoading: false
        });
      }
    } catch (error: any) {
      console.error('❌ Error updating gym package:', error);
      set({ 
        error: error.message || 'Failed to update package',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Delete package from gym
   */
  deleteGymPackage: async (packageId: string) => {
    set({ isLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      await gymService.deleteGymPackage(gymId, packageId);
      
      // Update current gym
      const { currentGym } = get();
      if (currentGym) {
        const updatedPackages = currentGym.packages.filter(pkg => pkg.id !== packageId);
        
        set({
          currentGym: {
            ...currentGym,
            packages: updatedPackages
          },
          isLoading: false
        });
      }
    } catch (error: any) {
      console.error('❌ Error deleting gym package:', error);
      set({ 
        error: error.message || 'Failed to delete package',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  // Actions - Dashboard
  
  /**
   * Load complete dashboard data
   */
  loadDashboardData: async (gymId: string) => {
    set({ isDashboardLoading: true, error: null });
    try {
      const dashboardData = await gymService.getGymDashboard(gymId);
      
      set({ 
        currentGym: dashboardData.gym,
        todayCheckins: dashboardData.recentCheckins,
        recentPayments: dashboardData.recentPayments,
        dashboardStats: dashboardData.stats,
        isDashboardLoading: false
      });
      
      // Also load members
      await get().loadMembers(gymId);
      
    } catch (error: any) {
      console.error('❌ Error loading dashboard:', error);
      set({ 
        error: error.message || 'Failed to load dashboard',
        isDashboardLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  
  /**
   * Refresh dashboard data
   */
  refreshDashboard: async (gymId: string) => {
    try {
      console.log('🔄 Refreshing gym dashboard...');
      await get().loadDashboardData(gymId);
      console.log('✅ Gym dashboard refreshed');
    } catch (error) {
      console.error('❌ Failed to refresh dashboard:', error);
    }
  },
  
  // Utility
  
  clearError: () => {
    set({ error: null });
  },
  
  resetStore: () => {
    set({
      currentGym: null,
      members: [],
      activeMembers: [],
      todayCheckins: [],
      recentPayments: [],
      dashboardStats: null,
      error: null,
      isLoading: false,
      isMembersLoading: false,
      isCheckinsLoading: false,
      isPaymentsLoading: false,
      isDashboardLoading: false
    });
  }
}));