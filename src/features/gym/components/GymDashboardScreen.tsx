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
// import TeamManagementModal from './TeamManagementModal';

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
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showTeamManagementModal, setShowTeamManagementModal] = useState(false);

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

//   // Handle navigation to different screens
//   const handleNavigateToMembers = () => {
//     navigation.navigate('Members' as never);
//   };

//   const handleNavigateToPayments = () => {
//     navigation.navigate('Payments' as never);
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
//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={handleNavigateToMembers}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="people" size={24} color={theme.colors.primary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Members
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Add members, track payments, view attendance
//                   </ThemeText>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={handleNavigateToPayments}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Handle Payments
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Record payments, track revenue, send reminders
//                   </ThemeText>
//                 </TouchableOpacity>

//                 {/* Row 2 */}
//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={() => setShowTeamManagementModal(true)}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Staff
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Manage owners, staff & trainers
//                   </ThemeText>
//                 </TouchableOpacity>

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
//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={() => setShowTeamManagementModal(true)}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Staff
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Manage owners, staff & trainers
//                 </ThemeText>
//               </TouchableOpacity>

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
//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={handleNavigateToMembers}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="people" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Members
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add members, track attendance
//                 </ThemeText>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={handleNavigateToPayments}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Handle Payments
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Record payments, track revenue
//                 </ThemeText>
//               </TouchableOpacity>
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

//       {/* MODAL 4: Team Management */}
//       <TeamManagementModal
//         visible={showTeamManagementModal}
//         onClose={() => setShowTeamManagementModal(false)}
//       />
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
// import TeamManagementModal from './TeamManagementModal';

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
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showTeamManagementModal, setShowTeamManagementModal] = useState(false);

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

//   // Get crowd level based on active members
//   const getCrowdLevel = () => {
//     const activeMembers = dashboardStats?.activeMembers || 0;
//     if (activeMembers < 10) return { level: 'Low', percent: 33, color: theme.colors.primary };
//     if (activeMembers >= 10 && activeMembers < 25) return { level: 'Medium', percent: 66, color: theme.colors.warning };
//     return { level: 'High', percent: 100, color: theme.colors.primary };
//   };

//   // Handle edit completion
//   const handleEditComplete = () => {
//     setShowEditModal(false);
//     if (currentGym?.id) {
//       loadDashboardData(currentGym.id);
//     }
//     Alert.alert('Success', 'Gym details updated successfully');
//   };

//   // Handle navigation to different screens
//   const handleNavigateToMembers = () => {
//     navigation.navigate('Members' as never);
//   };

//   const handleNavigateToPayments = () => {
//     navigation.navigate('Payments' as never);
//   };

//   // 🚀 NEW: Show loading spinner during initial load
//   if (!initialLoadComplete) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
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
//             <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
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
//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={handleNavigateToMembers}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                     <Ionicons name="people" size={24} color={theme.colors.primary} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Members
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Add members, track payments, view attendance
//                   </ThemeText>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={handleNavigateToPayments}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Handle Payments
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Record payments, track revenue, send reminders
//                   </ThemeText>
//                 </TouchableOpacity>

//                 {/* Row 2 */}
//                 <TouchableOpacity
//                   style={styles.featureCard}
//                   onPress={() => setShowTeamManagementModal(true)}
//                 >
//                   <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                     <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                   </View>
//                   <ThemeText variant="h3" style={styles.featureTitle}>
//                     Manage Staff
//                   </ThemeText>
//                   <ThemeText style={styles.featureDescription}>
//                     Manage owners, staff & trainers
//                   </ThemeText>
//                 </TouchableOpacity>

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
//   const crowdLevel = getCrowdLevel();
  
//   // Get owner name
//   const ownerName = user?.displayName || 'Owner';
  
//   // Show loading spinner if still loading
//   if (isLoading) {
//     return (
//       <ThemeView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
          
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
//         {/* Header */}
//         <View style={styles.header}>
//           <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
          
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
//           {/* Gym Info Section */}
//           <View style={styles.section}>
//             {/* Logo and Name Row */}
//             <View style={styles.gymHeaderRow}>
//               <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="business" size={24} color={theme.colors.primary} />
//               </View>
//               <View style={styles.gymHeaderText}>
//                 <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
//                   {currentGym.name}
//                 </ThemeText>
//                 <ThemeText variant="body" style={styles.subtitle}>
//                   Owner: {ownerName}
//                 </ThemeText>
//               </View>
//             </View>

