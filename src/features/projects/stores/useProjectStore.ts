
// // src/features/projects/stores/useProjectStore.ts
// import { create } from 'zustand';
// import { TrainingProject, ProjectTemplate, CreateProjectData, DailyWorkout, ProjectProgress } from '../types/project';
// import { generateSampleTemplates } from '../data/projectTemplate';
// import { projectRepository } from '../../../shared/services/repositories/ProjectRepository';
// import { UserFriendlyError, handleFirebaseError } from '../../../shared/utils/errorHandler';
// import { useNetworkStatus } from '../../../shared/hooks/useNetworkStatus';

// // 🚀 PRODUCTION READY: Safe user ID helper
// const getCurrentUserId = (): string => {
//   try {
//     const { useAppStore } = require('../../../shared/stores/useAppStore');
//     const user = useAppStore.getState().user;
    
//     if (!user?.uid) {
//       throw new UserFriendlyError(
//         'No user ID available',
//         'Please sign in to create projects',
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

// // 🚀 PRODUCTION READY: Enhanced project type with status tracking
// interface EnhancedTrainingProject extends TrainingProject {
//   _status?: 'optimistic' | 'synced' | 'offline' | 'error';
//   _optimisticId?: string; // For rollback tracking
// }

// interface ProjectStore {
//   // State
//   projects: EnhancedTrainingProject[];
//   activeProject: EnhancedTrainingProject | null;
//   templates: ProjectTemplate[];
//   isLoading: boolean;
//   lastUpdated: number;
  
//   // Optimistic update tracking
//   pendingOperations: Map<string, { type: string; data: any }>;

//   // Actions
//   setProjects: (projects: EnhancedTrainingProject[]) => void;
//   setActiveProject: (project: EnhancedTrainingProject | null) => void;
  
//   // 🚀 PRODUCTION READY: Enhanced CRUD operations
//   createProject: (projectData: CreateProjectData) => Promise<string>;
//   updateProject: (projectId: string, updates: Partial<TrainingProject>) => Promise<void>;
//   deleteProject: (projectId: string) => Promise<void>;
  
//   duplicateProject: (projectId: string) => Promise<string>;
//   addProjectFromTemplate: (template: ProjectTemplate) => Promise<string>;
//   markDayComplete: (projectId: string, dayIndex: number) => Promise<void>;
//   markDayIncomplete: (projectId: string, dayIndex: number) => Promise<void>;
//   loadTemplates: () => Promise<void>;
//   downloadTemplate: (templateId: string) => Promise<string>;
//   calculateProjectProgress: (project: TrainingProject) => ProjectProgress;
//   calculateDateRange: (duration: number) => { startDate: Date; endDate: Date };
  
//   // Data loading
//   loadUserProjects: (userId: string) => Promise<void>;
  
//   // 🚀 NEW: Optimistic update management
//   retryPendingOperations: () => Promise<void>;
//   clearPendingOperations: () => void;
// }

// export const useProjectStore = create<ProjectStore>((set, get) => ({
//   // Initial state
//   projects: [],
//   activeProject: null,
//   templates: [],
//   isLoading: false,
//   lastUpdated: Date.now(),
//   pendingOperations: new Map(),

//   setProjects: (projects) => set({ projects, lastUpdated: Date.now() }),
  
//   setActiveProject: (project) => set({ activeProject: project }),
  
//   // 🚀 PRODUCTION READY: Create project with optimistic updates
//   createProject: async (projectData: CreateProjectData): Promise<string> => {
//     const userId = getCurrentUserId();
//     const { startDate, endDate } = get().calculateDateRange(projectData.duration);
    
//     // 🎯 STEP 1: Prepare data WITHOUT ID (Firebase will generate)
//     const projectWithoutId = {
//       ...projectData,
//       userId: userId,
//       progress: {
//         completedDays: 0,
//         totalDays: projectData.duration,
//         completionPercentage: 0,
//         currentDayIndex: 0,
//         startedAt: new Date()
//       },
//       downloadCount: 0,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isActive: true,
//       startDate,
//       endDate,
//       difficulty: projectData.difficulty || 'intermediate'
//     };

