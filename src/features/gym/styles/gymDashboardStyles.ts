
// // src/features/gym/styles/gymDashboardStyles.ts (UPDATED)
// import { StyleSheet } from 'react-native';
// import { Platform } from 'react-native';

// export const createGymDashboardStyles = (theme: any) => 
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // 🚀 UPDATED: Twitter-style Header (ProjectHomeScreen Pattern)
//     welcomeHeader: {
//       paddingHorizontal: theme.spacing.md,
//       paddingTop: Platform.OS === 'ios' ? 60 : theme.spacing.xl,
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
    
//     // 🚀 UPDATED: Matches ProjectHomeScreen title style
//     welcomeTitle: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       marginBottom: 4,
//     },
    
//     // 🚀 UPDATED: Matches ProjectHomeScreen subtitle style
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
    
//     // 🚀 UPDATED: Scroll View - matches ProjectHomeScreen spacing
//     scrollView: {
//       flex: 1,
//       padding: theme.spacing.md, // Same as ProjectHomeScreen content
//     },
    
//     // 🚀 UPDATED: Setup Card - EXACT ProjectHomeScreen card style
//     setupCard: {
//       padding: theme.spacing.lg,
//       borderRadius: theme.borderRadius.lg,
//       marginBottom: theme.spacing.lg, // Same as projectCard margin
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
    
//     // 🚀 UPDATED: Matches projectName style
//     setupCardTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       flex: 1,
//     },
    
//     // 🚀 UPDATED: Matches projectMeta style
//     setupCardSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//     },
    
//     setupCardBody: {
//       marginTop: theme.spacing.sm,
//     },
    
//     // 🚀 UPDATED: Matches ProjectHomeScreen text styles
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
    
//     // 🚀 UPDATED: Sections - matches ProjectHomeScreen patterns
//     section: {
//       alignItems: 'center', // Matches ProjectHomeScreen section
//       marginBottom: theme.spacing.xl, // Matches ProjectHomeScreen section
//       paddingTop: theme.spacing.md, // Matches ProjectHomeScreen section
//     },
    
//     // 🚀 UPDATED: Exact same as ProjectHomeScreen sectionHeader
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
    
//     // 🚀 UPDATED: Features Grid - matches templateCard layout
//     featuresGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between', // Matches templatesGrid
//     },
    
//     // 🚀 UPDATED: Feature Card - matches templateCard exactly
//     featureCard: {
//       width: '48%', // Same as templateCard
//       padding: theme.spacing.md, // Same as templateCard
//       borderRadius: theme.borderRadius.lg, // Same as templateCard
//       marginBottom: theme.spacing.md, // Same as templateCard
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
    
//     // 🚀 UPDATED: Matches templateName style
//     featureTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     // 🚀 UPDATED: Matches templateDescription style
//     featureDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     // 🚀 UPDATED: Tips Grid - matches templateCard spacing
//     tipsGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between', // Matches templatesGrid
//     },
    
//     // 🚀 UPDATED: Tip Card - matches templateCard dimensions
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
    
//     // 🚀 UPDATED: Matches templateName style
//     tipTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     // 🚀 UPDATED: Matches templateDescription style
//     tipDescription: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       lineHeight: 16,
//     },
    
//     // Business Dashboard Styles (keep minimal changes)
//     header: {
//       paddingHorizontal: theme.spacing.md,
//       paddingTop: Platform.OS === 'ios' ? 60 : theme.spacing.xl,
//       paddingBottom: theme.spacing.lg,
//       backgroundColor: theme.colors.card,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//     },
    
//     // 🚀 UPDATED: Matches ProjectHomeScreen title style
//     gymName: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       marginBottom: 4,
//     },
    
//     // 🚀 UPDATED: Matches ProjectHomeScreen subtitle style
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


// src/features/gym/styles/gymDashboardStyles.ts
import { StyleSheet } from 'react-native';

export const createGymDashboardStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    // 🚀 Twitter-style Header (56px, matches exercise modal)
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 56,
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
    
    // Welcome Header (below Twitter header)
    welcomeHeader: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    welcomeTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    
    welcomeIconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    
    welcomeTextContainer: {
      flex: 1,
    },
    
    welcomeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    welcomeSubtitle: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
      color: theme.colors.text.secondary,
    },
    
    welcomeDescription: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.colors.text.secondary,
    },
    
    // Scroll View
    scrollView: {
      flex: 1,
      padding: theme.spacing.md,
    },
    
    // Setup Card
    setupCard: {
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      backgroundColor: theme.colors.card,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    
    setupCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      flex: 1,
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
    
    // Sections
    section: {
      marginBottom: theme.spacing.xl,
    },
    
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: theme.spacing.md,
      color: theme.colors.text.primary,
    },
    
    sectionSubtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
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
    
    // Tips Grid
    tipsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    
    tipCard: {
      width: '100%',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    
    tipNumber: {
      fontSize: 24,
      marginBottom: theme.spacing.sm,
    },
    
    tipTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: theme.colors.text.primary,
    },
    
    tipDescription: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      lineHeight: 16,
    },
    
    // Business Dashboard Header
    gymName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    gymSubtitle: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
      color: theme.colors.text.secondary,
    },
    
    bottomSpacer: {
      height: 100,
    },
  });