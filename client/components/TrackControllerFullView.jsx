import { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
   BackHandler
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { getColors } from "react-native-image-colors";

import { useTrack } from "../context/track.context.js";
import { useLists } from "../context/list.context.js";

import Controllers from "./ControllersContainer.jsx";
import SliderContainer from "./SliderContainer.jsx";

const { height: vh, width: vw } = Dimensions.get("window");

const TrackControllerFullView = ({ handleToMinView }) => {
   const { track, status, player, setTrack } = useTrack();
   const { allSongs } = useLists();
   const [colors, setColors] = useState(null);

   useEffect(() => {
      if (track && track.cover) {
         getColors(track?.cover, {
            fallback: "#228B22",
            cache: true,
            key: track._id
         }).then(setColors);
      }
   }, [track]);

   useEffect(() => {
      const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         () => {
            handleToMinView();
            return true;
         }
      );
      return () => backHandler.remove();
   }, []);

   const handlePlayNext = () => {
      const currentIndex = allSongs.findIndex(item => item._id === track?._id);
      if (currentIndex === allSongs.length - 1) setTrack(allSongs[0]);
      else setTrack(allSongs[currentIndex + 1]);
   };
   const handlePlayPrev = () => {
      const currentIndex = allSongs.findIndex(item => item._id === track?._id);
      if (currentIndex === 0) setTrack(allSongs[allSongs.length - 1]);
      else setTrack(allSongs[currentIndex - 1]);
   };

   return (
      <View style={[styles.container]}>
      
         {/* navbar */}

         <View style={styles.navbar}>
            <TouchableOpacity onPress={handleToMinView}>
               <Entypo name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
               <Entypo name="dots-three-vertical" size={24} color="white" />
            </TouchableOpacity>
         </View>

         {/* title */}
         
         <View style={{ height: vh * 0.125, justifyContent: "center" }}>
            <Text numberOfLines={2} style={styles.title}>
               {track?.title}
            </Text>
         </View>

         {/* image */}

         <View
            style={[
               styles.imageContainer,
               { shadowColor: colors?.lightVibrant || "#32ffd4" }
            ]}
         >
            <Image
               source={track.cover}
               contentFit="cover"
               filter="contrast(1.25) brightness(0.8)"
               style={{ width: "100%", height: "100%" }}
            />
         </View>

         {/* slider */}

         <SliderContainer
            status={status}
            lightVibrant={colors?.lightVibrant}
            player={player}
         />

         {/* controllers */}

         <Controllers
            status={status}
            player={player}
            track={track}
            handlePlayPrev={handlePlayPrev}
            handlePlayNext={handlePlayNext}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#000000"
   },
   navbar: {
      width: "100%",
      height: "10%",
      justifyContent: "flex-end",
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: vw * 0.04,
      gap: vw * 0.05
   },
   title: {
      color: "white",
      fontSize: vw * 0.045,
      fontWeight: "bold",
      alignSelf: "center",
      width: "80%"
   },
   imageContainer: {
      width: vw * 0.8,
      height: vw * 0.8,
      borderRadius: vw * 5,
      overflow: "hidden",
      alignSelf: "center",
      marginTop: vh * 0.02,
      marginBottom: vh * 0.04,
      shadowOpacity: 1,
      elevation: 80
   }
});

export default TrackControllerFullView;
