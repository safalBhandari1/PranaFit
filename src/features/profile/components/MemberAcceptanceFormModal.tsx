// // NEW FILE: src/features/profile/components/MemberAcceptanceFormModal.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Modal,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { GymInvitation, MemberData } from '../../../shared/types/domain/core/invitation';
// import { User } from '../../../shared/types/domain/core/user';
// import { validateEmergencyContact } from '../../../shared/utils/memberHelpers';
// import { createProfileGymStyles } from '../styles/profileGymStyles';

// interface MemberAcceptanceFormModalProps {
//   visible: boolean;
//   invitation: GymInvitation;
//   user: User;
//   onClose: () => void;
//   onSubmit: (memberData: MemberData) => Promise<void>;
// }

// export const MemberAcceptanceFormModal: React.FC<MemberAcceptanceFormModalProps> = ({
//   visible,
//   invitation,
//   user,
//   onClose,
//   onSubmit,
// }) => {
//   const { theme } = useEnhancedTheme();
//   const styles = createProfileGymStyles(theme);
  
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<Partial<MemberData>>({
//     // Personal Information
//     firstName: user.displayName?.split(' ')[0] || '',
//     lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
//     phoneNumber: user.phoneNumber || '',
//     email: user.email,
    
//     // Emergency Contact (REQUIRED)
//     emergencyContact: {
//       name: '',
//       phone: '',
//       relationship: '',
//     },
    
//     // Social Media (Optional)
//     socialMedia: {
//       tiktok: '',
//       instagram: '',
//       facebook: '',
//     },
//   });
  
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Reset form when modal closes
//   useEffect(() => {
//     if (!visible) {
//       setFormData({
//         firstName: user.displayName?.split(' ')[0] || '',
//         lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
//         phoneNumber: user.phoneNumber || '',
//         email: user.email,
//         emergencyContact: {
//           name: '',
//           phone: '',
//           relationship: '',
//         },
//         socialMedia: {
//           tiktok: '',
//           instagram: '',
//           facebook: '',
//         },
//       });
//       setErrors({});
//     }
//   }, [visible, user]);

//   // Handle form field change
//   const handleChange = (field: string, value: any) => {
//     setFormData(prev => {
//       // Handle nested objects
//       if (field.includes('.')) {
//         const [parent, child] = field.split('.');
//         if (parent === 'emergencyContact' || parent === 'socialMedia') {
//           return {
//             ...prev,
//             [parent]: {
//               ...prev[parent as keyof typeof prev],
//               [child]: value,
//             },
//           };
//         }
//       }
      
//       return { ...prev, [field]: value };
//     });
    
//     // Clear error for this field
//     if (errors[field]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   // Validate form
//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
    
//     // Required fields
//     if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
//     if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
    
//     // Validate email if provided
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     // Validate emergency contact
//     const emergencyValidation = validateEmergencyContact(formData.emergencyContact || { name: '', phone: '', relationship: '' });
//     if (!emergencyValidation.isValid) {
//       emergencyValidation.errors.forEach(error => {
//         if (error.includes('name')) newErrors['emergencyContact.name'] = error;
//         if (error.includes('phone')) newErrors['emergencyContact.phone'] = error;
//         if (error.includes('relationship')) newErrors['emergencyContact.relationship'] = error;
//       });
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
//       return;
//     }

//     // Ensure all required data is present
//     if (!formData.firstName || !formData.lastName || !formData.phoneNumber || 
//         !formData.emergencyContact?.name || !formData.emergencyContact?.phone || 
//         !formData.emergencyContact?.relationship) {
//       Alert.alert('Missing Information', 'Please fill in all required fields.');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const memberData: MemberData = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         phoneNumber: formData.phoneNumber,
//         email: formData.email,
//         emergencyContact: formData.emergencyContact!,
//         socialMedia: formData.socialMedia?.tiktok || formData.socialMedia?.instagram || formData.socialMedia?.facebook
//           ? formData.socialMedia
//           : undefined,
//       };
      
//       await onSubmit(memberData);
      
//     } catch (error: any) {
//       console.error('Error submitting member form:', error);
//       Alert.alert('Error', error.message || 'Failed to submit form. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render form field
//   const renderFormField = (
//     label: string,
//     field: string,
//     placeholder: string,
//     required: boolean = false,
//     multiline: boolean = false,
//     keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
//   ) => (
//     <View style={{ marginBottom: 16 }}>
//       <ThemeText style={{
//         fontSize: 14,
//         fontWeight: '600',
//         color: theme.colors.text.primary,
//         marginBottom: 8,
//       }}>
//         {label} {required && <ThemeText style={{ color: theme.colors.warning }}>*</ThemeText>}
//       </ThemeText>
      
//       <TextInput
//         style={{
//           backgroundColor: theme.colors.card,
//           borderWidth: 1,
//           borderColor: errors[field] ? theme.colors.warning : theme.colors.border,
//           borderRadius: 8,
//           paddingHorizontal: 16,
//           paddingVertical: 12,
//           fontSize: 16,
//           color: theme.colors.text.primary,
//           minHeight: multiline ? 80 : 48,
//           textAlignVertical: multiline ? 'top' : 'center',
//         }}
//         placeholder={placeholder}
//         placeholderTextColor={theme.colors.text.secondary}
//         value={formData[field as keyof typeof formData] as string}
//         onChangeText={(value) => handleChange(field, value)}
//         multiline={multiline}
//         numberOfLines={multiline ? 4 : 1}
//         keyboardType={keyboardType}
//         editable={!loading}
//       />
      
//       {errors[field] && (
//         <ThemeText style={{
//           fontSize: 12,
//           color: theme.colors.warning,
//           marginTop: 4,
//         }}>
//           {errors[field]}
//         </ThemeText>
//       )}
//     </View>
//   );

//   // Render emergency contact field
//   const renderEmergencyField = (
//     label: string,
//     field: string,
//     placeholder: string,
//     required: boolean = false,
//     keyboardType: 'default' | 'phone-pad' = 'default'
//   ) => (
//     <View style={{ marginBottom: 12 }}>
//       <ThemeText style={{
//         fontSize: 14,
//         fontWeight: '600',
//         color: theme.colors.text.primary,
//         marginBottom: 8,
//       }}>
//         {label} {required && <ThemeText style={{ color: theme.colors.warning }}>*</ThemeText>}
//       </ThemeText>
      
//       <TextInput
//         style={{
//           backgroundColor: theme.colors.card,
//           borderWidth: 1,
//           borderColor: errors[`emergencyContact.${field}`] ? theme.colors.warning : theme.colors.border,
//           borderRadius: 8,
//           paddingHorizontal: 16,
//           paddingVertical: 12,
//           fontSize: 16,
//           color: theme.colors.text.primary,
//         }}
//         placeholder={placeholder}
//         placeholderTextColor={theme.colors.text.secondary}
//         value={formData.emergencyContact?.[field as keyof typeof formData.emergencyContact]}
//         onChangeText={(value) => handleChange(`emergencyContact.${field}`, value)}
//         keyboardType={keyboardType}
//         editable={!loading}
//       />
      
//       {errors[`emergencyContact.${field}`] && (
//         <ThemeText style={{
//           fontSize: 12,
//           color: theme.colors.warning,
//           marginTop: 4,
//         }}>
//           {errors[`emergencyContact.${field}`]}
//         </ThemeText>
//       )}
//     </View>
//   );

//   // Render social media field
//   const renderSocialMediaField = (
//     label: string,
//     field: string,
//     placeholder: string,
//     icon: string
//   ) => (
//     <View style={{ marginBottom: 12 }}>
//       <ThemeText style={{
//         fontSize: 14,
//         color: theme.colors.text.secondary,
//         marginBottom: 8,
//       }}>
//         {label}
//       </ThemeText>
      
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Ionicons 
//           name={icon as any} 
//           size={20} 
//           color={theme.colors.text.secondary} 
//           style={{ marginRight: 12, position: 'absolute', left: 16, zIndex: 1 }}
//         />
        
//         <TextInput
//           style={{
//             flex: 1,
//             backgroundColor: theme.colors.card,
//             borderWidth: 1,
//             borderColor: theme.colors.border,
//             borderRadius: 8,
//             paddingHorizontal: 16,
//             paddingLeft: 44, // Space for icon
//             paddingVertical: 12,
//             fontSize: 16,
//             color: theme.colors.text.primary,
//           }}
//           placeholder={placeholder}
//           placeholderTextColor={theme.colors.text.secondary}
//           value={formData.socialMedia?.[field as keyof typeof formData.socialMedia]}
//           onChangeText={(value) => handleChange(`socialMedia.${field}`, value)}
//           editable={!loading}
//           autoCapitalize="none"
//         />
//       </View>
//     </View>
//   );

//   if (!visible) return null;

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}
//       statusBarTranslucent={true}
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//       >
//         <ThemeView style={{ 
//           flex: 1, 
//           backgroundColor: theme.colors.background 
//         }}>
//           <SafeAreaView style={{ flex: 1 }}>
//             {/* Header */}
//             <View style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 20,
//               paddingVertical: 16,
//               borderBottomWidth: 1,
//               borderBottomColor: theme.colors.border,
//               backgroundColor: theme.colors.background,
//             }}>
//               <TouchableOpacity 
//                 style={{ padding: 4 }}
//                 onPress={onClose}
//                 disabled={loading}
//               >
//                 <Ionicons name="close" size={24} color={theme.colors.text.primary} />
//               </TouchableOpacity>
              
//               <View style={{ flex: 1, alignItems: 'center' }}>
//                 <ThemeText style={{
//                   fontSize: 18,
//                   fontWeight: '600',
//                   color: theme.colors.text.primary,
//                 }}>
//                   Join {invitation.gymName}
//                 </ThemeText>
//                 <ThemeText style={{
//                   fontSize: 14,
//                   color: theme.colors.text.secondary,
//                   marginTop: 2,
//                 }}>
//                   Complete your member profile
//                 </ThemeText>
//               </View>
              
//               <View style={{ width: 32 }} />
//             </View>

//             {/* Content */}
//             <ScrollView 
//               style={{ flex: 1 }}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{ paddingBottom: 120 }}
//             >
//               {/* Welcome Section */}
//               <View style={{
//                 paddingHorizontal: 20,
//                 paddingVertical: 24,
//                 backgroundColor: `${theme.colors.primary}05`,
//                 marginBottom: 20,
//                 borderBottomWidth: 1,
//                 borderBottomColor: `${theme.colors.primary}20`,
//               }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
//                   <Ionicons 
//                     name="checkmark-circle" 
//                     size={24} 
//                     color={theme.colors.primary} 
//                     style={{ marginRight: 12 }}
//                   />
//                   <ThemeText style={{
//                     fontSize: 16,
//                     fontWeight: '600',
//                     color: theme.colors.text.primary,
//                     flex: 1,
//                   }}>
//                     Welcome to {invitation.gymName}!
//                   </ThemeText>
//                 </View>
                
//                 <ThemeText style={{
//                   fontSize: 14,
//                   color: theme.colors.text.secondary,
//                   lineHeight: 20,
//                   marginBottom: 8,
//                 }}>
//                   You've been invited to join as a member. Please provide your information to complete your profile.
//                 </ThemeText>
                
//                 <View style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 8,
//                 }}>
//                   <Ionicons 
//                     name="shield-checkmark-outline" 
//                     size={16} 
//                     color={theme.colors.primary} 
//                     style={{ marginRight: 8 }}
//                   />
//                   <ThemeText style={{
//                     fontSize: 13,
//                     color: theme.colors.text.secondary,
//                     fontStyle: 'italic',
//                   }}>
//                     Your information is secure and private
//                   </ThemeText>
//                 </View>
//               </View>

//               {/* Form Container */}
//               <View style={{
//                 paddingHorizontal: 20,
//               }}>
//                 {/* Personal Information */}
//                 <View style={{ marginBottom: 24 }}>
//                   <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
//                     <Ionicons 
//                       name="person-outline" 
//                       size={20} 
//                       color={theme.colors.primary} 
//                       style={{ marginRight: 12 }}
//                     />
//                     <ThemeText style={{
//                       fontSize: 16,
//                       fontWeight: '600',
//                       color: theme.colors.text.primary,
//                     }}>
//                       Personal Information
//                     </ThemeText>
//                   </View>
                  
//                   <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
//                     <View style={{ flex: 1 }}>
//                       {renderFormField('First Name', 'firstName', 'John', true)}
//                     </View>
//                     <View style={{ flex: 1 }}>
//                       {renderFormField('Last Name', 'lastName', 'Doe', true)}
//                     </View>
//                   </View>
                  
//                   {renderFormField('Phone Number', 'phoneNumber', '+977 98XXXXXXXX', true, false, 'phone-pad')}
//                   {renderFormField('Email', 'email', 'john@example.com', false, false, 'email-address')}
//                 </View>
                
//                 {/* Emergency Contact */}
//                 <View style={{ marginBottom: 24 }}>
//                   <View style={{ 
//                     flexDirection: 'row', 
//                     alignItems: 'center', 
//                     marginBottom: 16 
//                   }}>
//                     <Ionicons 
//                       name="alert-circle-outline" 
//                       size={20} 
//                       color={theme.colors.warning} 
//                       style={{ marginRight: 12 }}
//                     />
//                     <ThemeText style={{
//                       fontSize: 16,
//                       fontWeight: '600',
//                       color: theme.colors.text.primary,
//                     }}>
//                       Emergency Contact (Required)
//                     </ThemeText>
//                   </View>
                  
//                   <View style={{
//                     backgroundColor: `${theme.colors.warning}05`,
//                     padding: 16,
//                     borderRadius: 8,
//                     marginBottom: 16,
//                     borderWidth: 1,
//                     borderColor: `${theme.colors.warning}20`,
//                   }}>
//                     <ThemeText style={{
//                       fontSize: 13,
//                       color: theme.colors.text.secondary,
//                       lineHeight: 18,
//                       marginBottom: 12,
//                     }}>
//                       This information is required for your safety and will only be used in case of emergency.
//                     </ThemeText>
                    
//                     {renderEmergencyField('Contact Name', 'name', 'Emergency contact full name', true)}
//                     {renderEmergencyField('Phone Number', 'phone', '+977 98XXXXXXXX', true, 'phone-pad')}
//                     {renderEmergencyField('Relationship', 'relationship', 'Father, Mother, Spouse, etc.', true)}
//                   </View>
//                 </View>
                
//                 {/* Social Media (Optional) */}
//                 <View style={{ marginBottom: 24 }}>
//                   <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
//                     <Ionicons 
//                       name="share-social-outline" 
//                       size={20} 
//                       color={theme.colors.text.secondary} 
//                       style={{ marginRight: 12 }}
//                     />
//                     <ThemeText style={{
//                       fontSize: 16,
//                       fontWeight: '600',
//                       color: theme.colors.text.primary,
//                     }}>
//                       Social Media (Optional)
//                     </ThemeText>
//                   </View>
                  
//                   <View style={{
//                     padding: 16,
//                     backgroundColor: `${theme.colors.border}10`,
//                     borderRadius: 8,
//                   }}>
//                     {renderSocialMediaField('TikTok', 'tiktok', '@username', 'logo-tiktok')}
//                     {renderSocialMediaField('Instagram', 'instagram', '@username', 'logo-instagram')}
//                     {renderSocialMediaField('Facebook', 'facebook', 'facebook.com/username', 'logo-facebook')}
//                   </View>
//                 </View>
//               </View>
//             </ScrollView>
            
//             {/* Action Buttons */}
//             <View style={{
//               position: 'absolute',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               backgroundColor: theme.colors.background,
//               borderTopWidth: 1,
//               borderTopColor: theme.colors.border,
//               padding: 16,
//               paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Safe area
//             }}>
//               <View style={{ flexDirection: 'row', gap: 12 }}>
//                 {/* Cancel Button */}
//                 <TouchableOpacity
//                   style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     backgroundColor: theme.colors.card,
//                     borderRadius: 12,
//                     padding: 16,
//                     borderWidth: 1,
//                     borderColor: theme.colors.border,
//                   }}
//                   onPress={onClose}
//                   disabled={loading}
//                 >
//                   <ThemeText style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text.primary }}>
//                     Cancel
//                   </ThemeText>
//                 </TouchableOpacity>
                
//                 {/* Join Button */}
//                 <TouchableOpacity
//                   style={{
//                     flex: 2,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     backgroundColor: theme.colors.primary,
//                     borderRadius: 12,
//                     padding: 16,
//                   }}
//                   onPress={handleSubmit}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <ActivityIndicator color="#FFFFFF" />
//                   ) : (
//                     <ThemeText style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
//                       Join Gym
//                     </ThemeText>
//                   )}
//                 </TouchableOpacity>
//               </View>
              
//               {/* Security Note */}
//               <ThemeText style={{
//                 fontSize: 12,
//                 color: theme.colors.text.secondary,
//                 textAlign: 'center',
//                 marginTop: 12,
//                 fontStyle: 'italic',
//               }}>
//                 🔒 Your information is encrypted and secure
//               </ThemeText>
//             </View>
//           </SafeAreaView>
//         </ThemeView>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default MemberAcceptanceFormModal;