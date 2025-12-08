
// import { BaseRepository } from './BaseRepository';
// import { WorkoutSession, WorkoutType, WorkoutStats, PersonalRecord, WeeklyFrequency, ExerciseProgress } from '../../types/domain/core/workout';
// import { query, where, orderBy, limit } from 'firebase/firestore';

// export class WorkoutRepository extends BaseRepository<WorkoutSession> {
//   constructor() {
//     super('workouts'); // Consistent collection name
//   }

//   async getUserWorkouts(userId: string): Promise<WorkoutSession[]> {
//     try {
//       // ✅ INDUSTRY STANDARD: Use composite index for performance
//       return await this.query([
//         where('userId', '==', userId),
//         orderBy('startTime', 'desc') // This will use the composite index
//       ]);
//     } catch (error: any) {
//       // ✅ INDUSTRY STANDARD: Fallback for development before index exists
//       if (error.code === 'failed-precondition') {
//         console.warn('Firebase index not ready yet, using fallback query');
//         // Fallback: Get all user workouts and sort locally
//         const allWorkouts = await this.query([
//           where('userId', '==', userId)
//         ]);
//         return allWorkouts.sort((a, b) => 
//           new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
//         );
//       }
//       throw error;
//     }
//   }

//   async getRecentWorkouts(userId: string, count: number = 10): Promise<WorkoutSession[]> {
//     try {
//       // ✅ INDUSTRY STANDARD: Use index for limited sorted queries
//       return await this.query([
//         where('userId', '==', userId),
//         orderBy('startTime', 'desc'),
//         limit(count)
//       ]);
//     } catch (error: any) {
//       // Fallback if index not ready
//       if (error.code === 'failed-precondition') {
//         const workouts = await this.getUserWorkouts(userId);
//         return workouts.slice(0, count);
//       }
//       throw error;
//     }
//   }

//   async getWorkoutsByType(userId: string, type: WorkoutType): Promise<WorkoutSession[]> {
//     try {
//       // ✅ INDUSTRY STANDARD: Composite query with filtering and sorting
//       return await this.query([
//         where('userId', '==', userId),
//         where('type', '==', type),
//         orderBy('startTime', 'desc')
//       ]);
//     } catch (error: any) {
//       // Fallback if index not ready
//       if (error.code === 'failed-precondition') {
//         const workouts = await this.getUserWorkouts(userId);
//         return workouts
//           .filter(workout => workout.type === type)
//           .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
//       }
//       throw error;
//     }
//   }

//   async getWorkoutsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<WorkoutSession[]> {
//     try {
//       // ✅ INDUSTRY STANDARD: Range query with sorting
//       return await this.query([
//         where('userId', '==', userId),
//         where('startTime', '>=', startDate),
//         where('startTime', '<=', endDate),
//         orderBy('startTime', 'desc')
//       ]);
//     } catch (error: any) {
//       // Fallback if index not ready
//       if (error.code === 'failed-precondition') {
//         const workouts = await this.getUserWorkouts(userId);
//         return workouts
//           .filter(workout => {
//             const workoutDate = new Date(workout.startTime);
//             return workoutDate >= startDate && workoutDate <= endDate;
//           })
//           .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
//       }
//       throw error;
//     }
//   }

//   // 🚀 NEW: Analytics and Progress Tracking Methods

//   /**
//    * Get comprehensive workout statistics for a user
//    */
//   async getWorkoutStats(userId: string, period: 'week' | 'month' | 'year' = 'month'): Promise<WorkoutStats> {
//     const now = new Date();
//     let startDate: Date;

//     switch (period) {
//       case 'week':
//         startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//         break;
//       case 'month':
//         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//         break;
//       case 'year':
//         startDate = new Date(now.getFullYear(), 0, 1);
//         break;
//       default:
//         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//     }

//     const workouts = await this.getWorkoutsByDateRange(userId, startDate, now);
//     const allWorkouts = await this.getUserWorkouts(userId);

//     // Calculate statistics
//     const totalWorkouts = allWorkouts.length;
//     const workoutsThisWeek = (await this.getWorkoutsByDateRange(userId, 
//       new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now)).length;
//     const workoutsThisMonth = workouts.length;

//     const totalDuration = allWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
//     const totalCalories = allWorkouts.reduce((sum, workout) => sum + (workout.calories || workout.caloriesBurned || 0), 0);
//     const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;

