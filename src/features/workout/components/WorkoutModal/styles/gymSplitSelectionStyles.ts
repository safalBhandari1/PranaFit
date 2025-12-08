
// import { StyleSheet } from 'react-native';

// export const createGymSpliteSelectionStyle = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16, // 16px edge spacing
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   exerciseSelectionStepcontent: {
//     flex: 1,
//     paddingHorizontal: 16, // 16px edge spacing
//     paddingTop: 32, // 16px extra padding between header and MuscleGroups

//   },
//   section: {
//     marginBottom: 12,
//   },
//   gridRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//     gap: 8,
//   },
//   compactButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     minHeight: 50,
//     position: 'relative',
//   },
//   buttonEmoji: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     flex: 1,
//   },
//   selectionIndicator: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectionIndicatorText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   fixedFooter: {
//     padding: 16, // 16px edge spacing
//     paddingTop: 12,
//     borderTopWidth: 1,
//     paddingBottom: 24,
//     borderTopColor: theme.colors.border,
//   },
//   selectionActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   startSessionButton: {
//     flex: 2,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   startSessionButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import { StyleSheet } from 'react-native';

export const createGymSpliteSelectionStyle = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  // 🚀 UPDATED: Twitter-style Header (back arrow only, no text)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  
  // 🚀 UPDATED: Back button with only arrow (Twitter style)
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  
  // 🚀 UPDATED: Back arrow (no text, just arrow)
  backArrow: {
    fontSize: 24,
    fontWeight: '400',
  },
  
  // 🚀 UPDATED: Header title container for centered title
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  headerSpacer: {
    width: 40,
  },
  exerciseSelectionStepcontent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  section: {
    marginBottom: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  compactButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    position: 'relative',
  },
  buttonEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  // ✅ FIXED: Selection indicator - properly centered
  selectionIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // ✅ ADDED: Center the checkmark properly
    display: 'flex',
  },
  selectionIndicatorText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    // ✅ ADDED: Ensure checkmark is centered
    lineHeight: 16,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  fixedFooter: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    paddingBottom: 24,
    borderTopColor: theme.colors.border,
  },
  selectionActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  startSessionButton: {
    flex: 2,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startSessionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});