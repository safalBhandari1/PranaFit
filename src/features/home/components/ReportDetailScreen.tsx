
// // src/features/home/components/ReportDetailScreen.tsx
// import React, { useState, useMemo } from 'react';
// import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { EnhancedWorkoutSession, WorkoutType, WorkoutExercise, CardioMetrics, WorkoutSet } from '../../workout/types/workout';
// import { createReportDetailStyles } from '../styles/reportDetailStyles';

// // Define route params interface
// interface ReportDetailRouteParams {
//   workout: EnhancedWorkoutSession;
// }

// // Helper component for circular progress indicator
// interface CircularProgressProps {
//   progress: number; // 0 to 100
//   size: number;
//   strokeWidth: number;
//   color: string;
//   label: string;
//   value: string; // Raw value to show inside circle (e.g., "10", "100kg", "45m")
// }

// const CircularProgress: React.FC<CircularProgressProps> = ({ 
//   progress, 
//   size, 
//   strokeWidth, 
//   color, 
//   label,
//   value 
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;
  
//   return (
//     <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
//       <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//         {/* Background circle */}
//         <View
//           style={{
//             width: size,
//             height: size,
//             borderRadius: size / 2,
//             borderWidth: strokeWidth,
//             borderColor: `${color}30`,
//             position: 'absolute',
//           }}
//         />
        
//         {/* Progress circle */}
//         <View
//           style={{
//             width: size,
//             height: size,
//             position: 'absolute',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <View
//             style={{
//               width: size - strokeWidth * 2,
//               height: size - strokeWidth * 2,
//               borderRadius: (size - strokeWidth * 2) / 2,
//               backgroundColor: color,
//               opacity: progress / 100,
//               transform: [{ scale: progress / 100 }],
//             }}
//           />
//         </View>
        
//         {/* Center text - NOW SHOWS RAW VALUE instead of percentage */}
//         <View style={{ alignItems: 'center' }}>
//           <ThemeText style={{ fontSize: 18, fontWeight: '700', color: color }}> {/* Increased font size for larger circle */}
//             {value}
//           </ThemeText>
//         </View>
//       </View>
      
//       {/* Label */}
//       <ThemeText style={{ marginTop: 8, fontSize: 12, fontWeight: '600', textAlign: 'center' }}>
//         {label}
//       </ThemeText>
//     </View>
//   );
// };

// const ReportDetailScreen: React.FC = () => {
//   const route = useRoute();
//   const { workout } = route.params as ReportDetailRouteParams;
//   const { theme } = useEnhancedTheme();
//   const navigation = useNavigation();
//   const styles = createReportDetailStyles(theme);

//   // Calculate workout analytics
//   const workoutAnalytics = useMemo(() => {
//     let totalSets = 0;
//     let totalReps = 0;
//     let totalVolume = 0;
//     const exercisePRs: Array<{name: string, prWeight: number, prReps: number}> = [];
    
//     // Calculate from trackingData for GYM workouts
//     if (workout.trackingData && Array.isArray(workout.trackingData)) {
//       workout.trackingData.forEach((exercise: any) => {
//         const sets = exercise.sets || [];
//         totalSets += sets.length;
        
//         let exerciseMaxWeight = 0;
//         let exerciseMaxReps = 0;
        
//         sets.forEach((set: any) => {
//           const reps = set.reps || 0;
//           const weight = set.weight || 0;
          
//           totalReps += reps;
//           totalVolume += weight * reps;
          
//           // Track PRs for this exercise
//           if (weight > exerciseMaxWeight) exerciseMaxWeight = weight;
//           if (reps > exerciseMaxReps) exerciseMaxReps = reps;
//         });
        
//         // Only add exercise if it has data
//         if (sets.length > 0) {
//           exercisePRs.push({
//             name: exercise.name || 'Unknown Exercise',
//             prWeight: exerciseMaxWeight,
//             prReps: exerciseMaxReps
//           });
//         }
//       });
//     } else if (workout.exercises && workout.exercises.length > 0) {
//       // Fallback to exercises array
//       workout.exercises.forEach(exercise => {
//         const sets = exercise.sets || [];
//         totalSets += sets.length;
        
