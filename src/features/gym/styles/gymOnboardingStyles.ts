// src/features/gym/styles/gymOnboardingStyles.ts
import { StyleSheet, Platform } from 'react-native';

export const createGymOnboardingStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    
    // Safe area for top (header)
    safeArea: {
      backgroundColor: theme.colors.background,
    },
    
    // 🚀 Twitter-style Header (EXACT match to ExerciseSelectionStep)
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
    
    // 🚀 Back button with only arrow (Twitter style)
    backButton: {
      padding: 8,
      marginLeft: -8, // Compensate for padding to align with Twitter style
    },
    
    // 🚀 Back arrow (no text, just arrow)
    backArrow: {
      fontSize: 24,
      fontWeight: '400',
    },
    
    // 🚀 Header title container for centered title
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
      width: 40, // Same width as back button for balance
    },
    
    keyboardView: {
      flex: 1,
    },
    
    // 🚀 Scrollable content
    scrollView: {
      flex: 1,
    },
    
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 100, // Extra space for footer
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
    
    // Form Section
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
    
    // Footer Safe Area
    footerSafeArea: {
      backgroundColor: theme.colors.background,
    },
    
    // 🚀 Fixed Footer (EXACTLY like ExerciseSelectionStep)
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
    },
    
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    
    startSessionButton: {
      flex: 2,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    
    startSessionButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    
    bottomSpacer: {
      height: 80,
    },
    // Step Indicator
    stepIndicator: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
    },
    
    stepContainer: {
      alignItems: 'center',
    },
    
    stepCircle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    
    stepCircleActive: {
      backgroundColor: theme.colors.primary,
    },
    
    stepNumber: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.secondary,
    },
    
    stepNumberActive: {
      color: '#FFFFFF',
    },
    
    stepLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    
    // Step 2: Business Hours Styles
    hoursSection: {
      paddingHorizontal: 16,
    },
    
    dayRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    
    dayLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    
    dayLabel: {
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 12,
    },
    
    timeInputs: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    timeInput: {
      width: 70,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 6,
      fontSize: 14,
      color: theme.colors.text.primary,
      textAlign: 'center',
    },
    
    disabledInput: {
      backgroundColor: theme.colors.border,
      color: theme.colors.text.secondary,
    },
    
    timeSeparator: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginHorizontal: 8,
    },
    
    closedText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      fontStyle: 'italic',
    },
    
    hoursNote: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      backgroundColor: `${theme.colors.primary}10`,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      marginTop: 20,
    },
    
    hoursNoteText: {
      flex: 1,
      fontSize: 13,
      color: theme.colors.text.secondary,
      lineHeight: 18,
    },
    
    // Step 3: Packages Styles
    packagesSection: {
      paddingHorizontal: 16,
    },
    
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    
    packageCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
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
    },
    
    packageDuration: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    
    packageDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 16,
      lineHeight: 20,
    },
    
    priceSection: {
      marginBottom: 16,
    },
    
    priceControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    
    priceButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    priceDisplay: {
      alignItems: 'center',
    },
    
    priceAmount: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    
    priceLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    
    totalPrice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    
    totalPriceLabel: {
      fontSize: 14,
      color: theme.colors.text.primary,
    },
    
    totalPriceAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.success,
    },
    
    featuresList: {
      gap: 8,
    },
    
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    
    featureText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    
    // Add-ons Section
    addOnsSection: {
      paddingHorizontal: 16,
      marginTop: 8,
    },
    
    addOnsSubtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 16,
    },
    
    addOnCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    
    addOnCardSelected: {
      backgroundColor: `${theme.colors.primary}10`,
      borderColor: theme.colors.primary,
    },
    
    addOnInfo: {
      flex: 1,
    },
    
    addOnName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    
    addOnNameSelected: {
      color: theme.colors.primary,
    },
    
    addOnPrice: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    
    addOnCheckbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    addOnCheckboxSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    logoStepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: theme.colors.background,
      },
      
      stepLogoContainer: {
        alignItems: 'center',
        zIndex: 2,
      },
      
      stepLogoCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.border,
        marginBottom: 6,
      },
      
      stepLogoCircleActive: {
        backgroundColor: `${theme.colors.primary}15`, // Orange light background
        borderColor: theme.colors.primary,
      },
      
      stepLogoLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: theme.colors.text.secondary,
        textAlign: 'center',
      },
      
      stepLogoLabelActive: {
        color: theme.colors.primary,
        fontWeight: '600',
      },
      
      stepConnector: {
        flex: 1,
        height: 2,
        backgroundColor: theme.colors.border,
        marginHorizontal: 8,
        maxWidth: 40,
      },

  });

