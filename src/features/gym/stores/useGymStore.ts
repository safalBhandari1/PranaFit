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
  
  // Gym Switching State (ADDED)
  isSwitchingGym: boolean;
  switchError: string | null;
  
  // Actions - Gym Management
  createGym: (gymData: Omit<CreateGymDTO, 'owners'> & {
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

  // Gym Package Management
  addGymPackage: (packageData: Omit<GymPackage, 'id' | 'createdAt'>) => Promise<{ packageId: string; gymPackage: GymPackage }>;
  updateGymPackage: (packageId: string, updateData: Partial<Omit<GymPackage, 'id' | 'createdAt'>>) => Promise<void>;
  deleteGymPackage: (packageId: string) => Promise<void>;
  
  // Actions - Dashboard
  loadDashboardData: (gymId: string) => Promise<void>;
  refreshDashboard: (gymId: string) => Promise<void>;
  
  // Gym Switching (UPDATED)
  switchGym: (gymId: string) => Promise<void>;
  
  // Utility
  clearError: () => void;
  clearSwitchError: () => void; // ADDED
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

// Helper to get current gym ID from app store
const getCurrentGymId = (): string => {
  const currentGymId = useAppStore.getState().currentGymId;
  if (!currentGymId) {
    throw new UserFriendlyError(
      'No gym selected',
      'Please select a gym first',
      'GYM_NOT_SELECTED',
      false
    );
  }
  return currentGymId;
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
  
  // Gym Switching State (ADDED)
  isSwitchingGym: false,
  switchError: null,
  
  // ================ GYM MANAGEMENT ================
  
  /**
   * Create a new gym with multi-owner support
   */
  createGym: async (gymData) => {
    set({ isLoading: true, error: null });
    try {
      const userId = getCurrentUserId();
      
      const gym = await gymService.createGymWithOwners(gymData, [userId]);
      
      // Update app store with current gym
      useAppStore.getState().setCurrentGymId(gym.id);
      
      set({ 
        currentGym: gym,
        isLoading: false 
      });
      
      return { gymId: gym.id, gym };
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
   * Update gym
   */
//   updateGym: async (gymId: string, updateData: UpdateGymDTO) => {
//     set({ isLoading: true, error: null });
//     try {
//       // 1. Fetch the current, complete object from the database
//       const currentGym = await gymRepository.getById(gymId);
//       if (!currentGym) {
//         throw new UserFriendlyError('Gym not found', 'The gym does not exist.', 'GYM_NOT_FOUND', false);
//       }
      
//       // 2. Handle settings merge FIRST
//       let mergedSettings: GymSettings | undefined;
//       if (updateData.settings) {
//         mergedSettings = {
//           ...currentGym.settings,
//           ...updateData.settings
//         };
//       }
      
//       // 3. Create the update object WITHOUT spreading updateData.settings
//       const { settings: _, packages: __, ...otherUpdateData } = updateData;
      
//       const mergedUpdateData: Partial<Gym> = {
//         ...otherUpdateData,
//         packages: undefined
//       };
      
//       // 4. Add merged settings if they exist
//       if (mergedSettings) {
//         mergedUpdateData.settings = mergedSettings;
//       }
      
//       // 5. Save the merged, complete object back to the database
//       await gymRepository.update(gymId, mergedUpdateData);
      
//       // 6. Refresh current gym in store
//       const { currentGym: storeGym } = get();
//       if (storeGym?.id === gymId) {
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

/**
 * Update gym - SIMPLIFIED VERSION
 */
/**
 * Update gym - CLEANER VERSION
 */
// updateGym: async (gymId: string, updateData: UpdateGymDTO) => {
//     set({ isLoading: true, error: null });
//     try {
//       console.log('🔄 UPDATE GYM STARTED:');
//       console.log('- Gym ID:', gymId);
//       console.log('- Update data keys:', Object.keys(updateData));
//       console.log('- Has packages field?', 'packages' in updateData);
//       console.log('- Packages value:', updateData.packages);
//       console.log('- Package count:', updateData.packages?.length || 0);
//       console.log('- Is packages array?', Array.isArray(updateData.packages));
      
//       // TEMPORARY DEBUG - Deep inspection
//       console.log('🔍 TEMP DEBUG - updateData object:', JSON.stringify(updateData, null, 2));
      
//       // Get current gym first
//       const currentGym = await gymRepository.getById(gymId);
//       if (!currentGym) {
//         throw new UserFriendlyError('Gym not found', 'The gym does not exist.', 'GYM_NOT_FOUND', false);
//       }
  
//       // ✅ CRITICAL: Handle packages FIRST - with extensive logging
//       if (updateData.packages && updateData.packages.length > 0) {
//         console.log('📦 CALLING updateGymPackages...');
//         console.log('📦 Packages details:', updateData.packages.map((p, i) => ({
//           index: i,
//           name: p.name,
//           price: p.price,
//           id: p.id,
//           hasId: !!p.id,
//           isActive: p.isActive
//         })));
        
//         // Force update regardless - temporary for debugging
//         console.log('📦 FORCE CALLING gymService.updateGymPackages');
//         try {
//           await gymService.updateGymPackages(gymId, updateData.packages);
//           console.log('✅ updateGymPackages completed successfully');
//         } catch (packagesError) {
//           console.error('❌ updateGymPackages failed:', packagesError);
//           throw packagesError;
//         }
//       } else {
//         console.log('⚠️ NO PACKAGES TO UPDATE - packages is:', updateData.packages);
//         console.log('⚠️ Type of packages:', typeof updateData.packages);
//         console.log('⚠️ Is null?', updateData.packages === null);
//         console.log('⚠️ Is undefined?', updateData.packages === undefined);
//         console.log('⚠️ Length if array:', updateData.packages?.length);
//       }
      
//       // Prepare the update object for other fields
//       const updateObject: Partial<Gym> = {};
      
//       // Copy simple fields
//       if (updateData.name !== undefined) updateObject.name = updateData.name;
//       if (updateData.contactPhone !== undefined) updateObject.contactPhone = updateData.contactPhone;
//       if (updateData.contactEmail !== undefined) updateObject.contactEmail = updateData.contactEmail;
//       if (updateData.description !== undefined) updateObject.description = updateData.description;
//       if (updateData.website !== undefined) updateObject.website = updateData.website;
//       if (updateData.logoUrl !== undefined) updateObject.logoUrl = updateData.logoUrl;
//       if (updateData.coverImageUrl !== undefined) updateObject.coverImageUrl = updateData.coverImageUrl;
//       if (updateData.status !== undefined) updateObject.status = updateData.status;
//       if (updateData.owners !== undefined) updateObject.owners = updateData.owners;
      
//       // Handle address (if provided)
//       if (updateData.address) {
//         updateObject.address = {
//           ...currentGym.address,
//           ...updateData.address
//         };
//       }
      
//       // Handle business hours (if provided)
//       if (updateData.businessHours) {
//         updateObject.businessHours = {
//           ...currentGym.businessHours,
//           ...updateData.businessHours
//         };
//         console.log('🕒 Business hours updated:', updateObject.businessHours);
//       }
      
//       // Handle settings (if provided) - ensure it's complete
//       if (updateData.settings) {
//         updateObject.settings = {
//           ...currentGym.settings,
//           ...updateData.settings
//         };
//       }
      
//       // Update other fields (if any)
//       if (Object.keys(updateObject).length > 0) {
//         updateObject.updatedAt = new Date();
//         console.log('📝 Updating gym fields:', Object.keys(updateObject));
//         await gymRepository.update(gymId, updateObject);
//       } else {
//         console.log('📝 No other fields to update');
//       }
      
//       // Refresh current gym in store
//       const updatedGym = await gymRepository.getById(gymId);
//       set({ 
//         currentGym: updatedGym,
//         isLoading: false 
//       });
      
//       console.log('✅ Gym update COMPLETE:', updatedGym?.name);
//       console.log('✅ New packages count:', updatedGym?.packages?.length);
//       console.log('✅ New package prices:', updatedGym?.packages?.map(p => ({ name: p.name, price: p.price })));
      
//     } catch (error: any) {
//       console.error('❌ ERROR in updateGym:', error);
//       console.error('❌ Error stack:', error.stack);
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
      console.log('🔄 UPDATE GYM STARTED:');
      console.log('- Gym ID:', gymId);
      console.log('- Update data keys:', Object.keys(updateData));
      console.log('- Has packages field?', 'packages' in updateData);
      console.log('- Package count:', updateData.packages?.length || 0);
      console.log('- Is packages array?', Array.isArray(updateData.packages));
      
      // TEMPORARY DEBUG - Deep inspection
      console.log('🔍 TEMP DEBUG - First package:', updateData.packages?.[0]);
      
      // Get current gym first
      const currentGym = await gymRepository.getById(gymId);
      if (!currentGym) {
        throw new UserFriendlyError('Gym not found', 'The gym does not exist.', 'GYM_NOT_FOUND', false);
      }
  
      // ✅ CRITICAL: Handle packages FIRST - with extensive logging
      if (updateData.packages && updateData.packages.length > 0) {
        console.log('📦 CALLING updateGymPackages...');
        
        // Type-safe way to check package details
        console.log('📦 Packages details:', updateData.packages.map((p, i) => {
          // Since p is Omit<GymPackage, 'id' | 'createdAt'>, we can't access p.id
          const packageWithAnyType = p as any; // Temporary workaround
          return {
            index: i,
            name: p.name,
            price: p.price,
            hasId: 'id' in p, // Check if id property exists
            id: 'id' in p ? (p as any).id : 'NO_ID', // Safe access
            isActive: p.isActive
          };
        }));
        
        // Force update regardless - temporary for debugging
        console.log('📦 FORCE CALLING gymService.updateGymPackages');
        try {
          await gymService.updateGymPackages(gymId, updateData.packages);
          console.log('✅ updateGymPackages completed successfully');
        } catch (packagesError) {
          console.error('❌ updateGymPackages failed:', packagesError);
          throw packagesError;
        }
      } else {
        console.log('⚠️ NO PACKAGES TO UPDATE - packages is:', updateData.packages);
        console.log('⚠️ Type of packages:', typeof updateData.packages);
        console.log('⚠️ Is null?', updateData.packages === null);
        console.log('⚠️ Is undefined?', updateData.packages === undefined);
        console.log('⚠️ Length if array:', updateData.packages?.length);
      }
      
      // Prepare the update object for other fields
      const updateObject: Partial<Gym> = {};
      
      // Copy simple fields
      if (updateData.name !== undefined) updateObject.name = updateData.name;
      if (updateData.contactPhone !== undefined) updateObject.contactPhone = updateData.contactPhone;
      if (updateData.contactEmail !== undefined) updateObject.contactEmail = updateData.contactEmail;
      if (updateData.description !== undefined) updateObject.description = updateData.description;
      if (updateData.website !== undefined) updateObject.website = updateData.website;
      if (updateData.logoUrl !== undefined) updateObject.logoUrl = updateData.logoUrl;
      if (updateData.coverImageUrl !== undefined) updateObject.coverImageUrl = updateData.coverImageUrl;
      if (updateData.status !== undefined) updateObject.status = updateData.status;
      if (updateData.owners !== undefined) updateObject.owners = updateData.owners;
      
      // Handle address (if provided)
      if (updateData.address) {
        updateObject.address = {
          ...currentGym.address,
          ...updateData.address
        };
      }
      
      // Handle business hours (if provided)
      if (updateData.businessHours) {
        updateObject.businessHours = {
          ...currentGym.businessHours,
          ...updateData.businessHours
        };
        console.log('🕒 Business hours updated:', updateObject.businessHours);
      }
      
      // Handle settings (if provided) - ensure it's complete
      if (updateData.settings) {
        updateObject.settings = {
          ...currentGym.settings,
          ...updateData.settings
        };
      }
      
      // Update other fields (if any)
      if (Object.keys(updateObject).length > 0) {
        updateObject.updatedAt = new Date();
        console.log('📝 Updating gym fields:', Object.keys(updateObject));
        await gymRepository.update(gymId, updateObject);
      } else {
        console.log('📝 No other fields to update');
      }
      
      // Refresh current gym in store
      const updatedGym = await gymRepository.getById(gymId);
      set({ 
        currentGym: updatedGym,
        isLoading: false 
      });
      
      console.log('✅ Gym update COMPLETE:', updatedGym?.name);
      console.log('✅ New packages count:', updatedGym?.packages?.length);
      console.log('✅ New package prices:', updatedGym?.packages?.map(p => ({ name: p.name, price: p.price })));
      
    } catch (error: any) {
      console.error('❌ ERROR in updateGym:', error);
      console.error('❌ Error stack:', error.stack);
      set({ 
        error: error.message || 'Failed to update gym',
        isLoading: false 
      });
      throw handleFirebaseError(error);
    }
  },
  clearCurrentGym: () => {
    set({ 
      currentGym: null,
      members: [],
      activeMembers: [],
      todayCheckins: [],
      recentPayments: [],
      dashboardStats: null 
    });
    // Also clear from app store
    useAppStore.getState().clearCurrentGym();
  },
  
  // ================ GYM SWITCHING (UPDATED) ================
  
  /**
   * Switch to a different gym (FIXED with data clearing and rollback)
   */
  switchGym: async (gymId: string) => {
    // Prevent concurrent switches
    if (get().isSwitchingGym) {
      console.log('⏳ Already switching gyms, please wait');
      throw new UserFriendlyError(
        'Already switching',
        'Please wait for the current switch to complete',
        'CONCURRENT_SWITCH',
        false
      );
    }

    // Save previous state for rollback
    const previousState = {
      currentGym: get().currentGym,
      members: get().members,
      activeMembers: get().activeMembers,
      todayCheckins: get().todayCheckins,
      recentPayments: get().recentPayments,
      dashboardStats: get().dashboardStats,
      appStoreGymId: useAppStore.getState().currentGymId
    };

    try {
      console.log(`🔄 Switching to gym: ${gymId}`);
      
      // 1. Set loading state and clear errors
      set({ 
        isSwitchingGym: true, 
        switchError: null,
        isLoading: true,
        error: null 
      });

      // 2. Get user ID
      const userId = getCurrentUserId();
      
      // 3. Clear ALL old gym data FIRST (prevent data leakage)
      console.log('🧹 Clearing old gym data...');
      set({
        currentGym: null,
        members: [],
        activeMembers: [],
        todayCheckins: [],
        recentPayments: [],
        dashboardStats: null
      });

      // 4. Update user's current gym in database
      console.log(`📝 Updating current gym in database...`);
      await gymService.switchCurrentGym(userId, gymId);
      
      // 5. Update app store
      console.log(`🏪 Updating app store...`);
      useAppStore.getState().setCurrentGymId(gymId);
      
      // 6. Load new gym data in parallel
      console.log(`📊 Loading new gym data...`);
      await Promise.all([
        get().loadCurrentGym(gymId).catch(err => {
          console.error('Failed to load gym:', err);
          throw new UserFriendlyError(
            'Failed to load gym',
            'Could not load gym information',
            'GYM_LOAD_ERROR',
            true
          );
        }),
        get().loadDashboardData(gymId).catch(err => {
          console.error('Failed to load dashboard:', err);
          // Continue even if dashboard fails
        })
      ]);

      // 7. Success
      console.log(`✅ Successfully switched to gym: ${gymId}`);
      set({ 
        isSwitchingGym: false, 
        isLoading: false 
      });

    } catch (error: any) {
      console.error('❌ Gym switch failed:', error);
      
      // 8. ROLLBACK: Restore previous state
      console.log('↩️ Rolling back to previous state...');
      
      // Restore local store state
      set({
        ...previousState,
        isSwitchingGym: false,
        isLoading: false,
        switchError: error.message || 'Failed to switch gym'
      });
      
      // Restore app store state
      if (previousState.appStoreGymId) {
        useAppStore.getState().setCurrentGymId(previousState.appStoreGymId);
      }
      
      // Re-throw for component error handling
      throw handleFirebaseError(error);
    }
  },
  
  // ================ MEMBER MANAGEMENT ================
  
  /**
   * Add member to gym
   */
  addMember: async (userId: string, memberData = {}) => {
    set({ isMembersLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      
      const member = await gymService.addGymMember({
        gymId,
        userId,
        ...memberData
      });
      
      // Update local state optimistically
      set((state) => ({
        members: [member, ...state.members],
        activeMembers: [member, ...state.activeMembers],
        isMembersLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return { memberId: member.id, member };
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
   * Update member status
   */
  updateMemberStatus: async (memberId: string, status: MemberStatus) => {
    set({ isMembersLoading: true, error: null });
    try {
      await gymMemberRepository.update(memberId, { 
        status: status as MemberStatus,
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
  
  // ================ CHECKINS ================
  
  /**
   * Record checkin
   */
  recordCheckin: async (memberId: string, method: string, location?: any) => {
    set({ isCheckinsLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const userId = getCurrentUserId();
      
      const checkinId = await checkinRepository.create({
        gymId,
        memberId,
        userId,
        checkinTime: new Date(),
        method: method as any,
        location,
        createdAt: new Date()
      });
      
      const checkin = await checkinRepository.getById(checkinId);
      if (!checkin) {
        throw new Error('Failed to create checkin');
      }
      
      // Update local state optimistically
      set((state) => ({
        todayCheckins: [checkin, ...state.todayCheckins],
        isCheckinsLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return { checkinId, checkin };
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
  
  // ================ PAYMENTS ================
  
  /**
   * Record payment
   */
  recordPayment: async (memberId: string, paymentData) => {
    set({ isPaymentsLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      const userId = getCurrentUserId();
      
      const paymentId = await paymentRepository.create({
        gymId,
        memberId,
        userId,
        amount: paymentData.amount,
        currency: 'NPR',
        method: paymentData.method as any,
        status: 'completed',
        paymentDate: new Date(),
        periodStart: paymentData.periodStart,
        periodEnd: paymentData.periodEnd,
        packageId: paymentData.packageId,
        notes: paymentData.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      const payment = await paymentRepository.getById(paymentId);
      if (!payment) {
        throw new Error('Failed to create payment');
      }
      
      // Update local state optimistically
      set((state) => ({
        recentPayments: [payment, ...state.recentPayments],
        isPaymentsLoading: false
      }));
      
      // Refresh dashboard stats
      get().refreshDashboard(gymId).catch(console.error);
      
      return { paymentId, payment };
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
  
  // ================ GYM PACKAGE MANAGEMENT ================
  
  /**
   * Add new package to current gym
   */
  addGymPackage: async (packageData) => {
    set({ isLoading: true, error: null });
    try {
      const gymId = getCurrentGymId();
      
      // Note: This method might not exist in your GymService
      // You may need to implement it
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
  
  // ================ DASHBOARD ================
  
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
        dashboardStats: {
          totalMembers: dashboardData.totalMembers,
          activeMembers: dashboardData.activeMembers,
          checkinsToday: dashboardData.checkinsToday,
          revenueThisMonth: dashboardData.revenueThisMonth,
          newMembersThisMonth: 0,
          overduePayments: 0,
        },
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
  
  // ================ UTILITY ================
  
  clearError: () => {
    set({ error: null });
  },
  
  clearSwitchError: () => {
    set({ switchError: null });
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
      switchError: null,
      isLoading: false,
      isSwitchingGym: false,
      isMembersLoading: false,
      isCheckinsLoading: false,
      isPaymentsLoading: false,
      isDashboardLoading: false
    });
    // Also clear from app store
    useAppStore.getState().clearCurrentGym();
  }
}));