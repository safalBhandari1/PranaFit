// UPDATED: src/features/gym/styles/gymInvitationStyles.ts
import { StyleSheet, Platform } from 'react-native';

export const createGymInvitationStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    // Safe area for top (header) - Matching GymOnboardingScreen
    safeArea: {
      backgroundColor: theme.colors.background,
    },
    
    // Header matching GymOnboardingScreen EXACTLY
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
    
    // Back button with only arrow (matching GymOnboardingScreen)
    backButton: {
      padding: 8,
      marginLeft: -8,
    },
    
    // Back arrow (no text, just arrow)
    backArrow: {
      fontSize: 24,
      fontWeight: '400',
    },
    
    // Header title container for centered title
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
    
    keyboardView: {
      flex: 1,
    },
    
    // Scrollable content
    scrollView: {
      flex: 1,
    },
    
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 100,
    },
    
    // Welcome Section
    welcomeSection: {
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    
    welcomeTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text.primary,
      marginBottom: 8,
      textAlign: 'center',
    },
    
    welcomeText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    
    // Search Section
    searchSection: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 12,
      height: 48,
    },
    
    searchIcon: {
      marginRight: 8,
    },
    
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text.primary,
      height: '100%',
    },
    
    searchHint: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginTop: 8,
      textAlign: 'center',
    },
    
    // Search Results
    resultsContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
    
    resultsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 12,
    },
    
    resultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    resultAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    
    avatarText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.textInverse || '#FFFFFF',
    },
    
    resultContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    resultInfo: {
      flex: 1,
    },
    
    resultName: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 2,
    },
    
    resultEmail: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    
    alreadyMemberBadge: {
      backgroundColor: theme.colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    
    alreadyMemberText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.text.secondary,
    },
    
    // Role Selection
    roleSection: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 16,
    },
    
    roleOption: {
      padding: 16,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 8,
    },
    
    roleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    
    roleTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    
    selectedDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    
    roleDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
    
    notAllowedText: {
      fontSize: 12,
      marginTop: 8,
    },
    
    // Message Section
    messageSection: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },
    
    messageLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    
    messageInput: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 14,
      color: theme.colors.text.primary,
      height: 100,
      textAlignVertical: 'top',
    },
    
    // Loading States
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    
    loadingText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginTop: 16,
    },
    
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    
    emptyStateText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    
    // Footer matching GymOnboardingScreen EXACTLY
    footerSafeArea: {
      backgroundColor: theme.colors.background,
    },
    
    fixedFooter: {
      padding: 8,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    
    selectionActions: {
      flexDirection: 'row',
      gap: 12,
    },
    
    cancelButton: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.colors.border,
    },
    
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.secondary,
    },
    
    sendButton: {
      flex: 2,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
    },
    
    sendButtonDisabled: {
      backgroundColor: theme.colors.border,
    },
    
    sendButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    
    sendButtonTextDisabled: {
      color: theme.colors.text.secondary,
    },
    
    bottomSpacer: {
      height: 80,
    },
    
    // User Info Card
    userInfoCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    userInfoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    userAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.primary + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    
    userAvatarText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.textInverse || '#FFFFFF',
    },
    
    userDetails: {
      flex: 1,
    },
    
    userName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    userEmail: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
  });