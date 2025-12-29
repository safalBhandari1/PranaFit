
// import { BaseRepository } from './BaseRepository';
// import { User } from '../../types/domain/core/user'; // ← UPDATED IMPORT
// import { query, where, orderBy } from 'firebase/firestore';

// export class UserRepository extends BaseRepository<User> {
//   constructor() {
//     super('users');
//   }

//   async getByEmail(email: string): Promise<User | null> {
//     const users = await this.query([where('email', '==', email)]);
//     return users.length > 0 ? users[0] : null;
//   }

//   async getUsersByGym(gymId: string): Promise<User[]> {
//     return this.query([
//       where('gymId', '==', gymId),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   async searchUsersByName(name: string): Promise<User[]> {
//     return this.query([
//       where('displayName', '>=', name), // ← UPDATED: Use displayName instead of name
//       where('displayName', '<=', name + '\uf8ff')
//     ]);
//   }
// }

// export const userRepository = new UserRepository();


import { BaseRepository } from './BaseRepository';
import { User, UserRole } from '../../types/domain/core/user';
import { query, where, orderBy } from 'firebase/firestore';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async getByEmail(email: string): Promise<User | null> {
    const users = await this.query([where('email', '==', email)]);
    return users.length > 0 ? users[0] : null;
  }

  // ADDED: Get users by role
  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.query([
      where('role', '==', role),
      orderBy('createdAt', 'desc')
    ]);
  }

  // ADDED: Get gym owners
  async getGymOwners(): Promise<User[]> {
    return this.getUsersByRole('gym_owner');
  }

  // ADDED: Get gym staff
  async getGymStaff(gymId?: string): Promise<User[]> {
    let queries: any[] = [where('role', 'in', ['gym_staff', 'gym_trainer'])];
    
    if (gymId) {
      queries.push(where('gymId', '==', gymId));
    }
    
    return this.query([...queries, orderBy('createdAt', 'desc')]);
  }

  // ADDED: Get users by gym
  async getUsersByGym(gymId: string): Promise<User[]> {
    return this.query([
      where('gymId', '==', gymId),
      orderBy('createdAt', 'desc')
    ]);
  }

  // ADDED: Search users by name
  async searchUsersByName(name: string): Promise<User[]> {
    if (!name.trim()) return [];
    
    return this.query([
      where('displayName', '>=', name),
      where('displayName', '<=', name + '\uf8ff')
    ]);
  }

  // ADDED: Update user role
// In src/shared/services/repositories/UserRepository.ts
// REPLACE the updateUserRole method with this:

  async updateUserRole(userUid: string, role: UserRole, gymId?: string): Promise<void> {
    const updateData: Partial<User> = { 
      role,
      updatedAt: new Date()
    };
    
    if (gymId) {
      updateData.gymId = gymId;
    }
    
    // 🚨 FIX: Properly set gymRole based on role
    if (role === 'gym_owner') {
      updateData.gymRole = 'owner';
    } else if (role === 'gym_staff') {
      updateData.gymRole = 'staff';
    } else if (role === 'gym_trainer') {
      updateData.gymRole = 'trainer';
    } else {
      // For 'member' or any other role, clear gymRole
      updateData.gymRole = undefined;
    }
    
    await this.update(userUid, updateData);
  }
}

export const userRepository = new UserRepository();