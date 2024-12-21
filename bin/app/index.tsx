import { Text, View, Dimensions } from "react-native";
import { router } from 'expo-router';
import { useTheme } from "../context/theme.context.js";

const { height: vh, width: vw } = Dimensions.get("window");

export default function Index() {
   const { styles } = useTheme();
   
   setTimeout(()=>{
      //router.replace("(tabs)/Home")
   }, 2000)

   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: styles.backgroundColor
         }}
      >
         <Text
            style={{
               color: styles.color,
               fontSize: vw * 0.2,
               fontWeight: "bold",
               letterSpacing: 6,
            }}
         >
            vividMusic
         </Text>
      </View>
   );
}