//             {/* Tags Row */}
//             <View style={styles.tagsContainer}>
//               {/* Open/Closed Tag */}
//               <View style={[
//                 styles.tagBadge,
//                 { backgroundColor: gymOpen ? `${theme.colors.primary}15` : `${theme.colors.primary}15` }
//               ]}>
//                 <Ionicons 
//                   name={gymOpen ? "checkmark-circle" : "close-circle"} 
//                   size={12} 
//                   color={gymOpen ? theme.colors.primary : theme.colors.primary}
//                   style={styles.tagIcon}
//                 />
//                 <ThemeText style={[
//                   styles.tagText,
//                   { color: gymOpen ? theme.colors.primary : theme.colors.primary }
//                 ]}>
//                   {gymOpen ? 'OPEN' : 'CLOSED'}
//                 </ThemeText>
//               </View>
              
//               {/* Gym Tag */}
//               <View style={[styles.tagBadge, { backgroundColor: `${theme.colors.secondary}15` }]}>
//                 <Ionicons 
//                   name="barbell" 
//                   size={12} 
//                   color={theme.colors.secondary}
//                   style={styles.tagIcon}
//                 />
//                 <ThemeText style={[styles.tagText, { color: theme.colors.secondary }]}>
//                   GYM
//                 </ThemeText>
//               </View>
//             </View>

//             {/* Crowd Meter */}
//             <View style={styles.crowdMeterContainer}>
//               <View style={styles.crowdMeterHeader}>
//                 <View style={styles.crowdMeterLabelContainer}>
//                   <Ionicons name="people" size={18} color={theme.colors.text.primary} style={styles.crowdIcon} />
//                   <ThemeText style={styles.crowdMeterLabel}>Current Crowd Level</ThemeText>
//                 </View>
//                 <ThemeText style={[styles.crowdLevelText, { color: crowdLevel.color }]}>
//                   {crowdLevel.level}
//                 </ThemeText>
//               </View>
              
//               {/* Crowd Meter Bar */}
//               <View style={styles.crowdMeterBar}>
//                 <View 
//                   style={[
//                     styles.crowdMeterFill,
//                     { 
//                       width: `${crowdLevel.percent}%`,
//                       backgroundColor: crowdLevel.color
//                     }
//                   ]} 
//                 />
//                 <View style={styles.crowdMeterLabels}>
//                   <ThemeText style={styles.crowdMeterLabelText}>Low</ThemeText>
//                   <ThemeText style={styles.crowdMeterLabelText}>Medium</ThemeText>
//                   <ThemeText style={styles.crowdMeterLabelText}>High</ThemeText>
//                 </View>
//               </View>
              
//               <ThemeText style={styles.crowdMeterSubtitle}>
//                 {dashboardStats?.activeMembers || '0'} active members in gym right now
//               </ThemeText>
//             </View>
//           </View>

//           {/* Gym Status Card - Matching MemberDetailModal card style */}
//           <TouchableOpacity
//             style={styles.infoCard}
//             activeOpacity={0.7}
//             onPress={() => setShowGymProfileModal(true)}
//           >
//             <View style={styles.infoCardHeader}>
//               <View style={styles.infoCardTitleContainer}>
//                 <Ionicons name="business-outline" size={22} color={theme.colors.text.primary} style={styles.cardIcon} />
//                 <ThemeText style={styles.infoCardTitle}>Gym Status</ThemeText>
//               </View>
//               <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
//             </View>
            
//             <View style={styles.infoCardBody}>
//               {/* Active in Gym Row */}
//               <View style={styles.infoRow}>
//                 <View style={styles.infoLabelContainer}>
//                   <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.rowIcon} />
//                   <ThemeText style={styles.infoLabel}>Active in Gym</ThemeText>
//                 </View>
//                 <ThemeText style={[styles.infoValue, { color: theme.colors.primary }]}>
//                   {dashboardStats?.activeMembers || '0'}
//                 </ThemeText>
//               </View>

//               {/* Divider */}
//               <View style={styles.infoDivider} />

