import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import MyAdBanner from "../components/MyAdBanner";
import SubAppWebView from "../modules/subapp/components/SubAppWebView";
import {subAppService} from "../modules/subapp/services";
import eventEmitter from "../common/eventEmitter";
import {useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {MainScreen} from "./MainScreen";
import {useTheme} from "react-native-paper";

const RecentAppEmpty = () => {
    return <View style={styles.container}>
        <Text>没有最近的App</Text>
    </View>
};
const TabRecentScreen = () => {
    const navigation = useNavigation();
    const [uri, setUri] = useState("");
    const refresh = async () => {
        let apps = await subAppService.getRecentAppList();
        if (apps.length) {
            let app = apps[0];
            setUri(app.uri);
            navigation.setOptions({title: app.name})
        } else {
            navigation.setOptions({title: ''})
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const Stack = createStackNavigator();
const RecentTabContainer = () => {
    const theme = useTheme();
    return <Stack.Navigator initialRouteName="TabRecentScreen">
        <Stack.Screen
            name="TabRecentScreen"
            component={TabRecentScreen}
            options={{
                title: "最近",
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />
    </Stack.Navigator>;
};
export default RecentTabContainer;
