import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MyAdBanner from "../components/MyAdBanner";
import SubAppList from "../modules/subapp/containers/SubAppList";
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from "react-native-paper";


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

const Stack = createStackNavigator();
const SubAppListTabContainer = () => {
    const theme = useTheme();
    return <Stack.Navigator initialRouteName="GetCoin">
        <Stack.Screen
            name="GetCoin"
            component={HomeScreen}
            options={{
                title: "应用列表",
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />
    </Stack.Navigator>
};
export default SubAppListTabContainer;
