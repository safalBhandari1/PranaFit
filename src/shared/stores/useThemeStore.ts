import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { lightColors, darkColors } from '../theme/colors';
import { spacing, borderRadius, typography, shadows } from '../theme/designTokens';

export interface Theme {
  colors: typeof lightColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
  mode: 'light' | 'dark';
}

interface ThemeStore {
  theme: Theme;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

// Helper to get theme based on mode
const getTheme = (mode: 'light' | 'dark'): Theme => ({
  colors: mode === 'dark' ? darkColors : lightColors,
  spacing,
  borderRadius,
  typography,
  shadows,
  mode,
});

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getTheme('light'),
      mode: 'light',
      
      toggleTheme: () => {
        const { mode } = get();
        const newMode = mode === 'light' ? 'dark' : 'light';
        set({
          mode: newMode,
          theme: getTheme(newMode),
        });
      },
      
      setMode: (mode: 'light' | 'dark') => {
        set({
          mode,
          theme: getTheme(mode),
        });
      },
    }),
    {
      name: 'pranafit-theme-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);