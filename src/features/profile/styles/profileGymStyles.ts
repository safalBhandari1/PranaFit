// src/features/profile/styles/profileGymStyles.ts
import { StyleSheet } from 'react-native';

export const createProfileGymStyles = (theme: any) => {
  return StyleSheet.create({
    // ============ GYM MANAGEMENT SECTION ============
    gymManagementSection: {
      marginBottom: 24,
    },
    
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text.primary,
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    
    // ============ CURRENT GYM CARD ============
    currentGymCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    gymIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    
    gymInfo: {
      flex: 1,
    },
    
    gymName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    gymRole: {
      fontSize: 13,
      color: theme.colors.text.secondary,
    },
    
    switchGymButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    switchGymText: {
      fontSize: 14,
      color: theme.colors.primary,
      marginRight: 8,
      fontWeight: '600',
    },
    
    // ============ GYM ACTION BUTTONS ============
    gymActionButtons: {
      flexDirection: 'row',
      gap: 12,
      marginHorizontal: 20,
      marginBottom: 24,
    },
    
    gymActionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    gymActionButtonPrimary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    
    gymActionIcon: {
      marginRight: 8,
    },
    
    gymActionText: {
      fontSize: 14,
      fontWeight: '600',
    },
    
    gymActionTextPrimary: {
      color: '#FFFFFF',
    },
    
    gymActionTextSecondary: {
      color: theme.colors.text.primary,
    },
    
    // ============ GYM ACCESS SECTION ============
    gymAccessSection: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    gymAccessHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    
    gymAccessIcon: {
      marginRight: 12,
    },
    
    gymAccessTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      flex: 1,
    },
    
    gymAccessDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      lineHeight: 20,
      marginBottom: 16,
    },
    
    joinGymButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    joinGymText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.primary,
      marginLeft: 8,
    },
    
    // ============ NO GYM SECTION ============
    noGymSection: {
      backgroundColor: `${theme.colors.primary}10`,
      borderRadius: 12,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 24,
      alignItems: 'center',
    },
    
    noGymIcon: {
      marginBottom: 16,
    },
    
    noGymTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
      marginBottom: 8,
      textAlign: 'center',
    },
    
    noGymDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 20,
    },
    
    createGymButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      minWidth: 160,
    },
    
    createGymText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: 8,
    },
    
    // ============ GYM SWITCHER MODAL ============
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    
    modalContent: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
      paddingBottom: 34, // Safe area bottom
    },
    
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text.primary,
    },
    
    closeButton: {
      padding: 4,
    },
    
    gymsList: {
      paddingVertical: 8,
    },
    
    gymItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    gymItemIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    
    gymItemInfo: {
      flex: 1,
    },
    
    gymItemName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    gymItemRole: {
      fontSize: 13,
      color: theme.colors.text.secondary,
    },
    
    currentGymBadge: {
      backgroundColor: `${theme.colors.success}15`,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 12,
    },
    
    currentGymBadgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.success,
    },
    
    emptyGyms: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    
    emptyGymsText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginTop: 12,
    },
    // NEW: Gym Switcher Modal enhancements
  modalSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  
  gymItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 8,
  },
  
  gymItemRoleBadge: {
    backgroundColor: `${theme.colors.primary}10`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  
  gymItemLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  gymItemLocationText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  
  gymItemMembers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  gymItemMembersText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  
  gymItemRightSection: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  
  currentGymItem: {
    backgroundColor: `${theme.colors.primary}05`,
    borderColor: `${theme.colors.primary}20`,
  },
  
  currentGymName: {
    fontWeight: '600',
    color: theme.colors.primary,
  },
  
  switchingGymItem: {
    opacity: 0.7,
  },
  
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  
  globalLoading: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  
  globalLoadingText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },

  });
};