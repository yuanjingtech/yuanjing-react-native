import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MyWebView} from "../components/MyWebView";
import {useNavigation} from "react-navigation-hooks";
import {Icon} from 'react-native-material-ui';

interface TApp {
    id: any,
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
            style={styles.item}
            onPress={() => {
                navigate('MyWebView', {name: name, uri: uri}, {title: name});
            }}>
            <Icon name={icon_name || 'plug'} color=""/>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
};

export const HomeScreen = () => {
    const [apps] = useState<TApp[]>(() => {
        return [
            {
                id: 0,
                name: 'Demo',
                uri: 'http://www.baidu.com',
            },
            {
                id: 1,
                name: '笑话',
                uri: 'http://joke.yuanjingtech.com',
                icon_name: "smile-o"
            },
            {
                id: 2,
                name: '远景',
                uri: 'http://www.yuanjingtech.com',
                icon_name: 'star-o'
            },
            {
                id: 3,
                name: '导航',
                uri: 'http://daohang.binbinsoft.com/',
                icon_name: 'internet-explorer'
            },
            {
                id: 4,
                name: '优惠',
                uri: 'http://youhui.yuanjingtech.com/',
                icon_name: "tags"
            },
            {
                id: 5,
                name: "更多",
                uri: "http://www.yuanjingtech.com/more.html",
                icon_name: "bars"
            },
        ]
    });
    return (
        <View style={styles.container}>
            {apps.map((v: TApp) => <AppItem key={`${v.id}`} data={{name: v.name, uri: v.uri, icon_name: v.icon_name}}/>)}
            <View style={{flex: 1}}></View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    item: {
        margin: 5,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

