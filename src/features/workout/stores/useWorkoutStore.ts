

// import { create } from 'zustand';
// import { WorkoutType, WorkoutStep, Exercise, WorkoutSession, GymWorkoutSplit, GymSplitType, EnhancedWorkoutSession, WorkoutStats, PersonalRecord, WeeklyFrequency, WorkoutExercise, StructuredExercise, CardioMetrics } from '../types/workout';
// import { workoutRepository } from '../../../shared/services/repositories/WorkoutRepository';
// import { UserFriendlyError, handleFirebaseError } from '../../../shared/utils/errorHandler';

// // ✅ INDUSTRY STANDARD: Safe user ID helper with proper error handling
// const getCurrentUserId = (): string => {
//   try {
//     const { useAppStore } = require('../../../shared/stores/useAppStore');
//     const user = useAppStore.getState().user;
    
//     if (!user?.uid) {
//       throw new UserFriendlyError(
//         'No user ID available',
//         'Please sign in to track workouts',
//         'AUTH_REQUIRED',
//         false
//       );
//     }
    
//     return user.uid;
//   } catch (error: any) {
//     if (error instanceof UserFriendlyError) throw error;
//     throw new UserFriendlyError(
//       'Authentication error',
//       'Please sign in to continue',
//       'AUTH_ERROR',
//       false
//     );
//   }
// };

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

//   // 🚀 NEW: Tracking data state
//   gymExercises?: WorkoutExercise[];
//   structuredExercises?: StructuredExercise[];
//   cardioMetrics?: CardioMetrics;

//   // Workout History & Analytics - 🚀 ENHANCED
//   recentWorkouts: EnhancedWorkoutSession[];
//   workoutHistory: EnhancedWorkoutSession[];
//   workoutStats: WorkoutStats | null;
//   personalRecords: PersonalRecord[];
//   weeklyFrequency: WeeklyFrequency[];
//   isLoading: boolean;
//   isStatsLoading: boolean;

//   // Actions
//   openWorkoutModal: (type: WorkoutType, options?: WorkoutModalOptions) => void;
//   closeWorkoutModal: () => void;
//   setWorkoutType: (type: WorkoutType) => void;
//   setCurrentStep: (step: WorkoutStep) => void;
//   setSelectedExercises: (exercises: Exercise[]) => void;
//   setSelectedGymSplit: (split: GymWorkoutSplit) => void;
//   startWorkoutSession: () => void;
//   completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => Promise<void>;
//   resetWorkoutSession: () => void;
//   loadUserWorkouts: (userId: string) => Promise<void>;

//   // 🚀 NEW: Enhanced actions with optimistic updates
//   createWorkoutSession: (sessionData: Omit<WorkoutSession, 'id'>) => Promise<string>;
//   saveWorkoutSession: (session: WorkoutSession) => Promise<void>;
//   deleteWorkoutSession: (sessionId: string) => Promise<void>;
  
//   // 🚀 NEW: Analytics actions
//   loadWorkoutStats: (userId: string) => Promise<void>;
//   loadPersonalRecords: (userId: string) => Promise<void>;
//   loadWeeklyFrequency: (userId: string, weeks?: number) => Promise<void>;
//   loadWorkoutHistory: (userId: string, limit?: number) => Promise<void>;

//   // 🚀 NEW: Tracking data setters
//   setGymExercises: (exercises: WorkoutExercise[]) => void;
//   setStructuredExercises: (exercises: StructuredExercise[]) => void;
//   setCardioMetrics: (metrics: CardioMetrics) => void;
// }

// interface WorkoutModalOptions {
//   projectContext?: {
//     projectId: string;
//     projectName: string;
//     dayIndex: number;
//     dayName: string;
//   };
//   preSelectedExercises?: Exercise[];
//   customMuscleGroups?: string[];
// }

// // Helper to determine initial step based on workout type and options
// const getInitialStep = (workoutType: WorkoutType, options?: WorkoutModalOptions): WorkoutStep => {
//   const hasPreSelectedExercises = options?.preSelectedExercises && options.preSelectedExercises.length > 0;
//   const hasProjectContext = !!options?.projectContext;
  
//   console.log('🔍 DEBUG: getInitialStep with context');
//   console.log('Workout type:', workoutType);
//   console.log('Has pre-selected exercises:', hasPreSelectedExercises);
//   console.log('Has project context:', hasProjectContext);
  
//   if (workoutType === WorkoutType.GYM) {
//     if (hasProjectContext && hasPreSelectedExercises) {
//       console.log('🎯 Gym project: Going to exercise selection to choose from muscle groups');
//       return 'exercise-selection';
//     } else if (hasPreSelectedExercises) {
//       console.log('🎯 Direct gym workout: Going to active session');
//       return 'active-session';
//     } else if (hasProjectContext) {
//       console.log('🎯 Gym project without exercises: Going to exercise selection');
//       return 'exercise-selection';
//     } else {
//       console.log('🎯 Gym workout: Going to gym split selection');
//       return 'gym-split-selection';
//     }
//   } else if (
//     workoutType === WorkoutType.YOGA || 
//     workoutType === WorkoutType.CALISTHENICS
//   ) {
//     const step = hasPreSelectedExercises ? 'active-session' : 'exercise-selection';
//     console.log(`🎯 Structured workout (${workoutType}): Going to ${step}`);
//     return step;
//   } else {
//     console.log('🎯 Cardio workout: Going to active session');
//     return 'active-session';
//   }
// };

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
  
//   // 🚀 NEW: Tracking data state
//   gymExercises: undefined,
//   structuredExercises: undefined,
//   cardioMetrics: undefined,
  
//   // 🚀 ENHANCED: Workout History & Analytics
//   recentWorkouts: [],
//   workoutHistory: [],
//   workoutStats: null,
//   personalRecords: [],
//   weeklyFrequency: [],
//   isLoading: false,
//   isStatsLoading: false,

//   // Actions
//   openWorkoutModal: (type: WorkoutType, options?: WorkoutModalOptions) => {
//     console.log('🟢 useWorkoutStore: openWorkoutModal called with type:', type, 'options:', options);

