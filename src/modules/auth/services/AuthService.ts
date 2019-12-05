import {client} from "../../../apollo";
import gql from "graphql-tag";
import AsyncStorage from '@react-native-community/async-storage';

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
            return {username, authorization}
        } catch (e) {
            console.error(e);
            console.log(e.message, e);
            return null;
        }
    }
}
