import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "../context/theme.context.js";

export default function RootLayout() {
   return (
      <ThemeProvider>
         <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
         </Stack>
         <StatusBar style="auto" />
      </ThemeProvider>
   );
}
