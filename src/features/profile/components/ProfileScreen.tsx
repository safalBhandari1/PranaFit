// src/features/profile/components/ProfileScreen.tsx - UPDATED VERSION
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { authService } from '../../../shared/services/AuthService';
import { invitationService } from '../../../shared/services/InvitationService';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { createProfileStyles } from '../styles/profileStyles';
import { createProfileGymStyles } from '../styles/profileGymStyles';
import { GymSwitcher } from './GymSwitcher';
import { GymSwitcherModal } from './GymSwitcherModal';
// import { PendingInvitationsModal } from './PendingInvitationsModal';
import PendingInvitationsModal from './PendingInvitationsModal'; // Default export

import GymOnboardingScreen from '../../gym/components/GymOnboardingScreen';

export const ProfileScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { user, setUser, setAuthentication } = useAppStore();
  const { 
    isGymBusinessUser, 
    isPayingMemberUser, 
    shouldShowGymSection,
    shouldShowBusinessOptions,
    hasMultipleGyms,
    hasGymAccess,
    currentGym,
    currentGymRole
  } = useUserRole();
  const navigation = useNavigation();
  
  const [showGymSwitcher, setShowGymSwitcher] = useState(false);
  const [showCreateGym, setShowCreateGym] = useState(false);
  const [showInvitationsModal, setShowInvitationsModal] = useState(false);
  const [pendingInvitationsCount, setPendingInvitationsCount] = useState(0);

  const styles = createProfileStyles(theme);
  const gymStyles = createProfileGymStyles(theme);

  // Check for pending invitations
  useEffect(() => {
    const checkPendingInvitations = async () => {
      if (user?.id) {
        try {
          const invitations = await invitationService.getUserPendingInvitations(user.id);
          setPendingInvitationsCount(invitations.length);
        } catch (error) {
          console.error('Error checking pending invitations:', error);
        }
      }
    };

    checkPendingInvitations();
    
    // Check every 30 seconds for new invitations
    const interval = setInterval(checkPendingInvitations, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // ============ EVENT HANDLERS ============
  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setAuthentication(false);
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
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: handleSignOut },
      ]
    );
  };

  const handleComingSoon = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} will be available in the next update!`);
  };

  const handleJoinGym = () => {
    Alert.alert(
      'Join a Gym',
      'This feature is coming soon! You will be able to browse and join gyms in your area.',
      [{ text: 'OK' }]
    );
  };

  const handleCreateGym = () => {
    setShowCreateGym(true);
  };

  const handleGymCreated = () => {
    setShowCreateGym(false);
    Alert.alert(
      '🎉 Gym Created!',
      'Your gym has been created successfully. You can now manage it from the dashboard.',
      [{ text: 'Got it' }]
    );
  };

  // ============ RENDER GYM MANAGEMENT SECTION ============
  const renderGymManagementSection = () => {
    if (!shouldShowGymSection()) {
      return null;
    }

    return (
      <View style={gymStyles.gymManagementSection}>
        {/* Section Title */}
        <ThemeText style={gymStyles.sectionTitle}>
          🏢 Gym Management
        </ThemeText>

        {/* Current Gym Card with Switcher */}
        {currentGym && (
          <GymSwitcher onPress={() => setShowGymSwitcher(true)} />
        )}

        {/* Action Buttons */}
        <View style={gymStyles.gymActionButtons}>
          {/* Switch Gym Button */}
          {hasMultipleGyms && (
            <TouchableOpacity
              style={gymStyles.gymActionButton}
              onPress={() => setShowGymSwitcher(true)}
            >
              <Ionicons 
                name="swap-vertical" 
                size={20} 
                color={theme.colors.primary}
                style={gymStyles.gymActionIcon}
              />
              <ThemeText style={[gymStyles.gymActionText, gymStyles.gymActionTextSecondary]}>
                Switch Gym
              </ThemeText>
            </TouchableOpacity>
          )}

          {/* Create New Gym Button */}
          {isGymBusinessUser() && (
            <TouchableOpacity
              style={[gymStyles.gymActionButton, gymStyles.gymActionButtonPrimary]}
              onPress={handleCreateGym}
            >
              <Ionicons 
                name="add" 
                size={20} 
                color="#FFFFFF"
                style={gymStyles.gymActionIcon}
              />
              <ThemeText style={[gymStyles.gymActionText, gymStyles.gymActionTextPrimary]}>
                New Gym
              </ThemeText>
            </TouchableOpacity>
          )}

          {/* Join Gym Button (for non-business users with gym access) */}
          {!isGymBusinessUser() && hasGymAccess && (
            <TouchableOpacity
              style={gymStyles.gymActionButton}
              onPress={handleJoinGym}
            >
              <Ionicons 
                name="person-add" 
                size={20} 
                color={theme.colors.primary}
                style={gymStyles.gymActionIcon}
              />
              <ThemeText style={[gymStyles.gymActionText, gymStyles.gymActionTextSecondary]}>
                Join Gym
              </ThemeText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ============ RENDER GYM ACCESS SECTION (for members) ============
  const renderGymAccessSection = () => {
    if (!isPayingMemberUser() || isGymBusinessUser()) {
      return null;
    }

    return (
      <View style={gymStyles.gymAccessSection}>
        <View style={gymStyles.gymAccessHeader}>
          <Ionicons 
            name="key" 
            size={24} 
            color={theme.colors.primary}
            style={gymStyles.gymAccessIcon}
          />
          <ThemeText style={gymStyles.gymAccessTitle}>
            Your Gym Access
          </ThemeText>
        </View>

        <ThemeText style={gymStyles.gymAccessDescription}>
          You have access to {currentGym?.name || 'a gym'}. 
          Manage your membership and check-in history.
        </ThemeText>

        <TouchableOpacity
          style={gymStyles.joinGymButton}
          onPress={handleJoinGym}
        >
          <Ionicons 
            name="add-circle" 
            size={20} 
            color={theme.colors.primary}
          />
          <ThemeText style={gymStyles.joinGymText}>
            Join Another Gym
          </ThemeText>
        </TouchableOpacity>
      </View>
    );
  };

  // ============ RENDER NO GYM SECTION ============
  const renderNoGymSection = () => {
    if (shouldShowGymSection()) {
      return null;
    }

    return (
      <View style={gymStyles.noGymSection}>
        <Ionicons 
          name="business-outline" 
          size={48} 
          color={theme.colors.primary}
          style={gymStyles.noGymIcon}
        />
        <ThemeText style={gymStyles.noGymTitle}>
          No Gym Access Yet
        </ThemeText>
        <ThemeText style={gymStyles.noGymDescription}>
          You can create your own gym business or join an existing gym to get started with gym features.
        </ThemeText>
        
        <TouchableOpacity
          style={gymStyles.createGymButton}
          onPress={handleCreateGym}
        >
          <Ionicons 
            name="add" 
            size={20} 
            color="#FFFFFF"
          />
          <ThemeText style={gymStyles.createGymText}>
            Create My Gym
          </ThemeText>
        </TouchableOpacity>
      </View>
    );
  };

  // ============ RENDER ACCOUNT SECTION WITH NOTIFICATION BADGE ============
  const renderAccountSection = () => {
    return (
      <>
        {/* Account Header with Notification Badge */}
        <View style={[styles.sectionHeader, { paddingHorizontal: theme.spacing.md }]}>
          <ThemeText variant="h3" style={styles.sectionTitle}>
            Account
          </ThemeText>
          
          {pendingInvitationsCount > 0 && (
            <TouchableOpacity 
              onPress={() => setShowInvitationsModal(true)}
              style={{
                position: 'relative',
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Ionicons 
                name="mail" 
                size={24} 
                color={theme.colors.primary}
              />
              <View style={{
                position: 'absolute',
                top: -4,
                right: 2,
                backgroundColor: theme.colors.warning,
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 4,
                borderWidth: 1.5,
                borderColor: theme.colors.background,
              }}>
                <ThemeText style={{ 
                  color: '#FFFFFF', 
                  fontSize: 10, 
                  fontWeight: 'bold',
                  lineHeight: 12,
                }}>
                  {pendingInvitationsCount > 9 ? '9+' : pendingInvitationsCount}
                </ThemeText>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  return (
    <>
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

          {/* Gym Management Section */}
          {renderGymManagementSection()}

          {/* Gym Access Section (for members) */}
          {renderGymAccessSection()}

          {/* No Gym Section */}
          {renderNoGymSection()}

          {/* Account Actions */}
          {renderAccountSection()}
          
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

      {/* Gym Switcher Modal */}
      <GymSwitcherModal
        visible={showGymSwitcher}
        onClose={() => setShowGymSwitcher(false)}
      />

      {/* Pending Invitations Modal */}
      <PendingInvitationsModal
        visible={showInvitationsModal}
        onClose={() => {
          setShowInvitationsModal(false);
          // Refresh invitation count when modal closes
          if (user?.id) {
            invitationService.getUserPendingInvitations(user.id)
              .then(invitations => setPendingInvitationsCount(invitations.length))
              .catch(console.error);
          }
        }}
      />

      {/* Create Gym Modal */}
      <Modal
        animationType="slide"
        visible={showCreateGym}
        onRequestClose={() => setShowCreateGym(false)}
      >
        <GymOnboardingScreen 
          onComplete={handleGymCreated}
          onCancel={() => setShowCreateGym(false)}
        />
      </Modal>
    </>
  );
};