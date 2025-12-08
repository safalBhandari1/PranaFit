
// // src/features/home/components/HomeReportsTab.tsx
// import React, { useMemo } from 'react';
// import { 
//   View, 
//   TouchableOpacity, 
//   ActivityIndicator, 
//   ScrollView 
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { EnhancedWorkoutSession, WorkoutType } from '../../workout/types/workout';
// import { createReportsStyles } from '../styles/homeReportsStyles';
// import HighlightsCarousel from './HighlightsCarousel';

// interface HomeReportsTabProps {
//   workouts: EnhancedWorkoutSession[];
//   isLoading: boolean;
//   theme: any;
// }

// interface WorkoutStat {
//   label: string;
//   value: string;
//   key: string;
// }

// const HomeReportsTab: React.FC<HomeReportsTabProps> = ({
//   workouts,
//   isLoading,
//   theme
// }) => {
//   const navigation = useNavigation();
//   const styles = useMemo(() => createReportsStyles(theme), [theme]);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//         <ThemeText style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
//           Loading your workouts...
//         </ThemeText>
//       </View>
//     );
//   }

//   if (workouts.length === 0) {
//     return (
//       <ScrollView style={styles.scrollContainer}>
//         <HighlightsCarousel theme={theme} />
//         <View style={styles.emptyContainer}>
//           <ThemeText variant="h3" style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
//             No workouts yet
//           </ThemeText>
//           <ThemeText style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
//             Complete your first workout to see your history here!
//           </ThemeText>
//         </View>
//       </ScrollView>
//     );
//   }

//   // Helper functions
//   const getWorkoutEmoji = (type: WorkoutType): string => {
//     const emojiMap = {
//       [WorkoutType.GYM]: '🏋️',
//       [WorkoutType.RUNNING]: '🏃',
//       [WorkoutType.CYCLING]: '🚴',
//       [WorkoutType.YOGA]: '🧘',
//       [WorkoutType.CALISTHENICS]: '💪',
//       [WorkoutType.WALKING]: '🚶',
//       [WorkoutType.ELLIPTICAL]: '🏃‍♂️',
//       [WorkoutType.JUMBA]: '💃',
//     };
//     return emojiMap[type] || '❤️';
//   };

//   const formatDate = (date: Date): string => {
//     const now = new Date();
//     const workoutDate = new Date(date);
    
//     if (workoutDate.toDateString() === now.toDateString()) {
//       return 'Today';
//     }
    
//     const yesterday = new Date(now);
//     yesterday.setDate(yesterday.getDate() - 1);
//     if (workoutDate.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     }
    
//     return workoutDate.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (date: Date): string => {
//     return new Date(date).toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     }).toLowerCase();
//   };

//   const formatDuration = (minutes: number): string => {
//     if (minutes < 60) return `${minutes}m`;
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
//   };

//   const getWorkoutSubtitle = (workout: EnhancedWorkoutSession): string => {
//     if (workout.projectContext) {
//       return `${workout.projectContext.projectName} • Day ${workout.projectContext.dayIndex + 1}`;
//     }
//     return 'Direct Session';
//   };

//   const getWorkoutColor = (type: WorkoutType): string => {
//     const colorMap = {
//       [WorkoutType.GYM]: theme.colors.primary,
//       [WorkoutType.RUNNING]: '#10B981',
//       [WorkoutType.CYCLING]: '#8B5CF6',
//       [WorkoutType.YOGA]: '#F59E0B',
//       [WorkoutType.CALISTHENICS]: '#EF4444',
//       [WorkoutType.WALKING]: '#3B82F6',
//       [WorkoutType.ELLIPTICAL]: '#8B5CF6',
//       [WorkoutType.JUMBA]: '#EC4899',
//     };
//     return colorMap[type] || theme.colors.primary;
//   };

//   // Calculate statistics
//   const calculateTotalSets = (workout: EnhancedWorkoutSession): number => {
//     if (!workout.exercises || workout.exercises.length === 0) return 0;
//     return workout.exercises.reduce((total, exercise) => 
//       total + (exercise.sets?.length || 0), 0);
//   };

//   const calculateTotalVolume = (workout: EnhancedWorkoutSession): number => {
//     if (!workout.exercises || workout.exercises.length === 0) return 0;
//     return workout.exercises.reduce((total, exercise) => {
//       if (!exercise.sets) return total;
//       return total + exercise.sets.reduce((setTotal, set) => 
//         setTotal + ((set.weight || 0) * (set.reps || 1)), 0);
//     }, 0);
//   };

//   const getWorkoutStats = (workout: EnhancedWorkoutSession): WorkoutStat[] => {
//     const totalSets = calculateTotalSets(workout);
//     const exerciseCount = workout.exercises?.length || 0;
//     const formattedDuration = formatDuration(workout.duration);
//     const totalVolume = calculateTotalVolume(workout);
    
//     switch (workout.type) {
//       case WorkoutType.GYM:
//         return [
//           { label: 'Exercise', value: exerciseCount.toString(), key: 'exercises' },
//           { label: 'Sets', value: totalSets.toString(), key: 'sets' },
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Volume', value: totalVolume > 0 ? `${totalVolume}kg` : 'N/A', key: 'volume' }
//         ];
        
