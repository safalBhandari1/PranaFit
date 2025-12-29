
// // src/features/gym/components/GymDashboardScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   RefreshControl,
//   Platform,
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
//           {/* Twitter-style top spacing */}
//           <View style={{ height: Platform.OS === 'ios' ? 20 : 0 }} />
          
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
//         {/* 🚀 Twitter-style Welcome Header */}
//         <View style={styles.welcomeHeader}>
//           {/* iOS Safe Area Spacing */}
//           <View style={{ height: Platform.OS === 'ios' ? 20 : 0 }} />
          
//           <View style={styles.welcomeTopRow}>
//             <View style={styles.welcomeIconContainer}>
//               <Ionicons name="fitness" size={32} color={theme.colors.primary} />
//             </View>
//             <View style={styles.welcomeTextContainer}>
//               <ThemeText variant="h1" style={styles.welcomeTitle}>
//                 Welcome to PranaFit!
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
//                   <ThemeText style={styles.setupStepText}>Basic gym info</ThemeText>
//                 </View>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>2</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Location & hours</ThemeText>
//                 </View>
//                 <View style={styles.setupStep}>
//                   <ThemeText style={styles.setupStepNumber}>3</ThemeText>
//                   <ThemeText style={styles.setupStepText}>Membership packages</ThemeText>
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
//                 <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
//                   <Ionicons name="cash" size={24} color={theme.colors.primary} />
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

// src/features/gym/components/GymDashboardScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
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
  const { currentGym, isLoading, loadDashboardData } = useGymStore();
  const { user } = useAppStore();
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const styles = createGymDashboardStyles(theme);
  
  // Extract username from email
  const username = user?.email ? user.email.split('@')[0] : 'there';

  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.gymId) {
      await loadDashboardData(user.gymId);
    }
    setRefreshing(false);
  };

  // If gym is already set up, show business dashboard
  if (currentGym) {
    return (
      <ThemeView style={styles.container}>
        {/* Gym Business Dashboard will go here */}
        <View style={styles.header}>
          <ThemeText variant="h1" style={styles.gymName}>
            {currentGym.name}
          </ThemeText>
          <ThemeText style={styles.gymSubtitle}>
            Welcome back! Ready to manage your gym today?
          </ThemeText>
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
          <ThemeText style={{ padding: 20, color: theme.colors.text.secondary }}>
            Your business dashboard will appear here once we implement it.
          </ThemeText>
        </ScrollView>
      </ThemeView>
    );
  }

  // Show Welcome & Setup Dashboard for new gym owners
  return (
    <>
      <ThemeView style={styles.container}>
        {/* 🚀 Twitter-style Header (PranaFit only) */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ThemeText style={styles.headerTitle}>PranaFit</ThemeText>
          </View>
        </View>

        {/* Welcome Content Below Header */}
        <View style={styles.welcomeHeader}>
          <View style={styles.welcomeTopRow}>
            <View style={styles.welcomeIconContainer}>
              <Ionicons name="fitness" size={32} color={theme.colors.primary} />
            </View>
            <View style={styles.welcomeTextContainer}>
              {/* 🚀 UPDATED: Show username from email */}
              <ThemeText variant="h1" style={styles.welcomeTitle}>
                Welcome {username}!
              </ThemeText>
              <ThemeText style={styles.welcomeSubtitle}>
                Get your gym business running in minutes
              </ThemeText>
            </View>
          </View>
          
          <ThemeText style={styles.welcomeDescription}>
            PranaFit helps you manage everything from member check-ins to payments, 
            staff management, and business analytics—all in one place.
          </ThemeText>
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
                  {/* 🚀 UPDATED: Removed "packages" from step text */}
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

          {/* Features Grid - What Owners Can Do */}
          <View style={styles.section}>
            <ThemeText variant="h2" style={styles.sectionTitle}>
              What you can do on PranaFit
            </ThemeText>
            <ThemeText style={styles.sectionSubtitle}>
              Everything you need to run a successful gym business
            </ThemeText>
            
            <View style={styles.featuresGrid}>
              {/* Feature 1 */}
              <View style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <Ionicons name="people" size={24} color={theme.colors.primary} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Manage Members
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Add members, track payments, view attendance, and manage memberships
                </ThemeText>
              </View>

              {/* Feature 2 */}
              <View style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                  <Ionicons name="cash" size={24} color={theme.colors.accent} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Handle Payments
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Record payments, track revenue, send payment reminders, and generate invoices
                </ThemeText>
              </View>

              {/* Feature 3 */}
              <View style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.accent}15` }]}>
                  <Ionicons name="person-add" size={24} color={theme.colors.accent} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Manage Staff
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Add trainers and staff, assign permissions, and manage schedules
                </ThemeText>
              </View>

              {/* Feature 4 */}
              <View style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.warning}15` }]}>
                  <Ionicons name="trending-up" size={24} color={theme.colors.warning} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Track Growth
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Monitor member growth, revenue trends, and gym performance analytics
                </ThemeText>
              </View>

              {/* Feature 5 */}
              <View style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <Ionicons name="calendar" size={24} color={theme.colors.primary} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Class Scheduling
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Create class schedules, track attendance, and manage trainer bookings
                </ThemeText>
              </View>

              {/* Feature 6 */}
              <View style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${theme.colors.secondary}15` }]}>
                  <Ionicons name="bar-chart" size={24} color={theme.colors.secondary} />
                </View>
                <ThemeText variant="h3" style={styles.featureTitle}>
                  Business Insights
                </ThemeText>
                <ThemeText style={styles.featureDescription}>
                  Get detailed reports on revenue, member retention, and peak hours
                </ThemeText>
              </View>
            </View>
          </View>

          {/* Quick Start Tips */}
          <View style={styles.section}>
            <ThemeText variant="h2" style={styles.sectionTitle}>
              Quick Start Tips
            </ThemeText>
            
            <View style={styles.tipsGrid}>
              <View style={styles.tipCard}>
                <ThemeText style={styles.tipNumber}>📋</ThemeText>
                <ThemeText variant="h3" style={styles.tipTitle}>
                  Plan Your Packages
                </ThemeText>
                <ThemeText style={styles.tipDescription}>
                  Think about your monthly, quarterly, and annual membership options before setting up
                </ThemeText>
              </View>
              
              <View style={styles.tipCard}>
                <ThemeText style={styles.tipNumber}>👥</ThemeText>
                <ThemeText variant="h3" style={styles.tipTitle}>
                  Invite Your Team
                </ThemeText>
                <ThemeText style={styles.tipDescription}>
                  Add your trainers and staff early so they can start using the app
                </ThemeText>
              </View>
              
              <View style={styles.tipCard}>
                <ThemeText style={styles.tipNumber}>🚀</ThemeText>
                <ThemeText variant="h3" style={styles.tipTitle}>
                  Start Simple
                </ThemeText>
                <ThemeText style={styles.tipDescription}>
                  You can always add more details later. Just get the basics set up first
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
            // The GymDashboardScreen will automatically refresh and show the business dashboard
          }}
          onCancel={() => setShowSetupModal(false)}
        />
      </Modal>
    </>
  );
};

export default GymDashboardScreen;