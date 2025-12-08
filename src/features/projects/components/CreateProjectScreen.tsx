
// // src/features/projects/components/CreateProjectScreen.tsx
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   View, 
//   ScrollView, 
//   TouchableOpacity, 
//   Alert,
//   PanResponder,
//   TextInput,
//   Keyboard,
//   Dimensions
// } from 'react-native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useProjectStore } from '../stores/useProjectStore';
// import { useNavigation } from '@react-navigation/native';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { EXERCISE_LIBRARY } from '../../../shared/data/exercises';
// import { WorkoutType } from '../../workout/types/workout';
// import { CreateProjectData, DailyWorkout, WorkoutActivity } from '../types/project';
// import { createStyles } from '../styles/CreateProjectScreenStyles';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// type ActivityType = 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'jumba' | 'walking';

// interface ExerciseSelection {
//   id: string;
//   name: string;
//   type: WorkoutType;
//   category?: string;
// }

// export const CreateProjectScreen: React.FC = () => {
//   const { theme } = useThemeStore();
//   const { createProject } = useProjectStore();
//   const navigation = useNavigation();
//   const styles = createStyles(theme);

//   // Handle back navigation
//   const handleBack = () => {
//     navigation.goBack();
//   };

//   // Main form state
//   const [selectedActivity, setSelectedActivity] = useState<ActivityType>('gym');
//   const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

//   // Gym state
//   const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<{[key: string]: string[]}>({});
//   const [selectedPPL, setSelectedPPL] = useState<{[key: string]: string[]}>({});
//   const [selectedUpperLower, setSelectedUpperLower] = useState<{[key: string]: string[]}>({});

//   // Calisthenics/Yoga state
//   const [searchQuery, setSearchQuery] = useState('');
//   const [favoriteExercises, setFavoriteExercises] = useState<Set<string>>(new Set());
//   const [customExercises, setCustomExercises] = useState<ExerciseSelection[]>([]);
//   const [showCustomInput, setShowCustomInput] = useState(false);
//   const [customExerciseName, setCustomExerciseName] = useState('');

//   // Cardio state
//   const [cardioData, setCardioData] = useState<{[key: string]: {duration: number, distance?: number}}>({});

//   // Workout selections for all activities
//   const [workoutSelections, setWorkoutSelections] = useState<{[key: string]: ExerciseSelection[]}>({});

//   // Activity types
//   const workoutActivities = [
//     { id: 'gym' as ActivityType, name: 'Gym' },
//     { id: 'calisthenics' as ActivityType, name: 'Calisthenics' },
//     { id: 'yoga' as ActivityType, name: 'Yoga' },
//     { id: 'running' as ActivityType, name: 'Running' },
//     { id: 'cycling' as ActivityType, name: 'Cycling' },
//     { id: 'jumba' as ActivityType, name: 'Jumba' },
//     { id: 'walking' as ActivityType, name: 'Walking' }
//   ];

//   // Muscle groups - Updated with Glutes
//   const splits = [
//     { name: 'Chest', emoji: '🏋️' },
//     { name: 'Back', emoji: '💪' },
//     { name: 'Legs', emoji: '🦵' },
//     { name: 'Glutes', emoji: '🍑' },
//     { name: 'Shoulders', emoji: '👔' },
//     { name: 'Biceps', emoji: '💪' },
//     { name: 'Triceps', emoji: '🦾' },
//     { name: 'Traps', emoji: '👔' },
//     { name: 'Core', emoji: '🎯' },
//     { name: 'Rest Day', emoji: '😴' }
//   ];

//   const pplWorkouts = [
//     { name: 'Push', emoji: '🔄', type: 'ppl' },
//     { name: 'Pull', emoji: '⬅️', type: 'ppl' },
//     { name: 'Legs', emoji: '🦵', type: 'ppl' }
//   ];

//   const upperLowerWorkouts = [
//     { name: 'Upper', emoji: '🔼', type: 'upperlower' },
//     { name: 'Lower', emoji: '🔽', type: 'upperlower' }
//   ];

