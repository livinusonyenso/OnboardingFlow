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
import { Button, StepIndicator } from '../../components/ui';
import { OnboardingStackParamList } from '../../types/navigation';

// ─── Navigation Type ─────────────────────────────────────────────────────────
type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'Success'
>;

// ─── Component ───────────────────────────────────────────────────────────────
export default function SuccessScreen() {
  const navigation = useNavigation<NavigationProp>();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Fade in screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // 2. Pop in checkmark circle
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
      delay: 200,
    }).start();

    // 3. Draw checkmark
    Animated.timing(checkAnim, {
      toValue: 1,
      duration: 400,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // 4. Fade in text content
    Animated.timing(contentFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 700,
      useNativeDriver: true,
    }).start();

    // 5. Fade in button
    Animated.timing(buttonFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSeeJobs = () => {
    // In real app: navigate to main app stack
    console.log('Navigate to jobs screen');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>


        {/* Main Content */}
        <View style={styles.content}>

          {/* Checkmark Circle */}
          <Animated.View
            style={[
              styles.checkCircleWrapper,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <View style={styles.checkCircleOuter}>
              <View style={styles.checkCircleInner}>
                <Animated.Text
                  style={[styles.checkmark, { opacity: checkAnim }]}
                >
                  ✓
                </Animated.Text>
              </View>
            </View>
          </Animated.View>

          {/* Text Content */}
          <Animated.View
            style={[styles.textContent, { opacity: contentFadeAnim }]}
          >
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subtitle}>
              Your profile is ready. Let's find your next opportunity!
            </Text>
          </Animated.View>

         
        </View>

        {/* CTA Button */}
        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonFadeAnim }]}
        >
          <Button
            label="See jobs matched to you"
            onPress={handleSeeJobs}
            style={styles.button}
          />
        </Animated.View>

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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  checkCircleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 36,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  textContent: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.md * 1.6,
    paddingHorizontal: spacing.lg,
  },
  featuresList: {
    width: '100%',
    backgroundColor: colors.grey100,
    borderRadius: 16,
    padding: spacing.xl,
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  buttonWrapper: {
    paddingBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});