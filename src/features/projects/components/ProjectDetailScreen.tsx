// // src/features/projects/components/ProjectDetailScreen.tsx
// import React, { useState, useCallback, useEffect, useMemo } from 'react';
// import { 
//   View, 
//   ScrollView, 
//   TouchableOpacity,
//   Alert,
//   RefreshControl
// } from 'react-native';
// import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout } from '../types/project';
// import { WorkoutType } from '../../workout/types/workout';
// import { createStyles } from '../styles/ProjectDetailScreenStyles';
// import { appEvents, EVENT_WORKOUT_COMPLETED } from '../../../shared/utils/events';

// interface ProjectDetailRouteParams {
//   projectId: string;
//   project?: TrainingProject;
// }

// export const ProjectDetailScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     markDayComplete, 
//     markDayIncomplete,
//     calculateProjectProgress,
//     loadUserProjects,
//     lastUpdated // ✅ ADDED: For reactivity
//   } = useProjectStore();
  
//   const { openWorkoutModal } = useWorkoutStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, project: routeProject } = route.params as ProjectDetailRouteParams;
  
//   // ✅ FIXED: Use direct store subscription for real-time updates
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject, lastUpdated]); // ✅ ADDED: lastUpdated dependency

//   const [refreshing, setRefreshing] = useState(false);
//   const [updatingDay, setUpdatingDay] = useState<number | null>(null);
//   const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
//   const [recentlyCompletedDay, setRecentlyCompletedDay] = useState<number | null>(null); // ✅ ADDED: Visual feedback

//   // ✅ FIXED: Enhanced event listener for real-time updates
//   useEffect(() => {
//     console.log('🎯 Setting up workout completion listener for project:', projectId);
    
//     const handleWorkoutCompleted = (data: any) => {
//       console.log('📢 Workout completion event received in component:', data);
      
//       if (data.projectContext?.projectId === projectId) {
//         const dayIndex = data.projectContext.dayIndex;
//         console.log('🎯 Workout completed for this project, day:', dayIndex);
        
//         // Show visual feedback
//         setRecentlyCompletedDay(dayIndex);
        
//         // Remove highlight after 2 seconds
//         setTimeout(() => {
//           setRecentlyCompletedDay(null);
//         }, 2000);
        
//         // The store update will automatically trigger re-render via lastUpdated
//       }
//     };

//     // Listen for workout completion events
//     appEvents.on(EVENT_WORKOUT_COMPLETED, handleWorkoutCompleted);
    
//     return () => {
//       // Cleanup listener
//       appEvents.off(EVENT_WORKOUT_COMPLETED, handleWorkoutCompleted);
//     };
//   }, [projectId]);

//   // ✅ FIXED: Load fresh project data when screen focuses
//   const loadProjectData = useCallback(() => {
//     console.log('🔄 Loading fresh project data for:', projectId);
    
//     // With direct store subscription, this is now automatic
//     // The component will re-render whenever the store updates
//   }, [projectId]);

//   // ✅ FIXED: Refresh when screen comes into focus
//   useFocusEffect(
//     useCallback(() => {
//       console.log('🎯 ProjectDetailScreen focused');
//       loadProjectData();
//     }, [loadProjectData])
//   );

//   // ✅ FIXED: Proper refresh that reloads from Firebase
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       const { useAppStore } = require('../../../shared/stores/useAppStore');
//       const user = useAppStore.getState().user;
      
//       if (user?.uid) {
//         await loadUserProjects(user.uid);
//         console.log('✅ Refreshed projects from Firebase');
//       }
//     } catch (error) {
//       console.error('Error refreshing project:', error);
//       Alert.alert('Error', 'Failed to refresh project data');
//     } finally {
//       setRefreshing(false);
//     }
//   }, [loadUserProjects]);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const toggleDayExpansion = (dayIndex: number) => {
//     const newExpanded = new Set(expandedDays);
//     if (newExpanded.has(dayIndex)) {
//       newExpanded.delete(dayIndex);
//     } else {
//       newExpanded.add(dayIndex);
//     }
//     setExpandedDays(newExpanded);
//   };

