// import React from 'react';
// import { Text, TextProps } from 'react-native';
// import { useTheme } from '../hooks/useEnhancedTheme';
// import { Typography } from '../theme/designTokens';

// interface ThemeTextProps extends TextProps {
//   variant?: Typography;
//   color?: string;
//   children?: React.ReactNode;
// }

// export const ThemeText: React.FC<ThemeTextProps> = ({
//   variant = 'body',
//   color,
//   style,
//   children,
//   ...props
// }) => {
//   const theme = useTheme();

//   const getTextColor = () => {
//     if (color) {
//       return theme.getColor(color) || color;
//     }
//     return theme.colors.text.primary;
//   };

//   return (
//     <Text
//       style={[
//         theme.typography[variant],
//         {
//           color: getTextColor(),
//         },
//         style,
//       ]}
//       {...props}
//     >
//       {children}
//     </Text>
//   );
// };

import React from 'react';
import { Text, TextProps } from 'react-native';
import { useThemeStore } from '../stores/useThemeStore';

interface ThemeTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'success' | 'info';
  children?: React.ReactNode;
}

export const ThemeText: React.FC<ThemeTextProps> = ({
  variant = 'body',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const { theme } = useThemeStore();

  const getColor = () => {
    switch (color) {
      case 'primary': return theme.colors.text.primary;
      case 'secondary': return theme.colors.text.secondary;
      case 'accent': return theme.colors.accent;
      case 'warning': return theme.colors.warning;
      case 'success': return theme.colors.semantic.success;
      case 'info': return theme.colors.semantic.info;
      default: return theme.colors.text.primary;
    }
  };

  return (
    <Text
      style={[
        theme.typography[variant],
        { color: getColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};