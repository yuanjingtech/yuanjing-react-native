import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MyWebView} from "../components/MyWebView";
import {useNavigation} from "react-navigation-hooks";
import {Icon} from 'react-native-material-ui';
import MyAdBanner from "../components/MyAdBanner";
import {subAppService} from "../modules/subapp/services";

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
                navigate('MyWebView', {name: name, uri: uri, title: name});
            }}>
            <Icon name={icon_name || 'plug'} color=""/>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
};

export const HomeScreen = () => {
    const [apps, setApps] = useState<TApp[]>(() => {
        return []
    });
    useEffect(() => {
        const run = async () => {
            const apps = await subAppService.getAppList();
            setApps(apps);
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return (

        <View style={styles.main_container}>
            <MyAdBanner/>
            <View style={styles.container}>
                {apps.map((v: TApp) => <AppItem key={`${v.id}`} data={{name: v.name, uri: v.uri, icon_name: v.icon_name}}/>)}
                <View style={{flex: 1}}></View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
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

