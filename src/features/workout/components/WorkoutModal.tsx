
// src/features/workout/components/WorkoutModal.tsx
import React from 'react';
import { Modal, View, StatusBar, Platform } from 'react-native';
import { useWorkoutStore } from '../stores/useWorkoutStore';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import GymSplitSelectionStep from './WorkoutModal/GymSplitSelectionStep';
import ExerciseSelectionStep from './WorkoutModal/ExerciseSelectionStep';
import GymActiveSessionStep from './WorkoutModal/GymActiveSessionStep';
import CardioActiveSessionStep from './WorkoutModal/CardioActiveSessionStep';
import StructuredActiveSessionStep from './WorkoutModal/StructuredActiveSessionStep';
import { WorkoutType } from '../types/workout';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme'; // ADD THIS

const WorkoutModal: React.FC = () => {
  //const { theme } = useThemeStore();
  const { theme } = useEnhancedTheme(); // CHANGE THIS
  const store = useWorkoutStore();
  

  // ✅ IPHONE STATUS BAR HEIGHT
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

  // ✅ MOVED: Auto-close effect to top level
  React.useEffect(() => {
    if (store.currentStep === 'completion') {
      // Close modal after a brief moment so user sees the completion message
      const timer = setTimeout(() => {
        store.closeWorkoutModal();
      }, 1500); // 1.5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [store.currentStep, store.closeWorkoutModal]); // ✅ Dependencies ensure it runs when step changes

  const renderStep = () => {
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
        // ✅ REMOVED: useEffect from here - now it's at top level
        return (
          <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemeText variant="h2">Workout Complete! 🎉</ThemeText>
            <ThemeText variant="body" style={{ marginTop: 16, textAlign: 'center' }}>
              {store.activeSession?.projectContext 
                ? `Day ${store.activeSession.projectContext.dayIndex + 1} marked as completed!`
                : 'Great job on your workout!'
              }
            </ThemeText>
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
      presentationStyle="fullScreen"
      statusBarTranslucent={true} // ✅ MUST BE TRUE to control padding
      onRequestClose={store.closeWorkoutModal}
    >
      {/* ✅ STATUS BAR WITH TRANSPARENT BACKGROUND */}
      <StatusBar 
        backgroundColor="transparent"
        translucent
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      
      {/* ✅ MANUAL PADDING FOR IPHONE NOTCH */}
      <ThemeView style={{ 
        flex: 1, 
        backgroundColor: theme.colors.background,
        paddingTop: statusBarHeight, // ✅ THIS FIXES THE OVERLAP
      }}>
        {renderStep()}
      </ThemeView>
    </Modal>
  );
};

export default WorkoutModal;