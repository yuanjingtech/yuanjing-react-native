import React from 'react'
import {StyleSheet, View} from 'react-native';
import {WebView} from "react-native-webview";

export const MainScreen = () => {
    // const {navigate} = this.props.navigation;
    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            {/*<Button*/}
            {/*title="更多"*/}
            {/*onPress={() =>*/}
            {/*/!*navigate('More', {name: 'Jane'})*!/*/}
            {/*}*/}
            {/*/>*/}
            <WebView
                source={{uri: 'http://www.yuanjingtech.com'}}
                style={{flex: 1}}
            />
        </View>
    );
};

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