//     // Find favorite workout type
//     const typeCounts = allWorkouts.reduce((acc, workout) => {
//       acc[workout.type] = (acc[workout.type] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     const favoriteWorkoutType = Object.entries(typeCounts).reduce((a, b) => 
//       a[1] > b[1] ? a : b, ['gym', 0])[0] as WorkoutType;

//     // Calculate streak (simplified)
//     const currentStreak = this.calculateCurrentStreak(allWorkouts);
//     const longestStreak = this.calculateLongestStreak(allWorkouts);

//     // Calculate consistency (workouts per week)
//     const consistency = this.calculateConsistency(allWorkouts);

//     return {
//       totalWorkouts,
//       workoutsThisWeek,
//       workoutsThisMonth,
//       totalDuration,
//       totalCalories,
//       averageDuration,
//       favoriteWorkoutType,
//       currentStreak,
//       longestStreak,
//       consistency
//     };
//   }

//   /**
//    * Get personal records for a user
//    */
//   async getPersonalRecords(userId: string): Promise<PersonalRecord[]> {
//     const workouts = await this.getUserWorkouts(userId);
//     const records: PersonalRecord[] = [];

//     workouts.forEach(workout => {
//       // 🚀 FIX: Use workout-level data instead of exercise.sets
//       // For gym workouts, track from workout metrics
//       if (workout.type === WorkoutType.GYM && workout.totalVolume && workout.totalVolume > 0) {
//         records.push({
//           id: `volume-${workout.id}`,
//           exerciseId: 'total-volume',
//           exerciseName: 'Total Volume',
//           recordType: 'weight',
//           value: workout.totalVolume,
//           date: workout.startTime,
//           workoutId: workout.id,
//           workoutType: workout.type
//         });
//       }

//       // For cardio, track distance and pace
//       if (workout.distance && workout.distance > 0) {
//         records.push({
//           id: `distance-${workout.id}`,
//           exerciseId: workout.type,
//           exerciseName: `${workout.type} Distance`,
//           recordType: 'distance',
//           value: workout.distance,
//           date: workout.startTime,
//           workoutId: workout.id,
//           workoutType: workout.type
//         });
//       }

//       // Track duration records
//       if (workout.duration > 0) {
//         records.push({
//           id: `duration-${workout.id}`,
//           exerciseId: workout.type,
//           exerciseName: `${workout.type} Duration`,
//           recordType: 'time',
//           value: workout.duration,
//           date: workout.startTime,
//           workoutId: workout.id,
//           workoutType: workout.type
//         });
//       }
//     });

//     // Return only the best records per exercise and type
//     return this.filterBestRecords(records);
//   }

//   /**
//    * Get weekly frequency data for charts
//    */
//   async getWeeklyFrequency(userId: string, weeks: number = 12): Promise<WeeklyFrequency[]> {
//     const endDate = new Date();
//     const startDate = new Date(endDate.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    
//     const workouts = await this.getWorkoutsByDateRange(userId, startDate, endDate);
//     const weeklyData: Map<string, WeeklyFrequency> = new Map();

//     workouts.forEach(workout => {
//       const week = this.getWeekNumber(workout.startTime);
//       const key = `${week}`;
      
//       if (!weeklyData.has(key)) {
//         weeklyData.set(key, {
//           week,
//           workoutCount: 0,
//           totalDuration: 0,
//           caloriesBurned: 0
//         });
//       }

//       const weekData = weeklyData.get(key)!;
//       weekData.workoutCount++;
//       weekData.totalDuration += workout.duration;
//       weekData.caloriesBurned += (workout.calories || workout.caloriesBurned || 0);
//     });

//     return Array.from(weeklyData.values()).sort((a, b) => a.week.localeCompare(b.week));
//   }

//   /**
//    * Get exercise progression over time
//    */
//   async getExerciseProgress(userId: string, exerciseId: string): Promise<ExerciseProgress> {
//     const workouts = await this.getUserWorkouts(userId);
//     const progressData: ExerciseProgress['progressData'] = [];

//     // 🚀 FIX: Use workout-level metrics instead of exercise.sets
//     // For now, track workout volume progression
//     workouts.forEach(workout => {
//       if (workout.totalVolume && workout.totalVolume > 0) {
//         progressData.push({
//           date: workout.startTime,
//           value: workout.totalVolume,
//           workoutId: workout.id
//         });
//       }
//     });

