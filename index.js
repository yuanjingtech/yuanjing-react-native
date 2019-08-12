/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import React, {Component} from 'react';
// import {app_init as im_init} from "./src/modules/im";
// import {wechat_app_init} from "./src/modules/wechat";

type P = {}
type S = {}

class Index extends Component<P, S> {
    constructor(props) {
        super(props);
        // im_init();
        // wechat_app_init();
    }

    render() {
        return (
            <App></App>
        );
    }
}

AppRegistry.registerComponent(appName, () => Index);
