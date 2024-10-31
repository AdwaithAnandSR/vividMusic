import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

import adminTheme from "../../themes/admin.js";

const Admin = () => {
   return (
      <View style={styles.container}>
         <Text style={[styles.h1, styles.texts]}>Admin Dashboard</Text>
         <TouchableOpacity onPress={()=> router.push("(tabs)")} style={{ marginLeft: 'auto', marginRight: 20,}}>
         <Ionicons name="home" size={22} color={adminTheme.text} />
         </TouchableOpacity>
         <View style={styles.listContainer}>
            <TouchableOpacity
               onPress={() => router.push('admin/UploadSongs')}
               style={styles.items}>
               <Text style={[styles.texts, styles.itemTitle]}>
                  Upload Files
               </Text>
            </TouchableOpacity>
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
   listContainer: {
      height: "100%",
      marginTop: RFPercentage(8)
   },
   items: {
      height: RFPercentage(10),
      backgroundColor: adminTheme.itemColor,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: RFPercentage(1)
   },
   itemTitle: {
      fontSize: RFPercentage(3.5),
      fontWeight: "bold"
   },
   h1: {
      fontSize: RFPercentage(5),
      marginVertical: RFPercentage(5),
      fontWeight: "bold",
      letterSpacing: -1,
      paddingHorizontal: RFPercentage(3)
   }
});

export default React.memo(Admin);
