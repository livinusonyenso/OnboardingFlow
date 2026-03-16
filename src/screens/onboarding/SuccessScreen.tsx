import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../store';

import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/ui';

// --- Component ---
export default function SuccessScreen() {
  const { email, linkedinConnected, completeOnboarding } = useOnboardingStore();

  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(contentFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSeeJobs = () => {
    completeOnboarding();
    // Temporary - remove after testing
    console.log('Store state:', { email, linkedinConnected });
    // In real app: navigation.replace('MainStack')
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* GIF */}
        <View style={styles.gifWrapper}>
          <Image
            source={require('../../../assets/successLoadingAnimation.gif')}
            style={styles.gif}
            contentFit="contain"
          />
        </View>

        {/* Text Content */}
        <Animated.View style={[styles.textContent, { opacity: contentFadeAnim }]}>
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>
            Your profile is ready. Let's find your next opportunity!
          </Text>
        </Animated.View>

        {/* CTA Button */}
        <Animated.View style={[styles.buttonWrapper, { opacity: buttonFadeAnim }]}>
          <Button
            label="See jobs matched to you"
            onPress={handleSeeJobs}
            style={styles.button}
          />
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  gifWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 260,
    height: 260,
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
  buttonWrapper: {
    width: '100%',
    paddingBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});
