// // src/features/gym/components/GymDashboardScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import GymOnboardingScreen from './GymOnboardingScreen';
// import { createGymDashboardStyles } from '../styles/gymDashboardStyles';

// const GymDashboardScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { currentGym, isLoading, loadDashboardData } = useGymStore();
//   const { user } = useAppStore();
//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const styles = createGymDashboardStyles(theme);
  
//   // Extract username from email
//   const username = user?.email ? user.email.split('@')[0] : 'there';

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (user?.gymId) {
//       await loadDashboardData(user.gymId);
//     }
//     setRefreshing(false);
//   };

//   // If gym is already set up, show business dashboard
//   if (currentGym) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Gym Business Dashboard will go here */}
//         <View style={styles.header}>
//           <ThemeText variant="h1" style={styles.gymName}>
//             {currentGym.name}
//           </ThemeText>
//           <ThemeText style={styles.gymSubtitle}>
//             Welcome back! Ready to manage your gym today?
//           </ThemeText>
//         </View>
        
//         <ScrollView
//           style={styles.scrollView}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[theme.colors.primary]}
//             />
//           }
//         >
//           <ThemeText style={{ padding: 20, color: theme.colors.text.secondary }}>
//             Your business dashboard will appear here once we implement it.
//           </ThemeText>
//         </ScrollView>
//       </ThemeView>
//     );
//   }

//   // Show Welcome & Setup Dashboard for new gym owners
//   return (
//     <>
//       <ThemeView style={styles.container}>
//         {/* 🚀 Twitter-style Header (PranaFit only) */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
//           </View>
//         </View>

//         {/* Welcome Content Below Header */}
//         <View style={styles.welcomeHeader}>
//           <View style={styles.welcomeTopRow}>
//             <View style={styles.welcomeIconContainer}>
//               <Ionicons name="fitness" size={32} color={theme.colors.primary} />
//             </View>
//             <View style={styles.welcomeTextContainer}>
//               {/* 🚀 UPDATED: Show username from email */}
//               <ThemeText variant="h1" style={styles.welcomeTitle}>
//                 Welcome {username}!
//               </ThemeText>
//               <ThemeText style={styles.welcomeSubtitle}>
//                 Get your gym business running in minutes
//               </ThemeText>
//             </View>
//           </View>
          
//           <ThemeText style={styles.welcomeDescription}>
//             PranaFit helps you manage everything from member check-ins to payments, 
//             staff management, and business analytics—all in one place.
//           </ThemeText>
//         </View>

//         <ScrollView
//           style={styles.scrollView}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[theme.colors.primary]}
//             />
//           }
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Setup Gym Card */}
//           <TouchableOpacity
//             style={styles.setupCard}
//             onPress={() => setShowSetupModal(true)}
//             activeOpacity={0.7}
//           >
//             <View style={styles.setupCardHeader}>
//               <View style={[styles.setupIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="business" size={28} color={theme.colors.primary} />
//               </View>
//               <View style={styles.setupTextContainer}>
//                 <ThemeText variant="h2" style={styles.setupCardTitle}>
//                   Set Up Your Gym
//                 </ThemeText>
//                 <ThemeText style={styles.setupCardSubtitle}>
//                   Create your gym profile to get started
//                 </ThemeText>
//               </View>
//               <Ionicons name="chevron-forward" size={24} color={theme.colors.text.secondary} />
//             </View>
            
//             <View style={styles.setupCardBody}>
//               <ThemeText style={styles.setupCardDescription}>
//                 Set up your gym name, location, business hours, and membership packages. 
//                 This takes about 5 minutes.
//               </ThemeText>
              
//               <View style={styles.setupSteps}>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>1</ThemeText>
//                   {/* 🚀 UPDATED: Removed "packages" from step text */}
//                   <ThemeText style={styles.setupStepText}>Basic gym info</ThemeText>
//                 </View>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>2</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Location & hours</ThemeText>
//                 </View>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>3</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Membership</ThemeText>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>

//           {/* Features Grid - What Owners Can Do */}
//           <View style={styles.section}>
//             <ThemeText variant="h2" style={styles.sectionTitle}>
//               What you can do on PranaFit
//             </ThemeText>
//             <ThemeText style={styles.sectionSubtitle}>
//               Everything you need to run a successful gym business
//             </ThemeText>
            
//             <View style={styles.featuresGrid}>
//               {/* Feature 1 */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="people" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Members
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add members, track payments, view attendance, and manage memberships
//                 </ThemeText>
//               </View>

//               {/* Feature 2 */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Handle Payments
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Record payments, track revenue, send payment reminders, and generate invoices
//                 </ThemeText>
//               </View>

//               {/* Feature 3 */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Staff
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add trainers and staff, assign permissions, and manage schedules
//                 </ThemeText>
//               </View>

//               {/* Feature 4 */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                   <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Track Growth
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Monitor member growth, revenue trends, and gym performance analytics
//                 </ThemeText>
//               </View>

//               {/* Feature 5 */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="calendar" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Class Scheduling
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Create class schedules, track attendance, and manage trainer bookings
//                 </ThemeText>
//               </View>

//               {/* Feature 6 */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                   <Ionicons name="bar-chart" size={24} color={theme.colors.secondary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Business Insights
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Get detailed reports on revenue, member retention, and peak hours
//                 </ThemeText>
//               </View>
//             </View>
//           </View>

//           {/* Quick Start Tips */}
//           <View style={styles.section}>
//             <ThemeText variant="h2" style={styles.sectionTitle}>
//               Quick Start Tips
//             </ThemeText>
            
//             <View style={styles.tipsGrid}>
//               <View style={styles.tipCard}>
//                 <ThemeText style={styles.tipNumber}>📋</ThemeText>
//                 <ThemeText variant="h3" style={styles.tipTitle}>
//                   Plan Your Packages
//                 </ThemeText>
//                 <ThemeText style={styles.tipDescription}>
//                   Think about your monthly, quarterly, and annual membership options before setting up
//                 </ThemeText>
//               </View>
              
//               <View style={styles.tipCard}>
//                 <ThemeText style={styles.tipNumber}>👥</ThemeText>
//                 <ThemeText variant="h3" style={styles.tipTitle}>
//                   Invite Your Team
//                 </ThemeText>
//                 <ThemeText style={styles.tipDescription}>
//                   Add your trainers and staff early so they can start using the app
//                 </ThemeText>
//               </View>
              
