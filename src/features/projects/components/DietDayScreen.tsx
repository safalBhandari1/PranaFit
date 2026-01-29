// // src/features/projects/components/DietDayScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout, NepaliMeal, MealOption } from '../types/project';
// import { createStyles } from '../styles/DietDayScreenStyles';

// interface DietDayRouteParams {
//   projectId: string;
//   dayIndex: number;
//   project?: TrainingProject;
// }

// export const DietDayScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     updateMealSelection, 
//     markMealCompleted,
//     calculateDietDayTotals 
//   } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, dayIndex, project: routeProject } = route.params as DietDayRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [selectedMeal, setSelectedMeal] = useState<NepaliMeal | null>(null);
//   const [showOptionModal, setShowOptionModal] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const currentDay = useMemo(() => {
//     if (!currentProject || dayIndex < 0 || dayIndex >= currentProject.dailyWorkouts.length) {
//       return null;
//     }
//     return currentProject.dailyWorkouts[dayIndex];
//   }, [currentProject, dayIndex]);

//   useEffect(() => {
//     if (!currentDay?.meals || currentDay.meals.length === 0) {
//       Alert.alert('Error', 'No meals found for this day');
//       navigation.goBack();
//     }
//   }, [currentDay, navigation]);

//   const handleOptionSelect = async (meal: NepaliMeal, option: MealOption) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, option.id);
//       setShowOptionModal(false);
//       setSelectedMeal(null);
//     } catch (error) {
//       console.error('Error selecting option:', error);
//       Alert.alert('Error', 'Failed to save selection');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleMealComplete = async (meal: NepaliMeal, completed: boolean) => {
//     if (!currentProject || !currentDay || !meal.selectedOptionId) {
//       Alert.alert('Notice', 'Please select a meal option first');
//       return;
//     }
    
//     try {
//       setIsSaving(true);
//       await markMealCompleted(currentProject.id, dayIndex, meal.id, completed);
//     } catch (error) {
//       console.error('Error marking meal complete:', error);
//       Alert.alert('Error', 'Failed to update meal status');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('ne-NP', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getMealTimeDisplay = (time: string) => {
//     const timeMap: Record<string, string> = {
//       'breakfast': 'बिहानको खाना (Breakfast)',
//       'lunch': 'दिउँसोको खाना (Lunch)',
//       'dinner': 'बेलुकाको खाना (Dinner)',
//       'snack': 'नास्ता (Snack)',
//       'shake': 'प्रोटीन शेक (Protein Shake)'
//     };
//     return timeMap[time] || time;
//   };

//   const calculateTotals = () => {
//     if (!currentDay?.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
//     const totals = calculateDietDayTotals(currentDay.meals);
//     return {
//       calories: totals.totalCalories,
//       protein: totals.totalProtein,
//       carbs: totals.totalCarbs,
//       fat: totals.totalFat
//     };
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   const allMealsCompleted = currentDay?.meals?.every(meal => meal.completed) || false;

//   if (!currentProject || !currentDay) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
//   const totals = calculateTotals();

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
//             {currentDay.name}
//           </ThemeText>
//           <ThemeText variant="caption" style={styles.headerSubtitle}>
//             {formatDate(currentDay.date)}
//           </ThemeText>
//         </View>
        
//         <View style={styles.headerSpacer} />
//       </View>
      
//       {/* Daily Progress Summary */}
//       <View style={styles.summaryCard}>
//         <ThemeText variant="h3" style={styles.summaryTitle}>
//           Today's Progress
//         </ThemeText>
        
//         <View style={styles.progressGrid}>
//           <View style={styles.progressItem}>
//             <ThemeText variant="caption" style={styles.progressLabel}>
//               Calories
//             </ThemeText>
//             <ThemeText variant="h2" style={styles.progressValue}>
//               {totals.calories}
//             </ThemeText>
//             {dailyCalorieTarget > 0 && (
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 /{dailyCalorieTarget} ({getTargetPercentage(totals.calories, dailyCalorieTarget)}%)
//               </ThemeText>
//             )}
//           </View>
          
//           <View style={styles.progressItem}>
//             <ThemeText variant="caption" style={styles.progressLabel}>
//               Protein
//             </ThemeText>
//             <ThemeText variant="h2" style={styles.progressValue}>
//               {totals.protein}g
//             </ThemeText>
//             {dailyProteinTarget > 0 && (
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 /{dailyProteinTarget}g ({getTargetPercentage(totals.protein, dailyProteinTarget)}%)
//               </ThemeText>
//             )}
//           </View>
          
//           <View style={styles.progressItem}>
//             <ThemeText variant="caption" style={styles.progressLabel}>
//               Meals
//             </ThemeText>
//             <ThemeText variant="h2" style={styles.progressValue}>
//               {currentDay.meals?.filter(m => m.completed).length || 0}/{currentDay.meals?.length || 0}
//             </ThemeText>
//             <ThemeText variant="caption" style={styles.progressTarget}>
//               Completed
//             </ThemeText>
//           </View>
//         </View>
        
//         {allMealsCompleted && (
//           <View style={styles.completedBanner}>
//             <ThemeText variant="body" style={styles.completedText}>
//               🎉 All meals completed for today!
//             </ThemeText>
//           </View>
//         )}
//       </View>
      
//       {/* Meals List */}
//       <ScrollView style={styles.mealsList} showsVerticalScrollIndicator={false}>
//         {currentDay.meals?.map((meal, index) => {
//           const selectedOption = meal.options.find(opt => opt.id === meal.selectedOptionId);
//           const isLastMeal = index === (currentDay.meals?.length || 0) - 1;
          
//           return (
//             <View 
//               key={meal.id} 
//               style={[
//                 styles.mealCard,
//                 meal.completed && styles.mealCardCompleted,
//                 isLastMeal && styles.lastMealCard
//               ]}
//             >
//               <View style={styles.mealHeader}>
//                 <View style={styles.mealInfo}>
//                   <ThemeText variant="h3" style={styles.mealName}>
//                     {getMealTimeDisplay(meal.time)}
//                   </ThemeText>
//                   <ThemeText variant="caption" style={styles.mealSubtitle}>
//                     Select 1 option below
//                   </ThemeText>
//                 </View>
                
//                 {/* Completion Toggle */}
//                 <TouchableOpacity
//                   style={[
//                     styles.completeButton,
//                     { 
//                       backgroundColor: meal.completed ? '#10B981' : theme.colors.border,
//                       opacity: selectedOption ? 1 : 0.5
//                     }
//                   ]}
//                   onPress={() => handleMealComplete(meal, !meal.completed)}
//                   disabled={!selectedOption || isSaving}
//                 >
//                   <ThemeText variant="caption" style={[
//                     styles.completeButtonText,
//                     { color: meal.completed ? 'white' : theme.colors.text.secondary }
//                   ]}>
//                     {meal.completed ? '✓ Completed' : 'Mark Complete'}
//                   </ThemeText>
//                 </TouchableOpacity>
//               </View>
              
//               {/* Selected Option Display */}
//               {selectedOption ? (
//                 <View style={styles.selectedOptionCard}>
//                   <View style={styles.selectedOptionHeader}>
//                     <ThemeText variant="body" style={styles.selectedOptionName}>
//                       {selectedOption.nepaliName}
//                     </ThemeText>
//                     <TouchableOpacity
//                       style={styles.changeButton}
//                       onPress={() => {
//                         setSelectedMeal(meal);
//                         setShowOptionModal(true);
//                       }}
//                       disabled={isSaving}
//                     >
//                       <ThemeText variant="caption" style={styles.changeButtonText}>
//                         Change
//                       </ThemeText>
//                     </TouchableOpacity>
//                   </View>
                  
//                   <ThemeText variant="caption" style={styles.selectedOptionDescription}>
//                     {selectedOption.description}
//                   </ThemeText>
                  
//                   <View style={styles.nutritionRow}>
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Calories
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.calories}
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Protein
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.protein}g
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Carbs
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.carbs}g
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Fat
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.fat}g
//                       </ThemeText>
//                     </View>
//                   </View>
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   style={styles.selectOptionButton}
//                   onPress={() => {
//                     setSelectedMeal(meal);
//                     setShowOptionModal(true);
//                   }}
//                   disabled={isSaving}
//                 >
//                   <ThemeText variant="body" style={styles.selectOptionText}>
//                     + Select Meal Option
//                   </ThemeText>
//                 </TouchableOpacity>
//               )}
              
