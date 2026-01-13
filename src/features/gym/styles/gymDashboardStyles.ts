// // src/features/gym/styles/gymDashboardStyles.ts
// import { StyleSheet } from 'react-native';

// export const createGymDashboardStyles = (theme: any) => 
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // 🚀 Twitter-style Header (56px, matches exercise modal)
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingHorizontal: 16,
//       height: 56,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//       backgroundColor: theme.colors.background,
//     },
    
//     headerTitleContainer: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
    
//     headerTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       color: theme.colors.text.primary,
//     },
    
//     // Welcome Header (below Twitter header)
//     welcomeHeader: {
//       paddingHorizontal: theme.spacing.lg,
//       paddingTop: theme.spacing.xl,
//       paddingBottom: theme.spacing.lg,
//       backgroundColor: theme.colors.card,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//     },
    
//     welcomeTopRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: theme.spacing.md,
//     },
    
//     welcomeIconContainer: {
//       width: 48,
//       height: 48,
//       borderRadius: theme.borderRadius.md,
//       backgroundColor: `${theme.colors.primary}15`,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     welcomeTextContainer: {
//       flex: 1,
//     },
    
//     welcomeTitle: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       marginBottom: 4,
//     },
    
//     welcomeSubtitle: {
//       fontSize: 16,
//       textAlign: 'center',
//       lineHeight: 22,
//       color: theme.colors.text.secondary,
//     },
    
//     welcomeDescription: {
//       fontSize: 15,
//       lineHeight: 22,
//       color: theme.colors.text.secondary,
//     },
    
//     // Scroll View
//     scrollView: {
//       flex: 1,
//       padding: theme.spacing.md,
//     },
    
//     // Setup Card
//     setupCard: {
//       padding: theme.spacing.lg,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.lg,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//       backgroundColor: theme.colors.card,
//       borderLeftWidth: 4,
//       borderLeftColor: theme.colors.primary,
//     },
    
//     setupCardHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     setupIconContainer: {
//       width: 44,
//       height: 44,
//       borderRadius: theme.borderRadius.md,
//       backgroundColor: `${theme.colors.primary}15`,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     setupTextContainer: {
//       flex: 1,
//     },
    
//     setupCardTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       flex: 1,
//     },
    
//     setupCardSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//     },
    
//     setupCardBody: {
//       marginTop: theme.spacing.sm,
//     },
    
//     setupCardDescription: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       marginBottom: theme.spacing.lg,
//       lineHeight: 20,
//     },
    
//     setupSteps: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
    
//     setupStep: {
//       alignItems: 'center',
//       flex: 1,
//     },
    
//     setupStepNumber: {
//       width: 32,
//       height: 32,
//       borderRadius: 16,
//       backgroundColor: `${theme.colors.primary}20`,
//       color: theme.colors.primary,
//       fontSize: 16,
//       fontWeight: '700',
//       textAlign: 'center',
//       lineHeight: 32,
//       marginBottom: 8,
//     },
    
//     setupStepText: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//     },
    
//     // Sections
//     section: {
//       marginBottom: theme.spacing.xl,
//     },
    
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: theme.spacing.md,
//       color: theme.colors.text.primary,
//     },
    
//     sectionSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//       lineHeight: 20,
//       marginBottom: theme.spacing.lg,
//     },
    
//     // Features Grid
//     featuresGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//     },
    
//     featureCard: {
//       width: '48%',
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.md,
//       backgroundColor: theme.colors.card,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 2,
//     },
    
//     featureIconContainer: {
//       width: 40,
//       height: 40,
//       borderRadius: theme.borderRadius.md,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     featureTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     featureDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     // Tips Grid
//     tipsGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//     },
    
//     tipCard: {
//       width: '100%',
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.md,
//       backgroundColor: theme.colors.card,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.1,
//       shadowRadius: 3,
//       elevation: 2,
//     },
    
//     tipNumber: {
//       fontSize: 24,
//       marginBottom: theme.spacing.sm,
//     },
    
//     tipTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     tipDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     // Business Dashboard Header
//     gymName: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       marginBottom: 4,
//     },
    
//     gymSubtitle: {
//       fontSize: 16,
//       textAlign: 'center',
//       lineHeight: 22,
//       color: theme.colors.text.secondary,
//     },
    
//     bottomSpacer: {
//       height: 100,
//     },
//   });




// // src/features/gym/styles/gymDashboardStyles.ts
// import { StyleSheet } from 'react-native';

// export const createGymDashboardStyles = (theme: any) => 
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // Twitter-style Header (matches ProjectHomeScreen)
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingHorizontal: 16,
//       height: 42,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//       backgroundColor: theme.colors.background,
//     },
    
//     headerTitleContainer: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
    
//     headerTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       color: theme.colors.text.primary,
//     },
    
//     // Scroll View
//     scrollView: {
//       flex: 1,
//       padding: theme.spacing.md,
//     },
    
