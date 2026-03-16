import { create } from 'zustand';

// --- Types ---
interface OnboardingState {
  // Step 1 Data
  email: string;

  // Step 2 Data
  linkedinUrl: string;
  linkedinConnected: boolean;

  // Flow State
  currentStep: number;
  isComplete: boolean;

  // Actions
  setEmail: (email: string) => void;
  setLinkedinUrl: (url: string) => void;
  setLinkedinConnected: (connected: boolean) => void;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

// --- Initial State ---
const initialState = {
  email: '',
  linkedinUrl: '',
  linkedinConnected: false,
  currentStep: 1,
  isComplete: false,
};

// --- Store ---
export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setEmail: (email) => set({ email }),

  setLinkedinUrl: (linkedinUrl) => set({ linkedinUrl }),

  setLinkedinConnected: (linkedinConnected) => set({ linkedinConnected }),

  setCurrentStep: (currentStep) => set({ currentStep }),

  completeOnboarding: () => set({ isComplete: true, currentStep: 3 }),

  resetOnboarding: () => set(initialState),
}));