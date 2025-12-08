// // src/features/home/components/HomeProgressTab.tsx
// import React, { useEffect } from 'react';
// import { View, ActivityIndicator, ScrollView } from 'react-native';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { WorkoutStats } from '../../workout/types/workout';
// import { createProgressStyles } from '../styles/homeProgressStyles';
// import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { EnhancedWorkoutStats } from '../../../shared/types/domain/analytics';

// interface HomeProgressTabProps {
//   stats: WorkoutStats | null;
//   isLoading: boolean;
//   theme: any;
// }

// const HomeProgressTab: React.FC<HomeProgressTabProps> = ({
//   stats,
//   isLoading,
//   theme
// }) => {
//   const { user } = useAppStore();
//   const { enhancedStats, isEnhancedStatsLoading, loadEnhancedWorkoutStats } = useWorkoutStore();
//   const styles = createProgressStyles(theme);

//   // Load enhanced stats when component mounts
//   useEffect(() => {
//     if (user?.uid) {
//       loadEnhancedWorkoutStats(user.uid);
//     }
//   }, [user?.uid]);

//   if (isLoading || isEnhancedStatsLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//         <ThemeText style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
//           Loading your progress...
//         </ThemeText>
//       </View>
//     );
//   }

//   if (!stats) {
//     return (
//       <View style={styles.emptyContainer}>
//         <ThemeText variant="h3" style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
//           No progress data yet
//         </ThemeText>
//         <ThemeText style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
//           Complete a few workouts to see your analytics here!
//         </ThemeText>
//       </View>
//     );
//   }

//   const enhancedStatsData = enhancedStats as EnhancedWorkoutStats;

//   // Render workout type distribution as progress bars
//   const renderWorkoutTypeDistribution = () => {
//     if (!enhancedStatsData?.workoutTypeDistribution || enhancedStatsData.workoutTypeDistribution.length === 0) {
//       return null;
//     }

//     return (
//       <View style={styles.section}>
//         <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//           Workout Types
//         </ThemeText>
//         <View style={[styles.distributionCard, { backgroundColor: theme.colors.card }]}>
//           {enhancedStatsData.workoutTypeDistribution.slice(0, 5).map((type, index) => (
//             <View key={index} style={styles.distributionItem}>
//               <View style={styles.distributionHeader}>
//                 <ThemeText style={{ color: theme.colors.text.primary, flex: 1, fontSize: 14 }}>
//                   {type.type}
//                 </ThemeText>
//                 <ThemeText style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 14 }}>
//                   {type.percentage}%
//                 </ThemeText>
//               </View>
//               <View style={styles.distributionBar}>
//                 <View 
//                   style={[
//                     styles.distributionBarFill, 
//                     { 
//                       width: `${type.percentage}%`,
//                       backgroundColor: getWorkoutTypeColor(type.type.toLowerCase())
//                     }
//                   ]} 
//                 />
//               </View>
//               <ThemeText style={[styles.distributionCount, { color: theme.colors.text.secondary }]}>
//                 {type.count} {type.count === 1 ? 'workout' : 'workouts'}
//               </ThemeText>
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   // Render personal records
//   const renderPersonalRecords = () => {
//     if (!enhancedStatsData?.personalRecords || enhancedStatsData.personalRecords.length === 0) {
//       return null;
//     }

//     return (
//       <View style={styles.section}>
//         <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//           Personal Records
//         </ThemeText>
//         <View style={[styles.prCard, { backgroundColor: theme.colors.card }]}>
//           {enhancedStatsData.personalRecords.slice(0, 3).map((record, index) => (
//             <View key={record.id || index} style={styles.prItem}>
//               <View style={styles.prInfo}>
//                 <ThemeText style={{ color: theme.colors.text.primary, fontWeight: '500', fontSize: 14 }}>
//                   {record.exerciseName}
//                 </ThemeText>
//                 <ThemeText style={[styles.prDate, { color: theme.colors.text.secondary }]}>
//                   {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                 </ThemeText>
//               </View>
              
