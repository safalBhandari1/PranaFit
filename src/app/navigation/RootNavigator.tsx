// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { View } from 'react-native';
// import { useAppStore } from '../../shared/stores/useAppStore';
// import { LoginScreen } from '../../features/auth/components/LoginScreen';
// import { RegisterScreen } from '../../features/auth/components/RegisterScreen';
// import TabNavigator from './TabNavigator';
// import WorkoutModal from '../../features/workout/components/WorkoutModal';
// import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { isAuthenticated } = useAppStore();
//   const { theme } = useEnhancedTheme();

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
//     <View style={{ flex: 1 }}>
//       <NavigationContainer theme={navigationTheme}>
//         <Stack.Navigator 
//           screenOptions={{ 
//             headerShown: false,
//             // REMOVE contentStyle padding - SafeAreaWrapper handles this
//           }}
//         >
//           {isAuthenticated ? (
//             <Stack.Screen name="MainTabs" component={TabNavigator} />
//           ) : (
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Register" component={RegisterScreen} />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
      
//       {/* Workout Modal - Outside NavigationContainer */}
//       <WorkoutModal />
//     </View>
//   );
// }

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View } from 'react-native';
// import { useAppStore } from '../../shared/stores/useAppStore';
// import { useGymStore } from '../../features/gym/stores/useGymStore';
// import { LoginScreen } from '../../features/auth/components/LoginScreen';
// import { RegisterScreen } from '../../features/auth/components/RegisterScreen';
// import TabNavigator from './TabNavigator';
// import WorkoutModal from '../../features/workout/components/WorkoutModal';
// import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { isAuthenticated, user, setCurrentGymId, clearAll } = useAppStore();
//   const { loadCurrentGym, resetStore } = useGymStore();
//   const { theme } = useEnhancedTheme();
  

//   // 🚀 NEW: Load gym data when user authenticates or changes
//   useEffect(() => {
//     if (isAuthenticated && user) {
//       loadUserGyms();
//     } else {
//       // Clear gym data when user logs out
//       resetStore();
//     }
//   }, [isAuthenticated, user?.id]);

//   const loadUserGyms = async () => {
//     try {
//       console.log('🚀 Checking user gym memberships...');
      
//       // Check if user has any gym memberships
//       if (!user?.gymMemberships || user.gymMemberships.length === 0) {
//         console.log('👤 User has no gym memberships');
//         return;
//       }

//       console.log(`🏋️ User has ${user.gymMemberships.length} gym membership(s)`);
      
//       // Determine which gym to load
//       let gymIdToLoad: string | undefined;
      
//       // 1. Try user's currentGymId first
//       if (user.currentGymId) {
//         const hasAccess = user.gymMemberships.some(m => m.gymId === user.currentGymId);
//         if (hasAccess) {
//           gymIdToLoad = user.currentGymId;
//           console.log(`🎯 Loading user's current gym: ${gymIdToLoad}`);
//         }
//       }
      
//       // 2. Fall back to first gym in memberships array
//       if (!gymIdToLoad && user.gymMemberships.length > 0) {
//         gymIdToLoad = user.gymMemberships[0].gymId;
//         console.log(`📋 Loading first gym from memberships: ${gymIdToLoad}`);
//       }
      
//       // 3. Load the gym
//       if (gymIdToLoad) {
//         // Update app store with current gym
//         setCurrentGymId(gymIdToLoad);
        
//         // Load gym data into gym store
//         await loadCurrentGym(gymIdToLoad);
        
//         console.log(`✅ Successfully loaded gym: ${gymIdToLoad}`);
//       }
      
//     } catch (error) {
//       console.error('❌ Error loading user gyms:', error);
//     }
//   };

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
//     <View style={{ flex: 1 }}>
//       <NavigationContainer theme={navigationTheme}>
//         <Stack.Navigator 
//           screenOptions={{ 
//             headerShown: false,
//           }}
//         >
//           {isAuthenticated ? (
//             <Stack.Screen name="MainTabs" component={TabNavigator} />
//           ) : (
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Register" component={RegisterScreen} />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
      
//       {/* Workout Modal - Outside NavigationContainer */}
//       <WorkoutModal />
//     </View>
//   );
// }



