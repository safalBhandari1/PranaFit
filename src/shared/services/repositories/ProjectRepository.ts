// // src/shared/services/repositories/ProjectRepository.ts
// import { BaseRepository } from './BaseRepository';
// import { TrainingProject } from '../../types/domain/core/project';
// import { query, where, orderBy } from 'firebase/firestore';

// export class ProjectRepository extends BaseRepository<TrainingProject> {
//   constructor() {
//     super('projects');
//   }

//   async getUserProjects(userId: string): Promise<TrainingProject[]> {
//     return this.query([
//       where('userId', '==', userId),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   async getActiveProjects(userId: string): Promise<TrainingProject[]> {
//     return this.query([
//       where('userId', '==', userId),
//       where('isActive', '==', true),
//       orderBy('updatedAt', 'desc')
//     ]);
//   }

//   async getProjectsByType(userId: string, type: string): Promise<TrainingProject[]> {
//     return this.query([
//       where('userId', '==', userId),
//       where('type', '==', type),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   async searchProjects(userId: string, searchTerm: string): Promise<TrainingProject[]> {
//     return this.query([
//       where('userId', '==', userId),
//       where('title', '>=', searchTerm),
//       where('title', '<=', searchTerm + '\uf8ff')
//     ]);
//   }
// }

// export const projectRepository = new ProjectRepository();


// src/shared/services/repositories/ProjectRepository.ts
import { BaseRepository } from './BaseRepository';
import { TrainingProject } from '../../types/domain/core/project';
import { query, where, orderBy } from 'firebase/firestore';

export class ProjectRepository extends BaseRepository<TrainingProject> {
  constructor() {
    super('projects');
  }

  async getUserProjects(userId: string): Promise<TrainingProject[]> {
    try {
      console.log('🔍 Querying projects for user:', userId);
      
      // ✅ INDUSTRY STANDARD: Composite index query with fallback
      const projects = await this.query([
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      ]);
      
      console.log(`✅ Found ${projects.length} projects for user ${userId}`);
      return projects;
    } catch (error: any) {
      // Fallback for development before index exists
      if (error.code === 'failed-precondition') {
        console.warn('⚠️ Firebase index not ready yet, using fallback query');
        const allProjects = await this.query([
          where('userId', '==', userId)
        ]);
        const sortedProjects = allProjects.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        console.log(`✅ Found ${sortedProjects.length} projects (fallback)`);
        return sortedProjects;
      }
      console.error('❌ Error querying user projects:', error);
      throw error;
    }
  }

  async getActiveProjects(userId: string): Promise<TrainingProject[]> {
    try {
      const projects = await this.query([
        where('userId', '==', userId),
        where('isActive', '==', true),
        orderBy('updatedAt', 'desc')
      ]);
      console.log(`✅ Found ${projects.length} active projects for user ${userId}`);
      return projects;
    } catch (error: any) {
      if (error.code === 'failed-precondition') {
        console.warn('⚠️ Firebase index not ready, using fallback for active projects');
        const projects = await this.getUserProjects(userId);
        const activeProjects = projects
          .filter(project => project.isActive)
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        console.log(`✅ Found ${activeProjects.length} active projects (fallback)`);
        return activeProjects;
      }
      console.error('❌ Error querying active projects:', error);
      throw error;
    }
  }

  async getProjectsByType(userId: string, type: string): Promise<TrainingProject[]> {
    try {
      const projects = await this.query([
        where('userId', '==', userId),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      ]);
      console.log(`✅ Found ${projects.length} ${type} projects for user ${userId}`);
      return projects;
    } catch (error: any) {
      if (error.code === 'failed-precondition') {
        console.warn('⚠️ Firebase index not ready, using fallback for type projects');
        const projects = await this.getUserProjects(userId);
        const typedProjects = projects
          .filter(project => project.type === type)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(`✅ Found ${typedProjects.length} ${type} projects (fallback)`);
        return typedProjects;
      }
      console.error('❌ Error querying projects by type:', error);
      throw error;
    }
  }
}

export const projectRepository = new ProjectRepository();