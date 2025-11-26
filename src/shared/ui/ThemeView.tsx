// import React from 'react';
// import { View, ViewProps } from 'react-native';
// import { useTheme } from '../hooks/useEnhancedTheme';
// import { Spacing, BorderRadius } from '../theme/designTokens';

// interface ThemeViewProps extends ViewProps {
//   padding?: Spacing;
//   paddingVertical?: Spacing;
//   paddingHorizontal?: Spacing;
//   margin?: Spacing;
//   marginVertical?: Spacing;
//   marginHorizontal?: Spacing;
//   backgroundColor?: string;
//   borderRadius?: BorderRadius;
//   children?: React.ReactNode;
// }

// export const ThemeView: React.FC<ThemeViewProps> = ({
//   padding,
//   paddingVertical,
//   paddingHorizontal,
//   margin,
//   marginVertical,
//   marginHorizontal,
//   backgroundColor,
//   borderRadius,
//   style,
//   children,
//   ...props
// }) => {
//   const theme = useTheme();

//   const getBackgroundColor = () => {
//     if (backgroundColor) {
//       return theme.getColor(backgroundColor) || backgroundColor;
//     }
//     return undefined;
//   };

//   return (
//     <View
//       style={[
//         {
//           padding: padding ? theme.gap(padding) : undefined,
//           paddingVertical: paddingVertical ? theme.gap(paddingVertical) : undefined,
//           paddingHorizontal: paddingHorizontal ? theme.gap(paddingHorizontal) : undefined,
//           margin: margin ? theme.gap(margin) : undefined,
//           marginVertical: marginVertical ? theme.gap(marginVertical) : undefined,
//           marginHorizontal: marginHorizontal ? theme.gap(marginHorizontal) : undefined,
//           backgroundColor: getBackgroundColor(),
//           borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined,
//         },
//         style,
//       ]}
//       {...props}
//     >
//       {children}
//     </View>
//   );
// };

import React from 'react';
import { View, ViewProps } from 'react-native';
import { useEnhancedTheme } from '../hooks/useEnhancedTheme'; // CHANGE: Import useEnhancedTheme
import { Spacing, BorderRadius } from '../theme/designTokens';

interface ThemeViewProps extends ViewProps {
  padding?: Spacing;
  paddingVertical?: Spacing;
  paddingHorizontal?: Spacing;
  margin?: Spacing;
  marginVertical?: Spacing;
  marginHorizontal?: Spacing;
  backgroundColor?: string;
  borderRadius?: BorderRadius;
  children?: React.ReactNode;
}

export const ThemeView: React.FC<ThemeViewProps> = ({
  padding,
  paddingVertical,
  paddingHorizontal,
  margin,
  marginVertical,
  marginHorizontal,
  backgroundColor,
  borderRadius,
  style,
  children,
  ...props
}) => {
  const { theme, gap, getColor } = useEnhancedTheme(); // CHANGE: Use useEnhancedTheme and destructure

  const getBackgroundColor = () => {
    if (backgroundColor) {
      return getColor(backgroundColor) || backgroundColor; // CHANGE: Use getColor from hook
    }
    return undefined;
  };

  return (
    <View
      style={[
        {
          padding: padding ? gap(padding) : undefined, // CHANGE: Use gap function directly
          paddingVertical: paddingVertical ? gap(paddingVertical) : undefined,
          paddingHorizontal: paddingHorizontal ? gap(paddingHorizontal) : undefined,
          margin: margin ? gap(margin) : undefined,
          marginVertical: marginVertical ? gap(marginVertical) : undefined,
          marginHorizontal: marginHorizontal ? gap(marginHorizontal) : undefined,
          backgroundColor: getBackgroundColor(),
          borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined, // CHANGE: Use theme.borderRadius
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};