// // src/features/home/components/AdaptiveHomeScreen.tsx
// import React, { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { useUserRole } from '../../../shared/hooks/useUserRole';
// import { useGymStore } from '../../gym/stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';

// // Import dashboard components
// import HomeScreen from './HomeScreen'; // Existing member dashboard
// import GymDashboardScreen from '../../gym/components/GymDashboardScreen'; // Will create
// import TrainerDashboardScreen from '../../gym/components/TrainerDashboardScreen'; // Will create
// import GymOnboardingScreen from '../../gym/components/GymOnboardingScreen'; // Will create

// const AdaptiveHomeScreen: React.FC = () => {
//   const { user, isAuthenticated } = useAppStore();
//   const { currentGym, isLoading, loadCurrentGym } = useGymStore();
//   const { isGymOwner, isGymStaff, isGymTrainer } = useUserRole();
//   const { theme } = useEnhancedTheme();

//   // Load gym data if user is gym personnel
//   useEffect(() => {
//     if (isAuthenticated && user?.gymId && (isGymOwner || isGymStaff || isGymTrainer)) {
//       loadCurrentGym(user.gymId).catch(console.error);
//     }
//   }, [isAuthenticated, user?.gymId, isGymOwner, isGymStaff, isGymTrainer]);

//   if (isLoading) {
//     return (
//       <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//         <ThemeText style={{ marginTop: 12, color: theme.colors.text.secondary }}>
//           Loading dashboard...
//         </ThemeText>
//       </ThemeView>
//     );
//   }

//   // Gym owner/staff without a gym setup
//   if ((isGymOwner || isGymStaff) && !currentGym) {
//     return <GymDashboardScreen />;
//   }

//   // Gym business user with gym setup
//   if ((isGymOwner || isGymStaff) && currentGym) {
//     return <GymDashboardScreen />;
//   }

//   // Gym trainer
//   if (isGymTrainer) {
//     return <TrainerDashboardScreen />;
//   }

//   // Regular member (default)
//   return <HomeScreen />;
// };

// export default AdaptiveHomeScreen;


// In src/features/home/components/AdaptiveHomeScreen.tsx
// Keep everything the same, but add this at the beginning:

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { useGymStore } from '../../gym/stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import HomeScreen from './HomeScreen';
import GymDashboardScreen from '../../gym/components/GymDashboardScreen';
import TrainerDashboardScreen from '../../gym/components/TrainerDashboardScreen';

const AdaptiveHomeScreen: React.FC = () => {
  const { user, isAuthenticated } = useAppStore();
  const { currentGym, isLoading, loadCurrentGym } = useGymStore();
  const { isGymOwner, isGymStaff, isGymTrainer } = useUserRole();
  const { theme } = useEnhancedTheme();

  // Load gym data if user is gym personnel
  useEffect(() => {
    if (isAuthenticated && user?.gymId && (isGymOwner || isGymStaff || isGymTrainer)) {
      loadCurrentGym(user.gymId).catch(console.error);
    }
  }, [isAuthenticated, user?.gymId, isGymOwner, isGymStaff, isGymTrainer]);

  if (isLoading) {
    return (
      <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemeText style={{ marginTop: 12, color: theme.colors.text.secondary }}>
          Loading dashboard...
        </ThemeText>
      </ThemeView>
    );
  }

  // IMPORTANT: This screen is now only for REGULAR MEMBERS
  // Gym business users will go directly to GymDashboardScreen via tab
  return <HomeScreen />; // Always show regular HomeScreen for this route
};

export default AdaptiveHomeScreen;