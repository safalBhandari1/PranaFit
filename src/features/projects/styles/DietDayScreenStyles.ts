// // src/features/projects/styles/DietDayScreenStyles.ts
// import { StyleSheet, Dimensions } from 'react-native';
// import { Theme } from '../../../shared/stores/useThemeStore';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export const createStyles = (theme: Theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backArrow: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontWeight: 'bold',
//   },
//   headerSubtitle: {
//     color: theme.colors.text.secondary,
//     marginTop: 2,
//   },
//   headerSpacer: {
//     width: 40,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   summaryCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   summaryTitle: {
//     marginBottom: 16,
//     color: theme.colors.text.primary,
//   },
//   progressGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   progressItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   progressLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//     fontSize: 12,
//   },
//   progressValue: {
//     fontWeight: 'bold',
//     color: theme.colors.text.primary,
//     fontSize: 24,
//   },
//   progressTarget: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//     marginTop: 2,
//   },
//   completedBanner: {
//     marginTop: 16,
//     padding: 12,
//     backgroundColor: '#10B98120',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#10B98140',
//   },
//   completedText: {
//     color: '#065F46',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   mealsList: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   mealCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   mealCardCompleted: {
//     backgroundColor: `${theme.colors.primary}08`,
//     borderColor: `${theme.colors.primary}30`,
//   },
//   lastMealCard: {
//     marginBottom: 24,
//   },
//   mealHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   mealInfo: {
//     flex: 1,
//   },
//   mealName: {
//     color: theme.colors.text.primary,
//     marginBottom: 2,
//   },
//   mealSubtitle: {
//     color: theme.colors.text.secondary,
//   },
//   completeButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   completeButtonText: {
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   selectedOptionCard: {
//     backgroundColor: `${theme.colors.primary}05`,
//     borderRadius: 8,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: `${theme.colors.primary}20`,
//   },
//   selectedOptionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   selectedOptionName: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     flex: 1,
//   },
//   changeButton: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   changeButtonText: {
//     color: theme.colors.primary,
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   selectedOptionDescription: {
//     color: theme.colors.text.secondary,
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   nutritionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   nutritionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   nutritionLabel: {
//     color: theme.colors.text.secondary,
//     fontSize: 10,
//     marginBottom: 2,
//   },
//   nutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 12,
//   },
//   selectOptionButton: {
//     padding: 16,
//     backgroundColor: `${theme.colors.primary}10`,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: `${theme.colors.primary}30`,
//     borderStyle: 'dashed',
//     alignItems: 'center',
//   },
//   selectOptionText: {
//     color: theme.colors.primary,
//     fontWeight: '600',
//   },
//   completionTime: {
//     marginTop: 8,
//     alignItems: 'center',
//   },
//   completionTimeText: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//   },
//   bottomSpacer: {
//     height: 100,
//   },
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: theme.colors.background,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '80%',
//     paddingBottom: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   modalTitle: {
//     flex: 1,
//     color: theme.colors.text.primary,
//   },
//   modalCloseButton: {
//     padding: 8,
//   },
//   modalCloseText: {
//     fontSize: 24,
//     color: theme.colors.text.secondary,
//   },
//   modalSubtitle: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     color: theme.colors.text.primary,
//     backgroundColor: theme.colors.card,
//   },
//   optionsList: {
//     maxHeight: 400,
//     paddingHorizontal: 16,
//   },
//   optionCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   optionCardSelected: {
//     borderColor: theme.colors.primary,
//     backgroundColor: `${theme.colors.primary}10`,
//   },
//   optionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   optionName: {
//     flex: 1,
//     color: theme.colors.text.primary,
//     fontWeight: '600',
//   },
//   selectedIndicator: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: theme.colors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedIndicatorText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   optionEnglishName: {
//     color: theme.colors.text.secondary,
//     marginBottom: 8,
//     fontSize: 12,
//   },
//   optionDescription: {
//     color: theme.colors.text.secondary,
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   optionNutrition: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   optionNutritionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   optionNutritionLabel: {
//     color: theme.colors.text.secondary,
//     fontSize: 10,
//     marginBottom: 2,
//   },
//   optionNutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 12,
//   },
//   cancelButton: {
//     marginHorizontal: 20,
//     marginTop: 16,
//     padding: 16,
//     backgroundColor: theme.colors.border,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: theme.colors.text.primary,
//     fontWeight: '600',
//   },
// });


// // src/features/projects/styles/DietDayScreenStyles.ts
// import { StyleSheet, Dimensions } from 'react-native';
// import { Theme } from '../../../shared/stores/useThemeStore';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export const createStyles = (theme: Theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // ✅ UPDATED: Twitter-style Header (matching ReportDetailScreen)
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     height: 56,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//     backgroundColor: theme.colors.background,
//   },
  
//   // ✅ UPDATED: Back button with only arrow (Twitter style)
//   backButton: {
//     padding: 8,
//     marginLeft: -8, // Compensate for padding to align with Twitter style
//   },
  
//   // ✅ UPDATED: Back arrow (no text, just arrow)
//   backArrow: {
//     fontSize: 24,
//     fontWeight: '400',
//   },
  
//   // ✅ UPDATED: Header title container for centered title
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
  
//   headerSpacer: {
//     width: 40, // Same width as back button for balance
//   },
  
//   content: {
//     flex: 1,
//   },
  
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   // ✅ MOVED: Progress Card to content area
//   summaryCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
  
//   summaryTitle: {
//     marginBottom: 16,
//     color: theme.colors.text.primary,
//   },
  
//   progressGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
  
//   progressItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   progressLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//     fontSize: 12,
//   },
  
//   progressValue: {
//     fontWeight: 'bold',
//     color: theme.colors.text.primary,
//     fontSize: 24,
//   },
  
//   progressTarget: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//     marginTop: 2,
//   },
  
//   dateText: {
//     textAlign: 'center',
//     color: theme.colors.text.secondary,
//     marginTop: 8,
//     fontSize: 12,
//   },
  
//   completedBanner: {
//     marginTop: 12,
//     padding: 12,
//     backgroundColor: '#10B98120',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#10B98140',
//   },
  
//   completedText: {
//     color: '#065F46',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
  
//   // ✅ NEW: Toggle Section
//   toggleSection: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//   },
  
//   toggleTitle: {
//     marginBottom: 12,
//     color: theme.colors.text.primary,
//   },
  
//   toggleScrollView: {
//     maxHeight: 50,
//   },
  
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 8,
//   },
  
//   toggleButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     backgroundColor: theme.colors.card,
//     marginRight: 8,
//     minWidth: 100,
//     alignItems: 'center',
//   },
  
//   toggleButtonActive: {
//     backgroundColor: theme.colors.primary,
//     borderColor: theme.colors.primary,
//   },
  
//   toggleButtonCompleted: {
//     backgroundColor: '#10B98120',
//     borderColor: '#10B981',
//   },
  
//   toggleButtonText: {
//     color: theme.colors.text.primary,
//     fontWeight: '600',
//   },
  
//   toggleButtonTextActive: {
//     color: 'white',
//   },
  
//   toggleButtonTextCompleted: {
//     color: '#065F46',
//   },
  
//   // ✅ UPDATED: Options Section (No Modal)
//   optionsSection: {
//     marginHorizontal: 16,
//     marginBottom: 24,
//   },
  
//   mealHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
  
//   mealInfo: {
//     flex: 1,
//   },
  
//   mealTitle: {
//     color: theme.colors.text.primary,
//     marginBottom: 4,
//   },
  
//   mealSubtitle: {
//     color: theme.colors.text.secondary,
//   },
  
//   completionStatus: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     backgroundColor: theme.colors.border,
//   },
  
//   completionStatusCompleted: {
//     backgroundColor: '#10B981',
//   },
  
//   completionStatusText: {
//     color: theme.colors.text.secondary,
//     fontWeight: '600',
//     fontSize: 12,
//   },
  
//   completionStatusTextCompleted: {
//     color: 'white',
//   },
  
//   // Selected Option Card
//   selectedOptionCard: {
//     backgroundColor: `${theme.colors.primary}05`,
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: `${theme.colors.primary}20`,
//     marginBottom: 16,
//   },
  
//   selectedOptionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
  
//   selectedOptionTitle: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//   },
  
//   changeButton: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
  
//   changeButtonText: {
//     color: theme.colors.primary,
//     fontWeight: '600',
//     fontSize: 12,
//   },
  
//   selectedOptionContent: {
//     marginBottom: 16,
//   },
  
//   selectedOptionName: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 16,
//     marginBottom: 8,
//   },
  
//   selectedOptionDescription: {
//     color: theme.colors.text.secondary,
//     fontSize: 13,
//     marginBottom: 16,
//     lineHeight: 18,
//   },
  
//   nutritionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
  
//   nutritionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   nutritionLabel: {
//     color: theme.colors.text.secondary,
//     fontSize: 10,
//     marginBottom: 2,
//   },
  
//   nutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 12,
//   },
  
//   completeButton: {
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
  
//   completeButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
  
//   completionTime: {
//     marginTop: 12,
//     alignItems: 'center',
//   },
  
//   completionTimeText: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//   },
  
//   // Options List
//   optionsList: {
//     marginTop: 8,
//   },
  
//   optionsTitle: {
//     marginBottom: 12,
//     color: theme.colors.text.primary,
//   },
  
//   optionCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
  
//   optionCardSelected: {
//     borderColor: theme.colors.primary,
//     backgroundColor: `${theme.colors.primary}10`,
//   },
  
//   optionCardReadOnly: {
//     opacity: 0.7,
//   },
  
//   optionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
  
//   optionName: {
//     flex: 1,
//     color: theme.colors.text.primary,
//     fontWeight: '600',
//     fontSize: 16,
//   },
  
//   optionNameSelected: {
//     color: theme.colors.primary,
//   },
  
//   optionNameReadOnly: {
//     color: theme.colors.text.secondary,
//   },
  
//   selectedIndicator: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     backgroundColor: theme.colors.primary,
//   },
  
//   selectedIndicatorText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '600',
//   },
  
//   optionDescription: {
//     color: theme.colors.text.secondary,
//     fontSize: 13,
//     marginBottom: 12,
//     lineHeight: 18,
//   },
  
//   optionNutrition: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
  
//   optionNutritionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   optionNutritionLabel: {
//     color: theme.colors.text.secondary,
//     fontSize: 10,
//     marginBottom: 2,
//   },
  
//   optionNutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 12,
//   },
  
//   // Read-Only Notice
//   readOnlyNotice: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 12,
//     backgroundColor: '#6B728020',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#6B728040',
//   },
  
//   readOnlyNoticeText: {
//     color: '#6B7280',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
  
//   // Remove old modal styles (no longer needed)
//   // Removed: modalOverlay, modalContent, modalHeader, modalTitle, modalCloseButton, 
//   // modalCloseText, modalSubtitle, optionsList (old), optionCard (old), etc.
  
//   bottomSpacer: {
//     height: 100,
//   },
// });

// // src/features/projects/styles/DietDayScreenStyles.ts
// import { StyleSheet, Dimensions } from 'react-native';
// import { Theme } from '../../../shared/stores/useThemeStore';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export const createStyles = (theme: Theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // Header matching ReportDetailScreen (Twitter style)
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     height: 56,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//     backgroundColor: theme.colors.background,
//   },
  
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
  
//   backArrow: {
//     fontSize: 24,
//     fontWeight: '400',
//   },
  
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
  
//   headerSpacer: {
//     width: 40,
//   },
  
//   content: {
//     flex: 1,
//   },
  
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   // Progress Card
//   summaryCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
  
//   summaryTitle: {
//     marginBottom: 16,
//     color: theme.colors.text.primary,
//   },
  
//   progressGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
  
//   progressItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   progressLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//     fontSize: 12,
//   },
  
//   progressValue: {
//     fontWeight: 'bold',
//     color: theme.colors.text.primary,
//     fontSize: 24,
//   },
  
//   progressTarget: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//     marginTop: 2,
//   },
  
//   completedBanner: {
//     marginTop: 12,
//     padding: 12,
//     backgroundColor: '#10B98120',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#10B98140',
//   },
  
//   completedText: {
//     color: '#065F46',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
  
//   // Toggle Section (ProjectHomeScreen style)
//   toggleSection: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//   },
  
//   toggleScrollView: {
//     maxHeight: 40,
//   },
  
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 8,
//   },
  
//   toggleButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     backgroundColor: theme.colors.card,
//     marginRight: 8,
//     minWidth: 90,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   toggleButtonActive: {
//     backgroundColor: theme.colors.primary + '20',
//     borderColor: theme.colors.primary,
//   },
  
//   toggleButtonCompleted: {
//     backgroundColor: '#10B98120',
//     borderColor: '#10B981',
//   },
  
//   toggleButtonText: {
//     color: theme.colors.text.secondary,
//     fontWeight: '600',
//     fontSize: 13,
//   },
  
//   toggleButtonTextActive: {
//     color: theme.colors.primary,
//     fontWeight: '700',
//   },
  
//   toggleButtonTextCompleted: {
//     color: '#065F46',
//     fontWeight: '700',
//   },
  
//   // Options Section
//   optionsSection: {
//     marginHorizontal: 16,
//     marginBottom: 24,
//   },
  
//   mealHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
  
//   mealInfo: {
//     flex: 1,
//   },
  
//   mealSubtitle: {
//     color: theme.colors.text.secondary,
//     fontSize: 14,
//   },
  
//   // Options List
//   optionsList: {
//     marginTop: 8,
//   },
  
//   optionCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   optionCardSelected: {
//     borderColor: theme.colors.primary,
//     backgroundColor: `${theme.colors.primary}08`,
//   },
  
//   optionCardReadOnly: {
//     opacity: 0.7,
//   },
  
//   optionContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
  
//   optionTextContainer: {
//     flex: 1,
//     marginRight: 12,
//   },
  
//   optionName: {
//     color: theme.colors.text.primary,
//     fontWeight: '600',
//     fontSize: 16,
//     marginBottom: 8,
//   },
  
//   optionNameSelected: {
//     color: theme.colors.primary,
//   },
  
//   optionNameReadOnly: {
//     color: theme.colors.text.secondary,
//   },
  
//   optionDescription: {
//     color: theme.colors.text.secondary,
//     fontSize: 13,
//     marginBottom: 12,
//     lineHeight: 18,
//   },
  
//   optionNutrition: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
  
//   optionNutritionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   optionNutritionLabel: {
//     color: theme.colors.text.secondary,
//     fontSize: 10,
//     marginBottom: 2,
//   },
  
//   optionNutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 12,
//   },
  
//   // Checkbox Styles
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: theme.colors.border,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
  
//   checkboxSelected: {
//     backgroundColor: theme.colors.primary,
//     borderColor: theme.colors.primary,
//   },
  
//   checkboxDisabled: {
//     opacity: 0.5,
//   },
  
//   checkboxCheck: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
  
//   bottomSpacer: {
//     height: 100,
//   },
// });

// // src/features/projects/styles/DietDayScreenStyles.ts
// import { StyleSheet, Dimensions } from 'react-native';
// import { Theme } from '../../../shared/stores/useThemeStore';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// export const createStyles = (theme: Theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // Header matching ReportDetailScreen (Twitter style)
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     height: 56,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//     backgroundColor: theme.colors.background,
//   },
  
//   backButton: {
//     padding: 8,
//     marginLeft: -8,
//   },
  
//   backArrow: {
//     fontSize: 24,
//     fontWeight: '400',
//   },
  
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
  
//   headerSpacer: {
//     width: 40,
//   },
  
//   content: {
//     flex: 1,
//   },
  
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   // Progress Card
//   summaryCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
  
//   summaryTitle: {
//     marginBottom: 16,
//     color: theme.colors.text.primary,
//   },
  
//   progressGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
  
//   progressItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   progressLabel: {
//     color: theme.colors.text.secondary,
//     marginBottom: 4,
//     fontSize: 12,
//   },
  
//   progressValue: {
//     fontWeight: 'bold',
//     color: theme.colors.text.primary,
//     fontSize: 24,
//   },
  
//   progressTarget: {
//     color: theme.colors.text.secondary,
//     fontSize: 11,
//     marginTop: 2,
//   },
  
//   completedBanner: {
//     marginTop: 12,
//     padding: 12,
//     backgroundColor: '#10B98120',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#10B98140',
//   },
  
//   completedText: {
//     color: '#065F46',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
  
//   markCompleteBanner: {
//     marginTop: 12,
//     padding: 16,
//     backgroundColor: `${theme.colors.primary}15`,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: `${theme.colors.primary}30`,
//     alignItems: 'center',
//   },
  
//   markCompleteText: {
//     color: theme.colors.primary,
//     textAlign: 'center',
//     fontWeight: '600',
//     marginBottom: 12,
//   },
  
//   markCompleteButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 8,
//     minWidth: 180,
//   },
  
//   markCompleteButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
  
//   // Toggle Section (ProjectHomeScreen style)
//   toggleSection: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//   },
  
//   toggleScrollView: {
//     maxHeight: 40,
//   },
  
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 8,
//   },
  
//   toggleButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     backgroundColor: theme.colors.card,
//     marginRight: 8,
//     minWidth: 90,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   toggleButtonActive: {
//     backgroundColor: theme.colors.primary + '20',
//     borderColor: theme.colors.primary,
//   },
  
//   toggleButtonSelected: {
//     backgroundColor: `${theme.colors.primary}10`,
//     borderColor: `${theme.colors.primary}50`,
//   },
  
//   toggleButtonCompleted: {
//     backgroundColor: '#10B98120',
//     borderColor: '#10B981',
//   },
  
//   toggleButtonText: {
//     color: theme.colors.text.secondary,
//     fontWeight: '600',
//     fontSize: 13,
//   },
  
//   toggleButtonTextActive: {
//     color: theme.colors.primary,
//     fontWeight: '700',
//   },
  
//   toggleButtonTextSelected: {
//     color: theme.colors.primary,
//     fontWeight: '700',
//   },
  
//   toggleButtonTextCompleted: {
//     color: '#065F46',
//     fontWeight: '700',
//   },
  
//   // Options Section
//   optionsSection: {
//     marginHorizontal: 16,
//     marginBottom: 24,
//   },
  
//   mealHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
  
//   mealInfo: {
//     flex: 1,
//   },
  
//   mealSubtitle: {
//     color: theme.colors.text.secondary,
//     fontSize: 14,
//   },
  
//   selectionStatus: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 6,
//     backgroundColor: `${theme.colors.primary}20`,
//   },
  
//   selectionStatusCompleted: {
//     backgroundColor: '#10B98120',
//   },
  
//   selectionStatusText: {
//     color: theme.colors.primary,
//     fontWeight: '600',
//     fontSize: 12,
//   },
  
//   // Options List
//   optionsList: {
//     marginTop: 8,
//   },
  
//   optionCard: {
//     backgroundColor: theme.colors.card,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   optionCardSelected: {
//     borderColor: theme.colors.primary,
//     backgroundColor: `${theme.colors.primary}08`,
//   },
  
//   optionCardReadOnly: {
//     opacity: 0.7,
//   },
  
//   optionContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
  
//   optionTextContainer: {
//     flex: 1,
//     marginRight: 12,
//   },
  
//   optionName: {
//     color: theme.colors.text.primary,
//     fontWeight: '600',
//     fontSize: 16,
//     marginBottom: 8,
//   },
  
//   optionNameSelected: {
//     color: theme.colors.primary,
//   },
  
//   optionNameReadOnly: {
//     color: theme.colors.text.secondary,
//   },
  
//   optionDescription: {
//     color: theme.colors.text.secondary,
//     fontSize: 13,
//     marginBottom: 12,
//     lineHeight: 18,
//   },
  
//   optionNutrition: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
  
//   optionNutritionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
  
//   optionNutritionLabel: {
//     color: theme.colors.text.secondary,
//     fontSize: 10,
//     marginBottom: 2,
//   },
  
//   optionNutritionValue: {
//     fontWeight: '600',
//     color: theme.colors.text.primary,
//     fontSize: 12,
//   },
  
//   // Checkbox Styles
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: theme.colors.border,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
  
//   checkboxSelected: {
//     backgroundColor: theme.colors.primary,
//     borderColor: theme.colors.primary,
//   },
  
//   checkboxDisabled: {
//     opacity: 0.5,
//   },
  
//   checkboxCheck: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
  
//   optionCaloriesInfo: {
//     marginTop: 12,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: `${theme.colors.border}50`,
//     alignItems: 'center',
//   },
  
//   optionCaloriesText: {
//     color: theme.colors.primary,
//     fontWeight: '500',
//     fontSize: 12,
//   },
  
//   bottomSpacer: {
//     height: 100,
//   },
// });


// src/features/projects/styles/DietDayScreenStyles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../../shared/stores/useThemeStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Header matching ReportDetailScreen (Twitter style)
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
  
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  
  backArrow: {
    fontSize: 24,
    fontWeight: '400',
  },
  
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
  
  content: {
    flex: 1,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Progress Card
  summaryCard: {
    margin: 16,
    padding: 20,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  summaryTitle: {
    color: theme.colors.text.primary,
  },
  
  completedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#10B981',
  },
  
  completedBadgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 11,
  },
  
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  progressLabel: {
    color: theme.colors.text.secondary,
    marginBottom: 4,
    fontSize: 12,
  },
  
  progressValue: {
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    fontSize: 24,
  },
  
  progressTarget: {
    color: theme.colors.text.secondary,
    fontSize: 11,
    marginTop: 2,
  },
  
  markCompleteButton: {
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  
  markCompleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  
  // Toggle Section (ProjectHomeScreen style)
  toggleSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  
  toggleScrollView: {
    maxHeight: 40,
  },
  
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    marginRight: 8,
    minWidth: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  toggleButtonActive: {
    backgroundColor: theme.colors.primary + '20',
    borderColor: theme.colors.primary,
  },
  
  toggleButtonSelected: {
    backgroundColor: `${theme.colors.primary}10`,
    borderColor: `${theme.colors.primary}50`,
  },
  
  toggleButtonCompleted: {
    backgroundColor: '#10B98120',
    borderColor: '#10B981',
  },
  
  toggleButtonText: {
    color: theme.colors.text.secondary,
    fontWeight: '600',
    fontSize: 13,
  },
  
  toggleButtonTextActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  
  toggleButtonTextSelected: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  
  toggleButtonTextCompleted: {
    color: '#065F46',
    fontWeight: '700',
  },
  
  // Options Section
  optionsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  mealInfo: {
    flex: 1,
  },
  
  mealSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  
  // Options List
  optionsList: {
    marginTop: 8,
  },
  
  optionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  optionCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}08`,
  },
  
  optionCardReadOnly: {
    opacity: 0.7,
  },
  
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  
  optionName: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  
  optionNameSelected: {
    color: theme.colors.primary,
  },
  
  optionNameReadOnly: {
    color: theme.colors.text.secondary,
  },
  
  optionDescription: {
    color: theme.colors.text.secondary,
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  
  optionNutrition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  
  optionNutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  optionNutritionLabel: {
    color: theme.colors.text.secondary,
    fontSize: 10,
    marginBottom: 2,
  },
  
  optionNutritionValue: {
    fontWeight: '600',
    color: theme.colors.text.primary,
    fontSize: 12,
  },
  
  // Checkbox Styles
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  checkboxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  
  checkboxDisabled: {
    opacity: 0.5,
  },
  
  checkboxCheck: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  bottomSpacer: {
    height: 100,
  },
});