//     const initialStep = getInitialStep(type, options);

//     const initialState = {
//       isModalOpen: true,
//       workoutType: type,
//       currentStep: initialStep,
//       projectContext: options?.projectContext || null,
//       selectedExercises: options?.preSelectedExercises || [],
//       selectedGymSplit: null,
//       activeSession: null,
//       sessionStartTime: null,
//       // 🚀 NEW: Reset tracking data
//       gymExercises: undefined,
//       structuredExercises: undefined,
//       cardioMetrics: undefined
//     };

//     // If it's a gym workout with custom muscle groups, set up the split
//     if (type === WorkoutType.GYM && options?.customMuscleGroups && options.customMuscleGroups.length > 0) {
//       initialState.selectedGymSplit = {
//         id: GymSplitType.MUSCLE_GROUP,
//         name: `${options.customMuscleGroups.join(' + ')} Day`,
//         targetMuscles: options.customMuscleGroups,
//         suggestedExercises: []
//       };
//     }

//     set(initialState);

//     console.log('🎯 Workout modal opened with:', {
//       type,
//       initialStep,
//       hasProjectContext: !!options?.projectContext,
//       exerciseCount: options?.preSelectedExercises?.length || 0
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
//       sessionStartTime: null,
//       // 🚀 NEW: Reset tracking data
//       gymExercises: undefined,
//       structuredExercises: undefined,
//       cardioMetrics: undefined
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

//   // 🚀 NEW: Tracking data setters
//   setGymExercises: (exercises: WorkoutExercise[]) => {
//     set({ gymExercises: exercises });
//   },

//   setStructuredExercises: (exercises: StructuredExercise[]) => {
//     set({ structuredExercises: exercises });
//   },

//   setCardioMetrics: (metrics: CardioMetrics) => {
//     set({ cardioMetrics: metrics });
//   },

//   startWorkoutSession: () => {
//     const { workoutType, selectedExercises, projectContext, selectedGymSplit } = get();
//     const startTime = new Date();
    
//     // ✅ INDUSTRY STANDARD: Ensure project context is preserved
//     const cleanProjectContext = projectContext ? {
//       projectId: projectContext.projectId,
//       projectName: projectContext.projectName,
//       dayIndex: projectContext.dayIndex,
//       dayName: projectContext.dayName
//     } : undefined;
    
//     set({
//       currentStep: 'active-session',
//       sessionStartTime: startTime,
//       activeSession: {
//         id: `session_${Date.now()}`,
//         userId: getCurrentUserId(), // 🚀 FIX: Add userId
//         type: workoutType!,
//         exercises: selectedExercises,
//         startTime,
//         duration: 0,
//         completed: false, // 🚀 FIX: Add completed status
//         projectContext: cleanProjectContext,
//         gymSplitType: selectedGymSplit?.id,
//         customMuscleGroups: selectedGymSplit?.id === GymSplitType.MUSCLE_GROUP ? selectedGymSplit.targetMuscles : undefined
//       }
//     });
//   },

//   // 🚀 CRITICAL FIX: Enhanced completeWorkoutSession with tracking data capture
//   completeWorkoutSession: async (sessionData: Partial<WorkoutSession>) => {
//     try {
//       const { activeSession, sessionStartTime, workoutType, projectContext, gymExercises, structuredExercises, cardioMetrics } = get();
//       const endTime = new Date();
//       const duration = sessionStartTime ? Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000) : 0;

//       // ✅ INDUSTRY STANDARD: Get user ID safely
//       const userId = getCurrentUserId();

//       console.log('🔍 COMPLETE WORKOUT DEBUG:');
//       console.log('Active Session:', {
//         type: activeSession?.type,
//         projectContext: activeSession?.projectContext,
//         id: activeSession?.id
//       });
//       console.log('Tracking Data Available:', {
//         gymExercises: gymExercises?.length || 0,
//         structuredExercises: structuredExercises?.length || 0,
//         cardioMetrics: !!cardioMetrics
//       });

//       // ✅ CRITICAL FIX: Create base session with proper typing
//       const baseSession: WorkoutSession = {
//         // ✅ CORE IDENTIFIERS
//         id: activeSession?.id || `session_${Date.now()}`,
//         userId: userId,
//         type: activeSession?.type || workoutType || WorkoutType.GYM,
//         completed: true,
        
//         // ✅ WORKOUT CONTENT
//         exercises: activeSession?.exercises || [],
//         startTime: activeSession?.startTime || new Date(),
//         endTime,
//         duration,
        
//         // ✅ CONTEXT DATA
//         projectContext: activeSession?.projectContext || projectContext || undefined,
//         gymSplitType: activeSession?.gymSplitType,
//         customMuscleGroups: activeSession?.customMuscleGroups,

//         // ✅ PERFORMANCE METRICS (will be merged with sessionData)
//         calories: activeSession?.calories,
//         notes: activeSession?.notes,
//         distance: activeSession?.distance,
//         elevation: activeSession?.elevation,
//         pace: activeSession?.pace,
//         caloriesBurned: activeSession?.caloriesBurned,
//         intensity: activeSession?.intensity,

//         // 🚀 NEW: Capture tracking data if available
//         trackingData: gymExercises || structuredExercises || undefined,
//         cardioMetrics: cardioMetrics || undefined,

//         // 🚀 NEW: Calculate enhanced metrics if tracking data available
//         totalVolume: gymExercises ? gymExercises.reduce((total, ex) => total + ex.volume, 0) : undefined,
//         personalRecords: gymExercises ? extractPersonalRecords(gymExercises) : undefined,
//       };

//       console.log('🎯 Base Session (from activeSession):', {
//         type: baseSession.type,
//         hasProjectContext: !!baseSession.projectContext,
//         projectContext: baseSession.projectContext,
//         userId: baseSession.userId,
//         completed: baseSession.completed,
//         hasTrackingData: !!baseSession.trackingData,
//         hasCardioMetrics: !!baseSession.cardioMetrics
//       });

