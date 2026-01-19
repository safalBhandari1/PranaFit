
// src/app/navigation/TabNavigator.tsx - FIXED VERSION
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';
import { useUserRole } from '../../shared/hooks/useUserRole';
import { ThemeView } from '../../shared/ui/ThemeView';
import { ThemeText } from '../../shared/ui/ThemeText';

// Import all screen components
import WorkoutHomeScreen from '../../features/workout/components/WorkoutHomeScreen';
import ProjectStackNavigator from './ProjectStackNavigation';
import AdaptiveHomeScreen from '../../features/home/components/AdaptiveHomeScreen';
import { ProfileScreen } from '../../features/profile/components/ProfileScreen';

// Import gym business screens
import GymDashboardScreen from '../../features/gym/components/GymDashboardScreen';
import MembersScreen from '../../features/gym/components/MembersScreen';
import PaymentsScreen from '../../features/gym/components/PaymentsScreen';
import GymProfileScreen from '../../features/gym/components/GymProfileScreen';
import PaymentsDashboardScreen from '../../features/gym/components/PaymentsDashboardScreen';

const Tab = createBottomTabNavigator();

// Safe area wrapper
const SafeAreaWrapper = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <SafeAreaView 
      style={{ flex: 1 }} 
      edges={['top','left', 'right']}
    >
      <Component {...props} />
    </SafeAreaView>
  );
};

// Regular member screens
const MatchScreen = () => {
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">💞 Match Tab</ThemeText>
      <ThemeText variant="body" color="secondary">User Discovery & Connection</ThemeText>
    </ThemeView>
  );
};

export default function TabNavigator() {
  const { theme } = useEnhancedTheme();
  const { 
    isGymOwner, 
    isGymStaff, 
    isGymTrainer,
    isGymOwnerGlobal,
    isGymStaffGlobal,
    isGymTrainerGlobal 
  } = useUserRole();
  
  // 🚨 FIXED LOGIC:
  // A user should see gym business tabs if:
  // 1. They have a current gym AND have a business role in it, OR
  // 2. They are globally registered as a gym owner/staff/trainer
  const isGymBusinessUser = 
    (isGymOwner || isGymStaff || isGymTrainer) ||  // Has current gym role
    (isGymOwnerGlobal || isGymStaffGlobal || isGymTrainerGlobal); // Global role

  // 🚨 DEBUG: Add this to see what's happening
  console.log('🔍 TabNavigator Debug:', {
    isGymOwner,
    isGymStaff,
    isGymTrainer,
    isGymOwnerGlobal,
    isGymStaffGlobal,
    isGymTrainerGlobal,
    isGymBusinessUser
  });

  const getTabBarPadding = () => {
    if (Platform.OS === 'ios') {
      return 20;
    }
    return 8;
  };

  // Tab configurations for different user types
  const memberTabs = [
    { 
      name: 'Home', 
      component: SafeAreaWrapper(AdaptiveHomeScreen),
      icon: (focused: boolean) => focused ? 'home' : 'home-outline',
      label: 'Home'
    },
    { 
      name: 'Match', 
      component: SafeAreaWrapper(MatchScreen),
      icon: (focused: boolean) => focused ? 'heart' : 'heart-outline',
      label: 'Match'
    },
    { 
      name: 'Projects', 
      component: SafeAreaWrapper(ProjectStackNavigator),
      icon: (focused: boolean) => focused ? 'list' : 'list-outline',
      label: 'Projects'
    },
    { 
      name: 'Workout', 
      component: SafeAreaWrapper(WorkoutHomeScreen),
      icon: (focused: boolean) => focused ? 'barbell' : 'barbell-outline',
      label: 'Workout'
    },
    { 
      name: 'Profile', 
      component: SafeAreaWrapper(ProfileScreen),
      icon: (focused: boolean) => focused ? 'person' : 'person-outline',
      label: 'Profile'
    },
  ];

  const gymBusinessTabs = [
    { 
      name: 'Dashboard', 
      component: SafeAreaWrapper(GymDashboardScreen),
      icon: (focused: boolean) => focused ? 'home' : 'home-outline',
      label: 'Dashboard'
    },
    { 
      name: 'Members', 
      component: SafeAreaWrapper(MembersScreen),
      icon: (focused: boolean) => focused ? 'people' : 'people-outline',
      label: 'Members'
    },
    { 
      name: 'Payments', 
      component: SafeAreaWrapper(PaymentsDashboardScreen),
      icon: (focused: boolean) => focused ? 'cash' : 'cash-outline',
      label: 'Payments'
    },
    { 
      name: 'Profile', 
      component: SafeAreaWrapper(ProfileScreen), // Changed to GymProfileScreen for gym owners
      icon: (focused: boolean) => focused ? 'person' : 'person-outline',
      label: 'Profile'
    },
  ];

  // Choose which tabs to render
  const tabsToRender = isGymBusinessUser ? gymBusinessTabs : memberTabs;

  return (
    <>
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
            height: Platform.OS === 'ios' ? 88 : 60,
            paddingBottom: getTabBarPadding(),
            paddingTop: 8,
            ...(Platform.OS === 'ios' && {
              paddingBottom: 34,
            }),
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text.secondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: Platform.OS === 'ios' ? 4 : 0,
          },
        }}
      >
        {tabsToRender.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons 
                  name={tab.icon(focused)} 
                  size={size} 
                  color={color} 
                />
              ),
              tabBarLabel: tab.label,
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}
