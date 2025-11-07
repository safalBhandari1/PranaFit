import React from 'react';
import { ThemeButton } from './ThemeButton';
import { ThemeText } from './ThemeText';
import { useThemeStore } from '../stores/useThemeStore';

interface AuthButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  onPress, 
  title, 
  disabled = false, 
  loading = false 
}) => {
  const { theme } = useThemeStore();

  return (
    <ThemeButton
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        opacity: (disabled || loading) ? 0.6 : 1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <ThemeText style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        {loading ? `${title}...` : title}
      </ThemeText>
    </ThemeButton>
  );
};