//   const getActivityEmoji = (activityType: string) => {
//     const emojis: {[key: string]: string} = {
//       gym: '🏋️',
//       calisthenics: '💪',
//       yoga: '🧘',
//       running: '🏃',
//       cycling: '🚴',
//       walking: '🚶',
//       jumba: '💃',
//       mixed: '🌟',
//       rest: '😴'
//     };
//     return emojis[activityType] || '⭐';
//   };

//   const getActivityColor = (type: string) => {
//     const colorsMap: {[key: string]: string} = {
//       gym: '#FF6B35',
//       calisthenics: '#4ECDC4',
//       yoga: '#8B5CF6',
//       running: '#45B7D1',
//       cycling: '#96CEB4',
//       walking: '#A593E0',
//       jumba: '#FFA5A5',
//       mixed: '#8B5CF6',
//       rest: '#6B7280'
//     };
//     return colorsMap[type] || theme.colors.primary;
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   const getWorkoutTitle = (day: DailyWorkout) => {
//     if (day.activities.some(activity => activity.name === 'Rest Day')) {
//       return 'Rest Day';
//     }

//     if (day.activities.length === 0) {
//       return 'No Workouts';
//     }

//     const mainActivity = day.activities[0];
//     const activityType = mainActivity.type.toLowerCase();
    
//     if (activityType === 'gym') {
//       const focusAreas = day.focusAreas || [];
//       if (focusAreas.length > 0) {
//         return focusAreas.slice(0, 3).join(', ');
//       } else {
//         return 'Gym Workout';
//       }
//     } else if (activityType === 'calisthenics' || activityType === 'yoga') {
//       return `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`;
//     } else {
//       return `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`;
//     }
//   };

//   const getWorkoutDetails = (day: DailyWorkout) => {
//     if (day.activities.some(activity => activity.name === 'Rest Day')) {
//       return [];
//     }

//     return day.activities.map(activity => ({
//       name: activity.name,
//       type: activity.type,
//       exercises: activity.exercises || []
//     }));
//   };

//   const handleStartWorkout = async (day: DailyWorkout, dayIndex: number) => {
//     if (!currentProject) return;

//     console.log('🎯 STARTING WORKOUT FROM PROJECT:');
//     console.log('Project:', currentProject.title);
//     console.log('Day Index:', dayIndex);
    
//     const mainActivity = day.activities[0];
//     const workoutType = mainActivity.type as WorkoutType;
    
//     const exercises = day.activities.flatMap(activity => {
//       if (!activity.exercises || activity.exercises.length === 0) {
//         return [];
//       }
      
//       const matchingExercises = activity.exercises.filter(exercise => 
//         exercise.workoutType === activity.type
//       );
      
//       return matchingExercises;
//     });

//     console.log('🚀 Opening workout modal with:', {
//       type: workoutType,
//       totalExerciseCount: exercises.length
//     });

//     openWorkoutModal(workoutType, {
//       projectContext: {
//         projectId: currentProject.id,
//         projectName: currentProject.title,
//         dayIndex: dayIndex,
//         dayName: day.name
//       },
//       preSelectedExercises: exercises,
//       ...(workoutType === WorkoutType.GYM && day.focusAreas && {
//         customMuscleGroups: day.focusAreas
//       })
//     });
//   };

//   // Manual day completion toggle
//   const handleToggleDayCompletion = async (dayIndex: number, completed: boolean) => {
//     if (!currentProject) return;

//     try {
//       setUpdatingDay(dayIndex);
      
//       if (completed) {
//         await markDayComplete(currentProject.id, dayIndex);
//       } else {
//         await markDayIncomplete(currentProject.id, dayIndex);
//       }
      
//       console.log('✅ Day completion updated');
      
//     } catch (error) {
//       console.error('❌ Error updating day completion:', error);
//       Alert.alert('Error', 'Failed to update progress');
//     } finally {
//       setUpdatingDay(null);
//     }
//   };

//   // ✅ FIXED: Memoized calculations for performance
//   const progress = useMemo(() => 
//     currentProject ? calculateProjectProgress(currentProject) : null,
//   [currentProject, calculateProjectProgress]);

//   const calculateProgress = () => {
//     if (!progress) return 0;
//     return Math.round(progress.completionPercentage);
//   };

//   const getDaysCompleted = () => {
//     if (!progress) return 0;
//     return progress.completedDays;
//   };

//   const hasWorkouts = (day: DailyWorkout) => {
//     return !day.activities.some(activity => activity.name === 'Rest Day') && 
//            day.activities.length > 0;
//   };

//   // ✅ FIXED: Memoized sorted workouts
//   const sortedWorkouts = useMemo(() => 
//     currentProject ? [...currentProject.dailyWorkouts].sort((a, b) => 
//       new Date(a.date).getTime() - new Date(b.date).getTime()
//     ) : [],
//   [currentProject]);

//   if (!currentProject) {
//     return (
//       <ThemeView style={styles.container}>
//         <ThemeView style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading project...</ThemeText>
//         </ThemeView>
//       </ThemeView>
//     );
//   }

//   const activityColor = getActivityColor(currentProject.type);

//   return (
//     <ThemeView style={styles.container}>
//       {/* Custom Header */}
//       <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
//             ← Back
//           </ThemeText>
//         </TouchableOpacity>
//         <ThemeText variant="h2" style={styles.headerTitle}>
//           Project Details
//         </ThemeText>
//         <View style={styles.headerSpacer} />
//       </View>
      
//       <ScrollView 
//         style={styles.content} 
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[theme.colors.primary]}
//             tintColor={theme.colors.primary}
//           />
//         }
//       >
        
