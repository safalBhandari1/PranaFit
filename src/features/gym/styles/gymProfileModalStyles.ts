// // src/features/gym/styles/gymProfileModalStyles.ts
// import { StyleSheet, Platform } from 'react-native';

// export const createGymProfileModalStyles = (theme: any) => 
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // 🚀 FIXED: Safe area for top (header) - ensures header is below status bar
//     safeArea: {
//       backgroundColor: theme.colors.background,
//       paddingTop: Platform.OS === 'ios' ? 0 : 0, // Adjust for Android if needed
//     },
    
//     // 🚀 Twitter-style Header (matching GymOnboardingScreen)
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
    
//     backButton: {
//       padding: 8,
//       marginLeft: -8,
//     },
    
//     backArrow: {
//       fontSize: 24,
//       fontWeight: '400',
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
    
//     headerSpacer: {
//       width: 40,
//     },
    
//     // Scroll View
//     scrollView: {
//       flex: 1,
//     },
    
//     scrollContent: {
//       paddingHorizontal: 16,
//       paddingBottom: 120, // Extra space for footer
//     },
    
    
//     // Loading State
//     loadingContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingVertical: 100,
//     },
    
//     loadingText: {
//       marginTop: 16,
//       fontSize: 16,
//       color: theme.colors.text.secondary,
//     },
    
//     // Logo & Name Section (Orange highlight)
//     logoNameSection: {
//       alignItems: 'center',
//       paddingVertical: 24,
//       marginBottom: 8,
//     },
    
//     logoContainer: {
//       marginBottom: 16,
//     },
    
//     logoCircle: {
//       width: 80,
//       height: 80,
//       borderRadius: 40,
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 3,
//       borderColor: `${theme.colors.primary}30`,
//     },
    
//     gymName: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       textAlign: 'center',
//       marginBottom: 12,
//     },
    
//     statusBadge: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       backgroundColor: theme.colors.card,
//       paddingHorizontal: 12,
//       paddingVertical: 6,
//       borderRadius: 20,
//       borderWidth: 1,
//       borderColor: theme.colors.border,
//     },
    
//     statusDot: {
//       width: 8,
//       height: 8,
//       borderRadius: 4,
//       marginRight: 6,
//     },
    
//     statusText: {
//       fontSize: 12,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//     },
    
//     // Sections
//     section: {
//       marginBottom: 24,
//     },
    
//     sectionTitle: {
//       fontSize: 18,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//       marginBottom: 12,
//       paddingHorizontal: 4,
//     },
    
//     // Card Styling (matching MemberDetailModal)
//     card: {
//       backgroundColor: theme.colors.card,
//       borderRadius: 12,
//       borderLeftWidth: 4,
//       borderLeftColor: theme.colors.primary,
//       overflow: 'hidden',
//     },
    
//     cardRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: 16,
//     },
    
//     rowLeft: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       flex: 1,
//     },
    
//     rowIcon: {
//       marginRight: 12,
//       width: 24,
//     },
    
//     rowLabel: {
//       fontSize: 16,
//       color: theme.colors.text.primary,
//       flex: 1,
//     },
    
//     rowRight: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
    
//     rowValue: {
//       fontSize: 16,
//       fontWeight: '500',
//       color: theme.colors.text.primary,
//       textAlign: 'right',
//     },
    
//     phoneActions: {
//       flexDirection: 'row',
//       marginLeft: 12,
//     },
    
//     phoneActionButton: {
//       padding: 4,
//       marginLeft: 8,
//     },
    
//     divider: {
//       height: 1,
//       backgroundColor: theme.colors.border,
//       marginHorizontal: 16,
//     },
    
//     // Address Text
//     addressText: {
//       fontSize: 16,
//       color: theme.colors.text.primary,
//       paddingHorizontal: 16,
//       paddingBottom: 12,
//     },
    
//     // Map Placeholder
//     mapPlaceholder: {
//       backgroundColor: `${theme.colors.border}20`,
//       borderRadius: 8,
//       padding: 40,
//       alignItems: 'center',
//       margin: 16,
//       marginTop: 8,
//     },
    
//     mapPlaceholderText: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       marginTop: 12,
//       textAlign: 'center',
//     },
    
//     // Business Hours
//     scheduleTitle: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//       padding: 16,
//       paddingBottom: 12,
//     },
    
//     scheduleRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//     },
    
//     scheduleDay: {
//       fontSize: 14,
//       color: theme.colors.text.primary,
//     },
    
//     scheduleHours: {
//       fontSize: 14,
//       fontWeight: '500',
//       color: theme.colors.text.primary,
//     },
    
//     // Packages
//     packageItem: {
//       padding: 16,
//     },
    
//     packageItemBorder: {
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//     },
    
//     packageHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 8,
//     },
    
//     packageName: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//       flex: 1,
//     },
    
//     packageStatus: {
//       paddingHorizontal: 8,
//       paddingVertical: 4,
//       borderRadius: 6,
//       marginLeft: 8,
//     },
    
//     packageStatusText: {
//       fontSize: 10,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//     },
    
