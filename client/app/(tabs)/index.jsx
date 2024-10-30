import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native";

import { theme } from "../../themes/themes.js";
import RenderItem from "../../components/RenderItem.jsx";

export default function Index() {
   const [list, setList] = useState([]);
   return (
      <View style={styles.conatiner}>
         <FlatList
            data={list}
            renderItem={({ item }) => <RenderItem item={item} />}
            style={styles.list}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   conatiner: {
      flex: 1,
      backgroundColor: theme.background
   },
   list: {
      backgroundColor: "red"
   }
});
