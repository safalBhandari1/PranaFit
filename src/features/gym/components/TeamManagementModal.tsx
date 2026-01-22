// // src/features/gym/components/TeamManagementModal.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Modal,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   Alert,
//   Platform,
//   KeyboardAvoidingView,
//   StatusBar,
// } from 'react-native';
// import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
// import { useAppStore } from '../../../shared/stores/useAppStore';
// import { useGymStore } from '../stores/useGymStore';
// import { useUserRole } from '../../../shared/hooks/useUserRole';
// import { ThemeView } from '../../../shared/ui/ThemeView';
// import { ThemeText } from '../../../shared/ui/ThemeText';
// import { Ionicons } from '@expo/vector-icons';
// import { User } from '../../../shared/types/domain/core/user';
// import { gymService } from '../../../shared/services/GymService';
// import { userRepository } from '../../../shared/services/repositories/UserRepository';

// type TeamRole = 'owner' | 'staff' | 'trainer';

// interface TeamMember {
//   userId: string;
//   role: TeamRole;
//   user?: User;
//   joinDate?: Date;
// }

// interface TeamManagementModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
//   visible,
//   onClose,
// }) => {
//   const { theme } = useEnhancedTheme();
//   const { user: currentUser } = useAppStore();
//   const { currentGym, loadCurrentGym } = useGymStore();
//   const { currentGymRole } = useUserRole();
  
//   const [loading, setLoading] = useState(true);
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState<TeamRole>('owner');
//   const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
//   const [showActionMenu, setShowActionMenu] = useState(false);
//   const [actionMenuPosition, setActionMenuPosition] = useState({ x: 0, y: 0 });
//   const [showChangeRole, setShowChangeRole] = useState(false);
//   const [processing, setProcessing] = useState(false);
  
//   const isOwner = currentGymRole === 'owner';

//   // Load team members when modal opens
//   useEffect(() => {
//     if (visible && currentGym) {
//       loadTeamMembers();
//     } else {
//       // Reset state when closing
//       resetState();
//     }
//   }, [visible, currentGym]);

//   // Filter members based on search term and active tab
//   useEffect(() => {
//     if (!teamMembers.length) {
//       setFilteredMembers([]);
//       return;
//     }
    
//     const term = searchTerm.toLowerCase();
//     let filtered = teamMembers.filter(m => m.role === activeTab);
    
//     if (term) {
//       filtered = filtered.filter(member => 
//         member.user?.displayName?.toLowerCase().includes(term) ||
//         member.user?.email?.toLowerCase().includes(term)
//       );
//     }
    
//     setFilteredMembers(filtered);
//   }, [searchTerm, teamMembers, activeTab]);

//   const resetState = () => {
//     setTeamMembers([]);
//     setFilteredMembers([]);
//     setSearchTerm('');
//     setActiveTab('owner');
//     setSelectedMember(null);
//     setShowActionMenu(false);
//     setShowChangeRole(false);
//     setProcessing(false);
//   };

//   const loadTeamMembers = async () => {
//     if (!currentGym) return;
    
//     setLoading(true);
//     try {
//       const members: TeamMember[] = [];
      
//       // Get all unique user IDs from all role arrays
//       const allUserIds = [
//         ...new Set([
//           ...currentGym.owners,
//           ...currentGym.staff,
//           ...currentGym.trainers,
//         ])
//       ];
      
//       // Fetch all users in parallel
//       const userPromises = allUserIds.map(userId => userRepository.getById(userId));
//       const users = await Promise.all(userPromises);
      
//       // Map users to their roles
//       users.forEach((user, index) => {
//         if (user) {
//           const userId = allUserIds[index];
//           const membership = user.gymMemberships?.find(m => m.gymId === currentGym.id);
          
//           // Determine role
//           let role: TeamRole = 'staff'; // Default
//           if (currentGym.owners.includes(userId)) role = 'owner';
//           else if (currentGym.staff.includes(userId)) role = 'staff';
//           else if (currentGym.trainers.includes(userId)) role = 'trainer';
          
//           members.push({
//             userId,
//             role,
//             user,
//             joinDate: membership?.joinedAt,
//           });
//         }
//       });
      
//       // Sort members: owners first, then staff, then trainers
//       const sortedMembers = members.sort((a, b) => {
//         const roleOrder = { owner: 0, staff: 1, trainer: 2 };
//         return roleOrder[a.role] - roleOrder[b.role];
//       });
      
//       setTeamMembers(sortedMembers);
//     } catch (error) {
//       console.error('Error loading team members:', error);
//       Alert.alert('Error', 'Failed to load team members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleActionPress = (member: TeamMember, event: any) => {
//     if (!isOwner) return;
    
//     setSelectedMember(member);
    
//     // Calculate position for action menu
//     const { pageX, pageY } = event.nativeEvent;
//     setActionMenuPosition({ x: pageX, y: pageY });
//     setShowActionMenu(true);
//   };

//   const handleChangeRole = (newRole: TeamRole) => {
//     if (!selectedMember || !currentGym) return;
    