//     // Welcome Section - Matches ProjectHomeScreen
//     section: {
//       alignItems: 'center',
//       marginBottom: theme.spacing.xl,
//       paddingTop: theme.spacing.md,
//     },
    
//     title: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       marginBottom: theme.spacing.sm,
//       textAlign: 'center',
//     },
    
//     subtitle: {
//       fontSize: 16,
//       textAlign: 'center',
//       lineHeight: 22,
//       color: theme.colors.text.secondary,
//     },
    
//     // Setup Card
//     setupCard: {
//       padding: theme.spacing.lg,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.lg,
//       backgroundColor: theme.colors.card,
//       borderLeftWidth: 4,
//       borderLeftColor: theme.colors.primary,
//     },
    
//     setupCardHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     setupIconContainer: {
//       width: 44,
//       height: 44,
//       borderRadius: theme.borderRadius.md,
//       backgroundColor: `${theme.colors.primary}15`,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     setupTextContainer: {
//       flex: 1,
//     },
    
//     setupCardTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       flex: 1,
//     },
    
//     setupCardSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//     },
    
//     setupCardBody: {
//       marginTop: theme.spacing.sm,
//     },
    
//     setupCardDescription: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       marginBottom: theme.spacing.lg,
//       lineHeight: 20,
//     },
    
//     setupSteps: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
    
//     setupStep: {
//       alignItems: 'center',
//       flex: 1,
//     },
    
//     setupStepNumber: {
//       width: 32,
//       height: 32,
//       borderRadius: 16,
//       backgroundColor: `${theme.colors.primary}20`,
//       color: theme.colors.primary,
//       fontSize: 16,
//       fontWeight: '700',
//       textAlign: 'center',
//       lineHeight: 32,
//       marginBottom: 8,
//     },
    
//     setupStepText: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//     },
    
//     // Business Dashboard Stats Grid
//     statsGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//       marginBottom: theme.spacing.lg,
//     },
    
//     statCard: {
//       width: '48%',
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.md,
//       alignItems: 'center',
//     },
    
//     statValue: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 4,
//     },
    
//     statLabel: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//     },
    
//     // Quick Actions Grid
//     actionsGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//     },
    
//     actionCard: {
//       width: '48%',
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.md,
//       backgroundColor: theme.colors.card,
//       borderLeftWidth: 4,
//     },
    
//     actionIconContainer: {
//       width: 40,
//       height: 40,
//       borderRadius: theme.borderRadius.md,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     actionTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     actionDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     // Features Grid
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: theme.spacing.md,
//       color: theme.colors.text.primary,
//     },
    
//     sectionSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//       lineHeight: 20,
//       marginBottom: theme.spacing.lg,
//     },
    
//     featuresGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//     },
    
//     featureCard: {
//       width: '48%',
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.md,
//       backgroundColor: theme.colors.card,
//     },
    
//     featureIconContainer: {
//       width: 40,
//       height: 40,
//       borderRadius: theme.borderRadius.md,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     featureTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     featureDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     bottomSpacer: {
//       height: 100,
//     },
//   });


// import { StyleSheet } from 'react-native';

// export const createGymDashboardStyles = (theme: any) => 
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // Scroll View
//     scrollView: {
//       flex: 1,
//       padding: theme.spacing.md,
//     },
    
//     // Section (Used for both Welcome and Gym Info)
//     section: {
//       marginBottom: theme.spacing.xl,
//     },
    
//     title: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       marginBottom: theme.spacing.xs, // Reduced from sm
//       color: theme.colors.text.primary,
//     },
    
//     subtitle: {
//       fontSize: 16,
//       lineHeight: 22,
//       color: theme.colors.text.secondary,
//     },
    
//     // Gym Logo Container
//     gymLogoContainer: {
//       alignItems: 'flex-start',
//       marginBottom: theme.spacing.md,
//     },
    
//     gymLogo: {
//       width: 60,
//       height: 60,
//       borderRadius: theme.borderRadius.lg,
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 2,
//       borderColor: `${theme.colors.primary}30`,
//     },
    
//     // Setup Card (for setup screen)
//     setupCard: {
//       padding: theme.spacing.lg,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.lg,
//       backgroundColor: theme.colors.card,
//       borderLeftWidth: 4,
//       borderLeftColor: theme.colors.primary,
//     },
    
//     setupCardHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     setupIconContainer: {
//       width: 44,
//       height: 44,
//       borderRadius: theme.borderRadius.md,
//       backgroundColor: `${theme.colors.primary}15`,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     setupTextContainer: {
//       flex: 1,
//     },
    
//     setupCardTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       flex: 1,
//     },
    
//     setupCardSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//     },
    
//     setupCardBody: {
//       marginTop: theme.spacing.sm,
//     },
    
//     setupCardDescription: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       marginBottom: theme.spacing.lg,
//       lineHeight: 20,
//     },
    
