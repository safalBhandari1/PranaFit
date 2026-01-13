// src/features/gym/components/PaymentsScreen.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';

const PaymentsScreen: React.FC = () => {
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
            Payments
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
            backgroundColor: `${theme.colors.accent}15`,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            <Ionicons name="cash" size={40} color={theme.colors.accent} />
          </View>
          
          <ThemeText variant="h1" style={{ textAlign: 'center', marginBottom: 12 }}>
            Payment Management
          </ThemeText>
          
          <ThemeText style={{ 
            textAlign: 'center', 
            fontSize: 16, 
            color: theme.colors.text.secondary,
            marginBottom: 30,
            lineHeight: 24
          }}>
            Track all gym payments, manage subscriptions, send payment reminders, 
            and generate financial reports for your business.
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
              Coming Soon
            </ThemeText>
            
            {[
              '💰 Record cash & digital payments',
              '📅 Automated payment reminders',
              '📊 Revenue analytics dashboard',
              '🧾 Digital receipt generation',
              '⚠️ Overdue payment alerts',
              '📈 Monthly/Yearly financial reports'
            ].map((feature, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' }}>
                <ThemeText style={{ marginRight: 10, color: theme.colors.accent }}>•</ThemeText>
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

export default PaymentsScreen;