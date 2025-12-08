// // src/features/projects/components/styles/CreateProjectScreenStyles.ts
// import { StyleSheet } from 'react-native';

// export const createStyles = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   projectInfoSection: {
//     padding: 20,
//     gap: 12,
//   },
//   activityScroll: {
//     maxHeight: 50,
//   },
//   activityContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   activityText: {
//     fontSize: 16,
//     fontWeight: '600',
//     paddingHorizontal: 8,
//   },
//   activitySeparator: {
//     fontSize: 16,
//     fontWeight: '600',
//     paddingHorizontal: 4,
//   },
//   calendarWrapper: {
//     marginBottom: 5,
//     minHeight: 80,
//     paddingHorizontal: 10,
//   },
//   calendarContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   calendarDay: {
//     width: 45,
//     height: 55,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   selectedDay: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   dayLetter: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   dayDate: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   todayIndicator: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//   },
//   workoutDot: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//   },
//   restDayIcon: {
//     position: 'absolute',
//     bottom: 4,
//     fontSize: 12,
//   },
//   viewModeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     gap: 15,
//   },
//   viewModeText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   viewModeSeparator: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   restDayBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 12,
//     marginHorizontal: 20,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   restDayBannerText: {
//     fontSize: 14,
//     fontWeight: '600',
//     flex: 1,
//   },
//   removeRestDayButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   removeRestDayText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   gridRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     gap: 8,
//   },
//   compactButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 50,
//     position: 'relative',
//   },
//   buttonEmoji: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     flex: 1,
//   },
//   selectionIndicator: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectionIndicatorText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   // Input styles
//   textInput: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   textArea: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     fontSize: 16,
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   // Calisthenics/Yoga styles
//   searchSection: {
//     marginBottom: 16,
//   },
//   searchContainer: {
//     position: 'relative',
//   },
//   searchInput: {
//     padding: 15,
//     paddingRight: 45,
//     borderRadius: 8,
//     borderWidth: 1,
//     fontSize: 16,
//   },
//   clearSearchButton: {
//     position: 'absolute',
//     right: 10,
//     top: 10,
//     padding: 5,
//   },
//   clearSearchText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   restDayButton: {
//     padding: 15,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   restDayEmoji: {
//     fontSize: 20,
//     marginRight: 12,
//   },
//   restDayText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   customExerciseSection: {
//     marginBottom: 16,
//   },
//   customExerciseButton: {
//     padding: 15,
//     borderRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customInputContainer: {
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   customInput: {
//     flex: 1,
//     fontSize: 16,
//     marginRight: 10,
//   },
//   customExerciseText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   plusButton: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusButtonText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   exerciseList: {
//     paddingBottom: 20,
//   },
//   exerciseSelectButton: {
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     minHeight: 70,
//   },
//   exerciseSelectInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   exerciseName: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   exerciseCategory: {
//     fontSize: 14,
//   },
//   exerciseActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   favoriteButton: {
//     padding: 4,
//   },
//   favoriteIcon: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   selectedIndicator: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedIndicatorText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   // Cardio styles
//   cardioSection: {
//     marginBottom: 24,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   cardioInput: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   fixedFooter: {
//     padding: 20,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(0,0,0,0.1)',
//   },
//   selectionActions: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   saveButton: {
//     flex: 2,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// src/features/projects/components/styles/CreateProjectScreenStyles.ts
import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  // Custom Header - Matching cardio session style
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerSpacer: {
    width: 40, // Matches back button width for balance
  },
  projectInfoSection: {
    padding: 20,
    gap: 12,
  },
  activityScroll: {
    maxHeight: 50,
  },
  activityContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  activitySeparator: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  calendarWrapper: {
    marginBottom: 5,
    minHeight: 80,
    paddingHorizontal: 10,
  },
  calendarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  calendarDay: {
    width: 45,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedDay: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dayLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayDate: {
    fontSize: 14,
    fontWeight: '600',
  },
  todayIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  workoutDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  restDayIcon: {
    position: 'absolute',
    bottom: 4,
    fontSize: 12,
  },
  viewModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },
  viewModeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewModeSeparator: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restDayBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  restDayBannerText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  removeRestDayButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeRestDayText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
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
  // Input styles
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  textArea: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  // Calisthenics/Yoga styles
  searchSection: {
    marginBottom: 16,
  },
  searchContainer: {
    position: 'relative',
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
  restDayButton: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  restDayEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  restDayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  customExerciseSection: {
    marginBottom: 16,
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
    alignItems: 'center',
    minHeight: 70,
  },
  exerciseSelectInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  selectedIndicatorText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Cardio styles
  cardioSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardioInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  fixedFooter: {
    padding: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  selectionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
   // 🚀 NEW STYLES FOR PRODUCTION FEATURES
   offlineBanner: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.warning || '#FFA500', // Fallback color
  },
  offlineText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContent: {
    backgroundColor: theme.colors.card,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  offlineNotice: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});