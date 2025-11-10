import { Exercise, WorkoutType, GymWorkoutSplit, GymSplitType } from '../../features/workout/types/workout';

export const EXERCISE_LIBRARY: Exercise[] = [
  // ========== GYM EXERCISES ==========
  // Chest Exercises
  { id: 'barbell-bench-press', name: 'Barbell Bench Press', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Barbell' },
  { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Dumbbell' },
  { id: 'incline-bench-press', name: 'Incline Bench Press', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Barbell' },
  { id: 'chest-fly', name: 'Chest Fly', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Dumbbell' },
  { id: 'cable-crossover', name: 'Cable Crossover', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Cable' },
  { id: 'push-up', name: 'Push Up', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Bodyweight' },
  { id: 'dips', name: 'Dips', workoutType: WorkoutType.GYM, muscleGroup: 'Chest', equipment: 'Bodyweight' },

  // Back Exercises
  { id: 'deadlift', name: 'Deadlift', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Barbell' },
  { id: 'bent-over-row', name: 'Bent Over Row', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Barbell' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Machine' },
  { id: 'pull-up', name: 'Pull Up', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Bodyweight' },
  { id: 'seated-row', name: 'Seated Row', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Machine' },
  { id: 't-bar-row', name: 'T-Bar Row', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Machine' },
  { id: 'single-arm-dumbbell-row', name: 'Single Arm Dumbbell Row', workoutType: WorkoutType.GYM, muscleGroup: 'Back', equipment: 'Dumbbell' },

  // Shoulders Exercises
  { id: 'overhead-press', name: 'Overhead Press', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Barbell' },
  { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'lateral-raise', name: 'Lateral Raise', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'front-raise', name: 'Front Raise', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'rear-delt-fly', name: 'Rear Delt Fly', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'face-pulls', name: 'Face Pulls', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Cable' },
  { id: 'arnold-press', name: 'Arnold Press', workoutType: WorkoutType.GYM, muscleGroup: 'Shoulders', equipment: 'Dumbbell' },

  // Biceps Exercises
  { id: 'barbell-curl', name: 'Barbell Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Barbell' },
  { id: 'dumbbell-curl', name: 'Dumbbell Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Dumbbell' },
  { id: 'hammer-curl', name: 'Hammer Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Dumbbell' },
  { id: 'preacher-curl', name: 'Preacher Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Barbell' },
  { id: 'concentration-curl', name: 'Concentration Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Dumbbell' },
  { id: 'cable-curl', name: 'Cable Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Cable' },
  { id: 'incline-dumbbell-curl', name: 'Incline Dumbbell Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Biceps', equipment: 'Dumbbell' },

  // Triceps Exercises
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Cable' },
  { id: 'skull-crusher', name: 'Skull Crusher', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Barbell' },
  { id: 'overhead-tricep-extension', name: 'Overhead Tricep Extension', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Dumbbell' },
  { id: 'close-grip-bench-press', name: 'Close Grip Bench Press', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Barbell' },
  { id: 'tricep-dips', name: 'Tricep Dips', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Bodyweight' },
  { id: 'diamond-push-up', name: 'Diamond Push Up', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Bodyweight' },
  { id: 'rope-pushdown', name: 'Rope Pushdown', workoutType: WorkoutType.GYM, muscleGroup: 'Triceps', equipment: 'Cable' },

  // Traps Exercises
  { id: 'barbell-shrug', name: 'Barbell Shrug', workoutType: WorkoutType.GYM, muscleGroup: 'Traps', equipment: 'Barbell' },
  { id: 'dumbbell-shrug', name: 'Dumbbell Shrug', workoutType: WorkoutType.GYM, muscleGroup: 'Traps', equipment: 'Dumbbell' },
  { id: 'upright-row', name: 'Upright Row', workoutType: WorkoutType.GYM, muscleGroup: 'Traps', equipment: 'Barbell' },
  { id: 'face-pulls-traps', name: 'Face Pulls', workoutType: WorkoutType.GYM, muscleGroup: 'Traps', equipment: 'Cable' },
  { id: 'power-shrug', name: 'Power Shrug', workoutType: WorkoutType.GYM, muscleGroup: 'Traps', equipment: 'Barbell' },

  // Legs Exercises
  { id: 'barbell-squat', name: 'Barbell Squat', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Barbell' },
  { id: 'leg-press', name: 'Leg Press', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Barbell' },
  { id: 'lunges', name: 'Lunges', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Dumbbell' },
  { id: 'leg-extension', name: 'Leg Extension', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'leg-curl', name: 'Leg Curl', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'calf-raise', name: 'Calf Raise', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'hack-squat', name: 'Hack Squat', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', workoutType: WorkoutType.GYM, muscleGroup: 'Legs', equipment: 'Dumbbell' },

    // Glutes Exercises
    { id: 'barbell-hip-thrust', name: 'Barbell Hip Thrust', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Barbell' },
    { id: 'glute-bridge', name: 'Glute Bridge', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Bodyweight' },
    { id: 'cable-kickback', name: 'Cable Kickback', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Cable' },
    { id: 'hip-abduction-machine', name: 'Hip Abduction Machine', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Machine' },
    { id: 'sumo-deadlift', name: 'Sumo Deadlift', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Barbell' },
    { id: 'donkey-kicks', name: 'Donkey Kicks', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Bodyweight' },
    { id: 'curtsy-lunges', name: 'Curtsy Lunges', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Dumbbell' },
    { id: 'frog-pumps', name: 'Frog Pumps', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Bodyweight' },
    { id: 'single-leg-hip-thrust', name: 'Single Leg Hip Thrust', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Bodyweight' },
    { id: 'glute-ham-raise', name: 'Glute Ham Raise', workoutType: WorkoutType.GYM, muscleGroup: 'Glutes', equipment: 'Machine' },

  // Core/Abs Exercises
  { id: 'cable-crunch', name: 'Cable Crunch', workoutType: WorkoutType.GYM, muscleGroup: 'Core', equipment: 'Cable' },
  { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', workoutType: WorkoutType.GYM, muscleGroup: 'Core', equipment: 'Bodyweight' },
  { id: 'russian-twist', name: 'Russian Twist', workoutType: WorkoutType.GYM, muscleGroup: 'Core', equipment: 'Dumbbell' },
  { id: 'plank', name: 'Plank', workoutType: WorkoutType.GYM, muscleGroup: 'Core', equipment: 'Bodyweight' },
  { id: 'ab-wheel', name: 'Ab Wheel', workoutType: WorkoutType.GYM, muscleGroup: 'Core', equipment: 'Ab Wheel' },

  // ========== CALISTHENICS EXERCISES ==========
  { id: 'push-up', name: 'Push Up', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'pull-up', name: 'Pull Up', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'chin-up', name: 'Chin Up', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'dips', name: 'Dips', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'muscle-up', name: 'Muscle Up', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'handstand-push-up', name: 'Handstand Push Up', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'l-sit', name: 'L-Sit', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'planche', name: 'Planche', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'front-lever', name: 'Front Lever', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'back-lever', name: 'Back Lever', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'human-flag', name: 'Human Flag', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'pistol-squat', name: 'Pistol Squat', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'dragon-flag', name: 'Dragon Flag', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'hollow-body-hold', name: 'Hollow Body Hold', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },
  { id: 'arch-body-hold', name: 'Arch Body Hold', workoutType: WorkoutType.CALISTHENICS, difficulty: 'beginner' },

  // ========== YOGA EXERCISES ==========
  { id: 'downward-dog', name: 'Downward Facing Dog', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'warrior-i', name: 'Warrior I', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'warrior-ii', name: 'Warrior II', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'warrior-iii', name: 'Warrior III', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'tree-pose', name: 'Tree Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'child-pose', name: 'Child Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'sun-salutation', name: 'Sun Salutation', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'mountain-pose', name: 'Mountain Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'chair-pose', name: 'Chair Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'bridge-pose', name: 'Bridge Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'cobra-pose', name: 'Cobra Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'pigeon-pose', name: 'Pigeon Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'triangle-pose', name: 'Triangle Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'camel-pose', name: 'Camel Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'lotus-pose', name: 'Lotus Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },
  { id: 'corpse-pose', name: 'Corpse Pose', workoutType: WorkoutType.YOGA, difficulty: 'beginner' },

  // ========== CARDIO EXERCISES ==========
  // Running
  { id: 'sprint-intervals', name: 'Sprint Intervals', workoutType: WorkoutType.RUNNING, muscleGroup: 'Cardio' },
  { id: 'long-distance-run', name: 'Long Distance Run', workoutType: WorkoutType.RUNNING, muscleGroup: 'Cardio' },
  { id: 'hill-sprints', name: 'Hill Sprints', workoutType: WorkoutType.RUNNING, muscleGroup: 'Cardio' },
  { id: 'fartlek-training', name: 'Fartlek Training', workoutType: WorkoutType.RUNNING, muscleGroup: 'Cardio' },

  // Cycling
  { id: 'stationary-cycling', name: 'Stationary Cycling', workoutType: WorkoutType.CYCLING, muscleGroup: 'Cardio' },
  { id: 'outdoor-cycling', name: 'Outdoor Cycling', workoutType: WorkoutType.CYCLING, muscleGroup: 'Cardio' },
  { id: 'hill-cycling', name: 'Hill Cycling', workoutType: WorkoutType.CYCLING, muscleGroup: 'Cardio' },
  { id: 'cycling-intervals', name: 'Cycling Intervals', workoutType: WorkoutType.CYCLING, muscleGroup: 'Cardio' },

  // Walking
  { id: 'brisk-walking', name: 'Brisk Walking', workoutType: WorkoutType.WALKING, muscleGroup: 'Cardio' },
  { id: 'power-walking', name: 'Power Walking', workoutType: WorkoutType.WALKING, muscleGroup: 'Cardio' },
  { id: 'hiking', name: 'Hiking', workoutType: WorkoutType.WALKING, muscleGroup: 'Cardio' },
  { id: 'treadmill-walking', name: 'Treadmill Walking', workoutType: WorkoutType.WALKING, muscleGroup: 'Cardio' },

  // Elliptical
  { id: 'elliptical-training', name: 'Elliptical Training', workoutType: WorkoutType.ELLIPTICAL, muscleGroup: 'Cardio' },
  { id: 'elliptical-intervals', name: 'Elliptical Intervals', workoutType: WorkoutType.ELLIPTICAL, muscleGroup: 'Cardio' },
  { id: 'elliptical-hills', name: 'Elliptical Hills', workoutType: WorkoutType.ELLIPTICAL, muscleGroup: 'Cardio' },

  // Jumba
  { id: 'jumba-dance', name: 'Jumba Dance', workoutType: WorkoutType.JUMBA, muscleGroup: 'Cardio' },
  { id: 'jumba-cardio', name: 'Jumba Cardio', workoutType: WorkoutType.JUMBA, muscleGroup: 'Cardio' },
  { id: 'jumba-intervals', name: 'Jumba Intervals', workoutType: WorkoutType.JUMBA, muscleGroup: 'Cardio' },
];


// Updated Gym workout splits with GymSplitType enumo
export const GYM_WORKOUT_SPLITS: GymWorkoutSplit[] = [
    {
      id: GymSplitType.PUSH,
      name: 'Push Day',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Chest', 'Shoulders', 'Triceps'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.PULL,
      name: 'Pull Day', 
      targetMuscles: ['Back', 'Biceps', 'Traps'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Back', 'Biceps', 'Traps'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.LEGS,
      name: 'Leg Day',
      targetMuscles: ['Legs', 'Glutes'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Legs', 'Glutes'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.UPPER,
      name: 'Upper Body',
      targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Traps'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Traps'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.LOWER,
      name: 'Lower Body',
      targetMuscles: ['Legs', 'Glutes'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Legs', 'Glutes'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.FULL_BODY,
      name: 'Full Body',
      targetMuscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Traps', 'Legs', 'Glutes', 'Core'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Traps', 'Legs', 'Glutes', 'Core'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.ARMS,
      name: 'Arms Day',
      targetMuscles: ['Biceps', 'Triceps'],
      suggestedExercises: EXERCISE_LIBRARY.filter(ex => 
        ex.muscleGroup && ['Biceps', 'Triceps'].includes(ex.muscleGroup)
      )
    },
    {
      id: GymSplitType.MUSCLE_GROUP,
      name: 'Custom Split',
      targetMuscles: [], // Will be populated dynamically
      suggestedExercises: [] // Will be populated dynamically
    }
  ];
  
  // Helper function to get exercises by workout type
  export const getExercisesByType = (workoutType: WorkoutType): Exercise[] => {
    return EXERCISE_LIBRARY.filter(exercise => exercise.workoutType === workoutType);
  };
  
  // Helper function to get exercises by muscle group
  export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
    return EXERCISE_LIBRARY.filter(exercise => exercise.muscleGroup === muscleGroup);
  };
  
  // Smart mapping function for muscle groups to splits
  export const mapMuscleGroupsToSplit = (selectedMuscles: string[]): GymWorkoutSplit => {
    // Helper function to check if arrays have same elements
    const arraysEqual = (a: string[], b: string[]) => 
      a.length === b.length && a.every(item => b.includes(item));
    
    // Helper to get split by ID
    const getSplitById = (id: GymSplitType) => 
      GYM_WORKOUT_SPLITS.find(split => split.id === id)!;
  
    // Exact matches
    if (arraysEqual(selectedMuscles, ['Chest', 'Shoulders', 'Triceps'])) {
      return getSplitById(GymSplitType.PUSH);
    }
    if (arraysEqual(selectedMuscles, ['Back', 'Biceps', 'Traps'])) {
      return getSplitById(GymSplitType.PULL);
    }
    if (arraysEqual(selectedMuscles, ['Legs', 'Glutes'])) {
        return getSplitById(GymSplitType.LEGS);
      }
    if (arraysEqual(selectedMuscles, ['Biceps', 'Triceps'])) {
      return getSplitById(GymSplitType.ARMS);
    }
  
    // For mixed combinations, use MUSCLE_GROUP split with custom name
    const customSplit = getSplitById(GymSplitType.MUSCLE_GROUP);
    const muscleGroupExercises = selectedMuscles.flatMap(muscle => 
      getExercisesByMuscleGroup(muscle)
    );
    
    return {
      ...customSplit,
      name: selectedMuscles.length === 1 ? `${selectedMuscles[0]} Day` : `${selectedMuscles.join(' + ')} Day`,
      targetMuscles: selectedMuscles,
      suggestedExercises: muscleGroupExercises
    };
  };