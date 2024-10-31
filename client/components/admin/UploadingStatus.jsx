import React from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   TextInput
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { useSocket } from "../../context/socket.context.js";

const UploadingStatus = () => {
   const socket = useSocket();
   const [bundleSize, setBundleSize] = React.useState(0);
   const [uploadedSize, setUploadedSize] = React.useState(0);
   const [currentFile, setCurrentFile] = React.useState("nill");

   const fetchStatus = () => {
      if (!socket) return;
      socket.emit("getUploadDets");
   };

   React.useEffect(() => {
      
      if(!socket) return
      
      const handleRes = ({ filesLength, uploaded }) => {
         setBundleSize(filesLength);
         setUploadedSize(uploaded);
      };

      const handleItemUploadRes = ({ currentFile, uploaded, filesLength}) => {
         setBundleSize(filesLength);
         setCurrentFile(currentFile);
         setUploadedSize(uploaded);
      };

      socket.on("getUploadDetsRes", handleRes);
      socket.on("itemUpload", handleItemUploadRes);

      return () => {
         socket.off("getUploadDetsRes", handleRes);
         socket.off("itemUpload", handleItemUploadRes);
      };
   }, [socket]);

   return (
      <>
         <Text
            style={{
               color: "white",
               fontSize: RFPercentage(3),
               marginTop: 50,
               marginHorizontal: "auto",
               marginBottom: 10
            }}>
            uploading status
         </Text>
         <View style={styles.inputView}>
            <TouchableOpacity
               style={styles.refreshBtn}
               onPress={() => fetchStatus()}>
               <Text style={{ color: "white", fontSize: RFPercentage(1) }}>
                  refresh
               </Text>
            </TouchableOpacity>

            <Text style={{ color: "white", fontSize: RFPercentage(2) }}>
               bundle size: {bundleSize} {"\n\n"}
               uploaded size: {uploadedSize} {"\n\n"}
               remaining: {bundleSize - uploadedSize} {"\n\n"}
               current: {currentFile}
            </Text>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   inputView: {
      width: "85%",
      height: "60%",
      marginHorizontal: "auto",
      borderRadius: RFPercentage(3),
      padding: 20,
      backgroundColor: "#2c2c2c"
   },

   refreshBtn: {
      width: 40,
      height: 40,
      backgroundColor: "orange",
      borderRadius: RFPercentage(50),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: "100%"
   }
});

export default React.memo(UploadingStatus);
