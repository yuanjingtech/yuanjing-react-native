import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {useNavigation} from "react-navigation-hooks";

const LoginScreen = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {navigate} = useNavigation();
    const onLogin = () => {
        navigate('Main', {})
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
