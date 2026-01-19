
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