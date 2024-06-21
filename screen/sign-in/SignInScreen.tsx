import React from 'react';
// @ts-ignore
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, View } from 'react-native';
import { useSession } from '@/components/AuthContext';
import { getCurrentUser } from '@/utils/useCurrentUser';
import { PasswordInput, PinInput, PinOrPasswordInput } from './components/PinOrPasswordInput';
import { EmailInput } from './components/EmailInput';
import { Redirect } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { BioMetricVerification } from './components/BioMetricVerification';

export const SignInScreen = ({ isSessionExist }: { isSessionExist: boolean }) => {
  const [step, setStep] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pin, setPin] = React.useState(''); // currently pin can be as password
  const { signInWithEmail, session, handleInSessionLogin, inSessionLoginInfo } = useSession();

  // ? when sign in don't as user the pin
  const handleSignIn = async ({ email, password }: { email: string; password: string }) => {
    await signInWithEmail({ email, password });
    const loggedInUserData = await getCurrentUser();
    if (loggedInUserData?.pin) {
      handleInSessionLogin({ email, pin: loggedInUserData?.pin });
    }
    if (!loggedInUserData?.pin && loggedInUserData?.username) {
      setStep(3);
    }
  };

  const handleIncreaseStep = () => {
    setStep((state) => state + 1);
  };

  React.useEffect(() => {
    if (isSessionExist && session && session?.user.email && step === 1) {
      setEmail(session.user.email);
      setStep(3);
    }
  }, [session?.user.email]);

  // ?: source https://reactnative.dev/docs/keyboardavoidingview
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1
      }}>
      <ThemedView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {step === 1 && !isSessionExist && (
          <EmailInput
            value={email}
            setValue={setEmail}
            handleButtonClick={() => {
              setStep(2);
            }}
          />
        )}
        {step === 2 && !isSessionExist && (
          <PasswordInput
            password={password}
            setPassword={setPassword}
            handleLogin={handleSignIn}
            email={email}
          />
        )}
        {step === 3 && isSessionExist && (
          <BioMetricVerification handleIncreaseStep={handleIncreaseStep} />
        )}
        {step === 4 && isSessionExist && <PinInput pin={pin} setPin={setPin} email={email} />}
      </ThemedView>
    </KeyboardAvoidingView>
  );
};
