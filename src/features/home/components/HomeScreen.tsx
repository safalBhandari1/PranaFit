// // src/features/home/components/HomeScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { createHomeStyles } from '../styles/homeScreenStyles';

// // 🚀 Import home components
// import HomeReportsTab from './HomeReportsTabs';
// import HomeProgressTab from './HomeProgressTab';

// type HomeTab = 'reports' | 'progress';

// const HomeScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { user } = useAppStore();
//   const { 
//     recentWorkouts, 
//     workoutStats, 
//     isLoading,
//     loadWorkoutHistory,
//     loadWorkoutStats 
//   } = useWorkoutStore();
  
//   const [activeTab, setActiveTab] = useState<HomeTab>('reports');
//   const [refreshing, setRefreshing] = useState(false);

//   const styles = createHomeStyles(theme);

//   // Load workout data when component mounts
//   useEffect(() => {
//     if (user?.uid) {
//       loadInitialData();
//     }
//   }, [user?.uid]);

//   const loadInitialData = async () => {
//     if (!user?.uid) return;
    
//     try {
//       await Promise.all([
//         loadWorkoutHistory(user.uid),
//         loadWorkoutStats(user.uid)
//       ]);
//     } catch (error) {
//       console.error('Failed to load workout data:', error);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadInitialData();
//     setRefreshing(false);
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header Section */}
//       <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
//         <View style={styles.headerContent}>
//           <ThemeText variant="h1" style={styles.greeting}>
//             {getGreeting()}{user?.displayName ? `, ${user.displayName}` : ''} 👋
//           </ThemeText>
//           <ThemeText variant="body" style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
//             Track your fitness journey and progress
//           </ThemeText>
//         </View>
//       </View>

//       {/* Toggle Navigation */}
//       <View style={[styles.toggleContainer, { backgroundColor: theme.colors.card }]}>
//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             activeTab === 'reports' && [styles.activeToggleButton, { backgroundColor: theme.colors.primary }]
//           ]}
//           onPress={() => setActiveTab('reports')}
//         >
//           <ThemeText style={[
//             styles.toggleText,
//             activeTab === 'reports' && styles.activeToggleText
//           ]}>
//             📊 Reports
//           </ThemeText>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.toggleButton,
//             activeTab === 'progress' && [styles.activeToggleButton, { backgroundColor: theme.colors.primary }]
//           ]}
//           onPress={() => setActiveTab('progress')}
//         >
//           <ThemeText style={[
//             styles.toggleText,
//             activeTab === 'progress' && styles.activeToggleText
//           ]}>
//             📈 Progress
//           </ThemeText>
//         </TouchableOpacity>
//       </View>

//       {/* Main Content */}
//       <ScrollView 
//         style={styles.content}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor={theme.colors.primary}
//           />
//         }
//         showsVerticalScrollIndicator={false}
//       >
//         {activeTab === 'reports' ? (
//           <HomeReportsTab 
//             workouts={recentWorkouts}
//             isLoading={isLoading}
//             theme={theme}
//           />
//         ) : (
//           <HomeProgressTab 
//             stats={workoutStats}
//             isLoading={isLoading}
//             theme={theme}
//           />
//         )}
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default HomeScreen;


// // src/features/home/components/HomeScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { createHomeStyles } from '../styles/homeScreenStyles';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';

// // 🚀 Import home components
// import HomeReportsTab from './HomeReportsTabs';
// import HomeProgressTab from './HomeProgressTab';

// type HomeTab = 'mygym' | 'reports' | 'progress';

// const HEADER_HEIGHT = 100; // Total height of sticky header (top row + tabs)

// const HomeScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { mode, toggleTheme } = useThemeStore(); // Use mode instead of isDark
//   const { user } = useAppStore();
//   const { 
//     recentWorkouts, 
//     workoutStats, 
//     isLoading,
//     loadWorkoutHistory,
//     loadWorkoutStats 
//   } = useWorkoutStore();
  
//   const [activeTab, setActiveTab] = useState<HomeTab>('reports');
//   const [refreshing, setRefreshing] = useState(false);

//   const styles = createHomeStyles(theme);

//   // Load workout data when component mounts
//   useEffect(() => {
//     if (user?.uid) {
//       loadInitialData();
//     }
//   }, [user?.uid]);