//       case WorkoutType.YOGA:
//       case WorkoutType.CALISTHENICS:
//         return [
//           { label: 'Exercise', value: exerciseCount.toString(), key: 'exercises' },
//           { label: 'Sets', value: totalSets.toString(), key: 'sets' },
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Intensity', value: 'Medium', key: 'intensity' }
//         ];
        
//       case WorkoutType.RUNNING:
//       case WorkoutType.CYCLING:
//       case WorkoutType.WALKING:
//         return [
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Distance', value: workout.distance ? `${workout.distance}km` : 'N/A', key: 'distance' },
//           { label: 'Calories', value: (workout.calories || workout.caloriesBurned || 0).toString(), key: 'calories' },
//           { label: 'Pace', value: workout.pace || 'N/A', key: 'pace' }
//         ];
        
//       default:
//         return [
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Intensity', value: 'Medium', key: 'intensity' },
//           { label: 'Calories', value: (workout.calories || workout.caloriesBurned || 0).toString(), key: 'calories' },
//           { label: 'Type', value: workout.type.charAt(0).toUpperCase() + workout.type.slice(1), key: 'type' }
//         ];
//     }
//   };

//   // Generate bar graph data
//   const generateBarGraphData = (workout: EnhancedWorkoutSession): Array<{
//     height: number;
//     color: string;
//   }> => {
//     const bars = [];
//     const workoutColor = getWorkoutColor(workout.type);
    
//     if (workout.exercises && workout.exercises.length > 0) {
//       if ([WorkoutType.GYM, WorkoutType.CALISTHENICS].includes(workout.type)) {
//         const exerciseCount = workout.exercises.length;
//         const maxSetsPerExercise = Math.max(...workout.exercises.map(e => e.sets?.length || 0));
        
//         for (let i = 0; i < 4; i++) {
//           if (i < workout.exercises.length) {
//             const exercise = workout.exercises[i];
//             const setsCount = exercise.sets?.length || 0;
//             const height = maxSetsPerExercise > 0 ? 
//               Math.max((setsCount / maxSetsPerExercise) * 100, 30) : 30;
//             bars.push({ 
//               height, 
//               color: setsCount > 0 ? workoutColor : `${workoutColor}70` 
//             });
//           } else {
//             bars.push({ height: 20, color: `${theme.colors.border}70` });
//           }
//         }
//       } 
//       else if ([WorkoutType.RUNNING, WorkoutType.CYCLING, WorkoutType.WALKING].includes(workout.type)) {
//         for (let i = 0; i < 4; i++) {
//           const progress = (i + 1) / 4;
//           bars.push({ 
//             height: 20 + (progress * 80), 
//             color: workoutColor 
//           });
//         }
//       }
//       else {
//         for (let i = 0; i < 4; i++) {
//           const intensity = 0.4 + Math.random() * 0.6;
//           bars.push({ 
//             height: 20 + (intensity * 80), 
//             color: workoutColor 
//           });
//         }
//       }
//     } else {
//       for (let i = 0; i < 4; i++) {
//         bars.push({ 
//           height: 20, 
//           color: `${theme.colors.border}70` 
//         });
//       }
//     }
    
//     return bars;
//   };

//   const renderBarGraph = (workout: EnhancedWorkoutSession) => {
//     const bars = generateBarGraphData(workout);
    
//     return (
//       <View style={styles.barGraphContainer}>
//         <View style={styles.barGraph}>
//           {bars.map((bar, index) => (
//             <View 
//               key={index}
//               style={[
//                 styles.bar,
//                 { 
//                   height: bar.height,
//                   backgroundColor: bar.color
//                 }
//               ]}
//             />
//           ))}
//         </View>
//       </View>
//     );
//   };

//   const renderWorkoutCard = (workout: EnhancedWorkoutSession) => {
//     const stats = getWorkoutStats(workout);
//     const subtitle = getWorkoutSubtitle(workout);
//     const workoutDate = new Date(workout.startTime);
    
//     return (
//       <TouchableOpacity
//         key={workout.id}
//         style={[
//           styles.cardContainer,
//           {
//             backgroundColor: theme.colors.card,
//           }
//         ]}
//         onPress={() => {
//           (navigation as any).navigate('ReportDetail', { 
//             workout
//           });
//         }}
//         activeOpacity={0.7}
//       >
//         {/* Top Row: Workout Type + Time/Date */}
//         <View style={styles.topRow}>
//           <View style={styles.leftTop}>
//             <ThemeText style={[styles.workoutEmoji, { fontSize: 20 }]}>
//               {getWorkoutEmoji(workout.type)}
//             </ThemeText>
//             <ThemeText style={[styles.workoutType, { color: theme.colors.text.primary }]}>
//               {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
//             </ThemeText>
//           </View>
          
//           <View style={styles.rightTop}>
//             <ThemeText style={[styles.workoutTime, { color: theme.colors.text.secondary }]}>
//               {formatTime(workoutDate)}
//             </ThemeText>
//             <ThemeText style={[styles.workoutDate, { color: theme.colors.text.secondary }]}>
//               {formatDate(workoutDate)}
//             </ThemeText>
//             <ThemeText style={[styles.arrowIcon, { color: theme.colors.text.secondary }]}>
//               ›
//             </ThemeText>
//           </View>
//         </View>
        
