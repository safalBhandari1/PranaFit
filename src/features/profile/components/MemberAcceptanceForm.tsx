// NEW FILE: src/features/profile/components/MemberAcceptanceForm.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { GymInvitation, MemberData } from '../../../shared/types/domain/core/invitation';
import { User } from '../../../shared/types/domain/core/user';
import { validateEmergencyContact } from '../../../shared/utils/memberHelpers';

interface MemberAcceptanceFormProps {
  invitation: GymInvitation;
  user: User;
  onSubmit: (memberData: MemberData) => Promise<void>;
  onBack: () => void;
  loading: boolean;
}

export const MemberAcceptanceForm: React.FC<MemberAcceptanceFormProps> = ({
  invitation,
  user,
  onSubmit,
  onBack,
  loading,
}) => {
  const { theme } = useEnhancedTheme();
  
  const [formData, setFormData] = useState<Partial<MemberData>>({
    firstName: user.displayName?.split(' ')[0] || '',
    lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
    phoneNumber: user.phoneNumber || '',
    email: user.email,
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
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
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
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    const emergencyValidation = validateEmergencyContact(formData.emergencyContact || { name: '', phone: '', relationship: '' });
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

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || 
        !formData.emergencyContact?.name || !formData.emergencyContact?.phone || 
        !formData.emergencyContact?.relationship) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const memberData: MemberData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      emergencyContact: formData.emergencyContact!,
      socialMedia: formData.socialMedia?.tiktok || formData.socialMedia?.instagram || formData.socialMedia?.facebook
        ? formData.socialMedia
        : undefined,
    };
    
    await onSubmit(memberData);
  };

  const renderFormField = (
    label: string,
    field: string,
    placeholder: string,
    required: boolean = false,
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
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
        value={formData[field as keyof typeof formData] as string}
        onChangeText={(value) => handleChange(field, value)}
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
        value={formData.emergencyContact?.[field as keyof typeof formData.emergencyContact]}
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        {/* Welcome Section */}
        <View style={{
          backgroundColor: `${theme.colors.primary}05`,
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: `${theme.colors.primary}20`,
        }}>
          <ThemeText style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginBottom: 8,
          }}>
            Welcome to {invitation.gymName}!
          </ThemeText>
          <ThemeText style={{
            fontSize: 14,
            color: theme.colors.text.secondary,
            lineHeight: 20,
          }}>
            Please provide your information to complete your member profile. Your data is secure and private.
          </ThemeText>
        </View>

        {/* Personal Information */}
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
          
          {renderFormField('Phone Number', 'phoneNumber', '+977 98XXXXXXXX', true, 'phone-pad')}
          {renderFormField('Email', 'email', 'john@example.com', false, 'email-address')}
        </View>
        
        {/* Emergency Contact */}
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
          
          <View style={{
            backgroundColor: `${theme.colors.warning}05`,
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: `${theme.colors.warning}20`,
          }}>
            <ThemeText style={{
              fontSize: 13,
              color: theme.colors.text.secondary,
              lineHeight: 18,
              marginBottom: 12,
            }}>
              Required for your safety. Only used in emergencies.
            </ThemeText>
            
            {renderEmergencyField('Contact Name', 'name', 'Emergency contact full name', true)}
            {renderEmergencyField('Phone Number', 'phone', '+977 98XXXXXXXX', true, 'phone-pad')}
            {renderEmergencyField('Relationship', 'relationship', 'Father, Mother, Spouse, etc.', true)}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ThemeText style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
              Join {invitation.gymName}
            </ThemeText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};