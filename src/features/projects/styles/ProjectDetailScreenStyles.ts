

// // src/features/projects/components/styles/ProjectDetailScreenStyles.ts
// import { StyleSheet } from 'react-native';

// export const createStyles = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   // Custom Header - Matching cardio session style
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: theme.colors.primary,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: theme.colors.text.primary,
//   },
//   headerSpacer: {
//     width: 40, // Matches back button width for balance
//   },
//   projectHeader: {
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 20,
//     backgroundColor: theme.colors.card,
//   },
//   projectTitle: {
//     marginBottom: 8,
//     fontSize: 28, // Same size as ProjectHomeScreen
//     fontWeight: 'bold',
//   },
//   projectMeta: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//   },
//   projectDates: {
//     color: theme.colors.text.secondary,
//     marginBottom: 8,
//   },
//   projectDescription: {
//     color: theme.colors.text.secondary,
//     fontStyle: 'italic',
//   },
//   progressSection: {
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 20,
//     backgroundColor: theme.colors.card,
//   },
//   sectionTitle: {
//     marginBottom: 16,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   statItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statValue: {
//     marginBottom: 4,
//   },
//   statLabel: {
//     color: theme.colors.text.secondary,
//     textAlign: 'center',
//   },
//   overallProgressBar: {
//     height: 8,
//     borderRadius: 4,
//     overflow: 'hidden',
//     backgroundColor: theme.colors.border,
//   },
//   overallProgressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   scheduleSection: {
//     marginBottom: 20,
//   },
//   dayCard: {
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     backgroundColor: theme.colors.card,
//   },
//   dayHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   dayInfo: {
//     flex: 1,
//   },
//   workoutTitleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   workoutEmoji: {
//     fontSize: 20,
//     marginRight: 8,
//   },
//   workoutTitle: {
//     flex: 1,
//   },
//   dayDateText: {
//     color: theme.colors.text.secondary,
//     marginBottom: 8,
//   },
//   badgeContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 6,
//   },
//   todayBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//   },
//   todayText: {
//     color: '#FFF',
//   },
//   completedBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//   },
//   completedText: {
//     color: '#FFF',
//   },
//   missedBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//   },
//   missedText: {
//     color: '#FFF',
//   },
//   collapseButton: {
//     padding: 4,
//     marginLeft: 8,
//   },
//   collapseText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   expandedContent: {
//     marginTop: 12,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: theme.colors.border,
//     marginBottom: 12,
//   },
//   activityDetail: {
//     marginBottom: 12,
//   },
//   activityName: {
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   exercisesList: {
//     marginLeft: 8,
//   },
//   exerciseItem: {
//     marginBottom: 4,
//   },
//   exerciseName: {
//     color: theme.colors.text.secondary,
//   },
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   statusContainer: {
//     flex: 1,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: theme.colors.text.secondary,
//   },
//   startButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   startButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   actionsSection: {
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 30,
//     backgroundColor: theme.colors.card,
//   },
//   actionsGrid: {
//     gap: 12,
//   },
//   actionButton: {
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   actionButtonText: {
//     color: '#FFF',
//     fontWeight: '600',
//   },
// });

// src/features/projects/components/styles/ProjectDetailScreenStyles.ts
import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  
  // 🚀 NEW: Combined Card (Project Header + Progress Overview)
  combinedCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  projectHeader: {
    marginBottom: 16,
  },
  
  projectTitle: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  projectMeta: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  
  projectDates: {
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  
  projectDescription: {
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  
  // 🚀 NEW: Divider for combined card
  cardDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 16,
  },
  
  progressSection: {
    // No additional padding needed since it's in combinedCard
  },
  
  sectionTitle: {
    marginBottom: 16,
  },
  
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  statValue: {
    marginBottom: 4,
  },
  
  statLabel: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  
  overallProgressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: theme.colors.border,
  },
  
  overallProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  scheduleSection: {
    marginBottom: 20,
  },
  
  // 🚀 UPDATED: Day Card with shadow (matching ProjectHomeScreen)
  dayCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  dayInfo: {
    flex: 1,
  },
  
  workoutTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  workoutEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  
  workoutTitle: {
    flex: 1,
  },
  
  dayDateText: {
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  
  todayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  
  todayText: {
    color: '#FFF',
  },
  
  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  
  completedText: {
    color: '#FFF',
  },
  
  missedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  
  missedText: {
    color: '#FFF',
  },
  
  collapseButton: {
    padding: 4,
    marginLeft: 8,
  },
  
  collapseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  expandedContent: {
    marginTop: 12,
  },
  
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 12,
  },
  
  activityDetail: {
    marginBottom: 12,
  },
  
  activityName: {
    fontWeight: '600',
    marginBottom: 8,
  },
  
  exercisesList: {
    marginLeft: 8,
  },
  
  exerciseItem: {
    marginBottom: 4,
  },
  
  exerciseName: {
    color: theme.colors.text.secondary,
  },
  
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  
  statusContainer: {
    flex: 1,
  },
  
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  
  startButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  actionsSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    backgroundColor: theme.colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  actionsGrid: {
    gap: 12,
  },
  
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});