//     // Prevent changing own role if you're the only owner
//     if (selectedMember.userId === currentUser?.id && selectedMember.role === 'owner' && newRole !== 'owner') {
//       const ownerCount = teamMembers.filter(m => m.role === 'owner').length;
//       if (ownerCount <= 1) {
//         Alert.alert(
//           'Cannot Change Role',
//           'You are the only owner of this gym. Please add another owner before changing your role.',
//           [{ text: 'OK' }]
//         );
//         setShowChangeRole(false);
//         setShowActionMenu(false);
//         return;
//       }
//     }
    
//     Alert.alert(
//       'Change Role',
//       `Change ${selectedMember.user?.displayName || 'this user'}'s role from ${selectedMember.role} to ${newRole}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Confirm',
//           style: 'default',
//           onPress: () => executeRoleChange(newRole),
//         },
//       ]
//     );
//   };

//   const executeRoleChange = async (newRole: TeamRole) => {
//     if (!selectedMember || !currentGym || !isOwner) return;
    
//     setProcessing(true);
//     try {
//       await gymService.changeTeamRole(currentGym.id, selectedMember.userId, newRole);
      
//       // Reload gym data and team members
//       await loadCurrentGym(currentGym.id);
//       await loadTeamMembers();
      
//       Alert.alert('Success', `Role changed to ${newRole} successfully`);
//     } catch (error: any) {
//       console.error('Error changing role:', error);
//       Alert.alert('Error', error.message || 'Failed to change role');
//     } finally {
//       setProcessing(false);
//       setShowChangeRole(false);
//       setShowActionMenu(false);
//       setSelectedMember(null);
//     }
//   };

//   const handleRemoveFromTeam = () => {
//     if (!selectedMember || !currentGym) return;
    
//     // Prevent removing yourself if you're the only owner
//     if (selectedMember.userId === currentUser?.id && selectedMember.role === 'owner') {
//       const ownerCount = teamMembers.filter(m => m.role === 'owner').length;
//       if (ownerCount <= 1) {
//         Alert.alert(
//           'Cannot Remove',
//           'You are the only owner of this gym. Please add another owner before removing yourself.',
//           [{ text: 'OK' }]
//         );
//         setShowActionMenu(false);
//         setSelectedMember(null);
//         return;
//       }
//     }
    
//     Alert.alert(
//       'Remove from Team',
//       `Remove ${selectedMember.user?.displayName || 'this user'} from the team? They will lose access to gym management features.`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: executeRemoveFromTeam,
//         },
//       ]
//     );
//   };

//   const executeRemoveFromTeam = async () => {
//     if (!selectedMember || !currentGym || !isOwner) return;
    
//     setProcessing(true);
//     try {
//       await gymService.removeFromTeam(currentGym.id, selectedMember.userId);
      
//       // Reload gym data and team members
//       await loadCurrentGym(currentGym.id);
//       await loadTeamMembers();
      
//       Alert.alert('Success', 'User removed from team successfully');
//     } catch (error: any) {
//       console.error('Error removing from team:', error);
//       Alert.alert('Error', error.message || 'Failed to remove from team');
//     } finally {
//       setProcessing(false);
//       setShowActionMenu(false);
//       setSelectedMember(null);
//     }
//   };

//   const getRoleColor = (role: TeamRole) => {
//     switch (role) {
//       case 'owner': return theme.colors.primary;
//       case 'staff': return theme.colors.secondary;
//       case 'trainer': return theme.colors.accent;
//       default: return theme.colors.text.secondary;
//     }
//   };

//   const getRoleIcon = (role: TeamRole) => {
//     switch (role) {
//       case 'owner': return 'shield';
//       case 'staff': return 'people';
//       case 'trainer': return 'barbell';
//       default: return 'person';
//     }
//   };

//   const renderTeamMemberCard = (member: TeamMember) => {
//     const roleColor = getRoleColor(member.role);
//     const roleIcon = getRoleIcon(member.role);
    
//     return (
//       <View
//         key={member.userId}
//         style={{
//           backgroundColor: theme.colors.card,
//           borderRadius: 12,
//           padding: 16,
//           marginBottom: 12,
//           borderWidth: 1,
//           borderColor: theme.colors.border,
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}
//       >
//         {/* Avatar */}
//         <View style={{
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//           backgroundColor: `${roleColor}15`,
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginRight: 12,
//         }}>
//           <Ionicons 
//             name={roleIcon as any} 
//             size={20} 
//             color={roleColor} 
//           />
//         </View>
        
//         {/* Member Info */}
//         <View style={{ flex: 1 }}>
//           <ThemeText style={{
//             fontSize: 16,
//             fontWeight: '600',
//             color: theme.colors.text.primary,
//             marginBottom: 2,
//           }}>
//             {member.user?.displayName || 'Unknown User'}
//           </ThemeText>
          
