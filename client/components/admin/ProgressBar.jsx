import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { RFPercentage } from "react-native-responsive-fontsize";


const ProgressBar = ({ showProgress, progress }) => {
   return (
      <>
         {showProgress ? (
            <Progress.Circle
               showText={true}
               style={{
                  color: "red",
                  marginTop: RFPercentage(20),
                  position: "absolute",
                  marginHorizontal: "30%",
                  zIndex: 50
               }}
               borderColor='#383838'
               color='#e03d98'
               progress={progress / 100}
               size={150}
               formatText={() => {
                  return "6%";
               }}
            />
         ) : null}
      </>
   );
};

export default ProgressBar;
