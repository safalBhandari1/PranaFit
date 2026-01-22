
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
//   ActivityIndicator,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import GymOnboardingScreen from './GymOnboardingScreen';
// import { createGymDashboardStyles } from '../styles/gymDashboardStyles';
// import { useNavigation } from '@react-navigation/native';
// import GymInvitationScreen from './GymInvitationScreen'; // Add this import
// import { useUserRole } from '../../../shared/hooks/useUserRole';


// const GymDashboardScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { 
//     currentGym, 
//     isLoading, 
//     loadCurrentGym, 
//     loadDashboardData, 
//     dashboardStats,
//     resetStore 
//   } = useGymStore();
//   const { user } = useAppStore();
//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [initialLoadComplete, setInitialLoadComplete] = useState(false);

//   const [showInvitationModal, setShowInvitationModal] = useState(false);
//   const { currentGymRole } = useUserRole();



//   const styles = createGymDashboardStyles(theme);
//   // Inside the GymDashboardScreen component, add this:
//   const navigation = useNavigation();
  
//   // Extract username from email
//   const username = user?.email ? user.email.split('@')[0] : 'there';

//   // Update current time every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // 🚀 NEW: Initial gym loading logic
// //   useEffect(() => {
// //     const initializeGym = async () => {
// //       if (!user || initialLoadComplete) return;

// //       console.log('🏋️ Initializing gym dashboard...');
// //       console.log(`👤 User gym memberships: ${user.gymMemberships?.length || 0}`);
      
// //       // Check if user has any gym memberships
// //       if (!user.gymMemberships || user.gymMemberships.length === 0) {
// //         console.log('🆕 User has no gyms - showing setup screen');
// //         setInitialLoadComplete(true);
// //         return;
// //       }

// //       // Determine which gym to load
// //       let gymIdToLoad: string | undefined;
      
// //       // 1. Try user's currentGymId first
// //       if (user.currentGymId) {
// //         const hasAccess = user.gymMemberships.some(m => m.gymId === user.currentGymId);
// //         if (hasAccess) {
// //           gymIdToLoad = user.currentGymId;
// //           console.log(`🎯 Loading user's current gym: ${gymIdToLoad}`);
// //         }
// //       }
      
// //       // 2. Fall back to first gym in memberships array
// //       if (!gymIdToLoad && user.gymMemberships.length > 0) {
// //         gymIdToLoad = user.gymMemberships[0].gymId;
// //         console.log(`📋 Loading first gym from memberships: ${gymIdToLoad}`);
// //       }
      
// //       // 3. Load the gym
// //       if (gymIdToLoad) {
// //         try {
// //           console.log(`🔄 Loading gym data for ID: ${gymIdToLoad}`);
          
// //           // Load basic gym info
// //           await loadCurrentGym(gymIdToLoad);
          
// //           // Load full dashboard data
// //           await loadDashboardData(gymIdToLoad);
          
// //           console.log(`✅ Successfully loaded gym: ${gymIdToLoad}`);
// //         } catch (error) {
// //           console.error('❌ Error loading gym:', error);
// //           // If gym loading fails, reset store to show setup screen
// //           resetStore();
// //         }
// //       }
      
// //       setInitialLoadComplete(true);
// //     };

// //     initializeGym();
// //   }, [user, initialLoadComplete]);

// // 🚀 NEW: Initial gym loading logic - SIMPLIFIED
// useEffect(() => {
//     const checkInitialization = () => {
//       if (!user) {
//         console.log('👤 No user found');
//         setInitialLoadComplete(true);
//         return;
//       }
  
//       console.log(`🏋️ User has ${user.gymMemberships?.length || 0} gym membership(s)`);
      
//       // RootNavigator handles loading, we just wait for data
//       // currentGym === undefined: Still loading (RootNavigator hasn't set it yet)
//       // currentGym === null: No gyms (RootNavigator set it to null)
//       // currentGym === Gym object: Gym loaded successfully
      