//         {/* Project Header */}
//         <View style={styles.projectHeader}>
//           <ThemeText variant="h1" style={styles.projectTitle}>
//             {currentProject.title}
//           </ThemeText>
//           <ThemeText variant="body" style={styles.projectMeta}>
//             {currentProject.type.charAt(0).toUpperCase() + currentProject.type.slice(1)} • 
//             {currentProject.duration} days • {getDaysCompleted()} completed
//           </ThemeText>
//           <ThemeText variant="caption" style={styles.projectDates}>
//             {formatDate(currentProject.startDate)} - {formatDate(currentProject.endDate)}
//           </ThemeText>
//           {currentProject.description && (
//             <ThemeText variant="body" style={styles.projectDescription}>
//               {currentProject.description}
//             </ThemeText>
//           )}
//         </View>

//         {/* Progress Overview - NOW AUTO-UPDATES IN REAL-TIME */}
//         <View style={styles.progressSection}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Progress Overview
//           </ThemeText>
//           <View style={styles.statsGrid}>
//             <View style={styles.statItem}>
//               <ThemeText variant="h2" style={[styles.statValue, { color: activityColor }]}>
//                 {getDaysCompleted()}
//               </ThemeText>
//               <ThemeText variant="caption" style={styles.statLabel}>
//                 Days Completed
//               </ThemeText>
//             </View>
//             <View style={styles.statItem}>
//               <ThemeText variant="h2" style={[styles.statValue, { color: activityColor }]}>
//                 {currentProject.duration - getDaysCompleted()}
//               </ThemeText>
//               <ThemeText variant="caption" style={styles.statLabel}>
//                 Days Remaining
//               </ThemeText>
//             </View>
//             <View style={styles.statItem}>
//               <ThemeText variant="h2" style={[styles.statValue, { color: activityColor }]}>
//                 {calculateProgress()}%
//               </ThemeText>
//               <ThemeText variant="caption" style={styles.statLabel}>
//                 Complete
//               </ThemeText>
//             </View>
//           </View>
          
//           {/* Progress Bar - NOW AUTO-UPDATES IN REAL-TIME */}
//           <View style={styles.overallProgressBar}>
//             <View 
//               style={[
//                 styles.overallProgressFill, 
//                 { 
//                   backgroundColor: activityColor,
//                   width: `${calculateProgress()}%`
//                 }
//               ]} 
//             />
//           </View>
//         </View>

//         {/* Daily Schedule - NOW AUTO-UPDATES IN REAL-TIME */}
//         <View style={styles.scheduleSection}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Daily Schedule
//           </ThemeText>
          
//           {sortedWorkouts.map((day, index) => {
//             const workoutTitle = getWorkoutTitle(day);
//             const workoutDetails = getWorkoutDetails(day);
//             const isExpanded = expandedDays.has(day.dayIndex);
//             const hasDetails = workoutDetails.length > 0 && workoutDetails.some(detail => detail.exercises.length > 0);
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);
            
//             const dayDate = new Date(day.date);
//             dayDate.setHours(0, 0, 0, 0);
            
