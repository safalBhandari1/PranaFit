
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useSafeAreaInsets } from 'react-native-safe-area-context'; // ← ADD THIS
// import { useAppStore } from '../../shared/stores/useAppStore';
// import { useThemeStore } from '../../shared/stores/useThemeStore';
// import { LoginScreen } from '../../features/auth/components/LoginScreen';
// import { RegisterScreen } from '../../features/auth/components/RegisterScreen';
// import TabNavigator from './TabNavigator';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { isAuthenticated } = useAppStore();
//   const { theme } = useThemeStore();
//   const insets = useSafeAreaInsets(); // ← ADD THIS

//   const navigationTheme = {
//     dark: theme.mode === 'dark',
//     colors: {
//       primary: theme.colors.primary,
//       background: theme.colors.background,
//       card: theme.colors.card,
//       text: theme.colors.text.primary,
//       border: theme.colors.border,
//       notification: theme.colors.accent,
//     },
//     fonts: {
//       regular: { fontFamily: 'System', fontWeight: '400' as const },
//       medium: { fontFamily: 'System', fontWeight: '500' as const },
//       bold: { fontFamily: 'System', fontWeight: '700' as const },
//       heavy: { fontFamily: 'System', fontWeight: '900' as const },
//     },
//   };

//   return (
//     <NavigationContainer theme={navigationTheme}>
//       <Stack.Navigator 
//         screenOptions={{ 
//           headerShown: false,
//           contentStyle: {
//             paddingTop: insets.top, // ← ADD THIS - FIXES CUTOFF
//             paddingBottom: insets.bottom,
//             paddingLeft: insets.left,
//             paddingRight: insets.right,
//           }
//         }}
//       >
//         {isAuthenticated ? (
//           <Stack.Screen name="MainTabs" component={TabNavigator} />
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native'; // ADD THIS
import { useAppStore } from '../../shared/stores/useAppStore';
import { useThemeStore } from '../../shared/stores/useThemeStore';
import { LoginScreen } from '../../features/auth/components/LoginScreen';
import { RegisterScreen } from '../../features/auth/components/RegisterScreen';
import TabNavigator from './TabNavigator';
 import TestModal from '../../features/workout/components/TestModal'; // ADD THIS IMPORT
import WorkoutModal from '../../features/workout/components/WorkoutModal';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useAppStore();
  const { theme } = useThemeStore();
  const insets = useSafeAreaInsets();

  const navigationTheme = {
    dark: theme.mode === 'dark',
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text.primary,
      border: theme.colors.border,
      notification: theme.colors.accent,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: '700' as const },
      heavy: { fontFamily: 'System', fontWeight: '900' as const },
    },
  };

  return (
    <View style={{ flex: 1 }}> {/* ADD THIS WRAPPER */}
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            contentStyle: {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="MainTabs" component={TabNavigator} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      
      {/* ADD WORKOUT MODAL HERE - Outside NavigationContainer but inside the View */}
      <WorkoutModal />
      {/* <TestModal /> */}
    </View>
  );
}