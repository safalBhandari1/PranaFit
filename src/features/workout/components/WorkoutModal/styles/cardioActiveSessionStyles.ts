// import { StyleSheet } from 'react-native';

// export const createCardioActiveSessionStyles = (theme: any) => StyleSheet.create({
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
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   timerSection: {
//     padding: 30,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: theme.colors.card,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   timerEmoji: {
//     fontSize: 48,
//     marginBottom: 10,
//   },
//   timerText: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   timerLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//   },
//   controlSection: {
//     marginBottom: 20,
//   },
//   startButton: {
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   activeControls: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   controlButton: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   controlButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   statsSection: {
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     backgroundColor: theme.colors.card,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//   },
//   inputSection: {
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     backgroundColor: theme.colors.card,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textInput: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginRight: 10,
//     fontSize: 16,
//   },
//   inputUnit: {
//     fontSize: 16,
//     fontWeight: '600',
//     minWidth: 30,
//   },
//   sliderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   intensityDot: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//   },
//   intensityLabels: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   intensityLabel: {
//     fontSize: 12,
//   },
//   notesInput: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     fontSize: 16,
//     minHeight: 80,
//   },
//   workoutActions: {
//     padding: 20,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(0,0,0,0.1)',
//     backgroundColor: theme.colors.background,
//   },
//   completeActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   completeButton: {
//     flex: 2,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StyleSheet } from 'react-native';

export const createCardioActiveSessionStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginLeft: -8,
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
    width: 40,
  },
  
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  
  // 🆕 Workout Header Card - Matching GymActiveSessionStep
  workoutHeader: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  workoutInfo: {
    flex: 1,
  },
  
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  startButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  
  startButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  timerContainer: {
    alignItems: 'center',
  },
  
  timerLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  // 🆕 Progress Stats - Matching GymActiveSessionStep
  progressStats: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 12,
  },
  
  // 🆕 Input Cards - Consistent styling
  inputCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  inputTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 44,
  },
  
  // 🆕 Intensity Section - Updated styling
  intensityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  intensityValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  intensityDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  notesInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  
  // 🆕 Footer Actions - Matching GymActiveSessionStep
  workoutActions: {
    padding: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  
  completeActions: {
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
  
  completeButton: {
    flex: 2,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});