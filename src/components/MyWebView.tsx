import React, {useEffect, useRef} from 'react'
import {BackHandler, StyleSheet} from 'react-native';
import {useNavigation, useNavigationParam} from "react-navigation-hooks";
import {WebView} from 'react-native-webview';
import {WebViewNavigation} from "react-native-webview/lib/WebViewTypes";

export const MyWebView = () => {
    const navigation = useNavigation();
    const uri = useNavigationParam("uri");
    const webViewElement = useRef(null);
    const backHandler = () => {
        return (webViewElement.current as unknown as WebView).goBack();
    };
    useEffect(() => {
        const run = async () => {
            BackHandler.addEventListener('hardwareBackPress', backHandler);
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler);
        }
    }, []);
    return (
        <WebView
            ref={webViewElement}
            source={{uri: uri}}
            onNavigationStateChange={(navState: WebViewNavigation) => {
                if (navState.title) {
                    navigation.title = navState.title;
                }
            }}>

        </WebView>
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