//       // ✅ THEN merge sessionData (component data) - but PROTECT critical fields
//       const completedSession: WorkoutSession = {
//         ...baseSession, // ✅ BASE DATA FIRST (activeSession + tracking)
//         ...sessionData, // ✅ COMPONENT DATA SECOND (can add fields, but not override critical ones)
        
//         // ✅ CRITICAL: RE-APPLY protected fields to ensure they don't get overridden
//         type: baseSession.type, // Protect workout type
//         projectContext: baseSession.projectContext, // Protect project context
//         id: baseSession.id, // Protect ID
//         userId: baseSession.userId, // Protect user ID
//         exercises: baseSession.exercises, // Protect exercises
//         startTime: baseSession.startTime, // Protect start time
//         completed: baseSession.completed, // Protect completion status
//         // 🚀 PROTECT tracking data
//         trackingData: baseSession.trackingData,
//         cardioMetrics: baseSession.cardioMetrics,
//         totalVolume: baseSession.totalVolume,
//         personalRecords: baseSession.personalRecords,
//       };

//       console.log('🎯 Final Completed Session:', {
//         type: completedSession.type,
//         hasProjectContext: !!completedSession.projectContext,
//         projectContext: completedSession.projectContext,
//         userId: completedSession.userId,
//         completed: completedSession.completed,
//         duration: completedSession.duration,
//         hasTrackingData: !!completedSession.trackingData,
//         hasCardioMetrics: !!completedSession.cardioMetrics
//       });

//       // 🚀 ENHANCED: Use optimistic create pattern
//       const savedSession = await get().createWorkoutSession(completedSession);

//       // 🚀 CRITICAL FIX: Direct project update instead of complex events
//       if (completedSession.projectContext) {
//         console.log('🎯 Direct project update for workout completion:', completedSession.projectContext);
        
//         try {
//           // Import project store directly
//           const { useProjectStore } = require('../../../features/projects/stores/useProjectStore');
//           const projectStore = useProjectStore.getState();
          
//           // Use the direct method to update project
//           await projectStore.handleWorkoutCompletion(
//             completedSession.projectContext.projectId,
//             completedSession.projectContext.dayIndex
//           );
          
//           console.log('✅ Project updated successfully via direct method');
//         } catch (projectError: any) {
//           console.error('❌ Failed to update project via direct method:', projectError);
//           // Don't throw - project update failure shouldn't fail the workout completion
//         }
//       } else {
//         console.log('ℹ️ No project context for workout completion');
//       }

//       set({
//         currentStep: 'completion',
//         activeSession: completedSession,
//         // 🚀 NEW: Reset tracking data after completion
//         gymExercises: undefined,
//         structuredExercises: undefined,
//         cardioMetrics: undefined
//       });

//       console.log('✅ Workout completed successfully:', {
//         type: completedSession.type,
//         duration: completedSession.duration,
//         hasProjectContext: !!completedSession.projectContext,
//         userId: completedSession.userId,
//         trackingDataCaptured: !!completedSession.trackingData || !!completedSession.cardioMetrics
//       });
//     } catch (error) {
//       console.error('❌ Failed to complete workout session:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   resetWorkoutSession: () => {
//     set({
//       currentStep: 'type-selection',
//       workoutType: null,
//       selectedExercises: [],
//       selectedGymSplit: null,
//       projectContext: null,
//       activeSession: null,
//       sessionStartTime: null,
//       // 🚀 NEW: Reset tracking data
//       gymExercises: undefined,
//       structuredExercises: undefined,
//       cardioMetrics: undefined
//     });
//   },

//   // ✅ INDUSTRY STANDARD: Load workouts with proper error handling
//   loadUserWorkouts: async (userId: string) => {
//     set({ isLoading: true });
//     try {
//       const workouts = await workoutRepository.getUserWorkouts(userId);
//       console.log('✅ Loaded workouts from Firebase:', workouts.length);
      
//       // 🚀 ENHANCED: Convert to EnhancedWorkoutSession with status tracking
//       const enhancedWorkouts: EnhancedWorkoutSession[] = workouts.map(workout => ({
//         ...workout,
//         _status: 'synced' as const
//       }));
      
//       set({ 
//         recentWorkouts: enhancedWorkouts.slice(0, 10),
//         workoutHistory: enhancedWorkouts,
//         isLoading: false 
//       });
//     } catch (error) {
//       console.error('❌ Failed to load workouts from Firebase:', error);
//       set({ 
//         recentWorkouts: [],
//         workoutHistory: [],
//         isLoading: false 
//       });
//       throw error;
//     }
//   },

//   // 🚀 NEW: Optimistic workout creation matching project patterns
//   createWorkoutSession: async (sessionData: Omit<WorkoutSession, 'id'>): Promise<string> => {
//     const userId = getCurrentUserId();
    
//     // 🎯 STEP 1: Prepare data WITHOUT ID (Firebase will generate)
//     const sessionWithoutId = {
//       ...sessionData,
//       userId: userId,
//       _createdAt: new Date(),
//       _updatedAt: new Date()
//     };

//     // 🎯 STEP 2: Generate temporary ID for optimistic update
//     const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     const optimisticSession: EnhancedWorkoutSession = {
//       ...sessionWithoutId,
//       id: tempId,
//       _status: 'optimistic' as const,
//       _optimisticId: tempId
//     };

//     // 🎯 STEP 3: Update UI optimistically (immediate feedback)
//     set((state) => ({
//       recentWorkouts: [optimisticSession, ...state.recentWorkouts.slice(0, 9)],
//       workoutHistory: [optimisticSession, ...state.workoutHistory],
//       lastUpdated: Date.now()
//     }));

//     try {
//       // 🎯 STEP 4: Save to Firebase (with retry logic built into repository)
//       const firebaseId = await workoutRepository.create(sessionWithoutId);
//       console.log('✅ Workout saved to Firebase with ID:', firebaseId);
      
