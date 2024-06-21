import React from "react";

import { PinVerification } from "./PinVerification";
import { CredentialInputProps } from "./EmailInput";
import { Button, Text } from "react-native-paper";
import { useCurrentUser } from "@/utils/useCurrentUser";
import { TextInput } from "@/components";

export const PinOrPasswordInput = ({
  value,
  setValue,
  handleButtonClick,
  email,
  isSessionExist,
  hasPin,
  password,
  setPassword,
}: CredentialInputProps) => {
  return (
    <>
      <Text variant="headlineMedium">
        {isSessionExist ? "Pin" : "Password"}
      </Text>
      {isSessionExist && (
        <PinVerification
          value={value}
          setValue={setValue}
          email={email}
          hasPin={hasPin}
        />
      )}

      {!isSessionExist && (
        <>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            testID="password-input"
            style={{
              minWidth: "80%",
            }}
          />
          <Button
            onPress={() => {
              handleButtonClick({ email, password });
            }}
          >
            Proceed Login
          </Button>
        </>
      )}
    </>
  );
};

export const PinInput = ({
  pin,
  setPin,
  email,
}: {
  pin: string;
  setPin: any;
  email: string;
}) => {
  const { hasPin, loading } = useCurrentUser();

  return (
    <InputWrapper headline="Pin">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <PinVerification
          value={pin}
          setValue={setPin}
          email={email}
          hasPin={hasPin}
        />
      )}
    </InputWrapper>
  );
};

export const PasswordInput = ({
  password,
  setPassword,
  handleLogin,
  email,
}: {
  password: string;
  setPassword: any;
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  email: string;
}) => {
  return (
    <InputWrapper headline="Password">
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        testID="password-input"
        style={{
          marginTop: 20,
        }}
      />
      <Button
        mode="contained"
        onPress={() => {
          handleLogin({ email, password });
        }}
        style={{
          marginTop: 20,
        }}
      >
        Proceed Login
      </Button>
    </InputWrapper>
  );
};

const InputWrapper = ({
  children,
  headline,
}: {
  children: React.ReactNode;
  headline: string;
}) => {
  return (
    <>
      <Text variant="headlineLarge">{headline}</Text>
      {children}
    </>
  );
};
