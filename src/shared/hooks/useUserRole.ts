// // src/shared/hooks/useUserRole.ts
// import { useAppStore } from '../stores/useAppStore';
// import { UserRole } from '../types/domain/core/user';

// export const useUserRole = () => {
//   const { user, getUserRole, isGymOwner, isGymStaff, isGymTrainer, isRegularMember } = useAppStore();

//   const currentRole = getUserRole();
//   const isOwner = isGymOwner();
//   const isStaff = isGymStaff();
//   const isTrainer = isGymTrainer();
//   const isRegular = isRegularMember();

//   return {
//     // User object
//     user,
    
//     // Role detection
//     currentRole,
//     isRegularMember: isRegular,
//     isGymOwner: isOwner,
//     isGymStaff: isStaff,
//     isGymTrainer: isTrainer,
//     hasGymRole: ['gym_owner', 'gym_staff', 'gym_trainer'].includes(currentRole),
    
//     // Role groups
//     isGymBusinessUser: isOwner || isStaff,
//     isGymPersonnel: isOwner || isStaff || isTrainer,
    
//     // Quick checks
//     canManageGym: isOwner || isStaff,
//     canViewBusinessData: isOwner || isStaff,
//     canManageClients: isTrainer || isOwner,
    
//     // Helper for navigation labels
//     getHomeTabLabel: () => {
//       if (isOwner || isStaff) return 'Dashboard';
//       if (isTrainer) return 'Clients';
//       return 'Home';
//     },
    
//     getProjectsTabLabel: () => {
//       if (isTrainer) return 'Programs';
//       if (isOwner) return 'Challenges';
//       return 'Projects';
//     },
    
//     // Permission checks
//     hasPermission: (permission: string): boolean => {
//       switch (permission) {
//         case 'manage_gym':
//           return isOwner;
//         case 'manage_members':
//           return isOwner || isStaff;
//         case 'record_payments':
//           return isOwner || isStaff;
//         case 'record_checkins':
//           return isOwner || isStaff || isTrainer;
//         case 'view_business_data':
//           return isOwner || isStaff;
//         case 'manage_trainers':
//           return isOwner;
//         case 'create_programs':
//           return isTrainer || isOwner;
//         case 'view_client_data':
//           return isTrainer || isOwner;
//         default:
//           return false;
//       }
//     }
//   };
// };


// src/shared/hooks/useUserRole.ts (FIXED VERSION)
import { useAppStore } from '../stores/useAppStore';

export const useUserRole = () => {
  // CORRECT: Use individual selectors to get primitive values
  const userRole = useAppStore((state) => state.user?.role || 'member');
  const userId = useAppStore((state) => state.user?.uid);
  const user = useAppStore((state) => state.user);
  
  const isOwner = userRole === 'gym_owner';
  const isStaff = userRole === 'gym_staff';
  const isTrainer = userRole === 'gym_trainer';
  const isRegular = userRole === 'member';

  return {
    user,
    currentRole: userRole,
    isRegularMember: isRegular,
    isGymOwner: isOwner,
    isGymStaff: isStaff || isTrainer, // Staff includes trainers
    isGymTrainer: isTrainer,
    hasGymRole: ['gym_owner', 'gym_staff', 'gym_trainer'].includes(userRole),
    isGymBusinessUser: isOwner || isStaff || isTrainer,
    isGymPersonnel: isOwner || isStaff || isTrainer,
    
    // Helper methods (now memoized)
    getHomeTabLabel: () => {
      if (isOwner || isStaff) return 'Dashboard';
      if (isTrainer) return 'Clients';
      return 'Home';
    },
    
    getProjectsTabLabel: () => {
      if (isTrainer) return 'Programs';
      if (isOwner) return 'Challenges';
      return 'Projects';
    },
  };
};