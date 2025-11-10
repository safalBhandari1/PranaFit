
// src/features/workout/components/WorkoutModal/ExerciseSelectionStep.tsx
// import React, { useState, useMemo } from 'react';
// import { 
//   View, 
//   TouchableOpacity, 
//   ScrollView, 
//   TextInput,
//   Alert,
//   Keyboard 
// } from 'react-native';
// import { useThemeStore } from '../../../../shared/stores/useThemeStore';
// import { useWorkoutStore } from '../../stores/useWorkoutStore';
// import { ThemeText } from '../../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../../shared/ui/ThemeView';
// import { 
//   EXERCISE_LIBRARY, 
//   getExercisesByType, 
//   getExercisesByMuscleGroup 
// } from '../../../../shared/data/exercises';
// import { WorkoutType } from '../../types/workout';
// import { createStyles } from '../../../../shared/styles/createStyles';

// // Type definitions
// interface Exercise {
//   id: string;
//   name: string;
//   muscleGroup?: string;
//   muscleGroups?: string[];
//   equipment?: string;
//   category?: string;
//   description?: string;
//   isCustom?: boolean;
//   workoutType?: WorkoutType;
//   difficulty?: string;
// }

// // Helper function to get exercises by multiple muscle groups
// const getExercisesByMuscleGroups = (muscleGroups: string[]): Exercise[] => {
//   const exercises: Exercise[] = [];
//   muscleGroups.forEach(muscleGroup => {
//     exercises.push(...getExercisesByMuscleGroup(muscleGroup));
//   });
//   return exercises;
// };

// const exerciseLibrary = EXERCISE_LIBRARY;

// const ExerciseSelectionStep: React.FC = () => {
//   const { theme } = useThemeStore();
  
//   // FIXED: Safe store access with defaults
//   const store = useWorkoutStore();
//   const workoutType = store.workoutType;
//   const selectedGymSplit = store.selectedGymSplit;
//   const selectedExercises = store.selectedExercises ?? []; // Nullish coalescing
//   const setSelectedExercises = store.setSelectedExercises;
//   const setCurrentStep = store.setCurrentStep;
//   const closeWorkoutModal = store.closeWorkoutModal;
  
//   const styles = createStyles(theme);
  
//   // State management
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [showCustomInput, setShowCustomInput] = useState(false);
//   const [customExerciseName, setCustomExerciseName] = useState('');
//   const [favoriteExercises, setFavoriteExercises] = useState<Set<string>>(new Set());
//   const [customExercises, setCustomExercises] = useState<Exercise[]>([]);

//   // Safety check - if workoutType is null, go back
//   React.useEffect(() => {
//     if (!workoutType) {
//       console.warn('⚠️ WorkoutType is null, going back to type selection');
//       setCurrentStep('type-selection');
//       return;
//     }
//   }, [workoutType]);

//   // Debug store state
//   React.useEffect(() => {
//     console.log('🔍 Store debug:', {
//       selectedExercises: store.selectedExercises,
//       safeSelectedExercises: selectedExercises,
//       isArray: Array.isArray(store.selectedExercises),
//       length: store.selectedExercises?.length
//     });
//   }, [store.selectedExercises]);

//   // FIXED: Enhanced exercise loading that works for all splits
//   const getBaseExercises = (): Exercise[] => {
//     if (!workoutType) return [];

//     console.log('🎯 ExerciseSelection Loading:', {
//       workoutType,
//       selectedGymSplit: selectedGymSplit?.targetMuscles,
//       selectedGymSplitName: selectedGymSplit?.name,
//       hasSuggestedExercises: selectedGymSplit?.suggestedExercises?.length
//     });

//     switch (workoutType) {
//       case WorkoutType.GYM:
//         if (selectedGymSplit?.suggestedExercises && selectedGymSplit.suggestedExercises.length > 0) {
//           console.log(`📋 Using ${selectedGymSplit.suggestedExercises.length} pre-filtered exercises from:`, selectedGymSplit.name);
//           return selectedGymSplit.suggestedExercises;
//         }
        
//         if (selectedGymSplit?.targetMuscles && selectedGymSplit.targetMuscles.length > 0) {
//           console.log(`🔄 Filtering exercises for:`, selectedGymSplit.targetMuscles);
//           const filteredExercises = getExercisesByMuscleGroups(selectedGymSplit.targetMuscles);
//           console.log(`✅ Found ${filteredExercises.length} exercises`);
//           return filteredExercises;
//         }
        
//         console.log('🔄 Ultimate fallback: Returning all gym exercises');
//         return EXERCISE_LIBRARY.filter(ex => ex.workoutType === WorkoutType.GYM);

//       case WorkoutType.CALISTHENICS:
//       case WorkoutType.YOGA:
//         const activityExercises = getExercisesByType(workoutType);
//         console.log(`📋 Found ${activityExercises.length} exercises for ${workoutType}`);
//         return activityExercises;

