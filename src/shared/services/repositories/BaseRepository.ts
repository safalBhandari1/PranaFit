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
//   Timestamp, 
//   limit
// } from 'firebase/firestore';
// import { db } from '../../../../firebase/config/firebaseConfig';
// import { UserFriendlyError, handleFirebaseError } from '../../utils/errorHandler';

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

//   // 🚀 PRODUCTION READY: Retry logic with exponential backoff
//   protected async withRetry<T>(
//     operation: () => Promise<T>,
//     maxRetries = 3,
//     baseDelay = 1000
//   ): Promise<T> {
//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//       try {
//         return await operation();
//       } catch (error: any) {
//         console.warn(`🔄 Retry attempt ${attempt}/${maxRetries} for ${this.collectionName}`);
        
//         if (attempt === maxRetries) {
//           throw handleFirebaseError(error);
//         }
        
//         // Only retry on network-related errors
//         const isNetworkError = error?.code === 'unavailable' || 
//                               error?.message?.includes('network') ||
//                               error?.message?.includes('offline');
        
//         if (isNetworkError) {
//           const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
//           await new Promise(resolve => setTimeout(resolve, delay));
//           continue;
//         }
        
//         // Non-retryable error - throw immediately
//         throw handleFirebaseError(error);
//       }
//     }
//     throw new UserFriendlyError(
//       'Max retries exceeded',
//       'Please check your connection and try again',
//       'MAX_RETRIES_EXCEEDED',
//       true
//     );
//   }

//   // ✅ INDUSTRY STANDARD: Deep clean data
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

//   // 🚀 PRODUCTION READY: Create with retry logic
//   async create(data: Omit<T, 'id'> & { uid?: string }): Promise<string> {
//     return this.withRetry(async () => {
//       const cleanedData = this.cleanData({
//         ...data,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });

//       const docRef = await addDoc(this.getCollection(), cleanedData);
//       console.log('✅ Document created with ID:', docRef.id);
//       return docRef.id;
//     });
//   }

//   async getById(id: string): Promise<T | null> {
//     return this.withRetry(async () => {
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
//     });
//   }

//   async update(id: string, data: Partial<T>): Promise<void> {
//     return this.withRetry(async () => {
//       const cleanedData = this.cleanData({
//         ...data,
//         updatedAt: new Date()
//       });

//       await updateDoc(this.getDocument(id), cleanedData);
//       console.log('✅ Document updated:', id);
//     });
//   }

//   async delete(id: string): Promise<void> {
//     return this.withRetry(async () => {
//       await deleteDoc(this.getDocument(id));
//       console.log('✅ Document deleted:', id);
//     });
//   }

//   async query(constraints: QueryConstraint[]): Promise<T[]> {
//     return this.withRetry(async () => {
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
//     });
//   }

//   async getAll(): Promise<T[]> {
//     return this.withRetry(async () => {
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
//     });
//   }

//   // Utility methods with error handling
//   async exists(id: string): Promise<boolean> {
//     try {
//       const docSnap = await getDoc(this.getDocument(id));
//       return docSnap.exists();
//     } catch (error: any) {
//       console.error('❌ Error checking document existence:', error);
//       return false;
//     }
//   }

//   async count(): Promise<number> {
//     try {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.size;
//     } catch (error: any) {
//       console.error('❌ Error counting documents:', error);
//       return 0;
//     }
//   }

//   // 🚀 NEW: Check if operation is likely to succeed (offline detection)
//   async isOnline(): Promise<boolean> {
//     try {
//       // Quick test query to check connectivity
//       const testQuery = query(this.getCollection(), limit(1));
//       await getDocs(testQuery);
//       return true;
//     } catch (error: any) {
//       return false;
//     }
//   }
// }


// // src/shared/services/repositories/BaseRepository.ts - FIXED VERSION
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
//   Timestamp, 
//   limit
// } from 'firebase/firestore';
// import { db } from '../../../../firebase/config/firebaseConfig';
// import { UserFriendlyError, handleFirebaseError } from '../../utils/errorHandler';

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