//               {/* Completion Time */}
//               {meal.completedAt && (
//                 <View style={styles.completionTime}>
//                   <ThemeText variant="caption" style={styles.completionTimeText}>
//                     Completed at {meal.completedAt.toLocaleTimeString('ne-NP', { hour: '2-digit', minute: '2-digit' })}
//                   </ThemeText>
//                 </View>
//               )}
//             </View>
//           );
//         })}
        
//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
      
//       {/* Option Selection Modal */}
//       <Modal
//         visible={showOptionModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => {
//           setShowOptionModal(false);
//           setSelectedMeal(null);
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <ThemeText variant="h2" style={styles.modalTitle}>
//                 Select Meal Option
//               </ThemeText>
//               <TouchableOpacity
//                 style={styles.modalCloseButton}
//                 onPress={() => {
//                   setShowOptionModal(false);
//                   setSelectedMeal(null);
//                 }}
//               >
//                 <ThemeText style={styles.modalCloseText}>×</ThemeText>
//               </TouchableOpacity>
//             </View>
            
//             {selectedMeal && (
//               <>
//                 <ThemeText variant="h3" style={styles.modalSubtitle}>
//                   {getMealTimeDisplay(selectedMeal.time)}
//                 </ThemeText>
                
//                 <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
//                   {selectedMeal.options.map((option) => (
//                     <TouchableOpacity
//                       key={option.id}
//                       style={[
//                         styles.optionCard,
//                         selectedMeal.selectedOptionId === option.id && styles.optionCardSelected
//                       ]}
//                       onPress={() => handleOptionSelect(selectedMeal, option)}
//                       disabled={isSaving}
//                     >
//                       <View style={styles.optionHeader}>
//                         <ThemeText variant="h3" style={styles.optionName}>
//                           {option.nepaliName}
//                         </ThemeText>
//                         {selectedMeal.selectedOptionId === option.id && (
//                           <View style={styles.selectedIndicator}>
//                             <ThemeText style={styles.selectedIndicatorText}>✓</ThemeText>
//                           </View>
//                         )}
//                       </View>
                      
//                       <ThemeText variant="caption" style={styles.optionEnglishName}>
//                         {option.englishName}
//                       </ThemeText>
                      
//                       <ThemeText variant="caption" style={styles.optionDescription}>
//                         {option.description}
//                       </ThemeText>
                      
//                       <View style={styles.optionNutrition}>
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Calories
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.calories}
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Protein
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.protein}g
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Carbs
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.carbs}g
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Fat
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.fat}g
//                           </ThemeText>
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
                
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => {
//                     setShowOptionModal(false);
//                     setSelectedMeal(null);
//                   }}
//                   disabled={isSaving}
//                 >
//                   <ThemeText variant="body" style={styles.cancelButtonText}>
//                     Cancel
//                   </ThemeText>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </ThemeView>
//   );
// };

// export default DietDayScreen;



// // src/features/projects/components/DietDayScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout, NepaliMeal, MealOption } from '../types/project';
// import { createStyles } from '../styles/DietDayScreenStyles';

// interface DietDayRouteParams {
//   projectId: string;
//   dayIndex: number;
//   project?: TrainingProject;
// }

// export const DietDayScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     updateMealSelection, 
//     markMealCompleted,
//     calculateDietDayTotals 
//   } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, dayIndex, project: routeProject } = route.params as DietDayRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [selectedMeal, setSelectedMeal] = useState<NepaliMeal | null>(null);
//   const [showOptionModal, setShowOptionModal] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const currentDay = useMemo(() => {
//     if (!currentProject || dayIndex < 0 || dayIndex >= currentProject.dailyWorkouts.length) {
//       return null;
//     }
//     return currentProject.dailyWorkouts[dayIndex];
//   }, [currentProject, dayIndex]);

//   useEffect(() => {
//     if (!currentDay?.meals || currentDay.meals.length === 0) {
//       Alert.alert('Error', 'No meals found for this day');
//       navigation.goBack();
//     }
//   }, [currentDay, navigation]);

//   const handleOptionSelect = async (meal: NepaliMeal, option: MealOption) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, option.id);
//       setShowOptionModal(false);
//       setSelectedMeal(null);
//     } catch (error) {
//       console.error('Error selecting option:', error);
//       Alert.alert('Error', 'Failed to save selection');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleMealComplete = async (meal: NepaliMeal, completed: boolean) => {
//     if (!currentProject || !currentDay || !meal.selectedOptionId) {
//       Alert.alert('Notice', 'Please select a meal option first');
//       return;
//     }
    
//     try {
//       setIsSaving(true);
//       await markMealCompleted(currentProject.id, dayIndex, meal.id, completed);
//     } catch (error) {
//       console.error('Error marking meal complete:', error);
//       Alert.alert('Error', 'Failed to update meal status');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', {  // ✅ CHANGED: English locale
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getMealTimeDisplay = (time: string) => {
//     const timeMap: Record<string, string> = {
//       'breakfast': 'Breakfast',      // ✅ CHANGED: English only
//       'lunch': 'Lunch',              // ✅ CHANGED: English only
//       'dinner': 'Dinner',            // ✅ CHANGED: English only
//       'snack': 'Snack',              // ✅ CHANGED: English only
//       'shake': 'Protein Shake'       // ✅ CHANGED: English only
//     };
//     return timeMap[time] || time;
//   };

//   const calculateTotals = () => {
//     if (!currentDay?.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
//     const totals = calculateDietDayTotals(currentDay.meals);
//     return {
//       calories: totals.totalCalories,
//       protein: totals.totalProtein,
//       carbs: totals.totalCarbs,
//       fat: totals.totalFat
//     };
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   const allMealsCompleted = currentDay?.meals?.every(meal => meal.completed) || false;

//   if (!currentProject || !currentDay) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
//   const totals = calculateTotals();

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header - Will be updated in STEP 3 to match ReportDetailScreen */}
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
//             {currentDay.name}
//           </ThemeText>
//           <ThemeText variant="caption" style={styles.headerSubtitle}>
//             {formatDate(currentDay.date)}
//           </ThemeText>
//         </View>
        
//         <View style={styles.headerSpacer} />
//       </View>
      
//       {/* Daily Progress Summary */}
//       <View style={styles.summaryCard}>
//         <ThemeText variant="h3" style={styles.summaryTitle}>
//           Today's Progress
//         </ThemeText>
        
//         <View style={styles.progressGrid}>
//           <View style={styles.progressItem}>
//             <ThemeText variant="caption" style={styles.progressLabel}>
//               Calories
//             </ThemeText>
//             <ThemeText variant="h2" style={styles.progressValue}>
//               {totals.calories}
//             </ThemeText>
//             {dailyCalorieTarget > 0 && (
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 /{dailyCalorieTarget} ({getTargetPercentage(totals.calories, dailyCalorieTarget)}%)
//               </ThemeText>
//             )}
//           </View>
          
//           <View style={styles.progressItem}>
//             <ThemeText variant="caption" style={styles.progressLabel}>
//               Protein
//             </ThemeText>
//             <ThemeText variant="h2" style={styles.progressValue}>
//               {totals.protein}g
//             </ThemeText>
//             {dailyProteinTarget > 0 && (
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 /{dailyProteinTarget}g ({getTargetPercentage(totals.protein, dailyProteinTarget)}%)
//               </ThemeText>
//             )}
//           </View>
          
//           <View style={styles.progressItem}>
//             <ThemeText variant="caption" style={styles.progressLabel}>
//               Meals
//             </ThemeText>
//             <ThemeText variant="h2" style={styles.progressValue}>
//               {currentDay.meals?.filter(m => m.completed).length || 0}/{currentDay.meals?.length || 0}
//             </ThemeText>
//             <ThemeText variant="caption" style={styles.progressTarget}>
//               Completed
//             </ThemeText>
//           </View>
//         </View>
        
//         {allMealsCompleted && (
//           <View style={styles.completedBanner}>
//             <ThemeText variant="body" style={styles.completedText}>
//               🎉 All meals completed for today!
//             </ThemeText>
//           </View>
//         )}
//       </View>
      
//       {/* Meals List */}
//       <ScrollView style={styles.mealsList} showsVerticalScrollIndicator={false}>
//         {currentDay.meals?.map((meal, index) => {
//           const selectedOption = meal.options.find(opt => opt.id === meal.selectedOptionId);
//           const isLastMeal = index === (currentDay.meals?.length || 0) - 1;
          
//           return (
//             <View 
//               key={meal.id} 
//               style={[
//                 styles.mealCard,
//                 meal.completed && styles.mealCardCompleted,
//                 isLastMeal && styles.lastMealCard
//               ]}
//             >
//               <View style={styles.mealHeader}>
//                 <View style={styles.mealInfo}>
//                   <ThemeText variant="h3" style={styles.mealName}>
//                     {getMealTimeDisplay(meal.time)}  {/* ✅ Already updated to English */}
//                   </ThemeText>
//                   <ThemeText variant="caption" style={styles.mealSubtitle}>
//                     Select 1 option below
//                   </ThemeText>
//                 </View>
                
//                 {/* Completion Toggle */}
//                 <TouchableOpacity
//                   style={[
//                     styles.completeButton,
//                     { 
//                       backgroundColor: meal.completed ? '#10B981' : theme.colors.border,
//                       opacity: selectedOption ? 1 : 0.5
//                     }
//                   ]}
//                   onPress={() => handleMealComplete(meal, !meal.completed)}
//                   disabled={!selectedOption || isSaving}
//                 >
//                   <ThemeText variant="caption" style={[
//                     styles.completeButtonText,
//                     { color: meal.completed ? 'white' : theme.colors.text.secondary }
//                   ]}>
//                     {meal.completed ? '✓ Completed' : 'Mark Complete'}
//                   </ThemeText>
//                 </TouchableOpacity>
//               </View>
              
//               {/* Selected Option Display */}
//               {selectedOption ? (
//                 <View style={styles.selectedOptionCard}>
//                   <View style={styles.selectedOptionHeader}>
//                     <ThemeText variant="body" style={styles.selectedOptionName}>
//                       {selectedOption.name}  {/* ✅ CHANGED: from nepaliName to name */}
//                     </ThemeText>
//                     <TouchableOpacity
//                       style={styles.changeButton}
//                       onPress={() => {
//                         setSelectedMeal(meal);
//                         setShowOptionModal(true);
//                       }}
//                       disabled={isSaving}
//                     >
//                       <ThemeText variant="caption" style={styles.changeButtonText}>
//                         Change
//                       </ThemeText>
//                     </TouchableOpacity>
//                   </View>
                  
//                   <ThemeText variant="caption" style={styles.selectedOptionDescription}>
//                     {selectedOption.description}  {/* ✅ Already English */}
//                   </ThemeText>
                  
//                   <View style={styles.nutritionRow}>
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Calories
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.calories}
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Protein
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.protein}g
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Carbs
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.carbs}g
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Fat
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {selectedOption.fat}g
//                       </ThemeText>
//                     </View>
//                   </View>
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   style={styles.selectOptionButton}
//                   onPress={() => {
//                     setSelectedMeal(meal);
//                     setShowOptionModal(true);
//                   }}
//                   disabled={isSaving}
//                 >
//                   <ThemeText variant="body" style={styles.selectOptionText}>
//                     + Select Meal Option
//                   </ThemeText>
//                 </TouchableOpacity>
//               )}
              