//   // PanResponder for swipe navigation
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: (_, gestureState) => {
//         const { dx, dy } = gestureState;
//         return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 15;
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const { dx } = gestureState;
//         if (dx < -40) {
//           setCurrentWeekOffset(prev => prev + 1);
//         } else if (dx > 40) {
//           setCurrentWeekOffset(prev => prev - 1);
//         }
//       },
//     })
//   ).current;

//   // Get exercises based on activity type
//   const getExercisesByActivityType = (activity: ActivityType): ExerciseSelection[] => {
//     let workoutType: WorkoutType;
    
//     switch (activity) {
//       case 'gym': workoutType = WorkoutType.GYM; break;
//       case 'calisthenics': workoutType = WorkoutType.CALISTHENICS; break;
//       case 'yoga': workoutType = WorkoutType.YOGA; break;
//       case 'running': workoutType = WorkoutType.RUNNING; break;
//       case 'cycling': workoutType = WorkoutType.CYCLING; break;
//       case 'walking': workoutType = WorkoutType.WALKING; break;
//       case 'jumba': workoutType = WorkoutType.JUMBA; break;
//       default: workoutType = WorkoutType.GYM;
//     }

//     return EXERCISE_LIBRARY
//       .filter(exercise => exercise.workoutType === workoutType)
//       .map(exercise => ({
//         id: exercise.id,
//         name: exercise.name,
//         type: workoutType,
//         category: exercise.muscleGroup || exercise.difficulty
//       }));
//   };

//   // Get current exercises based on selected activity
//   const currentExercises = getExercisesByActivityType(selectedActivity);

//   // Combine with custom exercises for calisthenics/yoga
//   const allExercises = selectedActivity === 'calisthenics' || selectedActivity === 'yoga' 
//     ? [...customExercises, ...currentExercises]
//     : currentExercises;

//   // Filter exercises based on search
//   const filteredExercises = allExercises.filter(exercise => 
//     exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (exercise.category && exercise.category.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   // Week generation logic
//   const getWeekDates = (weekOffset: number = 0) => {
//     const today = new Date();
//     const startDate = new Date(today);
//     startDate.setDate(today.getDate() + (weekOffset * 7));
    
//     const dayOfWeek = startDate.getDay();
//     const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
//     startDate.setDate(startDate.getDate() + diffToMonday);
    
//     const week = [];
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       week.push({
//         day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
//         fullDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
//         date: date.getDate(),
//         fullDate: date.toISOString().split('T')[0],
//         month: date.getMonth(),
//         year: date.getFullYear(),
//         isToday: date.toDateString() === today.toDateString(),
//         monthName: date.toLocaleString('default', { month: 'short' })
//       });
//     }
//     return week;
//   };

//   const currentWeekDates = getWeekDates(currentWeekOffset);

//   // Initialize selected date
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     const todayInWeek = currentWeekDates.find(day => day.fullDate === today);
//     setSelectedDate(todayInWeek ? todayInWeek.fullDate : currentWeekDates[0]?.fullDate || '');
//   }, [currentWeekOffset, viewMode]);

//   // Reset week offset when view mode changes
//   useEffect(() => {
//     setCurrentWeekOffset(0);
//   }, [viewMode]);

//   // Check if date has rest day
//   const hasRestDay = (date: string) => {
//     const dateSelections = workoutSelections[date] || [];
//     return dateSelections.some(selection => selection.name === 'Rest Day');
//   };

//   // Check if exercise is selected for current date
//   const isExerciseSelected = (exerciseId: string) => {
//     if (!selectedDate || hasRestDay(selectedDate)) return false;
//     const dateSelections = workoutSelections[selectedDate] || [];
//     return dateSelections.some(selection => selection.id === exerciseId);
//   };

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
    
//     const aIsCustom = customExercises.some(ce => ce.id === a.id);
//     const bIsCustom = customExercises.some(ce => ce.id === b.id);
//     if (aIsCustom && !bIsCustom) return -1;
//     if (!aIsCustom && bIsCustom) return 1;
    
//     return 0;
//   });

//   // Handle multi-select for gym sections
//   const handleMultiSelect = (
//     itemName: string, 
//     category: string,
//     selectedState: {[key: string]: string[]},
//     setSelectedState: React.Dispatch<React.SetStateAction<{[key: string]: string[]}>>
//   ) => {
//     if (!selectedDate || hasRestDay(selectedDate)) return;

//     setSelectedState(prev => {
//       const currentSelections = prev[selectedDate] || [];
//       const isSelected = currentSelections.includes(itemName);
//       let newSelections: string[];
      
//       if (isSelected) {
//         newSelections = currentSelections.filter(name => name !== itemName);
//       } else {
//         newSelections = [...currentSelections, itemName];
//       }

//       const updatedSelections = { ...prev, [selectedDate]: newSelections };
//       updateWorkoutSelectionsWithMultiSelect(selectedDate, newSelections, category);
      
//       return updatedSelections;
//     });
//   };

//   const updateWorkoutSelectionsWithMultiSelect = (date: string, selectedItems: string[], category: string) => {
//     setWorkoutSelections(prev => {
//       const currentSelections = prev[date] || [];
//       const filteredSelections = currentSelections.filter(
//         selection => !(selection.type === WorkoutType.GYM && selection.category === category)
//       );
      
//       const newSelections = selectedItems.map(itemName => {
//         let workoutData: ExerciseSelection = {
//           id: `${category}-${itemName}-${date}`,
//           name: itemName,
//           type: WorkoutType.GYM
//         };

//         if (category === 'splits') {
//           const splitItem = splits.find(s => s.name === itemName);
//           workoutData.category = splitItem?.emoji || '💪';
//         } else if (category === 'ppl') {
//           const pplItem = pplWorkouts.find(p => p.name === itemName);
//           workoutData.category = pplItem?.emoji || '🔄';
//         } else if (category === 'upperlower') {
//           const upperLowerItem = upperLowerWorkouts.find(u => u.name === itemName);
//           workoutData.category = upperLowerItem?.emoji || '🔼';
//         }

//         return workoutData;
//       });
      
//       return {
//         ...prev,
//         [date]: [...filteredSelections, ...newSelections]
//       };
//     });
//   };

//   const isItemSelected = (itemName: string, selectedState: {[key: string]: string[]}) => {
//     if (!selectedDate || hasRestDay(selectedDate)) return false;
//     const dateSelections = selectedState[selectedDate] || [];
//     return dateSelections.includes(itemName);
//   };

//   // Handle Rest Day selection
//   const handleRestDaySelect = () => {
//     if (!selectedDate) return;

//     setSelectedMuscleGroups(prev => ({ ...prev, [selectedDate]: [] }));
//     setSelectedPPL(prev => ({ ...prev, [selectedDate]: [] }));
//     setSelectedUpperLower(prev => ({ ...prev, [selectedDate]: [] }));

//     setWorkoutSelections(prev => ({
//       ...prev,
//       [selectedDate]: [{ 
//         id: `rest-${selectedDate}`,
//         name: 'Rest Day', 
//         type: WorkoutType.WALKING
//       }]
//     }));
//   };

//   // Handle exercise selection for calisthenics/yoga
//   const handleActivityExerciseSelect = (exercise: ExerciseSelection) => {
//     if (!selectedDate || hasRestDay(selectedDate)) return;

//     setWorkoutSelections(prev => {
//       const currentSelections = prev[selectedDate] || [];
//       const existingIndex = currentSelections.findIndex(
//         selection => selection.id === exercise.id
//       );

//       let newSelections;
//       if (existingIndex >= 0) {
//         newSelections = currentSelections.filter((_, index) => index !== existingIndex);
//       } else {
//         newSelections = [...currentSelections, exercise];
//       }

//       return {
//         ...prev,
//         [selectedDate]: newSelections
//       };
//     });
//   };

//   // Handle cardio data input
//   const handleCardioDataChange = (field: 'duration' | 'distance', value: string) => {
//     if (!selectedDate || hasRestDay(selectedDate)) return;

//     const numericValue = parseFloat(value) || 0;
//     setCardioData(prev => ({
//       ...prev,
//       [selectedDate]: {
//         ...prev[selectedDate],
//         [field]: numericValue
//       }
//     }));

//     if (numericValue > 0) {
//       let workoutType: WorkoutType;
//       switch (selectedActivity) {
//         case 'running': workoutType = WorkoutType.RUNNING; break;
//         case 'cycling': workoutType = WorkoutType.CYCLING; break;
//         case 'walking': workoutType = WorkoutType.WALKING; break;
//         case 'jumba': workoutType = WorkoutType.JUMBA; break;
//         default: workoutType = WorkoutType.RUNNING;
//       }

//       setWorkoutSelections(prev => {
//         const currentSelections = prev[selectedDate] || [];
//         const existingIndex = currentSelections.findIndex(
//           selection => selection.type === workoutType
//         );

//         let newSelections;
//         if (existingIndex >= 0) {
//           newSelections = [...currentSelections];
//           newSelections[existingIndex] = {
//             ...newSelections[existingIndex],
//             name: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} Session`
//           };
//         } else {
//           newSelections = [...currentSelections, {
//             id: `cardio-${selectedDate}`,
//             name: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} Session`,
//             type: workoutType
//           }];
//         }

//         return {
//           ...prev,
//           [selectedDate]: newSelections
//         };
//       });
//     }
//   };

//   // Custom exercise functions
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

//     const workoutType = selectedActivity === 'calisthenics' ? WorkoutType.CALISTHENICS : WorkoutType.YOGA;
    
//     const newCustomExercise: ExerciseSelection = {
//       id: `custom-${Date.now()}`,
//       name: customExerciseName.trim(),
//       type: workoutType,
//       category: 'Custom'
//     };

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

//   // Save project - UPDATED WITH PROMPT FOR PROJECT NAME
//   const handleSaveProject = async () => {
//     try {
//       // Ask for project name
//       Alert.prompt(
//         'Project Name',
//         'Enter a name for your workout plan:',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Save',
//             onPress: async (projectName) => {
//               if (!projectName || !projectName.trim()) {
//                 Alert.alert('Error', 'Please enter a project name');
//                 return;
//               }

//               await saveProjectWithName(projectName.trim());
//             },
//           },
//         ],
//         'plain-text',
//         '',
//         'default'
//       );

//     } catch (error) {
//       console.error('Error in save project flow:', error);
//       Alert.alert('Error', 'Failed to save project. Please try again.');
//     }
//   };

//   // ✅ UPDATED: Smart exercise list generation based on activity type
//   const saveProjectWithName = async (projectName: string) => {
//     try {
//       console.log('🎯 ===== USER INPUTS DETAILED LOG =====');
//       console.log('📋 PROJECT OVERVIEW:');
//       console.log('   Project Name:', projectName);
//       console.log('   Selected Activity:', selectedActivity);
//       console.log('   Total Scheduled Days:', Object.keys(workoutSelections).length);
      
//       console.log('📅 SCHEDULED DAYS DETAIL:');
//       const scheduledDates = Object.keys(workoutSelections).sort();
      
//       if (scheduledDates.length === 0) {
//         console.log('   ❌ No workouts scheduled');
//       } else {
//         scheduledDates.forEach((date, index) => {
//           const selections = workoutSelections[date];
//           const dateObj = new Date(date);
//           const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
          
//           console.log(`   📍 Day ${index + 1}: ${date} (${dayName})`);
          
//           // Log workout selections for this day
//           if (selections.length === 0) {
//             console.log('      No workouts selected');
//           } else {
//             selections.forEach((selection, selIndex) => {
//               console.log(`      ${selIndex + 1}. ${selection.name} (${selection.type})`);
//               if (selection.category) {
//                 console.log(`         Category: ${selection.category}`);
//               }
//               console.log(`         ID: ${selection.id}`);
//             });
//           }
          
//           // Log muscle groups for this day
//           const muscleGroups = selectedMuscleGroups[date] || [];
//           if (muscleGroups.length > 0) {
//             console.log(`      💪 Muscle Groups: ${muscleGroups.join(', ')}`);
//           }
          
//           // Log PPL selections for this day
//           const pplSelections = selectedPPL[date] || [];
//           if (pplSelections.length > 0) {
//             console.log(`      🔄 PPL Split: ${pplSelections.join(', ')}`);
//           }
          
//           // Log Upper/Lower selections for this day
//           const upperLowerSelections = selectedUpperLower[date] || [];
//           if (upperLowerSelections.length > 0) {
//             console.log(`      🔼🔽 Upper/Lower: ${upperLowerSelections.join(', ')}`);
//           }
          
//           // Log cardio data for this day
//           const dayCardioData = cardioData[date];
//           if (dayCardioData && (dayCardioData.duration > 0 || dayCardioData.distance > 0)) {
//             console.log(`      🏃 Cardio: ${dayCardioData.duration}min${dayCardioData.distance ? `, ${dayCardioData.distance}km` : ''}`);
//           }
          
//           console.log(''); // Empty line between days
//         });
//       }
      
//       console.log('🎯 ===== END USER INPUTS LOG =====');
//       console.log(''); // Final empty line
  
//       // Transform workout selections to daily workouts
//       const dailyWorkouts: DailyWorkout[] = [];
      
//       if (scheduledDates.length === 0) {
//         Alert.alert('No Workouts', 'Please schedule at least one workout day before saving.');
//         return;
//       }
  
//       scheduledDates.forEach((date, index) => {
//         const selections = workoutSelections[date];

//         const activities: WorkoutActivity[] = selections.map(selection => {
//             let exercises = [];
            
//             // ✅ FIX: Check INDIVIDUAL selection type, not global selectedActivity
//             if (selection.type === WorkoutType.CALISTHENICS || selection.type === WorkoutType.YOGA) {
//               // For Calisthenics & Yoga: Use user-selected exercises
//               exercises = EXERCISE_LIBRARY.filter(ex => 
//                 ex.id === selection.id // Match exact exercise ID
//               );
              
//               console.log(`💾 Saving exercises for ${selection.name}:`, {
//                 selectionType: selection.type,
//                 exerciseCount: exercises.length,
//                 exerciseNames: exercises.map(ex => ex.name)
//               });
//             } 
//             // For Gym & Cardio: Keep exercises array empty (correct behavior)
            
//             return {
//               id: selection.id,
//               type: selection.type,
//               name: selection.name,
//               estimatedDuration: 30,
//               exercises: exercises
//             };
//           });
  
//         const focusAreas: string[] = [];
//         if (selectedMuscleGroups[date]) {
//           focusAreas.push(...selectedMuscleGroups[date]);
//         }
  
//         dailyWorkouts.push({
//           dayIndex: index,
//           name: `Day ${index + 1}`,
//           date: new Date(date),
//           completed: false,
//           activities,
//           focusAreas
//         });
//       });
  
//       const projectDuration = dailyWorkouts.length;
  
//       const projectData: CreateProjectData = {
//         title: projectName,
//         description: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} workout plan with ${projectDuration} days`,
//         type: selectedActivity,
//         duration: projectDuration,
//         dailyWorkouts,
//         focusAreas: Array.from(new Set(dailyWorkouts.flatMap(day => day.focusAreas))),
//         difficulty: 'intermediate' as const,
//         isPublic: false
//       };
  
//       // LOG THE FINAL PROJECT DATA BEING SAVED
//       console.log('💾 ===== PROJECT DATA BEING SAVED =====');
//       console.log('📋 Project Metadata:');
//       console.log('   Title:', projectData.title);
//       console.log('   Description:', projectData.description);
//       console.log('   Type:', projectData.type);
//       console.log('   Duration:', projectData.duration, 'days');
//       console.log('   Focus Areas:', projectData.focusAreas);
//       console.log('   Difficulty:', projectData.difficulty);
//       console.log('   Is Public:', projectData.isPublic);
//       console.log('');
      
//       console.log('📅 DAILY WORKOUTS STRUCTURE:');
//       projectData.dailyWorkouts.forEach((day, index) => {
//         console.log(`   🗓️  Day ${day.dayIndex + 1}: ${day.name} (${day.date.toDateString()})`);
//         console.log(`      Focus Areas: ${day.focusAreas.join(', ') || 'None'}`);
//         console.log(`      Completed: ${day.completed}`);
//         console.log(`      Activities: ${day.activities.length}`);
        
//         day.activities.forEach((activity, actIndex) => {
//           console.log(`        ${actIndex + 1}. ${activity.name} (${activity.type})`);
//           console.log(`           Estimated Duration: ${activity.estimatedDuration}min`);
//           console.log(`           Exercises: ${activity.exercises.length}`);
          
//           // Log exercise details
//           activity.exercises.forEach((ex, exIndex) => {
//             console.log(`             ${exIndex + 1}. ${ex.name}${ex.muscleGroup ? ` (${ex.muscleGroup})` : ''}`);
//           });
          
//           if (activity.exercises.length === 0) {
//             console.log(`             No specific exercises - will be selected during workout`);
//           }
//         });
//         console.log(''); // Empty line between days
//       });
      
//       console.log('💾 ===== END PROJECT DATA LOG =====');
//       console.log(''); // Final empty line
  
//       await createProject(projectData);
  
//       Alert.alert(
//         'Plan Created! 🎉',
//         `"${projectName}" has been created with ${dailyWorkouts.length} scheduled workouts.`,
//         [
//           {
//             text: 'View Projects',
//             onPress: () => {
//               // Navigate back to ProjectHomeScreen
//               navigation.goBack();
//             }
//           }
//         ]
//       );
  
//     } catch (error) {
//       console.error('❌ Error saving project:', error);
//       Alert.alert('Error', 'Failed to save project. Please try again.');
//     }
//   };

//   // Generic grid renderer
//   const renderMultiSelectGrid = (
//     items: any[], 
//     category: string,
//     selectedState: {[key: string]: string[]},
//     setSelectedState: React.Dispatch<React.SetStateAction<{[key: string]: string[]}>>
//   ) => {
//     const rows = [];
//     for (let i = 0; i < items.length; i += 2) {
//       const rowItems = items.slice(i, i + 2);
//       rows.push(
//         <View key={i} style={styles.gridRow}>
//           {rowItems.map((item) => {
//             const isSelected = isItemSelected(item.name, selectedState);
//             const isRestDay = hasRestDay(selectedDate);
            
//             return (
//               <TouchableOpacity
//                 key={item.name}
//                 style={[
//                   styles.compactButton,
//                   { backgroundColor: theme.colors.card },
//                   isSelected && { 
//                     borderColor: theme.colors.primary, 
//                     borderWidth: 2,
//                     backgroundColor: `${theme.colors.primary}20`
//                   },
//                   isRestDay && { opacity: 0.5 }
//                 ]}
//                 onPress={() => item.name === 'Rest Day' ? handleRestDaySelect() : handleMultiSelect(item.name, category, selectedState, setSelectedState)}
//                 disabled={isRestDay && item.name !== 'Rest Day'}
//               >
//                 <ThemeText style={styles.buttonEmoji}>{item.emoji}</ThemeText>
//                 <ThemeText style={[styles.buttonText, { 
//                   color: isSelected ? theme.colors.primary : theme.colors.text.primary 
//                 }]}>
//                   {item.name}
//                 </ThemeText>
                
//                 {isSelected && (
//                   <View style={[styles.selectionIndicator, { backgroundColor: theme.colors.primary }]}>
//                     <ThemeText style={styles.selectionIndicatorText}>✓</ThemeText>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       );
//     }
//     return rows;
//   };

//   const getCurrentCardioData = () => {
//     return cardioData[selectedDate] || { duration: 0, distance: 0 };
//   };

//   const isRestDay = hasRestDay(selectedDate);

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
//           Create Project Plan
//         </ThemeText>
//         <View style={styles.headerSpacer} />
//       </View>

//       {/* Workout Activity Selector */}
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         style={styles.activityScroll}
//         contentContainerStyle={styles.activityContainer}
//       >
//         {workoutActivities.map((activity, index) => (
//           <View key={activity.id} style={styles.activityItem}>
//             <TouchableOpacity onPress={() => setSelectedActivity(activity.id)}>
//               <ThemeText style={[
//                 styles.activityText,
//                 { color: theme.colors.text.primary },
//                 selectedActivity === activity.id && { color: theme.colors.primary }
//               ]}>
//                 {activity.name}
//               </ThemeText>
//             </TouchableOpacity>
//             {index < workoutActivities.length - 1 && (
//               <ThemeText style={[styles.activitySeparator, { color: theme.colors.text.secondary }]}>|</ThemeText>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Calendar */}
//       <View style={styles.calendarWrapper} {...panResponder.panHandlers}>
//         <View style={styles.calendarContent}>
//           {currentWeekDates.map((day) => (
//             <TouchableOpacity
//               key={day.fullDate}
//               style={[
//                 styles.calendarDay,
//                 { backgroundColor: theme.colors.card },
//                 selectedDate === day.fullDate && [styles.selectedDay, { backgroundColor: theme.colors.primary }],
//                 day.isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
//                 hasRestDay(day.fullDate) && { borderColor: theme.colors.accent, borderWidth: 2 }
//               ]}
//               onPress={() => setSelectedDate(day.fullDate)}
//             >
//               <ThemeText style={[
//                 styles.dayLetter,
//                 { color: selectedDate === day.fullDate ? '#FFF' : theme.colors.text.primary }
//               ]}>
//                 {day.day}
//               </ThemeText>
//               <ThemeText style={[
//                 styles.dayDate,
//                 { color: selectedDate === day.fullDate ? '#FFF' : theme.colors.text.secondary }
//               ]}>
//                 {day.date}
//               </ThemeText>
              
//               {day.isToday && (
//                 <View style={[styles.todayIndicator, { backgroundColor: theme.colors.primary }]} />
//               )}
              
//               {(workoutSelections[day.fullDate] || []).length > 0 && !hasRestDay(day.fullDate) && (
//                 <View style={[
//                   styles.workoutDot,
//                   { backgroundColor: selectedDate === day.fullDate ? '#FFF' : theme.colors.primary }
//                 ]} />
//               )}
              
//               {hasRestDay(day.fullDate) && (
//                 <ThemeText style={styles.restDayIcon}>😴</ThemeText>
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* View Mode Selector */}
//       <View style={styles.viewModeContainer}>
//         {(['day', 'week', 'month'] as const).map((mode) => (
//           <React.Fragment key={mode}>
//             <TouchableOpacity onPress={() => setViewMode(mode)}>
//               <ThemeText style={[
//                 styles.viewModeText,
//                 { color: theme.colors.text.primary },
//                 viewMode === mode && { color: theme.colors.primary, fontWeight: 'bold' }
//               ]}>
//                 {mode.charAt(0).toUpperCase() + mode.slice(1)}
//               </ThemeText>
//             </TouchableOpacity>
//             {mode !== 'month' && (
//               <ThemeText style={[styles.viewModeSeparator, { color: theme.colors.text.secondary }]}>|</ThemeText>
//             )}
//           </React.Fragment>
//         ))}
//       </View>

//       {/* Rest Day Banner */}
//       {isRestDay && (
//         <View style={[styles.restDayBanner, { backgroundColor: `${theme.colors.accent}20` }]}>
//           <ThemeText style={[styles.restDayBannerText, { color: theme.colors.accent }]}>
//             🎯 REST DAY - No workouts scheduled for {selectedDate}
//           </ThemeText>
//           <TouchableOpacity 
//             style={[styles.removeRestDayButton, { backgroundColor: theme.colors.accent }]}
//             onPress={() => {
//               setWorkoutSelections(prev => ({ ...prev, [selectedDate]: [] }));
//               setSelectedMuscleGroups(prev => ({ ...prev, [selectedDate]: [] }));
//               setSelectedPPL(prev => ({ ...prev, [selectedDate]: [] }));
//               setSelectedUpperLower(prev => ({ ...prev, [selectedDate]: [] }));
//             }}
//           >
//             <ThemeText style={styles.removeRestDayText}>Remove</ThemeText>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Content Area */}
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {selectedActivity === 'gym' ? (
//           /* GYM CONTENT */
//           <>
//             <View style={styles.section}>
//               <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
//                 Muscle Groups
//               </ThemeText>
//               {renderMultiSelectGrid(splits, 'splits', selectedMuscleGroups, setSelectedMuscleGroups)}
//             </View>

//             <View style={styles.section}>
//               <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
//                 PPL Split
//               </ThemeText>
//               {renderMultiSelectGrid(pplWorkouts, 'ppl', selectedPPL, setSelectedPPL)}
//             </View>

//             <View style={styles.section}>
//               <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
//                 Upper/Lower Split
//               </ThemeText>
//               {renderMultiSelectGrid(upperLowerWorkouts, 'upperlower', selectedUpperLower, setSelectedUpperLower)}
//             </View>
//           </>
//         ) : (selectedActivity === 'calisthenics' || selectedActivity === 'yoga') ? (
//           /* CALISTHENICS/YOGA CONTENT */
//           <>
//             <View style={styles.searchSection}>
//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={[
//                     styles.searchInput,
//                     { 
//                       backgroundColor: theme.colors.card,
//                       color: theme.colors.text.primary,
//                       borderColor: theme.colors.border
//                     }
//                   ]}
//                   placeholder={`Search ${selectedActivity} exercises...`}
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                 />
//                 {searchQuery.length > 0 && (
//                   <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
//                     <ThemeText style={[styles.clearSearchText, { color: theme.colors.text.secondary }]}>✕</ThemeText>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>

//             <TouchableOpacity
//               style={[styles.restDayButton, { backgroundColor: theme.colors.card }]}
//               onPress={handleRestDaySelect}
//               disabled={isRestDay}
//             >
//               <ThemeText style={styles.restDayEmoji}>😴</ThemeText>
//               <ThemeText style={[styles.restDayText, { color: theme.colors.text.primary }]}>
//                 Rest Day
//               </ThemeText>
//             </TouchableOpacity>

//             <View style={styles.customExerciseSection}>
//               {showCustomInput ? (
//                 <View style={[
//                   styles.customInputContainer,
//                   { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }
//                 ]}>
//                   <TextInput
//                     style={[styles.customInput, { color: theme.colors.text.primary }]}
//                     placeholder="Enter exercise name..."
//                     placeholderTextColor={theme.colors.text.secondary}
//                     value={customExerciseName}
//                     onChangeText={setCustomExerciseName}
//                     autoFocus
//                     onSubmitEditing={handleAddCustomExercise}
//                   />
//                   <TouchableOpacity
//                     style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}
//                     onPress={handleAddCustomExercise}
//                   >
//                     <ThemeText style={styles.plusButtonText}>+</ThemeText>
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   style={[styles.customExerciseButton, { backgroundColor: theme.colors.card }]}
//                   onPress={() => setShowCustomInput(true)}
//                   disabled={isRestDay}
//                 >
//                   <ThemeText style={[styles.customExerciseText, { color: theme.colors.text.primary }]}>
//                     Custom Exercise
//                   </ThemeText>
//                   <View style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}>
//                     <ThemeText style={styles.plusButtonText}>+</ThemeText>
//                   </View>
//                 </TouchableOpacity>
//               )}
//             </View>

//             <View style={styles.exerciseList}>
//               {sortedExercises.map((exercise) => (
//                 <TouchableOpacity
//                   key={exercise.id}
//                   style={[
//                     styles.exerciseSelectButton, 
//                     { backgroundColor: theme.colors.card },
//                     isExerciseSelected(exercise.id) && { 
//                       borderColor: theme.colors.primary, 
//                       borderWidth: 2 
//                     },
//                     isRestDay && { opacity: 0.5 }
//                   ]}
//                   onPress={() => handleActivityExerciseSelect(exercise)}
//                   disabled={isRestDay}
//                 >
//                   <View style={styles.exerciseSelectInfo}>
//                     <ThemeText style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
//                       {exercise.name}
//                       {customExercises.some(ce => ce.id === exercise.id) && ' (Custom)'}
//                     </ThemeText>
//                     <ThemeText style={[styles.exerciseCategory, { color: theme.colors.text.secondary }]}>
//                       {exercise.category}
//                     </ThemeText>
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
//               ))}
//             </View>
//           </>
//         ) : (
//           /* CARDIO ACTIVITIES CONTENT */
//           <View style={styles.cardioSection}>
//             <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
//               {selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} Plan
//             </ThemeText>
            
//             <View style={styles.inputGroup}>
//               <ThemeText style={[styles.inputLabel, { color: theme.colors.text.primary }]}>
//                 Duration (minutes)
//               </ThemeText>
//               <TextInput
//                 style={[styles.cardioInput, { 
//                   backgroundColor: theme.colors.card, 
//                   color: theme.colors.text.primary,
//                   borderColor: theme.colors.border 
//                 }]}
//                 value={getCurrentCardioData().duration.toString()}
//                 onChangeText={(text) => handleCardioDataChange('duration', text)}
//                 keyboardType="numeric"
//                 placeholder="0"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 editable={!isRestDay}
//               />
//             </View>

//             {selectedActivity !== 'jumba' && (
//               <View style={styles.inputGroup}>
//                 <ThemeText style={[styles.inputLabel, { color: theme.colors.text.primary }]}>
//                   Distance (km)
//                 </ThemeText>
//                 <TextInput
//                   style={[styles.cardioInput, { 
//                     backgroundColor: theme.colors.card, 
//                     color: theme.colors.text.primary,
//                     borderColor: theme.colors.border 
//                   }]}
//                   value={getCurrentCardioData().distance?.toString() || '0'}
//                   onChangeText={(text) => handleCardioDataChange('distance', text)}
//                   keyboardType="numeric"
//                   placeholder="0"
//                   placeholderTextColor={theme.colors.text.secondary}
//                   editable={!isRestDay}
//                 />
//               </View>
//             )}

//             <TouchableOpacity
//               style={[styles.restDayButton, { backgroundColor: theme.colors.card, marginTop: 20 }]}
//               onPress={handleRestDaySelect}
//               disabled={isRestDay}
//             >
//               <ThemeText style={styles.restDayEmoji}>😴</ThemeText>
//               <ThemeText style={[styles.restDayText, { color: theme.colors.text.primary }]}>
//                 Rest Day
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {/* Bottom Actions */}
//       <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
//         <View style={styles.selectionActions}>
//           <TouchableOpacity 
//             style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
//             onPress={() => navigation.goBack()}
//           >
//             <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
//               Cancel
//             </ThemeText>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
//             onPress={handleSaveProject}
//           >
//             <ThemeText style={styles.saveButtonText}>
//               Save Workout Plan
//             </ThemeText>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ThemeView>
//   );
// };

// export default CreateProjectScreen;

// src/features/projects/components/CreateProjectScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  PanResponder,
  TextInput,
  Keyboard,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useProjectStore } from '../stores/useProjectStore';
import { useNavigation } from '@react-navigation/native';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { useIsOnline } from '../../../shared/hooks/useNetworkStatus'; // 🚀 NEW
import { EXERCISE_LIBRARY } from '../../../shared/data/exercises';
import { WorkoutType } from '../../workout/types/workout';
import { CreateProjectData, DailyWorkout, WorkoutActivity } from '../types/project';
import { createStyles } from '../styles/CreateProjectScreenStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ActivityType = 'gym' | 'calisthenics' | 'yoga' | 'running' | 'cycling' | 'jumba' | 'walking';

interface ExerciseSelection {
  id: string;
  name: string;
  type: WorkoutType;
  category?: string;
}

export const CreateProjectScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { createProject } = useProjectStore();
  const navigation = useNavigation();
  const styles = createStyles(theme);
  
  // 🚀 PRODUCTION READY: Enhanced state management
  const [isCreating, setIsCreating] = useState(false);
  const isOnline = useIsOnline();

  // Handle back navigation
  const handleBack = () => {
    if (isCreating) {
      Alert.alert(
        'Creating Project',
        'Your project is being created. Are you sure you want to leave?',
        [
          { text: 'Stay', style: 'cancel' },
          { text: 'Leave', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  // Main form state
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>('gym');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Gym state
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<{[key: string]: string[]}>({});
  const [selectedPPL, setSelectedPPL] = useState<{[key: string]: string[]}>({});
  const [selectedUpperLower, setSelectedUpperLower] = useState<{[key: string]: string[]}>({});

  // Calisthenics/Yoga state
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteExercises, setFavoriteExercises] = useState<Set<string>>(new Set());
  const [customExercises, setCustomExercises] = useState<ExerciseSelection[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState('');

  // Cardio state
  const [cardioData, setCardioData] = useState<{[key: string]: {duration: number, distance?: number}}>({});

  // Workout selections for all activities
  const [workoutSelections, setWorkoutSelections] = useState<{[key: string]: ExerciseSelection[]}>({});

  // Activity types
  const workoutActivities = [
    { id: 'gym' as ActivityType, name: 'Gym' },
    { id: 'calisthenics' as ActivityType, name: 'Calisthenics' },
    { id: 'yoga' as ActivityType, name: 'Yoga' },
    { id: 'running' as ActivityType, name: 'Running' },
    { id: 'cycling' as ActivityType, name: 'Cycling' },
    { id: 'jumba' as ActivityType, name: 'Jumba' },
    { id: 'walking' as ActivityType, name: 'Walking' }
  ];

  // Muscle groups - Updated with Glutes
  const splits = [
    { name: 'Chest', emoji: '🏋️' },
    { name: 'Back', emoji: '💪' },
    { name: 'Legs', emoji: '🦵' },
    { name: 'Glutes', emoji: '🍑' },
    { name: 'Shoulders', emoji: '👔' },
    { name: 'Biceps', emoji: '💪' },
    { name: 'Triceps', emoji: '🦾' },
    { name: 'Traps', emoji: '👔' },
    { name: 'Core', emoji: '🎯' },
    { name: 'Rest Day', emoji: '😴' }
  ];

  const pplWorkouts = [
    { name: 'Push', emoji: '🔄', type: 'ppl' },
    { name: 'Pull', emoji: '⬅️', type: 'ppl' },
    { name: 'Legs', emoji: '🦵', type: 'ppl' }
  ];

  const upperLowerWorkouts = [
    { name: 'Upper', emoji: '🔼', type: 'upperlower' },
    { name: 'Lower', emoji: '🔽', type: 'upperlower' }
  ];

  // PanResponder for swipe navigation
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 15;
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        if (dx < -40) {
          setCurrentWeekOffset(prev => prev + 1);
        } else if (dx > 40) {
          setCurrentWeekOffset(prev => prev - 1);
        }
      },
    })
  ).current;

  // Get exercises based on activity type
  const getExercisesByActivityType = (activity: ActivityType): ExerciseSelection[] => {
    let workoutType: WorkoutType;
    
    switch (activity) {
      case 'gym': workoutType = WorkoutType.GYM; break;
      case 'calisthenics': workoutType = WorkoutType.CALISTHENICS; break;
      case 'yoga': workoutType = WorkoutType.YOGA; break;
      case 'running': workoutType = WorkoutType.RUNNING; break;
      case 'cycling': workoutType = WorkoutType.CYCLING; break;
      case 'walking': workoutType = WorkoutType.WALKING; break;
      case 'jumba': workoutType = WorkoutType.JUMBA; break;
      default: workoutType = WorkoutType.GYM;
    }

    return EXERCISE_LIBRARY
      .filter(exercise => exercise.workoutType === workoutType)
      .map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        type: workoutType,
        category: exercise.muscleGroup || exercise.difficulty
      }));
  };

  // Get current exercises based on selected activity
  const currentExercises = getExercisesByActivityType(selectedActivity);

  // Combine with custom exercises for calisthenics/yoga
  const allExercises = selectedActivity === 'calisthenics' || selectedActivity === 'yoga' 
    ? [...customExercises, ...currentExercises]
    : currentExercises;

  // Filter exercises based on search
  const filteredExercises = allExercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (exercise.category && exercise.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Week generation logic
  const getWeekDates = (weekOffset: number = 0) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + (weekOffset * 7));
    
    const dayOfWeek = startDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(startDate.getDate() + diffToMonday);
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      week.push({
        day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
        fullDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
        date: date.getDate(),
        fullDate: date.toISOString().split('T')[0],
        month: date.getMonth(),
        year: date.getFullYear(),
        isToday: date.toDateString() === today.toDateString(),
        monthName: date.toLocaleString('default', { month: 'short' })
      });
    }
    return week;
  };

  const currentWeekDates = getWeekDates(currentWeekOffset);

  // Initialize selected date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayInWeek = currentWeekDates.find(day => day.fullDate === today);
    setSelectedDate(todayInWeek ? todayInWeek.fullDate : currentWeekDates[0]?.fullDate || '');
  }, [currentWeekOffset, viewMode]);

  // Reset week offset when view mode changes
  useEffect(() => {
    setCurrentWeekOffset(0);
  }, [viewMode]);

  // Check if date has rest day
  const hasRestDay = (date: string) => {
    const dateSelections = workoutSelections[date] || [];
    return dateSelections.some(selection => selection.name === 'Rest Day');
  };

  // Check if exercise is selected for current date
  const isExerciseSelected = (exerciseId: string) => {
    if (!selectedDate || hasRestDay(selectedDate)) return false;
    const dateSelections = workoutSelections[selectedDate] || [];
    return dateSelections.some(selection => selection.id === exerciseId);
  };

  // Sort exercises: selected first, then favorites, then custom, then library
  const sortedExercises = filteredExercises.sort((a, b) => {
    const aIsSelected = isExerciseSelected(a.id);
    const bIsSelected = isExerciseSelected(b.id);
    if (aIsSelected && !bIsSelected) return -1;
    if (!aIsSelected && bIsSelected) return 1;
    
    const aIsFavorite = favoriteExercises.has(a.id);
    const bIsFavorite = favoriteExercises.has(b.id);
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;
    
    const aIsCustom = customExercises.some(ce => ce.id === a.id);
    const bIsCustom = customExercises.some(ce => ce.id === b.id);
    if (aIsCustom && !bIsCustom) return -1;
    if (!aIsCustom && bIsCustom) return 1;
    
    return 0;
  });

  // Handle multi-select for gym sections
  const handleMultiSelect = (
    itemName: string, 
    category: string,
    selectedState: {[key: string]: string[]},
    setSelectedState: React.Dispatch<React.SetStateAction<{[key: string]: string[]}>>
  ) => {
    if (!selectedDate || hasRestDay(selectedDate)) return;

    setSelectedState(prev => {
      const currentSelections = prev[selectedDate] || [];
      const isSelected = currentSelections.includes(itemName);
      let newSelections: string[];
      
      if (isSelected) {
        newSelections = currentSelections.filter(name => name !== itemName);
      } else {
        newSelections = [...currentSelections, itemName];
      }

      const updatedSelections = { ...prev, [selectedDate]: newSelections };
      updateWorkoutSelectionsWithMultiSelect(selectedDate, newSelections, category);
      
      return updatedSelections;
    });
  };

  const updateWorkoutSelectionsWithMultiSelect = (date: string, selectedItems: string[], category: string) => {
    setWorkoutSelections(prev => {
      const currentSelections = prev[date] || [];
      const filteredSelections = currentSelections.filter(
        selection => !(selection.type === WorkoutType.GYM && selection.category === category)
      );
      
      const newSelections = selectedItems.map(itemName => {
        let workoutData: ExerciseSelection = {
          id: `${category}-${itemName}-${date}`,
          name: itemName,
          type: WorkoutType.GYM
        };

        if (category === 'splits') {
          const splitItem = splits.find(s => s.name === itemName);
          workoutData.category = splitItem?.emoji || '💪';
        } else if (category === 'ppl') {
          const pplItem = pplWorkouts.find(p => p.name === itemName);
          workoutData.category = pplItem?.emoji || '🔄';
        } else if (category === 'upperlower') {
          const upperLowerItem = upperLowerWorkouts.find(u => u.name === itemName);
          workoutData.category = upperLowerItem?.emoji || '🔼';
        }

        return workoutData;
      });
      
      return {
        ...prev,
        [date]: [...filteredSelections, ...newSelections]
      };
    });
  };

  const isItemSelected = (itemName: string, selectedState: {[key: string]: string[]}) => {
    if (!selectedDate || hasRestDay(selectedDate)) return false;
    const dateSelections = selectedState[selectedDate] || [];
    return dateSelections.includes(itemName);
  };

  // Handle Rest Day selection
  const handleRestDaySelect = () => {
    if (!selectedDate) return;

    setSelectedMuscleGroups(prev => ({ ...prev, [selectedDate]: [] }));
    setSelectedPPL(prev => ({ ...prev, [selectedDate]: [] }));
    setSelectedUpperLower(prev => ({ ...prev, [selectedDate]: [] }));

    setWorkoutSelections(prev => ({
      ...prev,
      [selectedDate]: [{ 
        id: `rest-${selectedDate}`,
        name: 'Rest Day', 
        type: WorkoutType.WALKING
      }]
    }));
  };

  // Handle exercise selection for calisthenics/yoga
  const handleActivityExerciseSelect = (exercise: ExerciseSelection) => {
    if (!selectedDate || hasRestDay(selectedDate)) return;

    setWorkoutSelections(prev => {
      const currentSelections = prev[selectedDate] || [];
      const existingIndex = currentSelections.findIndex(
        selection => selection.id === exercise.id
      );

      let newSelections;
      if (existingIndex >= 0) {
        newSelections = currentSelections.filter((_, index) => index !== existingIndex);
      } else {
        newSelections = [...currentSelections, exercise];
      }

      return {
        ...prev,
        [selectedDate]: newSelections
      };
    });
  };

  // Handle cardio data input
  const handleCardioDataChange = (field: 'duration' | 'distance', value: string) => {
    if (!selectedDate || hasRestDay(selectedDate)) return;

    const numericValue = parseFloat(value) || 0;
    setCardioData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [field]: numericValue
      }
    }));

    if (numericValue > 0) {
      let workoutType: WorkoutType;
      switch (selectedActivity) {
        case 'running': workoutType = WorkoutType.RUNNING; break;
        case 'cycling': workoutType = WorkoutType.CYCLING; break;
        case 'walking': workoutType = WorkoutType.WALKING; break;
        case 'jumba': workoutType = WorkoutType.JUMBA; break;
        default: workoutType = WorkoutType.RUNNING;
      }

      setWorkoutSelections(prev => {
        const currentSelections = prev[selectedDate] || [];
        const existingIndex = currentSelections.findIndex(
          selection => selection.type === workoutType
        );

        let newSelections;
        if (existingIndex >= 0) {
          newSelections = [...currentSelections];
          newSelections[existingIndex] = {
            ...newSelections[existingIndex],
            name: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} Session`
          };
        } else {
          newSelections = [...currentSelections, {
            id: `cardio-${selectedDate}`,
            name: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} Session`,
            type: workoutType
          }];
        }

        return {
          ...prev,
          [selectedDate]: newSelections
        };
      });
    }
  };

  // Custom exercise functions
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

    const workoutType = selectedActivity === 'calisthenics' ? WorkoutType.CALISTHENICS : WorkoutType.YOGA;
    
    const newCustomExercise: ExerciseSelection = {
      id: `custom-${Date.now()}`,
      name: customExerciseName.trim(),
      type: workoutType,
      category: 'Custom'
    };

    setCustomExercises(prev => [newCustomExercise, ...prev]);
    setCustomExerciseName('');
    setShowCustomInput(false);
    setSearchQuery('');
  };

  const toggleFavorite = (exerciseId: string) => {
    setFavoriteExercises(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(exerciseId)) {
        newFavorites.delete(exerciseId);
      } else {
        newFavorites.add(exerciseId);
      }
      return newFavorites;
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  // 🚀 PRODUCTION READY: Enhanced save project with proper error handling
  const handleSaveProject = async () => {
    // 🎯 Check network status and warn user
    if (!isOnline) {
      Alert.alert(
        'Offline Mode',
        'You appear to be offline. Projects created offline will be saved when you reconnect.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue Anyway', onPress: () => promptForProjectName() }
        ]
      );
    } else {
      promptForProjectName();
    }
  };

  const promptForProjectName = () => {
    Alert.prompt(
      'Project Name',
      'Enter a name for your workout plan:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: async (projectName) => {
            if (!projectName || !projectName.trim()) {
              Alert.alert('Error', 'Please enter a project name');
              return;
            }
            await saveProjectWithName(projectName.trim());
          },
        },
      ],
      'plain-text',
      '',
      'default'
    );
  };

