// // src/features/projects/components/DietProjectDetailScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   Alert
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout } from '../types/project';
// import { createStyles } from '../styles/DietProjectDetailScreenStyles';

// interface DietProjectDetailRouteParams {
//   projectId: string;
//   project?: TrainingProject;
// }

// export const DietProjectDetailScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { projects, calculateProjectProgress, loadUserProjects } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, project: routeProject } = route.params as DietProjectDetailRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDay, setExpandedDay] = useState<number | null>(null);

//   const progress = useMemo(() => 
//     currentProject ? calculateProjectProgress(currentProject) : null,
//   [currentProject, calculateProjectProgress]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       const { useAppStore } = require('../../../shared/stores/useAppStore');
//       const user = useAppStore.getState().user;
      
//       if (user?.uid) {
//         await loadUserProjects(user.uid);
//       }
//     } catch (error) {
//       console.error('Error refreshing diet project:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('ne-NP', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getMealCompletion = (day: DailyWorkout) => {
//     if (!day.meals) return { completed: 0, total: 0 };
//     const completed = day.meals.filter(meal => meal.completed).length;
//     return { completed, total: day.meals.length };
//   };

//   const handleDayPress = (dayIndex: number) => {
//     if (!currentProject) return;
    
//     // Navigate to DietDayScreen
//     (navigation.navigate as any)('DietDay', {
//       projectId: currentProject.id,
//       dayIndex: dayIndex,
//       project: currentProject
//     });
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   if (!currentProject) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading diet plan...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
//   const totalDays = currentProject.duration;
//   const completedDays = currentProject.dailyWorkouts.filter(day => day.completed).length;
//   const completionPercentage = progress ? Math.round(progress.completionPercentage) : 0;

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <ThemeText style={[styles.backArrow, { color: theme.colors.primary }]}>
//             ←
//           </ThemeText>
//         </TouchableOpacity>
        
//         <View style={styles.headerTitleContainer}>
//           <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
//             Diet Plan
//           </ThemeText>
//         </View>
        
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
//         {/* Project Overview Card */}
//         <View style={styles.overviewCard}>
//           <ThemeText variant="h1" style={styles.projectTitle}>
//             {currentProject.title}
//           </ThemeText>
          
//           <View style={styles.projectMetaRow}>
//             <View style={styles.metaItem}>
//               <ThemeText variant="caption" style={styles.metaLabel}>
//                 Type
//               </ThemeText>
//               <ThemeText variant="body" style={styles.metaValue}>
//                 {currentProject.dietType === 'weight-loss' ? 'Weight Loss' : 'Weight Gain'}
//               </ThemeText>
//             </View>
            
//             <View style={styles.metaItem}>
//               <ThemeText variant="caption" style={styles.metaLabel}>
//                 Duration
//               </ThemeText>
//               <ThemeText variant="body" style={styles.metaValue}>
//                 {totalDays} days
//               </ThemeText>
//             </View>
            
//             <View style={styles.metaItem}>
//               <ThemeText variant="caption" style={styles.metaLabel}>
//                 Progress
//               </ThemeText>
//               <ThemeText variant="body" style={styles.metaValue}>
//                 {completedDays}/{totalDays}
//               </ThemeText>
//             </View>
//           </View>
          
//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar}>
//               <View 
//                 style={[
//                   styles.progressFill, 
//                   { 
//                     backgroundColor: theme.colors.primary,
//                     width: `${completionPercentage}%`
//                   }
//                 ]} 
//               />
//             </View>
//             <ThemeText variant="caption" style={styles.progressText}>
//               {completionPercentage}% Complete
//             </ThemeText>
//           </View>
          
