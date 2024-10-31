import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import { Text } from "react-native";
import React, { Suspense, lazy } from "react";

const Auth = lazy(() => import("./Auth.jsx"));

import { theme } from "../themes/themes.js";
import { SocketProvider } from "../context/socket.context.js";

export default function RootLayout() {
   return (
      <Suspense fallback={<Text>loading...</Text>}>
         <SocketProvider>
            <SafeAreaView
               style={{ height: "100%", backgroundColor: theme.background }}>
               <ToastManager
                  position={"bottom"}
                  animationStyle='rightInOut'
                  showCloseIcon={false}
                  textStyle={{ color: "white" }}
                  style={{
                     backgroundColor: "#272727",
                     width: "100%",
                     borderRadius: 5
                  }}
               />
               <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name='index' />
                  <Stack.Screen name='Auth' />
                  <Stack.Screen name='(tabs)' />
                  <Stack.Screen name='admin' />
               </Stack>
            </SafeAreaView>
         </SocketProvider>
      </Suspense>
   );
}