//   // 🚀 PRODUCTION READY: Enhanced project creation with loading states
//   const saveProjectWithName = async (projectName: string) => {
//     setIsCreating(true);
    
//     try {
//       console.log('🎯 Creating project with name:', projectName);
      
//       console.log('📋 PROJECT OVERVIEW:');
//       console.log('   Project Name:', projectName);
//       console.log('   Selected Activity:', selectedActivity);
//       console.log('   Total Scheduled Days:', Object.keys(workoutSelections).length);
      
//       console.log('📅 SCHEDULED DAYS DETAIL:');
//       const scheduledDates = Object.keys(workoutSelections).sort();
      
//       if (scheduledDates.length === 0) {
//         Alert.alert('No Workouts', 'Please schedule at least one workout day before saving.');
//         setIsCreating(false);
//         return;
//       }

//       scheduledDates.forEach((date, index) => {
//         const selections = workoutSelections[date];
//         const dateObj = new Date(date);
//         const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        
//         console.log(`   📍 Day ${index + 1}: ${date} (${dayName})`);
        
//         if (selections.length === 0) {
//           console.log('      No workouts selected');
//         } else {
//           selections.forEach((selection, selIndex) => {
//             console.log(`      ${selIndex + 1}. ${selection.name} (${selection.type})`);
//           });
//         }
//       });
  
