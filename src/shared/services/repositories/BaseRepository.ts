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
    Timestamp 
  } from 'firebase/firestore';
  import { db } from '../../../../firebase/config/firebaseConfig';
  
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
  
    // CRUD Operations
    async create(data: Omit<T, 'id'>): Promise<string> {
      const docRef = await addDoc(this.getCollection(), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    }
  
    async getById(id: string): Promise<T | null> {
      const docSnap = await getDoc(this.getDocument(id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        const convertedData = this.convertTimestamps(data);
        return { id: docSnap.id, ...convertedData } as T;
      }
      return null;
    }
  
    async update(id: string, data: Partial<T>): Promise<void> {
      await updateDoc(this.getDocument(id), {
        ...data,
        updatedAt: new Date()
      });
    }
  
    async delete(id: string): Promise<void> {
      await deleteDoc(this.getDocument(id));
    }
  
    async query(constraints: QueryConstraint[]): Promise<T[]> {
      const q = query(this.getCollection(), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = this.convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as T;
      });
    }
  
    async getAll(): Promise<T[]> {
      const querySnapshot = await getDocs(this.getCollection());
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const convertedData = this.convertTimestamps(data);
        return {
          id: doc.id,
          ...convertedData
        } as T;
      });
    }
  
    // Utility methods
    async exists(id: string): Promise<boolean> {
      const docSnap = await getDoc(this.getDocument(id));
      return docSnap.exists();
    }
  
    async count(): Promise<number> {
      const querySnapshot = await getDocs(this.getCollection());
      return querySnapshot.size;
    }
  }