// // src/features/projects/styles/DietProjectDetailScreenStyles.ts
// import { StyleSheet } from 'react-native';
// import { Theme } from '../../../shared/stores/useThemeStore';

// export const createStyles = (theme: Theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backArrow: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontWeight: 'bold',
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   content: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overviewCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   projectTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: theme.colors.text.primary,
//   },
//   projectMetaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   metaItem: {
//     alignItems: 'center',
//   },
//   metaLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//   },
//   metaValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//   },
//   progressBarContainer: {
//     marginVertical: 16,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: theme.colors.border,
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginBottom: 8,
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   progressText: {
//     textAlign: 'center',
//     color: theme.colors.text.secondary,
//   },
//   targetsContainer: {
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: theme.colors.border,
//   },
//   targetsTitle: {
//     marginBottom: 12,
//     color: theme.colors.text.primary,
//   },
//   targetsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   targetItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   targetLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//   },
//   targetValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//   },
//   daysSection: {
//     paddingHorizontal: 16,
//   },
//   sectionTitle: {
//     marginBottom: 16,
//     color: theme.colors.text.primary,
//   },
//   dayCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
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
//   dayName: {
//     color: theme.colors.text.primary,
//     marginBottom: 4,
//   },
//   dayDate: {
//     color: theme.colors.text.secondary,
//     marginBottom: 8,
//   },
//   badgeContainer: {
//     flexDirection: 'row',
//   },
//   todayBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   todayText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   missedBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   missedText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   dayStatus: {
//     alignItems: 'flex-end',
//   },
//   completedText: {
//     fontWeight: '600',
//   },
//   inProgressText: {
//     color: theme.colors.text.secondary,
//   },
//   nutritionSummary: {
//     backgroundColor: `${theme.colors.primary}10`,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
//   nutritionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   nutritionItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   nutritionLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//     fontSize: 11,
//   },
//   nutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 14,
//   },
//   nutritionPercentage: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//   },
//   trackButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   trackButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   bottomSpacer: {
//     height: 100,
//   },
// });



// // src/features/projects/styles/DietProjectDetailScreenStyles.ts
// import { StyleSheet } from 'react-native';
// import { Theme } from '../../../shared/stores/useThemeStore';

// export const createStyles = (theme: Theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // ✅ UPDATED: Twitter-style Header (matching ReportDetailScreen)
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     height: 56,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//     backgroundColor: theme.colors.background,
//   },
  
//   // ✅ UPDATED: Back button with only arrow (Twitter style)
//   backButton: {
//     padding: 8,
//     marginLeft: -8, // Compensate for padding to align with Twitter style
//   },
  
//   // ✅ UPDATED: Back arrow (no text, just arrow)
//   backArrow: {
//     fontSize: 24,
//     fontWeight: '400',
//   },
  
//   // ✅ UPDATED: Header title container for centered title
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
  
//   headerSpacer: {
//     width: 40, // Same width as back button for balance
//   },
  
//   content: {
//     flex: 1,
//   },
  
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   // Overview Card
//   overviewCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
  
//   projectTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: theme.colors.text.primary,
//   },
  
//   projectMetaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
  
//   metaItem: {
//     alignItems: 'center',
//   },
  
//   metaLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//   },
  
//   metaValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//   },
  
//   progressBarContainer: {
//     marginVertical: 16,
//   },
  
//   progressBar: {
//     height: 8,
//     backgroundColor: theme.colors.border,
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginBottom: 8,
//   },
  
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
  
//   progressText: {
//     textAlign: 'center',
//     color: theme.colors.text.secondary,
//   },
  
//   targetsContainer: {
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: theme.colors.border,
//   },
  
//   targetsTitle: {
//     marginBottom: 12,
//     color: theme.colors.text.primary,
//   },
  
//   targetsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
  
//   targetItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   targetLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//   },
  
//   targetValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//   },
  
//   daysSection: {
//     paddingHorizontal: 16,
//   },
  
//   sectionTitle: {
//     marginBottom: 16,
//     color: theme.colors.text.primary,
//   },
  
//   // ✅ UPDATED: Day Card (no orange side border, matches workout history reports)
//   dayCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     // ✅ REMOVED: borderLeftWidth and borderLeftColor (no orange side)
//     // Shadow for depth (like workout history cards)
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
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
  
//   dayName: {
//     color: theme.colors.text.primary,
//     marginBottom: 4,
//   },
  
//   dayDate: {
//     color: theme.colors.text.secondary,
//     marginBottom: 8,
//   },
  
//   badgeContainer: {
//     flexDirection: 'row',
//   },
  
//   todayBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
  
//   todayText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//   },
  
//   missedBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
  
//   missedText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//   },
  
//   dayStatus: {
//     alignItems: 'flex-end',
//   },
  
//   completedText: {
//     fontWeight: '600',
//   },
  
//   inProgressText: {
//     color: theme.colors.text.secondary,
//   },
  
//   nutritionSummary: {
//     backgroundColor: `${theme.colors.primary}10`,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
  
//   nutritionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
  
//   nutritionItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
  
//   nutritionLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//     fontSize: 11,
//   },
  
//   nutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 14,
//   },
  
//   nutritionPercentage: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//   },
  
//   // ✅ NEW: Day Footer for bottom-right button (like ProjectHomeScreen)
//   dayFooter: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
  
//   footerSpacer: {
//     flex: 1,
//   },
  
//   // ✅ UPDATED: Track Button (now "View Details →" bottom-right)
//   trackButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     // Align to right like ProjectHomeScreen
//   },
  
//   trackButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
  
//   bottomSpacer: {
//     height: 100,
//   },
// });

// src/features/projects/styles/DietProjectDetailScreenStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../../../shared/stores/useThemeStore';

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Header matching ReportDetailScreen (Twitter style)
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
  
  backArrow: {
    fontSize: 24,
    fontWeight: '400',
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
  },
  
  headerSpacer: {
    width: 40,
  },
  
  content: {
    flex: 1,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Overview Card
  overviewCard: {
    margin: 16,
    padding: 20,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.text.primary,
  },
  
  projectMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  metaItem: {
    alignItems: 'center',
  },
  
  metaLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  
  metaValue: {
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  
  progressBarContainer: {
    marginVertical: 16,
  },
  
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  
  progressText: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
  
  targetsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  
  targetsTitle: {
    marginBottom: 12,
    color: theme.colors.text.primary,
  },
  
  targetsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  targetItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  targetLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  
  targetValue: {
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  
  daysSection: {
    paddingHorizontal: 16,
  },
  
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.text.primary,
  },
  
  // Day Card
  dayCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
  
  dayName: {
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  
  dayDate: {
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  
  badgeContainer: {
    flexDirection: 'row',
  },
  
  todayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  
  todayText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  
  missedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  
  missedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  
  // ✅ NEW: Completed Badge (like Today's Progress card)
  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#10B981',
  },
  
  completedBadgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 11,
  },
  
  // ✅ UPDATED: Nutrition Summary in ONE ROW
  nutritionSummary: {
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  nutritionLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
    fontSize: 11,
  },
  
  nutritionValue: {
    fontWeight: '600',
    color: theme.colors.text.primary,
    fontSize: 14,
  },
  
  nutritionPercentage: {
    color: theme.colors.text.secondary,
    fontSize: 11,
  },
  
  // ✅ UPDATED: Day Footer (EXACTLY like ProjectHomeScreen)
  dayFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.border}30`,
  },
  
  dayStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  
  // ✅ UPDATED: View Details Button (NO container, just text like ProjectHomeScreen)
  viewDetailsButton: {
    paddingVertical: 4,
  },
  
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  bottomSpacer: {
    height: 100,
  },
});