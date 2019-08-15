import Push from 'appcenter-push';
import React, {Component} from 'react'
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {HomeScreen} from "./containers/HomeScreen";
import {MainScreen} from "./containers/MainScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {MyWebView} from "./components/MyWebView";
// import Conversation from "./containers/Conversation";
import LoginScreen from "./containers/LoginScreen";
import codePush from "react-native-code-push";
import {Alert, AppState} from "react-native";
export class App extends Component {
    render() {
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
}

let tabConfig = {
    Home: HomeScreen,
    // Chat: Conversation,
    Main: MainScreen,
};
const TabNavigator = createBottomTabNavigator(tabConfig);
TabNavigator.navigationOptions = () => ({headerLeft: null});

const AppNavigator = createStackNavigator({
        Login: {screen: LoginScreen},
        Main: {screen: TabNavigator},
        MyWebView: {screen: MyWebView},
    },
    {
        initialRouteName: 'Main', // 默认登录页
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
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
export default codePush(codePushOptions)(createAppContainer(AppNavigator));

