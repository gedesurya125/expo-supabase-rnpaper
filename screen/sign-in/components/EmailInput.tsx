import React from "react";
import { useNavigation } from "expo-router";
import { useSession } from "@/components/AuthContext";
import { useCurrentUser } from "@/utils/useCurrentUser";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { TextInput } from "@/components";

// todo fix the login input props
interface LoginInputProps {
  value: any;
  setValue: any;
  handleButtonClick: any;
}
export const EmailInput = ({
  value,
  setValue,
  handleButtonClick,
}: LoginInputProps) => {
  const navigation = useNavigation();
  const { isSessionExist, session } = useSession();
  const { currentUser } = useCurrentUser();

  const isEmailMatch = isSessionExist && session?.user.email === value;
  const isButtonDisabled = isSessionExist ? !isEmailMatch : false;

  const welcomeMessage =
    isSessionExist && currentUser?.full_name
      ? `Hi ${currentUser?.full_name}, welcome back!!`
      : "Hi, welcome to Ambratect app";

  return (
    <View>
      <Text variant="headlineSmall">{welcomeMessage}</Text>
      <TextInput
        mode="outlined"
        autoCapitalize="none"
        placeholder="john@emai.com"
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        testID="email-input"
        style={{
          marginTop: 20,
          minWidth: "40%",
        }}
      />
      <Button
        mode="contained"
        onPress={handleButtonClick}
        disabled={isButtonDisabled}
        testID="login-button"
        style={{
          marginTop: 20,
        }}
      >
        Login
      </Button>
      {!isSessionExist && (
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("sign-up" as never);
          }}
          style={{
            marginTop: 20,
          }}
        >
          Sign Up
        </Button>
      )}
    </View>
  );
};
export interface CredentialInputProps {
  value: any;
  setValue: any;
  handleButtonClick: any;
  email: string;
  isSessionExist: boolean;
  hasPin: boolean;
  password: string;
  setPassword: any;
}
