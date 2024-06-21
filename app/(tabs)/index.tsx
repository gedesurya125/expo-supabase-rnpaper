import { StyleSheet, Platform, SafeAreaView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={{ height: "100%" }}>
        <ThemedView style={styles.titleContainer}>
          <Text variant="displayLarge">Welcome! Surya</Text>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Text variant="titleLarge">Step 1: Try it</Text>
          <Text>
            Edit <Text variant="bodyLarge">app/(tabs)/index.tsx</Text> to see
            changes. Press{" "}
            <Text variant="bodyLarge">
              {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
            </Text>{" "}
            to open developer tools.
          </Text>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Text variant="titleLarge">Step 2: Explore</Text>
          <Text>
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </Text>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Text variant="titleLarge">Step 3: Get a fresh start</Text>
          <Text>
            When you're ready, run{" "}
            <Text variant="bodyLarge">npm run reset-project</Text> to get a
            fresh <Text variant="bodyLarge">app</Text> directory. This will move
            the current <Text variant="bodyLarge">app</Text> to{" "}
            <Text variant="bodyLarge">app-example</Text>.
          </Text>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
