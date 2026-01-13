// // src/features/gym/components/GymOnboardingScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   SafeAreaView,
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

//   const styles = createGymOnboardingStyles(theme);

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

//   // Check if form is valid
//   const isFormValid = formData.name && formData.contactPhone && formData.street && formData.city;

//   return (
//     <ThemeView style={styles.container}>
//       <StatusBar 
//         barStyle={theme.dark ? 'light-content' : 'dark-content'}
//         backgroundColor={theme.colors.background}
//       />
      
//       {/* 🚀 Twitter-style Header (EXACTLY like ExerciseSelectionStep) */}
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.header}>
//           {/* Left: Back Arrow (Twitter style - only arrow, no text) */}
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={onCancel}
//             activeOpacity={0.7}
//             disabled={isLoading}
//           >
//             <ThemeText style={[styles.backArrow, { color: theme.colors.primary }]}>
//               ←
//             </ThemeText>
//           </TouchableOpacity>
          
//           {/* Center: Title */}
//           <View style={styles.headerTitleContainer}>
//             <ThemeText style={styles.headerTitle}>
//               Set Up Your Gym
//             </ThemeText>
//           </View>
          
//           {/* Right: Empty spacer for balance */}
//           <View style={styles.headerSpacer} />
//         </View>
//       </SafeAreaView>
      
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         {/* Scrollable Content */}
//         <ScrollView 
//           style={styles.scrollView}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Welcome Section */}
//           <View style={styles.welcomeSection}>
//             <View style={[styles.welcomeIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
//               <Ionicons name="business" size={28} color={theme.colors.primary} />
//             </View>
//             <ThemeText style={styles.welcomeTitle}>
//               Let's get your gym running
//             </ThemeText>
//             <ThemeText style={styles.welcomeText}>
//               Fill in your gym details below. You can always update this information later.
//             </ThemeText>
//           </View>

//           {/* Form Section */}
//           <View style={styles.formSection}>
//             {/* Gym Name */}
//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>
//                 Gym Name <ThemeText style={styles.required}>*</ThemeText>
//               </ThemeText>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter gym name"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.name}
//                 onChangeText={(text) => handleInputChange('name', text)}
//                 returnKeyType="next"
//                 editable={!isLoading}
//               />
//             </View>

//             {/* Contact Phone */}
//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>
//                 Contact Phone <ThemeText style={styles.required}>*</ThemeText>
//               </ThemeText>
//               <TextInput
//                 style={styles.input}
//                 placeholder="98XXXXXXXX"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.contactPhone}
//                 onChangeText={(text) => handleInputChange('contactPhone', text)}
//                 keyboardType="phone-pad"
//                 returnKeyType="next"
//                 editable={!isLoading}
//               />
//             </View>

//             {/* Contact Email */}
//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>Contact Email</ThemeText>
//               <TextInput
//                 style={styles.input}
//                 placeholder="contact@gym.com"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.contactEmail}
//                 onChangeText={(text) => handleInputChange('contactEmail', text)}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 returnKeyType="next"
//                 editable={!isLoading}
//               />
//             </View>

//             {/* Address */}
//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>
//                 Street Address <ThemeText style={styles.required}>*</ThemeText>
//               </ThemeText>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Street name and number"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.street}
//                 onChangeText={(text) => handleInputChange('street', text)}
//                 returnKeyType="next"
//                 editable={!isLoading}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>
//                 City <ThemeText style={styles.required}>*</ThemeText>
//               </ThemeText>
//               <TextInput
//                 style={styles.input}
//                 placeholder="City"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.city}
//                 onChangeText={(text) => handleInputChange('city', text)}
//                 returnKeyType="next"
//                 editable={!isLoading}
//               />
//             </View>

//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>Country</ThemeText>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Country"
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.country}
//                 onChangeText={(text) => handleInputChange('country', text)}
//                 returnKeyType="next"
//                 editable={!isLoading}
//               />
//             </View>

//             {/* Description */}
//             <View style={styles.formGroup}>
//               <ThemeText style={styles.label}>Description (Optional)</ThemeText>
//               <TextInput
//                 style={[styles.input, styles.textArea]}
//                 placeholder="Tell members about your gym, facilities, and services..."
//                 placeholderTextColor={theme.colors.text.secondary}
//                 value={formData.description}
//                 onChangeText={(text) => handleInputChange('description', text)}
//                 multiline
//                 numberOfLines={3}
//                 textAlignVertical="top"
//                 editable={!isLoading}
//               />
//             </View>

