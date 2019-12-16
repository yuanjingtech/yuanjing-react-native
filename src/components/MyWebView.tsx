import React from 'react'
import {StyleSheet, View} from 'react-native';
import MyAdBanner from "./MyAdBanner";
import SubAppWebView from "../modules/subapp/components/SubAppWebView";
import {useRoute} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";

export const MyWebView = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const uri = route.params?.uri ?? "";
    navigation.setOptions({title: route.params?.title ?? ""});
    return (
        <View style={styles.container}>
            <MyAdBanner/>
            <SubAppWebView uri={uri}/>
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
