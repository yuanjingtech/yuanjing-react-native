import React, {Component} from 'react'
import {
    AppRegistry, Button,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';
import {MyWebView} from "../components/MyWebView";
import {HomeScreen} from "./HomeScreen";
var ScrollableTabView = require('react-native-scrollable-tab-view');

import {MainScreen} from "../containers/MainScreen";
import {MoreScreen} from "../containers/MoreScreen";


// export const App = StackNavigator({
//     Main: {screen: MainScreen},
//     More: {screen: MoreScreen},
// });
export class App extends Component {
    render() {
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
            >
                <HomeScreenStack tabLabel="首页"/>
                <MainScreen tabLabel="远景"/>
                <MoreScreen tabLabel="更多"/>
            </ScrollableTabView>
        );
    }
}

const HomeScreenStack = StackNavigator({
    Main: {screen: HomeScreen},
    MyWebView: {screen: MyWebView},
});
export default App;

