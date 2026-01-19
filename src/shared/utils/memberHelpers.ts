// NEW FILE: src/shared/utils/memberHelpers.ts
/**
 * Utility functions for member management and categorization
 */

import { GymMember, MemberStatus } from '../types/domain/core/gym';

// Calculate member category based on join date
export const getMemberCategory = (joinDate: Date): 'new' | 'regular' | 'veteran' => {
  const today = new Date();
  const joinDateObj = new Date(joinDate);
  
  const daysSinceJoin = Math.floor(
    (today.getTime() - joinDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceJoin < 30) {
    return 'new';
  } else if (daysSinceJoin >= 30 && daysSinceJoin <= 180) { // 6 months = 180 days
    return 'regular';
  } else {
    return 'veteran';
  }
};

// Get category color and label
export const getCategoryInfo = (category: 'new' | 'regular' | 'veteran') => {
  switch (category) {
    case 'new':
      return {
        label: '🟢 New',
        color: '#06D6A0', // Green
        backgroundColor: '#06D6A015',
      };
    case 'regular':
      return {
        label: '🟡 Regular',
        color: '#FFD166', // Yellow
        backgroundColor: '#FFD16615',
      };
    case 'veteran':
      return {
        label: '🔵 Veteran',
        color: '#118AB2', // Blue
        backgroundColor: '#118AB215',
      };
  }
};

// Calculate days since join
export const getDaysSinceJoin = (joinDate: Date): string => {
  const today = new Date();
  const joinDateObj = new Date(joinDate);
  
  const days = Math.floor(
    (today.getTime() - joinDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m ago`;
  
  const years = Math.floor(months / 12);
  return `${years}y ago`;
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a Nepali number
  if (cleaned.startsWith('977') || cleaned.startsWith('+977')) {
    // Format: +977 98XXXXXXXX
    const match = cleaned.match(/^(\+?977)?(\d{2})(\d{8})$/);
    if (match) {
      return `+977 ${match[2]} ${match[3]}`;
    }
  }
  
  // Default international format
  if (cleaned.length > 10) {
    const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
  }
  
  // Return as is if we can't format
  return phone;
};

// Filter members by search term
export const filterMembersBySearch = (
  members: GymMember[],
  searchTerm: string
): GymMember[] => {
  if (!searchTerm.trim()) return members;
  
  const term = searchTerm.toLowerCase().trim();
  
  return members.filter(member => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    const email = member.email?.toLowerCase() || '';
    const phone = member.phoneNumber?.toLowerCase() || '';
    const memberCode = member.memberCode?.toLowerCase() || '';
    
    return (
      fullName.includes(term) ||
      email.includes(term) ||
      phone.includes(term) ||
      memberCode.includes(term)
    );
  });
};

// Sort members by various criteria
export const sortMembers = (
  members: GymMember[],
  sortBy: 'name' | 'joinDate' | 'lastPayment' | 'lastCheckin'
): GymMember[] => {
  const sorted = [...members];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      
    case 'joinDate':
      return sorted.sort((a, b) => 
        new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      );
      
    case 'lastPayment':
      return sorted.sort((a, b) => {
        const dateA = a.lastPaymentDate ? new Date(a.lastPaymentDate).getTime() : 0;
        const dateB = b.lastPaymentDate ? new Date(b.lastPaymentDate).getTime() : 0;
        return dateB - dateA;
      });
      
    case 'lastCheckin':
      return sorted.sort((a, b) => {
        const dateA = a.lastCheckin ? new Date(a.lastCheckin).getTime() : 0;
        const dateB = b.lastCheckin ? new Date(b.lastCheckin).getTime() : 0;
        return dateB - dateA;
      });
      
    default:
      return sorted;
  }
};

// Get recent members (joined in last 7 days)
export const getRecentMembers = (members: GymMember[], limit = 5): GymMember[] => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return members
    .filter(member => new Date(member.joinDate) > sevenDaysAgo)
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, limit);
};

// Calculate member statistics
export const calculateMemberStats = (members: GymMember[]) => {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const newMembers = members.filter(m => getMemberCategory(m.joinDate) === 'new').length;
  const overdueMembers = members.filter(m => 
    m.paymentStatus === 'overdue' && m.status === 'active'
  ).length;
  
  return {
    total: members.length,
    active: activeMembers,
    new: newMembers,
    overdue: overdueMembers,
  };
};

// Check if member's package is due (expired)
export const isPackageDue = (member: GymMember): boolean => {
    if (!member.expiryDate) return false;
    if (member.status === 'inactive' || member.status === 'frozen') return false;
    
    const today = new Date();
    const expiryDate = new Date(member.expiryDate);
    return expiryDate < today;
  };
  
  // Calculate days until expiry
  export const getDaysUntilExpiry = (member: GymMember): number | null => {
    if (!member.expiryDate) return null;
    
    const today = new Date();
    const expiryDate = new Date(member.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Get expiry status text and color
  export const getExpiryStatus = (member: GymMember): {
    text: string;
    color: string;
    isDue: boolean;
  } => {
    if (!member.expiryDate) {
      return { text: 'No expiry', color: '#6B7280', isDue: false };
    }
    
    const today = new Date();
    const expiryDate = new Date(member.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { text: `Expired ${Math.abs(daysUntilExpiry)}d ago`, color: '#EF4444', isDue: true };
    } else if (daysUntilExpiry === 0) {
      return { text: 'Expires today', color: '#F59E0B', isDue: false };
    } else if (daysUntilExpiry <= 3) {
      return { text: `Expires in ${daysUntilExpiry}d`, color: '#F59E0B', isDue: false };
    } else if (daysUntilExpiry <= 7) {
      return { text: `Expires in ${daysUntilExpiry}d`, color: '#10B981', isDue: false };
    } else {
      return { text: `Expires ${expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, color: '#10B981', isDue: false };
    }
  };
  
  // Enhanced member status calculation (considers package expiry)
  export const calculateEnhancedMemberStatus = (member: GymMember): {
    displayStatus: MemberStatus;
    isDue: boolean;
    statusColor: string;
  } => {
    // If member is explicitly inactive or frozen, keep that
    if (member.status === 'inactive' || member.status === 'frozen') {
      const color = member.status === 'inactive' ? '#6B7280' : '#8B5CF6';
      return { 
        displayStatus: member.status, 
        isDue: false, 
        statusColor: color 
      };
    }
    
    // Check if package is due
    const due = isPackageDue(member);
    if (due) {
      return { 
        displayStatus: 'due', 
        isDue: true, 
        statusColor: '#EF4444' 
      };
    }
    
    // Otherwise active
    return { 
      displayStatus: 'active', 
      isDue: false, 
      statusColor: '#10B981' 
    };
  };

// Validate emergency contact
export const validateEmergencyContact = (contact: {
  name: string;
  phone: string;
  relationship: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!contact.name?.trim()) {
    errors.push('Emergency contact name is required');
  }
  
  if (!contact.phone?.trim()) {
    errors.push('Emergency contact phone is required');
  } else if (!/^\+?[\d\s\-\(\)]{8,}$/.test(contact.phone)) {
    errors.push('Emergency contact phone is invalid');
  }
  
  if (!contact.relationship?.trim()) {
    errors.push('Emergency contact relationship is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };

  
};