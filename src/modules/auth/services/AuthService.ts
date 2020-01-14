import {client} from "../../../apollo";
import gql from "graphql-tag";
import AsyncStorage from '@react-native-community/async-storage';
import eventEmitter from "../../../common/eventEmitter";

export class AuthService {
    async login(username: String, password: String): Promise<any> {
        try {
            const {data, errors} = await client.mutate({
                mutation: gql`mutation auth($username:String!,$password:String!) {
                    auth{
                        createToken(username:$username,password:$password)
                    }
                }`,
                variables: {
                    username,
                    password
                }
            });
            console.log(`data:${JSON.stringify(data)}`);
            if (errors?.length) {
                throw new Error(`${errors}`)
            }
            const authorization = data.auth.createToken;
            if (!authorization || authorization == "") {
                throw new Error('用户名或密码错误')
            }
            await AsyncStorage.setItem("@authorization", authorization);
            let user = {username, authorization};
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            eventEmitter.emit("auth", {action: 'login'});
            return user
        } catch (e) {
            console.error(e);
            console.log(e.message, e);
            return null;
        }
    }

    async logout() {
        await AsyncStorage.removeItem("@authorization");
        await AsyncStorage.removeItem("@user");
        eventEmitter.emit("auth", {action: 'logout'});
    }

    async isLogin(): Promise<Boolean> {
        const authorization = await this.getAuthorization();
        return authorization != null && authorization != '';
    }

    async getAuthorization(): Promise<string | null> {
        return await AsyncStorage.getItem('@authorization');
    }

    async getUser(): Promise<any | null> {
        if (await this.isLogin()) {
            try {
                return JSON.parse(await AsyncStorage.getItem("@user") || "{}")
            } catch (e) {
                console.log(e);
                return null;
            }
        } else {
            return null;
        }
    }
}
