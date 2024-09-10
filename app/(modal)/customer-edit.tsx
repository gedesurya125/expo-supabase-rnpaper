import { BcCustomer } from '@/api/businessCentral/types/customer';
import { CustomerForm } from '@/components/CustomerForm';
import { ThemedView } from '@/components/ThemedView';
import { BC_CUSTOMER_TABLE } from '@/components/tinyBase/businessCentralDatabaseSchema';
import { localStore } from '@/components/tinyBase/StoreProvider';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

export default function CustomerEdit() {
  const isPresented = router.canGoBack();

  const params = useLocalSearchParams();

  const customerId = params?.id as string;

  const customerData = localStore.getRow(BC_CUSTOMER_TABLE.name, customerId) as BcCustomer;
  const handleCreateNewCustomer = async (value: BcCustomer) => {
    localStore.setRow(BC_CUSTOMER_TABLE.name, value.id!, value);
    if (isPresented) router.back();
  };

  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
      <Text style={{}}>Customer Edit</Text>
      <ScrollView
        style={{
          marginTop: 20
        }}>
        <CustomerForm
          submitButtonText="Update"
          handleSubmit={handleCreateNewCustomer}
          initialValue={{ ...customerData, isSynced: false }}
          showBackButton={isPresented}
        />
      </ScrollView>
    </ThemedView>
  );
}