//         {/* Subtitle */}
//         <ThemeText style={[styles.workoutSubtitle, { color: theme.colors.text.secondary }]}>
//           {subtitle}
//         </ThemeText>
        
//         {/* Bottom Row: ALL 4 STATS + BAR GRAPH IN ONE ROW */}
//         <View style={styles.statsRow}>
//           {/* Stats Container (4 stats with dividers) */}
//           <View style={styles.statsContainer}>
//             {stats.map((stat, index) => (
//               <React.Fragment key={stat.key}>
//                 <View style={styles.statItem}>
//                   <ThemeText 
//                     style={[styles.statLabel, { color: theme.colors.text.secondary }]}
//                     numberOfLines={1}
//                   >
//                     {stat.label}
//                   </ThemeText>
//                   <ThemeText 
//                     style={[styles.statValue, { color: theme.colors.text.primary }]}
//                     numberOfLines={1}
//                   >
//                     {stat.value}
//                   </ThemeText>
//                 </View>
                
//                 {/* Add vertical divider between stats (except after last one) */}
//                 {index < stats.length - 1 && (
//                   <View style={[styles.verticalDivider, { backgroundColor: theme.colors.border }]} />
//                 )}
//               </React.Fragment>
//             ))}
//           </View>
          
//           {/* Bar Graph (right side) */}
//           {renderBarGraph(workout)}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView 
//       style={styles.scrollContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Highlights Carousel with spacing */}
//       <HighlightsCarousel theme={theme} />
      
//       {/* Add spacing between carousel and content */}
//       <View style={styles.spacer} />
      
//       {/* Recent Workouts Header */}
//       <View style={styles.sectionHeader}>
//         <ThemeText variant="h2" style={{ color: theme.colors.text.primary }}>
//           Workout History
//         </ThemeText>
//         <ThemeText style={[styles.workoutCount, { color: theme.colors.text.secondary }]}>
//           {workouts.length} total workouts
//         </ThemeText>
//       </View>

//       {/* Workout Cards */}
//       <View style={styles.cardsContainer}>
//         {workouts.slice(0, 10).map(renderWorkoutCard)}
//       </View>
      
//       {/* Bottom Spacer */}
//       <View style={styles.bottomSpacer} />
//     </ScrollView>
//   );
// };

// export default HomeReportsTab;







// // src/features/home/components/HomeReportsTab.tsx
// import React, { useMemo } from 'react';
// import { 
//   View, 
//   TouchableOpacity, 
//   ActivityIndicator, 
//   ScrollView 
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { EnhancedWorkoutSession, WorkoutType, WorkoutExercise } from '../../workout/types/workout';
// import { createReportsStyles } from '../styles/homeReportsStyles';
// import HighlightsCarousel from './HighlightsCarousel';

// interface HomeReportsTabProps {
//   workouts: EnhancedWorkoutSession[];
//   isLoading: boolean;
//   theme: any;
// }

// interface WorkoutStat {
//   label: string;
//   value: string;
//   key: string;
// }

// const HomeReportsTab: React.FC<HomeReportsTabProps> = ({
//   workouts,
//   isLoading,
//   theme
// }) => {
//   const navigation = useNavigation();
//   const styles = useMemo(() => createReportsStyles(theme), [theme]);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//         <ThemeText style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
//           Loading your workouts...
//         </ThemeText>
//       </View>
//     );
//   }

//   if (workouts.length === 0) {
//     return (
//       <ScrollView style={styles.scrollContainer}>
//         <HighlightsCarousel theme={theme} />
//         <View style={styles.emptyContainer}>
//           <ThemeText variant="h3" style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
//             No workouts yet
//           </ThemeText>
//           <ThemeText style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
//             Complete your first workout to see your history here!
//           </ThemeText>
//         </View>
//       </ScrollView>
//     );
//   }

//   const recentWorkouts = workouts.slice(0, 10);

//   // Helper functions
//   const getWorkoutEmoji = (type: WorkoutType): string => {
//     const emojiMap = {
//       [WorkoutType.GYM]: '🏋️',
//       [WorkoutType.RUNNING]: '🏃',
//       [WorkoutType.CYCLING]: '🚴',
//       [WorkoutType.YOGA]: '🧘',
//       [WorkoutType.CALISTHENICS]: '💪',
//       [WorkoutType.WALKING]: '🚶',
//       [WorkoutType.ELLIPTICAL]: '🏃‍♂️',
//       [WorkoutType.JUMBA]: '💃',
//     };
//     return emojiMap[type] || '❤️';
//   };

//   const formatDate = (date: Date): string => {
//     const now = new Date();
//     const workoutDate = new Date(date);
    
//     if (workoutDate.toDateString() === now.toDateString()) {
//       return 'Today';
//     }
    
//     const yesterday = new Date(now);
//     yesterday.setDate(yesterday.getDate() - 1);
//     if (workoutDate.toDateString() === yesterday.toDateString()) {
//       return 'Yesterday';
//     }
    
//     return workoutDate.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (date: Date): string => {
//     return new Date(date).toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     }).toLowerCase();
//   };

//   const formatDuration = (minutes: number): string => {
//     if (minutes < 60) return `${minutes}m`;
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
//   };

//   const getWorkoutSubtitle = (workout: EnhancedWorkoutSession): string => {
//     let subtitle = '';
    
