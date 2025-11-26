import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeText } from '../ui/ThemeText';
import { ThemeView } from '../ui/ThemeView';
import { useEnhancedTheme } from '../hooks/useEnhancedTheme';

export const TestThemeScreen: React.FC = () => {
  const { theme, isDark, storeMode, systemPreferred, toggleTheme, setMode } = useEnhancedTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ThemeView padding="md">
        {/* Header */}
        <ThemeText variant="h1" style={{ marginBottom: 20, textAlign: 'center' }}>
          🎨 Theme Test Screen
        </ThemeText>

        {/* Theme Info */}
        <ThemeView 
          backgroundColor="card" 
          padding="lg" 
          borderRadius="md"
        >
          <ThemeText variant="h2">Theme Information</ThemeText>
          <ThemeText>Current Theme: {theme.mode}</ThemeText>
          <ThemeText>Store Mode: {storeMode}</ThemeText>
          <ThemeText>System Preferred: {systemPreferred ? 'YES' : 'NO'}</ThemeText>
          <ThemeText>Is Dark: {isDark ? 'YES' : 'NO'}</ThemeText>
        </ThemeView>

        {/* Theme Controls */}
        <ThemeView 
          backgroundColor="card" 
          padding="lg" 
          borderRadius="md"
        >
          <ThemeText variant="h2">Theme Controls</ThemeText>
          
          <TouchableOpacity 
            style={{ 
              padding: 16, 
              backgroundColor: theme.colors.primary, 
              borderRadius: 8, 
              marginBottom: 10,
              alignItems: 'center'
            }}
            onPress={toggleTheme}
          >
            <ThemeText color="secondary">Toggle Theme</ThemeText>
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
            <TouchableOpacity 
              style={{ 
                flex: 1, 
                padding: 12, 
                backgroundColor: theme.colors.accent, 
                borderRadius: 8,
                alignItems: 'center'
              }}
              onPress={() => setMode('light')}
            >
              <ThemeText>Set Light</ThemeText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ 
                flex: 1, 
                padding: 12, 
                backgroundColor: theme.colors.warning, 
                borderRadius: 8,
                alignItems: 'center'
              }}
              onPress={() => setMode('dark')}
            >
              <ThemeText>Set Dark</ThemeText>
            </TouchableOpacity>
          </View>
        </ThemeView>

        {/* Color Test Sections */}
        <ThemeView 
          backgroundColor="primary" 
          padding="md" 
          borderRadius="sm"
        >
          <ThemeText color="secondary">Primary Color</ThemeText>
        </ThemeView>

        <ThemeView 
          backgroundColor="accent" 
          padding="md" 
          borderRadius="sm"
        >
          <ThemeText>Accent Color</ThemeText>
        </ThemeView>

        <ThemeView 
          backgroundColor="card" 
          padding="md" 
          borderRadius="sm"
        >
          <ThemeText>Card Color</ThemeText>
        </ThemeView>

        <ThemeView 
          style={{ 
            borderWidth: 1, 
            borderColor: theme.colors.border,
            padding: 16, 
            borderRadius: 8,
            marginBottom: 16
          }}
        >
          <ThemeText>Border Color Test</ThemeText>
        </ThemeView>

        {/* Text Variants Test */}
        <ThemeView 
          backgroundColor="card" 
          padding="lg" 
          borderRadius="md"
        >
          <ThemeText variant="h2">Text Variants</ThemeText>
          <ThemeText variant="h1">Heading 1 Text</ThemeText>
          <ThemeText variant="h2">Heading 2 Text</ThemeText>
          <ThemeText variant="h3">Heading 3 Text</ThemeText>
          <ThemeText variant="body">Body Text</ThemeText>
          <ThemeText variant="caption">Caption Text</ThemeText>
          <ThemeText variant="small">Small Text</ThemeText>
        </ThemeView>

        {/* Color Variants Test */}
        <ThemeView 
          backgroundColor="card" 
          padding="lg" 
          borderRadius="md"
        >
          <ThemeText variant="h2">Color Variants</ThemeText>
          <ThemeText color="primary">Primary Text</ThemeText>
          <ThemeText color="secondary">Secondary Text</ThemeText>
          <ThemeText color="accent">Accent Text</ThemeText>
          <ThemeText color="warning">Warning Text</ThemeText>
          <ThemeText color="success">Success Text</ThemeText>
          <ThemeText color="info">Info Text</ThemeText>
        </ThemeView>

        {/* Spacing Test */}
        <ThemeView 
          backgroundColor="card" 
          padding="lg" 
          borderRadius="md"
        >
          <ThemeText variant="h2">Spacing Test</ThemeText>
          <ThemeView padding="sm" backgroundColor="primary">
            <ThemeText color="secondary">Small Padding</ThemeText>
          </ThemeView>
          <ThemeView padding="md" backgroundColor="accent">
            <ThemeText>Medium Padding</ThemeText>
          </ThemeView>
          <ThemeView padding="lg" backgroundColor="warning">
            <ThemeText>Large Padding</ThemeText>
          </ThemeView>
        </ThemeView>
      </ThemeView>
    </ScrollView>
  );
};