//       // Transform workout selections to daily workouts
//       const dailyWorkouts: DailyWorkout[] = [];
  
//       scheduledDates.forEach((date, index) => {
//         const selections = workoutSelections[date];

//         const activities: WorkoutActivity[] = selections.map(selection => {
//             let exercises = [];
            
//             // ✅ FIX: Check INDIVIDUAL selection type, not global selectedActivity
//             if (selection.type === WorkoutType.CALISTHENICS || selection.type === WorkoutType.YOGA) {
//               // For Calisthenics & Yoga: Use user-selected exercises
//               exercises = EXERCISE_LIBRARY.filter(ex => 
//                 ex.id === selection.id // Match exact exercise ID
//               );
              
//               console.log(`💾 Saving exercises for ${selection.name}:`, {
//                 selectionType: selection.type,
//                 exerciseCount: exercises.length,
//                 exerciseNames: exercises.map(ex => ex.name)
//               });
//             } 
//             // For Gym & Cardio: Keep exercises array empty (correct behavior)
            
//             return {
//               id: selection.id,
//               type: selection.type,
//               name: selection.name,
//               estimatedDuration: 30,
//               exercises: exercises
//             };
//           });
  
//         const focusAreas: string[] = [];
//         if (selectedMuscleGroups[date]) {
//           focusAreas.push(...selectedMuscleGroups[date]);
//         }
  
