// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity } from 'react-native';
// import { useThemeStore } from '../../shared/stores/useThemeStore';
// import { ThemeText } from '../../shared/ui/ThemeText';
// import ProjectHomeScreen from '../../features/projects/components/ProjectHomeScreen';
// import { CreateProjectScreen } from '../../features/projects/components/CreateProjectScreen';
// import { ProjectDetailScreen } from '../../features/projects/components/ProjectDetailScreen';
// import { useEnhancedTheme } from '../../shared/hooks/useEnhancedTheme'; // ADD THIS


// const Stack = createNativeStackNavigator();

// export default function ProjectStackNavigator() {
//   //const { theme, toggleTheme, mode } = useThemeStore();
//   const { theme, toggleTheme, mode } = useEnhancedTheme(); // CHANGE THIS

  
//   return (
//     <Stack.Navigator>
//       {/* Project Home - No header (main tab view) */}
//       <Stack.Screen 
//         name="ProjectHome" 
//         component={ProjectHomeScreen}
//         options={{ headerShown: false }}
//       />
      
//       {/* Create Project - Apply options directly to each screen */}
//       <Stack.Screen 
//         name="CreateProject" 
//         component={CreateProjectScreen}
//         options={{ 
//           headerShown: true,
//           title: 'Create Project Plan',
//           headerStyle: {
//             backgroundColor: theme.colors.card,
//           },
//           headerTintColor: theme.colors.text.primary,
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//           headerRight: () => (
//             <TouchableOpacity 
//               onPress={toggleTheme}
//               style={{ 
//                 marginRight: 16, 
//                 padding: 8,
//                 borderRadius: 20,
//                 backgroundColor: theme.colors.primary,
//               }}
//             >
//               <ThemeText style={{ color: '#FFFFFF', fontSize: 16 }}>
//                 {mode === 'light' ? '🌙' : '☀️'}
//               </ThemeText>
//             </TouchableOpacity>
//           ),
//         }}
//       />
      
//       {/* Project Detail - Apply options directly to each screen */}
//       <Stack.Screen 
//         name="ProjectDetail" 
//         component={ProjectDetailScreen}
//         options={{ 
//           headerShown: true,
//           title: 'Project Details',
//           headerStyle: {
//             backgroundColor: theme.colors.card,
//           },
//           headerTintColor: theme.colors.text.primary,
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//           headerRight: () => (
//             <TouchableOpacity 
//               onPress={toggleTheme}
//               style={{ 
//                 marginRight: 16, 
//                 padding: 8,
//                 borderRadius: 20,
//                 backgroundColor: theme.colors.primary,
//               }}
//             >
//               <ThemeText style={{ color: '#FFFFFF', fontSize: 16 }}>
//                 {mode === 'light' ? '🌙' : '☀️'}
//               </ThemeText>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectHomeScreen from '../../features/projects/components/ProjectHomeScreen';
import { CreateProjectScreen } from '../../features/projects/components/CreateProjectScreen';
import { ProjectDetailScreen } from '../../features/projects/components/ProjectDetailScreen';

const Stack = createNativeStackNavigator();

export default function ProjectStackNavigator() {
  return (
    <Stack.Navigator>
      {/* Project Home - No header (main tab view) */}
      <Stack.Screen 
        name="ProjectHome" 
        component={ProjectHomeScreen}
        options={{ headerShown: false }}
      />
      
      {/* Create Project - No header (using custom header) */}
      <Stack.Screen 
        name="CreateProject" 
        component={CreateProjectScreen}
        options={{ headerShown: false }}
      />
      
      {/* Project Detail - No header (using custom header) */}
      <Stack.Screen 
        name="ProjectDetail" 
        component={ProjectDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
