// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ProjectHomeScreen from '../../features/projects/components/ProjectHomeScreen';
// import { CreateProjectScreen } from '../../features/projects/components/CreateProjectScreen';
// import { ProjectDetailScreen } from '../../features/projects/components/ProjectDetailScreen';

// const Stack = createNativeStackNavigator();

// export default function ProjectStackNavigator() {
//   return (
//     <Stack.Navigator>
//       {/* Project Home - No header (main tab view) */}
//       <Stack.Screen 
//         name="ProjectHome" 
//         component={ProjectHomeScreen}
//         options={{ headerShown: false }}
//       />
      
//       {/* Create Project - No header (using custom header) */}
//       <Stack.Screen 
//         name="CreateProject" 
//         component={CreateProjectScreen}
//         options={{ headerShown: false }}
//       />
      
//       {/* Project Detail - No header (using custom header) */}
//       <Stack.Screen 
//         name="ProjectDetail" 
//         component={ProjectDetailScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectHomeScreen from '../../features/projects/components/ProjectHomeScreen';
import { CreateProjectScreen } from '../../features/projects/components/CreateProjectScreen';
import { ProjectDetailScreen } from '../../features/projects/components/ProjectDetailScreen';
import { DietProjectDetailScreen } from '../../features/projects/components/DietProjectDetailScreen'; // ✅ ADD
import { DietDayScreen } from '../../features/projects/components/DietDayScreen'; // ✅ ADD

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
      
      {/* ✅ ADD: Diet Project Detail Screen */}
      <Stack.Screen 
        name="DietProjectDetail" 
        component={DietProjectDetailScreen}
        options={{ headerShown: false }}
      />
      
      {/* ✅ ADD: Diet Day Screen (for meal selection) */}
      <Stack.Screen 
        name="DietDay" 
        component={DietDayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}