//   // 🚀 PRODUCTION READY: Retry logic with exponential backoff
//   protected async withRetry<T>(
//     operation: () => Promise<T>,
//     maxRetries = 3,
//     baseDelay = 1000
//   ): Promise<T> {
//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//       try {
//         return await operation();
//       } catch (error: any) {
//         console.warn(`🔄 Retry attempt ${attempt}/${maxRetries} for ${this.collectionName}`);
        
//         if (attempt === maxRetries) {
//           throw handleFirebaseError(error);
//         }
        
//         // Only retry on network-related errors
//         const isNetworkError = error?.code === 'unavailable' || 
//                               error?.message?.includes('network') ||
//                               error?.message?.includes('offline');
        
//         if (isNetworkError) {
//           const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
//           await new Promise(resolve => setTimeout(resolve, delay));
//           continue;
//         }
        
//         // Non-retryable error - throw immediately
//         throw handleFirebaseError(error);
//       }
//     }
//     throw new UserFriendlyError(
//       'Max retries exceeded',
//       'Please check your connection and try again',
//       'MAX_RETRIES_EXCEEDED',
//       true
//     );
//   }

//   // ✅ INDUSTRY STANDARD: Deep clean data
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

//   // 🚀 PRODUCTION READY: Create with retry logic
//   async create(data: Omit<T, 'id'> & { uid?: string }): Promise<string> {
//     return this.withRetry(async () => {
//       const cleanedData = this.cleanData({
//         ...data,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });

//       const docRef = await addDoc(this.getCollection(), cleanedData);
//       console.log('✅ Document created with ID:', docRef.id);
//       return docRef.id;
//     });
//   }

//   // ✅ FIXED: getById ALWAYS includes document ID
//   async getById(id: string): Promise<T | null> {
//     return this.withRetry(async () => {
//       const docSnap = await getDoc(this.getDocument(id));
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // ✅ FIX: ALWAYS include document ID, regardless of uid field
//         return { 
//           id: docSnap.id, // Always include document ID
//           ...convertedData 
//         } as T;
//       }
//       return null;
//     });
//   }

//   async update(id: string, data: Partial<T>): Promise<void> {
//     return this.withRetry(async () => {
//       const cleanedData = this.cleanData({
//         ...data,
//         updatedAt: new Date()
//       });

//       await updateDoc(this.getDocument(id), cleanedData);
//       console.log('✅ Document updated:', id);
//     });
//   }

//   async delete(id: string): Promise<void> {
//     return this.withRetry(async () => {
//       await deleteDoc(this.getDocument(id));
//       console.log('✅ Document deleted:', id);
//     });
//   }

//   // ✅ FIXED: query ALWAYS includes document ID
//   async query(constraints: QueryConstraint[]): Promise<T[]> {
//     return this.withRetry(async () => {
//       const q = query(this.getCollection(), ...constraints);
//       const querySnapshot = await getDocs(q);
      
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // ✅ FIX: ALWAYS include document ID
//         return { 
//           id: doc.id, // Always include document ID
//           ...convertedData 
//         } as T;
//       });
//     });
//   }

//   // ✅ FIXED: getAll ALWAYS includes document ID
//   async getAll(): Promise<T[]> {
//     return this.withRetry(async () => {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // ✅ FIX: ALWAYS include document ID
//         return { 
//           id: doc.id, // Always include document ID
//           ...convertedData 
//         } as T;
//       });
//     });
//   }

//   // Utility methods with error handling
//   async exists(id: string): Promise<boolean> {
//     try {
//       const docSnap = await getDoc(this.getDocument(id));
//       return docSnap.exists();
//     } catch (error: any) {
//       console.error('❌ Error checking document existence:', error);
//       return false;
//     }
//   }

//   async count(): Promise<number> {
//     try {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.size;
//     } catch (error: any) {
//       console.error('❌ Error counting documents:', error);
//       return 0;
//     }
//   }

