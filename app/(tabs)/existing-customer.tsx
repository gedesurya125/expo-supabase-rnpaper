import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useSelectedCustomerContext } from '@/components/SelectedCustomerContext';

import { usePaginatedBcCustomers } from '@/api/businessCentral/useBcCustomers';
import { BcCustomer } from '@/api/businessCentral/types/customer';
import { ThemedView } from '@/components/ThemedView';
import { Divider, Icon, Text, useTheme } from 'react-native-paper';
import { TextInput } from '@/components';

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

  const searchQuery = searchInput ? `&$filter=contains(displayName,'${searchInput}')` : '';

  const {
    data: customers,
    fetchNextPage: fetchNextBcCustomers,
    isLoading
  } = usePaginatedBcCustomers(searchQuery);

  const hasData = customers?.pages && customers?.pages.length > 0;

  const dataToDisplay = hasData
    ? customers?.pages?.reduce<BcCustomer[]>((acc, cur) => {
        return [...acc, ...(cur?.value || [])];
      }, [])
    : [];

  return (
    <>
      <SearchBar setSearch={setSearchInput} />
      {!hasData && <Text>{JSON.stringify(customers?.pages[0], null, 2)}</Text>}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={dataToDisplay}
          renderItem={({ item }) => <CustomerItem item={item} />}
          keyExtractor={(item, index) => `${index}`}
          ItemSeparatorComponent={Divider}
          // ? how to make the search bar sticky, source: https://stackoverflow.com/questions/44638286/how-do-you-make-the-listheadercomponent-of-a-react-native-flatlist-sticky
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            fetchNextBcCustomers();
          }}
          style={{
            flex: 1
          }}
        />
      )}
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

const SearchBar = ({ setSearch }: { setSearch: any }) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(value);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return <ListSearchBar currentValue={value} setValue={setValue} />;
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
