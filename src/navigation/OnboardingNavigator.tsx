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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="StepOne" component={StepOneScreen} />
      <Stack.Screen name="StepTwo" component={StepTwoScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
}