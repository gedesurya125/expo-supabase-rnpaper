import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

export const AddCustomerForm = () => {
  return (
    <View style={{}}>
      {/* Form missing company */}
      <TextInput label="Name" />
      <TextInput label="Address1" />
      <TextInput label="Address2" />
      <TextInput label="City" />
      <TextInput label="State Code" />
      <TextInput label="Country Code" />
      <TextInput label="Postal Code" />
      <TextInput label="Phone Number" />
      <TextInput label="Email" />
    </View>
  );
};
