import React, {useState} from 'react';
import {View, Text} from "react-native";
import activityService from "../services/ActivityService";
import {Button, TextInput, useTheme} from "react-native-paper";


const ActivityCreateContainer = () => {
    const [title, setTitle] = useState();
    const [code, setCode] = useState();
    const [url, setUrl] = useState();
    const onClickOk = async () => {
        await activityService.create({type: 'taokouling', title, code, url})
    };
    const theme = useTheme();
    return (
        <View>
            <TextInput label="标题" theme={theme} value={title} onChangeText={(text => setTitle(text))}/>
            <TextInput label="内容" multiline numberOfLines={5} value={code} onChangeText={(text => setCode(text))}/>
            <TextInput label="链接" value={url} onChangeText={(text => setUrl(text))}/>
            <Button mode="contained" onPress={() => onClickOk()} style={{margin: 8}}>确定</Button>
        </View>
    );
};

export default ActivityCreateContainer;
