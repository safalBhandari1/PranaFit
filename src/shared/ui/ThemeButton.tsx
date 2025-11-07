import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/useEnhancedTheme';
import { ThemeText } from './ThemeText';
import { ThemeView } from './ThemeView';
import { Spacing, BorderRadius } from '../theme/designTokens';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ThemeButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    };

    // Size styles
    const sizeStyles = {
      sm: { ...theme.padding('sm', 'md') },
      md: { ...theme.padding('md', 'lg') },
      lg: { ...theme.padding('lg', 'xl') },
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: disabled ? theme.colors.neutral[400] : theme.colors.primary,
      },
      secondary: {
        backgroundColor: disabled ? theme.colors.neutral[400] : theme.colors.secondary,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? theme.colors.neutral[400] : theme.colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.neutral[500];
    
    switch (variant) {
      case 'primary':
        return theme.colors.text.primary;
      case 'secondary':
        return theme.colors.text.primary;
      case 'outline':
        return theme.colors.primary;
      case 'ghost':
        return theme.colors.primary;
      default:
        return theme.colors.text.primary;
    }
  };

  const getTextVariant = (): keyof typeof theme.typography => {
    switch (size) {
      case 'sm': return 'caption';
      case 'lg': return 'h3';
      default: return 'body';
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={getTextColor()} 
        />
      ) : (
        <ThemeText
          variant={getTextVariant()}
          color={getTextColor()}
          style={{ fontWeight: '600' }}
        >
          {children}
        </ThemeText>
      )}
    </TouchableOpacity>
  );
};