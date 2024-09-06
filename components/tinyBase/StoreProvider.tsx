import React from 'react';
import { createStore, Row } from 'tinybase/store';
import { Provider } from 'tinybase/ui-react';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { useTinyBaseDevTools } from '@dev-plugins/tinybase';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { BUSINESS_CENTRAL_DATABASE } from './businessCentralDatabaseSchema';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const localStore = createStore();

const db = SQLite.openDatabaseSync(BUSINESS_CENTRAL_DATABASE.name); //TODO: check if it's works without .db after the name

const persister = createExpoSqlitePersister(localStore, db);
persister.load().then(persister.startAutoSave);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  useTinyBaseDevTools(localStore);
  useDrizzleStudio(db);

  return <Provider store={localStore}>{children}</Provider>;
};
