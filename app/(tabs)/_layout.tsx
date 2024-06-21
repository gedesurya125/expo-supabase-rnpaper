import React from "react";

import { Appbar, Drawer as RnpDrawer } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { DrawerHeaderProps } from "@react-navigation/drawer";

export default function TabLayout() {
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
