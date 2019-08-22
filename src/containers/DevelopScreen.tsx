import React from 'react';
import {Text, View} from "react-native";

const isHermes = () => global.HermesInternal != null;
const DevelopScreen = () => (
    <View><Text>Hermes:{isHermes() ? "true" : "false"}</Text></View>
);

export default DevelopScreen;
