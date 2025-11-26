// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Appearance } from 'react-native';
// import { lightColors, darkColors, ThemeMode } from '../theme/colors';
// import { spacing, borderRadius, typography, shadows } from '../theme/designTokens';

// export interface Theme {
//   colors: typeof lightColors;
//   spacing: typeof spacing;
//   borderRadius: typeof borderRadius;
//   typography: typeof typography;
//   shadows: typeof shadows;
//   mode: ThemeMode;
// }

// interface ThemeStore {
//   theme: Theme;
//   mode: ThemeMode;
//   systemPreferred: boolean;
//   setMode: (mode: ThemeMode) => void;
//   setSystemPreferred: (preferred: boolean) => void;
//   toggleTheme: () => void;
// }

// // Get system color scheme
// const systemColorScheme = Appearance.getColorScheme();

// // Helper to get theme based on mode
// const getTheme = (mode: ThemeMode): Theme => ({
//   colors: mode === 'dark' ? darkColors : lightColors,
//   spacing,
//   borderRadius,
//   typography,
//   shadows,
//   mode,
// });

// export const useThemeStore = create<ThemeStore>()(
//   persist(
//     (set, get) => ({
//       theme: getTheme('light'),
//       mode: 'light',
//       systemPreferred: true,
      
//       setMode: (mode: ThemeMode) => {
//         const { systemPreferred } = get();
//         const effectiveMode = systemPreferred ? (Appearance.getColorScheme() || mode) : mode;
        
//         set({
//           mode,
//           theme: getTheme(effectiveMode),
//         });
//       },
      
//       setSystemPreferred: (systemPreferred: boolean) => {
//         const { mode } = get();
//         const effectiveMode = systemPreferred ? (Appearance.getColorScheme() || mode) : mode;
        
//         set({
//           systemPreferred,
//           theme: getTheme(effectiveMode),
//         });
//       },
      
//       toggleTheme: () => {
//         const { mode, systemPreferred } = get();
//         const newMode = mode === 'light' ? 'dark' : 'light';
//         const effectiveMode = systemPreferred ? (Appearance.getColorScheme() || newMode) : newMode;
        
//         set({
//           mode: newMode,
//           theme: getTheme(effectiveMode),
//         });
//       },
//     }),
//     {
//       name: 'pranafit-theme-store',
//       partialize: (state) => ({
//         mode: state.mode,
//         systemPreferred: state.systemPreferred,
//       }),
//     }
//   )
// );

// // Initialize theme store with system preferences
// useThemeStore.getState().setMode(systemColorScheme === 'dark' ? 'dark' : 'light');

// REPLACE your entire useThemeStore.ts with this:
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export type ThemeMode = 'light' | 'dark';

// interface ThemeStore {
//   mode: ThemeMode;
//   systemPreferred: boolean;
//   setMode: (mode: ThemeMode) => void;
//   setSystemPreferred: (preferred: boolean) => void;
//   toggleTheme: () => void;
// }


// export const useThemeStore = create<ThemeStore>()(
//   persist(
//     (set) => ({
//       mode: 'light',
//       systemPreferred: true,
      
//       setMode: (mode: ThemeMode) => {
//         set({ mode });
//       },
      
//       setSystemPreferred: (systemPreferred: boolean) => {
//         set({ systemPreferred });
//       },
      
//       toggleTheme: () => {
//         set((state) => ({ 
//           mode: state.mode === 'light' ? 'dark' : 'light' 
//         }));
//       },
//     }),
//     {
//       name: 'pranafit-theme-store',
//     }
//   )
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { lightColors, darkColors } from '../theme/colors';
import { spacing, borderRadius, typography, shadows } from '../theme/designTokens';

// ADD THIS: Export the Theme interface
export interface Theme {
  colors: typeof lightColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows;
  mode: 'light' | 'dark';
}

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  mode: ThemeMode;
  systemPreferred: boolean;
  setMode: (mode: ThemeMode) => void;
  setSystemPreferred: (preferred: boolean) => void;
  toggleTheme: () => void;
}

// Create theme objects
const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
  shadows,
  mode: 'light',
};

const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
  shadows,
  mode: 'dark',
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: lightTheme,
      mode: 'light',
      systemPreferred: true,
      
      setMode: (mode: ThemeMode) => {
        const { systemPreferred } = get();
        const newTheme = mode === 'dark' ? darkTheme : lightTheme;
        set({ 
          mode,
          theme: newTheme
        });
      },
      
      setSystemPreferred: (systemPreferred: boolean) => {
        set({ systemPreferred });
      },
      
      toggleTheme: () => {
        set((state) => {
          const newMode = state.mode === 'light' ? 'dark' : 'light';
          const newTheme = newMode === 'dark' ? darkTheme : lightTheme;
          return { 
            mode: newMode,
            theme: newTheme
          };
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