//     // Add project context if available
//     if (workout.projectContext) {
//       subtitle += `${workout.projectContext.projectName} • Day ${workout.projectContext.dayIndex + 1}`;
//     } else {
//       subtitle += 'Direct Session';
//     }
    
//     // Add muscle groups for GYM workouts
//     if (workout.type === WorkoutType.GYM) {
//       // Try to get muscle groups from customMuscleGroups first
//       if (workout.customMuscleGroups && workout.customMuscleGroups.length > 0) {
//         subtitle += ` • ${workout.customMuscleGroups.join(' + ')}`;
//       }
//       // Try to extract from trackingData if available
//       else if (workout.trackingData && Array.isArray(workout.trackingData)) {
//         const uniqueMuscles = new Set<string>();
//         workout.trackingData.forEach((exercise: any) => {
//           if (exercise.targetMuscles && Array.isArray(exercise.targetMuscles)) {
//             exercise.targetMuscles.forEach((muscle: string) => uniqueMuscles.add(muscle));
//           }
//         });
//         if (uniqueMuscles.size > 0) {
//           subtitle += ` • ${Array.from(uniqueMuscles).slice(0, 3).join(' + ')}`;
//         }
//       }
//     }
    
//     return subtitle;
//   };

//   // Get workout color - always light orange
//   const getWorkoutColor = (): string => {
//     return '#FFEDD5'; // Light orange color for all cards
//   };

//   // Calculate total sets from trackingData (for GYM) or exercises array
//   const calculateTotalSets = (workout: EnhancedWorkoutSession): number => {
//     // For GYM workouts, use trackingData
//     if (workout.type === WorkoutType.GYM && workout.trackingData && Array.isArray(workout.trackingData)) {
//       return workout.trackingData.reduce((total, exercise: any) => {
//         return total + (exercise.sets?.length || 0);
//       }, 0);
//     }
    
//     // For other workouts, use exercises array
//     if (workout.exercises && workout.exercises.length > 0) {
//       return workout.exercises.reduce((total, exercise) => {
//         return total + (exercise.sets?.length || 0);
//       }, 0);
//     }
    
//     return 0;
//   };

//   // Calculate total volume from trackingData (for GYM)
//   const calculateTotalVolume = (workout: EnhancedWorkoutSession): number => {
//     // For GYM workouts, use trackingData volume
//     if (workout.type === WorkoutType.GYM && workout.trackingData && Array.isArray(workout.trackingData)) {
//       // If totalVolume is already calculated, use it
//       if (workout.totalVolume && workout.totalVolume > 0) {
//         return workout.totalVolume;
//       }
      
//       // Otherwise calculate from trackingData
//       return workout.trackingData.reduce((total, exercise: any) => {
//         return total + (exercise.volume || 0);
//       }, 0);
//     }
    
//     return 0;
//   };

//   // Calculate exercise count from trackingData or exercises array
//   const calculateExerciseCount = (workout: EnhancedWorkoutSession): number => {
//     // For GYM workouts, use trackingData
//     if (workout.type === WorkoutType.GYM && workout.trackingData && Array.isArray(workout.trackingData)) {
//       return workout.trackingData.length;
//     }
    
//     // For other workouts, use exercises array
//     return workout.exercises?.length || 0;
//   };

//   // Get intensity as percentage
//   const getIntensityPercentage = (workout: EnhancedWorkoutSession): string => {
//     // Try to get from workout intensity (assuming 1-10 scale)
//     if (workout.intensity && workout.intensity > 0) {
//       return `${Math.round(workout.intensity * 10)}%`;
//     }
    
//     // Try to get from cardio metrics
//     if (workout.cardioMetrics?.intensity && workout.cardioMetrics.intensity > 0) {
//       return `${Math.round(workout.cardioMetrics.intensity * 10)}%`;
//     }
    
//     // Default medium intensity
//     return '70%';
//   };

//   const getWorkoutStats = (workout: EnhancedWorkoutSession): WorkoutStat[] => {
//     const totalSets = calculateTotalSets(workout);
//     const exerciseCount = calculateExerciseCount(workout);
//     const formattedDuration = formatDuration(workout.duration);
//     const totalVolume = calculateTotalVolume(workout);
//     const intensity = getIntensityPercentage(workout);
    
//     switch (workout.type) {
//       case WorkoutType.GYM:
//         return [
//           { label: 'Exercise', value: exerciseCount > 0 ? exerciseCount.toString() : '0', key: 'exercises' },
//           { label: 'Sets', value: totalSets > 0 ? totalSets.toString() : '0', key: 'sets' },
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Volume', value: totalVolume > 0 ? `${totalVolume}kg` : '0kg', key: 'volume' }
//         ];
        
//       case WorkoutType.YOGA:
//       case WorkoutType.CALISTHENICS:
//         return [
//           { label: 'Exercise', value: exerciseCount > 0 ? exerciseCount.toString() : '0', key: 'exercises' },
//           { label: 'Sets', value: totalSets > 0 ? totalSets.toString() : '0', key: 'sets' },
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Intensity', value: intensity, key: 'intensity' }
//         ];
        
