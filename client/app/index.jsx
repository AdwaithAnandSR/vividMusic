import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
   const [isMounted, setIsMounted] = useState(false)
   
   const fetchDets = async ()=>{
      const userId = await AsyncStorage.getItem('userId')
      const role = await AsyncStorage.getItem('role')
      
      if(userId && role && role === 'user') router.replace('(tabs)')
      if(userId && role && role === 'admin') router.replace('admin/Admin')
   }
   
   useEffect(() => {
      fetchDets()
   }, [])
   
   
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