//               <View style={styles.tipCard}>
//                 <ThemeText style={styles.tipNumber}>🚀</ThemeText>
//                 <ThemeText variant="h3" style={styles.tipTitle}>
//                   Start Simple
//                 </ThemeText>
//                 <ThemeText style={styles.tipDescription}>
//                   You can always add more details later. Just get the basics set up first
//                 </ThemeText>
//               </View>
//             </View>
//           </View>

//           {/* Bottom Spacer */}
//           <View style={styles.bottomSpacer} />
//         </ScrollView>
//       </ThemeView>

//       {/* Gym Setup Modal */}
//       <Modal
//         animationType="slide"
//         visible={showSetupModal}
//         onRequestClose={() => setShowSetupModal(false)}
//       >
//         <GymOnboardingScreen 
//           onComplete={() => {
//             setShowSetupModal(false);
//             // The GymDashboardScreen will automatically refresh and show the business dashboard
//           }}
//           onCancel={() => setShowSetupModal(false)}
//         />
//       </Modal>
//     </>
//   );
// };

// export default GymDashboardScreen;


// // src/features/gym/components/GymDashboardScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import GymOnboardingScreen from './GymOnboardingScreen';
// import { createGymDashboardStyles } from '../styles/gymDashboardStyles';

// const GymDashboardScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { currentGym, isLoading, loadDashboardData, dashboardStats } = useGymStore();
//   const { user } = useAppStore();
//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const styles = createGymDashboardStyles(theme);
  
//   // Extract username from email
//   const username = user?.email ? user.email.split('@')[0] : 'there';

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (user?.gymId) {
//       await loadDashboardData(user.gymId);
//     }
//     setRefreshing(false);
//   };

//   // If gym is already set up, show business dashboard
//   if (currentGym) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Business Dashboard */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
//           </View>
//         </View>
        
//         <ScrollView
//           style={styles.scrollView}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[theme.colors.primary]}
//             />
//           }
//         >
//           {/* Welcome Section - Matches ProjectHomeScreen style */}
//           <View style={styles.section}>
//             <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//               Welcome {username}!
//             </ThemeText>
//             <ThemeText variant="body" style={styles.subtitle}>
//               Get your gym business running in minutes
//             </ThemeText>
//           </View>

//           {/* Stats Grid */}
//           {dashboardStats && (
//             <View style={styles.statsGrid}>
//               <View style={[styles.statCard, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <ThemeText variant="h2" style={[styles.statValue, { color: theme.colors.primary }]}>
//                   {dashboardStats.totalMembers || 0}
//                 </ThemeText>
//                 <ThemeText style={styles.statLabel}>Total Members</ThemeText>
//               </View>

//               <View style={[styles.statCard, { backgroundColor: `${theme.colors.accent}15` }]}>
//                 <ThemeText variant="h2" style={[styles.statValue, { color: theme.colors.accent }]}>
//                   {dashboardStats.activeMembers || 0}
//                 </ThemeText>
//                 <ThemeText style={styles.statLabel}>Active</ThemeText>
//               </View>

//               <View style={[styles.statCard, { backgroundColor: `${theme.colors.warning}15` }]}>
//                 <ThemeText variant="h2" style={[styles.statValue, { color: theme.colors.warning }]}>
//                   {dashboardStats.checkinsToday || 0}
//                 </ThemeText>
//                 <ThemeText style={styles.statLabel}>Today Check-ins</ThemeText>
//               </View>

//               <View style={[styles.statCard, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                 <ThemeText variant="h2" style={[styles.statValue, { color: theme.colors.secondary }]}>
//                   ₹{dashboardStats.revenueThisMonth || 0}
//                 </ThemeText>
//                 <ThemeText style={styles.statLabel}>This Month</ThemeText>
//               </View>
//             </View>
//           )}

//           {/* Quick Actions */}
//           <View style={styles.section}>
//             <ThemeText variant="h2" style={styles.sectionTitle}>
//               Quick Actions
//             </ThemeText>
            
//             <View style={styles.actionsGrid}>
//               <TouchableOpacity 
//                 style={[styles.actionCard, { borderLeftColor: theme.colors.primary }]}
//                 onPress={() => {}}
//               >
//                 <View style={[styles.actionIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="person-add" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.actionTitle}>
//                   Add Member
//                 </ThemeText>
//                 <ThemeText style={styles.actionDescription}>
//                   Add new members to your gym
//                 </ThemeText>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.actionCard, { borderLeftColor: theme.colors.accent }]}
//                 onPress={() => {}}
//               >
//                 <View style={[styles.actionIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="checkmark-circle" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.actionTitle}>
//                   Check-in
//                 </ThemeText>
//                 <ThemeText style={styles.actionDescription}>
//                   Record member check-ins
//                 </ThemeText>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.actionCard, { borderLeftColor: theme.colors.warning }]}
//                 onPress={() => {}}
//               >
//                 <View style={[styles.actionIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                   <Ionicons name="cash" size={24} color={theme.colors.warning} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.actionTitle}>
//                   Record Payment
//                 </ThemeText>
//                 <ThemeText style={styles.actionDescription}>
//                   Record member payments
//                 </ThemeText>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.actionCard, { borderLeftColor: theme.colors.secondary }]}
//                 onPress={() => {}}
//               >
//                 <View style={[styles.actionIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                   <Ionicons name="bar-chart" size={24} color={theme.colors.secondary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.actionTitle}>
//                   View Reports
//                 </ThemeText>
//                 <ThemeText style={styles.actionDescription}>
//                   Business analytics
//                 </ThemeText>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Bottom Spacer */}
//           <View style={styles.bottomSpacer} />
//         </ScrollView>
//       </ThemeView>
//     );
//   }

//   // Show Welcome & Setup Dashboard for new gym owners
//   return (
//     <>
//       <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
//           </View>
//         </View>

//         <ScrollView
//           style={styles.scrollView}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[theme.colors.primary]}
//             />
//           }
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Welcome Section - Matches ProjectHomeScreen style */}
//           <View style={styles.section}>
//             <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//               Welcome {username}!
//             </ThemeText>
//             <ThemeText variant="body" style={styles.subtitle}>
//               Get your gym business running in minutes
//             </ThemeText>
//           </View>