//           <ThemeText style={{
//             fontSize: 12,
//             color: theme.colors.text.secondary,
//             marginBottom: 4,
//           }}>
//             {member.user?.email || 'No email'}
//           </ThemeText>
          
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <View style={{
//               backgroundColor: `${roleColor}15`,
//               paddingHorizontal: 8,
//               paddingVertical: 2,
//               borderRadius: 12,
//               marginRight: 8,
//             }}>
//               <ThemeText style={{
//                 fontSize: 10,
//                 fontWeight: '600',
//                 color: roleColor,
//                 textTransform: 'uppercase',
//               }}>
//                 {member.role}
//               </ThemeText>
//             </View>
            
//             {member.joinDate && (
//               <ThemeText style={{
//                 fontSize: 10,
//                 color: theme.colors.text.secondary,
//               }}>
//                 Joined {member.joinDate.toLocaleDateString()}
//               </ThemeText>
//             )}
//           </View>
//         </View>
        
//         {/* Action Button (only for owners) */}
//         {isOwner && (
//           <TouchableOpacity
//             style={{ padding: 8 }}
//             onPress={(e) => handleActionPress(member, e)}
//             disabled={processing}
//           >
//             <Ionicons 
//               name="ellipsis-vertical" 
//               size={20} 
//               color={theme.colors.text.secondary} 
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   };

//   const renderTabs = () => {
//     const tabs: { role: TeamRole; label: string; count: number }[] = [
//       { role: 'owner', label: 'Owners', count: teamMembers.filter(m => m.role === 'owner').length },
//       { role: 'staff', label: 'Staff', count: teamMembers.filter(m => m.role === 'staff').length },
//       { role: 'trainer', label: 'Trainers', count: teamMembers.filter(m => m.role === 'trainer').length },
//     ];
    
//     return (
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         style={{ marginBottom: 16 }}
//       >
//         <View style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
//           {tabs.map(({ role, label, count }) => (
//             <TouchableOpacity
//               key={role}
//               style={{
//                 paddingHorizontal: 20,
//                 paddingVertical: 10,
//                 marginRight: 8,
//                 borderRadius: 20,
//                 backgroundColor: activeTab === role 
//                   ? `${getRoleColor(role)}15` 
//                   : 'transparent',
//                 borderWidth: 1,
//                 borderColor: activeTab === role 
//                   ? getRoleColor(role)
//                   : theme.colors.border,
//                 alignItems: 'center',
//                 minWidth: 100,
//               }}
//               onPress={() => setActiveTab(role)}
//               disabled={processing}
//             >
//               <ThemeText style={{
//                 fontSize: 14,
//                 fontWeight: '600',
//                 color: activeTab === role 
//                   ? getRoleColor(role)
//                   : theme.colors.text.secondary,
//                 marginBottom: 2,
//               }}>
//                 {label}
//               </ThemeText>
//               <ThemeText style={{
//                 fontSize: 12,
//                 color: activeTab === role 
//                   ? getRoleColor(role)
//                   : theme.colors.text.secondary,
//               }}>
//                 ({count})
//               </ThemeText>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     );
//   };

//   const renderActionMenu = () => {
//     if (!showActionMenu || !selectedMember || !isOwner) return null;
    
//     return (
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           top: actionMenuPosition.y - 100,
//           left: Math.max(actionMenuPosition.x - 150, 20),
//           backgroundColor: theme.colors.card,
//           borderRadius: 8,
//           borderWidth: 1,
//           borderColor: theme.colors.border,
//           elevation: 5,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,
//           zIndex: 1000,
//           width: 200,
//         }}
//         onPress={() => setShowActionMenu(false)}
//         activeOpacity={1}
//       >
//         <View style={{ padding: 8 }}>
//           <TouchableOpacity
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               padding: 12,
//               borderRadius: 6,
//             }}
//             onPress={() => {
//               setShowChangeRole(true);
//               setShowActionMenu(false);
//             }}
//             disabled={processing}
//           >
//             <Ionicons 
//               name="swap-horizontal" 
//               size={20} 
//               color={theme.colors.primary} 
//               style={{ marginRight: 12 }}
//             />
//             <ThemeText style={{
//               fontSize: 14,
//               color: theme.colors.text.primary,
//             }}>
//               Change Role
//             </ThemeText>
//           </TouchableOpacity>
          
//           <View style={{
//             height: 1,
//             backgroundColor: theme.colors.border,
//             marginVertical: 4,
//           }} />
          
//           <TouchableOpacity
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               padding: 12,
//               borderRadius: 6,
//             }}
//             onPress={handleRemoveFromTeam}
//             disabled={processing}
//           >
//             <Ionicons 
//               name="person-remove" 
//               size={20} 
//               color={theme.colors.warning} 
//               style={{ marginRight: 12 }}
//             />
//             <ThemeText style={{
//               fontSize: 14,
//               color: theme.colors.warning,
//             }}>
//               Remove from Team
//             </ThemeText>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderChangeRoleSection = () => {
//     if (!showChangeRole || !selectedMember || !isOwner) return null;
    
//     const availableRoles: TeamRole[] = ['owner', 'staff', 'trainer'].filter(
//       role => role !== selectedMember.role
//     ) as TeamRole[];
    
//     return (
//       <View style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: `${theme.colors.background}99`,
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1001,
//       }}>
//         <View style={{
//           backgroundColor: theme.colors.card,
//           borderRadius: 16,
//           padding: 20,
//           width: '90%',
//           maxWidth: 400,
//           borderWidth: 1,
//           borderColor: theme.colors.border,
//         }}>
//           <ThemeText style={{
//             fontSize: 18,
//             fontWeight: '600',
//             color: theme.colors.text.primary,
//             marginBottom: 16,
//             textAlign: 'center',
//           }}>
//             Change Role for {selectedMember.user?.displayName || 'User'}
//           </ThemeText>
          
//           <ThemeText style={{
//             fontSize: 14,
//             color: theme.colors.text.secondary,
//             marginBottom: 20,
//             textAlign: 'center',
//           }}>
//             Current role: <ThemeText style={{ 
//               color: getRoleColor(selectedMember.role),
//               fontWeight: '600' 
//             }}>
//               {selectedMember.role}
//             </ThemeText>
//           </ThemeText>
          
//           <View style={{ marginBottom: 24 }}>
//             {availableRoles.map((role) => (
//               <TouchableOpacity
//                 key={role}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   padding: 16,
//                   backgroundColor: `${getRoleColor(role)}10`,
//                   borderRadius: 8,
//                   marginBottom: 8,
//                   borderWidth: 1,
//                   borderColor: getRoleColor(role),
//                 }}
//                 onPress={() => handleChangeRole(role)}
//                 disabled={processing}
//               >
//                 <View style={{
//                   width: 24,
//                   height: 24,
//                   borderRadius: 12,
//                   backgroundColor: getRoleColor(role),
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginRight: 12,
//                 }}>
//                   <Ionicons 
//                     name={getRoleIcon(role) as any} 
//                     size={14} 
//                     color="#FFFFFF" 
//                   />
//                 </View>
                
//                 <View style={{ flex: 1 }}>
//                   <ThemeText style={{
//                     fontSize: 16,
//                     fontWeight: '600',
//                     color: getRoleColor(role),
//                     textTransform: 'capitalize',
//                   }}>
//                     {role}
//                   </ThemeText>
//                   <ThemeText style={{
//                     fontSize: 12,
//                     color: theme.colors.text.secondary,
//                     marginTop: 2,
//                   }}>
//                     {role === 'owner' ? 'Full access to all features' :
//                      role === 'staff' ? 'Can manage members and payments' :
//                      'Can only view assigned members'}
//                   </ThemeText>
//                 </View>
                
//                 <Ionicons 
//                   name="chevron-forward" 
//                   size={20} 
//                   color={getRoleColor(role)} 
//                 />
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{ flexDirection: 'row', gap: 12 }}>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 padding: 16,
//                 backgroundColor: theme.colors.card,
//                 borderRadius: 8,
//                 borderWidth: 1,
//                 borderColor: theme.colors.border,
//                 alignItems: 'center',
//               }}
//               onPress={() => {
//                 setShowChangeRole(false);
//                 setSelectedMember(null);
//               }}
//               disabled={processing}
//             >
//               <ThemeText style={{
//                 fontSize: 16,
//                 fontWeight: '600',
//                 color: theme.colors.text.primary,
//               }}>
//                 Cancel
//               </ThemeText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={{
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingVertical: 60,
//     }}>
//       <Ionicons 
//         name="people-outline" 
//         size={64} 
//         color={theme.colors.text.secondary} 
//         style={{ marginBottom: 20 }}
//       />
//       <ThemeText style={{
//         fontSize: 18,
//         fontWeight: '600',
//         color: theme.colors.text.primary,
//         marginBottom: 8,
//         textAlign: 'center',
//       }}>
//         No {activeTab}s Found
//       </ThemeText>
//       <ThemeText style={{
//         fontSize: 14,
//         color: theme.colors.text.secondary,
//         textAlign: 'center',
//         lineHeight: 20,
//         marginHorizontal: 40,
//       }}>
//         {searchTerm
//           ? `No ${activeTab}s match your search.`
//           : `You haven't added any ${activeTab}s yet.`}
//       </ThemeText>
//     </View>
//   );

