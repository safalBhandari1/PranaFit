// src/shared/ui/LoadingSpinner.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeText } from './ThemeText';
import { createStyles } from '../styles/createStyles';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message,
  fullScreen = false
}) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme);

  const spinner = (
    <View style={styles.loadingContainer}>
      <ActivityIndicator 
        size={size} 
        color={theme.colors.primary} 
      />
      {message && (
        <ThemeText variant="body" style={styles.loadingText}>
          {message}
        </ThemeText>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        {spinner}
      </View>
    );
  }

  return spinner;
};