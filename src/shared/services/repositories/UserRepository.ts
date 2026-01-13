// import { BaseRepository } from './BaseRepository';
// import { User, UserRole } from '../../types/domain/core/user';
// import { query, where, orderBy } from 'firebase/firestore';

// export class UserRepository extends BaseRepository<User> {
//   constructor() {
//     super('users');
//   }

//   async getByEmail(email: string): Promise<User | null> {
//     const users = await this.query([where('email', '==', email)]);
//     return users.length > 0 ? users[0] : null;
//   }

//   // ADDED: Get users by role
//   async getUsersByRole(role: UserRole): Promise<User[]> {
//     return this.query([
//       where('role', '==', role),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   // ADDED: Get gym owners
//   async getGymOwners(): Promise<User[]> {
//     return this.getUsersByRole('gym_owner');
//   }

//   // ADDED: Get gym staff
//   async getGymStaff(gymId?: string): Promise<User[]> {
//     let queries: any[] = [where('role', 'in', ['gym_staff', 'gym_trainer'])];
    
//     if (gymId) {
//       queries.push(where('gymId', '==', gymId));
//     }
    
//     return this.query([...queries, orderBy('createdAt', 'desc')]);
//   }

//   // ADDED: Get users by gym
//   async getUsersByGym(gymId: string): Promise<User[]> {
//     return this.query([
//       where('gymId', '==', gymId),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   // ADDED: Search users by name
//   async searchUsersByName(name: string): Promise<User[]> {
//     if (!name.trim()) return [];
    
//     return this.query([
//       where('displayName', '>=', name),
//       where('displayName', '<=', name + '\uf8ff')
//     ]);
//   }

//   // ADDED: Update user role
// // In src/shared/services/repositories/UserRepository.ts
// // REPLACE the updateUserRole method with this:

//   async updateUserRole(userUid: string, role: UserRole, gymId?: string): Promise<void> {
//     const updateData: Partial<User> = { 
//       role,
//       updatedAt: new Date()
//     };
    
//     if (gymId) {
//       updateData.gymId = gymId;
//     }
    
//     // 🚨 FIX: Properly set gymRole based on role
//     if (role === 'gym_owner') {
//       updateData.gymRole = 'owner';
//     } else if (role === 'gym_staff') {
//       updateData.gymRole = 'staff';
//     } else if (role === 'gym_trainer') {
//       updateData.gymRole = 'trainer';
//     } else {
//       // For 'member' or any other role, clear gymRole
//       updateData.gymRole = undefined;
//     }
    
//     await this.update(userUid, updateData);
//   }
// }

// export const userRepository = new UserRepository();




// import { BaseRepository } from './BaseRepository';
// import { User, UserRole } from '../../types/domain/core/user';
// import { query, where, orderBy } from 'firebase/firestore';

// export class UserRepository extends BaseRepository<User> {
//   constructor() {
//     super('users');
//   }

//   async getByEmail(email: string): Promise<User | null> {
//     const users = await this.query([where('email', '==', email)]);
//     return users.length > 0 ? users[0] : null;
//   }

//   // Get users by role
//   async getUsersByRole(role: UserRole): Promise<User[]> {
//     return this.query([
//       where('role', '==', role),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   // Get gym owners
//   async getGymOwners(): Promise<User[]> {
//     return this.getUsersByRole('gym_owner');
//   }

//   // Get gym staff (staff and trainers)
//   async getGymStaff(): Promise<User[]> {
//     return this.query([
//       where('role', 'in', ['gym_staff', 'gym_trainer']),
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   // Get users who are members of a specific gym
//   async getUsersByGym(gymId: string): Promise<User[]> {
//     // This query needs a composite index since we're querying an array field
//     return this.query([
//       where('gymMemberships', 'array-contains', { gymId }), // This requires a specific index setup
//       orderBy('createdAt', 'desc')
//     ]);
//   }

//   // Alternative: Get users by gym ID using membership array (simplified)
//   async getUsersByGymId(gymId: string): Promise<User[]> {
//     const allUsers = await this.getAll();
//     return allUsers.filter(user => 
//       user.gymMemberships?.some(m => m.gymId === gymId)
//     );
//   }

//   // Search users by name
//   async searchUsersByName(name: string): Promise<User[]> {
//     if (!name.trim()) return [];
    
//     return this.query([
//       where('displayName', '>=', name),
//       where('displayName', '<=', name + '\uf8ff')
//     ]);
//   }

//   // Update user's gym membership
//   async updateGymMembership(userUid: string, gymId: string, updates: Partial<{
//     gymRole: 'owner' | 'staff' | 'trainer' | 'member';
//     isActive: boolean;
//     membershipCode: string;
//   }>): Promise<void> {
//     const user = await this.getById(userUid);
//     if (!user) throw new Error('User not found');

//     // Find and update the specific gym membership
//     const updatedMemberships = user.gymMemberships?.map(membership => 
//       membership.gymId === gymId 
//         ? { ...membership, ...updates }
//         : membership
//     ) || [];

//     await this.update(userUid, {
//       gymMemberships: updatedMemberships,
//       updatedAt: new Date()
//     });
//   }

//   // Remove gym membership from user
//   async removeGymMembership(userUid: string, gymId: string): Promise<void> {
//     const user = await this.getById(userUid);
//     if (!user) throw new Error('User not found');

//     const updatedMemberships = user.gymMemberships?.filter(m => m.gymId !== gymId) || [];
    