//   const renderLoading = () => (
//     <View style={{
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingVertical: 40,
//     }}>
//       <ActivityIndicator size="large" color={theme.colors.primary} />
//       <ThemeText style={{
//         marginTop: 16,
//         fontSize: 14,
//         color: theme.colors.text.secondary,
//       }}>
//         Loading team members...
//       </ThemeText>
//     </View>
//   );

//   if (!visible) return null;

//   return (
//     <Modal
//       animationType="slide"
//       visible={visible}
//       onRequestClose={onClose}
//       presentationStyle="pageSheet"
//     >
//       <StatusBar 
//         barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
//         backgroundColor={theme.colors.background}
//       />
      
//       <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//         {/* Header - Same as PaymentRecordModal */}
//         <View style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           paddingHorizontal: 16,
//           paddingTop: 16,
//           paddingBottom: 16,
//           borderBottomWidth: 1,
//           borderBottomColor: theme.colors.border,
//         }}>
//           <TouchableOpacity 
//             style={{ padding: 8 }}
//             onPress={onClose}
//             disabled={processing}
//           >
//             <Ionicons name="close" size={24} color={theme.colors.text.primary} />
//           </TouchableOpacity>
          
//           <View style={{ alignItems: 'center' }}>
//             <ThemeText style={{
//               fontSize: 18,
//               fontWeight: '600',
//               color: theme.colors.text.primary,
//             }}>
//               Manage Team
//             </ThemeText>
//             <ThemeText style={{
//               fontSize: 12,
//               color: theme.colors.text.secondary,
//               marginTop: 2,
//             }}>
//               {currentGym?.name || 'Gym'}
//             </ThemeText>
//           </View>
          