//       default:
//         return [];
//     }
//   };

//   // Dynamic categories based on targetMuscles for horizontal filtering
//   const getDynamicCategories = (): string[] => {
//     if (workoutType === WorkoutType.GYM && selectedGymSplit?.targetMuscles) {
//       const categories = ['All', ...selectedGymSplit.targetMuscles].sort();
//       console.log('🎯 Horizontal Categories from targetMuscles:', categories);
//       return categories;
//     } else {
//       const baseExercises = getBaseExercises();
//       const availableCategories = new Set<string>();
      
//       baseExercises.forEach(exercise => {
//         if (exercise.muscleGroup) {
//           availableCategories.add(exercise.muscleGroup);
//         } else if (exercise.category) {
//           availableCategories.add(exercise.category);
//         }
//       });

//       const categories = ['All', ...Array.from(availableCategories)].sort();
//       console.log('🎯 Derived Categories:', categories);
//       return categories;
//     }
//   };

//   const getScreenTitle = () => {
//     return 'Select Exercises';
//   };

//   // FIXED: Safe selection check - selectedExercises is guaranteed to be array
//   const isExerciseSelected = (exerciseId: string) => {
//     return selectedExercises.some(e => e.id === exerciseId);
//   };

//   const baseExercises = getBaseExercises();
//   const dynamicCategories = getDynamicCategories();
  
//   // Combine base exercises with custom exercises
//   const allExercises = [
//     ...customExercises,
//     ...baseExercises
//   ];

//   // Enhanced filtering with horizontal category support
//   const filteredExercises = useMemo(() => {
//     return allExercises.filter(exercise => {
//       const matchesSearch = searchQuery === '' || 
//         exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (exercise.muscleGroup?.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (exercise.equipment?.toLowerCase().includes(searchQuery.toLowerCase()));
      
//       const matchesCategory = selectedCategory === 'All' || 
//         exercise.muscleGroup === selectedCategory ||
//         exercise.muscleGroups?.includes(selectedCategory) ||
//         exercise.category === selectedCategory;
      
//       return matchesSearch && matchesCategory;
//     });
//   }, [allExercises, searchQuery, selectedCategory]);

//   // Sort exercises: selected first, then favorites, then custom, then library
//   const sortedExercises = filteredExercises.sort((a, b) => {
//     const aIsSelected = isExerciseSelected(a.id);
//     const bIsSelected = isExerciseSelected(b.id);
//     if (aIsSelected && !bIsSelected) return -1;
//     if (!aIsSelected && bIsSelected) return 1;
    
//     const aIsFavorite = favoriteExercises.has(a.id);
//     const bIsFavorite = favoriteExercises.has(b.id);
//     if (aIsFavorite && !bIsFavorite) return -1;
//     if (!aIsFavorite && bIsFavorite) return 1;
    
//     if (a.isCustom && !b.isCustom) return -1;
//     if (!a.isCustom && b.isCustom) return 1;
    
//     return a.name.localeCompare(b.name);
//   });

//   // FIXED: Safe selection toggle
//   const toggleExerciseSelection = (exercise: Exercise) => {
//     console.log('🔄 Toggling exercise:', exercise.name);
    
//     setSelectedExercises(prev => {
//       // Handle any undefined/weird state
//       if (!prev || !Array.isArray(prev)) {
//         console.log('🔄 Initializing selection array');
//         return [exercise];
//       }
      
//       const existingIndex = prev.findIndex(e => e.id === exercise.id);
      
//       if (existingIndex >= 0) {
//         const newSelection = prev.filter(e => e.id !== exercise.id);
//         console.log('➖ Removed exercise. New selection:', newSelection.length);
//         return newSelection;
//       } else {
//         const newSelection = [...prev, exercise];
//         console.log('➕ Added exercise. New selection:', newSelection.length);
//         return newSelection;
//       }
//     });
//     Keyboard.dismiss();
//   };

//   const handleAddCustomExercise = () => {
//     if (!customExerciseName.trim()) {
//       Alert.alert('Error', 'Please enter an exercise name');
//       return;
//     }

//     const exerciseExists = allExercises.some(
//       exercise => exercise.name.toLowerCase() === customExerciseName.toLowerCase().trim()
//     );

//     if (exerciseExists) {
//       Alert.alert('Exercise Exists', 'This exercise is already in the list');
//       return;
//     }

//     const currentWorkoutType = workoutType || WorkoutType.GYM;

