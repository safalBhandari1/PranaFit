// shared/types/domain/core/project.ts

import { TrainingProject } from '../../../../features/projects/types/project';

/**
 * Project types - Re-export from features since they're comprehensive and used everywhere
 * Single source of truth for project data
 */

export { 
    TrainingProject,
    DailyWorkout,
    WorkoutActivity, 
    ProjectTemplate,
    CreateProjectData,
    ProjectProgress
  } from '../../../../features/projects/types/project';
  
  // Export for repository compatibility
  export type { TrainingProject as ProjectDocument };