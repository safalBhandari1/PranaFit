
// import { StyleSheet } from 'react-native';

// export const createGymActiveSessionStyles = (theme: any) => StyleSheet.create({
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
//     fontSize: 24, // Increased by 50% from 16
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   toggleScroll: {
//     maxHeight: 60,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//   },
//   toggleContainer: {
//     paddingVertical: 12,
//     gap: 8,
//   },
//   toggleButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'transparent',
//   },
//   toggleText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   scrollContent: {
//     flex: 1,
//     padding: 16, // Reduced from 20 to match old project
//   },
//   workoutHeader: {
//     padding: 20,
//     borderRadius: 12,
//     marginHorizontal: 16, // Reduced from 20
//     marginBottom: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   workoutInfo: {
//     flex: 1,
//   },
//   workoutTitle: {
//     fontSize: 18, // Added specific font size
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   startButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8, // Increased from 6
//     borderRadius: 16,
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//   },
//   startButtonText: {
//     color: '#FFF',
//     fontSize: 14, // Increased from 12
//     fontWeight: 'bold',
//   },
//   timerContainer: {
//     alignItems: 'center',
//   },
//   timerLabel: {
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   timer: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   progressStats: {
//     flexDirection: 'row',
//     padding: 16,
//     borderRadius: 12,
//     marginHorizontal: 16, // Reduced from 20
//     marginBottom: 16,
//     justifyContent: 'space-around',
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//   },
//   exerciseCard: {
//     borderRadius: 12,
//     marginBottom: 12, // Reduced from 16
//     overflow: 'hidden',
//     borderWidth: 1, // Added border
//     borderColor: theme.colors.border,
//   },
//   exerciseHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//   },
//   exerciseInfo: {
//     flex: 1,
//   },
//   exerciseName: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   exerciseMuscleGroup: {
//     fontSize: 14,
//     marginBottom: 2,
//   },
//   exerciseVolume: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   arrowContainer: {
//     paddingLeft: 10,
//   },
//   arrow: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   expandedContent: {
//     padding: 16,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: theme.colors.border,
//   },
//   trackingSection: {
//     marginBottom: 8,
//   },
//   setsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   trackingLabel: {
//     fontSize: 14, // Added specific size
//   },
//   setControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   setControlButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   setControlText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   setCount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     minWidth: 30,
//     textAlign: 'center',
//   },
//   setRow: {
//     marginBottom: 12,
//     borderRadius: 8,
//     padding: 8,
//   },
//   setRowContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },
//   setNumber: {
//     fontSize: 14,
//     fontWeight: '600',
//     width: 60,
//   },
//   setInputs: {
//     flex: 1,
//   },
//   inputLabels: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4,
//     paddingHorizontal: 4,
//   },
//   inputLabel: {
//     fontSize: 11,
//     flex: 1,
//     textAlign: 'center',
//   },
//   inputValues: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 8,
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'center',
//     minHeight: 40,
//   },
//   completeButton: {
//     flex: 1,
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: 40,
//   },
//   completeButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   prSection: {
//     marginBottom: 20,
//   },
//   prTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   prInputRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   prInputContainer: {
//     flex: 1,
//   },
//   prInputLabel: {
//     fontSize: 12,
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   prInput: {
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 8,
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'center',
//     minHeight: 40,
//   },
//   workoutActions: {
//     padding: 20,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: theme.colors.border,
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
//   emptyState: {
//     padding: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   emptyStateText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

import { StyleSheet } from 'react-native';

export const createGymActiveSessionStyles = (theme: any) => StyleSheet.create({
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
  // ... REST OF YOUR EXISTING STYLES REMAIN THE SAME ...
  toggleScroll: {
    maxHeight: 60,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  toggleContainer: {
    paddingVertical: 12,
    gap: 8,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  workoutHeader: {
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 16,
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
  progressStats: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
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
  exerciseCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseMuscleGroup: {
    fontSize: 14,
    marginBottom: 2,
  },
  exerciseVolume: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrowContainer: {
    paddingLeft: 10,
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandedContent: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  trackingSection: {
    marginBottom: 8,
  },
  setsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackingLabel: {
    fontSize: 14,
  },
  setControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  setControlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setControlText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  setCount: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  setRow: {
    marginBottom: 12,
    borderRadius: 8,
    padding: 8,
  },
  setRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  setNumber: {
    fontSize: 14,
    fontWeight: '600',
    width: 60,
  },
  setInputs: {
    flex: 1,
  },
  inputLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  inputLabel: {
    fontSize: 11,
    flex: 1,
    textAlign: 'center',
  },
  inputValues: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 40,
  },
  completeButton: {
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  prSection: {
    marginBottom: 20,
  },
  prTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  prInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  prInputContainer: {
    flex: 1,
  },
  prInputLabel: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  prInput: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 40,
  },
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
  emptyState: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
});