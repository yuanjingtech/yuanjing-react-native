import gql from "graphql-tag";
import {Cache, ComposeCache} from "../../../../common/cache";
import {TApp} from "../../components/SubAppItem";
import {client} from "../../../../apollo";
import AsyncStorage from "@react-native-community/async-storage";

export class SubAppNetworkCache implements Cache<Array<TApp>> {
    async set(value: Array<TApp>): Promise<void> {
        console.log(`SubAppNetworkCache:set`);
    }

    async get(): Promise<Array<TApp> | null> {
        console.log(`SubAppNetworkCache:set`);
        try {
            const {data} = await client.query({
                query: gql`{
                    viewer{
                        subappconnection(page:{last:10}){
                            edges{
                                node{
                                    id
                                    name
                                    uri:url
                                    icon_name
                                }
                            }
                        }
                    }
                }`
            });
            console.log(`data:${JSON.stringify(data)}`);
            return data.viewer.subappconnection.edges.map((e: { node: any }) => e.node).filter((e: { name: any }) => e.name && e.name != '' && e.name != " " && e.name != null)
        } catch (e) {
            console.error(e);
            console.log(e.message, e);
            return [];
        }
    }
}

export class SubAppStorageCache implements Cache<Array<TApp>> {
    async set(value: Array<TApp>): Promise<void> {
        console.log(`SubAppStorageCache:set`);
        await AsyncStorage.setItem("@subapplist", JSON.stringify(value));
    }

    async get(): Promise<Array<TApp> | null> {
        console.log(`SubAppStorageCache:get`);
        try {
            let json = await AsyncStorage.getItem("@subapplist");
            if (json == null) {
                return null
            }
            return JSON.parse(json);
        } catch (e) {
            console.log(e);
            return null
        }
    }
}

export const subAppNetworkCache = new SubAppNetworkCache();
const cache = new ComposeCache(new SubAppStorageCache(), subAppNetworkCache);

class StorageCache implements Cache<Array<TApp>> {
    protected key: string;

    constructor(key: string) {
        this.key = key
    }

    async set(value: Array<TApp>): Promise<void> {
        console.log(`StorageCache:set`);
        await AsyncStorage.setItem(this.key, JSON.stringify(value));
    }

    async get(): Promise<Array<TApp> | null> {
        console.log(`StorageCache:get`);
        try {
            let json = await AsyncStorage.getItem(this.key);
            if (json == null) {
                return null
            }
            return JSON.parse(json);
        } catch (e) {
            console.log(e);
            return null
        }
    }
}

class SubAppRecentStorageCache extends StorageCache {
    constructor() {
        super("@subapp_recent_list");
    }
}

export const recentCache = new SubAppRecentStorageCache();
export default cache;
