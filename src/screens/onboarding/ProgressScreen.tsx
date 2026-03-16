import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, spacing } from '../../theme';
import { StepIndicator } from '../../components/ui';
import { OnboardingStackParamList } from '../../types/navigation';

// ─── Navigation Type ─────────────────────────────────────────────────────────
type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'Progress'
>;

// ─── Component ───────────────────────────────────────────────────────────────
export default function ProgressScreen() {
  const navigation = useNavigation<NavigationProp>();

  // Animation values
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;
  const scaleAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in the whole screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Diamond pulse animation — staggered
    const diamondAnimation = Animated.loop(
      Animated.stagger(150, [
        Animated.sequence([
          Animated.timing(scaleAnim1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim1, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim2, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim2, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim3, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim3, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim4, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim4, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    diamondAnimation.start();

    // Fade in text after short delay
    setTimeout(() => {
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Auto navigate to Success after 3 seconds
    const timer = setTimeout(() => {
      diamondAnimation.stop();
      navigation.navigate('Success');
    }, 3000);

    return () => {
      clearTimeout(timer);
      diamondAnimation.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        {/* Step Indicator */}
        <StepIndicator currentStep={3} totalSteps={3} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Setting up your profile</Text>
        </View>

        {/* Diamond Animation */}
        <View style={styles.diamondWrapper}>
          {/* Top Diamond */}
          <Animated.View
            style={[
              styles.diamond,
              styles.diamondTop,
              { transform: [{ scale: scaleAnim1 }] },
            ]}
          />

          {/* Middle Row */}
          <View style={styles.diamondMiddleRow}>
            <Animated.View
              style={[
                styles.diamond,
                styles.diamondLeft,
                { transform: [{ scale: scaleAnim2 }] },
              ]}
            />
            <Animated.View
              style={[
                styles.diamond,
                styles.diamondRight,
                { transform: [{ scale: scaleAnim3 }] },
              ]}
            />
          </View>

          {/* Bottom Diamond */}
          <Animated.View
            style={[
              styles.diamond,
              styles.diamondBottom,
              { transform: [{ scale: scaleAnim4 }] },
            ]}
          />
        </View>

        {/* Loading Text */}
        <Animated.Text style={[styles.loadingText, { opacity: textFadeAnim }]}>
          Gathering your information...
        </Animated.Text>

      </Animated.View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
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
  diamondWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xxxxl,
  },
  diamondMiddleRow: {
    flexDirection: 'row',
    gap: 4,
  },
  diamond: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  diamondTop: {
    marginBottom: 4,
  },
  diamondLeft: {
    marginRight: 2,
  },
  diamondRight: {
    marginLeft: 2,
  },
  diamondBottom: {
    marginTop: 4,
  },
  loadingText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxxxl,
  },
});