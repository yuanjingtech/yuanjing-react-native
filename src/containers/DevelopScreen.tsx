import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-material-ui";
import {useNavigation} from "@react-navigation/native";
import MyAdBanner from "../components/MyAdBanner";
// @ts-ignore
const isHermes = () => global.HermesInternal != null;
const styles = StyleSheet.create({
    button: {
        textAlign: 'left'
    }
});
const DevelopScreen = () => {
    const navigation = useNavigation();
    const {navigate} = navigation;
    useEffect(() => {
        const run = async () => {
            navigation.setParams({title: 'Develop'})
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
            <Button text={"Login"} onPress={() => navigate("Login", {navigationOptions: {title: "Login"}})}/>
        </View>
    );
};

export default DevelopScreen;
