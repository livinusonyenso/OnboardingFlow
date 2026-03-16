import { useOnboardingStore } from '../store';

export const useOnboarding = () => {
  const store = useOnboardingStore();

  const hasLinkedIn = store.linkedinConnected || store.linkedinUrl !== '';

  return {
    ...store,
    hasLinkedIn,
  };
};
