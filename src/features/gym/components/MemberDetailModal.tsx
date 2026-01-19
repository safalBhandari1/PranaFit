// src/features/gym/components/MemberDetailModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Share,
  Linking,
  TextInput,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { gymService } from '../../../shared/services/GymService';
import { PermissionService } from '../../../shared/services/PermissionService';
import { 
  getMemberCategory, 
  getCategoryInfo, 
  getDaysSinceJoin,
  formatPhoneNumber,
  calculateEnhancedMemberStatus,
  validateEmergencyContact
} from '../../../shared/utils/memberHelpers';
import { GymMember, MemberStatus, UpdateGymMemberDTO } from '../../../shared/types/domain/core/gym';

interface MemberDetailModalProps {
  visible: boolean;
  member: GymMember;
  onClose: () => void;
  onMemberUpdated: () => void;
  onMemberDeleted: () => void;
  canEdit: boolean;
  canDelete: boolean;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  visible,
  member,
  onClose,
  onMemberUpdated,
  onMemberDeleted,
  canEdit,
  canDelete,
}) => {
  const { theme } = useEnhancedTheme();
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state for editing
  const [formData, setFormData] = useState<UpdateGymMemberDTO>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    emergencyContact: { name: '', phone: '', relationship: '' },
    socialMedia: { tiktok: '', instagram: '', facebook: '' },
    notes: '',
    autoRenew: false,
  });

  // Initialize form data when member changes
  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        phoneNumber: member.phoneNumber || '',
        email: member.email || '',
        address: member.address || '',
        emergencyContact: member.emergencyContact || { name: '', phone: '', relationship: '' },
        socialMedia: member.socialMedia || { tiktok: '', instagram: '', facebook: '' },
        notes: member.notes || '',
        autoRenew: member.autoRenew || false,
      });
    }
  }, [member]);

  // Calculate member info
  const category = getMemberCategory(member.joinDate);
  const categoryInfo = getCategoryInfo(category);
  const daysSinceJoin = getDaysSinceJoin(member.joinDate);
  
  // Enhanced status calculation
  const { displayStatus, statusColor } = calculateEnhancedMemberStatus(member);

  // Format phone number for display
  const formattedPhone = formatPhoneNumber(member.phoneNumber);
  const emergencyPhone = member.emergencyContact ? formatPhoneNumber(member.emergencyContact.phone) : '';

  // Handle call
  const handleCall = (phoneNumber: string) => {
    const phone = phoneNumber.replace(/\D/g, '');
    const url = `tel:${phone}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  // Handle SMS
  const handleSMS = (phoneNumber: string) => {
    const phone = phoneNumber.replace(/\D/g, '');
    const url = `sms:${phone}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to send SMS');
    });
  };

  // Handle share
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${member.firstName} ${member.lastName}\nMember Code: ${member.memberCode}\nPhone: ${formattedPhone}\nEmergency Contact: ${member.emergencyContact?.name} - ${emergencyPhone}`,
        title: 'Member Information',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus: 'active' | 'inactive' | 'frozen') => {
    Alert.alert(
      'Change Status',
      `Change member status to ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await gymService.updateMember(member.id, { status: newStatus });
              onMemberUpdated();
              Alert.alert('Success', `Member status changed to ${newStatus}`);
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to update status');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Handle delete
  const handleDelete = () => {
    if (!canDelete) {
      Alert.alert('Permission Denied', 'Only gym owners can delete members.');
      return;
    }
    
    Alert.alert(
      'Delete Member',
      `Are you sure you want to delete ${member.firstName} ${member.lastName}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              // TODO: Implement delete member in GymService
              // await gymService.deleteMember(member.id);
              Alert.alert('Success', 'Member deleted successfully');
              onMemberDeleted();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete member');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Handle edit save
  const handleSave = async () => {
    // Validate emergency contact
    if (formData.emergencyContact) {
      const validation = validateEmergencyContact(formData.emergencyContact);
      if (!validation.isValid) {
        Alert.alert('Validation Error', validation.errors.join('\n'));
        return;
      }
    }

    try {
      setSaving(true);
      await gymService.updateMember(member.id, formData);
      setIsEditing(false);
      onMemberUpdated();
      Alert.alert('Success', 'Member updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update member');
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // Reset form data to original member data
    setFormData({
      firstName: member.firstName || '',
      lastName: member.lastName || '',
      phoneNumber: member.phoneNumber || '',
      email: member.email || '',
      address: member.address || '',
      emergencyContact: member.emergencyContact || { name: '', phone: '', relationship: '' },
      socialMedia: member.socialMedia || { tiktok: '', instagram: '', facebook: '' },
      notes: member.notes || '',
      autoRenew: member.autoRenew || false,
    });
    setIsEditing(false);
  };

  // Format date
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Render header
  const renderHeader = () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    }}>
      <TouchableOpacity 
        style={{ padding: 8 }}
        onPress={onClose}
        disabled={loading || saving}
      >
        <Ionicons name="close" size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>
      
      <ThemeText style={{
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text.primary,
      }}>
        {isEditing ? 'Edit Member' : 'Member Details'}
      </ThemeText>
      
      <View style={{ width: 40 }}>
        {!isEditing && canDelete && (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={handleDelete}
            disabled={loading}
          >
            <Ionicons name="trash-outline" size={20} color={theme.colors.warning} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // Render logo and name section (orange highlight style)
  const renderLogoAndName = () => (
    <View style={{
      backgroundColor: `${theme.colors.primary}10`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: `${theme.colors.primary}30`,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      {/* Avatar */}
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <ThemeText style={{ 
          color: '#FFFFFF', 
          fontSize: 20, 
          fontWeight: '600' 
        }}>
          {member.firstName.charAt(0)}{member.lastName.charAt(0)}
        </ThemeText>
      </View>
      
      {/* Name and Member Code */}
      <View style={{ flex: 1 }}>
        <ThemeText style={{
          fontSize: 20,
          fontWeight: '700',
          color: theme.colors.text.primary,
          marginBottom: 4,
        }}>
          {member.firstName} {member.lastName}
        </ThemeText>
        <ThemeText style={{
          fontSize: 14,
          color: theme.colors.text.secondary,
        }}>
          {member.memberCode}
        </ThemeText>
      </View>
    </View>
  );

  // Render category and status section (no card)
  const renderCategoryAndStatus = () => (
    <View style={{ marginBottom: 24 }}>
      <ThemeText style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 12,
      }}>
        Category & Status
      </ThemeText>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* Category Badge */}
        <View style={{
          backgroundColor: categoryInfo.backgroundColor,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: categoryInfo.color + '40',
        }}>
          <ThemeText style={{
            fontSize: 12,
            fontWeight: '600',
            color: categoryInfo.color,
          }}>
            {categoryInfo.label}
          </ThemeText>
        </View>
        
        {/* Enhanced Status Badge */}
        <View style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: `${statusColor}15`,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: `${statusColor}40`,
        }}>
          <ThemeText style={{
            fontSize: 12,
            fontWeight: '600',
            color: statusColor,
            textTransform: 'uppercase',
          }}>
            {displayStatus === 'due' ? 'DUE' : displayStatus.toUpperCase()}
          </ThemeText>
        </View>
        
        {/* Days since join */}
        <ThemeText style={{
          fontSize: 12,
          color: theme.colors.text.secondary,
        }}>
          • {daysSinceJoin}
        </ThemeText>
      </View>
    </View>
  );

  // Render contact information section (with card)
  const renderContactInformation = () => (
    <View style={{ marginBottom: 24 }}>
      <ThemeText style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 12,
      }}>
        Contact Information
      </ThemeText>
      
      <View style={{
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {/* Name - Editable in edit mode */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <Ionicons 
            name="person-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          {isEditing ? (
            <View style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                placeholder="First Name"
                placeholderTextColor={theme.colors.text.secondary}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                placeholder="Last Name"
                placeholderTextColor={theme.colors.text.secondary}
              />
            </View>
          ) : (
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              {member.firstName} {member.lastName}
            </ThemeText>
          )}
        </View>
        
        {/* Phone */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <Ionicons 
            name="call-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          {isEditing ? (
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
              }}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
              placeholder="Phone Number"
              placeholderTextColor={theme.colors.text.secondary}
              keyboardType="phone-pad"
            />
          ) : (
            <>
              <ThemeText style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
              }}>
                {formattedPhone}
              </ThemeText>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ padding: 4, marginLeft: 8 }}
                  onPress={() => handleCall(member.phoneNumber)}
                >
                  <Ionicons name="call" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 4, marginLeft: 8 }}
                  onPress={() => handleSMS(member.phoneNumber)}
                >
                  <Ionicons name="chatbubble-outline" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        
        {/* Email */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <Ionicons 
            name="mail-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          {isEditing ? (
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
              }}
              value={formData.email || ''}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Email Address"
              placeholderTextColor={theme.colors.text.secondary}
              keyboardType="email-address"
            />
          ) : (
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              {member.email || 'N/A'}
            </ThemeText>
          )}
        </View>
        
        {/* Address - Last item, no border */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
        }}>
          <Ionicons 
            name="location-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          {isEditing ? (
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
              }}
              value={formData.address || ''}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Address"
              placeholderTextColor={theme.colors.text.secondary}
              multiline
            />
          ) : (
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              {member.address || 'N/A'}
            </ThemeText>
          )}
        </View>
      </View>
    </View>
  );

  // Render package information section (with card)
  const renderPackageInformation = () => {
    if (!member.currentPackage) {
      return (
        <View style={{ marginBottom: 24 }}>
          <ThemeText style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginBottom: 12,
          }}>
            Package Information
          </ThemeText>
          
          <View style={{
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
          }}>
            <Ionicons 
              name="cube-outline" 
              size={32} 
              color={theme.colors.text.secondary} 
              style={{ marginBottom: 12 }}
            />
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              textAlign: 'center',
            }}>
              No package assigned
            </ThemeText>
          </View>
        </View>
      );
    }

    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Package Information
        </ThemeText>
        
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* Package Name */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          }}>
            <Ionicons 
              name="cube-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={{ marginRight: 12, width: 24 }}
            />
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              {member.currentPackage.name}
            </ThemeText>
          </View>
          
          {/* Price */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          }}>
            <Ionicons 
              name="cash-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={{ marginRight: 12, width: 24 }}
            />
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              रु {member.currentPackage.price.toLocaleString()}
            </ThemeText>
          </View>
          
          {/* Duration */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          }}>
            <Ionicons 
              name="calendar-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={{ marginRight: 12, width: 24 }}
            />
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              {member.currentPackage.durationDays} days
            </ThemeText>
          </View>
          
          {/* Expiry Date */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: member.expiryDate ? 1 : 0,
            borderBottomColor: member.expiryDate ? theme.colors.border : 'transparent',
          }}>
            <Ionicons 
              name="time-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={{ marginRight: 12, width: 24 }}
            />
            <ThemeText style={{
              flex: 1,
              fontSize: 16,
              color: theme.colors.text.primary,
            }}>
              {member.expiryDate ? formatDate(member.expiryDate) : 'No expiry'}
            </ThemeText>
          </View>
          
          {/* Auto Renew - Only in edit mode */}
          {isEditing && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons 
                  name="repeat-outline" 
                  size={22} 
                  color={theme.colors.text.primary}
                  style={{ marginRight: 12, width: 24 }}
                />
                <ThemeText style={{
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}>
                  Auto Renew
                </ThemeText>
              </View>
              <Switch
                value={formData.autoRenew}
                onValueChange={(value) => setFormData({ ...formData, autoRenew: value })}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={formData.autoRenew ? '#FFFFFF' : theme.colors.text.secondary}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  // Render membership details section (with card)
  const renderMembershipDetails = () => (
    <View style={{ marginBottom: 24 }}>
      <ThemeText style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 12,
      }}>
        Membership Details
      </ThemeText>
      
      <View style={{
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {/* Join Date */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <Ionicons 
            name="calendar-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          <ThemeText style={{
            flex: 1,
            fontSize: 16,
            color: theme.colors.text.primary,
          }}>
            {formatDate(member.joinDate)}
          </ThemeText>
        </View>
        
        {/* Expiry Date */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <Ionicons 
            name="hourglass-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          <ThemeText style={{
            flex: 1,
            fontSize: 16,
            color: theme.colors.text.primary,
          }}>
            {member.expiryDate ? formatDate(member.expiryDate) : 'No expiry'}
          </ThemeText>
        </View>
        
        {/* Payment Status */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <Ionicons 
            name="card-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          <ThemeText style={{
            flex: 1,
            fontSize: 16,
            color: theme.colors.text.primary,
          }}>
            {member.paymentStatus?.toUpperCase() || 'N/A'}
          </ThemeText>
        </View>
        
        {/* Auto Renew Status - Last item, no border */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
        }}>
          <Ionicons 
            name="repeat-outline" 
            size={22} 
            color={theme.colors.text.primary}
            style={{ marginRight: 12, width: 24 }}
          />
          <ThemeText style={{
            flex: 1,
            fontSize: 16,
            color: member.autoRenew ? theme.colors.primary : theme.colors.text.secondary,
          }}>
            Auto Renew: {member.autoRenew ? 'Yes' : 'No'}
          </ThemeText>
        </View>
      </View>
    </View>
  );

  // Render social media section (with card)
  const renderSocialMedia = () => {
    if (!isEditing && !member.socialMedia && 
        (!member.socialMedia?.tiktok && !member.socialMedia?.instagram && !member.socialMedia?.facebook)) {
      return null;
    }

    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Social Media
        </ThemeText>
        
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {isEditing ? (
            <>
              {/* TikTok */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
              }}>
                <Ionicons 
                  name="logo-tiktok" 
                  size={22} 
                  color="#000000"
                  style={{ marginRight: 12, width: 24 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: theme.colors.text.primary,
                  }}
                  value={formData.socialMedia?.tiktok || ''}
                  onChangeText={(text) => setFormData({ 
                    ...formData, 
                    socialMedia: { ...formData.socialMedia, tiktok: text } 
                  })}
                  placeholder="@username"
                  placeholderTextColor={theme.colors.text.secondary}
                />
              </View>
              
              {/* Instagram */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
              }}>
                <Ionicons 
                  name="logo-instagram" 
                  size={22} 
                  color="#E4405F"
                  style={{ marginRight: 12, width: 24 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: theme.colors.text.primary,
                  }}
                  value={formData.socialMedia?.instagram || ''}
                  onChangeText={(text) => setFormData({ 
                    ...formData, 
                    socialMedia: { ...formData.socialMedia, instagram: text } 
                  })}
                  placeholder="@username"
                  placeholderTextColor={theme.colors.text.secondary}
                />
              </View>
              
              {/* Facebook - Last item, no border */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
              }}>
                <Ionicons 
                  name="logo-facebook" 
                  size={22} 
                  color="#1877F2"
                  style={{ marginRight: 12, width: 24 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: theme.colors.text.primary,
                  }}
                  value={formData.socialMedia?.facebook || ''}
                  onChangeText={(text) => setFormData({ 
                    ...formData, 
                    socialMedia: { ...formData.socialMedia, facebook: text } 
                  })}
                  placeholder="Username or profile URL"
                  placeholderTextColor={theme.colors.text.secondary}
                />
              </View>
            </>
          ) : (
            <>
              {member.socialMedia?.tiktok && (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: member.socialMedia?.instagram || member.socialMedia?.facebook ? 1 : 0,
                  borderBottomColor: theme.colors.border,
                }}>
                  <Ionicons 
                    name="logo-tiktok" 
                    size={22} 
                    color="#000000"
                    style={{ marginRight: 12, width: 24 }}
                  />
                  <ThemeText style={{
                    flex: 1,
                    fontSize: 16,
                    color: '#000000',
                  }}>
                    {member.socialMedia.tiktok}
                  </ThemeText>
                </View>
              )}
              
              {member.socialMedia?.instagram && (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: member.socialMedia?.facebook ? 1 : 0,
                  borderBottomColor: theme.colors.border,
                }}>
                  <Ionicons 
                    name="logo-instagram" 
                    size={22} 
                    color="#E4405F"
                    style={{ marginRight: 12, width: 24 }}
                  />
                  <ThemeText style={{
                    flex: 1,
                    fontSize: 16,
                    color: '#E4405F',
                  }}>
                    {member.socialMedia.instagram}
                  </ThemeText>
                </View>
              )}
              
              {member.socialMedia?.facebook && (
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                }}>
                  <Ionicons 
                    name="logo-facebook" 
                    size={22} 
                    color="#1877F2"
                    style={{ marginRight: 12, width: 24 }}
                  />
                  <ThemeText style={{
                    flex: 1,
                    fontSize: 16,
                    color: '#1877F2',
                  }}>
                    {member.socialMedia.facebook}
                  </ThemeText>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  // Render notes section (with card)
  const renderNotes = () => {
    if (!isEditing && !member.notes) {
      return null;
    }

    return (
      <View style={{ marginBottom: 24 }}>
        <ThemeText style={{
          fontSize: 16,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 12,
        }}>
          Notes
        </ThemeText>
        
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {isEditing ? (
            <View style={{ padding: 16 }}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: theme.colors.text.primary,
                  minHeight: 100,
                  textAlignVertical: 'top',
                }}
                value={formData.notes || ''}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                placeholder="Add notes about this member..."
                placeholderTextColor={theme.colors.text.secondary}
                multiline
              />
            </View>
          ) : (
            <View style={{ padding: 16 }}>
              <ThemeText style={{
                fontSize: 16,
                color: theme.colors.text.secondary,
                lineHeight: 22,
              }}>
                {member.notes}
              </ThemeText>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Render emergency contact section (with card)
  const renderEmergencyContact = () => (
    <View style={{ marginBottom: 24 }}>
      <ThemeText style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 12,
      }}>
        🚨 Emergency Contact
      </ThemeText>
      
      <View style={{
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {isEditing ? (
          <>
            {/* Contact Name */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}>
              <Ionicons 
                name="person-circle-outline" 
                size={22} 
                color={theme.colors.warning}
                style={{ marginRight: 12, width: 24 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}
                value={formData.emergencyContact?.name || ''}
                onChangeText={(text) => setFormData({ 
                  ...formData, 
                  emergencyContact: { ...formData.emergencyContact!, name: text } 
                })}
                placeholder="Contact Name"
                placeholderTextColor={theme.colors.text.secondary}
              />
            </View>
            
            {/* Phone Number */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}>
              <Ionicons 
                name="call-outline" 
                size={22} 
                color={theme.colors.warning}
                style={{ marginRight: 12, width: 24 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}
                value={formData.emergencyContact?.phone || ''}
                onChangeText={(text) => setFormData({ 
                  ...formData, 
                  emergencyContact: { ...formData.emergencyContact!, phone: text } 
                })}
                placeholder="Phone Number"
                placeholderTextColor={theme.colors.text.secondary}
                keyboardType="phone-pad"
              />
            </View>
            
            {/* Relationship - Last item, no border */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
            }}>
              <Ionicons 
                name="people-outline" 
                size={22} 
                color={theme.colors.warning}
                style={{ marginRight: 12, width: 24 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}
                value={formData.emergencyContact?.relationship || ''}
                onChangeText={(text) => setFormData({ 
                  ...formData, 
                  emergencyContact: { ...formData.emergencyContact!, relationship: text } 
                })}
                placeholder="Relationship"
                placeholderTextColor={theme.colors.text.secondary}
              />
            </View>
          </>
        ) : member.emergencyContact ? (
          <>
            {/* Contact Name */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}>
              <Ionicons 
                name="person-circle-outline" 
                size={22} 
                color={theme.colors.warning}
                style={{ marginRight: 12, width: 24 }}
              />
              <ThemeText style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
              }}>
                {member.emergencyContact.name}
              </ThemeText>
            </View>
            
            {/* Phone Number */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}>
              <Ionicons 
                name="call-outline" 
                size={22} 
                color={theme.colors.warning}
                style={{ marginRight: 12, width: 24 }}
              />
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <ThemeText style={{
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}>
                  {emergencyPhone}
                </ThemeText>
                <TouchableOpacity
                  style={{ padding: 4 }}
                  onPress={() => handleCall(member.emergencyContact.phone)}
                >
                  <Ionicons name="call" size={20} color={theme.colors.warning} />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Relationship - Last item, no border */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
            }}>
              <Ionicons 
                name="people-outline" 
                size={22} 
                color={theme.colors.warning}
                style={{ marginRight: 12, width: 24 }}
              />
              <ThemeText style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
              }}>
                {member.emergencyContact.relationship}
              </ThemeText>
            </View>
          </>
        ) : (
          <View style={{
            padding: 16,
            alignItems: 'center',
          }}>
            <Ionicons 
              name="warning-outline" 
              size={32} 
              color={theme.colors.warning} 
              style={{ marginBottom: 12 }}
            />
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.warning,
              textAlign: 'center',
            }}>
              Emergency contact information is missing
            </ThemeText>
          </View>
        )}
      </View>
    </View>
  );

  // Render action buttons
  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <View style={{
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          padding: 16,
          paddingBottom: Platform.OS === 'ios' ? 34 : 16,
          flexDirection: 'row',
          gap: 12,
        }}>
          {/* Cancel Button - Left */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
            onPress={handleCancelEdit}
            disabled={saving}
          >
            <ThemeText style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.primary,
            }}>
              Cancel
            </ThemeText>
          </TouchableOpacity>
          
          {/* Save Button - Right */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              opacity: saving ? 0.7 : 1,
            }}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemeText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
              }}>
                Save Changes
              </ThemeText>
            )}
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
      }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {/* Share Button */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.card,
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
            <ThemeText style={{ fontSize: 14, fontWeight: '600', color: theme.colors.primary }}>
              Share
            </ThemeText>
          </TouchableOpacity>
          
          {/* Edit Button */}
          {canEdit && (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                padding: 12,
              }}
              onPress={() => setIsEditing(true)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="pencil-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <ThemeText style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                    Edit
                  </ThemeText>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
        
        {/* Status Change Quick Actions */}
        {canEdit && !isEditing && (
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            {(['active', 'inactive', 'frozen'] as MemberStatus[]).map((status) => (
              <TouchableOpacity
                key={status}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: displayStatus === status 
                    ? theme.colors.primary + '20' 
                    : theme.colors.card + '80',
                  borderWidth: 1,
                  borderColor: displayStatus === status 
                    ? theme.colors.primary 
                    : theme.colors.border,
                }}
                onPress={() => handleStatusChange(status as 'active' | 'inactive' | 'frozen')}
                disabled={displayStatus === status || loading}
              >
                <ThemeText style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: displayStatus === status 
                    ? theme.colors.primary 
                    : theme.colors.text.secondary,
                  textAlign: 'center',
                }}>
                  {status.toUpperCase()}
                </ThemeText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header */}
        {renderHeader()}
        
        {/* Content */}
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo & Name Section (Orange Highlight) */}
          {renderLogoAndName()}
          
          {/* Category & Status Section (No Card) */}
          {renderCategoryAndStatus()}
          
          {/* Contact Information Section (With Card) */}
          {renderContactInformation()}
          
          {/* Package Information Section (With Card) */}
          {renderPackageInformation()}
          
          {/* Membership Details Section (With Card) */}
          {renderMembershipDetails()}
          
          {/* Social Media Section (With Card) */}
          {renderSocialMedia()}
          
          {/* Notes Section (With Card) */}
          {renderNotes()}
          
          {/* Emergency Contact Section (With Card) */}
          {renderEmergencyContact()}
          
          {/* Spacer for bottom buttons */}
          <View style={{ height: 20 }} />
        </ScrollView>
        
        {/* Action Buttons */}
        {renderActionButtons()}
      </ThemeView>
    </Modal>
  );
};

export default MemberDetailModal;