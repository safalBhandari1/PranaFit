// import { 
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     updateProfile,
//     User as FirebaseUser
//   } from 'firebase/auth';
//   import { auth } from '../../../firebase/config/firebaseConfig'; // ← FIXED PATH
//   import { userRepository } from './repositories/UserRepository';
//   import { User } from '../types/domain'; // ← FIXED PATH
  
//   export class AuthService {
//     async signUp(email: string, password: string, name: string): Promise<User> {
//       try {
//         // Create Firebase auth user
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
//         // Update profile with name
//         await updateProfile(userCredential.user, {
//           displayName: name
//         });
  
//         // Create user document in Firestore
//         const userData: Omit<User, 'id'> = {
//           email,
//           name,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         };
  
//         const userId = await userRepository.create(userData);
  
//         return {
//           id: userId,
//           ...userData
//         };
  
//       } catch (error) {
//         console.error('Sign up error:', error);
//         throw error;
//       }
//     }
  
//     async signIn(email: string, password: string): Promise<User> {
//       try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const firebaseUser = userCredential.user;
  
//         // Get user data from Firestore
//         const user = await userRepository.getByEmail(email);
//         if (!user) {
//           throw new Error('User data not found');
//         }
  
//         return user;
  
//       } catch (error) {
//         console.error('Sign in error:', error);
//         throw error;
//       }
//     }
  
//     async signOut(): Promise<void> {
//       try {
//         await signOut(auth);
//       } catch (error) {
//         console.error('Sign out error:', error);
//         throw error;
//       }
//     }
  
//     getCurrentUser(): FirebaseUser | null {
//       return auth.currentUser;
//     }
  
//     onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
//       return auth.onAuthStateChanged(callback);
//     }
//   }
  
//   export const authService = new AuthService();
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
import { User } from '../types/domain/core/user';

export class AuthService {
  async signUp(email: string, password: string, name: string): Promise<User> {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Create user document in Firestore
      const userData: Omit<User, 'id'> = {
        uid: userCredential.user.uid, // ✅ MOVED: uid here instead of in return
        email,
        displayName: name,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActive: new Date()
      };

      const userId = await userRepository.create(userData);

      return {
        ...userData,
        // ✅ REMOVED: uid: userId - already included in userData spread
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
}

export const authService = new AuthService();