import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../themes/themes.js";
import { SocketProvider } from "../context/socket.context.js";

export default function RootLayout() {
   return (
      <SocketProvider>
         <SafeAreaView
            style={{ height: "100%", backgroundColor: theme.background }}>
            <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name='index' />
               <Stack.Screen name='admin' />
            </Stack>
         </SafeAreaView>
      </SocketProvider>
   );
}
