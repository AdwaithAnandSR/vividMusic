import { Dimensions } from "react-native";
import { TabBar } from "react-native-tab-view";


import { theme } from "../../themes/themes.js";

const renderTabBar = props => (
   <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{
         backgroundColor: "orange",
         width: "100%",
         backgroundColor: theme.background,
         display: "flex",
         justifyContent: "space-between",
         alignContent: "space-between"
      }}
      bounces
      tabStyle={{
         width: Dimensions.get("window").width / 2,
         height: 60
      }}
   />
);

export default renderTabBar