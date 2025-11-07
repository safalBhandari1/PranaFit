import { useCallback } from 'react';
import { useThemeStore, Theme } from '../stores/useThemeStore';
import { spacing, borderRadius, typography, shadows, Spacing, BorderRadius, Typography, Shadows } from '../theme/designTokens';

export interface UseEnhancedThemeReturn extends Theme {
  // Convenience methods
  isDark: boolean;
  isLight: boolean;
  
  // Spacing helpers
  gap: (size: Spacing) => number;
  padding: (vertical: Spacing, horizontal?: Spacing) => { paddingVertical: number; paddingHorizontal: number };
  margin: (vertical: Spacing, horizontal?: Spacing) => { marginVertical: number; marginHorizontal: number };
  
  // Color helpers
  getColor: (colorPath: string) => string;
  
  // Store actions
  toggleTheme: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  setSystemPreferred: (preferred: boolean) => void;
}

export const useEnhancedTheme = (): UseEnhancedThemeReturn => {
  const { theme, mode, systemPreferred, toggleTheme, setMode, setSystemPreferred } = useThemeStore();

  const isDark = mode === 'dark';
  const isLight = mode === 'light';

  const gap = useCallback((size: Spacing): number => {
    return spacing[size];
  }, []);

  const padding = useCallback((vertical: Spacing, horizontal?: Spacing) => {
    return {
      paddingVertical: spacing[vertical],
      paddingHorizontal: spacing[horizontal || vertical],
    };
  }, []);

  const margin = useCallback((vertical: Spacing, horizontal?: Spacing) => {
    return {
      marginVertical: spacing[vertical],
      marginHorizontal: spacing[horizontal || vertical],
    };
  }, []);

  const getColor = useCallback((colorPath: string): string => {
    const path = colorPath.split('.');
    let current: any = theme.colors;
    
    for (const key of path) {
      if (current[key] === undefined) {
        console.warn(`Color path "${colorPath}" not found in theme`);
        return theme.colors.primary; // Fallback color
      }
      current = current[key];
    }
    
    return current;
  }, [theme.colors]);

  return {
    ...theme,
    isDark,
    isLight,
    gap,
    padding,
    margin,
    getColor,
    toggleTheme,
    setMode,
    setSystemPreferred,
    mode,
  };
};

// Export a simpler useTheme hook for basic usage
export const useTheme = useEnhancedTheme;