//               {/* Completion Time */}
//               {meal.completedAt && (
//                 <View style={styles.completionTime}>
//                   <ThemeText variant="caption" style={styles.completionTimeText}>
//                     Completed at {meal.completedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                   </ThemeText>
//                 </View>
//               )}
//             </View>
//           );
//         })}
        
//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
      
//       {/* Option Selection Modal - Will be removed in STEP 3 */}
//       <Modal
//         visible={showOptionModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => {
//           setShowOptionModal(false);
//           setSelectedMeal(null);
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <ThemeText variant="h2" style={styles.modalTitle}>
//                 Select Meal Option
//               </ThemeText>
//               <TouchableOpacity
//                 style={styles.modalCloseButton}
//                 onPress={() => {
//                   setShowOptionModal(false);
//                   setSelectedMeal(null);
//                 }}
//               >
//                 <ThemeText style={styles.modalCloseText}>×</ThemeText>
//               </TouchableOpacity>
//             </View>
            
//             {selectedMeal && (
//               <>
//                 <ThemeText variant="h3" style={styles.modalSubtitle}>
//                   {getMealTimeDisplay(selectedMeal.time)}  {/* ✅ Already English */}
//                 </ThemeText>
                
//                 <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
//                   {selectedMeal.options.map((option) => (
//                     <TouchableOpacity
//                       key={option.id}
//                       style={[
//                         styles.optionCard,
//                         selectedMeal.selectedOptionId === option.id && styles.optionCardSelected
//                       ]}
//                       onPress={() => handleOptionSelect(selectedMeal, option)}
//                       disabled={isSaving}
//                     >
//                       <View style={styles.optionHeader}>
//                         <ThemeText variant="h3" style={styles.optionName}>
//                           {option.name}  {/* ✅ CHANGED: from nepaliName to name */}
//                         </ThemeText>
//                         {selectedMeal.selectedOptionId === option.id && (
//                           <View style={styles.selectedIndicator}>
//                             <ThemeText style={styles.selectedIndicatorText}>✓</ThemeText>
//                           </View>
//                         )}
//                       </View>
                      
//                       {/* ✅ CHANGED: Show description instead of englishName */}
//                       <ThemeText variant="caption" style={styles.optionDescription}>
//                         {option.description}
//                       </ThemeText>
                      
//                       <View style={styles.optionNutrition}>
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Calories
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.calories}
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Protein
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.protein}g
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Carbs
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.carbs}g
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Fat
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.fat}g
//                           </ThemeText>
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
                
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => {
//                     setShowOptionModal(false);
//                     setSelectedMeal(null);
//                   }}
//                   disabled={isSaving}
//                 >
//                   <ThemeText variant="body" style={styles.cancelButtonText}>
//                     Cancel
//                   </ThemeText>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </ThemeView>
//   );
// };

// export default DietDayScreen;

// // src/features/projects/components/DietDayScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout, NepaliMeal, MealOption } from '../types/project';
// import { createStyles } from '../styles/DietDayScreenStyles';

// interface DietDayRouteParams {
//   projectId: string;
//   dayIndex: number;
//   project?: TrainingProject;
// }

// export const DietDayScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     updateMealSelection, 
//     markMealCompleted,
//     calculateDietDayTotals 
//   } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, dayIndex, project: routeProject } = route.params as DietDayRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [selectedTime, setSelectedTime] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake'>('breakfast');
//   const [isSaving, setIsSaving] = useState(false);

//   const currentDay = useMemo(() => {
//     if (!currentProject || dayIndex < 0 || dayIndex >= currentProject.dailyWorkouts.length) {
//       return null;
//     }
//     return currentProject.dailyWorkouts[dayIndex];
//   }, [currentProject, dayIndex]);

//   useEffect(() => {
//     if (!currentDay?.meals || currentDay.meals.length === 0) {
//       Alert.alert('Error', 'No meals found for this day');
//       navigation.goBack();
//     }
//   }, [currentDay, navigation]);

//   const handleOptionSelect = async (meal: NepaliMeal, option: MealOption) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, option.id);
//     } catch (error) {
//       console.error('Error selecting option:', error);
//       Alert.alert('Error', 'Failed to save selection');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleMealComplete = async (meal: NepaliMeal, completed: boolean) => {
//     if (!currentProject || !currentDay || !meal.selectedOptionId) {
//       Alert.alert('Notice', 'Please select a meal option first');
//       return;
//     }
    
//     try {
//       setIsSaving(true);
//       await markMealCompleted(currentProject.id, dayIndex, meal.id, completed);
//     } catch (error) {
//       console.error('Error marking meal complete:', error);
//       Alert.alert('Error', 'Failed to update meal status');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const calculateTotals = () => {
//     if (!currentDay?.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
//     const totals = calculateDietDayTotals(currentDay.meals);
//     return {
//       calories: totals.totalCalories,
//       protein: totals.totalProtein,
//       carbs: totals.totalCarbs,
//       fat: totals.totalFat
//     };
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   const allMealsCompleted = currentDay?.meals?.every(meal => meal.completed) || false;
//   const readOnlyMode = allMealsCompleted; // Entire day becomes read-only when all meals completed

//   if (!currentProject || !currentDay) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
//   const totals = calculateTotals();
  
//   // Get current meal based on selected time
//   const currentMeal = currentDay.meals?.find(meal => meal.time === selectedTime) || null;
//   const mealOptions = currentMeal?.options || [];

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
//             {currentDay.name}
//           </ThemeText>
//         </View>
        
//         {/* Right: Empty spacer for balance */}
//         <View style={styles.headerSpacer} />
//       </View>
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* ✅ MOVED: Progress Card to content area */}
//         <View style={styles.summaryCard}>
//           <ThemeText variant="h3" style={styles.summaryTitle}>
//             Today's Progress
//           </ThemeText>
          
