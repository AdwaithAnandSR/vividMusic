import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "../context/theme.context.js";
import { ListProvider } from "../context/list.context.js";

export default function RootLayout() {
   return (
      <ThemeProvider>
         <ListProvider>
            <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="auto" />
         </ListProvider>
      </ThemeProvider>
   );
}
