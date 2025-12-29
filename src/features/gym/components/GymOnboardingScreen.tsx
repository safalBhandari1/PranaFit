// // export default GymOnboardingScreen;
// // src/features/gym/components/GymOnboardingScreen.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useGymStore } from '../stores/useGymStore';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import { createGymOnboardingStyles } from '../styles/gymOnboardingStyles';

// interface GymOnboardingScreenProps {
//   onComplete?: () => void;
//   onCancel?: () => void;
// }

// const GymOnboardingScreen: React.FC<GymOnboardingScreenProps> = ({ 
//   onComplete, 
//   onCancel 
// }) => {
//   const { theme } = useEnhancedTheme();
//   const { user } = useAppStore();
//   const { createGym, isLoading } = useGymStore();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     contactPhone: '',
//     street: '',
//     city: '',
//     country: 'Nepal',
//     description: '',
//     contactEmail: user?.email || '',
//   });

//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const styles = createGymOnboardingStyles(theme);

//   // Handle keyboard visibility
//   useEffect(() => {
//     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//     });
//     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//     });

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleCreateGym = async () => {
//     // Validation
//     if (!formData.name || !formData.contactPhone || !formData.street || !formData.city) {
//       Alert.alert('Missing Information', 'Please fill in all required fields');
//       return;
//     }

//     if (formData.contactPhone.length < 10) {
//       Alert.alert('Invalid Phone', 'Please enter a valid phone number');
//       return;
//     }

//     try {
//       const gymData = {
//         name: formData.name,
//         contactPhone: formData.contactPhone,
//         contactEmail: formData.contactEmail,
//         description: formData.description,
//         address: {
//           street: formData.street,
//           city: formData.city,
//           country: formData.country,
//         },
//         businessHours: {
//           monday: { open: true, openTime: '06:00', closeTime: '22:00' },
//           tuesday: { open: true, openTime: '06:00', closeTime: '22:00' },
//           wednesday: { open: true, openTime: '06:00', closeTime: '22:00' },
//           thursday: { open: true, openTime: '06:00', closeTime: '22:00' },
//           friday: { open: true, openTime: '06:00', closeTime: '22:00' },
//           saturday: { open: true, openTime: '08:00', closeTime: '20:00' },
//           sunday: { open: true, openTime: '08:00', closeTime: '18:00' },
//         },
//         packages: [
//           {
//             name: 'Basic Monthly',
//             description: 'Access to gym facilities',
//             price: 3000,
//             currency: 'NPR',
//             durationDays: 30,
//             features: ['Gym Access', 'Locker Room', 'Basic Amenities'],
//             isActive: true,
//           },
//           {
//             name: 'Premium Monthly',
//             description: 'Full access with additional benefits',
//             price: 5000,
//             currency: 'NPR',
//             durationDays: 30,
//             features: ['Gym Access', 'Personal Locker', 'Towels Service', 'Supplement Bar'],
//             isActive: true,
//           },
//         ],
//         settings: {
//           allowSelfCheckin: true,
//           requireCheckout: false,
//           enableNotifications: true,
//           defaultCurrency: 'NPR',
//           timezone: 'Asia/Kathmandu',
//         },
//         ownerId: user?.uid || '',
//       };

//       await createGym(gymData);
      
//       Alert.alert(
//         '🎉 Gym Created Successfully!',
//         `"${formData.name}" is now set up and ready to use.`,
//         [
//           { 
//             text: 'Get Started', 
//             onPress: () => {
//               if (onComplete) onComplete();
//             }
//           }
//         ]
//       );
//     } catch (error: any) {
//       console.error('Gym creation error:', error);
//       Alert.alert('Error', error.message || 'Failed to create gym. Please try again.');
//     }
//   };

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <ThemeView style={styles.modalContainer}>
//         {/* 🚀 Twitter-style Header */}
//         <View style={styles.modalHeader}>
//           <TouchableOpacity 
//             onPress={onCancel}
//             style={styles.backButton}
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
//           </TouchableOpacity>
          
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.modalTitle}>
//               Set Up Your Gym
//             </ThemeText>
//           </View>
          
//           <View style={{ width: 40 }} /> {/* Spacer for alignment */}
//         </View>

//         <KeyboardAvoidingView 
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.keyboardView}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//         >
//           {/* Fixed Content (No ScrollView) */}
//           <View style={styles.contentContainer}>
//             {/* Welcome Section - Compact */}
//             <View style={styles.welcomeSection}>
//               <View style={[styles.welcomeIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
//                 <Ionicons name="business" size={28} color={theme.colors.primary} />
//               </View>
//               <ThemeText variant="h2" style={styles.welcomeTitle}>
//                 Let's get your gym running
//               </ThemeText>
//               <ThemeText style={styles.welcomeText}>
//                 Fill in your gym details below.
//               </ThemeText>
//             </View>