//           <View style={styles.progressGrid}>
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Calories
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {totals.calories}
//               </ThemeText>
//               {dailyCalorieTarget > 0 && (
//                 <ThemeText variant="caption" style={styles.progressTarget}>
//                   /{dailyCalorieTarget} ({getTargetPercentage(totals.calories, dailyCalorieTarget)}%)
//                 </ThemeText>
//               )}
//             </View>
            
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Protein
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {totals.protein}g
//               </ThemeText>
//               {dailyProteinTarget > 0 && (
//                 <ThemeText variant="caption" style={styles.progressTarget}>
//                   /{dailyProteinTarget}g ({getTargetPercentage(totals.protein, dailyProteinTarget)}%)
//                 </ThemeText>
//               )}
//             </View>
            
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Meals
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {currentDay.meals?.filter(m => m.completed).length || 0}/{currentDay.meals?.length || 0}
//               </ThemeText>
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 Completed
//               </ThemeText>
//             </View>
//           </View>
          
//           {readOnlyMode && (
//             <View style={styles.completedBanner}>
//               <ThemeText variant="body" style={styles.completedText}>
//                 🎉 All meals completed for today! (Read-only)
//               </ThemeText>
//             </View>
//           )}
          
//           <ThemeText variant="caption" style={styles.dateText}>
//             {formatDate(currentDay.date)}
//           </ThemeText>
//         </View>

//         {/* ✅ NEW: Meal Time Toggle */}
//         <View style={styles.toggleSection}>
//           <ThemeText variant="h3" style={styles.toggleTitle}>
//             Select Meal Time
//           </ThemeText>
          
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             style={styles.toggleScrollView}
//             contentContainerStyle={styles.toggleContainer}
//           >
//             {currentDay.meals?.map((meal) => (
//               <TouchableOpacity
//                 key={meal.time}
//                 style={[
//                   styles.toggleButton,
//                   selectedTime === meal.time && styles.toggleButtonActive,
//                   meal.completed && styles.toggleButtonCompleted
//                 ]}
//                 onPress={() => setSelectedTime(meal.time)}
//                 disabled={readOnlyMode}
//               >
//                 <ThemeText 
//                   variant="body" 
//                   style={[
//                     styles.toggleButtonText,
//                     selectedTime === meal.time && styles.toggleButtonTextActive,
//                     meal.completed && styles.toggleButtonTextCompleted
//                   ]}
//                 >
//                   {meal.time.charAt(0).toUpperCase() + meal.time.slice(1)}
//                   {meal.completed && ' ✓'}
//                 </ThemeText>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* ✅ UPDATED: Meal Options Display (No Modal - Direct Selection) */}
//         {currentMeal && (
//           <View style={styles.optionsSection}>
//             <View style={styles.mealHeader}>
//               <View style={styles.mealInfo}>
//                 <ThemeText variant="h2" style={styles.mealTitle}>
//                   {currentMeal.time.charAt(0).toUpperCase() + currentMeal.time.slice(1)}
//                 </ThemeText>
//                 <ThemeText variant="caption" style={styles.mealSubtitle}>
//                   Select 1 option below
//                 </ThemeText>
//               </View>
              
//               {/* Completion Status */}
//               <View style={[
//                 styles.completionStatus,
//                 currentMeal.completed && styles.completionStatusCompleted
//               ]}>
//                 <ThemeText variant="caption" style={[
//                   styles.completionStatusText,
//                   currentMeal.completed && styles.completionStatusTextCompleted
//                 ]}>
//                   {currentMeal.completed ? '✓ Completed' : 'Not Completed'}
//                 </ThemeText>
//               </View>
//             </View>
            
//             {/* Selected Option Display (if any) */}
//             {currentMeal.selectedOptionId && (
//               <View style={styles.selectedOptionCard}>
//                 <View style={styles.selectedOptionHeader}>
//                   <ThemeText variant="h3" style={styles.selectedOptionTitle}>
//                     Selected Option
//                   </ThemeText>
//                   {!readOnlyMode && (
//                     <TouchableOpacity
//                       style={styles.changeButton}
//                       onPress={() => handleOptionSelect(currentMeal, { id: '' } as MealOption)} // Deselect
//                       disabled={isSaving || currentMeal.completed}
//                     >
//                       <ThemeText variant="caption" style={styles.changeButtonText}>
//                         Change
//                       </ThemeText>
//                     </TouchableOpacity>
//                   )}
//                 </View>
                
//                 <View style={styles.selectedOptionContent}>
//                   <ThemeText variant="body" style={styles.selectedOptionName}>
//                     {currentMeal.options.find(opt => opt.id === currentMeal.selectedOptionId)?.name}
//                   </ThemeText>
//                   <ThemeText variant="caption" style={styles.selectedOptionDescription}>
//                     {currentMeal.options.find(opt => opt.id === currentMeal.selectedOptionId)?.description}
//                   </ThemeText>
                  
//                   <View style={styles.nutritionRow}>
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Calories
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {currentMeal.options.find(opt => opt.id === currentMeal.selectedOptionId)?.calories}
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Protein
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {currentMeal.options.find(opt => opt.id === currentMeal.selectedOptionId)?.protein}g
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Carbs
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {currentMeal.options.find(opt => opt.id === currentMeal.selectedOptionId)?.carbs}g
//                       </ThemeText>
//                     </View>
                    
//                     <View style={styles.nutritionItem}>
//                       <ThemeText variant="caption" style={styles.nutritionLabel}>
//                         Fat
//                       </ThemeText>
//                       <ThemeText variant="body" style={styles.nutritionValue}>
//                         {currentMeal.options.find(opt => opt.id === currentMeal.selectedOptionId)?.fat}g
//                       </ThemeText>
//                     </View>
//                   </View>
//                 </View>
                
//                 {/* Complete Button */}
//                 {!readOnlyMode && !currentMeal.completed && (
//                   <TouchableOpacity
//                     style={[
//                       styles.completeButton,
//                       { backgroundColor: theme.colors.primary }
//                     ]}
//                     onPress={() => handleMealComplete(currentMeal, true)}
//                     disabled={isSaving || !currentMeal.selectedOptionId}
//                   >
//                     <ThemeText variant="body" style={styles.completeButtonText}>
//                       Mark as Completed
//                     </ThemeText>
//                   </TouchableOpacity>
//                 )}
                
//                 {currentMeal.completedAt && (
//                   <View style={styles.completionTime}>
//                     <ThemeText variant="caption" style={styles.completionTimeText}>
//                       Completed at {currentMeal.completedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                     </ThemeText>
//                   </View>
//                 )}
//               </View>
//             )}
            
//             {/* Options List (Only show if no selection or in change mode) */}
//             {(!currentMeal.selectedOptionId || readOnlyMode) && (
//               <View style={styles.optionsList}>
//                 <ThemeText variant="h3" style={styles.optionsTitle}>
//                   Available Options
//                 </ThemeText>
                
//                 {mealOptions.map((option) => {
//                   const isSelected = currentMeal.selectedOptionId === option.id;
//                   return (
//                     <TouchableOpacity
//                       key={option.id}
//                       style={[
//                         styles.optionCard,
//                         isSelected && styles.optionCardSelected,
//                         readOnlyMode && styles.optionCardReadOnly
//                       ]}
//                       onPress={() => !readOnlyMode && handleOptionSelect(currentMeal, option)}
//                       disabled={readOnlyMode || isSaving || currentMeal.completed}
//                       activeOpacity={readOnlyMode ? 1 : 0.7}
//                     >
//                       <View style={styles.optionHeader}>
//                         <ThemeText variant="h3" style={[
//                           styles.optionName,
//                           isSelected && styles.optionNameSelected,
//                           readOnlyMode && styles.optionNameReadOnly
//                         ]}>
//                           {option.name}
//                           {isSelected && ' ✓'}
//                         </ThemeText>
                        
//                         {isSelected && (
//                           <View style={styles.selectedIndicator}>
//                             <ThemeText style={styles.selectedIndicatorText}>Selected</ThemeText>
//                           </View>
//                         )}
//                       </View>
                      
//                       <ThemeText variant="caption" style={styles.optionDescription}>
//                         {option.description}
//                       </ThemeText>
                      
//                       <View style={styles.optionNutrition}>
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Calories
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.calories}
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Protein
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.protein}g
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Carbs
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.carbs}g
//                           </ThemeText>
//                         </View>
                        
//                         <View style={styles.optionNutritionItem}>
//                           <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                             Fat
//                           </ThemeText>
//                           <ThemeText variant="body" style={styles.optionNutritionValue}>
//                             {option.fat}g
//                           </ThemeText>
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>
//             )}
//           </View>
//         )}

