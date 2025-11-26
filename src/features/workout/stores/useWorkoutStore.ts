
// src/features/workout/stores/useWorkoutStore.ts
import { create } from 'zustand';
import { WorkoutType, WorkoutStep, Exercise, WorkoutSession, GymWorkoutSplit, GymSplitType } from '../types/workout';

interface WorkoutSessionStore {
  // Modal State
  isModalOpen: boolean;
  currentStep: WorkoutStep;
  workoutType: WorkoutType | null;
  selectedExercises: Exercise[];
  selectedGymSplit: GymWorkoutSplit | null;
  
  // Project Context (when initiated from project)
  projectContext: {
    projectId: string;
    projectName: string;
    dayIndex: number;
    dayName: string;
  } | null;

  // Active Session
  activeSession: WorkoutSession | null;
  sessionStartTime: Date | null;

  // Actions
  openWorkoutModal: (type: WorkoutType, options?: WorkoutModalOptions) => void;
  closeWorkoutModal: () => void;
  setWorkoutType: (type: WorkoutType) => void;
  setCurrentStep: (step: WorkoutStep) => void;
  setSelectedExercises: (exercises: Exercise[]) => void;
  setSelectedGymSplit: (split: GymWorkoutSplit) => void;
  startWorkoutSession: () => void;
  completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => void;
  resetWorkoutSession: () => void;
}

interface WorkoutModalOptions {
  projectContext?: {
    projectId: string;
    projectName: string;
    dayIndex: number;
    dayName: string;
  };
  preSelectedExercises?: Exercise[];
  customMuscleGroups?: string[];
}

// Helper function to auto-update project progress
const updateProjectProgressFromWorkout = (projectContext: any) => {
  try {
    // Import project store dynamically to avoid circular dependencies
    const { useProjectStore } = require('../../../features/projects/stores/useProjectStore');
    const projectStore = useProjectStore.getState();
    
    // Validate project context
    if (!projectContext?.projectId || projectContext.dayIndex === undefined) {
      console.log('⚠️ Invalid project context for auto-update');
      return;
    }
    
    // Verify project exists
    const project = projectStore.projects.find((p: any) => p.id === projectContext.projectId);
    if (!project) {
      console.log('⚠️ Project not found for auto-update:', projectContext.projectId);
      return;
    }
    
    // Verify day index is valid
    if (projectContext.dayIndex < 0 || projectContext.dayIndex >= project.dailyWorkouts.length) {
      console.log('⚠️ Invalid day index for auto-update:', projectContext.dayIndex);
      return;
    }
    
    // Perform the update
    projectStore.markDayComplete(projectContext.projectId, projectContext.dayIndex);
    console.log(`✅ Auto-completed project day: ${projectContext.projectName} - Day ${projectContext.dayIndex + 1}`);
    
  } catch (error) {
    console.error('❌ Error auto-updating project progress:', error);
    // Fail silently - user can still manually mark complete
  }
};

// Helper to determine initial step based on workout type and options
// const getInitialStep = (workoutType: WorkoutType, options?: WorkoutModalOptions): WorkoutStep => {
//   const hasPreSelectedExercises = options?.preSelectedExercises && options.preSelectedExercises.length > 0;
  
//   if (workoutType === WorkoutType.GYM) {
//     // For Gym with pre-selected exercises, skip directly to active session
//     // For Gym without exercises, go to exercise selection
//     return hasPreSelectedExercises ? 'active-session' : 'exercise-selection';
//   } else if (
//     workoutType === WorkoutType.YOGA || 
//     workoutType === WorkoutType.CALISTHENICS
//   ) {
//     // For Yoga/Calisthenics with pre-selected exercises, skip to active session
//     // Otherwise go to exercise selection
//     return hasPreSelectedExercises ? 'active-session' : 'exercise-selection';
//   } else {
//     // Cardio types (Running, Cycling, Walking, Elliptical, Jumba) go directly to active session
//     return 'active-session';
//   }
// };
const getInitialStep = (workoutType: WorkoutType, options?: WorkoutModalOptions): WorkoutStep => {
  const hasPreSelectedExercises = options?.preSelectedExercises && options.preSelectedExercises.length > 0;
  const hasProjectContext = !!options?.projectContext;
  
  console.log('🔍 DEBUG: getInitialStep with context');
  console.log('Workout type:', workoutType);
  console.log('Has pre-selected exercises:', hasPreSelectedExercises);
  console.log('Has project context:', hasProjectContext);
  
  if (workoutType === WorkoutType.GYM) {
    if (hasProjectContext && hasPreSelectedExercises) {
      // Gym project with exercises: User selected muscle groups, need to choose exercises
      console.log('🎯 Gym project: Going to exercise selection to choose from muscle groups');
      return 'exercise-selection';
    } else if (hasPreSelectedExercises) {
      // Gym without project but with exercises: Direct workout with specific exercises
      console.log('🎯 Direct gym workout: Going to active session');
      return 'active-session';
    } else if(hasProjectContext){
      // Gym with from project but without preselected exercise
      console.log('🎯 Direct gym workout: Going to active session');
      return 'exercise-selection';
    }
    else {
      // Gym without exercises: Need to select exercises
      console.log('🎯 Gym workout: Going to exercise selection');
      return 'gym-split-selection';
    }
  } else if (
    workoutType === WorkoutType.YOGA || 
    workoutType === WorkoutType.CALISTHENICS
  ) {
    // For Yoga/Calisthenics: Skip to active session if user already selected exercises
    const step = hasPreSelectedExercises ? 'active-session' : 'exercise-selection';
    console.log(`🎯 Structured workout (${workoutType}): Going to ${step}`);
    return step;
  } else {
    // Cardio types go directly to active session
    console.log('🎯 Cardio workout: Going to active session');
    return 'active-session';
  }
};

