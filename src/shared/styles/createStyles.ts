
import { StyleSheet } from 'react-native';

// Fixed: Add all the missing styles for GymSplitSelectionStep
export const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  
  section: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.md,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: theme.colors.text.secondary,
  },
  workoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  workoutCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutEmoji: {
    fontSize: 28,
  },
  workoutDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 16,
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tipsSection: {
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipBullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    lineHeight: 20,
    flex: 1,
  },
  
  // NEW: Add styles for GymSplitSelectionStep
  titleSection: {
    padding: 20,
    paddingBottom: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  compactButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    position: 'relative',
  },
  buttonEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionIndicatorText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingTop: 10,
  },
  startButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // NEW: ExerciseSelectionStep specific styles
  exerciseSelectionStepcontainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 20,
  //   paddingVertical: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: theme.colors.border,
  // },
  // backButton: {
  //   padding: 8,
  // },
  // backButtonText: {
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  // headerTitle: {
  //   flex: 1,
  //   textAlign: 'center',
  //   fontWeight: '600',
  // },
  // headerSpacer: {
  //   width: 40,
  // },
  // 🚀 UPDATED: Twitter-style Header (back arrow only, no text)
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

  // 🚀 UPDATED: Back button with only arrow (Twitter style)
  backButton: {
    padding: 8,
    marginLeft: -8, // Compensate for padding to align with Twitter style
  },

  // 🚀 UPDATED: Back arrow (no text, just arrow)
  backArrow: {
    fontSize: 24,
    fontWeight: '400',
  },

  // 🚀 UPDATED: Header title container for centered title
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  headerSpacer: {
    width: 40, // Same width as back button for balance
  },
  exerciseSelectionStepcontent: {
    flex: 1,
  },
  workoutTypeBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  workoutTypeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryScroll: {
    maxHeight: 60,
    paddingHorizontal: 8,
    marginBottom: 8,
    marginTop: -16, 
  },
  categoryContainer: {
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchHeader: {
    padding: 8,
    paddingBottom: 10,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  searchInput: {
    padding: 15,
    paddingRight: 45,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  clearSearchButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
  },
  clearSearchText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectionSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  customExerciseSection: {
    marginBottom: 15,
  },
  customExerciseButton: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customInputContainer: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  customExerciseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  plusButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseList: {
    paddingBottom: 20,
  },
  exerciseSelectButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 80,
  },
  exerciseSelectInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  exerciseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  exerciseDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2,
  },
  selectedIndicatorText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
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
  emptyState: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateHint: {
    fontSize: 14,
    textAlign: 'center',
  },
  autoAdvanceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
    loadingContainer: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginTop: 10,
      textAlign: 'center',
      color: theme.colors.text.secondary,
    },
    fullScreenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
});