//         {/* Read-Only Mode Notice */}
//         {readOnlyMode && (
//           <View style={styles.readOnlyNotice}>
//             <ThemeText variant="body" style={styles.readOnlyNoticeText}>
//               🔒 This day is read-only because all meals are completed.
//             </ThemeText>
//           </View>
//         )}
        
//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default DietDayScreen;



// // src/features/projects/components/DietDayScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout, NepaliMeal, MealOption } from '../types/project';
// import { createStyles } from '../styles/DietDayScreenStyles';

// interface DietDayRouteParams {
//   projectId: string;
//   dayIndex: number;
//   project?: TrainingProject;
// }

// export const DietDayScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     updateMealSelection, 
//     markMealCompleted,
//     calculateDietDayTotals 
//   } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, dayIndex, project: routeProject } = route.params as DietDayRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [selectedTime, setSelectedTime] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake'>('breakfast');
//   const [isSaving, setIsSaving] = useState(false);

//   const currentDay = useMemo(() => {
//     if (!currentProject || dayIndex < 0 || dayIndex >= currentProject.dailyWorkouts.length) {
//       return null;
//     }
//     return currentProject.dailyWorkouts[dayIndex];
//   }, [currentProject, dayIndex]);

//   useEffect(() => {
//     if (!currentDay?.meals || currentDay.meals.length === 0) {
//       Alert.alert('Error', 'No meals found for this day');
//       navigation.goBack();
//     }
//   }, [currentDay, navigation]);

//   const handleOptionSelect = async (meal: NepaliMeal, option: MealOption) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, option.id);
//     } catch (error) {
//       console.error('Error selecting option:', error);
//       Alert.alert('Error', 'Failed to save selection');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleOptionDeselect = async (meal: NepaliMeal) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       // Pass empty string to deselect
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, '');
//     } catch (error) {
//       console.error('Error deselecting option:', error);
//       Alert.alert('Error', 'Failed to deselect option');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const calculateTotals = () => {
//     if (!currentDay?.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
//     const totals = calculateDietDayTotals(currentDay.meals);
//     return {
//       calories: totals.totalCalories,
//       protein: totals.totalProtein,
//       carbs: totals.totalCarbs,
//       fat: totals.totalFat
//     };
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   const allMealsCompleted = currentDay?.meals?.every(meal => meal.completed) || false;

//   if (!currentProject || !currentDay) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
//   const totals = calculateTotals();
  
//   // Get current meal based on selected time
//   const currentMeal = currentDay.meals?.find(meal => meal.time === selectedTime) || null;
//   const mealOptions = currentMeal?.options || [];

//   // Filter only breakfast, lunch, dinner for toggle (remove snack/shake unless weight gain)
//   const availableMealTimes = currentDay.meals
//     ?.filter(meal => ['breakfast', 'lunch', 'dinner'].includes(meal.time))
//     .map(meal => meal.time) as Array<'breakfast' | 'lunch' | 'dinner'> || [];

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header matching ReportDetailScreen (Twitter style) */}
//       <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}
//         >
//           <ThemeText style={[styles.backArrow, { color: theme.colors.primary, fontSize: 24 }]}>
//             ←
//           </ThemeText>
//         </TouchableOpacity>
        
//         <View style={styles.headerTitleContainer}>
//           <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
//             {currentDay.name}
//           </ThemeText>
//         </View>
        
//         <View style={styles.headerSpacer} />
//       </View>
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Progress Card */}
//         <View style={styles.summaryCard}>
//           <ThemeText variant="h3" style={styles.summaryTitle}>
//             Today's Progress
//           </ThemeText>
          
//           <View style={styles.progressGrid}>
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Calories
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {totals.calories}
//               </ThemeText>
//               {dailyCalorieTarget > 0 && (
//                 <ThemeText variant="caption" style={styles.progressTarget}>
//                   /{dailyCalorieTarget} ({getTargetPercentage(totals.calories, dailyCalorieTarget)}%)
//                 </ThemeText>
//               )}
//             </View>
            
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Protein
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {totals.protein}g
//               </ThemeText>
//               {dailyProteinTarget > 0 && (
//                 <ThemeText variant="caption" style={styles.progressTarget}>
//                   /{dailyProteinTarget}g ({getTargetPercentage(totals.protein, dailyProteinTarget)}%)
//                 </ThemeText>
//               )}
//             </View>
            
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Meals
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {currentDay.meals?.filter(m => m.completed).length || 0}/{currentDay.meals?.length || 0}
//               </ThemeText>
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 Completed
//               </ThemeText>
//             </View>
//           </View>
          
//           {allMealsCompleted && (
//             <View style={styles.completedBanner}>
//               <ThemeText variant="body" style={styles.completedText}>
//                 🎉 All meals completed for today!
//               </ThemeText>
//             </View>
//           )}
//         </View>

//         {/* Meal Time Toggle (Breakfast, Lunch, Dinner only) */}
//         <View style={styles.toggleSection}>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             style={styles.toggleScrollView}
//             contentContainerStyle={styles.toggleContainer}
//           >
//             {availableMealTimes.map((time) => {
//               const meal = currentDay.meals?.find(m => m.time === time);
//               return (
//                 <TouchableOpacity
//                   key={time}
//                   style={[
//                     styles.toggleButton,
//                     selectedTime === time && styles.toggleButtonActive,
//                     meal?.completed && styles.toggleButtonCompleted
//                   ]}
//                   onPress={() => setSelectedTime(time)}
//                   disabled={allMealsCompleted}
//                 >
//                   <ThemeText 
//                     variant="body" 
//                     style={[
//                       styles.toggleButtonText,
//                       selectedTime === time && styles.toggleButtonTextActive,
//                       meal?.completed && styles.toggleButtonTextCompleted
//                     ]}
//                   >
//                     {time.charAt(0).toUpperCase() + time.slice(1)}
//                     {meal?.completed && ' ✓'}
//                   </ThemeText>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* Meal Options Display */}
//         {currentMeal && (
//           <View style={styles.optionsSection}>
//             <View style={styles.mealHeader}>
//               <View style={styles.mealInfo}>
//                 <ThemeText variant="caption" style={styles.mealSubtitle}>
//                   Select 1 option below
//                 </ThemeText>
//               </View>
//             </View>
            
//             {/* Available Options with Checkboxes */}
//             <View style={styles.optionsList}>
//               {mealOptions.map((option) => {
//                 const isSelected = currentMeal.selectedOptionId === option.id;
//                 return (
//                   <TouchableOpacity
//                     key={option.id}
//                     style={[
//                       styles.optionCard,
//                       isSelected && styles.optionCardSelected,
//                       allMealsCompleted && styles.optionCardReadOnly
//                     ]}
//                     onPress={() => {
//                       if (allMealsCompleted) return;
//                       if (isSelected) {
//                         handleOptionDeselect(currentMeal);
//                       } else {
//                         handleOptionSelect(currentMeal, option);
//                       }
//                     }}
//                     disabled={allMealsCompleted || isSaving}
//                     activeOpacity={allMealsCompleted ? 1 : 0.7}
//                   >
//                     <View style={styles.optionContent}>
//                       <View style={styles.optionTextContainer}>
//                         <ThemeText variant="h3" style={[
//                           styles.optionName,
//                           isSelected && styles.optionNameSelected,
//                           allMealsCompleted && styles.optionNameReadOnly
//                         ]}>
//                           {option.name}
//                         </ThemeText>
                        
//                         <ThemeText variant="caption" style={styles.optionDescription}>
//                           {option.description}
//                         </ThemeText>
                        
//                         <View style={styles.optionNutrition}>
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Calories
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.calories}
//                             </ThemeText>
//                           </View>
                          
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Protein
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.protein}g
//                             </ThemeText>
//                           </View>
                          
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Carbs
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.carbs}g
//                             </ThemeText>
//                           </View>
                          
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Fat
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.fat}g
//                             </ThemeText>
//                           </View>
//                         </View>
//                       </View>
                      
//                       {/* Checkbox on right side */}
//                       <TouchableOpacity
//                         style={[
//                           styles.checkbox,
//                           isSelected && styles.checkboxSelected,
//                           allMealsCompleted && styles.checkboxDisabled
//                         ]}
//                         onPress={() => {
//                           if (allMealsCompleted) return;
//                           if (isSelected) {
//                             handleOptionDeselect(currentMeal);
//                           } else {
//                             handleOptionSelect(currentMeal, option);
//                           }
//                         }}
//                         disabled={allMealsCompleted || isSaving}
//                       >
//                         {isSelected && (
//                           <ThemeText style={styles.checkboxCheck}>✓</ThemeText>
//                         )}
//                       </TouchableOpacity>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         )}

