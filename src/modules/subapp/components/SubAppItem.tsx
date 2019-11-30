import React from "react";
import {useNavigation} from "react-navigation-hooks";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-material-ui";
import {subAppService} from "../services";

export interface TApp {
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
    const {name, uri, icon_name, app} = props.data;
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                subAppService.recordOpen(app)
                navigate('MyWebView', {name: name, uri: uri, title: name});
            }}>
            <Icon name={icon_name || 'plug'} color=""/>
            <Text>{name}</Text>
        </TouchableOpacity>
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
export default AppItem;
