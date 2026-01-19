// UPDATE: src/features/profile/components/PendingInvitationsModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { invitationService } from '../../../shared/services/InvitationService';
import { gymService } from '../../../shared/services/GymService';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import { GymInvitation } from '../../../shared/types/domain/core/invitation';
import { MemberAcceptanceForm } from './MemberAcceptanceForm';

interface PendingInvitationsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PendingInvitationsModal: React.FC<PendingInvitationsModalProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useEnhancedTheme();
  const { user } = useAppStore();
  
  const [invitations, setInvitations] = useState<GymInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [selectedInvitation, setSelectedInvitation] = useState<GymInvitation | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  // Load pending invitations
  useEffect(() => {
    if (visible && user) {
      loadPendingInvitations();
    }
  }, [visible, user]);

  const loadPendingInvitations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const pendingInvites = await invitationService.getUserPendingInvitations(user.id);
      setInvitations(pendingInvites);
    } catch (error) {
      console.error('Error loading invitations:', error);
      Alert.alert('Error', 'Failed to load invitations');
    } finally {
      setLoading(false);
    }
  };

  // Handle accepting invitation
  const handleAcceptInvitation = async (invitation: GymInvitation) => {
    if (!user) return;
    
    console.log('🎯 handleAcceptInvitation called:', { 
      role: invitation.role, 
      invitationId: invitation.id,
      user: user.id 
    });
    
    // For member invitations, show form in SAME modal
    if (invitation.role === 'member') {
      console.log('📋 Member invitation detected, showing form...');
      setSelectedInvitation(invitation);
      setShowMemberForm(true);
      return;
    }
    
    // For non-member roles (owner, staff, trainer)
    setProcessing(invitation.id);
    
    try {
      // 1. Accept the invitation in the invitation service
      const result = await invitationService.acceptInvitation(invitation.id, user.id);
      
      if (result.success && result.invitation) {
        // For non-member roles, use existing method
        await gymService.addUserToGymWithRole(
          invitation.gymId,
          user.id,
          invitation.role,
          `${invitation.role.toUpperCase()}_${invitation.gymName.toUpperCase().replace(/\s/g, '_')}_${user.id.slice(0, 4)}`
        );
        
        Alert.alert(
          '✅ Invitation Accepted!',
          `You are now a ${invitation.role} at ${invitation.gymName}`,
          [{ text: 'OK' }]
        );
        
        // Update local state
        setInvitations(prev => prev.filter(inv => inv.id !== invitation.id));
        
        // If this is user's first gym, set it as current
        if (!user.currentGymId) {
          useAppStore.getState().setCurrentGymId(invitation.gymId);
        }
      } else {
        Alert.alert('❌ Error', result.error || 'Failed to accept invitation');
      }
    } catch (error: any) {
      console.error('Error accepting invitation:', error);
      Alert.alert('❌ Error', error.message || 'Failed to accept invitation');
    } finally {
      setProcessing(null);
    }
  };

  // Handle member form submission
  const handleMemberFormSubmit = async (memberData: any) => {
    console.log('🎯 DEBUG START =================');
    console.log('1. Selected Invitation:', selectedInvitation?.id);
    console.log('2. User ID:', user?.id);
    console.log('3. Member Data keys:', Object.keys(memberData));
    console.log('4. gymService object:', gymService);
    console.log('5. gymService type:', typeof gymService);
    
    // Check ALL methods
    console.log('6. All methods on gymService:');
    const proto = Object.getPrototypeOf(gymService);
    console.log(Object.getOwnPropertyNames(proto));
    
    console.log('7. Has createMemberFromInvitation?', 
      'createMemberFromInvitation' in gymService);
    console.log('🎯 DEBUG END =================');
    if (!selectedInvitation || !user) return;
    
    setProcessing(selectedInvitation.id);
    
    try {
      // 1. First, accept the invitation
      const acceptanceResult = await invitationService.acceptInvitation(selectedInvitation.id, user.id);
      
      if (!acceptanceResult.success) {
        throw new Error(acceptanceResult.error || 'Failed to accept invitation');
      }
      
      // 2. Create member with USER-PROVIDED data
      await gymService.createMemberFromInvitation(selectedInvitation, user.id, memberData);
      
      Alert.alert(
        '✅ Welcome to the Gym!',
        `You are now a member at ${selectedInvitation.gymName} with complete member profile.`,
        [{ text: 'OK' }]
      );
      
      // Update local state
      setInvitations(prev => prev.filter(inv => inv.id !== selectedInvitation.id));
      setShowMemberForm(false);
      setSelectedInvitation(null);
      
      // If this is user's first gym, set it as current
      if (!user.currentGymId) {
        useAppStore.getState().setCurrentGymId(selectedInvitation.gymId);
      }
    } catch (error: any) {
      console.error('Error creating member:', error);
      Alert.alert('❌ Error', error.message || 'Failed to join gym');
      
      // If there's an error, we should close the form but keep the invitation
      setShowMemberForm(false);
      setSelectedInvitation(null);
    } finally {
      setProcessing(null);
    }
  };

  const handleBackFromForm = () => {
    setShowMemberForm(false);
    setSelectedInvitation(null);
  };

  const handleDeclineInvitation = async (invitation: GymInvitation) => {
    if (!user) return;
    
    Alert.alert(
      'Decline Invitation',
      `Are you sure you want to decline the invitation to join ${invitation.gymName} as ${invitation.role}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: async () => {
            setProcessing(invitation.id);
            try {
              const result = await invitationService.declineInvitation(invitation.id, user.id);
              if (result.success) {
                setInvitations(prev => prev.filter(inv => inv.id !== invitation.id));
                Alert.alert('Invitation Declined', 'You have declined the invitation.');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to decline invitation');
            } finally {
              setProcessing(null);
            }
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getExpiryText = (expiresAt: Date) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffDays = Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    if (diffDays === 1) return 'Expires tomorrow';
    return `Expires in ${diffDays} days`;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return 'business';
      case 'staff': return 'people';
      case 'trainer': return 'fitness';
      case 'member': return 'person';
      default: return 'person';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return theme.colors.warning;
      case 'staff': return theme.colors.accent;
      case 'trainer': return theme.colors.secondary;
      case 'member': return theme.colors.primary;
      default: return theme.colors.text.secondary;
    }
  };

  if (!visible) return null;

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
    },
    invitationCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <ThemeView style={styles.container}>
        {/* Header - Changes based on whether we're showing form or list */}
        <View style={styles.header}>
          {showMemberForm ? (
            // Header for member form
            <>
              <TouchableOpacity 
                style={{ padding: 8 }}
                onPress={handleBackFromForm}
              >
                <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
              
              <View style={{ flex: 1, alignItems: 'center' }}>
                <ThemeText style={styles.headerTitle}>
                  Join {selectedInvitation?.gymName}
                </ThemeText>
              </View>
              
              <View style={{ width: 40 }} />
            </>
          ) : (
            // Header for invitations list
            <>
              <TouchableOpacity 
                style={{ padding: 8 }}
                onPress={onClose}
              >
                <Ionicons name="close" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
              
              <View style={{ flex: 1, alignItems: 'center' }}>
                <ThemeText style={styles.headerTitle}>
                  Pending Invitations
                </ThemeText>
              </View>
              
              <View style={{ width: 40 }} />
            </>
          )}
        </View>

        {/* Content - Either shows form OR invitations list */}
        {showMemberForm && selectedInvitation && user ? (
          // Show member acceptance form
          <MemberAcceptanceForm
            invitation={selectedInvitation}
            user={user}
            onSubmit={handleMemberFormSubmit}
            onBack={handleBackFromForm}
            loading={processing === selectedInvitation.id}
          />
        ) : (
          // Show invitations list
          <ScrollView 
            style={{ flex: 1, paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <ThemeText style={{ marginTop: 16, color: theme.colors.text.secondary }}>
                  Loading invitations...
                </ThemeText>
              </View>
            ) : invitations.length === 0 ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 }}>
                <Ionicons 
                  name="mail-open-outline" 
                  size={64} 
                  color={theme.colors.text.secondary}
                  style={{ marginBottom: 16 }}
                />
                <ThemeText style={{ fontSize: 18, fontWeight: '600', marginBottom: 8, color: theme.colors.text.primary }}>
                  No Pending Invitations
                </ThemeText>
                <ThemeText style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
                  You don't have any pending gym invitations
                </ThemeText>
              </View>
            ) : (
              <View style={{ paddingVertical: 8 }}>
                {invitations.map((invitation) => (
                  <View 
                    key={invitation.id}
                    style={styles.invitationCard}
                  >
                    {/* Gym Info */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                      <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: `${getRoleColor(invitation.role)}15`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}>
                        <Ionicons 
                          name={getRoleIcon(invitation.role)} 
                          size={24} 
                          color={getRoleColor(invitation.role)} 
                        />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <ThemeText style={{ fontSize: 16, fontWeight: '600', marginBottom: 4, color: theme.colors.text.primary }}>
                          {invitation.gymName}
                        </ThemeText>
                        <View style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                          <ThemeText style={{
                            color: getRoleColor(invitation.role),
                            fontWeight: '600',
                            marginRight: 8,
                            fontSize: 12,
                          }}>
                            {invitation.role.toUpperCase()}
                          </ThemeText>
                          <ThemeText style={{ color: theme.colors.text.secondary, fontSize: 12 }}>
                            • Invited by {invitation.invitedByName}
                          </ThemeText>
                        </View>
                      </View>
                    </View>

                    {/* Invitation Details */}
                    {invitation.message && (
                      <View style={{ 
                        backgroundColor: `${theme.colors.primary}08`, 
                        padding: 12, 
                        borderRadius: 8,
                        marginBottom: 12,
                      }}>
                        <ThemeText style={{ fontStyle: 'italic', color: theme.colors.text.secondary }}>
                          "{invitation.message}"
                        </ThemeText>
                      </View>
                    )}

                    {/* Dates */}
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}>
                      <View>
                        <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary, marginBottom: 2 }}>
                          Invited on
                        </ThemeText>
                        <ThemeText style={{ fontSize: 14, color: theme.colors.text.primary }}>
                          {formatDate(invitation.createdAt)}
                        </ThemeText>
                      </View>
                      
                      <View style={{ alignItems: 'flex-end' }}>
                        <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary, marginBottom: 2 }}>
                          Expires
                        </ThemeText>
                        <ThemeText style={{ 
                          fontSize: 14,
                          color: new Date() > invitation.expiresAt ? theme.colors.warning : theme.colors.text.primary
                        }}>
                          {getExpiryText(invitation.expiresAt)}
                        </ThemeText>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          paddingVertical: 12,
                          backgroundColor: theme.colors.warning,
                          borderRadius: 8,
                          alignItems: 'center',
                          opacity: processing === invitation.id ? 0.7 : 1,
                        }}
                        onPress={() => handleDeclineInvitation(invitation)}
                        disabled={processing === invitation.id}
                      >
                        {processing === invitation.id ? (
                          <ActivityIndicator color="#FFFFFF" size="small" />
                        ) : (
                          <ThemeText style={{ color: '#FFFFFF', fontWeight: '600' }}>
                            Decline
                          </ThemeText>
                        )}
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          paddingVertical: 12,
                          backgroundColor: theme.colors.primary,
                          borderRadius: 8,
                          alignItems: 'center',
                          opacity: processing === invitation.id ? 0.7 : 1,
                        }}
                        onPress={() => handleAcceptInvitation(invitation)}
                        disabled={processing === invitation.id || new Date() > invitation.expiresAt}
                      >
                        {processing === invitation.id ? (
                          <ActivityIndicator color="#FFFFFF" size="small" />
                        ) : (
                          <ThemeText style={{ color: '#FFFFFF', fontWeight: '600' }}>
                            {invitation.role === 'member' ? 'Join & Provide Info' : 'Accept'}
                          </ThemeText>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        )}
      </ThemeView>
    </Modal>
  );
};

export default PendingInvitationsModal;

