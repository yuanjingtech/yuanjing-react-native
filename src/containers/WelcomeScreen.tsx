import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, StyleSheet, Text, SafeAreaView} from "react-native";
import MyAdBanner from "../components/MyAdBanner";
import {Button} from "react-native-material-ui";

let timeout = async () => await new Promise(resolve => setTimeout(resolve, 3 * 1000));
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_skip: {
        marginBottom: 60
    }
});
const WelcomeScreen = () => {
    const [canSkip, setCanSkip] = useState(false);
    const {navigate, replace} = useNavigation();
    const doEnter = function () {
        replace('Main')
    };
    useEffect(() => {
        const run = async () => {
            await timeout();
            doEnter();
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    useEffect(() => {
        const run = async () => {
            await timeout();
            setCanSkip(true)
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <MyAdBanner/>
            <View style={styles.content_container}>
                <Text>Loading</Text>
            </View>
            {canSkip ? <View style={styles.button_skip}><Button onPress={doEnter} text={"跳过"}/></View> : null}
        </SafeAreaView>
    );
};
export default WelcomeScreen;