//     // 🎯 STEP 2: Generate temporary ID for optimistic update
//     const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     const optimisticProject: EnhancedTrainingProject = {
//       ...projectWithoutId,
//       id: tempId,
//       _status: 'optimistic' as const,
//       _optimisticId: tempId
//     };

//     // 🎯 STEP 3: Update UI optimistically (immediate feedback)
//     set((state) => ({
//       projects: [optimisticProject, ...state.projects],
//       lastUpdated: Date.now()
//     }));

//     try {
//       // 🎯 STEP 4: Save to Firebase (with retry logic built into repository)
//       const firebaseId = await projectRepository.create(projectWithoutId);
//       console.log('✅ Project saved to Firebase with ID:', firebaseId);
      
//       // 🎯 STEP 5: Replace temporary ID with real Firebase ID
//       set((state) => ({
//         projects: state.projects.map(project =>
//           project.id === tempId 
//             ? { ...project, id: firebaseId, _status: 'synced' as const, _optimisticId: undefined }
//             : project
//         ),
//         lastUpdated: Date.now()
//       }));

//       return firebaseId; // 🎯 Return Firebase ID for immediate navigation

//     } catch (error: any) {
//       console.error('❌ Failed to create project in Firebase:', error);
      
//       // 🎯 STEP 6: Rollback optimistic update on failure
//       set((state) => ({
//         projects: state.projects.filter(project => project.id !== tempId),
//         lastUpdated: Date.now()
//       }));

//       // Convert to user-friendly error
//       const friendlyError = handleFirebaseError(error);
//       throw friendlyError;
//     }
//   },

//   updateProject: async (projectId: string, updates: Partial<TrainingProject>) => {
//     try {
//       // 🎯 Optimistic update
//       set((state) => ({
//         projects: state.projects.map(project =>
//           project.id === projectId 
//             ? { ...project, ...updates, updatedAt: new Date(), _status: 'optimistic' as const }
//             : project
//         ),
//         lastUpdated: Date.now()
//       }));

//       await projectRepository.update(projectId, updates);
//       console.log('✅ Project updated in Firebase:', projectId);
      
//       // 🎯 Mark as synced
//       set((state) => ({
//         projects: state.projects.map(project =>
//           project.id === projectId 
//             ? { ...project, _status: 'synced' as const }
//             : project
//         ),
//         lastUpdated: Date.now()
//       }));
//     } catch (error: any) {
//       console.error('❌ Failed to update project in Firebase:', error);
      
//       // 🎯 Rollback on failure
//       const { projects } = get();
//       const originalProject = projects.find(p => p.id === projectId && p._status !== 'optimistic');
//       if (originalProject) {
//         set((state) => ({
//           projects: state.projects.map(project =>
//             project.id === projectId ? originalProject : project
//           ),
//           lastUpdated: Date.now()
//         }));
//       }

//       throw handleFirebaseError(error);
//     }
//   },

//   deleteProject: async (projectId: string) => {
//     try {
//       // 🎯 Store project for potential rollback
//       const { projects } = get();
//       const projectToDelete = projects.find(p => p.id === projectId);
      
//       // 🎯 Optimistic removal
//       set((state) => ({
//         projects: state.projects.filter(project => project.id !== projectId),
//         lastUpdated: Date.now()
//       }));

//       await projectRepository.delete(projectId);
//       console.log('✅ Project deleted from Firebase:', projectId);
      
//     } catch (error: any) {
//       console.error('❌ Failed to delete project from Firebase:', error);
      
//       // 🎯 Rollback on failure
//       const { projects } = get();
//       const originalProject = projects.find(p => p.id === projectId);
//       if (originalProject) {
//         set((state) => ({
//           projects: [...projects, originalProject],
//           lastUpdated: Date.now()
//         }));
//       }

//       throw handleFirebaseError(error);
//     }
//   },

//   loadUserProjects: async (userId: string) => {
//     set({ isLoading: true });
//     try {
//       const projects = await projectRepository.getUserProjects(userId);
      
//       // 🎯 Enhance projects with status tracking
//       const enhancedProjects: EnhancedTrainingProject[] = projects.map(project => ({
//         ...project,
//         _status: 'synced' as const
//       }));
      