//             const isToday = dayDate.getTime() === today.getTime();
//             const isPast = dayDate < today;
//             const canStartWorkout = hasWorkouts(day) && !day.completed;
//             const isRecentlyCompleted = recentlyCompletedDay === day.dayIndex; // ✅ ADDED: Visual feedback
            
//             return (
//               <View 
//                 key={day.dayIndex}
//                 style={[
//                   styles.dayCard,
//                   isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
//                   day.completed && { borderColor: '#10B981', borderWidth: 2, backgroundColor: '#F0FDF4' },
//                   isRecentlyCompleted && { // ✅ ADDED: Pulse animation for recent completion
//                     borderColor: '#10B981',
//                     borderWidth: 3,
//                     backgroundColor: '#F0FDF4',
//                     shadowColor: '#10B981',
//                     shadowOffset: { width: 0, height: 0 },
//                     shadowOpacity: 0.5,
//                     shadowRadius: 8,
//                     elevation: 4
//                   }
//                 ]}
//               >
//                 <View style={styles.dayHeader}>
//                   <View style={styles.dayInfo}>
//                     {/* Workout Title with Emoji */}
//                     <View style={styles.workoutTitleRow}>
//                       <ThemeText variant="body" style={[styles.workoutEmoji, { color: activityColor }]}>
//                         {getActivityEmoji(day.activities[0]?.type.toLowerCase() || 'rest')}
//                       </ThemeText>
//                       <ThemeText variant="h3" style={styles.workoutTitle}>
//                         {workoutTitle}
//                         {isRecentlyCompleted && ' 🎉'} {/* ✅ ADDED: Celebration emoji */}
//                       </ThemeText>
//                     </View>
                    
//                     {/* Date */}
//                     <ThemeText variant="caption" style={styles.dayDateText}>
//                       {formatDate(day.date)}
//                     </ThemeText>

//                     {/* Badges - NOW AUTO-UPDATES IN REAL-TIME */}
//                     <View style={styles.badgeContainer}>
//                       {isToday && (
//                         <View style={[styles.todayBadge, { backgroundColor: theme.colors.primary }]}>
//                           <ThemeText variant="caption" style={styles.todayText}>Today</ThemeText>
//                         </View>
//                       )}
//                       {day.completed && (
//                         <View style={[styles.completedBadge, { backgroundColor: '#10B981' }]}>
//                           <ThemeText variant="caption" style={styles.completedText}>
//                             {isRecentlyCompleted ? 'Just Completed! 🎉' : 'Completed ✓'}
//                           </ThemeText>
//                         </View>
//                       )}
//                       {isPast && !isToday && !day.completed && (
//                         <View style={[styles.missedBadge, { backgroundColor: '#EF4444' }]}>
//                           <ThemeText variant="caption" style={styles.missedText}>Missed</ThemeText>
//                         </View>
//                       )}
//                     </View>
//                   </View>

//                   {/* Collapsable Button */}
//                   {hasDetails && (
//                     <TouchableOpacity
//                       style={styles.collapseButton}
//                       onPress={() => toggleDayExpansion(day.dayIndex)}
//                     >
//                       <ThemeText variant="body" style={[styles.collapseText, { color: activityColor }]}>
//                         {isExpanded ? '▲' : '▼'}
//                       </ThemeText>
//                     </TouchableOpacity>
//                   )}
//                 </View>
                
//                 {/* Expanded Workout Details */}
//                 {isExpanded && hasDetails && (
//                   <View style={styles.expandedContent}>
//                     <View style={styles.divider} />
//                     {workoutDetails.map((detail, detailIndex) => (
//                       <View key={detailIndex} style={styles.activityDetail}>
//                         <ThemeText variant="body" style={styles.activityName}>
//                           {detail.name}
//                         </ThemeText>
//                         {detail.exercises.length > 0 && (
//                           <View style={styles.exercisesList}>
//                             {detail.exercises.map((exercise, exerciseIndex) => (
//                               <View key={exerciseIndex} style={styles.exerciseItem}>
//                                 <ThemeText variant="caption" style={styles.exerciseName}>
//                                   • {exercise.name}
//                                 </ThemeText>
//                               </View>
//                             ))}
//                           </View>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 )}

