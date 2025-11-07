import { BaseRepository } from './BaseRepository';
import { WorkoutSession, WorkoutType } from '../../types/domain'; // These are exported
import { query, where, orderBy, limit } from 'firebase/firestore';

export class WorkoutRepository extends BaseRepository<WorkoutSession> {
  constructor() {
    super('workoutSessions');
  }

  async getUserWorkouts(userId: string): Promise<WorkoutSession[]> {
    return this.query([
      where('userId', '==', userId),
      orderBy('startTime', 'desc')
    ]);
  }

  async getRecentWorkouts(userId: string, count: number = 10): Promise<WorkoutSession[]> {
    return this.query([
      where('userId', '==', userId),
      orderBy('startTime', 'desc'),
      limit(count)
    ]);
  }

  async getWorkoutsByType(userId: string, type: WorkoutType): Promise<WorkoutSession[]> {
    return this.query([
      where('userId', '==', userId),
      where('type', '==', type),
      orderBy('startTime', 'desc')
    ]);
  }

  async getWorkoutsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<WorkoutSession[]> {
    return this.query([
      where('userId', '==', userId),
      where('startTime', '>=', startDate),
      where('startTime', '<=', endDate),
      orderBy('startTime', 'desc')
    ]);
  }
}

export const workoutRepository = new WorkoutRepository();