import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

import RenderItem from "../../components/app/RenderItem.jsx";

import { theme } from "../../themes/themes.js";


export default function Index() {
   const [list, setList] = useState([1 , 2]);
   return (
      <View style={styles.conatiner}>
         <FlashList
            data={list}
            renderItem={({ item }) => <RenderItem item={item} />}
            estimatedItemSize={70}
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
