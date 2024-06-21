import React from "react";

import { TextInput as RnpTextInput } from "react-native-paper";

export const TextInput = ({
  style,
  ...props
}: React.ComponentProps<typeof RnpTextInput>) => {
  return (
    <RnpTextInput
      {...props}
      mode="outlined"
      style={[
        {
          minWidth: "40%",
          //
        },
        style,
      ]}
    />
  );
};
