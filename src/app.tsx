import React, {useEffect} from 'react'
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {HomeScreen} from "./containers/HomeScreen";
import {MainScreen} from "./containers/MainScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {MyWebView} from "./components/MyWebView";
// import Conversation from "./containers/Conversation";
import LoginScreen from "./containers/LoginScreen";
import codePush, {CodePushOptions, DownloadProgress, SyncStatus} from "react-native-code-push";
import {Icon} from "react-native-material-ui";
import UpdateScreen from "./containers/UpdateScreen";
import DevelopScreen from "./containers/DevelopScreen";
import TestAdScreen from "./containers/TestAdContainer";
import WelcomeScreen from "./containers/WelcomeScreen";

if (__DEV__) {
    import('./supports/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


export function App() {

    return (
        <ScrollableTabView
            tabBarPosition="bottom"
        >
            {/*<HomeScreenStack tabLabel="首页"/>*/}
            {/*<MainScreen tabLabel="远景"/>*/}
            {/*<MoreScreen tabLabel="更多"/>*/}
        </ScrollableTabView>
    );
}

let tabConfig = {
    Home: HomeScreen,
    // Chat: Conversation,
    More: MainScreen,
    Develop: DevelopScreen,
};
const TabNavigator = createBottomTabNavigator(tabConfig, {
    initialRouteName: "Home",
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName = "question";
            let iconSet = "FontAwesome";
            switch (routeName) {
                case 'Home':
                    iconName = `home`;
                    break;
                case 'More':
                    iconName = `star-o`;
                    break;
                case "Update":
                    iconSet = "MaterialIcons";
                    iconName = "system-update";
                    break;
                case "Develop":
                    iconName = "tool";
                    break;
                case "Chat":
                    iconSet = "MaterialIcons";
                    iconName = "chat";
            }

            // You can return any component that you like here!
            return <Icon iconSet={iconSet} name={iconName} size={25} color={tintColor || "gray"}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
    },
});
TabNavigator.navigationOptions = () => ({headerLeft: null});

const AppNavigator = createStackNavigator({
        Welcome: {screen: WelcomeScreen},
        Login: {screen: LoginScreen},
        Main: {screen: TabNavigator},
        MyWebView: {screen: MyWebView},
        TestAd: {screen: TestAdScreen},
        Update: {screen: UpdateScreen},
    },
    {
        initialRouteName: 'Welcome', // 默认登录页,
    }
);
//
// Push.setListener({
//     onPushNotificationReceived: function (pushNotification) {
//         let message = pushNotification.message || "";
//         let title = pushNotification.title || "";
//
//         if (message === null) {
//             // Android messages received in the background don't include a message. On Android, that fact can be used to
//             // check if the message was received in the background or foreground. For iOS the message is always present.
//             title = 'Android background';
//             message = '<empty>';
//         }
//
//         // Custom name/value pairs set in the App Center web portal are in customProperties
//         if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
//             message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
//         }
//
//         if (AppState.currentState === 'active') {
//             Alert.alert(title, message);
//         } else {
//             // Sometimes the push callback is received shortly before the app is fully active in the foreground.
//             // In this case you'll want to save off the notification info and wait until the app is fully shown
//             // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
//             // when the app is fully in the foreground.
//         }
//     }
// });
let navigationContainer = createAppContainer(AppNavigator);
// @ts-ignore
navigationContainer.codePushStatusDidChange = (status: SyncStatus) => {
    switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log("Checking for updates.");
            break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log("Downloading package.");
            break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
            console.log("Installing update.");
            break;
        case codePush.SyncStatus.UP_TO_DATE:
            console.log("Up-to-date.");
            break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
            console.log("Update installed.");
            break;
    }
};

// @ts-ignore
navigationContainer.codePushDownloadDidProgress = (progress: DownloadProgress) => {
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
};

// Interactive
let codePushOptions: CodePushOptions = {updateDialog: {}, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESTART};

// Silent sync everytime the app resumes
// let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME};
export default codePush(codePushOptions)(navigationContainer);

