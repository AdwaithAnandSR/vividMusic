import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "../context/theme.context.js";
import { ListProvider } from "../context/list.context.js";
import { TrackProvider } from "../context/track.context.js";

export default function RootLayout() {
   return (
      <ThemeProvider>
         <ListProvider>
            <TrackProvider>
               <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(tabs)" />
               </Stack>
               <StatusBar style="auto" />
            </TrackProvider>
         </ListProvider>
      </ThemeProvider>
   );
}
