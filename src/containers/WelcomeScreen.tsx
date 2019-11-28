import React, {useEffect} from 'react';
import {useNavigation} from "react-navigation-hooks";
import {View, StyleSheet, Text} from "react-native";
import MyAdBanner from "../components/MyAdBanner";

let timeout = async () => await new Promise(resolve => setTimeout(resolve, 3 * 1000));
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
const WelcomeScreen = () => {
    const {navigate} = useNavigation();
    useEffect(() => {
        const run = async () => {
            await timeout();
            navigate('Main')
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return (
        <View style={styles.container}>
            <MyAdBanner/>
            <View style={styles.content_container}>
                <Text>Loading</Text>
            </View>
        </View>
    );
};

export default WelcomeScreen;
