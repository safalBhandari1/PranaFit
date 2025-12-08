
// import { StyleSheet } from 'react-native';

// export const createProgressStyles = (theme: any) => StyleSheet.create({
//   // Existing styles
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   emptyTitle: {
//     marginBottom: 8,
//   },
//   emptyText: {
//     fontSize: 14,
//     textAlign: 'center',
//     paddingHorizontal: 32,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginHorizontal: -4,
//   },
//   statCard: {
//     width: '48%',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   metricCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   metricRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: `${theme.colors.border}30`,
//   },
//   metricLabel: {
//     fontSize: 14,
//   },
//   metricValue: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   insightsCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   insightItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   insightEmoji: {
//     fontSize: 20,
//     marginRight: 12,
//   },
//   insightText: {
//     flex: 1,
//     fontSize: 14,
//     lineHeight: 20,
//   },

//   // 🚀 NEW: Toggle styles
//   toggleContainer: {
//     flexDirection: 'row',
//     backgroundColor: `${theme.colors.card}80`,
//     borderRadius: 12,
//     padding: 4,
//     marginBottom: 24,
//   },
//   toggleButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   activeToggleButton: {
//     backgroundColor: theme.colors.primary,
//   },
//   toggleText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: theme.colors.text.secondary,
//   },
//   activeToggleText: {
//     color: '#FFFFFF',
//   },

//   // 🚀 NEW: Progress score
//   progressScoreCard: {
//     borderRadius: 12,
//     padding: 20,
//   },
//   progressScoreLabel: {
//     fontSize: 14,
//     marginTop: 4,
//     marginBottom: 8,
//   },
//   progressScoreValue: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: `${theme.colors.border}50`,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   progressInsight: {
//     fontSize: 12,
//     fontStyle: 'italic',
//   },

//   // 🚀 NEW: Distribution styles
//   distributionCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   distributionItem: {
//     marginBottom: 16,
//   },
//   distributionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   distributionBar: {
//     height: 6,
//     backgroundColor: `${theme.colors.border}30`,
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   distributionBarFill: {
//     height: '100%',
//     borderRadius: 3,
//   },
//   distributionCount: {
//     fontSize: 11,
//     marginTop: 4,
//   },

//   // 🚀 NEW: Volume progression styles
//   volumeCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   volumeItem: {
//     marginBottom: 20,
//   },
//   volumeHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   trendBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   trendText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   volumeStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   volumeStat: {
//     alignItems: 'flex-start',
//   },
//   volumeLabel: {
//     fontSize: 11,
//     marginBottom: 2,
//   },
//   volumeValue: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   progressionBar: {
//     height: 6,
//     backgroundColor: `${theme.colors.border}30`,
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   progressionFill: {
//     height: '100%',
//     borderRadius: 3,
//   },

//   // 🚀 NEW: Weekly pattern styles
//   weeklyCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   weeklyGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   weeklyDay: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   weeklyDayLabel: {
//     fontSize: 12,
//     marginBottom: 8,
//   },
//   weeklyBarContainer: {
//     height: 60,
//     justifyContent: 'flex-end',
//   },
//   weeklyBar: {
//     width: 16,
//     borderRadius: 4,
//   },
//   weeklyCount: {
//     fontSize: 12,
//     fontWeight: '600',
//     marginTop: 4,
//   },
//   weeklyInsight: {
//     marginTop: 16,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: `${theme.colors.border}30`,
//   },
//   insightText: {
//     fontSize: 12,
//     fontStyle: 'italic',
//   },

//   // 🚀 NEW: Personal records styles
//   prCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   prItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: `${theme.colors.border}30`,
//   },
//   prInfo: {
//     flex: 1,
//   },
//   prDate: {
//     fontSize: 11,
//     marginTop: 2,
//   },
//   prValue: {
//     alignItems: 'flex-end',
//   },
//   prNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   prType: {
//     fontSize: 11,
//     marginTop: 2,
//   },

//   // 🚀 NEW: Volume metrics styles
//   volumeMetricsCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   volumeMetricRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   volumeMetric: {
//     alignItems: 'flex-start',
//   },
//   volumeMetricLabel: {
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   volumeMetricValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   volumeDate: {
//     fontSize: 11,
//     marginTop: 12,
//   },

//   // 🚀 NEW: 1RM styles
//   oneRmCard: {
//     borderRadius: 12,
//     padding: 16,
//   },
//   oneRmItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: `${theme.colors.border}30`,
//   },
// });

// export default createProgressStyles;

// src/features/home/styles/homeProgressStyles.ts
import { StyleSheet } from 'react-native';

export const createProgressStyles = (theme: any) => StyleSheet.create({
  // Existing styles
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  section: {
    marginBottom: 24,
  },
  
  // 🚀 UPDATED: Stats grid with 3 columns per row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    width: '31%', // 3 cards per row with small gaps
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    // Shadow for card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  
  // 🚀 REMOVED: Toggle styles (no longer needed)
  // toggleContainer, toggleButton, activeToggleButton, toggleText, activeToggleText
  
  // 🚀 REMOVED: Progress score card styles (moved to stat card)
  // progressScoreCard, progressScoreLabel, progressScoreValue, progressBar, progressFill, progressInsight
  
  // Distribution styles (updated for compactness)
  distributionCard: {
    borderRadius: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  distributionItem: {
    marginBottom: 12,
  },
  distributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  distributionBar: {
    height: 6,
    backgroundColor: `${theme.colors.border}30`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  distributionBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  distributionCount: {
    fontSize: 10,
    marginTop: 4,
  },

  // Volume progression styles (kept but not used in this version)
  volumeCard: {
    borderRadius: 12,
    padding: 16,
  },
  volumeItem: {
    marginBottom: 20,
  },
  volumeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  volumeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  volumeStat: {
    alignItems: 'flex-start',
  },
  volumeLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  volumeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressionBar: {
    height: 6,
    backgroundColor: `${theme.colors.border}30`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressionFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Weekly pattern styles (updated for compactness)
  weeklyCard: {
    borderRadius: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weeklyDay: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyDayLabel: {
    fontSize: 11,
    marginBottom: 6,
    fontWeight: '600',
  },
  weeklyBarContainer: {
    height: 40,
    justifyContent: 'flex-end',
  },
  weeklyBar: {
    width: 12,
    borderRadius: 3,
  },
  weeklyCount: {
    marginTop: 4,
  },
  weeklyInsight: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.border}30`,
  },

  // Personal records styles (updated for compactness)
  prCard: {
    borderRadius: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  prItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.border}30`,
  },
  prInfo: {
    flex: 1,
  },
  prDate: {
    fontSize: 10,
    marginTop: 2,
  },
  prValue: {
    alignItems: 'flex-end',
  },
  prNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  prType: {
    fontSize: 10,
    marginTop: 2,
  },

  // Volume metrics styles (updated for compactness)
  volumeMetricsCard: {
    borderRadius: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  volumeMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volumeMetric: {
    alignItems: 'flex-start',
  },
  volumeMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  volumeMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  volumeDate: {
    fontSize: 10,
    marginTop: 12,
    fontStyle: 'italic',
  },

  // 1RM styles (updated for compactness)
  oneRmCard: {
    borderRadius: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  oneRmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.border}30`,
  },

  // Insights card styles
  insightsCard: {
    borderRadius: 12,
    padding: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  insightEmoji: {
    fontSize: 18,
    marginRight: 10,
    marginTop: 1,
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },

  // REMOVED: metricCard, metricRow, metricLabel, metricValue (Performance Metrics removed)
});

export default createProgressStyles;