//           {/* Setup Gym Card */}
//           <TouchableOpacity
//             style={styles.setupCard}
//             onPress={() => setShowSetupModal(true)}
//             activeOpacity={0.7}
//           >
//             <View style={styles.setupCardHeader}>
//               <View style={[styles.setupIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="business" size={28} color={theme.colors.primary} />
//               </View>
//               <View style={styles.setupTextContainer}>
//                 <ThemeText variant="h2" style={styles.setupCardTitle}>
//                   Set Up Your Gym
//                 </ThemeText>
//                 <ThemeText style={styles.setupCardSubtitle}>
//                   Create your gym profile to get started
//                 </ThemeText>
//               </View>
//               <Ionicons name="chevron-forward" size={24} color={theme.colors.text.secondary} />
//             </View>
            
//             <View style={styles.setupCardBody}>
//               <ThemeText style={styles.setupCardDescription}>
//                 Set up your gym name, location, business hours, and membership packages. 
//                 This takes about 5 minutes.
//               </ThemeText>
              
//               <View style={styles.setupSteps}>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>1</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Basic gym info</ThemeText>
//                 </View>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>2</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Location & hours</ThemeText>
//                 </View>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>3</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Membership</ThemeText>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>

//           {/* Features Grid */}
//           <View style={styles.section}>
//             <ThemeText variant="h2" style={styles.sectionTitle}>
//               What you can do on PranaFit
//             </ThemeText>
//             <ThemeText style={styles.sectionSubtitle}>
//               Everything you need to run a successful gym business
//             </ThemeText>
            
//             <View style={styles.featuresGrid}>
//               {/* Feature cards remain the same but cleaned up */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="people" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Members
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add members, track payments, view attendance
//                 </ThemeText>
//               </View>

//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Handle Payments
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Record payments, track revenue, send reminders
//                 </ThemeText>
//               </View>

//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Staff
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add trainers and staff, assign permissions
//                 </ThemeText>
//               </View>

//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                   <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Track Growth
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Monitor member growth and revenue trends
//                 </ThemeText>
//               </View>
//             </View>
//           </View>

//           {/* Bottom Spacer */}
//           <View style={styles.bottomSpacer} />
//         </ScrollView>
//       </ThemeView>

//       {/* Gym Setup Modal */}
//       <Modal
//         animationType="slide"
//         visible={showSetupModal}
//         onRequestClose={() => setShowSetupModal(false)}
//       >
//         <GymOnboardingScreen 
//           onComplete={() => {
//             setShowSetupModal(false);
//           }}
//           onCancel={() => setShowSetupModal(false)}
//         />
//       </Modal>
//     </>
//   );
// };

// export default GymDashboardScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import GymOnboardingScreen from './GymOnboardingScreen';
// import { createGymDashboardStyles } from '../styles/gymDashboardStyles';

// const GymDashboardScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { currentGym, isLoading, loadDashboardData, dashboardStats } = useGymStore();
//   const { user } = useAppStore();
//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const styles = createGymDashboardStyles(theme);
  
//   // Extract username from email
//   const username = user?.email ? user.email.split('@')[0] : 'there';

//   // Update current time every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (currentGym?.id) {
//       await loadDashboardData(currentGym.id);
//     }
//     setRefreshing(false);
//   };

//   // Helper function to check if gym is open
//   const isGymOpen = () => {
//     if (!currentGym?.businessHours) return false;
    
//     const now = currentTime;
//     const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
//     const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
//     if (!hours?.open) return false;
    
//     const [openHour, openMinute] = hours.openTime.split(':').map(Number);
//     const [closeHour, closeMinute] = hours.closeTime.split(':').map(Number);
    
//     const openTime = new Date(now);
//     openTime.setHours(openHour, openMinute, 0, 0);
    
//     const closeTime = new Date(now);
//     closeTime.setHours(closeHour, closeMinute, 0, 0);
    
//     return now >= openTime && now <= closeTime;
//   };

//   // Helper to get today's hours
//   const getTodaysHours = () => {
//     if (!currentGym?.businessHours) return 'Not set';
    
//     const now = new Date();
//     const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
//     const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
//     if (!hours?.open) return 'Closed today';
//     return `${hours.openTime} - ${hours.closeTime}`;
//   };

//   // If gym is NOT set up, show setup screen
//   if (!currentGym) {
//     return (
//       <>
//         <ThemeView style={styles.container}>
//           <ScrollView
//             style={styles.scrollView}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={[theme.colors.primary]}
//               />
//             }
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Welcome Section */}
//             <View style={styles.section}>
//               <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//                 Welcome {username}!
//               </ThemeText>
//               <ThemeText variant="body" style={styles.subtitle}>
//                 Get your gym business running in minutes
//               </ThemeText>
//             </View>

//             {/* Setup Gym Card */}
//             <TouchableOpacity
//               style={styles.setupCard}
//               onPress={() => setShowSetupModal(true)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.setupCardHeader}>
//                 <View style={[styles.setupIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="business" size={28} color={theme.colors.primary} />
//                 </View>
//                 <View style={styles.setupTextContainer}>
//                   <ThemeText variant="h2" style={styles.setupCardTitle}>
//                     Set Up Your Gym
//                   </ThemeText>
//                   <ThemeText style={styles.setupCardSubtitle}>
//                     Create your gym profile to get started
//                   </ThemeText>
//                 </View>
//                 <Ionicons name="chevron-forward" size={24} color={theme.colors.text.secondary} />
//               </View>
              
//               <View style={styles.setupCardBody}>
//                 <ThemeText style={styles.setupCardDescription}>
//                   Set up your gym name, location, business hours, and membership packages. 
//                   This takes about 5 minutes.
//                 </ThemeText>
                
