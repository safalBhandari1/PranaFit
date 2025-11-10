// import { create } from 'zustand';
// import { WorkoutType, WorkoutStep, Exercise, WorkoutSession, GymWorkoutSplit } from '../types/workout';

// interface WorkoutSessionStore {
//   // Modal State
//   isModalOpen: boolean;
//   currentStep: WorkoutStep;
//   workoutType: WorkoutType | null;
//   selectedExercises: Exercise[];
//   selectedGymSplit: GymWorkoutSplit | null;
  
//   // Project Context (when initiated from project)
//   projectContext: {
//     projectId: string;
//     projectName: string;
//     dayIndex: number;
//     dayName: string;
//   } | null;

//   // Active Session
//   activeSession: WorkoutSession | null;
//   sessionStartTime: Date | null;

//   // Actions
//   openWorkoutModal: (type?: WorkoutType, projectContext?: any) => void;
//   closeWorkoutModal: () => void;
//   setWorkoutType: (type: WorkoutType) => void;
//   setCurrentStep: (step: WorkoutStep) => void;
//   setSelectedExercises: (exercises: Exercise[]) => void;
//   setSelectedGymSplit: (split: GymWorkoutSplit) => void;
//   startWorkoutSession: () => void;
//   completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => void;
//   resetWorkoutSession: () => void;
// }

// export const useWorkoutStore = create<WorkoutSessionStore>((set, get) => ({
//   // Initial State
//   isModalOpen: false,
//   currentStep: 'type-selection',
//   workoutType: null,
//   selectedExercises: [],
//   selectedGymSplit: null,
//   projectContext: null,
//   activeSession: null,
//   sessionStartTime: null,

//   // Actions
//   openWorkoutModal: (type?: WorkoutType, projectContext?: any) => {
//     set({
//       isModalOpen: true,
//       currentStep: type ? 'exercise-selection' : 'type-selection',
//       workoutType: type || null,
//       projectContext: projectContext || null,
//       selectedExercises: [],
//       selectedGymSplit: null
//     });
//   },

//   closeWorkoutModal: () => {
//     set({
//       isModalOpen: false,
//       currentStep: 'type-selection',
//       workoutType: null,
//       selectedExercises: [],
//       selectedGymSplit: null,
//       projectContext: null,
//       activeSession: null,
//       sessionStartTime: null
//     });
//   },

//   setWorkoutType: (type: WorkoutType) => {
//     const nextStep = type === WorkoutType.GYM ? 'gym-split-selection' : 'exercise-selection';
//     set({ 
//       workoutType: type,
//       currentStep: nextStep
//     });
//   },

//   setCurrentStep: (step: WorkoutStep) => {
//     set({ currentStep: step });
//   },

//   setSelectedExercises: (exercises: Exercise[]) => {
//     set({ selectedExercises: exercises });
//   },

//   setSelectedGymSplit: (split: GymWorkoutSplit) => {
//     set({ 
//       selectedGymSplit: split,
//       currentStep: 'exercise-selection'
//     });
//   },

//   startWorkoutSession: () => {
//     const { workoutType, selectedExercises, projectContext } = get();
//     const startTime = new Date();
    
//     set({
//       currentStep: 'active-session',
//       sessionStartTime: startTime,
//       activeSession: {
//         id: `session_${Date.now()}`,
//         type: workoutType!,
//         exercises: selectedExercises,
//         startTime,
//         duration: 0,
//         projectContext: projectContext || undefined
//       }
//     });
//   },

//   completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => {
//     const { activeSession, sessionStartTime } = get();
//     const endTime = new Date();
//     const duration = sessionStartTime ? Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000) : 0;

//     const completedSession: WorkoutSession = {
//       ...activeSession!,
//       ...sessionData,
//       endTime,
//       duration
//     };

//     set({
//       currentStep: 'completion',
//       activeSession: completedSession
//     });

//     // Here we'll later update global stats
//   },

//   resetWorkoutSession: () => {
//     set({
//       currentStep: 'type-selection',
//       workoutType: null,
//       selectedExercises: [],
//       selectedGymSplit: null,
//       projectContext: null,
//       activeSession: null,
//       sessionStartTime: null
//     });
//   }
// }));

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
  openWorkoutModal: (type?: WorkoutType, projectContext?: any) => void;
  closeWorkoutModal: () => void;
  setWorkoutType: (type: WorkoutType) => void;
  setCurrentStep: (step: WorkoutStep) => void;
  setSelectedExercises: (exercises: Exercise[]) => void;
  setSelectedGymSplit: (split: GymWorkoutSplit) => void;
  startWorkoutSession: () => void;
  completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => void;
  resetWorkoutSession: () => void;
}

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
  openWorkoutModal: (type?: WorkoutType, projectContext?: any) => {
    console.log('🟢 useWorkoutStore: openWorkoutModal called with type:', type);

    const initialState = {
      isModalOpen: true,
      projectContext: projectContext || null,
      selectedExercises: [],
      selectedGymSplit: null,
      activeSession: null,
      sessionStartTime: null
    };

    if (type === WorkoutType.GYM) {
      // For Gym, go directly to split selection
      set({
        ...initialState,
        workoutType: type,
        currentStep: 'gym-split-selection'
      });
    } else if (type) {
      // For other types, go to exercise selection
      set({
        ...initialState,
        workoutType: type,
        currentStep: 'exercise-selection'
      });
    } else {
      // No type specified, start with type selection
      set({
        ...initialState,
        currentStep: 'type-selection'
      });
    }
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

    set({
      currentStep: 'completion',
      activeSession: completedSession
    });

    // Here we'll later update global stats
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