//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default DietDayScreen;


// // src/features/projects/components/DietDayScreen.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { TrainingProject, DailyWorkout, NepaliMeal, MealOption } from '../types/project';
// import { createStyles } from '../styles/DietDayScreenStyles';

// interface DietDayRouteParams {
//   projectId: string;
//   dayIndex: number;
//   project?: TrainingProject;
// }

// export const DietDayScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { 
//     projects, 
//     updateMealSelection, 
//     markMealCompleted,
//     calculateDietDayTotals,
//     loadUserProjects
//   } = useProjectStore();
//   const navigation = useNavigation();
//   const route = useRoute();
//   const styles = createStyles(theme);

//   const { projectId, dayIndex, project: routeProject } = route.params as DietDayRouteParams;
  
//   const currentProject = useMemo(() => 
//     projects.find(p => p.id === projectId) || routeProject || null,
//   [projects, projectId, routeProject]);

//   const [selectedTime, setSelectedTime] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake'>('breakfast');
//   const [isSaving, setIsSaving] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const currentDay = useMemo(() => {
//     if (!currentProject || dayIndex < 0 || dayIndex >= currentProject.dailyWorkouts.length) {
//       return null;
//     }
//     return currentProject.dailyWorkouts[dayIndex];
//   }, [currentProject, dayIndex]);

//   useEffect(() => {
//     if (!currentDay?.meals || currentDay.meals.length === 0) {
//       Alert.alert('Error', 'No meals found for this day');
//       navigation.goBack();
//     }
//   }, [currentDay, navigation]);

//   const handleOptionSelect = async (meal: NepaliMeal, option: MealOption) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, option.id);
      
//       // Refresh projects to update progress
//       const { useAppStore } = require('../../../shared/stores/useAppStore');
//       const user = useAppStore.getState().user;
//       if (user?.uid) {
//         await loadUserProjects(user.uid);
//       }
//     } catch (error) {
//       console.error('Error selecting option:', error);
//       Alert.alert('Error', 'Failed to save selection');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleOptionDeselect = async (meal: NepaliMeal) => {
//     if (!currentProject || !currentDay) return;
    
//     try {
//       setIsSaving(true);
//       await updateMealSelection(currentProject.id, dayIndex, meal.id, '');
      
//       // Refresh projects to update progress
//       const { useAppStore } = require('../../../shared/stores/useAppStore');
//       const user = useAppStore.getState().user;
//       if (user?.uid) {
//         await loadUserProjects(user.uid);
//       }
//     } catch (error) {
//       console.error('Error deselecting option:', error);
//       Alert.alert('Error', 'Failed to deselect option');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleMarkDayComplete = async () => {
//     if (!currentProject || !currentDay) return;
    
//     // Check if all meals have selections
//     const allMealsSelected = currentDay.meals?.every(meal => meal.selectedOptionId) || false;
//     if (!allMealsSelected) {
//       Alert.alert('Notice', 'Please select options for all meals before marking day as complete');
//       return;
//     }
    
//     try {
//       setIsSaving(true);
      
//       // Mark all meals as completed
//       for (const meal of currentDay.meals || []) {
//         if (meal.selectedOptionId && !meal.completed) {
//           await markMealCompleted(currentProject.id, dayIndex, meal.id, true);
//         }
//       }
      
//       // Refresh projects to update progress
//       const { useAppStore } = require('../../../shared/stores/useAppStore');
//       const user = useAppStore.getState().user;
//       if (user?.uid) {
//         await loadUserProjects(user.uid);
//       }
      
//       Alert.alert('Success', 'Day marked as complete!');
//     } catch (error) {
//       console.error('Error marking day complete:', error);
//       Alert.alert('Error', 'Failed to mark day as complete');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const calculateTotals = () => {
//     if (!currentDay?.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
//     const totals = calculateDietDayTotals(currentDay.meals);
//     return {
//       calories: totals.totalCalories,
//       protein: totals.totalProtein,
//       carbs: totals.totalCarbs,
//       fat: totals.totalFat
//     };
//   };

//   const getTargetPercentage = (actual: number, target: number) => {
//     if (!target || target === 0) return 0;
//     return Math.round((actual / target) * 100);
//   };

//   const allMealsCompleted = currentDay?.meals?.every(meal => meal.completed) || false;
//   const allMealsSelected = currentDay?.meals?.every(meal => meal.selectedOptionId) || false;
//   const totals = calculateTotals();

//   if (!currentProject || !currentDay) {
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ThemeText variant="body">Loading...</ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
  
//   // Get current meal based on selected time
//   const currentMeal = currentDay.meals?.find(meal => meal.time === selectedTime) || null;
//   const mealOptions = currentMeal?.options || [];

//   // Filter only breakfast, lunch, dinner for toggle (remove snack/shake unless weight gain)
//   const availableMealTimes = currentDay.meals
//     ?.filter(meal => ['breakfast', 'lunch', 'dinner'].includes(meal.time))
//     .map(meal => meal.time) as Array<'breakfast' | 'lunch' | 'dinner'> || [];

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header matching ReportDetailScreen (Twitter style) */}
//       <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}
//         >
//           <ThemeText style={[styles.backArrow, { color: theme.colors.primary, fontSize: 24 }]}>
//             ←
//           </ThemeText>
//         </TouchableOpacity>
        
//         <View style={styles.headerTitleContainer}>
//           <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
//             {currentDay.name}
//           </ThemeText>
//         </View>
        
//         <View style={styles.headerSpacer} />
//       </View>
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Progress Card - NOW UPDATES IN REAL TIME */}
//         <View style={styles.summaryCard}>
//           <ThemeText variant="h3" style={styles.summaryTitle}>
//             Today's Progress
//           </ThemeText>
          
//           <View style={styles.progressGrid}>
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Calories
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {totals.calories}
//               </ThemeText>
//               {dailyCalorieTarget > 0 && (
//                 <ThemeText variant="caption" style={styles.progressTarget}>
//                   /{dailyCalorieTarget} ({getTargetPercentage(totals.calories, dailyCalorieTarget)}%)
//                 </ThemeText>
//               )}
//             </View>
            
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Protein
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {totals.protein}g
//               </ThemeText>
//               {dailyProteinTarget > 0 && (
//                 <ThemeText variant="caption" style={styles.progressTarget}>
//                   /{dailyProteinTarget}g ({getTargetPercentage(totals.protein, dailyProteinTarget)}%)
//                 </ThemeText>
//               )}
//             </View>
            
//             <View style={styles.progressItem}>
//               <ThemeText variant="caption" style={styles.progressLabel}>
//                 Meals
//               </ThemeText>
//               <ThemeText variant="h2" style={styles.progressValue}>
//                 {currentDay.meals?.filter(m => m.selectedOptionId).length || 0}/{currentDay.meals?.length || 0}
//               </ThemeText>
//               <ThemeText variant="caption" style={styles.progressTarget}>
//                 Selected
//               </ThemeText>
//             </View>
//           </View>
          
//           {allMealsCompleted ? (
//             <View style={styles.completedBanner}>
//               <ThemeText variant="body" style={styles.completedText}>
//                 🎉 All meals completed for today!
//               </ThemeText>
//             </View>
//           ) : allMealsSelected && (
//             <View style={styles.markCompleteBanner}>
//               <ThemeText variant="body" style={styles.markCompleteText}>
//                 All meals selected! Ready to mark day as complete.
//               </ThemeText>
//               <TouchableOpacity
//                 style={styles.markCompleteButton}
//                 onPress={handleMarkDayComplete}
//                 disabled={isSaving}
//               >
//                 <ThemeText variant="body" style={styles.markCompleteButtonText}>
//                   {isSaving ? 'Processing...' : 'Mark Day Complete'}
//                 </ThemeText>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* Meal Time Toggle (Breakfast, Lunch, Dinner only) */}
//         <View style={styles.toggleSection}>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             style={styles.toggleScrollView}
//             contentContainerStyle={styles.toggleContainer}
//           >
//             {availableMealTimes.map((time) => {
//               const meal = currentDay.meals?.find(m => m.time === time);
//               const isSelected = meal?.selectedOptionId;
//               return (
//                 <TouchableOpacity
//                   key={time}
//                   style={[
//                     styles.toggleButton,
//                     selectedTime === time && styles.toggleButtonActive,
//                     isSelected && styles.toggleButtonSelected,
//                     meal?.completed && styles.toggleButtonCompleted
//                   ]}
//                   onPress={() => setSelectedTime(time)}
//                   disabled={allMealsCompleted}
//                 >
//                   <ThemeText 
//                     variant="body" 
//                     style={[
//                       styles.toggleButtonText,
//                       selectedTime === time && styles.toggleButtonTextActive,
//                       isSelected && styles.toggleButtonTextSelected,
//                       meal?.completed && styles.toggleButtonTextCompleted
//                     ]}
//                   >
//                     {time.charAt(0).toUpperCase() + time.slice(1)}
//                     {isSelected && !meal?.completed && ' ✓'}
//                     {meal?.completed && ' ✓✓'}
//                   </ThemeText>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* Meal Options Display */}
//         {currentMeal && (
//           <View style={styles.optionsSection}>
//             <View style={styles.mealHeader}>
//               <View style={styles.mealInfo}>
//                 <ThemeText variant="caption" style={styles.mealSubtitle}>
//                   Select 1 option below
//                 </ThemeText>
//               </View>
              