//                 {/* Action Row - NOW AUTO-UPDATES IN REAL-TIME */}
//                 <View style={styles.actionRow}>
//                   {/* Status Text */}
//                   <View style={styles.statusContainer}>
//                     <ThemeText variant="caption" style={[
//                       styles.statusText,
//                       day.completed && { color: '#10B981', fontWeight: 'bold' }
//                     ]}>
//                       {day.completed ? 
//                        (isRecentlyCompleted ? 'Just completed! 🎉' : 'Completed ✓') : 
//                        canStartWorkout ? 'Ready to start' : 
//                        'No workouts'}
//                     </ThemeText>
//                   </View>

//                   {/* Start Workout Button - HIDES WHEN COMPLETED */}
//                   {canStartWorkout && (
//                     <TouchableOpacity
//                       style={styles.startButton}
//                       onPress={() => handleStartWorkout(day, day.dayIndex)}
//                       disabled={updatingDay !== null}
//                     >
//                       <ThemeText variant="body" style={[styles.startButtonText, { color: activityColor }]}>
//                         Start Workout →
//                       </ThemeText>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.actionsSection}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Quick Actions
//           </ThemeText>
//           <View style={styles.actionsGrid}>
//             <TouchableOpacity 
//               style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
//               onPress={() => navigation.navigate('CreateProject' as never)}
//             >
//               <ThemeText variant="body" style={styles.actionButtonText}>
//                 Create New Plan
//               </ThemeText>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={[styles.actionButton, { backgroundColor: theme.colors.border }]}
//               onPress={() => navigation.goBack()}
//             >
//               <ThemeText variant="body" style={[styles.actionButtonText, { color: theme.colors.text.primary }]}>
//                 Back to Projects
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>

//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default ProjectDetailScreen;

// src/features/projects/components/ProjectDetailScreen.tsx
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useProjectStore } from '../stores/useProjectStore';
import { useWorkoutStore } from '../../workout/stores/useWorkoutStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { TrainingProject, DailyWorkout } from '../types/project';
import { WorkoutType } from '../../workout/types/workout';
import { createStyles } from '../styles/ProjectDetailScreenStyles';
import { appEvents, EVENT_WORKOUT_COMPLETED } from '../../../shared/utils/events';

interface ProjectDetailRouteParams {
  projectId: string;
  project?: TrainingProject;
}

