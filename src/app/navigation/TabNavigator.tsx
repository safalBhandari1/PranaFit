
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Platform, StatusBar, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';
// import { ThemeText } from '../../shared/ui/ThemeText';
// import { ThemeView } from '../../shared/ui/ThemeView';
// import WorkoutHomeScreen from '../../features/workout/components/WorkoutHomeScreen';
// import ProjectStackNavigator from './ProjectStackNavigation';
// import HomeScreen from '../../features/home/components/HomeScreen'; // 🚀 NEW
// // ⬇️ REMOVE WorkoutModal import from here

// // Your screen components remain the same...
// // const HomeScreen = () => {
// //   const { theme, toggleTheme, isDark, storeMode } = useEnhancedTheme();
  
// //   return (
// //     <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <ThemeText variant="h1">🏠 Home Tab</ThemeText>
// //       <ThemeText variant="body" color="secondary">Social Feed Ecosystem</ThemeText>
      
// //       <ThemeView style={{ marginTop: 20, alignItems: 'center' }}>
// //         <ThemeText variant="h3">Theme Test</ThemeText>
// //         <ThemeText>Current Mode: {theme.mode}</ThemeText>
// //         <ThemeText>Is Dark: {isDark ? 'YES' : 'NO'}</ThemeText>
// //         <ThemeText>Store Mode: {storeMode}</ThemeText>
        
// //         <TouchableOpacity 
// //           style={{ 
// //             marginTop: 16, 
// //             padding: 16, 
// //             backgroundColor: theme.colors.primary, 
// //             borderRadius: 8 
// //           }}
// //           onPress={toggleTheme}
// //         >
// //           <ThemeText color="secondary">Toggle Theme</ThemeText>
// //         </TouchableOpacity>
// //       </ThemeView>
// //     </ThemeView>
// //   );
// // };

// const MatchScreen = () => {
//   const { theme, toggleTheme, storeMode } = useEnhancedTheme();
  
//   return (
//     <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ThemeText variant="h1">💞 Match Tab</ThemeText>
//       <ThemeText variant="body" color="secondary">User Discovery & Connection</ThemeText>
//     </ThemeView>
//   );
// };

// const ProfileScreen = () => {
//   const { theme, toggleTheme, storeMode } = useEnhancedTheme();
  
//   return (
//     <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ThemeText variant="h1">👤 Profile Tab</ThemeText>
//       <ThemeText variant="body" color="secondary">User Analytics & Settings</ThemeText>
//     </ThemeView>
//   );
// };

// const Tab = createBottomTabNavigator();

// // Safe area wrapper - KEEP THIS
// const SafeAreaWrapper = (Component: React.ComponentType<any>) => {
//   return (props: any) => (
//     <SafeAreaView 
//       style={{ flex: 1 }} 
//       edges={['top','left', 'right']} // This handles safe areas properly
//     >
//       <Component {...props} />
//     </SafeAreaView>
//   );
// };

// export default function TabNavigator() {
//   const { theme, storeMode } = useEnhancedTheme();

//   const getTabBarPadding = () => {
//     if (Platform.OS === 'ios') {
//       return 20;
//     }
//     return 8;
//   };

