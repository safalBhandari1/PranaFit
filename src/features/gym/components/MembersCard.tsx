// src/features/gym/components/MemberCard.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { GymMember } from '../../../shared/types/domain/core/gym';
import { 
  getMemberCategory, 
  getCategoryInfo, 
  getDaysSinceJoin,
  calculateEnhancedMemberStatus,
  getExpiryStatus
} from '../../../shared/utils/memberHelpers';

interface MemberCardProps {
  member: GymMember;
  onPress: (member: GymMember) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onPress }) => {
  const { theme } = useEnhancedTheme();
  
  const category = getMemberCategory(member.joinDate);
  const categoryInfo = getCategoryInfo(category);
  const daysSinceJoin = getDaysSinceJoin(member.joinDate);
  const { displayStatus, isDue, statusColor } = calculateEnhancedMemberStatus(member);
  const expiryStatus = getExpiryStatus(member);
  
  const getStatusDisplay = () => {
    if (displayStatus === 'due') return 'DUE';
    return displayStatus.toUpperCase();
  };
  
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
      onPress={() => onPress(member)}
      activeOpacity={0.7}
    >
      {/* Top Row: Avatar + Name + Days Ago + Arrow */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 12 
      }}>
        {/* Avatar */}
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: `${theme.colors.primary}15`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          <ThemeText style={{ 
            fontSize: 16, 
            fontWeight: '600', 
            color: theme.colors.primary 
          }}>
            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
          </ThemeText>
        </View>
        
        {/* Name */}
        <View style={{ flex: 1 }}>
          <ThemeText style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text.primary,
          }}>
            {member.firstName} {member.lastName}
          </ThemeText>
        </View>
        
        {/* Days Ago + Arrow */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThemeText style={{
            fontSize: 12,
            color: theme.colors.text.secondary,
            marginRight: 4,
          }}>
            {daysSinceJoin}
          </ThemeText>
          <Ionicons 
            name="chevron-forward" 
            size={16} 
            color={theme.colors.text.secondary} 
          />
        </View>
      </View>
      
      {/* Tags Row: Below avatar (vertically aligned) */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft: 52, // Aligns with avatar
        marginBottom: 8,
        gap: 8,
      }}>
        {/* Status Badge */}
        <View style={{
          backgroundColor: `${statusColor}15`,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: `${statusColor}40`,
        }}>
          <ThemeText style={{
            fontSize: 10,
            fontWeight: '600',
            color: statusColor,
          }}>
            {getStatusDisplay()}
          </ThemeText>
        </View>
        
        {/* Category Badge */}
        <View style={{
          backgroundColor: categoryInfo.backgroundColor,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: categoryInfo.color + '40',
        }}>
          <ThemeText style={{
            fontSize: 10,
            fontWeight: '600',
            color: categoryInfo.color,
          }}>
            {category.toUpperCase()}
          </ThemeText>
        </View>
      </View>
      
      {/* Package Info Row: On same line */}
      {(member.currentPackage || member.expiryDate) && (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center',
          marginLeft: 52, // Aligns with avatar
        }}>
          <Ionicons 
            name="cube-outline" 
            size={14} 
            color={theme.colors.text.secondary} 
            style={{ marginRight: 6 }}
          />
          
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {/* Package Name */}
            {member.currentPackage && (
              <ThemeText style={{
                fontSize: 13,
                fontWeight: '500',
                color: theme.colors.text.primary,
                marginRight: 6,
              }}>
                {member.currentPackage.name}
              </ThemeText>
            )}
            
            {/* Expiry Info */}
            {member.expiryDate && (
              <ThemeText style={{
                fontSize: 13,
                color: expiryStatus.color,
              }}>
                • {expiryStatus.text}
              </ThemeText>
            )}
          </View>
        </View>
      )}
      
      {/* No Package Warning */}
      {!member.currentPackage && !member.expiryDate && (
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center',
          marginLeft: 52, // Aligns with avatar
        }}>
          <Ionicons 
            name="alert-circle-outline" 
            size={14} 
            color={theme.colors.warning} 
            style={{ marginRight: 6 }}
          />
          <ThemeText style={{
            fontSize: 13,
            color: theme.colors.warning,
            fontStyle: 'italic',
          }}>
            No package assigned
          </ThemeText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MemberCard;