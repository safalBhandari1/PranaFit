// Base color interface matching your existing structure
interface BaseThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    text: {
      primary: string;
      secondary: string;
    };
    background: string;
    card: string;
    border: string;
  }
  
  // Extended theme with design tokens
  export interface ThemeColors extends BaseThemeColors {
    semantic: {
      success: string;
      info: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }
  
  export const lightColors: ThemeColors = {
    // Your existing Strava orange theme
    primary: '#FC4C02',
    secondary: '#FFFFFF',
    accent: '#00D4AA',
    warning: '#FF6B35',
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    background: '#F8F9FA',
    card: '#FFFFFF',
    border: '#E0E0E0',
    
    // New semantic colors
    semantic: {
      success: '#10B981',
      info: '#3B82F6',
    },
    
    // Neutral palette for consistent grays
    neutral: {
      50: '#F8F9FA',
      100: '#F1F3F4',
      200: '#E8EAED',
      300: '#DADCE0',
      400: '#BDC1C6',
      500: '#9AA0A6',
      600: '#80868B',
      700: '#5F6368',
      800: '#3C4043',
      900: '#1A1A1A',
    },
  };
  
  export const darkColors: ThemeColors = {
    // Your existing dark colors
    primary: '#FC4C02',
    secondary: '#1A1A1A',
    accent: '#00D4AA',
    warning: '#FF6B35',
    text: {
      primary: '#1A1A1A',
      secondary: '#999999',
    },
    background: '#121212',
    card: '#2A2A2A',
    border: '#333333',
    
    // Semantic colors (same for dark mode)
    semantic: {
      success: '#10B981',
      info: '#3B82F6',
    },
    
    // Neutral palette (inverted for dark mode)
    neutral: {
        50: '#F8F9FA',
        100: '#F1F3F4', 
        200: '#E8EAED',
        300: '#DADCE0',
        400: '#BDC1C6',
        500: '#9AA0A6', // ← ADD THIS
        600: '#80868B',
        700: '#5F6368', 
        800: '#3C4043',
        900: '#1A1A1A', // ← ADD THIS
    },
  };
  
  export type ThemeMode = 'light' | 'dark';