//             {/* Note */}
//             <View style={styles.noteContainer}>
//               <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
//               <ThemeText style={styles.noteText}>
//                 <ThemeText style={styles.noteBold}>Default packages</ThemeText> will be created for your gym. You can customize them later in gym settings.
//               </ThemeText>
//             </View>
            
//             {/* Bottom Spacer for Footer */}
//             <View style={styles.bottomSpacer} />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* 🚀 Fixed Footer (EXACTLY like ExerciseSelectionStep) */}
//       <SafeAreaView style={styles.footerSafeArea} edges={['bottom']}>
//         <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
//           <View style={styles.selectionActions}>
//             <TouchableOpacity 
//               style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
//               onPress={onCancel}
//               disabled={isLoading}
//             >
//               <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
//                 Cancel
//               </ThemeText>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[
//                 styles.startSessionButton, 
//                 { backgroundColor: isFormValid ? theme.colors.primary : theme.colors.border }
//               ]}
//               onPress={handleCreateGym}
//               disabled={!isFormValid || isLoading}
//             >
//               <ThemeText style={[
//                 styles.startSessionButtonText,
//                 { color: isFormValid ? '#FFF' : theme.colors.text.secondary }
//               ]}>
//                 {isLoading ? 'Creating Gym...' : 'Create My Gym'}
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     </ThemeView>
//   );
// };

// export default GymOnboardingScreen;
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Updated import
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

// Step 1: Basic Info Interface
interface BasicInfoData {
  name: string;
  contactPhone: string;
  contactEmail: string;
  street: string;
  city: string;
  country: string;
  description: string;
}

// Step 2: Business Hours Interface
interface BusinessHoursData {
  [key: string]: {
    open: boolean;
    openTime: string;
    closeTime: string;
  };
}

// Step 3: Package Interface
interface PackageData {
  name: string;
  description: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  isActive: boolean;
}

