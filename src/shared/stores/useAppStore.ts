// import { create } from 'zustand';
// import { User, WorkoutSession } from '../types/domain';

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
//       userId: get().user?.id || '',
//       type,
//       startTime: new Date(),
//       endTime: undefined,
//       duration: 0,
//       exercises: [],
//       completed: false,
//       caloriesBurned: undefined,
//       notes: undefined
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
// }));

// src/shared/stores/useAppStore.ts
import { create } from 'zustand';
import { User } from '../types/domain/core/user';
import { WorkoutSession } from '../types/domain/core/workout';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentWorkout: WorkoutSession | null;
  recentActivities: WorkoutSession[];
  
  setUser: (user: User | null) => void;
  setAuthentication: (isAuthenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  startWorkout: (type: WorkoutSession['type']) => void;
  completeWorkout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  currentWorkout: null,
  recentActivities: [],

  setUser: (user) => set({ user }),
  setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  
  startWorkout: (type) => set({
    currentWorkout: {
      id: Math.random().toString(36).substr(2, 9),
      userId: get().user?.uid || '',
      type,
      startTime: new Date(),
      endTime: undefined,
      duration: 0,
      exercises: [],
      completed: false // ✅ This property exists in our updated WorkoutSession
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
}));