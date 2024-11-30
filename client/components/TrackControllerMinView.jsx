import React, { useRef, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
   Animated
} from "react-native";
import { Image } from "expo-image";

import { useTrack } from "../context/track.context.js";

const { height: vh, width: vw } = Dimensions.get("window");

const TrackControllerMinView = ({ handleToFullView }) => {
   const { track } = useTrack();

   const colorAnimation = useRef(new Animated.Value(0)).current;

   // Interpolate animated value to generate colors
   const backgroundColor = colorAnimation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8 , 1],
      outputRange: ["#23adc9", "#59fcd1", "#c75ef4", '#f52041', '#cafd63' , "rgb(247,44,147)"]
   });

   useEffect(() => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(colorAnimation, {
               toValue: 1,
               duration: 30000,
               useNativeDriver: false 
            }),
            Animated.timing(colorAnimation, {
               toValue: 0,
               duration: 30000,
               useNativeDriver: false
            })
         ])
      ).start();
   }, []);

   return (
      <TouchableOpacity
         activeOpacity={0.9}
         onPress={handleToFullView}
         style={styles.container}
      >
         <Animated.View
            style={[styles.gradient, { backgroundColor }]}
         />
         <View
            style={{
               width: vh * 0.06,
               height: vh * 0.06,
               borderRadius: vh * 0.5,
               overflow: "hidden",
               marginLeft: vw * 0.03
            }}
         >
            <Image
               source={track?.cover}
               style={{ width: "100%", height: "100%" }}
               contentFit="cover"
               transition={1000}
            />
         </View>

         <Text
            numberOfLines={2}
            style={{
               width: "80%",
               fontWeight: "bold",
               fontSize: vw * 0.04
            }}
         >
            {track?.title}
         </Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      gap: vw * 0.03,
      marginBottom: 5,
      overflow: 'hidden',
      borderRadius: vw ,
   },
   gradient: {
      width: "100%",
      height: "100%",
      position: "absolute"
   }
});

export default TrackControllerMinView;