//               <View style={styles.prValue}>
//                 <ThemeText style={[styles.prNumber, { color: theme.colors.primary }]}>
//                   {record.value} {getRecordUnit(record.recordType)}
//                 </ThemeText>
//                 <ThemeText style={[styles.prType, { color: theme.colors.text.secondary }]}>
//                   {record.recordType.charAt(0).toUpperCase() + record.recordType.slice(1)}
//                 </ThemeText>
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   // Render weekly pattern as bars
//   const renderWeeklyPattern = () => {
//     if (!enhancedStatsData?.weeklyPattern || enhancedStatsData.weeklyPattern.length === 0) {
//       return null;
//     }

//     const maxWorkouts = Math.max(...enhancedStatsData.weeklyPattern.map(day => day.workoutCount));
    
//     return (
//       <View style={styles.section}>
//         <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//           Weekly Workout Pattern
//         </ThemeText>
//         <View style={[styles.weeklyCard, { backgroundColor: theme.colors.card }]}>
//           <View style={styles.weeklyGrid}>
//             {enhancedStatsData.weeklyPattern.map((day, index) => (
//               <View key={index} style={styles.weeklyDay}>
//                 <ThemeText style={[styles.weeklyDayLabel, { color: theme.colors.text.secondary }]}>
//                   {day.day.charAt(0)}
//                 </ThemeText>
                
//                 <View style={styles.weeklyBarContainer}>
//                   <View 
//                     style={[
//                       styles.weeklyBar,
//                       { 
//                         height: `${maxWorkouts > 0 ? (day.workoutCount / maxWorkouts) * 40 : 0}%`,
//                         backgroundColor: day.workoutCount > 0 ? theme.colors.primary : `${theme.colors.border}30`
//                       }
//                     ]} 
//                   />
//                 </View>
                
//                 <ThemeText style={[
//                   styles.weeklyCount,
//                   { 
//                     color: day.workoutCount > 0 ? theme.colors.primary : theme.colors.text.secondary,
//                     fontSize: 12,
//                     fontWeight: day.workoutCount > 0 ? '600' : '400'
//                   }
//                 ]}>
//                   {day.workoutCount}
//                 </ThemeText>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     );
//   };

//   // Helper functions
//   const getWorkoutTypeColor = (type: string): string => {
//     const colors: Record<string, string> = {
//       gym: '#FF6B35',
//       calisthenics: '#4ECDC4',
//       yoga: '#8B5CF6',
//       running: '#45B7D1',
//       cycling: '#96CEB4',
//       walking: '#A593E0',
//       elliptical: '#FFA5A5',
//       jumba: '#FF6BC9',
//       mixed: '#F59E0B'
//     };
//     return colors[type] || theme.colors.primary;
//   };

//   const getRecordUnit = (type: string): string => {
//     switch (type) {
//       case 'time': return 'min';
//       case 'distance': return 'km';
//       case 'weight':
//       case 'volume': return 'kg';
//       case 'reps': return 'reps';
//       default: return '';
//     }
//   };

//   // Calculate two additional stats
//   const getAdditionalStats = () => {
//     if (!enhancedStatsData) return [];
    
//     return [
//       {
//         label: 'Progress Score',
//         value: `${enhancedStatsData.progressScore}/100`,
//         color: enhancedStatsData.progressScore > 70 ? '#10B981' : 
//                enhancedStatsData.progressScore > 40 ? '#F59E0B' : '#EF4444'
//       },
//       {
//         label: 'Avg. Volume',
//         value: enhancedStatsData.averageVolumePerWorkout > 0 ? 
//                `${Math.round(enhancedStatsData.averageVolumePerWorkout)}kg` : 'N/A',
//         color: theme.colors.primary
//       }
//     ];
//   };