//           <View style={{ width: 40 }}>
//             {processing && (
//               <ActivityIndicator size="small" color={theme.colors.primary} />
//             )}
//           </View>
//         </View>

//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={{ flex: 1 }}
//         >
//           <ScrollView 
//             style={{ flex: 1 }}
//             contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Info Note for Non-Owners */}
//             {!isOwner && (
//               <View style={{
//                 backgroundColor: `${theme.colors.semantic.info}10`,
//                 padding: 12,
//                 borderRadius: 8,
//                 borderWidth: 1,
//                 borderColor: theme.colors.semantic.info,
//                 marginBottom: 16,
//               }}>
//                 <ThemeText style={{
//                   fontSize: 12,
//                   color: theme.colors.semantic.info,
//                   fontWeight: '600',
//                   textAlign: 'center',
//                 }}>
//                   ⓘ Only gym owners can manage team members.
//                 </ThemeText>
//               </View>
//             )}

//             {/* Search Bar */}
//             <View style={{ marginBottom: 16 }}>
//               <View style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 backgroundColor: theme.colors.card,
//                 borderRadius: 8,
//                 borderWidth: 1,
//                 borderColor: theme.colors.border,
//                 paddingHorizontal: 12,
//                 height: 44,
//               }}>
//                 <Ionicons 
//                   name="search" 
//                   size={20} 
//                   color={theme.colors.text.secondary} 
//                   style={{ marginRight: 8 }}
//                 />
//                 <TextInput
//                   style={{
//                     flex: 1,
//                     fontSize: 16,
//                     color: theme.colors.text.primary,
//                     height: '100%',
//                   }}
//                   placeholder="Search by name or email..."
//                   placeholderTextColor={theme.colors.text.secondary}
//                   value={searchTerm}
//                   onChangeText={setSearchTerm}
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   editable={!processing}
//                 />
                
//                 {searchTerm.length > 0 && (
//                   <TouchableOpacity
//                     onPress={() => setSearchTerm('')}
//                     disabled={processing}
//                   >
//                     <Ionicons 
//                       name="close-circle" 
//                       size={20} 
//                       color={theme.colors.text.secondary} 
//                     />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>

//             {/* Role Tabs */}
//             {renderTabs()}

//             {/* Team Members List */}
//             {loading ? (
//               renderLoading()
//             ) : filteredMembers.length > 0 ? (
//               <View>
//                 <ThemeText style={{
//                   fontSize: 14,
//                   color: theme.colors.text.secondary,
//                   marginBottom: 12,
//                 }}>
//                   Showing {filteredMembers.length} {activeTab}{filteredMembers.length !== 1 ? 's' : ''}
//                 </ThemeText>
                
//                 {filteredMembers.map(renderTeamMemberCard)}
//               </View>
//             ) : (
//               renderEmptyState()
//             )}
//           </ScrollView>
//         </KeyboardAvoidingView>

//         {/* Action Menu */}
//         {renderActionMenu()}

//         {/* Change Role Section */}
//         {renderChangeRoleSection()}
//       </ThemeView>
//     </Modal>
//   );
// };

// export default TeamManagementModal;

// src/features/gym/components/TeamManagementModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { useAppStore } from '../../../shared/stores/useAppStore';
import { useGymStore } from '../stores/useGymStore';
import { useUserRole } from '../../../shared/hooks/useUserRole';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../../shared/types/domain/core/user';
import { gymService } from '../../../shared/services/GymService';
import { userRepository } from '../../../shared/services/repositories/UserRepository';

type TeamRole = 'owner' | 'staff' | 'trainer';

interface TeamMember {
  userId: string;
  role: TeamRole;
  user?: User;
  joinDate?: Date;
}

interface TeamManagementModalProps {
  visible: boolean;
  onClose: () => void;
}

