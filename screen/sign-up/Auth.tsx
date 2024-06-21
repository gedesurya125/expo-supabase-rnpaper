/* eslint-disable import/order */
import React, { useState } from "react";
import { useSession } from "@/components/AuthContext";
import { TextInput } from "@/components/TextInput";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native-paper";

interface AuthProps extends React.ComponentProps<typeof ThemedView> {
  hideSignInButton?: boolean;
  hideSignUpButton?: boolean;
}

export default function Auth({
  hideSignInButton,
  hideSignUpButton,
  ...props
}: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signInWithEmail, signUpWithEmail, loading } = useSession();

  const isButtonDisabled =
    loading || password !== confirmPassword || !confirmPassword || !email;

  return (
    <ThemedView {...props}>
      <EmailInput value={email} setValue={setEmail} />
      <PasswordInput value={password} setValue={setPassword} />
      <PasswordInput
        value={confirmPassword}
        setValue={setConfirmPassword}
        placeholder="Confirm Password"
      />
      {!hideSignInButton && (
        <Button
          mode="contained"
          disabled={loading}
          onPress={() => signInWithEmail({ email, password })}
        >
          Sign In
        </Button>
      )}
      {!hideSignUpButton && (
        <Button
          mode="contained"
          disabled={isButtonDisabled}
          onPress={() => signUpWithEmail({ email, password })}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      )}
    </ThemedView>
  );
}

const EmailInput = ({ value, setValue }: { value: string; setValue: any }) => {
  return (
    <TextInput
      autoCapitalize="none"
      placeholder="email@address.com"
      value={value}
      onChangeText={(text) => {
        setValue(text);
      }}
    />
  );
};

const PasswordInput = ({
  value,
  setValue,
  placeholder = "Password",
}: {
  value: string;
  setValue: any;
  placeholder?: string;
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setValue(text);
      }}
      secureTextEntry
    />
  );
};
