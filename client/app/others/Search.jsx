import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";

const { height: vh, width: vw } = Dimensions.get("window");

const Search = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="serach.."
          placeholderTextColor="silver"
        />
        <Text>Search</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
    top: 0,
  },
  searchInput: {
    width: vw * 0.8,
    height: vh * 0.06,
    backgroundColor: "red",
    borderRadius: vw * 0.04,
  },
});

export default Search;
