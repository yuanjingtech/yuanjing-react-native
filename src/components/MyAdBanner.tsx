import React, {useEffect, useState} from 'react';
import {Platform, Text, View} from "react-native";
import {AdMobBanner, AdMobRewarded} from 'react-native-admob'
import {adService} from "../modules/ad/services";

const MyAdBanner = () => <AdMobBanner
    adSize="fullBanner"
    adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-2225047970234229/6604067104' : 'ca-app-pub-2225047970234229/5217111042'}
    testDevices={[AdMobBanner.simulatorId]}
    onAdFailedToLoad={(error: any) => console.error(error)}
/>;
const MyAdBannerWithReward = () => {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const run = async () => {
            let needShow = await adService.needShow();
            console.log(`needShow:${needShow}`);
            setShow(needShow)
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    const showRewardedAd = () => {
        // Display a rewarded ad
        let unitId = 'ca-app-pub-2225047970234229/8986354067';
        if (Platform.OS === 'ios') {
            unitId = 'ca-app-pub-2225047970234229/8763348004'
        }
        AdMobRewarded.setAdUnitID(unitId);
        AdMobRewarded.addEventListener('rewarded', async (reward: { type: String, amount: Number }) => {
                console.log('AdMobRewarded => rewarded', reward);
                await adService.remove();
                await setShow(false)
            }
        );
        AdMobRewarded.addEventListener('adLoaded', async (reward: any) => {
                console.log('AdMobRewarded => adLoaded', reward);
                // await setVisible(true)
            }
        );
        AdMobRewarded.requestAd().then(() => setVisible(true));
    };
    useEffect(() => {
        const run = async () => {
            showRewardedAd()
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
        return () => AdMobRewarded.removeAllListeners();
    }, []);
    return <>
        {show ? <View>
            <MyAdBanner/>
            {visible ? <Text style={{textAlign: "center", padding: 8, fontSize: 16}} onPress={() => AdMobRewarded.showAd()}>看视频免广告</Text> : null}
        </View> : null}
    </>;
};
export default MyAdBannerWithReward;
