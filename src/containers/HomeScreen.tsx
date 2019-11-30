import React, {useEffect, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import MyAdBanner from "../components/MyAdBanner";
import {subAppService} from "../modules/subapp/services";
import AppItem, {TApp} from "../modules/subapp/components/SubAppItem";


export const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [apps, setApps] = useState<TApp[]>(() => {
        return []
    });
    let refresh = async () => {
        setRefreshing(true);
        const apps = await subAppService.getWorkAppList();
        console.log(`refresh app:${JSON.stringify(apps)}`);
        setApps(apps);
        setRefreshing(false);
    };
    useEffect(() => {
        const run = refresh;
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    return (
        <View style={styles.main_container}>
            <MyAdBanner/>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                }
                style={{flex: 1}}
                contentContainerStyle={{flex: 1, flexGrow: 1}}
                data={apps}
                renderItem={({item}) => <AppItem key={`${item.id}`} data={{name: item.name, uri: item.uri, icon_name: item.icon_name, app: item}}/>}
                numColumns={5}
                keyExtractor={(item, index) => item.id.toString()}/>
        </View>
    );
};


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        width: '100%',
        flex: 1,
    },
    item: {
        margin: 5,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

