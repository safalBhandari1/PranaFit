// src/features/gym/components/GymProfileScreen.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { useGymStore } from '../stores/useGymStore';
import { authService } from '../../../shared/services/AuthService';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';

const GymProfileScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { user, setUser, setAuthentication } = useAppStore();
  const { currentGym } = useGymStore();
  const navigation = useNavigation();

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

  return (
    <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Twitter-style Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.background,
      }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ThemeText style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text.primary }}>
            Profile
          </ThemeText>
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {/* Gym Info Section */}
        {currentGym && (
          <View style={{ 
            backgroundColor: theme.colors.card, 
            borderRadius: 12, 
            padding: 20,
            marginBottom: 20,
            alignItems: 'center'
          }}>
            <View style={{ 
              width: 60, 
              height: 60, 
              borderRadius: 30, 
              backgroundColor: `${theme.colors.primary}15`,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Ionicons name="business" size={28} color={theme.colors.primary} />
            </View>
            
            <ThemeText variant="h2" style={{ textAlign: 'center', marginBottom: 8 }}>
              {currentGym.name}
            </ThemeText>
            
            <ThemeText style={{ 
              textAlign: 'center', 
              color: theme.colors.text.secondary,
              marginBottom: 12
            }}>
              {currentGym.address?.street}, {currentGym.address?.city}
            </ThemeText>
            
            <View style={{ 
              backgroundColor: `${theme.colors.primary}10`,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              marginTop: 8
            }}>
              <ThemeText style={{ color: theme.colors.primary, fontSize: 12, fontWeight: '600' }}>
                GYM OWNER
              </ThemeText>
            </View>
          </View>
        )}

        {/* User Info */}
        <View style={{ 
          backgroundColor: theme.colors.card, 
          borderRadius: 12, 
          padding: 20,
          marginBottom: 20
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={{ 
              width: 50, 
              height: 50, 
              borderRadius: 25, 
              backgroundColor: `${theme.colors.primary}15`,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16
            }}>
              <Ionicons name="person" size={24} color={theme.colors.primary} />
            </View>
            
            <View style={{ flex: 1 }}>
              <ThemeText variant="h3" style={{ marginBottom: 4 }}>
                {user?.displayName || 'User'}
              </ThemeText>
              <ThemeText style={{ color: theme.colors.text.secondary, fontSize: 14 }}>
                {user?.email}
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Gym Management Actions */}
        <ThemeText variant="h3" style={{ marginBottom: 12, color: theme.colors.text.primary }}>
          Gym Management
        </ThemeText>
        
        <ThemeView style={{ backgroundColor: theme.colors.card, borderRadius: 12, marginBottom: 20 }}>
          {[
            { icon: 'settings-outline', label: 'Gym Settings', feature: 'Gym Settings' },
            { icon: 'calendar-outline', label: 'Business Hours', feature: 'Business Hours' },
            { icon: 'card-outline', label: 'Membership Packages', feature: 'Membership Packages' },
            { icon: 'people-outline', label: 'Staff Management', feature: 'Staff Management' },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: 16,
                borderBottomWidth: index < 3 ? 1 : 0,
                borderBottomColor: theme.colors.border
              }}
              onPress={() => handleComingSoon(item.feature)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={theme.colors.text.primary}
                style={{ marginRight: 16 }}
              />
              <ThemeText variant="body" style={{ flex: 1 }}>
                {item.label}
              </ThemeText>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          ))}
        </ThemeView>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: 16,
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            marginBottom: 20
          }}
          onPress={handleConfirmSignOut}
        >
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color={theme.colors.semantic.info}
            style={{ marginRight: 12 }}
          />
          <ThemeText style={{ color: theme.colors.semantic.info, fontWeight: '600' }}>
            Sign Out
          </ThemeText>
        </TouchableOpacity>

        {/* App Info */}
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
          <ThemeText style={{ color: theme.colors.text.secondary, marginBottom: 8 }}>
            PranaFit Gym Management v1.0.0
          </ThemeText>
          <ThemeText style={{ fontSize: 12, color: theme.colors.text.secondary }}>
            Your complete gym business solution
          </ThemeText>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default GymProfileScreen;