//       // 🎯 STEP 5: Replace temporary ID with real Firebase ID
//       set((state) => ({
//         recentWorkouts: state.recentWorkouts.map(session =>
//           session.id === tempId 
//             ? { ...session, id: firebaseId, _status: 'synced' as const, _optimisticId: undefined }
//             : session
//         ),
//         workoutHistory: state.workoutHistory.map(session =>
//           session.id === tempId 
//             ? { ...session, id: firebaseId, _status: 'synced' as const, _optimisticId: undefined }
//             : session
//         ),
//         lastUpdated: Date.now()
//       }));

//       return firebaseId;

//     } catch (error: any) {
//       console.error('❌ Failed to create workout in Firebase:', error);
      
//       // 🎯 STEP 6: Rollback optimistic update on failure
//       set((state) => ({
//         recentWorkouts: state.recentWorkouts.filter(session => session.id !== tempId),
//         workoutHistory: state.workoutHistory.filter(session => session.id !== tempId),
//         lastUpdated: Date.now()
//       }));

//       // Convert to user-friendly error
//       const friendlyError = handleFirebaseError(error);
//       throw friendlyError;
//     }
//   },

//   // 🚀 NEW: Enhanced workout saving with optimistic updates
//   saveWorkoutSession: async (session: WorkoutSession) => {
//     try {
//       // 🎯 Optimistic update
//       set((state) => ({
//         workoutHistory: state.workoutHistory.map(s =>
//           s.id === session.id 
//             ? { ...s, ...session, _updatedAt: new Date(), _status: 'optimistic' as const }
//             : s
//         ),
//         lastUpdated: Date.now()
//       }));

//       await workoutRepository.update(session.id, session);
//       console.log('✅ Workout updated in Firebase:', session.id);
      
//       // 🎯 Mark as synced
//       set((state) => ({
//         workoutHistory: state.workoutHistory.map(s =>
//           s.id === session.id 
//             ? { ...s, _status: 'synced' as const }
//             : s
//         ),
//         lastUpdated: Date.now()
//       }));
//     } catch (error: any) {
//       console.error('❌ Failed to update workout in Firebase:', error);
      
//       // 🎯 Rollback on failure
//       const { workoutHistory } = get();
//       const originalSession = workoutHistory.find(s => s.id === session.id && s._status !== 'optimistic');
//       if (originalSession) {
//         set((state) => ({
//           workoutHistory: state.workoutHistory.map(s =>
//             s.id === session.id ? originalSession : s
//           ),
//           lastUpdated: Date.now()
//         }));
//       }

//       throw handleFirebaseError(error);
//     }
//   },

//   // 🚀 NEW: Workout deletion with optimistic updates
//   deleteWorkoutSession: async (sessionId: string) => {
//     try {
//       // 🎯 Store session for potential rollback
//       const { workoutHistory } = get();
//       const sessionToDelete = workoutHistory.find(s => s.id === sessionId);
      
//       // 🎯 Optimistic removal
//       set((state) => ({
//         workoutHistory: state.workoutHistory.filter(session => session.id !== sessionId),
//         recentWorkouts: state.recentWorkouts.filter(session => session.id !== sessionId),
//         lastUpdated: Date.now()
//       }));

//       await workoutRepository.delete(sessionId);
//       console.log('✅ Workout deleted from Firebase:', sessionId);
      
//     } catch (error: any) {
//       console.error('❌ Failed to delete workout from Firebase:', error);
      
//       // 🎯 Rollback on failure
//       const { workoutHistory } = get();
//       const originalSession = workoutHistory.find(s => s.id === sessionId);
//       if (originalSession) {
//         set((state) => ({
//           workoutHistory: [...state.workoutHistory, originalSession],
//           recentWorkouts: [...state.recentWorkouts, originalSession].slice(0, 10),
//           lastUpdated: Date.now()
//         }));
//       }

//       throw handleFirebaseError(error);
//     }
//   },

//   // 🚀 NEW: Analytics data loading
//   loadWorkoutStats: async (userId: string) => {
//     set({ isStatsLoading: true });
//     try {
//       const stats = await workoutRepository.getWorkoutStats(userId);
//       console.log('✅ Loaded workout stats');
//       set({ 
//         workoutStats: stats,
//         isStatsLoading: false 
//       });
//     } catch (error) {
//       console.error('❌ Failed to load workout stats:', error);
//       set({ 
//         workoutStats: null,
//         isStatsLoading: false 
//       });
//     }
//   },

//   loadPersonalRecords: async (userId: string) => {
//     try {
//       const records = await workoutRepository.getPersonalRecords(userId);
//       console.log('✅ Loaded personal records:', records.length);
//       set({ personalRecords: records });
//     } catch (error) {
//       console.error('❌ Failed to load personal records:', error);
//       set({ personalRecords: [] });
//     }
//   },

//   loadWeeklyFrequency: async (userId: string, weeks: number = 12) => {
//     try {
//       const frequency = await workoutRepository.getWeeklyFrequency(userId, weeks);
//       console.log('✅ Loaded weekly frequency data');
//       set({ weeklyFrequency: frequency });
//     } catch (error) {
//       console.error('❌ Failed to load weekly frequency:', error);
//       set({ weeklyFrequency: [] });
//     }
//   },

//   loadWorkoutHistory: async (userId: string, limit?: number) => {
//     set({ isLoading: true });
//     try {
//       const workouts = limit 
//         ? await workoutRepository.getRecentWorkouts(userId, limit)
//         : await workoutRepository.getUserWorkouts(userId);
      
//       const enhancedWorkouts: EnhancedWorkoutSession[] = workouts.map(workout => ({
//         ...workout,
//         _status: 'synced' as const
//       }));
      
//       console.log(`✅ Loaded workout history: ${enhancedWorkouts.length} workouts`);
//       set({ 
//         workoutHistory: enhancedWorkouts,
//         isLoading: false 
//       });
//     } catch (error) {
//       console.error('❌ Failed to load workout history:', error);
//       set({ 
//         workoutHistory: [],
//         isLoading: false 
//       });
//     }
//   }
// }));

// // 🚀 NEW: Helper function to extract personal records from gym exercises
// const extractPersonalRecords = (exercises: WorkoutExercise[]): PersonalRecord[] => {
//   const records: PersonalRecord[] = [];
  
