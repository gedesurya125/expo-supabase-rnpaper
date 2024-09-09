import { fetchBc } from '@/api/businessCentral/fetchBc';
import { Form, Formik, useField } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { localStore } from './tinyBase/StoreProvider';
import { BC_CUSTOMER_TABLE } from './tinyBase/businessCentralDatabaseSchema';
import { BcCustomer } from '@/api/businessCentral/types/customer';

export const AddCustomerForm = () => {
  const handleCreateNewCustomer = async (value: BcCustomer) => {
    localStore.addRow(BC_CUSTOMER_TABLE.name, value);
  };

  return (
    <View style={{}}>
      <Formik
        initialValues={{
          addressLine1: '',
          addressLine2: '',
          blocked: '',
          city: '',
          country: '',
          currencyCode: 'USD',
          currencyId: '00000000-0000-0000-0000-000000000000',
          displayName: '',
          email: '',
          number: '',
          paymentMethodId: '',
          paymentTermsId: '',
          phoneNumber: '',
          postalCode: '',
          salespersonCode: '',
          shipmentMethodId: '',
          state: '',
          taxAreaId: '',
          taxRegistrationNumber: '',
          type: 'Company',
          website: '',
          isSynced: false
        }}
        onSubmit={(values: BcCustomer) => {
          console.log('this is the formik values', values);
          handleCreateNewCustomer(values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => {
          return (
            <>
              <TextInputField label="Name" name="displayName" />
              <TextInputField label="Address1" name="addressLine1" />
              <TextInputField label="Address2" name="addressLine2" />
              <TextInputField label="City" name="city" />
              <TextInputField label="State Code" name="state" />
              <TextInputField label="Country Code" name="country" />
              <TextInputField label="Postal Code" name="postalCode" />
              <TextInputField label="Phone Number" name="phoneNumber" />
              <TextInputField label="email" name="email" />

              <Button
                onPress={() => handleSubmit()}
                mode="contained"
                style={{
                  marginTop: 20
                }}>
                Submit
              </Button>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const TextInputField = ({ label, name }: { label: string; name: string }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <TextInput
      label={label}
      onChangeText={helpers.setValue}
      onBlur={() => helpers.setTouched(!meta.touched)}
      value={field.value}
    />
  );
};
