/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {App} from "./src/containers/app";
import {HomeScreen} from "./src/containers/HomeScreen";

export default class yuanjing extends Component {
    render() {
        return (
            <HomeScreen/>
        );
    }
}

AppRegistry.registerComponent('yuanjing', () => yuanjing);