//     setupSteps: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
    
//     setupStep: {
//       alignItems: 'center',
//       flex: 1,
//     },
    
//     setupStepNumber: {
//       width: 32,
//       height: 32,
//       borderRadius: 16,
//       backgroundColor: `${theme.colors.primary}20`,
//       color: theme.colors.primary,
//       fontSize: 16,
//       fontWeight: '700',
//       textAlign: 'center',
//       lineHeight: 32,
//       marginBottom: 8,
//     },
    
//     setupStepText: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//     },
    
//     // Status Card (for gym setup)
//     statusCard: {
//       padding: theme.spacing.lg,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.lg,
//       backgroundColor: theme.colors.card,
//       borderLeftWidth: 4,
//       borderLeftColor: theme.colors.primary,
//     },
    
//     statusCardHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: theme.spacing.md,
//     },
    
//     statusIconContainer: {
//       width: 44,
//       height: 44,
//       borderRadius: theme.borderRadius.md,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     statusTextContainer: {
//       flex: 1,
//     },
    
//     statusCardTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//     },
    
//     statusCardSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//     },
    
//     statusCardBody: {
//       // Body content styles
//     },
    
//     statusRow: {
//       marginVertical: theme.spacing.sm,
//     },
    
//     statusItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
    
//     statusItemContent: {
//       marginLeft: theme.spacing.md,
//       flex: 1,
//     },
    
//     statusItemLabel: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       textTransform: 'uppercase',
//       letterSpacing: 0.5,
//       marginBottom: 2,
//     },
    
//     statusItemValue: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//     },
    
//     statusDivider: {
//       height: 1,
//       backgroundColor: theme.colors.border,
//       marginVertical: theme.spacing.md,
//     },
    
//     // Section Titles
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 4, // Reduced from md
//       color: theme.colors.text.primary,
//     },
    
//     sectionSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       marginBottom: theme.spacing.lg,
//     },
    
//     // Features Grid (Used for both setup and gym dashboard)
//     featuresGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//     },
    
//     featureCard: {
//       width: '48%',
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.md,
//       backgroundColor: theme.colors.card,
//     },
    
//     featureIconContainer: {
//       width: 40,
//       height: 40,
//       borderRadius: theme.borderRadius.md,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: theme.spacing.sm,
//     },
    
//     featureTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     featureDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     bottomSpacer: {
//       height: 100,
//     },
//   });

import { StyleSheet } from 'react-native';

export const createGymDashboardStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 42,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    
    headerTitleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.text.primary,
    },
    
    // Scroll View
    scrollView: {
      flex: 1,
      padding: theme.spacing.md,
    },
    
    // Section
    section: {
      marginBottom: theme.spacing.xl,
    },
    
    centeredSection: {
      alignItems: 'center',
    },
    
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme.colors.text.primary,
    },
    
    subtitle: {
      fontSize: 16,
      lineHeight: 22,
      color: theme.colors.text.secondary,
    },
    
    // Gym Header Row (with biceps icon)
    gymHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    
    gymLogo: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    
    gymHeaderText: {
      flex: 1,
    },
    
    // Setup Card
    setupCard: {
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    
    setupCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    
    setupIconContainer: {
      width: 44,
      height: 44,
      borderRadius: theme.borderRadius.md,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    
    setupTextContainer: {
      flex: 1,
    },
    
    setupCardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
    },
    
    setupCardSubtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    
    setupCardBody: {
      marginTop: theme.spacing.sm,
    },
    
    setupCardDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
      lineHeight: 20,
    },
    
    setupSteps: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    
    setupStep: {
      alignItems: 'center',
      flex: 1,
    },
    
    setupStepNumber: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: `${theme.colors.primary}20`,
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
      lineHeight: 32,
      marginBottom: 8,
    },
    
    setupStepText: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    
    // Status Card (matching ProfileScreen style)
    statusCard: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    
    statusCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    
    statusIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    
    statusTextContainer: {
      flex: 1,
    },
    
    statusCardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    
    statusCardBody: {
      // Body content
    },
    
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    
    statusLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    
    statusIcon: {
      marginRight: 10,
    },
    
    statusLabel: {
      fontSize: 15,
      color: theme.colors.text.primary,
    },
    
    statusValue: {
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'right',
    },
    
    statusValueContainer: {
      alignItems: 'flex-end',
    },
    
    statusSubValue: {
      fontSize: 13,
      color: theme.colors.text.secondary,
      marginTop: 2,
    },
    
    statusDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
    
    // Section Titles
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme.colors.text.primary,
    },
    
    sectionSubtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
    },
    
    // Features Grid
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    
    featureCard: {
      width: '48%',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.card,
    },
    
    featureIconContainer: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
    },
    
    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: theme.colors.text.primary,
    },
    
    featureDescription: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      lineHeight: 16,
    },
    
    bottomSpacer: {
      height: 100,
    },
  });