//         let exerciseMaxWeight = 0;
//         let exerciseMaxReps = 0;
        
//         sets.forEach((set: any) => {
//           const reps = set.reps || 0;
//           const weight = set.weight || 0;
          
//           totalReps += reps;
//           totalVolume += weight * reps;
          
//           if (weight > exerciseMaxWeight) exerciseMaxWeight = weight;
//           if (reps > exerciseMaxReps) exerciseMaxReps = reps;
//         });
        
//         if (sets.length > 0) {
//           exercisePRs.push({
//             name: exercise.name,
//             prWeight: exerciseMaxWeight,
//             prReps: exerciseMaxReps
//           });
//         }
//       });
//     }
    
//     return { totalSets, totalReps, totalVolume, exercisePRs };
//   }, [workout]);

//   const getWorkoutEmoji = (type: WorkoutType) => {
//     switch (type) {
//       case WorkoutType.GYM: return '🏋️';
//       case WorkoutType.RUNNING: return '🏃';
//       case WorkoutType.CYCLING: return '🚴';
//       case WorkoutType.YOGA: return '🧘';
//       case WorkoutType.CALISTHENICS: return '💪';
//       case WorkoutType.WALKING: return '🚶';
//       case WorkoutType.ELLIPTICAL: return '🏃‍♂️';
//       case WorkoutType.JUMBA: return '💃';
//       default: return '❤️';
//     }
//   };

//   const formatDate = (date: Date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDuration = (minutes: number) => {
//     if (minutes < 60) return `${minutes}m`;
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
//   };

//   // Get workout subtitle (project context or direct)
//   const getWorkoutSubtitle = () => {
//     if (workout.projectContext) {
//       return `${workout.projectContext.projectName} • Day ${workout.projectContext.dayIndex + 1}`;
//     }
//     return 'Direct Session';
//   };

//   // Get workout type specific data
//   const getWorkoutTypeData = () => {
//     const { totalSets, totalReps, totalVolume, exercisePRs } = workoutAnalytics;
    
//     // Calculate progress percentages (normalized for visualization)
//     const maxSets = 30; // Assuming 30 sets as maximum for 100%
//     const maxReps = 300; // Assuming 300 reps as maximum for 100%
//     const maxVolume = 10000; // Assuming 10,000kg as maximum for 100%
    
//     const setsProgress = Math.min((totalSets / maxSets) * 100, 100);
//     const repsProgress = Math.min((totalReps / maxReps) * 100, 100);
//     const volumeProgress = Math.min((totalVolume / maxVolume) * 100, 100);
    
//     return {
//       setsProgress,
//       repsProgress,
//       volumeProgress,
//       totalSets,
//       totalReps,
//       totalVolume,
//       exercisePRs
//     };
//   };

//   // Check if workout has exercises (Gym, Yoga, Calisthenics)
//   const hasExercises = () => {
//     return workout.trackingData && 
//            Array.isArray(workout.trackingData) && 
//            workout.trackingData.length > 0 &&
//            [WorkoutType.GYM, WorkoutType.YOGA, WorkoutType.CALISTHENICS].includes(workout.type);
//   };

//   const workoutData = getWorkoutTypeData();
//   const subtitle = getWorkoutSubtitle();

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header */}
//       <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}
//         >
//           <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
//             ← Back
//           </ThemeText>
//         </TouchableOpacity>
//         <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
//           Workout Report
//         </ThemeText>
//         <View style={styles.headerSpacer} />
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* 🚀 UPDATED: Workout Summary Card */}
//         <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
//           {/* Row 1: Workout Type + Date */}
//           <View style={styles.cardHeader}>
//             <View style={styles.workoutTitleContainer}>
//               <ThemeText style={[styles.workoutEmoji, { fontSize: 20 }]}>
//                 {getWorkoutEmoji(workout.type)}
//               </ThemeText>
//               <ThemeText style={[styles.workoutType, { color: theme.colors.text.primary }]}>
//                 {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
//               </ThemeText>
//             </View>
            
//             <ThemeText style={[styles.workoutDate, { color: theme.colors.text.secondary }]}>
//               {formatDate(workout.startTime)}
//             </ThemeText>
//           </View>
          