//               {/* Selection Status */}
//               {currentMeal.selectedOptionId && (
//                 <View style={[
//                   styles.selectionStatus,
//                   currentMeal.completed && styles.selectionStatusCompleted
//                 ]}>
//                   <ThemeText variant="caption" style={styles.selectionStatusText}>
//                     {currentMeal.completed ? 'Completed' : 'Selected'}
//                   </ThemeText>
//                 </View>
//               )}
//             </View>
            
//             {/* Available Options with Checkboxes */}
//             <View style={styles.optionsList}>
//               {mealOptions.map((option) => {
//                 const isSelected = currentMeal.selectedOptionId === option.id;
//                 const isMealCompleted = currentMeal.completed;
                
//                 return (
//                   <TouchableOpacity
//                     key={option.id}
//                     style={[
//                       styles.optionCard,
//                       isSelected && styles.optionCardSelected,
//                       allMealsCompleted && styles.optionCardReadOnly
//                     ]}
//                     onPress={() => {
//                       if (isMealCompleted || allMealsCompleted) return;
//                       if (isSelected) {
//                         handleOptionDeselect(currentMeal);
//                       } else {
//                         handleOptionSelect(currentMeal, option);
//                       }
//                     }}
//                     disabled={isMealCompleted || allMealsCompleted || isSaving}
//                     activeOpacity={isMealCompleted || allMealsCompleted ? 1 : 0.7}
//                   >
//                     <View style={styles.optionContent}>
//                       <View style={styles.optionTextContainer}>
//                         <ThemeText variant="h3" style={[
//                           styles.optionName,
//                           isSelected && styles.optionNameSelected,
//                           (allMealsCompleted || isMealCompleted) && styles.optionNameReadOnly
//                         ]}>
//                           {option.name}
//                         </ThemeText>
                        
//                         <ThemeText variant="caption" style={styles.optionDescription}>
//                           {option.description}
//                         </ThemeText>
                        
//                         <View style={styles.optionNutrition}>
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Calories
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.calories}
//                             </ThemeText>
//                           </View>
                          
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Protein
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.protein}g
//                             </ThemeText>
//                           </View>
                          
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Carbs
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.carbs}g
//                             </ThemeText>
//                           </View>
                          
//                           <View style={styles.optionNutritionItem}>
//                             <ThemeText variant="caption" style={styles.optionNutritionLabel}>
//                               Fat
//                             </ThemeText>
//                             <ThemeText variant="body" style={styles.optionNutritionValue}>
//                               {option.fat}g
//                             </ThemeText>
//                           </View>
//                         </View>
//                       </View>
                      
//                       {/* Checkbox on right side */}
//                       <TouchableOpacity
//                         style={[
//                           styles.checkbox,
//                           isSelected && styles.checkboxSelected,
//                           (isMealCompleted || allMealsCompleted) && styles.checkboxDisabled
//                         ]}
//                         onPress={() => {
//                           if (isMealCompleted || allMealsCompleted) return;
//                           if (isSelected) {
//                             handleOptionDeselect(currentMeal);
//                           } else {
//                             handleOptionSelect(currentMeal, option);
//                           }
//                         }}
//                         disabled={isMealCompleted || allMealsCompleted || isSaving}
//                       >
//                         {isSelected && (
//                           <ThemeText style={styles.checkboxCheck}>✓</ThemeText>
//                         )}
//                       </TouchableOpacity>
//                     </View>
                    
//                     {/* Show selected option calories in Today's Progress */}
//                     {isSelected && (
//                       <View style={styles.optionCaloriesInfo}>
//                         <ThemeText variant="caption" style={styles.optionCaloriesText}>
//                           +{option.calories} calories added to Today's Progress
//                         </ThemeText>
//                       </View>
//                     )}
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         )}

//         {/* Bottom Spacer */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </ThemeView>
//   );
// };

// export default DietDayScreen;

// src/features/projects/components/DietDayScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useProjectStore } from '../stores/useProjectStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { TrainingProject, DailyWorkout, NepaliMeal, MealOption } from '../types/project';
import { createStyles } from '../styles/DietDayScreenStyles';

interface DietDayRouteParams {
  projectId: string;
  dayIndex: number;
  project?: TrainingProject;
}