//       console.log('✅ Loaded projects from Firebase:', enhancedProjects.length);
//       set({ projects: enhancedProjects, isLoading: false, lastUpdated: Date.now() });
//     } catch (error: any) {
//       console.error('❌ Failed to load projects from Firebase:', error);
//       set({ projects: [], isLoading: false });
//       throw handleFirebaseError(error);
//     }
//   },

//   duplicateProject: async (projectId: string): Promise<string> => {
//     try {
//       const { projects } = get();
//       const projectToDuplicate = projects.find(p => p.id === projectId);
      
//       if (!projectToDuplicate) {
//         throw new UserFriendlyError(
//           'Project not found',
//           'The project you are trying to duplicate was not found',
//           'PROJECT_NOT_FOUND',
//           false
//         );
//       }

//       const userId = getCurrentUserId();
//       const { startDate, endDate } = get().calculateDateRange(projectToDuplicate.duration);
      
//       const projectData: CreateProjectData = {
//         title: `${projectToDuplicate.title} (Copy)`,
//         description: projectToDuplicate.description,
//         type: projectToDuplicate.type,
//         duration: projectToDuplicate.duration,
//         dailyWorkouts: projectToDuplicate.dailyWorkouts.map(day => ({
//           ...day,
//           completed: false,
//           completedAt: undefined
//         })),
//         isPublic: false,
//         focusAreas: projectToDuplicate.focusAreas,
//         difficulty: projectToDuplicate.difficulty as any
//       };

//       // 🎯 Use the enhanced create method
//       const newProjectId = await get().createProject(projectData);
//       return newProjectId;

//     } catch (error: any) {
//       console.error('❌ Failed to duplicate project:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   addProjectFromTemplate: async (template: ProjectTemplate): Promise<string> => {
//     try {
//       const userId = getCurrentUserId();
//       const { startDate, endDate } = get().calculateDateRange(template.duration);
      
//       const projectData: CreateProjectData = {
//         title: template.name,
//         description: template.description,
//         type: template.type,
//         duration: template.duration,
//         dailyWorkouts: template.dailyWorkouts.map(day => ({
//           ...day,
//           completed: false,
//           date: new Date(startDate.getTime() + day.dayIndex * 24 * 60 * 60 * 1000)
//         })),
//         isPublic: false,
//         focusAreas: template.focusAreas,
//         difficulty: template.category as 'beginner' | 'intermediate' | 'advanced'
//       };

//       // 🎯 Use the enhanced create method
//       const newProjectId = await get().createProject(projectData);
//       return newProjectId;

//     } catch (error: any) {
//       console.error('❌ Failed to add project from template:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   markDayComplete: async (projectId: string, dayIndex: number) => {
//     try {
//       console.log('🎯 Marking day complete:', { projectId, dayIndex });
      
//       // 🎯 Optimistic update
//       set((state) => {
//         const updatedProjects = state.projects.map(project => {
//           if (project.id === projectId) {
//             const updatedDailyWorkouts = project.dailyWorkouts.map((day, index) =>
//               index === dayIndex 
//                 ? { ...day, completed: true, completedAt: new Date() }
//                 : day
//             );
            
//             const completedDays = updatedDailyWorkouts.filter(day => day.completed).length;
//             const completionPercentage = (completedDays / project.duration) * 100;
            
//             return { 
//               ...project, 
//               dailyWorkouts: updatedDailyWorkouts,
//               progress: {
//                 ...project.progress,
//                 completedDays,
//                 completionPercentage,
//                 currentDayIndex: Math.min(dayIndex + 1, project.duration - 1)
//               },
//               updatedAt: new Date(),
//               _status: 'optimistic' as const
//             };
//           }
//           return project;
//         });

//         return { 
//           projects: updatedProjects,
//           lastUpdated: Date.now()
//         };
//       });

//       // 🎯 Sync to Firebase in background
//       const { projects } = get();
//       const updatedProject = projects.find(p => p.id === projectId);
//       if (updatedProject) {
//         projectRepository.update(projectId, {
//           dailyWorkouts: updatedProject.dailyWorkouts,
//           progress: updatedProject.progress,
//           updatedAt: updatedProject.updatedAt
//         }).then(() => {
//           // 🎯 Mark as synced
//           set((state) => ({
//             projects: state.projects.map(project =>
//               project.id === projectId 
//                 ? { ...project, _status: 'synced' as const }
//                 : project
//             )
//           }));
//         }).catch((error: any) => {
//           console.error('❌ Background update failed:', error);
//           // Keep as optimistic - user can retry later
//         });
//       }
      
