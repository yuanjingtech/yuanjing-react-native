import {TApp} from "../components/SubAppItem";
import R from "ramda";
import cache, {recentCache, StorageCache, subAppNetworkCache} from "./cache";

const uniq = R.uniqBy((it: TApp) => it.id);

interface IHottestItem {
    app: TApp;
    count: number;
}

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
        return R.flatten([recent.slice(0, 4), hottest.slice(0, 4), recommend.slice(0, 4), all])
    }


    recent: TApp[] = [];

    async recordOpen(app: TApp) {
        this.recent.unshift(app);
        this.recent.slice(0, 4);
        this.recent = uniq(this.recent);
        await recentCache.set(this.recent);
        console.log(`recent:${JSON.stringify(this.recent)}`);
        let find = this.hottest.find(e => e.app.id == app.id);
        if (!find) {
            find = {app: app, count: 0};
            this.hottest.push(find)
        }
        find.count++;
        this.hottest.slice(0, 4);
        await this.hottestCache.set(this.hottest)
    }

    async getRecentAppList(): Promise<Array<TApp>> {
        if (!this.recent.length) {
            this.recent = await recentCache.get() || [];
        }
        return this.recent
    }

    hottest: IHottestItem[] = [];
    hottestCache = new StorageCache<IHottestItem[]>("@subapp_hottest_list");

    async getHottestAppList(): Promise<Array<TApp>> {
        if (!this.hottest.length) {
            this.hottest = await this.hottestCache.get() || [];
        }
        let apps = this.hottest.sort((a, b) => a.count - b.count).reverse().map(it => it.app);
        console.log(`hottest:${JSON.stringify(apps)}`);
        return apps
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
