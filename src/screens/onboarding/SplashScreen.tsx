import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
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

  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;
  const scaleAnim4 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const diamondAnimation = Animated.loop(
      Animated.stagger(150, [
        Animated.sequence([
          Animated.timing(scaleAnim1, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(scaleAnim1, { toValue: 0.7, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim2, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(scaleAnim2, { toValue: 0.7, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim3, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(scaleAnim3, { toValue: 0.7, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim4, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(scaleAnim4, { toValue: 0.7, duration: 400, useNativeDriver: true }),
        ]),
      ])
    );

    diamondAnimation.start();

    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 600,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      diamondAnimation.stop();
      navigation.replace('StepOne');
    }, 2800);

    return () => {
      clearTimeout(timer);
      diamondAnimation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
        {/* Diamond Animation */}
        <View style={styles.diamondWrapper}>
          <Animated.View
            style={[styles.diamond, styles.diamondTop, { transform: [{ scale: scaleAnim1 }] }]}
          />
          <View style={styles.diamondMiddleRow}>
            <Animated.View
              style={[styles.diamond, styles.diamondLeft, { transform: [{ scale: scaleAnim2 }] }]}
            />
            <Animated.View
              style={[styles.diamond, styles.diamondRight, { transform: [{ scale: scaleAnim3 }] }]}
            />
          </View>
          <Animated.View
            style={[styles.diamond, styles.diamondBottom, { transform: [{ scale: scaleAnim4 }] }]}
          />
        </View>

        {/* App Name */}
        <Animated.View style={[styles.textBlock, { opacity: textFadeAnim }]}>
          <Text style={styles.appName}>OnboardingFlow</Text>
          <Text style={styles.tagline}>Your career starts here</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    gap: spacing.xxxxl,
  },
  diamondWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamondMiddleRow: {
    flexDirection: 'row',
    gap: 4,
  },
  diamond: {
    width: 36,
    height: 36,
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