//     const newCustomExercise: Exercise = currentWorkoutType === WorkoutType.GYM 
//       ? {
//           id: `custom-${Date.now()}`,
//           name: customExerciseName.trim(),
//           muscleGroup: selectedCategory === 'All' ? (selectedGymSplit?.targetMuscles?.[0] || 'Custom') : selectedCategory,
//           muscleGroups: [selectedCategory === 'All' ? (selectedGymSplit?.targetMuscles?.[0] || 'Custom') : selectedCategory],
//           equipment: 'Bodyweight',
//           isCustom: true,
//           workoutType: currentWorkoutType
//         }
//       : {
//           id: `custom-${Date.now()}`,
//           name: customExerciseName.trim(),
//           category: selectedCategory === 'All' ? 'Custom' : selectedCategory,
//           description: '',
//           isCustom: true,
//           workoutType: currentWorkoutType,
//           difficulty: 'beginner'
//         };

//     setCustomExercises(prev => [newCustomExercise, ...prev]);
//     setCustomExerciseName('');
//     setShowCustomInput(false);
//     setSearchQuery('');
//   };

//   const toggleFavorite = (exerciseId: string) => {
//     setFavoriteExercises(prev => {
//       const newFavorites = new Set(prev);
//       if (newFavorites.has(exerciseId)) {
//         newFavorites.delete(exerciseId);
//       } else {
//         newFavorites.add(exerciseId);
//       }
//       return newFavorites;
//     });
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     Keyboard.dismiss();
//   };

//   const handleStartSession = () => {
//     if (selectedExercises.length === 0) {
//       Alert.alert('No Exercises', 'Please select at least one exercise to start your session.');
//       return;
//     }
    
//     console.log('🚀 Starting session with:', { 
//       workoutType,
//       exerciseCount: selectedExercises.length,
//       selectedCategories: dynamicCategories.filter(cat => cat !== 'All')
//     });
  
//     setCurrentStep('active-session');
//   };

//   // FIXED: Working back button logic
//   const handleBack = () => {
//     console.log('🔙 Back button pressed. workoutType:', workoutType, 'has selectedGymSplit:', !!selectedGymSplit);
    
//     if (workoutType === WorkoutType.GYM && selectedGymSplit) {
//       console.log('↩️ Going back to gym-split-selection');
//       setCurrentStep('gym-split-selection');
//     } else {
//       console.log('↩️ Closing modal to go back to WorkoutHomeScreen');
//       closeWorkoutModal();
//     }
//   };

//   const getExerciseSubtitle = (exercise: Exercise) => {
//     if (workoutType === WorkoutType.GYM) {
//       return exercise.muscleGroups?.join(', ') || exercise.muscleGroup || exercise.equipment || '';
//     } else {
//       return exercise.difficulty ? `${exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}` : '';
//     }
//   };

//   // For cardio workouts, skip exercise selection entirely
//   if (
//     workoutType === WorkoutType.RUNNING ||
//     workoutType === WorkoutType.CYCLING ||
//     workoutType === WorkoutType.WALKING ||
//     workoutType === WorkoutType.ELLIPTICAL ||
//     workoutType === WorkoutType.JUMBA
//   ) {
//     React.useEffect(() => {
//       console.log(`🔄 Auto-advancing ${workoutType} to active session (no exercises needed)`);
//       setCurrentStep('active-session');
//     }, []);
    
//     return (
//       <ThemeView style={styles.container}>
//         <View style={styles.autoAdvanceContainer}>
//           <ThemeText variant="h3" style={{ textAlign: 'center', marginBottom: 10 }}>
//             Starting {workoutType}...
//           </ThemeText>
//           <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
//             No exercise selection needed for {workoutType.toLowerCase()} workouts
//           </ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header with Back Button */}
//       <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
//             ← Back
//           </ThemeText>
//         </TouchableOpacity>
//         <ThemeText variant="h2" style={styles.headerTitle}>
//           {getScreenTitle()}
//         </ThemeText>
//         <View style={styles.headerSpacer} />
//       </View>
      
//       <View style={styles.content}>
//         {/* Horizontal Category Filter */}
//         {dynamicCategories.length > 1 && (
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             style={styles.categoryScroll}
//             contentContainerStyle={styles.categoryContainer}
//           >
//             {dynamicCategories.map((category) => (
//               <TouchableOpacity
//                 key={category}
//                 style={[
//                   styles.categoryButton,
//                   { backgroundColor: theme.colors.card },
//                   selectedCategory === category && { 
//                     backgroundColor: theme.colors.primary,
//                     borderColor: theme.colors.primary 
//                   }
//                 ]}
//                 onPress={() => setSelectedCategory(category)}
//               >
//                 <ThemeText style={[
//                   styles.categoryText,
//                   { color: theme.colors.text.primary },
//                   selectedCategory === category && { color: '#FFF' }
//                 ]}>
//                   {category}
//                 </ThemeText>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         )}

