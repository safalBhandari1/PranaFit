// src/features/profile/components/GymSwitcher.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import { createProfileGymStyles } from '../styles/profileGymStyles';

interface GymSwitcherProps {
  onPress: () => void;
}

export const GymSwitcher: React.FC<GymSwitcherProps> = ({ onPress }) => {
  const { theme } = useEnhancedTheme();
  const { currentGym, currentGymRole, hasMultipleGyms } = useUserRole();
  const styles = createProfileGymStyles(theme);

  // Get role display text
  const getRoleText = (role?: string) => {
    if (!role) return 'No Role';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (!currentGym) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.currentGymCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.gymIconContainer}>
        <Ionicons 
          name="business" 
          size={24} 
          color={theme.colors.primary} 
        />
      </View>
      
      <View style={styles.gymInfo}>
        <ThemeText style={styles.gymName}>
          {currentGym.name}
        </ThemeText>
        <ThemeText style={styles.gymRole}>
          {getRoleText(currentGymRole)}
        </ThemeText>
      </View>
      
      {hasMultipleGyms && (
        <View style={styles.switchGymButton}>
          <ThemeText style={styles.switchGymText}>
            Switch
          </ThemeText>
          <Ionicons 
            name="swap-vertical" 
            size={20} 
            color={theme.colors.primary} 
          />
        </View>
      )}
    </TouchableOpacity>
  );
};