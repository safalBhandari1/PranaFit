
// // src/shared/services/repositories/BaseRepository.ts
// import { 
//   collection, 
//   doc, 
//   addDoc, 
//   updateDoc, 
//   deleteDoc, 
//   getDocs, 
//   getDoc, 
//   query, 
//   where, 
//   orderBy,
//   QueryConstraint,
//   Timestamp 
// } from 'firebase/firestore';
// import { db } from '../../../../firebase/config/firebaseConfig';

// export abstract class BaseRepository<T> {
//   protected collectionName: string;

//   constructor(collectionName: string) {
//     this.collectionName = collectionName;
//   }

//   protected getCollection() {
//     return collection(db, this.collectionName);
//   }

//   protected getDocument(id: string) {
//     return doc(db, this.collectionName, id);
//   }

//   // ✅ INDUSTRY STANDARD: Deep clean data - remove undefined, null, and circular references
//   protected cleanData(data: any): any {
//     if (data === null || data === undefined) {
//       return null;
//     }

//     if (Array.isArray(data)) {
//       return data.map(item => this.cleanData(item)).filter(item => item !== null);
//     }

//     if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof Timestamp)) {
//       const cleaned: any = {};
//       Object.keys(data).forEach(key => {
//         const value = this.cleanData(data[key]);
//         if (value !== null && value !== undefined) {
//           cleaned[key] = value;
//         }
//       });
//       return cleaned;
//     }

//     return data;
//   }

//   // Convert Firestore Timestamp to Date
//   protected convertTimestamps(data: any): any {
//     if (data && typeof data === 'object') {
//       Object.keys(data).forEach(key => {
//         if (data[key] instanceof Timestamp) {
//           data[key] = data[key].toDate();
//         } else if (typeof data[key] === 'object') {
//           data[key] = this.convertTimestamps(data[key]);
//         }
//       });
//     }
//     return data;
//   }

//   // ✅ FIXED: Proper error handling with type safety
//   async create(data: Omit<T, 'id' | 'uid'>): Promise<string> {
//     try {
//       const cleanedData = this.cleanData({
//         ...data,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });

//       const docRef = await addDoc(this.getCollection(), cleanedData);
//       console.log('✅ Document created with ID:', docRef.id);
//       return docRef.id;
//     } catch (error: unknown) {
//       // ✅ PROPER ERROR HANDLING: Type-safe error message extraction
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       console.error('❌ Error creating document:', error);
//       throw new Error(`Failed to create document: ${errorMessage}`);
//     }
//   }

//   async getById(id: string): Promise<T | null> {
//     try {
//       const docSnap = await getDoc(this.getDocument(id));
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // Return with appropriate ID field
//         if (convertedData.uid) {
//           return { ...convertedData } as T;
//         } else {
//           return { id: docSnap.id, ...convertedData } as T;
//         }
//       }
//       return null;
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       console.error('❌ Error getting document by ID:', error);
//       throw new Error(`Failed to get document: ${errorMessage}`);
//     }
//   }

//   async update(id: string, data: Partial<T>): Promise<void> {
//     try {
//       const cleanedData = this.cleanData({
//         ...data,
//         updatedAt: new Date()
//       });

//       await updateDoc(this.getDocument(id), cleanedData);
//       console.log('✅ Document updated:', id);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       console.error('❌ Error updating document:', error);
//       throw new Error(`Failed to update document: ${errorMessage}`);
//     }
//   }

//   async delete(id: string): Promise<void> {
//     try {
//       await deleteDoc(this.getDocument(id));
//       console.log('✅ Document deleted:', id);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       console.error('❌ Error deleting document:', error);
//       throw new Error(`Failed to delete document: ${errorMessage}`);
//     }
//   }

//   async query(constraints: QueryConstraint[]): Promise<T[]> {
//     try {
//       const q = query(this.getCollection(), ...constraints);
//       const querySnapshot = await getDocs(q);
      
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // Smart ID assignment
//         if (convertedData.uid) {
//           return { ...convertedData } as T;
//         } else {
//           return { id: doc.id, ...convertedData } as T;
//         }
//       });
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       console.error('❌ Error querying documents:', error);
//       throw new Error(`Failed to query documents: ${errorMessage}`);
//     }
//   }

//   async getAll(): Promise<T[]> {
//     try {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         const convertedData = this.convertTimestamps(data);
        
//         if (convertedData.uid) {
//           return { ...convertedData } as T;
//         } else {
//           return { id: doc.id, ...convertedData } as T;
//         }
//       });
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//       console.error('❌ Error getting all documents:', error);
//       throw new Error(`Failed to get all documents: ${errorMessage}`);
//     }
//   }

//   // Utility methods with error handling
//   async exists(id: string): Promise<boolean> {
//     try {
//       const docSnap = await getDoc(this.getDocument(id));
//       return docSnap.exists();
//     } catch (error: unknown) {
//       console.error('❌ Error checking document existence:', error);
//       return false;
//     }
//   }