//   const additionalStats = getAdditionalStats();

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* Progress Overview Section - 6 Stats (3 per row) */}
//       <View style={styles.section}>
//         <ThemeText variant="h2" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//           Progress Overview
//         </ThemeText>

//         {/* First Row of Stats */}
//         <View style={styles.statsRow}>
//           {/* Total Workouts */}
//           <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
//             <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
//               {stats.totalWorkouts}
//             </ThemeText>
//             <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
//               Total Workouts
//             </ThemeText>
//           </View>

//           {/* This Week */}
//           <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
//             <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
//               {stats.workoutsThisWeek}
//             </ThemeText>
//             <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
//               This Week
//             </ThemeText>
//           </View>

//           {/* Day Streak */}
//           <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
//             <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
//               {stats.currentStreak}
//             </ThemeText>
//             <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
//               Day Streak
//             </ThemeText>
//           </View>
//         </View>

//         {/* Second Row of Stats */}
//         <View style={styles.statsRow}>
//           {/* Consistency */}
//           <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
//             <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
//               {Math.round(stats.consistency)}%
//             </ThemeText>
//             <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
//               Consistency
//             </ThemeText>
//           </View>

//           {/* Progress Score (from enhanced stats) */}
//           <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
//             <ThemeText style={[styles.statNumber, { color: additionalStats[0]?.color || theme.colors.primary }]}>
//               {additionalStats[0]?.value || '0/100'}
//             </ThemeText>
//             <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
//               {additionalStats[0]?.label || 'Progress Score'}
//             </ThemeText>
//           </View>

//           {/* Average Volume (from enhanced stats) */}
//           <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
//             <ThemeText style={[styles.statNumber, { color: additionalStats[1]?.color || theme.colors.primary }]}>
//               {additionalStats[1]?.value || 'N/A'}
//             </ThemeText>
//             <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
//               {additionalStats[1]?.label || 'Avg Volume'}
//             </ThemeText>
//           </View>
//         </View>
//       </View>

//       {/* Quick Insights */}
//       <View style={styles.section}>
//         <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//           Quick Insights
//         </ThemeText>

//         <View style={[styles.insightsCard, { backgroundColor: theme.colors.card }]}>
//           {stats.workoutsThisWeek > 3 && (
//             <View style={styles.insightItem}>
//               <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>🔥</ThemeText>
//               <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
//                 Great week! You're on fire with {stats.workoutsThisWeek} workouts.
//               </ThemeText>
//             </View>
//           )}

//           {stats.currentStreak > 0 && (
//             <View style={styles.insightItem}>
//               <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>⚡</ThemeText>
//               <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
//                 Amazing {stats.currentStreak}-day streak! Keep it up.
//               </ThemeText>
//             </View>
//           )}

//           {stats.consistency > 70 && (
//             <View style={styles.insightItem}>
//               <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>🎯</ThemeText>
//               <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
//                 Excellent {Math.round(stats.consistency)}% consistency rate.
//               </ThemeText>
//             </View>
//           )}

//           {stats.favoriteWorkoutType && (
//             <View style={styles.insightItem}>
//               <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>💪</ThemeText>
//               <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
//                 Your favorite activity is {stats.favoriteWorkoutType}.
//               </ThemeText>
//             </View>
//           )}

//           {enhancedStatsData?.progressScore > 70 && (
//             <View style={styles.insightItem}>
//               <ThemeText style={[styles.insightEmoji, { color: '#10B981' }]}>🏆</ThemeText>
//               <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
//                 Excellent progress score of {enhancedStatsData.progressScore}!
//               </ThemeText>
//             </View>
//           )}
//         </View>
//       </View>

//       {/* Enhanced Analytics Sections */}
      
//       {/* Weekly Workout Pattern */}
//       {renderWeeklyPattern()}

//       {/* Workout Type Distribution */}
//       {renderWorkoutTypeDistribution()}

//       {/* Personal Records */}
//       {renderPersonalRecords()}

