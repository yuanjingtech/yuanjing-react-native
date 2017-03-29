import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, WebView
} from 'react-native';

export default class App extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'http://www.yuanjingtech.com'}}
                style={{flex: 1}}
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