//   // 🚀 NEW: Check if operation is likely to succeed (offline detection)
//   async isOnline(): Promise<boolean> {
//     try {
//       // Quick test query to check connectivity
//       const testQuery = query(this.getCollection(), limit(1));
//       await getDocs(testQuery);
//       return true;
//     } catch (error: any) {
//       return false;
//     }
//   }
// }






// // src/shared/services/repositories/BaseRepository.ts - DEBUGGING VERSION
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
//   Timestamp, 
//   limit
// } from 'firebase/firestore';
// import { db } from '../../../../firebase/config/firebaseConfig';
// import { UserFriendlyError, handleFirebaseError } from '../../utils/errorHandler';

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

//   // 🚀 PRODUCTION READY: Retry logic with exponential backoff
//   protected async withRetry<T>(
//     operation: () => Promise<T>,
//     maxRetries = 3,
//     baseDelay = 1000
//   ): Promise<T> {
//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//       try {
//         return await operation();
//       } catch (error: any) {
//         console.warn(`🔄 Retry attempt ${attempt}/${maxRetries} for ${this.collectionName}`);
        
//         if (attempt === maxRetries) {
//           throw handleFirebaseError(error);
//         }
        
//         // Only retry on network-related errors
//         const isNetworkError = error?.code === 'unavailable' || 
//                               error?.message?.includes('network') ||
//                               error?.message?.includes('offline');
        
//         if (isNetworkError) {
//           const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
//           await new Promise(resolve => setTimeout(resolve, delay));
//           continue;
//         }
        
//         // Non-retryable error - throw immediately
//         throw handleFirebaseError(error);
//       }
//     }
//     throw new UserFriendlyError(
//       'Max retries exceeded',
//       'Please check your connection and try again',
//       'MAX_RETRIES_EXCEEDED',
//       true
//     );
//   }

//   // ✅ INDUSTRY STANDARD: Deep clean data
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

//   // Convert Firestore Timestamp to Date - DEBUG VERSION
//   protected convertTimestamps(data: any): any {
//     console.log('🔍 convertTimestamps START - Input:', { 
//       data, 
//       type: typeof data,
//       isArray: Array.isArray(data),
//       isObject: data && typeof data === 'object',
//       keys: data && typeof data === 'object' ? Object.keys(data) : []
//     });

//     // Handle null/undefined
//     if (data === null || data === undefined) {
//       console.log('🔍 convertTimestamps: null/undefined, returning as-is');
//       return data;
//     }

//     // Handle non-objects (strings, numbers, booleans)
//     if (typeof data !== 'object') {
//       console.log('🔍 convertTimestamps: primitive value, returning as-is');
//       return data;
//     }

//     // Handle Date objects
//     if (data instanceof Date) {
//       console.log('🔍 convertTimestamps: Date object, returning as-is');
//       return data;
//     }

//     // Handle Firestore Timestamp objects
//     if (data instanceof Timestamp) {
//       console.log('🔍 convertTimestamps: Timestamp object, converting to Date');
//       return data.toDate();
//     }

//     // Handle arrays
//     if (Array.isArray(data)) {
//       console.log('🔍 convertTimestamps: Array with length', data.length);
//       const result = data.map((item, index) => {
//         console.log(`🔍 convertTimestamps: Processing array item ${index}:`, item);
//         return this.convertTimestamps(item);
//       });
//       console.log('🔍 convertTimestamps: Array result:', result);
//       return result;
//     }

//     // Handle objects
//     console.log('🔍 convertTimestamps: Processing object with keys:', Object.keys(data));
//     const result: any = {};
    
//     Object.keys(data).forEach(key => {
//       try {
//         const value = data[key];
//         console.log(`🔍 convertTimestamps: Processing key "${key}":`, { 
//           value, 
//           type: typeof value,
//           isTimestamp: value instanceof Timestamp,
//           isDate: value instanceof Date,
//           isObject: value && typeof value === 'object',
//           isArray: Array.isArray(value)
//         });

