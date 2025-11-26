import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../../../shared/stores/useThemeStore';
import { useWorkoutStore } from '../../stores/useWorkoutStore';
import { ThemeText } from '../../../../shared/ui/ThemeText';
import { ThemeView } from '../../../../shared/ui/ThemeView';
import { mapMuscleGroupsToSplit } from '../../../../shared/data/exercises';
import { createStyles } from '../../../../shared/styles/createStyles';
import { createGymSpliteSelectionStyle } from './styles/gymSplitSelectionStyles';


// Muscle groups data - matching your original structure
const splits = [
  { name: 'Chest', emoji: '🏋️' },
  { name: 'Back', emoji: '💪' },
  { name: 'Legs', emoji: '🦵' },
  { name: 'Glutes', emoji: '🍑' },
  { name: 'Shoulders', emoji: '👔' },
  { name: 'Biceps', emoji: '💪' },
  { name: 'Triceps', emoji: '🦾' },
  { name: 'Traps', emoji: '👔' },
  { name: 'Core', emoji: '🎯' }
];

// PPL workouts
const pplWorkouts = [
  { name: 'Push', emoji: '🔄', type: 'ppl' },
  { name: 'Pull', emoji: '⬅️', type: 'ppl' },
  { name: 'Legs', emoji: '🦵', type: 'ppl' }
];

// Upper/Lower workouts
const upperLowerWorkouts = [
  { name: 'Upper', emoji: '🔼', type: 'upperlower' },
  { name: 'Lower', emoji: '🔽', type: 'upperlower' }
];

