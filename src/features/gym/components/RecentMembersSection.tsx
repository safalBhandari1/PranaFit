// NEW FILE: src/features/gym/components/RecentMembersSection.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { createMembersScreenStyles } from '../styles/membersScreenStyles';
import { GymMember } from '../../../shared/types/domain/core/gym';
import { getDaysSinceJoin } from '../../../shared/utils/memberHelpers';

interface RecentMembersSectionProps {
  members: GymMember[];
  onViewAll?: () => void;
  onMemberPress?: (member: GymMember) => void;
  title?: string;
  maxItems?: number;
}

export const RecentMembersSection: React.FC<RecentMembersSectionProps> = ({
  members,
  onViewAll,
  onMemberPress,
  title = 'Recent Members',
  maxItems = 5,
}) => {
  const { theme } = useEnhancedTheme();
  const styles = createMembersScreenStyles(theme);
  
  // Get recent members (limited to maxItems)
  const recentMembers = members.slice(0, maxItems);
  
  if (recentMembers.length === 0) {
    return null;
  }

  return (
    <View style={styles.recentSection}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <ThemeText style={styles.sectionTitle}>
          {title}
        </ThemeText>
        
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <ThemeText style={styles.sectionAction}>
              View All
            </ThemeText>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Recent Members Horizontal Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.recentMembersScroll}
      >
        {recentMembers.map((member) => (
          <TouchableOpacity
            key={member.id}
            style={styles.recentMemberCard}
            onPress={() => onMemberPress && onMemberPress(member)}
            activeOpacity={0.7}
          >
            {/* Member Icon */}
            <View style={styles.recentMemberIcon}>
              <Ionicons 
                name="person" 
                size={16} 
                color={theme.colors.primary} 
              />
            </View>
            
            {/* Member Name */}
            <ThemeText style={styles.recentMemberName} numberOfLines={1}>
              {member.firstName} {member.lastName}
            </ThemeText>
            
            {/* Member Code */}
            <ThemeText style={styles.memberDetailText} numberOfLines={1}>
              {member.memberCode}
            </ThemeText>
            
            {/* Join Date */}
            <ThemeText style={styles.recentMemberJoinDate}>
              Joined {getDaysSinceJoin(member.joinDate)}
            </ThemeText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentMembersSection;