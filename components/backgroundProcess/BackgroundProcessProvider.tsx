import React, { useEffect, useState } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { fetchBcToken } from '@/api/businessCentral/fetchBcToken';
import { BUSINESS_CENTRAL_DATABASE, localStore } from '../tinyBase/StoreProvider';

interface BackgroundProcessProviderProps {
  children: React.ReactNode;
}

const BACKGROUND_PROCESS_TASKS = {
  fetchBc: 'FETCH_BC'
};

// ? Defining the task
TaskManager.defineTask(BACKGROUND_PROCESS_TASKS.fetchBc, async () => {
  try {
    const currentTime = new Date();
    console.log(
      `Background process run at: ${currentTime.toLocaleDateString()} --- ${currentTime.toLocaleTimeString()}`
    );

    const bcToken = await fetchBcToken();

    localStore.setRow(BUSINESS_CENTRAL_DATABASE.tables.tokens.name, 'main_token', {
      [BUSINESS_CENTRAL_DATABASE.tables.tokens.rows.token.name]: bcToken.access_token
    });

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.log('error in defining the background task', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

//? Registration functions
async function registerBackgroundFetchAsync() {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_PROCESS_TASKS.fetchBc, {
    minimumInterval: 10 //15 minutes interval,
  });
  await BackgroundFetch.setMinimumIntervalAsync(10); //? source we need adding this https://github.com/expo/expo/issues/3582#issuecomment-480924126
}

//? Unregister the functions
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_PROCESS_TASKS.fetchBc);
}

// ? Main component
export const BackgroundProcessProvider = ({ children }: BackgroundProcessProviderProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  const [registeredTasks, setRegisteredTasks] = useState<TaskManager.TaskManagerTask[] | null>(
    null
  );

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const statusOfBackgroundFetch = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_PROCESS_TASKS.fetchBc);
    const registeredTask = await TaskManager.getRegisteredTasksAsync();
    setStatus(statusOfBackgroundFetch);
    setIsRegistered(isRegistered);
    setRegisteredTasks(registeredTask);
  };

  useEffect(() => {
    if (!isRegistered) {
      registerBackgroundFetchAsync().then(() => {
        checkStatusAsync();

        localStore.addRow('LOG', { message: 'log after the background process is registered' });
      });
    }
  }, [isRegistered]);

  console.log('Background Fetch Statuses', {
    isRegistered,
    status,
    registeredTasks: registeredTasks
  });

  return children;
};
