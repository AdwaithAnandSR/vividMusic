import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { useTheme } from "../context/theme.context.js";
import { useTrack } from "../context/track.context.js"

const { height: vh, width: vw } = Dimensions.get("window");

const ListItem = ({ item }) => {
   const { styles } = useTheme();
   const { setTrack } = useTrack();

   return (
      <TouchableOpacity
         activeOpacity={0.6}
         onPress={()=> setTrack(item)}
         style={{
            backgroundColor: "#272727",
            height: vh * 0.1,
            marginVertical: vh * 0.002,
            alignItems: "center",
            flexDirection: "row",
            gap: vw * 0.03,
            paddingHorizontal: vw * 0.02
         }}
      >
         <View
            style={{
               width: vh * 0.06,
               height: vh * 0.06,
               borderRadius: vh * 0.5,
               overflow: "hidden"
            }}
         >
            <Image
               source={item.cover}
               style={{ width: "100%", height: "100%" }}
               contentFit="cover"
            />
         </View>
         <Text
            numberOfLines={2}
            style={{ color: styles.color, width: vw * 0.8, fontWeight: "bold" }}
         >
            {item.title}
         </Text>
      </TouchableOpacity>
   );
};

export default ListItem;