//     return {
//       exerciseId,
//       exerciseName: 'Workout Volume', // Generic name for volume tracking
//       progressData: progressData.sort((a, b) => a.date.getTime() - b.date.getTime())
//     };
//   }

//   // 🚀 PRIVATE HELPER METHODS

//   private calculateCurrentStreak(workouts: WorkoutSession[]): number {
//     if (workouts.length === 0) return 0;

//     const sortedWorkouts = workouts.sort((a, b) => 
//       new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
//     );

//     let streak = 0;
//     let currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0);

//     for (const workout of sortedWorkouts) {
//       const workoutDate = new Date(workout.startTime);
//       workoutDate.setHours(0, 0, 0, 0);

//       const diffTime = currentDate.getTime() - workoutDate.getTime();
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//       if (diffDays === streak) {
//         streak++;
//       } else if (diffDays > streak) {
//         break;
//       }
//     }

//     return streak;
//   }

//   private calculateLongestStreak(workouts: WorkoutSession[]): number {
//     if (workouts.length === 0) return 0;

//     const uniqueDates = Array.from(new Set(
//       workouts.map(w => new Date(w.startTime).toDateString())
//     )).sort().reverse();

//     let longestStreak = 0;
//     let currentStreak = 1;

//     for (let i = 1; i < uniqueDates.length; i++) {
//       const currentDate = new Date(uniqueDates[i]);
//       const prevDate = new Date(uniqueDates[i - 1]);
//       const diffTime = prevDate.getTime() - currentDate.getTime();
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//       if (diffDays === 1) {
//         currentStreak++;
//         longestStreak = Math.max(longestStreak, currentStreak);
//       } else {
//         currentStreak = 1;
//       }
//     }

//     return Math.max(longestStreak, currentStreak);
//   }

//   private calculateConsistency(workouts: WorkoutSession[]): number {
//     if (workouts.length === 0) return 0;

//     const uniqueDates = new Set(
//       workouts.map(w => new Date(w.startTime).toDateString())
//     );

//     const firstWorkout = new Date(Math.min(...workouts.map(w => w.startTime.getTime())));
//     const today = new Date();
//     const totalDays = Math.ceil((today.getTime() - firstWorkout.getTime()) / (1000 * 60 * 60 * 24));
    
//     return totalDays > 0 ? (uniqueDates.size / totalDays) * 100 : 0;
//   }

//   private filterBestRecords(records: PersonalRecord[]): PersonalRecord[] {
//     const bestRecords = new Map<string, PersonalRecord>();

//     records.forEach(record => {
//       const key = `${record.exerciseId}-${record.recordType}`;
//       const existing = bestRecords.get(key);

//       if (!existing || record.value > existing.value) {
//         bestRecords.set(key, record);
//       }
//     });

//     return Array.from(bestRecords.values());
//   }

//   private getWeekNumber(date: Date): string {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     d.setDate(d.getDate() + 4 - (d.getDay() || 7));
//     const yearStart = new Date(d.getFullYear(), 0, 1);
//     const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
//     return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
//   }
// }

// export const workoutRepository = new WorkoutRepository();

import { BaseRepository } from './BaseRepository';
import { 
  WorkoutSession, 
  WorkoutType, 
  WorkoutStats, 
  PersonalRecord, 
  WeeklyFrequency, 
  ExerciseProgress,
  EnhancedWorkoutStats,
  WorkoutTrend,
  VolumeProgression,
  WeeklyPattern
} from '../../types/domain/core/workout';
import { query, where, orderBy, limit } from 'firebase/firestore';

export class WorkoutRepository extends BaseRepository<WorkoutSession> {
  constructor() {
    super('workouts'); // Consistent collection name
  }

  async getUserWorkouts(userId: string): Promise<WorkoutSession[]> {
    try {
      // ✅ INDUSTRY STANDARD: Use composite index for performance
      return await this.query([
        where('userId', '==', userId),
        orderBy('startTime', 'desc') // This will use the composite index
      ]);
    } catch (error: any) {
      // ✅ INDUSTRY STANDARD: Fallback for development before index exists
      if (error.code === 'failed-precondition') {
        console.warn('Firebase index not ready yet, using fallback query');
        // Fallback: Get all user workouts and sort locally
        const allWorkouts = await this.query([
          where('userId', '==', userId)
        ]);
        return allWorkouts.sort((a, b) => 
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        );
      }
      throw error;
    }
  }

