import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useTheme } from "../context/theme.context.js";
import { useLists } from "../context/list.context.js";
import { useTrack } from "../context/track.context.js";

import useGetAllSongs from "../hooks/useGetAllSongs.js";

import ListItem from "../components/ListItem.jsx";

const { height: vh, width: vw } = Dimensions.get("window");

const Home = () => {
   const LIMIT = 25;
   const { styles } = useTheme();
   const {
      allSongs,
      setAllSongs,
      allSongsPage: page,
      setAllSongsPage: setPage
   } = useLists();
   const { track, setTrack, player, status } = useTrack();

   const { loading, hasMore } = useGetAllSongs({
      setAllSongs,
      page,
      limit: LIMIT
   });

   return (
      <View style={{ backgroundColor: styles.backgroundColor, height: "100%" }}>
         <FlashList
            data={allSongs}
            renderItem={({ item }) => <ListItem item={item} />}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
               <Text
                  style={{
                     color: "white",
                     alignSelf: "center",
                     marginVertical: 10
                  }}
               >
                  {loading ? "loading..." : "no songs."}
               </Text>
            }
            onEndReached={() => {
               if (hasMore) setPage(prev => prev + 1);
            }}
            estimatedItemSize={vh * 0.95 || 100}
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