//       if (currentGym !== undefined) {
//         // Gym data is ready (could be null or Gym object)
//         setInitialLoadComplete(true);
//       } else {
//         // Still waiting for RootNavigator to load gyms
//         console.log('⏳ Waiting for gym data from RootNavigator...');
//       }
//     };
  
//     if (!initialLoadComplete) {
//       checkInitialization();
//     }
//   }, [user, currentGym, initialLoadComplete]);

//   const onRefresh = async () => {
//     if (!currentGym?.id) return;
    
//     setRefreshing(true);
//     try {
//       await loadDashboardData(currentGym.id);
//     } catch (error) {
//       console.error('❌ Error refreshing dashboard:', error);
//     } finally {
//       setRefreshing(false);
//     }
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

//   // 🚀 NEW: Show loading spinner during initial load
//   if (!initialLoadComplete) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
//           </View>
//         </View>
        
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color={theme.colors.primary} />
//           <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
//             Loading your gym...
//           </ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

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
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.primary} />
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
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                     <Ionicons name="analytics" size={24} color={theme.colors.secondary} />
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
//               // Force reload of the component to show gym dashboard
//               setInitialLoadComplete(false);
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
  
//   // Show loading spinner if still loading
//   if (isLoading) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
//           </View>
//         </View>
        
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color={theme.colors.primary} />
//           <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
//             Loading gym data...
//           </ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }
  
//   return (
//     <>
//         <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//             <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
//             </View>
//         </View>
        
//         <ScrollView
//             style={styles.scrollView}
//             refreshControl={
//             <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={[theme.colors.primary]}
//             />
//             }
//         >
//             {/* Gym Info Section - Left-aligned with biceps icon */}
//             <View style={styles.section}>
//             <View style={styles.gymHeaderRow}>
//                 <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="barbell" size={24} color={theme.colors.primary} />
//                 </View>
//                 <View style={styles.gymHeaderText}>
//                 <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//                     {currentGym.name}
//                 </ThemeText>
//                 <ThemeText variant="body" style={styles.subtitle}>
//                     Proprietors: {ownerName}
//                 </ThemeText>
//                 </View>
//             </View>
//             </View>

//             {/* Gym Status Card - Matching ProfileScreen style */}
//             <View style={styles.statusCard}>
//             <View style={styles.statusCardHeader}>
//                 <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="barbell" size={20} color={theme.colors.primary} />
//                 </View>
//                 <View style={styles.statusTextContainer}>
//                 <ThemeText style={styles.statusCardTitle}>Gym Status</ThemeText>
//                 </View>
//             </View>
            
//             <View style={styles.statusCardBody}>
//                 {/* Active in Gym Row */}
//                 <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                     <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>Active in Gym</ThemeText>
//                 </View>
//                 <ThemeText style={[styles.statusValue, { color: theme.colors.primary }]}>
//                     {dashboardStats?.activeInGym || '0'}
//                 </ThemeText>
//                 </View>

//                 {/* Divider */}
//                 <View style={styles.statusDivider} />

//                 {/* Open/Closed Status Row */}
//                 <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                     <Ionicons 
//                     name={gymOpen ? "checkmark-circle" : "close-circle"} 
//                     size={18} 
//                     color={gymOpen ? theme.colors.warning : theme.colors.warning} 
//                     style={styles.statusIcon}
//                     />
//                     <ThemeText style={styles.statusLabel}>Status</ThemeText>
//                 </View>
//                 <ThemeText style={[
//                     styles.statusValue,
//                     { color: gymOpen ? theme.colors.warning : theme.colors.warning }
//                 ]}>
//                     {gymOpen ? 'OPEN' : 'CLOSED'}
//                 </ThemeText>
//                 </View>

//                 {/* Divider */}
//                 <View style={styles.statusDivider} />

//                 {/* Today's Hours Row */}
//                 <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                     <Ionicons name="time-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>Today's Hours</ThemeText>
//                 </View>
//                 <ThemeText style={styles.statusValue}>
//                     {todaysHours}
//                 </ThemeText>
//                 </View>

