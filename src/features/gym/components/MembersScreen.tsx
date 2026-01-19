// src/features/gym/components/MembersScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { useGymStore } from '../stores/useGymStore';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { gymService } from '../../../shared/services/GymService';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { MemberCard } from './MembersCard';
import { MemberDetailModal } from './MemberDetailModal';
import { GymInvitationScreen } from './GymInvitationScreen';
import { 
  filterMembersBySearch, 
  getRecentMembers,
  getDaysSinceJoin,
  calculateEnhancedMemberStatus 
} from '../../../shared/utils/memberHelpers';
import { GymMember, MemberStatus } from '../../../shared/types/domain/core/gym';

const { width } = Dimensions.get('window');

type FilterType = 'all' | 'due' | 'active' | 'inactive' | 'frozen';

const MembersScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const { currentGymRole } = useUserRole();
  const { currentGym } = useGymStore();
  const { user } = useAppStore();
  
  // State
  const [members, setMembers] = useState<GymMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<GymMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedMember, setSelectedMember] = useState<GymMember | null>(null);
  const [showMemberDetail, setShowMemberDetail] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  
  // Stats
  const [memberCounts, setMemberCounts] = useState({
    all: 0,
    due: 0,
    active: 0,
    inactive: 0,
    frozen: 0,
  });

  const canManageMembers = currentGymRole === 'owner' || currentGymRole === 'staff';

  // Load members
  const loadMembers = useCallback(async () => {
    if (!currentGym?.id || !canManageMembers) return;
    
    try {
      setLoading(true);
      
      const membersData = await gymService.getMembersByGym(currentGym.id, {
        sortBy: 'joinDate',
      });
      
      setMembers(membersData);
      
      // Calculate counts for each filter
      const dueCount = membersData.filter(m => 
        calculateEnhancedMemberStatus(m).displayStatus === 'due'
      ).length;
      
      const activeCount = membersData.filter(m => 
        calculateEnhancedMemberStatus(m).displayStatus === 'active'
      ).length;
      
      const inactiveCount = membersData.filter(m => m.status === 'inactive').length;
      const frozenCount = membersData.filter(m => m.status === 'frozen').length;
      
      setMemberCounts({
        all: membersData.length,
        due: dueCount,
        active: activeCount,
        inactive: inactiveCount,
        frozen: frozenCount,
      });
      
    } catch (error: any) {
      console.error('❌ Error loading members:', error);
      Alert.alert(
        'Error',
        'Failed to load members. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentGym?.id, canManageMembers]);

  // Initial load
  useEffect(() => {
    if (canManageMembers) {
      loadMembers();
    }
  }, [loadMembers, canManageMembers]);

  // Apply filters and search
  useEffect(() => {
    let result = [...members];
    
    // Apply status filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'due') {
        result = result.filter(member => 
          calculateEnhancedMemberStatus(member).displayStatus === 'due'
        );
      } else {
        result = result.filter(member => 
          calculateEnhancedMemberStatus(member).displayStatus === activeFilter
        );
      }
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      result = filterMembersBySearch(result, searchTerm);
    }
    
    setFilteredMembers(result);
  }, [members, activeFilter, searchTerm]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadMembers();
  }, [loadMembers]);

  // Handle member press
  const handleMemberPress = (member: GymMember) => {
    setSelectedMember(member);
    setShowMemberDetail(true);
  };

  // Handle invite member
  const handleInviteMember = () => {
    if (!canManageMembers) {
      Alert.alert(
        'Permission Denied',
        'Only owners and staff can invite new members.'
      );
      return;
    }
    setShowInvitationModal(true);
  };

  // Handle member updated/deleted
  const handleMemberUpdated = () => {
    loadMembers();
    setShowMemberDetail(false);
  };

  const handleMemberDeleted = () => {
    loadMembers();
    setShowMemberDetail(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Filter tabs
  const filterTabs: Array<{ key: FilterType; label: string; count: number }> = [
    { key: 'all', label: 'All', count: memberCounts.all },
    { key: 'due', label: 'Due', count: memberCounts.due },
    { key: 'active', label: 'Active', count: memberCounts.active },
    { key: 'inactive', label: 'Inactive', count: memberCounts.inactive },
    { key: 'frozen', label: 'Frozen', count: memberCounts.frozen },
  ];

  // Get recent members (last 7 days)
  const recentMembers = getRecentMembers(members, 5);

  // Render recent member card - SIMPLIFIED
  const renderRecentMemberCard = (member: GymMember) => {
    const daysSinceJoin = getDaysSinceJoin(member.joinDate);
    
    return (
      <TouchableOpacity
        key={member.id}
        style={{
          width: 110, // Smaller width
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          padding: 12,
          marginRight: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
          alignItems: 'center',
        }}
        onPress={() => handleMemberPress(member)}
      >
        {/* Avatar - Smaller */}
        <View style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: `${theme.colors.primary}15`,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}>
          <ThemeText style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: theme.colors.primary 
          }}>
            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
          </ThemeText>
        </View>
        
        {/* Name */}
        <ThemeText style={{
          fontSize: 13,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginBottom: 4,
          textAlign: 'center',
        }} numberOfLines={1}>
          {member.firstName} {member.lastName}
        </ThemeText>
        
        {/* Join Date Only */}
        <ThemeText style={{
          fontSize: 11,
          color: theme.colors.text.secondary,
        }}>
          Joined {daysSinceJoin}
        </ThemeText>
      </TouchableOpacity>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: 60,
      paddingHorizontal: 40,
    }}>
      <Ionicons 
        name="people-outline" 
        size={64} 
        color={theme.colors.text.secondary} 
        style={{ marginBottom: 20 }}
      />
      <ThemeText style={{
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 8,
        textAlign: 'center',
      }}>
        No Members Found
      </ThemeText>
      <ThemeText style={{
        fontSize: 14,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
      }}>
        {searchTerm || activeFilter !== 'all'
          ? 'No members match your current filters.'
          : 'Start by inviting your first gym member.'}
      </ThemeText>
      
      {!searchTerm && activeFilter === 'all' && canManageMembers && (
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={handleInviteMember}
        >
          <Ionicons 
            name="person-add-outline" 
            size={20} 
            color="#FFFFFF" 
            style={{ marginRight: 8 }}
          />
          <ThemeText style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
            Invite First Member
          </ThemeText>
        </TouchableOpacity>
      )}
    </View>
  );

  // Render loading
  const renderLoading = () => (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingVertical: 40 
    }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <ThemeText style={{
        marginTop: 16,
        fontSize: 14,
        color: theme.colors.text.secondary,
      }}>
        Loading members...
      </ThemeText>
    </View>
  );

  // Render member item
  const renderMemberItem = ({ item }: { item: GymMember }) => (
    <MemberCard member={item} onPress={handleMemberPress} />
  );

  // Check permissions
  if (!canManageMembers) {
    return (
      <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar 
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 40 
          }}>
            <Ionicons 
              name="lock-closed-outline" 
              size={64} 
              color={theme.colors.text.secondary} 
              style={{ marginBottom: 24 }}
            />
            <ThemeText style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.colors.text.primary,
              marginBottom: 12,
            }}>
              Access Restricted
            </ThemeText>
            <ThemeText style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
              textAlign: 'center',
              lineHeight: 20,
            }}>
              You need to be an owner or staff member to view and manage gym members.
            </ThemeText>
          </View>
        </SafeAreaView>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header (Same as Payments) */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          height: 56,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <View style={{ flex: 1 }}>
            <ThemeText style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.colors.text.primary,
            }}>
              Members
            </ThemeText>
            <ThemeText style={{
              fontSize: 12,
              color: theme.colors.text.secondary,
              marginTop: 2,
            }}>
              {currentGym?.name || 'Gym'}
            </ThemeText>
          </View>
          
          {canManageMembers && (
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={handleInviteMember}
            >
              <Ionicons name="person-add" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
              <ThemeText style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#FFFFFF',
              }}>
                Invite
              </ThemeText>
            </TouchableOpacity>
          )}
        </View>

        {/* Horizontal Filter Tabs - No divider below */}
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          // REMOVED: borderBottomWidth: 1, borderBottomColor
        }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: 'row' }}
          >
            {filterTabs.map(({ key, label, count }) => {
              const isActive = activeFilter === key;
              const getTabColor = () => {
                switch (key) {
                  case 'due': return theme.colors.warning;
                  case 'active': return theme.colors.primary;
                  case 'inactive': return '#6B7280';
                  case 'frozen': return '#8B5CF6';
                  default: return theme.colors.primary;
                }
              };
              
              const tabColor = getTabColor();
              
              return (
                <TouchableOpacity
                  key={key}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    marginRight: 8,
                    borderRadius: 20,
                    backgroundColor: isActive ? tabColor + '15' : 'transparent',
                    borderWidth: 1,
                    borderColor: isActive ? tabColor : theme.colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 80,
                  }}
                  onPress={() => setActiveFilter(key)}
                >
                  <ThemeText style={{
                    fontSize: 14,
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? tabColor : theme.colors.text.secondary,
                    textAlign: 'center',
                  }}>
                    {label}({count})
                  </ThemeText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Search Bar */}
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1, // Keep bottom border only
          borderBottomColor: theme.colors.border,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.card,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.colors.border,
            paddingHorizontal: 12,
            height: 44,
          }}>
            <Ionicons 
              name="search" 
              size={20} 
              color={theme.colors.text.secondary} 
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: theme.colors.text.primary,
                height: '100%',
              }}
              placeholder="Search by name, email, or phone..."
              placeholderTextColor={theme.colors.text.secondary}
              value={searchTerm}
              onChangeText={setSearchTerm}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
            
            {searchTerm.length > 0 && (
              <TouchableOpacity
                onPress={handleClearSearch}
              >
                <Ionicons 
                  name="close-circle" 
                  size={20} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content */}
        {loading ? (
          renderLoading()
        ) : (
          <FlatList
            data={filteredMembers}
            renderItem={renderMemberItem}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingTop: 16,
              paddingBottom: 100,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
              />
            }
            ListHeaderComponent={
              <>
                {/* Recently Joined Section (Only if no search and all filter) */}
                {recentMembers.length > 0 && activeFilter === 'all' && !searchTerm && (
                  <View style={{ 
                    marginBottom: 24,
                    paddingHorizontal: 16,
                  }}>
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: 12,
                    }}>
                      <ThemeText style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: theme.colors.text.primary,
                      }}>
                        Recently Joined
                      </ThemeText>
                      <ThemeText style={{
                        fontSize: 12,
                        color: theme.colors.text.secondary,
                      }}>
                        {recentMembers.length} new members
                      </ThemeText>
                    </View>
                    
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                    >
                      {recentMembers.map(renderRecentMemberCard)}
                    </ScrollView>
                  </View>
                )}
                
                {/* Members List Header */}
                {filteredMembers.length > 0 && (
                  <View style={{ 
                    paddingHorizontal: 16,
                    marginBottom: 8,
                  }}>
                    <ThemeText style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.colors.text.primary,
                    }}>
                      {activeFilter === 'all' ? 'All Members' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Members`} ({filteredMembers.length})
                    </ThemeText>
                  </View>
                )}
              </>
            }
            ListEmptyComponent={renderEmptyState()}
          />
        )}
      </SafeAreaView>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberDetailModal
          visible={showMemberDetail}
          member={selectedMember}
          onClose={() => setShowMemberDetail(false)}
          onMemberUpdated={handleMemberUpdated}
          onMemberDeleted={handleMemberDeleted}
          canEdit={canManageMembers}
          canDelete={currentGymRole === 'owner'}
        />
      )}

      {/* Invitation Modal */}
      <GymInvitationScreen
        visible={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}
      />
    </ThemeView>
  );
};

export default MembersScreen;