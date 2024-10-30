import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RenderItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Text>RenderItem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default RenderItem;