//       case WorkoutType.RUNNING:
//       case WorkoutType.CYCLING:
//       case WorkoutType.WALKING:
//         return [
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Distance', value: workout.distance && workout.distance > 0 ? `${workout.distance}km` : '0km', key: 'distance' },
//           { label: 'Calories', value: (workout.calories || workout.caloriesBurned || 0).toString(), key: 'calories' },
//           { label: 'Intensity', value: intensity, key: 'intensity' }
//         ];
        
//       default:
//         return [
//           { label: 'Duration', value: formattedDuration, key: 'duration' },
//           { label: 'Intensity', value: intensity, key: 'intensity' },
//           { label: 'Calories', value: (workout.calories || workout.caloriesBurned || 0).toString(), key: 'calories' },
//           { label: 'Type', value: workout.type.charAt(0).toUpperCase() + workout.type.slice(1), key: 'type' }
//         ];
//     }
//   };

//   // Generate bar graph data with proper data extraction
//   const generateBarGraphData = (workout: EnhancedWorkoutSession): Array<{
//     height: number;
//     color: string;
//   }> => {
//     const bars = [];
//     const workoutColor = '#F97316'; // Orange color for bars
    
//     // For workouts with trackingData (GYM)
//     if (workout.trackingData && Array.isArray(workout.trackingData) && workout.trackingData.length > 0) {
//       const gymExercises = workout.trackingData as WorkoutExercise[];
      
//       // Get max volume for scaling
//       const maxVolume = Math.max(...gymExercises.map(ex => ex.volume || 0), 100);
      
//       // Create bars based on exercise volume
//       gymExercises.slice(0, 4).forEach((exercise, index) => {
//         const exerciseVolume = exercise.volume || 0;
//         const height = maxVolume > 0 ? Math.max((exerciseVolume / maxVolume) * 100, 20) : 20;
//         bars.push({ 
//           height, 
//           color: exerciseVolume > 0 ? workoutColor : `${theme.colors.border}70`
//         });
//       });
      
//       // Fill remaining bars if less than 4 exercises
//       while (bars.length < 4) {
//         bars.push({ height: 20, color: `${theme.colors.border}70` });
//       }
//     }
//     // For cardio workouts
//     else if ([WorkoutType.RUNNING, WorkoutType.CYCLING, WorkoutType.WALKING].includes(workout.type)) {
//       // Show progression based on duration
//       for (let i = 0; i < 4; i++) {
//         const progress = (i + 1) / 4;
//         bars.push({ 
//           height: 20 + (progress * 80), 
//           color: workoutColor 
//         });
//       }
//     }
//     // For other workouts or no data
//     else {
//       for (let i = 0; i < 4; i++) {
//         bars.push({ 
//           height: 20, 
//           color: `${theme.colors.border}70` 
//         });
//       }
//     }
    
//     return bars;
//   };

//   const renderBarGraph = (workout: EnhancedWorkoutSession) => {
//     const bars = generateBarGraphData(workout);
    
//     return (
//       <View style={styles.barGraphContainer}>
//         <View style={styles.barGraph}>
//           {bars.map((bar, index) => (
//             <View 
//               key={index}
//               style={[
//                 styles.bar,
//                 { 
//                   height: bar.height,
//                   backgroundColor: bar.color
//                 }
//               ]}
//             />
//           ))}
//         </View>
//       </View>
//     );
//   };

//   const renderWorkoutCard = (workout: EnhancedWorkoutSession) => {
//     const stats = getWorkoutStats(workout);
//     const subtitle = getWorkoutSubtitle(workout);
//     const workoutDate = new Date(workout.startTime);
//     const cardColor = getWorkoutColor();
    
//     return (
//       <TouchableOpacity
//         key={workout.id}
//         style={[
//           styles.cardContainer,
//           {
//             backgroundColor: cardColor,
//             borderLeftWidth: 4,
//             borderLeftColor: '#F97316', // Orange border
//           }
//         ]}
//         onPress={() => {
//           (navigation as any).navigate('ReportDetail', { 
//             workout
//           });
//         }}
//         activeOpacity={0.7}
//       >
//         {/* Top Row: Workout Type + Time/Date */}
//         <View style={styles.topRow}>
//           <View style={styles.leftTop}>
//             <ThemeText style={[styles.workoutEmoji, { fontSize: 20 }]}>
//               {getWorkoutEmoji(workout.type)}
//             </ThemeText>
//             <ThemeText style={[styles.workoutType, { color: theme.colors.text.primary }]}>
//               {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
//             </ThemeText>
//           </View>
          
//           <View style={styles.rightTop}>
//             <ThemeText style={[styles.workoutTime, { color: theme.colors.text.secondary }]}>
//               {formatTime(workoutDate)}
//             </ThemeText>
//             <ThemeText style={[styles.workoutDate, { color: theme.colors.text.secondary }]}>
//               {formatDate(workoutDate)}
//             </ThemeText>
//             <ThemeText style={[styles.arrowIcon, { color: theme.colors.text.secondary }]}>
//               ›
//             </ThemeText>
//           </View>
//         </View>
        
//         {/* Subtitle */}
//         <ThemeText style={[styles.workoutSubtitle, { color: theme.colors.text.secondary }]}>
//           {subtitle}
//         </ThemeText>
        
