import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../../../firebase/config/firebaseConfig';
import { userRepository } from './repositories/UserRepository';
import { User, UserRole, UserRegistrationData } from '../types/domain/core/user';
// Add this import at the top of AuthService.ts
import { useGymStore } from '../../features/gym/stores/useGymStore';
import { useAppStore } from '../../shared/stores/useAppStore';

export class AuthService {
  async signUp(registrationData: UserRegistrationData): Promise<User> {
    try {
      const { email, password, name, role, phoneNumber } = registrationData;
      
      // 1. Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUid = userCredential.user.uid;
      
      // 2. Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
  
      // 3. Create user document in Firestore with UID as document ID
      const userData: Omit<User, 'id'> = {
        uid: firebaseUid, // Store Firebase UID as a field
        email,
        displayName: name,
        role: role || 'fitness_user', // Default to fitness_user
        phoneNumber,
        
        // Initialize empty gym memberships
        gymMemberships: [],
        // currentGymId will be undefined initially
        
        // Timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActive: new Date()
      };
  
      // ✅ FIXED: Use UID as document ID (Industry Standard)
      const documentId = await userRepository.createUserWithUid(userData);
      console.log(`✅ User created with ID (UID): ${documentId}`);
  
      // ✅ Return user with both id and uid fields
      return {
        id: firebaseUid, // Document ID = Firebase UID
        ...userData,
      } as User;
  
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
      await userRepository.update(user.id, { // ✅ Use user.id (which equals uid)
        lastActive: new Date(),
        updatedAt: new Date()
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

      // 🚨 CRITICAL: Clear ALL stores on logout
      // 1. Clear app store
      const { clearAll } = useAppStore.getState();
      clearAll();
      
      // 2. Clear gym store
      const { resetStore } = useGymStore.getState();
      resetStore();
      
      console.log('✅ User signed out and all stores cleared');
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

  // Check if user has any gym memberships
  hasGymAccess(user: User | null): boolean {
    if (!user) return false;
    return (user.gymMemberships?.length || 0) > 0;
  }

  // Check if user is a pure fitness user (no gyms)
  isPureFitnessUser(user: User | null): boolean {
    if (!user) return false;
    return user.role === 'fitness_user' && (user.gymMemberships?.length || 0) === 0;
  }

  // Check if user is owner of any gym
  isAnyGymOwner(user: User | null): boolean {
    if (!user) return false;
    return user.gymMemberships?.some(m => m.gymRole === 'owner') || false;
  }

  // Check if user is staff/trainer of any gym
  isAnyGymStaff(user: User | null): boolean {
    if (!user) return false;
    return user.gymMemberships?.some(m => ['staff', 'trainer'].includes(m.gymRole)) || false;
  }
}

export const authService = new AuthService();