import React, {Component} from 'react'
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {HomeScreen} from "./containers/HomeScreen";
import {MainScreen} from "./containers/MainScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {MyWebView} from "./components/MyWebView";
// import Conversation from "./containers/Conversation";
import LoginScreen from "./containers/LoginScreen";

export class App extends Component {
    render() {
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
            >
                {/*<HomeScreenStack tabLabel="首页"/>*/}
                {/*<MainScreen tabLabel="远景"/>*/}
                {/*<MoreScreen tabLabel="更多"/>*/}
            </ScrollableTabView>
        );
    }
}

let tabConfig = {
    Home: HomeScreen,
    // Chat: Conversation,
    Main: MainScreen,
};
const TabNavigator = createBottomTabNavigator(tabConfig);
TabNavigator.navigationOptions = () => ({headerLeft: null});

const AppNavigator = createStackNavigator({
        Login: {screen: LoginScreen},
        Main: {screen: TabNavigator},
        MyWebView: {screen: MyWebView},
    },
    {
        initialRouteName: 'Main', // 默认登录页
    }
);

export default createAppContainer(AppNavigator);