//   const loadInitialData = async () => {
//     if (!user?.uid) return;
    
//     try {
//       await Promise.all([
//         loadWorkoutHistory(user.uid),
//         loadWorkoutStats(user.uid)
//       ]);
//     } catch (error) {
//       console.error('Failed to load workout data:', error);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadInitialData();
//     setRefreshing(false);
//   };

//   // Get appropriate icon for theme toggle
//   const getThemeIcon = () => {
//     return mode === 'dark' ? '🌙' : '☀️'; // Use mode from theme store
//   };

//   // Tab content renderer
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'mygym':
//         return renderMyGymTab();
//       case 'reports':
//         return (
//           <HomeReportsTab 
//             workouts={recentWorkouts}
//             isLoading={isLoading}
//             theme={theme}
//           />
//         );
//       case 'progress':
//         return (
//           <HomeProgressTab 
//             stats={workoutStats}
//             isLoading={isLoading}
//             theme={theme}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   // My Gym Tab - Coming Soon placeholder
//   const renderMyGymTab = () => {
//     return (
//       <View style={styles.comingSoonContainer}>
//         <ThemeText variant="h2" style={[styles.comingSoonTitle, { color: theme.colors.text.primary }]}>
//           🏋️‍♂️ My Gym
//         </ThemeText>
//         <ThemeText style={[styles.comingSoonText, { color: theme.colors.text.secondary, marginTop: 12 }]}>
//           Coming Soon!
//         </ThemeText>
//         <ThemeText style={[styles.comingSoonDescription, { color: theme.colors.text.secondary, marginTop: 8 }]}>
//           Track your gym sessions, equipment usage, and connect with trainers.
//         </ThemeText>
        
//         {/* Optional: Add some placeholder features */}
//         <View style={[styles.placeholderCard, { backgroundColor: theme.colors.card, marginTop: 24 }]}>
//           <ThemeText style={[styles.placeholderTitle, { color: theme.colors.text.primary }]}>
//             Planned Features
//           </ThemeText>
          
//           <View style={styles.featureList}>
//             <View style={styles.featureItem}>
//               <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
//               <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
//                 Gym session tracking
//               </ThemeText>
//             </View>
            
//             <View style={styles.featureItem}>
//               <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
//               <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
//                 Equipment availability
//               </ThemeText>
//             </View>
            
//             <View style={styles.featureItem}>
//               <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
//               <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
//                 Trainer connections
//               </ThemeText>
//             </View>
            
//             <View style={styles.featureItem}>
//               <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
//               <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
//                 Class schedules
//               </ThemeText>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ThemeView style={styles.container}>
//       {/* Twitter-Style Sticky Header */}
//       <View style={[styles.stickyHeader, { backgroundColor: theme.colors.background }]}>
//         {/* Top Row: Logo/Brand + Actions */}
//         <View style={styles.headerTopRow}>
//           {/* Left: App Brand */}
//           <View style={styles.headerLeft}>
//             <ThemeText variant="h1" style={[styles.appTitle, { color: theme.colors.text.primary }]}>
//               PranaFit
//             </ThemeText>
//           </View>
          
//           {/* Right: Action Icons */}
//           <View style={styles.headerRight}>
//             <TouchableOpacity 
//               onPress={toggleTheme} 
//               style={[styles.iconButton, { backgroundColor: theme.colors.card }]}
//               activeOpacity={0.7}
//             >
//               <ThemeText style={[styles.iconText, { color: theme.colors.text.primary }]}>
//                 {getThemeIcon()}
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         {/* Three-Tab Segmented Control (Twitter Style) */}
//         <View style={[styles.tabContainer, { backgroundColor: theme.colors.background }]}>
//           {/* My Gym Tab */}
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === 'mygym' && [styles.activeTabButton, { borderBottomColor: theme.colors.primary }]
//             ]}
//             onPress={() => setActiveTab('mygym')}
//             activeOpacity={0.7}
//           >
//             <ThemeText style={[
//               styles.tabText,
//               { color: theme.colors.text.secondary },
//               activeTab === 'mygym' && [styles.activeTabText, { color: theme.colors.primary, fontWeight: '700' }]
//             ]}>
//               My Gym
//             </ThemeText>
//           </TouchableOpacity>
          
