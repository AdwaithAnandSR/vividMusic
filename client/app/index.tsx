import { Text, View } from "react-native";
import { lightTheme, darkTheme } from "../themes/themes.js";
import { useColorScheme } from "react-native";

export default function Index() {
   const colorScheme = useColorScheme();
   const theme = colorScheme === "dark" ? darkTheme : lightTheme;
   return (
      <View
         style={{
            backgroundColor: theme.background,
            height: "100%",
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}>
         <Text style={{
            color: theme.text,
            fontSize: 80,
            fontWeight: 'bold',
            letterSpacing: -3,
         }}>
            vividMusic
         </Text>
      </View>
   );
}
