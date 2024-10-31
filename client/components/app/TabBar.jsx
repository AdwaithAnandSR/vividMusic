import { Dimensions } from "react-native";
import { TabBar } from "react-native-tab-view";


import { theme } from "../../themes/themes.js";

const renderTabBar = props => (
   <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: theme.background,}}
      bounces={false}
      tabStyle={{
         width: Dimensions.get("window").width / 2,
         height: 60
      }}
   />
);

export default renderTabBar