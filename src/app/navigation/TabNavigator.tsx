import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../shared/stores/useThemeStore';
import { ThemeText } from '../../shared/ui/ThemeText';
import { ThemeView } from '../../shared/ui/ThemeView';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import WorkoutHomeScreen from '../../features/workout/components/WorkoutHomeScreen';
import ProjectHomeScreen from '../../features/projects/components/ProjectHomeScreen';


// Themed placeholder screens (same as before)
const HomeScreen = () => {
  const { theme, toggleTheme, mode } = useThemeStore();
  
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">🏠 Home Tab</ThemeText>
      <ThemeText variant="body" color="secondary">Social Feed Ecosystem</ThemeText>
      <ThemeText variant="caption" style={{ marginTop: 16 }}>
        Current theme: {mode}
      </ThemeText>
      
      <ThemeButton 
        onPress={toggleTheme}
        style={{ marginTop: 20 }}
      >
        <ThemeText>Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode</ThemeText>
      </ThemeButton>
    </ThemeView>
  );
};

const MatchScreen = () => {
  const { theme, toggleTheme, mode } = useThemeStore();
  
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">💞 Match Tab</ThemeText>
      <ThemeText variant="body" color="secondary">User Discovery & Connection</ThemeText>
      <ThemeText variant="caption" style={{ marginTop: 16 }}>
        Current theme: {mode}
      </ThemeText>
      
      <ThemeButton 
        onPress={toggleTheme}
        style={{ marginTop: 20 }}
      >
        <ThemeText>Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode</ThemeText>
      </ThemeButton>
    </ThemeView>
  );
};

const ProjectsScreen = () => {
  const { theme, toggleTheme, mode } = useThemeStore();
  
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">📋 Projects Tab</ThemeText>
      <ThemeText variant="body" color="secondary">Training Program Management</ThemeText>
      <ThemeText variant="caption" style={{ marginTop: 16 }}>
        Current theme: {mode}
      </ThemeText>
      
      <ThemeButton 
        onPress={toggleTheme}
        style={{ marginTop: 20 }}
      >
        <ThemeText>Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode</ThemeText>
      </ThemeButton>
    </ThemeView>
  );
};


const WorkoutScreen = () => {
    return <WorkoutHomeScreen />;
  };

const ProfileScreen = () => {
  const { theme, toggleTheme, mode } = useThemeStore();
  
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">👤 Profile Tab</ThemeText>
      <ThemeText variant="body" color="secondary">User Analytics & Settings</ThemeText>
      <ThemeText variant="caption" style={{ marginTop: 16 }}>
        Current theme: {mode}
      </ThemeText>
      
      <ThemeButton 
        onPress={toggleTheme}
        style={{ marginTop: 20 }}
      >
        <ThemeText>Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode</ThemeText>
      </ThemeButton>
    </ThemeView>
  );
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme, toggleTheme, mode } = useThemeStore();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity 
            onPress={toggleTheme}
            style={{ 
              marginRight: 16, 
              padding: 8,
              borderRadius: 20,
              backgroundColor: theme.colors.primary,
            }}
          >
            <ThemeText style={{ color: '#FFFFFF', fontSize: 16 }}>
              {mode === 'light' ? '🌙' : '☀️'}
            </ThemeText>
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          tabBarIcon: () => <ThemeText>🏠</ThemeText>,
          title: 'Home'
        }}
      />
      <Tab.Screen 
        name="Match" 
        component={MatchScreen}
        options={{ 
          tabBarIcon: () => <ThemeText>💞</ThemeText>,
          title: 'Match'
        }}
      />
      <Tab.Screen 
        name="Projects" 
        component={ProjectHomeScreen}
        options={{ 
          tabBarIcon: () => <ThemeText>📋</ThemeText>,
          title: 'Projects'
        }}
      />
      <Tab.Screen 
        name="Workout" 
        component={WorkoutScreen}
        options={{ 
          tabBarIcon: () => <ThemeText>💪</ThemeText>,
          title: 'Workout'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          tabBarIcon: () => <ThemeText>👤</ThemeText>,
          title: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
}