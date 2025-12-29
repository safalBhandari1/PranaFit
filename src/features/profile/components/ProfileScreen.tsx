import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { authService } from '../../../shared/services/AuthService';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createProfileStyles } from '../styles/profileStyles';

export const ProfileScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { user, setUser, setAuthentication } = useAppStore();
  const navigation = useNavigation();
  
  const styles = createProfileStyles(theme);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setAuthentication(false);
      // Navigate to login screen
      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleConfirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: handleSignOut,
        },
      ]
    );
  };

  const handleComingSoon = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} will be available in the next update!`);
  };

  return (
    <ThemeView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with User Info */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons 
              name="person" 
              size={50} 
              color={theme.colors.primary} 
            />
          </View>
          
          <ThemeText variant="h2" style={styles.userName}>
            {user?.displayName || 'User'}
          </ThemeText>
          
          <ThemeText variant="body" color="secondary" style={styles.userEmail}>
            {user?.email}
          </ThemeText>
          
          {user?.role && (
            <View style={styles.userRole}>
              <ThemeText style={styles.userRoleText}>
                {user.role.replace('_', ' ').toUpperCase()}
              </ThemeText>
            </View>
          )}
        </View>

        {/* Account Actions */}
        <ThemeText variant="h3" style={styles.sectionTitle}>
          Account
        </ThemeText>
        
        <ThemeView style={styles.actionCard}>
          {/* Edit Profile */}
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => handleComingSoon('Edit Profile')}
          >
            <Ionicons 
              name="create-outline" 
              size={24} 
              color={theme.colors.text.primary}
              style={styles.actionIcon}
            />
            <ThemeText variant="body" style={styles.actionText}>
              Edit Profile
            </ThemeText>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.text.secondary}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => handleComingSoon('Settings')}
          >
            <Ionicons 
              name="settings-outline" 
              size={24} 
              color={theme.colors.text.primary}
              style={styles.actionIcon}
            />
            <ThemeText variant="body" style={styles.actionText}>
              Settings
            </ThemeText>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.text.secondary}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          {/* Theme Toggle */}
          <TouchableOpacity 
            style={[styles.actionItem, { borderBottomWidth: 0 }]}
            onPress={() => handleComingSoon('Theme Settings')}
          >
            <Ionicons 
              name="color-palette-outline"
              size={24} 
              color={theme.colors.text.primary}
              style={styles.actionIcon}
            />
            <ThemeText variant="body" style={styles.actionText}>
              Appearance
            </ThemeText>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.text.secondary}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </ThemeView>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleConfirmSignOut}
        >
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color={theme.colors.semantic.info}
          />
          <ThemeText style={styles.signOutText}>
            Sign Out
          </ThemeText>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <ThemeText style={styles.versionText}>
            PranaFit v1.0.0
          </ThemeText>
          <ThemeText style={styles.appNameText}>
            Your Fitness Companion
          </ThemeText>
        </View>
      </ScrollView>
    </ThemeView>
  );
};