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
            await AsyncStorage.setItem("@authorization", authorization);
            let user = {username, authorization};
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
        eventEmitter.emit("auth", {action: 'logout'});
    }

    async isLogin() {
        const authorization = await this.getAuthorization();
        return !authorization && authorization != '';
    }

    async getAuthorization() {
        return await AsyncStorage.getItem('@authorization');
    }
}
