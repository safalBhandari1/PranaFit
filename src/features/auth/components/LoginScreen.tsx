// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useThemeStore } from '../../../shared/stores/useThemeStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { authService } from '../../../shared/services/AuthService';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { createAuthStyles } from '../styles/authStyles';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export const LoginScreen: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();
//   const { theme } = useThemeStore();
//   const { setUser, setAuthentication, setLoading: setAppLoading } = useAppStore();

//   const styles = createAuthStyles(theme);

//   const handleEmailLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     if (!email.includes('@')) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     setLoading(true);
//     setAppLoading(true);

//     try {
//       const user = await authService.signIn(email, password);
//       setUser(user);
//       setAuthentication(true);
//     } catch (error: any) {
//       let errorMessage = 'Login failed. Please try again.';
      
//       if (error.code === 'auth/invalid-email') {
//         errorMessage = 'Invalid email address.';
//       } else if (error.code === 'auth/user-not-found') {
//         errorMessage = 'No account found with this email.';
//       } else if (error.code === 'auth/wrong-password') {
//         errorMessage = 'Incorrect password.';
//       } else if (error.code === 'auth/too-many-requests') {
//         errorMessage = 'Too many failed attempts. Please try again later.';
//       }
      
//       Alert.alert('Login Failed', errorMessage);
//     } finally {
//       setLoading(false);
//       setAppLoading(false);
//     }
//   };

//   const handleNavigateToRegister = () => {
//     navigation.navigate('Register' as never);
//   };

//   const isFormValid = email && password;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//           {/* Header */}
//           <View style={styles.header}>
//             <ThemeText style={styles.title}>Welcome to Prana</ThemeText>
//             <ThemeText style={styles.subtitle}>Sign in to continue your fitness journey</ThemeText>
//           </View>

//           {/* Form */}
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor={theme.colors.text.secondary}
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//             keyboardType="email-address"
//             autoComplete="email"
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor={theme.colors.text.secondary}
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             autoComplete="password"
//           />
          
//           <TouchableOpacity 
//             style={[
//               styles.button,
//               styles.buttonDisabled,
//               (!isFormValid || loading) && styles.buttonDisabled
//             ]}
//             onPress={handleEmailLogin}
//             disabled={!isFormValid || loading}
//           >
//             <ThemeText style={styles.buttonText}>
//               {loading ? 'Signing In...' : 'Sign In'}
//             </ThemeText>
//           </TouchableOpacity>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <ThemeText style={styles.footerText}>Don't have an account?</ThemeText>
//             <TouchableOpacity onPress={handleNavigateToRegister}>
//               <ThemeText style={styles.footerLink}>Sign Up</ThemeText>
//             </TouchableOpacity>
//           </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

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

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const { setUser, setAuthentication, setLoading: setAppLoading } = useAppStore();

  const styles = createAuthStyles(theme);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    setAppLoading(true);

    try {
      const user = await authService.signIn(email, password);
      setUser(user);
      setAuthentication(true);
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
      setAppLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register' as never);
  };

  const isFormValid = email && password;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <ThemeText variant="h1" style={{ marginBottom: 10, color: theme.colors.primary }}>
              Welcome to Prana
            </ThemeText>
            <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
              Sign in to continue your fitness journey
            </ThemeText>
          </View>

          {/* Form */}
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
            autoComplete="password"
          />
          
          <TouchableOpacity 
            style={[
              styles.button,
              (!isFormValid || loading) && styles.buttonDisabled
            ]}
            onPress={handleEmailLogin}
            disabled={!isFormValid || loading}
          >
            <ThemeText style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </ThemeText>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemeText style={styles.footerText}>Don't have an account?</ThemeText>
            <TouchableOpacity onPress={handleNavigateToRegister}>
              <ThemeText style={styles.footerLink}>Sign Up</ThemeText>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};