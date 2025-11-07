import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { authService } from '../../../shared/services/AuthService';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { createAuthStyles } from '../styles/authStyles';

export const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const { setUser, setAuthentication, setLoading: setAppLoading } = useAppStore();

  const styles = createAuthStyles(theme);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    setAppLoading(true);

    try {
      const user = await authService.signUp(email, password, name);
      setUser(user);
      setAuthentication(true);
      Alert.alert('Success', 'Account created successfully! Welcome to Prana! 🎉');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
      setAppLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  const isFormValid = name && email && password && confirmPassword;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          {/* Header */}
          <View style={styles.header}>
            <ThemeText variant="h1" style={{ marginBottom: 10, color: theme.colors.primary }}>
              Join Prana
            </ThemeText>
            <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
              Start your fitness journey today
            </ThemeText>
          </View>

          {/* Form */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={theme.colors.text.secondary}
            value={name}
            onChangeText={setName}
            autoComplete="name"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.text.secondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.text.secondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password-new"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.text.secondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoComplete="password-new"
          />
          
          <TouchableOpacity 
            style={[
              styles.button,
              styles.buttonRegister,
              (!isFormValid || loading) && styles.buttonDisabled
            ]}
            onPress={handleRegister}
            disabled={!isFormValid || loading}
          >
            <ThemeText style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </ThemeText>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemeText style={styles.footerText}>Already have an account?</ThemeText>
            <TouchableOpacity onPress={handleNavigateToLogin}>
              <ThemeText style={styles.footerLink}>Sign In</ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};