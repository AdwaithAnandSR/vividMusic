import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TrackController from "../components/TrackController.jsx";
import Navbar from "../components/Navbar.jsx";
<<<<<<< HEAD

=======
>>>>>>> 199009bc643648195bfbd5e76044980ea5f5bcfe
import { ThemeProvider } from "../context/theme.context.js";
import { ListProvider } from "../context/list.context.js";
import { TrackProvider } from "../context/track.context.js";

const _layout = () => {
  return (
    <ThemeProvider>
      <ListProvider>
        <TrackProvider>
          <SafeAreaView
            style={{ width: "100%", height: "100%", backgroundColor: "black" }}
          >
<<<<<<< HEAD
            
=======
            <Navbar />
>>>>>>> 199009bc643648195bfbd5e76044980ea5f5bcfe
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="home" />
              <Stack.Screen name="others/Search" />
            </Stack>
            <TrackController />
          </SafeAreaView>
        </TrackProvider>
      </ListProvider>
    </ThemeProvider>
  );
};

export default _layout;