const GymSplitSelectionStep: React.FC = () => {
  const { theme } = useThemeStore();
  const { setSelectedGymSplit, closeWorkoutModal } = useWorkoutStore();
  const styles = createGymSpliteSelectionStyle(theme);
  
  // State matching your original logic
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [selectedPPL, setSelectedPPL] = useState<string[]>([]);
  const [selectedUpperLower, setSelectedUpperLower] = useState<string[]>([]);

  // ✅ ADDED: Back button handler
  const handleBack = () => {
    closeWorkoutModal();
  };

  // Handle muscle group multi-selection - same as your original
  const handleMuscleGroupSelect = (muscleGroup: string) => {
    setSelectedMuscleGroups(prev => {
      const isSelected = prev.includes(muscleGroup);
      let newSelection: string[];
      
      if (isSelected) {
        newSelection = prev.filter(item => item !== muscleGroup);
      } else {
        newSelection = [...prev, muscleGroup];
      }

      // Clear other sections when muscle groups are selected
      if (newSelection.length > 0) {
        setSelectedPPL([]);
        setSelectedUpperLower([]);
      }
      
      return newSelection;
    });
  };

  // Handle single selection for PPL/UpperLower - same as your original
  const handleSingleSelect = (
    itemName: string, 
    category: string,
    setSelectedState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedState(prev => {
      const isSelected = prev.includes(itemName);
      let newSelection: string[];
      
      if (isSelected) {
        newSelection = [];
      } else {
        newSelection = [itemName];
      }

      // Clear muscle groups and other sections when PPL/UpperLower is selected
      if (newSelection.length > 0) {
        setSelectedMuscleGroups([]);
        if (category === 'ppl') {
          setSelectedUpperLower([]);
        } else if (category === 'upperlower') {
          setSelectedPPL([]);
        }
      }
      
      return newSelection;
    });
  };

  const handleStartWorkout = () => {
    let muscleGroupsToPass: string[] = [];
  
    // Determine what's selected and build muscleGroups array
    if (selectedMuscleGroups.length > 0) {
      muscleGroupsToPass = selectedMuscleGroups;
    } else if (selectedPPL.length > 0) {
      // FIXED: Map PPL names to actual muscle groups
      const pplMapping: { [key: string]: string[] } = {
        'Push': ['Chest', 'Shoulders', 'Triceps'],
        'Pull': ['Back', 'Biceps', 'Traps'], 
        'Legs': ['Legs', 'Glutes']
      };
      muscleGroupsToPass = pplMapping[selectedPPL[0]] || [selectedPPL[0]];
    } else if (selectedUpperLower.length > 0) {
      // FIXED: Map Upper/Lower names to actual muscle groups
      const upperLowerMapping: { [key: string]: string[] } = {
        'Upper': ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Traps'],
        'Lower': ['Legs', 'Glutes']
      };
      muscleGroupsToPass = upperLowerMapping[selectedUpperLower[0]] || [selectedUpperLower[0]];
    }
  
    console.log('🎯 Muscle groups to pass:', muscleGroupsToPass);
    
    // Map to our gym split system
    const gymSplit = mapMuscleGroupsToSplit(muscleGroupsToPass);
    
    console.log('🎯 Resulting gym split:', {
      name: gymSplit.name,
      targetMuscles: gymSplit.targetMuscles,
      suggestedExercisesCount: gymSplit.suggestedExercises?.length
    });
    
    // Set in store and proceed to exercise selection
    setSelectedGymSplit(gymSplit);
  };

  // Helper component for compact 2-column grid - same as your original
  const renderCompactGrid = (
    items: any[], 
    onPress: (item: any) => void,
    selectedItems: string[]
  ) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      const rowItems = items.slice(i, i + 2);
      rows.push(
        <View key={i} style={styles.gridRow}>
          {rowItems.map((item) => {
            const isSelected = selectedItems.includes(item.name);
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
                  }
                ]}
                onPress={() => onPress(item)}
              >
                <ThemeText style={styles.buttonEmoji}>{item.emoji}</ThemeText>
                <ThemeText variant="body" style={[styles.buttonText, { 
                  color: isSelected ? theme.colors.primary : theme.colors.text.primary 
                }]}>
                  {item.name}
                </ThemeText>
                
                {/* Selection indicator */}
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

  // Check if any selection is made
  const hasSelection = 
    selectedMuscleGroups.length > 0 || 
    selectedPPL.length > 0 || 
    selectedUpperLower.length > 0;

  // Helper function to get selection display text
  const getSelectionText = (): string => {
    if (selectedMuscleGroups.length > 0) {
      return selectedMuscleGroups.length === 1 ? selectedMuscleGroups[0] : `${selectedMuscleGroups.join(' + ')}`;
    }
    if (selectedPPL.length > 0) return selectedPPL[0];
    if (selectedUpperLower.length > 0) return selectedUpperLower[0];
    return '';
  };

  return (
    <ThemeView style={styles.container}>
      {/* ✅ Header with back button */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemeText style={[styles.backButtonText, { color: theme.colors.primary }]}>
            ← Back
          </ThemeText>
        </TouchableOpacity>
        {/* ✅ CHANGED: Header title one size down */}
        <ThemeText variant="h3" style={styles.headerTitle}>
          Select Workout Split
        </ThemeText>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.exerciseSelectionStepcontent}>
        {/* ✅ REMOVED: ScrollView and title section */}
        
        {/* ✅ SPLITS SECTION - Reduced spacing */}
        <View style={[styles.section, { marginBottom: 12 }]}> {/* Reduced from default spacing */}
          <ThemeText variant="h3" style={{ marginBottom: 8, textAlign: 'left' }}> {/* Left aligned */}
            Muscle Groups {selectedMuscleGroups.length > 0 && `(${selectedMuscleGroups.length} selected)`}
          </ThemeText>
          {renderCompactGrid(splits, (item) => handleMuscleGroupSelect(item.name), selectedMuscleGroups)}
        </View>

        {/* ✅ PPL SECTION - Reduced spacing */}
        <View style={[styles.section, { marginBottom: 12 }]}> {/* Reduced from default spacing */}
          <ThemeText variant="h3" style={{ marginBottom: 8, textAlign: 'left' }}> {/* Left aligned */}
            PPL {selectedPPL.length > 0 && '(1 selected)'}
          </ThemeText>
          {renderCompactGrid(pplWorkouts, (item) => handleSingleSelect(item.name, 'ppl', setSelectedPPL), selectedPPL)}
        </View>

        {/* ✅ UPPER/LOWER SECTION - Reduced spacing */}
        <View style={[styles.section, { marginBottom: 12 }]}> {/* Reduced from default spacing */}
          <ThemeText variant="h3" style={{ marginBottom: 8, textAlign: 'left' }}> {/* Left aligned */}
            Upper/Lower Split {selectedUpperLower.length > 0 && '(1 selected)'}
          </ThemeText>
          {renderCompactGrid(upperLowerWorkouts, (item) => handleSingleSelect(item.name, 'upperlower', setSelectedUpperLower), selectedUpperLower)}
        </View>
      </View>

      {/* ✅ FIXED: Footer with fixed positioning */}
      <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
        <View style={styles.selectionActions}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
            onPress={handleBack}
          >
            <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
              Cancel
            </ThemeText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.startSessionButton, 
              { 
                backgroundColor: hasSelection ? theme.colors.primary : theme.colors.border,
                opacity: hasSelection ? 1 : 0.6
              }
            ]}
            onPress={handleStartWorkout}
            disabled={!hasSelection}
          >
            <ThemeText style={[
              styles.startSessionButtonText,
              { color: hasSelection ? '#FFF' : theme.colors.text.secondary }
            ]}>
              {/* {hasSelection ? `Start ${getSelectionText()} Workout` : 'Select Workout Type'} */}
              {hasSelection ? `Start Workout` : 'Select Workout Type'}
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeView>
  );
};

export default GymSplitSelectionStep;