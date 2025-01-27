import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { router } from "expo-router"

const index = () => {

useEffect(() => {
  setTimeout(() => {
    router.replace("home")
  }, 500);
}, [])


  return <View style={{ height: "100%", backgroundColor: "black" }}></View>;
}

export default index