//           {/* Row 2: Subtitle */}
//           <ThemeText style={[styles.workoutSubtitle, { color: theme.colors.text.secondary }]}>
//             {subtitle}
//           </ThemeText>
          
//           {/* 🚀 UPDATED: Circular Progress Indicators - NOW 4 CIRCLES, LARGER SIZE, LEFT ALIGNED */}
//           <View style={styles.circularProgressContainer}>
//             <CircularProgress
//               progress={workoutData.setsProgress}
//               size={60} // INCREASED BY 50% (from 60 to 90)
//               strokeWidth={3} // Increased stroke width proportionally
//               color={theme.colors.primary}
//               label="Sets"
//               value={workoutData.totalSets.toString()} // Show raw value instead of percentage
//             />
            
//             <CircularProgress
//               progress={workoutData.repsProgress}
//               size={60} // INCREASED BY 50%
//               strokeWidth={3}
//               color={theme.colors.accent}
//               label="Reps"
//               value={workoutData.totalReps.toString()} // Show raw value
//             />
            
//             <CircularProgress
//               progress={workoutData.volumeProgress}
//               size={60} // INCREASED BY 50%
//               strokeWidth={3}
//               color={theme.colors.success}
//               label="Volume"
//               value={`${workoutData.totalVolume}kg`} // Show raw value with unit
//             />
            
//             {/* 🚀 NEW: 4th Circle for Time */}
//             <CircularProgress
//               progress={Math.min((workout.duration / 180) * 100, 100)} // Assuming 180 minutes (3 hours) as max
//               size={60} // INCREASED BY 50%
//               strokeWidth={3}
//               color={theme.colors.warning}
//               label="Time"
//               value={formatDuration(workout.duration)} // Show formatted time
//             />
//           </View>
          
//           {/* 🚀 REMOVED: Stats Grid Below Circular Indicators */}
          
//           {/* 🚀 UPDATED: Personal Records Section */}
//           {workoutData.exercisePRs.length > 0 && (
//             <View style={styles.prsContainer}>
//               <ThemeText style={[styles.prsTitle, { color: theme.colors.text.primary, textAlign: 'left' }]}>
//                 Personal Records
//               </ThemeText>
              
//               {workoutData.exercisePRs.map((pr, index) => (
//                 <View key={index}>
//                   <View style={styles.prItemRow}>
//                     <ThemeText style={[styles.prExerciseName, { color: theme.colors.text.primary }]}>
//                       {pr.name}
//                     </ThemeText>
//                     <ThemeText style={[styles.prValue, { color: theme.colors.primary }]}>
//                       PR: {pr.prWeight}kg × {pr.prReps} reps
//                     </ThemeText>
//                   </View>
                  
//                   {/* Horizontal line (except after last item) */}
//                   {index < workoutData.exercisePRs.length - 1 && (
//                     <View style={[styles.prDivider, { backgroundColor: theme.colors.border }]} />
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Exercise Details for Gym & Structured Workouts */}
//         {hasExercises() && (
//           <View style={styles.section}>
//             <ThemeText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
//               Exercise Details
//             </ThemeText>
            
//             {(workout.trackingData as WorkoutExercise[]).map((exercise, index) => (
//               <View key={exercise.id || index} style={[styles.exerciseCard, { backgroundColor: theme.colors.card }]}>
//                 {/* Exercise Header */}
//                 <View style={styles.exerciseHeader}>
//                   <View style={styles.exerciseTitleContainer}>
//                     <ThemeText style={[styles.exerciseEmoji, { fontSize: 20 }]}>
//                       {exercise.name.includes('Bench') ? '🛏️' : 
//                        exercise.name.includes('Squat') ? '🦵' : 
//                        exercise.name.includes('Deadlift') ? '🏋️‍♂️' : 
//                        exercise.name.includes('Pull') ? '💪' : 
//                        exercise.name.includes('Push') ? '🚀' : '🏋️'}
//                     </ThemeText>
//                     <View style={styles.exerciseNameContainer}>
//                       <ThemeText style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
//                         {exercise.name}
//                       </ThemeText>
//                     </View>
//                   </View>
//                 </View>
                
