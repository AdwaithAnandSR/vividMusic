import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

import RenderItem from "../../components/app/RenderItem.jsx";

import { theme } from "../../themes/themes.js";
import useGetGlobalSongs from "../../hooks/useGetGlobalSongs.js";
import { useSongList } from "../../context/globalSongList.js";

const LIMIT = 20;

const GlobalSongs = () => {
   const { globalSongList, setGlobalSongList, page, setPage } = useSongList();
   const [hasMore, setHasMore] = useState(true);

   useGetGlobalSongs({
      limit: LIMIT,
      page,
      setHasMore,
      setList: setGlobalSongList
   });

   return (
      <View style={styles.conatiner}>
         <FlashList
            data={globalSongList}
            renderItem={({ item }) => <RenderItem item={item} />}
            estimatedItemSize={70}
            onEndReachedThreshold={0.5}
            keyExtractor={item => item?._id}
            onEndReached={() => {
               if (hasMore) setPage(prev => prev + 1);
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   conatiner: {
      flex: 1,
      backgroundColor: theme.background,
      marginHorizontal: 10,
      paddingTop: 10
   },
   list: {
      backgroundColor: "red"
   }
});

export default React.memo(GlobalSongs);