const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useEnhancedTheme();
  const { user: currentUser } = useAppStore();
  const { currentGym, loadCurrentGym } = useGymStore();
  const { currentGymRole } = useUserRole();
  
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TeamRole>('owner');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const isOwner = currentGymRole === 'owner';

  // Load team members when modal opens
  useEffect(() => {
    if (visible && currentGym) {
      loadTeamMembers();
    } else {
      // Reset state when closing
      resetState();
    }
  }, [visible, currentGym]);

  // Filter members based on search term and active tab
  useEffect(() => {
    if (!teamMembers.length) {
      setFilteredMembers([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    let filtered = teamMembers.filter(m => m.role === activeTab);
    
    if (term) {
      filtered = filtered.filter(member => 
        member.user?.displayName?.toLowerCase().includes(term) ||
        member.user?.email?.toLowerCase().includes(term)
      );
    }
    
    setFilteredMembers(filtered);
  }, [searchTerm, teamMembers, activeTab]);

  const resetState = () => {
    setTeamMembers([]);
    setFilteredMembers([]);
    setSearchTerm('');
    setActiveTab('owner');
    setSelectedMember(null);
    setShowActionMenu(false);
    setProcessing(false);
  };

  const loadTeamMembers = async () => {
    if (!currentGym) return;
    
    setLoading(true);
    try {
      const members: TeamMember[] = [];
      
      // Get all unique user IDs from all role arrays
      const allUserIds = [
        ...new Set([
          ...currentGym.owners,
          ...currentGym.staff,
          ...currentGym.trainers,
        ])
      ];
      
      // Fetch all users in parallel
      const userPromises = allUserIds.map(userId => userRepository.getById(userId));
      const users = await Promise.all(userPromises);
      
      // Map users to their roles
      users.forEach((user, index) => {
        if (user) {
          const userId = allUserIds[index];
          const membership = user.gymMemberships?.find(m => m.gymId === currentGym.id);
          
          // Determine role
          let role: TeamRole = 'staff'; // Default
          if (currentGym.owners.includes(userId)) role = 'owner';
          else if (currentGym.staff.includes(userId)) role = 'staff';
          else if (currentGym.trainers.includes(userId)) role = 'trainer';
          
          members.push({
            userId,
            role,
            user,
            joinDate: membership?.joinedAt,
          });
        }
      });
      
      // Sort members: owners first, then staff, then trainers
      const sortedMembers = members.sort((a, b) => {
        const roleOrder = { owner: 0, staff: 1, trainer: 2 };
        return roleOrder[a.role] - roleOrder[b.role];
      });
      
      setTeamMembers(sortedMembers);
    } catch (error) {
      console.error('Error loading team members:', error);
      Alert.alert('Error', 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = (member: TeamMember) => {
    if (!isOwner) return;
    
    setSelectedMember(member);
    setShowActionMenu(true);
  };

  const handleChangeRole = (newRole: TeamRole) => {
    if (!selectedMember || !currentGym) return;
    
    // Prevent changing own role if you're the only owner
    if (selectedMember.userId === currentUser?.id && selectedMember.role === 'owner' && newRole !== 'owner') {
      const ownerCount = teamMembers.filter(m => m.role === 'owner').length;
      if (ownerCount <= 1) {
        Alert.alert(
          'Cannot Change Role',
          'You are the only owner of this gym. Please add another owner before changing your role.',
          [{ text: 'OK' }]
        );
        setSelectedMember(null);
        setShowActionMenu(false);
        return;
      }
    }
    
    Alert.alert(
      'Change Role',
      `Change ${selectedMember.user?.displayName || 'this user'}'s role from ${selectedMember.role} to ${newRole}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'default',
          onPress: () => executeRoleChange(newRole),
        },
      ]
    );
  };

  const executeRoleChange = async (newRole: TeamRole) => {
    if (!selectedMember || !currentGym || !isOwner) return;
    
    setProcessing(true);
    try {
      await gymService.changeTeamRole(currentGym.id, selectedMember.userId, newRole);
      
      // Reload gym data and team members
      await loadCurrentGym(currentGym.id);
      await loadTeamMembers();
      
      Alert.alert('Success', `Role changed to ${newRole} successfully`);
      setSelectedMember(null);
      setShowActionMenu(false);
    } catch (error: any) {
      console.error('Error changing role:', error);
      Alert.alert('Error', error.message || 'Failed to change role');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveFromTeam = () => {
    if (!selectedMember || !currentGym) return;
    
    // Prevent removing yourself if you're the only owner
    if (selectedMember.userId === currentUser?.id && selectedMember.role === 'owner') {
      const ownerCount = teamMembers.filter(m => m.role === 'owner').length;
      if (ownerCount <= 1) {
        Alert.alert(
          'Cannot Remove',
          'You are the only owner of this gym. Please add another owner before removing yourself.',
          [{ text: 'OK' }]
        );
        setSelectedMember(null);
        setShowActionMenu(false);
        return;
      }
    }
    
    Alert.alert(
      'Remove from Team',
      `Remove ${selectedMember.user?.displayName || 'this user'} from the team? They will lose access to gym management features.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: executeRemoveFromTeam,
        },
      ]
    );
  };

  const executeRemoveFromTeam = async () => {
    if (!selectedMember || !currentGym || !isOwner) return;
    
    setProcessing(true);
    try {
      await gymService.removeFromTeam(currentGym.id, selectedMember.userId);
      
      // Reload gym data and team members
      await loadCurrentGym(currentGym.id);
      await loadTeamMembers();
      
      Alert.alert('Success', 'User removed from team successfully');
      setSelectedMember(null);
      setShowActionMenu(false);
    } catch (error: any) {
      console.error('Error removing from team:', error);
      Alert.alert('Error', error.message || 'Failed to remove from team');
    } finally {
      setProcessing(false);
    }
  };

  const getRoleColor = (role: TeamRole) => {
    switch (role) {
      case 'owner': return theme.colors.primary;
      case 'staff': return theme.colors.secondary;
      case 'trainer': return theme.colors.accent;
      default: return theme.colors.text.secondary;
    }
  };

  const getRoleIcon = (role: TeamRole) => {
    switch (role) {
      case 'owner': return 'shield';
      case 'staff': return 'people';
      case 'trainer': return 'barbell';
      default: return 'person';
    }
  };

  const renderTeamMemberCard = (member: TeamMember) => {
    const roleColor = getRoleColor(member.role);
    const roleIcon = getRoleIcon(member.role);
    const isCurrentUser = member.userId === currentUser?.id;
    
    return (
      <TouchableOpacity
        key={member.userId}
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => handleCardPress(member)}
        disabled={!isOwner || processing}
        activeOpacity={isOwner ? 0.7 : 1}
      >
        {/* Avatar */}
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: `${roleColor}15`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          <Ionicons 
            name={roleIcon as any} 
            size={20} 
            color={roleColor} 
          />
        </View>
        
        {/* Member Info */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <ThemeText style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.primary,
              marginRight: 8,
            }}>
              {member.user?.displayName || 'Unknown User'}
            </ThemeText>
            
            {isCurrentUser && (
              <View style={{
                backgroundColor: `${theme.colors.primary}15`,
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 8,
              }}>
                <ThemeText style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: theme.colors.primary,
                }}>
                  You
                </ThemeText>
              </View>
            )}
          </View>
          
          <ThemeText style={{
            fontSize: 12,
            color: theme.colors.text.secondary,
            marginBottom: 4,
          }}>
            {member.user?.email || 'No email'}
          </ThemeText>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              backgroundColor: `${roleColor}15`,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 12,
              marginRight: 8,
            }}>
              <ThemeText style={{
                fontSize: 10,
                fontWeight: '600',
                color: roleColor,
                textTransform: 'uppercase',
              }}>
                {member.role}
              </ThemeText>
            </View>
            
            {member.joinDate && (
              <ThemeText style={{
                fontSize: 10,
                color: theme.colors.text.secondary,
              }}>
                Joined {member.joinDate.toLocaleDateString()}
              </ThemeText>
            )}
          </View>
        </View>
        
        {/* Edit Icon (only for owners, not for self) */}
        {isOwner && !isCurrentUser && (
          <TouchableOpacity
            style={{ 
              padding: 8,
              opacity: processing ? 0.5 : 1,
            }}
            onPress={() => handleCardPress(member)}
            disabled={processing}
          >
            <Ionicons 
              name="create-outline" 
              size={20} 
              color={theme.colors.text.secondary} 
            />
          </TouchableOpacity>
        )}
        
        {/* Current user indicator */}
        {isCurrentUser && (
          <View style={{ padding: 8 }}>
            <Ionicons 
              name="person" 
              size={20} 
              color={theme.colors.text.secondary} 
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderActionMenu = () => {
    if (!showActionMenu || !selectedMember || !isOwner) return null;
    
    const availableRoles: TeamRole[] = ['owner', 'staff', 'trainer'].filter(
      role => role !== selectedMember.role
    ) as TeamRole[];
    
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `${theme.colors.background}99`,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001,
      }}>
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: 16,
          padding: 20,
          width: '90%',
          maxWidth: 400,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}>
          <ThemeText style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginBottom: 8,
            textAlign: 'center',
          }}>
            {selectedMember.user?.displayName || 'User'}
          </ThemeText>
          
          <ThemeText style={{
            fontSize: 14,
            color: theme.colors.text.secondary,
            marginBottom: 20,
            textAlign: 'center',
          }}>
            Current role: <ThemeText style={{ 
              color: getRoleColor(selectedMember.role),
              fontWeight: '600' 
            }}>
              {selectedMember.role}
            </ThemeText>
          </ThemeText>
          
          {/* Change Role Section */}
          <View style={{ marginBottom: 24 }}>
            <ThemeText style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.colors.text.secondary,
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              Change Role
            </ThemeText>
            
            {availableRoles.map((role) => (
              <TouchableOpacity
                key={role}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                  backgroundColor: `${getRoleColor(role)}10`,
                  borderRadius: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: getRoleColor(role),
                }}
                onPress={() => handleChangeRole(role)}
                disabled={processing}
              >
                <View style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: getRoleColor(role),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Ionicons 
                    name={getRoleIcon(role) as any} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </View>
                
                <View style={{ flex: 1 }}>
                  <ThemeText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: getRoleColor(role),
                    textTransform: 'capitalize',
                  }}>
                    {role}
                  </ThemeText>
                  <ThemeText style={{
                    fontSize: 12,
                    color: theme.colors.text.secondary,
                    marginTop: 2,
                  }}>
                    {role === 'owner' ? 'Full access to all features' :
                     role === 'staff' ? 'Can manage members and payments' :
                     'Can only view assigned members'}
                  </ThemeText>
                </View>
                
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={getRoleColor(role)} 
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Remove from Team Option */}
          <View style={{
            marginBottom: 24,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 14,
                backgroundColor: `${theme.colors.warning}10`,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.warning,
              }}
              onPress={handleRemoveFromTeam}
              disabled={processing}
            >
              <View style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: theme.colors.warning,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <Ionicons 
                  name="person-remove" 
                  size={16} 
                  color="#FFFFFF" 
                />
              </View>
              
              <View style={{ flex: 1 }}>
                <ThemeText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: theme.colors.warning,
                }}>
                  Remove from Team
                </ThemeText>
                <ThemeText style={{
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  marginTop: 2,
                }}>
                  User will lose access to management features
                </ThemeText>
              </View>
              
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={theme.colors.warning} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Cancel Button */}
          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: theme.colors.card,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: 'center',
            }}
            onPress={() => {
              setShowActionMenu(false);
              setSelectedMember(null);
            }}
            disabled={processing}
          >
            <ThemeText style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.primary,
            }}>
              Cancel
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTabs = () => {
    const tabs: { role: TeamRole; label: string; count: number }[] = [
      { role: 'owner', label: 'Owners', count: teamMembers.filter(m => m.role === 'owner').length },
      { role: 'staff', label: 'Staff', count: teamMembers.filter(m => m.role === 'staff').length },
      { role: 'trainer', label: 'Trainers', count: teamMembers.filter(m => m.role === 'trainer').length },
    ];
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        <View style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
          {tabs.map(({ role, label, count }) => (
            <TouchableOpacity
              key={role}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginRight: 8,
                borderRadius: 20,
                backgroundColor: activeTab === role 
                  ? `${getRoleColor(role)}15` 
                  : 'transparent',
                borderWidth: 1,
                borderColor: activeTab === role 
                  ? getRoleColor(role)
                  : theme.colors.border,
                alignItems: 'center',
                minWidth: 100,
              }}
              onPress={() => setActiveTab(role)}
              disabled={processing}
            >
              <ThemeText style={{
                fontSize: 14,
                fontWeight: '600',
                color: activeTab === role 
                  ? getRoleColor(role)
                  : theme.colors.text.secondary,
                marginBottom: 2,
              }}>
                {label}
              </ThemeText>
              <ThemeText style={{
                fontSize: 12,
                color: activeTab === role 
                  ? getRoleColor(role)
                  : theme.colors.text.secondary,
              }}>
                ({count})
              </ThemeText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderEmptyState = () => (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
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
        No {activeTab}s Found
      </ThemeText>
      <ThemeText style={{
        fontSize: 14,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
        marginHorizontal: 40,
      }}>
        {searchTerm
          ? `No ${activeTab}s match your search.`
          : `You haven't added any ${activeTab}s yet.`}
      </ThemeText>
    </View>
  );

  const renderLoading = () => (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <ThemeText style={{
        marginTop: 16,
        fontSize: 14,
        color: theme.colors.text.secondary,
      }}>
        Loading team members...
      </ThemeText>
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <StatusBar 
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      <ThemeView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header - Same as PaymentRecordModal */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={onClose}
            disabled={processing}
          >
            <Ionicons name="close" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          
          <View style={{ alignItems: 'center' }}>
            <ThemeText style={{
              fontSize: 18,
              fontWeight: '600',
              color: theme.colors.text.primary,
            }}>
              Manage Team
            </ThemeText>
            <ThemeText style={{
              fontSize: 12,
              color: theme.colors.text.secondary,
              marginTop: 2,
            }}>
              {currentGym?.name || 'Gym'}
            </ThemeText>
          </View>
          
          <View style={{ width: 40 }}>
            {processing && (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            )}
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Info Note for Non-Owners */}
            {!isOwner && (
              <View style={{
                backgroundColor: `${theme.colors.semantic.info}10`,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.semantic.info,
                marginBottom: 16,
              }}>
                <ThemeText style={{
                  fontSize: 12,
                  color: theme.colors.semantic.info,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  ⓘ Only gym owners can manage team members.
                </ThemeText>
              </View>
            )}

            {/* Info Note for Owners */}
            {isOwner && (
              <View style={{
                backgroundColor: `${theme.colors.primary}10`,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: `${theme.colors.primary}30`,
                marginBottom: 16,
              }}>
                <ThemeText style={{
                  fontSize: 12,
                  color: theme.colors.primary,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  👆 Tap on any team member to manage their role or remove them from the team
                </ThemeText>
              </View>
            )}

            {/* Search Bar */}
            <View style={{ marginBottom: 16 }}>
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
                  placeholder="Search by name or email..."
                  placeholderTextColor={theme.colors.text.secondary}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!processing}
                />
                
                {searchTerm.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchTerm('')}
                    disabled={processing}
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

            {/* Role Tabs */}
            {renderTabs()}

            {/* Team Members List */}
            {loading ? (
              renderLoading()
            ) : filteredMembers.length > 0 ? (
              <View>
                <ThemeText style={{
                  fontSize: 14,
                  color: theme.colors.text.secondary,
                  marginBottom: 12,
                }}>
                  Showing {filteredMembers.length} {activeTab}{filteredMembers.length !== 1 ? 's' : ''}
                </ThemeText>
                
                {filteredMembers.map(renderTeamMemberCard)}
              </View>
            ) : (
              renderEmptyState()
            )}
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Action Menu */}
        {renderActionMenu()}
      </ThemeView>
    </Modal>
  );
};

export default TeamManagementModal;