//         {/* Bottom Row: ALL 4 STATS + BAR GRAPH IN ONE ROW */}
//         <View style={styles.statsRow}>
//           {/* Stats Container (4 stats with dividers) */}
//           <View style={styles.statsContainer}>
//             {stats.map((stat, index) => (
//               <React.Fragment key={stat.key}>
//                 <View style={styles.statItem}>
//                   <ThemeText 
//                     style={[styles.statLabel, { color: theme.colors.text.secondary }]}
//                     numberOfLines={1}
//                   >
//                     {stat.label}
//                   </ThemeText>
//                   <ThemeText 
//                     style={[styles.statValue, { color: theme.colors.text.primary }]}
//                     numberOfLines={1}
//                   >
//                     {stat.value}
//                   </ThemeText>
//                 </View>
                
//                 {/* Add vertical divider between stats (except after last one) */}
//                 {index < stats.length - 1 && (
//                   <View style={[styles.verticalDivider, { backgroundColor: theme.colors.border }]} />
//                 )}
//               </React.Fragment>
//             ))}
//           </View>
          
//           {/* Bar Graph (right side) */}
//           {renderBarGraph(workout)}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView 
//       style={styles.scrollContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Highlights Carousel */}
//       <HighlightsCarousel theme={theme} />
      
//       {/* Recent Workouts Header */}
//       <View style={styles.sectionHeader}>
//         <ThemeText variant="h2" style={{ color: theme.colors.text.primary }}>
//           Workout History
//         </ThemeText>
//         <ThemeText style={[styles.workoutCount, { color: theme.colors.text.secondary }]}>
//           {workouts.length} total workouts
//         </ThemeText>
//       </View>

//       {/* Workout Cards */}
//       <View style={styles.cardsContainer}>
//         {recentWorkouts.map(renderWorkoutCard)}
//       </View>
      
//       {/* Bottom Spacer */}
//       <View style={styles.bottomSpacer} />
//     </ScrollView>
//   );
// };

// export default HomeReportsTab;