//                 {/* Sets Table */}
//                 {exercise.sets && exercise.sets.length > 0 && (
//                   <View style={styles.setsTable}>
//                     {/* Table Header */}
//                     <View style={[styles.setsTableHeader, { backgroundColor: `${theme.colors.border}30` }]}>
//                       <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
//                         Set
//                       </ThemeText>
//                       <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
//                         Weight
//                       </ThemeText>
//                       <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
//                         Reps
//                       </ThemeText>
//                       <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
//                         Status
//                       </ThemeText>
//                     </View>
                    
//                     {/* Table Rows */}
//                     {exercise.sets.map((set, setIndex) => (
//                       <View 
//                         key={set.setId || setIndex}
//                         style={[
//                           styles.setRow,
//                           { 
//                             backgroundColor: setIndex % 2 === 0 ? 'transparent' : `${theme.colors.border}10`,
//                             borderBottomWidth: setIndex === exercise.sets.length - 1 ? 0 : 1,
//                             borderBottomColor: `${theme.colors.border}30`
//                           }
//                         ]}
//                       >
//                         <ThemeText style={[styles.setCell, { color: theme.colors.text.primary }]}>
//                           {set.setNumber || setIndex + 1}
//                         </ThemeText>
//                         <ThemeText style={[styles.setCell, { color: theme.colors.text.primary }]}>
//                           {set.weight > 0 ? `${set.weight}kg` : '-'}
//                         </ThemeText>
//                         <ThemeText style={[styles.setCell, { color: theme.colors.text.primary }]}>
//                           {set.reps > 0 ? set.reps : '-'}
//                         </ThemeText>
//                         <ThemeText style={[
//                           styles.setCell, 
//                           { 
//                             color: set.completed ? theme.colors.primary : theme.colors.text.secondary,
//                             fontWeight: set.completed ? '600' : '400'
//                           }
//                         ]}>
//                           {set.completed ? '✓' : '○'}
//                         </ThemeText>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Cardio Metrics for Running, Cycling, etc. */}
//         {workout.cardioMetrics && (
//           <View style={styles.section}>
//             <ThemeText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
//               Cardio Metrics
//             </ThemeText>
//             <View style={[styles.metricsGrid, { backgroundColor: theme.colors.card }]}>
//               {workout.cardioMetrics.distance && workout.cardioMetrics.distance > 0 && (
//                 <View style={styles.metricItem}>
//                   <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
//                     {workout.cardioMetrics.distance} km
//                   </ThemeText>
//                   <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
//                     Distance
//                   </ThemeText>
//                 </View>
//               )}
//               {workout.cardioMetrics.pace && workout.cardioMetrics.pace > 0 && (
//                 <View style={styles.metricItem}>
//                   <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
//                     {Math.floor(workout.cardioMetrics.pace)}:{Math.round((workout.cardioMetrics.pace % 1) * 60).toString().padStart(2, '0')}/km
//                   </ThemeText>
//                   <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
//                     Pace
//                   </ThemeText>
//                 </View>
//               )}
//               {workout.cardioMetrics.elevation && workout.cardioMetrics.elevation > 0 && (
//                 <View style={styles.metricItem}>
//                   <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
//                     {workout.cardioMetrics.elevation} m
//                   </ThemeText>
//                   <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
//                     Elevation
//                   </ThemeText>
//                 </View>
//               )}
//               {workout.cardioMetrics.intensity && (
//                 <View style={styles.metricItem}>
//                   <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
//                     {workout.cardioMetrics.intensity}/10
//                   </ThemeText>
//                   <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
//                     Intensity
//                   </ThemeText>
//                 </View>
//               )}
//             </View>
//           </View>
//         )}

//         {/* Notes */}
//         {workout.notes && (
//           <View style={styles.section}>
//             <ThemeText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
//               Notes
//             </ThemeText>
//             <View style={[styles.notesCard, { backgroundColor: theme.colors.card }]}>
//               <ThemeText style={[styles.notesText, { color: theme.colors.text.primary }]}>
//                 {workout.notes}
//               </ThemeText>
//             </View>
//           </View>
//         )}
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default ReportDetailScreen;

