import React from "react";
import { useNavigation } from "expo-router";
// import { H3 } from 'tamagui';
import { useSession } from "@/components/AuthContext";
// import { StyledButton } from '~/components/StyledButton';
import { supabase } from "@/utils/supabase";
// import { useCurrentUser } from '~/utils/useCurrentUser';
import { PinCodeInput } from "./PinCodeInput";
import { useCurrentUser } from "@/utils/useCurrentUser";
import { Button, Text } from "react-native-paper";

// Reused components
export const PinVerification = ({
  value,
  setValue,
  email,
  hasPin,
}: {
  value: string;
  setValue: any;
  email: string;
  hasPin: boolean;
}) => {
  const { handleInSessionLogin, session } = useSession();
  const navigation = useNavigation();

  const { currentUser } = useCurrentUser();
  const [error, setError] = React.useState("");

  const updateUserPin = async (pin: string) => {
    const updates = {
      id: session?.user.id,
      username: currentUser?.username,
      full_name: currentUser?.full_name,
      website: currentUser?.website,
      avatar_url: currentUser?.avatar_url,
      pin,
      updated_at: new Date(),
    };
    try {
      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        throw error;
      } else {
        handleInSessionLogin({ email, pin });
        navigation.navigate("(drawer)" as never);
      }
    } catch (err) {
      console.log("error update pin", err);
    }
  };

  return hasPin ? (
    <PinCodeInput
      value={value}
      onTextChange={(value) => setValue(value)}
      onFulFill={(value) => {
        if (currentUser?.pin.toString() === value) {
          handleInSessionLogin({ email, pin: value });
        } else {
          setError("Pin is not match");
        }
      }}
      errorText={error}
      mask="⭑"
    />
  ) : (
    <>
      <Text>Create New</Text>
      <PinCodeInput
        value={value}
        onTextChange={(value) => setValue(value)}
        errorText={error}
      />
      <Button onPress={async () => await updateUserPin(value)}>
        Confirm Pin
      </Button>
    </>
  );
};
