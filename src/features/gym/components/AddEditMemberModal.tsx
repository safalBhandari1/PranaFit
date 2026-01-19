// NEW FILE: src/features/gym/components/AddEditMemberModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { gymService } from '../../../shared/services/GymService';
import { userRepository } from '../../../shared/services/repositories/UserRepository';
import { createMembersScreenStyles } from '../styles/membersScreenStyles';
import { validateEmergencyContact } from '../../../shared/utils/memberHelpers';
import { CreateGymMemberDTO, UpdateGymMemberDTO, GymMember } from '../../../shared/types/domain/core/gym';

interface AddEditMemberModalProps {
  visible: boolean;
  mode: 'add' | 'edit';
  member?: GymMember;
  onClose: () => void;
  onSuccess: () => void;
  gymId: string;
}

export const AddEditMemberModal: React.FC<AddEditMemberModalProps> = ({
  visible,
  mode,
  member,
  onClose,
  onSuccess,
  gymId,
}) => {
  const { theme } = useEnhancedTheme();
  const styles = createMembersScreenStyles(theme);
  
  const [loading, setLoading] = useState(false);
  const [searchingUser, setSearchingUser] = useState(false);
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    
    // Emergency Contact (REQUIRED)
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    
    // Social Media
    socialMedia: {
      tiktok: '',
      instagram: '',
      facebook: '',
    },
    
    // Additional
    notes: '',
    healthNotes: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Initialize form for edit mode
  useEffect(() => {
    if (mode === 'edit' && member) {
      setFormData({
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        phoneNumber: member.phoneNumber || '',
        email: member.email || '',
        address: member.address || '',
        
        emergencyContact: member.emergencyContact || {
          name: '',
          phone: '',
          relationship: '',
        },
        
        socialMedia: member.socialMedia || {
          tiktok: '',
          instagram: '',
          facebook: '',
        },
        
        notes: member.notes || '',
        healthNotes: member.healthNotes || '',
      });
      
      // Load user info
      if (member.userId) {
        loadUserInfo(member.userId);
      }
    } else {
      // Reset form for add mode
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        
        emergencyContact: {
          name: '',
          phone: '',
          relationship: '',
        },
        
        socialMedia: {
          tiktok: '',
          instagram: '',
          facebook: '',
        },
        
        notes: '',
        healthNotes: '',
      });
      setSelectedUser(null);
    }
    setErrors({});
  }, [mode, member, visible]);
  
  // Load user info
  const loadUserInfo = async (userId: string) => {
    try {
      const user = await userRepository.getById(userId);
      if (user) {
        setSelectedUser({
          id: user.id,
          displayName: user.displayName,
          email: user.email,
        });
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };
  
  // Search users
  const searchUsers = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setUserSearchResults([]);
      return;
    }
    
    try {
      setSearchingUser(true);
      const results = await userRepository.searchUsers(searchTerm);
      setUserSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchingUser(false);
    }
  };
  
  // Handle form field change
  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      // Handle nested objects
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'emergencyContact' || parent === 'socialMedia') {
          return {
            ...prev,
            [parent]: {
              ...prev[parent as keyof typeof prev],
              [child]: value,
            },
          };
        }
      }
      
      return { ...prev, [field]: value };
    });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    
    // Validate email if provided
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate emergency contact
    const emergencyValidation = validateEmergencyContact(formData.emergencyContact);
    if (!emergencyValidation.isValid) {
      emergencyValidation.errors.forEach(error => {
        if (error.includes('name')) newErrors['emergencyContact.name'] = error;
        if (error.includes('phone')) newErrors['emergencyContact.phone'] = error;
        if (error.includes('relationship')) newErrors['emergencyContact.relationship'] = error;
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle submit
  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }
    
    try {
      setLoading(true);
      
      if (mode === 'add') {
        // Add new member
        const memberData: CreateGymMemberDTO = {
          gymId,
          userId: selectedUser?.id || 'temp-user-id', // In real app, you'd create/select a user
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email || undefined,
          address: formData.address || undefined,
          emergencyContact: formData.emergencyContact,
          socialMedia: formData.socialMedia.tiktok || formData.socialMedia.instagram || formData.socialMedia.facebook
            ? formData.socialMedia
            : undefined,
          notes: formData.notes || undefined,
          healthNotes: formData.healthNotes || undefined,
          joinDate: new Date(),
        };
        
        await gymService.addGymMember(memberData);
        Alert.alert('Success', 'Member added successfully');
      } else if (mode === 'edit' && member) {
        // Update existing member
        const updateData: UpdateGymMemberDTO = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email || undefined,
          address: formData.address || undefined,
          emergencyContact: formData.emergencyContact,
          socialMedia: formData.socialMedia.tiktok || formData.socialMedia.instagram || formData.socialMedia.facebook
            ? formData.socialMedia
            : undefined,
          notes: formData.notes || undefined,
          healthNotes: formData.healthNotes || undefined,
        };
        
        await gymService.updateMember(member.id, updateData);
        Alert.alert('Success', 'Member updated successfully');
      }
      
      onSuccess();
      onClose();
      
    } catch (error: any) {
      console.error('Error saving member:', error);
      Alert.alert('Error', error.message || 'Failed to save member. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render form field
  const renderFormField = (
    label: string,
    field: string,
    placeholder: string,
    required: boolean = false,
    multiline: boolean = false,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
  ) => (
    <View style={{ marginBottom: 16 }}>
      <ThemeText style={{
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 8,
      }}>
        {label} {required && <ThemeText style={{ color: theme.colors.warning }}>*</ThemeText>}
      </ThemeText>
      
      <TextInput
        style={{
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: errors[field] ? theme.colors.warning : theme.colors.border,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: theme.colors.text.primary,
          minHeight: multiline ? 80 : 48,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        value={formData[field as keyof typeof formData] as string}
        onChangeText={(value) => handleChange(field, value)}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType}
        editable={!loading}
      />
      
      {errors[field] && (
        <ThemeText style={{
          fontSize: 12,
          color: theme.colors.warning,
          marginTop: 4,
        }}>
          {errors[field]}
        </ThemeText>
      )}
    </View>
  );
  
  // Render emergency contact field
  const renderEmergencyField = (
    label: string,
    field: string,
    placeholder: string,
    required: boolean = false,
    keyboardType: 'default' | 'phone-pad' = 'default'
  ) => (
    <View style={{ marginBottom: 12 }}>
      <ThemeText style={{
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 8,
      }}>
        {label} {required && <ThemeText style={{ color: theme.colors.warning }}>*</ThemeText>}
      </ThemeText>
      
      <TextInput
        style={{
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: errors[`emergencyContact.${field}`] ? theme.colors.warning : theme.colors.border,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: theme.colors.text.primary,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        value={formData.emergencyContact[field as keyof typeof formData.emergencyContact]}
        onChangeText={(value) => handleChange(`emergencyContact.${field}`, value)}
        keyboardType={keyboardType}
        editable={!loading}
      />
      
      {errors[`emergencyContact.${field}`] && (
        <ThemeText style={{
          fontSize: 12,
          color: theme.colors.warning,
          marginTop: 4,
        }}>
          {errors[`emergencyContact.${field}`]}
        </ThemeText>
      )}
    </View>
  );
  
  // Render social media field
  const renderSocialMediaField = (
    label: string,
    field: string,
    placeholder: string,
    icon: string
  ) => (
    <View style={{ marginBottom: 12 }}>
      <ThemeText style={{
        fontSize: 14,
        color: theme.colors.text.secondary,
        marginBottom: 8,
      }}>
        {label}
      </ThemeText>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={theme.colors.text.secondary} 
          style={{ marginRight: 12, position: 'absolute', left: 16, zIndex: 1 }}
        />
        
        <TextInput
          style={{
            flex: 1,
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingLeft: 44, // Space for icon
            paddingVertical: 12,
            fontSize: 16,
            color: theme.colors.text.primary,
          }}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.secondary}
          value={formData.socialMedia[field as keyof typeof formData.socialMedia]}
          onChangeText={(value) => handleChange(`socialMedia.${field}`, value)}
          editable={!loading}
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ThemeView style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onClose}
              disabled={loading}
            >
              <ThemeText style={{ fontSize: 24, color: theme.colors.primary }}>
                ←
              </ThemeText>
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <ThemeText style={styles.headerTitle}>
                {mode === 'add' ? 'Add New Member' : 'Edit Member'}
              </ThemeText>
            </View>
            
            <View style={{ width: 40 }} />
          </View>
          
          {/* Content */}
          <ScrollView 
            style={{ flex: 1 }} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          >
            <View style={{
              backgroundColor: theme.colors.card,
              margin: 16,
              borderRadius: 12,
              padding: 20,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}>
              {/* User Selection (for add mode only) */}
              {mode === 'add' && (
                <View style={{ marginBottom: 24 }}>
                  <ThemeText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.colors.text.primary,
                    marginBottom: 16,
                  }}>
                    User Selection (Optional)
                  </ThemeText>
                  
                  <TextInput
                    style={{
                      backgroundColor: theme.colors.background,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: theme.colors.text.primary,
                      marginBottom: 12,
                    }}
                    placeholder="Search existing users by email or name..."
                    placeholderTextColor={theme.colors.text.secondary}
                    onChangeText={searchUsers}
                    editable={!loading}
                  />
                  
                  {searchingUser && (
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                  )}
                  
                  {selectedUser && (
                    <View style={{
                      backgroundColor: `${theme.colors.primary}10`,
                      borderRadius: 8,
                      padding: 12,
                      marginTop: 8,
                    }}>
                      <ThemeText style={{
                        fontSize: 14,
                        color: theme.colors.text.secondary,
                        marginBottom: 4,
                      }}>
                        Selected User
                      </ThemeText>
                      <ThemeText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: theme.colors.text.primary,
                      }}>
                        {selectedUser.displayName} ({selectedUser.email})
                      </ThemeText>
                    </View>
                  )}
                </View>
              )}
              
              {/* Personal Information Section */}
              <View style={{ marginBottom: 24 }}>
                <ThemeText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme.colors.text.primary,
                  marginBottom: 16,
                }}>
                  Personal Information
                </ThemeText>
                
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    {renderFormField('First Name', 'firstName', 'John', true)}
                  </View>
                  <View style={{ flex: 1 }}>
                    {renderFormField('Last Name', 'lastName', 'Doe', true)}
                  </View>
                </View>
                
                {renderFormField('Phone Number', 'phoneNumber', '+977 98XXXXXXXX', true, false, 'phone-pad')}
                {renderFormField('Email', 'email', 'john@example.com', false, false, 'email-address')}
                {renderFormField('Address', 'address', 'Enter address...', false, true)}
              </View>
              
              {/* Emergency Contact Section */}
              <View style={{ marginBottom: 24 }}>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginBottom: 16 
                }}>
                  <Ionicons 
                    name="alert-circle-outline" 
                    size={20} 
                    color={theme.colors.warning} 
                    style={{ marginRight: 8 }}
                  />
                  <ThemeText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.colors.text.primary,
                  }}>
                    Emergency Contact (Required)
                  </ThemeText>
                </View>
                
                {renderEmergencyField('Contact Name', 'name', 'Emergency contact full name', true)}
                {renderEmergencyField('Phone Number', 'phone', '+977 98XXXXXXXX', true, 'phone-pad')}
                {renderEmergencyField('Relationship', 'relationship', 'Father, Mother, Spouse, etc.', true)}
              </View>
              
              {/* Social Media Section */}
              <View style={{ marginBottom: 24 }}>
                <ThemeText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme.colors.text.primary,
                  marginBottom: 16,
                }}>
                  Social Media (Optional)
                </ThemeText>
                
                {renderSocialMediaField('TikTok', 'tiktok', '@username', 'logo-tiktok')}
                {renderSocialMediaField('Instagram', 'instagram', '@username', 'logo-instagram')}
                {renderSocialMediaField('Facebook', 'facebook', 'facebook.com/username', 'logo-facebook')}
              </View>
              
              {/* Additional Information */}
              <View style={{ marginBottom: 24 }}>
                <ThemeText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme.colors.text.primary,
                  marginBottom: 16,
                }}>
                  Additional Information
                </ThemeText>
                
                {renderFormField('Notes', 'notes', 'Any additional notes about this member...', false, true)}
                {renderFormField('Health Notes', 'healthNotes', 'Any health considerations or notes...', false, true)}
              </View>
            </View>
            
            {/* Spacer */}
            <View style={{ height: 100 }} />
          </ScrollView>
          
          {/* Action Buttons */}
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            padding: 16,
            paddingBottom: 34, // Safe area
          }}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.card,
                  borderRadius: 8,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
                onPress={onClose}
                disabled={loading}
              >
                <ThemeText style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text.primary }}>
                  Cancel
                </ThemeText>
              </TouchableOpacity>
              
              {/* Save Button */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.primary,
                  borderRadius: 8,
                  padding: 16,
                }}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <ThemeText style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
                    {mode === 'add' ? 'Add Member' : 'Save Changes'}
                  </ThemeText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ThemeView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddEditMemberModal;