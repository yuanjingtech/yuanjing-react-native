import React, {useEffect, useRef} from 'react'
import {BackHandler, StyleSheet, View} from 'react-native';
import {useNavigation, useNavigationParam} from "react-navigation-hooks";
import {WebView} from 'react-native-webview';
import {WebViewNavigation} from "react-native-webview/lib/WebViewTypes";
import Button from "./Button";
import MyAdBanner from "./MyAdBanner";
import SubAppWebView from "../modules/subapp/components/SubAppWebView";

export const MyWebView = () => {
    const uri = useNavigationParam("uri");

    return (
        <View style={styles.container}>
            <MyAdBanner/>
            <SubAppWebView uri={uri}></SubAppWebView>
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