//               {/* Today's Hours Row */}
//               <View style={styles.infoRow}>
//                 <View style={styles.infoLabelContainer}>
//                   <Ionicons name="time-outline" size={18} color={theme.colors.text.secondary} style={styles.rowIcon} />
//                   <ThemeText style={styles.infoLabel}>Today's Hours</ThemeText>
//                 </View>
//                 <ThemeText style={styles.infoValue}>
//                   {todaysHours}
//                 </ThemeText>
//               </View>

//               {/* Divider */}
//               <View style={styles.infoDivider} />

//               {/* Contact Row */}
//               <View style={styles.infoRow}>
//                 <View style={styles.infoLabelContainer}>
//                   <Ionicons name="call-outline" size={18} color={theme.colors.text.secondary} style={styles.rowIcon} />
//                   <ThemeText style={styles.infoLabel}>Contact</ThemeText>
//                 </View>
//                 <View style={styles.infoValueContainer}>
//                   <ThemeText style={styles.infoValue}>
//                     {currentGym.contactPhone}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>

//           {/* Invitation Card - Only show for owners and staff - Matching MemberDetailModal card style */}
//           {(currentGymRole === 'owner' || currentGymRole === 'staff') && (
//             <TouchableOpacity
//               style={styles.infoCard}
//               onPress={() => setShowInvitationModal(true)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.infoCardHeader}>
//                 <View style={styles.infoCardTitleContainer}>
//                   <Ionicons name="person-add-outline" size={22} color={theme.colors.text.primary} style={styles.cardIcon} />
//                   <ThemeText style={styles.infoCardTitle}>Invite Users</ThemeText>
//                 </View>
//                 <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
//               </View>
              
//               <View style={styles.infoCardBody}>
//                 {/* Invitation Stats Row */}
//                 <View style={styles.infoRow}>
//                   <View style={styles.infoLabelContainer}>
//                     <Ionicons name="people-outline" size={18} color={theme.colors.text.secondary} style={styles.rowIcon} />
//                     <ThemeText style={styles.infoLabel}>Invite Users</ThemeText>
//                   </View>
//                   <ThemeText style={[styles.infoValue, { color: theme.colors.accent }]}>
//                     {currentGymRole === 'owner' ? 'All Roles' : 'Members Only'}
//                   </ThemeText>
//                 </View>

//                 {/* Divider */}
//                 <View style={styles.infoDivider} />

//                 {/* Available Roles Row */}
//                 <View style={styles.infoRow}>
//                   <View style={styles.infoLabelContainer}>
//                     <Ionicons name="shield-outline" size={18} color={theme.colors.text.secondary} style={styles.rowIcon} />
//                     <ThemeText style={styles.infoLabel}>Available Roles</ThemeText>
//                   </View>
//                   <View style={styles.infoValueContainer}>
//                     <ThemeText style={styles.infoValue}>
//                       {currentGymRole === 'owner' 
//                         ? 'Owners, Staff, Trainers & Members' 
//                         : 'Members only'}
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
//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={() => setShowTeamManagementModal(true)}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="person-add" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Staff
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Manage owners, staff & trainers
//                 </ThemeText>
//               </TouchableOpacity>

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
//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={handleNavigateToMembers}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="people" size={24} color={theme.colors.primary} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Manage Members
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Add members, track attendance
//                 </ThemeText>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.featureCard}
//                 onPress={handleNavigateToPayments}
//               >
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
//                   <Ionicons name="cash" size={24} color={theme.colors.accent} />
//                 </View>
//                 <ThemeText variant="h3" style={styles.featureTitle}>
//                   Handle Payments
//                 </ThemeText>
//                 <ThemeText style={styles.featureDescription}>
//                   Record payments, track revenue
//                 </ThemeText>
//               </TouchableOpacity>
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

