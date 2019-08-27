/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {app_init as im_init} from "./src/modules/im";
// import {wechat_app_init} from "./src/modules/wechat";
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';

type P = {}
type S = {}
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
class Index extends Component<P, S> {
    constructor(props) {
        super(props);
        im_init();
        // wechat_app_init();
    }

    render() {
        return (
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <App></App>
            </ThemeContext.Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => Index);
