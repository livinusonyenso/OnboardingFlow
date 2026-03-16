import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <React.Fragment key={step}>
            {/* Step: circle + label stacked */}
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.circleCompleted,
                  isActive && styles.circleActive,
                ]}
              >
                <Text
                  style={[
                    styles.stepNumber,
                    (isActive || isCompleted) && styles.stepNumberActive,
                  ]}
                >
                  {step}
                </Text>
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  (isActive || isCompleted) && styles.stepLabelActive,
                ]}
              >
                Step {step}
              </Text>
            </View>

            {/* Connector Line between steps */}
            {step < totalSteps && (
              <View
                style={[
                  styles.line,
                  isCompleted && styles.lineCompleted,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  stepWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.grey300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  circleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepNumber: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.grey500,
  },
  stepNumberActive: {
    color: colors.white,
  },
  stepLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.grey500,
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  line: {
    width: 32,
    height: 1.5,
    backgroundColor: colors.grey300,
    marginHorizontal: spacing.xs,
    marginBottom: 20,
  },
  lineCompleted: {
    backgroundColor: colors.primary,
  },
});