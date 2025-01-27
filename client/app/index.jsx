import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { router } from "expo-router"

const index = () => {

useEffect(() => {
  setTimeout(() => {
    router.replace("home")
  }, 500);
}, [])


  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index