//   exercises.forEach(exercise => {
//     exercise.sets.forEach(set => {
//       if (set.weight > 0 && set.reps > 0) {
//         records.push({
//           id: `pr-${exercise.id}-${set.setId}`,
//           exerciseId: exercise.exerciseId,
//           exerciseName: exercise.name,
//           recordType: 'weight',
//           value: set.weight,
//           date: new Date(),
//           workoutId: '', // Will be filled later
//           workoutType: WorkoutType.GYM
//         });
//       }
//     });
//   });
  
//   return records;
// };


import { create } from 'zustand';
import { 
  WorkoutType, 
  WorkoutStep, 
  Exercise, 
  WorkoutSession, 
  GymWorkoutSplit, 
  GymSplitType, 
  EnhancedWorkoutSession, 
  WorkoutStats, 
  PersonalRecord, 
  WeeklyFrequency, 
  WorkoutExercise, 
  StructuredExercise, 
  CardioMetrics
} from '../types/workout';
import { workoutRepository } from '../../../shared/services/repositories/WorkoutRepository';
import { UserFriendlyError, handleFirebaseError } from '../../../shared/utils/errorHandler';
import { EnhancedWorkoutStats } from '../../../shared/types/domain/analytics';

// ✅ INDUSTRY STANDARD: Safe user ID helper with proper error handling
const getCurrentUserId = (): string => {
  try {
    const { useAppStore } = require('../../../shared/stores/useAppStore');
    const user = useAppStore.getState().user;
    
    if (!user?.uid) {
      throw new UserFriendlyError(
        'No user ID available',
        'Please sign in to track workouts',
        'AUTH_REQUIRED',
        false
      );
    }
    
    return user.uid;
  } catch (error: any) {
    if (error instanceof UserFriendlyError) throw error;
    throw new UserFriendlyError(
      'Authentication error',
      'Please sign in to continue',
      'AUTH_ERROR',
      false
    );
  }
};

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

  // Tracking data state
  gymExercises?: WorkoutExercise[];
  structuredExercises?: StructuredExercise[];
  cardioMetrics?: CardioMetrics;

  // Workout History & Analytics
  recentWorkouts: EnhancedWorkoutSession[];
  workoutHistory: EnhancedWorkoutSession[];
  workoutStats: WorkoutStats | null;
  personalRecords: PersonalRecord[];
  weeklyFrequency: WeeklyFrequency[];
  isLoading: boolean;
  isStatsLoading: boolean;

  // 🚀 NEW: Enhanced analytics state
  enhancedStats: EnhancedWorkoutStats | null;
  isEnhancedStatsLoading: boolean;

  // Actions
  openWorkoutModal: (type: WorkoutType, options?: WorkoutModalOptions) => void;
  closeWorkoutModal: () => void;
  setWorkoutType: (type: WorkoutType) => void;
  setCurrentStep: (step: WorkoutStep) => void;
  setSelectedExercises: (exercises: Exercise[]) => void;
  setSelectedGymSplit: (split: GymWorkoutSplit) => void;
  startWorkoutSession: () => void;
  completeWorkoutSession: (sessionData: Partial<WorkoutSession>) => Promise<void>;
  resetWorkoutSession: () => void;
  loadUserWorkouts: (userId: string) => Promise<void>;

  // Enhanced actions with optimistic updates
  createWorkoutSession: (sessionData: Omit<WorkoutSession, 'id'>) => Promise<string>;
  saveWorkoutSession: (session: WorkoutSession) => Promise<void>;
  deleteWorkoutSession: (sessionId: string) => Promise<void>;
  
  // Analytics actions
  loadWorkoutStats: (userId: string) => Promise<void>;
  loadPersonalRecords: (userId: string) => Promise<void>;
  loadWeeklyFrequency: (userId: string, weeks?: number) => Promise<void>;
  loadWorkoutHistory: (userId: string, limit?: number) => Promise<void>;

  // Tracking data setters
  setGymExercises: (exercises: WorkoutExercise[]) => void;
  setStructuredExercises: (exercises: StructuredExercise[]) => void;
  setCardioMetrics: (metrics: CardioMetrics) => void;

  // 🚀 NEW: Enhanced analytics actions
  loadEnhancedWorkoutStats: (userId: string) => Promise<void>;
  refreshEnhancedStats: (userId: string) => Promise<void>;
  clearEnhancedStats: () => void;
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

