// src/features/workout/components/WorkoutModal/StructuredActiveSessionStep.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useThemeStore } from '../../../../shared/stores/useThemeStore';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { ThemeText } from '../../../../shared/ui/ThemeText';
import { ThemeView } from '../../../../shared/ui/ThemeView';
import { createStructuredActiveSessionStyles } from './styles/structuredActiveSessionStyles';
import { StructuredExercise, StructuredExerciseSet } from '../../types/workout';

const StructuredActiveSessionStep: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    completeWorkoutSession, 
    setCurrentStep,
    workoutType,
    projectContext,
    selectedExercises,
    setStructuredExercises, // 🚀 ADDED: Store tracking data setter
    structuredExercises // 🚀 ADDED: Get current tracking data from store
  } = useWorkoutStore();
  
  const styles = createStructuredActiveSessionStyles(theme);

  // Timer states
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  
  // 🚀 ENHANCED: Exercise tracking - sync with store
  const [exercises, setExercises] = useState<StructuredExercise[]>(structuredExercises || []);
  const [notes, setNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // Exercise expansion and tracking mode
  const [expandedExercises, setExpandedExercises] = useState<{[key: string]: boolean}>({});
  const [trackingMode, setTrackingMode] = useState<'sets' | 'pr'>('sets');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const setTimersRef = useRef<{[key: string]: NodeJS.Timeout | null}>({});

  // 🚀 CRITICAL: Sync exercises with store for Firebase persistence
  useEffect(() => {
    if (exercises.length > 0) {
      console.log('🔄 Syncing structured exercises to store:', exercises.length, 'exercises');
      setStructuredExercises(exercises);
    }
  }, [exercises, setStructuredExercises]);

  // Initialize exercises - transform Exercise[] to StructuredExercise[]
  useEffect(() => {
    if (selectedExercises.length > 0 && exercises.length === 0) {
      const structuredExercises: StructuredExercise[] = selectedExercises.map((exercise, index) => ({
        id: `exercise-${index}`,
        exerciseId: exercise.id || exercise.name,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        equipment: exercise.equipment,
        sets: [{ 
          setId: `set-${index}-1`,
          setNumber: 1,
          reps: 0, 
          time: 0, 
          isActive: false 
        }],
        duration: 0,
        reps: 0,
        isPRTimerActive: false
      }));

      setExercises(structuredExercises);
      
      // Auto-expand first exercise
      if (structuredExercises.length > 0) {
        setExpandedExercises({ [structuredExercises[0].id]: true });
      }
    }
  }, [selectedExercises, exercises.length]);

  // Timer logic for main session
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      Object.values(setTimersRef.current).forEach(timer => {
        if (timer) clearInterval(timer);
      });
    };
  }, []);

  // Calculate calories (rough estimate)
  const calculateCalories = useCallback(() => {
    const baseCalories = (time / 60) * 6;
    return Math.round(baseCalories);
  }, [time]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    Alert.alert(
      'Complete Workout',
      `Do you want to save this ${workoutType} session?`,
      [
        {
          text: 'Continue',
          style: 'cancel',
        },
        {
          text: 'Save & Finish',
          style: 'default',
          onPress: handleSaveWorkout,
        },
      ]
    );
  };

  const handleSaveWorkout = async () => {
    try {
      setIsSaving(true);

      const durationMinutes = Math.ceil(time / 60);

      console.log('🎯 Saving structured workout with tracking data:', {
        exerciseCount: exercises.length,
        totalSets: exercises.reduce((total, ex) => total + (ex.sets?.length || 0), 0),
        hasProjectContext: !!projectContext
      });

      // 🚀 ENHANCED: Complete with tracking data automatically captured from store
      await completeWorkoutSession({
        duration: durationMinutes,
        endTime: new Date(),
        calories: calculateCalories(),
        notes: notes.trim() || undefined,
        // 🚀 trackingData is automatically captured from store state via structuredExercises
      });

      // Move to completion step happens automatically in store

    } catch (error) {
      console.error('❌ Error saving structured workout:', error);
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

    const handleBack = () => {
    if (projectContext) {
        // If came from project, go back to exercise selection or close
        if (selectedExercises.length === 0) {
          setCurrentStep('exercise-selection');
        } else {
          // Use getState to access closeWorkoutModal
          const { closeWorkoutModal } = useWorkoutStore.getState();
          closeWorkoutModal();
        }
      } else {
        // Go back to exercise selection for structured workouts
        setCurrentStep('exercise-selection');
      }
    };

  const handleReset = () => {
    Alert.alert(
      'Reset Workout',
      'Are you sure you want to reset? This will erase your current progress.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            setIsPaused(true);
            setTime(0);
            setExercises(exercises.map(ex => ({ 
              ...ex, 
              duration: 0,
              reps: 0,
              sets: ex.sets ? ex.sets.map(set => ({ ...set, reps: 0, time: 0, isActive: false })) : undefined
            })));
          },
        },
      ]
    );
  };

  // Set tracking functions
  const handleSetRepsChange = (exerciseIndex: number, setIndex: number, reps: string) => {
    const numericReps = parseInt(reps) || 0;
    const updatedExercises = [...exercises];
    if (!updatedExercises[exerciseIndex].sets) {
      updatedExercises[exerciseIndex].sets = [{ setId: `set-${exerciseIndex}-1`, setNumber: 1, reps: 0, time: 0, isActive: false }];
    }
    updatedExercises[exerciseIndex].sets![setIndex] = { 
      ...updatedExercises[exerciseIndex].sets![setIndex], 
      reps: numericReps 
    };
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const toggleSetTimer = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    const exercise = updatedExercises[exerciseIndex];
    const set = exercise.sets![setIndex];
    
    set.isActive = !set.isActive;
    
    if (set.isActive) {
      // Start timer for this set
      const timerKey = `${exerciseIndex}-${setIndex}`;
      setTimersRef.current[timerKey] = setInterval(() => {
        setExercises(prev => {
          const newExercises = [...prev];
          newExercises[exerciseIndex].sets![setIndex].time += 1;
          return newExercises;
        });
      }, 1000);
    } else {
      // Stop timer for this set
      const timerKey = `${exerciseIndex}-${setIndex}`;
      if (setTimersRef.current[timerKey]) {
        clearInterval(setTimersRef.current[timerKey]!);
        setTimersRef.current[timerKey] = null;
      }
    }
    
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const resetSetTimer = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    const set = updatedExercises[exerciseIndex].sets![setIndex];
    
    // Stop timer if active
    const timerKey = `${exerciseIndex}-${setIndex}`;
    if (setTimersRef.current[timerKey]) {
      clearInterval(setTimersRef.current[timerKey]!);
      setTimersRef.current[timerKey] = null;
    }
    
    // Reset time and state
    set.time = 0;
    set.isActive = false;
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    if (!updatedExercises[exerciseIndex].sets) {
      updatedExercises[exerciseIndex].sets = [];
    }
    const newSetNumber = updatedExercises[exerciseIndex].sets!.length + 1;
    updatedExercises[exerciseIndex].sets!.push({ 
      setId: `set-${exerciseIndex}-${newSetNumber}`,
      setNumber: newSetNumber,
      reps: 0, 
      time: 0, 
      isActive: false 
    });
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const removeSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    if (updatedExercises[exerciseIndex].sets && updatedExercises[exerciseIndex].sets!.length > 1) {
      // Stop timer if active
      const lastSetIndex = updatedExercises[exerciseIndex].sets!.length - 1;
      const timerKey = `${exerciseIndex}-${lastSetIndex}`;
      if (setTimersRef.current[timerKey]) {
        clearInterval(setTimersRef.current[timerKey]!);
        setTimersRef.current[timerKey] = null;
      }
      
      updatedExercises[exerciseIndex].sets!.pop();
      setExercises(updatedExercises);
      // 🚀 Automatically syncs to store via useEffect
    }
  };

  // PR tracking functions
  const handlePRRepsChange = (exerciseIndex: number, reps: string) => {
    const numericReps = parseInt(reps) || 0;
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].reps = numericReps;
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const togglePRTimer = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const exercise = updatedExercises[exerciseIndex];
    
    // Toggle PR timer
    exercise.isPRTimerActive = !exercise.isPRTimerActive;
    
    if (exercise.isPRTimerActive) {
      // Start PR timer
      const timerKey = `pr-${exerciseIndex}`;
      setTimersRef.current[timerKey] = setInterval(() => {
        setExercises(prev => {
          const newExercises = [...prev];
          newExercises[exerciseIndex].duration = (newExercises[exerciseIndex].duration || 0) + 1;
          return newExercises;
        });
      }, 1000);
    } else {
      // Stop PR timer
      const timerKey = `pr-${exerciseIndex}`;
      if (setTimersRef.current[timerKey]) {
        clearInterval(setTimersRef.current[timerKey]!);
        setTimersRef.current[timerKey] = null;
      }
    }
    
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const resetPRTimer = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const exercise = updatedExercises[exerciseIndex];
    
    // Stop timer if active
    const timerKey = `pr-${exerciseIndex}`;
    if (setTimersRef.current[timerKey]) {
      clearInterval(setTimersRef.current[timerKey]!);
      setTimersRef.current[timerKey] = null;
    }
    
    // Reset time and state
    exercise.duration = 0;
    exercise.isPRTimerActive = false;
    setExercises(updatedExercises);
    // 🚀 Automatically syncs to store via useEffect
  };

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const isExerciseExpanded = (exerciseId: string, index: number) => {
    if (index === 0 && expandedExercises[exerciseId] === undefined) {
      return true;
    }
    return !!expandedExercises[exerciseId];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getWorkoutTitle = () => {
    if (!workoutType) {
        return 'Workout';
    }
    return workoutType.charAt(0).toUpperCase() + workoutType.slice(1);
  };

  return (
    <ThemeView style={styles.container}>
      {/* Header - Updated with only arrow */}
      {/* <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
          onPress={handleBack} 
          style={styles.backButton}
        >
          <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ←
          </ThemeText>
        </TouchableOpacity>
        <ThemeText variant="h2" style={styles.headerTitle}>
          Session Tracker
        </ThemeText>
        <View style={styles.headerSpacer} />
      </View> */}
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
        Session Tracker
        </ThemeText>
    </View>
    
    {/* Right: Empty spacer for balance */}
    <View style={styles.headerSpacer} />
    </View>
      
      {/* Tracking Mode Toggle */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.toggleScroll}
        contentContainerStyle={styles.toggleContainer}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: theme.colors.card },
            trackingMode === 'sets' && { 
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary 
            }
          ]}
          onPress={() => setTrackingMode('sets')}
        >
          <ThemeText style={[
            styles.toggleText,
            { color: theme.colors.text.primary },
            trackingMode === 'sets' && { color: '#FFF' }
          ]}>
            Set Tracking
          </ThemeText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: theme.colors.card },
            trackingMode === 'pr' && { 
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary 
            }
          ]}
          onPress={() => setTrackingMode('pr')}
        >
          <ThemeText style={[
            styles.toggleText,
            { color: theme.colors.text.primary },
            trackingMode === 'pr' && { color: '#FFF' }
          ]}>
            PR Tracking
          </ThemeText>
        </TouchableOpacity>
      </ScrollView>

      {/* Timer Section */}
      <View style={styles.timerSection}>
        <View style={styles.workoutInfo}>
          <ThemeText style={[styles.workoutTitle, { color: theme.colors.text.primary }]}>
            {getWorkoutTitle()}
          </ThemeText>
          <TouchableOpacity 
            style={[styles.startButton, { backgroundColor: theme.colors.primary }]}
            onPress={isActive ? handlePause : handleStart}
          >
            <ThemeText style={styles.startButtonText}>
              {isActive ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
            </ThemeText>
          </TouchableOpacity>
        </View>
        <View style={styles.timerContainer}>
          <ThemeText style={[styles.timerLabel, { color: theme.colors.text.secondary }]}>
            Session Time
          </ThemeText>
          <ThemeText style={[styles.timer, { color: theme.colors.primary }]}>
            {formatTime(time)}
          </ThemeText>
        </View>
      </View>

      {/* Exercise Tracking */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {exercises.length > 0 ? (
          exercises.map((exercise, exerciseIndex) => {
            const isExpanded = isExerciseExpanded(exercise.id, exerciseIndex);

            return (
              <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.colors.card }]}>
                {/* Exercise Header */}
                <TouchableOpacity 
                  style={styles.exerciseHeader}
                  onPress={() => toggleExercise(exercise.id)}
                >
                  <View style={styles.exerciseInfo}>
                    <ThemeText style={[styles.exerciseName, { color: theme.colors.text.primary }]}>
                      {exercise.name}
                    </ThemeText>
                    <ThemeText style={[styles.exerciseMuscleGroup, { color: theme.colors.text.secondary }]}>
                      {trackingMode === 'sets' 
                        ? `${exercise.sets?.length || 0} sets` 
                        : 'PR Tracking'
                      }
                    </ThemeText>
                  </View>
                  <View style={styles.arrowContainer}>
                    <ThemeText style={[styles.arrow, { color: theme.colors.primary }]}>
                      {isExpanded ? '▲' : '▼'}
                    </ThemeText>
                  </View>
                </TouchableOpacity>

                {/* Expandable Content */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    {trackingMode === 'sets' ? (
                      /* SET TRACKING MODE */
                      <View style={styles.trackingSection}>
                        <View style={styles.setsHeader}>
                          <ThemeText style={[styles.trackingLabel, { color: theme.colors.text.secondary }]}>
                            Sets
                          </ThemeText>
                          <View style={styles.setControls}>
                            <TouchableOpacity 
                              style={[styles.setControlButton, { backgroundColor: theme.colors.border }]}
                              onPress={() => removeSet(exerciseIndex)}
                            >
                              <ThemeText style={[styles.setControlText, { color: theme.colors.text.primary }]}>-</ThemeText>
                            </TouchableOpacity>
                            <ThemeText style={[styles.setCount, { color: theme.colors.text.primary }]}>
                              {exercise.sets?.length || 0}
                            </ThemeText>
                            <TouchableOpacity 
                              style={[styles.setControlButton, { backgroundColor: theme.colors.primary }]}
                              onPress={() => addSet(exerciseIndex)}
                            >
                              <ThemeText style={styles.setControlText}>+</ThemeText>
                            </TouchableOpacity>
                          </View>
                        </View>
                        
                        {/* Headers Row */}
                        <View style={styles.inputLabels}>
                          <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}></ThemeText>
                          <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>Start</ThemeText>
                          <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>Time</ThemeText>
                          <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>Reps</ThemeText>
                        </View>
                        
                        {/* Sets List */}
                        {exercise.sets?.map((set, setIndex) => (
                          <View key={set.setId} style={styles.setRow}>
                            <View style={styles.setRowContent}>
                              <ThemeText style={[styles.setNumber, { color: theme.colors.text.primary }]}>
                                Set {set.setNumber}
                              </ThemeText>
                              
                              <View style={styles.setInputs}>
                                <View style={styles.inputValues}>
                                  {/* Play/Pause and Reset Buttons */}
                                  <View style={styles.iconButtons}>
                                    <TouchableOpacity
                                      style={styles.iconButton}
                                      onPress={() => toggleSetTimer(exerciseIndex, setIndex)}
                                    >
                                      <ThemeText style={[styles.iconText, { color: theme.colors.primary }]}>
                                        {set.isActive ? '❚❚' : '▶'}
                                      </ThemeText>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity
                                      style={styles.iconButton}
                                      onPress={() => resetSetTimer(exerciseIndex, setIndex)}
                                    >
                                      <ThemeText style={[styles.iconText, { color: theme.colors.accent }]}>↺</ThemeText>
                                    </TouchableOpacity>
                                  </View>

                                  {/* Time Display */}
                                  <ThemeText style={[styles.timeDisplay, { color: theme.colors.text.primary }]}>
                                    {formatTime(set.time)}
                                  </ThemeText>

                                  {/* Reps Input */}
                                  <TextInput
                                    style={[styles.input, { 
                                      backgroundColor: theme.colors.background, 
                                      color: theme.colors.text.primary,
                                      borderColor: theme.colors.border 
                                    }]}
                                    value={set.reps?.toString() || '0'}
                                    onChangeText={(text) => handleSetRepsChange(exerciseIndex, setIndex, text)}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    placeholderTextColor={theme.colors.text.secondary}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    ) : (
                      /* PR TRACKING MODE */
                      <View style={styles.trackingSection}>
                        <View style={styles.prSection}>
                          <ThemeText style={[styles.prTitle, { color: theme.colors.text.primary }]}>
                            Personal Record
                          </ThemeText>
                          
                          {/* Headers Row */}
                          <View style={styles.inputLabels}>
                            <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}></ThemeText>
                            <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>Start</ThemeText>
                            <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>Time Spent</ThemeText>
                            <ThemeText style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>Reps Completed</ThemeText>
                          </View>
                          
                          {/* PR Tracking Row */}
                          <View style={styles.setRow}>
                            <View style={styles.setRowContent}>
                              <ThemeText style={[styles.setNumber, { color: theme.colors.text.primary }]}>
                                PR
                              </ThemeText>
                              
                              <View style={styles.setInputs}>
                                <View style={styles.inputValues}>
                                  {/* Play/Pause and Reset Buttons */}
                                  <View style={styles.iconButtons}>
                                    <TouchableOpacity
                                      style={styles.iconButton}
                                      onPress={() => togglePRTimer(exerciseIndex)}
                                    >
                                      <ThemeText style={[styles.iconText, { color: theme.colors.primary }]}>
                                        {exercise.isPRTimerActive ? '❚❚' : '▶'}
                                      </ThemeText>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity
                                      style={styles.iconButton}
                                      onPress={() => resetPRTimer(exerciseIndex)}
                                    >
                                      <ThemeText style={[styles.iconText, { color: theme.colors.accent }]}>↺</ThemeText>
                                    </TouchableOpacity>
                                  </View>

                                  {/* Time Display */}
                                  <ThemeText style={[styles.timeDisplay, { color: theme.colors.text.primary }]}>
                                    {formatTime(exercise.duration || 0)}
                                  </ThemeText>

                                  {/* Reps Input */}
                                  <TextInput
                                    style={[styles.input, { 
                                      backgroundColor: theme.colors.background, 
                                      color: theme.colors.text.primary,
                                      borderColor: theme.colors.border 
                                    }]}
                                    value={exercise.reps?.toString() || '0'}
                                    onChangeText={(text) => handlePRRepsChange(exerciseIndex, text)}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    placeholderTextColor={theme.colors.text.secondary}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.card }]}>
            <ThemeText style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
              No exercises selected.
            </ThemeText>
          </View>
        )}

        {/* Notes Section */}
        <View style={[styles.inputSection, { backgroundColor: theme.colors.card }]}>
          <ThemeText style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Session Notes
          </ThemeText>
          
          <TextInput
            style={[
              styles.notesPlaceholder, 
              { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border
              }
            ]}
            placeholder="Add any notes about your session..."
            placeholderTextColor={theme.colors.text.secondary}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Fixed Workout Actions */}
      <View style={[styles.workoutActions, { backgroundColor: theme.colors.background }]}>
        <View style={styles.completeActions}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
            onPress={handleBack}
          >
            <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
              Cancel
            </ThemeText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.completeButton, { backgroundColor: theme.colors.accent }]}
            onPress={handleStop}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <ThemeText style={styles.completeButtonText}>
                Complete Workout
              </ThemeText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ThemeView>
  );
};

export default StructuredActiveSessionStep;