//         {/* Search Bar */}
//         <View style={styles.searchHeader}>
//           <View style={styles.searchContainer}>
//             <TextInput
//               style={[
//                 styles.searchInput,
//                 { 
//                   backgroundColor: theme.colors.card,
//                   color: theme.colors.text.primary,
//                   borderColor: theme.colors.border
//                 }
//               ]}
//               placeholder="Search exercises..."
//               placeholderTextColor={theme.colors.text.secondary}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//             {searchQuery.length > 0 && (
//               <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
//                 <ThemeText style={[styles.clearSearchText, { color: theme.colors.text.secondary }]}>✕</ThemeText>
//               </TouchableOpacity>
//             )}
//           </View>
//           <ThemeText variant="body" style={[styles.selectionSubtitle, { color: theme.colors.text.secondary, textAlign: 'left' }]}>
//             {selectedExercises.length} selected
//           </ThemeText>
//         </View>

//         {/* Scrollable Exercise List */}
//         <ScrollView 
//           style={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Custom Exercise Button */}
//           <View style={styles.customExerciseSection}>
//             {showCustomInput ? (
//               <View style={[
//                 styles.customInputContainer,
//                 { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }
//               ]}>
//                 <TextInput
//                   style={[styles.customInput, { color: theme.colors.text.primary }]}
//                   placeholder="Enter exercise name..."
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={customExerciseName}
//                   onChangeText={setCustomExerciseName}
//                   autoFocus
//                   onSubmitEditing={handleAddCustomExercise}
//                 />
//                 <TouchableOpacity
//                   style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}
//                   onPress={handleAddCustomExercise}
//                 >
//                   <ThemeText style={styles.plusButtonText}>+</ThemeText>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <TouchableOpacity
//                 style={[styles.customExerciseButton, { backgroundColor: theme.colors.card }]}
//                 onPress={() => setShowCustomInput(true)}
//               >
//                 <ThemeText style={[styles.customExerciseText, { color: theme.colors.text.primary }]}>
//                   + Add Custom Exercise
//                 </ThemeText>
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* Exercise List */}
//           <View style={styles.exerciseList}>
//             {sortedExercises.length > 0 ? (
//               sortedExercises.map((exercise) => (
//                 <TouchableOpacity
//                 key={exercise.id}
//                 style={[
//                   styles.exerciseSelectButton, 
//                   { 
//                     backgroundColor: theme.colors.card,
//                     minHeight: 60, // Ensure enough touch area
//                     padding: 15,
//                   }
//                 ]}
//                 onPress={() => {
//                   console.log('🎯 TOUCH DETECTED for:', exercise.name);
//                   toggleExerciseSelection(exercise);
//                 }}
//                 activeOpacity={0.7} // Visual feedback
//               >
//                   <View style={styles.exerciseSelectInfo}>
//                     <ThemeText variant="body" style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
//                       {exercise.name}
//                       {exercise.isCustom && ' (Custom)'}
//                     </ThemeText>
//                     <View style={styles.exerciseMeta}>
//                       <ThemeText variant="body" style={[styles.exerciseSubtitle, { color: theme.colors.text.secondary }]}>
//                         {getExerciseSubtitle(exercise)}
//                       </ThemeText>
//                     </View>
//                   </View>
                  
//                   <View style={styles.exerciseActions}>
//                     <TouchableOpacity
//                       style={styles.favoriteButton}
//                       onPress={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(exercise.id);
//                       }}
//                     >
//                       <ThemeText style={[
//                         styles.favoriteIcon,
//                         { color: favoriteExercises.has(exercise.id) ? theme.colors.primary : theme.colors.text.secondary }
//                       ]}>
//                         {favoriteExercises.has(exercise.id) ? '★' : '☆'}
//                       </ThemeText>
//                     </TouchableOpacity>
                    
//                     {isExerciseSelected(exercise.id) && (
//                       <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
//                         <ThemeText style={styles.selectedIndicatorText}>✓</ThemeText>
//                       </View>
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <View style={[styles.emptyState, { backgroundColor: theme.colors.card }]}>
//                 <ThemeText variant="body" style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
//                   {searchQuery ? 'No exercises found' : 'No exercises available'}
//                 </ThemeText>
//                 {selectedCategory !== 'All' && (
//                   <ThemeText variant="body" style={[styles.emptyStateHint, { color: theme.colors.text.secondary }]}>
//                     Try selecting "All" or a different category
//                   </ThemeText>
//                 )}
//               </View>
//             )}
//           </View>
//         </ScrollView>

//         {/* Fixed Footer */}
//         <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
//           <View style={styles.selectionActions}>
//             <TouchableOpacity 
//               style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
//               onPress={handleBack}
//             >
//               <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
//                 Back
//               </ThemeText>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[
//                 styles.startSessionButton, 
//                 { backgroundColor: selectedExercises.length > 0 ? theme.colors.primary : theme.colors.border }
//               ]}
//               onPress={handleStartSession}
//               disabled={selectedExercises.length === 0}
//             >
//               <ThemeText style={[
//                 styles.startSessionButtonText,
//                 { color: selectedExercises.length > 0 ? '#FFF' : theme.colors.text.secondary }
//               ]}>
//                 Start Workout ({selectedExercises.length})
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ThemeView>
//   );
// };

