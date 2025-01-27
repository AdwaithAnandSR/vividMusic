import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import * as React from "react";
import { View, useWindowDimensions, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Home from "./Home.jsx";
import Favourites from "./Favourites.jsx";

const renderScene = SceneMap({
  first: Home,
  second: Favourites,
});

const routes = [
  { key: "first", title: "allSongs" },
  { key: "second", title: "favourite" },
];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{
      backgroundColor: "#0d0d0dec",
      height: Dimensions.get("window").height * 0.13,
      display: "flex",
      justifyContent: "flex-end",
    }}
  />
);

export default function RootLayout() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      <StatusBar style="auto" />
    </View>
  );
}
