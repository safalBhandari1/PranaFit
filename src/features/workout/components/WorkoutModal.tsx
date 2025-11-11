
import React from 'react';
import { Modal, View } from 'react-native';
import { useWorkoutStore } from '../stores/useWorkoutStore';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import {  ThemeText } from '../../../shared/ui/ThemeText';
import {  ThemeView } from '../../../shared/ui/ThemeView';
import GymSplitSelectionStep from './WorkoutModal/GymSplitSelectionStep';
import ExerciseSelectionStep from './WorkoutModal/ExerciseSelectionStep';
import GymActiveSessionStep from './WorkoutModal/GymActiveSessionStep';
import CardioActiveSessionStep from './WorkoutModal/CardioActiveSessionStep';
import StructuredActiveSessionStep from './WorkoutModal/StructuredActiveSessionStep';
import { WorkoutType } from '../types/workout';


const WorkoutModal: React.FC = () => {
  const { theme } = useThemeStore();
  
  // SIMPLE FIX: Just subscribe to the entire store
  const store = useWorkoutStore();

  console.log('🟢 WorkoutModal - isModalOpen:', store.isModalOpen, 'currentStep:', store.currentStep);

  const renderStep = () => {
    console.log('🟢 WorkoutModal - Rendering step:', store.currentStep);
    
    switch (store.currentStep) {
      case 'type-selection':
        return (
          <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemeText>Workout Type Selection (Coming Soon)</ThemeText>
          </ThemeView>
        );
      
        case 'gym-split-selection':
            return <GymSplitSelectionStep />;
          
        case 'exercise-selection':
            return <ExerciseSelectionStep />;
          
        case 'active-session':
          if (store.workoutType === WorkoutType.GYM) {
            return <GymActiveSessionStep />;
          } else if (
            store.workoutType === WorkoutType.RUNNING ||
            store.workoutType === WorkoutType.CYCLING ||
            store.workoutType === WorkoutType.WALKING || 
            store.workoutType === WorkoutType.ELLIPTICAL ||
            store.workoutType === WorkoutType.JUMBA
          ) {
            return <CardioActiveSessionStep />;
          } else if (
            store.workoutType === WorkoutType.YOGA ||
            store.workoutType === WorkoutType.CALISTHENICS
          ) {
            return <StructuredActiveSessionStep />;
          } else {
            return (
              <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemeText>Active Workout Session (Coming Soon)</ThemeText>
              </ThemeView>
            );
          }
          
        case 'completion':
            return (
              <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemeText>Workout Complete (Coming Soon)</ThemeText>
              </ThemeView>
            );
          
          default:
            return null;
    }
  };

  return (
    <Modal
      visible={store.isModalOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={store.closeWorkoutModal}
    >
      <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {renderStep()}
      </ThemeView>
    </Modal>
  );
};

export default WorkoutModal;

