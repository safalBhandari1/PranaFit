import { ProjectTemplate, DailyWorkout, WorkoutActivity } from '../types/project';
import { WorkoutType } from '../../workout/types/workout';
import { EXERCISE_LIBRARY } from '../../../shared/data/exercises';

export const generateSampleTemplates = (): ProjectTemplate[] => [
  {
    id: 'beginner-strength-4week',
    name: '4-Week Beginner Strength',
    description: 'Perfect for those new to strength training. Build foundational strength with full-body workouts.',
    type: 'gym',
    duration: 28,
    category: 'beginner',
    difficulty: 2,
    estimatedDuration: 1800, // Total minutes
    popularity: 245,
    isFeatured: true,
    author: 'PranaFit Team',
    focusAreas: ['Chest', 'Back', 'Legs', 'Shoulders'],
    dailyWorkouts: generateBeginnerStrengthDays()
  },
  {
    id: 'push-pull-legs-advanced',
    name: 'Advanced PPL Split',
    description: '6-day push/pull/legs split for experienced lifters looking to build muscle mass.',
    type: 'gym',
    duration: 42,
    category: 'muscle-building',
    difficulty: 4,
    estimatedDuration: 4800,
    popularity: 189,
    isFeatured: true,
    author: 'PranaFit Team',
    focusAreas: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
    dailyWorkouts: generatePPLDays()
  },
  {
    id: 'fat-loss-cardio',
    name: 'Fat Loss Cardio Program',
    description: 'High-intensity cardio workouts designed for maximum fat burning and endurance improvement.',
    type: 'running',
    duration: 21,
    category: 'weight-loss',
    difficulty: 3,
    estimatedDuration: 1260,
    popularity: 167,
    isFeatured: false,
    author: 'PranaFit Team',
    focusAreas: ['Cardio'],
    dailyWorkouts: generateCardioDays()
  },
  {
    id: 'calisthenics-beginner',
    name: 'Beginner Calisthenics',
    description: 'Build functional strength using bodyweight exercises. No equipment needed!',
    type: 'calisthenics',
    duration: 14,
    category: 'beginner',
    difficulty: 2,
    estimatedDuration: 840,
    popularity: 134,
    isFeatured: true,
    author: 'PranaFit Team',
    focusAreas: ['Upper Body', 'Core'],
    dailyWorkouts: generateCalisthenicsDays()
  },
  {
    id: 'yoga-flexibility',
    name: 'Yoga for Flexibility',
    description: 'Improve flexibility, balance, and mental focus with daily yoga practice.',
    type: 'calisthenics', // Using calisthenics for yoga since we don't have separate yoga type
    duration: 30,
    category: 'beginner',
    difficulty: 1,
    estimatedDuration: 1500,
    popularity: 98,
    isFeatured: false,
    author: 'PranaFit Team',
    focusAreas: ['Flexibility', 'Balance'],
    dailyWorkouts: generateYogaDays()
  },
  {
    id: 'mixed-functional',
    name: 'Functional Fitness Mix',
    description: 'Combine strength, cardio, and mobility for overall functional fitness.',
    type: 'mixed',
    duration: 21,
    category: 'intermediate',
    difficulty: 3,
    estimatedDuration: 1890,
    popularity: 76,
    isFeatured: false,
    author: 'PranaFit Team',
    focusAreas: ['Full Body', 'Cardio'],
    dailyWorkouts: generateMixedDays()
  }
];

// Helper functions to generate template days
function generateBeginnerStrengthDays(): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  
  for (let i = 0; i < 28; i++) {
    const dayType = i % 4; // 4-day rotation
    
    let dayName = '';
    let activities: WorkoutActivity[] = [];
    let focusAreas: string[] = [];

    switch (dayType) {
      case 0: // Full Body A
        dayName = 'Full Body A';
        focusAreas = ['Chest', 'Back', 'Legs'];
        activities = [{
          id: `workout_${i}_a`,
          type: WorkoutType.GYM,
          name: 'Full Body Strength',
          estimatedDuration: 45,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['barbell-squat', 'barbell-bench-press', 'bent-over-row', 'overhead-press'].includes(ex.id)
          )
        }];
        break;
      case 1: // Cardio
        dayName = 'Cardio Day';
        focusAreas = ['Cardio'];
        activities = [{
          id: `workout_${i}_b`,
          type: WorkoutType.RUNNING,
          name: 'Steady State Cardio',
          estimatedDuration: 30,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'long-distance-run')
        }];
        break;
      case 2: // Full Body B
        dayName = 'Full Body B';
        focusAreas = ['Legs', 'Back', 'Shoulders'];
        activities = [{
          id: `workout_${i}_c`,
          type: WorkoutType.GYM,
          name: 'Full Body Strength',
          estimatedDuration: 45,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['deadlift', 'incline-bench-press', 'lat-pulldown', 'dumbbell-shoulder-press'].includes(ex.id)
          )
        }];
        break;
      case 3: // Rest
        dayName = 'Rest Day';
        focusAreas = ['Recovery'];
        activities = [{
          id: `workout_${i}_d`,
          type: WorkoutType.WALKING,
          name: 'Active Recovery',
          estimatedDuration: 20,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'brisk-walking')
        }];
        break;
    }

    days.push({
      dayIndex: i,
      name: dayName,
      date: new Date(), // Will be set when project is created
      completed: false,
      activities,
      focusAreas
    });
  }
  
  return days;
}

