// UPDATE: src/features/gym/components/GymInvitationScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { invitationService } from '../../../shared/services/InvitationService';
import { PermissionService } from '../../../shared/services/PermissionService';
import { useGymStore } from '../stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import { 
  UserSearchResult, 
  InvitationRole, 
  InvitationFormData,
} from '../../../shared/types/domain/core/invitation';
import { createGymInvitationStyles } from '../styles/gymInvitationStyles';

interface GymInvitationScreenProps {
  visible: boolean;
  onClose: () => void;
}

export const GymInvitationScreen: React.FC<GymInvitationScreenProps> = ({ visible, onClose }) => {
  const { theme } = useEnhancedTheme();
  const gymStore = useGymStore();
  const appStore = useAppStore();
  const { currentGymRole } = useUserRole();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null);
  const [selectedRole, setSelectedRole] = useState<InvitationRole>('member');
  const [isSending, setIsSending] = useState(false);
  
  const currentGym = gymStore.currentGym;
  const currentUser = appStore.user;
  const inviterRole = currentGymRole || 'member';
  
  const styles = createGymInvitationStyles(theme);
  
  // Get invitable roles based on current user's role
  const invitableRoles = PermissionService.getInvitableRoles(inviterRole);

  // Reset form when modal closes
  useEffect(() => {
    if (!visible) {
      setSearchTerm('');
      setSearchResults([]);
      setSelectedUser(null);
      setSelectedRole('member');
      setIsSending(false);
    }
  }, [visible]);

  // Auto-search when typing (with debounce)
  useEffect(() => {
    if (!visible) return;
    
    const searchTimeout = setTimeout(async () => {
      if (searchTerm.trim().length >= 2 && !selectedUser) {
        await performSearch();
      } else if (searchTerm.trim().length === 0) {
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(searchTimeout);
  }, [searchTerm, selectedUser, visible]);

  const performSearch = async () => {
    if (!currentGym?.id || searchTerm.trim().length < 2) return;
    
    setIsSearching(true);
    try {
      const results = await invitationService.searchUsers(searchTerm, currentGym.id);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search users');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUserSelect = (user: UserSearchResult) => {
    if (user.isAlreadyMember) {
      Alert.alert(
        'Already a Member',
        `${user.displayName} is already a ${user.existingRole} at this gym.`
      );
      return;
    }
    
    setSelectedUser(user);
    // Default to member role if inviter is staff, otherwise first available role
    if (inviterRole === 'staff') {
      setSelectedRole('member');
    } else if (invitableRoles.length > 0) {
      setSelectedRole(invitableRoles[0]);
    }
  };

  const handleRoleSelect = (role: InvitationRole) => {
    setSelectedRole(role);
  };

  const handleSendInvitation = async () => {
    if (!selectedUser || !currentGym || !currentUser) return;
    
    // Validate permission
    if (!PermissionService.canInviteRole(inviterRole, selectedRole)) {
      Alert.alert(
        'Permission Denied',
        `You don't have permission to invite ${selectedRole}s`
      );
      return;
    }
    
    // Show confirmation for member invitations
    if (selectedRole === 'member') {
      Alert.alert(
        'Send Member Invitation',
        `Send invitation to ${selectedUser.displayName} to join as a member? They will provide their information when accepting.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Send Invitation',
            style: 'default',
            onPress: async () => {
              await sendInvitation();
            }
          }
        ]
      );
    } else {
      await sendInvitation();
    }
  };

  const sendInvitation = async () => {
    if (!selectedUser || !currentGym || !currentUser) return;
    
    setIsSending(true);
    
    try {
      const formData: InvitationFormData = {
        invitedUserId: selectedUser.id,
        role: selectedRole,
        // ✅ REMOVED: No optional message
      };
      
      const result = await invitationService.sendInvitation(
        currentGym.id,
        formData,
        currentUser.id,
        currentUser.displayName || currentUser.email.split('@')[0],
        inviterRole
      );
      
      if (result.success) {
        Alert.alert(
          '✅ Invitation Sent!',
          `Invitation sent to ${selectedUser.displayName} as ${selectedRole}`,
          [
            {
              text: 'OK',
              onPress: () => {
                onClose();
              }
            }
          ]
        );
      } else {
        Alert.alert('❌ Error', result.error || 'Failed to send invitation');
      }
    } catch (error: any) {
      console.error('Invitation error:', error);
      Alert.alert('❌ Error', 'Failed to send invitation. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const renderSearchResult = ({ item }: { item: UserSearchResult }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleUserSelect(item)}
      disabled={item.isAlreadyMember}
    >
      <View style={styles.resultAvatar}>
        <ThemeText style={styles.avatarText}>
          {item.displayName.charAt(0).toUpperCase()}
        </ThemeText>
      </View>
      
      <View style={styles.resultContent}>
        <View style={styles.resultInfo}>
          <ThemeText style={styles.resultName}>
            {item.displayName}
          </ThemeText>
          <ThemeText style={styles.resultEmail}>
            {item.email}
          </ThemeText>
        </View>
        
        {item.isAlreadyMember ? (
          <View style={styles.alreadyMemberBadge}>
            <ThemeText style={styles.alreadyMemberText}>
              {item.existingRole}
            </ThemeText>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRoleOption = (role: InvitationRole, title: string, description: string) => {
    const isSelected = selectedRole === role;
    const isAllowed = PermissionService.canInviteRole(inviterRole, role);
    
    return (
      <TouchableOpacity
        style={[
          styles.roleOption,
          { 
            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
            backgroundColor: isSelected ? theme.colors.primary + '10' : theme.colors.card,
            opacity: isAllowed ? 1 : 0.5
          }
        ]}
        onPress={() => isAllowed && handleRoleSelect(role)}
        disabled={!isAllowed || !selectedUser}
      >
        <View style={styles.roleHeader}>
          <ThemeText style={[
            styles.roleTitle,
            { color: isSelected ? theme.colors.primary : theme.colors.text.primary }
          ]}>
            {title}
          </ThemeText>
          
          {isSelected && (
            <View style={[
              styles.selectedDot,
              { backgroundColor: theme.colors.primary }
            ]} />
          )}
        </View>
        
        <ThemeText style={styles.roleDescription}>
          {description}
        </ThemeText>
        
        {!isAllowed && (
          <ThemeText style={[styles.notAllowedText, { color: theme.colors.warning }]}>
            Requires {inviterRole === 'staff' ? 'owner' : 'owner or staff'} permission
          </ThemeText>
        )}
        
        {/* Special note for member role */}
        {role === 'member' && isAllowed && (
          <ThemeText style={{
            fontSize: 12,
            color: theme.colors.text.secondary,
            marginTop: 8,
            fontStyle: 'italic',
            backgroundColor: `${theme.colors.primary}05`,
            padding: 8,
            borderRadius: 6,
          }}>
            👤 User will provide their information when accepting the invitation
          </ThemeText>
        )}
      </TouchableOpacity>
    );
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <ThemeView style={styles.container}>
        <StatusBar 
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onClose}
              disabled={isSending}
            >
              <ThemeText style={[styles.backArrow, { color: theme.colors.primary }]}>
                ←
              </ThemeText>
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <ThemeText style={styles.headerTitle}>
                Invite to {currentGym?.name || 'Gym'}
              </ThemeText>
            </View>
            
            <View style={styles.headerSpacer} />
          </View>
        </SafeAreaView>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <ThemeText style={styles.welcomeTitle}>
                Invite Users to Join
              </ThemeText>
              <ThemeText style={styles.welcomeText}>
                {selectedUser 
                  ? `Inviting ${selectedUser.displayName}`
                  : 'Search for users by name or email address'}
              </ThemeText>
              
              {/* Info note for member invitations */}
              {selectedRole === 'member' && selectedUser && (
                <ThemeText style={{
                  fontSize: 13,
                  color: theme.colors.text.secondary,
                  textAlign: 'center',
                  marginTop: 12,
                  padding: 12,
                  backgroundColor: `${theme.colors.primary}05`,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: `${theme.colors.primary}20`,
                }}>
                  ℹ️ Members will provide their own information (emergency contact, etc.) when accepting the invitation
                </ThemeText>
              )}
            </View>
            
            {/* Search Section (only show if no user selected) */}
            {!selectedUser ? (
              <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                  <Ionicons 
                    name="search" 
                    size={20} 
                    color={theme.colors.text.secondary} 
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search users..."
                    placeholderTextColor={theme.colors.text.secondary}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    onSubmitEditing={performSearch}
                    editable={!isSending}
                  />
                </View>
                
                <ThemeText style={styles.searchHint}>
                  Type at least 2 characters to search
                </ThemeText>
              </View>
            ) : (
              /* Selected User Info */
              <View style={styles.userInfoCard}>
                <View style={styles.userInfoHeader}>
                  <View style={styles.userAvatar}>
                    <ThemeText style={styles.userAvatarText}>
                      {selectedUser.displayName.charAt(0).toUpperCase()}
                    </ThemeText>
                  </View>
                  
                  <View style={styles.userDetails}>
                    <ThemeText style={styles.userName}>
                      {selectedUser.displayName}
                    </ThemeText>
                    <ThemeText style={styles.userEmail}>
                      {selectedUser.email}
                    </ThemeText>
                  </View>
                  
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUser(null);
                    }}
                    disabled={isSending}
                  >
                    <Ionicons name="close" size={20} color={theme.colors.text.secondary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            {/* Search Results */}
            {isSearching ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <ThemeText style={styles.loadingText}>
                  Searching users...
                </ThemeText>
              </View>
            ) : searchResults.length > 0 && !selectedUser ? (
              <View style={styles.resultsContainer}>
                <ThemeText style={styles.resultsTitle}>
                  Search Results
                </ThemeText>
                <FlatList
                  data={searchResults}
                  renderItem={renderSearchResult}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              </View>
            ) : searchTerm.length >= 2 && !isSearching && !selectedUser ? (
              <View style={styles.emptyState}>
                <Ionicons 
                  name="person-outline" 
                  size={48} 
                  color={theme.colors.text.secondary} 
                />
                <ThemeText style={styles.emptyStateText}>
                  No users found matching "{searchTerm}"
                </ThemeText>
              </View>
            ) : null}

            {/* Role Selection (Only shown when user is selected) */}
            {selectedUser && (
              <View style={styles.roleSection}>
                <ThemeText style={styles.sectionTitle}>
                  Select Role
                </ThemeText>
                
                {/* Owner Role */}
                {invitableRoles.includes('owner') && renderRoleOption(
                  'owner',
                  'Gym Owner',
                  'Full access to all gym features, can invite all roles, manage staff and trainers'
                )}
                
                {/* Staff Role */}
                {invitableRoles.includes('staff') && renderRoleOption(
                  'staff',
                  'Gym Staff',
                  'Can manage members, record payments, invite members (max 500)'
                )}
                
                {/* Trainer Role */}
                {invitableRoles.includes('trainer') && renderRoleOption(
                  'trainer',
                  'Gym Trainer',
                  'Can view assigned clients, track workouts, cannot invite anyone'
                )}
                
                {/* Member Role */}
                {invitableRoles.includes('member') && renderRoleOption(
                  'member',
                  'Gym Member',
                  'Regular member with workout access, can check-in, view own progress. User provides information at acceptance.'
                )}
                
                {/* Permission Note */}
                {inviterRole === 'staff' && (
                  <View style={{ marginTop: 16 }}>
                    <ThemeText style={{ 
                      fontSize: 12, 
                      color: theme.colors.text.secondary,
                      fontStyle: 'italic'
                    }}>
                      ⓘ As staff, you can only invite members (max 500 total)
                    </ThemeText>
                  </View>
                )}
              </View>
            )}
            
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Footer with Send Button (Only shown when user is selected) */}
        {selectedUser && (
          <SafeAreaView style={styles.footerSafeArea} edges={['bottom']}>
            <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
              <View style={styles.selectionActions}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => {
                    setSelectedUser(null);
                  }}
                  disabled={isSending}
                >
                  <ThemeText style={styles.cancelButtonText}>
                    Cancel
                  </ThemeText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.sendButton,
                    (isSending || !PermissionService.canInviteRole(inviterRole, selectedRole)) && 
                    styles.sendButtonDisabled
                  ]}
                  onPress={handleSendInvitation}
                  disabled={isSending || !PermissionService.canInviteRole(inviterRole, selectedRole)}
                >
                  {isSending ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <ThemeText style={[
                      styles.sendButtonText,
                      (!PermissionService.canInviteRole(inviterRole, selectedRole)) && 
                      styles.sendButtonTextDisabled
                    ]}>
                      Send Invitation
                    </ThemeText>
                  )}
                </TouchableOpacity>
              </View>
              
              {/* Info note for member invitations */}
              {selectedRole === 'member' && (
                <ThemeText style={{
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  textAlign: 'center',
                  marginTop: 8,
                  fontStyle: 'italic',
                }}>
                  ⓘ User will provide emergency contact and other details when accepting
                </ThemeText>
              )}
            </View>
          </SafeAreaView>
        )}
      </ThemeView>
    </Modal>
  );
};

export default GymInvitationScreen;