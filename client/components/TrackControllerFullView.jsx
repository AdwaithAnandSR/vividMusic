import { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
   BackHandler
} from "react-native";
import { Entypo, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";

import { useTrack } from "../context/track.context.js";
import { useLists } from "../context/list.context.js";

const { height: vh, width: vw } = Dimensions.get("window");

const TrackControllerFullView = ({ handleToMinView }) => {
   const { track } = useTrack();

   useEffect(() => {
      const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         () => {
            handleToMinView()
            return true;
         }
      );
      return () => backHandler.remove();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.navbar}>
            <TouchableOpacity onPress={handleToMinView}>
               <Entypo name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
               <Entypo name="dots-three-vertical" size={24} color="white" />
            </TouchableOpacity>
         </View>

         <Text numberOfLines={2} style={styles.title}>
            {track?.title}
         </Text>

         <View style={styles.imageContainer}>
            <Image
               source={track.cover}
               contentFit="cover"
               style={{ width: "100%", height: "100%" }}
            />
         </View>

         <View style={styles.sliderContainer}>
            <Text style={{ color: "white" }}>00:00</Text>
            <Slider
               style={{ width: "75%", height: 40 }}
               minimumValue={0}
               maximumValue={200}
               value={50}
               onSlidingComplete={e => console.log(e)}
               minimumTrackTintColor="#FFFFFF"
               maximumTrackTintColor="#656565"
            />
            <Text style={{ color: "white" }}>00:00</Text>
         </View>

         <View style={styles.controllsContainer}>
            <TouchableOpacity style={styles.btnContainer}>
               <AntDesign name="stepbackward" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer}>
               <FontAwesome5 name="play" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer}>
               <AntDesign name="stepforward" size={28} color="white" />
            </TouchableOpacity>
         </View>
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
      paddingVertical: vh * 0.02,
      width: "80%"
   },
   imageContainer: {
      width: vw * 0.8,
      height: vw * 0.8,
      borderRadius: vw * 5,
      overflow: "hidden",
      alignSelf: "center",
      marginTop: vh * 0.04
   },
   sliderContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: vh * 0.04
   },
   controllsContainer: {
      width: "70%",
      height: "10%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center"
   },
   btnContainer: {
      padding: "8%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%"
   }
});

export default TrackControllerFullView;