// src/features/home/components/ReportDetailScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { EnhancedWorkoutSession, WorkoutType, WorkoutExercise, CardioMetrics, WorkoutSet } from '../../workout/types/workout';
import { createReportDetailStyles } from '../styles/reportDetailStyles';

// Define route params interface
interface ReportDetailRouteParams {
  workout: EnhancedWorkoutSession;
}

// Helper function to format numbers for circle display with dynamic sizing
const formatCircleValue = (value: string, maxChars: number = 6): { displayValue: string; fontSize: number } => {
  // Calculate optimal font size based on value length
  const getFontSizeForValue = (length: number): number => {
    if (length <= 4) return 12;    // Normal size for short values
    if (length <= 5) return 11;    // Slightly smaller for 5 chars
    if (length <= 6) return 10;    // Smaller for 6 chars
    if (length <= 7) return 9;     // Even smaller for 7 chars
    return 8;                      // Smallest for 8+ chars
  };

  // If value is already short enough, return as is
  let displayValue = value;
  if (value.length > maxChars) {
    // Check if it's a number with unit
    const match = value.match(/^([\d,.]+)([a-zA-Z]+)$/);
    if (match) {
      const [, numberStr, unit] = match;
      const cleanNumberStr = numberStr.replace(/,/g, '');
      const number = parseFloat(cleanNumberStr);
      
      // Format with K for thousands
      if (number >= 1000) {
        const formattedNumber = (number / 1000).toFixed(number % 1000 === 0 ? 0 : 1);
        displayValue = `${formattedNumber}K${unit}`;
      } else {
        // Try with commas
        const withCommas = number.toLocaleString();
        if ((withCommas + unit).length <= maxChars) {
          displayValue = `${withCommas}${unit}`;
        } else {
          // Truncate with ellipsis as last resort
          displayValue = value.substring(0, maxChars - 1) + '…';
        }
      }
    } else {
      // For non-number values, truncate
      displayValue = value.substring(0, maxChars - 1) + '…';
    }
  }
  
  const fontSize = getFontSizeForValue(displayValue.length);
  return { displayValue, fontSize };
};

// Helper component for circular progress indicator
interface CircularProgressProps {
  progress: number; // 0 to 100
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
  value: string; // Raw value to show inside circle (e.g., "10", "100kg", "45m")
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  progress, 
  size, 
  strokeWidth, 
  color, 
  label,
  value 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // Format the value with dynamic sizing
  const { displayValue, fontSize } = formatCircleValue(value);
  
  return (
    <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
      <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background circle */}
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: `${color}30`,
            position: 'absolute',
          }}
        />
        
        {/* Progress circle */}
        <View
          style={{
            width: size,
            height: size,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: size - strokeWidth * 2,
              height: size - strokeWidth * 2,
              borderRadius: (size - strokeWidth * 2) / 2,
              backgroundColor: color,
              opacity: progress / 100,
              transform: [{ scale: progress / 100 }],
            }}
          />
        </View>
        
        {/* Center text with dynamic font size */}
        <View style={{ alignItems: 'center' }}>
          <ThemeText style={{ 
            fontSize, // Dynamic font size
            fontWeight: '700', 
            color: color,
            textAlign: 'center',
            lineHeight: fontSize * 1.2,
          }}>
            {displayValue}
          </ThemeText>
        </View>
      </View>
      
      {/* Label */}
      <ThemeText style={{ marginTop: 8, fontSize: 12, fontWeight: '600', textAlign: 'center' }}>
        {label}
      </ThemeText>
    </View>
  );
};

