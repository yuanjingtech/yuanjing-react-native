import React, {Component} from 'react'
import {
    AppRegistry, Button,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

export class MoreScreen extends Component {
    static navigationOptions = {
        title: '更多',
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <WebView
                    source={{uri: 'http://www.yuanjingtech.com/more.html'}}
                    style={{flex: 1}}
                />
            </View>
        );
    }
}

