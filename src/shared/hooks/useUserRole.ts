// // src/shared/hooks/useUserRole.ts (FIXED VERSION)
// import { useAppStore } from '../stores/useAppStore';

// export const useUserRole = () => {
//   // CORRECT: Use individual selectors to get primitive values
//   const userRole = useAppStore((state) => state.user?.role || 'member');
//   const userId = useAppStore((state) => state.user?.uid);
//   const user = useAppStore((state) => state.user);
  
//   const isOwner = userRole === 'gym_owner';
//   const isStaff = userRole === 'gym_staff';
//   const isTrainer = userRole === 'gym_trainer';
//   const isRegular = userRole === 'member';

//   return {
//     user,
//     currentRole: userRole,
//     isRegularMember: isRegular,
//     isGymOwner: isOwner,
//     isGymStaff: isStaff || isTrainer, // Staff includes trainers
//     isGymTrainer: isTrainer,
//     hasGymRole: ['gym_owner', 'gym_staff', 'gym_trainer'].includes(userRole),
//     isGymBusinessUser: isOwner || isStaff || isTrainer,
//     isGymPersonnel: isOwner || isStaff || isTrainer,
    
//     // Helper methods (now memoized)
//     getHomeTabLabel: () => {
//       if (isOwner || isStaff) return 'Dashboard';
//       if (isTrainer) return 'Clients';
//       return 'Home';
//     },
    
//     getProjectsTabLabel: () => {
//       if (isTrainer) return 'Programs';
//       if (isOwner) return 'Challenges';
//       return 'Projects';
//     },
//   };
// };


// import { useAppStore } from '../stores/useAppStore';
// import { UserRole, GymRole } from '../types/domain/core/user';

// export const useUserRole = () => {
//   const { user } = useAppStore();
  
//   // Get current gym membership
//   const currentGymId = user?.currentGymId;
//   const currentMembership = user?.gymMemberships?.find(m => m.gymId === currentGymId);
  
//   // Check if user has any gym access
//   const hasGymAccess = (user?.gymMemberships?.length || 0) > 0;
//   const hasMultipleGyms = (user?.gymMemberships?.length || 0) > 1;
  
//   return {
//     // User type detection (global role)
//     isFitnessUser: user?.role === 'fitness_user',
//     isGymOwnerGlobal: user?.role === 'gym_owner',
//     isGymStaffGlobal: user?.role === 'gym_staff',
//     isGymTrainerGlobal: user?.role === 'gym_trainer',
    
//     // Current gym role detection
//     hasCurrentGym: !!currentGymId,
//     currentGymId,
//     currentGymRole: currentMembership?.gymRole as GymRole | undefined,
    
//     // Role in current gym (if any)
//     isGymOwner: currentMembership?.gymRole === 'owner',
//     isGymStaff: currentMembership?.gymRole === 'staff',
//     isGymTrainer: currentMembership?.gymRole === 'trainer',
//     isGymMember: currentMembership?.gymRole === 'member',
    
//     // Gym access status
//     hasGymAccess,
//     hasMultipleGyms,
//     gymMembershipsCount: user?.gymMemberships?.length || 0,
    
//     // Quick role checks
//     isBusinessUser: hasGymAccess && ['owner', 'staff', 'trainer'].includes(currentMembership?.gymRole || ''),
//     isRegularMember: user?.role === 'fitness_user' && !hasGymAccess,
//     isPayingMember: hasGymAccess && currentMembership?.gymRole === 'member',
    
//     // Helper to get all gym IDs user has access to
//     getUserGymIds: (): string[] => {
//       return user?.gymMemberships?.map(m => m.gymId) || [];
//     },
    
//     // Helper to get role in a specific gym
//     getRoleInGym: (gymId: string): GymRole | undefined => {
//       return user?.gymMemberships?.find(m => m.gymId === gymId)?.gymRole;
//     },
    
//     // Raw user for advanced checks
//     rawUser: user,
//   };
// };

// export type UserRoleHookReturn = ReturnType<typeof useUserRole>;

// src/shared/hooks/useUserRole.ts - UPDATED VERSION
import { useAppStore } from '../stores/useAppStore';
import { useGymStore } from '../../features/gym/stores/useGymStore';
import { GymRole, UserRole } from '../types/domain/core/user';