//                 <View style={styles.setupSteps}>
//                   <View style={styles.setupStep}>
//                     <ThemeText style={styles.setupStepNumber}>1</ThemeText>
//                     <ThemeText style={styles.setupStepText}>Basic gym info</ThemeText>
//                   </View>
//                   <View style={styles.setupStep}>
//                     <ThemeText style={styles.setupStepNumber}>2</ThemeText>
//                     <ThemeText style={styles.setupStepText}>Location & hours</ThemeText>
//                   </View>
//                   <View style={styles.setupStep}>
//                     <ThemeText style={styles.setupStepNumber}>3</ThemeText>
//                     <ThemeText style={styles.setupStepText}>Membership</ThemeText>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Features Grid */}
//             <View style={styles.section}>
//               <ThemeText variant="h2" style={styles.sectionTitle}>
//                 What you can do on PranaFit
//               </ThemeText>
//               <ThemeText style={styles.sectionSubtitle}>
//                 Everything you need to run a successful gym business
//               </ThemeText>
              
//               <View style={styles.featuresGrid}>
//                 {/* Row 1 */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="people" size={24} color={theme.colors.primary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Members
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Add members, track payments, view attendance
//                   </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Handle Payments
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Record payments, track revenue, send reminders
//                   </ThemeText>
//                 </View>

//                 {/* Row 2 */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.success}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.success} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Staff
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Add trainers and staff, assign permissions
//                   </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                     <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Track Growth
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Monitor member growth and revenue trends
//                   </ThemeText>
//                 </View>

//                 {/* Row 3 - Business Insights */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.info}15` }]}>
//                     <Ionicons name="analytics" size={24} color={theme.colors.info} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Business Insights
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Analytics, reports, and business intelligence
//                   </ThemeText>
//                 </View>

//                 {/* Row 3 - Gym Details */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                     <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Gym Details
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Gym info, location, hours, membership
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>

//             {/* Bottom Spacer */}
//             <View style={styles.bottomSpacer} />
//           </ScrollView>
//         </ThemeView>

//         {/* Gym Setup Modal */}
//         <Modal
//           animationType="slide"
//           visible={showSetupModal}
//           onRequestClose={() => setShowSetupModal(false)}
//         >
//           <GymOnboardingScreen 
//             onComplete={() => {
//               setShowSetupModal(false);
//               if (currentGym?.id) {
//                 loadDashboardData(currentGym.id);
//               }
//             }}
//             onCancel={() => setShowSetupModal(false)}
//           />
//         </Modal>
//       </>
//     );
//   }

//   // GYM IS SET UP - Show Business Dashboard
//   const gymOpen = isGymOpen();
//   const todaysHours = getTodaysHours();
  
//   // Get owners info (for now, just show current user as owner)
//   const ownerInfo = user?.displayName ? `${user.displayName} • ${user.email}` : user?.email || 'Not specified';
  
//   return (
//     <ThemeView style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[theme.colors.primary]}
//           />
//         }
//       >
//         {/* Gym Info Section (Replaces Welcome section) */}
//         <View style={styles.section}>
//           <View style={styles.gymLogoContainer}>
//             <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
//               <Ionicons name="business" size={32} color={theme.colors.primary} />
//             </View>
//           </View>
          
//           <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//             {currentGym.name}
//           </ThemeText>
//           <ThemeText variant="body" style={styles.subtitle}>
//             Proprietors: {ownerInfo}
//           </ThemeText>
//         </View>

//         {/* Gym Status Card (Replaces Setup Card) */}
//         <View style={styles.statusCard}>
//           <View style={styles.statusCardHeader}>
//             <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//               <Ionicons name="business" size={28} color={theme.colors.primary} />
//             </View>
//             <View style={styles.statusTextContainer}>
//               <ThemeText variant="h2" style={styles.statusCardTitle}>
//                 Gym Status
//               </ThemeText>
//               <ThemeText style={styles.statusCardSubtitle}>
//                 Real-time gym information
//               </ThemeText>
//             </View>
//           </View>
          
//           <View style={styles.statusCardBody}>
//             {/* Active in Gym */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusItem}>
//                 <Ionicons name="people-outline" size={24} color={theme.colors.primary} />
//                 <View style={styles.statusItemContent}>
//                   <ThemeText style={styles.statusItemLabel}>Active in Gym</ThemeText>
//                   <ThemeText style={[styles.statusItemValue, { color: theme.colors.primary }]}>
//                     {dashboardStats?.activeInGym || '0'}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>

//             {/* Horizontal Divider */}
//             <View style={styles.statusDivider} />

//             {/* Open/Closed Status */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusItem}>
//                 <Ionicons 
//                   name={gymOpen ? "checkmark-circle" : "close-circle"} 
//                   size={24} 
//                   color={gymOpen ? theme.colors.success : theme.colors.error} 
//                 />
//                 <View style={styles.statusItemContent}>
//                   <ThemeText style={styles.statusItemLabel}>Status</ThemeText>
//                   <ThemeText style={[
//                     styles.statusItemValue,
//                     { color: gymOpen ? theme.colors.success : theme.colors.error }
//                   ]}>
//                     {gymOpen ? 'OPEN' : 'CLOSED'}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>

//             {/* Horizontal Divider */}
//             <View style={styles.statusDivider} />

//             {/* Today's Hours */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusItem}>
//                 <Ionicons name="time-outline" size={24} color={theme.colors.text.secondary} />
//                 <View style={styles.statusItemContent}>
//                   <ThemeText style={styles.statusItemLabel}>Today's Hours</ThemeText>
//                   <ThemeText style={styles.statusItemValue}>
//                     {todaysHours}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Quick Actions Section */}
//         <View style={styles.section}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Quick Actions
//           </ThemeText>
//           <ThemeText style={styles.sectionSubtitle}>
//             Manage your gym operations
//           </ThemeText>
          
//           <View style={styles.featuresGrid}>
//             {/* Row 1: Business Insights & Gym Details */}
//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.info}15` }]}>
//                 <Ionicons name="analytics" size={24} color={theme.colors.info} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Business Insights
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Analytics, reports, business intelligence
//               </ThemeText>
//             </View>

//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                 <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Gym Details
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Gym info, location, hours, membership
//               </ThemeText>
//             </View>

//             {/* Row 2: Manage Staff & Track Growth */}
//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.success}15` }]}>
//                 <Ionicons name="person-add" size={24} color={theme.colors.success} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Manage Staff
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Add trainers, assign permissions
//               </ThemeText>
//             </View>

//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                 <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Track Growth
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Member growth, revenue trends
//               </ThemeText>
//             </View>

