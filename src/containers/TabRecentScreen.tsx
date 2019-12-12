import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import MyAdBanner from "../components/MyAdBanner";
import SubAppWebView from "../modules/subapp/components/SubAppWebView";
import {subAppService} from "../modules/subapp/services";
import eventEmitter from "../common/eventEmitter";

const RecentAppEmpty = () => {
    return <View style={styles.container}>
        <Text>没有最近的App</Text>
    </View>
};
const TabRecentScreen = () => {
    const [uri, setUri] = useState("");
    const refresh = async () => {
        let apps = await subAppService.getRecentAppList();
        if (apps.length) {
            setUri(apps[0].uri)
        }
    };
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        refresh();
    }, []);
    useEffect(() => {
        const run = async () => {
            eventEmitter.addListener("RECENT_APP_UPDATE", () => {
                refresh()
            })
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return (
        <View style={styles.container}>
            <MyAdBanner/>
            {uri ? <SubAppWebView uri={uri}/> : <RecentAppEmpty/>}
        </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default TabRecentScreen;
