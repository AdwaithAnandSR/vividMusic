import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useTheme } from "../../context/theme.context.js";
import { useLists } from "../../context/list.context.js";
import { useTrack } from "../../context/track.context.js";

import useGetAllSongs from "../../hooks/useGetAllSongs.js";

import ListItem from "../../components/ListItem.jsx"

const Home = () => {
   const LIMIT = 10;
   const { styles } = useTheme();
   const {
      allSongs,
      setAllSongs,
      allSongsPage: page,
      setAllSongsPage: setPage
   } = useLists();
   const { track, setTrack, player, status } = useTrack();

   useGetAllSongs({ setAllSongs, page, limit: LIMIT });
   
   return (
      <View style={{ backgroundColor: styles.backgroundColor, height: "100%" }}>
         <FlashList
            data={allSongs}
            renderItem={({ item }) => (
               <ListItem item={item} />
            )}
            estimatedItemSize={200}
         />
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

export default Home;