const GymOnboardingScreen: React.FC<GymOnboardingScreenProps> = ({ 
  onComplete, 
  onCancel 
}) => {
  const { theme } = useEnhancedTheme();
  const { user } = useAppStore();
  const { createGym, isLoading } = useGymStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 Data
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    name: '',
    contactPhone: '',
    contactEmail: user?.email || '',
    street: '',
    city: '',
    country: 'Nepal',
    description: '',
  });

  // Step 2 Data - Default hours as specified
  const [businessHours, setBusinessHours] = useState<BusinessHoursData>({
    monday: { open: true, openTime: '06:00', closeTime: '20:00' },
    tuesday: { open: true, openTime: '06:00', closeTime: '20:00' },
    wednesday: { open: true, openTime: '06:00', closeTime: '20:00' },
    thursday: { open: true, openTime: '06:00', closeTime: '20:00' },
    friday: { open: true, openTime: '06:00', closeTime: '20:00' },
    saturday: { open: false, openTime: '08:00', closeTime: '18:00' },
    sunday: { open: true, openTime: '08:00', closeTime: '18:00' },
  });

  // Step 3 Data - Default packages with add-ons
  const [packages, setPackages] = useState<PackageData[]>([
    {
      name: '1-Month Package',
      description: 'Basic gym access for 1 month',
      price: 2000,
      currency: 'NPR',
      durationDays: 30,
      features: ['Gym Access', 'Locker Room'],
      isActive: true,
    },
    {
      name: '3-Months Package',
      description: 'Basic gym access for 3 months',
      price: 5500,
      currency: 'NPR',
      durationDays: 90,
      features: ['Gym Access', 'Locker Room', '10% Discount'],
      isActive: true,
    },
    {
      name: '6-Months Package',
      description: 'Basic gym access for 6 months',
      price: 10000,
      currency: 'NPR',
      durationDays: 180,
      features: ['Gym Access', 'Locker Room', '15% Discount', 'Free Towel Service'],
      isActive: true,
    },
  ]);

  const [addOns, setAddOns] = useState([
    { id: 'cardio', name: '+ Cardio', price: 1000, selected: false },
    { id: 'zumba', name: '+ Zumba', price: 1000, selected: false },
    { id: 'cardio_zumba', name: '+ Cardio + Zumba', price: 1500, selected: false },
  ]);

  const styles = createGymOnboardingStyles(theme);

  // ============ STEP 1: BASIC INFO ============
  const handleBasicInfoChange = (field: keyof BasicInfoData, value: string) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = (): boolean => {
    if (!basicInfo.name || !basicInfo.contactPhone || !basicInfo.street || !basicInfo.city) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return false;
    }
    if (basicInfo.contactPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const renderStep1 = () => (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <ThemeText style={styles.welcomeTitle}>
          Basic Gym Information
        </ThemeText>
        <ThemeText style={styles.welcomeText}>
          Tell us about your gym. You can always update this later.
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
            value={basicInfo.name}
            onChangeText={(text) => handleBasicInfoChange('name', text)}
            returnKeyType="next"
            editable={!isLoading}
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
            value={basicInfo.contactPhone}
            onChangeText={(text) => handleBasicInfoChange('contactPhone', text)}
            keyboardType="phone-pad"
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>

        {/* Contact Email */}
        <View style={styles.formGroup}>
          <ThemeText style={styles.label}>Contact Email</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="contact@gym.com"
            placeholderTextColor={theme.colors.text.secondary}
            value={basicInfo.contactEmail}
            onChangeText={(text) => handleBasicInfoChange('contactEmail', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            editable={!isLoading}
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
            value={basicInfo.street}
            onChangeText={(text) => handleBasicInfoChange('street', text)}
            returnKeyType="next"
            editable={!isLoading}
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
            value={basicInfo.city}
            onChangeText={(text) => handleBasicInfoChange('city', text)}
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>

        <View style={styles.formGroup}>
          <ThemeText style={styles.label}>Country</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Country"
            placeholderTextColor={theme.colors.text.secondary}
            value={basicInfo.country}
            onChangeText={(text) => handleBasicInfoChange('country', text)}
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <ThemeText style={styles.label}>Description (Optional)</ThemeText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell members about your gym, facilities, and services..."
            placeholderTextColor={theme.colors.text.secondary}
            value={basicInfo.description}
            onChangeText={(text) => handleBasicInfoChange('description', text)}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            editable={!isLoading}
          />
        </View>

        {/* Bottom Spacer for Footer */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  // ============ STEP 2: BUSINESS HOURS ============
  const handleDayToggle = (day: string) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        open: !prev[day].open
      }
    }));
  };

  const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', value: string) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const renderDayRow = (day: string, label: string) => {
    const dayData = businessHours[day];
    
    return (
      <View style={styles.dayRow} key={day}>
        <View style={styles.dayLabelContainer}>
          <Switch
            value={dayData.open}
            onValueChange={() => handleDayToggle(day)}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor="#FFFFFF"
          />
          <ThemeText style={styles.dayLabel}>{label}</ThemeText>
        </View>
        
        {dayData.open ? (
          <View style={styles.timeInputs}>
            <TextInput
              style={[styles.timeInput, !dayData.open && styles.disabledInput]}
              value={dayData.openTime}
              onChangeText={(text) => handleTimeChange(day, 'openTime', text)}
              placeholder="06:00"
              keyboardType="numbers-and-punctuation"
              editable={dayData.open}
            />
            <ThemeText style={styles.timeSeparator}>to</ThemeText>
            <TextInput
              style={[styles.timeInput, !dayData.open && styles.disabledInput]}
              value={dayData.closeTime}
              onChangeText={(text) => handleTimeChange(day, 'closeTime', text)}
              placeholder="20:00"
              keyboardType="numbers-and-punctuation"
              editable={dayData.open}
            />
          </View>
        ) : (
          <ThemeText style={styles.closedText}>Closed</ThemeText>
        )}
      </View>
    );
  };

  const renderStep2 = () => (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcomeSection}>
        <ThemeText style={styles.welcomeTitle}>
          Business Hours
        </ThemeText>
        <ThemeText style={styles.welcomeText}>
          Set your gym's operating hours. Members will see these times.
        </ThemeText>
      </View>

      <View style={styles.hoursSection}>
        {renderDayRow('monday', 'Monday')}
        {renderDayRow('tuesday', 'Tuesday')}
        {renderDayRow('wednesday', 'Wednesday')}
        {renderDayRow('thursday', 'Thursday')}
        {renderDayRow('friday', 'Friday')}
        {renderDayRow('saturday', 'Saturday')}
        {renderDayRow('sunday', 'Sunday')}
        
        <View style={styles.hoursNote}>
          <Ionicons name="information-circle" size={18} color={theme.colors.primary} />
          <ThemeText style={styles.hoursNoteText}>
            Use 24-hour format (e.g., 06:00 for 6 AM, 20:00 for 8 PM)
          </ThemeText>
        </View>
        
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  // ============ STEP 3: PACKAGES ============
  const updatePackagePrice = (index: number, amount: number) => {
    setPackages(prev => {
      const updated = [...prev];
      const newPrice = Math.max(0, updated[index].price + amount);
      updated[index] = { ...updated[index], price: newPrice };
      return updated;
    });
  };

  const toggleAddOn = (id: string) => {
    setAddOns(prev => prev.map(addOn => 
      addOn.id === id ? { ...addOn, selected: !addOn.selected } : addOn
    ));
  };

  const calculateTotalWithAddOns = (basePrice: number): number => {
    let total = basePrice;
    addOns.forEach(addOn => {
      if (addOn.selected) {
        // Adjust for package duration
        const addOnPrice = addOn.id === 'cardio_zumba' ? addOn.price : addOn.price;
        total += addOnPrice;
      }
    });
    return total;
  };

  const renderStep3 = () => (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcomeSection}>
        <ThemeText style={styles.welcomeTitle}>
          Membership Packages
        </ThemeText>
        <ThemeText style={styles.welcomeText}>
          Set up your membership packages. You can edit prices and add-ons.
        </ThemeText>
      </View>

      {/* Base Packages */}
      <View style={styles.packagesSection}>
        <ThemeText style={styles.sectionTitle}>Base Packages</ThemeText>
        
        {packages.map((pkg, index) => {
          const totalPrice = calculateTotalWithAddOns(pkg.price);
          
          return (
            <View key={index} style={styles.packageCard}>
              <View style={styles.packageHeader}>
                <ThemeText style={styles.packageName}>{pkg.name}</ThemeText>
                <ThemeText style={styles.packageDuration}>{pkg.durationDays} days</ThemeText>
              </View>
              
              <ThemeText style={styles.packageDescription}>{pkg.description}</ThemeText>
              
              <View style={styles.priceSection}>
                <View style={styles.priceControls}>
                  <TouchableOpacity 
                    style={styles.priceButton}
                    onPress={() => updatePackagePrice(index, -100)}
                  >
                    <Ionicons name="remove" size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                  
                  <View style={styles.priceDisplay}>
                    <ThemeText style={styles.priceAmount}>NPR {pkg.price.toLocaleString()}</ThemeText>
                    <ThemeText style={styles.priceLabel}>Base Price</ThemeText>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.priceButton}
                    onPress={() => updatePackagePrice(index, 100)}
                  >
                    <Ionicons name="add" size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
                
                {addOns.some(a => a.selected) && (
                  <View style={styles.totalPrice}>
                    <ThemeText style={styles.totalPriceLabel}>Total with add-ons:</ThemeText>
                    <ThemeText style={styles.totalPriceAmount}>NPR {totalPrice.toLocaleString()}</ThemeText>
                  </View>
                )}
              </View>
              
              <View style={styles.featuresList}>
                {pkg.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
                    <ThemeText style={styles.featureText}>{feature}</ThemeText>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>

      {/* Add-ons Section */}
      <View style={styles.addOnsSection}>
        <ThemeText style={styles.sectionTitle}>Optional Add-ons</ThemeText>
        <ThemeText style={styles.addOnsSubtitle}>Select add-ons to include in all packages</ThemeText>
        
        {addOns.map((addOn) => (
          <TouchableOpacity
            key={addOn.id}
            style={[
              styles.addOnCard,
              addOn.selected && styles.addOnCardSelected
            ]}
            onPress={() => toggleAddOn(addOn.id)}
          >
            <View style={styles.addOnInfo}>
              <ThemeText style={[
                styles.addOnName,
                addOn.selected && styles.addOnNameSelected
              ]}>
                {addOn.name}
              </ThemeText>
              <ThemeText style={styles.addOnPrice}>+ NPR {addOn.price}/month</ThemeText>
            </View>
            
            <View style={[
              styles.addOnCheckbox,
              addOn.selected && styles.addOnCheckboxSelected
            ]}>
              {addOn.selected && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
        ))}
        
        <View style={styles.noteContainer}>
          <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
          <ThemeText style={styles.noteText}>
            <ThemeText style={styles.noteBold}>Add-on prices</ThemeText> are per month and will be added to all selected packages.
          </ThemeText>
        </View>
        
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  // ============ STEP NAVIGATION ============
  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ============ FINAL GYM CREATION ============
  const handleCreateGym = async () => {
    try {
      // Combine all data from 3 steps
      const gymData = {
        name: basicInfo.name,
        contactPhone: basicInfo.contactPhone,
        contactEmail: basicInfo.contactEmail,
        description: basicInfo.description,
        address: {
          street: basicInfo.street,
          city: basicInfo.city,
          country: basicInfo.country,
        },
        businessHours: businessHours,
        packages: packages,
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
        `"${basicInfo.name}" is now set up and ready to use.`,
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

  // ============ RENDER STEP CONTENT ============
  const renderStepContent = () => {
    switch(currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  // Check if step 1 is valid
  const isStep1Valid = basicInfo.name && basicInfo.contactPhone && 
                      basicInfo.street && basicInfo.city;

  // Check if step 3 is valid (at least one package active)
  const isStep3Valid = packages.some(pkg => pkg.isActive);

  return (
    <ThemeView style={styles.container}>
      <StatusBar 
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      {/* Header with Logo-Based Step Indicator */}
      <SafeAreaView style={styles.safeArea}>
        {/* Main Header */}
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={currentStep === 1 ? onCancel : handleBack}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            <ThemeText style={[styles.backArrow, { color: theme.colors.primary }]}>
              ←
            </ThemeText>
          </TouchableOpacity>
          
          {/* Center: Main Title */}
          <View style={styles.headerTitleContainer}>
            <ThemeText style={styles.headerTitle}>
              Set Up Your Gym
            </ThemeText>
          </View>
          
          {/* Right spacer */}
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Logo-Based Step Indicator (Below Header) */}
        <View style={styles.logoStepIndicator}>
          {/* Step 1: Info Logo */}
          <View style={styles.stepLogoContainer}>
            <View style={[
              styles.stepLogoCircle,
              currentStep >= 1 && styles.stepLogoCircleActive
            ]}>
              <Ionicons 
                name="business" 
                size={20} 
                color={currentStep >= 1 ? theme.colors.primary : theme.colors.text.secondary} 
              />
            </View>
            <ThemeText style={[
              styles.stepLogoLabel,
              currentStep >= 1 && styles.stepLogoLabelActive
            ]}>
              Info
            </ThemeText>
          </View>
          
          {/* Connecting Line */}
          <View style={styles.stepConnector} />
          
          {/* Step 2: Hours Logo */}
          <View style={styles.stepLogoContainer}>
            <View style={[
              styles.stepLogoCircle,
              currentStep >= 2 && styles.stepLogoCircleActive
            ]}>
              <Ionicons 
                name="time" 
                size={20} 
                color={currentStep >= 2 ? theme.colors.primary : theme.colors.text.secondary} 
              />
            </View>
            <ThemeText style={[
              styles.stepLogoLabel,
              currentStep >= 2 && styles.stepLogoLabelActive
            ]}>
              Hours
            </ThemeText>
          </View>
          
          {/* Connecting Line */}
          <View style={styles.stepConnector} />
          
          {/* Step 3: Packages Logo */}
          <View style={styles.stepLogoContainer}>
            <View style={[
              styles.stepLogoCircle,
              currentStep >= 3 && styles.stepLogoCircleActive
            ]}>
              <Ionicons 
                name="cash" 
                size={20} 
                color={currentStep >= 3 ? theme.colors.primary : theme.colors.text.secondary} 
              />
            </View>
            <ThemeText style={[
              styles.stepLogoLabel,
              currentStep >= 3 && styles.stepLogoLabelActive
            ]}>
              Packages
            </ThemeText>
          </View>
        </View>
      </SafeAreaView>
      
      {/* Step Content */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {renderStepContent()}
      </KeyboardAvoidingView>

      {/* Footer with Dynamic Buttons */}
      <SafeAreaView style={styles.footerSafeArea} edges={['bottom']}>
        <View style={[styles.fixedFooter, { backgroundColor: theme.colors.background }]}>
          <View style={styles.selectionActions}>
            {/* Left Button */}
            <TouchableOpacity 
              style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
              onPress={currentStep === 1 ? onCancel : handleBack}
              disabled={isLoading}
            >
              <ThemeText style={[styles.cancelButtonText, { color: theme.colors.text.secondary }]}>
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </ThemeText>
            </TouchableOpacity>
            
            {/* Right Button */}
            <TouchableOpacity 
              style={[
                styles.startSessionButton, 
                { 
                  backgroundColor: currentStep === 3 
                    ? (isStep3Valid ? theme.colors.primary : theme.colors.border)
                    : (isStep1Valid ? theme.colors.primary : theme.colors.border)
                }
              ]}
              onPress={currentStep === 3 ? handleCreateGym : handleNext}
              disabled={
                isLoading || 
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 3 && !isStep3Valid)
              }
            >
              <ThemeText style={[
                styles.startSessionButtonText,
                { 
                  color: currentStep === 3 
                    ? (isStep3Valid ? '#FFF' : theme.colors.text.secondary)
                    : (isStep1Valid ? '#FFF' : theme.colors.text.secondary)
                }
              ]}>
                {isLoading ? 'Creating...' : 
                 currentStep === 3 ? 'Create My Gym' : 'Next'}
              </ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ThemeView>
  );
};

export default GymOnboardingScreen;