export const useUserRole = () => {
  const appStore = useAppStore();
  const { currentGym } = useGymStore();
  
  // Use the existing methods from your app store
  const globalRole = appStore.getUserRole();
  const currentGymRole = appStore.getCurrentGymRole();
  const hasGymAccess = appStore.hasGymAccess();
  const hasMultipleGyms = appStore.hasMultipleGyms();
  
  return {
    // ============ GLOBAL ROLE DETECTION ============
    globalRole,
    isFitnessUser: globalRole === 'fitness_user',
    isGymOwnerGlobal: globalRole === 'gym_owner',
    isGymStaffGlobal: globalRole === 'gym_staff',
    isGymTrainerGlobal: globalRole === 'gym_trainer',
    
    // ============ CURRENT GYM STATE ============
    hasCurrentGym: !!appStore.currentGymId,
    currentGymId: appStore.currentGymId,
    currentGymRole,
    currentGym,
    
    // ============ ROLE CHECKS USING EXISTING METHODS ============
    isGymOwner: appStore.isGymOwner(),
    isGymStaff: appStore.isGymStaff(),
    isGymTrainer: appStore.isGymTrainer(),
    isGymMember: appStore.isGymMember(),
    
    // ============ ACCESS STATUS ============
    hasGymAccess,
    hasMultipleGyms,
    gymMembershipsCount: appStore.user?.gymMemberships?.length || 0,
    
    // ============ QUICK ROLE CHECKS ============
    isBusinessUser: hasGymAccess && ['owner', 'staff', 'trainer'].includes(currentGymRole || ''),
    isRegularMember: globalRole === 'fitness_user' && !hasGymAccess,
    isPayingMember: hasGymAccess && currentGymRole === 'member',
    isPureFitnessUser: appStore.isPureFitnessUser(),
    
    // ============ HELPER METHODS ============
    getUserGymIds: (): string[] => {
      return appStore.user?.gymMemberships?.map(m => m.gymId) || [];
    },
    
    getRoleInGym: (gymId: string): GymRole | undefined => {
      return appStore.user?.gymMemberships?.find(m => m.gymId === gymId)?.gymRole;
    },
    
    canSwitchToGym: (gymId: string): boolean => {
      const hasAccess = appStore.user?.gymMemberships?.some(m => m.gymId === gymId);
      return !!hasAccess && appStore.currentGymId !== gymId;
    },

    
    // ============ NEW METHODS FOR GYM SWITCHING ============
    
    /**
     * Check if user is a business user (owner, staff, or trainer in any gym)
     */
    isGymBusinessUser: (): boolean => {
        const { user } = appStore;
        if (!user) return false;
        
        return user.gymMemberships?.some(m => 
          ['owner', 'staff', 'trainer'].includes(m.gymRole)
        ) || false;
      },
  
      /**
       * Check if user is a paying member in any gym
       */
      isPayingMemberUser: (): boolean => {
        const { user } = appStore;
        if (!user) return false;
        
        return user.gymMemberships?.some(m => m.gymRole === 'member') || false;
      },
  
      /**
       * Get all gyms with basic info (for switcher)
       */
      getUserGyms: (): Array<{
        gymId: string;
        gymRole: string;
        isActive: boolean;
      }> => {
        const { user } = appStore;
        if (!user || !user.gymMemberships) return [];
        
        return user.gymMemberships.map(membership => ({
          gymId: membership.gymId,
          gymRole: membership.gymRole,
          isActive: membership.isActive,
        }));
      },
  
      /**
       * Check if user can create more gyms
       * For now, allow unlimited - can add limits later
       */
      canCreateMoreGyms: (): boolean => {
        return true; // No limit for now
      },
  
      /**
       * Get current gym details
       */
      getCurrentGymDetails: () => {
        return {
          gym: currentGym,
          role: appStore.getCurrentGymRole(),
          isCurrent: true,
        };
      },
  
      // ============ SIMPLIFIED CHECKERS ============
      shouldShowGymSection: (): boolean => {
        const { user } = appStore;
        return (user?.gymMemberships?.length || 0) > 0;
      },
  
      shouldShowBusinessOptions: (): boolean => {
        return appStore.isGymOwner() || appStore.isGymStaff() || appStore.isGymTrainer();
      },  
    
    // ============ RAW ACCESS ============
    rawUser: appStore.user,
    rawCurrentGym: currentGym,
    rawAppStore: appStore, // For advanced use cases
  };
};

export type UserRoleHookReturn = ReturnType<typeof useUserRole>;