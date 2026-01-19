// NEW FILE: src/features/gym/styles/membersScreenStyles.ts
import { StyleSheet, Platform, Dimensions } from 'react-native';

export const createMembersScreenStyles = (theme: any) => {
  const { width } = Dimensions.get('window');
  
  return StyleSheet.create({
    // ============ CONTAINER & SAFE AREA ============
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    // ============ HEADER (GymSwitcherModal Style) ============
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
    
    headerActionButton: {
      padding: 8,
      marginRight: -8,
    },
    
    headerActionText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    
    // ============ SEARCH SECTION ============
    searchSection: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 12,
      height: 44,
    },
    
    searchIcon: {
      marginRight: 8,
    },
    
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text.primary,
      height: '100%',
    },
    
    clearSearchButton: {
      padding: 4,
      marginLeft: 8,
    },
    
    // ============ FILTER SECTION ============
    filterSection: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    filterScrollView: {
      flexDirection: 'row',
    },
    
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    filterButtonActive: {
      backgroundColor: theme.colors.primary + '15',
      borderColor: theme.colors.primary,
    },
    
    filterButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text.primary,
    },
    
    filterButtonTextActive: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    
    // ============ MEMBERS LIST ============
    membersList: {
      flex: 1,
    },
    
    listContent: {
      paddingVertical: 8,
    },
    
    // ============ MEMBER ITEM (GymSwitcherModal Style) ============
    memberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    
    memberItemSelected: {
      backgroundColor: theme.colors.primary + '05',
    },
    
    memberIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    
    memberIcon: {
      // Icon styling
    },
    
    memberInfo: {
      flex: 1,
    },
    
    memberNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    
    memberName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginRight: 8,
    },
    
    memberCode: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.text.secondary,
      backgroundColor: `${theme.colors.primary}10`,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    
    memberDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
    },
    
    memberDetailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    
    memberDetailText: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    
    memberRightSection: {
      marginLeft: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 40,
    },
    
    // ============ CATEGORY BADGES ============
    categoryBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
    },
    
    categoryBadgeNew: {
      backgroundColor: `${theme.colors.success}15`,
      borderWidth: 1,
      borderColor: theme.colors.success + '40',
    },
    
    categoryBadgeRegular: {
      backgroundColor: `${theme.colors.warning}15`,
      borderWidth: 1,
      borderColor: theme.colors.warning + '40',
    },
    
    categoryBadgeVeteran: {
      backgroundColor: `${theme.colors.info}15`,
      borderWidth: 1,
      borderColor: theme.colors.info + '40',
    },
    
    categoryBadgeText: {
      fontSize: 10,
      fontWeight: '600',
    },
    
    categoryBadgeTextNew: {
      color: theme.colors.success,
    },
    
    categoryBadgeTextRegular: {
      color: theme.colors.warning,
    },
    
    categoryBadgeTextVeteran: {
      color: theme.colors.info,
    },
    
    // ============ STATUS BADGES ============
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    
    statusBadgeActive: {
      backgroundColor: `${theme.colors.success}15`,
    },
    
    statusBadgeInactive: {
      backgroundColor: `${theme.colors.error}15`,
    },
    
    statusBadgePending: {
      backgroundColor: `${theme.colors.warning}15`,
    },
    
    statusBadgeFrozen: {
      backgroundColor: `${theme.colors.info}15`,
    },
    
    statusBadgeText: {
      fontSize: 10,
      fontWeight: '600',
    },
    
    statusBadgeTextActive: {
      color: theme.colors.success,
    },
    
    statusBadgeTextInactive: {
      color: theme.colors.error,
    },
    
    statusBadgeTextPending: {
      color: theme.colors.warning,
    },
    
    statusBadgeTextFrozen: {
      color: theme.colors.info,
    },
    
    // ============ RECENT MEMBERS SECTION ============
    recentSection: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    
    sectionAction: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    
    recentMembersScroll: {
      flexDirection: 'row',
    },
    
    recentMemberCard: {
      width: 140,
      marginRight: 12,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    recentMemberIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    
    recentMemberName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    recentMemberJoinDate: {
      fontSize: 11,
      color: theme.colors.text.secondary,
    },
    
    // ============ EMPTY STATES ============
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      paddingHorizontal: 40,
    },
    
    emptyStateIcon: {
      marginBottom: 20,
    },
    
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: 8,
    },
    
    emptyStateText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    
    // ============ LOADING STATES ============
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
    
    // ============ FLOATING ACTION BUTTON ============
    fabContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 1000,
    },
    
    fabButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    
    // ============ STATS BAR ============
    statsBar: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    
    statItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    statValue: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text.primary,
      marginBottom: 2,
    },
    
    statLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    
    // ============ ERROR STATES ============
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    
    errorIcon: {
      marginBottom: 16,
    },
    
    errorTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.error,
      marginBottom: 8,
    },
    
    errorText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: 16,
    },
    
    retryButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
    },
    
    retryButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });
};