import React from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import FirstRoute from "./index.jsx";
import SecondRoute from "./Profile.jsx";
import renderTabBar from "../../components/app/TabBar.jsx";

import { theme } from "../../themes/themes.js";

const renderScene = SceneMap({
   first: FirstRoute,
   second: SecondRoute
});

const routes = [
   { key: "first", title: "Songs" },
   { key: "second", title: "Profile" }
];

export default function RootLayout() {
   const [index, setIndex] = React.useState(0);
   return (
      <View
         style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: theme.background
         }}>
         <Text
            style={{
               color: theme.text,
               fontSize: Dimensions.get("window").width * 0.1,
               fontWeight: "bold",
               letterSpacing: -1,
               padding: 30,
               marginBottom: Dimensions.get("window").height * 0.05,
            }}>
            vividMusic 
         </Text>
         <TabView
            
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
         />
      </View>
   );
}
