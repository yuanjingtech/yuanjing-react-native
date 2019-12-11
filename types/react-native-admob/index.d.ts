declare module 'react-native-admob' {
    import * as React from "react";
    import {EventHandler} from "react";

    interface AdMobBannerProps {
        adSize: "banner" | "largeBanner" | "mediumRectangle" | "fullBanner" | "leaderboard" | "smartBannerPortrait" | "smartBannerLandscape"
        adUnitID: string
        testDevices: any[]
        onAdFailedToLoad: (error: any) => void
    }

    class AdMobBanner extends React.Component<AdMobBannerProps, any> {
        static simulatorId: string
    }


    class AdMobInterstitial {
        static simulatorId: string;
        static setAdUnitID: (id: string) => void;
        static setTestDevices: (anies: any[]) => void;
        static requestAd: () => void;
        static showAd: () => void;
    }

    class PublisherBanner {
        static simulatorId: string;

    }

    class AdMobRewarded {
        static removeAllListeners: () => void;
        static setAdUnitID: (unitId: string) => void;
        static simulatorId: string;
        static requestAd: () => Promise<any>;
        static showAd: () => void;
        static addEventListener: (event: string, handler: (reward: { type: string, amount: number }) => (void | Promise<void>)) => void;
    }
}

