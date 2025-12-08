// // src/features/home/components/styles/homeScreenStyles.ts
// import { StyleSheet } from 'react-native';

// export const createHomeStyles = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
//   headerContent: {
//     alignItems: 'flex-start',
//   },
//   greeting: {
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 20,
//     marginTop: 16,
//     marginBottom: 8,
//     borderRadius: 12,
//     padding: 4,
//   },
//   toggleButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   activeToggleButton: {
//     shadowColor: theme.colors.primary,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   toggleText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: theme.colors.text.secondary,
//   },
//   activeToggleText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//   },
//   content: {
//     flex: 1,
//   },
// });

// src/features/home/styles/homeScreenStyles.ts
// import { StyleSheet, Dimensions } from 'react-native';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const HEADER_HEIGHT = 120; // Total sticky header height

// export const createHomeStyles = (theme: any) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//   },
  
//   // Twitter-Style Sticky Header
//   stickyHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: HEADER_HEIGHT,
//     zIndex: 1000,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//     // Shadow for iOS
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     // Elevation for Android
//     elevation: 3,
//   },
  
//   // Top Row (Brand + Actions)
//   headerTopRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 12, // Account for status bar/safe area
//     paddingBottom: 12,
//     height: 60,
//   },
  
//   headerLeft: {
//     flex: 1,
//   },
  
//   appTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     letterSpacing: -0.5,
//   },
  
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
  
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//     // Shadow for depth
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//     elevation: 2,
//   },
  
//   iconText: {
//     fontSize: 20,
//   },
  
//   // Three-Tab Segmented Control (Twitter Style)
//   tabContainer: {
//     flexDirection: 'row',
//     height: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.colors.border,
//   },
  
//   tabButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 3,
//     borderBottomColor: 'transparent',
//   },
  
//   activeTabButton: {
//     borderBottomWidth: 3,
//   },
  
//   tabText: {
//     fontSize: 15,
//     fontWeight: '600',
//     letterSpacing: -0.3,
//   },
  
//   activeTabText: {
//     // fontWeight is handled inline for proper bold rendering
//   },
  
//   // Main Content Area
//   contentScrollView: {
//     flex: 1,
//   },
  
//   contentContainer: {
//     paddingTop: HEADER_HEIGHT, // Push content below sticky header
//     paddingBottom: 20,
//     minHeight: '100%', // Ensure scroll works even with little content
//   },
  
//   // My Gym Tab Styles
//   comingSoonContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 32,
//     alignItems: 'center',
//   },
  
//   comingSoonTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
  
//   comingSoonText: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
  
//   comingSoonDescription: {
//     fontSize: 16,
//     textAlign: 'center',
//     lineHeight: 22,
//     maxWidth: '80%',
//   },
  
//   placeholderCard: {
//     width: '100%',
//     borderRadius: 16,
//     padding: 20,
//     marginTop: 24,
//     // Shadow
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
  
//   placeholderTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 16,
//   },
  
//   featureList: {
//     width: '100%',
//   },
  
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
  
//   featureBullet: {
//     fontSize: 18,
//     marginRight: 12,
//   },
  
//   featureText: {
//     fontSize: 15,
//     flex: 1,
//   },
// });

// src/features/home/styles/homeScreenStyles.ts
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;
const HEADER_TOTAL_HEIGHT = Platform.OS === 'ios' ? 96 : 88; // Twitter-like height
const TOP_ROW_HEIGHT = 44; // Twitter's top row height
const TAB_ROW_HEIGHT = 48; // Twitter's tab height

export const createHomeStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Status bar background for transparent header effect
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    zIndex: 999,
  },
  
  // Twitter-Style Compact Sticky Header
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_TOTAL_HEIGHT,
    zIndex: 1000,
    // Twitter uses subtle bottom border
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    // Very subtle shadow like Twitter
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: StyleSheet.hairlineWidth,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0.5,
    // Elevation for Android
    elevation: 1,
  },
  
  // Top Row (Brand + Actions) - Twitter Compact
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: TOP_ROW_HEIGHT,
    // No vertical padding - Twitter is very compact
  },
  
  headerLeft: {
    flex: 1,
  },
  
  // Twitter-style app title (smaller, cleaner)
  appTitle: {
    fontSize: 20, // Twitter uses 17-20px
    fontWeight: '700',
    letterSpacing: -0.3, // Twitter's tighter letter spacing
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Twitter-style icon button (smaller, no background)
  iconButton: {
    width: 34, // Twitter icon size
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    // Twitter icons have no background, just the icon
  },
  
  iconText: {
    fontSize: 18, // Slightly smaller icon
  },
  
  // Three-Tab Segmented Control (Twitter Compact Style)
  tabContainer: {
    flexDirection: 'row',
    height: TAB_ROW_HEIGHT, // Twitter tab height
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2, // Twitter's thin indicator
    borderBottomColor: 'transparent',
  },
  
  activeTabButton: {
    borderBottomWidth: 2, // Twitter's active indicator
  },
  
  // Twitter-style tab text
  tabText: {
    fontSize: 15, // Twitter's tab font size
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  
  activeTabText: {
    // fontWeight is handled inline for proper bold rendering
  },
  
  // Main Content Area
  contentScrollView: {
    flex: 1,
  },
  
  contentContainer: {
    paddingTop: HEADER_TOTAL_HEIGHT, // Push content below sticky header
    paddingBottom: 20,
    minHeight: '100%', // Ensure scroll works even with little content
  },
  
  // My Gym Tab Styles
  comingSoonContainer: {
    flex: 1,
    paddingHorizontal: 16, // Twitter uses 16px horizontal padding
    paddingTop: 24,
    alignItems: 'center',
  },
  
  comingSoonTitle: {
    fontSize: 24, // Slightly smaller for compact design
    fontWeight: '700',
    marginBottom: 4,
  },
  
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  
  comingSoonDescription: {
    fontSize: 15, // Twitter's body text size
    textAlign: 'center',
    lineHeight: 20, // Tighter line height
    maxWidth: '90%',
  },
  
  placeholderCard: {
    width: '100%',
    borderRadius: 12, // Twitter's border radius
    padding: 16, // Compact padding
    marginTop: 20,
    // Twitter's subtle shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  
  placeholderTitle: {
    fontSize: 16, // Smaller title
    fontWeight: '600',
    marginBottom: 12,
  },
  
  featureList: {
    width: '100%',
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Tighter spacing
  },
  
  featureBullet: {
    fontSize: 16,
    marginRight: 10,
  },
  
  featureText: {
    fontSize: 14, // Smaller text
    flex: 1,
  },
});