export const DietDayScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    projects, 
    updateMealSelection, 
    markMealCompleted,
    loadUserProjects
  } = useProjectStore();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = createStyles(theme);

  const { projectId, dayIndex, project: routeProject } = route.params as DietDayRouteParams;
  
  const currentProject = useMemo(() => 
    projects.find(p => p.id === projectId) || routeProject || null,
  [projects, projectId, routeProject]);

  const [selectedTime, setSelectedTime] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake'>('breakfast');
  const [isSaving, setIsSaving] = useState(false);

  const currentDay = useMemo(() => {
    if (!currentProject || dayIndex < 0 || dayIndex >= currentProject.dailyWorkouts.length) {
      return null;
    }
    return currentProject.dailyWorkouts[dayIndex];
  }, [currentProject, dayIndex]);

  useEffect(() => {
    if (!currentDay?.meals || currentDay.meals.length === 0) {
      Alert.alert('Error', 'No meals found for this day');
      navigation.goBack();
    }
    
    // Set initial selected time to first available meal
    if (currentDay?.meals && currentDay.meals.length > 0) {
      setSelectedTime(currentDay.meals[0].time);
    }
  }, [currentDay, navigation]);

  // Calculate current day totals in REAL-TIME
  const calculateCurrentTotals = () => {
    if (!currentDay?.meals) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    currentDay.meals.forEach(meal => {
      const selectedOption = meal.options.find(opt => opt.id === meal.selectedOptionId);
      if (selectedOption) {
        totalCalories += selectedOption.calories;
        totalProtein += selectedOption.protein;
        totalCarbs += selectedOption.carbs;
        totalFat += selectedOption.fat;
      }
    });
    
    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    };
  };

  const handleOptionSelect = async (meal: NepaliMeal, option: MealOption) => {
    if (!currentProject || !currentDay) return;
    
    try {
      setIsSaving(true);
      await updateMealSelection(currentProject.id, dayIndex, meal.id, option.id);
      
      // Refresh projects to update DietPlanScreen
      const { useAppStore } = require('../../../shared/stores/useAppStore');
      const user = useAppStore.getState().user;
      if (user?.uid) {
        await loadUserProjects(user.uid);
      }
    } catch (error) {
      console.error('Error selecting option:', error);
      Alert.alert('Error', 'Failed to save selection');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOptionDeselect = async (meal: NepaliMeal) => {
    if (!currentProject || !currentDay) return;
    
    try {
      setIsSaving(true);
      await updateMealSelection(currentProject.id, dayIndex, meal.id, '');
      
      // Refresh projects to update DietPlanScreen
      const { useAppStore } = require('../../../shared/stores/useAppStore');
      const user = useAppStore.getState().user;
      if (user?.uid) {
        await loadUserProjects(user.uid);
      }
    } catch (error) {
      console.error('Error deselecting option:', error);
      Alert.alert('Error', 'Failed to deselect option');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkDayComplete = async () => {
    if (!currentProject || !currentDay) return;
    
    // Check if all meals have selections
    const allMealsSelected = currentDay.meals?.every(meal => meal.selectedOptionId) || false;
    if (!allMealsSelected) {
      Alert.alert('Notice', 'Please select options for all meals before marking day as complete');
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Mark all meals as completed
      for (const meal of currentDay.meals || []) {
        if (meal.selectedOptionId && !meal.completed) {
          await markMealCompleted(currentProject.id, dayIndex, meal.id, true);
        }
      }
      
      // Refresh projects to update DietPlanScreen
      const { useAppStore } = require('../../../shared/stores/useAppStore');
      const user = useAppStore.getState().user;
      if (user?.uid) {
        await loadUserProjects(user.uid);
      }
      
      Alert.alert('Success', 'Day marked as complete!');
    } catch (error) {
      console.error('Error marking day complete:', error);
      Alert.alert('Error', 'Failed to mark day as complete');
    } finally {
      setIsSaving(false);
    }
  };

  const getTargetPercentage = (actual: number, target: number) => {
    if (!target || target === 0) return 0;
    return Math.round((actual / target) * 100);
  };

  const allMealsCompleted = currentDay?.meals?.every(meal => meal.completed) || false;
  const allMealsSelected = currentDay?.meals?.every(meal => meal.selectedOptionId) || false;
  const totals = calculateCurrentTotals();

  if (!currentProject || !currentDay) {
    return (
      <ThemeView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemeText variant="body">Loading...</ThemeText>
        </View>
      </ThemeView>
    );
  }

  const { dailyCalorieTarget = 0, dailyProteinTarget = 0 } = currentProject;
  
  // Get current meal based on selected time
  const currentMeal = currentDay.meals?.find(meal => meal.time === selectedTime) || null;
  const mealOptions = currentMeal?.options || [];

  // Get ALL meal times for this day (3 for weight loss, 5 for weight gain)
  const availableMealTimes = currentDay.meals
    ?.map(meal => meal.time) as Array<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake'> || [];

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
            {currentDay.name}
          </ThemeText>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Card with REAL-TIME updates */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <ThemeText variant="h3" style={styles.summaryTitle}>
              Today's Progress
            </ThemeText>
            
            {allMealsCompleted && (
              <View style={styles.completedBadge}>
                <ThemeText variant="caption" style={styles.completedBadgeText}>
                  ✓ Completed
                </ThemeText>
              </View>
            )}
          </View>
          
          <View style={styles.progressGrid}>
            <View style={styles.progressItem}>
              <ThemeText variant="caption" style={styles.progressLabel}>
                Calories
              </ThemeText>
              <ThemeText variant="h2" style={styles.progressValue}>
                {totals.calories}
              </ThemeText>
              {dailyCalorieTarget > 0 && (
                <ThemeText variant="caption" style={styles.progressTarget}>
                  /{dailyCalorieTarget} ({getTargetPercentage(totals.calories, dailyCalorieTarget)}%)
                </ThemeText>
              )}
            </View>
            
            <View style={styles.progressItem}>
              <ThemeText variant="caption" style={styles.progressLabel}>
                Protein
              </ThemeText>
              <ThemeText variant="h2" style={styles.progressValue}>
                {totals.protein}g
              </ThemeText>
              {dailyProteinTarget > 0 && (
                <ThemeText variant="caption" style={styles.progressTarget}>
                  /{dailyProteinTarget}g ({getTargetPercentage(totals.protein, dailyProteinTarget)}%)
                </ThemeText>
              )}
            </View>
            
            <View style={styles.progressItem}>
              <ThemeText variant="caption" style={styles.progressLabel}>
                Meals
              </ThemeText>
              <ThemeText variant="h2" style={styles.progressValue}>
                {currentDay.meals?.filter(m => m.selectedOptionId).length || 0}/{currentDay.meals?.length || 0}
              </ThemeText>
              <ThemeText variant="caption" style={styles.progressTarget}>
                Selected
              </ThemeText>
            </View>
          </View>
          
          {/* "Mark Day Complete" Button (only when all meals selected but not completed) */}
          {allMealsSelected && !allMealsCompleted && (
            <TouchableOpacity
              style={styles.markCompleteButton}
              onPress={handleMarkDayComplete}
              disabled={isSaving}
            >
              <ThemeText variant="body" style={styles.markCompleteButtonText}>
                {isSaving ? 'Processing...' : 'Mark Day Complete'}
              </ThemeText>
            </TouchableOpacity>
          )}
        </View>

        {/* Meal Time Toggle (Shows ALL meals: 3 for weight loss, 5 for weight gain) */}
        <View style={styles.toggleSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.toggleScrollView}
            contentContainerStyle={styles.toggleContainer}
          >
            {availableMealTimes.map((time) => {
              const meal = currentDay.meals?.find(m => m.time === time);
              const isSelected = meal?.selectedOptionId;
              const isCompleted = meal?.completed;
              
              return (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.toggleButton,
                    selectedTime === time && styles.toggleButtonActive,
                    isSelected && styles.toggleButtonSelected,
                    isCompleted && styles.toggleButtonCompleted
                  ]}
                  onPress={() => setSelectedTime(time)}
                  disabled={allMealsCompleted}
                >
                  <ThemeText 
                    variant="body" 
                    style={[
                      styles.toggleButtonText,
                      selectedTime === time && styles.toggleButtonTextActive,
                      isSelected && styles.toggleButtonTextSelected,
                      isCompleted && styles.toggleButtonTextCompleted
                    ]}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                    {isSelected && ' ✓'}
                  </ThemeText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Meal Options Display */}
        {currentMeal && (
          <View style={styles.optionsSection}>
            <View style={styles.mealHeader}>
              <View style={styles.mealInfo}>
                <ThemeText variant="caption" style={styles.mealSubtitle}>
                  Select 1 option below
                </ThemeText>
              </View>
            </View>
            
            {/* Available Options with Checkboxes */}
            <View style={styles.optionsList}>
              {mealOptions.map((option) => {
                const isSelected = currentMeal.selectedOptionId === option.id;
                const isMealCompleted = currentMeal.completed;
                
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                      allMealsCompleted && styles.optionCardReadOnly
                    ]}
                    onPress={() => {
                      if (isMealCompleted || allMealsCompleted) return;
                      if (isSelected) {
                        handleOptionDeselect(currentMeal);
                      } else {
                        handleOptionSelect(currentMeal, option);
                      }
                    }}
                    disabled={isMealCompleted || allMealsCompleted || isSaving}
                    activeOpacity={isMealCompleted || allMealsCompleted ? 1 : 0.7}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.optionTextContainer}>
                        <ThemeText variant="h3" style={[
                          styles.optionName,
                          isSelected && styles.optionNameSelected,
                          (allMealsCompleted || isMealCompleted) && styles.optionNameReadOnly
                        ]}>
                          {option.name}
                        </ThemeText>
                        
                        <ThemeText variant="caption" style={styles.optionDescription}>
                          {option.description}
                        </ThemeText>
                        
                        <View style={styles.optionNutrition}>
                          <View style={styles.optionNutritionItem}>
                            <ThemeText variant="caption" style={styles.optionNutritionLabel}>
                              Calories
                            </ThemeText>
                            <ThemeText variant="body" style={styles.optionNutritionValue}>
                              {option.calories}
                            </ThemeText>
                          </View>
                          
                          <View style={styles.optionNutritionItem}>
                            <ThemeText variant="caption" style={styles.optionNutritionLabel}>
                              Protein
                            </ThemeText>
                            <ThemeText variant="body" style={styles.optionNutritionValue}>
                              {option.protein}g
                            </ThemeText>
                          </View>
                          
                          <View style={styles.optionNutritionItem}>
                            <ThemeText variant="caption" style={styles.optionNutritionLabel}>
                              Carbs
                            </ThemeText>
                            <ThemeText variant="body" style={styles.optionNutritionValue}>
                              {option.carbs}g
                            </ThemeText>
                          </View>
                          
                          <View style={styles.optionNutritionItem}>
                            <ThemeText variant="caption" style={styles.optionNutritionLabel}>
                              Fat
                            </ThemeText>
                            <ThemeText variant="body" style={styles.optionNutritionValue}>
                              {option.fat}g
                            </ThemeText>
                          </View>
                        </View>
                      </View>
                      
                      {/* Checkbox on right side */}
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                          (isMealCompleted || allMealsCompleted) && styles.checkboxDisabled
                        ]}
                        onPress={() => {
                          if (isMealCompleted || allMealsCompleted) return;
                          if (isSelected) {
                            handleOptionDeselect(currentMeal);
                          } else {
                            handleOptionSelect(currentMeal, option);
                          }
                        }}
                        disabled={isMealCompleted || allMealsCompleted || isSaving}
                      >
                        {isSelected && (
                          <ThemeText style={styles.checkboxCheck}>✓</ThemeText>
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemeView>
  );
};

export default DietDayScreen;