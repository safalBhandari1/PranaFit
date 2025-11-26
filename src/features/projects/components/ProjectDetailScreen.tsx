// // src/features/projects/components/ProjectDetailScreen.tsx
// import React, { useState, useCallback } from 'react';
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
// import { TrainingProject, DailyWorkout, WorkoutActivity } from '../types/project';
// import { WorkoutType } from '../../workout/types/workout';
// import { createStyles } from '../styles/ProjectDetailScreenStyles';

// interface ProjectDetailRouteParams {
//   projectId: string;
//   project?: TrainingProject;
// }

// export const ProjectDetailScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     updateProject,
//     markDayComplete, 
//     markDayIncomplete,
//     calculateProjectProgress 
//   } = useProjectStore();
//   const { openWorkoutModal } = useWorkoutStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, project: routeProject } = route.params as ProjectDetailRouteParams;
  
//   const [currentProject, setCurrentProject] = useState<TrainingProject | null>(
//     routeProject || projects.find(p => p.id === projectId) || null
//   );
//   const [refreshing, setRefreshing] = useState(false);
//   const [updatingDay, setUpdatingDay] = useState<number | null>(null);
//   const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

//   // Toggle day expansion
//   const toggleDayExpansion = (dayIndex: number) => {
//     const newExpanded = new Set(expandedDays);
//     if (newExpanded.has(dayIndex)) {
//       newExpanded.delete(dayIndex);
//     } else {
//       newExpanded.add(dayIndex);
//     }
//     setExpandedDays(newExpanded);
//   };

//   // Load project data
//   const loadProject = useCallback(() => {
//     if (routeProject) {
//       setCurrentProject(routeProject);
//       return;
//     }
    
//     const project = projects.find(p => p.id === projectId);
//     if (project) {
//       setCurrentProject(project);
//     } else {
//       Alert.alert('Error', 'Project not found');
//       navigation.goBack();
//     }
//   }, [projectId, routeProject, projects, navigation]);

//   // Refresh when screen comes into focus
//   useFocusEffect(
//     useCallback(() => {
//       loadProject();
//     }, [loadProject])
//   );

//   // Refresh control
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadProject();
//     setTimeout(() => setRefreshing(false), 1000);
//   }, [loadProject]);

//   // Activity helpers
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

//   // Get workout title for a day
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
//       // Cardio activities
//       return `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`;
//     }
//   };

//   // Get workout details for expanded view
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
    
//     // Enhanced debugging
//     console.log('🔍 DEBUG: Day activities structure:', day.activities);
//     day.activities.forEach((activity, index) => {
//       console.log(`🔍 Activity ${index}:`, {
//         name: activity.name,
//         type: activity.type,
//         exercises: activity.exercises,
//         exerciseCount: activity.exercises?.length || 0,
//         exerciseTypes: activity.exercises?.map(ex => ex.workoutType)
//       });
//     });

//     // For gym workouts, use the first activity type
//     const mainActivity = day.activities[0];
//     const workoutType = mainActivity.type as WorkoutType;
    
//     // Smart exercise filtering
//     const exercises = day.activities.flatMap(activity => {
//       if (!activity.exercises || activity.exercises.length === 0) {
//         return [];
//       }
      
//       // Filter exercises to match the activity type
//       const matchingExercises = activity.exercises.filter(exercise => 
//         exercise.workoutType === activity.type
//       );
      
//       console.log(`🔍 Filtered exercises for ${activity.name}:`, {
//         originalCount: activity.exercises.length,
//         filteredCount: matchingExercises.length,
//         matchingExercises
//       });
      
//       return matchingExercises;
//     });

//     console.log('🚀 FINAL: Opening workout modal with:', {
//       type: workoutType,
//       totalExerciseCount: exercises.length,
//       exercises: exercises.map(ex => ({
//         name: ex.name,
//         type: ex.workoutType,
//         id: ex.id
//       }))
//     });

//     // Open workout modal
//     openWorkoutModal(workoutType, {
//       projectContext: {
//         projectId: currentProject.id,
//         projectName: currentProject.title,
//         dayIndex: dayIndex,
//         dayName: day.name
//       },
//       preSelectedExercises: exercises,
//       // Pass focus areas for gym workouts
//       ...(workoutType === WorkoutType.GYM && day.focusAreas && {
//         customMuscleGroups: day.focusAreas
//       })
//     });
//   };

//   // Toggle day completion
//   const handleToggleDayCompletion = async (dayIndex: number, completed: boolean) => {
//     if (!currentProject) return;