//         dailyWorkouts.push({
//           dayIndex: index,
//           name: `Day ${index + 1}`,
//           date: new Date(date),
//           completed: false,
//           activities,
//           focusAreas
//         });
//       });
  
//       const projectDuration = dailyWorkouts.length;
  
//       const projectData: CreateProjectData = {
//         title: projectName,
//         description: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} workout plan with ${projectDuration} days`,
//         type: selectedActivity,
//         duration: projectDuration,
//         dailyWorkouts,
//         focusAreas: Array.from(new Set(dailyWorkouts.flatMap(day => day.focusAreas))),
//         difficulty: 'intermediate' as const,
//         isPublic: false
//       };
  
//       console.log('💾 Creating project with data:', {
//         title: projectData.title,
//         days: projectData.duration,
//         activities: projectData.dailyWorkouts.length
//       });

//       // 🚀 KEY CHANGE: Use the enhanced createProject that returns Firebase ID
//       const firebaseProjectId = await createProject(projectData);
      
//       console.log('✅ Project created successfully with ID:', firebaseProjectId);

//       Alert.alert(
//         'Plan Created! 🎉',
//         `"${projectName}" has been created with ${dailyWorkouts.length} scheduled workouts.`,
//         [
//           {
//             text: 'View Project',
//             onPress: () => {
//               // 🚀 KEY CHANGE: Navigate using Firebase ID immediately
//                // 🚀 CLEANEST: Cast the entire navigation call
//                 (navigation.navigate as any)('ProjectDetail', { 
//                     projectId: firebaseProjectId 
//                 });
//             }
//           }
//         ]
//       );

