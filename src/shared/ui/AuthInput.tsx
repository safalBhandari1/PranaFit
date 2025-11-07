import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useThemeStore } from '../stores/useThemeStore';

interface AuthInputProps extends TextInputProps {
  // We can extend with custom props if needed
}

export const AuthInput: React.FC<AuthInputProps> = (props) => {
  const { theme } = useThemeStore();

  return (
    <TextInput
      {...props}
      style={[
        {
          padding: 15,
          borderRadius: 12,
          marginVertical: 8,
          fontSize: 16,
          borderWidth: 1,
          backgroundColor: theme.colors.card,
          color: theme.colors.text.primary,
          borderColor: theme.colors.border,
        },
        props.style,
      ]}
      placeholderTextColor={theme.colors.text.secondary}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};