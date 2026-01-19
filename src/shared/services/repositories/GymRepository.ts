import { 
    where, 
    orderBy, 
    query,
    arrayUnion,
    arrayRemove
  } from 'firebase/firestore';
  import { BaseRepository } from './BaseRepository';
  import { 
    Gym, 
    CreateGymDTO, 
    UpdateGymDTO,
    GymStatus,
    GymPackage
  } from '../../types/domain/core/gym';
  import { handleFirebaseError } from '../../utils/errorHandler';
  
  export class GymRepository extends BaseRepository<Gym> {
    constructor() {
      super('gyms');
    }
  
    /**
     * Create a new gym with multiple owners support
     */
    async createGym(gymData: CreateGymDTO & { owners: string[] }): Promise<string> {
      try {
        // Generate slug from name
        const slug = gymData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        // Default settings if not provided
        const defaultSettings = {
          allowSelfCheckin: true,
          requireCheckout: false,
          enableNotifications: true,
          defaultCurrency: 'NPR',
          timezone: 'Asia/Kathmandu',
          maxMembers: 100
        };
  
        // Convert package DTOs to full GymPackage objects with IDs and timestamps
        const packages: GymPackage[] = gymData.packages.map((pkg, index) => ({
          ...pkg,
          id: `pkg_${Date.now()}_${index}`,
          createdAt: new Date(),
          isActive: pkg.isActive !== undefined ? pkg.isActive : true
        }));
  
        const gymToCreate: Omit<Gym, 'id'> & { uid?: string } = {
          // Required fields from DTO
          name: gymData.name,
          contactPhone: gymData.contactPhone,
          address: gymData.address,
          businessHours: gymData.businessHours,
          
          // NEW: Multiple owners array
          owners: gymData.owners,
          staff: [], // Initialize empty arrays
          trainers: [],
          members: [],
          
          // Generated/computed fields
          slug,
          status: 'active' as GymStatus,
          settings: {
            ...defaultSettings,
            ...gymData.settings
          },
          packages,
          
          // Optional fields from DTO (with defaults)
          description: gymData.description || '',
          contactEmail: gymData.contactEmail || '',
          website: gymData.website || '',
          logoUrl: gymData.logoUrl || '',
          coverImageUrl: gymData.coverImageUrl || '',
          
          // Statistics (cached for performance)
          totalMembers: 0,
          activeMembers: 0,
          totalCheckinsToday: 0,
          monthlyRevenue: 0,
          
          // Timestamps
          createdAt: new Date(),
          updatedAt: new Date()
        };
  
        return await this.create(gymToCreate);
      } catch (error: any) {
        console.error('❌ Error creating gym:', error);
        throw handleFirebaseError(error);
      }
    }
  
    /**
     * Get gyms by owner - UPDATED for multiple owners
     */
    async getGymsByOwner(ownerId: string): Promise<Gym[]> {
      // Query gyms where owners array contains this ownerId
      return this.query([
        where('owners', 'array-contains', ownerId),
        orderBy('createdAt', 'desc')
      ]);
    }
  
    /**
     * Get gyms where user has any role
     */
    async getGymsByUser(userId: string): Promise<Gym[]> {
      // This is a complex query - might need to query multiple arrays
      // For simplicity, we'll get all gyms and filter client-side
      const allGyms = await this.getAll();
      return allGyms.filter(gym => 
        gym.owners.includes(userId) ||
        gym.staff.includes(userId) ||
        gym.trainers.includes(userId) ||
        gym.members.includes(userId)
      );
    }
  
    /**
     * Get gym by slug - For public URLs
     */
    async getGymBySlug(slug: string): Promise<Gym | null> {
      const gyms = await this.query([where('slug', '==', slug)]);
      return gyms.length > 0 ? gyms[0] : null;
    }
  
    /**
     * Get active gyms - For member browsing
     */
    async getActiveGyms(limit: number = 50): Promise<Gym[]> {
      return this.query([
        where('status', '==', 'active'),
        orderBy('totalMembers', 'desc'),
        orderBy('createdAt', 'desc')
      ]);
    }
  
    /**
     * Search gyms by name
     */
    async searchGymsByName(name: string): Promise<Gym[]> {
      if (!name.trim()) return [];
      
      return this.query([
        where('name', '>=', name),
        where('name', '<=', name + '\uf8ff')
      ]);
    }
  
    /**
     * Update gym statistics - Optimized updates
     */
    async updateGymStats(gymId: string, stats: Partial<{
      totalMembers: number;
      activeMembers: number;
      totalCheckinsToday: number;
      monthlyRevenue: number;
    }>): Promise<void> {
      return this.update(gymId, {
        ...stats,
        updatedAt: new Date()
      });
    }
  
    /**
     * Add user to gym's role array
     */
    async addUserToGymRole(gymId: string, userId: string, role: 'owners' | 'staff' | 'trainers' | 'members'): Promise<void> {
      const gym = await this.getById(gymId);
      if (!gym) throw new Error('Gym not found');
  
      // Check if user already in this array
      if (gym[role].includes(userId)) {
        throw new Error(`User already in ${role} array`);
      }
  
      await this.update(gymId, {
        [role]: arrayUnion(userId),
        updatedAt: new Date()
      });
    }
  
    /**
     * Remove user from gym's role array
     */
    async removeUserFromGymRole(gymId: string, userId: string, role: 'owners' | 'staff' | 'trainers' | 'members'): Promise<void> {
      const gym = await this.getById(gymId);
      if (!gym) throw new Error('Gym not found');
  
      // Check if user is in this array
      if (!gym[role].includes(userId)) {
        throw new Error(`User not in ${role} array`);
      }
  
      await this.update(gymId, {
        [role]: arrayRemove(userId),
        updatedAt: new Date()
      });
    }
  
    /**
     * Check if gym exists - UPDATED for multiple owners
     */
    async gymExistsByOwner(ownerId: string): Promise<boolean> {
      try {
        const gyms = await this.getGymsByOwner(ownerId);
        return gyms.length > 0;
      } catch (error: any) {
        console.error('❌ Error checking gym existence:', error);
        return false;
      }
    }
  
    /**
     * Get gyms with multiple owners
     */
    async getGymsWithMultipleOwners(): Promise<Gym[]> {
      const allGyms = await this.getAll();
      return allGyms.filter(gym => gym.owners.length > 1);
    }
  }
  
  export const gymRepository = new GymRepository();