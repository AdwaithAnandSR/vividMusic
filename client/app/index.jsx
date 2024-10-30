import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { router } from 'expo-router';


const Index = () => {
   const [isMounted, setIsMounted] = useState(false)
   useEffect(() => {
      if(isMounted) router.replace('admin/Admin')
      else setIsMounted(true)
      return ()=>{
         setIsMounted(false)
      }
   }, [isMounted])
   
   
   return (
      <View style={styles.container}>
         <Text style={styles.heading}>vividMusic</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   heading: {
      fontSize: RFPercentage(10),
      fontWeight: "bold",
      letterSpacing: -1
   }
});

export default Index;
