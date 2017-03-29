import React, {Component} from 'react'
import {
    AppRegistry, Button,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

export class MainScreen extends Component {
    static navigationOptions = {
        title: '远景软件',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Button
                    title="更多"
                    onPress={() =>
                        navigate('More', {name: 'Jane'})
                    }
                />
                <WebView
                    source={{uri: 'http://www.yuanjingtech.com'}}
                    style={{flex: 1}}
                />
            </View>
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