//             {/* Row 3: Manage Members & Handle Payments */}
//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="people" size={24} color={theme.colors.primary} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Manage Members
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Add members, track attendance
//               </ThemeText>
//             </View>

//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                 <Ionicons name="cash" size={24} color={theme.colors.accent} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Handle Payments
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Record payments, track revenue
//               </ThemeText>
//             </View>
//           </View>
//         </View>

//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default GymDashboardScreen;






// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import GymOnboardingScreen from './GymOnboardingScreen';
// import { createGymDashboardStyles } from '../styles/gymDashboardStyles';

// const GymDashboardScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { currentGym, isLoading, loadDashboardData, dashboardStats } = useGymStore();
//   const { user } = useAppStore();
//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const styles = createGymDashboardStyles(theme);
  
//   // Extract username from email
//   const username = user?.email ? user.email.split('@')[0] : 'there';

//   // Update current time every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (currentGym?.id) {
//       await loadDashboardData(currentGym.id);
//     }
//     setRefreshing(false);
//   };

//   // Helper function to check if gym is open
//   const isGymOpen = () => {
//     if (!currentGym?.businessHours) return false;
    
//     const now = currentTime;
//     const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
//     const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
//     if (!hours?.open) return false;
    
//     const [openHour, openMinute] = hours.openTime.split(':').map(Number);
//     const [closeHour, closeMinute] = hours.closeTime.split(':').map(Number);
    
//     const openTime = new Date(now);
//     openTime.setHours(openHour, openMinute, 0, 0);
    
//     const closeTime = new Date(now);
//     closeTime.setHours(closeHour, closeMinute, 0, 0);
    
//     return now >= openTime && now <= closeTime;
//   };

//   // Helper to get today's hours
//   const getTodaysHours = () => {
//     if (!currentGym?.businessHours) return 'Not set';
    
//     const now = new Date();
//     const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
//     const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
//     if (!hours?.open) return 'Closed today';
//     return `${hours.openTime} - ${hours.closeTime}`;
//   };

//   // If gym is NOT set up, show setup screen
//   if (!currentGym) {
//     return (
//       <>
//         <ThemeView style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={styles.headerTitleContainer}>
//               <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
//             </View>
//           </View>

//           <ScrollView
//             style={styles.scrollView}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={[theme.colors.primary]}
//               />
//             }
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Welcome Section - Centered */}
//             <View style={[styles.section, styles.centeredSection]}>
//               <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//                 Welcome {username}!
//               </ThemeText>
//               <ThemeText variant="body" style={styles.subtitle}>
//                 Get your gym business running in minutes
//               </ThemeText>
//             </View>

//             {/* Setup Gym Card */}
//             <TouchableOpacity
//               style={styles.setupCard}
//               onPress={() => setShowSetupModal(true)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.setupCardHeader}>
//                 <View style={[styles.setupIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="business" size={28} color={theme.colors.primary} />
//                 </View>
//                 <View style={styles.setupTextContainer}>
//                   <ThemeText variant="h2" style={styles.setupCardTitle}>
//                     Set Up Your Gym
//                   </ThemeText>
//                   <ThemeText style={styles.setupCardSubtitle}>
//                     Create your gym profile to get started
//                   </ThemeText>
//                 </View>
//                 <Ionicons name="chevron-forward" size={24} color={theme.colors.text.secondary} />
//               </View>
              
//               <View style={styles.setupCardBody}>
//                 <ThemeText style={styles.setupCardDescription}>
//                   Set up your gym name, location, business hours, and membership packages. 
//                   This takes about 5 minutes.
//                 </ThemeText>
                
//                 <View style={styles.setupSteps}>
//                   <View style={styles.setupStep}>
//                     <ThemeText style={styles.setupStepNumber}>1</ThemeText>
//                     <ThemeText style={styles.setupStepText}>Basic gym info</ThemeText>
//                   </View>
//                   <View style={styles.setupStep}>
//                     <ThemeText style={styles.setupStepNumber}>2</ThemeText>
//                     <ThemeText style={styles.setupStepText}>Location & hours</ThemeText>
//                   </View>
//                   <View style={styles.setupStep}>
//                     <ThemeText style={styles.setupStepNumber}>3</ThemeText>
//                     <ThemeText style={styles.setupStepText}>Membership</ThemeText>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Features Grid */}
//             <View style={styles.section}>
//               <ThemeText variant="h2" style={styles.sectionTitle}>
//                 What you can do on PranaFit
//               </ThemeText>
//               <ThemeText style={styles.sectionSubtitle}>
//                 Everything you need to run a successful gym business
//               </ThemeText>
              
//               <View style={styles.featuresGrid}>
//                 {/* Row 1 */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="people" size={24} color={theme.colors.primary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Members
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Add members, track payments, view attendance
//                   </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Handle Payments
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Record payments, track revenue, send reminders
//                   </ThemeText>
//                 </View>

//                 {/* Row 2 */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.success}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.success} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Staff
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Add trainers and staff, assign permissions
//                   </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                     <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Track Growth
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Monitor member growth and revenue trends
//                   </ThemeText>
//                 </View>

//                 {/* Row 3 - Business Insights */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.info}15` }]}>
//                     <Ionicons name="analytics" size={24} color={theme.colors.info} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Business Insights
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Analytics, reports, and business intelligence
//                   </ThemeText>
//                 </View>

//                 {/* Row 3 - Gym Details */}
//                 <View style={styles.featureCard}>
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                     <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Gym Details
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Gym info, location, hours, membership
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>

//             {/* Bottom Spacer */}
//             <View style={styles.bottomSpacer} />
//           </ScrollView>
//         </ThemeView>

//         {/* Gym Setup Modal */}
//         <Modal
//           animationType="slide"
//           visible={showSetupModal}
//           onRequestClose={() => setShowSetupModal(false)}
//         >
//           <GymOnboardingScreen 
//             onComplete={() => {
//               setShowSetupModal(false);
//               if (currentGym?.id) {
//                 loadDashboardData(currentGym.id);
//               }
//             }}
//             onCancel={() => setShowSetupModal(false)}
//           />
//         </Modal>
//       </>
//     );
//   }

//   // GYM IS SET UP - Show Business Dashboard
//   const gymOpen = isGymOpen();
//   const todaysHours = getTodaysHours();
  
