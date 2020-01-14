import React from 'react';
import {Clipboard, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Linking} from "expo";

const openTask = async (it) => {
    await Clipboard.setString(it.code);
    await Linking.openURL(it.link)
};
const Activity = ({data: it}) => (<TouchableOpacity onPress={async () => {
    await openTask(it)
}}>
    <Text style={[styles.item, {padding: 8, margin: 4}]}>{it.title}</Text>
</TouchableOpacity>);
export default Activity;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        fontSize: 20,
    }
});
