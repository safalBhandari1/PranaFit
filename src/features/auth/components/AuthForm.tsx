import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeButton } from '../../../shared/ui/ThemeButton';
import { ThemeView } from '../../../shared/ui/ThemeView';

interface AuthFormProps {
  fields: {
    label: string;
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
  }[];
  onSubmit: () => void;
  submitText: string;
  isLoading?: boolean;
  error?: string | null;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  fields,
  onSubmit,
  submitText,
  isLoading = false,
  error,
}) => {
  const { theme } = useThemeStore();

  return (
    <ThemeView style={{ width: '100%', paddingHorizontal: 24 }}>
      {fields.map((field, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          <ThemeText variant="body" style={{ marginBottom: 8 }}>
            {field.label}
          </ThemeText>
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            placeholder={field.placeholder}
            placeholderTextColor={theme.colors.text.secondary}
            secureTextEntry={field.secureTextEntry}
            style={{
              backgroundColor: theme.colors.card,
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.md,
              paddingHorizontal: 16,
              paddingVertical: 12,
              color: theme.colors.text.primary,
              fontSize: 16,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      ))}

      {error && (
        <ThemeView 
          style={{ 
            backgroundColor: theme.colors.semantic.success + '20',
            padding: 12,
            borderRadius: theme.borderRadius.md,
            marginBottom: 16,
          }}
        >
          <ThemeText color="secondary" style={{ textAlign: 'center' }}>
            {error}
          </ThemeText>
        </ThemeView>
      )}

      <ThemeButton 
        onPress={onSubmit}
        disabled={isLoading}
        style={{ marginTop: 8 }}
      >
        <ThemeText style={{ color: '#FFFFFF', fontWeight: '600' }}>
          {isLoading ? 'Loading...' : submitText}
        </ThemeText>
      </ThemeButton>
    </ThemeView>
  );
};