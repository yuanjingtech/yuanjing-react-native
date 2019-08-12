import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MyWebView} from "../components/MyWebView";
import {useNavigation} from "react-navigation-hooks";
import {Icon} from 'react-native-material-ui';

interface TApp {
    name: string,
    uri: string,
    icon_name?: string,
}

export interface Props {
    data?: any;
}

const AppItem = (props: Props) => {
    const {navigate} = useNavigation();
    const {name, uri, icon_name} = props.data;
    return (
        <TouchableOpacity
            style={{padding: 15}}
            onPress={() => {
                navigate('MyWebView', {name: name, uri: uri}, {title: name});
            }}>
            <Icon name={icon_name || 'extension'} color=""/>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
};

export const HomeScreen = () => {
    const [apps] = useState<TApp[]>(() => {
        return [
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
            },
            {
                name: '优惠',
                uri: 'http://youhui.yuanjingtech.com/'
            },
            {
                name: "更多",
                uri: "http://www.yuanjingtech.com/more.html"
            }
        ]
    });
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            {apps.map((v: TApp) => <AppItem key={`${v.name}`} data={{name: v.name, uri: v.uri, icon_name: v.icon_name}}/>)}
        </View>
    );
};


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
