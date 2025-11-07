import React from 'react';
import { useTheme } from '../hooks/useEnhancedTheme';
import { ThemeView } from './ThemeView';
import { Spacing, BorderRadius, Shadows } from '../theme/designTokens';

interface ThemeCardProps {
  padding?: Spacing;
  margin?: Spacing;
  borderRadius?: BorderRadius;
  shadow?: Shadows;
  children?: React.ReactNode;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  padding = 'md',
  margin,
  borderRadius = 'md',
  shadow = 'sm',
  children,
}) => {
  const theme = useTheme();

  return (
    <ThemeView
      backgroundColor="card"
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      style={theme.shadows[shadow]}
    >
      {children}
    </ThemeView>
  );
};