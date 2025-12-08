// React Native compatible event system
type EventCallback = (data: any) => void;

class AppEventEmitter {
  private listeners: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: EventCallback): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      this.listeners.set(
        event,
        eventListeners.filter(listener => listener !== callback)
      );
    }
  }

  emit(event: string, data?: any): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

export const appEvents = new AppEventEmitter();

// Event Types
export const EVENT_WORKOUT_COMPLETED = 'workout:completed';
export const EVENT_PROJECT_DAY_COMPLETE = 'project:day-complete';
export const EVENT_USER_AUTHENTICATED = 'user:authenticated';
export const EVENT_DATA_LOADED = 'data:loaded';

// Workout Completed Event Data
export interface WorkoutCompletedEvent {
  workout: any;
  projectContext?: {
    projectId: string;
    projectName: string;
    dayIndex: number;
    dayName: string;
  };
}

// Project Event Data
export interface ProjectDayCompleteEvent {
  projectId: string;
  dayIndex: number;
  userId: string;
}