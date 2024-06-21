import React from "react";
// @ts-ignore
import SmoothPinCodeInput from "@zfloc/react-native-smooth-pincode-input";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
// import { View, useTheme, Text } from 'tamagui';

export const PinCodeInput = ({
  value,
  onFulFill,
  onTextChange,
  errorText,
  mask,
}: {
  value: any;
  onFulFill?: (value: string) => void;
  onTextChange: (value: string) => void;
  errorText?: string;
  mask?: string;
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <SmoothPinCodeInput
        password
        mask={mask}
        codeLength={6}
        cellSize={50}
        cellStyle={{
          borderWidth: 2,
          borderColor: theme.colors.primary,
        }}
        cellStyleFocused={{
          borderColor: theme.colors.secondary,
        }}
        textStyle={{
          fontSize: 24,
          color: theme.colors.onBackground,
        }}
        textStyleFocused={{}}
        value={value}
        onTextChange={onTextChange}
        onFulfill={onFulFill}
      />
      {errorText && <Text>{errorText}</Text>}
    </View>
  );
};
