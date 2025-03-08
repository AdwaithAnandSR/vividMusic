import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TrackController from "../components/TrackController.jsx";
import NavBar from '../components/Navbar.jsx'

import { ThemeProvider } from "../context/theme.context.js";
import { SocketProvider } from "../context/socket.context.js"
import { ListProvider } from "../context/list.context.js";
import { TrackProvider } from "../context/track.context.js";

const _layout = () => {
  return (
    <ThemeProvider>
      <SocketProvider>
        <ListProvider>
          <TrackProvider>
            <SafeAreaView
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
              }}
            >
               <NavBar />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="home" />
                <Stack.Screen name="others/Search" />
              </Stack>
              <TrackController />
            </SafeAreaView>
          </TrackProvider>
        </ListProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default _layout;