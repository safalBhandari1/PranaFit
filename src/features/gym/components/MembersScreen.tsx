// src/features/gym/components/MembersScreen.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';

const MembersScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();

  return (
    <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Twitter-style Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 42,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.background,
      }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ThemeText style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text.primary }}>
            Members
          </ThemeText>
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {/* Coming Soon Content */}
        <View style={{ 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingVertical: 60,
          paddingHorizontal: 20 
        }}>
          <View style={{ 
            width: 80, 
            height: 80, 
            borderRadius: 40, 
            backgroundColor: `${theme.colors.primary}15`,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            <Ionicons name="people" size={40} color={theme.colors.primary} />
          </View>
          
          <ThemeText variant="h1" style={{ textAlign: 'center', marginBottom: 12 }}>
            Member Management
          </ThemeText>
          
          <ThemeText style={{ 
            textAlign: 'center', 
            fontSize: 16, 
            color: theme.colors.text.secondary,
            marginBottom: 30,
            lineHeight: 24
          }}>
            View all gym members, search, filter, and manage member accounts. 
            Track attendance, payments, and member progress in one place.
          </ThemeText>

          {/* Planned Features */}
          <View style={{ 
            backgroundColor: theme.colors.card, 
            borderRadius: 12, 
            padding: 20,
            width: '100%',
            marginTop: 20
          }}>
            <ThemeText variant="h3" style={{ marginBottom: 16, color: theme.colors.text.primary }}>
              Planned Features
            </ThemeText>
            
            {[
              '📋 Member directory with search & filter',
              '✅ Quick check-in/check-out',
              '💰 Payment status tracking',
              '📊 Attendance analytics',
              '👤 Member profile management',
              '📱 QR code member cards'
            ].map((feature, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' }}>
                <ThemeText style={{ marginRight: 10, color: theme.colors.primary }}>•</ThemeText>
                <ThemeText style={{ flex: 1, color: theme.colors.text.secondary, fontSize: 14 }}>
                  {feature}
                </ThemeText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default MembersScreen;