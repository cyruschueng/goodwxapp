import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import {baseUrl, env, myBucket, apiUri, baseWebUrl} from './urlprovider'
var cosJs = require('../assets/js/cos-js-sdk-v4')

let base = baseUrl[env()]
base = '//shunde.vizen.cn/shunde/'
var interceptor = {
  success (res) {
    let isJudgeLogin = true
    if (res.request.responseURL.indexOf('islogon') !== -1) {
      isJudgeLogin = false
    }
    if ((res.data.code === -1 || res.data.code === '-1') && isJudgeLogin) {
      Message.warning({
        message: '未登录'
      })
      // 未登陆时，去登陆页面
      // location.href = baseWebUrl()
      location.href = baseWebUrl()
      return {
        msg: '请重新登录',
        code: -1
      }
    } else {
      if (res.data && res.data.code === '0') {
        res.data.code === 0
      }
      return res.data
    }
  },
  error (err) {
    /* 浏览器报跨域问题的时候，err.response === undefined */
    let msg = (err && err.response && err.response.data && err.response.data.msg) || '服务错误，请稍后重试'
    Message.error({
      message: msg
    })
    return err && err.response
  }
}
axios.defaults.baseURL = base
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
/* *
 * axios默认发送post请求方式为application/json
 * 若需要使用 application/x-www-form-urlencoded 格式发送
 * 需要把参数通过qs转成字符串
 * This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
 */
axios.defaults.transformRequest = [
  function (data) {
    var params = qs.stringify(data)
    return params
  }
]
// Add a response interceptor
axios.interceptors.response.use(interceptor.success, interceptor.error)
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
/* *
 * 实例化一个axios，用于上传接口，数据类型为formdata格式
 */
var instance = axios.create()
instance.defaults.transformRequest = [
  function (data) {
    return data
  }
]
instance.interceptors.response.use(interceptor.success, interceptor.error)

// 传入uri判断是否valid,默认true
const isUriPermission = (context, uri) => {
  if (context.$store.state.userPermissions.isValid) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(!!context.$store.state.userPermissions.uriPattern[uri])
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      context.$store.dispatch('fetchUserPermissions', context).then(() => {
        resolve(!!context.$store.state.userPermissions.uriPattern[uri])
        console.log(context.$store.state.userPermissions.uriPattern, uri)
      })
    })
  }
}

/* *
 * 添加vue全局插件api
 * 通过添加Vue实例方法，调用：vm.$api
 */
