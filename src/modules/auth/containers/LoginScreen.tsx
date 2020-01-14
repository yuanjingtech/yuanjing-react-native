import React, {useRef, useState} from 'react';
import {View, Alert, SafeAreaView, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {authService} from "../services";
import {Button, Card, Surface, TextInput} from "react-native-paper";
import Loader from "../../../components/Loader";

const LoginScreen = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {navigate} = useNavigation();
    const passwordEl = useRef(null);
    const onLogin = async () => {
        setLoading(true);
        const user = await authService.login(username, password);
        setLoading(false);
        if (user != null) {
            navigate('Main', {})
        } else {
            Alert.alert("用户名或密码错误")
        }
    };
    let onUsernameComplete = () => {
        let current: any = passwordEl.current;
        if (current != null) {
            return current.focus();
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Loader loading={loading}/>
            <Card>
                <Card.Title title="登录"/>
                {/*<Card.Cover source={{uri: 'https://picsum.photos/700'}}/>*/}
                <Card.Content>
                    <TextInput label={"用户名"} value={username} autoCapitalize={'none'} autoFocus={true} autoCompleteType={'username'} enablesReturnKeyAutomatically={false} returnKeyType={'next'} onSubmitEditing={onUsernameComplete} onChangeText={setUsername}/>
                    <TextInput ref={passwordEl} label={"密码"} value={password} autoCompleteType={'password'} returnKeyType={'go'} secureTextEntry onSubmitEditing={onLogin} onChangeText={setPassword}/>
                </Card.Content>
                <Card.Actions style={{justifyContent: 'space-around'}}>
                    <Button mode={"contained"} style={{flex: 1}} onPress={onLogin}>登录</Button>
                </Card.Actions>
            </Card>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
});
export default LoginScreen;