//   // Get owner name
//   const ownerName = user?.displayName || 'Owner';
  
//   return (
//     <ThemeView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTitleContainer}>
//           <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
//         </View>
//       </View>
      
//       <ScrollView
//         style={styles.scrollView}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[theme.colors.primary]}
//           />
//         }
//       >
//         {/* Gym Info Section - Left-aligned with biceps icon */}
//         <View style={styles.section}>
//           <View style={styles.gymHeaderRow}>
//             <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
//               <Ionicons name="barbell" size={24} color={theme.colors.primary} />
//             </View>
//             <View style={styles.gymHeaderText}>
//               <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//                 {currentGym.name}
//               </ThemeText>
//               <ThemeText variant="body" style={styles.subtitle}>
//                 Proprietors: {ownerName}
//               </ThemeText>
//             </View>
//           </View>
//         </View>

//         {/* Gym Status Card - Matching ProfileScreen style */}
//         <View style={styles.statusCard}>
//           <View style={styles.statusCardHeader}>
//             <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//               <Ionicons name="barbell" size={20} color={theme.colors.primary} />
//             </View>
//             <View style={styles.statusTextContainer}>
//               <ThemeText style={styles.statusCardTitle}>Gym Status</ThemeText>
//             </View>
//           </View>
          
//           <View style={styles.statusCardBody}>
//             {/* Active in Gym Row */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusLabelContainer}>
//                 <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                 <ThemeText style={styles.statusLabel}>Active in Gym</ThemeText>
//               </View>
//               <ThemeText style={[styles.statusValue, { color: theme.colors.primary }]}>
//                 {dashboardStats?.activeInGym || '0'}
//               </ThemeText>
//             </View>

//             {/* Divider */}
//             <View style={styles.statusDivider} />

//             {/* Open/Closed Status Row */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusLabelContainer}>
//                 <Ionicons 
//                   name={gymOpen ? "checkmark-circle" : "close-circle"} 
//                   size={18} 
//                   color={gymOpen ? theme.colors.success : theme.colors.error} 
//                   style={styles.statusIcon}
//                 />
//                 <ThemeText style={styles.statusLabel}>Status</ThemeText>
//               </View>
//               <ThemeText style={[
//                 styles.statusValue,
//                 { color: gymOpen ? theme.colors.success : theme.colors.error }
//               ]}>
//                 {gymOpen ? 'OPEN' : 'CLOSED'}
//               </ThemeText>
//             </View>

//             {/* Divider */}
//             <View style={styles.statusDivider} />

//             {/* Today's Hours Row */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusLabelContainer}>
//                 <Ionicons name="time-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                 <ThemeText style={styles.statusLabel}>Today's Hours</ThemeText>
//               </View>
//               <ThemeText style={styles.statusValue}>
//                 {todaysHours}
//               </ThemeText>
//             </View>

//             {/* Divider */}
//             <View style={styles.statusDivider} />

//             {/* Contact Row */}
//             <View style={styles.statusRow}>
//               <View style={styles.statusLabelContainer}>
//                 <Ionicons name="call-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                 <ThemeText style={styles.statusLabel}>Contact</ThemeText>
//               </View>
//               <View style={styles.statusValueContainer}>
//                 <ThemeText style={styles.statusValue}>
//                   {currentGym.contactPhone}
//                 </ThemeText>
//                 <ThemeText style={styles.statusSubValue}>
//                   {currentGym.contactEmail}
//                 </ThemeText>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Quick Actions Section */}
//         <View style={styles.section}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Quick Actions
//           </ThemeText>
//           <ThemeText style={styles.sectionSubtitle}>
//             Manage your gym operations
//           </ThemeText>
          
//           <View style={styles.featuresGrid}>
//             {/* Row 1: Business Insights & Gym Details */}
//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.info}15` }]}>
//                 <Ionicons name="analytics" size={24} color={theme.colors.info} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Business Insights
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Analytics, reports, business intelligence
//               </ThemeText>
//             </View>

//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                 <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Gym Details
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Gym info, location, hours, membership
//               </ThemeText>
//             </View>

//             {/* Row 2: Manage Staff & Track Growth */}
//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.success}15` }]}>
//                 <Ionicons name="person-add" size={24} color={theme.colors.success} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Manage Staff
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Add trainers, assign permissions
//               </ThemeText>
//             </View>

//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                 <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Track Growth
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Member growth, revenue trends
//               </ThemeText>
//             </View>

//             {/* Row 3: Manage Members & Handle Payments */}
//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="people" size={24} color={theme.colors.primary} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Manage Members
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Add members, track attendance
//               </ThemeText>
//             </View>

//             <View style={styles.featureCard}>
//               <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                 <Ionicons name="cash" size={24} color={theme.colors.accent} />
//               </View>
//               <ThemeText variant="h3" style={styles.featureTitle}>
//                 Handle Payments
//               </ThemeText>
//               <ThemeText style={styles.featureDescription}>
//                 Record payments, track revenue
//               </ThemeText>
//             </View>
//           </View>
//         </View>

//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default GymDashboardScreen;




import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useGymStore } from '../stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import GymOnboardingScreen from './GymOnboardingScreen';
import { createGymDashboardStyles } from '../styles/gymDashboardStyles';

const GymDashboardScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { 
    currentGym, 
    isLoading, 
    loadCurrentGym, 
    loadDashboardData, 
    dashboardStats,
    resetStore 
  } = useGymStore();
  const { user } = useAppStore();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const styles = createGymDashboardStyles(theme);
  
  // Extract username from email
  const username = user?.email ? user.email.split('@')[0] : 'there';

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🚀 NEW: Initial gym loading logic
//   useEffect(() => {
//     const initializeGym = async () => {
//       if (!user || initialLoadComplete) return;

//       console.log('🏋️ Initializing gym dashboard...');
//       console.log(`👤 User gym memberships: ${user.gymMemberships?.length || 0}`);
      
//       // Check if user has any gym memberships
//       if (!user.gymMemberships || user.gymMemberships.length === 0) {
//         console.log('🆕 User has no gyms - showing setup screen');
//         setInitialLoadComplete(true);
//         return;
//       }

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
//         try {
//           console.log(`🔄 Loading gym data for ID: ${gymIdToLoad}`);
          
