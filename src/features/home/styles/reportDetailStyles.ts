// // src/features/home/styles/reportDetailStyles.ts
// import { StyleSheet } from 'react-native';

// export const createReportDetailStyles = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 12, // Account for status bar
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//     backgroundColor: theme.colors.background,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex: 1,
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   content: {
//     flex: 1,
//   },
  
//   // 🚀 UPDATED: Summary Card (30% more compact)
//   summaryCard: {
//     borderRadius: 16,
//     padding: 20,
//     margin: 16,
//     // Shadow for depth
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
  
//   // Card Header: Workout Type + Date
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 10,
//   },
//   workoutTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   workoutEmoji: {
//     marginRight: 10,
//   },
//   workoutType: {
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   workoutDate: {
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'right',
//     color: theme.colors.text.secondary,
//   },
  
//   // Subtitle (Project context or "Direct Session")
//   workoutSubtitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 20,
//     color: theme.colors.text.secondary,
//   },
  
//   // 🚀 NEW: Circular Progress Container
//   circularProgressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 8,
//     flexWrap: 'wrap',
//   },
  
//   // 🚀 NEW: Stats Grid (4 items horizontally)
//   statsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 8,
//   },
  
//   statGridItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   statGridLabel: {
//     fontSize: 11,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//     marginBottom: 4,
//     textAlign: 'center',
//   },
  
//   statGridValue: {
//     fontSize: 16,
//     fontWeight: '700',
//     textAlign: 'center',
//   },
  
//   // 🚀 UPDATED: Personal Records Container
//   prsContainer: {
//     marginTop: 0,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: `${theme.colors.border}30`,
//   },
  
//   prsTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
  
//   // 🚀 NEW: PR Item Row (same line layout)
//   prItemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
  
//   prExerciseName: {
//     fontSize: 14,
//     fontWeight: '500',
//     flex: 1,
//   },
  
//   prValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'right',
//   },
  
//   // 🚀 NEW: Minimalist divider for PRs
//   prDivider: {
//     height: 1,
//     opacity: 0.3,
//   },
  
//   // Sections
//   section: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
  
//   // Exercise Card
//   exerciseCard: {
//     borderRadius: 12,
//     marginBottom: 12,
//     overflow: 'hidden',
//     // Shadow for depth
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   exerciseHeader: {
//     padding: 16,
//   },
  
//   exerciseTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
  
//   exerciseEmoji: {
//     marginRight: 12,
//   },
  
//   exerciseNameContainer: {
//     flex: 1,
//   },
  
//   exerciseName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
  
//   // Sets Table
//   setsTable: {
//     borderTopWidth: 1,
//     borderTopColor: `${theme.colors.border}30`,
//   },
  
//   setsTableHeader: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
  
//   setHeaderText: {
//     fontSize: 11,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
  
//   setRow: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
  
//   setCell: {
//     fontSize: 13,
//     flex: 1,
//     textAlign: 'center',
//   },
  
//   // Cardio Metrics Grid
//   metricsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderRadius: 12,
//     // Shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   metricItem: {
//     width: '48%',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
  
//   metricValue: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
  
//   metricLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
  
//   // Notes Card
//   notesCard: {
//     padding: 16,
//     borderRadius: 12,
//     // Shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   notesText: {
//     fontSize: 14,
//     lineHeight: 20,
//   },

// });

// src/features/home/styles/reportDetailStyles.ts
import { StyleSheet } from 'react-native';

export const createReportDetailStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    marginLeft: -8, // Compensate for padding to align with Twitter style
  },
  
  // 🚀 UPDATED: Back arrow (no text, just arrow)
  backArrow: {
    fontSize: 24,
    fontWeight: '400',
  },
  
  // 🚀 REMOVED: backButtonText (no longer needed)
  
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
  
  content: {
    flex: 1,
  },
  
  // 🚀 UPDATED: Summary Card (30% more compact)
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    margin: 16,
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Card Header: Workout Type + Date
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  
  workoutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  workoutEmoji: {
    marginRight: 10,
  },
  
  workoutType: {
    fontSize: 20,
    fontWeight: '700',
  },
  
  workoutDate: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    color: theme.colors.text.secondary,
  },
  
  // Subtitle (Project context or "Direct Session")
  workoutSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
    color: theme.colors.text.secondary,
  },
  
  // 🚀 UPDATED: Circular Progress Container - Keep as is (left aligned)
  circularProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
    flexWrap: 'wrap',
  },
  
  // 🚀 REMOVED: statsGrid and related styles (no longer needed)
  
  // 🚀 UPDATED: Personal Records Container
  prsContainer: {
    marginTop: 0,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.border}30`,
  },
  
  prsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  
  // 🚀 UPDATED: PR Item Row (same line layout)
  prItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  
  prExerciseName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  
  prValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  
  // 🚀 UPDATED: Minimalist divider for PRs
  prDivider: {
    height: 1,
    opacity: 0.3,
  },
  
  // Sections
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  
  // Exercise Card
  exerciseCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  exerciseHeader: {
    padding: 16,
  },
  
  exerciseTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  exerciseEmoji: {
    marginRight: 12,
  },
  
  exerciseNameContainer: {
    flex: 1,
  },
  
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Sets Table
  setsTable: {
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.border}30`,
  },
  
  setsTableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  
  setHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  setRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  setCell: {
    fontSize: 13,
    flex: 1,
    textAlign: 'center',
  },
  
  // Cardio Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  
  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Notes Card
  notesCard: {
    padding: 16,
    borderRadius: 12,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
});