const ReportDetailScreen: React.FC = () => {
  const route = useRoute();
  const { workout } = route.params as ReportDetailRouteParams;
  const { theme } = useEnhancedTheme();
  const navigation = useNavigation();
  const styles = createReportDetailStyles(theme);

  // Calculate workout analytics
  const workoutAnalytics = useMemo(() => {
    let totalSets = 0;
    let totalReps = 0;
    let totalVolume = 0;
    const exercisePRs: Array<{name: string, prWeight: number, prReps: number}> = [];
    
    // Calculate from trackingData for GYM workouts
    if (workout.trackingData && Array.isArray(workout.trackingData)) {
      workout.trackingData.forEach((exercise: any) => {
        const sets = exercise.sets || [];
        totalSets += sets.length;
        
        let exerciseMaxWeight = 0;
        let exerciseMaxReps = 0;
        
        sets.forEach((set: any) => {
          const reps = set.reps || 0;
          const weight = set.weight || 0;
          
          totalReps += reps;
          totalVolume += weight * reps;
          
          // Track PRs for this exercise
          if (weight > exerciseMaxWeight) exerciseMaxWeight = weight;
          if (reps > exerciseMaxReps) exerciseMaxReps = reps;
        });
        
        // Only add exercise if it has data
        if (sets.length > 0) {
          exercisePRs.push({
            name: exercise.name || 'Unknown Exercise',
            prWeight: exerciseMaxWeight,
            prReps: exerciseMaxReps
          });
        }
      });
    } else if (workout.exercises && workout.exercises.length > 0) {
      // Fallback to exercises array
      workout.exercises.forEach(exercise => {
        const sets = exercise.sets || [];
        totalSets += sets.length;
        
        let exerciseMaxWeight = 0;
        let exerciseMaxReps = 0;
        
        sets.forEach((set: any) => {
          const reps = set.reps || 0;
          const weight = set.weight || 0;
          
          totalReps += reps;
          totalVolume += weight * reps;
          
          if (weight > exerciseMaxWeight) exerciseMaxWeight = weight;
          if (reps > exerciseMaxReps) exerciseMaxReps = reps;
        });
        
        if (sets.length > 0) {
          exercisePRs.push({
            name: exercise.name,
            prWeight: exerciseMaxWeight,
            prReps: exerciseMaxReps
          });
        }
      });
    }
    
    return { totalSets, totalReps, totalVolume, exercisePRs };
  }, [workout]);

  const getWorkoutEmoji = (type: WorkoutType) => {
    switch (type) {
      case WorkoutType.GYM: return '🏋️';
      case WorkoutType.RUNNING: return '🏃';
      case WorkoutType.CYCLING: return '🚴';
      case WorkoutType.YOGA: return '🧘';
      case WorkoutType.CALISTHENICS: return '💪';
      case WorkoutType.WALKING: return '🚶';
      case WorkoutType.ELLIPTICAL: return '🏃‍♂️';
      case WorkoutType.JUMBA: return '💃';
      default: return '❤️';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Format volume for circle display (adds commas for large numbers)
  const formatVolumeForCircle = (volume: number): string => {
    return `${volume.toLocaleString()}kg`;
  };

  // Get workout subtitle (project context or direct)
  const getWorkoutSubtitle = () => {
    if (workout.projectContext) {
      return `${workout.projectContext.projectName} • Day ${workout.projectContext.dayIndex + 1}`;
    }
    return 'Direct Session';
  };

  // Get workout type specific data
  const getWorkoutTypeData = () => {
    const { totalSets, totalReps, totalVolume, exercisePRs } = workoutAnalytics;
    
    // Calculate progress percentages (normalized for visualization)
    const maxSets = 30; // Assuming 30 sets as maximum for 100%
    const maxReps = 300; // Assuming 300 reps as maximum for 100%
    const maxVolume = 10000; // Assuming 10,000kg as maximum for 100%
    
    const setsProgress = Math.min((totalSets / maxSets) * 100, 100);
    const repsProgress = Math.min((totalReps / maxReps) * 100, 100);
    const volumeProgress = Math.min((totalVolume / maxVolume) * 100, 100);
    
    return {
      setsProgress,
      repsProgress,
      volumeProgress,
      totalSets,
      totalReps,
      totalVolume,
      exercisePRs
    };
  };

  // Check if workout has exercises (Gym, Yoga, Calisthenics)
  const hasExercises = () => {
    return workout.trackingData && 
           Array.isArray(workout.trackingData) && 
           workout.trackingData.length > 0 &&
           [WorkoutType.GYM, WorkoutType.YOGA, WorkoutType.CALISTHENICS].includes(workout.type);
  };

  const workoutData = getWorkoutTypeData();
  const subtitle = getWorkoutSubtitle();

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
            Workout Report
          </ThemeText>
        </View>
        
        {/* Right: Empty spacer for balance */}
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Workout Summary Card */}
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          {/* Row 1: Workout Type + Date */}
          <View style={styles.cardHeader}>
            <View style={styles.workoutTitleContainer}>
              <ThemeText style={[styles.workoutEmoji, { fontSize: 20 }]}>
                {getWorkoutEmoji(workout.type)}
              </ThemeText>
              <ThemeText style={[styles.workoutType, { color: theme.colors.text.primary }]}>
                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
              </ThemeText>
            </View>
            
            <ThemeText style={[styles.workoutDate, { color: theme.colors.text.secondary }]}>
              {formatDate(workout.startTime)}
            </ThemeText>
          </View>
          
          {/* Row 2: Subtitle */}
          <ThemeText style={[styles.workoutSubtitle, { color: theme.colors.text.secondary }]}>
            {subtitle}
          </ThemeText>
          
          {/* 🚀 UPDATED: Circular Progress Indicators - NOW WITH DYNAMIC FONT SIZING */}
          <View style={styles.circularProgressContainer}>
            <CircularProgress
              progress={workoutData.setsProgress}
              size={60}
              strokeWidth={3}
              color={theme.colors.primary}
              label="Sets"
              value={workoutData.totalSets.toString()} // Dynamic font sizing applied
            />
            
            <CircularProgress
              progress={workoutData.repsProgress}
              size={60}
              strokeWidth={3}
              color={theme.colors.accent}
              label="Reps"
              value={workoutData.totalReps.toString()} // Dynamic font sizing applied
            />
            
            <CircularProgress
              progress={workoutData.volumeProgress}
              size={60}
              strokeWidth={3}
              color={theme.colors.primary}
              label="Volume"
              value={formatVolumeForCircle(workoutData.totalVolume)} // Formatted with commas
            />
            
            {/* NEW: 4th Circle for Time */}
            <CircularProgress
              progress={Math.min((workout.duration / 180) * 100, 100)} // Assuming 180 minutes (3 hours) as max
              size={60}
              strokeWidth={3}
              color={theme.colors.warning}
              label="Time"
              value={formatDuration(workout.duration)} // Dynamic font sizing applied
            />
          </View>
          
          {/* Personal Records Section */}
          {workoutData.exercisePRs.length > 0 && (
            <View style={styles.prsContainer}>
              <ThemeText style={[styles.prsTitle, { color: theme.colors.text.primary, textAlign: 'left' }]}>
                Personal Records
              </ThemeText>
              
              {workoutData.exercisePRs.map((pr, index) => (
                <View key={index}>
                  <View style={styles.prItemRow}>
                    <ThemeText style={[styles.prExerciseName, { color: theme.colors.text.primary }]}>
                      {pr.name}
                    </ThemeText>
                    <ThemeText style={[styles.prValue, { color: theme.colors.primary }]}>
                      PR: {pr.prWeight}kg × {pr.prReps} reps
                    </ThemeText>
                  </View>
                  
                  {/* Horizontal line (except after last item) */}
                  {index < workoutData.exercisePRs.length - 1 && (
                    <View style={[styles.prDivider, { backgroundColor: theme.colors.border }]} />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Exercise Details for Gym & Structured Workouts */}
        {hasExercises() && (
          <View style={styles.section}>
            <ThemeText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Exercise Details
            </ThemeText>
            
            {(workout.trackingData as WorkoutExercise[]).map((exercise, index) => (
              <View key={exercise.id || index} style={[styles.exerciseCard, { backgroundColor: theme.colors.card }]}>
                {/* Exercise Header */}
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseTitleContainer}>
                    <ThemeText style={[styles.exerciseEmoji, { fontSize: 20 }]}>
                      {exercise.name.includes('Bench') ? '🛏️' : 
                       exercise.name.includes('Squat') ? '🦵' : 
                       exercise.name.includes('Deadlift') ? '🏋️‍♂️' : 
                       exercise.name.includes('Pull') ? '💪' : 
                       exercise.name.includes('Push') ? '🚀' : '🏋️'}
                    </ThemeText>
                    <View style={styles.exerciseNameContainer}>
                      <ThemeText style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
                        {exercise.name}
                      </ThemeText>
                    </View>
                  </View>
                </View>
                
                {/* Sets Table */}
                {exercise.sets && exercise.sets.length > 0 && (
                  <View style={styles.setsTable}>
                    {/* Table Header */}
                    <View style={[styles.setsTableHeader, { backgroundColor: `${theme.colors.border}30` }]}>
                      <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
                        Set
                      </ThemeText>
                      <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
                        Weight
                      </ThemeText>
                      <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
                        Reps
                      </ThemeText>
                      <ThemeText style={[styles.setHeaderText, { color: theme.colors.text.secondary }]}>
                        Status
                      </ThemeText>
                    </View>
                    
                    {/* Table Rows */}
                    {exercise.sets.map((set, setIndex) => (
                      <View 
                        key={set.setId || setIndex}
                        style={[
                          styles.setRow,
                          { 
                            backgroundColor: setIndex % 2 === 0 ? 'transparent' : `${theme.colors.border}10`,
                            borderBottomWidth: setIndex === exercise.sets.length - 1 ? 0 : 1,
                            borderBottomColor: `${theme.colors.border}30`
                          }
                        ]}
                      >
                        <ThemeText style={[styles.setCell, { color: theme.colors.text.primary }]}>
                          {set.setNumber || setIndex + 1}
                        </ThemeText>
                        <ThemeText style={[styles.setCell, { color: theme.colors.text.primary }]}>
                          {set.weight > 0 ? `${set.weight}kg` : '-'}
                        </ThemeText>
                        <ThemeText style={[styles.setCell, { color: theme.colors.text.primary }]}>
                          {set.reps > 0 ? set.reps : '-'}
                        </ThemeText>
                        <ThemeText style={[
                          styles.setCell, 
                          { 
                            color: set.completed ? theme.colors.primary : theme.colors.text.secondary,
                            fontWeight: set.completed ? '600' : '400'
                          }
                        ]}>
                          {set.completed ? '✓' : '○'}
                        </ThemeText>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Cardio Metrics for Running, Cycling, etc. */}
        {workout.cardioMetrics && (
          <View style={styles.section}>
            <ThemeText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Cardio Metrics
            </ThemeText>
            <View style={[styles.metricsGrid, { backgroundColor: theme.colors.card }]}>
              {workout.cardioMetrics.distance && workout.cardioMetrics.distance > 0 && (
                <View style={styles.metricItem}>
                  <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
                    {workout.cardioMetrics.distance} km
                  </ThemeText>
                  <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Distance
                  </ThemeText>
                </View>
              )}
              {workout.cardioMetrics.pace && workout.cardioMetrics.pace > 0 && (
                <View style={styles.metricItem}>
                  <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
                    {Math.floor(workout.cardioMetrics.pace)}:{Math.round((workout.cardioMetrics.pace % 1) * 60).toString().padStart(2, '0')}/km
                  </ThemeText>
                  <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Pace
                  </ThemeText>
                </View>
              )}
              {workout.cardioMetrics.elevation && workout.cardioMetrics.elevation > 0 && (
                <View style={styles.metricItem}>
                  <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
                    {workout.cardioMetrics.elevation} m
                  </ThemeText>
                  <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Elevation
                  </ThemeText>
                </View>
              )}
              {workout.cardioMetrics.intensity && (
                <View style={styles.metricItem}>
                  <ThemeText style={[styles.metricValue, { color: theme.colors.primary }]}>
                    {workout.cardioMetrics.intensity}/10
                  </ThemeText>
                  <ThemeText style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Intensity
                  </ThemeText>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Notes */}
        {workout.notes && (
          <View style={styles.section}>
            <ThemeText variant="h3" style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Notes
            </ThemeText>
            <View style={[styles.notesCard, { backgroundColor: theme.colors.card }]}>
              <ThemeText style={[styles.notesText, { color: theme.colors.text.primary }]}>
                {workout.notes}
              </ThemeText>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemeView>
  );
};

export default ReportDetailScreen;