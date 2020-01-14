import React from 'react';
import {View} from "react-native";
import CoinViewRewardAd from "../modules/coin/containers/CoinViewRewardAd";
import {Button} from "react-native-material-ui";
import {useNavigation} from "@react-navigation/native";
import MyAdBannerWithReward from "../components/MyAdBanner";
import {createStackNavigator} from "@react-navigation/stack";
import {useTheme} from "react-native-paper";


const GetCoinScreen = () => {
    const {navigate} = useNavigation();
    return (
        <View style={{flex: 1}}>
            <MyAdBannerWithReward/>
            <CoinViewRewardAd/>
            <Button text={"领红包"} onPress={() => navigate("MyWebView", {uri: "https://s.click.taobao.com/boQJssv"})}/>
        </View>
    );
};
const Stack = createStackNavigator();
const GetCoinTabContainer = () => {
    const {navigate} = useNavigation();
    const theme = useTheme();
    return <Stack.Navigator initialRouteName="GetCoin">
        <Stack.Screen
            name="GetCoin"
            component={GetCoinScreen}
            options={{
                title: "金币任务",
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
export default GetCoinTabContainer;
