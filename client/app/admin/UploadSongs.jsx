import React from "react";
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { router } from "expo-router";

import ProgressBar from "../../components/admin/ProgressBar.jsx";
import UploadingStatus from "../../components/admin/UploadingStatus.jsx";

import adminTheme from "../../themes/admin.js";
import uploadFiles from "../../controller/fileUploads.js";

const UploadSongs = () => {
   const [progress, setProgress] = React.useState(0);
   const [showProgress, setShowProgress] = React.useState(false);

   return (
      <View style={styles.container}>
         <Text style={[styles.texts, styles.h1]}>UploadSongs</Text>
         <View style={styles.form}>
            <TouchableOpacity
               style={styles.btn}
               onPress={() => uploadFiles({ setShowProgress, setProgress })}>
               <Text style={{ color: "white", fontSize: RFPercentage(4) }}>
                  upload
               </Text>
            </TouchableOpacity>

            <UploadingStatus />
            <ProgressBar showProgress={showProgress} progress={progress} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: adminTheme.background
   },
   texts: {
      color: adminTheme.text
   },
   h1: {
      fontSize: RFPercentage(4.5),
      marginVertical: RFPercentage(8),
      fontWeight: "bold",
      letterSpacing: -1,
      paddingHorizontal: RFPercentage(3)
   },
   form: {
      height: RFPercentage(60)
   },
   btn: {
      width: "85%",
      height: "13%",
      borderRadius: RFPercentage(5),
      marginHorizontal: "auto",
      backgroundColor: "#13b7d2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
   }
});

export default React.memo(UploadSongs);