// export default ExerciseSelectionStep;















// // src/features/workout/components/WorkoutModal/ExerciseSelectionStep.tsx
// import React, { useState, useMemo } from 'react';
// import { View, TouchableOpacity, ScrollView, TextInput, Alert, Keyboard } from 'react-native';
// import { useThemeStore } from '../../../../shared/stores/useThemeStore';
// import { useWorkoutStore } from '../../stores/useWorkoutStore';
// import { ThemeText } from '../../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../../shared/ui/ThemeView';
// import { getExercisesByType, getExercisesByMuscleGroup } from '../../../../shared/data/exercises';
// import { WorkoutType } from '../../types/workout';
// import { createStyles } from '../../../../shared/styles/createStyles';

// const ExerciseSelectionStep: React.FC = () => {
//   const { theme } = useThemeStore();
//   const store = useWorkoutStore();
  
//   // Store state - with safe defaults
//   const selectedExercises = store.selectedExercises || [];
//   const setSelectedExercises = store.setSelectedExercises;
//   const workoutType = store.workoutType;
//   const selectedGymSplit = store.selectedGymSplit;
//   const setCurrentStep = store.setCurrentStep;
//   const closeWorkoutModal = store.closeWorkoutModal;
  
//   const styles = createStyles(theme);
  
//   // Local state
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   // STEP 1: Get base exercises (simplified)
//   const getBaseExercises = () => {
//     if (!workoutType) return [];
    
//     if (workoutType === WorkoutType.GYM) {
//       if (selectedGymSplit?.suggestedExercises?.length > 0) {
//         return selectedGymSplit.suggestedExercises;
//       }
//       if (selectedGymSplit?.targetMuscles?.length > 0) {
//         return selectedGymSplit.targetMuscles.flatMap(muscle => 
//           getExercisesByMuscleGroup(muscle)
//         );
//       }
//       return getExercisesByType(WorkoutType.GYM);
//     }
    
//     return getExercisesByType(workoutType);
//   };

//   const baseExercises = getBaseExercises();
  
//   // STEP 2: Simple filtering (no complex sorting yet)
//   const filteredExercises = baseExercises.filter(exercise => {
//     const matchesSearch = !searchQuery || 
//       exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || 
//       exercise.muscleGroup === selectedCategory;
    
//     return matchesSearch && matchesCategory;
//   });

//   // STEP 3: Simple selection logic (proven to work)
//   const handleExercisePress = (exercise: any) => {
//     console.log('🎯 TAPPED:', exercise.name);
    
//     const isSelected = selectedExercises.some((e: any) => e.id === exercise.id);
//     if (isSelected) {
//       setSelectedExercises(selectedExercises.filter((e: any) => e.id !== exercise.id));
//     } else {
//       setSelectedExercises([...selectedExercises, exercise]);
//     }
//   };

//   const isExerciseSelected = (exerciseId: string) => {
//     return selectedExercises.some((e: any) => e.id === exerciseId);
//   };

//   // STEP 4: Simple back button
//   const handleBack = () => {
//     if (workoutType === WorkoutType.GYM && selectedGymSplit) {
//       setCurrentStep('gym-split-selection');
//     } else {
//       closeWorkoutModal();
//     }
//   };

//   const handleStartSession = () => {
//     if (selectedExercises.length === 0) {
//       Alert.alert('No Exercises', 'Please select at least one exercise to start your session.');
//       return;
//     }
//     setCurrentStep('active-session');
//   };

//   // For cardio workouts, skip exercise selection
//   if (
//     workoutType === WorkoutType.RUNNING ||
//     workoutType === WorkoutType.CYCLING ||
//     workoutType === WorkoutType.WALKING ||
//     workoutType === WorkoutType.ELLIPTICAL ||
//     workoutType === WorkoutType.JUMBA
//   ) {
//     React.useEffect(() => {
//       setCurrentStep('active-session');
//     }, []);
    
//     return (
//       <ThemeView style={styles.container}>
//         <View style={[styles.autoAdvanceContainer, { padding: 20 }]}>
//           <ThemeText variant="h3" style={{ textAlign: 'center', marginBottom: 10 }}>
//             Starting {workoutType}...
//           </ThemeText>
//           <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
//             No exercise selection needed for {workoutType.toLowerCase()} workouts
//           </ThemeText>
//         </View>
//       </ThemeView>
//     );
//   }

