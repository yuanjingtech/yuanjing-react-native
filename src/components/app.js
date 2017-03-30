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
                <MainScreen tabLabel="远景"/>
                <MoreScreen tabLabel="更多"/>
            </ScrollableTabView>
        );
    }
}
export default App;

