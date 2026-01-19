
// src/shared/types/domain/core/gym.ts
/**
 * Gym Types - Following user.ts and workout.ts patterns
 * UPDATED: Support for multiple owners and role-based access
 * ENHANCED: Complete payment system with digital payments, analytics, and settings
 */

export type GymStatus = 'active' | 'inactive' | 'pending_verification';
export type PaymentMethod = 'cash' | 'esewa' | 'khalti' | 'bank_transfer' | 'card';
export type CheckinMethod = 'self' | 'staff' | 'pin';
export type MemberStatus = 'active' | 'due' | 'inactive' | 'frozen';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'overdue' | 'due_soon' | 'partially_paid';

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
  logoUrl?: string;
  coverImageUrl?: string;
  contactEmail?: string;
  contactPhone: string;
  website?: string;
  
  // UPDATED: Multiple owners support (replaces ownerId)
  owners: string[]; // Array of user IDs who are owners
  staff: string[];  // Array of user IDs who are staff
  trainers: string[]; // Array of user IDs who are trainers
  members: string[]; //✅ Array of MEMBER IDs from gym_members collection (NOT user IDs!)

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
  memberCode: string;
  status: MemberStatus;
  
  // ============ PERSONAL INFORMATION (NEW) ============
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  dateOfBirth?: Date;
  
  // Social Media (Optional)
  socialMedia?: {
    tiktok?: string;
    instagram?: string;
    facebook?: string;
  };
  
  // ============ EMERGENCY CONTACT (REQUIRED) ============
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  // ============ MEMBERSHIP DETAILS ============
  currentPackage?: GymPackage;
  joinDate: Date;
  expiryDate?: Date;
  autoRenew: boolean;
  
  // ============ PAYMENT TRACKING ============
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;
  totalPaid: number;
  paymentStatus: PaymentStatus;
  
  // ============ ATTENDANCE ============
  totalCheckins: number;
  lastCheckin?: Date;
  averageWeeklyVisits: number;
  
  // ============ ADDITIONAL INFO ============
  notes?: string;
  assignedTrainerId?: string;
  healthNotes?: string; // For trainers/staff only
  
  // ============ TIMESTAMPS ============
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRecord {
    id: string;
    gymId: string;
    memberId: string;
    userId: string;
    
    // Payment details
    amount: number;
    currency: string;
    method: PaymentMethod;
    status: PaymentStatus;
    
    // Discount fields
    discountPercentage?: number;
    originalAmount?: number;
    
    // Transaction tracking
    transactionId?: string;
    paymentDate: Date;
    dueDate: Date;
    periodStart: Date;
    periodEnd: Date;
    
    // Package reference
    packageId?: string;
    packageName?: string;
    
    // Digital payment specifics (optional)
    digitalPayment?: {
      provider: 'esewa' | 'khalti' | 'connectips';
      providerTransactionId?: string;
      status: 'initiated' | 'processing' | 'completed' | 'failed';
      receiptUrl?: string;
      initiatedAt?: Date;
      completedAt?: Date;
    };
    
    // Notes and receipts
    notes?: string;
    receiptUrl?: string;
    
    // Timestamps
    createdAt: Date;
    updatedAt: Date;
  }
  


// NEW: Payment Settings per Gym
export interface GymPaymentSettings {
  gymId: string;
  // Reminder settings
  reminders: {
    enabled: boolean;
    daysBeforeDue: number[];  // [3, 7, 14] - when to send reminders
    sendTime: string;         // '10:00' - time of day to send
    lastReminderSent?: Date;
  };
  // Late payment settings
  lateFees: {
    enabled: boolean;
    feeType: 'fixed' | 'percentage';
    amount: number;
    gracePeriodDays: number;  // Days after due date before late fee
  };
  // Digital payment settings
  digitalPayments: {
    esewa: { enabled: boolean; merchantId?: string };
    khalti: { enabled: boolean; merchantId?: string };
    connectips: { enabled: boolean; merchantId?: string };
  };
  // Reporting settings
  reporting: {
    taxRate: number;          // Tax percentage (e.g., 13 for 13%)
    currency: string;         // Default currency
  };
  updatedAt: Date;
}

// NEW: Payment Summary for Analytics
export interface PaymentSummary {
  period: string;            // '2024-01', '2024-Q1', '2024'
  totalAmount: number;
  totalTransactions: number;
  cashAmount: number;
  digitalAmount: number;
  overdueAmount: number;
  collectionRate: number;    // Percentage of expected payments collected
}

// Add this new DTO for updating members
export interface UpdateGymMemberDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  dateOfBirth?: Date;
  
  socialMedia?: {
    tiktok?: string;
    instagram?: string;
    facebook?: string;
  };
  
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  status?: MemberStatus;
  packageId?: string;
  notes?: string;
  healthNotes?: string;
  assignedTrainerId?: string;
  autoRenew?: boolean;
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

// DTOs for creation/updates
export interface CreateGymDTO {
  name: string;
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

export interface UpdateGymDTO extends Partial<Omit<CreateGymDTO, 'owners'>> {
  status?: GymStatus;
  owners?: string[]; // Allow updating owners array
}

    export interface CreateGymMemberDTO {
    gymId: string;
    userId: string;
    memberCode?: string;
    
    // New required fields
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    
    // Emergency Contact (REQUIRED)
    emergencyContact: {
        name: string;
        phone: string;
        relationship: string;
    };
    
    // Optional fields
    dateOfBirth?: Date;
    socialMedia?: {
        tiktok?: string;
        instagram?: string;
        facebook?: string;
    };
    
    // Membership
    packageId?: string;
    joinDate?: Date;
    notes?: string;
    healthNotes?: string;
    }

  // Update CreatePaymentDTO:
  export interface CreatePaymentDTO {
    gymId: string;
    memberId: string;
    userId: string;
    amount: number;
    currency?: string;
    method: PaymentMethod;
    status?: PaymentStatus;
    
    // Discount fields
    discountPercentage?: number;
    originalAmount?: number;
    
    // Transaction tracking
    transactionId?: string;
    paymentDate?: Date;
    dueDate?: Date;
    periodStart?: Date;
    periodEnd?: Date;
    
    // Package info
    packageId?: string;
    packageName?: string;
    
    // Digital payment
    digitalPayment?: {
      provider: 'esewa' | 'khalti' | 'connectips';
      status: 'initiated' | 'processing';
    };
    
    notes?: string;
    receiptUrl?: string;
  }


  // In src/shared/types/domain/core/gym.ts
    // Update UpdatePaymentDTO:

    export interface UpdatePaymentDTO {
        amount?: number;
        method?: PaymentMethod;
        paymentDate?: Date;
        dueDate?: Date;
        periodStart?: Date;
        periodEnd?: Date;
        notes?: string;
        status?: PaymentStatus;
        receiptUrl?: string;
        transactionId?: string;
        
        // ✅ ADD THESE NEW FIELDS:
        packageId?: string;
        packageName?: string;
        discountPercentage?: number;
        originalAmount?: number;
        
        digitalPayment?: {
            provider: 'esewa' | 'khalti' | 'connectips'; // Required
            providerTransactionId?: string;
            status: 'initiated' | 'processing' | 'completed' | 'failed'; // Required
            receiptUrl?: string;
            initiatedAt?: Date;
            completedAt?: Date;
        };
    }

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