//             {/* Form - All fields visible */}
//             <View style={styles.formSection}>
//               {/* Gym Name */}
//               <View style={styles.formGroup}>
//                 <ThemeText style={styles.label}>
//                   Gym Name <ThemeText style={styles.required}>*</ThemeText>
//                 </ThemeText>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter gym name"
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={formData.name}
//                   onChangeText={(text) => handleInputChange('name', text)}
//                   returnKeyType="next"
//                 />
//               </View>

//               {/* Contact Phone */}
//               <View style={styles.formGroup}>
//                 <ThemeText style={styles.label}>
//                   Contact Phone <ThemeText style={styles.required}>*</ThemeText>
//                 </ThemeText>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="98XXXXXXXX"
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={formData.contactPhone}
//                   onChangeText={(text) => handleInputChange('contactPhone', text)}
//                   keyboardType="phone-pad"
//                   returnKeyType="next"
//                 />
//               </View>

//               {/* Street Address */}
//               <View style={styles.formGroup}>
//                 <ThemeText style={styles.label}>
//                   Street Address <ThemeText style={styles.required}>*</ThemeText>
//                 </ThemeText>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Street name and number"
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={formData.street}
//                   onChangeText={(text) => handleInputChange('street', text)}
//                   returnKeyType="next"
//                 />
//               </View>

//               {/* City */}
//               <View style={styles.formGroup}>
//                 <ThemeText style={styles.label}>
//                   City <ThemeText style={styles.required}>*</ThemeText>
//                 </ThemeText>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="City"
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={formData.city}
//                   onChangeText={(text) => handleInputChange('city', text)}
//                   returnKeyType="next"
//                 />
//               </View>

//               {/* Description (Optional) - Only shown when keyboard is hidden */}
//               {!keyboardVisible && (
//                 <>
//                   <View style={styles.formGroup}>
//                     <ThemeText style={styles.label}>Description (Optional)</ThemeText>
//                     <TextInput
//                       style={[styles.input, styles.textArea]}
//                       placeholder="Tell members about your gym..."
//                       placeholderTextColor={theme.colors.text.secondary}
//                       value={formData.description}
//                       onChangeText={(text) => handleInputChange('description', text)}
//                       multiline
//                       numberOfLines={2}
//                       textAlignVertical="top"
//                     />
//                   </View>

//                   {/* Note */}
//                   <View style={styles.noteContainer}>
//                     <Ionicons name="information-circle" size={18} color={theme.colors.primary} />
//                     <ThemeText style={styles.noteText}>
//                       <ThemeText style={styles.noteBold}>Default packages</ThemeText> will be created. You can customize them later.
//                     </ThemeText>
//                   </View>
//                 </>
//               )}
//             </View>

//             {/* Buttons - Fixed at bottom */}
//             <View style={[
//               styles.buttonsContainer,
//               { marginBottom: keyboardVisible ? 20 : 40 }
//             ]}>
//               <TouchableOpacity
//                 style={[
//                   styles.submitButton,
//                   (!formData.name || !formData.contactPhone || !formData.street || !formData.city) && 
//                   styles.submitButtonDisabled
//                 ]}
//                 onPress={handleCreateGym}
//                 disabled={!formData.name || !formData.contactPhone || !formData.street || !formData.city || isLoading}
//               >
//                 <ThemeText style={styles.submitButtonText}>
//                   {isLoading ? 'Creating Gym...' : 'Create My Gym'}
//                 </ThemeText>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={onCancel}
//                 disabled={isLoading}
//               >
//                 <ThemeText style={styles.cancelButtonText}>
//                   Cancel
//                 </ThemeText>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </ThemeView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default GymOnboardingScreen;

// src/features/gym/components/GymOnboardingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useGymStore } from '../stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import { createGymOnboardingStyles } from '../styles/gymOnboardingStyles';

