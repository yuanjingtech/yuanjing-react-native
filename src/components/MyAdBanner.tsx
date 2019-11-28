import React from 'react';
import {Platform} from "react-native";
import {AdMobBanner,} from 'react-native-admob'

const MyAdBanner = () => <AdMobBanner
    adSize="fullBanner"
    adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-2225047970234229/6604067104' : 'ca-app-pub-2225047970234229/5217111042'}
    testDevices={[AdMobBanner.simulatorId]}
    onAdFailedToLoad={(error: any) => console.error(error)}
/>;

export default MyAdBanner;
