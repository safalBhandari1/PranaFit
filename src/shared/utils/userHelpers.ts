import { User, GymRole } from '../types/domain/core/user';

/**
 * Utility functions for working with the new user structure
 */

// Check if user has access to a specific gym
export const hasAccessToGym = (user: User | null, gymId: string): boolean => {
  if (!user || !gymId) return false;
  return user.gymMemberships?.some(m => m.gymId === gymId && m.isActive) || false;
};

// Get user's role in a specific gym
export const getGymRole = (user: User | null, gymId: string): GymRole | undefined => {
  if (!user || !gymId) return undefined;
  return user.gymMemberships?.find(m => m.gymId === gymId)?.gymRole;
};

// Check if user is an owner of any gym
export const isAnyGymOwner = (user: User | null): boolean => {
  if (!user) return false;
  return user.gymMemberships?.some(m => m.gymRole === 'owner') || false;
};

// Check if user is staff/trainer of any gym
export const isAnyGymStaff = (user: User | null): boolean => {
  if (!user) return false;
  return user.gymMemberships?.some(m => ['staff', 'trainer'].includes(m.gymRole)) || false;
};

// Get all gym IDs where user has a specific role
export const getGymsByRole = (user: User | null, role: GymRole): string[] => {
  if (!user) return [];
  return user.gymMemberships
    ?.filter(m => m.gymRole === role)
    .map(m => m.gymId) || [];
};

// Check if user can switch to a different gym
export const canSwitchToGym = (user: User | null, gymId: string): boolean => {
  if (!user || !gymId) return false;
  return hasAccessToGym(user, gymId) && user.currentGymId !== gymId;
};

// Get primary gym ID (first active gym or currentGymId)
export const getPrimaryGymId = (user: User | null): string | undefined => {
  if (!user) return undefined;
  return user.currentGymId || user.gymMemberships?.[0]?.gymId;
};

// Check if user is a pure fitness user (no gym associations)
export const isPureFitnessUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'fitness_user' && (user.gymMemberships?.length || 0) === 0;
};

// Check if user is a paying member at any gym
export const isPayingMember = (user: User | null): boolean => {
  if (!user) return false;
  return user.gymMemberships?.some(m => m.gymRole === 'member') || false;
};