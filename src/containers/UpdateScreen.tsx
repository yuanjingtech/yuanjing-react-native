import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform} from "react-native";
import {Button, Checkbox, RadioButton} from "react-native-material-ui";
import codePush from "react-native-code-push";

function UpdateScreen() {
    const [channel, setChannel] = useState<string>("stable");
    const checkUpdateNow = () => {
        let key = "2HokGYB6O-hBDIQUhHyKJQxVEX_JwTg7CBz8N";
        if (Platform.OS == "android") {
            if (channel == "stable") {
                key = "2HokGYB6O-hBDIQUhHyKJQxVEX_JwTg7CBz8N"
            } else if (channel == "production") {
                key = "dHXZWzw16TizrZg0LoJIG8VJack_Gyq6gIrPM"
            }
        } else if (Platform.OS == "ios") {
            if (channel == "stable") {
                key = "FA4piKQXHcwEQ9OfS9my-JPdwxUIUOpgnJXxM"
            } else if (channel == "production") {
                key = "k7M5rsQ_k5QNihRIR_kIu64pgUi84jGteXfMU"
            }
        }
        codePush.sync({
            updateDialog: {},
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: key
        });
    };
    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text>Channel:{channel}</Text>
            <Checkbox label="Stable" checked={channel == "stable"} value="stable" onCheck={() => setChannel("stable")}/>
            <Checkbox label="Production" checked={channel == "production"} value="production" onCheck={() => setChannel("production")}/>
            <Button primary text={"check update now"} onPress={checkUpdateNow}/>
            <View style={{flex: 1}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});

export default UpdateScreen;
