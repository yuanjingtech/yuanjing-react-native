class SubAppService {
    async getAppList() {
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
        ]
    }
}

export const subAppService = new SubAppService();
