// // Base color interface matching your existing structure
// interface BaseThemeColors {
//     primary: string;
//     secondary: string;
//     accent: string;
//     warning: string;
//     text: {
//       primary: string;
//       secondary: string;
//     };
//     background: string;
//     card: string;
//     border: string;
//   }
  
//   // Extended theme with design tokens
//   export interface ThemeColors extends BaseThemeColors {
//     semantic: {
//       success: string;
//       info: string;
//     };
//     neutral: {
//       50: string;
//       100: string;
//       200: string;
//       300: string;
//       400: string;
//       500: string;
//       600: string;
//       700: string;
//       800: string;
//       900: string;
//     };
//   }
  
//   export const lightColors: ThemeColors = {
//     // Your existing Strava orange theme
//     primary: '#FC4C02',
//     secondary: '#FFFFFF',
//     accent: '#00D4AA',
//     warning: '#FF6B35',
//     text: {
//       primary: '#1A1A1A',
//       secondary: '#666666',
//     },
//     background: '#F8F9FA',
//     card: '#FFFFFF',
//     border: '#E0E0E0',
    
//     // New semantic colors
//     semantic: {
//       success: '#10B981',
//       info: '#3B82F6',
//     },
    
//     // Neutral palette for consistent grays
//     neutral: {
//       50: '#F8F9FA',
//       100: '#F1F3F4',
//       200: '#E8EAED',
//       300: '#DADCE0',
//       400: '#BDC1C6',
//       500: '#9AA0A6',
//       600: '#80868B',
//       700: '#5F6368',
//       800: '#3C4043',
//       900: '#1A1A1A',
//     },
//   };
  
//   export const darkColors: ThemeColors = {
//     // Your existing dark colors
//     primary: '#FC4C02',
//     secondary: '#1A1A1A',
//     accent: '#00D4AA',
//     warning: '#FF6B35',
//     text: {
//       primary: '#1A1A1A',
//       secondary: '#999999',
//     },
//     background: '#121212',
//     card: '#2A2A2A',
//     border: '#333333',
    
//     // Semantic colors (same for dark mode)
//     semantic: {
//       success: '#10B981',
//       info: '#3B82F6',
//     },
    
//     // Neutral palette (inverted for dark mode)
//     neutral: {
//         50: '#F8F9FA',
//         100: '#F1F3F4', 
//         200: '#E8EAED',
//         300: '#DADCE0',
//         400: '#BDC1C6',
//         500: '#9AA0A6', // ← ADD THIS
//         600: '#80868B',
//         700: '#5F6368', 
//         800: '#3C4043',
//         900: '#1A1A1A', // ← ADD THIS
//     },
//   };
  
//   export type ThemeMode = 'light' | 'dark';

// // Base color interface matching your existing structure
// interface BaseThemeColors {
//   primary: string;
//   secondary: string;
//   accent: string;
//   warning: string;
//   text: {
//     primary: string;
//     secondary: string;
//   };
//   background: string;
//   card: string;
//   border: string;
// }

// // Extended theme with design tokens
// export interface ThemeColors extends BaseThemeColors {
//   semantic: {
//     success: string;
//     info: string;
//   };
//   neutral: {
//     50: string;
//     100: string;
//     200: string;
//     300: string;
//     400: string;
//     500: string;
//     600: string;
//     700: string;
//     800: string;
//     900: string;
//   };
// }

// // KEEP YOUR EXISTING LIGHT COLORS THE SAME
// export const lightColors: ThemeColors = {
//   // Your existing light colors - NO CHANGES
//   primary: '#6366F1',
//   secondary: '#10B981', 
//   accent: '#F59E0B',
//   warning: '#FF6B35',
//   text: {
//     primary: '#1E293B',
//     secondary: '#64748B',
//   },
//   background: '#FFFFFF',
//   card: '#F8FAFC',
//   border: '#E2E8F0',
  
//   semantic: {
//     success: '#10B981',
//     info: '#3B82F6',
//   },
  
//   neutral: {
//     50: '#F8F9FA',
//     100: '#F1F3F4',
//     200: '#E8EAED',
//     300: '#DADCE0',
//     400: '#BDC1C6',
//     500: '#9AA0A6',
//     600: '#80868B',
//     700: '#5F6368',
//     800: '#3C4043',
//     900: '#1A1A1A',
//   },
// };

// // ONLY UPDATE DARK COLORS to match your old project
// export const darkColors: ThemeColors = {
//   // UPDATED: Match your old project's dark mode colors
//   primary: '#FC4C02',        // Strava orange from old project
//   secondary: '#1A1A1A',      // Dark background from old project
//   accent: '#00D4AA',         // Success/progress from old project
//   warning: '#FF6B35',        // PRs, alerts from old project
//   text: {
//     primary: '#FFFFFF',      // White text from old project
//     secondary: '#999999',    // Gray text from old project
//   },
//   background: '#121212',     // Dark background from old project
//   card: '#2A2A2A',           // Card color from old project
//   border: '#333333',         // Border color from old project
  
//   // Keep semantic colors the same
//   semantic: {
//     success: '#10B981',
//     info: '#3B82F6',
//   },
  
//   // Keep neutral palette but adjust for dark mode
//   neutral: {
//     50: '#1A1A1A',
//     100: '#2A2A2A', 
//     200: '#3A3A3A',
//     300: '#4A4A4A',
//     400: '#5A5A5A',
//     500: '#6A6A6A',
//     600: '#7A7A7A',
//     700: '#8A8A8A',
//     800: '#9A9A9A',
//     900: '#FFFFFF',
//   },
// };

// export type ThemeMode = 'light' | 'dark';


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

// UPDATED: Use Strava orange in light mode too
export const lightColors: ThemeColors = {
  // UPDATED: Strava orange for both light and dark modes
  primary: '#FC4C02',        // Strava orange (was #6366F1 blue)
  secondary: '#10B981',      // Keep your existing green
  accent: '#F59E0B',         // Keep your existing amber
  warning: '#FF6B35',        // Keep your existing warning
  text: {
    primary: '#1E293B',      // Keep your existing text colors
    secondary: '#64748B',
  },
  background: '#FFFFFF',     // Keep white background
  card: '#F8FAFC',           // Keep your existing card color
  border: '#E2E8F0',         // Keep your existing border
  
  semantic: {
    success: '#10B981',
    info: '#3B82F6',
  },
  
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

// UPDATED: Dark colors to match your old project
export const darkColors: ThemeColors = {
  // UPDATED: Match your old project's dark mode colors
  primary: '#FC4C02',        // Strava orange (same as light mode)
  secondary: '#1A1A1A',      // Dark background from old project
  accent: '#00D4AA',         // Success/progress from old project
  warning: '#FF6B35',        // PRs, alerts from old project
  text: {
    primary: '#FFFFFF',      // White text from old project
    secondary: '#999999',    // Gray text from old project
  },
  background: '#121212',     // Dark background from old project
  card: '#2A2A2A',           // Card color from old project
  border: '#333333',         // Border color from old project
  
  // Keep semantic colors the same
  semantic: {
    success: '#10B981',
    info: '#3B82F6',
  },
  
  // Keep neutral palette but adjust for dark mode
  neutral: {
    50: '#1A1A1A',
    100: '#2A2A2A', 
    200: '#3A3A3A',
    300: '#4A4A4A',
    400: '#5A5A5A',
    500: '#6A6A6A',
    600: '#7A7A7A',
    700: '#8A8A8A',
    800: '#9A9A9A',
    900: '#FFFFFF',
  },
};

export type ThemeMode = 'light' | 'dark';