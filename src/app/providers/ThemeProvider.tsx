// import React, { useEffect } from 'react';
// import { useColorScheme } from 'react-native';
// import { useThemeStore } from '../../shared/stores/useThemeStore';

// interface ThemeProviderProps {
//   children: React.ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const colorScheme = useColorScheme();
//   const { setMode } = useThemeStore();

//   // Update theme when system color scheme changes
//   useEffect(() => {
//     // You can enable this if you want auto system theme switching
//     // setMode(colorScheme === 'dark' ? 'dark' : 'light');
//   }, [colorScheme, setMode]);

//   return <>{children}</>;
// };

// REPLACE your entire ThemeProvider.tsx with this:
import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../../shared/stores/useThemeStore';
import { lightColors, darkColors } from '../../shared/theme/colors';
import { spacing, borderRadius, typography, shadows } from '../../shared/theme/designTokens';

// Create complete theme objects
const lightTheme = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
  shadows,
  mode: 'light' as const,
};

const darkTheme = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
  shadows,
  mode: 'dark' as const,
};

// Create Theme Context
export const ThemeContext = createContext(lightTheme);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { mode, systemPreferred } = useThemeStore();

  // Determine which theme to use
  const currentTheme = 
    systemPreferred 
      ? (systemColorScheme === 'dark' ? darkTheme : lightTheme)
      : (mode === 'dark' ? darkTheme : lightTheme);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};