//         // Recursively process the value
//         result[key] = this.convertTimestamps(value);
//       } catch (error) {
//         console.error(`❌ convertTimestamps: Error processing key "${key}":`, error);
//         // Keep the original value if conversion fails
//         result[key] = data[key];
//       }
//     });

//     console.log('🔍 convertTimestamps END - Output:', result);
//     return result;
//   }

//   // 🚀 PRODUCTION READY: Create with retry logic
//   async create(data: Omit<T, 'id'> & { uid?: string }): Promise<string> {
//     return this.withRetry(async () => {
//       const cleanedData = this.cleanData({
//         ...data,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });

//       const docRef = await addDoc(this.getCollection(), cleanedData);
//       console.log('✅ Document created with ID:', docRef.id);
//       return docRef.id;
//     });
//   }

//   // ✅ SIMPLIFIED: getById with detailed debugging (NO TIMESTAMP CONVERSION)
//   async getById(id: string): Promise<T | null> {
//     console.log(`\n🔍🔍🔍 getById START for ${this.collectionName}:`, id);
    
//     try {
//       // Bypass retry logic temporarily for debugging
//       const docRef = this.getDocument(id);
//       console.log('🔍 Document reference path:', docRef.path);
      
//       console.log('🔍 Calling getDoc...');
//       const docSnap = await getDoc(docRef);
//       console.log('🔍 getDoc completed. Document exists:', docSnap.exists());
      
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         console.log('🔍 Raw document data from Firestore:', data);
//         console.log('🔍 Document ID:', docSnap.id);
        
//         // SIMPLIFIED: Return raw data without any conversion
//         const result = { 
//           id: docSnap.id, // Always include document ID
//           ...data 
//         } as T;
        
//         console.log('🔍 Final result object:', result);
//         console.log(`✅ getById SUCCESS for ${id}`);
//         return result;
//       } else {
//         console.log(`❌ getById: Document ${id} does not exist in Firestore`);
//         return null;
//       }
//     } catch (error: any) {
//       console.error(`❌❌❌ getById ERROR for ${id}:`, error);
//       console.error('Error name:', error.name);
//       console.error('Error code:', error.code);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//       return null;
//     }
//   }

//   async update(id: string, data: Partial<T>): Promise<void> {
//     return this.withRetry(async () => {
//       const cleanedData = this.cleanData({
//         ...data,
//         updatedAt: new Date()
//       });

//       await updateDoc(this.getDocument(id), cleanedData);
//       console.log('✅ Document updated:', id);
//     });
//   }

//   async delete(id: string): Promise<void> {
//     return this.withRetry(async () => {
//       await deleteDoc(this.getDocument(id));
//       console.log('✅ Document deleted:', id);
//     });
//   }

//   // ✅ FIXED: query ALWAYS includes document ID
//   async query(constraints: QueryConstraint[]): Promise<T[]> {
//     return this.withRetry(async () => {
//       const q = query(this.getCollection(), ...constraints);
//       const querySnapshot = await getDocs(q);
      
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // ✅ FIX: ALWAYS include document ID
//         return { 
//           id: doc.id, // Always include document ID
//           ...convertedData 
//         } as T;
//       });
//     });
//   }

//   // ✅ FIXED: getAll ALWAYS includes document ID
//   async getAll(): Promise<T[]> {
//     return this.withRetry(async () => {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         const convertedData = this.convertTimestamps(data);
        
//         // ✅ FIX: ALWAYS include document ID
//         return { 
//           id: doc.id, // Always include document ID
//           ...convertedData 
//         } as T;
//       });
//     });
//   }

//   // Utility methods with error handling
//   async exists(id: string): Promise<boolean> {
//     try {
//       const docSnap = await getDoc(this.getDocument(id));
//       return docSnap.exists();
//     } catch (error: any) {
//       console.error('❌ Error checking document existence:', error);
//       return false;
//     }
//   }