export default {
  install (Vue) {
    Vue.prototype.$api = {
      getBase () {
        return base
      },
      islogon () {
        return axios.post('user/islogon')
      },
      loginSave (context, callback) {
        context.$api.islogon().then(res => {
          if (res.code !== -1 && res.code !== '-1') {
            context.$api.getUserInfo().then(res => {
              if (res.code === 0) {
                context.$cookie.saveCookies(res.data, 2)
                context.$cookie.saveRoleId(res.data.roleId, res.data.userId)
                context.$store.commit('UPDATEUSERINFO', res.data)
                context.$store.state.userInfo.photo = './static/login/photo.png'
                if (res.data.roleId === 1) {
                  context.$store.state.userInfo.generalUser = false
                } else {
                  context.$store.state.userInfo.generalUser = true
                }
                if (typeof callback === 'function') callback.call(res)
              }
            })
            context.$api.getUserToken().then(res => {
              if (res.code === 0) {
                context.$store.commit('UPDATEUSERINFO', res.data)
              } else {
                // Message.warning({
                //   message: '请先登录'
                // })
                location.href = baseWebUrl()
              }
            })
            // context.$store.dispatch('fetchPoiList', context)
            // context.$store.dispatch('fetchUserPermissions', context)
          }
        })
      },
      getUserToken () {
        return axios.post('user/getLoginToken')
      },
      login (params) {
        return axios.post('user/login', params)
      },
      getUserPermissions () {
        return axios.get('user/userPermissions')
      },
      register (params) {
        return axios.post('user/regist', params)
      },
      departmentList () {
        return axios.post('dept/list')
      },
      getPassWord (params) {
        return axios.post('user/sendCode', params)
      },
      resetPassWord (params) {
        return axios.post('user/resetPwd', params)
      },
      getUserInfo () {
        return axios.post('user/info')
      },
      updatePassword (params) {
        return axios.post('user/updatePwd', params)
      },
      createUser (params) {
        return axios.post('user/createUser', params)
      },
      getUserList (params) {
        return axios.post('user/list', params)
      },
      deleteUser (params) {
        return axios.post('user/delete', params)
      },
      updateUser (params) {
        return axios.post('user/update', params)
      },
      userApply (params) {
        return axios.post('user/apply', params)
      },
      managerAudit (params) {
        return axios.post('user/audit', params)
      },
      userLoginOut () {
        return axios.post('user/logout')
      },
      userLogOut () {
        return axios.get('http://shunde.vizen.cn/pano-viewer-web/rest/auth/logout')
      },
      _uploadFileToCos (file, url = '', callback = () => {
      }, errorcall = () => {
      }, processCall = () => {
      }) {
        /* eslint-disable no-new */
        let self = this
        let remotePath = `/shunde/${url}`
        let cos = new cosJs.CosCloud({
          appid: 1251448083, // APPID 必填参数
          bucket: myBucket, // bucketName 必填参数
          region: 'sh', // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
          getAppSign: function (callback) { // 获取签名 必填参数
            self.getNewSign({params: {remotePath: remotePath}}).then(res => {
              if (res.data && res.data.sign) {
                callback(res.data.sign)
              } else {
                errorcall(res)
              }
            })
          }
        })
        cos.uploadFile(function (data) {
          if (data.code === 0) {
            callback(data.data.access_url, data)
          } else {
            errorcall(data)
          }
        }, function () {
        }, processCall, myBucket, remotePath, file, '')
      },
      uploadFileToCos (file, url = '', callback, errorcall, processCall) {
        this._uploadFileToCos(file, `file/${url}`, callback, errorcall)
      },
      uploadPanoTilesToCos (file, filePath, callback, errorcall, processCall) {
        this._uploadFileToCos.apply(this, arguments)
      },
      // 全景管理
      // 获取cos 的签名，不会校验remotePath
      getSignature (params) {
        return axios.get('/inner/upload/sign', params)
      },
      getNewSign (params) {
        // return axios.get('http://cos.test.vizen.cn/file/generateSign?appid=1251448083&bucket=panopublictest', params)
        return axios.get('/inner/upload/sign', params)
      },
      getToken (params) {
        return axios.get('/user/getLoginToken', params)
      },
      droneAutoStitch (params) {
        /**
         * @param
         * 保存无人机图片
         * panoId -- 全景ID
         * 全景水平参考
         * anchorInfo.name图片名字
         * anchorInfo.url图片url
         * picMap
         * "22": {
              "colorSpace": 0,
              "aperture": 0,
              "lensMode": "",
              "focal": 9,
              "iso": 100,
              "shutter": 0,
              "name": "DJI_0061.JPG",
              "width": 5472,
              "model": "FC6310",
              "url": "",
              "md5": "bb62bc5c5e49970f5b0eb01fc657844b",
              "height": 3078
          }
         */
        return axios.post('/pano/droneAutoStitch', params)
      },
      getPatchIds (params) {
        /**
         * @param
         * 获取无人机素材图片
         * panoId 全景ID
         * weatherType String 天气 1晴朗 2多云
         * timeType string 时间 1白天2 晨昏3 晚上
         * lightSource 光源方向 1中间2偏左3偏右4不定向
         */
        return axios.post('/pano/getPatchIds', params)
      },
      saveSkypatch (params) {
        /**
         * @param
         * 保存无人机补天图片
         * panoId 全景ID
         * url 素材地址
         * patchId 素材Id
         */
        return axios.post('/pano/saveSkypatch', params)
      },
      // 同步数据
      transferData (params) {
        return axios.get('http://shunde.vizen.cn/shunde/pano/sync?time=' + params)
      },
      updateStatus (params) {
        /**
         * @param
         * 无人机  更新状态--退回重新选择补天图片
         * panoId
         */
        return axios.post('/pano/updateStatus', params)
      },
      getAlbumContent (params) {
        /**
         * 获取相册
         */
        return axios.get('http://shunde.vizen.cn/pano-viewer-web/rest/album/get?albumId=' + params)
      },
      tokenLogin (params) {
        return axios.post('http://shunde.vizen.cn/pano-viewer-web/rest/auth/tokenLogin', params)
      },
      startPatch2 (params) {
        /**
         * @param
         * 无人机  补天融合拼接-融合完成会进入待入库
         * panoId
         */
        return axios.post('/pano/startPatch2', params)
      },
      updatePanoStitchPic (params) {
        /**
         * @param
         * 全景图片单张上传
         * panoId string
         * position int
         * picInfo string
         */
        // console.log(params)
        // params.picInfo = 'haha'
        if (params.picInfo) {
          params.picInfo = JSON.stringify(params.picInfo)
        }
        return axios.post('/pano/updatePanoStitchPic', params)
      },
      submitAllPanoPic (params) {
        /**
         * @param
         * panoId string
         * picMap int json字符串 key为1到9的数字，value为对应的图片json
         */
        return axios.post('/pano/submitAllPanoPic', params)
      },
      deleteOnePanoStitchPic (params) {
        /**
         * @param
         * 全景图片单张删除
         * panoId string
         * position
         */
        return axios.post('/pano/deleteOnePanoStitchPic', params)
      },
      deletePanoInfoBatch (params) {
        /**
         * 全景批量删除-待处理、已入库中
         * @param
         * panoIds string 多个使用”,”（英文）隔开
         */
        return axios.post('/pano/deletePanoInfoBatch', params)
      },
      albumDownloadHref (params) {
        /**
         * 相册下载
         */
        return axios.post('/stat/exportPanoAlbumStat', params)
      },
      userDownloadHref (params) {
        /**
         * 用户下载
         */
        return axios.post('/stat/exportUserStat', params)
      },
      getPanoStitch (params) {
        /**
         * 获取单个全景信息—待拼接
         * @param
         * panoId string
         */
        return axios.post('/pano/getPanoStitch/{panoId}'.replace('{panoId}', params.panoId), params)
      },
      deletePanoStitchBatch (params) {
        /**
         * 全景批量删除-待拼接
         * @param
         * panoIds string 多个使用”,”（英文）隔开
         */
        return axios.post('/pano/deletePanoStitchBatch', params)
      },
      deletePanoStitch (params) {
        /**
         * 删除单个全景-待拼接
         * @param
         * panoId string
         */
        return axios.post('/pano/deletePanoStitch/{panoId}'.replace('{panoId}', params.panoId), params)
      },
      processPanoBatch (params) {
        /**
         * 批量发起全景拼接
         * @param
         * panoIds string 多个使用”,”（英文）隔开
         */
        return axios.post('/pano/processBatch', params)
      },

      processPano (params) {
        /**
         * 全景发起拼接
         * @param
         * panoId string
         */
        return axios.post('/pano/process', params)
      },
      getPublishDrafts (params) {
        /**
         * 获取发布列表--草稿箱
         * @param
         * searchWord string
         * tag  string
         * pageSize 页容量
         * pageNum 页码
         */
        Object.assign(params, {isFinish: 0})
        return axios.post('/pano/getPanoInfoList', params)
      },
      getPublishedList (params) {
        /**
         * 获取发布列表---已发布
         * @param
         * searchWord string
         * tag  string
         * pageSize 页容量
         * pageNum 页码
         */
        console.log(params)
        return axios.get('http://shunde.vizen.cn/pano-viewer-web/rest/album/search', params)
      },
      getPublishDelete (params) {
        /**
         * 获取发布列表-已删除
         * @param
         * searchWord string
         * tag  string
         * pageSize 页容量
         * pageNum 页码
         */
        Object.assign(params, {isFinish: 1})
        return axios.post('/pano/getPanoInfoList', params)
      },
      getPanoInfoList (params) {
        /**
         * 获取全景列表-待入库
         * @param
         * searchWord string
         * tag  string
         * pageSize 页容量
         * pageNum 页码
         */
        Object.assign(params, {isFinish: 0})
        return axios.post('/pano/getPanoInfoList', params)
      },
      getPanoInfoListFinish (params) {
        /**
         * 获取全景列表-已入库
         * @param
         * searchWord string
         * tag  string
         * pageSize 页容量
         * pageNum 页码
         */
        Object.assign(params, {isFinish: 1})
        return axios.post('/pano/getPanoInfoList', params)
      },
      getPanoInfo (params) {
        /**
         * 获取全景信息-待处理、已入库
         * @param
         * panoId string
         */
        return axios.post('/pano/getPanoInfo/{panoId}'.replace('{panoId}', params.panoId), params)
      },
      updatePanoName (params) {
        /**
         * 删除单个全景-待拼接
         * @param
         * panoId string
         * panoName string
         */
        return axios.post('/pano/updatePanoName', params)
      },
      updatePanoInfoName (params) {
        /**
         * 待处理、已入库全景更改名字
         * @param
         * panoId string
         * name string
         */
        return axios.post('/pano/updatePanoInfoName', params)
      },
      getPanoStitchList (params) {
        /**
         * 用获取全景列表-待拼接
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/pano/getPanoStitchList', params)
      },
      getAlbumCountList (params) {
        /**
         * 数据统计---专题列表
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/panoAblumStatList', params)
      },
      getAlbumForm (params) {
        /**
         * 数据统计---专题趋势图
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/panoAlbumStatTrend', params)
      },
      getUserCountList (params) {
        /**
         * 数据统计---用户列表
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/userStatList', params)
      },
      getUserCountForm (params) {
        /**
         * 数据统计---用户趋势图
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/userStatTrend', params)
      },
      getPanoCountList (params) {
        /**
         * 数据统计---全景列表
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/getPanoInfoStatList', params)
      },
      getPanoCountForm (params) {
        /**
         * 数据统计---全景趋势图
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/getPanoInfoTrend', params)
      },
      getGridCountForm (params) {
        /**
         * 数据统计---网格趋势图
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/getGridStatTrend', params)
      },
      getGridCountList (params) {
        /**
         * 数据统计---网格趋势图
         * @param
         * pageNum int
         * pageSize int
         * searchWord string 搜索关键字
         */
        return axios.post('/stat/getGridStatList', params)
      },
      deletePanoInfo (params) {
        /**
         * 全景单个删除-待处理、已入库中
         * @param
         * panoId string
         */
        return axios.post('/pano/deletePanoInfo/{panoId}'.replace('{panoId}', params.panoId), params)
      },
      ceatePano (params) {
        /**
         * 新建全景接口
         * @param
         * panoName string
         * deviceType int全景类型1 2:1全景 2 无人机 3 鱼眼
         */
        return axios.post('/pano/ceatePano', params)
      },
      savePanoInfo (params) {
        /**
         * 保存入库单
         * @param
         * panoId
         * poiId
         * coordsys 坐标系(1:高德,2:腾讯)
         * lat  纬度
         * lng  经度
         * provinceId 省
         * cityId  市
         * countyId  区
         * areaId  地区
         * direction 角度
         * cameraType 拍摄方式
         * height 高度
         * photographer 拍摄者
         * photoTime 拍摄时间 到毫秒的时间戳
         * tag 标签
         * isEntry 是否入库
         */
        return axios.post('/pano/savePanoInfo', params)
      },
      getPanoInfoListByPoi (params) {
        /**
         * 搜索poilist  分页
         * @param
         * poiId poi的id
         * tag 标签
         */
        return axios.post('/pano/getPanoInfoListByPoi', params)
      },
      createPoi (params) {
        /**
         * 搜索poilist -- 入库单绑定poi时使用
         * @param
         * id poiId
         * poiName poi点名称
         * coordsys 坐标系(1:高德,2:腾讯)
         * lat  纬度
         * lng  经度
         * provinceId 省
         * cityId  市
         * countyId  区
         * areaId  地区
         * gridCode 网格号
         */
        return axios.post('/poi/createPoi', params)
      },
      getErrorPois (params) {
        /*
         * 获取异常点
         * */
        return axios.post('/poi/searchErrorPoiPage', params)
      },
      searchPoi (params) {
        /**
         * 搜索poilist -- 入库单绑定poi时使用
         * @param
         */
        return axios.post('/poi/searchPoi', params)
      },
      searchPoiWithName (params) {
        return axios.post('/poi/searchPoiHaveAreaName', params)
      },
      deletePoi (params) {
        /**
         * 删除poilist
         * @param
         * id poiId
         */
        return axios.post('/poi/deletePoi', params)
      },
      updatePoi (params) {
        /**
         * 修改poilist
         * @param
         * id poiId
         * poiName poi点名称
         * coordsys 坐标系(1:高德,2:腾讯)
         * lat  纬度
         * lng  经度
         * provinceId 省
         * cityId  市
         * countyId  区
         * areaId  地区
         * gridCode 网格号
         */
        return axios.post('/poi/updatePoi', params)
      },
      searchPoiPage (params) {
        /**
         * 搜索poilist  分页
         * @param
         * pageNum 页码
         * pageSize 页容量
         * searchName  搜索poi名称
         * areaId
         * gridCode
         */
        return axios.post('/poi/searchPoiPageForPano', params)
      },
      searchPoiPageForPano (params) {
        /**
         * 搜索poilist  分页
         * @param
         * pageNum 页码
         * pageSize 页容量
         * searchName  搜索poi名称
         * areaId
         * gridCode
         */
        return axios.post('/poi/searchPoiPageForPano', params)
      },
      generatePanoId (params) {
        /**
         * 2:1获取上传全景图的panoId
         * @ name
         * @ md5
         */
        return axios.post('pano/generatePanoId', params)
      },
      finishUploadPano (params) {
        /**
         * 2:1全景图上传完成通知
         * @ panoId
         */
        return axios.post('pano/finishUploadPano', params)
      },
      // 标签
      createTag (params) {
        /**
         * 新增标签
         * tagName
         */
        return axios.post('/tag/createTag', params)
      },
      searchTag (params) {
        /**
         * 搜索标签
         * searchName
         */
        return axios.post('/tag/searchPanoTag', params)
      },
      searchPanoTag (params) {
        /**
         * 搜索标签
         * searchName
         */
        return axios.post('/tag/searchTag', params)
      },
      // 获取地点
      commonzone (params) {
        /**
         * upperCode
         */
        return axios.post('/commonzone/pulldown/zone', params)
      },
      getThreeDData (params) {
        /**
         * 搜索标签
         * searchName
         */
        // return axios.post('http://192.168.0.118:8080/threeDimensional/list', params)
        return axios.post('/threeDimensional/list', params)
      },
      changeThreeDData (params) {
        /**
         * 搜索标签
         * searchName
         */
        // return axios.post('http://192.168.0.118:8080/threeDimensional/update', params)
        return axios.post('/threeDimensional/update', params)
      },
      getPanoInfoCensus (params) {
        /**
         * 全景信息统计
         * */
        return axios.post('/space/panoInfoStatistics', params)
      },
      getPoiList (params) {
        /**
         * 根据网格获取poi信息
         * */
        return axios.post('/space/getGridPanoIndex', params)
      },
      poiListSort (params) {
        /**
         * 根据网格获取poi信息
         * */
        return axios.post('/space/adjustmentPanoIndex', params)
      },
      getMarkerList (params) {
        /**
         * 根据网格获取poi的Marker
         * */
        return axios.post('/space/getAroundPano', params)
      },
      panoStatistics (params) {
        /**
         * 全景访问量埋点
         * */
        return axios.post('/stat/reportViewPano', params)
      },
      getShotTaskList (params) {
        return axios.post('/shotTask/list', params)
      },
      createShotTask (params) {
        return axios.post('/shotTask/createShotTask', params)
      },
      updateShotStatus (params) {
        return axios.post('/shotTask/updateStatus', params)
      },
      exportShotTask (params) {
        return axios.post('/shotTask/exportShotTask', params, {responseType: 'arraybuffer'})
        // return axios.post('/shotTask/exportShotTask', params)
      }
    }
    // 权限管理
    for (let i in Vue.prototype.$api) {
      Vue.prototype.$api[i].isPermission = (context) => {
        let uri = apiUri[i]
        if (uri && uri.indexOf('/{')) {
          uri = uri.replace(/\/{.+$/, '')
        }
        if (context instanceof Vue) {
          return isUriPermission(context, uri)
        } else {
          console.error('Type Error : ', context)
        }
      }
    }
  }
}
