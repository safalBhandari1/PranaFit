// src/features/gym/styles/trainerDashboardStyles.ts (UPDATED)
import { StyleSheet } from 'react-native';

export const createTrainerDashboardStyles = (theme: any) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    scrollView: {
      flex: 1,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    // Stat Card - MATCHING ProjectHomeScreen pattern
    statCard: {
      flex: 1,
      minWidth: '45%',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    statCardTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: theme.spacing.xs,
    },
    statCardValue: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text.primary,
      marginBottom: 2,
    },
    statCardSubtitle: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    section: {
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    // Sessions Card - MATCHING ProjectHomeScreen pattern
    sessionsCard: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    sessionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: `${theme.colors.border}50`,
    },
    sessionTime: {
      width: 70,
    },
    sessionTimeText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    sessionDetails: {
      flex: 1,
      marginHorizontal: theme.spacing.md,
    },
    sessionClient: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 2,
    },
    sessionType: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    sessionStatus: {
      alignItems: 'flex-end',
    },
    statusConfirmed: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.success,
      backgroundColor: `${theme.colors.success}15`,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      borderRadius: 6,
    },
    statusPending: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.warning,
      backgroundColor: `${theme.colors.warning}15`,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      borderRadius: 6,
    },
    // Progress Card - MATCHING ProjectHomeScreen pattern
    progressCard: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    progressItem: {
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: `${theme.colors.border}50`,
    },
    progressClient: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 2,
    },
    progressText: {
      fontSize: 13,
      color: theme.colors.text.secondary,
    },
    bottomSpacer: {
      height: 100,
    },
  });