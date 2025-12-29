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

// export const RegisterScreen: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();
//   const { theme } = useThemeStore();
//   const { setUser, setAuthentication, setLoading: setAppLoading } = useAppStore();

//   const styles = createAuthStyles(theme);

//   const handleRegister = async () => {
//     if (!name || !email || !password || !confirmPassword) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (!email.includes('@')) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password should be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     setAppLoading(true);

//     try {
//       const user = await authService.signUp(email, password, name);
//       setUser(user);
//       setAuthentication(true);
//       Alert.alert('Success', 'Account created successfully! Welcome to Prana! 🎉');
//     } catch (error: any) {
//       let errorMessage = 'Registration failed. Please try again.';
      
//       if (error.code === 'auth/email-already-in-use') {
//         errorMessage = 'An account with this email already exists.';
//       } else if (error.code === 'auth/invalid-email') {
//         errorMessage = 'Invalid email address.';
//       } else if (error.code === 'auth/weak-password') {
//         errorMessage = 'Password is too weak.';
//       } else if (error.code === 'auth/network-request-failed') {
//         errorMessage = 'Network error. Please check your connection.';
//       }
      
//       Alert.alert('Registration Failed', errorMessage);
//     } finally {
//       setLoading(false);
//       setAppLoading(false);
//     }
//   };

//   const handleNavigateToLogin = () => {
//     navigation.navigate('Login' as never);
//   };

//   const isFormValid = name && email && password && confirmPassword;

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.formContainer}>
//           {/* Header */}
//           <View style={styles.header}>
//             <ThemeText variant="h1" style={{ marginBottom: 10, color: theme.colors.primary }}>
//               Join Prana
//             </ThemeText>
//             <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
//               Start your fitness journey today
//             </ThemeText>
//           </View>

//           {/* Form */}
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             placeholderTextColor={theme.colors.text.secondary}
//             value={name}
//             onChangeText={setName}
//             autoComplete="name"
//           />
          
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
//             autoComplete="password-new"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             placeholderTextColor={theme.colors.text.secondary}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry
//             autoComplete="password-new"
//           />
          
//           <TouchableOpacity 
//             style={[
//               styles.button,
//               styles.buttonRegister,
//               (!isFormValid || loading) && styles.buttonDisabled
//             ]}
//             onPress={handleRegister}
//             disabled={!isFormValid || loading}
//           >
//             <ThemeText style={styles.buttonText}>
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </ThemeText>
//           </TouchableOpacity>

//           {/* Footer */}
//           <View style={styles.footer}>
//             <ThemeText style={styles.footerText}>Already have an account?</ThemeText>
//             <TouchableOpacity onPress={handleNavigateToLogin}>
//               <ThemeText style={styles.footerLink}>Sign In</ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
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
  Platform,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../../shared/stores/useThemeStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { authService } from '../../../shared/services/AuthService';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeButton } from '../../../shared/ui/ThemeButton';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createAuthStyles } from '../styles/authStyles';

export const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState<'member' | 'gym_owner'>('member'); // ADDED: user type state
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const { setUser, setAuthentication, setLoading: setAppLoading } = useAppStore();

  const styles = createAuthStyles(theme);

  const handleRegister = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
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

    // Phone validation for gym owners
    if (userType === 'gym_owner' && !phoneNumber) {
      Alert.alert('Error', 'Phone number is required for gym owners');
      return;
    }

    setLoading(true);
    setAppLoading(true);

    try {
      const user = await authService.signUp(email, password, name, userType, phoneNumber);
      setUser(user);
      setAuthentication(true);
      
      // Show different success messages based on user type
      if (userType === 'gym_owner') {
        Alert.alert(
          'Welcome Gym Owner! 🏋️‍♂️',
          'Your gym owner account has been created successfully! Next, set up your gym profile.'
        );
      } else {
        Alert.alert('Success', 'Account created successfully! Welcome to PranaFit! 🎉');
      }
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

  const isFormValid = name && email && password && confirmPassword && 
    (userType === 'member' || (userType === 'gym_owner' && phoneNumber));

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Header */}
          <View style={styles.header}>
            <ThemeText variant="h1" style={{ marginBottom: 10, color: theme.colors.primary }}>
              Join PranaFit
            </ThemeText>
            <ThemeText variant="body" style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
              Start your fitness journey today
            </ThemeText>
          </View>

          {/* User Type Selection - ADDED */}
          <View style={localStyles.userTypeContainer}>
            <ThemeText variant="body" style={{ marginBottom: 12, color: theme.colors.text.primary }}>
              I want to join as:
            </ThemeText>
            <View style={localStyles.userTypeButtons}>
              <TouchableOpacity
                style={[
                  localStyles.userTypeButton,
                  userType === 'member' && localStyles.userTypeButtonActive,
                  { borderColor: theme.colors.primary }
                ]}
                onPress={() => setUserType('member')}
              >
                <ThemeText 
                  style={[
                    localStyles.userTypeButtonText,
                    userType === 'member' && localStyles.userTypeButtonTextActive,
                    { color: userType === 'member' ? '#FFFFFF' : theme.colors.primary }
                  ]}
                >
                  👤 Member
                </ThemeText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  localStyles.userTypeButton,
                  userType === 'gym_owner' && localStyles.userTypeButtonActive,
                  { borderColor: theme.colors.primary }
                ]}
                onPress={() => setUserType('gym_owner')}
              >
                <ThemeText 
                  style={[
                    localStyles.userTypeButtonText,
                    userType === 'gym_owner' && localStyles.userTypeButtonTextActive,
                    { color: userType === 'gym_owner' ? '#FFFFFF' : theme.colors.primary }
                  ]}
                >
                  🏋️‍♂️ Gym Owner
                </ThemeText>
              </TouchableOpacity>
            </View>
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
          
          {userType === 'gym_owner' && (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={theme.colors.text.secondary}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          )}
          
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
              {loading ? 'Creating Account...' : 
                userType === 'gym_owner' ? 'Create Gym Owner Account' : 'Create Member Account'}
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

// Local styles for user type selection
const localStyles = StyleSheet.create({
  userTypeContainer: {
    marginBottom: 24,
  },
  userTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  userTypeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  userTypeButtonTextActive: {
    color: '#FFFFFF',
  },
});