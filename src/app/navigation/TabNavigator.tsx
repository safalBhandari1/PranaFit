// src/app/navigation/TabNavigator.tsx (FINAL WORKING VERSION)
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../shared/stores/useThemeStore';
import { useUserRole } from '../../shared/hooks/useUserRole';
import WorkoutHomeScreen from '../../features/workout/components/WorkoutHomeScreen';
import ProjectStackNavigator from './ProjectStackNavigation';
import AdaptiveHomeScreen from '../../features/home/components/AdaptiveHomeScreen';
import { ProfileScreen } from '../../features/profile/components/ProfileScreen';
import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../shared/ui/ThemeView';
import { ThemeText } from '../../shared/ui/ThemeText';

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

const MatchScreen = () => {
  const { theme, toggleTheme, storeMode } = useEnhancedTheme();
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">💞 Match Tab</ThemeText>
      <ThemeText variant="body" color="secondary">User Discovery & Connection</ThemeText>
    </ThemeView>
  );
};

export default function TabNavigator() {
  const { theme } = useThemeStore();
  const userRole = useUserRole();

  const getTabBarPadding = () => {
    if (Platform.OS === 'ios') {
      return 20;
    }
    return 8;
  };

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
        <Tab.Screen 
          name="Home" 
          component={SafeAreaWrapper(AdaptiveHomeScreen)}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={size} 
                color={color} 
              />
            ),
            tabBarLabel: userRole.getHomeTabLabel(),
          }}
        />
        <Tab.Screen 
          name="Match" 
          component={SafeAreaWrapper(MatchScreen)}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'heart' : 'heart-outline'} 
                size={size} 
                color={color} 
              />
            ),
            tabBarLabel: 'Match',
          }}
        />
        <Tab.Screen 
          name="Projects" 
          component={SafeAreaWrapper(ProjectStackNavigator)}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'list' : 'list-outline'} 
                size={size} 
                color={color} 
              />
            ),
            tabBarLabel: userRole.getProjectsTabLabel(),
          }}
        />
        <Tab.Screen 
          name="Workout" 
          component={SafeAreaWrapper(WorkoutHomeScreen)}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'barbell' : 'barbell-outline'} 
                size={size} 
                color={color} 
              />
            ),
            tabBarLabel: 'Workout',
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={SafeAreaWrapper(ProfileScreen)}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'person' : 'person-outline'} 
                size={size} 
                color={color} 
              />
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </>
  );
}