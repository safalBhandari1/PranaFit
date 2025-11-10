
import React from 'react';
import { Modal, View } from 'react-native';
import { useWorkoutStore } from '../stores/useWorkoutStore';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import {  ThemeText } from '../../../shared/ui/ThemeText';
import {  ThemeView } from '../../../shared/ui/ThemeView';
import GymSplitSelectionStep from './WorkoutModal/GymSplitSelectionStep';
import ExerciseSelectionStep from './WorkoutModal/ExerciseSelectionStep';

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
            return (
              <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemeText>Active Workout Session (Coming Soon)</ThemeText>
              </ThemeView>
            );
          
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

// import React from 'react';
// import { Modal, View } from 'react-native';
// import { useWorkoutStore } from '../stores/useWorkoutStore';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import {ThemeView} from '../../../shared/ui/ThemeView';

// // Add debug before import
// console.log('🟢 WorkoutModal - Before importing GymSplitSelectionStep');

// let GymSplitSelectionStep;
// try {
//   const imported = require('./WorkoutModal/GymSplitSelectionStep');
//   GymSplitSelectionStep = imported.default;
//   console.log('🟢 WorkoutModal - GymSplitSelectionStep imported successfully:', GymSplitSelectionStep);
// } catch (error) {
//   console.log('🔴 WorkoutModal - GymSplitSelectionStep import FAILED:', error);
//   // Fallback component
//   GymSplitSelectionStep = () => (
//     <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ThemeText>Gym Split Selection - FALLBACK</ThemeText>
//     </ThemeView>
//   );
// }

// const WorkoutModal: React.FC = () => {
//   const { theme } = useThemeStore();
//   const store = useWorkoutStore();

//   console.log('🟢 WorkoutModal - isModalOpen:', store.isModalOpen, 'currentStep:', store.currentStep);

//   const renderStep = () => {
//     console.log('🟢 WorkoutModal - Rendering step:', store.currentStep);
    
//     switch (store.currentStep) {
//       case 'type-selection':
//         return (
//           <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ThemeText>Workout Type Selection (Coming Soon)</ThemeText>
//           </ThemeView>
//         );
      
//       case 'gym-split-selection':
//         console.log('🟢 WorkoutModal - About to render GymSplitSelectionStep');
//         return <GymSplitSelectionStep />;
      
//       case 'exercise-selection':
//         return (
//           <ThemeView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ThemeText>Exercise Selection (Coming Soon)</ThemeText>
//           </ThemeView>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <Modal
//       visible={store.isModalOpen}
//       animationType="slide"
//       presentationStyle="pageSheet"
//       onRequestClose={store.closeWorkoutModal}
//     >
//       <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//         {renderStep()}
//       </ThemeView>
//     </Modal>
//   );
// };

// export default WorkoutModal;