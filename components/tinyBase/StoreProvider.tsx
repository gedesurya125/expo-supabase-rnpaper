import React from 'react';
import { createStore } from 'tinybase/store';
import { Provider, useAddRowCallback } from 'tinybase/ui-react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';

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

export const store = createStore();

const db = SQLite.openDatabaseSync(BUSINESS_CENTRAL_DATABASE.name); //TODO: check if it's works without .db after the name

const persister = createExpoSqlitePersister(store, db);
persister.load().then(persister.startAutoSave);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  useDrizzleStudio(db);
  return <Provider store={store}>{children}</Provider>;
};

//Functions

// export const useRecordToken = () =>
//   useAddRowCallback(BUSINESS_CENTRAL_DATABASE.tables.tokens.name, (token: string) => ({
//     [BUSINESS_CENTRAL_DATABASE.tables.tokens.rows.id.name]: 1,
//     [BUSINESS_CENTRAL_DATABASE.tables.tokens.rows.token.name]: token
//   }));