//       {/* Volume Performance */}
//       {enhancedStatsData?.averageVolumePerWorkout > 0 && (
//         <View style={styles.section}>
//           <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//             Volume Performance
//           </ThemeText>
//           <View style={[styles.volumeMetricsCard, { backgroundColor: theme.colors.card }]}>
//             <View style={styles.volumeMetricRow}>
//               <View style={styles.volumeMetric}>
//                 <ThemeText style={[styles.volumeMetricLabel, { color: theme.colors.text.secondary }]}>
//                   Average Volume
//                 </ThemeText>
//                 <ThemeText style={[styles.volumeMetricValue, { color: theme.colors.primary }]}>
//                   {Math.round(enhancedStatsData.averageVolumePerWorkout)} kg
//                 </ThemeText>
//               </View>
              
//               <View style={styles.volumeMetric}>
//                 <ThemeText style={[styles.volumeMetricLabel, { color: theme.colors.text.secondary }]}>
//                   Best Volume
//                 </ThemeText>
//                 <ThemeText style={[styles.volumeMetricValue, { color: theme.colors.primary }]}>
//                   {enhancedStatsData.bestVolumeWorkout} kg
//                 </ThemeText>
//               </View>
//             </View>
            
//             {enhancedStatsData.bestVolumeDate && (
//               <ThemeText style={[styles.volumeDate, { color: theme.colors.text.secondary }]}>
//                 Best volume achieved on {new Date(enhancedStatsData.bestVolumeDate).toLocaleDateString('en-US', { 
//                   month: 'short', 
//                   day: 'numeric'
//                 })}
//               </ThemeText>
//             )}
//           </View>
//         </View>
//       )}

//       {/* Estimated 1RM */}
//       {enhancedStatsData?.estimated1RM && enhancedStatsData.estimated1RM.length > 0 && (
//         <View style={styles.section}>
//           <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
//             Estimated 1-Rep Max
//           </ThemeText>
//           <View style={[styles.oneRmCard, { backgroundColor: theme.colors.card }]}>
//             {enhancedStatsData.estimated1RM.slice(0, 3).map((exercise, index) => (
//               <View key={index} style={styles.oneRmItem}>
//                 <ThemeText style={{ color: theme.colors.text.primary, flex: 1, fontSize: 14 }}>
//                   {exercise.exercise}
//                 </ThemeText>
//                 <ThemeText style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 14 }}>
//                   {Math.round(exercise.estimated1RM)} kg
//                 </ThemeText>
//               </View>
//             ))}
//           </View>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default HomeProgressTab;

// src/features/home/components/HomeProgressTab.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { WorkoutStats } from '../../workout/types/workout';
import { createProgressStyles } from '../styles/homeProgressStyles';
import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { EnhancedWorkoutStats } from '../../../shared/types/domain/analytics';

interface HomeProgressTabProps {
  stats: WorkoutStats | null;
  isLoading: boolean;
  theme: any;
}

