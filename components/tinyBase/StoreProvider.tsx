import React from 'react';
import { createStore } from 'tinybase/store';
import { Provider } from 'tinybase/ui-react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { useTinyBaseDevTools } from '@dev-plugins/tinybase';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const BUSINESS_CENTRAL_DATABASE = {
  name: 'business_central',
  tables: {
    customers: {
      name: 'customer',
      rows: {
        nameCell: { name: 'name' }
      }
    },
    tokens: {
      name: 'tokens',
      rows: {
        token: { name: 'token' }
      }
    }
  }
};

export const localStore = createStore();

const db = SQLite.openDatabaseSync(BUSINESS_CENTRAL_DATABASE.name); //TODO: check if it's works without .db after the name

const persister = createExpoSqlitePersister(localStore, db);
persister.load().then(persister.startAutoSave);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  useTinyBaseDevTools(localStore);

  return <Provider store={localStore}>{children}</Provider>;
};
