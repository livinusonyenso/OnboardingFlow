import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../types/navigation';

import SplashScreen from '../screens/onboarding/SplashScreen';
import StepOneScreen from '../screens/onboarding/StepOneScreen';
import StepTwoScreen from '../screens/onboarding/StepTwoScreen';
import ProgressScreen from '../screens/onboarding/ProgressScreen';
import SuccessScreen from '../screens/onboarding/SuccessScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="StepOne" component={StepOneScreen} />
      <Stack.Screen name="StepTwo" component={StepTwoScreen} />
      <Stack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          animation: 'fade',          // ← fade into progress
          gestureEnabled: false,       // ← no swipe back on progress
        }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{
          animation: 'fade_from_bottom', // ← slide up into success
          gestureEnabled: false,          // ← no swipe back on success
        }}
      />
    </Stack.Navigator>
  );
}