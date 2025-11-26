import { useCallback } from 'react';
import { useThemeStore, Theme } from '../stores/useThemeStore';
import { Spacing, BorderRadius } from '../theme/designTokens';

export interface UseEnhancedThemeReturn {
  // The main theme object (for compatibility with existing code)
  theme: Theme;
  
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
  
  // Store state
  storeMode: 'light' | 'dark';
  systemPreferred: boolean;
}

export const useEnhancedTheme = (): UseEnhancedThemeReturn => {
  const { theme, mode, systemPreferred, toggleTheme, setMode, setSystemPreferred } = useThemeStore();

  const isDark = mode === 'dark';
  const isLight = mode === 'light';

  const gap = useCallback((size: Spacing): number => {
    return theme.spacing[size];
  }, [theme.spacing]);

  const padding = useCallback((vertical: Spacing, horizontal?: Spacing) => {
    return {
      paddingVertical: theme.spacing[vertical],
      paddingHorizontal: theme.spacing[horizontal || vertical],
    };
  }, [theme.spacing]);

  const margin = useCallback((vertical: Spacing, horizontal?: Spacing) => {
    return {
      marginVertical: theme.spacing[vertical],
      marginHorizontal: theme.spacing[horizontal || vertical],
    };
  }, [theme.spacing]);

  const getColor = useCallback((colorPath: string): string => {
    const path = colorPath.split('.');
    let current: any = theme.colors;
    
    for (const key of path) {
      if (current[key] === undefined) {
        console.warn(`Color path "${colorPath}" not found in theme`);
        return theme.colors.primary;
      }
      current = current[key];
    }
    
    return current;
  }, [theme.colors]);

  return {
    theme, // Main theme object for compatibility
    isDark,
    isLight,
    gap,
    padding,
    margin,
    getColor,
    toggleTheme,
    setMode,
    setSystemPreferred,
    storeMode: mode,
    systemPreferred,
  };
};