//   async count(): Promise<number> {
//     try {
//       const querySnapshot = await getDocs(this.getCollection());
//       return querySnapshot.size;
//     } catch (error: any) {
//       console.error('❌ Error counting documents:', error);
//       return 0;
//     }
//   }

//   // 🚀 NEW: Check if operation is likely to succeed (offline detection)
//   async isOnline(): Promise<boolean> {
//     try {
//       // Quick test query to check connectivity
//       const testQuery = query(this.getCollection(), limit(1));
//       await getDocs(testQuery);
//       return true;
//     } catch (error: any) {
//       return false;
//     }
//   }
// }



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
  limit,
  setDoc // ✅ NEW IMPORT
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
    // Handle null/undefined
    if (data === null || data === undefined) {
      return data;
    }

    // Handle non-objects (strings, numbers, booleans)
    if (typeof data !== 'object') {
      return data;
    }

    // Handle Date objects
    if (data instanceof Date) {
      return data;
    }

    // Handle Firestore Timestamp objects
    if (data instanceof Timestamp) {
      return data.toDate();
    }

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => this.convertTimestamps(item));
    }

    // Handle objects
    const result: any = {};
    
    Object.keys(data).forEach(key => {
      try {
        const value = data[key];
        // Recursively process the value
        result[key] = this.convertTimestamps(value);
      } catch (error) {
        // Keep the original value if conversion fails
        result[key] = data[key];
      }
    });

    return result;
  }

  // 🚀 PRODUCTION READY: Create with retry logic (AUTO-GENERATED ID)
  async create(data: Omit<T, 'id'> & { uid?: string }): Promise<string> {
    return this.withRetry(async () => {
      const cleanedData = this.cleanData({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const docRef = await addDoc(this.getCollection(), cleanedData);
      console.log(`✅ Document created with auto-generated ID: ${docRef.id}`);
      return docRef.id;
    });
  }

  // ✅ NEW: Create with specific ID (USE THIS FOR USERS!)
  async createWithId(id: string, data: Omit<T, 'id'> & { uid?: string }): Promise<string> {
    return this.withRetry(async () => {
      const cleanedData = this.cleanData({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Create document with the specified ID
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, cleanedData);
      console.log(`✅ Document created with custom ID: ${id}`);
      return id;
    });
  }

  // ✅ FIXED: getById - Now properly returns document
  async getById(id: string): Promise<T | null> {
    try {
      const docRef = this.getDocument(id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const convertedData = this.convertTimestamps(data);
        
        return { 
          id: docSnap.id, // Always include document ID
          ...convertedData 
        } as T;
      }
      
      console.log(`❌ Document ${id} not found in ${this.collectionName}`);
      return null;
    } catch (error: any) {
      console.error(`❌ Error in getById for ${id}:`, error);
      return null;
    }
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    return this.withRetry(async () => {
      const cleanedData = this.cleanData({
        ...data,
        updatedAt: new Date()
      });

      await updateDoc(this.getDocument(id), cleanedData);
      console.log(`✅ Document updated: ${id}`);
    });
  }

  async delete(id: string): Promise<void> {
    return this.withRetry(async () => {
      await deleteDoc(this.getDocument(id));
      console.log(`✅ Document deleted: ${id}`);
    });
  }

  // ✅ FIXED: query ALWAYS includes document ID
  async query(constraints: QueryConstraint[]): Promise<T[]> {
    return this.withRetry(async () => {
      const q = query(this.getCollection(), ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = this.convertTimestamps(data);
        
        // ✅ FIX: ALWAYS include document ID
        return { 
          id: doc.id, // Always include document ID
          ...convertedData 
        } as T;
      });
    });
  }

  // ✅ FIXED: getAll ALWAYS includes document ID
  async getAll(): Promise<T[]> {
    return this.withRetry(async () => {
      const querySnapshot = await getDocs(this.getCollection());
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = this.convertTimestamps(data);
        
        // ✅ FIX: ALWAYS include document ID
        return { 
          id: doc.id, // Always include document ID
          ...convertedData 
        } as T;
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