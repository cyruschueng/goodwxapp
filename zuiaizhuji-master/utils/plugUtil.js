import requestUtil from './requestUtil';
import { duoguan_host_api_url as API_HOST } from './data';
import _ from './underscore';

/**
 * 制作一个对象
 */
function makeObjectData(name, data) {
    const info = {};
    info[name] = data;
    return info;
}

/**
 * 设置Page data 中的值
 */
function onSetValueTap(e) {
    const dataset = e.currentTarget.dataset, isMulti = dataset.isMulti || false, index = dataset.index;
    if (isMulti) {
        const data = JSON.parse(dataset.value);
        for (let x in data) {
            if (index !== undefined) {
                this.data[x][index] = Object.assign(this.data[x][index] || {}, data[x]);
                data[x] = this.data[x];
            } else {
                data[x] = Object.assign(this.data[x] || {}, data[x]);
            }
        }
        this.setData(data);
        return data;
    } else {
        const name = dataset.name, value = dataset.value;
        const data = makeObjectData(name, value);
        this.setData(data);
        return data;
    }
}

/**
 * 跳转页面
 */
function onNavigateTap(e) {
    const dataset = e.detail.target ? e.detail.target.dataset : e.currentTarget.dataset;
    const url = dataset.url, type = dataset.type, nav = { url: url };
    if (dataset.invalid) return;

    if (e.detail.formId) requestUtil.pushFormId(e.detail.formId);
    if ("switch" == type) {
        nav.fail = function () {
            wx.navigateTo({ url: url });
        };
        wx.switchTab(nav);
    } else {
        wx.navigateTo(nav);
    }
}

export default class PlugUtils {

    /**
     * 弹出层
     * @param {Object} pageObj Page 对象
     * @param {string} moduleName 模块的名称
     * @param {string} name setData 名称
     */
    static popup(pageObj, moduleName = '', name = "ad_popup") {
        let timerId = 0;
        const onNewSetValueTap = onSetValueTap.bind(pageObj);
        pageObj.onPlugSetValueTap = pageObj.onPlugSetValueTap || function (e) {
            const data = onNewSetValueTap(e);
            if (data[name]) clearTimeout(timerId);
        };
        pageObj.onPlugNavigateTap = pageObj.onPlugNavigateTap || onNavigateTap.bind(pageObj);

        const url = API_HOST + '/index.php/addon/DuoguanUser/ApiMarketing/getMarketConfig.html';
        requestUtil.get(url, { module_name: moduleName }, (data) => {
            let orgPopupData = pageObj.data[name];
            if (orgPopupData && orgPopupData.length && orgPopupData[0].min) {
                _.each(data, item => { item.min = true });
                pageObj.setData(makeObjectData(name, data));
            } else {
                pageObj.setData(makeObjectData(name, data));
                timerId = setTimeout(() => {
                    _.each(data, item => { item.min = true });
                    pageObj.setData(makeObjectData(name, data));
                }, 10000);
            }
        }, this, {
                error: (code) => {
                    if (code == -100) {
                        clearTimeout(timerId);
                        pageObj.setData(makeObjectData(name, null));
                        return false;
                    }
                }
            });
    }

    /**
     * 分享接口
     */
    static share() {
        const url = API_HOST + '/index.php/addon/MarketingLuckDraw/ApiShare/shareSetData';
        requestUtil.get(url, {}, (info) => {
            pageObj.setData(makeObjectData(name, info));
        });
    }

}