//       console.log('✅ Day marked complete optimistically');

//     } catch (error: any) {
//       console.error('❌ Failed to mark day complete:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   markDayIncomplete: async (projectId: string, dayIndex: number) => {
//     try {
//       // 🎯 Optimistic update
//       set((state) => {
//         const updatedProjects = state.projects.map(project => {
//           if (project.id === projectId) {
//             const updatedDailyWorkouts = project.dailyWorkouts.map((day, index) =>
//               index === dayIndex 
//                 ? { ...day, completed: false, completedAt: undefined }
//                 : day
//             );
            
//             const completedDays = updatedDailyWorkouts.filter(day => day.completed).length;
//             const completionPercentage = (completedDays / project.duration) * 100;
            
//             return { 
//               ...project, 
//               dailyWorkouts: updatedDailyWorkouts,
//               progress: {
//                 ...project.progress,
//                 completedDays,
//                 completionPercentage
//               },
//               updatedAt: new Date(),
//               _status: 'optimistic' as const
//             };
//           }
//           return project;
//         });

//         return { 
//           projects: updatedProjects,
//           lastUpdated: Date.now()
//         };
//       });

//       // 🎯 Sync to Firebase in background
//       const { projects } = get();
//       const updatedProject = projects.find(p => p.id === projectId);
//       if (updatedProject) {
//         projectRepository.update(projectId, {
//           dailyWorkouts: updatedProject.dailyWorkouts,
//           progress: updatedProject.progress,
//           updatedAt: updatedProject.updatedAt
//         }).then(() => {
//           set((state) => ({
//             projects: state.projects.map(project =>
//               project.id === projectId 
//                 ? { ...project, _status: 'synced' as const }
//                 : project
//             )
//           }));
//         }).catch((error: any) => {
//           console.error('❌ Background update failed:', error);
//         });
//       }
//     } catch (error: any) {
//       console.error('❌ Failed to mark day incomplete:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   loadTemplates: async () => {
//     try {
//       const sampleTemplates = generateSampleTemplates();
//       set({ templates: sampleTemplates });
//     } catch (error: any) {
//       console.error('❌ Failed to load templates:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   downloadTemplate: async (templateId: string): Promise<string> => {
//     try {
//       const { templates } = get();
//       const template = templates.find(t => t.id === templateId);
      
//       if (!template) {
//         throw new UserFriendlyError(
//           'Template not found',
//           'The selected template was not found',
//           'TEMPLATE_NOT_FOUND',
//           false
//         );
//       }

//       const newProjectId = await get().addProjectFromTemplate(template);
      
//       set((state) => ({
//         templates: state.templates.map(t =>
//           t.id === templateId ? { ...t, popularity: t.popularity + 1 } : t
//         )
//       }));

//       return newProjectId;
//     } catch (error: any) {
//       console.error('❌ Failed to download template:', error);
//       throw handleFirebaseError(error);
//     }
//   },

//   calculateProjectProgress: (project: TrainingProject) => {
//     const completedDays = project.dailyWorkouts.filter(day => day.completed).length;
//     const completionPercentage = (completedDays / project.duration) * 100;
    
//     return {
//       completedDays,
//       totalDays: project.duration,
//       completionPercentage,
//       currentDayIndex: project.progress.currentDayIndex,
//       startedAt: project.progress.startedAt
//     };
//   },

//   calculateDateRange: (duration: number) => {
//     const startDate = new Date();
//     const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
//     return { startDate, endDate };
//   },

//   // 🚀 NEW: Retry pending operations (for offline support)
//   retryPendingOperations: async () => {
//     const { pendingOperations } = get();
//     if (pendingOperations.size === 0) return;

//     console.log(`🔄 Retrying ${pendingOperations.size} pending operations...`);
    
//     for (const [operationId, operation] of pendingOperations.entries()) {
//       try {
//         // Implement retry logic for different operation types
//         // This is a simplified version - expand based on your needs
//         console.log(`Retrying operation: ${operation.type}`);
//         // Add specific retry logic here
        
