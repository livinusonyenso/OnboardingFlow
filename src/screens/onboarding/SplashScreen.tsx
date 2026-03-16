import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, typography, spacing } from '../../theme';
import { OnboardingStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'Splash'
>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('StepOne');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Job_board_Loading_animation.gif')}
        style={styles.gif}
        contentFit="contain"
      />
      <View style={styles.textBlock}>
        <Text style={styles.appName}>OnboardingFlow</Text>
        <Text style={styles.tagline}>Your career starts here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxxl,
  },
  gif: {
    width: 260,
    height: 260,
  },
  textBlock: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  appName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});