  async getRecentWorkouts(userId: string, count: number = 10): Promise<WorkoutSession[]> {
    try {
      // ✅ INDUSTRY STANDARD: Use index for limited sorted queries
      return await this.query([
        where('userId', '==', userId),
        orderBy('startTime', 'desc'),
        limit(count)
      ]);
    } catch (error: any) {
      // Fallback if index not ready
      if (error.code === 'failed-precondition') {
        const workouts = await this.getUserWorkouts(userId);
        return workouts.slice(0, count);
      }
      throw error;
    }
  }

  async getWorkoutsByType(userId: string, type: WorkoutType): Promise<WorkoutSession[]> {
    try {
      // ✅ INDUSTRY STANDARD: Composite query with filtering and sorting
      return await this.query([
        where('userId', '==', userId),
        where('type', '==', type),
        orderBy('startTime', 'desc')
      ]);
    } catch (error: any) {
      // Fallback if index not ready
      if (error.code === 'failed-precondition') {
        const workouts = await this.getUserWorkouts(userId);
        return workouts
          .filter(workout => workout.type === type)
          .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
      }
      throw error;
    }
  }

  async getWorkoutsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<WorkoutSession[]> {
    try {
      // ✅ INDUSTRY STANDARD: Range query with sorting
      return await this.query([
        where('userId', '==', userId),
        where('startTime', '>=', startDate),
        where('startTime', '<=', endDate),
        orderBy('startTime', 'desc')
      ]);
    } catch (error: any) {
      // Fallback if index not ready
      if (error.code === 'failed-precondition') {
        const workouts = await this.getUserWorkouts(userId);
        return workouts
          .filter(workout => {
            const workoutDate = new Date(workout.startTime);
            return workoutDate >= startDate && workoutDate <= endDate;
          })
          .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
      }
      throw error;
    }
  }

