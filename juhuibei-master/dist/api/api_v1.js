const host = 'https://www.juhuibei.com/api/v1/'
import { Cache } from '../utils/cache.js';
var cache = new Cache();
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json',
      'token': cache.get('token')
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

const getActivityList     = (params) => wxRequest(params, host + 'activity_list/' + params.query.id)
const getActivityInfo     = (params) => wxRequest(params, host + 'activity_info/' + params.query.activity_id)
const getUserActivityInfo = (params) => wxRequest(params, host + 'info/' + params.query.user_id + '/' + params.query.activity_id)
const getImageInfo        = (params) => wxRequest(params, host + 'picture/' + params.query.image_id)
const getUserInfo         = (params) => wxRequest(params, host + 'user_info/' + params.query.user_id)
const getUploadToken      = (params) => wxRequest(params, host + 'upload_token')
const saveActivity        = (params) => wxRequest(params, host + 'activity_submit')
const saveImage           = (params) => wxRequest(params, host + 'save_image')
const saveActivityImage   = (params) => wxRequest(params, host + 'save_activity_image')
const saveImageName       = (params) => wxRequest(params, host + 'save_picture_name')
const saveActivityUser    = (params) => wxRequest(params, host + 'save_activity_user')
const saveUserComing      = (params) => wxRequest(params, host + 'save_coming')
const enCryptedData       = (params) => wxRequest(params, host + 'activity/encrypt')
const getGamesAll         = (params) => wxRequest(params, host + 'games')
const placeOrder          = (params) => wxRequest(params, host + 'order')
const getPreOrder         = (params) => wxRequest(params, host + 'pay/pre_order')
const getThemeModule      = (params) => wxRequest(params, host + 'theme_module/' + params.query.theme_id);
const editCardInfo        = (params) => wxRequest(params, host + 'card_edit/' + params.query.card_id);
const getThemeList        = (params) => wxRequest(params, host + 'theme_list');
const getUserCardAll      = (params) => wxRequest(params, host + 'user_card');
const wxCode              = (params) => wxRequest(params, host + 'wx_code');
const getVipInfo          = (params) => wxRequest(params, host + 'vip_info');
const coverMakeCard       = (params) => wxRequest(params, host + 'cover_make');
const createCard          = (params) => wxRequest(params, host + 'create_card');
const saveCard            = (params) => wxRequest(params, host + 'save_card');
const saveBless           = (params) => wxRequest(params, host + 'save_bless');
const getActivityCreated  = (params) => wxRequest(params, host + 'activity_created');
const getActivityjoined   = (params) => wxRequest(params, host + 'activity_joined');
const getWeddingList      = (params) => wxRequest(params, host + 'wedding_list/' + params.query.card_id)

module.exports = {
  getActivityList,
  getActivityInfo,
  getUserActivityInfo,
  getImageInfo,
  getUserInfo,
  getUploadToken,
  saveActivity,
  saveImage,
  saveActivityImage,
  saveImageName,
  saveActivityUser,
  saveUserComing,
  enCryptedData,
  getGamesAll,
  placeOrder,
  getPreOrder,
  getThemeModule,
  editCardInfo,
  getThemeList,
  getUserCardAll,
  wxCode,
  getVipInfo,
  coverMakeCard,
  createCard,
  saveCard,
  saveBless,
  getActivityCreated,
  getActivityjoined,
  getWeddingList
}
