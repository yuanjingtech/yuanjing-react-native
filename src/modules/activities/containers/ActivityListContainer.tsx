import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, Text} from "react-native";
import Activity from "../components/Activity";
import activityService from "../services/ActivityService";
import ActivityCreateContainer from "./ActivityCreateContainer";
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import MyAdBannerWithReward from "../../../components/MyAdBanner";
import {Button, useTheme} from "react-native-paper";
import {authService} from "../../auth/services";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERY = gql`{
    viewer{
        activityrecordconnection(page:{last:10},orderBy:id_desc){
            edges{
                node{
                    id
                    type
                    title
                    code
                    url
                }
            }
        }
    }
}`
const ActivityListContainer = () => {
    const {loading, error, data, refetch} = useQuery(QUERY, {
        variables: {language: 'english'},
    });
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        refetch();
    }, []);
    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>{`Error! ${error.message}`}</Text>;
    return (<>
        <MyAdBannerWithReward/>
        <FlatList
            data={data.viewer.activityrecordconnection.edges.map((it: { node: any; }) => it.node)}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={refetch}
                />
            }
            style={{flex: 1, width: '100%'}}
            renderItem={({item}: any) => (
                <Activity
                    key={item.id}
                    data={item}
                />
            )}
            keyExtractor={(item: any) => item.id.toString()}
        />
    </>);
};
const Stack = createStackNavigator();
const ActivityListTabContainer = () => {
    const {navigate} = useNavigation();
    const theme = useTheme();
    let onPressCreate = async () => {
        if (await authService.isLogin())
            return navigate('ActivityCreate');
        else {
            return navigate('Login')
        }
    };
    return <Stack.Navigator initialRouteName="ActivityList"
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: theme.colors.primary,
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                }
                            }}>
        <Stack.Screen
            name="ActivityList"
            component={ActivityListContainer}
            options={{
                title: "活动广场",
                headerRight: () => <Button mode={'text'} color={'#fff'} dark={true} onPress={onPressCreate}>添加</Button>
            }}
        />
        <Stack.Screen name="ActivityCreate" component={ActivityCreateContainer} options={{title: '创建活动'}}/>
    </Stack.Navigator>;
};
export default ActivityListTabContainer;
