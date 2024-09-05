import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { defaultTheme } from '@/theme/theme';
import { AuthContextProvider } from '@/components/AuthContext';
import { ReactQueryProvider } from '@/components/ReactQueryProvider';
import { BusinessCentralContextProvider } from '@/api/businessCentral/context/BusinessCentralContext';
import { SelectedCustomerContextProvider } from '@/components/SelectedCustomerContext';
import { StoreProvider } from '@/components/tinyBase/StoreProvider';
import { BackgroundProcessProvider } from '@/components/backgroundProcess/BackgroundProcessProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StoreProvider>
      <AuthContextProvider>
        <ReactQueryProvider>
          <BusinessCentralContextProvider>
            <BackgroundProcessProvider>
              <SelectedCustomerContextProvider>
                <PaperProvider theme={defaultTheme}>
                  <Stack
                    screenOptions={{
                      headerShown: false
                    }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </PaperProvider>
              </SelectedCustomerContextProvider>
            </BackgroundProcessProvider>
          </BusinessCentralContextProvider>
        </ReactQueryProvider>
      </AuthContextProvider>
    </StoreProvider>
  );
}

// ? theme customization information : https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v3/LightTheme.tsx
