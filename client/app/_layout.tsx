import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme, darkTheme } from '../themes/themes.js'
import { useColorScheme } from 'react-native';

export default function RootLayout() {
   const colorScheme= useColorScheme()
   const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
   
   return (
      <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: theme.background}}>
      <Stack screenOptions={ {headerShown: false} }>
         <Stack.Screen name='index' />
      </Stack>
      </SafeAreaView>
   );
}