// Helper to determine initial step based on workout type and options
const getInitialStep = (workoutType: WorkoutType, options?: WorkoutModalOptions): WorkoutStep => {
  const hasPreSelectedExercises = options?.preSelectedExercises && options.preSelectedExercises.length > 0;
  const hasProjectContext = !!options?.projectContext;
  
  console.log('🔍 DEBUG: getInitialStep with context');
  console.log('Workout type:', workoutType);
  console.log('Has pre-selected exercises:', hasPreSelectedExercises);
  console.log('Has project context:', hasProjectContext);
  
  if (workoutType === WorkoutType.GYM) {
    if (hasProjectContext && hasPreSelectedExercises) {
      console.log('🎯 Gym project: Going to exercise selection to choose from muscle groups');
      return 'exercise-selection';
    } else if (hasPreSelectedExercises) {
      console.log('🎯 Direct gym workout: Going to active session');
      return 'active-session';
    } else if (hasProjectContext) {
      console.log('🎯 Gym project without exercises: Going to exercise selection');
      return 'exercise-selection';
    } else {
      console.log('🎯 Gym workout: Going to gym split selection');
      return 'gym-split-selection';
    }
  } else if (
    workoutType === WorkoutType.YOGA || 
    workoutType === WorkoutType.CALISTHENICS
  ) {
    const step = hasPreSelectedExercises ? 'active-session' : 'exercise-selection';
    console.log(`🎯 Structured workout (${workoutType}): Going to ${step}`);
    return step;
  } else {
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
  
  // Tracking data state
  gymExercises: undefined,
  structuredExercises: undefined,
  cardioMetrics: undefined,
  
  // Workout History & Analytics
  recentWorkouts: [],
  workoutHistory: [],
  workoutStats: null,
  personalRecords: [],
  weeklyFrequency: [],
  isLoading: false,
  isStatsLoading: false,

  // 🚀 NEW: Enhanced analytics state
  enhancedStats: null,
  isEnhancedStatsLoading: false,

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
      sessionStartTime: null,
      // Reset tracking data
      gymExercises: undefined,
      structuredExercises: undefined,
      cardioMetrics: undefined
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
      sessionStartTime: null,
      // Reset tracking data
      gymExercises: undefined,
      structuredExercises: undefined,
      cardioMetrics: undefined
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

  // Tracking data setters
  setGymExercises: (exercises: WorkoutExercise[]) => {
    set({ gymExercises: exercises });
  },

  setStructuredExercises: (exercises: StructuredExercise[]) => {
    set({ structuredExercises: exercises });
  },

  setCardioMetrics: (metrics: CardioMetrics) => {
    set({ cardioMetrics: metrics });
  },

  startWorkoutSession: () => {
    const { workoutType, selectedExercises, projectContext, selectedGymSplit } = get();
    const startTime = new Date();
    
    // ✅ INDUSTRY STANDARD: Ensure project context is preserved
    const cleanProjectContext = projectContext ? {
      projectId: projectContext.projectId,
      projectName: projectContext.projectName,
      dayIndex: projectContext.dayIndex,
      dayName: projectContext.dayName
    } : undefined;
    
    set({
      currentStep: 'active-session',
      sessionStartTime: startTime,
      activeSession: {
        id: `session_${Date.now()}`,
        userId: getCurrentUserId(), // 🚀 FIX: Add userId
        type: workoutType!,
        exercises: selectedExercises,
        startTime,
        duration: 0,
        completed: false, // 🚀 FIX: Add completed status
        projectContext: cleanProjectContext,
        gymSplitType: selectedGymSplit?.id,
        customMuscleGroups: selectedGymSplit?.id === GymSplitType.MUSCLE_GROUP ? selectedGymSplit.targetMuscles : undefined
      }
    });
  },

  // 🚀 CRITICAL FIX: Enhanced completeWorkoutSession with tracking data capture
  completeWorkoutSession: async (sessionData: Partial<WorkoutSession>) => {
    try {
      const { activeSession, sessionStartTime, workoutType, projectContext, gymExercises, structuredExercises, cardioMetrics } = get();
      const endTime = new Date();
      const duration = sessionStartTime ? Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000) : 0;

      // ✅ INDUSTRY STANDARD: Get user ID safely
      const userId = getCurrentUserId();

      console.log('🔍 COMPLETE WORKOUT DEBUG:');
      console.log('Active Session:', {
        type: activeSession?.type,
        projectContext: activeSession?.projectContext,
        id: activeSession?.id
      });
      console.log('Tracking Data Available:', {
        gymExercises: gymExercises?.length || 0,
        structuredExercises: structuredExercises?.length || 0,
        cardioMetrics: !!cardioMetrics
      });

      // ✅ CRITICAL FIX: Create base session with proper typing
      const baseSession: WorkoutSession = {
        // ✅ CORE IDENTIFIERS
        id: activeSession?.id || `session_${Date.now()}`,
        userId: userId,
        type: activeSession?.type || workoutType || WorkoutType.GYM,
        completed: true,
        
        // ✅ WORKOUT CONTENT
        exercises: activeSession?.exercises || [],
        startTime: activeSession?.startTime || new Date(),
        endTime,
        duration,
        
        // ✅ CONTEXT DATA
        projectContext: activeSession?.projectContext || projectContext || undefined,
        gymSplitType: activeSession?.gymSplitType,
        customMuscleGroups: activeSession?.customMuscleGroups,

        // ✅ PERFORMANCE METRICS (will be merged with sessionData)
        calories: activeSession?.calories,
        notes: activeSession?.notes,
        distance: activeSession?.distance,
        elevation: activeSession?.elevation,
        pace: activeSession?.pace,
        caloriesBurned: activeSession?.caloriesBurned,
        intensity: activeSession?.intensity,

        // 🚀 Capture tracking data if available
        trackingData: gymExercises || structuredExercises || undefined,
        cardioMetrics: cardioMetrics || undefined,

        // 🚀 Calculate enhanced metrics if tracking data available
        totalVolume: gymExercises ? gymExercises.reduce((total, ex) => total + ex.volume, 0) : undefined,
        personalRecords: gymExercises ? extractPersonalRecords(gymExercises) : undefined,
      };

      console.log('🎯 Base Session (from activeSession):', {
        type: baseSession.type,
        hasProjectContext: !!baseSession.projectContext,
        projectContext: baseSession.projectContext,
        userId: baseSession.userId,
        completed: baseSession.completed,
        hasTrackingData: !!baseSession.trackingData,
        hasCardioMetrics: !!baseSession.cardioMetrics
      });

      // ✅ THEN merge sessionData (component data) - but PROTECT critical fields
      const completedSession: WorkoutSession = {
        ...baseSession, // ✅ BASE DATA FIRST (activeSession + tracking)
        ...sessionData, // ✅ COMPONENT DATA SECOND (can add fields, but not override critical ones)
        
        // ✅ CRITICAL: RE-APPLY protected fields to ensure they don't get overridden
        type: baseSession.type, // Protect workout type
        projectContext: baseSession.projectContext, // Protect project context
        id: baseSession.id, // Protect ID
        userId: baseSession.userId, // Protect user ID
        exercises: baseSession.exercises, // Protect exercises
        startTime: baseSession.startTime, // Protect start time
        completed: baseSession.completed, // Protect completion status
        // 🚀 PROTECT tracking data
        trackingData: baseSession.trackingData,
        cardioMetrics: baseSession.cardioMetrics,
        totalVolume: baseSession.totalVolume,
        personalRecords: baseSession.personalRecords,
      };

      console.log('🎯 Final Completed Session:', {
        type: completedSession.type,
        hasProjectContext: !!completedSession.projectContext,
        projectContext: completedSession.projectContext,
        userId: completedSession.userId,
        completed: completedSession.completed,
        duration: completedSession.duration,
        hasTrackingData: !!completedSession.trackingData,
        hasCardioMetrics: !!completedSession.cardioMetrics
      });

      // 🚀 ENHANCED: Use optimistic create pattern
      const savedSession = await get().createWorkoutSession(completedSession);

      // 🚀 CRITICAL FIX: Direct project update instead of complex events
      if (completedSession.projectContext) {
        console.log('🎯 Direct project update for workout completion:', completedSession.projectContext);
        
        try {
          // Import project store directly
          const { useProjectStore } = require('../../../features/projects/stores/useProjectStore');
          const projectStore = useProjectStore.getState();
          
          // Use the direct method to update project
          await projectStore.handleWorkoutCompletion(
            completedSession.projectContext.projectId,
            completedSession.projectContext.dayIndex
          );
          
          console.log('✅ Project updated successfully via direct method');
        } catch (projectError: any) {
          console.error('❌ Failed to update project via direct method:', projectError);
          // Don't throw - project update failure shouldn't fail the workout completion
        }
      } else {
        console.log('ℹ️ No project context for workout completion');
      }

      set({
        currentStep: 'completion',
        activeSession: completedSession,
        // Reset tracking data after completion
        gymExercises: undefined,
        structuredExercises: undefined,
        cardioMetrics: undefined
      });

      console.log('✅ Workout completed successfully:', {
        type: completedSession.type,
        duration: completedSession.duration,
        hasProjectContext: !!completedSession.projectContext,
        userId: completedSession.userId,
        trackingDataCaptured: !!completedSession.trackingData || !!completedSession.cardioMetrics
      });

      // 🚀 NEW: Refresh enhanced stats after workout completion
      if (userId) {
        setTimeout(() => {
          get().refreshEnhancedStats(userId).catch(console.error);
        }, 1000); // Delay to ensure data is saved
      }
    } catch (error) {
      console.error('❌ Failed to complete workout session:', error);
      throw handleFirebaseError(error);
    }
  },

  resetWorkoutSession: () => {
    set({
      currentStep: 'type-selection',
      workoutType: null,
      selectedExercises: [],
      selectedGymSplit: null,
      projectContext: null,
      activeSession: null,
      sessionStartTime: null,
      // Reset tracking data
      gymExercises: undefined,
      structuredExercises: undefined,
      cardioMetrics: undefined
    });
  },

  // ✅ INDUSTRY STANDARD: Load workouts with proper error handling
  loadUserWorkouts: async (userId: string) => {
    set({ isLoading: true });
    try {
      const workouts = await workoutRepository.getUserWorkouts(userId);
      console.log('✅ Loaded workouts from Firebase:', workouts.length);
      
      // 🚀 ENHANCED: Convert to EnhancedWorkoutSession with status tracking
      const enhancedWorkouts: EnhancedWorkoutSession[] = workouts.map(workout => ({
        ...workout,
        _status: 'synced' as const
      }));
      
      set({ 
        recentWorkouts: enhancedWorkouts.slice(0, 10),
        workoutHistory: enhancedWorkouts,
        isLoading: false 
      });
    } catch (error) {
      console.error('❌ Failed to load workouts from Firebase:', error);
      set({ 
        recentWorkouts: [],
        workoutHistory: [],
        isLoading: false 
      });
      throw error;
    }
  },

  // 🚀 Optimistic workout creation matching project patterns
  createWorkoutSession: async (sessionData: Omit<WorkoutSession, 'id'>): Promise<string> => {
    const userId = getCurrentUserId();
    
    // 🎯 STEP 1: Prepare data WITHOUT ID (Firebase will generate)
    const sessionWithoutId = {
      ...sessionData,
      userId: userId,
      _createdAt: new Date(),
      _updatedAt: new Date()
    };

    // 🎯 STEP 2: Generate temporary ID for optimistic update
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const optimisticSession: EnhancedWorkoutSession = {
      ...sessionWithoutId,
      id: tempId,
      _status: 'optimistic' as const,
      _optimisticId: tempId
    };

    // 🎯 STEP 3: Update UI optimistically (immediate feedback)
    set((state) => ({
      recentWorkouts: [optimisticSession, ...state.recentWorkouts.slice(0, 9)],
      workoutHistory: [optimisticSession, ...state.workoutHistory],
      lastUpdated: Date.now()
    }));

    try {
      // 🎯 STEP 4: Save to Firebase (with retry logic built into repository)
      const firebaseId = await workoutRepository.create(sessionWithoutId);
      console.log('✅ Workout saved to Firebase with ID:', firebaseId);
      
      // 🎯 STEP 5: Replace temporary ID with real Firebase ID
      set((state) => ({
        recentWorkouts: state.recentWorkouts.map(session =>
          session.id === tempId 
            ? { ...session, id: firebaseId, _status: 'synced' as const, _optimisticId: undefined }
            : session
        ),
        workoutHistory: state.workoutHistory.map(session =>
          session.id === tempId 
            ? { ...session, id: firebaseId, _status: 'synced' as const, _optimisticId: undefined }
            : session
        ),
        lastUpdated: Date.now()
      }));

      return firebaseId;

    } catch (error: any) {
      console.error('❌ Failed to create workout in Firebase:', error);
      
      // 🎯 STEP 6: Rollback optimistic update on failure
      set((state) => ({
        recentWorkouts: state.recentWorkouts.filter(session => session.id !== tempId),
        workoutHistory: state.workoutHistory.filter(session => session.id !== tempId),
        lastUpdated: Date.now()
      }));

      // Convert to user-friendly error
      const friendlyError = handleFirebaseError(error);
      throw friendlyError;
    }
  },

  // 🚀 Enhanced workout saving with optimistic updates
  saveWorkoutSession: async (session: WorkoutSession) => {
    try {
      // 🎯 Optimistic update
      set((state) => ({
        workoutHistory: state.workoutHistory.map(s =>
          s.id === session.id 
            ? { ...s, ...session, _updatedAt: new Date(), _status: 'optimistic' as const }
            : s
        ),
        lastUpdated: Date.now()
      }));

      await workoutRepository.update(session.id, session);
      console.log('✅ Workout updated in Firebase:', session.id);
      
      // 🎯 Mark as synced
      set((state) => ({
        workoutHistory: state.workoutHistory.map(s =>
          s.id === session.id 
            ? { ...s, _status: 'synced' as const }
            : s
        ),
        lastUpdated: Date.now()
      }));
    } catch (error: any) {
      console.error('❌ Failed to update workout in Firebase:', error);
      
      // 🎯 Rollback on failure
      const { workoutHistory } = get();
      const originalSession = workoutHistory.find(s => s.id === session.id && s._status !== 'optimistic');
      if (originalSession) {
        set((state) => ({
          workoutHistory: state.workoutHistory.map(s =>
            s.id === session.id ? originalSession : s
          ),
          lastUpdated: Date.now()
        }));
      }

      throw handleFirebaseError(error);
    }
  },

  // 🚀 Workout deletion with optimistic updates
  deleteWorkoutSession: async (sessionId: string) => {
    try {
      // 🎯 Store session for potential rollback
      const { workoutHistory } = get();
      const sessionToDelete = workoutHistory.find(s => s.id === sessionId);
      
      // 🎯 Optimistic removal
      set((state) => ({
        workoutHistory: state.workoutHistory.filter(session => session.id !== sessionId),
        recentWorkouts: state.recentWorkouts.filter(session => session.id !== sessionId),
        lastUpdated: Date.now()
      }));

      await workoutRepository.delete(sessionId);
      console.log('✅ Workout deleted from Firebase:', sessionId);
      
    } catch (error: any) {
      console.error('❌ Failed to delete workout from Firebase:', error);
      
      // 🎯 Rollback on failure
      const { workoutHistory } = get();
      const originalSession = workoutHistory.find(s => s.id === sessionId);
      if (originalSession) {
        set((state) => ({
          workoutHistory: [...state.workoutHistory, originalSession],
          recentWorkouts: [...state.recentWorkouts, originalSession].slice(0, 10),
          lastUpdated: Date.now()
        }));
      }

      throw handleFirebaseError(error);
    }
  },

  // 🚀 Analytics data loading
  loadWorkoutStats: async (userId: string) => {
    set({ isStatsLoading: true });
    try {
      const stats = await workoutRepository.getWorkoutStats(userId);
      console.log('✅ Loaded workout stats');
      set({ 
        workoutStats: stats,
        isStatsLoading: false 
      });
    } catch (error) {
      console.error('❌ Failed to load workout stats:', error);
      set({ 
        workoutStats: null,
        isStatsLoading: false 
      });
    }
  },

  loadPersonalRecords: async (userId: string) => {
    try {
      const records = await workoutRepository.getPersonalRecords(userId);
      console.log('✅ Loaded personal records:', records.length);
      set({ personalRecords: records });
    } catch (error) {
      console.error('❌ Failed to load personal records:', error);
      set({ personalRecords: [] });
    }
  },

  loadWeeklyFrequency: async (userId: string, weeks: number = 12) => {
    try {
      const frequency = await workoutRepository.getWeeklyFrequency(userId, weeks);
      console.log('✅ Loaded weekly frequency data');
      set({ weeklyFrequency: frequency });
    } catch (error) {
      console.error('❌ Failed to load weekly frequency:', error);
      set({ weeklyFrequency: [] });
    }
  },

  loadWorkoutHistory: async (userId: string, limit?: number) => {
    set({ isLoading: true });
    try {
      const workouts = limit 
        ? await workoutRepository.getRecentWorkouts(userId, limit)
        : await workoutRepository.getUserWorkouts(userId);
      
      const enhancedWorkouts: EnhancedWorkoutSession[] = workouts.map(workout => ({
        ...workout,
        _status: 'synced' as const
      }));
      
      console.log(`✅ Loaded workout history: ${enhancedWorkouts.length} workouts`);
      set({ 
        workoutHistory: enhancedWorkouts,
        isLoading: false 
      });
    } catch (error) {
      console.error('❌ Failed to load workout history:', error);
      set({ 
        workoutHistory: [],
        isLoading: false 
      });
    }
  },

  // 🚀 NEW: Enhanced analytics methods for progress tab

  /**
   * Load enhanced workout stats with charts data for progress tab
   */
  loadEnhancedWorkoutStats: async (userId: string) => {
    set({ isEnhancedStatsLoading: true });
    try {
      const stats = await workoutRepository.getEnhancedWorkoutStats(userId);
      console.log('✅ Loaded enhanced workout stats with analytics');
      set({ 
        enhancedStats: stats,
        isEnhancedStatsLoading: false 
      });
    } catch (error) {
      console.error('❌ Failed to load enhanced workout stats:', error);
      set({ 
        enhancedStats: null,
        isEnhancedStatsLoading: false 
      });
    }
  },

  /**
   * Refresh enhanced stats (useful after workout completion)
   */
  refreshEnhancedStats: async (userId: string) => {
    try {
      console.log('🔄 Refreshing enhanced workout stats...');
      await get().loadEnhancedWorkoutStats(userId);
      console.log('✅ Enhanced stats refreshed');
    } catch (error) {
      console.error('❌ Failed to refresh enhanced stats:', error);
    }
  },

  /**
   * Clear enhanced stats (useful for logout or testing)
   */
  clearEnhancedStats: () => {
    set({ 
      enhancedStats: null,
      isEnhancedStatsLoading: false 
    });
  }
}));

// 🚀 Helper function to extract personal records from gym exercises
const extractPersonalRecords = (exercises: WorkoutExercise[]): PersonalRecord[] => {
  const records: PersonalRecord[] = [];
  
  exercises.forEach(exercise => {
    exercise.sets.forEach(set => {
      if (set.weight > 0 && set.reps > 0) {
        records.push({
          id: `pr-${exercise.id}-${set.setId}`,
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.name,
          recordType: 'weight',
          value: set.weight,
          date: new Date(),
          workoutId: '', // Will be filled later
          workoutType: WorkoutType.GYM,
          improvement: 0,
          previousValue: 0
        });
      }
    });
  });
  
  return records;
};