//     const updateData: Partial<User> = {
//       gymMemberships: updatedMemberships,
//       updatedAt: new Date()
//     };

//     // If this was the current gym, clear it
//     if (user.currentGymId === gymId) {
//       updateData.currentGymId = undefined;
//     }

//     await this.update(userUid, updateData);
//   }

//   // Set user's current gym
//   async setCurrentGym(userUid: string, gymId: string | undefined): Promise<void> {
//     await this.update(userUid, {
//       currentGymId: gymId,
//       updatedAt: new Date()
//     });
//   }

//   // Get users with multiple gyms
//   async getUsersWithMultipleGyms(): Promise<User[]> {
//     const allUsers = await this.getAll();
//     return allUsers.filter(user => (user.gymMemberships?.length || 0) > 1);
//   }

//   // Get pure fitness users (no gym memberships)
//   async getPureFitnessUsers(): Promise<User[]> {
//     const allUsers = await this.getAll();
//     return allUsers.filter(user => 
//       user.role === 'fitness_user' && (user.gymMemberships?.length || 0) === 0
//     );
//   }
// }

// export const userRepository = new UserRepository();


import { 
  where, 
  orderBy, 
  query,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { BaseRepository } from './BaseRepository';
import { User, UserRole } from '../../types/domain/core/user';
import { handleFirebaseError } from '../../utils/errorHandler';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  // ✅ NEW: Create user with Firebase UID as document ID
  async createUserWithUid(userData: Omit<User, 'id'> & { uid: string }): Promise<string> {
    try {
      // For users, we ALWAYS use the Firebase UID as the document ID
      return await this.createWithId(userData.uid, userData);
    } catch (error: any) {
      console.error('❌ Error creating user with UID:', error);
      throw handleFirebaseError(error);
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    const users = await this.query([where('email', '==', email)]);
    return users.length > 0 ? users[0] : null;
  }

  // Get users by role
  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.query([
      where('role', '==', role),
      orderBy('createdAt', 'desc')
    ]);
  }

  // Get gym owners
  async getGymOwners(): Promise<User[]> {
    return this.getUsersByRole('gym_owner');
  }

  // Get gym staff (staff and trainers)
  async getGymStaff(): Promise<User[]> {
    return this.query([
      where('role', 'in', ['gym_staff', 'gym_trainer']),
      orderBy('createdAt', 'desc')
    ]);
  }

  // Get users who are members of a specific gym
  async getUsersByGym(gymId: string): Promise<User[]> {
    // This query needs a composite index since we're querying an array field
    return this.query([
      where('gymMemberships', 'array-contains', { gymId }), // This requires a specific index setup
      orderBy('createdAt', 'desc')
    ]);
  }

  // Alternative: Get users by gym ID using membership array (simplified)
  async getUsersByGymId(gymId: string): Promise<User[]> {
    const allUsers = await this.getAll();
    return allUsers.filter(user => 
      user.gymMemberships?.some(m => m.gymId === gymId)
    );
  }

  // Search users by name
  async searchUsersByName(name: string): Promise<User[]> {
    if (!name.trim()) return [];
    
    return this.query([
      where('displayName', '>=', name),
      where('displayName', '<=', name + '\uf8ff')
    ]);
  }

  // Update user's gym membership
  async updateGymMembership(userUid: string, gymId: string, updates: Partial<{
    gymRole: 'owner' | 'staff' | 'trainer' | 'member';
    isActive: boolean;
    membershipCode: string;
  }>): Promise<void> {
    const user = await this.getById(userUid);
    if (!user) throw new Error('User not found');

    // Find and update the specific gym membership
    const updatedMemberships = user.gymMemberships?.map(membership => 
      membership.gymId === gymId 
        ? { ...membership, ...updates }
        : membership
    ) || [];

    await this.update(userUid, {
      gymMemberships: updatedMemberships,
      updatedAt: new Date()
    });
  }

  // Remove gym membership from user
  async removeGymMembership(userUid: string, gymId: string): Promise<void> {
    const user = await this.getById(userUid);
    if (!user) throw new Error('User not found');

    const updatedMemberships = user.gymMemberships?.filter(m => m.gymId !== gymId) || [];
    
    const updateData: Partial<User> = {
      gymMemberships: updatedMemberships,
      updatedAt: new Date()
    };

    // If this was the current gym, clear it
    if (user.currentGymId === gymId) {
      updateData.currentGymId = undefined;
    }

    await this.update(userUid, updateData);
  }

  // Set user's current gym
  async setCurrentGym(userUid: string, gymId: string | undefined): Promise<void> {
    await this.update(userUid, {
      currentGymId: gymId,
      updatedAt: new Date()
    });
  }

  // Get users with multiple gyms
  async getUsersWithMultipleGyms(): Promise<User[]> {
    const allUsers = await this.getAll();
    return allUsers.filter(user => (user.gymMemberships?.length || 0) > 1);
  }

  // Get pure fitness users (no gym memberships)
  async getPureFitnessUsers(): Promise<User[]> {
    const allUsers = await this.getAll();
    return allUsers.filter(user => 
      user.role === 'fitness_user' && (user.gymMemberships?.length || 0) === 0
    );
  }

  // ✅ NEW: Get user by Firebase UID (alias for getById since now ID = UID)
  async getByUid(uid: string): Promise<User | null> {
    return this.getById(uid);
  }
}

export const userRepository = new UserRepository();