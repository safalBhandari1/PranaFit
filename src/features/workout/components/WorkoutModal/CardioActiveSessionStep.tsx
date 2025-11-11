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
import { createCardioActiveSessionStyles } from './styles/cardioActiveSessionStyles';
import { WorkoutType } from '../../types/workout';


const CardioActiveSessionStep: React.FC = () => {
  const { theme } = useThemeStore();
  const { 
    completeWorkoutSession, 
    setCurrentStep,
    workoutType,
    selectedExercises,
    closeWorkoutModal,
  } = useWorkoutStore();
  
  const styles = createCardioActiveSessionStyles(theme);

  // Timer states
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0); // in seconds
  
  // Activity data
  const [distance, setDistance] = useState<string>('');
  const [elevation, setElevation] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5); // 1-10 scale
  const [isSaving, setIsSaving] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get workout emoji and name based on type
  const getWorkoutInfo = () => {
    switch (workoutType) {
      case WorkoutType.RUNNING:
        return { emoji: '🏃', name: 'Running' };
      case WorkoutType.CYCLING:
        return { emoji: '🚴', name: 'Cycling' };
      case WorkoutType.WALKING:
        return { emoji: '🚶', name: 'Walking' };
      case WorkoutType.ELLIPTICAL:
        return { emoji: '🏃‍♂️', name: 'Elliptical' };
      case WorkoutType.JUMBA:
        return { emoji: '💃', name: 'Jumba' };
      default:
        return { emoji: '❤️', name: 'Cardio' };
    }
  };

  const workoutInfo = getWorkoutInfo();

  // Calculate pace (min/km)
  const calculatePace = () => {
    if (!distance || time < 60) return 0;
    const distanceNum = parseFloat(distance);
    const timeInMinutes = time / 60;
    return timeInMinutes / distanceNum;
  };

  // Calculate calories (rough estimate)
  const calculateCalories = () => {
    const baseCalories = (time / 60) * 8; // ~8 cal/min for moderate cardio
    const intensityMultiplier = intensity / 5; // Scale based on intensity
    return Math.round(baseCalories * intensityMultiplier);
  };

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
      `Do you want to save this ${workoutInfo.name.toLowerCase()} session?`,
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

  const handleBack = () => {
    // Cardio workouts skip exercise selection, so always go back to type selection screen workout home
    closeWorkoutModal();
};

  const handleSaveWorkout = async () => {
    try {
      setIsSaving(true);

      const durationMinutes = Math.ceil(time / 60);
      const distanceNum = distance ? parseFloat(distance) : 0;
      const elevationNum = elevation ? parseFloat(elevation) : 0;
      const paceValue = distanceNum > 0 ? calculatePace() : 0;

      // Complete the workout session with cardio data
      completeWorkoutSession({
        duration: durationMinutes,
        endTime: new Date(),
        distance: distanceNum,
        elevation: elevationNum,
        pace: paceValue,
        caloriesBurned: calculateCalories(),
        intensity: intensity,
        notes: notes.trim() || undefined,
      });

      // Move to completion step
      setCurrentStep('completion');

    } catch (error) {
      console.error('❌ Error saving cardio workout:', error);
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    } finally {
      setIsSaving(false);
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
            setDistance('');
            setElevation('');
            setIntensity(5);
          },
        },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPace = (pace: number) => {
    if (pace === 0) return '--:--';
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
  };

  return (
    <ThemeView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
        onPress={handleBack} 
        style={styles.backButton}
        >
        <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ← Back
        </ThemeText>
        </TouchableOpacity>
        <ThemeText variant="h2" style={styles.headerTitle}>
          {workoutInfo.name}
        </ThemeText>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Timer Section */}
        <View style={styles.timerSection}>
          <ThemeText style={[styles.timerEmoji, { color: theme.colors.primary }]}>
            {workoutInfo.emoji}
          </ThemeText>
          <ThemeText variant="h1" style={[styles.timerText, { color: theme.colors.text.primary }]}>
            {formatTime(time)}
          </ThemeText>
          <ThemeText variant="body" style={[styles.timerLabel, { color: theme.colors.text.secondary }]}>
            {isActive ? (isPaused ? 'PAUSED' : 'IN PROGRESS') : 'READY'}
          </ThemeText>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlSection}>
          {!isActive ? (
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleStart}
            >
              <ThemeText style={styles.startButtonText}>Start Workout</ThemeText>
            </TouchableOpacity>
          ) : (
            <View style={styles.activeControls}>
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.colors.border }]}
                onPress={handlePause}
              >
                <ThemeText style={[styles.controlButtonText, { color: theme.colors.text.primary }]}>
                  {isPaused ? 'Resume' : 'Pause'}
                </ThemeText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.colors.accent }]}
                onPress={handleStop}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <ThemeText style={[styles.controlButtonText, { color: '#FFF' }]}>
                    Finish
                  </ThemeText>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.colors.border }]}
                onPress={handleReset}
              >
                <ThemeText style={[styles.controlButtonText, { color: theme.colors.text.primary }]}>
                  Reset
                </ThemeText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
            Workout Stats
          </ThemeText>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <ThemeText variant="h3" style={{ color: theme.colors.primary }}>
                {Math.ceil(time / 60)}
              </ThemeText>
              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
                Minutes
              </ThemeText>
            </View>
            
            <View style={styles.statItem}>
              <ThemeText variant="h3" style={{ color: theme.colors.primary }}>
                {calculateCalories()}
              </ThemeText>
              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
                Calories
              </ThemeText>
            </View>
            
            <View style={styles.statItem}>
              <ThemeText variant="h3" style={{ color: theme.colors.primary }}>
                {formatPace(calculatePace())}
              </ThemeText>
              <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
                Pace
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Distance Input */}
        <View style={styles.inputSection}>
          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
            Distance
          </ThemeText>
          
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.textInput, 
                { 
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text.primary,
                  borderColor: theme.colors.border
                }
              ]}
              placeholder="Enter distance"
              placeholderTextColor={theme.colors.text.secondary}
              value={distance}
              onChangeText={setDistance}
              keyboardType="decimal-pad"
              editable={isActive}
            />
            <ThemeText variant="body" style={[styles.inputUnit, { color: theme.colors.text.secondary }]}>
              km
            </ThemeText>
          </View>
        </View>

        {/* Elevation Input (Only for Hiking equivalent - using Walking type) */}
        {workoutType === WorkoutType.WALKING && (
          <View style={styles.inputSection}>
            <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
              Elevation Gain
            </ThemeText>
            
            <View style={styles.inputRow}>
              <TextInput
                style={[
                  styles.textInput, 
                  { 
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text.primary,
                    borderColor: theme.colors.border
                  }
                ]}
                placeholder="Enter elevation"
                placeholderTextColor={theme.colors.text.secondary}
                value={elevation}
                onChangeText={setElevation}
                keyboardType="decimal-pad"
                editable={isActive}
              />
              <ThemeText variant="body" style={[styles.inputUnit, { color: theme.colors.text.secondary }]}>
                m
              </ThemeText>
            </View>
          </View>
        )}

        {/* Intensity Slider */}
        <View style={styles.inputSection}>
          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
            Intensity: {intensity}/10
          </ThemeText>
          
          <View style={styles.sliderContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityDot,
                  { backgroundColor: theme.colors.border },
                  intensity >= level && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => setIntensity(level)}
                disabled={!isActive}
              />
            ))}
          </View>
          
          <View style={styles.intensityLabels}>
            <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
              Light
            </ThemeText>
            <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
              Moderate
            </ThemeText>
            <ThemeText variant="body" style={{ color: theme.colors.text.secondary }}>
              Hard
            </ThemeText>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.inputSection}>
          <ThemeText variant="h3" style={{ color: theme.colors.text.primary }}>
            Workout Notes
          </ThemeText>
          
          <TextInput
            style={[
              styles.notesInput, 
              { 
                backgroundColor: theme.colors.background,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border
              }
            ]}
            placeholder="Add any notes about your workout..."
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
      <View style={styles.workoutActions}>
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
              <ThemeText style={[styles.controlButtonText, { color: '#FFF' }]}>
                Complete Workout
              </ThemeText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ThemeView>
  );
};

export default CardioActiveSessionStep;