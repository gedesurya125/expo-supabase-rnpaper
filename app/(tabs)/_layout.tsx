import React from "react";

import { Appbar, Drawer as RnpDrawer } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useSession } from "@/components/AuthContext";
import { Redirect } from "expo-router";

export default function TabLayout() {
  const { session, inSessionLoginInfo } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session || !inSessionLoginInfo.email || !inSessionLoginInfo.pin) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={({ navigation }) => {
          const state = navigation.getState();

          return (
            <ThemedView style={{ flex: 1 }}>
              <SafeAreaView>
                <RnpDrawer.Section title="Main Menu">
                  <RnpDrawer.Item
                    label="Index"
                    active={state.index === 0}
                    onPress={() => {
                      navigation.navigate("index");
                    }}
                  />
                  <RnpDrawer.Item
                    label="Explore"
                    active={state.index === 1}
                    onPress={() => {
                      navigation.navigate("explore");
                    }}
                  />
                </RnpDrawer.Section>
              </SafeAreaView>
            </ThemedView>
          );
        }}
        screenOptions={{
          header: HeaderBar,
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="explore" />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const HeaderBar = ({ navigation }: DrawerHeaderProps) => {
  const canGoBack = navigation.canGoBack();

  const _handleSearch = () => console.log("Searching");

  return (
    <Appbar.Header>
      {canGoBack && (
        <Appbar.BackAction
          size={20}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Appbar.Action
        icon={"menu"}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Appbar.Content title="Title" />
      <Appbar.Action icon="license" onPress={_handleSearch} />
      <Appbar.Action icon="cart-outline" onPress={_handleSearch} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
    </Appbar.Header>
  );
};

// ? icon source https://pictogrammers.com/library/mdi/
