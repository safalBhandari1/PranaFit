import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../../shared/stores/useThemeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const { setMode } = useThemeStore();

  // Update theme when system color scheme changes
  useEffect(() => {
    // You can enable this if you want auto system theme switching
    // setMode(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme, setMode]);

  return <>{children}</>;
};