function generatePPLDays(): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  const split = ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs', 'Rest'];
  
  for (let i = 0; i < 42; i++) {
    const dayType = split[i % 7];
    
    let activities: WorkoutActivity[] = [];
    let focusAreas: string[] = [];

    switch (dayType) {
      case 'Push':
        focusAreas = ['Chest', 'Shoulders', 'Triceps'];
        activities = [{
          id: `workout_${i}_push`,
          type: WorkoutType.GYM,
          name: 'Push Day',
          estimatedDuration: 60,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['barbell-bench-press', 'incline-bench-press', 'overhead-press', 'tricep-pushdown'].includes(ex.id)
          )
        }];
        break;
      case 'Pull':
        focusAreas = ['Back', 'Biceps', 'Traps'];
        activities = [{
          id: `workout_${i}_pull`,
          type: WorkoutType.GYM,
          name: 'Pull Day',
          estimatedDuration: 60,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['deadlift', 'bent-over-row', 'lat-pulldown', 'barbell-curl'].includes(ex.id)
          )
        }];
        break;
      case 'Legs':
        focusAreas = ['Legs', 'Glutes'];
        activities = [{
          id: `workout_${i}_legs`,
          type: WorkoutType.GYM,
          name: 'Leg Day',
          estimatedDuration: 60,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['barbell-squat', 'romanian-deadlift', 'leg-press', 'calf-raise'].includes(ex.id)
          )
        }];
        break;
      case 'Rest':
        focusAreas = ['Recovery'];
        activities = [{
          id: `workout_${i}_rest`,
          type: WorkoutType.WALKING,
          name: 'Active Recovery',
          estimatedDuration: 20,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'brisk-walking')
        }];
        break;
    }

    days.push({
      dayIndex: i,
      name: `${dayType} Day`,
      date: new Date(),
      completed: false,
      activities,
      focusAreas
    });
  }
  
  return days;
}

function generateCardioDays(): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  const workouts = ['HIIT', 'Steady State', 'Hill Sprints', 'Long Run', 'Recovery', 'Intervals', 'Rest'];
  
  for (let i = 0; i < 21; i++) {
    const workoutType = workouts[i % 7];
    
    let activities: WorkoutActivity[] = [];
    let focusAreas: string[] = ['Cardio'];

    switch (workoutType) {
      case 'HIIT':
        activities = [{
          id: `workout_${i}_hiit`,
          type: WorkoutType.RUNNING,
          name: 'HIIT Sprint Intervals',
          estimatedDuration: 25,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'sprint-intervals')
        }];
        break;
      case 'Steady State':
        activities = [{
          id: `workout_${i}_steady`,
          type: WorkoutType.RUNNING,
          name: 'Steady State Run',
          estimatedDuration: 40,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'long-distance-run')
        }];
        break;
      case 'Hill Sprints':
        activities = [{
          id: `workout_${i}_hills`,
          type: WorkoutType.RUNNING,
          name: 'Hill Sprints',
          estimatedDuration: 30,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'hill-sprints')
        }];
        break;
      case 'Long Run':
        activities = [{
          id: `workout_${i}_long`,
          type: WorkoutType.RUNNING,
          name: 'Long Distance Run',
          estimatedDuration: 60,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'long-distance-run')
        }];
        break;
      case 'Intervals':
        activities = [{
          id: `workout_${i}_intervals`,
          type: WorkoutType.RUNNING,
          name: 'Fartlek Training',
          estimatedDuration: 35,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'fartlek-training')
        }];
        break;
      case 'Recovery':
        activities = [{
          id: `workout_${i}_recovery`,
          type: WorkoutType.WALKING,
          name: 'Recovery Walk',
          estimatedDuration: 20,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'brisk-walking')
        }];
        break;
      case 'Rest':
        focusAreas = ['Recovery'];
        activities = [{
          id: `workout_${i}_rest`,
          type: WorkoutType.WALKING,
          name: 'Complete Rest',
          estimatedDuration: 0,
          exercises: []
        }];
        break;
    }

    days.push({
      dayIndex: i,
      name: `${workoutType} Day`,
      date: new Date(),
      completed: false,
      activities,
      focusAreas
    });
  }
  
  return days;
}

