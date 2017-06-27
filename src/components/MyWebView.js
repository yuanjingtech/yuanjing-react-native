import React, {Component} from 'react'
import {
    TouchableOpacity,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

export class MyWebView extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.name,
    });

    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        const {uri} = navigation.state.params;
        return (
            <WebView
                source={{uri: uri}}
                onNavigationStateChange={(navState) => {
                    if (navState.title) {
                        navigation.title = navState.title;
                    }
                }}>

            </WebView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