  // 🚀 EXISTING: Basic workout stats method
  async getWorkoutStats(userId: string, period: 'week' | 'month' | 'year' = 'month'): Promise<WorkoutStats> {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const workouts = await this.getWorkoutsByDateRange(userId, startDate, now);
    const allWorkouts = await this.getUserWorkouts(userId);

    // Calculate statistics
    const totalWorkouts = allWorkouts.length;
    const workoutsThisWeek = (await this.getWorkoutsByDateRange(userId, 
      new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now)).length;
    const workoutsThisMonth = workouts.length;

    const totalDuration = allWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
    const totalCalories = allWorkouts.reduce((sum, workout) => sum + (workout.calories || workout.caloriesBurned || 0), 0);
    const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;

    // Find favorite workout type
    const typeCounts = allWorkouts.reduce((acc, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteWorkoutType = Object.entries(typeCounts).reduce((a, b) => 
      a[1] > b[1] ? a : b, ['gym', 0])[0] as WorkoutType;

    // Calculate streak (simplified)
    const currentStreak = this.calculateCurrentStreak(allWorkouts);
    const longestStreak = this.calculateLongestStreak(allWorkouts);

    // Calculate consistency (workouts per week)
    const consistency = this.calculateConsistency(allWorkouts);

    return {
      totalWorkouts,
      workoutsThisWeek,
      workoutsThisMonth,
      totalDuration,
      totalCalories,
      averageDuration,
      favoriteWorkoutType,
      currentStreak,
      longestStreak,
      consistency
    };
  }

  // 🚀 NEW: Enhanced analytics methods for progress tab

  /**
   * Get enhanced workout stats with charts data for progress tab
   */
  async getEnhancedWorkoutStats(userId: string): Promise<EnhancedWorkoutStats> {
    const now = new Date();
    const workouts = await this.getUserWorkouts(userId);
    
    if (workouts.length === 0) {
      return this.getEmptyEnhancedStats();
    }

    // Calculate basic stats (reuse existing logic)
    const basicStats = await this.getWorkoutStats(userId);
    
    // Calculate enhanced analytics
    const weeklyTrend = await this.getWeeklyTrend(userId, 4);
    const volumeProgression = await this.getVolumeProgression(userId, 5);
    const personalRecords = await this.getTopPersonalRecords(userId, 10);
    const weeklyPattern = this.calculateWeeklyPattern(workouts);
    const workoutTypeDistribution = this.calculateWorkoutTypeDistribution(workouts);
    const estimated1RM = await this.getEstimated1RM(userId);
    
    // Calculate performance metrics
    const { averageVolumePerWorkout, bestVolumeWorkout, bestVolumeDate } = this.calculateVolumeMetrics(workouts);
    const progressScore = this.calculateProgressScore(workouts);

    return {
      // Basic stats
      ...basicStats,
      
      // Enhanced analytics
      weeklyTrend,
      volumeProgression,
      personalRecords,
      weeklyPattern,
      workoutTypeDistribution,
      estimated1RM,
      
      // Performance metrics
      averageVolumePerWorkout,
      bestVolumeWorkout,
      bestVolumeDate,
      progressScore
    };
  }

  /**
   * Get weekly trend data for line charts (simplified for progress bars)
   */
  async getWeeklyTrend(userId: string, weeks: number = 4): Promise<WorkoutTrend[]> {
    const trends: WorkoutTrend[] = [];
    const now = new Date();
    
    for (let i = weeks - 1; i >= 0; i--) {
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - (i * 7) - 6);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      
      const weeklyWorkouts = await this.getWorkoutsByDateRange(userId, startDate, endDate);
      
      const totalDuration = weeklyWorkouts.reduce((sum, w) => sum + w.duration, 0);
      const totalVolume = weeklyWorkouts.reduce((sum, w) => sum + (w.totalVolume || 0), 0);
      const totalCalories = weeklyWorkouts.reduce((sum, w) => sum + (w.calories || w.caloriesBurned || 0), 0);
      
      trends.push({
        date: this.formatDate(startDate), // Use readable format
        workoutCount: weeklyWorkouts.length,
        totalDuration,
        totalVolume: totalVolume || 0,
        caloriesBurned: totalCalories
      });
    }
    
    return trends;
  }

  /**
   * Get volume progression for top exercises (for progress bars)
   */
  async getVolumeProgression(userId: string, limit: number = 5): Promise<VolumeProgression[]> {
    const workouts = await this.getUserWorkouts(userId);
    const gymWorkouts = workouts.filter(w => w.type === WorkoutType.GYM && w.totalVolume && w.totalVolume > 0);
    
    if (gymWorkouts.length === 0) {
      return [];
    }

    // Group workouts by week to track weekly volume
    const weeklyVolumes = new Map<string, number>();
    
    gymWorkouts.forEach(workout => {
      const week = this.getWeekNumber(workout.startTime);
      const currentVolume = weeklyVolumes.get(week) || 0;
      weeklyVolumes.set(week, currentVolume + (workout.totalVolume || 0));
    });

    // Sort weeks chronologically
    const sortedWeeks = Array.from(weeklyVolumes.entries())
      .sort((a, b) => a[0].localeCompare(b[0]));

    if (sortedWeeks.length < 2) {
      return [];
    }

    // Calculate progression for total volume
    const firstWeek = sortedWeeks[0];
    const lastWeek = sortedWeeks[sortedWeeks.length - 1];
    const previousVolume = firstWeek[1];
    const currentVolume = lastWeek[1];
    
    const percentageChange = previousVolume > 0 
      ? ((currentVolume - previousVolume) / previousVolume) * 100
      : 100; // If no previous volume, treat as 100% improvement

    // Create data points for the chart
    const dataPoints = sortedWeeks.map(([week, volume], index) => ({
      date: `Week ${index + 1}`,
      volume
    }));

    return [{
      exerciseId: 'total-volume',
      exerciseName: 'Total Volume',
      dataPoints,
      currentVolume,
      previousVolume,
      percentageChange,
      trend: percentageChange > 5 ? 'up' : percentageChange < -5 ? 'down' : 'stable'
    }];
  }

  /**
   * Get top personal records (simplified for display)
   */
  async getTopPersonalRecords(userId: string, recordLimit: number = 10): Promise<PersonalRecord[]> {
    const workouts = await this.getUserWorkouts(userId);
    const allRecords: PersonalRecord[] = [];
    
    // Track best values for different metrics
    const bestValues = {
      totalVolume: { value: 0, workout: null as WorkoutSession | null },
      duration: { value: 0, workout: null as WorkoutSession | null },
      distance: { value: 0, workout: null as WorkoutSession | null },
      calories: { value: 0, workout: null as WorkoutSession | null }
    };

    workouts.forEach(workout => {
      // Track total volume record
      if (workout.totalVolume && workout.totalVolume > bestValues.totalVolume.value) {
        bestValues.totalVolume.value = workout.totalVolume;
        bestValues.totalVolume.workout = workout;
      }

      // Track duration record
      if (workout.duration > bestValues.duration.value) {
        bestValues.duration.value = workout.duration;
        bestValues.duration.workout = workout;
      }

      // Track distance record (for cardio)
      if (workout.distance && workout.distance > bestValues.distance.value) {
        bestValues.distance.value = workout.distance;
        bestValues.distance.workout = workout;
      }

      // Track calories record
      const calories = workout.calories || workout.caloriesBurned || 0;
      if (calories > bestValues.calories.value) {
        bestValues.calories.value = calories;
        bestValues.calories.workout = workout;
      }
    });

    // Create personal records from best values
    if (bestValues.totalVolume.workout) {
      allRecords.push({
        id: `volume-${bestValues.totalVolume.workout.id}`,
        exerciseId: 'total-volume',
        exerciseName: 'Total Volume',
        recordType: 'volume',
        value: bestValues.totalVolume.value,
        date: bestValues.totalVolume.workout.startTime,
        workoutId: bestValues.totalVolume.workout.id,
        workoutType: bestValues.totalVolume.workout.type,
        improvement: 0,
        previousValue: 0
      });
    }

    if (bestValues.duration.workout) {
      allRecords.push({
        id: `duration-${bestValues.duration.workout.id}`,
        exerciseId: bestValues.duration.workout.type,
        exerciseName: `${this.capitalizeFirst(bestValues.duration.workout.type)} Duration`,
        recordType: 'time',
        value: bestValues.duration.value,
        date: bestValues.duration.workout.startTime,
        workoutId: bestValues.duration.workout.id,
        workoutType: bestValues.duration.workout.type,
        improvement: 0,
        previousValue: 0
      });
    }

    if (bestValues.distance.workout) {
      allRecords.push({
        id: `distance-${bestValues.distance.workout.id}`,
        exerciseId: bestValues.distance.workout.type,
        exerciseName: `${this.capitalizeFirst(bestValues.distance.workout.type)} Distance`,
        recordType: 'distance',
        value: bestValues.distance.value,
        date: bestValues.distance.workout.startTime,
        workoutId: bestValues.distance.workout.id,
        workoutType: bestValues.distance.workout.type,
        improvement: 0,
        previousValue: 0
      });
    }

    if (bestValues.calories.workout) {
      allRecords.push({
        id: `calories-${bestValues.calories.workout.id}`,
        exerciseId: bestValues.calories.workout.type,
        exerciseName: `${this.capitalizeFirst(bestValues.calories.workout.type)} Calories`,
        recordType: 'weight', // Using weight type for calories display
        value: bestValues.calories.value,
        date: bestValues.calories.workout.startTime,
        workoutId: bestValues.calories.workout.id,
        workoutType: bestValues.calories.workout.type,
        improvement: 0,
        previousValue: 0
      });
    }

    // Return sorted by value (descending)
    return allRecords
      .sort((a, b) => b.value - a.value)
      .slice(0, recordLimit);
  }

  /**
   * Calculate weekly pattern (which days user works out most)
   */
  private calculateWeeklyPattern(workouts: WorkoutSession[]): WeeklyPattern[] {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayStats = days.map(day => ({
      day,
      workoutCount: 0,
      totalDuration: 0
    }));
    
    workouts.forEach(workout => {
      const dayIndex = new Date(workout.startTime).getDay();
      dayStats[dayIndex].workoutCount++;
      dayStats[dayIndex].totalDuration += workout.duration;
    });
    
    return dayStats.map(stat => ({
      day: stat.day,
      workoutCount: stat.workoutCount,
      averageDuration: stat.workoutCount > 0 ? Math.round(stat.totalDuration / stat.workoutCount) : 0
    }));
  }

  /**
   * Calculate workout type distribution
   */
  private calculateWorkoutTypeDistribution(workouts: WorkoutSession[]) {
    const typeCounts = workouts.reduce((acc, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = workouts.length;
    
    return Object.entries(typeCounts).map(([type, count]) => ({
      type: this.capitalizeFirst(type),
      count,
      percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count);
  }

  /**
   * Get estimated 1RM for exercises (simplified)
   */
  async getEstimated1RM(userId: string): Promise<{ exercise: string; estimated1RM: number }[]> {
    const workouts = await this.getUserWorkouts(userId);
    const gymWorkouts = workouts.filter(w => w.type === WorkoutType.GYM);
    
    if (gymWorkouts.length === 0) {
      return [];
    }

    // Simple estimation: Use the highest single set weight
    const estimated1RM: { [key: string]: number } = {};
    
    gymWorkouts.forEach(workout => {
      if (workout.trackingData && Array.isArray(workout.trackingData)) {
        workout.trackingData.forEach((exercise: any) => {
          if (exercise.sets && exercise.sets.length > 0) {
            const maxWeight = Math.max(...exercise.sets.map((set: any) => set.weight || 0));
            if (maxWeight > 0) {
              const exerciseName = exercise.name || 'Unknown Exercise';
              const currentBest = estimated1RM[exerciseName] || 0;
              if (maxWeight > currentBest) {
                estimated1RM[exerciseName] = Math.round(maxWeight * 1.2); // Simple 1RM estimation
              }
            }
          }
        });
      }
    });
    
    return Object.entries(estimated1RM)
      .map(([exercise, estimated1RM]) => ({ exercise, estimated1RM }))
      .sort((a, b) => b.estimated1RM - a.estimated1RM)
      .slice(0, 5);
  }

  /**
   * Calculate volume metrics
   */
  private calculateVolumeMetrics(workouts: WorkoutSession[]) {
    const gymWorkouts = workouts.filter(w => w.type === WorkoutType.GYM && w.totalVolume);
    const volumes = gymWorkouts.map(w => w.totalVolume || 0);
    
    if (volumes.length === 0) {
      return {
        averageVolumePerWorkout: 0,
        bestVolumeWorkout: 0,
        bestVolumeDate: new Date()
      };
    }
    
    const totalVolume = volumes.reduce((sum, vol) => sum + vol, 0);
    const averageVolumePerWorkout = Math.round(totalVolume / volumes.length);
    const bestVolumeWorkout = Math.max(...volumes);
    
    const bestWorkout = gymWorkouts.find(w => (w.totalVolume || 0) === bestVolumeWorkout);
    const bestVolumeDate = bestWorkout?.startTime || new Date();
    
    return {
      averageVolumePerWorkout,
      bestVolumeWorkout,
      bestVolumeDate
    };
  }

  /**
   * Calculate overall progress score (0-100)
   */
  private calculateProgressScore(workouts: WorkoutSession[]): number {
    if (workouts.length < 2) return 50; // Default score for beginners
    
    const recentWorkouts = workouts.slice(0, Math.min(10, workouts.length)); // Last 10 workouts
    const olderWorkouts = workouts.slice(10, 20); // Previous 10 workouts
    
    if (olderWorkouts.length === 0) return 60;
    
    // Calculate improvements in frequency
    const recentFrequency = recentWorkouts.length;
    const olderFrequency = olderWorkouts.length;
    
    // Calculate improvements in duration
    const recentAvgDuration = recentWorkouts.reduce((sum, w) => sum + w.duration, 0) / recentWorkouts.length;
    const olderAvgDuration = olderWorkouts.reduce((sum, w) => sum + w.duration, 0) / olderWorkouts.length;
    
    // Calculate consistency (days between workouts)
    const recentConsistency = this.calculateConsistency(recentWorkouts);
    const olderConsistency = this.calculateConsistency(olderWorkouts);
    
    // Weighted score calculation
    const frequencyScore = Math.min(100, (recentFrequency / Math.max(olderFrequency, 1)) * 100);
    const durationScore = olderAvgDuration > 0 ? Math.min(100, (recentAvgDuration / olderAvgDuration) * 100) : 70;
    const consistencyScore = Math.min(100, (recentConsistency / Math.max(olderConsistency, 1)) * 100);
    
    // Weighted average
    return Math.round((frequencyScore * 0.4) + (durationScore * 0.3) + (consistencyScore * 0.3));
  }

  /**
   * Return empty stats for new users
   */
  private getEmptyEnhancedStats(): EnhancedWorkoutStats {
    const emptyWeeklyTrend = Array.from({ length: 4 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      return {
        date: this.formatDate(date),
        workoutCount: 0,
        totalDuration: 0,
        totalVolume: 0,
        caloriesBurned: 0
      };
    }).reverse();
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const emptyWeeklyPattern = days.map(day => ({
      day,
      workoutCount: 0,
      averageDuration: 0
    }));
    
    return {
      totalWorkouts: 0,
      workoutsThisWeek: 0,
      workoutsThisMonth: 0,
      totalDuration: 0,
      totalCalories: 0,
      averageDuration: 0,
      favoriteWorkoutType: WorkoutType.GYM,
      currentStreak: 0,
      longestStreak: 0,
      consistency: 0,
      weeklyTrend: emptyWeeklyTrend,
      volumeProgression: [],
      personalRecords: [],
      weeklyPattern: emptyWeeklyPattern,
      workoutTypeDistribution: [],
      estimated1RM: [],
      averageVolumePerWorkout: 0,
      bestVolumeWorkout: 0,
      bestVolumeDate: new Date(),
      progressScore: 0
    };
  }

  // 🚀 EXISTING HELPER METHODS (Keep for compatibility)

  private calculateCurrentStreak(workouts: WorkoutSession[]): number {
    if (workouts.length === 0) return 0;

    const sortedWorkouts = workouts.sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.startTime);
      workoutDate.setHours(0, 0, 0, 0);

      const diffTime = currentDate.getTime() - workoutDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === streak) {
        streak++;
      } else if (diffDays > streak) {
        break;
      }
    }

    return streak;
  }

  private calculateLongestStreak(workouts: WorkoutSession[]): number {
    if (workouts.length === 0) return 0;

    const uniqueDates = Array.from(new Set(
      workouts.map(w => new Date(w.startTime).toDateString())
    )).sort().reverse();

    let longestStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const prevDate = new Date(uniqueDates[i - 1]);
      const diffTime = prevDate.getTime() - currentDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return Math.max(longestStreak, currentStreak);
  }

  private calculateConsistency(workouts: WorkoutSession[]): number {
    if (workouts.length === 0) return 0;

    const uniqueDates = new Set(
      workouts.map(w => new Date(w.startTime).toDateString())
    );

    const firstWorkout = new Date(Math.min(...workouts.map(w => w.startTime.getTime())));
    const today = new Date();
    const totalDays = Math.ceil((today.getTime() - firstWorkout.getTime()) / (1000 * 60 * 60 * 24));
    
    return totalDays > 0 ? (uniqueDates.size / totalDays) * 100 : 0;
  }

  private filterBestRecords(records: PersonalRecord[]): PersonalRecord[] {
    const bestRecords = new Map<string, PersonalRecord>();

    records.forEach(record => {
      const key = `${record.exerciseId}-${record.recordType}`;
      const existing = bestRecords.get(key);

      if (!existing || record.value > existing.value) {
        bestRecords.set(key, record);
      }
    });

    return Array.from(bestRecords.values());
  }

  private getWeekNumber(date: Date): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  }

  // 🚀 NEW HELPER METHODS

  private formatDate(date: Date): string {
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // 🚀 EXISTING: Personal records method (for compatibility)
  async getPersonalRecords(userId: string): Promise<PersonalRecord[]> {
    return this.getTopPersonalRecords(userId, 10);
  }

  // 🚀 EXISTING: Weekly frequency method (for compatibility)
  async getWeeklyFrequency(userId: string, weeks: number = 12): Promise<WeeklyFrequency[]> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    
    const workouts = await this.getWorkoutsByDateRange(userId, startDate, endDate);
    const weeklyData: Map<string, WeeklyFrequency> = new Map();

    workouts.forEach(workout => {
      const week = this.getWeekNumber(workout.startTime);
      const key = `${week}`;
      
      if (!weeklyData.has(key)) {
        weeklyData.set(key, {
          week,
          workoutCount: 0,
          totalDuration: 0,
          caloriesBurned: 0
        });
      }

      const weekData = weeklyData.get(key)!;
      weekData.workoutCount++;
      weekData.totalDuration += workout.duration;
      weekData.caloriesBurned += (workout.calories || workout.caloriesBurned || 0);
    });

    return Array.from(weeklyData.values()).sort((a, b) => a.week.localeCompare(b.week));
  }

  // 🚀 EXISTING: Exercise progression method (for compatibility)
  async getExerciseProgress(userId: string, exerciseId: string): Promise<ExerciseProgress> {
    const workouts = await this.getUserWorkouts(userId);
    const progressData: ExerciseProgress['progressData'] = [];

    // For now, track workout volume progression
    workouts.forEach(workout => {
      if (workout.totalVolume && workout.totalVolume > 0) {
        progressData.push({
          date: workout.startTime,
          value: workout.totalVolume,
          workoutId: workout.id
        });
      }
    });

    return {
      exerciseId,
      exerciseName: 'Workout Volume',
      progressData: progressData.sort((a, b) => a.date.getTime() - b.date.getTime())
    };
  }
}

export const workoutRepository = new WorkoutRepository();