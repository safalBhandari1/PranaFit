
// // src/features/gym/styles/gymOnboardingStyles.ts (UPDATED)
// import { StyleSheet, Platform, Dimensions } from 'react-native';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// export const createGymOnboardingStyles = (theme: any) => 
//   StyleSheet.create({
//     // 🚀 Container with fixed height
//     modalContainer: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
    
//     // 🚀 Twitter-style Header (56px height)
//     modalHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       paddingHorizontal: 16,
//       height: 56,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//       backgroundColor: theme.colors.background,
//     },
    
//     backButton: {
//       padding: 8,
//       marginLeft: -8,
//     },
    
//     headerTitleContainer: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
    
//     modalTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       color: theme.colors.text.primary,
//     },
    
//     keyboardView: {
//       flex: 1,
//     },
    
//     // 🚀 Fixed content container (no scrolling)
//     contentContainer: {
//       flex: 1,
//       paddingHorizontal: 16,
//       paddingTop: 20,
//       paddingBottom: 20,
//       justifyContent: 'space-between', // Distribute space
//     },
    
//     // 🚀 Compact welcome section
//     welcomeSection: {
//       alignItems: 'center',
//       marginBottom: 24,
//     },
    
//     welcomeIcon: {
//       width: 56,
//       height: 56,
//       borderRadius: 12,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: 12,
//     },
    
//     welcomeTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: theme.colors.text.primary,
//       marginBottom: 8,
//       textAlign: 'center',
//     },
    
//     welcomeText: {
//       fontSize: 14,
//       color: theme.colors.text.secondary,
//       textAlign: 'center',
//       lineHeight: 20,
//     },
    
//     // 🚀 Form section with fixed height
//     formSection: {
//       flex: 1,
//       maxHeight: SCREEN_HEIGHT * 0.5, // Limit form height
//       justifyContent: 'flex-start',
//     },
    
//     formGroup: {
//       marginBottom: 16,
//     },
    
//     label: {
//       fontSize: 14,
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//       marginBottom: 6,
//     },
    
//     required: {
//       color: theme.colors.error,
//     },
    
//     input: {
//       backgroundColor: theme.colors.card,
//       borderWidth: 1,
//       borderColor: theme.colors.border,
//       borderRadius: 8,
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       fontSize: 14,
//       color: theme.colors.text.primary,
//       height: 48, // Fixed height
//     },
    
//     textArea: {
//       height: 80, // Slightly taller for description
//       paddingTop: 12,
//     },
    
//     // 🚀 Compact note container
//     noteContainer: {
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//       gap: 8,
//       backgroundColor: `${theme.colors.primary}10`,
//       borderLeftWidth: 3,
//       borderLeftColor: theme.colors.primary,
//       padding: 12,
//       borderRadius: 8,
//       marginTop: 12,
//       marginBottom: 8,
//     },
    
//     noteText: {
//       flex: 1,
//       fontSize: 13,
//       color: theme.colors.text.secondary,
//       lineHeight: 18,
//     },
    
//     noteBold: {
//       fontWeight: '600',
//       color: theme.colors.text.primary,
//     },
    
//     // 🚀 Fixed buttons container at bottom
//     buttonsContainer: {
//       marginTop: 'auto', // Push to bottom
//       paddingTop: 20,
//       borderTopWidth: 1,
//       borderTopColor: theme.colors.border,
//     },
    
//     submitButton: {
//       backgroundColor: theme.colors.primary,
//       borderRadius: 8,
//       padding: 16,
//       alignItems: 'center',
//       marginBottom: 12,
//     },
    
//     submitButtonDisabled: {
//       backgroundColor: `${theme.colors.primary}50`,
//       opacity: 0.7,
//     },
    
//     submitButtonText: {
//       color: '#FFFFFF',
//       fontSize: 16,
//       fontWeight: '600',
//     },
    
//     cancelButton: {
//       padding: 16,
//       alignItems: 'center',
//     },
    
//     cancelButtonText: {
//       color: theme.colors.text.secondary,
//       fontSize: 16,
//       fontWeight: '500',
//     },
//   });


// src/features/gym/styles/gymOnboardingStyles.ts
import { StyleSheet, Platform } from 'react-native';

export const createGymOnboardingStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    // 🚀 Twitter-style Header (exact match to ExerciseSelectionStep)
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
    
    backButton: {
      padding: 8,
      marginLeft: -8,
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
    
    keyboardView: {
      flex: 1,
    },
    
    // 🚀 Scrollable content (matching exercise modal)
    scrollView: {
      flex: 1,
    },
    
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    
    // Welcome Section
    welcomeSection: {
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    
    welcomeIcon: {
      width: 56,
      height: 56,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
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
    
    // Form Section (matching exercise modal input styles)
    formSection: {
      paddingHorizontal: 16,
      gap: 16,
    },
    
    formGroup: {
      gap: 8,
    },
    
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    
    required: {
      color: theme.colors.error,
    },
    
    input: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 14,
      color: theme.colors.text.primary,
      height: 48,
    },
    
    textArea: {
      height: 100,
      paddingTop: 12,
    },
    
    // Note Container
    noteContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      backgroundColor: `${theme.colors.primary}10`,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
      marginBottom: 16,
    },
    
    noteText: {
      flex: 1,
      fontSize: 13,
      color: theme.colors.text.secondary,
      lineHeight: 18,
    },
    
    noteBold: {
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    
    // Buttons (matching exercise modal button styles)
    submitButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginTop: 16,
    },
    
    submitButtonDisabled: {
      backgroundColor: `${theme.colors.primary}50`,
      opacity: 0.7,
    },
    
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    
    cancelButton: {
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    
    cancelButtonText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
      fontWeight: '500',
    },
    
    bottomSpacer: {
      height: 40,
    },
  });