const HomeProgressTab: React.FC<HomeProgressTabProps> = ({
  stats,
  isLoading,
  theme
}) => {
  const { user } = useAppStore();
  const { enhancedStats, isEnhancedStatsLoading, loadEnhancedWorkoutStats } = useWorkoutStore();
  const styles = createProgressStyles(theme);

  // Load enhanced stats when component mounts
  useEffect(() => {
    if (user?.uid) {
      loadEnhancedWorkoutStats(user.uid);
    }
  }, [user?.uid]);

  if (isLoading || isEnhancedStatsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemeText style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
          Loading your progress...
        </ThemeText>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.emptyContainer}>
        <ThemeText variant="h3" style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
          No progress data yet
        </ThemeText>
        <ThemeText style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
          Complete a few workouts to see your analytics here!
        </ThemeText>
      </View>
    );
  }

  const enhancedStatsData = enhancedStats as EnhancedWorkoutStats;

  // Render workout type distribution as progress bars
  const renderWorkoutTypeDistribution = () => {
    if (!enhancedStatsData?.workoutTypeDistribution || enhancedStatsData.workoutTypeDistribution.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Workout Types
        </ThemeText>
        <View style={[styles.distributionCard, { backgroundColor: theme.colors.card }]}>
          {enhancedStatsData.workoutTypeDistribution.slice(0, 5).map((type, index) => (
            <View key={index} style={styles.distributionItem}>
              <View style={styles.distributionHeader}>
                <ThemeText style={{ color: theme.colors.text.primary, flex: 1, fontSize: 14 }}>
                  {type.type}
                </ThemeText>
                <ThemeText style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 14 }}>
                  {type.percentage}%
                </ThemeText>
              </View>
              <View style={styles.distributionBar}>
                <View 
                  style={[
                    styles.distributionBarFill, 
                    { 
                      width: `${type.percentage}%`,
                      backgroundColor: getWorkoutTypeColor(type.type.toLowerCase())
                    }
                  ]} 
                />
              </View>
              <ThemeText style={[styles.distributionCount, { color: theme.colors.text.secondary }]}>
                {type.count} {type.count === 1 ? 'workout' : 'workouts'}
              </ThemeText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render personal records
  const renderPersonalRecords = () => {
    if (!enhancedStatsData?.personalRecords || enhancedStatsData.personalRecords.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Personal Records
        </ThemeText>
        <View style={[styles.prCard, { backgroundColor: theme.colors.card }]}>
          {enhancedStatsData.personalRecords.slice(0, 3).map((record, index) => (
            <View key={record.id || index} style={styles.prItem}>
              <View style={styles.prInfo}>
                <ThemeText style={{ color: theme.colors.text.primary, fontWeight: '500', fontSize: 14 }}>
                  {record.exerciseName}
                </ThemeText>
                <ThemeText style={[styles.prDate, { color: theme.colors.text.secondary }]}>
                  {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </ThemeText>
              </View>
              
              <View style={styles.prValue}>
                <ThemeText style={[styles.prNumber, { color: theme.colors.primary }]}>
                  {record.value} {getRecordUnit(record.recordType)}
                </ThemeText>
                <ThemeText style={[styles.prType, { color: theme.colors.text.secondary }]}>
                  {record.recordType.charAt(0).toUpperCase() + record.recordType.slice(1)}
                </ThemeText>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render weekly pattern as bars - UPDATED HEIGHT CALCULATION
  const renderWeeklyPattern = () => {
    if (!enhancedStatsData?.weeklyPattern || enhancedStatsData.weeklyPattern.length === 0) {
      return null;
    }

    // Calculate bar height - max height achieved when workout count is 4 or more
    const calculateBarHeight = (workoutCount: number): number => {
      // Max height is 40% (from your existing code), achieved at 4+ workouts
      const maxHeight = 40;
      if (workoutCount >= 4) {
        return maxHeight;
      }
      // Scale proportionally for 0-3 workouts
      return (workoutCount / 4) * maxHeight;
    };
    
    return (
      <View style={styles.section}>
        <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Weekly Workout Pattern
        </ThemeText>
        <View style={[styles.weeklyCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.weeklyGrid}>
            {enhancedStatsData.weeklyPattern.map((day, index) => {
              const barHeight = calculateBarHeight(day.workoutCount);
              return (
                <View key={index} style={styles.weeklyDay}>
                  <ThemeText style={[styles.weeklyDayLabel, { color: theme.colors.text.secondary }]}>
                    {day.day.charAt(0)}
                  </ThemeText>
                  
                  <View style={styles.weeklyBarContainer}>
                    <View 
                      style={[
                        styles.weeklyBar,
                        { 
                          height: `${barHeight}%`,
                          backgroundColor: day.workoutCount > 0 ? theme.colors.primary : `${theme.colors.border}30`
                        }
                      ]} 
                    />
                  </View>
                  
                  <ThemeText style={[
                    styles.weeklyCount,
                    { 
                      color: day.workoutCount > 0 ? theme.colors.primary : theme.colors.text.secondary,
                      fontSize: 12,
                      fontWeight: day.workoutCount > 0 ? '600' : '400'
                    }
                  ]}>
                    {day.workoutCount}
                  </ThemeText>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  // Render volume performance
  const renderVolumePerformance = () => {
    if (!enhancedStatsData?.averageVolumePerWorkout || enhancedStatsData.averageVolumePerWorkout <= 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Volume Performance
        </ThemeText>
        <View style={[styles.volumeMetricsCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.volumeMetricRow}>
            <View style={styles.volumeMetric}>
              <ThemeText style={[styles.volumeMetricLabel, { color: theme.colors.text.secondary }]}>
                Average Volume
              </ThemeText>
              <ThemeText style={[styles.volumeMetricValue, { color: theme.colors.primary }]}>
                {Math.round(enhancedStatsData.averageVolumePerWorkout)} kg
              </ThemeText>
            </View>
            
            <View style={styles.volumeMetric}>
              <ThemeText style={[styles.volumeMetricLabel, { color: theme.colors.text.secondary }]}>
                Best Volume
              </ThemeText>
              <ThemeText style={[styles.volumeMetricValue, { color: theme.colors.primary }]}>
                {enhancedStatsData.bestVolumeWorkout} kg
              </ThemeText>
            </View>
          </View>
          
          {enhancedStatsData.bestVolumeDate && (
            <ThemeText style={[styles.volumeDate, { color: theme.colors.text.secondary }]}>
              Best volume achieved on {new Date(enhancedStatsData.bestVolumeDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </ThemeText>
          )}
        </View>
      </View>
    );
  };

  // Render estimated 1RM
  const renderEstimated1RM = () => {
    if (!enhancedStatsData?.estimated1RM || enhancedStatsData.estimated1RM.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Estimated 1-Rep Max
        </ThemeText>
        <View style={[styles.oneRmCard, { backgroundColor: theme.colors.card }]}>
          {enhancedStatsData.estimated1RM.slice(0, 3).map((exercise, index) => (
            <View key={index} style={styles.oneRmItem}>
              <ThemeText style={{ color: theme.colors.text.primary, flex: 1, fontSize: 14 }}>
                {exercise.exercise}
              </ThemeText>
              <ThemeText style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 14 }}>
                {Math.round(exercise.estimated1RM)} kg
              </ThemeText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render quick insights (moved to the bottom)
  const renderQuickInsights = () => {
    const additionalStats = getAdditionalStats();
    
    return (
      <View style={styles.section}>
        <ThemeText variant="h3" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Quick Insights
        </ThemeText>

        <View style={[styles.insightsCard, { backgroundColor: theme.colors.card }]}>
          {stats.workoutsThisWeek > 3 && (
            <View style={styles.insightItem}>
              <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>🔥</ThemeText>
              <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
                Great week! You're on fire with {stats.workoutsThisWeek} workouts.
              </ThemeText>
            </View>
          )}

          {stats.currentStreak > 0 && (
            <View style={styles.insightItem}>
              <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>⚡</ThemeText>
              <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
                Amazing {stats.currentStreak}-day streak! Keep it up.
              </ThemeText>
            </View>
          )}

          {stats.consistency > 70 && (
            <View style={styles.insightItem}>
              <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>🎯</ThemeText>
              <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
                Excellent {Math.round(stats.consistency)}% consistency rate.
              </ThemeText>
            </View>
          )}

          {stats.favoriteWorkoutType && (
            <View style={styles.insightItem}>
              <ThemeText style={[styles.insightEmoji, { color: theme.colors.primary }]}>💪</ThemeText>
              <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
                Your favorite activity is {stats.favoriteWorkoutType}.
              </ThemeText>
            </View>
          )}

          {enhancedStatsData?.progressScore > 70 && (
            <View style={styles.insightItem}>
              <ThemeText style={[styles.insightEmoji, { color: '#10B981' }]}>🏆</ThemeText>
              <ThemeText style={[styles.insightText, { color: theme.colors.text.primary }]}>
                Excellent progress score of {enhancedStatsData.progressScore}!
              </ThemeText>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Helper functions
  const getWorkoutTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      gym: '#FF6B35',
      calisthenics: '#4ECDC4',
      yoga: '#8B5CF6',
      running: '#45B7D1',
      cycling: '#96CEB4',
      walking: '#A593E0',
      elliptical: '#FFA5A5',
      jumba: '#FF6BC9',
      mixed: '#F59E0B'
    };
    return colors[type] || theme.colors.primary;
  };

  const getRecordUnit = (type: string): string => {
    switch (type) {
      case 'time': return 'min';
      case 'distance': return 'km';
      case 'weight':
      case 'volume': return 'kg';
      case 'reps': return 'reps';
      default: return '';
    }
  };

  // Calculate two additional stats
  const getAdditionalStats = () => {
    if (!enhancedStatsData) return [];
    
    return [
      {
        label: 'Progress Score',
        value: `${enhancedStatsData.progressScore}/100`,
        color: enhancedStatsData.progressScore > 70 ? '#10B981' : 
               enhancedStatsData.progressScore > 40 ? '#F59E0B' : '#EF4444'
      },
      {
        label: 'Avg. Volume',
        value: enhancedStatsData.averageVolumePerWorkout > 0 ? 
               `${Math.round(enhancedStatsData.averageVolumePerWorkout)}kg` : 'N/A',
        color: theme.colors.primary
      }
    ];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Overview Section - 6 Stats (3 per row) */}
      <View style={styles.section}>
        <ThemeText variant="h2" style={{ color: theme.colors.text.primary, marginBottom: 16 }}>
          Progress Overview
        </ThemeText>

        {/* First Row of Stats */}
        <View style={styles.statsRow}>
          {/* Total Workouts */}
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
              {stats.totalWorkouts}
            </ThemeText>
            <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Total Workouts
            </ThemeText>
          </View>

          {/* This Week */}
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
              {stats.workoutsThisWeek}
            </ThemeText>
            <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              This Week
            </ThemeText>
          </View>

          {/* Day Streak */}
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
              {stats.currentStreak}
            </ThemeText>
            <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Day Streak
            </ThemeText>
          </View>
        </View>

        {/* Second Row of Stats */}
        <View style={styles.statsRow}>
          {/* Consistency */}
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.statNumber, { color: theme.colors.primary }]}>
              {Math.round(stats.consistency)}%
            </ThemeText>
            <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Consistency
            </ThemeText>
          </View>

          {/* Progress Score (from enhanced stats) */}
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.statNumber, { color: getAdditionalStats()[0]?.color || theme.colors.primary }]}>
              {getAdditionalStats()[0]?.value || '0/100'}
            </ThemeText>
            <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              {getAdditionalStats()[0]?.label || 'Progress Score'}
            </ThemeText>
          </View>

          {/* Average Volume (from enhanced stats) */}
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.statNumber, { color: getAdditionalStats()[1]?.color || theme.colors.primary }]}>
              {getAdditionalStats()[1]?.value || 'N/A'}
            </ThemeText>
            <ThemeText style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              {getAdditionalStats()[1]?.label || 'Avg Volume'}
            </ThemeText>
          </View>
        </View>
      </View>

      {/* NEW ORDER: Weekly Workout Pattern (right after overview) */}
      {renderWeeklyPattern()}

      {/* Personal Records */}
      {renderPersonalRecords()}

      {/* Volume Performance */}
      {renderVolumePerformance()}

      {/* Estimated 1RM */}
      {renderEstimated1RM()}

      {/* Workout Types */}
      {renderWorkoutTypeDistribution()}

      {/* Quick Insights (moved to the bottom) */}
      {renderQuickInsights()}
    </ScrollView>
  );
};

export default HomeProgressTab;