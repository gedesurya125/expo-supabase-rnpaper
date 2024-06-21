import React from "react";

import { Appbar, Button, Drawer as RnpDrawer } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useSession } from "@/components/AuthContext";
import { Redirect } from "expo-router";

// TODO: RENAME THE TAB TO BE DRAWER LATER

const routes = [
  {
    label: "Home",
    name: "index",
  },
  { label: "Explore", name: "explore" },
];

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
                  {routes.map((data, index) => {
                    return (
                      <RnpDrawer.Item
                        key={index}
                        label={data?.label}
                        active={state.index === index}
                        onPress={() => {
                          navigation.navigate(data?.name);
                        }}
                      />
                    );
                  })}
                </RnpDrawer.Section>
              </SafeAreaView>
            </ThemedView>
          );
        }}
        screenOptions={{
          header: HeaderBar,
        }}
      >
        {routes.map((data, index) => {
          return (
            <Drawer.Screen
              key={index}
              name={data?.name}
              options={{
                drawerLabel: data?.label,
              }}
            />
          );
        })}
      </Drawer>
    </GestureHandlerRootView>
  );
}

const HeaderBar = ({ navigation, ...props }: DrawerHeaderProps) => {
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
      <Appbar.Content
        title={props?.options?.drawerLabel as string}
        style={{
          alignItems: "flex-start",
        }}
      />
      <Appbar.Action icon="license" onPress={_handleSearch} />
      <Appbar.Action icon="cart-outline" onPress={_handleSearch} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
    </Appbar.Header>
  );
};

// ? icon source https://pictogrammers.com/library/mdi/
