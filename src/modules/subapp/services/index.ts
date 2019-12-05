import {TApp} from "../components/SubAppItem";
import R from "ramda";
import {client} from "../../../apollo"
import gql from "graphql-tag";

const uniq = R.uniqBy((it: TApp) => it.id);

class SubAppService {
    async getWorkAppList() {
        let recentAppListTask = this.getRecentAppList();
        let hottestAppListTask = this.getHottestAppList();
        let recommendAppListTask = this.getRecommendAppList();
        let allAppListTask = this.getAllAppList();
        let recent = await recentAppListTask;
        console.log(`getWorkAppList:recent=${JSON.stringify(recent)}`);
        let hottest = await hottestAppListTask;
        let recommend = await recommendAppListTask;
        let all = await allAppListTask;
        return uniq(R.flatten([recent, hottest, recommend, all]))
    }

    recent: TApp[] = [];

    async recordOpen(app: TApp) {
        this.recent.unshift(app);
        this.recent.slice(0, 5);
        this.recent = uniq(this.recent);
        console.log(`recent:${JSON.stringify(this.recent)}`)
    }

    async getRecentAppList() {
        return this.recent
    }

    hottest: [] = [];

    async getHottestAppList() {
        return this.hottest.sort()
    }

    async getRecommendAppList() {
        return []
    }

    async getAllAppList() {
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
            return data.viewer.subappconnection.edges.map((e: { node: any; }) => e.node);
        } catch (e) {
            console.error(e);
            console.log(e.message, e);
            return [];
        }
    }
}

export const subAppService = new SubAppService();