//     try {
//       setUpdatingDay(dayIndex);
      
//       if (completed) {
//         await markDayComplete(currentProject.id, dayIndex);
//       } else {
//         await markDayIncomplete(currentProject.id, dayIndex);
//       }
      
//       // Refresh project data
//       loadProject();
      
//     } catch (error) {
//       console.error('❌ Error updating day completion:', error);
//       Alert.alert('Error', 'Failed to update progress');
//     } finally {
//       setUpdatingDay(null);
//     }
//   };

//   // Calculate progress
//   const calculateProgress = () => {
//     if (!currentProject) return 0;
//     const progress = calculateProjectProgress(currentProject);
//     return Math.round(progress.completionPercentage);
//   };

//   const getDaysCompleted = () => {
//     if (!currentProject) return 0;
//     return currentProject.dailyWorkouts.filter(day => day.completed).length;
//   };

//   const hasWorkouts = (day: DailyWorkout) => {
//     return !day.activities.some(activity => activity.name === 'Rest Day') && 
//            day.activities.length > 0;
//   };

//   // Loading state
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
//   const sortedWorkouts = [...currentProject.dailyWorkouts].sort((a, b) => 
//     new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   return (
//     <ThemeView style={styles.container}>
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
        
//         {/* Header with Back Arrow */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <ThemeText variant="h2" style={styles.backArrow}>←</ThemeText>
//           </TouchableOpacity>
//         </View>

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

//         {/* Progress Overview */}
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
          
//           {/* Progress Bar */}
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

//         {/* Daily Schedule */}
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
            
//             return (
//               <View 
//                 key={day.dayIndex}
//                 style={[
//                   styles.dayCard,
//                   isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
//                   day.completed && { borderColor: '#10B981', borderWidth: 2 }
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
//                       </ThemeText>
//                     </View>
                    
//                     {/* Date */}
//                     <ThemeText variant="caption" style={styles.dayDateText}>
//                       {formatDate(day.date)}
//                     </ThemeText>

//                     {/* Badges */}
//                     <View style={styles.badgeContainer}>
//                       {isToday && (
//                         <View style={[styles.todayBadge, { backgroundColor: theme.colors.primary }]}>
//                           <ThemeText variant="caption" style={styles.todayText}>Today</ThemeText>
//                         </View>
//                       )}
//                       {day.completed && (
//                         <View style={[styles.completedBadge, { backgroundColor: '#10B981' }]}>
//                           <ThemeText variant="caption" style={styles.completedText}>Completed</ThemeText>
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

//                 {/* Action Row */}
//                 <View style={styles.actionRow}>
//                   {/* Status Text */}
//                   <View style={styles.statusContainer}>
//                     <ThemeText variant="caption" style={[
//                       styles.statusText,
//                       day.completed && { color: '#10B981' }
//                     ]}>
//                       {day.completed ? 'Completed ✓' : 
//                        canStartWorkout ? 'Ready to start' : 
//                        'No workouts'}
//                     </ThemeText>
//                   </View>

//                   {/* Start Workout Button */}
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
import React, { useState, useCallback } from 'react';
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
import { TrainingProject, DailyWorkout, WorkoutActivity } from '../types/project';
import { WorkoutType } from '../../workout/types/workout';
import { createStyles } from '../styles/ProjectDetailScreenStyles';

interface ProjectDetailRouteParams {
  projectId: string;
  project?: TrainingProject;
}