//         // Remove from pending on success
//         set(state => {
//           const newPending = new Map(state.pendingOperations);
//           newPending.delete(operationId);
//           return { pendingOperations: newPending };
//         });
//       } catch (error) {
//         console.error(`Failed to retry operation ${operationId}:`, error);
//       }
//     }
//   },

//   clearPendingOperations: () => {
//     set({ pendingOperations: new Map() });
//   }
// }));

// // 🚀 Initialize store with network status awareness
// // This could be enhanced to auto-retry when coming online

// src/features/projects/stores/useProjectStore.ts
import { create } from 'zustand';
import { TrainingProject, ProjectTemplate, CreateProjectData, DailyWorkout, ProjectProgress } from '../types/project';
import { generateSampleTemplates } from '../data/projectTemplate';
import { projectRepository } from '../../../shared/services/repositories/ProjectRepository';
import { UserFriendlyError, handleFirebaseError } from '../../../shared/utils/errorHandler';

// 🚀 PRODUCTION READY: Safe user ID helper
const getCurrentUserId = (): string => {
  try {
    const { useAppStore } = require('../../../shared/stores/useAppStore');
    const user = useAppStore.getState().user;
    
    if (!user?.uid) {
      throw new UserFriendlyError(
        'No user ID available',
        'Please sign in to create projects',
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

// 🚀 PRODUCTION READY: Enhanced project type with status tracking
interface EnhancedTrainingProject extends TrainingProject {
  _status?: 'optimistic' | 'synced' | 'offline' | 'error';
  _optimisticId?: string; // For rollback tracking
}

interface ProjectStore {
  // State
  projects: EnhancedTrainingProject[];
  activeProject: EnhancedTrainingProject | null;
  templates: ProjectTemplate[];
  isLoading: boolean;
  lastUpdated: number;

  // Actions
  setProjects: (projects: EnhancedTrainingProject[]) => void;
  setActiveProject: (project: EnhancedTrainingProject | null) => void;
  
  // 🚀 PRODUCTION READY: Enhanced CRUD operations
  createProject: (projectData: CreateProjectData) => Promise<string>;
  updateProject: (projectId: string, updates: Partial<TrainingProject>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  
  duplicateProject: (projectId: string) => Promise<string>;
  addProjectFromTemplate: (template: ProjectTemplate) => Promise<string>;
  markDayComplete: (projectId: string, dayIndex: number) => Promise<void>;
  markDayIncomplete: (projectId: string, dayIndex: number) => Promise<void>;
  loadTemplates: () => Promise<void>;
  downloadTemplate: (templateId: string) => Promise<string>;
  calculateProjectProgress: (project: TrainingProject) => ProjectProgress;
  calculateDateRange: (duration: number) => { startDate: Date; endDate: Date };
  
  // Data loading
  loadUserProjects: (userId: string) => Promise<void>;
  
  // 🚀 NEW: Direct method for workout completion (replaces events)
  handleWorkoutCompletion: (projectId: string, dayIndex: number) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  projects: [],
  activeProject: null,
  templates: [],
  isLoading: false,
  lastUpdated: Date.now(),

  setProjects: (projects) => set({ projects, lastUpdated: Date.now() }),
  
  setActiveProject: (project) => set({ activeProject: project }),
  
  // 🚀 PRODUCTION READY: Create project with proper Firebase ID handling
  createProject: async (projectData: CreateProjectData): Promise<string> => {
    const userId = getCurrentUserId();
    const { startDate, endDate } = get().calculateDateRange(projectData.duration);
    
    // 🎯 STEP 1: Prepare data WITHOUT ID (Firebase will generate)
    const projectWithoutId = {
      ...projectData,
      userId: userId,
      progress: {
        completedDays: 0,
        totalDays: projectData.duration,
        completionPercentage: 0,
        currentDayIndex: 0,
        startedAt: new Date()
      },
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      startDate,
      endDate,
      difficulty: projectData.difficulty || 'intermediate'
    };

    // 🎯 STEP 2: Generate temporary ID for optimistic update
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const optimisticProject: EnhancedTrainingProject = {
      ...projectWithoutId,
      id: tempId,
      _status: 'optimistic' as const,
      _optimisticId: tempId
    };

    // 🎯 STEP 3: Update UI optimistically (immediate feedback)
    set((state) => ({
      projects: [optimisticProject, ...state.projects],
      lastUpdated: Date.now()
    }));

    try {
      // 🎯 STEP 4: Save to Firebase (with retry logic built into repository)
      const firebaseId = await projectRepository.create(projectWithoutId);
      console.log('✅ Project saved to Firebase with ID:', firebaseId);
      
      // 🎯 STEP 5: Replace temporary ID with real Firebase ID
      set((state) => ({
        projects: state.projects.map(project =>
          project.id === tempId 
            ? { ...project, id: firebaseId, _status: 'synced' as const, _optimisticId: undefined }
            : project
        ),
        lastUpdated: Date.now()
      }));

      return firebaseId; // 🎯 Return Firebase ID for immediate navigation

    } catch (error: any) {
      console.error('❌ Failed to create project in Firebase:', error);
      
      // 🎯 STEP 6: Rollback optimistic update on failure
      set((state) => ({
        projects: state.projects.filter(project => project.id !== tempId),
        lastUpdated: Date.now()
      }));

      // Convert to user-friendly error
      const friendlyError = handleFirebaseError(error);
      throw friendlyError;
    }
  },

  updateProject: async (projectId: string, updates: Partial<TrainingProject>) => {
    try {
      // 🎯 Optimistic update
      set((state) => ({
        projects: state.projects.map(project =>
          project.id === projectId 
            ? { ...project, ...updates, updatedAt: new Date(), _status: 'optimistic' as const }
            : project
        ),
        lastUpdated: Date.now()
      }));

      await projectRepository.update(projectId, updates);
      console.log('✅ Project updated in Firebase:', projectId);
      
      // 🎯 Mark as synced
      set((state) => ({
        projects: state.projects.map(project =>
          project.id === projectId 
            ? { ...project, _status: 'synced' as const }
            : project
        ),
        lastUpdated: Date.now()
      }));
    } catch (error: any) {
      console.error('❌ Failed to update project in Firebase:', error);
      
      // 🎯 Rollback on failure
      const { projects } = get();
      const originalProject = projects.find(p => p.id === projectId && p._status !== 'optimistic');
      if (originalProject) {
        set((state) => ({
          projects: state.projects.map(project =>
            project.id === projectId ? originalProject : project
          ),
          lastUpdated: Date.now()
        }));
      }

      throw handleFirebaseError(error);
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      // 🎯 Store project for potential rollback
      const { projects } = get();
      const projectToDelete = projects.find(p => p.id === projectId);
      
      // 🎯 Optimistic removal
      set((state) => ({
        projects: state.projects.filter(project => project.id !== projectId),
        lastUpdated: Date.now()
      }));

      await projectRepository.delete(projectId);
      console.log('✅ Project deleted from Firebase:', projectId);
      
    } catch (error: any) {
      console.error('❌ Failed to delete project from Firebase:', error);
      
      // 🎯 Rollback on failure
      const { projects } = get();
      const originalProject = projects.find(p => p.id === projectId);
      if (originalProject) {
        set((state) => ({
          projects: [...projects, originalProject],
          lastUpdated: Date.now()
        }));
      }

      throw handleFirebaseError(error);
    }
  },

  loadUserProjects: async (userId: string) => {
    set({ isLoading: true });
    try {
      const projects = await projectRepository.getUserProjects(userId);
      
      // 🎯 Enhance projects with status tracking
      const enhancedProjects: EnhancedTrainingProject[] = projects.map(project => ({
        ...project,
        _status: 'synced' as const
      }));
      
      console.log('✅ Loaded projects from Firebase:', enhancedProjects.length);
      set({ projects: enhancedProjects, isLoading: false, lastUpdated: Date.now() });
    } catch (error: any) {
      console.error('❌ Failed to load projects from Firebase:', error);
      set({ projects: [], isLoading: false });
      throw handleFirebaseError(error);
    }
  },

  duplicateProject: async (projectId: string): Promise<string> => {
    try {
      const { projects } = get();
      const projectToDuplicate = projects.find(p => p.id === projectId);
      
      if (!projectToDuplicate) {
        throw new UserFriendlyError(
          'Project not found',
          'The project you are trying to duplicate was not found',
          'PROJECT_NOT_FOUND',
          false
        );
      }

      const userId = getCurrentUserId();
      const { startDate, endDate } = get().calculateDateRange(projectToDuplicate.duration);
      
      const projectData: CreateProjectData = {
        title: `${projectToDuplicate.title} (Copy)`,
        description: projectToDuplicate.description,
        type: projectToDuplicate.type,
        duration: projectToDuplicate.duration,
        dailyWorkouts: projectToDuplicate.dailyWorkouts.map(day => ({
          ...day,
          completed: false,
          completedAt: undefined
        })),
        isPublic: false,
        focusAreas: projectToDuplicate.focusAreas,
        difficulty: projectToDuplicate.difficulty as any
      };

      // 🎯 Use the enhanced create method
      const newProjectId = await get().createProject(projectData);
      return newProjectId;

    } catch (error: any) {
      console.error('❌ Failed to duplicate project:', error);
      throw handleFirebaseError(error);
    }
  },

  addProjectFromTemplate: async (template: ProjectTemplate): Promise<string> => {
    try {
      const userId = getCurrentUserId();
      const { startDate, endDate } = get().calculateDateRange(template.duration);
      
      const projectData: CreateProjectData = {
        title: template.name,
        description: template.description,
        type: template.type,
        duration: template.duration,
        dailyWorkouts: template.dailyWorkouts.map(day => ({
          ...day,
          completed: false,
          date: new Date(startDate.getTime() + day.dayIndex * 24 * 60 * 60 * 1000)
        })),
        isPublic: false,
        focusAreas: template.focusAreas,
        difficulty: template.category as 'beginner' | 'intermediate' | 'advanced'
      };

      // 🎯 Use the enhanced create method
      const newProjectId = await get().createProject(projectData);
      return newProjectId;

    } catch (error: any) {
      console.error('❌ Failed to add project from template:', error);
      throw handleFirebaseError(error);
    }
  },

  // 🚀 CRITICAL FIX: Enhanced markDayComplete with better error handling
  markDayComplete: async (projectId: string, dayIndex: number) => {
    try {
      console.log('🎯 Marking day complete:', { projectId, dayIndex });
      
      // 🎯 STEP 1: Verify project exists in store
      const { projects } = get();
      const project = projects.find(p => p.id === projectId);
      
      if (!project) {
        console.error('❌ Project not found in store:', projectId);
        throw new UserFriendlyError(
          'Project not found',
          'The project was not found. Please refresh and try again.',
          'PROJECT_NOT_FOUND',
          false
        );
      }

      // 🎯 STEP 2: Optimistic update
      set((state) => {
        const updatedProjects = state.projects.map(project => {
          if (project.id === projectId) {
            const updatedDailyWorkouts = project.dailyWorkouts.map((day, index) =>
              index === dayIndex 
                ? { ...day, completed: true, completedAt: new Date() }
                : day
            );
            
            const completedDays = updatedDailyWorkouts.filter(day => day.completed).length;
            const completionPercentage = (completedDays / project.duration) * 100;
            
            return { 
              ...project, 
              dailyWorkouts: updatedDailyWorkouts,
              progress: {
                ...project.progress,
                completedDays,
                completionPercentage,
                currentDayIndex: Math.min(dayIndex + 1, project.duration - 1)
              },
              updatedAt: new Date(),
              _status: 'optimistic' as const
            };
          }
          return project;
        });

        return { 
          projects: updatedProjects,
          lastUpdated: Date.now()
        };
      });

      // 🎯 STEP 3: Sync to Firebase in background with better error handling
      const updatedProjects = get().projects;
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      
      if (updatedProject) {
        console.log('🔄 Syncing day completion to Firebase for project:', projectId);
        
        projectRepository.update(projectId, {
          dailyWorkouts: updatedProject.dailyWorkouts,
          progress: updatedProject.progress,
          updatedAt: updatedProject.updatedAt
        })
        .then(() => {
          console.log('✅ Day completion synced to Firebase');
          // 🎯 Mark as synced
          set((state) => ({
            projects: state.projects.map(project =>
              project.id === projectId 
                ? { ...project, _status: 'synced' as const }
                : project
            )
          }));
        })
        .catch((error: any) => {
          console.error('❌ Background sync failed for project:', projectId, error);
          
          // Check if it's a "not found" error (project doesn't exist in Firebase)
          if (error?.code === 'not-found') {
            console.warn('⚠️ Project not found in Firebase, keeping optimistic state');
            // Keep optimistic state - user can manually sync later
          } else {
            // For other errors, we could show a retry option
            console.warn('⚠️ Sync failed, but optimistic update remains');
          }
        });
      }
      
      console.log('✅ Day marked complete optimistically');

    } catch (error: any) {
      console.error('❌ Failed to mark day complete:', error);
      throw handleFirebaseError(error);
    }
  },

  markDayIncomplete: async (projectId: string, dayIndex: number) => {
    try {
      // 🎯 Optimistic update
      set((state) => {
        const updatedProjects = state.projects.map(project => {
          if (project.id === projectId) {
            const updatedDailyWorkouts = project.dailyWorkouts.map((day, index) =>
              index === dayIndex 
                ? { ...day, completed: false, completedAt: undefined }
                : day
            );
            
            const completedDays = updatedDailyWorkouts.filter(day => day.completed).length;
            const completionPercentage = (completedDays / project.duration) * 100;
            
            return { 
              ...project, 
              dailyWorkouts: updatedDailyWorkouts,
              progress: {
                ...project.progress,
                completedDays,
                completionPercentage
              },
              updatedAt: new Date(),
              _status: 'optimistic' as const
            };
          }
          return project;
        });

        return { 
          projects: updatedProjects,
          lastUpdated: Date.now()
        };
      });

      // 🎯 Sync to Firebase in background
      const { projects } = get();
      const updatedProject = projects.find(p => p.id === projectId);
      if (updatedProject) {
        projectRepository.update(projectId, {
          dailyWorkouts: updatedProject.dailyWorkouts,
          progress: updatedProject.progress,
          updatedAt: updatedProject.updatedAt
        }).then(() => {
          set((state) => ({
            projects: state.projects.map(project =>
              project.id === projectId 
                ? { ...project, _status: 'synced' as const }
                : project
            )
          }));
        }).catch((error: any) => {
          console.error('❌ Background update failed:', error);
        });
      }
    } catch (error: any) {
      console.error('❌ Failed to mark day incomplete:', error);
      throw handleFirebaseError(error);
    }
  },

  loadTemplates: async () => {
    try {
      const sampleTemplates = generateSampleTemplates();
      set({ templates: sampleTemplates });
    } catch (error: any) {
      console.error('❌ Failed to load templates:', error);
      throw handleFirebaseError(error);
    }
  },

  downloadTemplate: async (templateId: string): Promise<string> => {
    try {
      const { templates } = get();
      const template = templates.find(t => t.id === templateId);
      
      if (!template) {
        throw new UserFriendlyError(
          'Template not found',
          'The selected template was not found',
          'TEMPLATE_NOT_FOUND',
          false
        );
      }

      const newProjectId = await get().addProjectFromTemplate(template);
      
      set((state) => ({
        templates: state.templates.map(t =>
          t.id === templateId ? { ...t, popularity: t.popularity + 1 } : t
        )
      }));

      return newProjectId;
    } catch (error: any) {
      console.error('❌ Failed to download template:', error);
      throw handleFirebaseError(error);
    }
  },

  calculateProjectProgress: (project: TrainingProject) => {
    const completedDays = project.dailyWorkouts.filter(day => day.completed).length;
    const completionPercentage = (completedDays / project.duration) * 100;
    
    return {
      completedDays,
      totalDays: project.duration,
      completionPercentage,
      currentDayIndex: project.progress.currentDayIndex,
      startedAt: project.progress.startedAt
    };
  },

  calculateDateRange: (duration: number) => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    return { startDate, endDate };
  },

  // 🚀 NEW: Direct method for workout completion (replaces complex event system)
  handleWorkoutCompletion: async (projectId: string, dayIndex: number) => {
    console.log('🎯 Direct workout completion handler called:', { projectId, dayIndex });
    
    try {
      // Use the existing markDayComplete method
      await get().markDayComplete(projectId, dayIndex);
      console.log('✅ Project day marked complete via direct method');
    } catch (error: any) {
      console.error('❌ Failed to handle workout completion:', error);
      // Don't throw - this is a background operation
    }
  }
}));