//           {/* Reports Tab */}
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === 'reports' && [styles.activeTabButton, { borderBottomColor: theme.colors.primary }]
//             ]}
//             onPress={() => setActiveTab('reports')}
//             activeOpacity={0.7}
//           >
//             <ThemeText style={[
//               styles.tabText,
//               { color: theme.colors.text.secondary },
//               activeTab === 'reports' && [styles.activeTabText, { color: theme.colors.primary, fontWeight: '700' }]
//             ]}>
//               Reports
//             </ThemeText>
//           </TouchableOpacity>
          
//           {/* Progress Tab */}
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === 'progress' && [styles.activeTabButton, { borderBottomColor: theme.colors.primary }]
//             ]}
//             onPress={() => setActiveTab('progress')}
//             activeOpacity={0.7}
//           >
//             <ThemeText style={[
//               styles.tabText,
//               { color: theme.colors.text.secondary },
//               activeTab === 'progress' && [styles.activeTabText, { color: theme.colors.primary, fontWeight: '700' }]
//             ]}>
//               Progress
//             </ThemeText>
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       {/* Main Content Area */}
//       <ScrollView 
//         style={styles.contentScrollView}
//         contentContainerStyle={styles.contentContainer}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor={theme.colors.primary}
//             colors={[theme.colors.primary]}
//           />
//         }
//         showsVerticalScrollIndicator={false}
//         // Bounce effect for iOS
//         bounces={true}
//         // Scroll indicator stays behind header
//         scrollIndicatorInsets={{ top: HEADER_HEIGHT }}
//       >
//         {/* Tab Content */}
//         {renderTabContent()}
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default HomeScreen;

// src/features/home/components/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl, Dimensions, StatusBar, Platform } from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createHomeStyles } from '../styles/homeScreenStyles';
import { useThemeStore } from '../../../shared/stores/useThemeStore';

// 🚀 Import home components
import HomeReportsTab from './HomeReportsTabs';
import HomeProgressTab from './HomeProgressTab';

type HomeTab = 'mygym' | 'reports' | 'progress';

// Twitter-like compact dimensions
const HEADER_TOTAL_HEIGHT = Platform.OS === 'ios' ? 96 : 88; // iOS: 96px, Android: 88px
const TOP_ROW_HEIGHT = 44; // Twitter's top row height
const TAB_ROW_HEIGHT = 48; // Twitter's tab height

const HomeScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { mode, toggleTheme } = useThemeStore();
  const { user } = useAppStore();
  const { 
    recentWorkouts, 
    workoutStats, 
    isLoading,
    loadWorkoutHistory,
    loadWorkoutStats 
  } = useWorkoutStore();
  
  const [activeTab, setActiveTab] = useState<HomeTab>('reports');
  const [refreshing, setRefreshing] = useState(false);

  const styles = createHomeStyles(theme);

  // Load workout data when component mounts
  useEffect(() => {
    if (user?.uid) {
      loadInitialData();
    }
  }, [user?.uid]);

  const loadInitialData = async () => {
    if (!user?.uid) return;
    
    try {
      await Promise.all([
        loadWorkoutHistory(user.uid),
        loadWorkoutStats(user.uid)
      ]);
    } catch (error) {
      console.error('Failed to load workout data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  // Get appropriate icon for theme toggle
  const getThemeIcon = () => {
    return mode === 'dark' ? '🌙' : '☀️';
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'mygym':
        return renderMyGymTab();
      case 'reports':
        return (
          <HomeReportsTab 
            workouts={recentWorkouts || [] }
            isLoading={isLoading}
            theme={theme}
          />
        );
      case 'progress':
        return (
          <HomeProgressTab 
            stats={workoutStats}
            isLoading={isLoading}
            theme={theme}
          />
        );
      default:
        return null;
    }
  };

  // My Gym Tab - Coming Soon placeholder
  const renderMyGymTab = () => {
    return (
      <View style={styles.comingSoonContainer}>
        <ThemeText variant="h2" style={[styles.comingSoonTitle, { color: theme.colors.text.primary }]}>
          🏋️‍♂️ My Gym
        </ThemeText>
        <ThemeText style={[styles.comingSoonText, { color: theme.colors.text.secondary, marginTop: 12 }]}>
          Coming Soon!
        </ThemeText>
        <ThemeText style={[styles.comingSoonDescription, { color: theme.colors.text.secondary, marginTop: 8 }]}>
          Track your gym sessions, equipment usage, and connect with trainers.
        </ThemeText>
        
        {/* Optional: Add some placeholder features */}
        <View style={[styles.placeholderCard, { backgroundColor: theme.colors.card, marginTop: 24 }]}>
          <ThemeText style={[styles.placeholderTitle, { color: theme.colors.text.primary }]}>
            Planned Features
          </ThemeText>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                Gym session tracking
              </ThemeText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                Equipment availability
              </ThemeText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                Trainer connections
              </ThemeText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemeText style={[styles.featureBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                Class schedules
              </ThemeText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ThemeView style={styles.container}>
      {/* Status Bar Background - Twitter style */}
      <View style={[styles.statusBarBackground, { backgroundColor: theme.colors.background }]} />
      
      {/* Twitter-Style Compact Sticky Header */}
      <View style={[styles.stickyHeader, { backgroundColor: theme.colors.background }]}>
        {/* Top Row: Logo/Brand + Actions - Twitter compact style */}
        <View style={styles.headerTopRow}>
          {/* Left: App Brand - Twitter style */}
          <View style={styles.headerLeft}>
            <ThemeText variant="h1" style={[styles.appTitle, { color: theme.colors.text.primary }]}>
              PranaFit
            </ThemeText>
          </View>
          
          {/* Right: Action Icons - Twitter style */}
          <View style={styles.headerRight}>
            <TouchableOpacity 
              onPress={toggleTheme} 
              style={[styles.iconButton, { backgroundColor: 'transparent' }]}
              activeOpacity={0.7}
            >
              <ThemeText style={[styles.iconText, { color: theme.colors.text.primary }]}>
                {getThemeIcon()}
              </ThemeText>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Three-Tab Segmented Control (Twitter Compact Style) */}
        <View style={[styles.tabContainer, { backgroundColor: theme.colors.background }]}>
          {/* My Gym Tab */}
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'mygym' && [styles.activeTabButton, { borderBottomColor: theme.colors.primary }]
            ]}
            onPress={() => setActiveTab('mygym')}
            activeOpacity={0.6}
          >
            <ThemeText style={[
              styles.tabText,
              { color: theme.colors.text.secondary },
              activeTab === 'mygym' && [styles.activeTabText, { color: theme.colors.primary, fontWeight: '700' }]
            ]}>
              My Gym
            </ThemeText>
          </TouchableOpacity>
          
          {/* Reports Tab */}
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'reports' && [styles.activeTabButton, { borderBottomColor: theme.colors.primary }]
            ]}
            onPress={() => setActiveTab('reports')}
            activeOpacity={0.6}
          >
            <ThemeText style={[
              styles.tabText,
              { color: theme.colors.text.secondary },
              activeTab === 'reports' && [styles.activeTabText, { color: theme.colors.primary, fontWeight: '700' }]
            ]}>
              Reports
            </ThemeText>
          </TouchableOpacity>
          
          {/* Progress Tab */}
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'progress' && [styles.activeTabButton, { borderBottomColor: theme.colors.primary }]
            ]}
            onPress={() => setActiveTab('progress')}
            activeOpacity={0.6}
          >
            <ThemeText style={[
              styles.tabText,
              { color: theme.colors.text.secondary },
              activeTab === 'progress' && [styles.activeTabText, { color: theme.colors.primary, fontWeight: '700' }]
            ]}>
              Progress
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main Content Area */}
      <ScrollView 
        style={styles.contentScrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
            progressViewOffset={HEADER_TOTAL_HEIGHT} // Account for sticky header
          />
        }
        showsVerticalScrollIndicator={false}
        // Bounce effect for iOS
        bounces={true}
        // Scroll indicator stays behind header
        scrollIndicatorInsets={{ top: HEADER_TOTAL_HEIGHT }}
        // Content offset for sticky header
        contentOffset={{ x: 0, y: 0 }}
      >
        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </ThemeView>
  );
};

export default HomeScreen;