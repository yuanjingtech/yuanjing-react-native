import React from 'react'
import {StyleSheet, View} from 'react-native';
import {WebView} from "react-native-webview";
import {createStackNavigator} from "@react-navigation/stack";
import {useTheme} from "react-native-paper";

export const MainScreen = () => {
    // const {navigate} = this.props.navigation;
    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            {/*<Button*/}
            {/*title="更多"*/}
            {/*onPress={() =>*/}
            {/*/!*navigate('More', {name: 'Jane'})*!/*/}
            {/*}*/}
            {/*/>*/}
            <WebView
                source={{uri: 'http://youhui.yuanjingtech.com'}}
                style={{flex: 1}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
const Stack = createStackNavigator();
const MainTabContainer = () => {
    const theme = useTheme();
    return <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
                title: "优惠",
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
export default MainTabContainer;
