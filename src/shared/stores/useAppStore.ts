// // src/shared/stores/useAppStore.ts
// import { create } from 'zustand';
// import { User, UserRole } from '../types/domain/core/user';
// import { WorkoutSession } from '../types/domain/core/workout';

// interface AppState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   currentWorkout: WorkoutSession | null;
//   recentActivities: WorkoutSession[];
  
//   setUser: (user: User | null) => void;
//   setAuthentication: (isAuthenticated: boolean) => void;
//   setLoading: (loading: boolean) => void;
//   startWorkout: (type: WorkoutSession['type']) => void;
//   completeWorkout: () => void;
  
//   // ADDED: Role helper methods
//   getUserRole: () => UserRole;
//   isGymOwner: () => boolean;
//   isGymStaff: () => boolean;
//   isGymTrainer: () => boolean;
//   isRegularMember: () => boolean;
// }

// export const useAppStore = create<AppState>((set, get) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   currentWorkout: null,
//   recentActivities: [],

//   setUser: (user) => set({ user }),
//   setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
//   setLoading: (isLoading) => set({ isLoading }),
  
//   startWorkout: (type) => set({
//     currentWorkout: {
//       id: Math.random().toString(36).substr(2, 9),
//       userId: get().user?.uid || '',
//       type,
//       startTime: new Date(),
//       endTime: undefined,
//       duration: 0,
//       exercises: [],
//       completed: false
//     }
//   }),
  
//   completeWorkout: () => {
//     const { currentWorkout } = get();
//     if (currentWorkout) {
//       const completedWorkout = {
//         ...currentWorkout,
//         endTime: new Date(),
//         duration: Math.floor((new Date().getTime() - currentWorkout.startTime.getTime()) / 60000),
//         completed: true
//       };
      
//       set({
//         currentWorkout: null,
//         recentActivities: [completedWorkout, ...get().recentActivities.slice(0, 9)]
//       });
//     }
//   },

//   // ADDED: Role helper methods
//   getUserRole: () => {
//     const { user } = get();
//     return user?.role || 'member';
//   },

//   isGymOwner: () => {
//     const { user } = get();
//     return user?.role === 'gym_owner';
//   },

//   isGymStaff: () => {
//     const { user } = get();
//     return user?.role === 'gym_staff' || user?.role === 'gym_trainer';
//   },

//   isGymTrainer: () => {
//     const { user } = get();
//     return user?.role === 'gym_trainer';
//   },

//   isRegularMember: () => {
//     const { user } = get();
//     return !user?.role || user.role === 'member';
//   },
// }));


// // src/shared/stores/useAppStore.ts
// import { create } from 'zustand';
// import { User, UserRole } from '../types/domain/core/user';
// import { WorkoutSession } from '../types/domain/core/workout';

// interface AppState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   currentWorkout: WorkoutSession | null;
//   recentActivities: WorkoutSession[];
  
//   // Current gym context
//   currentGymId: string | undefined;
//   userGyms: any[];
  
//   // ACTIONS
//   setUser: (user: User | null) => void;
//   setAuthentication: (isAuthenticated: boolean) => void;
//   setLoading: (isLoading: boolean) => void;
//   setCurrentGymId: (gymId: string | undefined) => void;
//   setUserGyms: (gyms: any[]) => void;
  
//   // Workout actions
//   startWorkout: (type: WorkoutSession['type']) => void;
//   completeWorkout: () => void;
  
//   // UPDATED: Add error state management
//   error: string | null;
//   setError: (error: string | null) => void;
//   clearError: () => void;
  
//   // NEW: Clear all state method
//   clearAll: () => void;
  
//   // Role helper methods (keep existing)
//   getUserRole: () => UserRole;
//   isPureFitnessUser: () => boolean;
//   hasGymAccess: () => boolean;
//   hasMultipleGyms: () => boolean;
//   getCurrentGymRole: () => 'owner' | 'staff' | 'trainer' | 'member' | undefined;
  
//   // Specific role checks in current gym (keep existing)
//   isGymOwner: () => boolean;
//   isGymStaff: () => boolean;
//   isGymTrainer: () => boolean;
//   isGymMember: () => boolean;
// }

// // Initial state helper
// const getInitialState = () => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   currentWorkout: null,
//   recentActivities: [],
//   currentGymId: undefined,
//   userGyms: [],
//   error: null, // NEW
// });

// export const useAppStore = create<AppState>((set, get) => ({
//   ...getInitialState(),

//   setUser: (user) => set({ 
//     user,
//     // Set currentGymId from user's currentGymId
//     currentGymId: user?.currentGymId 
//   }),
  
//   setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
//   setLoading: (isLoading) => set({ isLoading }),
//   setCurrentGymId: (currentGymId) => set({ currentGymId }),
//   setUserGyms: (userGyms) => set({ userGyms }),
  
//   // NEW: Error management
//   setError: (error) => set({ error }),
//   clearError: () => set({ error: null }),
  
//   // NEW: Clear all state
//   clearAll: () => {
//     console.log('🔄 Clearing all app store state');
//     set(getInitialState());
//   },
  
//   startWorkout: (type) => set({
//     currentWorkout: {
//       id: Math.random().toString(36).substr(2, 9),
//       userId: get().user?.uid || '',
//       type,
//       startTime: new Date(),
//       endTime: undefined,
//       duration: 0,
//       exercises: [],
//       completed: false
//     }
//   }),
  
//   completeWorkout: () => {
//     const { currentWorkout } = get();
//     if (currentWorkout) {
//       const completedWorkout = {
//         ...currentWorkout,
//         endTime: new Date(),
//         duration: Math.floor((new Date().getTime() - currentWorkout.startTime.getTime()) / 60000),
//         completed: true
//       };
      
