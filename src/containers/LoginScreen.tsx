import React, {useState} from 'react';
import {Button, Text, TextInput, View, Alert} from "react-native";
import {useNavigation} from "react-navigation-hooks";
import {authService} from "../modules/auth/services";

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {navigate} = useNavigation();
    const onLogin = async () => {
        const user = await authService.login(username, password);
        if (user != null) {
            navigate('Main', {})
        } else {
            Alert.alert("用户名或密码错误")
        }
    };
    return (
        <View>
            <Text>Username:</Text>
            <TextInput value={username} onChangeText={setUsername}/>
            <Text>Password:</Text>
            <TextInput value={password} onChangeText={setPassword}/>
            <Button title={"Login"} onPress={onLogin}/>
        </View>
    );
};

export default LoginScreen;