//       {/* MODAL 4: Team Management */}
//       <TeamManagementModal
//         visible={showTeamManagementModal}
//         onClose={() => setShowTeamManagementModal(false)}
//       />
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

  // Get crowd level based on active members
  const getCrowdLevel = () => {
    const activeMembers = dashboardStats?.activeMembers || 1; // Default to 1 active member
    if (activeMembers < 10) return { level: 'Low', percent: 33, color: theme.colors.primary };
    if (activeMembers >= 10 && activeMembers < 25) return { level: 'Medium', percent: 66, color: theme.colors.warning };
    return { level: 'High', percent: 100, color: theme.colors.primary };
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
          <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
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
            <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
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
  const crowdLevel = getCrowdLevel();
  
  // Get owner name
  const ownerName = user?.displayName || 'Owner';
  
  // Show loading spinner if still loading
  if (isLoading) {
    return (
      <ThemeView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
          
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
        {/* Header */}
        <View style={styles.header}>
          <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
          
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
          {/* Gym Info Section */}
          <View style={styles.section}>
            {/* Logo and Name Row */}
            <View style={styles.gymHeaderRow}>
              <View style={[styles.gymLogo, { backgroundColor: `${theme.colors.primary}15` }]}>
                <Ionicons name="business" size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.gymHeaderText}>
                <ThemeText variant="h1" style={[styles.title, { color: theme.colors.primary }]}>
                  {currentGym.name}
                </ThemeText>
                <ThemeText variant="body" style={styles.subtitle}>
                  Owner: {ownerName}
                </ThemeText>
              </View>
            </View>

            {/* Tags Row */}
            <View style={styles.tagsContainer}>
              {/* Open/Closed Tag */}
              <View style={[
                styles.tagBadge,
                { backgroundColor: gymOpen ? `${theme.colors.primary}15` : `${theme.colors.primary}15` }
              ]}>
                <Ionicons 
                  name={gymOpen ? "checkmark-circle" : "close-circle"} 
                  size={12} 
                  color={gymOpen ? theme.colors.primary : theme.colors.primary}
                  style={styles.tagIcon}
                />
                <ThemeText style={[
                  styles.tagText,
                  { color: gymOpen ? theme.colors.primary : theme.colors.primary }
                ]}>
                  {gymOpen ? 'OPEN' : 'CLOSED'}
                </ThemeText>
              </View>
              
              {/* Gym Tag */}
              <View style={[styles.tagBadge, { backgroundColor: `${theme.colors.secondary}15` }]}>
                <Ionicons 
                  name="barbell" 
                  size={12} 
                  color={theme.colors.secondary}
                  style={styles.tagIcon}
                />
                <ThemeText style={[styles.tagText, { color: theme.colors.secondary }]}>
                  GYM
                </ThemeText>
              </View>
            </View>

            {/* Spacing between tags and crowd meter */}
            <View style={styles.spacingBetweenTagsAndCrowd} />

            {/* Crowd Meter */}
            <View style={styles.crowdMeterContainer}>
              <View style={styles.crowdMeterHeader}>
                <View style={styles.crowdMeterLabelContainer}>
                  <Ionicons name="people" size={18} color={theme.colors.text.primary} style={styles.crowdIcon} />
                  <ThemeText style={styles.crowdMeterLabel}>Current Crowd Level</ThemeText>
                </View>
                <ThemeText style={[styles.crowdLevelText, { color: crowdLevel.color }]}>
                  {crowdLevel.level}
                </ThemeText>
              </View>
              
              {/* Active members count moved to left */}
              <View style={styles.activeMembersContainer}>
                <ThemeText style={styles.activeMembersText}>
                  {dashboardStats?.activeMembers || '1'} active member in gym right now
                </ThemeText>
              </View>
              
              {/* Crowd Meter Bar */}
              <View style={styles.crowdMeterBar}>
                <View 
                  style={[
                    styles.crowdMeterFill,
                    { 
                      width: `${crowdLevel.percent}%`,
                      backgroundColor: crowdLevel.color
                    }
                  ]} 
                />
                <View style={styles.crowdMeterLabels}>
                  <ThemeText style={styles.crowdMeterLabelText}>Low</ThemeText>
                  <ThemeText style={styles.crowdMeterLabelText}>Medium</ThemeText>
                  <ThemeText style={styles.crowdMeterLabelText}>High</ThemeText>
                </View>
              </View>
            </View>
          </View>

          {/* Gym Status Card - Original style restored */}
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
                  {dashboardStats?.activeMembers || '1'}
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
                </View>
              </View>
            </View>
          </View>

          {/* Invitation Card - Only show for owners and staff - Original style restored */}
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
                <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
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