//       set({
//         currentWorkout: null,
//         recentActivities: [completedWorkout, ...get().recentActivities.slice(0, 9)]
//       });
//     }
//   },

//   // Role helper methods (KEEP THESE - THEY'RE ALREADY CORRECT)
//   getUserRole: () => {
//     const { user } = get();
//     return user?.role || 'fitness_user';
//   },

//   isPureFitnessUser: () => {
//     const { user } = get();
//     return user?.role === 'fitness_user' && (user.gymMemberships?.length || 0) === 0;
//   },

//   hasGymAccess: () => {
//     const { user } = get();
//     return (user?.gymMemberships?.length || 0) > 0;
//   },

//   hasMultipleGyms: () => {
//     const { user } = get();
//     return (user?.gymMemberships?.length || 0) > 1;
//   },

//   getCurrentGymRole: () => {
//     const { user, currentGymId } = get();
//     if (!user || !currentGymId) return undefined;
    
//     const membership = user.gymMemberships?.find(m => m.gymId === currentGymId);
//     return membership?.gymRole;
//   },

//   // Specific role checks in current gym (KEEP THESE)
//   isGymOwner: () => {
//     const role = get().getCurrentGymRole();
//     return role === 'owner';
//   },

//   isGymStaff: () => {
//     const role = get().getCurrentGymRole();
//     return role === 'staff';
//   },

//   isGymTrainer: () => {
//     const role = get().getCurrentGymRole();
//     return role === 'trainer';
//   },

//   isGymMember: () => {
//     const role = get().getCurrentGymRole();
//     return role === 'member';
//   },
// }));


// src/shared/stores/useAppStore.ts
import { create } from 'zustand';
import { User, UserRole } from '../types/domain/core/user';
import { WorkoutSession } from '../types/domain/core/workout';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentWorkout: WorkoutSession | null;
  recentActivities: WorkoutSession[];
  
  // Current gym context
  currentGymId: string | undefined;
  userGyms: any[];
  
  // ACTIONS
  setUser: (user: User | null) => void;
  setAuthentication: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setCurrentGymId: (gymId: string | undefined) => void;
  setUserGyms: (gyms: any[]) => void;
  
  // NEW: Added missing method
  clearCurrentGym: () => void;
  
  // Workout actions
  startWorkout: (type: WorkoutSession['type']) => void;
  completeWorkout: () => void;
  
  // Error state management
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Clear all state method
  clearAll: () => void;
  
  // Role helper methods
  getUserRole: () => UserRole;
  isPureFitnessUser: () => boolean;
  hasGymAccess: () => boolean;
  hasMultipleGyms: () => boolean;
  getCurrentGymRole: () => 'owner' | 'staff' | 'trainer' | 'member' | undefined;
  
  // Specific role checks in current gym
  isGymOwner: () => boolean;
  isGymStaff: () => boolean;
  isGymTrainer: () => boolean;
  isGymMember: () => boolean;
}

// Initial state helper
const getInitialState = () => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  currentWorkout: null,
  recentActivities: [],
  currentGymId: undefined,
  userGyms: [],
  error: null,
});

export const useAppStore = create<AppState>((set, get) => ({
  ...getInitialState(),

  setUser: (user) => set({ 
    user,
    // Set currentGymId from user's currentGymId
    currentGymId: user?.currentGymId 
  }),
  
  setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  setCurrentGymId: (currentGymId) => set({ currentGymId }),
  setUserGyms: (userGyms) => set({ userGyms }),
  
  // NEW: Added missing method that useGymStore expects
  clearCurrentGym: () => {
    console.log('🔄 Clearing current gym ID from app store');
    set({ currentGymId: undefined });
  },
  
  // Error management
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  // Clear all state
  clearAll: () => {
    console.log('🔄 Clearing all app store state');
    set(getInitialState());
  },
  
  startWorkout: (type) => set({
    currentWorkout: {
      id: Math.random().toString(36).substr(2, 9),
      userId: get().user?.uid || '',
      type,
      startTime: new Date(),
      endTime: undefined,
      duration: 0,
      exercises: [],
      completed: false
    }
  }),
  
  completeWorkout: () => {
    const { currentWorkout } = get();
    if (currentWorkout) {
      const completedWorkout = {
        ...currentWorkout,
        endTime: new Date(),
        duration: Math.floor((new Date().getTime() - currentWorkout.startTime.getTime()) / 60000),
        completed: true
      };
      
      set({
        currentWorkout: null,
        recentActivities: [completedWorkout, ...get().recentActivities.slice(0, 9)]
      });
    }
  },

  // Role helper methods
  getUserRole: () => {
    const { user } = get();
    return user?.role || 'fitness_user';
  },

  isPureFitnessUser: () => {
    const { user } = get();
    return user?.role === 'fitness_user' && (user.gymMemberships?.length || 0) === 0;
  },

  hasGymAccess: () => {
    const { user } = get();
    return (user?.gymMemberships?.length || 0) > 0;
  },

  hasMultipleGyms: () => {
    const { user } = get();
    return (user?.gymMemberships?.length || 0) > 1;
  },

  getCurrentGymRole: () => {
    const { user, currentGymId } = get();
    if (!user || !currentGymId) return undefined;
    
    const membership = user.gymMemberships?.find(m => m.gymId === currentGymId);
    return membership?.gymRole;
  },

  // Specific role checks in current gym
  isGymOwner: () => {
    const role = get().getCurrentGymRole();
    return role === 'owner';
  },

  isGymStaff: () => {
    const role = get().getCurrentGymRole();
    return role === 'staff';
  },

  isGymTrainer: () => {
    const role = get().getCurrentGymRole();
    return role === 'trainer';
  },

  isGymMember: () => {
    const role = get().getCurrentGymRole();
    return role === 'member';
  },
}));