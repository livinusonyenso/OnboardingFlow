import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOnboardingStore } from '../../store';

import { colors, typography, spacing } from '../../theme';
import { Button, Input, StepIndicator } from '../../components/ui';
import { OnboardingStackParamList } from '../../types/navigation';

// ─── Validation Schema ───────────────────────────────────────────────────────
const schema = z.object({
  email: z.email('Please enter a valid email'),
});

type FormData = z.infer<typeof schema>;

// ─── Email Shortcuts ─────────────────────────────────────────────────────────
const EMAIL_DOMAINS = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com'];

// ─── Navigation Type ─────────────────────────────────────────────────────────
type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'StepOne'>;

// ─── Component ───────────────────────────────────────────────────────────────
export default function StepOneScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { setEmail, setCurrentStep } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const emailValue = watch('email');

  const handleDomainPress = (domain: string) => {
    const base = emailValue.includes('@')
      ? emailValue.split('@')[0]
      : emailValue;
    setValue('email', `${base}${domain}`, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    setEmail(data.email);
    setCurrentStep(2);
    navigation.navigate('StepTwo');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Step Indicator */}
          <StepIndicator currentStep={1} totalSteps={3} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Let's get started</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Enter your email"
                  placeholder="johndoe@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={<Ionicons name="mail-outline" size={18} color={colors.grey500} />}
                />
              )}
            />

            {/* Domain Shortcuts */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.domainsScroll}
              contentContainerStyle={styles.domainsContainer}
            >
              {EMAIL_DOMAINS.map((domain) => (
                <TouchableOpacity
                  key={domain}
                  style={styles.domainChip}
                  onPress={() => handleDomainPress(domain)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.domainText}>{domain}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <Button
            label="Continue"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  form: {
    gap: spacing.sm,
  },
  domainsScroll: {
    marginTop: spacing.sm,
  },
  domainsContainer: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  domainChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  domainText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xxxxl,
  },
  button: {
    width: '100%',
  },
});