//   async count(): Promise<number> {
//     try {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.size;
//     } catch (error: unknown) {
//       console.error('❌ Error counting documents:', error);
//       return 0;
//     }
//   }
// }

// src/shared/services/repositories/BaseRepository.ts
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  QueryConstraint,
  Timestamp, 
  limit
} from 'firebase/firestore';
import { db } from '../../../../firebase/config/firebaseConfig';
import { UserFriendlyError, handleFirebaseError } from '../../utils/errorHandler';

export abstract class BaseRepository<T> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected getCollection() {
    return collection(db, this.collectionName);
  }

  protected getDocument(id: string) {
    return doc(db, this.collectionName, id);
  }

  // 🚀 PRODUCTION READY: Retry logic with exponential backoff
  protected async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        console.warn(`🔄 Retry attempt ${attempt}/${maxRetries} for ${this.collectionName}`);
        
        if (attempt === maxRetries) {
          throw handleFirebaseError(error);
        }
        
        // Only retry on network-related errors
        const isNetworkError = error?.code === 'unavailable' || 
                              error?.message?.includes('network') ||
                              error?.message?.includes('offline');
        
        if (isNetworkError) {
          const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // Non-retryable error - throw immediately
        throw handleFirebaseError(error);
      }
    }
    throw new UserFriendlyError(
      'Max retries exceeded',
      'Please check your connection and try again',
      'MAX_RETRIES_EXCEEDED',
      true
    );
  }

  // ✅ INDUSTRY STANDARD: Deep clean data
  protected cleanData(data: any): any {
    if (data === null || data === undefined) {
      return null;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.cleanData(item)).filter(item => item !== null);
    }

    if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof Timestamp)) {
      const cleaned: any = {};
      Object.keys(data).forEach(key => {
        const value = this.cleanData(data[key]);
        if (value !== null && value !== undefined) {
          cleaned[key] = value;
        }
      });
      return cleaned;
    }

    return data;
  }

  // Convert Firestore Timestamp to Date
  protected convertTimestamps(data: any): any {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        if (data[key] instanceof Timestamp) {
          data[key] = data[key].toDate();
        } else if (typeof data[key] === 'object') {
          data[key] = this.convertTimestamps(data[key]);
        }
      });
    }
    return data;
  }

  // 🚀 PRODUCTION READY: Create with retry logic
  async create(data: Omit<T, 'id' | 'uid'>): Promise<string> {
    return this.withRetry(async () => {
      const cleanedData = this.cleanData({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const docRef = await addDoc(this.getCollection(), cleanedData);
      console.log('✅ Document created with ID:', docRef.id);
      return docRef.id;
    });
  }

  async getById(id: string): Promise<T | null> {
    return this.withRetry(async () => {
      const docSnap = await getDoc(this.getDocument(id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        const convertedData = this.convertTimestamps(data);
        
        // Return with appropriate ID field
        if (convertedData.uid) {
          return { ...convertedData } as T;
        } else {
          return { id: docSnap.id, ...convertedData } as T;
        }
      }
      return null;
    });
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    return this.withRetry(async () => {
      const cleanedData = this.cleanData({
        ...data,
        updatedAt: new Date()
      });

      await updateDoc(this.getDocument(id), cleanedData);
      console.log('✅ Document updated:', id);
    });
  }

  async delete(id: string): Promise<void> {
    return this.withRetry(async () => {
      await deleteDoc(this.getDocument(id));
      console.log('✅ Document deleted:', id);
    });
  }

  async query(constraints: QueryConstraint[]): Promise<T[]> {
    return this.withRetry(async () => {
      const q = query(this.getCollection(), ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = this.convertTimestamps(data);
        
        // Smart ID assignment
        if (convertedData.uid) {
          return { ...convertedData } as T;
        } else {
          return { id: doc.id, ...convertedData } as T;
        }
      });
    });
  }

  async getAll(): Promise<T[]> {
    return this.withRetry(async () => {
      const querySnapshot = await getDocs(this.getCollection());
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = this.convertTimestamps(data);
        
        if (convertedData.uid) {
          return { ...convertedData } as T;
        } else {
          return { id: doc.id, ...convertedData } as T;
        }
      });
    });
  }

  // Utility methods with error handling
  async exists(id: string): Promise<boolean> {
    try {
      const docSnap = await getDoc(this.getDocument(id));
      return docSnap.exists();
    } catch (error: any) {
      console.error('❌ Error checking document existence:', error);
      return false;
    }
  }

  async count(): Promise<number> {
    try {
      const querySnapshot = await getDocs(this.getCollection());
      return querySnapshot.size;
    } catch (error: any) {
      console.error('❌ Error counting documents:', error);
      return 0;
    }
  }

  // 🚀 NEW: Check if operation is likely to succeed (offline detection)
  async isOnline(): Promise<boolean> {
    try {
      // Quick test query to check connectivity
      const testQuery = query(this.getCollection(), limit(1));
      await getDocs(testQuery);
      return true;
    } catch (error: any) {
      return false;
    }
  }
}