//           // Load basic gym info
//           await loadCurrentGym(gymIdToLoad);
          
//           // Load full dashboard data
//           await loadDashboardData(gymIdToLoad);
          
//           console.log(`✅ Successfully loaded gym: ${gymIdToLoad}`);
//         } catch (error) {
//           console.error('❌ Error loading gym:', error);
//           // If gym loading fails, reset store to show setup screen
//           resetStore();
//         }
//       }
      
//       setInitialLoadComplete(true);
//     };

//     initializeGym();
//   }, [user, initialLoadComplete]);

// 🚀 NEW: Initial gym loading logic - SIMPLIFIED
useEffect(() => {
    const checkInitialization = () => {
      if (!user) {
        console.log('👤 No user found');
        setInitialLoadComplete(true);
        return;
      }
  
      console.log(`🏋️ User has ${user.gymMemberships?.length || 0} gym membership(s)`);
      
      // RootNavigator handles loading, we just wait for data
      // currentGym === undefined: Still loading (RootNavigator hasn't set it yet)
      // currentGym === null: No gyms (RootNavigator set it to null)
      // currentGym === Gym object: Gym loaded successfully
      
      if (currentGym !== undefined) {
        // Gym data is ready (could be null or Gym object)
        setInitialLoadComplete(true);
      } else {
        // Still waiting for RootNavigator to load gyms
        console.log('⏳ Waiting for gym data from RootNavigator...');
      }
    };
  
    if (!initialLoadComplete) {
      checkInitialization();
    }
  }, [user, currentGym, initialLoadComplete]);

  const onRefresh = async () => {
    if (!currentGym?.id) return;
    
    setRefreshing(true);
    try {
      await loadDashboardData(currentGym.id);
    } catch (error) {
      console.error('❌ Error refreshing dashboard:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Helper function to check if gym is open
  const isGymOpen = () => {
    if (!currentGym?.businessHours) return false;
    
    const now = currentTime;
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
    if (!hours?.open) return false;
    
    const [openHour, openMinute] = hours.openTime.split(':').map(Number);
    const [closeHour, closeMinute] = hours.closeTime.split(':').map(Number);
    
    const openTime = new Date(now);
    openTime.setHours(openHour, openMinute, 0, 0);
    
    const closeTime = new Date(now);
    closeTime.setHours(closeHour, closeMinute, 0, 0);
    
    return now >= openTime && now <= closeTime;
  };

  // Helper to get today's hours
  const getTodaysHours = () => {
    if (!currentGym?.businessHours) return 'Not set';
    
    const now = new Date();
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
    if (!hours?.open) return 'Closed today';
    return `${hours.openTime} - ${hours.closeTime}`;
  };

  // 🚀 NEW: Show loading spinner during initial load
  if (!initialLoadComplete) {
    return (
      <ThemeView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
          </View>
        </View>
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
            Loading your gym...
          </ThemeText>
        </View>
      </ThemeView>
    );
  }

  // If gym is NOT set up, show setup screen
  if (!currentGym) {
    return (
      <>
        <ThemeView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.primary]}
              />
            }
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Section - Centered */}
            <View style={[styles.section, styles.centeredSection]}>
              <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
                Welcome {username}!
              </ThemeText>
              <ThemeText variant="body" style={styles.subtitle}>
                Get your gym business running in minutes
              </ThemeText>
            </View>

            {/* Setup Gym Card */}
            <TouchableOpacity
              style={styles.setupCard}
              onPress={() => setShowSetupModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.setupCardHeader}>
                <View style={[styles.setupIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <Ionicons name="business" size={28} color={theme.colors.primary} />
                </View>
                <View style={styles.setupTextContainer}>
                  <ThemeText variant="h2" style={styles.setupCardTitle}>
                    Set Up Your Gym
                  </ThemeText>
                  <ThemeText style={styles.setupCardSubtitle}>
                    Create your gym profile to get started
                  </ThemeText>
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.text.secondary} />
              </View>
              
              <View style={styles.setupCardBody}>
                <ThemeText style={styles.setupCardDescription}>
                  Set up your gym name, location, business hours, and membership packages. 
                  This takes about 5 minutes.
                </ThemeText>
                
                <View style={styles.setupSteps}>
                  <View style={styles.setupStep}>
                    <ThemeText style={styles.setupStepNumber}>1</ThemeText>
                    <ThemeText style={styles.setupStepText}>Basic gym info</ThemeText>
                  </View>
                  <View style={styles.setupStep}>
                    <ThemeText style={styles.setupStepNumber}>2</ThemeText>
                    <ThemeText style={styles.setupStepText}>Location & hours</ThemeText>
                  </View>
                  <View style={styles.setupStep}>
                    <ThemeText style={styles.setupStepNumber}>3</ThemeText>
                    <ThemeText style={styles.setupStepText}>Membership</ThemeText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Features Grid */}
            <View style={styles.section}>
              <ThemeText variant="h2" style={styles.sectionTitle}>
                What you can do on PranaFit
              </ThemeText>
              <ThemeText style={styles.sectionSubtitle}>
                Everything you need to run a successful gym business
              </ThemeText>
              
              <View style={styles.featuresGrid}>
                {/* Row 1 */}
                <View style={styles.featureCard}>
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                    <Ionicons name="people" size={24} color={theme.colors.primary} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Manage Members
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Add members, track payments, view attendance
                  </ThemeText>
                </View>

                <View style={styles.featureCard}>
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                    <Ionicons name="cash" size={24} color={theme.colors.accent} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Handle Payments
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Record payments, track revenue, send reminders
                  </ThemeText>
                </View>

                {/* Row 2 */}
                <View style={styles.featureCard}>
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.success}15` }]}>
                    <Ionicons name="person-add" size={24} color={theme.colors.success} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Manage Staff
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Add trainers and staff, assign permissions
                  </ThemeText>
                </View>

                <View style={styles.featureCard}>
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
                    <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Track Growth
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Monitor member growth and revenue trends
                  </ThemeText>
                </View>

                {/* Row 3 - Business Insights */}
                <View style={styles.featureCard}>
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.info}15` }]}>
                    <Ionicons name="analytics" size={24} color={theme.colors.info} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Business Insights
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Analytics, reports, and business intelligence
                  </ThemeText>
                </View>

                {/* Row 3 - Gym Details */}
                <View style={styles.featureCard}>
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
                    <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Gym Details
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Gym info, location, hours, membership
                  </ThemeText>
                </View>
              </View>
            </View>

            {/* Bottom Spacer */}
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </ThemeView>

        {/* Gym Setup Modal */}
        <Modal
          animationType="slide"
          visible={showSetupModal}
          onRequestClose={() => setShowSetupModal(false)}
        >
          <GymOnboardingScreen 
            onComplete={() => {
              setShowSetupModal(false);
              // Force reload of the component to show gym dashboard
              setInitialLoadComplete(false);
            }}
            onCancel={() => setShowSetupModal(false)}
          />
        </Modal>
      </>
    );
  }

  // GYM IS SET UP - Show Business Dashboard
  const gymOpen = isGymOpen();
  const todaysHours = getTodaysHours();
  
  // Get owner name
  const ownerName = user?.displayName || 'Owner';
  
  // Show loading spinner if still loading
  if (isLoading) {
    return (
      <ThemeView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
          </View>
        </View>
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
            Loading gym data...
          </ThemeText>
        </View>
      </ThemeView>
    );
  }
  
  return (
    <ThemeView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
        </View>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Gym Info Section - Left-aligned with biceps icon */}
        <View style={styles.section}>
          <View style={styles.gymHeaderRow}>
            <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Ionicons name="barbell" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.gymHeaderText}>
              <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
                {currentGym.name}
              </ThemeText>
              <ThemeText variant="body" style={styles.subtitle}>
                Proprietors: {ownerName}
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Gym Status Card - Matching ProfileScreen style */}
        <View style={styles.statusCard}>
          <View style={styles.statusCardHeader}>
            <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Ionicons name="barbell" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.statusTextContainer}>
              <ThemeText style={styles.statusCardTitle}>Gym Status</ThemeText>
            </View>
          </View>
          
          <View style={styles.statusCardBody}>
            {/* Active in Gym Row */}
            <View style={styles.statusRow}>
              <View style={styles.statusLabelContainer}>
                <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
                <ThemeText style={styles.statusLabel}>Active in Gym</ThemeText>
              </View>
              <ThemeText style={[styles.statusValue, { color: theme.colors.primary }]}>
                {dashboardStats?.activeInGym || '0'}
              </ThemeText>
            </View>

            {/* Divider */}
            <View style={styles.statusDivider} />

            {/* Open/Closed Status Row */}
            <View style={styles.statusRow}>
              <View style={styles.statusLabelContainer}>
                <Ionicons 
                  name={gymOpen ? "checkmark-circle" : "close-circle"} 
                  size={18} 
                  color={gymOpen ? theme.colors.success : theme.colors.error} 
                  style={styles.statusIcon}
                />
                <ThemeText style={styles.statusLabel}>Status</ThemeText>
              </View>
              <ThemeText style={[
                styles.statusValue,
                { color: gymOpen ? theme.colors.success : theme.colors.error }
              ]}>
                {gymOpen ? 'OPEN' : 'CLOSED'}
              </ThemeText>
            </View>

            {/* Divider */}
            <View style={styles.statusDivider} />

            {/* Today's Hours Row */}
            <View style={styles.statusRow}>
              <View style={styles.statusLabelContainer}>
                <Ionicons name="time-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
                <ThemeText style={styles.statusLabel}>Today's Hours</ThemeText>
              </View>
              <ThemeText style={styles.statusValue}>
                {todaysHours}
              </ThemeText>
            </View>

            {/* Divider */}
            <View style={styles.statusDivider} />

            {/* Contact Row */}
            <View style={styles.statusRow}>
              <View style={styles.statusLabelContainer}>
                <Ionicons name="call-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
                <ThemeText style={styles.statusLabel}>Contact</ThemeText>
              </View>
              <View style={styles.statusValueContainer}>
                <ThemeText style={styles.statusValue}>
                  {currentGym.contactPhone}
                </ThemeText>
                <ThemeText style={styles.statusSubValue}>
                  {currentGym.contactEmail}
                </ThemeText>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
            Quick Actions
          </ThemeText>
          <ThemeText style={styles.sectionSubtitle}>
            Manage your gym operations
          </ThemeText>
          
          <View style={styles.featuresGrid}>
            {/* Row 1: Business Insights & Gym Details */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.info}15` }]}>
                <Ionicons name="analytics" size={24} color={theme.colors.info} />
              </View>
              <ThemeText variant="h3" style={styles.featureTitle}>
                Business Insights
              </ThemeText>
              <ThemeText style={styles.featureDescription}>
                Analytics, reports, business intelligence
              </ThemeText>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
                <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
              </View>
              <ThemeText variant="h3" style={styles.featureTitle}>
                Gym Details
              </ThemeText>
              <ThemeText style={styles.featureDescription}>
                Gym info, location, hours, membership
              </ThemeText>
            </View>

            {/* Row 2: Manage Staff & Track Growth */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.success}15` }]}>
                <Ionicons name="person-add" size={24} color={theme.colors.success} />
              </View>
              <ThemeText variant="h3" style={styles.featureTitle}>
                Manage Staff
              </ThemeText>
              <ThemeText style={styles.featureDescription}>
                Add trainers, assign permissions
              </ThemeText>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
                <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
              </View>
              <ThemeText variant="h3" style={styles.featureTitle}>
                Track Growth
              </ThemeText>
              <ThemeText style={styles.featureDescription}>
                Member growth, revenue trends
              </ThemeText>
            </View>

            {/* Row 3: Manage Members & Handle Payments */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                <Ionicons name="people" size={24} color={theme.colors.primary} />
              </View>
              <ThemeText variant="h3" style={styles.featureTitle}>
                Manage Members
              </ThemeText>
              <ThemeText style={styles.featureDescription}>
                Add members, track attendance
              </ThemeText>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                <Ionicons name="cash" size={24} color={theme.colors.accent} />
              </View>
              <ThemeText variant="h3" style={styles.featureTitle}>
                Handle Payments
              </ThemeText>
              <ThemeText style={styles.featureDescription}>
                Record payments, track revenue
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemeView>
  );
};

export default GymDashboardScreen;