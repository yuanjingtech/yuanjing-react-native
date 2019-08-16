import React from 'react';
import {Button as MButton, TextStyle, ViewStyle} from 'react-native-material-ui';

interface ButtonProps {
    title: string;
    onPress?(): void;
}

const Button = (props: ButtonProps) => {
    const {title, onPress} = props;
    return (
        <MButton text={title} onPress={onPress}/>
    );
};

export default Button;
