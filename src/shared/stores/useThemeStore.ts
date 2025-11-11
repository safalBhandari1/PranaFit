import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appearance } from 'react-native';
import { lightColors, darkColors, ThemeMode } from '../theme/colors';
import { spacing, borderRadius, typography, shadows } from '../theme/designTokens';

export interface Theme {
  colors: typeof lightColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
  mode: ThemeMode;
}

interface ThemeStore {
  theme: Theme;
  mode: ThemeMode;
  systemPreferred: boolean;
  setMode: (mode: ThemeMode) => void;
  setSystemPreferred: (preferred: boolean) => void;
  toggleTheme: () => void;
}

// Get system color scheme
const systemColorScheme = Appearance.getColorScheme();

// Helper to get theme based on mode
const getTheme = (mode: ThemeMode): Theme => ({
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
      systemPreferred: true,
      
      setMode: (mode: ThemeMode) => {
        const { systemPreferred } = get();
        const effectiveMode = systemPreferred ? (Appearance.getColorScheme() || mode) : mode;
        
        set({
          mode,
          theme: getTheme(effectiveMode),
        });
      },
      
      setSystemPreferred: (systemPreferred: boolean) => {
        const { mode } = get();
        const effectiveMode = systemPreferred ? (Appearance.getColorScheme() || mode) : mode;
        
        set({
          systemPreferred,
          theme: getTheme(effectiveMode),
        });
      },
      
      toggleTheme: () => {
        const { mode, systemPreferred } = get();
        const newMode = mode === 'light' ? 'dark' : 'light';
        const effectiveMode = systemPreferred ? (Appearance.getColorScheme() || newMode) : newMode;
        
        set({
          mode: newMode,
          theme: getTheme(effectiveMode),
        });
      },
    }),
    {
      name: 'pranafit-theme-store',
      partialize: (state) => ({
        mode: state.mode,
        systemPreferred: state.systemPreferred,
      }),
    }
  )
);

// Initialize theme store with system preferences
useThemeStore.getState().setMode(systemColorScheme === 'dark' ? 'dark' : 'light');