import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from "react-native";
import AppItem, {TApp} from "../components/SubAppItem";
import {subAppService} from "../services";

const SubAppList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [apps, setApps] = useState<TApp[]>(() => {
        return []
    });
    let fetch = async () => {
        setRefreshing(true);
        const apps = await subAppService.getWorkAppList();
        console.log(`fetch app`);
        setApps(apps);
        setRefreshing(false);
    };
    let refresh = async () => {
        setRefreshing(true);
        const apps = await subAppService.getWorkAppList(true);
        console.log(`refresh app`);
        setApps(apps);
        setRefreshing(false);
    };
    useEffect(() => {
        const run = fetch;
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return (<FlatList
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
            />
        }
        style={{flex: 1, width: '100%'}}
        data={apps}
        renderItem={({item}) => <AppItem key={`${item.id}`} data={{name: item.name, uri: item.uri, icon_name: item.icon_name, app: item}} onPress={fetch}/>}
        numColumns={4}
        keyExtractor={(item, index) => item.id.toString()}/>);
};

export default SubAppList;
