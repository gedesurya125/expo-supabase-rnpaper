import React from 'react';
import { Platform } from 'react-native';
import { createStore, Store } from 'tinybase/store';
import { Provider, useCreatePersister, useCreateStore } from 'tinybase/ui-react';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import * as SQLite from 'expo-sqlite';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const store = useCreateStore(createStore);
  useAndStartPersister(store);

  return <Provider store={store}>{children}</Provider>;
};

const useAndStartPersister = (store: Store) => {
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  return useCreatePersister(
    store,
    (store) =>
      Platform.OS === 'web'
        ? createLocalPersister(store, BUSINESS_CENTRAL_DATABASE.name)
        : createExpoSqlitePersister(store, SQLite.openDatabaseSync(BUSINESS_CENTRAL_DATABASE.name)),
    [],
    async (persister) => {
      persister.load().then(persister.startAutoSave);
    }
  );
};

export const BUSINESS_CENTRAL_DATABASE = {
  name: 'business_central',
  customerTable: {
    name: 'customer',
    idCell: { name: 'id' },
    nameCell: { name: 'name' }
  }
};
