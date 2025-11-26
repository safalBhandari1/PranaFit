import { create } from 'zustand';
import { TrainingProject, ProjectTemplate, CreateProjectData, DailyWorkout, ProjectProgress } from '../types/project';
import { generateSampleTemplates } from '../data/projectTemplate';

interface ProjectStore {
  // State
  projects: TrainingProject[];
  activeProject: TrainingProject | null;
  templates: ProjectTemplate[];
  isLoading: boolean;
  
  // Actions
  setProjects: (projects: TrainingProject[]) => void;
  setActiveProject: (project: TrainingProject | null) => void;
  createProject: (projectData: CreateProjectData) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<TrainingProject>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  duplicateProject: (projectId: string) => Promise<void>;
  addProjectFromTemplate: (template: ProjectTemplate) => Promise<void>;
  markDayComplete: (projectId: string, dayIndex: number) => Promise<void>;
  markDayIncomplete: (projectId: string, dayIndex: number) => Promise<void>;
  loadTemplates: () => Promise<void>;
  downloadTemplate: (templateId: string) => Promise<void>;
  calculateProjectProgress: (project: TrainingProject) => ProjectProgress;
  // New method to calculate date range
  calculateDateRange: (duration: number) => { startDate: Date; endDate: Date };
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  projects: [],
  activeProject: null,
  templates: [],
  isLoading: false,

  // Actions
  setProjects: (projects) => set({ projects }),
  
  setActiveProject: (project) => set({ activeProject: project }),
  
  createProject: async (projectData: CreateProjectData) => {
    const { startDate, endDate } = get().calculateDateRange(projectData.duration);
    
    const newProject: TrainingProject = {
      ...projectData,
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
      endDate
    };
    
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },

  updateProject: async (projectId: string, updates: Partial<TrainingProject>) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === projectId 
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      )
    }));
  },

  deleteProject: async (projectId: string) => {
    set((state) => ({
      projects: state.projects.filter(project => project.id !== projectId)
    }));
  },

  duplicateProject: async (projectId: string) => {
    const { projects } = get();
    const projectToDuplicate = projects.find(p => p.id === projectId);
    
    if (projectToDuplicate) {
      const { startDate, endDate } = get().calculateDateRange(projectToDuplicate.duration);
      
      const duplicatedProject: TrainingProject = {
        ...projectToDuplicate,
        id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `${projectToDuplicate.title} (Copy)`,
        progress: {
          completedDays: 0,
          totalDays: projectToDuplicate.duration,
          completionPercentage: 0,
          currentDayIndex: 0,
          startedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        startDate,
        endDate
      };
      
      set((state) => ({
        projects: [...state.projects, duplicatedProject]
      }));
    }
  },

  addProjectFromTemplate: async (template: ProjectTemplate) => {
    const { startDate, endDate } = get().calculateDateRange(template.duration);
    
    const newProject: TrainingProject = {
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: template.name,
      description: template.description,
      type: template.type,
      duration: template.duration,
      dailyWorkouts: template.dailyWorkouts.map(day => ({
        ...day,
        completed: false,
        date: new Date(startDate.getTime() + day.dayIndex * 24 * 60 * 60 * 1000) // Set dates sequentially
      })),
      progress: {
        completedDays: 0,
        totalDays: template.duration,
        completionPercentage: 0,
        currentDayIndex: 0,
        startedAt: new Date()
      },
      isPublic: false,
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      templateSource: template.id,
      startDate,
      endDate,
      focusAreas: template.focusAreas
    };
    
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },

  markDayComplete: async (projectId: string, dayIndex: number) => {
    set((state) => ({
      projects: state.projects.map(project => {
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
            updatedAt: new Date()
          };
        }
        return project;
      })
    }));
  },

  markDayIncomplete: async (projectId: string, dayIndex: number) => {
    set((state) => ({
      projects: state.projects.map(project => {
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
            updatedAt: new Date()
          };
        }
        return project;
      })
    }));
  },

  loadTemplates: async () => {
    const sampleTemplates = generateSampleTemplates();
    set({ templates: sampleTemplates });
  },

  downloadTemplate: async (templateId: string) => {
    const { templates } = get();
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      await get().addProjectFromTemplate(template);
      
      set((state) => ({
        templates: state.templates.map(t =>
          t.id === templateId ? { ...t, popularity: t.popularity + 1 } : t
        )
      }));
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
  }
}));