//   return (
//     <>
//       <StatusBar 
//         barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
//         backgroundColor={theme.colors.background}
//       />
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: theme.colors.card,
//             borderTopColor: theme.colors.border,
//             borderTopWidth: 1,
//             elevation: 0,
//             shadowOpacity: 0,
//             height: Platform.OS === 'ios' ? 88 : 60,
//             paddingBottom: getTabBarPadding(),
//             paddingTop: 8,
//             ...(Platform.OS === 'ios' && {
//               paddingBottom: 34,
//             }),
//           },
//           tabBarActiveTintColor: theme.colors.primary,
//           tabBarInactiveTintColor: theme.colors.text.secondary,
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: '600',
//             marginBottom: Platform.OS === 'ios' ? 4 : 0,
//           },
//         }}
//       >
//       <Tab.Screen 
//         name="Home" 
//         component={SafeAreaWrapper(HomeScreen)} // 🚀 CHANGED: Use new HomeScreen
//         options={{
//           tabBarIcon: ({ focused, color, size }) => (
//             <Ionicons 
//               name={focused ? 'home' : 'home-outline'} 
//               size={size} 
//               color={color} 
//             />
//           ),
//           tabBarLabel: 'Home',
//         }}
//       />
//         <Tab.Screen 
//           name="Match" 
//           component={SafeAreaWrapper(MatchScreen)}
//           options={{
//             tabBarIcon: ({ focused, color, size }) => (
//               <Ionicons 
//                 name={focused ? 'heart' : 'heart-outline'} 
//                 size={size} 
//                 color={color} 
//               />
//             ),
//             tabBarLabel: 'Match',
//           }}
//         />
//         <Tab.Screen 
//           name="Projects" 
//           component={SafeAreaWrapper(ProjectStackNavigator)}
//           options={{
//             tabBarIcon: ({ focused, color, size }) => (
//               <Ionicons 
//                 name={focused ? 'list' : 'list-outline'} 
//                 size={size} 
//                 color={color} 
//               />
//             ),
//             tabBarLabel: 'Projects',
//           }}
//         />
//         <Tab.Screen 
//           name="Workout" 
//           component={SafeAreaWrapper(WorkoutHomeScreen)}
//           options={{
//             tabBarIcon: ({ focused, color, size }) => (
//               <Ionicons 
//                 name={focused ? 'barbell' : 'barbell-outline'} 
//                 size={size} 
//                 color={color} 
//               />
//             ),
//             tabBarLabel: 'Workout',
//           }}
//         />
//         <Tab.Screen 
//           name="Profile" 
//           component={SafeAreaWrapper(ProfileScreen)}
//           options={{
//             tabBarIcon: ({ focused, color, size }) => (
//               <Ionicons 
//                 name={focused ? 'person' : 'person-outline'} 
//                 size={size} 
//                 color={color} 
//               />
//             ),
//             tabBarLabel: 'Profile',
//           }}
//         />
//       </Tab.Navigator>
      
//       {/* ⬇️ REMOVE WorkoutModal from here - keep it only in RootNavigator */}
//     </>
//   );
// }

// src/app/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';
import { ThemeText } from '../../shared/ui/ThemeText';
import { ThemeView } from '../../shared/ui/ThemeView';
import WorkoutHomeScreen from '../../features/workout/components/WorkoutHomeScreen';
import ProjectStackNavigator from './ProjectStackNavigation';
import HomeStackNavigation from './HomeStackNavigation';

// ⬇️ REMOVE the old HomeScreen component (lines 16-40)

const MatchScreen = () => {
  const { theme, toggleTheme, storeMode } = useEnhancedTheme();
  
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">💞 Match Tab</ThemeText>
      <ThemeText variant="body" color="secondary">User Discovery & Connection</ThemeText>
    </ThemeView>
  );
};

const ProfileScreen = () => {
  const { theme, toggleTheme, storeMode } = useEnhancedTheme();
  
  return (
    <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeText variant="h1">👤 Profile Tab</ThemeText>
      <ThemeText variant="body" color="secondary">User Analytics & Settings</ThemeText>
    </ThemeView>
  );
};

const Tab = createBottomTabNavigator();

// Safe area wrapper - KEEP THIS
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

export default function TabNavigator() {
  const { theme, storeMode } = useEnhancedTheme();

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
        component={SafeAreaWrapper(HomeStackNavigation)} // 🚀 CHANGE TO HomeStackNavigation
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabel: 'Home',
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
            tabBarLabel: 'Projects',
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
        {/* ... rest of your tabs remain the same ... */}
      </Tab.Navigator>
    </>
  );
}