export const useWorkoutStore = create<WorkoutSessionStore>((set, get) => ({
  // Initial State
  isModalOpen: false,
  currentStep: 'type-selection',
  workoutType: null,
  selectedExercises: [],
  selectedGymSplit: null,
  projectContext: null,
  activeSession: null,
  sessionStartTime: null,

  // Actions
  openWorkoutModal: (type: WorkoutType, options?: WorkoutModalOptions) => {
    console.log('🟢 useWorkoutStore: openWorkoutModal called with type:', type, 'options:', options);

    const initialStep = getInitialStep(type, options);

    const initialState = {
      isModalOpen: true,
      workoutType: type,
      currentStep: initialStep,
      projectContext: options?.projectContext || null,
      selectedExercises: options?.preSelectedExercises || [],
      selectedGymSplit: null,
      activeSession: null,
      sessionStartTime: null
    };

    // If it's a gym workout with custom muscle groups, set up the split
    if (type === WorkoutType.GYM && options?.customMuscleGroups && options.customMuscleGroups.length > 0) {
      initialState.selectedGymSplit = {
        id: GymSplitType.MUSCLE_GROUP,
        name: `${options.customMuscleGroups.join(' + ')} Day`,
        targetMuscles: options.customMuscleGroups,
        suggestedExercises: []
      };
    }

    set(initialState);

    console.log('🎯 Workout modal opened with:', {
      type,
      initialStep,
      hasProjectContext: !!options?.projectContext,
      exerciseCount: options?.preSelectedExercises?.length || 0
    });
  },

  closeWorkoutModal: () => {
    set({
      isModalOpen: false,
      currentStep: 'type-selection',
      workoutType: null,
      selectedExercises: [],
      selectedGymSplit: null,
      projectContext: null,
      activeSession: null,
      sessionStartTime: null
    });
  },

  setWorkoutType: (type: WorkoutType) => {
    const nextStep = type === WorkoutType.GYM ? 'gym-split-selection' : 'exercise-selection';
    set({ 
      workoutType: type,
      currentStep: nextStep
    });
  },

  setCurrentStep: (step: WorkoutStep) => {
    set({ currentStep: step });
  },

  setSelectedExercises: (exercises: Exercise[]) => {
    set({ selectedExercises: exercises });
  },

  setSelectedGymSplit: (split: GymWorkoutSplit) => {
    set({ 
      selectedGymSplit: split,
      currentStep: 'exercise-selection'
    });
  },

  startWorkoutSession: () => {
    const { workoutType, selectedExercises, projectContext, selectedGymSplit } = get();
    const startTime = new Date();
    
    set({
      currentStep: 'active-session',
      sessionStartTime: startTime,
      activeSession: {
        id: `session_${Date.now()}`,
        type: workoutType!,
        exercises: selectedExercises,
        startTime,
        duration: 0,
        projectContext: projectContext || undefined,
        gymSplitType: selectedGymSplit?.id,
        customMuscleGroups: selectedGymSplit?.id === GymSplitType.MUSCLE_GROUP ? selectedGymSplit.targetMuscles : undefined
      }
    });
  },

  completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => {
    const { activeSession, sessionStartTime } = get();
    const endTime = new Date();
    const duration = sessionStartTime ? Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000) : 0;

    const completedSession: WorkoutSession = {
      ...activeSession!,
      ...sessionData,
      endTime,
      duration
    };

    // ✅ NEW: Auto-update project progress if workout has project context
    if (completedSession.projectContext) {
      console.log('🔄 Auto-updating project progress for:', completedSession.projectContext);
      updateProjectProgressFromWorkout(completedSession.projectContext);
    }

    set({
      currentStep: 'completion',
      activeSession: completedSession
    });

    console.log('✅ Workout completed:', {
      type: completedSession.type,
      duration: completedSession.duration,
      hasProjectContext: !!completedSession.projectContext
    });
  },

  resetWorkoutSession: () => {
    set({
      currentStep: 'type-selection',
      workoutType: null,
      selectedExercises: [],
      selectedGymSplit: null,
      projectContext: null,
      activeSession: null,
      sessionStartTime: null
    });
  }
}));