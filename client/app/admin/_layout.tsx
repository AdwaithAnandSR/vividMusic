
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
   return (
      <View style={{ backgroundColor: "black", height: "100%" }}>
         <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Admin' />
            <Stack.Screen name='UploadSongs' />
         </Stack>
      </View>
   );
}
