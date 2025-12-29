
// // src/shared/services/AuthService.ts
// import { 
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   User as FirebaseUser
// } from 'firebase/auth';
// import { auth } from '../../../firebase/config/firebaseConfig';
// import { userRepository } from './repositories/UserRepository';
// import { User } from '../types/domain/core/user';

// export class AuthService {
//   async signUp(email: string, password: string, name: string): Promise<User> {
//     try {
//       // Create Firebase auth user
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
//       // Update profile with name
//       await updateProfile(userCredential.user, {
//         displayName: name
//       });

//       // Create user document in Firestore
//       const userData: Omit<User, 'id'> = {
//         uid: userCredential.user.uid, // ✅ MOVED: uid here instead of in return
//         email,
//         displayName: name,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         lastActive: new Date()
//       };

//       const userId = await userRepository.create(userData);

//       return {
//         ...userData,
//         // ✅ REMOVED: uid: userId - already included in userData spread
//       };

//     } catch (error) {
//       console.error('Sign up error:', error);
//       throw error;
//     }
//   }

//   async signIn(email: string, password: string): Promise<User> {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const firebaseUser = userCredential.user;

//       // Get user data from Firestore
//       const user = await userRepository.getByEmail(email);
//       if (!user) {
//         throw new Error('User data not found');
//       }

//       return user;

//     } catch (error) {
//       console.error('Sign in error:', error);
//       throw error;
//     }
//   }

//   async signOut(): Promise<void> {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Sign out error:', error);
//       throw error;
//     }
//   }

//   getCurrentUser(): FirebaseUser | null {
//     return auth.currentUser;
//   }

//   onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
//     return auth.onAuthStateChanged(callback);
//   }
// }

// export const authService = new AuthService();


// src/shared/services/AuthService.ts
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../../../firebase/config/firebaseConfig';
import { userRepository } from './repositories/UserRepository';
import { User, UserRole } from '../types/domain/core/user';
import { gymRepository } from './repositories/GymRepository'; // We'll create this tomorrow

export class AuthService {
  async signUp(
    email: string, 
    password: string, 
    name: string,
    role: UserRole = 'member',
    phoneNumber?: string
  ): Promise<User> {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Create user document in Firestore with role
      const userData: Omit<User, 'id'> = {
        uid: userCredential.user.uid,
        email,
        displayName: name,
        role, // ADDED: role field
        phoneNumber, // ADDED: phone number
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActive: new Date()
      };

      const userId = await userRepository.create(userData);

      // If user is a gym owner, create a default gym profile
      if (role === 'gym_owner') {
        // We'll create gymRepository tomorrow
        // For now, just log that we need to create a gym
        console.log('Gym owner registered - gym creation will be handled in next phase');
      }

      return {
        ...userData,
        id: userId,
      };

    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const user = await userRepository.getByEmail(email);
      if (!user) {
        throw new Error('User data not found');
      }

      // Update last active timestamp
      await userRepository.update(user.id!, {
        lastActive: new Date()
      });

      return user;

    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return auth.onAuthStateChanged(callback);
  }

  // Helper method to check user role - ADDED
  getUserRole(user: User | null): UserRole {
    return user?.role || 'member';
  }

  // Helper method to check if user is gym owner - ADDED
  isGymOwner(user: User | null): boolean {
    return user?.role === 'gym_owner';
  }

  // Helper method to check if user is gym staff - ADDED
  isGymStaff(user: User | null): boolean {
    return user?.role === 'gym_staff' || user?.role === 'gym_trainer';
  }
}

export const authService = new AuthService();