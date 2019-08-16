import React, {useEffect, useRef} from 'react'
import {BackHandler, StyleSheet, View} from 'react-native';
import {useNavigation, useNavigationParam} from "react-navigation-hooks";
import {WebView} from 'react-native-webview';
import {WebViewNavigation} from "react-native-webview/lib/WebViewTypes";
import Button from "./Button";

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
        <View style={styles.container}>
            <WebView
                ref={webViewElement}
                source={{uri: uri}}
                onNavigationStateChange={(navState: WebViewNavigation) => {
                    if (navState.title) {
                        navigation.title = navState.title;
                    }
                }}>
            </WebView>
            <View style={styles.toolbar}>
                <Button title={"back"} onPress={() => (webViewElement.current as unknown as WebView).goBack()}/>
                <Button title={"forward"} onPress={() => (webViewElement.current as unknown as WebView).goForward()}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        flexDirection: "row",
        justifyContent: "flex-start"
    }
});