function generateCalisthenicsDays(): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  
  for (let i = 0; i < 14; i++) {
    const dayType = i % 3; // 3-day rotation
    
    let dayName = '';
    let activities: WorkoutActivity[] = [];
    let focusAreas: string[] = [];

    switch (dayType) {
      case 0: // Upper Body
        dayName = 'Upper Body Strength';
        focusAreas = ['Chest', 'Back', 'Shoulders', 'Arms'];
        activities = [{
          id: `workout_${i}_upper`,
          type: WorkoutType.CALISTHENICS,
          name: 'Upper Body Calisthenics',
          estimatedDuration: 40,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['push-up', 'pull-up', 'dips', 'handstand-push-up'].includes(ex.id)
          )
        }];
        break;
      case 1: // Lower Body & Core
        dayName = 'Lower Body & Core';
        focusAreas = ['Legs', 'Core'];
        activities = [{
          id: `workout_${i}_lower`,
          type: WorkoutType.CALISTHENICS,
          name: 'Lower Body & Core',
          estimatedDuration: 35,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['pistol-squat', 'lunges', 'l-sit', 'hollow-body-hold'].includes(ex.id)
          )
        }];
        break;
      case 2: // Skill & Mobility
        dayName = 'Skill & Mobility';
        focusAreas = ['Mobility', 'Balance'];
        activities = [{
          id: `workout_${i}_skill`,
          type: WorkoutType.CALISTHENICS,
          name: 'Skill Training',
          estimatedDuration: 30,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['planche', 'front-lever', 'back-lever', 'l-sit'].includes(ex.id)
          )
        }];
        break;
    }

    days.push({
      dayIndex: i,
      name: dayName,
      date: new Date(),
      completed: false,
      activities,
      focusAreas
    });
  }
  
  return days;
}

function generateYogaDays(): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  const styles = ['Vinyasa Flow', 'Hatha Basics', 'Yin Yoga', 'Power Yoga', 'Restorative', 'Meditation', 'Rest'];
  
  for (let i = 0; i < 30; i++) {
    const style = styles[i % 7];
    
    let activities: WorkoutActivity[] = [];
    let focusAreas: string[] = ['Flexibility', 'Balance'];

    activities = [{
      id: `workout_${i}_yoga`,
      type: WorkoutType.CALISTHENICS, // Using calisthenics for yoga
      name: `${style} Session`,
      estimatedDuration: style === 'Rest' ? 0 : 30,
      exercises: EXERCISE_LIBRARY.filter(ex => 
        ex.workoutType === WorkoutType.YOGA
      ).slice(0, 8) // Limit to 8 poses per session
    }];

    days.push({
      dayIndex: i,
      name: `${style} Day`,
      date: new Date(),
      completed: false,
      activities,
      focusAreas
    });
  }
  
  return days;
}

function generateMixedDays(): DailyWorkout[] {
  const days: DailyWorkout[] = [];
  const workouts = [
    { type: 'gym', name: 'Strength Training' },
    { type: 'running', name: 'Cardio Session' },
    { type: 'calisthenics', name: 'Mobility Work' },
    { type: 'gym', name: 'Strength Training' },
    { type: 'cycling', name: 'Cardio Session' },
    { type: 'calisthenics', name: 'Skill Work' },
    { type: 'walking', name: 'Active Recovery' }
  ];
  
  for (let i = 0; i < 21; i++) {
    const workout = workouts[i % 7];
    
    let activities: WorkoutActivity[] = [];
    let focusAreas: string[] = [];

    switch (workout.type) {
      case 'gym':
        focusAreas = ['Full Body'];
        activities = [{
          id: `workout_${i}_strength`,
          type: WorkoutType.GYM,
          name: 'Full Body Strength',
          estimatedDuration: 50,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['barbell-squat', 'barbell-bench-press', 'deadlift', 'overhead-press'].includes(ex.id)
          )
        }];
        break;
      case 'running':
        focusAreas = ['Cardio'];
        activities = [{
          id: `workout_${i}_cardio`,
          type: WorkoutType.RUNNING,
          name: 'Cardio Session',
          estimatedDuration: 35,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'long-distance-run')
        }];
        break;
      case 'cycling':
        focusAreas = ['Cardio'];
        activities = [{
          id: `workout_${i}_cycling`,
          type: WorkoutType.CYCLING,
          name: 'Cycling Session',
          estimatedDuration: 45,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'stationary-cycling')
        }];
        break;
      case 'calisthenics':
        focusAreas = ['Mobility', 'Core'];
        activities = [{
          id: `workout_${i}_mobility`,
          type: WorkoutType.CALISTHENICS,
          name: 'Mobility & Core',
          estimatedDuration: 25,
          exercises: EXERCISE_LIBRARY.filter(ex => 
            ['push-up', 'plank', 'l-sit', 'hollow-body-hold'].includes(ex.id)
          )
        }];
        break;
      case 'walking':
        focusAreas = ['Recovery'];
        activities = [{
          id: `workout_${i}_recovery`,
          type: WorkoutType.WALKING,
          name: 'Active Recovery',
          estimatedDuration: 20,
          exercises: EXERCISE_LIBRARY.filter(ex => ex.id === 'brisk-walking')
        }];
        break;
    }

    days.push({
      dayIndex: i,
      name: workout.name,
      date: new Date(),
      completed: false,
      activities,
      focusAreas
    });
  }
  
  return days;
}

// Export helper functions if needed elsewhere
export { 
  generateBeginnerStrengthDays, 
  generatePPLDays, 
  generateCardioDays,
  generateCalisthenicsDays,
  generateYogaDays,
  generateMixedDays
};

