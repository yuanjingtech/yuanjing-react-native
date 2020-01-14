import React from 'react';
import {Clipboard, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const openTask = async (it) => {
    await Clipboard.setString(it.code);
    await Linking.openURL(it.url)
};
const Activity = ({data: it}) => (<TouchableOpacity
    onPress={async () => {
        await openTask(it)
    }}
>
    <View style={[styles.item, {padding: 8, margin: 4}]}>
        <Text>{it.url === 'taobao://' ? "淘口令" : "其他"}</Text>
        <Text>{it.title}</Text>
        <Text>{it.code}</Text>
    </View>
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
