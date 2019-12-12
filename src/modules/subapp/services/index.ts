import {TApp} from "../components/SubAppItem";
import R from "ramda";
import cache, {recentCache, subAppNetworkCache} from "./cache";

const uniq = R.uniqBy((it: TApp) => it.id);

class SubAppService {
    cache = cache;

    async getWorkAppList(refresh: Boolean = false): Promise<Array<TApp>> {
        let recentAppListTask = this.getRecentAppList();
        let hottestAppListTask = this.getHottestAppList();
        let recommendAppListTask = this.getRecommendAppList();
        let allAppListTask = this.getAllAppList(refresh);
        let recent = await recentAppListTask;
        console.log(`getWorkAppList:recent=${JSON.stringify(recent)}`);
        let hottest = await hottestAppListTask;
        let recommend = await recommendAppListTask;
        let all = await allAppListTask;
        return R.flatten([recent, hottest, recommend, all])
    }


    recent: TApp[] = [];

    async recordOpen(app: TApp) {
        this.recent.unshift(app);
        this.recent.slice(0, 4);
        this.recent = uniq(this.recent);
        await recentCache.set(this.recent);
        console.log(`recent:${JSON.stringify(this.recent)}`)
    }

    async getRecentAppList(): Promise<Array<TApp>> {
        if (!this.recent.length) {
            this.recent = await recentCache.get() || [];
        }
        return this.recent
    }

    hottest: [] = [];

    async getHottestAppList(): Promise<Array<TApp>> {
        return this.hottest.sort()
    }

    async getRecommendAppList(): Promise<Array<TApp>> {
        return []
    }

    async getAllAppList(refresh: Boolean = false): Promise<Array<TApp>> {
        if (refresh) {
            const apps = await subAppNetworkCache.get();
            if (apps != null) {
                await this.cache.set(apps);
                return apps;
            }
        }
        return await this.cache.get() || [];
    }
}

export const subAppService = new SubAppService();
