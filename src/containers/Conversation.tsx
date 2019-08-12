import React, {useEffect, useState} from 'react';
import {sendMessage, ConversationType, ObjectName} from "rongcloud-react-native-imlib";
import {Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {addReceiveMessageListener} from "rongcloud-react-native-imlib";
import {ScrollView, RefreshControl} from 'react-native';
import {getHistoryMessages} from "rongcloud-react-native-imlib";
import {ReceiveMessage} from "rongcloud-react-native-imlib/lib/js";

const Conversation = () => {
    const [content, setContent] = useState();
    const [messages, setMessages] = useState<ReceiveMessage[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        let listener: any;
        const run = async () => {
            listener = addReceiveMessageListener(message => {
                console.log(message);
                setMessages(messages.concat([message]))
            });
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
        return () => {
        }
    }, []);
    const onRefresh = async () => {
        setRefreshing(true);
        const conversationType = ConversationType.PRIVATE;
        const targetId = "lotosbin"; // 根据会话类型的不同，可以是用户 ID、讨论组 ID、组群 ID 等
        const messages = await getHistoryMessages(conversationType, targetId);
        console.dir(messages);
        setMessages(messages);
        setRefreshing(false);
    };
    useEffect(() => {
        const run = async () => {
            await onRefresh()
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
    }, []);
    const onSend = () => {
        const conversationType = ConversationType.PRIVATE;
        const targetId = "lotosbin"; // 根据会话类型的不同，可以是用户 ID、讨论组 ID、组群 ID 等
        const callback = {
            success(messageId: string) {
                // Alert.alert("发送成功：" + messageId);
                onRefresh()
            },
            error(errorCode: number) {
                Alert.alert("发送失败：" + errorCode);
            }
        };
        sendMessage({conversationType, targetId, content: {objectName: ObjectName.Text, content: content}}, callback);
    };
    return (
        <View classname={styles.container}>
            {/*{messages.map(message => (<View><Text>{message.id}</Text></View>))}*/}
            {/*<ScrollView style={styles.messages}*/}
            {/*            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>*/}
            {/*            }>*/}
            {/*    {messages.map(({id}) => (<View key={id}><Text>{id}</Text></View>))}*/}
            {/*</ScrollView>*/}
            <FlatList
                data={messages}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                renderItem={({item}) => <Text key={item.messageUId}>{item.content.content}</Text>}
            />
            <TextInput value={content} onChangeText={setContent}/><Button title={"send"} onPress={onSend}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messages: {
        flex: 1,
        height: 100,
    }
});

export default Conversation;
