import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";

import { theme } from "../../themes/themes.js";
import { useAudio } from "../../context/audioContext.js";

const { width: vw, height: vh } = Dimensions.get("window");
const blurhash =
   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const RenderItem = ({ item, setTrack }) => {
   const { loadAndPlayTrack, currentTrackForUiUpdating } = useAudio();

   return (
      <TouchableOpacity
         onPress={() => loadAndPlayTrack(item)}
         style={styles.container}>
         <View style={styles.imageContainer}>
            <Image
               style={{ width: "100%", height: "100%" }}
               source={item.cover}
               placeholder={{ blurhash }}
               contentFit='cover'
               transition={1000}
            />
         </View>
         <Text
            numberOfLines={2}
            style={{
               color:
                  currentTrackForUiUpdating === item
                     ? theme.playingItemHighlightColor
                     : theme.text,
               fontWeight: "bold",
               fontSize: vw * 0.035,
               width: vw * 0.7,
            }}>
            {item.title}
         </Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: vh * 0.1,
      gap: vh * 0.02,
      backgroundColor: theme.item,
      marginVertical: vh * 0.004,
      borderRadius: vw * 0.01,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: vw * 0.03
   },
   imageContainer: {
      width: vh * 0.05,
      height: vh * 0.05,
      borderRadius: Dimensions.get('window').width/2,
      overflow: "hidden"
   }
});

export default React.memo(RenderItem, (prev, next) => prev._id === next._id);
