// import { BaseRepository } from './BaseRepository';
// import { User } from '../../types/domain';
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
//       where('name', '>=', name),
//       where('name', '<=', name + '\uf8ff')
//     ]);
//   }
// }

// export const userRepository = new UserRepository();

import { BaseRepository } from './BaseRepository';
import { User } from '../../types/domain/core/user'; // ← UPDATED IMPORT
import { query, where, orderBy } from 'firebase/firestore';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async getByEmail(email: string): Promise<User | null> {
    const users = await this.query([where('email', '==', email)]);
    return users.length > 0 ? users[0] : null;
  }

  async getUsersByGym(gymId: string): Promise<User[]> {
    return this.query([
      where('gymId', '==', gymId),
      orderBy('createdAt', 'desc')
    ]);
  }

  async searchUsersByName(name: string): Promise<User[]> {
    return this.query([
      where('displayName', '>=', name), // ← UPDATED: Use displayName instead of name
      where('displayName', '<=', name + '\uf8ff')
    ]);
  }
}

export const userRepository = new UserRepository();