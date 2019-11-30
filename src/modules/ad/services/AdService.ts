import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";

let ad_show_time = Date.now();

export class AdService {
    async needShow() {
        const time = await this.getData();
        console.log(`next show time:${time},${moment(time).toLocaleString()}`);
        return moment(time) <= moment();
    }

    /**移除广告一段时间,默认30分钟*/
    async remove() {
        let time = moment(Date.now()).add(30, 'm').toDate().getTime();
        console.log(`remove: time=${time}`);
        await this.storeData(time);
        await this.needShow()
    }

    async storeData(time: number) {
        try {
            if (!AsyncStorage) {
                ad_show_time = time;
            }
            await AsyncStorage.setItem('@ad_show_time', time.toString())
        } catch (e) {
            // saving error
        }
    };

    async getData(): Promise<number> {
        try {
            if (!AsyncStorage) {
                return ad_show_time
            }
            const value = await AsyncStorage.getItem('@ad_show_time');
            if (value !== null) {
                // value previously stored
                return moment(parseInt(value)).toDate().getTime()
            } else {
                return Date.now()
            }
        } catch (e) {
            // error reading value
            return Date.now()
        }
    };
}

