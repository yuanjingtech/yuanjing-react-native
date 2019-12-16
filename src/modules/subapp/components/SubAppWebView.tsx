import React, {useEffect, useRef} from 'react';
import {WebView} from "react-native-webview";
import {WebViewNavigation} from "react-native-webview/lib/WebViewTypes";
import {BackHandler, StyleSheet, View} from "react-native";
import Button from "../../../components/Button";
import {useNavigation} from "@react-navigation/native";


const SubAppWebView = ({uri}: any) => {
    const navigation = useNavigation();
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
    return (<>
            <WebView
                ref={webViewElement}
                source={{uri: uri}}
                onNavigationStateChange={(navState: WebViewNavigation) => navigation.setParams({title: navState.title || ""})}>
            </WebView>
            <View style={styles.toolbar}>
                <Button title={"back"} onPress={() => (webViewElement.current as unknown as WebView).goBack()}/>
                <Button title={"forward"} onPress={() => (webViewElement.current as unknown as WebView).goForward()}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: "row",
        justifyContent: "flex-start"
    }
});
export default SubAppWebView;