// import React, { useEffect, useState } from 'react'; // ADD useState
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View } from 'react-native';
// import { useAppStore } from '../../shared/stores/useAppStore';
// import { useGymStore } from '../../features/gym/stores/useGymStore';
// import { LoginScreen } from '../../features/auth/components/LoginScreen';
// import { RegisterScreen } from '../../features/auth/components/RegisterScreen';
// import TabNavigator from './TabNavigator';
// import WorkoutModal from '../../features/workout/components/WorkoutModal';
// import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { isAuthenticated, user, setCurrentGymId, clearAll } = useAppStore();
//   const { loadCurrentGym, resetStore } = useGymStore();
//   const { theme } = useEnhancedTheme();
  
//   // 🚀 Track if we've loaded gyms to prevent duplicate calls
//   const [initialGymsLoaded, setInitialGymsLoaded] = useState(false);

//   // 🚀 Load gym data when user authenticates (ONLY ONCE)
//   useEffect(() => {
//     const initializeGyms = async () => {
//       if (!isAuthenticated || !user || initialGymsLoaded) {
//         return;
//       }

//       try {
//         console.log('🚀 Initializing user gyms from RootNavigator...');
//         await loadUserGyms();
//         setInitialGymsLoaded(true);
//         console.log('✅ Initial gym loading complete');
//       } catch (error) {
//         console.error('❌ Error initializing gyms:', error);
//         setInitialGymsLoaded(true); // Mark as loaded even on error to prevent retry loops
//       }
//     };

//     initializeGyms();
//   }, [isAuthenticated, user, initialGymsLoaded]);

//   // Reset when user logs out
//   useEffect(() => {
//     if (!isAuthenticated) {
//       setInitialGymsLoaded(false);
//       resetStore();
//     }
//   }, [isAuthenticated, resetStore]);

//   const loadUserGyms = async () => {
//     try {
//       console.log('🚀 Checking user gym memberships...');
      
//       // Check if user has any gym memberships
//       if (!user?.gymMemberships || user.gymMemberships.length === 0) {
//         console.log('👤 User has no gym memberships');
//         return;
//       }

//       console.log(`🏋️ User has ${user.gymMemberships.length} gym membership(s)`);
      
//       // Determine which gym to load
//       let gymIdToLoad: string | undefined;
      
//       // 1. Try user's currentGymId first
//       if (user.currentGymId) {
//         const hasAccess = user.gymMemberships.some(m => m.gymId === user.currentGymId);
//         if (hasAccess) {
//           gymIdToLoad = user.currentGymId;
//           console.log(`🎯 Loading user's current gym: ${gymIdToLoad}`);
//         }
//       }
      
//       // 2. Fall back to first gym in memberships array
//       if (!gymIdToLoad && user.gymMemberships.length > 0) {
//         gymIdToLoad = user.gymMemberships[0].gymId;
//         console.log(`📋 Loading first gym from memberships: ${gymIdToLoad}`);
//       }
      
//       // 3. Load the gym
//       if (gymIdToLoad) {
//         // Update app store with current gym
//         setCurrentGymId(gymIdToLoad);
        
//         // Load gym data into gym store
//         await loadCurrentGym(gymIdToLoad);
        
//         console.log(`✅ Successfully loaded gym: ${gymIdToLoad}`);
//       }
      
//     } catch (error) {
//       console.error('❌ Error loading user gyms:', error);
//     }
//   };

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
//     <View style={{ flex: 1 }}>
//       <NavigationContainer theme={navigationTheme}>
//         <Stack.Navigator 
//           screenOptions={{ 
//             headerShown: false,
//           }}
//         >
//           {isAuthenticated ? (
//             <Stack.Screen name="MainTabs" component={TabNavigator} />
//           ) : (
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Register" component={RegisterScreen} />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
      
//       {/* Workout Modal - Outside NavigationContainer */}
//       <WorkoutModal />
//     </View>
//   );
// }


