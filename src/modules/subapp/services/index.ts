import {TApp} from "../components/SubAppItem";
import R from "ramda";

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
        return [
            {
                id: 0,
                name: 'Demo',
                uri: 'http://www.baidu.com',
            },
            {
                id: 1,
                name: '笑话',
                uri: 'http://joke.yuanjingtech.com',
                icon_name: "smile-o"
            },
            {
                id: 2,
                name: '远景',
                uri: 'http://www.yuanjingtech.com',
                icon_name: 'star-o'
            },
            {
                id: 3,
                name: '导航',
                uri: 'http://daohang.binbinsoft.com/',
                icon_name: 'internet-explorer'
            },
            {
                id: 4,
                name: '优惠',
                uri: 'http://youhui.yuanjingtech.com/',
                icon_name: "tags"
            },
            {
                id: 5,
                name: "更多",
                uri: "http://www.yuanjingtech.com/more.html",
                icon_name: "bars"
            },
            {
                id: 6,
                name: "来阅读",
                uri: "https://xread-web.now.sh/",
                icon_name: "bars"
            },
            {
                id: 7,
                name: '笑话2',
                uri: 'http://joke2.yuanjingtech.com',
                icon_name: "smile-o"
            },
            {
                id: 8,
                name: '博客',
                uri: 'https://lotosbin.github.io/',
                icon_name: "smile-o"
            },
            {
                id: 9,
                name: 'V2EX',
                uri: 'https://www.v2ex.com/?r=lotosbin',
                icon_name: "smile-o"
            },
            {
                id: 10,
                name: '毒鸡汤',
                uri: 'https://lab.lalkk.com/fun/du/',
                icon_name: "smile-o"
            },
        ]
    }
}

export const subAppService = new SubAppService();