//           {/* Daily Targets */}
//           {dailyCalorieTarget > 0 && (
//             <View style={styles.targetsContainer}>
//               <ThemeText variant="h3" style={styles.targetsTitle}>
//                 Daily Targets
//               </ThemeText>
//               <View style={styles.targetsGrid}>
//                 <View style={styles.targetItem}>
//                   <ThemeText variant="caption" style={styles.targetLabel}>
//                     Calories
//                   </ThemeText>
//                   <ThemeText variant="body" style={styles.targetValue}>
//                     {dailyCalorieTarget}
//                   </ThemeText>
//                 </View>
//                 <View style={styles.targetItem}>
//                   <ThemeText variant="caption" style={styles.targetLabel}>
//                     Protein
//                   </ThemeText>
//                   <ThemeText variant="body" style={styles.targetValue}>
//                     {dailyProteinTarget}g
//                   </ThemeText>
//                 </View>
//                 <View style={styles.targetItem}>
//                   <ThemeText variant="caption" style={styles.targetLabel}>
//                     Meals/Day
//                   </ThemeText>
//                   <ThemeText variant="body" style={styles.targetValue}>
//                     {currentProject.dietType === 'weight-loss' ? '3' : '5'}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>

//         {/* Days List */}
//         <View style={styles.daysSection}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Daily Schedule
//           </ThemeText>
          
//           {currentProject.dailyWorkouts.map((day, index) => {
//             const mealCompletion = getMealCompletion(day);
//             const isToday = new Date().toDateString() === new Date(day.date).toDateString();
//             const isPast = new Date(day.date) < new Date() && !isToday;
            
//             return (
//               <TouchableOpacity
//                 key={day.dayIndex}
//                 style={[
//                   styles.dayCard,
//                   isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
//                   day.completed && { backgroundColor: `${theme.colors.primary}10` }
//                 ]}
//                 onPress={() => handleDayPress(index)}
//               >
//                 <View style={styles.dayHeader}>
//                   <View style={styles.dayInfo}>
//                     <ThemeText variant="h3" style={styles.dayName}>
//                       {day.name}
//                     </ThemeText>
//                     <ThemeText variant="caption" style={styles.dayDate}>
//                       {formatDate(day.date)}
//                     </ThemeText>
                    
//                     {/* Badges */}
//                     <View style={styles.badgeContainer}>
//                       {isToday && (
//                         <View style={[styles.todayBadge, { backgroundColor: theme.colors.primary }]}>
//                           <ThemeText variant="caption" style={styles.todayText}>
//                             Today
//                           </ThemeText>
//                         </View>
//                       )}
//                       {isPast && !day.completed && (
//                         <View style={[styles.missedBadge, { backgroundColor: '#EF4444' }]}>
//                           <ThemeText variant="caption" style={styles.missedText}>
//                             Missed
//                           </ThemeText>
//                         </View>
//                       )}
//                     </View>
//                   </View>
                  
//                   <View style={styles.dayStatus}>
//                     {day.completed ? (
//                       <ThemeText variant="caption" style={[styles.completedText, { color: '#10B981' }]}>
//                         ✅ Completed
//                       </ThemeText>
//                     ) : (
//                       <ThemeText variant="caption" style={styles.inProgressText}>
//                         {mealCompletion.completed}/{mealCompletion.total} meals
//                       </ThemeText>
//                     )}
//                   </View>
//                 </View>
                
//                 {/* Nutrition Summary (if any meals completed) */}
//                 {(day.totalCalories && day.totalCalories > 0) && (
//                   <View style={styles.nutritionSummary}>
//                     <View style={styles.nutritionRow}>
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Calories
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalCalories}
//                           {dailyCalorieTarget > 0 && (
//                             <ThemeText variant="caption" style={styles.nutritionPercentage}>
//                               {' '}({getTargetPercentage(day.totalCalories, dailyCalorieTarget)}%)
//                             </ThemeText>
//                           )}
//                         </ThemeText>
//                       </View>
                      
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Protein
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalProtein}g
//                           {dailyProteinTarget > 0 && (
//                             <ThemeText variant="caption" style={styles.nutritionPercentage}>
//                               {' '}({getTargetPercentage(day.totalProtein, dailyProteinTarget)}%)
//                             </ThemeText>
//                           )}
//                         </ThemeText>
//                       </View>
//                     </View>
                    