//     packageDescription: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       marginBottom: 12,
//       lineHeight: 20,
//     },
    
//     packageDetails: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 16,
//     },
    
//     packageDetail: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 6,
//     },
    
//     packageDetailText: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//     },
    
//     emptyState: {
//       padding: 40,
//       alignItems: 'center',
//     },
    
//     emptyStateText: {
//       fontSize: 16,
//       color: theme.colors.text.secondary,
//       marginTop: 12,
//       textAlign: 'center',
//     },
    
//     // Statistics
//     statsGrid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       padding: 8,
//     },
    
//     statItem: {
//       width: '50%',
//       alignItems: 'center',
//       paddingVertical: 20,
//       paddingHorizontal: 8,
//     },
    
//     statValue: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       marginTop: 8,
//       marginBottom: 4,
//     },
    
//     statLabel: {
//       fontSize: 12,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//     },
    
//     // Footer
//     footerSafeArea: {
//       backgroundColor: theme.colors.background,
//     },
    
//     fixedFooter: {
//       padding: 8,
//       paddingTop: 12,
//       borderTopWidth: 1,
//       borderTopColor: theme.colors.border,
//       backgroundColor: theme.colors.background,
//     },
    
//     actionButtons: {
//       flexDirection: 'row',
//       gap: 12,
//     },
    
//     secondaryButton: {
//       flex: 1,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: theme.colors.card,
//       borderRadius: 12,
//       padding: 16,
//       borderWidth: 1,
//       borderColor: theme.colors.border,
//       gap: 8,
//     },
    
//     secondaryButtonText: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: theme.colors.primary,
//     },
    
//     primaryButton: {
//       flex: 2,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: theme.colors.primary,
//       borderRadius: 12,
//       padding: 16,
//       gap: 8,
//     },
    
//     primaryButtonText: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: '#FFFFFF',
//     },
    
//     bottomSpacer: {
//       height: 40,
//     },
//   });

// src/features/gym/styles/gymProfileModalStyles.ts
import { StyleSheet, Platform, StatusBar } from 'react-native';

export const createGymProfileModalStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
        paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      },
    
    // Safe area for top (header)
    safeArea: {
      backgroundColor: theme.colors.background,
    },
    
    // 🚀 Twitter-style Header (matching GymOnboardingScreen)
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
    
    backButton: {
      padding: 8,
      marginLeft: -8,
    },
    
    backArrow: {
      fontSize: 24,
      fontWeight: '400',
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
    
    headerSpacer: {
      width: 40,
    },
    
    // Scroll View
    scrollView: {
      flex: 1,
    },
    
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 120, // Extra space for footer
    },
    
    // Loading State
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 100,
    },
    
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.colors.text.secondary,
    },
    
    // Logo & Name Section (Orange highlight)
    logoNameSection: {
      alignItems: 'center',
      paddingVertical: 24,
      marginBottom: 8,
    },
    
    logoContainer: {
      marginBottom: 16,
    },
    
    logoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: `${theme.colors.primary}30`,
    },
    
    gymName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: 12,
    },
    
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    
    // Sections
    section: {
      marginBottom: 24,
    },
    
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 12,
      paddingHorizontal: 4,
    },
    
    // Card Styling (matching MemberDetailModal)
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      overflow: 'hidden',
    },
    
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    
    rowIcon: {
      marginRight: 12,
      width: 24,
    },
    
    rowLabel: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 1,
    },
    
    rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    rowValue: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      textAlign: 'right',
    },
    
    phoneActions: {
      flexDirection: 'row',
      marginLeft: 12,
    },
    
    phoneActionButton: {
      padding: 4,
      marginLeft: 8,
    },
    
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: 16,
    },
    
    // Address Section (inside Basic Info)
    addressSection: {
      padding: 16,
    },
    
    addressText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      marginTop: 4,
      lineHeight: 22,
    },
    
    // Business Hours
    scheduleTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      padding: 16,
      paddingBottom: 12,
    },
    
    scheduleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    
    scheduleDay: {
      fontSize: 14,
      color: theme.colors.text.primary,
    },
    
    scheduleHours: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text.primary,
    },
    
    // Packages
    packageItem: {
      padding: 16,
    },
    
    packageItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    packageHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    
    packageName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      flex: 1,
    },
    
    packageStatus: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginLeft: 8,
    },
    
    packageStatusText: {
      fontSize: 10,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    
    packageDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    
    packageDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    
    packageDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    
    packageDetailText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    
    emptyState: {
      padding: 40,
      alignItems: 'center',
    },
    
    emptyStateText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginTop: 12,
      textAlign: 'center',
    },
    
    // Statistics
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 8,
    },
    
    statItem: {
      width: '50%',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 8,
    },
    
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginTop: 8,
      marginBottom: 4,
    },
    
    statLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    
    // Footer
    footerSafeArea: {
      backgroundColor: theme.colors.background,
    },
    
    fixedFooter: {
      padding: 8,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    
    secondaryButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: 8,
    },
    
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    
    primaryButton: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      padding: 16,
      gap: 8,
    },
    
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    
    bottomSpacer: {
      height: 40,
    },
  });