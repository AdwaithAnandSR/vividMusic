import { Stack } from "expo-router";
import { View } from "react-native";

import TrackController from "../components/TrackController.jsx";
import Navbar from "../components/Navbar.jsx";
import { ThemeProvider } from "../context/theme.context.js";
import { ListProvider } from "../context/list.context.js";
import { TrackProvider } from "../context/track.context.js";

const _layout = () => {
  return (
    <ThemeProvider>
      <ListProvider>
        <TrackProvider>
          <View
            style={{ width: "100%", height: "100%", backgroundColor: "black" }}
          >
            <Navbar />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="home" />
            </Stack>
            <TrackController />
          </View>
        </TrackProvider>
      </ListProvider>
    </ThemeProvider>
  );
};

export default _layout;