export const ProjectDetailScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    projects, 
    markDayComplete, 
    markDayIncomplete,
    calculateProjectProgress,
    loadUserProjects,
    lastUpdated
  } = useProjectStore();
  
  const { openWorkoutModal } = useWorkoutStore();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = createStyles(theme);

  const { projectId, project: routeProject } = route.params as ProjectDetailRouteParams;
  
  const currentProject = useMemo(() => 
    projects.find(p => p.id === projectId) || routeProject || null,
  [projects, projectId, routeProject, lastUpdated]);

  const [refreshing, setRefreshing] = useState(false);
  const [updatingDay, setUpdatingDay] = useState<number | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [recentlyCompletedDay, setRecentlyCompletedDay] = useState<number | null>(null);

  useEffect(() => {
    console.log('🎯 Setting up workout completion listener for project:', projectId);
    
    const handleWorkoutCompleted = (data: any) => {
      console.log('📢 Workout completion event received in component:', data);
      
      if (data.projectContext?.projectId === projectId) {
        const dayIndex = data.projectContext.dayIndex;
        console.log('🎯 Workout completed for this project, day:', dayIndex);
        
        setRecentlyCompletedDay(dayIndex);
        
        setTimeout(() => {
          setRecentlyCompletedDay(null);
        }, 2000);
      }
    };

    appEvents.on(EVENT_WORKOUT_COMPLETED, handleWorkoutCompleted);
    
    return () => {
      appEvents.off(EVENT_WORKOUT_COMPLETED, handleWorkoutCompleted);
    };
  }, [projectId]);

  const loadProjectData = useCallback(() => {
    console.log('🔄 Loading fresh project data for:', projectId);
  }, [projectId]);

  useFocusEffect(
    useCallback(() => {
      console.log('🎯 ProjectDetailScreen focused');
      loadProjectData();
    }, [loadProjectData])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const { useAppStore } = require('../../../shared/stores/useAppStore');
      const user = useAppStore.getState().user;
      
      if (user?.uid) {
        await loadUserProjects(user.uid);
        console.log('✅ Refreshed projects from Firebase');
      }
    } catch (error) {
      console.error('Error refreshing project:', error);
      Alert.alert('Error', 'Failed to refresh project data');
    } finally {
      setRefreshing(false);
    }
  }, [loadUserProjects]);

  const toggleDayExpansion = (dayIndex: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayIndex)) {
      newExpanded.delete(dayIndex);
    } else {
      newExpanded.add(dayIndex);
    }
    setExpandedDays(newExpanded);
  };

  const getActivityEmoji = (activityType: string) => {
    const emojis: {[key: string]: string} = {
      gym: '🏋️',
      calisthenics: '💪',
      yoga: '🧘',
      running: '🏃',
      cycling: '🚴',
      walking: '🚶',
      jumba: '💃',
      mixed: '🌟',
      rest: '😴'
    };
    return emojis[activityType] || '⭐';
  };

  const getActivityColor = (type: string) => {
    const colorsMap: {[key: string]: string} = {
      gym: '#FF6B35',
      calisthenics: '#4ECDC4',
      yoga: '#8B5CF6',
      running: '#45B7D1',
      cycling: '#96CEB4',
      walking: '#A593E0',
      jumba: '#FFA5A5',
      mixed: '#8B5CF6',
      rest: '#6B7280'
    };
    return colorsMap[type] || theme.colors.primary;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWorkoutTitle = (day: DailyWorkout) => {
    if (day.activities.some(activity => activity.name === 'Rest Day')) {
      return 'Rest Day';
    }

    if (day.activities.length === 0) {
      return 'No Workouts';
    }

    const mainActivity = day.activities[0];
    const activityType = mainActivity.type.toLowerCase();
    
    if (activityType === 'gym') {
      const focusAreas = day.focusAreas || [];
      if (focusAreas.length > 0) {
        return focusAreas.slice(0, 3).join(', ');
      } else {
        return 'Gym Workout';
      }
    } else if (activityType === 'calisthenics' || activityType === 'yoga') {
      return `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`;
    } else {
      return `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`;
    }
  };

  const getWorkoutDetails = (day: DailyWorkout) => {
    if (day.activities.some(activity => activity.name === 'Rest Day')) {
      return [];
    }

    return day.activities.map(activity => ({
      name: activity.name,
      type: activity.type,
      exercises: activity.exercises || []
    }));
  };

  const handleStartWorkout = async (day: DailyWorkout, dayIndex: number) => {
    if (!currentProject) return;

    console.log('🎯 STARTING WORKOUT FROM PROJECT:');
    console.log('Project:', currentProject.title);
    console.log('Day Index:', dayIndex);
    
    const mainActivity = day.activities[0];
    const workoutType = mainActivity.type as WorkoutType;
    
    const exercises = day.activities.flatMap(activity => {
      if (!activity.exercises || activity.exercises.length === 0) {
        return [];
      }
      
      const matchingExercises = activity.exercises.filter(exercise => 
        exercise.workoutType === activity.type
      );
      
      return matchingExercises;
    });

    console.log('🚀 Opening workout modal with:', {
      type: workoutType,
      totalExerciseCount: exercises.length
    });

    openWorkoutModal(workoutType, {
      projectContext: {
        projectId: currentProject.id,
        projectName: currentProject.title,
        dayIndex: dayIndex,
        dayName: day.name
      },
      preSelectedExercises: exercises,
      ...(workoutType === WorkoutType.GYM && day.focusAreas && {
        customMuscleGroups: day.focusAreas
      })
    });
  };

  const handleToggleDayCompletion = async (dayIndex: number, completed: boolean) => {
    if (!currentProject) return;

    try {
      setUpdatingDay(dayIndex);
      
      if (completed) {
        await markDayComplete(currentProject.id, dayIndex);
      } else {
        await markDayIncomplete(currentProject.id, dayIndex);
      }
      
      console.log('✅ Day completion updated');
      
    } catch (error) {
      console.error('❌ Error updating day completion:', error);
      Alert.alert('Error', 'Failed to update progress');
    } finally {
      setUpdatingDay(null);
    }
  };

  const progress = useMemo(() => 
    currentProject ? calculateProjectProgress(currentProject) : null,
  [currentProject, calculateProjectProgress]);

  const calculateProgress = () => {
    if (!progress) return 0;
    return Math.round(progress.completionPercentage);
  };

  const getDaysCompleted = () => {
    if (!progress) return 0;
    return progress.completedDays;
  };

  const hasWorkouts = (day: DailyWorkout) => {
    return !day.activities.some(activity => activity.name === 'Rest Day') && 
           day.activities.length > 0;
  };

  const sortedWorkouts = useMemo(() => 
    currentProject ? [...currentProject.dailyWorkouts].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ) : [],
  [currentProject]);

  if (!currentProject) {
    return (
      <ThemeView style={styles.container}>
        <ThemeView style={styles.loadingContainer}>
          <ThemeText variant="body">Loading project...</ThemeText>
        </ThemeView>
      </ThemeView>
    );
  }

  const activityColor = getActivityColor(currentProject.type);

  return (
    <ThemeView style={styles.container}>
      {/* 🚀 UPDATED: Twitter-style Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        {/* Left: Back Arrow (Twitter style - only arrow, no text) */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ThemeText style={[styles.backArrow, { color: theme.colors.primary, fontSize: 24 }]}>
            ←
          </ThemeText>
        </TouchableOpacity>
        
        {/* Center: Title */}
        <View style={styles.headerTitleContainer}>
          <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
            Workout Plan
          </ThemeText>
        </View>
        
        {/* Right: Empty spacer for balance */}
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        
        {/* 🚀 COMBINED: Project Header + Progress Overview Card */}
        <View style={styles.combinedCard}>
          {/* Project Info Section */}
          <View style={styles.projectHeader}>
            <ThemeText variant="h1" style={styles.projectTitle}>
              {currentProject.title}
            </ThemeText>
            <ThemeText variant="body" style={styles.projectMeta}>
              {currentProject.type.charAt(0).toUpperCase() + currentProject.type.slice(1)} • 
              {currentProject.duration} days • {getDaysCompleted()} completed
            </ThemeText>
            <ThemeText variant="caption" style={styles.projectDates}>
              {formatDate(currentProject.startDate)} - {formatDate(currentProject.endDate)}
            </ThemeText>
            {currentProject.description && (
              <ThemeText variant="body" style={styles.projectDescription}>
                {currentProject.description}
              </ThemeText>
            )}
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* Progress Overview Section */}
          <View style={styles.progressSection}>
            <ThemeText variant="h3" style={styles.sectionTitle}>
              Progress Overview
            </ThemeText>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemeText variant="h2" style={[styles.statValue, { color: activityColor }]}>
                  {getDaysCompleted()}
                </ThemeText>
                <ThemeText variant="caption" style={styles.statLabel}>
                  Days Completed
                </ThemeText>
              </View>
              <View style={styles.statItem}>
                <ThemeText variant="h2" style={[styles.statValue, { color: activityColor }]}>
                  {currentProject.duration - getDaysCompleted()}
                </ThemeText>
                <ThemeText variant="caption" style={styles.statLabel}>
                  Days Remaining
                </ThemeText>
              </View>
              <View style={styles.statItem}>
                <ThemeText variant="h2" style={[styles.statValue, { color: activityColor }]}>
                  {calculateProgress()}%
                </ThemeText>
                <ThemeText variant="caption" style={styles.statLabel}>
                  Complete
                </ThemeText>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.overallProgressBar}>
              <View 
                style={[
                  styles.overallProgressFill, 
                  { 
                    backgroundColor: activityColor,
                    width: `${calculateProgress()}%`
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Daily Schedule */}
        <View style={styles.scheduleSection}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
            Daily Schedule
          </ThemeText>
          
          {sortedWorkouts.map((day, index) => {
            const workoutTitle = getWorkoutTitle(day);
            const workoutDetails = getWorkoutDetails(day);
            const isExpanded = expandedDays.has(day.dayIndex);
            const hasDetails = workoutDetails.length > 0 && workoutDetails.some(detail => detail.exercises.length > 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const dayDate = new Date(day.date);
            dayDate.setHours(0, 0, 0, 0);
            
            const isToday = dayDate.getTime() === today.getTime();
            const isPast = dayDate < today;
            const canStartWorkout = hasWorkouts(day) && !day.completed;
            const isRecentlyCompleted = recentlyCompletedDay === day.dayIndex;
            
            return (
              <View 
                key={day.dayIndex}
                style={[
                  styles.dayCard,
                  isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
                  isRecentlyCompleted && {
                    borderColor: '#10B981',
                    borderWidth: 3,
                    shadowColor: '#10B981',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    elevation: 4
                  }
                ]}
              >
                <View style={styles.dayHeader}>
                  <View style={styles.dayInfo}>
                    {/* Workout Title with Emoji */}
                    <View style={styles.workoutTitleRow}>
                      <ThemeText variant="body" style={[styles.workoutEmoji, { color: activityColor }]}>
                        {getActivityEmoji(day.activities[0]?.type.toLowerCase() || 'rest')}
                      </ThemeText>
                      <ThemeText variant="h3" style={styles.workoutTitle}>
                        {workoutTitle}
                        {isRecentlyCompleted && ' 🎉'}
                      </ThemeText>
                    </View>
                    
                    {/* Date */}
                    <ThemeText variant="caption" style={styles.dayDateText}>
                      {formatDate(day.date)}
                    </ThemeText>

                    {/* Badges */}
                    <View style={styles.badgeContainer}>
                      {isToday && (
                        <View style={[styles.todayBadge, { backgroundColor: theme.colors.primary }]}>
                          <ThemeText variant="caption" style={styles.todayText}>Today</ThemeText>
                        </View>
                      )}
                      {isPast && !isToday && !day.completed && (
                        <View style={[styles.missedBadge, { backgroundColor: '#EF4444' }]}>
                          <ThemeText variant="caption" style={styles.missedText}>Missed</ThemeText>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Collapsable Button */}
                  {hasDetails && (
                    <TouchableOpacity
                      style={styles.collapseButton}
                      onPress={() => toggleDayExpansion(day.dayIndex)}
                    >
                      <ThemeText variant="body" style={[styles.collapseText, { color: activityColor }]}>
                        {isExpanded ? '▲' : '▼'}
                      </ThemeText>
                    </TouchableOpacity>
                  )}
                </View>
                
                {/* Expanded Workout Details */}
                {isExpanded && hasDetails && (
                  <View style={styles.expandedContent}>
                    <View style={styles.divider} />
                    {workoutDetails.map((detail, detailIndex) => (
                      <View key={detailIndex} style={styles.activityDetail}>
                        <ThemeText variant="body" style={styles.activityName}>
                          {detail.name}
                        </ThemeText>
                        {detail.exercises.length > 0 && (
                          <View style={styles.exercisesList}>
                            {detail.exercises.map((exercise, exerciseIndex) => (
                              <View key={exerciseIndex} style={styles.exerciseItem}>
                                <ThemeText variant="caption" style={styles.exerciseName}>
                                  • {exercise.name}
                                </ThemeText>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {/* Action Row */}
                <View style={styles.actionRow}>
                  {/* Status Text */}
                  <View style={styles.statusContainer}>
                    <ThemeText variant="caption" style={[
                      styles.statusText,
                      day.completed && { color: '#10B981', fontWeight: 'bold' }
                    ]}>
                      {day.completed ? 
                       (isRecentlyCompleted ? 'Just completed! 🎉' : 'Completed ✓') : 
                       canStartWorkout ? 'Ready to start' : 
                       'No workouts'}
                    </ThemeText>
                  </View>

                  {/* Start Workout Button - HIDES WHEN COMPLETED */}
                  {canStartWorkout && (
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => handleStartWorkout(day, day.dayIndex)}
                      disabled={updatingDay !== null}
                    >
                      <ThemeText variant="body" style={[styles.startButtonText, { color: activityColor }]}>
                        Start Workout →
                      </ThemeText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
            Quick Actions
          </ThemeText>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('CreateProject' as never)}
            >
              <ThemeText variant="body" style={styles.actionButtonText}>
                Create New Plan
              </ThemeText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.border }]}
              onPress={() => navigation.goBack()}
            >
              <ThemeText variant="body" style={[styles.actionButtonText, { color: theme.colors.text.primary }]}>
                Back to Projects
              </ThemeText>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </ThemeView>
  );
};

export default ProjectDetailScreen;