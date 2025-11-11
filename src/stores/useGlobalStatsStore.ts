import { create } from 'zustand';
import {WorkoutSession} from '../features/workout/types/workout';
//import { WorkoutSession } from '../features/workout/types/workout';
import { GlobalStats } from '../shared/types/common';

interface GlobalStatsStore {
  stats: GlobalStats;
  recentWorkouts: WorkoutSession[];
  
  // Actions
  updateStats: (session: WorkoutSession) => void;
  addWorkout: (session: WorkoutSession) => void;
  setRecentWorkouts: (workouts: WorkoutSession[]) => void;
}

export const useGlobalStatsStore = create<GlobalStatsStore>((set, get) => ({
  stats: {
    totalWorkouts: 0,
    workoutsThisWeek: 0,
    totalDuration: 0,
    caloriesBurned: 0,
    recentWorkouts: []
  },
  recentWorkouts: [],

  updateStats: (session: WorkoutSession) => {
    set((state) => ({
      stats: {
        totalWorkouts: state.stats.totalWorkouts + 1,
        workoutsThisWeek: state.stats.workoutsThisWeek + 1, // Simplified
        totalDuration: state.stats.totalDuration + session.duration,
        caloriesBurned: state.stats.caloriesBurned + (session.calories || 0),
        recentWorkouts: [session, ...state.stats.recentWorkouts.slice(0, 9)]
      },
      recentWorkouts: [session, ...state.recentWorkouts.slice(0, 9)]
    }));
  },

  addWorkout: (session: WorkoutSession) => {
    const { updateStats } = get();
    updateStats(session);
  },

  setRecentWorkouts: (workouts: WorkoutSession[]) => {
    set({ recentWorkouts: workouts });
  }
}));