import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../features/home/components/HomeScreen';
import ReportDetailScreen from '../../features/home/components/ReportDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      {/* HomeMain - no header (custom header inside HomeScreen) */}
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      
      {/* ReportDetail - no header (custom header inside ReportDetailScreen) */}
      <Stack.Screen 
        name="ReportDetail" 
        component={ReportDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;