//   return (
//     <ThemeView style={styles.container}>
//       {/* Header */}
//       <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
//             ← Back
//           </ThemeText>
//         </TouchableOpacity>
//         <ThemeText variant="h2" style={styles.headerTitle}>
//           Select Exercises
//         </ThemeText>
//         <View style={styles.headerSpacer} />
//       </View>
      
//       <View style={styles.content}>
//         {/* Simple Search */}
//         <View style={styles.searchHeader}>
//           <View style={styles.searchContainer}>
//             <TextInput
//               style={[
//                 styles.searchInput,
//                 { 
//                   backgroundColor: theme.colors.card,
//                   color: theme.colors.text.primary,
//                   borderColor: theme.colors.border
//                 }
//               ]}
//               placeholder="Search exercises..."
//               placeholderTextColor={theme.colors.text.secondary}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//           </View>
//           <ThemeText variant="body" style={[styles.selectionSubtitle, { color: theme.colors.text.secondary, textAlign: 'left' }]}>
//             {selectedExercises.length} selected
//           </ThemeText>
//         </View>

//         {/* Exercise List - SIMPLIFIED */}
//         <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
//           <View style={styles.exerciseList}>
//             {filteredExercises.map((exercise) => (
//               <TouchableOpacity
//                 key={exercise.id}
//                 style={[
//                   styles.exerciseSelectButton, 
//                   { backgroundColor: theme.colors.card },
//                   isExerciseSelected(exercise.id) && { 
//                     borderColor: theme.colors.primary, 
//                     borderWidth: 2
//                   }
//                 ]}
//                 onPress={() => handleExercisePress(exercise)}
//               >
//                 <View style={styles.exerciseSelectInfo}>
//                   <ThemeText variant="body" style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
//                     {exercise.name}
//                   </ThemeText>
//                   <ThemeText variant="body" style={[styles.exerciseSubtitle, { color: theme.colors.text.secondary }]}>
//                     {workoutType === WorkoutType.GYM 
//                       ? (exercise.muscleGroup || exercise.equipment || '')
//                       : (exercise.difficulty ? `${exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}` : '')
//                     }
//                   </ThemeText>
//                 </View>
                
//                 {isExerciseSelected(exercise.id) && (
//                   <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
//                     <ThemeText style={styles.selectedIndicatorText}>✓</ThemeText>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>

//         {/* Footer */}
//         <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
//           <View style={styles.selectionActions}>
//             <TouchableOpacity 
//               style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
//               onPress={handleBack}
//             >
//               <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
//                 Back
//               </ThemeText>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[
//                 styles.startSessionButton, 
//                 { backgroundColor: selectedExercises.length > 0 ? theme.colors.primary : theme.colors.border }
//               ]}
//               onPress={handleStartSession}
//               disabled={selectedExercises.length === 0}
//             >
//               <ThemeText style={[
//                 styles.startSessionButtonText,
//                 { color: selectedExercises.length > 0 ? '#FFF' : theme.colors.text.secondary }
//               ]}>
//                 Start Workout ({selectedExercises.length})
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ThemeView>
//   );
// };

// export default ExerciseSelectionStep;









// src/features/workout/components/WorkoutModal/ExerciseSelectionStep.tsx
import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Alert, Keyboard } from 'react-native';
import { useThemeStore } from '../../../../shared/stores/useThemeStore';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { ThemeText } from '../../../../shared/ui/ThemeText';
import { ThemeView } from '../../../../shared/ui/ThemeView';
import { getExercisesByType, getExercisesByMuscleGroup } from '../../../../shared/data/exercises';
import { WorkoutType } from '../../types/workout';
import { createStyles } from '../../../../shared/styles/createStyles';

