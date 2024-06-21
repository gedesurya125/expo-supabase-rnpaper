import React, { useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

enum biometrics {
  FINGERPRINT = 'FINGERPRINT',
  FACE_ID = 'FACE_ID',
  UNKNOWN = 'UNKNOWN'
}

type BiometricSupport = biometrics.FINGERPRINT | biometrics.FACE_ID | biometrics.UNKNOWN;

export const useBiometricVerification = () => {
  const [biometricSupports, setBiometricSupports] = React.useState<BiometricSupport[] | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    checkHardwareAsync();
  }, []);

  const checkHardwareAsync = async () => {
    setLoading(true);
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      setBiometricSupports(null);
      return;
    }

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const supportedTypes: BiometricSupport[] = types.map((type) => {
      if (type === LocalAuthentication.AuthenticationType.FINGERPRINT) {
        return biometrics.FINGERPRINT;
      } else if (type === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) {
        return biometrics.FACE_ID;
      }
      return biometrics.UNKNOWN;
    });
    setBiometricSupports(supportedTypes);
    setLoading(false);
  };

  const authenticate = async (): Promise<{
    isAuthenticated: boolean;
    message: string;
    details?: unknown;
  }> => {
    if (loading)
      return {
        isAuthenticated: false,
        message: 'Detecting device support'
      };
    setLoading(true);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        // promptMessage: 'Authenticate with Biometrics',
        // fallbackLabel: 'Use Passcode'
      });

      setLoading(false);
      if (result.success) {
        return {
          isAuthenticated: true,
          message: 'Authenticated successfully!'
        };
      } else {
        return {
          isAuthenticated: false,
          message: 'Authentication failed. Please try again.'
        };
      }
    } catch (error) {
      setLoading(false);
      return {
        isAuthenticated: false,
        message: 'An error occurred while trying to authenticate. Please try again.',
        details: error
      };
    }
  };

  return {
    biometricSupports,
    loading,
    authenticate
  };
};