// src/app/navigation/RootNavigator.tsx - FIXED (Stable Polling Version)
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useAppStore } from '../../shared/stores/useAppStore';
import { useGymStore } from '../../features/gym/stores/useGymStore';
import { LoginScreen } from '../../features/auth/components/LoginScreen';
import { RegisterScreen } from '../../features/auth/components/RegisterScreen';
import TabNavigator from './TabNavigator';
import WorkoutModal from '../../features/workout/components/WorkoutModal';
import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, user, setCurrentGymId } = useAppStore();
  const { loadCurrentGym, resetStore } = useGymStore();
  const { theme } = useEnhancedTheme();
  
  // 🚀 Track if we've loaded gyms to prevent duplicate calls
  const [initialGymsLoaded, setInitialGymsLoaded] = useState(false);
  
  // 🛡️ CRITICAL: Loading state lock to prevent concurrent operations
  const [isLoadingGym, setIsLoadingGym] = useState(false);
  
  // 🛡️ CRITICAL: Refs for tracking previous values (don't trigger re-renders)
  const previousGymIdRef = useRef<string | undefined>(undefined);
  const previousUserRef = useRef<any>(null);
  const loadGymTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ============ CLEANUP FUNCTION ============
  useEffect(() => {
    return () => {
      // Clean up any pending timeouts
      if (loadGymTimeoutRef.current) {
        clearTimeout(loadGymTimeoutRef.current);
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // ============ STABLE GYM CHANGE CHECKER (USECALLBACK) ============
  const checkForGymChanges = useCallback(async () => {
    try {
      const currentGymId = useAppStore.getState().currentGymId;
      
      // 🛡️ CRITICAL: Only proceed if gym ID actually changed
      if (currentGymId && currentGymId !== previousGymIdRef.current) {
        console.log(`🔄 [RootNavigator] Gym change detected: ${previousGymIdRef.current} → ${currentGymId}`);
        
        // Update ref immediately to prevent duplicate detection
        previousGymIdRef.current = currentGymId;
        
        // Load the new gym data (but don't set currentGymId again!)
        await loadCurrentGym(currentGymId);
        console.log(`✅ [RootNavigator] Loaded new gym: ${currentGymId}`);
      }
    } catch (error) {
      console.error('❌ [RootNavigator] Error checking for gym changes:', error);
    }
  }, [loadCurrentGym]); // 🛡️ Stable dependency - only changes if loadCurrentGym changes

  // ============ INITIAL GYM LOADING (ON LOGIN) ============
  useEffect(() => {
    const initializeGyms = async () => {
      // 🛡️ Safety: Prevent if already loading, no user, or already loaded
      if (!isAuthenticated || !user || initialGymsLoaded || isLoadingGym) {
        console.log('⏳ [RootNavigator] Skipping initial gym load - safety check');
        return;
      }

      // 🛡️ Safety: Check if user actually changed
      if (previousUserRef.current?.id === user.id) {
        console.log('⏳ [RootNavigator] Skipping - same user already initialized');
        return;
      }

      try {
        setIsLoadingGym(true);
        console.log('🚀 [RootNavigator] Initializing user gyms...');
        console.log(`👤 [RootNavigator] User has ${user.gymMemberships?.length || 0} gym(s)`);
        
        await loadUserGyms();
        
        setInitialGymsLoaded(true);
        previousUserRef.current = user; // Store for comparison
        console.log('✅ [RootNavigator] Initial gym loading complete');
      } catch (error) {
        console.error('❌ [RootNavigator] Error initializing gyms:', error);
        setInitialGymsLoaded(true); // Mark as loaded to prevent retry loops
      } finally {
        setIsLoadingGym(false);
      }
    };

    // Use timeout to prevent immediate execution during auth transition
    loadGymTimeoutRef.current = setTimeout(initializeGyms, 300);
    
    return () => {
      if (loadGymTimeoutRef.current) {
        clearTimeout(loadGymTimeoutRef.current);
      }
    };
  }, [isAuthenticated, user, initialGymsLoaded, isLoadingGym]);

  // // ============ STABLE POLLING FOR GYM CHANGES ============
  // useEffect(() => {
  //   console.log('🔍 [RootNavigator] Polling useEffect triggered', {
  //     isAuthenticated,
  //     isLoadingGym,
  //     hasCheckForGymChanges: !!checkForGymChanges
  //   });

  //   if (!isAuthenticated || isLoadingGym) {
  //     console.log('⏳ [RootNavigator] Skipping poll - not authenticated or loading');
  //     return;
  //   }

  //   // Clear any existing interval first
  //   if (pollIntervalRef.current) {
  //     console.log('🧹 [RootNavigator] Clearing existing poll interval');
  //     clearInterval(pollIntervalRef.current);
  //     pollIntervalRef.current = null;
  //   }

  //   console.log('🔍 [RootNavigator] Starting NEW gym change polling...');
    
  //   pollIntervalRef.current = setInterval(() => {
  //     checkForGymChanges();
  //   }, 1500); // 🛡️ Poll every 1.5s (not too frequent)

  //   return () => {
  //     console.log('🧹 [RootNavigator] Cleaning up poll interval (cleanup)');
  //     if (pollIntervalRef.current) {
  //       clearInterval(pollIntervalRef.current);
  //       pollIntervalRef.current = null;
  //     }
  //   };
  // }, [isAuthenticated, isLoadingGym, checkForGymChanges]); // 🛡️ checkForGymChanges is now stable
  // ============ STABLE POLLING FOR GYM CHANGES ============
useEffect(() => {
  console.log('🔍 [RootNavigator] Polling useEffect triggered', {
    isAuthenticated,
    isLoadingGym,
    hasCheckForGymChanges: !!checkForGymChanges
  });

  // 🛡️ ONLY stop polling if not authenticated
  if (!isAuthenticated) {
    console.log('⏳ [RootNavigator] Skipping poll - not authenticated');
    
    // Clear any existing interval
    if (pollIntervalRef.current) {
      console.log('🧹 [RootNavigator] Clearing poll interval (not authenticated)');
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    return;
  }

  // Clear any existing interval first
  if (pollIntervalRef.current) {
    console.log('🧹 [RootNavigator] Clearing existing poll interval');
    clearInterval(pollIntervalRef.current);
    pollIntervalRef.current = null;
  }

  console.log('🔍 [RootNavigator] Starting NEW gym change polling...');
  
  pollIntervalRef.current = setInterval(() => {
    checkForGymChanges();
  }, 1500);

  return () => {
    console.log('🧹 [RootNavigator] Cleaning up poll interval (cleanup)');
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };
}, [isAuthenticated, checkForGymChanges]); // 🛡️ Removed isLoadingGym dependency

  // ============ LOAD USER GYMS (WITH LOOP PREVENTION) ============
  const loadUserGyms = async (specificGymId?: string) => {
    try {
      // 🛡️ Safety lock: Prevent concurrent execution
      if (isLoadingGym) {
        console.log('⏳ [loadUserGyms] Skipping - already loading');
        return;
      }
      
      setIsLoadingGym(true);
      console.log('🚀 [loadUserGyms] Starting...');
      
      if (!user?.gymMemberships || user.gymMemberships.length === 0) {
        console.log('👤 [loadUserGyms] User has no gym memberships');
        setIsLoadingGym(false);
        return;
      }

      console.log(`🏋️ [loadUserGyms] User has ${user.gymMemberships.length} gym(s)`);
      
      let gymIdToLoad: string | undefined = specificGymId;
      
      // Determine which gym to load
      if (!gymIdToLoad) {
        if (user.currentGymId) {
          const hasAccess = user.gymMemberships.some(m => m.gymId === user.currentGymId);
          if (hasAccess) {
            gymIdToLoad = user.currentGymId;
            console.log(`🎯 [loadUserGyms] Loading user's current gym: ${gymIdToLoad}`);
          }
        }
        
        if (!gymIdToLoad && user.gymMemberships.length > 0) {
          gymIdToLoad = user.gymMemberships[0].gymId;
          console.log(`📋 [loadUserGyms] Loading first gym: ${gymIdToLoad}`);
        }
      }
      
      if (gymIdToLoad) {
        console.log(`🔄 [loadUserGyms] Loading data for gym: ${gymIdToLoad}`);
        
        // 🛡️ CRITICAL: Only update if different to prevent loops
        const currentStoredGymId = useAppStore.getState().currentGymId;
        if (currentStoredGymId !== gymIdToLoad) {
          console.log(`📝 [loadUserGyms] Updating currentGymId: ${currentStoredGymId} → ${gymIdToLoad}`);
          setCurrentGymId(gymIdToLoad);
        } else {
          console.log(`⏭️ [loadUserGyms] Skipping update - same gym ID`);
        }
        
        // Load the gym data
        await loadCurrentGym(gymIdToLoad);
        previousGymIdRef.current = gymIdToLoad; // Update ref
        
        console.log(`✅ [loadUserGyms] Successfully loaded gym: ${gymIdToLoad}`);
      }
      
    } catch (error) {
      console.error('❌ [loadUserGyms] Error:', error);
    } finally {
      setIsLoadingGym(false);
    }
  };

  // ============ RESET ON LOGOUT ============
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('🧹 [RootNavigator] User logged out - resetting state');
      setInitialGymsLoaded(false);
      setIsLoadingGym(false);
      previousGymIdRef.current = undefined;
      previousUserRef.current = null;
      
      if (loadGymTimeoutRef.current) {
        clearTimeout(loadGymTimeoutRef.current);
        loadGymTimeoutRef.current = null;
      }
      
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      
      resetStore();
    }
  }, [isAuthenticated, resetStore]);

  // ============ NAVIGATION RENDER ============
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
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
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
      
      <WorkoutModal />
    </View>
  );
}