//     } catch (error: any) {
//       console.error('❌ Error saving project:', error);
      
//       // 🚀 PRODUCTION READY: User-friendly error messages
//       let errorMessage = 'Failed to save project. Please try again.';
//       let errorTitle = 'Error';
      
//       if (error.userMessage) {
//         errorMessage = error.userMessage;
//       } else if (error.message?.includes('network') || error.message?.includes('offline')) {
//         errorTitle = 'Connection Issue';
//         errorMessage = 'Please check your internet connection and try again.';
//       } else if (error.message?.includes('authentication')) {
//         errorTitle = 'Sign In Required';
//         errorMessage = 'Please sign in to create projects.';
//       }
      
//       Alert.alert(errorTitle, errorMessage);
//     } finally {
//       setIsCreating(false);
//     }
//   };
// 🚀 PRODUCTION READY: Enhanced project creation with industry standard navigation
const saveProjectWithName = async (projectName: string) => {
    setIsCreating(true);
    
    try {
      console.log('🎯 ===== USER INPUTS DETAILED LOG =====');
      console.log('📋 PROJECT OVERVIEW:');
      console.log('   Project Name:', projectName);
      console.log('   Selected Activity:', selectedActivity);
      console.log('   Total Scheduled Days:', Object.keys(workoutSelections).length);
      
      console.log('📅 SCHEDULED DAYS DETAIL:');
      const scheduledDates = Object.keys(workoutSelections).sort();
      
      if (scheduledDates.length === 0) {
        Alert.alert('No Workouts', 'Please schedule at least one workout day before saving.');
        setIsCreating(false);
        return;
      } else {
        scheduledDates.forEach((date, index) => {
          const selections = workoutSelections[date];
          const dateObj = new Date(date);
          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
          
          console.log(`   📍 Day ${index + 1}: ${date} (${dayName})`);
          
          // Log workout selections for this day
          if (selections.length === 0) {
            console.log('      No workouts selected');
          } else {
            selections.forEach((selection, selIndex) => {
              console.log(`      ${selIndex + 1}. ${selection.name} (${selection.type})`);
              if (selection.category) {
                console.log(`         Category: ${selection.category}`);
              }
              console.log(`         ID: ${selection.id}`);
            });
          }
          
          // Log muscle groups for this day
          const muscleGroups = selectedMuscleGroups[date] || [];
          if (muscleGroups.length > 0) {
            console.log(`      💪 Muscle Groups: ${muscleGroups.join(', ')}`);
          }
          
          // Log PPL selections for this day
          const pplSelections = selectedPPL[date] || [];
          if (pplSelections.length > 0) {
            console.log(`      🔄 PPL Split: ${pplSelections.join(', ')}`);
          }
          
          // Log Upper/Lower selections for this day
          const upperLowerSelections = selectedUpperLower[date] || [];
          if (upperLowerSelections.length > 0) {
            console.log(`      🔼🔽 Upper/Lower: ${upperLowerSelections.join(', ')}`);
          }
          
          // Log cardio data for this day
          const dayCardioData = cardioData[date];
          if (dayCardioData && (dayCardioData.duration > 0 || dayCardioData.distance > 0)) {
            console.log(`      🏃 Cardio: ${dayCardioData.duration}min${dayCardioData.distance ? `, ${dayCardioData.distance}km` : ''}`);
          }
          
          console.log(''); // Empty line between days
        });
      }
      
      console.log('🎯 ===== END USER INPUTS LOG =====');
      console.log(''); // Final empty line
  
      // Transform workout selections to daily workouts
      const dailyWorkouts: DailyWorkout[] = [];
  
      scheduledDates.forEach((date, index) => {
        const selections = workoutSelections[date];
  
        const activities: WorkoutActivity[] = selections.map(selection => {
            let exercises = [];
            
            // ✅ FIX: Check INDIVIDUAL selection type, not global selectedActivity
            if (selection.type === WorkoutType.CALISTHENICS || selection.type === WorkoutType.YOGA) {
              // For Calisthenics & Yoga: Use user-selected exercises
              exercises = EXERCISE_LIBRARY.filter(ex => 
                ex.id === selection.id // Match exact exercise ID
              );
              
              console.log(`💾 Saving exercises for ${selection.name}:`, {
                selectionType: selection.type,
                exerciseCount: exercises.length,
                exerciseNames: exercises.map(ex => ex.name)
              });
            } 
            // For Gym & Cardio: Keep exercises array empty (correct behavior)
            
            return {
              id: selection.id,
              type: selection.type,
              name: selection.name,
              estimatedDuration: 30,
              exercises: exercises
            };
          });
  
        const focusAreas: string[] = [];
        if (selectedMuscleGroups[date]) {
          focusAreas.push(...selectedMuscleGroups[date]);
        }
  
        dailyWorkouts.push({
          dayIndex: index,
          name: `Day ${index + 1}`,
          date: new Date(date),
          completed: false,
          activities,
          focusAreas
        });
      });
  
      const projectDuration = dailyWorkouts.length;
  
      const projectData: CreateProjectData = {
        title: projectName,
        description: `${selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} workout plan with ${projectDuration} days`,
        type: selectedActivity,
        duration: projectDuration,
        dailyWorkouts,
        focusAreas: Array.from(new Set(dailyWorkouts.flatMap(day => day.focusAreas))),
        difficulty: 'intermediate' as const,
        isPublic: false
      };
  
      // LOG THE FINAL PROJECT DATA BEING SAVED
      console.log('💾 ===== PROJECT DATA BEING SAVED =====');
      console.log('📋 Project Metadata:');
      console.log('   Title:', projectData.title);
      console.log('   Description:', projectData.description);
      console.log('   Type:', projectData.type);
      console.log('   Duration:', projectData.duration, 'days');
      console.log('   Focus Areas:', projectData.focusAreas);
      console.log('   Difficulty:', projectData.difficulty);
      console.log('   Is Public:', projectData.isPublic);
      console.log('');
      
      console.log('📅 DAILY WORKOUTS STRUCTURE:');
      projectData.dailyWorkouts.forEach((day, index) => {
        console.log(`   🗓️  Day ${day.dayIndex + 1}: ${day.name} (${day.date.toDateString()})`);
        console.log(`      Focus Areas: ${day.focusAreas.join(', ') || 'None'}`);
        console.log(`      Completed: ${day.completed}`);
        console.log(`      Activities: ${day.activities.length}`);
        
        day.activities.forEach((activity, actIndex) => {
          console.log(`        ${actIndex + 1}. ${activity.name} (${activity.type})`);
          console.log(`           Estimated Duration: ${activity.estimatedDuration}min`);
          console.log(`           Exercises: ${activity.exercises.length}`);
          
          // Log exercise details
          activity.exercises.forEach((ex, exIndex) => {
            console.log(`             ${exIndex + 1}. ${ex.name}${ex.muscleGroup ? ` (${ex.muscleGroup})` : ''}`);
          });
          
          if (activity.exercises.length === 0) {
            console.log(`             No specific exercises - will be selected during workout`);
          }
        });
        console.log(''); // Empty line between days
      });
      
      console.log('💾 ===== END PROJECT DATA LOG =====');
      console.log(''); // Final empty line
  
      console.log('💾 Creating project with data:', {
        title: projectData.title,
        days: projectData.duration,
        activities: projectData.dailyWorkouts.length
      });
  
      // 🚀 Create project (with optimistic updates)
      const firebaseProjectId = await createProject(projectData);
      
      console.log('✅ Project created successfully with ID:', firebaseProjectId);
  
      // 🎯 INDUSTRY STANDARD: Navigate to project list instead of detail
      (navigation.navigate as any)('Projects', {
        screen: 'ProjectHome', // Your projects list screen
        params: { 
          createdProjectId: firebaseProjectId,
          showSuccess: true 
        }
      });
    } catch (error: any) {
      console.error('❌ Error saving project:', error);
      
      // 🚀 PRODUCTION READY: User-friendly error messages
      let errorMessage = 'Failed to save project. Please try again.';
      let errorTitle = 'Error';
      
      if (error.userMessage) {
        errorMessage = error.userMessage;
      } else if (error.message?.includes('network') || error.message?.includes('offline')) {
        errorTitle = 'Connection Issue';
        errorMessage = 'Please check your internet connection and try again.';
      } else if (error.message?.includes('authentication')) {
        errorTitle = 'Sign In Required';
        errorMessage = 'Please sign in to create projects.';
      }
      
      Alert.alert(errorTitle, errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  // Generic grid renderer
  const renderMultiSelectGrid = (
    items: any[], 
    category: string,
    selectedState: {[key: string]: string[]},
    setSelectedState: React.Dispatch<React.SetStateAction<{[key: string]: string[]}>>
  ) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      const rowItems = items.slice(i, i + 2);
      rows.push(
        <View key={i} style={styles.gridRow}>
          {rowItems.map((item) => {
            const isSelected = isItemSelected(item.name, selectedState);
            const isRestDay = hasRestDay(selectedDate);
            
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.compactButton,
                  { backgroundColor: theme.colors.card },
                  isSelected && { 
                    borderColor: theme.colors.primary, 
                    borderWidth: 2,
                    backgroundColor: `${theme.colors.primary}20`
                  },
                  isRestDay && { opacity: 0.5 }
                ]}
                onPress={() => item.name === 'Rest Day' ? handleRestDaySelect() : handleMultiSelect(item.name, category, selectedState, setSelectedState)}
                disabled={isRestDay && item.name !== 'Rest Day'}
              >
                <ThemeText style={styles.buttonEmoji}>{item.emoji}</ThemeText>
                <ThemeText style={[styles.buttonText, { 
                  color: isSelected ? theme.colors.primary : theme.colors.text.primary 
                }]}>
                  {item.name}
                </ThemeText>
                
                {isSelected && (
                  <View style={[styles.selectionIndicator, { backgroundColor: theme.colors.primary }]}>
                    <ThemeText style={styles.selectionIndicatorText}>✓</ThemeText>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return rows;
  };

  const getCurrentCardioData = () => {
    return cardioData[selectedDate] || { duration: 0, distance: 0 };
  };

  const isRestDay = hasRestDay(selectedDate);

  return (
    <ThemeView style={styles.container}>
      {/* 🚀 NEW: Loading Overlay */}
      {isCreating && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <ThemeText style={[styles.loadingText, { color: theme.colors.text.primary }]}>
              Creating your workout plan...
            </ThemeText>
            {!isOnline && (
              <ThemeText style={[styles.offlineNotice, { color: theme.colors.text.secondary }]}>
                ⚠️ Working offline - will sync when connected
              </ThemeText>
            )}
          </View>
        </View>
      )}

      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ← Back
          </ThemeText>
        </TouchableOpacity>
        <ThemeText variant="h2" style={styles.headerTitle}>
          Create Project Plan
        </ThemeText>
        <View style={styles.headerSpacer} />
      </View>

      {/* 🚀 NEW: Offline Indicator */}
      {!isOnline && !isCreating && (
        <View style={[styles.offlineBanner, { backgroundColor: theme.colors.accent }]}>
          <ThemeText style={styles.offlineText}>
            ⚠️ You are offline - Projects will save when connected
          </ThemeText>
        </View>
      )}

      {/* Workout Activity Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.activityScroll}
        contentContainerStyle={styles.activityContainer}
      >
        {workoutActivities.map((activity, index) => (
          <View key={activity.id} style={styles.activityItem}>
            <TouchableOpacity 
              onPress={() => setSelectedActivity(activity.id)}
              disabled={isCreating}
            >
              <ThemeText style={[
                styles.activityText,
                { color: theme.colors.text.primary },
                selectedActivity === activity.id && { color: theme.colors.primary },
                isCreating && { opacity: 0.5 }
              ]}>
                {activity.name}
              </ThemeText>
            </TouchableOpacity>
            {index < workoutActivities.length - 1 && (
              <ThemeText style={[styles.activitySeparator, { color: theme.colors.text.secondary }]}>|</ThemeText>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Calendar */}
      <View style={styles.calendarWrapper} {...panResponder.panHandlers}>
        <View style={styles.calendarContent}>
          {currentWeekDates.map((day) => (
            <TouchableOpacity
              key={day.fullDate}
              style={[
                styles.calendarDay,
                { backgroundColor: theme.colors.card },
                selectedDate === day.fullDate && [styles.selectedDay, { backgroundColor: theme.colors.primary }],
                day.isToday && { borderColor: theme.colors.primary, borderWidth: 2 },
                hasRestDay(day.fullDate) && { borderColor: theme.colors.accent, borderWidth: 2 },
                isCreating && { opacity: 0.5 }
              ]}
              onPress={() => !isCreating && setSelectedDate(day.fullDate)}
              disabled={isCreating}
            >
              <ThemeText style={[
                styles.dayLetter,
                { color: selectedDate === day.fullDate ? '#FFF' : theme.colors.text.primary }
              ]}>
                {day.day}
              </ThemeText>
              <ThemeText style={[
                styles.dayDate,
                { color: selectedDate === day.fullDate ? '#FFF' : theme.colors.text.secondary }
              ]}>
                {day.date}
              </ThemeText>
              
              {day.isToday && (
                <View style={[styles.todayIndicator, { backgroundColor: theme.colors.primary }]} />
              )}
              
              {(workoutSelections[day.fullDate] || []).length > 0 && !hasRestDay(day.fullDate) && (
                <View style={[
                  styles.workoutDot,
                  { backgroundColor: selectedDate === day.fullDate ? '#FFF' : theme.colors.primary }
                ]} />
              )}
              
              {hasRestDay(day.fullDate) && (
                <ThemeText style={styles.restDayIcon}>😴</ThemeText>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* View Mode Selector */}
      <View style={styles.viewModeContainer}>
        {(['day', 'week', 'month'] as const).map((mode) => (
          <React.Fragment key={mode}>
            <TouchableOpacity 
              onPress={() => setViewMode(mode)}
              disabled={isCreating}
            >
              <ThemeText style={[
                styles.viewModeText,
                { color: theme.colors.text.primary },
                viewMode === mode && { color: theme.colors.primary, fontWeight: 'bold' },
                isCreating && { opacity: 0.5 }
              ]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </ThemeText>
            </TouchableOpacity>
            {mode !== 'month' && (
              <ThemeText style={[styles.viewModeSeparator, { color: theme.colors.text.secondary }]}>|</ThemeText>
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Rest Day Banner */}
      {isRestDay && (
        <View style={[styles.restDayBanner, { backgroundColor: `${theme.colors.accent}20` }]}>
          <ThemeText style={[styles.restDayBannerText, { color: theme.colors.accent }]}>
            🎯 REST DAY - No workouts scheduled for {selectedDate}
          </ThemeText>
          <TouchableOpacity 
            style={[styles.removeRestDayButton, { backgroundColor: theme.colors.accent }]}
            onPress={() => {
              setWorkoutSelections(prev => ({ ...prev, [selectedDate]: [] }));
              setSelectedMuscleGroups(prev => ({ ...prev, [selectedDate]: [] }));
              setSelectedPPL(prev => ({ ...prev, [selectedDate]: [] }));
              setSelectedUpperLower(prev => ({ ...prev, [selectedDate]: [] }));
            }}
            disabled={isCreating}
          >
            <ThemeText style={styles.removeRestDayText}>Remove</ThemeText>
          </TouchableOpacity>
        </View>
      )}

      {/* Content Area */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedActivity === 'gym' ? (
          /* GYM CONTENT */
          <>
            <View style={styles.section}>
              <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
                Muscle Groups
              </ThemeText>
              {renderMultiSelectGrid(splits, 'splits', selectedMuscleGroups, setSelectedMuscleGroups)}
            </View>

            <View style={styles.section}>
              <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
                PPL Split
              </ThemeText>
              {renderMultiSelectGrid(pplWorkouts, 'ppl', selectedPPL, setSelectedPPL)}
            </View>

            <View style={styles.section}>
              <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
                Upper/Lower Split
              </ThemeText>
              {renderMultiSelectGrid(upperLowerWorkouts, 'upperlower', selectedUpperLower, setSelectedUpperLower)}
            </View>
          </>
        ) : (selectedActivity === 'calisthenics' || selectedActivity === 'yoga') ? (
          /* CALISTHENICS/YOGA CONTENT */
          <>
            <View style={styles.searchSection}>
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
                  placeholder={`Search ${selectedActivity} exercises...`}
                  placeholderTextColor={theme.colors.text.secondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  editable={!isCreating}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity 
                    style={styles.clearSearchButton} 
                    onPress={clearSearch}
                    disabled={isCreating}
                  >
                    <ThemeText style={[styles.clearSearchText, { color: theme.colors.text.secondary }]}>✕</ThemeText>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.restDayButton, { backgroundColor: theme.colors.card }]}
              onPress={handleRestDaySelect}
              disabled={isRestDay || isCreating}
            >
              <ThemeText style={styles.restDayEmoji}>😴</ThemeText>
              <ThemeText style={[styles.restDayText, { color: theme.colors.text.primary }]}>
                Rest Day
              </ThemeText>
            </TouchableOpacity>

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
                    editable={!isCreating}
                  />
                  <TouchableOpacity
                    style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleAddCustomExercise}
                    disabled={isCreating}
                  >
                    <ThemeText style={styles.plusButtonText}>+</ThemeText>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.customExerciseButton, { backgroundColor: theme.colors.card }]}
                  onPress={() => setShowCustomInput(true)}
                  disabled={isRestDay || isCreating}
                >
                  <ThemeText style={[styles.customExerciseText, { color: theme.colors.text.primary }]}>
                    Custom Exercise
                  </ThemeText>
                  <View style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}>
                    <ThemeText style={styles.plusButtonText}>+</ThemeText>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.exerciseList}>
              {sortedExercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={[
                    styles.exerciseSelectButton, 
                    { backgroundColor: theme.colors.card },
                    isExerciseSelected(exercise.id) && { 
                      borderColor: theme.colors.primary, 
                      borderWidth: 2 
                    },
                    (isRestDay || isCreating) && { opacity: 0.5 }
                  ]}
                  onPress={() => handleActivityExerciseSelect(exercise)}
                  disabled={isRestDay || isCreating}
                >
                  <View style={styles.exerciseSelectInfo}>
                    <ThemeText style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
                      {exercise.name}
                      {customExercises.some(ce => ce.id === exercise.id) && ' (Custom)'}
                    </ThemeText>
                    <ThemeText style={[styles.exerciseCategory, { color: theme.colors.text.secondary }]}>
                      {exercise.category}
                    </ThemeText>
                  </View>
                  
                  <View style={styles.exerciseActions}>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.id);
                      }}
                      disabled={isCreating}
                    >
                      <ThemeText style={[
                        styles.favoriteIcon,
                        { color: favoriteExercises.has(exercise.id) ? theme.colors.primary : theme.colors.text.secondary }
                      ]}>
                        {favoriteExercises.has(exercise.id) ? '★' : '☆'}
                      </ThemeText>
                    </TouchableOpacity>
                    
                    {isExerciseSelected(exercise.id) && (
                      <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
                        <ThemeText style={styles.selectedIndicatorText}>✓</ThemeText>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          /* CARDIO ACTIVITIES CONTENT */
          <View style={styles.cardioSection}>
            <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
              {selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)} Plan
            </ThemeText>
            
            <View style={styles.inputGroup}>
              <ThemeText style={[styles.inputLabel, { color: theme.colors.text.primary }]}>
                Duration (minutes)
              </ThemeText>
              <TextInput
                style={[styles.cardioInput, { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text.primary,
                  borderColor: theme.colors.border 
                }]}
                value={getCurrentCardioData().duration.toString()}
                onChangeText={(text) => handleCardioDataChange('duration', text)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={theme.colors.text.secondary}
                editable={!isRestDay && !isCreating}
              />
            </View>

            {selectedActivity !== 'jumba' && (
              <View style={styles.inputGroup}>
                <ThemeText style={[styles.inputLabel, { color: theme.colors.text.primary }]}>
                  Distance (km)
                </ThemeText>
                <TextInput
                  style={[styles.cardioInput, { 
                    backgroundColor: theme.colors.card, 
                    color: theme.colors.text.primary,
                    borderColor: theme.colors.border 
                  }]}
                  value={getCurrentCardioData().distance?.toString() || '0'}
                  onChangeText={(text) => handleCardioDataChange('distance', text)}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={theme.colors.text.secondary}
                  editable={!isRestDay && !isCreating}
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.restDayButton, { backgroundColor: theme.colors.card, marginTop: 20 }]}
              onPress={handleRestDaySelect}
              disabled={isRestDay || isCreating}
            >
              <ThemeText style={styles.restDayEmoji}>😴</ThemeText>
              <ThemeText style={[styles.restDayText, { color: theme.colors.text.primary }]}>
                Rest Day
              </ThemeText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
        <View style={styles.selectionActions}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
            onPress={() => navigation.goBack()}
            disabled={isCreating}
          >
            <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
              Cancel
            </ThemeText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              { 
                backgroundColor: isCreating ? theme.colors.border : theme.colors.primary,
                opacity: isCreating ? 0.7 : 1
              }
            ]}
            onPress={handleSaveProject}
            disabled={isCreating}
          >
            {isCreating ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <ThemeText style={styles.saveButtonText}>
                Save Workout Plan
              </ThemeText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ThemeView>
  );
};

export default CreateProjectScreen;