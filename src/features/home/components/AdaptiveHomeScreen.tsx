// src/features/home/components/AdaptiveHomeScreen.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { useGymStore } from '../../gym/stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';

// Import dashboard components
import HomeScreen from './HomeScreen'; // Existing member dashboard
import GymDashboardScreen from '../../gym/components/GymDashboardScreen'; // Will create
import TrainerDashboardScreen from '../../gym/components/TrainerDashboardScreen'; // Will create
import GymOnboardingScreen from '../../gym/components/GymOnboardingScreen'; // Will create

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

  // Gym owner/staff without a gym setup
  if ((isGymOwner || isGymStaff) && !currentGym) {
    return <GymDashboardScreen />;
  }

  // Gym business user with gym setup
  if ((isGymOwner || isGymStaff) && currentGym) {
    return <GymDashboardScreen />;
  }

  // Gym trainer
  if (isGymTrainer) {
    return <TrainerDashboardScreen />;
  }

  // Regular member (default)
  return <HomeScreen />;
};

export default AdaptiveHomeScreen;



// // src/features/home/components/AdaptiveHomeScreen.tsx (REVISED)
// import React, { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore'; // Use store directly
// import { useUserRole } from '../../../shared/hooks/useUserRole';
// import { useGymStore } from '../../gym/stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';

// // Import dashboard components with proper paths
// import HomeScreen from './HomeScreen'; // Existing - should work
// import GymDashboardScreen from '../../gym/components/GymDashboardScreen'; // Make sure this exists
// import TrainerDashboardScreen from '../../gym/components/TrainerDashboardScreen'; // Make sure this exists
// import GymOnboardingScreen from '../../gym/components/GymOnboardingScreen'; // Make sure this exists

// const AdaptiveHomeScreen: React.FC = () => {
//   const { theme } = useThemeStore(); // Use store directly
//   const { user } = useAppStore((state) => ({ user: state.user }));
//   const { currentGym, isLoading, loadCurrentGym } = useGymStore();
//   const { isGymOwner, isGymStaff, isGymTrainer } = useUserRole();

//   // Load gym data if user is gym personnel
//   useEffect(() => {
//     if (user?.gymId && (isGymOwner || isGymStaff || isGymTrainer)) {
//       loadCurrentGym(user.gymId).catch(console.error);
//     }
//   }, [user?.gymId, isGymOwner, isGymStaff, isGymTrainer]);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//         <p style={{ marginTop: 12, color: theme.colors.text.secondary }}>
//           Loading dashboard...
//         </p>
//       </View>
//     );
//   }

  
//   // Gym owner/staff without a gym setup
//   if ((isGymOwner || isGymStaff) && !currentGym) {
//     return <GymOnboardingScreen />;
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


// src/features/home/components/AdaptiveHomeScreen.tsx (DIAGNOSTIC VERSION)
// import React from 'react';
// import { View, Text } from 'react-native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useUserRole } from '../../../shared/hooks/useUserRole';
// import HomeScreen from './HomeScreen'; // Existing - known to work

// const AdaptiveHomeScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { isGymOwner, isGymStaff, isGymTrainer } = useUserRole();
  
//   // SIMPLE VERSION: Just show text based on role
//   if (isGymOwner || isGymStaff) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
//         <Text style={{ color: theme.colors.text.primary, fontSize: 24 }}>🏋️‍♂️ Gym Dashboard (Coming Soon)</Text>
//         <Text style={{ color: theme.colors.text.secondary, marginTop: 12 }}>
//           {isGymOwner ? 'Owner View' : 'Staff View'}
//         </Text>
//       </View>
//     );
//   }
  
//   if (isGymTrainer) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
//         <Text style={{ color: theme.colors.text.primary, fontSize: 24 }}>👨‍🏫 Trainer Dashboard</Text>
//         <Text style={{ color: theme.colors.text.secondary, marginTop: 12 }}>
//           Client management view
//         </Text>
//       </View>
//     );
//   }
  
//   // Regular members see the existing dashboard
//   return <HomeScreen />;
// };

// export default AdaptiveHomeScreen;

// // TEMPORARY: Test ONLY GymDashboardScreen
// import React from 'react';
// import { View, Text } from 'react-native';
// // import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useUserRole } from '../../../shared/hooks/useUserRole';
// import HomeScreen from './HomeScreen';
// import GymDashboardScreen from '../../gym/components/GymDashboardScreen'; // Try just this one
// import GymOnboardingScreen from '../../gym/components/GymOnboardingScreen';
// import TrainerDashboardScreen from '../../gym/components/TrainerDashboardScreen';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme'; // ← NEW


// const AdaptiveHomeScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { isGymOwner, isGymStaff } = useUserRole();
  
//   if (isGymOwner || isGymStaff) {
//     // Try rendering the component directly
//     return <TrainerDashboardScreen />;
//   }
  
//   return <HomeScreen />;
// };

// export default AdaptiveHomeScreen;