const ExerciseSelectionStep: React.FC = () => {
  const { theme } = useThemeStore();
  const store = useWorkoutStore();
  
  // Store state - with safe defaults
  const selectedExercises = store.selectedExercises || [];
  const setSelectedExercises = store.setSelectedExercises;
  const workoutType = store.workoutType;
  const selectedGymSplit = store.selectedGymSplit;
  const setCurrentStep = store.setCurrentStep;
  const closeWorkoutModal = store.closeWorkoutModal;
  
  const styles = createStyles(theme);
  
  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [favoriteExercises, setFavoriteExercises] = useState<Set<string>>(new Set());
  const [customExercises, setCustomExercises] = useState<any[]>([]);

  // Get base exercises (simplified)
  const getBaseExercises = () => {
    if (!workoutType) return [];
    
    if (workoutType === WorkoutType.GYM) {
        console.log("Suggested exercise for GymSplit" + selectedGymSplit?.suggestedExercises);
        console.log("Suggested targetMuscle"+ selectedGymSplit?.targetMuscles);
        
      if (selectedGymSplit?.suggestedExercises?.length > 0) {
        return selectedGymSplit.suggestedExercises;
      }
      if (selectedGymSplit?.targetMuscles?.length > 0) {
        return selectedGymSplit.targetMuscles.flatMap(muscle => 
          getExercisesByMuscleGroup(muscle)
        );
      }
      return getExercisesByType(WorkoutType.GYM);
    }
    
    return getExercisesByType(workoutType);
  };

  const baseExercises = getBaseExercises();
  
  // Combine base exercises with custom exercises
  const allExercises = [...customExercises, ...baseExercises];
  
  // Get dynamic categories
  const getDynamicCategories = () => {
    if (workoutType === WorkoutType.GYM && selectedGymSplit?.targetMuscles) {
      const categories = ['All', ...selectedGymSplit.targetMuscles].sort();
      console.log('🎯 Horizontal Categories from targetMuscles:', categories);
      return categories;
    } else {
      // For other workout types, derive categories from available exercises
      const availableCategories = new Set<string>();
      allExercises.forEach(exercise => {
        if (exercise.muscleGroup) {
          availableCategories.add(exercise.muscleGroup);
        }
      });
      const categories = ['All', ...Array.from(availableCategories)].sort();
      console.log('🎯 Derived Categories:', categories);
      return categories;
    }
  };

  const dynamicCategories = getDynamicCategories();
  
  // Filtering with category support
  const filteredExercises = allExercises.filter(exercise => {
    const matchesSearch = !searchQuery || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
      exercise.muscleGroup === selectedCategory ||
      exercise.muscleGroups?.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Simple selection logic (proven to work)
  const handleExercisePress = (exercise: any) => {
    console.log('🎯 TAPPED:', exercise.name);
    
    const isSelected = selectedExercises.some((e: any) => e.id === exercise.id);
    if (isSelected) {
      setSelectedExercises(selectedExercises.filter((e: any) => e.id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const isExerciseSelected = (exerciseId: string) => {
    return selectedExercises.some((e: any) => e.id === exerciseId);
  };

  // Custom exercise function
  const handleAddCustomExercise = () => {
    if (!customExerciseName.trim()) {
      Alert.alert('Error', 'Please enter an exercise name');
      return;
    }

    const exerciseExists = allExercises.some(
      exercise => exercise.name.toLowerCase() === customExerciseName.toLowerCase().trim()
    );

    if (exerciseExists) {
      Alert.alert('Exercise Exists', 'This exercise is already in the list');
      return;
    }

    const newCustomExercise = {
      id: `custom-${Date.now()}`,
      name: customExerciseName.trim(),
      muscleGroup: selectedCategory === 'All' ? (selectedGymSplit?.targetMuscles?.[0] || 'Custom') : selectedCategory,
      equipment: 'Bodyweight',
      isCustom: true,
      workoutType: workoutType || WorkoutType.GYM
    };

    setCustomExercises(prev => [newCustomExercise, ...prev]);
    setCustomExerciseName('');
    setShowCustomInput(false);
    setSearchQuery('');
  };

  // Favorite toggle function
  const toggleFavorite = (exerciseId: string, event: any) => {
    event.stopPropagation(); // Prevent triggering exercise selection
    setFavoriteExercises(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(exerciseId)) {
        newFavorites.delete(exerciseId);
        console.log('⭐ Removed from favorites:', exerciseId);
      } else {
        newFavorites.add(exerciseId);
        console.log('⭐ Added to favorites:', exerciseId);
      }
      return newFavorites;
    });
  };

  // Simple back button
  const handleBack = () => {
    if (workoutType === WorkoutType.GYM && selectedGymSplit) {
      setCurrentStep('gym-split-selection');
    } else {
      closeWorkoutModal();
    }
  };

  const handleStartSession = () => {
    if (selectedExercises.length === 0) {
      Alert.alert('No Exercises', 'Please select at least one exercise to start your session.');
      return;
    }
    setCurrentStep('active-session');
  };

  const clearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  // For cardio workouts, skip exercise selection
  if (
    workoutType === WorkoutType.RUNNING ||
    workoutType === WorkoutType.CYCLING ||
    workoutType === WorkoutType.WALKING ||
    workoutType === WorkoutType.ELLIPTICAL ||
    workoutType === WorkoutType.JUMBA
  ) {
    React.useEffect(() => {
      setCurrentStep('active-session');
    }, []);
    
    return (
      <ThemeView style={styles.container}>
        <View style={[styles.autoAdvanceContainer, { padding: 20 }]}>
          <ThemeText variant="h3" style={{ textAlign: 'center', marginBottom: 10 }}>
            Starting {workoutType}...
          </ThemeText>
          <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
            No exercise selection needed for {workoutType.toLowerCase()} workouts
          </ThemeText>
        </View>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ← Back
          </ThemeText>
        </TouchableOpacity>
        <ThemeText variant="h2" style={styles.headerTitle}>
          Select Exercises
        </ThemeText>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.content}>
        {/* Horizontal Categories */}
        {dynamicCategories.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            {dynamicCategories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  { backgroundColor: theme.colors.card },
                  selectedCategory === category && { 
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary 
                  }
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <ThemeText style={[
                  styles.categoryText,
                  { color: theme.colors.text.primary },
                  selectedCategory === category && { color: '#FFF' }
                ]}>
                  {category}
                </ThemeText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Search Bar */}
        <View style={styles.searchHeader}>
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchInput,
                { 
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text.primary,
                  borderColor: theme.colors.border
                }
              ]}
              placeholder="Search exercises..."
              placeholderTextColor={theme.colors.text.secondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
                <ThemeText style={[styles.clearSearchText, { color: theme.colors.text.secondary }]}>✕</ThemeText>
              </TouchableOpacity>
            )}
          </View>
          <ThemeText variant="body" style={[styles.selectionSubtitle, { color: theme.colors.text.secondary, textAlign: 'left' }]}>
            {selectedExercises.length} selected
          </ThemeText>
        </View>

        {/* Scrollable Exercise List */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Custom Exercise Section */}
          <View style={styles.customExerciseSection}>
            {showCustomInput ? (
              <View style={[
                styles.customInputContainer,
                { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }
              ]}>
                <TextInput
                  style={[styles.customInput, { color: theme.colors.text.primary }]}
                  placeholder="Enter exercise name..."
                  placeholderTextColor={theme.colors.text.secondary}
                  value={customExerciseName}
                  onChangeText={setCustomExerciseName}
                  autoFocus
                  onSubmitEditing={handleAddCustomExercise}
                />
                <TouchableOpacity
                  style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}
                  onPress={handleAddCustomExercise}
                >
                  <ThemeText style={styles.plusButtonText}>+</ThemeText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.customExerciseButton, { backgroundColor: theme.colors.card }]}
                onPress={() => setShowCustomInput(true)}
              >
                <ThemeText style={[styles.customExerciseText, { color: theme.colors.text.primary }]}>
                  + Add Custom Exercise
                </ThemeText>
              </TouchableOpacity>
            )}
          </View>

          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={[
                    styles.exerciseSelectButton, 
                    { backgroundColor: theme.colors.card },
                    isExerciseSelected(exercise.id) && { 
                      borderColor: theme.colors.primary, 
                      borderWidth: 2
                    }
                  ]}
                  onPress={() => handleExercisePress(exercise)}
                >
                  <View style={styles.exerciseSelectInfo}>
                    <ThemeText variant="body" style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
                      {exercise.name}
                      {exercise.isCustom && ' (Custom)'}
                    </ThemeText>
                    <ThemeText variant="body" style={[styles.exerciseSubtitle, { color: theme.colors.text.secondary }]}>
                      {workoutType === WorkoutType.GYM 
                        ? (exercise.muscleGroup || exercise.equipment || '')
                        : (exercise.difficulty ? `${exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}` : '')
                      }
                    </ThemeText>
                  </View>
                  
                  <View style={styles.exerciseActions}>
                    {/* Favorite Button */}
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={(e) => toggleFavorite(exercise.id, e)}
                    >
                      <ThemeText style={[
                        styles.favoriteIcon,
                        { color: favoriteExercises.has(exercise.id) ? theme.colors.primary : theme.colors.text.secondary }
                      ]}>
                        {favoriteExercises.has(exercise.id) ? '★' : '☆'}
                      </ThemeText>
                    </TouchableOpacity>
                    
                    {/* Selection Indicator */}
                    {isExerciseSelected(exercise.id) && (
                      <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
                        <ThemeText style={styles.selectedIndicatorText}>✓</ThemeText>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={[styles.emptyState, { backgroundColor: theme.colors.card }]}>
                <ThemeText variant="body" style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
                  {searchQuery ? 'No exercises found' : 'No exercises available'}
                </ThemeText>
                {selectedCategory !== 'All' && (
                  <ThemeText variant="body" style={[styles.emptyStateHint, { color: theme.colors.text.secondary }]}>
                    Try selecting "All" or a different category
                  </ThemeText>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
          <View style={styles.selectionActions}>
            <TouchableOpacity 
              style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
              onPress={handleBack}
            >
              <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
                Back
              </ThemeText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.startSessionButton, 
                { backgroundColor: selectedExercises.length > 0 ? theme.colors.primary : theme.colors.border }
              ]}
              onPress={handleStartSession}
              disabled={selectedExercises.length === 0}
            >
              <ThemeText style={[
                styles.startSessionButtonText,
                { color: selectedExercises.length > 0 ? '#FFF' : theme.colors.text.secondary }
              ]}>
                Start Workout ({selectedExercises.length})
              </ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemeView>
  );
};

export default ExerciseSelectionStep;