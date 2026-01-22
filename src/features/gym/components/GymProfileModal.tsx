// src/features/gym/components/GymProfileModal.tsx
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
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useGymStore } from '../stores/useGymStore';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { createGymProfileModalStyles } from '../styles/gymProfileModalStyles';

interface GymProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit?: () => void; // ✅ ADDED: For edit mode
}

export const GymProfileModal: React.FC<GymProfileModalProps> = ({
  visible,
  onClose,
  onEdit,
}) => {
  const { theme } = useEnhancedTheme();
  const { currentGym, isLoading } = useGymStore();
  const { currentGymRole } = useUserRole();
  
  const [loading, setLoading] = useState(false);

  const styles = createGymProfileModalStyles(theme);
  const isOwner = currentGymRole === 'owner';

  // Check if gym is open
  const isGymOpen = () => {
    if (!currentGym?.businessHours) return false;
    
    const now = new Date();
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
    if (!hours?.open) return false;
    
    const [openHour, openMinute] = hours.openTime.split(':').map(Number);
    const [closeHour, closeMinute] = hours.closeTime.split(':').map(Number);
    
    const openTime = new Date(now);
    openTime.setHours(openHour, openMinute, 0, 0);
    
    const closeTime = new Date(now);
    closeTime.setHours(closeHour, closeMinute, 0, 0);
    
    return now >= openTime && now <= closeTime;
  };

  // Get today's hours
  const getTodaysHours = () => {
    if (!currentGym?.businessHours) return 'Not set';
    
    const now = new Date();
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const hours = currentGym.businessHours[dayOfWeek as keyof typeof currentGym.businessHours];
    
    if (!hours?.open) return 'Closed today';
    return `${hours.openTime} - ${hours.closeTime}`;
  };

  // Handle phone call
  const handleCall = () => {
    if (!currentGym?.contactPhone) return;
    
    const phone = currentGym.contactPhone.replace(/\D/g, '');
    const url = `tel:${phone}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  // Handle SMS
  const handleSMS = () => {
    if (!currentGym?.contactPhone) return;
    
    const phone = currentGym.contactPhone.replace(/\D/g, '');
    const url = `sms:${phone}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to send SMS');
    });
  };

  // Handle share
  const handleShare = async () => {
    if (!currentGym) return;
    
    try {
      const message = `🏢 ${currentGym.name}\n📍 ${currentGym.address?.street}, ${currentGym.address?.city}\n📞 ${currentGym.contactPhone}\n⏰ Today's Hours: ${getTodaysHours()}`;
      
      await Share.share({
        message,
        title: `${currentGym.name} - Gym Details`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Handle edit - calls parent's onEdit function
  const handleEdit = () => {
    console.log('🎯 Opening edit mode for gym:', currentGym?.name);
    if (onEdit) {
      onEdit();
    }
  };

  // Format phone number
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onClose}
        disabled={loading}
      >
        <ThemeText style={[styles.backArrow, { color: theme.colors.primary }]}>
          ←
        </ThemeText>
      </TouchableOpacity>
      
      <View style={styles.headerTitleContainer}>
        <ThemeText style={styles.headerTitle}>
          Gym Profile
        </ThemeText>
      </View>
      
      <View style={styles.headerSpacer} />
    </View>
  );

  // Render logo and name section (orange highlight)
  const renderLogoAndName = () => (
    <View style={styles.logoNameSection}>
      <View style={styles.logoContainer}>
        <View style={[styles.logoCircle, { backgroundColor: `${theme.colors.primary}15` }]}>
          <Ionicons name="business" size={32} color={theme.colors.primary} />
        </View>
      </View>
      
      <ThemeText style={styles.gymName}>
        {currentGym?.name}
      </ThemeText>
      
      <View style={styles.statusBadge}>
        <View style={[
          styles.statusDot,
          { backgroundColor: isGymOpen() ? theme.colors.primary : theme.colors.warning }
        ]} />
        <ThemeText style={[
          styles.statusText,
          { color: isGymOpen() ? theme.colors.primary : theme.colors.warning }
        ]}>
          {isGymOpen() ? 'OPEN NOW' : 'CLOSED'}
        </ThemeText>
      </View>
    </View>
  );

  // Render basic information card (now includes address)
  const renderBasicInfo = () => (
    <View style={styles.section}>
      <ThemeText style={styles.sectionTitle}>
        Basic Information
      </ThemeText>
      
      <View style={styles.card}>
        {/* Phone */}
        <View style={styles.cardRow}>
          <View style={styles.rowLeft}>
            <Ionicons 
              name="call-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={styles.rowIcon}
            />
            <ThemeText style={styles.rowLabel}>
              Phone
            </ThemeText>
          </View>
          <View style={styles.rowRight}>
            <ThemeText style={styles.rowValue}>
              {currentGym?.contactPhone ? formatPhoneNumber(currentGym.contactPhone) : 'Not set'}
            </ThemeText>
            {currentGym?.contactPhone && (
              <View style={styles.phoneActions}>
                <TouchableOpacity
                  style={styles.phoneActionButton}
                  onPress={handleCall}
                >
                  <Ionicons name="call" size={18} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.phoneActionButton}
                  onPress={handleSMS}
                >
                  <Ionicons name="chatbubble-outline" size={18} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Email */}
        <View style={styles.cardRow}>
          <View style={styles.rowLeft}>
            <Ionicons 
              name="mail-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={styles.rowIcon}
            />
            <ThemeText style={styles.rowLabel}>
              Email
            </ThemeText>
          </View>
          <ThemeText style={styles.rowValue}>
            {currentGym?.contactEmail || 'Not set'}
          </ThemeText>
        </View>
        
        <View style={styles.divider} />
        
        {/* Address */}
        <View style={styles.addressSection}>
          <View style={styles.rowLeft}>
            <Ionicons 
              name="location-outline" 
              size={22} 
              color={theme.colors.text.primary}
              style={styles.rowIcon}
            />
            <ThemeText style={styles.rowLabel}>
              Address
            </ThemeText>
          </View>
          <ThemeText style={styles.addressText}>
            {currentGym?.address?.street || 'Street address not set'}
          </ThemeText>
          <ThemeText style={styles.addressText}>
            {currentGym?.address?.city || 'City not set'}, {currentGym?.address?.country || 'Country not set'}
          </ThemeText>
        </View>
        
        {currentGym?.website && (
          <>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <View style={styles.rowLeft}>
                <Ionicons 
                  name="globe-outline" 
                  size={22} 
                  color={theme.colors.text.primary}
                  style={styles.rowIcon}
                />
                <ThemeText style={styles.rowLabel}>
                  Website
                </ThemeText>
              </View>
              <ThemeText style={[styles.rowValue, { color: theme.colors.primary }]}>
                {currentGym.website}
              </ThemeText>
            </View>
          </>
        )}
      </View>
    </View>
  );

  // Render packages card
  const renderPackages = () => (
    <View style={styles.section}>
      <ThemeText style={styles.sectionTitle}>
        Membership Packages
      </ThemeText>
      
      <View style={styles.card}>
        {currentGym?.packages && currentGym.packages.length > 0 ? (
          currentGym.packages.map((pkg, index) => (
            <View key={pkg.id} style={[
              styles.packageItem,
              index < currentGym.packages.length - 1 && styles.packageItemBorder
            ]}>
              <View style={styles.packageHeader}>
                <ThemeText style={styles.packageName}>
                  {pkg.name}
                </ThemeText>
                <View style={[
                  styles.packageStatus,
                  { backgroundColor: pkg.isActive ? `${theme.colors.primary}15` : `${theme.colors.warning}15` }
                ]}>
                  <ThemeText style={[
                    styles.packageStatusText,
                    { color: pkg.isActive ? theme.colors.primary : theme.colors.warning }
                  ]}>
                    {pkg.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </ThemeText>
                </View>
              </View>
              
              <ThemeText style={styles.packageDescription}>
                {pkg.description || 'No description'}
              </ThemeText>
              
              <View style={styles.packageDetails}>
                <View style={styles.packageDetail}>
                  <Ionicons name="cash-outline" size={16} color={theme.colors.text.secondary} />
                  <ThemeText style={styles.packageDetailText}>
                    NPR {pkg.price.toLocaleString()}
                  </ThemeText>
                </View>
                
                <View style={styles.packageDetail}>
                  <Ionicons name="calendar-outline" size={16} color={theme.colors.text.secondary} />
                  <ThemeText style={styles.packageDetailText}>
                    {pkg.durationDays} days
                  </ThemeText>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={48} color={theme.colors.text.secondary} />
            <ThemeText style={styles.emptyStateText}>
              No packages set up yet
            </ThemeText>
          </View>
        )}
      </View>
    </View>
  );

  // Render business hours card
//   const renderBusinessHours = () => {
//     const todaysHours = getTodaysHours();
//     const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
//     return (
//       <View style={styles.section}>
//         <ThemeText style={styles.sectionTitle}>
//           Business Hours
//         </ThemeText>
        
//         <View style={styles.card}>
//           {/* Today's hours */}
//           <View style={styles.cardRow}>
//             <View style={styles.rowLeft}>
//               <Ionicons 
//                 name="time-outline" 
//                 size={22} 
//                 color={theme.colors.text.primary}
//                 style={styles.rowIcon}
//               />
//               <ThemeText style={styles.rowLabel}>
//                 Today's Hours
//               </ThemeText>
//             </View>
//             <ThemeText style={[
//               styles.rowValue,
//               todaysHours === 'Closed today' || todaysHours === 'Not set' 
//                 ? { color: theme.colors.warning }
//                 : { color: theme.colors.primary }
//             ]}>
//               {todaysHours}
//             </ThemeText>
//           </View>
          
//           <View style={styles.divider} />
          
//           {/* Full schedule */}
//           <ThemeText style={styles.scheduleTitle}>
//             Weekly Schedule
//           </ThemeText>
          
//           {currentGym?.businessHours && Object.entries(currentGym.businessHours).map(([day, hours], index) => (
//             <View key={day} style={styles.scheduleRow}>
//               <ThemeText style={styles.scheduleDay}>
//                 {dayNames[index]}
//               </ThemeText>
//               <ThemeText style={[
//                 styles.scheduleHours,
//                 hours.open ? {} : { color: theme.colors.text.secondary }
//               ]}>
//                 {hours.open ? `${hours.openTime} - ${hours.closeTime}` : 'Closed'}
//               </ThemeText>
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };
// Render business hours card - ✅ FIXED WITH CORRECT ORDER
const renderBusinessHours = () => {
    const todaysHours = getTodaysHours();
    
    // ✅ FIX: Define the correct day order
    const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const displayDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return (
      <View style={styles.section}>
        <ThemeText style={styles.sectionTitle}>
          Business Hours
        </ThemeText>
        
        <View style={styles.card}>
          {/* Today's hours */}
          <View style={styles.cardRow}>
            <View style={styles.rowLeft}>
              <Ionicons 
                name="time-outline" 
                size={22} 
                color={theme.colors.text.primary}
                style={styles.rowIcon}
              />
              <ThemeText style={styles.rowLabel}>
                Today's Hours
              </ThemeText>
            </View>
            <ThemeText style={[
              styles.rowValue,
              todaysHours === 'Closed today' || todaysHours === 'Not set' 
                ? { color: theme.colors.warning }
                : { color: theme.colors.primary }
            ]}>
              {todaysHours}
            </ThemeText>
          </View>
          
          <View style={styles.divider} />
          
          {/* Full schedule - ✅ FIXED: Use dayOrder array instead of Object.entries() */}
          <ThemeText style={styles.scheduleTitle}>
            Weekly Schedule
          </ThemeText>
          
          {currentGym?.businessHours && dayOrder.map((day, index) => {
            const hours = currentGym.businessHours[day as keyof typeof currentGym.businessHours];
            return (
              <View key={day} style={styles.scheduleRow}>
                <ThemeText style={styles.scheduleDay}>
                  {displayDayNames[index]}
                </ThemeText>
                <ThemeText style={[
                  styles.scheduleHours,
                  hours.open ? {} : { color: theme.colors.text.secondary }
                ]}>
                  {hours.open ? `${hours.openTime} - ${hours.closeTime}` : 'Closed'}
                </ThemeText>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // Render statistics card (owners only)
  const renderStatistics = () => {
    if (!isOwner) return null;
    
    return (
      <View style={styles.section}>
        <ThemeText style={styles.sectionTitle}>
          Statistics
        </ThemeText>
        
        <View style={styles.card}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="people" size={24} color={theme.colors.primary} />
              <ThemeText style={styles.statValue}>
                {currentGym?.totalMembers || 0}
              </ThemeText>
              <ThemeText style={styles.statLabel}>
                Total Members
              </ThemeText>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="person" size={24} color={theme.colors.primary} />
              <ThemeText style={styles.statValue}>
                {currentGym?.activeMembers || 0}
              </ThemeText>
              <ThemeText style={styles.statLabel}>
                Active Members
              </ThemeText>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="cash" size={24} color={theme.colors.accent} />
              <ThemeText style={styles.statValue}>
                रु {(currentGym?.monthlyRevenue || 0).toLocaleString()}
              </ThemeText>
              <ThemeText style={styles.statLabel}>
                Monthly Revenue
              </ThemeText>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="cube" size={24} color={theme.colors.warning} />
              <ThemeText style={styles.statValue}>
                {currentGym?.packages?.filter(p => p.isActive).length || 0}
              </ThemeText>
              <ThemeText style={styles.statLabel}>
                Active Packages
              </ThemeText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Render action buttons
  const renderActionButtons = () => (
    <SafeAreaView style={styles.footerSafeArea} edges={['bottom']}>
      <View style={styles.fixedFooter}>
        <View style={styles.actionButtons}>
          {/* Share Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={20} color={theme.colors.primary} />
            <ThemeText style={styles.secondaryButtonText}>
              Share
            </ThemeText>
          </TouchableOpacity>
          
          {/* Edit Button (Owners only) */}
          {isOwner && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleEdit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="create-outline" size={20} color="#FFFFFF" />
                  <ThemeText style={styles.primaryButtonText}>
                    Edit Details
                  </ThemeText>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <ThemeView style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          {renderHeader()}
        </SafeAreaView>
        
        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Loading State */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <ThemeText style={styles.loadingText}>
                Loading gym details...
              </ThemeText>
            </View>
          ) : !currentGym ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="alert-circle-outline" size={64} color={theme.colors.warning} />
              <ThemeText style={styles.loadingText}>
                No gym data available
              </ThemeText>
            </View>
          ) : (
            <>
              {/* Logo & Name Section */}
              {renderLogoAndName()}
              
              {/* Basic Information (Now includes Address) */}
              {renderBasicInfo()}
              
              {/* Packages */}
              {renderPackages()}
              
              {/* Business Hours */}
              {renderBusinessHours()}
              
              {/* Statistics (Owners only) */}
              {renderStatistics()}
              
              {/* Bottom Spacer */}
              <View style={styles.bottomSpacer} />
            </>
          )}
        </ScrollView>
        
        {/* Action Buttons */}
        {currentGym && !isLoading && renderActionButtons()}
      </ThemeView>
    </Modal>
  );
};

export default GymProfileModal;

