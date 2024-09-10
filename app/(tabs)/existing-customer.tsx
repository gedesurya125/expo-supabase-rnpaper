import React, { useMemo } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useSelectedCustomerContext } from '@/components/SelectedCustomerContext';

import { BcCustomer } from '@/api/businessCentral/types/customer';
import { ThemedView } from '@/components/ThemedView';
import { Divider, Icon, Text, useTheme } from 'react-native-paper';
import { TextInput } from '@/components';
import { BC_CUSTOMER_TABLE } from '@/components/tinyBase/businessCentralDatabaseSchema';
import { useTable } from 'tinybase/ui-react';

// =========== Main COmponent ===========

export default function ExistingCustomer() {
  return (
    <ThemedView
      style={{
        flex: 1,
        paddingHorizontal: 20
      }}>
      <CustomerList />
    </ThemedView>
  );
}

const CustomerList = () => {
  const [searchInput, setSearchInput] = React.useState('');

  const localCustomerData = useTable(BC_CUSTOMER_TABLE.name);
  const preparedDataForDisplay = useMemo(
    () => Object.entries(localCustomerData).map(([_key, value]) => value as BcCustomer),
    [localCustomerData]
  );

  const displayedData = preparedDataForDisplay.filter((data) =>
    data.displayName.includes(searchInput)
  );
  return (
    <>
      <SearchBar setSearch={setSearchInput} searchInput={searchInput} />
      <FlatList
        data={displayedData}
        renderItem={({ item }) => <CustomerItem item={item} />}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={Divider}
        style={{
          flex: 1
        }}
      />
    </>
  );
};

export const CustomerItem = ({ item }: { item: BcCustomer }) => {
  const navigation = useNavigation();
  const { handleSetCustomerInfo } = useSelectedCustomerContext();

  return (
    <ThemedView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20
      }}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          handleSetCustomerInfo(item);
          navigation.navigate('catalogue' as never);
        }}>
        <ThemedView>
          <Text variant="headlineSmall">{item.displayName}</Text>
          <Text>{item.email}</Text>
        </ThemedView>
      </Pressable>
      <Link
        href={{
          pathname: '/(modal)/customer-detail', //? link to the modal is not exist yet
          params: {
            id: item.id
          }
        }}
        asChild>
        <Pressable>
          <Icon source="information-outline" size={20} />
        </Pressable>
      </Link>
    </ThemedView>
  );
};

const SearchBar = ({ setSearch, searchInput }: { setSearch: any; searchInput: string }) => {
  return <ListSearchBar currentValue={searchInput} setValue={setSearch} />;
};

export const ListSearchBar = ({
  currentValue,
  setValue
}: {
  currentValue: any;
  setValue: (value: any) => any;
}) => {
  const theme = useTheme();

  return (
    <ThemedView
      style={{
        justifyContent: 'center'
      }}>
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.colors.onBackground}
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 15
        }}
      />
      <TextInput
        placeholder="search..."
        value={currentValue}
        onChangeText={(value) => {
          setValue(value);
        }}
        style={{
          paddingLeft: 30
        }}
      />
    </ThemedView>
  );
};