interface GymOnboardingScreenProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const GymOnboardingScreen: React.FC<GymOnboardingScreenProps> = ({ 
  onComplete, 
  onCancel 
}) => {
  const { theme } = useEnhancedTheme();
  const { user } = useAppStore();
  const { createGym, isLoading } = useGymStore();
  
  const [formData, setFormData] = useState({
    name: '',
    contactPhone: '',
    street: '',
    city: '',
    country: 'Nepal',
    description: '',
    contactEmail: user?.email || '',
  });

  const styles = createGymOnboardingStyles(theme);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateGym = async () => {
    // Validation
    if (!formData.name || !formData.contactPhone || !formData.street || !formData.city) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (formData.contactPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return;
    }

    try {
      const gymData = {
        name: formData.name,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        description: formData.description,
        address: {
          street: formData.street,
          city: formData.city,
          country: formData.country,
        },
        businessHours: {
          monday: { open: true, openTime: '06:00', closeTime: '22:00' },
          tuesday: { open: true, openTime: '06:00', closeTime: '22:00' },
          wednesday: { open: true, openTime: '06:00', closeTime: '22:00' },
          thursday: { open: true, openTime: '06:00', closeTime: '22:00' },
          friday: { open: true, openTime: '06:00', closeTime: '22:00' },
          saturday: { open: true, openTime: '08:00', closeTime: '20:00' },
          sunday: { open: true, openTime: '08:00', closeTime: '18:00' },
        },
        packages: [
          {
            name: 'Basic Monthly',
            description: 'Access to gym facilities',
            price: 3000,
            currency: 'NPR',
            durationDays: 30,
            features: ['Gym Access', 'Locker Room', 'Basic Amenities'],
            isActive: true,
          },
          {
            name: 'Premium Monthly',
            description: 'Full access with additional benefits',
            price: 5000,
            currency: 'NPR',
            durationDays: 30,
            features: ['Gym Access', 'Personal Locker', 'Towels Service', 'Supplement Bar'],
            isActive: true,
          },
        ],
        settings: {
          allowSelfCheckin: true,
          requireCheckout: false,
          enableNotifications: true,
          defaultCurrency: 'NPR',
          timezone: 'Asia/Kathmandu',
        },
        ownerId: user?.uid || '',
      };

      await createGym(gymData);
      
      Alert.alert(
        '🎉 Gym Created Successfully!',
        `"${formData.name}" is now set up and ready to use.`,
        [
          { 
            text: 'Get Started', 
            onPress: () => {
              if (onComplete) onComplete();
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('Gym creation error:', error);
      Alert.alert('Error', error.message || 'Failed to create gym. Please try again.');
    }
  };

  return (
    <ThemeView style={styles.container}>
      {/* 🚀 Twitter-style Header (matches ExerciseSelectionStep) */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onCancel}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <ThemeText style={styles.headerTitle}>
            Set Up Your Gym
          </ThemeText>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* 🚀 Scrollable Content (matching exercise modal pattern) */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={[styles.welcomeIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Ionicons name="business" size={28} color={theme.colors.primary} />
            </View>
            <ThemeText variant="h2" style={styles.welcomeTitle}>
              Let's get your gym running
            </ThemeText>
            <ThemeText style={styles.welcomeText}>
              Fill in your gym details below. You can always update this information later.
            </ThemeText>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Gym Name */}
            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>
                Gym Name <ThemeText style={styles.required}>*</ThemeText>
              </ThemeText>
              <TextInput
                style={styles.input}
                placeholder="Enter gym name"
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                returnKeyType="next"
              />
            </View>

            {/* Contact Phone */}
            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>
                Contact Phone <ThemeText style={styles.required}>*</ThemeText>
              </ThemeText>
              <TextInput
                style={styles.input}
                placeholder="98XXXXXXXX"
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.contactPhone}
                onChangeText={(text) => handleInputChange('contactPhone', text)}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>

            {/* Contact Email */}
            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>Contact Email</ThemeText>
              <TextInput
                style={styles.input}
                placeholder="contact@gym.com"
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.contactEmail}
                onChangeText={(text) => handleInputChange('contactEmail', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            {/* Address */}
            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>
                Street Address <ThemeText style={styles.required}>*</ThemeText>
              </ThemeText>
              <TextInput
                style={styles.input}
                placeholder="Street name and number"
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.street}
                onChangeText={(text) => handleInputChange('street', text)}
                returnKeyType="next"
              />
            </View>

            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>
                City <ThemeText style={styles.required}>*</ThemeText>
              </ThemeText>
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.city}
                onChangeText={(text) => handleInputChange('city', text)}
                returnKeyType="next"
              />
            </View>

            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>Country</ThemeText>
              <TextInput
                style={styles.input}
                placeholder="Country"
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.country}
                onChangeText={(text) => handleInputChange('country', text)}
                returnKeyType="next"
              />
            </View>

            {/* Description */}
            <View style={styles.formGroup}>
              <ThemeText style={styles.label}>Description (Optional)</ThemeText>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell members about your gym, facilities, and services..."
                placeholderTextColor={theme.colors.text.secondary}
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Note */}
            <View style={styles.noteContainer}>
              <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
              <ThemeText style={styles.noteText}>
                <ThemeText style={styles.noteBold}>Default packages</ThemeText> will be created for your gym. You can customize them later in gym settings.
              </ThemeText>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!formData.name || !formData.contactPhone || !formData.street || !formData.city) && 
                styles.submitButtonDisabled
              ]}
              onPress={handleCreateGym}
              disabled={!formData.name || !formData.contactPhone || !formData.street || !formData.city || isLoading}
            >
              <ThemeText style={styles.submitButtonText}>
                {isLoading ? 'Creating Gym...' : 'Create My Gym'}
              </ThemeText>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              disabled={isLoading}
            >
              <ThemeText style={styles.cancelButtonText}>
                Cancel
              </ThemeText>
            </TouchableOpacity>
          </View>
          
          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
};

export default GymOnboardingScreen;