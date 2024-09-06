import { StyleSheet, Platform, SafeAreaView, Image } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedView } from '@/components/ThemedView';
import { Button, Text } from 'react-native-paper';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { useNavigation } from 'expo-router';
import { localStore } from '@/components/tinyBase/StoreProvider';

export default function HomeScreen() {
  const { currentUser } = useCurrentUser();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ThemedView
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          variant="headlineLarge"
          style={{
            textAlign: 'center'
          }}>{`Hi,${currentUser?.full_name} \nLets start your sales presentation`}</Text>
        <Text
          variant="bodyMedium"
          style={{
            textAlign: 'center'
          }}>{`Choose between new customer or existing customer`}</Text>
        <StyledButton
          onPress={() => {
            navigation.navigate('existing-customer' as never);
          }}
          style={{
            marginTop: 20
          }}>
          Existing Customer
        </StyledButton>
        <Text
          variant="bodyLarge"
          style={{
            marginVertical: 10
          }}>
          Or
        </Text>
        <StyledButton>New Customer</StyledButton>
        <StyledButton
          onPress={() => {
            localStore.delTables();
          }}
          style={{
            marginTop: 30
          }}>
          Delete Tables
        </StyledButton>
      </ThemedView>
    </SafeAreaView>
  );
}

const StyledButton = ({ style, ...props }: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      mode="contained"
      {...props}
      style={[
        {
          minWidth: '40%'
        },
        style
      ]}>
      {props.children}
    </Button>
  );
};
