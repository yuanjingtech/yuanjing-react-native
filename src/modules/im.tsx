import {connect, init, ErrorCode} from "rongcloud-react-native-imlib";
import {PermissionsAndroid} from "react-native";

function onSuccess(userId: string) {
    console.log("连接成功：" + userId);
}

function onError(errorCode: number) {
    console.log("连接失败：" + errorCode);
}

function onTokenIncorrect() {
    console.log("Token 不正确或已过期");
}

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).catch(() => {
});
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).catch(() => {
});

export function app_init() {
    init("8luwapkvu3bbl");
    var token = "Wx0JkqLRapaDy9CI9zLZmWxKkg0R6ECBtYKPP88Lk+UjHHW+GbSQa29JawIEXn6E8ayV5725PjHxGc5vlNy/4Q==";
    connect(token, onSuccess, onError, onTokenIncorrect);
}
