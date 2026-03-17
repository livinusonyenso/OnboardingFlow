import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useOnboardingStore } from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, typography, spacing } from "../../theme";
import { Button, Input, StepIndicator } from "../../components/ui";
import { OnboardingStackParamList } from "../../types/navigation";

// --- Validation Schema ---
const schema = z.object({
  linkedinUrl: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val === "" ||
        /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(val),
      { message: "Please enter a valid LinkedIn profile URL" },
    ),
});

type FormData = z.infer<typeof schema>;

// --- Navigation Type ---
type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "StepTwo"
>;

// --- Component ---
export default function StepTwoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [connectingLinkedIn, setConnectingLinkedIn] = useState(false);
  const { setLinkedinUrl, setLinkedinConnected, setCurrentStep } =
    useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { linkedinUrl: "" },
  });

  const handleLinkedInConnect = async () => {
    setConnectingLinkedIn(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLinkedinConnected(true);
      setCurrentStep(3);
      navigation.navigate("Progress");
    } finally {
      setConnectingLinkedIn(false);
    }
  };

  const onSubmit = (data: FormData) => {
    if (data.linkedinUrl) {
      setLinkedinUrl(data.linkedinUrl);
    }
    setCurrentStep(3);
    navigation.navigate("Progress");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Step Indicator */}
          <StepIndicator currentStep={2} totalSteps={3} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              Speed up your application
            </Text>
          </View>

        {/* Info Banner */}
<View style={styles.infoBanner}>
  <Ionicons
    name="information-circle"
    size={20}
    color={colors.primary}
    style={styles.infoIcon}
  />
  <Text style={styles.infoText}>
    Connecting LinkedIn auto-fills your profile data, saving you time. We only access your public information.
  </Text>
</View>

          {/* LinkedIn Connect Button */}
          <Button
            label="Connect LinkedIn"
            onPress={handleLinkedInConnect}
            loading={connectingLinkedIn}
            variant="outline"
            style={[styles.linkedinButton, styles.linkedinButtonOutline]}
            labelStyle={styles.linkedinButtonLabel}
            leftIcon={
              <Ionicons name="logo-linkedin" size={20} color="#0A66C2" />
            }
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or enter your LinkedIn URL</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Manual URL Input */}
          <Controller
            control={control}
            name="linkedinUrl"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="https://linkedin.com/in/yourname"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.linkedinUrl?.message}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={colors.grey500}
                  />
                }
              />
            )}
          />

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <Button
            label="Continue"
            onPress={handleSubmit(onSubmit)}
            style={[styles.button, styles.continueButton]}
          />

          {/* Legal Note */}
          <Text style={styles.legalText}>
            {'We work directly with LinkedIn best practices. Your account will\nnot be restricted because of us.'}

          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- Styles ---
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
    lineHeight: typography.fontSize.xxxl * 1.3,
  },
  infoBanner: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.primaryLight,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.primary,    // adds the blue border
  padding: spacing.lg,
  marginBottom: spacing.xl,
  gap: spacing.sm,
},
infoIcon: {},
infoText: {
  flex: 1,
  fontSize: typography.fontSize.sm,
  color: colors.primary,
  lineHeight: typography.fontSize.sm * 1.6,
  fontWeight: typography.fontWeight.medium,
},
  linkedinButton: {
    width: "100%",
    marginBottom: spacing.xl,
  },
  linkedinButtonOutline: {
    borderColor: "#0A66C2",
  },
  linkedinButtonLabel: {
    color: "#0A66C2",
  },
  continueButton: {
    backgroundColor: "#0A66C2",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xxxl,
  },
  button: {
    width: "100%",
    marginBottom: spacing.lg,
  },
  legalText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: typography.fontSize.xs * 1.8,
  },
});