//                 {/* Divider */}
//                 <View style={styles.statusDivider} />

//                 {/* Contact Row */}
//                 <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                     <Ionicons name="call-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>Contact</ThemeText>
//                 </View>
//                 <View style={styles.statusValueContainer}>
//                     <ThemeText style={styles.statusValue}>
//                     {currentGym.contactPhone}
//                     </ThemeText>
//                     <ThemeText style={styles.statusSubValue}>
//                     {currentGym.contactEmail}
//                     </ThemeText>
//                 </View>
//                 </View>
//             </View>
//             </View>

//             {/* Invitation Card - Only show for owners and staff */}
//             {(currentGymRole === 'owner' || currentGymRole === 'staff') && (
//             <TouchableOpacity
//                 style={[styles.statusCard, { marginBottom: theme.spacing.lg }]}
//                 onPress={() => setShowInvitationModal(true)}
//                 activeOpacity={0.7}
//             >
//                 <View style={styles.statusCardHeader}>
//                 <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="person-add" size={20} color={theme.colors.accent} />
//                 </View>
//                 <View style={styles.statusTextContainer}>
//                     <ThemeText style={styles.statusCardTitle}>Invite Users</ThemeText>
//                 </View>
//                 </View>
                
//                 <View style={styles.statusCardBody}>
//                 {/* Invitation Stats Row */}
//                 <View style={styles.statusRow}>
//                     <View style={styles.statusLabelContainer}>
//                     <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>Invite Users</ThemeText>
//                     </View>
//                     <ThemeText style={[styles.statusValue, { color: theme.colors.accent }]}>
//                     {currentGymRole === 'owner' ? 'All Roles' : 'Members Only'}
//                     </ThemeText>
//                 </View>

//                 {/* Divider */}
//                 <View style={styles.statusDivider} />

//                 {/* Invitation Description Row */}
//                 <View style={styles.statusRow}>
//                     <View style={styles.statusLabelContainer}>
//                     <Ionicons name="information-circle-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>You can invite</ThemeText>
//                     </View>
//                     <View style={styles.statusValueContainer}>
//                     <ThemeText style={styles.statusValue}>
//                         {currentGymRole === 'owner' 
//                         ? 'Owners, Staff, Trainers & Members' 
//                         : 'Members only (max 500)'}
//                     </ThemeText>
//                     </View>
//                 </View>
//                 </View>
//             </TouchableOpacity>
//             )}

//             {/* Quick Actions Section */}
//             <View style={styles.section}>
//             <ThemeText variant="h2" style={styles.sectionTitle}>
//                 Quick Actions
//             </ThemeText>
//             <ThemeText style={styles.sectionSubtitle}>
//                 Manage your gym operations
//             </ThemeText>
            
//             <View style={styles.featuresGrid}>
//                 {/* Row 1: Business Insights & Gym Details */}
//                 <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="analytics" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                     Business Insights
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                     Analytics, reports, business intelligence
//                 </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                     <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                     Gym Details
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                     Gym info, location, hours, membership
//                 </ThemeText>
//                 </View>

//                 {/* Row 2: Manage Staff & Track Growth */}
//                 <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Staff
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                     Add trainers, assign permissions
//                 </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
//                     <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                     Track Growth
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                     Member growth, revenue trends
//                 </ThemeText>
//                 </View>

//                 {/* Row 3: Manage Members & Handle Payments */}
//                 <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="people" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Members
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                     Add members, track attendance
//                 </ThemeText>
//                 </View>

//                 <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                     Handle Payments
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                     Record payments, track revenue
//                 </ThemeText>
//                 </View>
//             </View>
//             </View>

//             {/* Bottom Spacer */}
//             <View style={styles.bottomSpacer} />
//         </ScrollView>
//         </ThemeView>

