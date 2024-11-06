import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Audio } from "expo-av";

import RenderItem from "../../components/app/RenderItem.jsx";

import { theme } from "../../themes/themes.js";
import useGetGlobalSongs from "../../hooks/useGetGlobalSongs.js";
import { useSongList } from "../../context/globalSongList.js";
import { useGlobalValues } from "../../context/globalControllerValue.js";

const LIMIT = 20;

const GlobalSongs = () => {
   const { globalSongList, setGlobalSongList, page, setPage } = useSongList();
   const { setTrack } = useGlobalValues();
   const [hasMore, setHasMore] = useState(true);

   useGetGlobalSongs({
      limit: LIMIT,
      page,
      setHasMore,
      setList: setGlobalSongList
   });

   return (
      <View style={styles.container}>
         <FlashList
            data={globalSongList}
            renderItem={({ item }) => (
               <RenderItem item={item} setTrack={setTrack} />
            )}
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
   container: {
     flex: 1,
      backgroundColor: theme.background,
      marginHorizontal: 10,
      paddingTop: 10
   },
  
});

export default React.memo(GlobalSongs);
