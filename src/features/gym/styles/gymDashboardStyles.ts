
// import { StyleSheet } from 'react-native';

// export const createGymDashboardStyles = (theme: any) => 
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // Header
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
    
//     // Section
//     section: {
//       marginBottom: theme.spacing.xl,
//     },
    
//     centeredSection: {
//       alignItems: 'center',
//     },
    
//     title: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     subtitle: {
//       fontSize: 16,
//       lineHeight: 22,
//       color: theme.colors.text.secondary,
//     },
    
//     // Gym Header Row (with biceps icon)
//     gymHeaderRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: theme.spacing.md,
//     },
    
//     gymLogo: {
//       width: 48,
//       height: 48,
//       borderRadius: 12,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     gymHeaderText: {
//       flex: 1,
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
    
//     // Status Card (matching ProfileScreen style)
//     statusCard: {
//       padding: theme.spacing.md,
//       borderRadius: theme.borderRadius.md,
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
//       width: 36,
//       height: 36,
//       borderRadius: 8,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     statusTextContainer: {
//       flex: 1,
//     },
    
//     statusCardTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//     },
    
//     statusCardBody: {
//       // Body content
//     },
    
//     statusRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingVertical: 12,
//     },
    
//     statusLabelContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       flex: 1,
//     },
    
//     statusIcon: {
//       marginRight: 10,
//     },
    
//     statusLabel: {
//       fontSize: 15,
//       color: theme.colors.text.primary,
//     },
    
//     statusValue: {
//       fontSize: 15,
//       fontWeight: '500',
//       textAlign: 'right',
//     },
    
//     statusValueContainer: {
//       alignItems: 'flex-end',
//     },
    
//     statusSubValue: {
//       fontSize: 13,
//       color: theme.colors.text.secondary,
//       marginTop: 2,
//     },
    
//     statusDivider: {
//       height: 1,
//       backgroundColor: theme.colors.border,
//     },
    
//     // Section Titles
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     sectionSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
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
    
//     // Header
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//       backgroundColor: theme.colors.background,
//     },
    
//     headerTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//     },
    
//     // Scroll View
//     scrollView: {
//       flex: 1,
//       padding: theme.spacing.md,
//     },
    
//     // Section
//     section: {
//       marginBottom: theme.spacing.xl,
//     },
    
//     centeredSection: {
//       alignItems: 'center',
//     },
    
//     title: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     subtitle: {
//       fontSize: 14,
//       lineHeight: 18,
//       color: theme.colors.text.secondary,
//     },
    
//     // Gym Header Row (with business icon)
//     gymHeaderRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 12,
//     },
    
//     gymLogo: {
//       width: 48,
//       height: 48,
//       borderRadius: 12,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: theme.spacing.md,
//     },
    
//     gymHeaderText: {
//       flex: 1,
//     },
    
//     // Tags Container
//     tagsContainer: {
//       flexDirection: 'row',
//       gap: 8,
//       marginBottom: 16,
//     },
    
//     tagBadge: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingHorizontal: 12,
//       paddingVertical: 6,
//       borderRadius: 8,
//     },
    
//     tagIcon: {
//       marginRight: 4,
//     },
    
//     tagText: {
//       fontSize: 12,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//     },
    
//     // Crowd Meter
//     crowdMeterContainer: {
//       marginBottom: theme.spacing.lg,
//     },
    
//     crowdMeterHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 8,
//     },
    
//     crowdMeterLabelContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
    
//     crowdIcon: {
//       marginRight: 8,
//     },
    
//     crowdMeterLabel: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//     },
    
//     crowdLevelText: {
//       fontSize: 14,
//       fontWeight: '700',
//     },
    
//     crowdMeterBar: {
//       height: 24,
//       backgroundColor: `${theme.colors.border}50`,
//       borderRadius: 12,
//       marginBottom: 8,
//       overflow: 'hidden',
//     },
    
//     crowdMeterFill: {
//       height: '100%',
//       borderRadius: 12,
//     },
    
//     crowdMeterLabels: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingHorizontal: 4,
//       marginTop: 4,
//     },
    
//     crowdMeterLabelText: {
//       fontSize: 10,
//       color: theme.colors.text.secondary,
//     },
    
//     crowdMeterSubtitle: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//     },
    
//     // Info Card (Matching MemberDetailModal style)
//     infoCard: {
//       backgroundColor: theme.colors.card,
//       borderRadius: 12,
//       marginBottom: theme.spacing.lg,
//       overflow: 'hidden',
//     },
    
//     infoCardHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//     },
    
//     infoCardTitleContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
    
//     cardIcon: {
//       marginRight: 12,
//       width: 24,
//     },
    
//     infoCardTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//     },
    
//     infoCardBody: {
//       padding: 16,
//     },
    
//     infoRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingVertical: 12,
//     },
    
//     infoLabelContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       flex: 1,
//     },
    
//     rowIcon: {
//       marginRight: 10,
//       width: 24,
//     },
    
//     infoLabel: {
//       fontSize: 15,
//       color: theme.colors.text.primary,
//     },
    
//     infoValue: {
//       fontSize: 15,
//       fontWeight: '500',
//       textAlign: 'right',
//     },
    
//     infoValueContainer: {
//       alignItems: 'flex-end',
//     },
    
//     infoDivider: {
//       height: 1,
//       backgroundColor: theme.colors.border,
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
    
//     // Section Titles
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 4,
//       color: theme.colors.text.primary,
//     },
    
//     sectionSubtitle: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
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
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
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
      fontSize: 14,
      lineHeight: 18,
      color: theme.colors.text.secondary,
    },
    
    // Gym Header Row (with business icon)
    gymHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
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
    
    // Tags Container
    tagsContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    
    tagBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    
    tagIcon: {
      marginRight: 4,
    },
    
    tagText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    
    // Spacing between tags and crowd meter
    spacingBetweenTagsAndCrowd: {
      height: 32,
    },
    
    // Crowd Meter
    crowdMeterContainer: {
      marginBottom: theme.spacing.sm,
    },
    
    crowdMeterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    
    crowdMeterLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    crowdIcon: {
      marginRight: 8,
    },
    
    crowdMeterLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    
    crowdLevelText: {
      fontSize: 14,
      fontWeight: '700',
    },
    
    // Active members container
    activeMembersContainer: {
      marginBottom: 8,
    },
    
    activeMembersText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    
    crowdMeterBar: {
      height: 24,
      backgroundColor: `${theme.colors.border}50`,
      borderRadius: 12,
      marginBottom: 8,
      overflow: 'hidden',
    },
    
    crowdMeterFill: {
      height: '100%',
      borderRadius: 12,
    },
    
    crowdMeterLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      marginTop: 4,
    },
    
    crowdMeterLabelText: {
      fontSize: 10,
      color: theme.colors.text.secondary,
    },
    
    // Status Card (Original style)
    statusCard: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
      backgroundColor: theme.colors.card,
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
    
    statusDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
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