//         {/* MODAL 2: Invitation (only for gym owners/staff) */}
//         <GymInvitationScreen
//             visible={showInvitationModal}
//             onClose={() => setShowInvitationModal(false)}
//         />
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
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import GymOnboardingScreen from './GymOnboardingScreen';
// import { createGymDashboardStyles } from '../styles/gymDashboardStyles';
// import { useNavigation } from '@react-navigation/native';
// import GymInvitationScreen from './GymInvitationScreen';
// import { useUserRole } from '../../../shared/hooks/useUserRole';
// import GymProfileModal from './GymProfileModal';

// const GymDashboardScreen: React.FC = () => {
//   const { theme } = useEnhancedTheme();
//   const { 
//     currentGym, 
//     isLoading, 
//     loadCurrentGym, 
//     loadDashboardData, 
//     dashboardStats,
//     resetStore 
//   } = useGymStore();
//   const { user } = useAppStore();
//   const [showSetupModal, setShowSetupModal] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [initialLoadComplete, setInitialLoadComplete] = useState(false);
//   const [showInvitationModal, setShowInvitationModal] = useState(false);
//   const [showGymProfileModal, setShowGymProfileModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false); // ✅ ADDED: For edit mode

//   const { currentGymRole } = useUserRole();
//   const styles = createGymDashboardStyles(theme);
//   const navigation = useNavigation();
  
//   // Extract username from email
//   const username = user?.email ? user.email.split('@')[0] : 'there';

//   // Update current time every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Initial gym loading logic - SIMPLIFIED
//   useEffect(() => {
//     const checkInitialization = () => {
//       if (!user) {
//         console.log('👤 No user found');
//         setInitialLoadComplete(true);
//         return;
//       }
  
//       console.log(`🏋️ User has ${user.gymMemberships?.length || 0} gym membership(s)`);
      
//       // RootNavigator handles loading, we just wait for data
//       // currentGym === undefined: Still loading (RootNavigator hasn't set it yet)
//       // currentGym === null: No gyms (RootNavigator set it to null)
//       // currentGym === Gym object: Gym loaded successfully
      
//       if (currentGym !== undefined) {
//         // Gym data is ready (could be null or Gym object)
//         setInitialLoadComplete(true);
//       } else {
//         // Still waiting for RootNavigator to load gyms
//         console.log('⏳ Waiting for gym data from RootNavigator...');
//       }
//     };
  
//     if (!initialLoadComplete) {
//       checkInitialization();
//     }
//   }, [user, currentGym, initialLoadComplete]);

//   const onRefresh = async () => {
//     if (!currentGym?.id) return;
    
//     setRefreshing(true);
//     try {
//       await loadDashboardData(currentGym.id);
//     } catch (error) {
//       console.error('❌ Error refreshing dashboard:', error);
//     } finally {
//       setRefreshing(false);
//     }
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

//   // Handle edit completion
//   const handleEditComplete = () => {
//     setShowEditModal(false);
//     if (currentGym?.id) {
//       loadDashboardData(currentGym.id);
//     }
//     Alert.alert('Success', 'Gym details updated successfully');
//   };

