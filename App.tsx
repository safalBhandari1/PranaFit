// import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ActivityIndicator, View } from 'react-native';
// import RootNavigator from './src/app/navigation/RootNavigator';
// import { useAppStore } from './src/shared/stores/useAppStore';
// import { authService } from './src/shared/services/AuthService';
// import { userRepository } from './src/shared/services/repositories/UserRepository';
// import { ThemeProvider } from './src/app/providers/ThemeProvider';

// // Create React Query client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// function AppContent() {
//   const { setUser, setAuthentication, setLoading } = useAppStore();
//   const [isInitializing, setIsInitializing] = useState(true);

//   useEffect(() => {
//     // Listen for auth state changes
//     const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
//       setLoading(true);
      
//       if (firebaseUser && firebaseUser.email) {
//         try {
//           // Get user data from Firestore
//           const user = await userRepository.getByEmail(firebaseUser.email);
//           if (user) {
//             setUser(user);
//             setAuthentication(true);
//           } else {
//             // User document doesn't exist, sign out
//             await authService.signOut();
//             setUser(null);
//             setAuthentication(false);
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//           setUser(null);
//           setAuthentication(false);
//         }
//       } else {
//         setUser(null);
//         setAuthentication(false);
//       }
      
//       setLoading(false);
//       setIsInitializing(false);
//     });

//     return unsubscribe;
//   }, [setUser, setAuthentication, setLoading]);

//   if (isInitializing) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#6366F1" />
//       </View>
//     );
//   }

//   return <RootNavigator />;
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <QueryClientProvider client={queryClient}>
//         <ThemeProvider>
//           <StatusBar style="auto" />
//           <AppContent />
//         </ThemeProvider>
//       </QueryClientProvider>
//     </SafeAreaProvider>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import RootNavigator from './src/app/navigation/RootNavigator';
import { useAppStore } from './src/shared/stores/useAppStore';
import { useProjectStore } from './src/features/projects/stores/useProjectStore';
import { useWorkoutStore } from './src/features/workout/stores/useWorkoutStore';
import { authService } from './src/shared/services/AuthService';
import { userRepository } from './src/shared/services/repositories/UserRepository';
import { ThemeProvider } from './src/app/providers/ThemeProvider';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppContent() {
  const { setUser, setAuthentication, setLoading } = useAppStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (!isMounted.current) return;

      setLoading(true);
      
      if (firebaseUser && firebaseUser.email) {
        try {
          // Get user data from Firestore
          const user = await userRepository.getByEmail(firebaseUser.email);
          if (user) {
            setUser(user);
            setAuthentication(true);
            
            // ✅ INDUSTRY STANDARD: Get store state INSIDE callback
            const projectStore = useProjectStore.getState();
            const workoutStore = useWorkoutStore.getState();
            
            // Load user data
            console.log('📥 Loading user data for:', user.uid);
            try {
              await Promise.all([
                projectStore.loadUserProjects(user.uid),
                workoutStore.loadUserWorkouts(user.uid)
              ]);
              console.log('✅ User data loaded successfully');
            } catch (loadError) {
              console.error('❌ Error loading user data:', loadError);
              // ✅ INDUSTRY STANDARD: Continue even if data loading fails
            }
            
          } else {
            // User document doesn't exist, sign out
            console.log('❌ User document not found, signing out');
            await authService.signOut();
            setUser(null);
            setAuthentication(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          setAuthentication(false);
        }
      } else {
        // No user logged in
        setUser(null);
        setAuthentication(false);
      }
      
      if (isMounted.current) {
        setLoading(false);
        setIsInitializing(false);
      }
    });

    return () => {
      isMounted.current = false;
      unsubscribe();
    };
  }, [setUser, setAuthentication, setLoading]); 
  // ✅ INDUSTRY STANDARD: Only primitive setters in dependencies

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return <RootNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StatusBar style="auto" />
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}