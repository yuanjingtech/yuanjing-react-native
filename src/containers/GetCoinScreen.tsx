import React from 'react';
import {View} from "react-native";
import CoinViewRewardAd from "../modules/coin/containers/CoinViewRewardAd";
import {Button} from "react-native-material-ui";
import {useNavigation} from "@react-navigation/native";


const GetCoinScreen = () => {
    const {navigate} = useNavigation();
    return (
        <View>
            <CoinViewRewardAd/>
            <Button text={"领红包"} onPress={() => navigate("MyWebView", {uri: "https://s.click.taobao.com/boQJssv"})}/>
        </View>
    );
};

export default GetCoinScreen;
