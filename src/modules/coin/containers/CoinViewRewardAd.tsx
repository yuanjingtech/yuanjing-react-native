import React, {useEffect, useState} from 'react';
import {Platform} from "react-native";
import {AdMobRewarded,} from 'react-native-admob'
import {Button} from "react-native-material-ui";

function log(message?: any, ...optionalParams: any[]): void {
    console.log(`CoinViewRewardAd:${message}`, optionalParams)
}

const CoinViewRewardAd = () => {
    const [disable, setDisable] = useState(true);
    const showRewardedAd = async () => {
        log(`showRewardedAd:begin`);
        AdMobRewarded.showAd();
    };
    useEffect(() => {
        const run = async () => {
            let unitId = 'ca-app-pub-2225047970234229/2146225928';
            if (Platform.OS === 'ios') {
                unitId = 'ca-app-pub-2225047970234229/2681396630'
            }
            AdMobRewarded.setAdUnitID(unitId);

            AdMobRewarded.addEventListener('rewarded', async (reward: { type: String, amount: Number }) => {
                    log('AdMobRewarded => rewarded', reward);
                    // await adService.remove();
                    // await setShow(false)
                }
            );
            try {
                await AdMobRewarded.requestAd();
                setDisable(false)
            } catch (e) {
                log(`${e.message}`)
            }
        };
        // noinspection JSIgnoredPromiseFromCall
        run();

        return () => AdMobRewarded.removeAllListeners()
    }, []);
    return (
        <Button disabled={disable} onPress={() => showRewardedAd()} text={"Get coin by view video"}/>
    );
};

export default CoinViewRewardAd;
