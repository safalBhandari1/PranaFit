
// // src/features/home/styles/homeReportsStyles.ts
// import { StyleSheet } from 'react-native';

// export const createReportsStyles = (theme: any) => StyleSheet.create({
//   // Container Styles
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // Loading States
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     fontWeight: '500',
//   },
  
//   // Empty State
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 80,
//     paddingHorizontal: 16,
//   },
//   emptyTitle: {
//     marginBottom: 8,
//     fontWeight: '700',
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     lineHeight: 22,
//     fontWeight: '400',
//     paddingHorizontal: 32,
//   },
  
//   // Spacer between carousel and content
//   spacer: {
//     height: 20, // Add 20px padding between carousel and workout history
//   },
  
//   // Section Header
//   sectionHeader: {
//     marginBottom: 16,
//     paddingHorizontal: 16,
//   },
//   workoutCount: {
//     marginTop: 4,
//     fontSize: 14,
//     color: theme.colors.text.secondary,
//   },
  
//   // Cards Container
//   cardsContainer: {
//     paddingHorizontal: 16,
//   },
  
//   // Card Container - 140px height
//   cardContainer: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     minHeight: 140,
//     maxHeight: 140,
    
//     // Shadow for depth
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
    
//     // Flex layout
//     justifyContent: 'space-between',
//     backgroundColor: theme.colors.card,
//   },
  
//   // Top Row: Workout Type + Time/Date
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 8,
//   },
  
//   // Left Top
//   leftTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   workoutEmoji: {
//     marginRight: 8,
//   },
//   workoutType: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
  
//   // Right Top
//   rightTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   workoutTime: {
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'right',
//     marginRight: 8,
//   },
//   workoutDate: {
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'right',
//     marginRight: 4,
//   },
//   arrowIcon: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginLeft: 2,
//   },
  
//   // Subtitle with spacing
//   workoutSubtitle: {
//     fontSize: 13,
//     fontWeight: '500',
//     marginBottom: 12,
//   },
  
//   // Stats Row - ALL 4 STATS + BAR GRAPH IN ONE ROW
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     flex: 1,
//   },
  
//   // Stats Container - Compact layout for 4 items with dividers
//   statsContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     marginRight: 12,
//   },
  
//   // Stat Item - NO SPACING between items, only 4px padding around divider
//   statItem: {
//     alignItems: 'center',
//     paddingHorizontal: 4, // 4px on left and right of divider
//   },
  
//   // Vertical Divider between stats
//   verticalDivider: {
//     width: 1,
//     height: '70%', // 70% of stat item height
//     opacity: 0.3,
//   },
  
//   // Stat Label - Small size
//   statLabel: {
//     fontSize: 10,
//     fontWeight: '600',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.3,
//   },
  
//   // Stat Value - Small size
//   statValue: {
//     fontSize: 14,
//     fontWeight: '700',
//   },
  
//   // Bar Graph Container
//   barGraphContainer: {
//     width: 60,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingBottom: 2,
//   },
  
//   // Bar Graph
//   barGraph: {
//     width: 40,
//     height: 40,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//   },
  
//   // Individual bar
//   bar: {
//     width: 6,
//     borderRadius: 2,
//     minHeight: 4,
//   },
  
//   // Bottom Spacer
//   bottomSpacer: {
//     height: 20,
//   },
// });

// // src/features/home/styles/homeReportsStyles.ts
// import { StyleSheet } from 'react-native';

// export const createReportsStyles = (theme: any) => StyleSheet.create({
//   // Container Styles
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // Loading States
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     fontWeight: '500',
//   },
  
//   // Empty State
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 80,
//     paddingHorizontal: 16,
//   },
//   emptyTitle: {
//     marginBottom: 8,
//     fontWeight: '700',
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     lineHeight: 22,
//     fontWeight: '400',
//     paddingHorizontal: 32,
//   },
  
//   // Section Header
//   sectionHeader: {
//     marginBottom: 16,
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },
//   workoutCount: {
//     marginTop: 4,
//     fontSize: 14,
//     color: theme.colors.text.secondary,
//   },
  
//   // Cards Container
//   cardsContainer: {
//     paddingHorizontal: 16,
//   },
  
//   // Card Container - 140px height with light orange background
//   cardContainer: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     minHeight: 140,
//     maxHeight: 140,
    
//     // Shadow for depth
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
    
//     // Flex layout
//     justifyContent: 'space-between',
//   },
  
//   // Top Row: Workout Type + Time/Date
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 8,
//   },
  
