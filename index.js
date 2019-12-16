/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {AppRegistry, StatusBar} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import React, {createContext, useEffect} from 'react';
// import {wechat_app_init} from "./src/modules/wechat";
import {COLOR, getTheme, ThemeContext} from 'react-native-material-ui';
import {MyApolloProvider} from './src/apollo';
import analytics from '@react-native-firebase/analytics';
import {DefaultTheme, DarkTheme, Provider as PaperProvider} from 'react-native-paper';

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

const Index = () => {
    const scheme = useColorScheme();
    let theme = scheme === 'dark' ? DarkTheme : DefaultTheme;
    useEffect(() => {
        const run = async () => {
            RNLocalize.addEventListener('change', () => {
                // do localization related stuff…

            });
            return () => RNLocalize.removeEventListener('change');
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return <ThemeContext.Provider value={getTheme(uiTheme)}>
        <MyApolloProvider>
            <AppearanceProvider>
                <StatusBar barStyle="light-content"/>
                <PaperProvider theme={theme}>
                    <App
                        theme={theme}
                        onNavigationStateChange={(prevState, currentState, action) => {
                            const currentRouteName = getActiveRouteName(currentState);
                            const previousRouteName = getActiveRouteName(prevState);

                            if (previousRouteName !== currentRouteName) {
                                // The line below uses the @react-native-firebase/analytics tracker
                                // change the tracker here to use other Mobile analytics SDK.
                                analytics().setCurrentScreen(currentRouteName, currentRouteName);
                            }
                        }}/>
                </PaperProvider>
            </AppearanceProvider>
        </MyApolloProvider>
    </ThemeContext.Provider>;
};

AppRegistry.registerComponent(appName, () => Index);
