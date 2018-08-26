import config from '../config';
import api from './api'
// let api = config.api;
/**
 * 获取测试列表数据
 */
let getTestList = (classId = 'all') => {
    console.log('getlist', api.getTestList(classId))
    return wx.pro.request({
        url: api.getTestList(classId)
    })
}

let getBannerList = () =>{
    return wx.pro.request({
        url: api.getBannerList()
    })
}

export {
    getTestList,
    getBannerList
}