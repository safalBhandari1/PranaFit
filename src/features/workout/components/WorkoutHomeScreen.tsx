import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useWorkoutStore } from '../stores/useWorkoutStore';
import { WorkoutType } from '../types/workout';
import { ThemeText } from '../../../shared/ui/ThemeText'; // Using shared UI
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createStyles } from '../../../shared/styles/createStyles'; // Using shared styles

// Using your exact workout data structure with our WorkoutType enum
const WORKOUTS = [
  {
    id: WorkoutType.GYM,
    name: 'Gym',
    emoji: '🏋️',
    color: '#FF6B35',
    description: 'Weight training and strength exercises'
  },
  {
    id: WorkoutType.CALISTHENICS,
    name: 'Calisthenics',
    emoji: '💪',
    color: '#4ECDC4',
    description: 'Bodyweight exercises and gymnastics'
  },
  {
    id: WorkoutType.YOGA,
    name: 'Yoga',
    emoji: '🧘',
    color: '#9B59B6',
    description: 'Yoga poses and flexibility training'
  },
  {
    id: WorkoutType.RUNNING,
    name: 'Running',
    emoji: '🏃',
    color: '#45B7D1',
    description: 'Outdoor running and jogging'
  },
  {
    id: WorkoutType.CYCLING,
    name: 'Cycling',
    emoji: '🚴',
    color: '#96CEB4',
    description: 'Bicycle riding and spinning'
  },
  {
    id: WorkoutType.JUMBA,
    name: 'Jumba',
    emoji: '💃',
    color: '#FFA5A5',
    description: 'Dance fitness and cardio workouts'
  },
  {
    id: WorkoutType.WALKING,
    name: 'Walking',
    emoji: '🚶',
    color: '#A593E0',
    description: 'Walking and power walking'
  },
  {
    id: WorkoutType.ELLIPTICAL,
    name: 'Elliptical',
    emoji: '🏃‍♂️',
    color: '#F39C12',
    description: 'Elliptical machine training'
  }
];

const WorkoutHomeScreen: React.FC = () => {
    const { theme } = useThemeStore();
    const { openWorkoutModal } = useWorkoutStore();
    const styles = createStyles(theme); // FIXED: Direct call, no .workout
  
    const handleWorkoutPress = (workoutType: WorkoutType) => {
        console.log('🟢 WorkoutHomeScreen: Gym button clicked, calling openWorkoutModal with:', workoutType);
      openWorkoutModal(workoutType);
    };
  
    return (
      <ThemeView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Welcome Section */}
          <View style={styles.section}>
            <ThemeText variant="h1" style={{ textAlign: 'center', marginBottom: 10 }}>
              Workout Activities
            </ThemeText>
            <ThemeText variant="body" style={{ textAlign: 'center', lineHeight: 22 }}>
              Choose your workout type and track your progress
            </ThemeText>
          </View>
  
          {/* Workout Grid */}
          <View style={styles.workoutGrid}>
            {WORKOUTS.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                style={[
                  styles.workoutCard, 
                  { 
                    backgroundColor: theme.colors.card,
                    borderLeftColor: workout.color,
                    borderLeftWidth: 4
                  }
                ]}
                onPress={() => handleWorkoutPress(workout.id)}
              >
                <View style={styles.workoutHeader}>
                  <ThemeText style={[styles.workoutEmoji, { color: workout.color }]}>
                    {workout.emoji}
                  </ThemeText>
                </View>
                
                <ThemeText variant="h3" style={{ marginBottom: 6 }}>
                  {workout.name}
                </ThemeText>
                
                <ThemeText variant="body" style={styles.workoutDescription}>
                  {workout.description}
                </ThemeText>
                
                <View style={[styles.statusContainer, { backgroundColor: theme.colors.background }]}>
                  <ThemeText variant="body" style={[styles.statusText, { color: theme.colors.primary }]}>
                    Start workout
                  </ThemeText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Quick Tips */}
          <View style={[styles.tipsSection, { backgroundColor: theme.colors.card }]}>
            <ThemeText variant="h3" style={{ marginBottom: 15 }}>
              Quick Tips
            </ThemeText>
            <View style={styles.tipItem}>
              <ThemeText style={[styles.tipBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText variant="body" style={styles.tipText}>
                Warm up for 5-10 minutes before intense workouts
              </ThemeText>
            </View>
            <View style={styles.tipItem}>
              <ThemeText style={[styles.tipBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText variant="body" style={styles.tipText}>
                Stay hydrated during your workout sessions
              </ThemeText>
            </View>
            <View style={styles.tipItem}>
              <ThemeText style={[styles.tipBullet, { color: theme.colors.primary }]}>•</ThemeText>
              <ThemeText variant="body" style={styles.tipText}>
                Track your progress to see improvements over time
              </ThemeText>
            </View>
          </View>
        </ScrollView>
      </ThemeView>
    );
  };
  
  export default WorkoutHomeScreen;