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
import {MainScreen} from "../containers/MainScreen";
import {MoreScreen} from "../containers/MoreScreen";

export const App = StackNavigator({
    Main: {screen: MainScreen},
    More: {screen: MoreScreen},
});
export default App;

