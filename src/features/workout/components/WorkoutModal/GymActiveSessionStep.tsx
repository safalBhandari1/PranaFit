import React, { useState, useEffect, useRef } from 'react';
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
import { createGymActiveSessionStyles } from './styles/gymActiveSessionStyles';
import { WorkoutExercise, WorkoutSet, PersonalRecords } from '../../types/workout';

const GymActiveSessionStep: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    completeWorkoutSession, 
    setCurrentStep,
    selectedExercises,
    selectedGymSplit
  } = useWorkoutStore();
  
  const styles = createGymActiveSessionStyles(theme);

  // Timer states
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  // Exercise tracking
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [expandedExercises, setExpandedExercises] = useState<{[key: string]: boolean}>({});
  const [trackingMode, setTrackingMode] = useState<'sets' | 'pr'>('sets');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [isSaving, setIsSaving] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize exercises from selectedExercises
  useEffect(() => {
    if (selectedExercises.length > 0 && exercises.length === 0) {
      const workoutExercises: WorkoutExercise[] = selectedExercises.map((exercise, index) => ({
        id: `exercise-${index}`,
        exerciseId: exercise.id || exercise.name,
        name: exercise.name,
        muscleGroup: selectedGymSplit?.targetMuscles && selectedGymSplit.targetMuscles.length > 0 
          ? selectedGymSplit.targetMuscles[0] 
          : exercise.muscleGroup || 'General',
        equipment: exercise.equipment || 'Bodyweight',
        sets: [
          {
            setId: `set-${index}-1`,
            exerciseId: exercise.id || exercise.name,
            setNumber: 1,
            reps: 0,
            weight: 0,
            completed: false,
            restTime: 60,
          },
        ],
        personalRecords: {
          maxReps: 0,
          maxRepsWeight: 0,
          maxWeight: 0,
          maxWeightReps: 0
        },
        volume: 0,
        notes: '',
      }));

      setExercises(workoutExercises);
      
      // Auto-expand first exercise
      if (workoutExercises.length > 0) {
        setExpandedExercises({ [workoutExercises[0].id]: true });
      }
    }
  }, [selectedExercises, selectedGymSplit]);

  // Timer logic
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
      'Do you want to save this workout session?',
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
      const totalVolume = exercises.reduce((total, exercise) => total + exercise.volume, 0);
      const isPR = exercises.some(exercise => 
        exercise.sets.some(set => set.completed && (set.reps > 8 || set.weight > 50))
      );

      // Complete the workout session
      completeWorkoutSession({
        duration: durationMinutes,
        endTime: new Date(),
      });

      // Move to completion step
      setCurrentStep('completion');

    } catch (error) {
      console.error('❌ Error saving workout:', error);
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    } finally {
      setIsSaving(false);
    }
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

  const handleSetRepsChange = (exerciseIndex: number, setIndex: number, reps: string) => {
    const numericReps = parseInt(reps) || 0;
    const updatedExercises = [...exercises];
    const updatedSets = [...updatedExercises[exerciseIndex].sets];
    updatedSets[setIndex] = { ...updatedSets[setIndex], reps: numericReps };
    updatedExercises[exerciseIndex].sets = updatedSets;
    
    // Update exercise volume
    updatedExercises[exerciseIndex].volume = updatedSets.reduce((total, set) => {
      if (set.completed) {
        return total + (set.reps * set.weight);
      }
      return total;
    }, 0);
    
    setExercises(updatedExercises);
  };

  const handleSetWeightChange = (exerciseIndex: number, setIndex: number, weight: string) => {
    const numericWeight = parseFloat(weight) || 0;
    const updatedExercises = [...exercises];
    const updatedSets = [...updatedExercises[exerciseIndex].sets];
    updatedSets[setIndex] = { ...updatedSets[setIndex], weight: numericWeight };
    updatedExercises[exerciseIndex].sets = updatedSets;
    
    // Update exercise volume
    updatedExercises[exerciseIndex].volume = updatedSets.reduce((total, set) => {
      if (set.completed) {
        return total + (set.reps * set.weight);
      }
      return total;
    }, 0);
    
    setExercises(updatedExercises);
  };

  const handleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    const updatedSets = [...updatedExercises[exerciseIndex].sets];
    updatedSets[setIndex] = { 
      ...updatedSets[setIndex], 
      completed: !updatedSets[setIndex].completed 
    };
    updatedExercises[exerciseIndex].sets = updatedSets;
    
    // Update exercise volume
    updatedExercises[exerciseIndex].volume = updatedSets.reduce((total, set) => {
      if (set.completed) {
        return total + (set.reps * set.weight);
      }
      return total;
    }, 0);
    
    setExercises(updatedExercises);
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const currentSets = updatedExercises[exerciseIndex].sets;
    const newSetNumber = currentSets.length + 1;
    updatedExercises[exerciseIndex].sets = [
      ...currentSets, 
      { 
        setId: `set-${exerciseIndex}-${newSetNumber}`,
        exerciseId: updatedExercises[exerciseIndex].exerciseId,
        setNumber: newSetNumber, 
        reps: 0, 
        weight: 0, 
        completed: false, 
        restTime: 60 
      }
    ];
    setExercises(updatedExercises);
  };

  const removeSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const currentSets = updatedExercises[exerciseIndex].sets;
    if (currentSets.length > 1) {
      updatedExercises[exerciseIndex].sets = currentSets.slice(0, -1);
      
      // Renumber sets
      updatedExercises[exerciseIndex].sets.forEach((set, index) => {
        set.setNumber = index + 1;
      });
      
      // Recalculate volume
      updatedExercises[exerciseIndex].volume = updatedExercises[exerciseIndex].sets.reduce((total, set) => {
        if (set.completed) {
          return total + (set.reps * set.weight);
        }
        return total;
      }, 0);
      
      setExercises(updatedExercises);
    }
  };

  const handlePRRepsChange = (exerciseIndex: number, reps: string) => {
    const numericReps = parseInt(reps) || 0;
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].personalRecords = {
      ...updatedExercises[exerciseIndex].personalRecords,
      maxReps: numericReps
    };
    setExercises(updatedExercises);
  };

  const handlePRWeightChange = (exerciseIndex: number, weight: string) => {
    const numericWeight = parseFloat(weight) || 0;
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].personalRecords = {
      ...updatedExercises[exerciseIndex].personalRecords,
      maxRepsWeight: numericWeight
    };
    setExercises(updatedExercises);
  };

  const handleMaxWeightChange = (exerciseIndex: number, weight: string) => {
    const numericWeight = parseFloat(weight) || 0;
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].personalRecords = {
      ...updatedExercises[exerciseIndex].personalRecords,
      maxWeight: numericWeight
    };
    setExercises(updatedExercises);
  };

  const handleMaxWeightRepsChange = (exerciseIndex: number, reps: string) => {
    const numericReps = parseInt(reps) || 0;
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].personalRecords = {
      ...updatedExercises[exerciseIndex].personalRecords,
      maxWeightReps: numericReps
    };
    setExercises(updatedExercises);
  };

  const getWorkoutTitle = () => {
    if (selectedGymSplit) {
      return `${selectedGymSplit.name} Session`;
    }
    return 'Gym Workout Session';
  };

  const completedExercises = exercises.filter(exercise => 
    exercise.sets.some(set => set.completed)
  ).length;

  const totalVolume = exercises.reduce((total, exercise) => total + exercise.volume, 0);

  return (
    <ThemeView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
          onPress={() => setCurrentStep('exercise-selection')} 
          style={styles.backButton}
        >
          <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ← Back
          </ThemeText>
        </TouchableOpacity>
        <ThemeText variant="h2" style={styles.headerTitle}>
          {getWorkoutTitle()}
        </ThemeText>
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Tracking Mode & Weight Unit Toggles */}
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

        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: theme.colors.card },
            weightUnit === 'kg' && { 
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary 
            }
          ]}
          onPress={() => setWeightUnit('kg')}
        >
          <ThemeText style={[
            styles.toggleText,
            { color: theme.colors.text.primary },
            weightUnit === 'kg' && { color: '#FFF' }
          ]}>
            Kg
          </ThemeText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: theme.colors.card },
            weightUnit === 'lbs' && { 
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary 
            }
          ]}
          onPress={() => setWeightUnit('lbs')}
        >
          <ThemeText style={[
            styles.toggleText,
            { color: theme.colors.text.primary },
            weightUnit === 'lbs' && { color: '#FFF' }
          ]}>
            Lbs
          </ThemeText>
        </TouchableOpacity>
      </ScrollView>

      {/* Workout Header Card */}
      <View style={[styles.workoutHeader, { backgroundColor: theme.colors.card }]}>
        <View style={styles.workoutInfo}>
          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
            Current: {getWorkoutTitle().replace(' Session', '')}
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
          <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
            Workout Time
          </ThemeText>
          <ThemeText variant="h2" style={{ color: theme.colors.primary }}>
            {formatTime(time)}
          </ThemeText>
        </View>
      </View>

      {/* Progress Stats */}
      <View style={[styles.progressStats, { backgroundColor: theme.colors.card }]}>
        <View style={styles.statItem}>
          <ThemeText variant="h3" style={{ color: theme.colors.primary }}>{completedExercises}</ThemeText>
          <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Exercises</ThemeText>
        </View>
        <View style={styles.statItem}>
          <ThemeText variant="h3" style={{ color: theme.colors.primary }}>{totalVolume}</ThemeText>
          <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Volume</ThemeText>
        </View>
        <View style={styles.statItem}>
          <ThemeText variant="h3" style={{ color: theme.colors.primary }}>
            {exercises.reduce((total, ex) => total + ex.sets.length, 0)}
          </ThemeText>
          <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Sets</ThemeText>
        </View>
      </View>

      {/* Exercise Tracking */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {exercises.length > 0 ? (
          exercises.map((exercise, exerciseIndex) => {
            const isExpanded = isExerciseExpanded(exercise.id, exerciseIndex);

            return (
              <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.colors.card }]}>
                <TouchableOpacity 
                  style={styles.exerciseHeader}
                  onPress={() => toggleExercise(exercise.id)}
                >
                  <View style={styles.exerciseInfo}>
                    <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
                      {exercise.name}
                    </ThemeText>
                    <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
                      {exercise.muscleGroup} • {exercise.equipment}
                    </ThemeText>
                    {exercise.volume > 0 && (
                      <ThemeText variant="body" style={{ color: theme.colors.primary }}>
                        Volume: {exercise.volume} {weightUnit}
                      </ThemeText>
                    )}
                  </View>
                  <View style={styles.arrowContainer}>
                    <ThemeText style={[styles.arrow, { color: theme.colors.primary }]}>
                      {isExpanded ? '▲' : '▼'}
                    </ThemeText>
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.expandedContent}>
                    {trackingMode === 'sets' ? (
                      <View style={styles.trackingSection}>
                        <View style={styles.setsHeader}>
                          <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
                            Sets
                          </ThemeText>
                          <View style={styles.setControls}>
                            <TouchableOpacity 
                              style={[styles.setControlButton, { backgroundColor: theme.colors.border }]}
                              onPress={() => removeSet(exerciseIndex)}
                            >
                              <ThemeText style={[styles.setControlText, { color: theme.colors.text.primary }]}>-</ThemeText>
                            </TouchableOpacity>
                            <ThemeText variant="body" style={{ color: theme.colors.text.primary }}>
                              {exercise.sets.length}
                            </ThemeText>
                            <TouchableOpacity 
                              style={[styles.setControlButton, { backgroundColor: theme.colors.primary }]}
                              onPress={() => addSet(exerciseIndex)}
                            >
                              <ThemeText style={styles.setControlText}>+</ThemeText>
                            </TouchableOpacity>
                          </View>
                        </View>
                        
                        {exercise.sets.map((set, setIndex) => (
                          <View key={set.setId} style={[
                            styles.setRow,
                            set.completed && { backgroundColor: theme.colors.primary + '20' }
                          ]}>
                            <View style={styles.setRowContent}>
                              <ThemeText variant="body" style={{ color: theme.colors.text.primary }}>
                                Set {set.setNumber}
                              </ThemeText>
                              <View style={styles.setInputs}>
                                {setIndex === 0 && (
                                  <View style={styles.inputLabels}>
                                    <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Reps</ThemeText>
                                    <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Weight ({weightUnit})</ThemeText>
                                    <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Done</ThemeText>
                                  </View>
                                )}
                                <View style={styles.inputValues}>
                                  <TextInput
                                    style={[styles.input, { 
                                      backgroundColor: theme.colors.background, 
                                      color: theme.colors.text.primary,
                                      borderColor: theme.colors.border 
                                    }]}
                                    value={set.reps.toString()}
                                    onChangeText={(text) => handleSetRepsChange(exerciseIndex, setIndex, text)}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    placeholderTextColor={theme.colors.text.secondary}
                                  />
                                  <TextInput
                                    style={[styles.input, { 
                                      backgroundColor: theme.colors.background, 
                                      color: theme.colors.text.primary,
                                      borderColor: theme.colors.border 
                                    }]}
                                    value={set.weight.toString()}
                                    onChangeText={(text) => handleSetWeightChange(exerciseIndex, setIndex, text)}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    placeholderTextColor={theme.colors.text.secondary}
                                  />
                                  <TouchableOpacity
                                    style={[
                                      styles.completeButton,
                                      { backgroundColor: set.completed ? theme.colors.primary : theme.colors.border }
                                    ]}
                                    onPress={() => handleSetCompleted(exerciseIndex, setIndex)}
                                  >
                                    <ThemeText style={[
                                      styles.completeButtonText,
                                      { color: set.completed ? '#FFF' : theme.colors.text.primary }
                                    ]}>
                                      {set.completed ? '✓' : '○'}
                                    </ThemeText>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View style={styles.trackingSection}>
                        <View style={styles.prSection}>
                          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
                            Max Reps
                          </ThemeText>
                          <View style={styles.prInputRow}>
                            <View style={styles.prInputContainer}>
                              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>M. Reps</ThemeText>
                              <TextInput
                                style={[styles.prInput, { 
                                  backgroundColor: theme.colors.background, 
                                  color: theme.colors.text.primary,
                                  borderColor: theme.colors.border 
                                }]}
                                value={exercise.personalRecords?.maxReps?.toString() || '0'}
                                onChangeText={(text) => handlePRRepsChange(exerciseIndex, text)}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor={theme.colors.text.secondary}
                              />
                            </View>
                            <View style={styles.prInputContainer}>
                              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Weight ({weightUnit})</ThemeText>
                              <TextInput
                                style={[styles.prInput, { 
                                  backgroundColor: theme.colors.background, 
                                  color: theme.colors.text.primary,
                                  borderColor: theme.colors.border 
                                }]}
                                value={exercise.personalRecords?.maxRepsWeight?.toString() || '0'}
                                onChangeText={(text) => handlePRWeightChange(exerciseIndex, text)}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor={theme.colors.text.secondary}
                              />
                            </View>
                          </View>
                        </View>

                        <View style={styles.prSection}>
                          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
                            Max Weight
                          </ThemeText>
                          <View style={styles.prInputRow}>
                            <View style={styles.prInputContainer}>
                              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>Reps</ThemeText>
                              <TextInput
                                style={[styles.prInput, { 
                                  backgroundColor: theme.colors.background, 
                                  color: theme.colors.text.primary,
                                  borderColor: theme.colors.border 
                                }]}
                                value={exercise.personalRecords?.maxWeightReps?.toString() || '0'}
                                onChangeText={(text) => handleMaxWeightRepsChange(exerciseIndex, text)}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor={theme.colors.text.secondary}
                              />
                            </View>
                            <View style={styles.prInputContainer}>
                              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>M. Weight ({weightUnit})</ThemeText>
                              <TextInput
                                style={[styles.prInput, { 
                                  backgroundColor: theme.colors.background, 
                                  color: theme.colors.text.primary,
                                  borderColor: theme.colors.border 
                                }]}
                                value={exercise.personalRecords?.maxWeight?.toString() || '0'}
                                onChangeText={(text) => handleMaxWeightChange(exerciseIndex, text)}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor={theme.colors.text.secondary}
                              />
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
            <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
              No exercises selected.
            </ThemeText>
          </View>
        )}
      </ScrollView>

      {/* Fixed Workout Actions */}
      <View style={[styles.workoutActions, { backgroundColor: theme.colors.background }]}>
        <View style={styles.completeActions}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
            onPress={() => setCurrentStep('exercise-selection')}
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

export default GymActiveSessionStep;