//                     <View style={styles.nutritionRow}>
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Carbs
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalCarbs}g
//                         </ThemeText>
//                       </View>
                      
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Fat
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalFat}g
//                         </ThemeText>
//                       </View>
//                     </View>
//                   </View>
//                 )}
                
//                 {/* Action Button */}
//                 <TouchableOpacity
//                   style={[
//                     styles.trackButton,
//                     { backgroundColor: day.completed ? '#10B981' : theme.colors.primary }
//                   ]}
//                   onPress={() => handleDayPress(index)}
//                 >
//                   <ThemeText variant="body" style={styles.trackButtonText}>
//                     {day.completed ? 'View Details' : 'Track Meals →'}
//                   </ThemeText>
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
        
//         {/* Empty space at bottom */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default DietProjectDetailScreen;



// // src/features/projects/components/DietProjectDetailScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   Alert
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout } from '../types/project';
// import { createStyles } from '../styles/DietProjectDetailScreenStyles';

// interface DietProjectDetailRouteParams {
//   projectId: string;
//   project?: TrainingProject;
// }

// export const DietProjectDetailScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { projects, calculateProjectProgress, loadUserProjects } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, project: routeProject } = route.params as DietProjectDetailRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedDay, setExpandedDay] = useState<number | null>(null);

//   const progress = useMemo(() => 
//     currentProject ? calculateProjectProgress(currentProject) : null,
//   [currentProject, calculateProjectProgress]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       const { useAppStore } = require('../../../shared/stores/useAppStore');
//       const user = useAppStore.getState().user;
      
//       if (user?.uid) {
//         await loadUserProjects(user.uid);
//       }
//     } catch (error) {
//       console.error('Error refreshing diet project:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', {  // ✅ CHANGED: English locale
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getMealCompletion = (day: DailyWorkout) => {
//     if (!day.meals) return { completed: 0, total: 0 };
//     const completed = day.meals.filter(meal => meal.completed).length;
//     return { completed, total: day.meals.length };
//   };

//   const handleDayPress = (dayIndex: number) => {
//     if (!currentProject) return;
    
//     // Navigate to DietDayScreen
//     (navigation.navigate as any)('DietDay', {
//       projectId: currentProject.id,
//       dayIndex: dayIndex,
//       project: currentProject
//     });
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   if (!currentProject) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading diet plan...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
//   const totalDays = currentProject.duration;
//   const completedDays = currentProject.dailyWorkouts.filter(day => day.completed).length;
//   const completionPercentage = progress ? Math.round(progress.completionPercentage) : 0;

//   return (
//     <ThemeView style={styles.container}>
//       {/* ✅ UPDATED: Header matching ReportDetailScreen (Twitter style) */}
//       <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
//         {/* Left: Back Arrow (Twitter style - only arrow, no text) */}
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}
//         >
//           <ThemeText style={[styles.backArrow, { color: theme.colors.primary, fontSize: 24 }]}>
//             ←
//           </ThemeText>
//         </TouchableOpacity>
        
//         {/* Center: Title */}
//         <View style={styles.headerTitleContainer}>
//           <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
//             Diet Plan
//           </ThemeText>
//         </View>
        
//         {/* Right: Empty spacer for balance */}
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
//         {/* Project Overview Card */}
//         <View style={styles.overviewCard}>
//           <ThemeText variant="h1" style={styles.projectTitle}>
//             {currentProject.title}
//           </ThemeText>
          
//           <View style={styles.projectMetaRow}>
//             <View style={styles.metaItem}>
//               <ThemeText variant="caption" style={styles.metaLabel}>
//                 Type
//               </ThemeText>
//               <ThemeText variant="body" style={styles.metaValue}>
//                 {currentProject.dietType === 'weight-loss' ? 'Weight Loss' : 'Weight Gain'}
//               </ThemeText>
//             </View>
            
//             <View style={styles.metaItem}>
//               <ThemeText variant="caption" style={styles.metaLabel}>
//                 Duration
//               </ThemeText>
//               <ThemeText variant="body" style={styles.metaValue}>
//                 {totalDays} days
//               </ThemeText>
//             </View>
            