export const ProjectDetailScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    projects, 
    updateProject,
    markDayComplete, 
    markDayIncomplete,
    calculateProjectProgress 
  } = useProjectStore();
  const { openWorkoutModal } = useWorkoutStore();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = createStyles(theme);

  const { projectId, project: routeProject } = route.params as ProjectDetailRouteParams;
  
  const [currentProject, setCurrentProject] = useState<TrainingProject | null>(
    routeProject || projects.find(p => p.id === projectId) || null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [updatingDay, setUpdatingDay] = useState<number | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  // Handle back navigation
  const handleBack = () => {
    navigation.goBack();
  };

  // Toggle day expansion
  const toggleDayExpansion = (dayIndex: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayIndex)) {
      newExpanded.delete(dayIndex);
    } else {
      newExpanded.add(dayIndex);
    }
    setExpandedDays(newExpanded);
  };

  // Load project data
  const loadProject = useCallback(() => {
    if (routeProject) {
      setCurrentProject(routeProject);
      return;
    }
    
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    } else {
      Alert.alert('Error', 'Project not found');
      navigation.goBack();
    }
  }, [projectId, routeProject, projects, navigation]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadProject();
    }, [loadProject])
  );

  // Refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProject();
    setTimeout(() => setRefreshing(false), 1000);
  }, [loadProject]);

  // Activity helpers
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

  // Get workout title for a day
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
      // Cardio activities
      return `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`;
    }
  };

  // Get workout details for expanded view
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
    
    // Enhanced debugging
    console.log('🔍 DEBUG: Day activities structure:', day.activities);
    day.activities.forEach((activity, index) => {
      console.log(`🔍 Activity ${index}:`, {
        name: activity.name,
        type: activity.type,
        exercises: activity.exercises,
        exerciseCount: activity.exercises?.length || 0,
        exerciseTypes: activity.exercises?.map(ex => ex.workoutType)
      });
    });

    // For gym workouts, use the first activity type
    const mainActivity = day.activities[0];
    const workoutType = mainActivity.type as WorkoutType;
    
    // Smart exercise filtering
    const exercises = day.activities.flatMap(activity => {
      if (!activity.exercises || activity.exercises.length === 0) {
        return [];
      }
      
      // Filter exercises to match the activity type
      const matchingExercises = activity.exercises.filter(exercise => 
        exercise.workoutType === activity.type
      );
      
      console.log(`🔍 Filtered exercises for ${activity.name}:`, {
        originalCount: activity.exercises.length,
        filteredCount: matchingExercises.length,
        matchingExercises
      });
      
      return matchingExercises;
    });

    console.log('🚀 FINAL: Opening workout modal with:', {
      type: workoutType,
      totalExerciseCount: exercises.length,
      exercises: exercises.map(ex => ({
        name: ex.name,
        type: ex.workoutType,
        id: ex.id
      }))
    });

    // Open workout modal
    openWorkoutModal(workoutType, {
      projectContext: {
        projectId: currentProject.id,
        projectName: currentProject.title,
        dayIndex: dayIndex,
        dayName: day.name
      },
      preSelectedExercises: exercises,
      // Pass focus areas for gym workouts
      ...(workoutType === WorkoutType.GYM && day.focusAreas && {
        customMuscleGroups: day.focusAreas
      })
    });
  };

  // Toggle day completion
  const handleToggleDayCompletion = async (dayIndex: number, completed: boolean) => {
    if (!currentProject) return;

    try {
      setUpdatingDay(dayIndex);
      
      if (completed) {
        await markDayComplete(currentProject.id, dayIndex);
      } else {
        await markDayIncomplete(currentProject.id, dayIndex);
      }
      
      // Refresh project data
      loadProject();
      
    } catch (error) {
      console.error('❌ Error updating day completion:', error);
      Alert.alert('Error', 'Failed to update progress');
    } finally {
      setUpdatingDay(null);
    }
  };

  // Calculate progress
  const calculateProgress = () => {
    if (!currentProject) return 0;
    const progress = calculateProjectProgress(currentProject);
    return Math.round(progress.completionPercentage);
  };

  const getDaysCompleted = () => {
    if (!currentProject) return 0;
    return currentProject.dailyWorkouts.filter(day => day.completed).length;
  };

  const hasWorkouts = (day: DailyWorkout) => {
    return !day.activities.some(activity => activity.name === 'Rest Day') && 
           day.activities.length > 0;
  };

  // Loading state
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
  const sortedWorkouts = [...currentProject.dailyWorkouts].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <ThemeView style={styles.container}>
      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ← Back
          </ThemeText>
        </TouchableOpacity>
        <ThemeText variant="h2" style={styles.headerTitle}>
          Project Details
        </ThemeText>
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
        
        {/* Project Header */}
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

        {/* Progress Overview */}
        <View style={styles.progressSection}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
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
            
            return (
              <View 
                key={day.dayIndex}
                style={[
                  styles.dayCard,
                  isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
                  day.completed && { borderColor: '#10B981', borderWidth: 2 }
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
                      {day.completed && (
                        <View style={[styles.completedBadge, { backgroundColor: '#10B981' }]}>
                          <ThemeText variant="caption" style={styles.completedText}>Completed</ThemeText>
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
                      day.completed && { color: '#10B981' }
                    ]}>
                      {day.completed ? 'Completed ✓' : 
                       canStartWorkout ? 'Ready to start' : 
                       'No workouts'}
                    </ThemeText>
                  </View>

                  {/* Start Workout Button */}
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