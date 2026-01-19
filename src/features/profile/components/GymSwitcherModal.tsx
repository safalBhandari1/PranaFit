
import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { useGymStore } from '../../gym/stores/useGymStore';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { Ionicons } from '@expo/vector-icons';
import { createProfileGymStyles } from '../styles/profileGymStyles';
import { gymRepository } from '../../../shared/services/repositories/GymRepository'; // ADDED

interface GymSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
}

interface GymItem {
  id: string;
  name: string;
  role: 'owner' | 'staff' | 'trainer' | 'member';
  isCurrent: boolean;
  location: string; // ADDED: Real gym data
  memberCount: number; // ADDED: Real gym data
}

export const GymSwitcherModal: React.FC<GymSwitcherModalProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useEnhancedTheme();
  const { getUserGymIds, getRoleInGym, currentGymId, rawUser } = useUserRole();
  const { switchGym, isLoading } = useGymStore();
  const styles = createProfileGymStyles(theme);

  // Get user's gyms with details
  const [gyms, setGyms] = React.useState<GymItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [switchingGymId, setSwitchingGymId] = React.useState<string | null>(null); // ADDED: Track which gym is switching

  React.useEffect(() => {
    const loadUserGyms = async () => {
      if (!rawUser) {
        setGyms([]);
        setLoading(false);
        return;
      }

      try {
        const gymIds = getUserGymIds();
        const gymsList: GymItem[] = [];

        // ✅ FIXED: Fetch REAL gym data instead of placeholders
        const gymPromises = gymIds.map(async (gymId) => {
          const role = getRoleInGym(gymId);
          if (!role) return null;

          try {
            // Fetch actual gym data from repository
            const gym = await gymRepository.getById(gymId);
            if (!gym) return null;

            return {
              id: gymId,
              name: gym.name || `Gym ${gymId.slice(0, 8)}`, // REAL name with fallback
              role,
              isCurrent: gymId === currentGymId,
              location: gym.address?.city || 'Unknown location',
              memberCount: gym.totalMembers || 0,
            };
          } catch (error) {
            console.error(`Failed to load gym ${gymId}:`, error);
            // Fallback to basic info if gym fetch fails
            return {
              id: gymId,
              name: `Gym ${gymId.slice(0, 8)}...`,
              role,
              isCurrent: gymId === currentGymId,
              location: 'Loading...',
              memberCount: 0,
            };
          }
        });

        const results = await Promise.all(gymPromises);
        const validGyms = results.filter((gym): gym is GymItem => gym !== null);
        
        // Sort: current gym first, then by role (owner > staff > trainer > member), then by name
        validGyms.sort((a, b) => {
          // Current gym first
          if (a.isCurrent && !b.isCurrent) return -1;
          if (!a.isCurrent && b.isCurrent) return 1;
          
          // Role priority
          const rolePriority = { owner: 0, staff: 1, trainer: 2, member: 3 };
          if (rolePriority[a.role] !== rolePriority[b.role]) {
            return rolePriority[a.role] - rolePriority[b.role];
          }
          
          // Alphabetical by name
          return a.name.localeCompare(b.name);
        });

        setGyms(validGyms);
      } catch (error) {
        console.error('Error loading gyms:', error);
        setGyms([]);
        Alert.alert('Error', 'Failed to load your gyms. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      loadUserGyms();
    }
  }, [visible, rawUser, currentGymId]);


  const handleSwitchGym = async (gymId: string) => {
    if (gymId === currentGymId) {
      onClose();
      return;
    }

    if (isLoading || switchingGymId) {
      console.log('⏳ Already switching gyms, please wait');
      return;
    }

    try {
      setSwitchingGymId(gymId); // Track which gym is switching
      await switchGym(gymId);
      
      // Close modal and show success
      onClose();
      
      // Show success message with gym name
      const gym = gyms.find(g => g.id === gymId);
      Alert.alert(
        '✅ Gym Switched',
        `Successfully switched to ${gym?.name || 'the selected gym'}.`,
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Error switching gym:', error);
      Alert.alert(
        '❌ Error',
        error.message || 'Failed to switch gym. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSwitchingGymId(null); // Reset switching state
    }
  };

  const renderGymItem = ({ item }: { item: GymItem }) => {
    const isSwitchingToThisGym = switchingGymId === item.id;
    const isCurrentlySwitching = switchingGymId !== null;
    
    return (
      <TouchableOpacity
        style={[
          styles.gymItem,
          item.isCurrent && styles.currentGymItem,
          (isSwitchingToThisGym || isLoading) && styles.switchingGymItem
        ]}
        onPress={() => handleSwitchGym(item.id)}
        disabled={isLoading || isCurrentlySwitching || item.isCurrent}
        activeOpacity={0.7}
      >
        <View style={styles.gymItemIcon}>
          <Ionicons 
            name={getGymIconByRole(item.role)} 
            size={20} 
            color={getRoleColor(item.role)} 
          />
        </View>
        
        <View style={styles.gymItemInfo}>
          <ThemeText style={[
            styles.gymItemName,
            item.isCurrent && styles.currentGymName
          ]}>
            {item.name}
          </ThemeText>
          
          <View style={styles.gymItemDetails}>
            <View style={styles.gymItemRoleBadge}>
              <ThemeText style={[
                styles.gymItemRole,
                { color: getRoleColor(item.role) }
              ]}>
                {item.role.toUpperCase()}
              </ThemeText>
            </View>
            
            {item.location && (
              <View style={styles.gymItemLocation}>
                <Ionicons name="location-outline" size={12} color={theme.colors.text.secondary} />
                <ThemeText style={styles.gymItemLocationText}>
                  {item.location}
                </ThemeText>
              </View>
            )}
            
            {item.memberCount !== undefined && (
              <View style={styles.gymItemMembers}>
                <Ionicons name="people-outline" size={12} color={theme.colors.text.secondary} />
                <ThemeText style={styles.gymItemMembersText}>
                  {item.memberCount} members
                </ThemeText>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.gymItemRightSection}>
          {item.isCurrent ? (
            <View style={styles.currentGymBadge}>
              <ThemeText style={styles.currentGymBadgeText}>
                CURRENT
              </ThemeText>
            </View>
          ) : isSwitchingToThisGym ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.text.secondary} 
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyGyms}>
      <Ionicons 
        name="business-outline" 
        size={48} 
        color={theme.colors.text.secondary} 
      />
      <ThemeText style={styles.emptyGymsText}>
        No gyms found
      </ThemeText>
      <ThemeText style={styles.emptyGymsSubtext}>
        You don't have access to any gyms yet.
      </ThemeText>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.modalContent}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <ThemeText style={styles.modalTitle}>
              Select a Gym
            </ThemeText>
            <ThemeText style={styles.modalSubtitle}>
              Switch between your gyms
            </ThemeText>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
              disabled={isLoading || switchingGymId !== null}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={theme.colors.text.primary} 
              />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <ThemeText style={styles.loadingText}>
                Loading your gyms...
              </ThemeText>
            </View>
          ) : (
            <FlatList
              data={gyms}
              renderItem={renderGymItem}
              keyExtractor={(item) => item.id}
              style={styles.gymsList}
              ListEmptyComponent={renderEmptyState}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={gyms.length === 0 ? styles.emptyListContainer : undefined}
            />
          )}
          
          {(isLoading || switchingGymId !== null) && (
            <View style={styles.globalLoading}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <ThemeText style={styles.globalLoadingText}>
                Switching gyms...
              </ThemeText>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// Helper functions for gym icons and colors
const getGymIconByRole = (role: string) => {
  switch (role) {
    case 'owner': return 'business';
    case 'staff': return 'people';
    case 'trainer': return 'fitness';
    case 'member': return 'person';
    default: return 'business';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'owner': return '#FF6B6B'; // Red for owners
    case 'staff': return '#4ECDC4'; // Teal for staff
    case 'trainer': return '#FFD166'; // Yellow for trainers
    case 'member': return '#06D6A0'; // Green for members
    default: return '#666';
  }
};