//             <View style={styles.metaItem}>
//               <ThemeText variant="caption" style={styles.metaLabel}>
//                 Progress
//               </ThemeText>
//               <ThemeText variant="body" style={styles.metaValue}>
//                 {completedDays}/{totalDays}
//               </ThemeText>
//             </View>
//           </View>
          
//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar}>
//               <View 
//                 style={[
//                   styles.progressFill, 
//                   { 
//                     backgroundColor: theme.colors.primary,
//                     width: `${completionPercentage}%`
//                   }
//                 ]} 
//               />
//             </View>
//             <ThemeText variant="caption" style={styles.progressText}>
//               {completionPercentage}% Complete
//             </ThemeText>
//           </View>
          
//           {/* Daily Targets */}
//           {dailyCalorieTarget > 0 && (
//             <View style={styles.targetsContainer}>
//               <ThemeText variant="h3" style={styles.targetsTitle}>
//                 Daily Targets
//               </ThemeText>
//               <View style={styles.targetsGrid}>
//                 <View style={styles.targetItem}>
//                   <ThemeText variant="caption" style={styles.targetLabel}>
//                     Calories
//                   </ThemeText>
//                   <ThemeText variant="body" style={styles.targetValue}>
//                     {dailyCalorieTarget}
//                   </ThemeText>
//                 </View>
//                 <View style={styles.targetItem}>
//                   <ThemeText variant="caption" style={styles.targetLabel}>
//                     Protein
//                   </ThemeText>
//                   <ThemeText variant="body" style={styles.targetValue}>
//                     {dailyProteinTarget}g
//                   </ThemeText>
//                 </View>
//                 <View style={styles.targetItem}>
//                   <ThemeText variant="caption" style={styles.targetLabel}>
//                     Meals/Day
//                   </ThemeText>
//                   <ThemeText variant="body" style={styles.targetValue}>
//                     {currentProject.dietType === 'weight-loss' ? '3' : '5'}
//                   </ThemeText>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>

//         {/* Days List */}
//         <View style={styles.daysSection}>
//           <ThemeText variant="h2" style={styles.sectionTitle}>
//             Daily Schedule
//           </ThemeText>
          
//           {currentProject.dailyWorkouts.map((day, index) => {
//             const mealCompletion = getMealCompletion(day);
//             const isToday = new Date().toDateString() === new Date(day.date).toDateString();
//             const isPast = new Date(day.date) < new Date() && !isToday;
            
//             return (
//               <TouchableOpacity
//                 key={day.dayIndex}
//                 style={[
//                   styles.dayCard,
//                   isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
//                   day.completed && { backgroundColor: `${theme.colors.primary}10` }
//                 ]}
//                 onPress={() => handleDayPress(index)}
//               >
//                 <View style={styles.dayHeader}>
//                   <View style={styles.dayInfo}>
//                     <ThemeText variant="h3" style={styles.dayName}>
//                       {day.name}  {/* ✅ Already English from template update */}
//                     </ThemeText>
//                     <ThemeText variant="caption" style={styles.dayDate}>
//                       {formatDate(day.date)}
//                     </ThemeText>
                    
//                     {/* Badges */}
//                     <View style={styles.badgeContainer}>
//                       {isToday && (
//                         <View style={[styles.todayBadge, { backgroundColor: theme.colors.primary }]}>
//                           <ThemeText variant="caption" style={styles.todayText}>
//                             Today
//                           </ThemeText>
//                         </View>
//                       )}
//                       {isPast && !day.completed && (
//                         <View style={[styles.missedBadge, { backgroundColor: '#EF4444' }]}>
//                           <ThemeText variant="caption" style={styles.missedText}>
//                             Missed
//                           </ThemeText>
//                         </View>
//                       )}
//                     </View>
//                   </View>
                  
//                   <View style={styles.dayStatus}>
//                     {day.completed ? (
//                       <ThemeText variant="caption" style={[styles.completedText, { color: '#10B981' }]}>
//                         ✅ Completed
//                       </ThemeText>
//                     ) : (
//                       <ThemeText variant="caption" style={styles.inProgressText}>
//                         {mealCompletion.completed}/{mealCompletion.total} meals
//                       </ThemeText>
//                     )}
//                   </View>
//                 </View>
                
//                 {/* Nutrition Summary (if any meals completed) */}
//                 {(day.totalCalories && day.totalCalories > 0) && (
//                   <View style={styles.nutritionSummary}>
//                     <View style={styles.nutritionRow}>
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Calories
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalCalories}
//                           {dailyCalorieTarget > 0 && (
//                             <ThemeText variant="caption" style={styles.nutritionPercentage}>
//                               {' '}({getTargetPercentage(day.totalCalories, dailyCalorieTarget)}%)
//                             </ThemeText>
//                           )}
//                         </ThemeText>
//                       </View>
                      
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Protein
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalProtein}g
//                           {dailyProteinTarget > 0 && (
//                             <ThemeText variant="caption" style={styles.nutritionPercentage}>
//                               {' '}({getTargetPercentage(day.totalProtein, dailyProteinTarget)}%)
//                             </ThemeText>
//                           )}
//                         </ThemeText>
//                       </View>
//                     </View>
                    
//                     <View style={styles.nutritionRow}>
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Carbs
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalCarbs}g
//                         </ThemeText>
//                       </View>
                      
//                       <View style={styles.nutritionItem}>
//                         <ThemeText variant="caption" style={styles.nutritionLabel}>
//                           Fat
//                         </ThemeText>
//                         <ThemeText variant="body" style={styles.nutritionValue}>
//                           {day.totalFat}g
//                         </ThemeText>
//                       </View>
//                     </View>
//                   </View>
//                 )}
                
//                 {/* ✅ UPDATED: "View Details →" button bottom-right (ProjectHomeScreen style) */}
//                 <View style={styles.dayFooter}>
//                   <View style={styles.footerSpacer} />
//                   <TouchableOpacity
//                     style={[
//                       styles.trackButton,
//                       { backgroundColor: day.completed ? '#10B981' : theme.colors.primary }
//                     ]}
//                     onPress={() => handleDayPress(index)}
//                   >
//                     <ThemeText variant="body" style={styles.trackButtonText}>
//                       {day.completed ? 'View Details' : 'View Details'} →
//                     </ThemeText>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
        
//         {/* Empty space at bottom */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default DietProjectDetailScreen;



// src/features/projects/components/DietProjectDetailScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useProjectStore } from '../stores/useProjectStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { TrainingProject, DailyWorkout } from '../types/project';
import { createStyles } from '../styles/DietProjectDetailScreenStyles';

interface DietProjectDetailRouteParams {
  projectId: string;
  project?: TrainingProject;
}

