import React, {Component} from 'react'
import {
    TouchableOpacity,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
import {Icon, Card, Button} from 'react-native-material-design';
import {
    StackNavigator,
} from 'react-navigation';
import {MyWebView} from "../components/MyWebView";

type TApp = {
    name: string,
    uri: string,
    icon_name: string,
}

class AppItem extends Component {
    render() {
        const {navigation} = this.props;
        const {name, uri, icon_name} = this.props.data;
        return (
            <TouchableOpacity
                style={{padding: 15}}
                onPress={() => {
                    navigation.navigate('MyWebView', {name: name, uri: uri}, {title: name});
                }}>
                <Icon name={icon_name || 'extension'} color=""/>
                <Text>{name}</Text>
            </TouchableOpacity>
        );
    }
}

export class HomeScreen extends Component {
    static navigationOptions = {
        title: '首页',
    };

    constructor(props) {
        super(props);
        this.state = {
            apps: [
                {
                    name: 'Demo',
                    uri: 'http://www.baidu.com',
                },
                {
                    name: '笑话',
                    uri: 'http://joke.yuanjingtech.com',
                },
                {
                    name: '远景',
                    uri: 'http://www.yuanjingtech.com',
                },
                {
                    name: '导航',
                    uri: 'http://daohang.binbinsoft.com/'
                }
            ]
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                {this.state.apps.map(v =>
                    <AppItem
                        key={`${v.name}`}
                        navigation={navigation}
                        data={{name: v.name, uri: v.uri, icon_name: v.icon_name}}/>
                )}
            </View>
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