//   // 🚀 NEW: Show loading spinner during initial load
//   if (!initialLoadComplete) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
//           </View>
//         </View>
        
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color={theme.colors.primary} />
//           <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
//             Loading your gym...
//           </ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

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
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.primary} />
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
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                     <Ionicons name="analytics" size={24} color={theme.colors.secondary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Business Insights
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Analytics, reports, and business intelligence
//                   </ThemeText>
//                 </View>

//                 {/* Row 3 - Gym Details */}
//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={() => setShowGymProfileModal(true)}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                     <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Gym Details
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Gym info, location, hours, membership
//                   </ThemeText>
//                 </TouchableOpacity>
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
//               // Force reload of the component to show gym dashboard
//               setInitialLoadComplete(false);
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
  
//   // Show loading spinner if still loading
//   if (isLoading) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Header with gym profile icon */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
//           </View>
          
//           {/* Gym Profile Icon */}
//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               right: 16,
//               padding: 8,
//             }}
//             onPress={() => setShowGymProfileModal(true)}
//           >
//             <Ionicons name="business" size={24} color={theme.colors.primary} />
//           </TouchableOpacity>
//         </View>
        
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color={theme.colors.primary} />
//           <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
//             Loading gym data...
//           </ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }
  
//   return (
//     <>
//       <ThemeView style={styles.container}>
//         {/* Header with gym profile icon */}
//         <View style={styles.header}>
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
//           </View>
          
//           {/* Gym Profile Icon */}
//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               right: 16,
//               padding: 8,
//             }}
//             onPress={() => setShowGymProfileModal(true)}
//           >
//             <Ionicons name="business" size={24} color={theme.colors.primary} />
//           </TouchableOpacity>
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
//           {/* Gym Info Section - Left-aligned with biceps icon */}
//           <View style={styles.section}>
//             <View style={styles.gymHeaderRow}>
//               <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="barbell" size={24} color={theme.colors.primary} />
//               </View>
//               <View style={styles.gymHeaderText}>
//                 <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//                   {currentGym.name}
//                 </ThemeText>
//                 <ThemeText variant="body" style={styles.subtitle}>
//                   Proprietors: {ownerName}
//                 </ThemeText>
//               </View>
//             </View>
//           </View>

//           {/* Gym Status Card - Matching ProfileScreen style */}
//           <View style={styles.statusCard}>
//             <View style={styles.statusCardHeader}>
//               <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="barbell" size={20} color={theme.colors.primary} />
//               </View>
//               <View style={styles.statusTextContainer}>
//                 <ThemeText style={styles.statusCardTitle}>Gym Status</ThemeText>
//               </View>
//             </View>
            
//             <View style={styles.statusCardBody}>
//               {/* Active in Gym Row */}
//               <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                   <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                   <ThemeText style={styles.statusLabel}>Active in Gym</ThemeText>
//                 </View>
//                 <ThemeText style={[styles.statusValue, { color: theme.colors.primary }]}>
//                   {dashboardStats?.activeMembers || '0'}
//                 </ThemeText>
//               </View>

//               {/* Divider */}
//               <View style={styles.statusDivider} />

//               {/* Open/Closed Status Row */}
//               <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                   <Ionicons 
//                     name={gymOpen ? "checkmark-circle" : "close-circle"} 
//                     size={18} 
//                     color={gymOpen ? theme.colors.warning : theme.colors.warning} 
//                     style={styles.statusIcon}
//                   />
//                   <ThemeText style={styles.statusLabel}>Status</ThemeText>
//                 </View>
//                 <ThemeText style={[
//                   styles.statusValue,
//                   { color: gymOpen ? theme.colors.warning : theme.colors.warning }
//                 ]}>
//                   {gymOpen ? 'OPEN' : 'CLOSED'}
//                 </ThemeText>
//               </View>

//               {/* Divider */}
//               <View style={styles.statusDivider} />

//               {/* Today's Hours Row */}
//               <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                   <Ionicons name="time-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                   <ThemeText style={styles.statusLabel}>Today's Hours</ThemeText>
//                 </View>
//                 <ThemeText style={styles.statusValue}>
//                   {todaysHours}
//                 </ThemeText>
//               </View>

//               {/* Divider */}
//               <View style={styles.statusDivider} />

//               {/* Contact Row */}
//               <View style={styles.statusRow}>
//                 <View style={styles.statusLabelContainer}>
//                   <Ionicons name="call-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                   <ThemeText style={styles.statusLabel}>Contact</ThemeText>
//                 </View>
//                 <View style={styles.statusValueContainer}>
//                   <ThemeText style={styles.statusValue}>
//                     {currentGym.contactPhone}
//                   </ThemeText>
//                   <ThemeText style={styles.statusSubValue}>
//                     {currentGym.contactEmail}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* Invitation Card - Only show for owners and staff */}
//           {(currentGymRole === 'owner' || currentGymRole === 'staff') && (
//             <TouchableOpacity
//               style={[styles.statusCard, { marginBottom: theme.spacing.lg }]}
//               onPress={() => setShowInvitationModal(true)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.statusCardHeader}>
//                 <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="person-add" size={20} color={theme.colors.accent} />
//                 </View>
//                 <View style={styles.statusTextContainer}>
//                   <ThemeText style={styles.statusCardTitle}>Invite Users</ThemeText>
//                 </View>
//               </View>
              
//               <View style={styles.statusCardBody}>
//                 {/* Invitation Stats Row */}
//                 <View style={styles.statusRow}>
//                   <View style={styles.statusLabelContainer}>
//                     <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>Invite Users</ThemeText>
//                   </View>
//                   <ThemeText style={[styles.statusValue, { color: theme.colors.accent }]}>
//                     {currentGymRole === 'owner' ? 'All Roles' : 'Members Only'}
//                   </ThemeText>
//                 </View>

//                 {/* Divider */}
//                 <View style={styles.statusDivider} />

//                 {/* Invitation Description Row */}
//                 <View style={styles.statusRow}>
//                   <View style={styles.statusLabelContainer}>
//                     <Ionicons name="information-circle-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
//                     <ThemeText style={styles.statusLabel}>You can invite</ThemeText>
//                   </View>
//                   <View style={styles.statusValueContainer}>
//                     <ThemeText style={styles.statusValue}>
//                       {currentGymRole === 'owner' 
//                         ? 'Owners, Staff, Trainers & Members' 
//                         : 'Members only (max 500)'}
//                     </ThemeText>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}

//           {/* Quick Actions Section */}
//           <View style={styles.section}>
//             <ThemeText variant="h2" style={styles.sectionTitle}>
//               Quick Actions
//             </ThemeText>
//             <ThemeText style={styles.sectionSubtitle}>
//               Manage your gym operations
//             </ThemeText>
            
//             <View style={styles.featuresGrid}>
//               {/* Row 1: Business Insights & Gym Details */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="analytics" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Business Insights
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Analytics, reports, business intelligence
//                 </ThemeText>
//               </View>

//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={() => setShowGymProfileModal(true)}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                   <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Gym Details
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Gym info, location, hours, membership
//                 </ThemeText>
//               </TouchableOpacity>

//               {/* Row 2: Manage Staff & Track Growth */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Staff
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add trainers, assign permissions
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
//                   Member growth, revenue trends
//                 </ThemeText>
//               </View>

//               {/* Row 3: Manage Members & Handle Payments */}
//               <View style={styles.featureCard}>
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="people" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Members
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add members, track attendance
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
//                   Record payments, track revenue
//                 </ThemeText>
//               </View>
//             </View>
//           </View>

//           {/* Bottom Spacer */}
//           <View style={styles.bottomSpacer} />
//         </ScrollView>
//       </ThemeView>

//       {/* MODAL 1: Invitation (only for gym owners/staff) */}
//       <GymInvitationScreen
//         visible={showInvitationModal}
//         onClose={() => setShowInvitationModal(false)}
//       />

//       {/* MODAL 2: Gym Profile */}
//       <GymProfileModal
//         visible={showGymProfileModal}
//         onClose={() => setShowGymProfileModal(false)}
//         onEdit={() => {
//           // Close gym profile modal first
//           setShowGymProfileModal(false);
//           // Open edit modal after a short delay
//           setTimeout(() => {
//             setShowEditModal(true);
//           }, 300);
//         }}
//       />

//       {/* MODAL 3: Edit Gym Details */}
//       {showEditModal && (
//         <Modal
//           animationType="slide"
//           visible={showEditModal}
//           onRequestClose={() => setShowEditModal(false)}
//         >
//           <GymOnboardingScreen 
//             onComplete={handleEditComplete}
//             onCancel={() => setShowEditModal(false)}
//             gymData={currentGym}
//           />
//         </Modal>
//       )}
//     </>
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
  Alert,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useGymStore } from '../stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import GymOnboardingScreen from './GymOnboardingScreen';