export const DietProjectDetailScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { projects, calculateProjectProgress, loadUserProjects } = useProjectStore();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = createStyles(theme);

  const { projectId, project: routeProject } = route.params as DietProjectDetailRouteParams;
  
  const currentProject = useMemo(() => 
    projects.find(p => p.id === projectId) || routeProject || null,
  [projects, projectId, routeProject]);

  const [refreshing, setRefreshing] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const progress = useMemo(() => 
    currentProject ? calculateProjectProgress(currentProject) : null,
  [currentProject, calculateProjectProgress]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const { useAppStore } = require('../../../shared/stores/useAppStore');
      const user = useAppStore.getState().user;
      
      if (user?.uid) {
        await loadUserProjects(user.uid);
      }
    } catch (error) {
      console.error('Error refreshing diet project:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMealCompletion = (day: DailyWorkout) => {
    if (!day.meals) return { completed: 0, total: 0 };
    const completed = day.meals.filter(meal => meal.completed).length;
    return { completed, total: day.meals.length };
  };

  const handleDayPress = (dayIndex: number) => {
    if (!currentProject) return;
    
    // Navigate to DietDayScreen
    (navigation.navigate as any)('DietDay', {
      projectId: currentProject.id,
      dayIndex: dayIndex,
      project: currentProject
    });
  };

  const getTargetPercentage = (actual: number, target: number) => {
    if (!target || target === 0) return 0;
    return Math.round((actual / target) * 100);
  };

  if (!currentProject) {
    return (
      <ThemeView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemeText variant="body">Loading diet plan...</ThemeText>
        </View>
      </ThemeView>
    );
  }

  const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
  const totalDays = currentProject.duration;
  const completedDays = currentProject.dailyWorkouts.filter(day => day.completed).length;
  const completionPercentage = progress ? Math.round(progress.completionPercentage) : 0;

  return (
    <ThemeView style={styles.container}>
      {/* Header matching ReportDetailScreen (Twitter style) */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ThemeText style={[styles.backArrow, { color: theme.colors.primary, fontSize: 24 }]}>
            ←
          </ThemeText>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
            Diet Plan
          </ThemeText>
        </View>
        
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
        {/* Project Overview Card */}
        <View style={styles.overviewCard}>
          <ThemeText variant="h1" style={styles.projectTitle}>
            {currentProject.title}
          </ThemeText>
          
          <View style={styles.projectMetaRow}>
            <View style={styles.metaItem}>
              <ThemeText variant="caption" style={styles.metaLabel}>
                Type
              </ThemeText>
              <ThemeText variant="body" style={styles.metaValue}>
                {currentProject.dietType === 'weight-loss' ? 'Weight Loss' : 'Weight Gain'}
              </ThemeText>
            </View>
            
            <View style={styles.metaItem}>
              <ThemeText variant="caption" style={styles.metaLabel}>
                Duration
              </ThemeText>
              <ThemeText variant="body" style={styles.metaValue}>
                {totalDays} days
              </ThemeText>
            </View>
            
            <View style={styles.metaItem}>
              <ThemeText variant="caption" style={styles.metaLabel}>
                Progress
              </ThemeText>
              <ThemeText variant="body" style={styles.metaValue}>
                {completedDays}/{totalDays}
              </ThemeText>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: theme.colors.primary,
                    width: `${completionPercentage}%`
                  }
                ]} 
              />
            </View>
            <ThemeText variant="caption" style={styles.progressText}>
              {completionPercentage}% Complete
            </ThemeText>
          </View>
          
          {/* Daily Targets */}
          {dailyCalorieTarget > 0 && (
            <View style={styles.targetsContainer}>
              <ThemeText variant="h3" style={styles.targetsTitle}>
                Daily Targets
              </ThemeText>
              <View style={styles.targetsGrid}>
                <View style={styles.targetItem}>
                  <ThemeText variant="caption" style={styles.targetLabel}>
                    Calories
                  </ThemeText>
                  <ThemeText variant="body" style={styles.targetValue}>
                    {dailyCalorieTarget}
                  </ThemeText>
                </View>
                <View style={styles.targetItem}>
                  <ThemeText variant="caption" style={styles.targetLabel}>
                    Protein
                  </ThemeText>
                  <ThemeText variant="body" style={styles.targetValue}>
                    {dailyProteinTarget}g
                  </ThemeText>
                </View>
                <View style={styles.targetItem}>
                  <ThemeText variant="caption" style={styles.targetLabel}>
                    Meals/Day
                  </ThemeText>
                  <ThemeText variant="body" style={styles.targetValue}>
                    {currentProject.dietType === 'weight-loss' ? '3' : '5'}
                  </ThemeText>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Days List */}
        <View style={styles.daysSection}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
            Daily Schedule
          </ThemeText>
          
          {currentProject.dailyWorkouts.map((day, index) => {
            const mealCompletion = getMealCompletion(day);
            const isToday = new Date().toDateString() === new Date(day.date).toDateString();
            const isPast = new Date(day.date) < new Date() && !isToday;
            
            return (
              <TouchableOpacity
                key={day.dayIndex}
                style={[
                  styles.dayCard,
                  isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
                  day.completed && { backgroundColor: `${theme.colors.primary}10` }
                ]}
                onPress={() => handleDayPress(index)}
              >
                <View style={styles.dayHeader}>
                  <View style={styles.dayInfo}>
                    <ThemeText variant="h3" style={styles.dayName}>
                      {day.name}
                    </ThemeText>
                    <ThemeText variant="caption" style={styles.dayDate}>
                      {formatDate(day.date)}
                    </ThemeText>
                    
                    {/* Badges */}
                    <View style={styles.badgeContainer}>
                      {isToday && (
                        <View style={[styles.todayBadge, { backgroundColor: theme.colors.primary }]}>
                          <ThemeText variant="caption" style={styles.todayText}>
                            Today
                          </ThemeText>
                        </View>
                      )}
                      {isPast && !day.completed && (
                        <View style={[styles.missedBadge, { backgroundColor: '#EF4444' }]}>
                          <ThemeText variant="caption" style={styles.missedText}>
                            Missed
                          </ThemeText>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  {/* Completed Badge (Like Today's Progress card) */}
                  {day.completed && (
                    <View style={styles.completedBadge}>
                      <ThemeText variant="caption" style={styles.completedBadgeText}>
                        ✓ Completed
                      </ThemeText>
                    </View>
                  )}
                </View>
                
                {/* ✅ UPDATED: Nutrition Summary in ONE ROW (like day screen) */}
                {(day.totalCalories && day.totalCalories > 0) && (
                  <View style={styles.nutritionSummary}>
                    <View style={styles.nutritionRow}>
                      <View style={styles.nutritionItem}>
                        <ThemeText variant="caption" style={styles.nutritionLabel}>
                          Calories
                        </ThemeText>
                        <ThemeText variant="body" style={styles.nutritionValue}>
                          {day.totalCalories}
                          {dailyCalorieTarget > 0 && (
                            <ThemeText variant="caption" style={styles.nutritionPercentage}>
                              {' '}({getTargetPercentage(day.totalCalories, dailyCalorieTarget)}%)
                            </ThemeText>
                          )}
                        </ThemeText>
                      </View>
                      
                      <View style={styles.nutritionItem}>
                        <ThemeText variant="caption" style={styles.nutritionLabel}>
                          Protein
                        </ThemeText>
                        <ThemeText variant="body" style={styles.nutritionValue}>
                          {day.totalProtein}g
                          {dailyProteinTarget > 0 && (
                            <ThemeText variant="caption" style={styles.nutritionPercentage}>
                              {' '}({getTargetPercentage(day.totalProtein, dailyProteinTarget)}%)
                            </ThemeText>
                          )}
                        </ThemeText>
                      </View>
                      
                      <View style={styles.nutritionItem}>
                        <ThemeText variant="caption" style={styles.nutritionLabel}>
                          Carbs
                        </ThemeText>
                        <ThemeText variant="body" style={styles.nutritionValue}>
                          {day.totalCarbs}g
                        </ThemeText>
                      </View>
                      
                      <View style={styles.nutritionItem}>
                        <ThemeText variant="caption" style={styles.nutritionLabel}>
                          Fat
                        </ThemeText>
                        <ThemeText variant="body" style={styles.nutritionValue}>
                          {day.totalFat}g
                        </ThemeText>
                      </View>
                    </View>
                  </View>
                )}
                
                {/* ✅ UPDATED: "View Details →" EXACTLY like ProjectHomeScreen (no container, orange text) */}
                <View style={styles.dayFooter}>
                  <ThemeText variant="caption" style={styles.dayStatus}>
                    {mealCompletion.completed === 0 ? 'Not Started' : 
                     mealCompletion.completed === mealCompletion.total ? 'Completed' :
                     `${mealCompletion.completed}/${mealCompletion.total} meals`}
                  </ThemeText>
                  
                  <TouchableOpacity
                    onPress={() => handleDayPress(index)}
                    style={styles.viewDetailsButton}
                  >
                    <ThemeText variant="caption" style={[styles.viewDetailsText, { color: theme.colors.primary }]}>
                      View Details →
                    </ThemeText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Empty space at bottom */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemeView>
  );
};

export default DietProjectDetailScreen;