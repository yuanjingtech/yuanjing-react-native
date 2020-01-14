import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-material-ui";
import {useNavigation} from "@react-navigation/native";
import MyAdBanner from "../../../components/MyAdBanner";
import {createStackNavigator} from "@react-navigation/stack";
import {useTheme} from "react-native-paper";
import {authService} from "../../auth/services";
import eventEmitter, {useDefaultEventEmitter} from "../../../common/eventEmitter";
import codePush from "react-native-code-push";

// @ts-ignore
const isHermes = () => global.HermesInternal != null;
const styles = StyleSheet.create({
    button: {
        textAlign: 'left'
    }
});
const DevelopScreen = () => {
        const [login, setLogin] = useState();
        const navigation = useNavigation();
        const {navigate} = navigation;
        useEffect(() => {
            let subscription = eventEmitter.addListener("auth", () => {
            });
            return subscription.remove()
        }, []);
        useDefaultEventEmitter("auth", ({action}: any) => {
            if (action == "login") {
                setLogin(true)
            } else {
                setLogin(false)
            }
        });
        useEffect(() => {
            const run = async () => {
                navigation.setParams({title: 'Develop'});
                setLogin(await authService.isLogin());
            };
            // noinspection JSIgnoredPromiseFromCall
            run();
        }, []);
        const [metadata, setMetadata] = useState<any | null>(null);
        useEffect(() => {
            const run = async () => {
                setMetadata(await codePush.getUpdateMetadata());
            };
            // noinspection JSIgnoredPromiseFromCall
            run();
        }, []);
        return (
            <View>
                <MyAdBanner/>
                <Text>Hermes:{isHermes() ? "true" : "false"}</Text>
                <Button text={"Welcome"} onPress={() => navigate("Welcome")}/>
                <Button text={"Test Ad"} onPress={() => navigate("TestAd")}/>
                <Button text={"Update"} onPress={() => navigate("Update", {navigationOptions: {title: "Update"}})}/>
                {login ? <Button text={"Logout"} onPress={() => authService.logout()}/> : <Button text={"Login"} onPress={() => navigate("Login", {navigationOptions: {title: "Login"}})}/>}
                {metadata ? <Text>{metadata.version} {metadata.label} {metadata.appVersion} {metadata.description}</Text> : null}
            </View>
        );
    }
;

const Stack = createStackNavigator();
const DevelopTabContainer = () => {
    const theme = useTheme();
    return <Stack.Navigator initialRouteName="DevelopScreen">
        <Stack.Screen
            name="DevelopScreen"
            component={DevelopScreen}
            options={{
                title: "开发",
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
export default DevelopTabContainer;
