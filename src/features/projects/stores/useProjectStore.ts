import { create } from 'zustand';
import { Project, ProjectTemplate } from '../types/project';

interface ProjectStore {
  projects: Project[];
  activeProject: Project | null;
  templates: ProjectTemplate[];
  
  // Actions
  setProjects: (projects: Project[]) => void;
  setActiveProject: (project: Project | null) => void;
  createProject: (projectData: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addProjectFromTemplate: (template: ProjectTemplate) => void;
  markDayComplete: (projectId: string, dayIndex: number) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  activeProject: null,
  templates: [],

  setProjects: (projects) => set({ projects }),
  
  setActiveProject: (project) => set({ activeProject: project }),
  
  createProject: (projectData) => {
    const newProject: Project = {
      ...projectData,
      id: `project_${Date.now()}`,
      createdAt: new Date()
    };
    
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },

  updateProject: (projectId, updates) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    }));
  },

  deleteProject: (projectId) => {
    set((state) => ({
      projects: state.projects.filter(project => project.id !== projectId)
    }));
  },

  addProjectFromTemplate: (template) => {
    const newProject: Project = {
      id: `project_${Date.now()}`,
      name: template.name,
      description: template.description,
      isActive: true,
      days: template.days,
      createdAt: new Date(),
      templateSource: template.id
    };
    
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },

  markDayComplete: (projectId, dayIndex) => {
    set((state) => ({
      projects: state.projects.map(project => {
        if (project.id === projectId) {
          const updatedDays = project.days.map((day, index) =>
            index === dayIndex ? { ...day, completed: true } : day
          );
          return { ...project, days: updatedDays };
        }
        return project;
      })
    }));
  }
}));