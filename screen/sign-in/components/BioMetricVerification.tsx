import { useSession } from '@/components/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { useBiometricVerification } from '@/hooks/useBiometricVerification';
import { getCurrentUser } from '@/utils/useCurrentUser';
import React from 'react';
import { Button, Text } from 'react-native-paper';

export const BioMetricVerification = ({
  handleIncreaseStep
}: {
  handleIncreaseStep: () => void;
}) => {
  const { authenticate, loading, biometricSupports, hasBeenOpened } = useBiometricVerification();
  const { handleInSessionLogin, session, isSessionExist } = useSession();

  const openBiometricAuthentication = async () => {
    const response = await authenticate();
    if (response.isAuthenticated) {
      const currentUser = await getCurrentUser();
      alert('Authenticated');
      if (isSessionExist && session?.user?.email && currentUser?.pin) {
        handleInSessionLogin({ email: session?.user?.email, pin: currentUser?.pin?.toString() });
      }
    }
    if (!response.isAuthenticated) {
      alert('Authentication Failed use app pin instead');
      handleIncreaseStep();
    }
  };

  console.log('this is the biometric support', biometricSupports);

  React.useEffect(() => {
    if (!loading) {
      if (!biometricSupports || biometricSupports?.length === 0) {
        handleIncreaseStep();
      } else {
        if (!hasBeenOpened) {
          openBiometricAuthentication();
        }
      }
    }
  }, [loading, biometricSupports, handleIncreaseStep, hasBeenOpened]);

  return (
    <ThemedView>
      <Text>BioMetricVerification</Text>
      <Button mode="contained" onPress={openBiometricAuthentication} style={{ marginTop: 20 }}>
        Authenticate
      </Button>
    </ThemedView>
  );
};
