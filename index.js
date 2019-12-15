/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import React from 'react';
// import {wechat_app_init} from "./src/modules/wechat";
import {COLOR, getTheme, ThemeContext} from 'react-native-material-ui';
import {MyApolloProvider} from './src/apollo';
import analytics from '@react-native-firebase/analytics';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
    iconSet: 'FontAwesome',
};

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}

const Index = () => (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
        <MyApolloProvider>
            <App onNavigationStateChange={(prevState, currentState, action) => {
                const currentRouteName = getActiveRouteName(currentState);
                const previousRouteName = getActiveRouteName(prevState);

                if (previousRouteName !== currentRouteName) {
                    // The line below uses the @react-native-firebase/analytics tracker
                    // change the tracker here to use other Mobile analytics SDK.
                    analytics().setCurrentScreen(currentRouteName, currentRouteName);
                }
            }}/>
        </MyApolloProvider>
    </ThemeContext.Provider>
);

AppRegistry.registerComponent(appName, () => Index);
