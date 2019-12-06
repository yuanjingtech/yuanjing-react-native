import React from 'react'
import {StyleSheet, View} from 'react-native';
import MyAdBanner from "../components/MyAdBanner";
import SubAppList from "../modules/subapp/containers/SubAppList";


export const HomeScreen = () => {

    return (
        <View style={styles.main_container}>
            <MyAdBanner/>
            <SubAppList/>
        </View>
    );
};


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        flex: 1,
    },
    item: {
        margin: 5,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

