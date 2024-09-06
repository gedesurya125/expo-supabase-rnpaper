import React from 'react';
import * as Network from 'expo-network';
import { AppState, AppStateStatus } from 'react-native';
import { runSynchronizationTask } from '../backgroundProcess/runSynchronizationTask';

interface ForegroundProcessPropsProvider {
  children: React.ReactNode;
}

export const ForegroundProcessProvider = ({ children }: ForegroundProcessPropsProvider) => {
  React.useEffect(() => {
    const syncDataWithServer = async () => {
      const networkStatus = await Network.getNetworkStateAsync();
      if (networkStatus?.isInternetReachable) {
        console.log(`Foreground synchronization: ${new Date().toLocaleString()}`);
        await runSynchronizationTask();
      }
    };

    const handleAppStateChange = (appState: AppStateStatus) => {
      if (appState === 'active') {
        syncDataWithServer();
      }
    };
    // ? Sync Immediately when the app is opened
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // ? Sync in Interval
    const syncInterval = setInterval(syncDataWithServer, 1000 * 20);

    return () => {
      appStateSubscription.remove();
      clearInterval(syncInterval);
    };
  }, []);

  return <>{children}</>;
};
