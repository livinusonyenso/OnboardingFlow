import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, spacing } from '../../theme';
import { StepIndicator } from '../../components/ui';
import { OnboardingStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'Progress'
>;

export default function ProgressScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Success');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StepIndicator currentStep={3} totalSteps={3} />

        <View style={styles.header}>
          <Text style={styles.title}>Setting up your profile</Text>
        </View>

        <View style={styles.gifWrapper}>
          <Image
            source={require('../../../assets/Job_board_Loading_animation.gif')}
            style={styles.gif}
            contentFit="contain"
          />
        </View>

        <Text style={styles.loadingText}>Gathering your information...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxxxl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  gifWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  gif: {
    width: 180,
    height: 180,
  },
  loadingText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxxxl,
  },
});