import { createGymDashboardStyles } from '../styles/gymDashboardStyles';
import { useNavigation } from '@react-navigation/native';
import GymInvitationScreen from './GymInvitationScreen';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import GymProfileModal from './GymProfileModal';
import TeamManagementModal from './TeamManagementModal';

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
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showGymProfileModal, setShowGymProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTeamManagementModal, setShowTeamManagementModal] = useState(false);

  const { currentGymRole } = useUserRole();
  const styles = createGymDashboardStyles(theme);
  const navigation = useNavigation();
  
  // Extract username from email
  const username = user?.email ? user.email.split('@')[0] : 'there';

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Initial gym loading logic - SIMPLIFIED
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

  // Handle edit completion
  const handleEditComplete = () => {
    setShowEditModal(false);
    if (currentGym?.id) {
      loadDashboardData(currentGym.id);
    }
    Alert.alert('Success', 'Gym details updated successfully');
  };

  // Handle navigation to different screens
  const handleNavigateToMembers = () => {
    navigation.navigate('Members' as never);
  };

  const handleNavigateToPayments = () => {
    navigation.navigate('Payments' as never);
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
                <TouchableOpacity
                  style={styles.featureCard}
                  onPress={handleNavigateToMembers}
                >
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                    <Ionicons name="people" size={24} color={theme.colors.primary} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Manage Members
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Add members, track payments, view attendance
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.featureCard}
                  onPress={handleNavigateToPayments}
                >
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                    <Ionicons name="cash" size={24} color={theme.colors.accent} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Handle Payments
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Record payments, track revenue, send reminders
                  </ThemeText>
                </TouchableOpacity>

                {/* Row 2 */}
                <TouchableOpacity
                  style={styles.featureCard}
                  onPress={() => setShowTeamManagementModal(true)}
                >
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                    <Ionicons name="person-add" size={24} color={theme.colors.accent} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Manage Staff
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Manage owners, staff & trainers
                  </ThemeText>
                </TouchableOpacity>

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
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
                    <Ionicons name="analytics" size={24} color={theme.colors.secondary} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Business Insights
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Analytics, reports, and business intelligence
                  </ThemeText>
                </View>

                {/* Row 3 - Gym Details */}
                <TouchableOpacity
                  style={styles.featureCard}
                  onPress={() => setShowGymProfileModal(true)}
                >
                  <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
                    <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
                  </View>
                  <ThemeText variant="h3" style={styles.featureTitle}>
                    Gym Details
                  </ThemeText>
                  <ThemeText style={styles.featureDescription}>
                    Gym info, location, hours, membership
                  </ThemeText>
                </TouchableOpacity>
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
        {/* Header with gym profile icon */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
          </View>
          
          {/* Gym Profile Icon */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 16,
              padding: 8,
            }}
            onPress={() => setShowGymProfileModal(true)}
          >
            <Ionicons name="business" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
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
    <>
      <ThemeView style={styles.container}>
        {/* Header with gym profile icon */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ThemeText style={styles.headerTitle}>{currentGym.name}</ThemeText>
          </View>
          
          {/* Gym Profile Icon */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 16,
              padding: 8,
            }}
            onPress={() => setShowGymProfileModal(true)}
          >
            <Ionicons name="business" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
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
                  {dashboardStats?.activeMembers || '0'}
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
                    color={gymOpen ? theme.colors.warning : theme.colors.warning} 
                    style={styles.statusIcon}
                  />
                  <ThemeText style={styles.statusLabel}>Status</ThemeText>
                </View>
                <ThemeText style={[
                  styles.statusValue,
                  { color: gymOpen ? theme.colors.warning : theme.colors.warning }
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

          {/* Invitation Card - Only show for owners and staff */}
          {(currentGymRole === 'owner' || currentGymRole === 'staff') && (
            <TouchableOpacity
              style={[styles.statusCard, { marginBottom: theme.spacing.lg }]}
              onPress={() => setShowInvitationModal(true)}
              activeOpacity={0.7}
            >
              <View style={styles.statusCardHeader}>
                <View style={[styles.statusIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                  <Ionicons name="person-add" size={20} color={theme.colors.accent} />
                </View>
                <View style={styles.statusTextContainer}>
                  <ThemeText style={styles.statusCardTitle}>Invite Users</ThemeText>
                </View>
              </View>
              
              <View style={styles.statusCardBody}>
                {/* Invitation Stats Row */}
                <View style={styles.statusRow}>
                  <View style={styles.statusLabelContainer}>
                    <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
                    <ThemeText style={styles.statusLabel}>Invite Users</ThemeText>
                  </View>
                  <ThemeText style={[styles.statusValue, { color: theme.colors.accent }]}>
                    {currentGymRole === 'owner' ? 'All Roles' : 'Members Only'}
                  </ThemeText>
                </View>

                {/* Divider */}
                <View style={styles.statusDivider} />

                {/* Invitation Description Row */}
                <View style={styles.statusRow}>
                  <View style={styles.statusLabelContainer}>
                    <Ionicons name="information-circle-outline" size={18} color={theme.colors.text.secondary} style={styles.statusIcon} />
                    <ThemeText style={styles.statusLabel}>You can invite</ThemeText>
                  </View>
                  <View style={styles.statusValueContainer}>
                    <ThemeText style={styles.statusValue}>
                      {currentGymRole === 'owner' 
                        ? 'Owners, Staff, Trainers & Members' 
                        : 'Members only (max 500)'}
                    </ThemeText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

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
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                  <Ionicons name="analytics" size={24} color={theme.colors.accent} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Business Insights
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Analytics, reports, business intelligence
                </ThemeText>
              </View>

              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => setShowGymProfileModal(true)}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
                  <Ionicons name="information-circle" size={24} color={theme.colors.secondary} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Gym Details
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Gym info, location, hours, membership
                </ThemeText>
              </TouchableOpacity>

              {/* Row 2: Manage Staff & Track Growth */}
              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => setShowTeamManagementModal(true)}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                  <Ionicons name="person-add" size={24} color={theme.colors.accent} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Manage Staff
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Manage owners, staff & trainers
                </ThemeText>
              </TouchableOpacity>

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
              <TouchableOpacity
                style={styles.featureCard}
                onPress={handleNavigateToMembers}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <Ionicons name="people" size={24} color={theme.colors.primary} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Manage Members
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Add members, track attendance
                </ThemeText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.featureCard}
                onPress={handleNavigateToPayments}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                  <Ionicons name="cash" size={24} color={theme.colors.accent} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Handle Payments
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Record payments, track revenue
                </ThemeText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </ThemeView>

      {/* MODAL 1: Invitation (only for gym owners/staff) */}
      <GymInvitationScreen
        visible={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
      />

      {/* MODAL 2: Gym Profile */}
      <GymProfileModal
        visible={showGymProfileModal}
        onClose={() => setShowGymProfileModal(false)}
        onEdit={() => {
          // Close gym profile modal first
          setShowGymProfileModal(false);
          // Open edit modal after a short delay
          setTimeout(() => {
            setShowEditModal(true);
          }, 300);
        }}
      />

      {/* MODAL 3: Edit Gym Details */}
      {showEditModal && (
        <Modal
          animationType="slide"
          visible={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
        >
          <GymOnboardingScreen 
            onComplete={handleEditComplete}
            onCancel={() => setShowEditModal(false)}
            gymData={currentGym}
          />
        </Modal>
      )}

      {/* MODAL 4: Team Management */}
      <TeamManagementModal
        visible={showTeamManagementModal}
        onClose={() => setShowTeamManagementModal(false)}
      />
    </>
  );
};

export default GymDashboardScreen;