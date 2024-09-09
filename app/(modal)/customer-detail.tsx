import { ThemedView } from '@/components/ThemedView';
import { BC_CUSTOMER_TABLE } from '@/components/tinyBase/businessCentralDatabaseSchema';
import { Href, Link, router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View, ViewStyle } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRow } from 'tinybase/ui-react';

export default function CustomerDetailModal() {
  const isPresented = router.canGoBack();
  const params = useLocalSearchParams();

  const customerId = params?.id as string;

  // const customerDetail = localStore.getRow(BC_CUSTOMER_TABLE.name, customerId) as BcCustomer;
  const customerDetail = useRow(BC_CUSTOMER_TABLE.name, customerId);

  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
      <Text style={{}}>Customer Detail</Text>

      <ScrollView
        style={{
          marginTop: 20
        }}>
        {Object.entries(customerDetail).map(([key, value], index) => {
          return <LabelAndValue key={index} label={key} value={value.toString()} />;
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        <NavigationLink
          href={{
            pathname: '/(modal)/customer-edit',
            params: {
              id: customerId
            }
          }}>
          Update
        </NavigationLink>
        {isPresented && (
          <NavigationLink
            href="../"
            style={{
              marginLeft: 20
            }}>
            Go Back
          </NavigationLink>
        )}
      </View>
    </ThemedView>
  );
}

const LabelAndValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10
      }}>
      <Text>{label} : </Text>
      <Text>{value}</Text>
    </View>
  );
};

const NavigationLink = ({
  href,
  children,
  style
}: {
  href: Href;
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <Link href={href} asChild>
      <Button mode="contained" style={style}>
        {children}
      </Button>
    </Link>
  );
};
