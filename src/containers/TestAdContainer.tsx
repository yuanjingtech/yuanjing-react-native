import React, {useEffect} from 'react';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'
import {Platform, View} from "react-native";
import {Button} from "react-native-material-ui";

function TestAdContainer() {
    const showInterstitialAd = async () => {
        try { // Display an interstitial
            let id = 'ca-app-pub-2225047970234229/5852445331';
            if (Platform.OS === 'ios') {
                id = "ca-app-pub-2225047970234229/9971298524";
            }
            AdMobInterstitial.setAdUnitID(id);
            AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            console.log(`TestAdContainer:start request ad unitID=${id}`);
            try {
                await AdMobInterstitial.requestAd();
            } catch (e) {
                console.log(e)
            }
            AdMobInterstitial.showAd();
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        const run = async () => {
            AdMobRewarded.addEventListener('rewarded', async (reward: { type: String, amount: Number }) => {
                    console.log('AdMobRewarded => rewarded', reward);
                    // await adService.remove();
                    // await setShow(false)
                }
            );
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
        return () => AdMobRewarded.removeAllListeners()
    }, []);

    const showRewardedAd = () => {
        // Display a rewarded ad
        let unitId = 'ca-app-pub-2225047970234229/8986354067';
        if (Platform.OS === 'ios') {
            unitId = 'ca-app-pub-2225047970234229/8763348004'
        }
        AdMobRewarded.setAdUnitID(unitId);
        AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
    };

    return (
        <View>
            <AdMobBanner
                adSize="fullBanner"
                adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-2225047970234229/6604067104' : 'ca-app-pub-2225047970234229/5217111042'}
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={(error: any) => console.log(error)}
            />
            <Button text={"显示插页广告"} onPress={() => showInterstitialAd()}/>
            <Button text={"显示激励广告"} onPress={showRewardedAd}/>
        </View>
    );
}

export default TestAdContainer;