//   // Left Top
//   leftTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   workoutEmoji: {
//     marginRight: 8,
//   },
//   workoutType: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
  
//   // Right Top
//   rightTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   workoutTime: {
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'right',
//     marginRight: 8,
//   },
//   workoutDate: {
//     fontSize: 13,
//     fontWeight: '500',
//     textAlign: 'right',
//     marginRight: 4,
//   },
//   arrowIcon: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginLeft: 2,
//   },
  
//   // Subtitle with spacing
//   workoutSubtitle: {
//     fontSize: 13,
//     fontWeight: '500',
//     marginBottom: 12,
//   },
  
//   // Stats Row - ALL 4 STATS + BAR GRAPH IN ONE ROW
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     flex: 1,
//   },
  
//   // Stats Container - Compact layout for 4 items with dividers
//   statsContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     marginRight: 12,
//   },
  
//   // Stat Item - NO SPACING between items, only 4px padding around divider
//   statItem: {
//     alignItems: 'center',
//     paddingHorizontal: 4, // 4px on left and right of divider
//   },
  
//   // Vertical Divider between stats
//   verticalDivider: {
//     width: 1,
//     height: '70%', // 70% of stat item height
//     opacity: 0.3,
//   },
  
//   // Stat Label - Small size
//   statLabel: {
//     fontSize: 10,
//     fontWeight: '600',
//     marginBottom: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.3,
//   },
  
//   // Stat Value - INCREASED SIZE TO 18 (was 14)
//   statValue: {
//     fontSize: 18, // Increased from 14 to 18
//     fontWeight: '700',
//   },
  
//   // Bar Graph Container
//   barGraphContainer: {
//     width: 60,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingBottom: 2,
//   },
  
//   // Bar Graph
//   barGraph: {
//     width: 40,
//     height: 40,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//   },
  
//   // Individual bar
//   bar: {
//     width: 6,
//     borderRadius: 2,
//     minHeight: 4,
//   },
  
//   // Bottom Spacer
//   bottomSpacer: {
//     height: 20,
//   },
// });

// src/features/home/styles/homeReportsStyles.ts
import { StyleSheet } from 'react-native';

export const createReportsStyles = (theme: any) => StyleSheet.create({
  // Container Styles
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Loading States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 16,
  },
  emptyTitle: {
    marginBottom: 8,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    paddingHorizontal: 32,
  },
  
  // Section Header
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  workoutCount: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  
  // Cards Container
  cardsContainer: {
    paddingHorizontal: 16,
  },
  
  // Card Container - 140px height with WHITE background (was light orange)
  cardContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    minHeight: 140,
    maxHeight: 140,
    backgroundColor: theme.colors.card, // CHANGED: Now uses theme card color (white)
    
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
    // Flex layout
    justifyContent: 'space-between',
  },
  
  // Top Row: Workout Type + Time/Date
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  // Left Top
  leftTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workoutEmoji: {
    marginRight: 8,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: '700',
  },
  
  // Right Top
  rightTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutTime: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 8,
  },
  workoutDate: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 4,
  },
  arrowIcon: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 2,
  },
  
  // Subtitle with spacing
  workoutSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
  },
  
  // Stats Row - ALL 4 STATS + BAR GRAPH IN ONE ROW
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  
  // Stats Container - Compact layout for 4 items with dividers
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 12,
  },
  
  // Stat Item - NO SPACING between items, only 4px padding around divider
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 4, // 4px on left and right of divider
  },
  
  // Vertical Divider between stats
  verticalDivider: {
    width: 1,
    height: '70%', // 70% of stat item height
    opacity: 0.3,
  },
  
  // Stat Label - Small size
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  
  // Stat Value - INCREASED SIZE TO 18 (was 14)
  statValue: {
    fontSize: 18, // Increased from 14 to 18
    fontWeight: '700',
  },
  
  // Bar Graph Container - LIMITED HEIGHT to not cover date
  barGraphContainer: {
    width: 60,
    height: 45, // CHANGED: Limited height
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  
  // Bar Graph - LIMITED HEIGHT
  barGraph: {
    width: 40,
    height: 36, // CHANGED: Reduced height
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  
  // Individual bar - MAX HEIGHT LIMITED
  bar: {
    width: 9,
    borderRadius: 3,
    minHeight: 4,
    maxHeight: 30, // CHANGED: Maximum height limit
  },
  
  // Bottom Spacer
  bottomSpacer: {
    height: 20,
  },
});