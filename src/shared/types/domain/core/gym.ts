/**
 * Gym Types - Following user.ts and workout.ts patterns
 */

export type GymStatus = 'active' | 'inactive' | 'pending_verification';
export type PaymentMethod = 'cash' | 'esewa' | 'khalti' | 'bank_transfer';
export type CheckinMethod = 'self' | 'staff' | 'pin';
export type MemberStatus = 'active' | 'inactive' | 'pending' | 'frozen';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'overdue';
export type StaffRole = 'staff' | 'trainer' | 'manager';

export interface GymAddress {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface BusinessHours {
  [key: string]: { // 'monday', 'tuesday', etc.
    open: boolean;
    openTime: string; // '09:00'
    closeTime: string; // '21:00'
  };
}

export interface GymPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string; // 'NPR'
  durationDays: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface GymSettings {
  allowSelfCheckin: boolean;
  requireCheckout: boolean;
  autoCheckoutHours?: number;
  enableNotifications: boolean;
  defaultCurrency: string;
  timezone: string;
  maxMembers?: number;
}

export interface Gym {
  // Core identifiers
  id: string;
  
  // Basic info
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
  logoUrl?: string;
  coverImageUrl?: string;
  contactEmail?: string;
  contactPhone: string;
  website?: string;
  
  // Location
  address: GymAddress;
  businessHours: BusinessHours;
  
  // Packages & Settings
  packages: GymPackage[];
  settings: GymSettings;
  
  // Status
  status: GymStatus;
  
  // Statistics (cached)
  totalMembers: number;
  activeMembers: number;
  totalCheckinsToday: number;
  monthlyRevenue?: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface GymMember {
  id: string;
  gymId: string;
  userId: string;
  memberCode: string; // GYM001, GYM002, etc.
  status: MemberStatus;
  
  // Membership
  currentPackage?: GymPackage;
  joinDate: Date;
  expiryDate?: Date;
  autoRenew: boolean;
  
  // Payment tracking
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;
  totalPaid: number;
  paymentStatus: PaymentStatus;
  
  // Attendance
  totalCheckins: number;
  lastCheckin?: Date;
  averageWeeklyVisits: number;
  
  // Additional info
  notes?: string;
  assignedTrainerId?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckinRecord {
  id: string;
  gymId: string;
  memberId: string;
  userId: string; // Who performed checkin
  
  checkinTime: Date;
  checkoutTime?: Date;
  durationMinutes?: number;
  
  method: CheckinMethod;
  notes?: string;
  
  location?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  
  // Timestamps
  createdAt: Date;
}

export interface PaymentRecord {
  id: string;
  gymId: string;
  memberId: string;
  userId: string; // Who recorded payment
  
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  
  // Payment details
  transactionId?: string;
  paymentDate: Date;
  dueDate?: Date;
  periodStart?: Date;
  periodEnd?: Date;
  
  // Package reference
  packageId?: string;
  packageName?: string;
  
  // Notes and receipts
  notes?: string;
  receiptUrl?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface GymStaff {
  id: string;
  gymId: string;
  userId: string;
  role: StaffRole;
  
  // Permissions
  permissions: {
    canCheckin: boolean;
    canRecordPayments: boolean;
    canManageMembers: boolean;
    canViewReports: boolean;
    canManageStaff?: boolean;
  };
  
  // Employment
  joinDate: Date;
  isActive: boolean;
  
  // Trainer-specific
  specialization?: string[];
  bio?: string;
  hourlyRate?: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for creation/updates - Following workout.ts pattern
export interface CreateGymDTO {
  name: string;
  ownerId: string;
  contactPhone: string;
  address: GymAddress;
  businessHours: BusinessHours;
  packages: Omit<GymPackage, 'id' | 'createdAt'>[];
  settings?: Partial<GymSettings>;

  description?: string;
  contactEmail?: string;
  website?: string;
  logoUrl?: string;
  coverImageUrl?: string;
}

export interface UpdateGymDTO extends Partial<Omit<CreateGymDTO, 'ownerId'>> {
  status?: GymStatus;
}

export interface CreateGymMemberDTO {
  gymId: string;
  userId: string;
  memberCode?: string;
  packageId?: string; 
  joinDate?: Date;
  notes?: string;
}

// Add a separate DTO for assigning package
export interface AssignPackageToMemberDTO {
    memberId: string;
    packageId: string;
    startDate?: Date;
    endDate?: Date;
    autoRenew?: boolean;
  }

export interface CreateCheckinDTO {
  checkinTime: Date;
  gymId: string;
  memberId: string;
  userId: string;
  method: CheckinMethod;
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
}

export interface CreatePaymentDTO {
  gymId: string;
  memberId: string;
  userId: string;
  amount: number;
  method: PaymentMethod;
  currency: string;
  packageId?: string;
  paymentDate?: Date;
  periodStart?: Date;
  periodEnd?: Date;
  notes?: string;
}