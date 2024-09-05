import React, { useEffect, useState } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { fetchBc } from '@/api/businessCentral/fetchBc';
import { fetchBcToken } from '@/api/businessCentral/fetchBcToken';
import { CustomerFetchResponse } from '@/api/businessCentral/useBcCustomers';
import { useAddRowCallback } from 'tinybase/ui-react';
import { BUSINESS_CENTRAL_DATABASE, store } from '../tinyBase/StoreProvider';

interface BackgroundProcessProviderProps {
  children: React.ReactNode;
}

const BACKGROUND_PROCESS_TASKS = {
  fetchBc: 'fetch_bc'
};

// ? Defining the task
TaskManager.defineTask(BACKGROUND_PROCESS_TASKS.fetchBc, async () => {
  const bcToken = await fetchBcToken();
  console.log('this is the bcToken in the background process...', bcToken);
  store.setRow(BUSINESS_CENTRAL_DATABASE.tables.tokens.name, 'main_token', {
    [BUSINESS_CENTRAL_DATABASE.tables.tokens.rows.token.name]: bcToken.access_token
  });

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

//? Registration functions
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_PROCESS_TASKS.fetchBc, {
    minimumInterval: 60 * 1 //15 minutes interval,
  });
}

//? Unregister the functions
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_PROCESS_TASKS.fetchBc);
}

// ? Main component
export const BackgroundProcessProvider = ({ children }: BackgroundProcessProviderProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const statusOfBackgroundFetch = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_PROCESS_TASKS.fetchBc);
    setStatus(statusOfBackgroundFetch);
    setIsRegistered(isRegistered);
  };

  if (!isRegistered) {
    registerBackgroundFetchAsync().then(() => {
      checkStatusAsync();
    });
  }

  console.log('Background Fetch Statuses', { isRegistered, status });

  return children;
};