// src/features/home/components/HomeReportsTab.tsx
import React, { useMemo } from 'react';
import { 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { EnhancedWorkoutSession, WorkoutType, WorkoutExercise } from '../../workout/types/workout';
import { createReportsStyles } from '../styles/homeReportsStyles';
import HighlightsCarousel from './HighlightsCarousel';

interface HomeReportsTabProps {
  workouts: EnhancedWorkoutSession[];
  isLoading: boolean;
  theme: any;
}

interface WorkoutStat {
  label: string;
  value: string;
  key: string;
}

const HomeReportsTab: React.FC<HomeReportsTabProps> = ({
  workouts,
  isLoading,
  theme
}) => {
  const navigation = useNavigation();
  const styles = useMemo(() => createReportsStyles(theme), [theme]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemeText style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
          Loading your workouts...
        </ThemeText>
      </View>
    );
  }

  if (workouts.length === 0) {
    return (
      <ScrollView style={styles.scrollContainer}>
        <HighlightsCarousel theme={theme} />
        <View style={styles.emptyContainer}>
          <ThemeText variant="h3" style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
            No workouts yet
          </ThemeText>
          <ThemeText style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            Complete your first workout to see your history here!
          </ThemeText>
        </View>
      </ScrollView>
    );
  }

  const recentWorkouts = workouts.slice(0, 10);

  // Helper functions
  const getWorkoutEmoji = (type: WorkoutType): string => {
    const emojiMap = {
      [WorkoutType.GYM]: '🏋️',
      [WorkoutType.RUNNING]: '🏃',
      [WorkoutType.CYCLING]: '🚴',
      [WorkoutType.YOGA]: '🧘',
      [WorkoutType.CALISTHENICS]: '💪',
      [WorkoutType.WALKING]: '🚶',
      [WorkoutType.ELLIPTICAL]: '🏃‍♂️',
      [WorkoutType.JUMBA]: '💃',
    };
    return emojiMap[type] || '❤️';
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const workoutDate = new Date(date);
    
    if (workoutDate.toDateString() === now.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (workoutDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return workoutDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getWorkoutSubtitle = (workout: EnhancedWorkoutSession): string => {
    let subtitle = '';
    
    // Add project context if available
    if (workout.projectContext) {
      subtitle += `${workout.projectContext.projectName} • Day ${workout.projectContext.dayIndex + 1}`;
    } else {
      subtitle += 'Direct Session';
    }
    
    // Add muscle groups for GYM workouts
    if (workout.type === WorkoutType.GYM) {
      // Try to get muscle groups from customMuscleGroups first
      if (workout.customMuscleGroups && workout.customMuscleGroups.length > 0) {
        subtitle += ` • ${workout.customMuscleGroups.join(' + ')}`;
      }
      // Try to extract from trackingData if available
      else if (workout.trackingData && Array.isArray(workout.trackingData)) {
        const uniqueMuscles = new Set<string>();
        workout.trackingData.forEach((exercise: any) => {
          if (exercise.targetMuscles && Array.isArray(exercise.targetMuscles)) {
            exercise.targetMuscles.forEach((muscle: string) => uniqueMuscles.add(muscle));
          }
        });
        if (uniqueMuscles.size > 0) {
          subtitle += ` • ${Array.from(uniqueMuscles).slice(0, 3).join(' + ')}`;
        }
      }
    }
    
    return subtitle;
  };

  // REMOVED: getWorkoutColor function (no longer needed)

  // Calculate total sets from trackingData (for GYM) or exercises array
  const calculateTotalSets = (workout: EnhancedWorkoutSession): number => {
    // For GYM workouts, use trackingData
    if (workout.type === WorkoutType.GYM && workout.trackingData && Array.isArray(workout.trackingData)) {
      return workout.trackingData.reduce((total, exercise: any) => {
        return total + (exercise.sets?.length || 0);
      }, 0);
    }
    
    // For other workouts, use exercises array
    if (workout.exercises && workout.exercises.length > 0) {
      return workout.exercises.reduce((total, exercise) => {
        return total + (exercise.sets?.length || 0);
      }, 0);
    }
    
    return 0;
  };

  // Calculate total volume from trackingData (for GYM)
  const calculateTotalVolume = (workout: EnhancedWorkoutSession): number => {
    // For GYM workouts, use trackingData volume
    if (workout.type === WorkoutType.GYM && workout.trackingData && Array.isArray(workout.trackingData)) {
      // If totalVolume is already calculated, use it
      if (workout.totalVolume && workout.totalVolume > 0) {
        return workout.totalVolume;
      }
      
      // Otherwise calculate from trackingData
      return workout.trackingData.reduce((total, exercise: any) => {
        return total + (exercise.volume || 0);
      }, 0);
    }
    
    return 0;
  };

  // Calculate exercise count from trackingData or exercises array
  const calculateExerciseCount = (workout: EnhancedWorkoutSession): number => {
    // For GYM workouts, use trackingData
    if (workout.type === WorkoutType.GYM && workout.trackingData && Array.isArray(workout.trackingData)) {
      return workout.trackingData.length;
    }
    
    // For other workouts, use exercises array
    return workout.exercises?.length || 0;
  };

  // Get intensity as percentage
  const getIntensityPercentage = (workout: EnhancedWorkoutSession): string => {
    // Try to get from workout intensity (assuming 1-10 scale)
    if (workout.intensity && workout.intensity > 0) {
      return `${Math.round(workout.intensity * 10)}%`;
    }
    
    // Try to get from cardio metrics
    if (workout.cardioMetrics?.intensity && workout.cardioMetrics.intensity > 0) {
      return `${Math.round(workout.cardioMetrics.intensity * 10)}%`;
    }
    
    // Default medium intensity
    return '70%';
  };

  const getWorkoutStats = (workout: EnhancedWorkoutSession): WorkoutStat[] => {
    const totalSets = calculateTotalSets(workout);
    const exerciseCount = calculateExerciseCount(workout);
    const formattedDuration = formatDuration(workout.duration);
    const totalVolume = calculateTotalVolume(workout);
    const intensity = getIntensityPercentage(workout);
    
    switch (workout.type) {
      case WorkoutType.GYM:
        return [
          { label: 'Exercise', value: exerciseCount > 0 ? exerciseCount.toString() : '0', key: 'exercises' },
          { label: 'Sets', value: totalSets > 0 ? totalSets.toString() : '0', key: 'sets' },
          { label: 'Duration', value: formattedDuration, key: 'duration' },
          { label: 'Volume', value: totalVolume > 0 ? `${totalVolume}kg` : '0kg', key: 'volume' }
        ];
        
      case WorkoutType.YOGA:
      case WorkoutType.CALISTHENICS:
        return [
          { label: 'Exercise', value: exerciseCount > 0 ? exerciseCount.toString() : '0', key: 'exercises' },
          { label: 'Sets', value: totalSets > 0 ? totalSets.toString() : '0', key: 'sets' },
          { label: 'Duration', value: formattedDuration, key: 'duration' },
          { label: 'Intensity', value: intensity, key: 'intensity' }
        ];
        
      case WorkoutType.RUNNING:
      case WorkoutType.CYCLING:
      case WorkoutType.WALKING:
        return [
          { label: 'Duration', value: formattedDuration, key: 'duration' },
          { label: 'Distance', value: workout.distance && workout.distance > 0 ? `${workout.distance}km` : '0km', key: 'distance' },
          { label: 'Calories', value: (workout.calories || workout.caloriesBurned || 0).toString(), key: 'calories' },
          { label: 'Intensity', value: intensity, key: 'intensity' }
        ];
        
      default:
        return [
          { label: 'Duration', value: formattedDuration, key: 'duration' },
          { label: 'Intensity', value: intensity, key: 'intensity' },
          { label: 'Calories', value: (workout.calories || workout.caloriesBurned || 0).toString(), key: 'calories' },
          { label: 'Type', value: workout.type.charAt(0).toUpperCase() + workout.type.slice(1), key: 'type' }
        ];
    }
  };

  // Generate bar graph data with proper data extraction AND LIMITED HEIGHT
  const generateBarGraphData = (workout: EnhancedWorkoutSession): Array<{
    height: number;
    color: string;
  }> => {
    const bars = [];
    const workoutColor = '#F97316'; // Orange color for bars
    
    // For workouts with trackingData (GYM)
    if (workout.trackingData && Array.isArray(workout.trackingData) && workout.trackingData.length > 0) {
      const gymExercises = workout.trackingData as WorkoutExercise[];
      
      // Get max volume for scaling
      const maxVolume = Math.max(...gymExercises.map(ex => ex.volume || 0), 100);
      
      // Create bars based on exercise volume WITH HEIGHT LIMIT
      gymExercises.slice(0, 4).forEach((exercise, index) => {
        const exerciseVolume = exercise.volume || 0;
        // CHANGED: Maximum height of 20 (from maxHeight in styles)
        const height = maxVolume > 0 ? Math.min(Math.max((exerciseVolume / maxVolume) * 30, 4), 30) : 4;
        bars.push({ 
          height, 
          color: exerciseVolume > 0 ? workoutColor : `${theme.colors.border}70`
        });
      });
      
      // Fill remaining bars if less than 4 exercises
      while (bars.length < 4) {
        bars.push({ height: 4, color: `${theme.colors.border}70` });
      }
    }
    // For cardio workouts
    else if ([WorkoutType.RUNNING, WorkoutType.CYCLING, WorkoutType.WALKING].includes(workout.type)) {
      // Show progression based on duration WITH HEIGHT LIMIT
      for (let i = 0; i < 4; i++) {
        const progress = (i + 1) / 4;
        // CHANGED: Maximum height of 20
        const height = 4 + (progress * 26);
        bars.push({ 
          height: Math.min(height, 20), 
          color: workoutColor 
        });
      }
    }
    // For other workouts or no data
    else {
      for (let i = 0; i < 4; i++) {
        bars.push({ 
          height: 4, // CHANGED: Minimum height
          color: `${theme.colors.border}70` 
        });
      }
    }
    
    return bars;
  };

  const renderBarGraph = (workout: EnhancedWorkoutSession) => {
    const bars = generateBarGraphData(workout);
    
    return (
      <View style={styles.barGraphContainer}>
        <View style={styles.barGraph}>
          {bars.map((bar, index) => (
            <View 
              key={index}
              style={[
                styles.bar,
                { 
                  height: bar.height,
                  backgroundColor: bar.color
                }
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderWorkoutCard = (workout: EnhancedWorkoutSession) => {
    const stats = getWorkoutStats(workout);
    const subtitle = getWorkoutSubtitle(workout);
    const workoutDate = new Date(workout.startTime);
    
    return (
      <TouchableOpacity
        key={workout.id}
        style={[
          styles.cardContainer,
          {
            // REMOVED: backgroundColor: cardColor (now uses theme.colors.card from styles)
            borderLeftWidth: 4,
            borderLeftColor: '#F97316', // Orange border (KEEPING THIS)
          }
        ]}
        onPress={() => {
          (navigation as any).navigate('ReportDetail', { 
            workout
          });
        }}
        activeOpacity={0.7}
      >
        {/* Top Row: Workout Type + Time/Date */}
        <View style={styles.topRow}>
          <View style={styles.leftTop}>
            <ThemeText style={[styles.workoutEmoji, { fontSize: 20 }]}>
              {getWorkoutEmoji(workout.type)}
            </ThemeText>
            <ThemeText style={[styles.workoutType, { color: theme.colors.text.primary }]}>
              {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
            </ThemeText>
          </View>
          
          <View style={styles.rightTop}>
            <ThemeText style={[styles.workoutTime, { color: theme.colors.text.secondary }]}>
              {formatTime(workoutDate)}
            </ThemeText>
            <ThemeText style={[styles.workoutDate, { color: theme.colors.text.secondary }]}>
              {formatDate(workoutDate)}
            </ThemeText>
            <ThemeText style={[styles.arrowIcon, { color: theme.colors.text.secondary }]}>
              ›
            </ThemeText>
          </View>
        </View>
        
        {/* Subtitle */}
        <ThemeText style={[styles.workoutSubtitle, { color: theme.colors.text.secondary }]}>
          {subtitle}
        </ThemeText>
        
        {/* Bottom Row: ALL 4 STATS + BAR GRAPH IN ONE ROW */}
        <View style={styles.statsRow}>
          {/* Stats Container (4 stats with dividers) */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <React.Fragment key={stat.key}>
                <View style={styles.statItem}>
                  <ThemeText 
                    style={[styles.statLabel, { color: theme.colors.text.secondary }]}
                    numberOfLines={1}
                  >
                    {stat.label}
                  </ThemeText>
                  <ThemeText 
                    style={[styles.statValue, { color: theme.colors.text.primary }]}
                    numberOfLines={1}
                  >
                    {stat.value}
                  </ThemeText>
                </View>
                
                {/* Add vertical divider between stats (except after last one) */}
                {index < stats.length - 1 && (
                  <View style={[styles.verticalDivider, { backgroundColor: theme.colors.border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
          
          {/* Bar Graph (right side) - NOW WITH LIMITED HEIGHT */}
          {renderBarGraph(workout)}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView 
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Highlights Carousel - KEEPS LIGHT ORANGE BACKGROUND */}
      <HighlightsCarousel theme={theme} />
      
      {/* Recent Workouts Header */}
      <View style={styles.sectionHeader}>
        <ThemeText variant="h2" style={{ color: theme.colors.text.primary }}>
          Workout History
        </ThemeText>
        <ThemeText style={[styles.workoutCount, { color: theme.colors.text.secondary }]}>
          {workouts.length} total workouts
        </ThemeText>
      </View>

      {/* Workout Cards - NOW WITH WHITE BACKGROUND */}
      <View style={styles.cardsContainer}>
        {recentWorkouts.map(renderWorkoutCard)}
      </View>
      
      {/* Bottom Spacer */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default HomeReportsTab;