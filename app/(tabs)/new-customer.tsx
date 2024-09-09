import { CustomerForm } from '@/components/CustomerForm';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Text } from 'react-native-paper';

export default function NewCustomer() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1
      }}>
      <ThemedView
        style={{
          height: '100%',
          paddingHorizontal: 20
        }}>
        <ScrollView>
          <Text variant="headlineSmall">Add New Customer</Text>
          <Divider />
          <CustomerForm />
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
