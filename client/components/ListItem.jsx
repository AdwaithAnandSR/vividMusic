import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";

import { useTheme } from "../context/theme.context.js";
import { useTrack } from "../context/track.context.js";

const { height: vh, width: vw } = Dimensions.get("window");

const ListItem = ({ item }) => {
   const { styles } = useTheme();
   const { setTrack, track, status } = useTrack();

   return (
      <TouchableOpacity
         activeOpacity={0.6}
         onPress={() => setTrack(item)}
         style={{
            backgroundColor: styles.listItem,
            height: vh * 0.1,
            marginVertical: vh * 0.001,
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
               source={
                  item.cover
                     ? { uri: item.cover }
                     : require("../assets/images/images.jpeg")
               }
               style={{ width: "100%", height: "100%" }}
               contentFit="cover"
            />
         </View>
         <Text
            numberOfLines={2}
            style={{ color: styles.color, width: vw * 0.7, fontWeight: "bold" }}
         >
            {item.title}
         </Text>

         {track === item && (
            <LottieView
               autoPlay
               source={require("../assets/animations/musicPlayingAnim.json")}
               loop={status.playing || status.buffering ? true : false}
               style={{
                  width: 40,
                  height: 40,
                  marginLeft: -10
               }}
            />
         )}
      </TouchableOpacity>
   );
};

export default ListItem;
