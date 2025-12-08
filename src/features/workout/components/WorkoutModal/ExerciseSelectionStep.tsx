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
  const projectContext = store.projectContext; // ✅ ADDED: Get project context

  
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

    // Simple back button - ENHANCED
    const handleBack = () => {
      if (projectContext) {
        // If came from project, close modal and return to project
        closeWorkoutModal();
      } else if (workoutType === WorkoutType.GYM && selectedGymSplit) {
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
      {/* 🚀 Twitter-style Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        {/* Left: Back Arrow (Twitter style - only arrow, no text) */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ThemeText style={[styles.backArrow, { color: theme.colors.primary, fontSize: 24 }]}>
            ←
          </ThemeText>
        </TouchableOpacity>
        
        {/* Center: Title */}
        <View style={styles.headerTitleContainer}>
          <ThemeText variant="h2" style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
            Select Exercises
          </ThemeText>
        </View>
        
        {/* Right: Empty spacer for balance */}
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
                Start Session ({selectedExercises.length})
              </ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemeView>
  );
};

export default ExerciseSelectionStep;